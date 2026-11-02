// Custom building designs.
//
// Each design is described by the model it starts from, its size and siding, and the options it shows.
// Prices are never typed in here. They are calculated from the published model price lists and the
// published option prices, so a design's price can never disagree with the rest of the site:
//   - "Base building": the standard price of the starting model at that size and siding.
//   - "As shown": the base building plus the low-to-high installed planning prices of every option shown.
// A design's prices appear on the website only after Edwin confirms its configuration (confirmed: true).
//
// Two upgrades are priced as a share of the base building price (confirmed by Edwin, November 2, 2026):
//   - Optional metal roof: 25% of the base building price.
//   - Roof pitch upgrade: 15% of the base building price for each 1/12 step above the model's
//     standard pitch (for example 6/12 to 7/12, or 9/12 to 10/12); the step up to 14/12 is 20%.
// Options shown on top of the standard building (for example added double doors) are counted as extras.

import options from './option-prices.json';
import { readPrices, sidings } from './models.js';
import classic from './classic-prices.csv?raw';
import antique from './antique-saltbox-prices.csv?raw';
import laurel from './laurel-lean-to-prices.csv?raw';
import cottage from './country-cottage-prices.csv?raw';
import overhang from './saltbox-overhang-prices.csv?raw';

export const baseModels = {
  classic: { name: 'Appalachian Classic Shed', path: '/buildings/appalachian-classic/', prices: readPrices(classic) },
  antique: { name: 'Appalachian Antique Saltbox Shed', path: '/buildings/appalachian-antique-saltbox/', prices: readPrices(antique) },
  laurel: { name: 'Appalachian Laurel Lean-To Shed', path: '/buildings/appalachian-laurel-lean-to/', prices: readPrices(laurel) },
  cottage: { name: 'Appalachian Country Cottage', path: '/buildings/appalachian-country-cottage/', prices: readPrices(cottage) },
  overhang: { name: 'Appalachian Saltbox Overhang Shed', path: '/buildings/appalachian-saltbox-overhang/', prices: readPrices(overhang) },
};

// Option categories and the page that publishes their prices.
const optionPages = {
  doors: '/options/doors-entry/', windows: '/options/windows-natural-light/', porches: '/options/porches-awnings-dormers/',
  roofing: '/options/roofing-rooflines/', lofts: '/options/lofts-ladders-stairs/', electrical: '/options/electrical-lighting-hvac/',
  storage: '/options/shelving-workbenches-storage/', trim: '/options/fascia-trim-accents/', cupolas: '/options/cupolas-weathervanes/',
  ramps: '/options/ramps-steps-access/', floors: '/options/floor-systems/', interior: '/options/interior-finish/',
};

// Edwin's percentage rules, as a share of the base building price.
export const METAL_ROOF_SHARE = 0.25;
export function pitchShare(from, to) {
  let share = 0;
  for (let step = from + 1; step <= to; step++) share += step === 14 ? 0.2 : 0.15;
  return share;
}
function adjustment(a, base) {
  if (a[0] === 'metalRoof') return { label: 'Metal roof (25% of base building)', share: METAL_ROOF_SHARE, path: '/options/roofing-rooflines/' };
  if (a[0] === 'pitch') {
    const share = pitchShare(a[1], a[2]);
    return { label: `Roof pitch upgrade ${a[1]}/12 to ${a[2]}/12 (${Math.round(share * 100)}% of base building)`, share, path: '/options/roofing-rooflines/' };
  }
  throw new Error(`Unknown custom design adjustment: ${a[0]}`);
}

const num = (s) => (s.match(/\$[\d,.]+/g) ?? []).map((n) => Number(n.replace(/[$,]/g, '')));
const round = (n, to = 500) => Math.round(n / to) * to;
const money = (n) => '$' + n.toLocaleString('en-US');

// Finds a published option price, e.g. opt('doors', 'prehung', 'Double House Doors — 15-Lite').
function lookup(cat, group, item) {
  const row = options[cat]?.[group]?.find((r) => r.item === item);
  if (!row) throw new Error(`Custom design option not found: ${cat} / ${group} / ${item}`);
  const [low, high = low] = num(row.price);
  return { label: item, low, high, plus: row.price.trim().endsWith('+'), path: optionPages[cat] };
}

