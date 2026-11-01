// Appalachian Classic Shed: the model record.
// Prices come only from classic-prices.csv (26 sizes x 5 sidings = 130 fixed prices).
import raw from './classic-prices.csv?raw';

export const sidings = [
  { code: 'vp', slug: 'lp-smartside-vertical-panel', name: 'LP SmartSide Vertical Panel Siding', short: 'LP SmartSide Vertical Panel' },
  { code: 'dt', slug: 'roseburg-duratemp', name: 'Roseburg DuraTemp Wood Siding', short: 'Roseburg DuraTemp' },
  { code: 'bb', slug: 'lp-smartside-board-batten', name: 'LP SmartSide Board & Batten Siding', short: 'LP SmartSide Board & Batten' },
  { code: 'fv', slug: 'gp-forest-ridge-vinyl-lap', name: 'Georgia-Pacific Forest Ridge Vinyl Lap Siding', short: 'Georgia-Pacific Vinyl Lap' },
  { code: 'lp', slug: 'lp-smartside-lap', name: 'LP SmartSide Lap Siding', short: 'LP SmartSide Lap' },
];

const lines = raw.trim().split(/\r?\n/).slice(1);
export const prices = lines.map((line) => {
  const c = line.split(',');
  return { width: Number(c[1]), length: Number(c[2]), code: c[3], price: Number(c[5]), approved: c[6] === 'YES' };
});

// Sizes in source order, each with its five prices.
export const sizes = [];
for (const p of prices) {
  let s = sizes.find((x) => x.width === p.width && x.length === p.length);
  if (!s) { s = { width: p.width, length: p.length, prices: {} }; sizes.push(s); }
  s.prices[p.code] = p.price;
}

export const pricesApproved = prices.every((p) => p.approved);
export const priceRange = {
  low: Math.min(...prices.map((p) => p.price)),
  high: Math.max(...prices.map((p) => p.price)),
};
export const money = (n) => '$' + n.toLocaleString('en-US');
export const sizeLabel = (w, l) => `${w}′ × ${l}′`;

export const specs = [
  ['Foundation beams', '6×6 ground-contact pressure-treated'],
  ['Floor joists', '2×6 pressure-treated, installed 16″ on center'],
  ['Floor decking', '3/4″ 7-ply pressure-treated plywood'],
  ['Wall framing', '2×4 kiln-dried Spruce, 16″ on center'],
  ['Top plates', 'Double interlocking top plates for added strength'],
  ['Roof-to-wall connections', 'Hurricane clips at all rafters'],
  ['Wall sheathing', '1/2″ wall sheathing for added stability and siding backing'],
  ['Roof profile', 'Classic low-profile roof'],
  ['Roof framing', '2×6 engineered roof trusses'],
  ['Roof sheathing', '1/2″ exterior-grade plywood'],
  ['Roof covering', '3-tab standard asphalt shingles, available in eight colors'],
  ['Doors', 'Low-maintenance 6-panel fiberglass entry doors with heavy-duty hardware and keyed lock'],
  ['Windows', 'Aluminum-framed single-hung windows with window locks and removable screens'],
  ['Ventilation', 'Aluminum screened louver vents for passive ventilation'],
  ['Siding', 'Five siding systems (see Siding Choices)'],
  ['Sizes', '26 sizes, from 6′ × 8′ to 14′ × 24′'],
  ['Construction', 'Built on site at your property'],
  ['Warranty', 'Appalachian Sheds 30-Year Structural Warranty'],
];
