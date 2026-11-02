// Price ranges for each option category, worked out from the published option prices
// (option-prices.json), so the Options hub can never disagree with the category pages.
import options from './option-prices.json';

const NOT_PRICES = new Set(['item', 'note', 'bestFor', 'size']);
const nums = (s) => (s.match(/\$[\d,.]+/g) ?? []).map((n) => Number(n.replace(/[$,]/g, '')));
const money = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
// Unit-priced values ("per sq ft", "/ finish SF", "adds $0.50 per sq ft").
const isUnit = (s) => /\bper\b|\/\s|\badds\b/i.test(s);

// The unit a price is quoted in, e.g. "per sq ft", "per location", "per finish sq ft".
function unitOf(v) {
  const m = v.match(/per [^$]+$/i) ?? v.match(/\/\s*[^$]+$/);
  return m ? m[0].replace(/\+$/, '').replace(/^\/\s*/, 'per ').replace(/\bSF\b/, 'sq ft')
    .replace(/\bLF\b( installed)?/, 'linear foot').replace(/exterior finish sq ft/, 'finish sq ft').trim() : '';
}
// Up to two distinct units, e.g. "per sq ft or per location".
const units = (vals) => [...new Set(vals.map(unitOf).filter(Boolean))].slice(0, 2).join(' or ');

export function optionRange(cat) {
  const values = Object.values(options[cat] ?? {}).flat()
    .flatMap((row) => Object.entries(row).filter(([k, v]) => !NOT_PRICES.has(k) && typeof v === 'string' && v.includes('$')).map(([, v]) => v));
  const flat = values.filter((v) => !isUnit(v));
  const unit = values.filter(isUnit);
  if (flat.length) {
    const lows = flat.map((v) => Math.min(...nums(v)));
    const highs = flat.map((v) => Math.max(...nums(v)));
    const hi = Math.max(...highs);
    const plus = flat.some((v) => v.trim().endsWith('+') && Math.max(...nums(v)) === hi);
    return { text: `${money(Math.min(...lows))}–${money(hi)}${plus ? '+' : ''}`, extra: unit.length ? `plus some items priced ${units(unit)}` : '' };
  }
  if (unit.length) {
    // The lowest unit price, with its unit, e.g. "From $1.00 per sq ft".
    // The published figure is kept exactly as written (e.g. "$1.00").
    const best = unit.map((v) => ({ v, n: Math.min(...nums(v)), raw: v.match(/\$[\d,.]+/)[0] })).sort((a, b) => a.n - b.n)[0];
    return { text: `From ${best.raw} ${unitOf(best.v)}`.trim(), extra: '' };
  }
  return null;
}