export const designs = [
  {
    slug: 'creekside-pool-house',
    name: 'The Creekside Pool House',
    use: 'play',
    summary: 'A poolside retreat in dark green LP SmartSide lap siding with a columned front porch, three pairs of glass French doors and a gable dormer with an arched window.',
    images: [
      { key: 'creekside-pool-house-autumn', alt: 'The Creekside Pool House design: dark green lap siding, white trim, columned front porch, three pairs of glass French doors and a gable dormer, in an autumn creekside setting' },
      { key: 'creekside-pool-house-summer', alt: 'The Creekside Pool House design in summer, with its columned porch and French doors facing a lawn and creek' },
    ],
    base: { model: 'cottage', w: 12, l: 20, siding: 'lp' },
    shown: [
      ['porches', 'porches', '6′ Deep Porch', 1],
      ['porches', 'dormers', 'Small Gable Dormer', 1],
      ['doors', 'prehung', 'Double House Doors — 15-Lite', 3],
      ['windows', 'vinyl', 'Large Vinyl Insulated Window', 1],
    ],
    adjust: [],
    confirmed: true,
  },
  {
    slug: 'holt-workshop',
    name: 'The Holt Workshop',
    use: 'work',
    summary: 'A board-and-batten workshop with a large covered side porch and railing, double glass doors and divided-light windows.',
    images: [
      { key: 'holt-workshop-autumn', alt: 'The Holt Workshop design: natural board-and-batten siding, steep gable roof with green architectural shingles, double glass doors, divided-light windows and a large covered side porch with wood railing' },
    ],
    base: { model: 'cottage', w: 12, l: 16, siding: 'bb' },
    shown: [
      ['porches', 'porches', 'Premium Appalachian Porch', 1],
      ['doors', 'prehung', 'Double House Doors — 9-Lite', 1],
      ['windows', 'barnSash', 'Medium Pine Barn Sash with Grids', 4],
    ],
    // Shows a steeper roof than standard. Waiting on the Country Cottage's standard pitch and the pitch shown,
    // then add e.g. ['pitch', 8, 10] here and set confirmed: true.
    adjust: [],
    confirmed: false,
  },
  {
    slug: 'harvest-cottage',
    name: 'The Harvest Cottage',
    use: 'live',
    summary: 'A board-and-batten cottage retreat with a dark metal roof, a covered entry, double glass doors and generous divided-light windows.',
    images: [
      { key: 'harvest-cottage-autumn', alt: 'The Harvest Cottage design: natural board-and-batten siding, dark metal roof, covered entry with double glass doors and many divided-light windows, beside a stone path in autumn' },
    ],
    base: { model: 'cottage', w: 10, l: 14, siding: 'bb' },
    shown: [
      ['porches', 'awnings', 'Timber-Style Canopy', 1],
      ['doors', 'prehung', 'Double House Doors — 15-Lite', 1],
      ['windows', 'barnSash', 'Medium Pine Barn Sash with Grids', 7],
    ],
    adjust: [['metalRoof']],
    confirmed: true,
  },
];

// Works out a design's base and as-shown price ranges from the published prices.
export function priceDesign(d) {
  const model = baseModels[d.base.model];
  const size = model.prices.sizes.find((s) => s.width === d.base.w && s.length === d.base.l);
  if (!size) throw new Error(`${d.name}: ${d.base.w}×${d.base.l} is not on the ${model.name} price list`);
  const base = size.prices[d.base.siding];
  const items = d.shown.map(([cat, group, item, qty]) => {
    const o = lookup(cat, group, item);
    return { ...o, qty, low: o.low * qty, high: o.high * qty };
  });
  for (const a of d.adjust ?? []) {
    const adj = adjustment(a, base);
    const amount = Math.round(base * adj.share);
    items.push({ label: adj.label, qty: 1, low: amount, high: amount, path: adj.path });
  }
  const low = base + items.reduce((t, i) => t + i.low, 0);
  const high = base + items.reduce((t, i) => t + i.high, 0);
  return {
    model, base, items,
    siding: sidings.find((s) => s.code === d.base.siding).name,
    size: `${d.base.w}′ × ${d.base.l}′`,
    asShown: { low: round(low), high: round(high) },
    text: { base: money(base), asShown: `${money(round(low))}–${money(round(high))}` },
    // Each line of the as-shown price, for the "what's counted" list on the design card.
    lines: items.map((i) => ({ label: (i.qty > 1 ? `${i.qty} × ` : '') + i.label, path: i.path, text: (i.low === i.high ? money(i.low) : `${money(i.low)}–${money(i.high)}`) + (i.plus ? '+' : '') })),
  };
}

export const useLabels = { live: 'Live', work: 'Work', play: 'Play' };
export const pricedDesigns = () => designs.map((d) => ({ ...d, price: priceDesign(d) }));
