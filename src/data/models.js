// Shared helpers for every model page. Each model's prices live in its own CSV file
// (one row per size and siding) and are read here; nothing is calculated by square foot.

export const sidings = [
  { code: 'vp', slug: 'lp-smartside-vertical-panel', name: 'LP SmartSide Vertical Panel Siding', short: 'LP SmartSide Vertical Panel',
    label: 'Standard · Engineered Wood Vertical Panel', text: 'A clean, straightforward exterior with the durability and consistent appearance of engineered wood. The standard siding on every Appalachian Sheds model.', fit: 'A durable, clean painted-panel exterior.' },
  { code: 'dt', slug: 'roseburg-duratemp', name: 'Roseburg DuraTemp Wood Siding', short: 'Roseburg DuraTemp',
    label: 'Wood Siding · Vertical Panel', text: 'The familiar vertical-panel character of a traditional painted shed, with an understated profile that suits dependable storage.', fit: 'The natural character of a painted wood-panel exterior.' },
  { code: 'bb', slug: 'lp-smartside-board-batten', name: 'LP SmartSide Board & Batten Siding', short: 'LP SmartSide Board & Batten',
    label: 'Architectural Vertical Profile', text: 'Stronger vertical shadow lines and a farmhouse character, without changing the structure underneath.', fit: 'Farmhouse or cottage properties.' },
  { code: 'fv', slug: 'gp-forest-ridge-vinyl-lap', name: 'Georgia-Pacific Forest Ridge Vinyl Lap Siding', short: 'Georgia-Pacific Vinyl Lap',
    label: 'Low Maintenance · Residential Lap', text: 'A familiar horizontal residential look with a low-maintenance finish. Relates well to a vinyl-sided house or garage.', fit: 'Matching existing vinyl siding on the property.' },
  { code: 'lp', slug: 'lp-smartside-lap', name: 'LP SmartSide Lap Siding', short: 'LP SmartSide Lap',
    label: 'Engineered Wood · Residential Lap', text: 'The horizontal lines of residential clapboard with the warmth and texture of engineered wood.', fit: 'A refined residential look without vinyl.' },
];

export const money = (n) => '$' + n.toLocaleString('en-US');
export const sizeLabel = (w, l) => `${w}′ × ${l}′`;

// Turns a price CSV into sizes with five prices each, in source order.
export function readPrices(raw) {
  const rows = raw.trim().split(/\r?\n/).slice(1).map((line) => {
    const c = line.split(',');
    return { width: Number(c[1]), length: Number(c[2]), code: c[3], price: Number(c[5]), approved: c[6] === 'YES' };
  });
  const sizes = [];
  for (const r of rows) {
    let s = sizes.find((x) => x.width === r.width && x.length === r.length);
    if (!s) { s = { width: r.width, length: r.length, prices: {} }; sizes.push(s); }
    s.prices[r.code] = r.price;
  }
  const all = rows.map((r) => r.price);
  const first = sizes[0], last = sizes.at(-1);
  return {
    sizes,
    approved: rows.every((r) => r.approved),
    low: Math.min(...all),
    high: Math.max(...all),
    count: rows.length,
    sizeRange: `${sizeLabel(first.width, first.length)} to ${sizeLabel(last.width, last.length)}`,
  };
}

// Construction shared by the Classic Series models, as stated on their original pages.
export const classicSeriesSpecs = (roofProfile, sizesText) => [
  ['Foundation beams', '6×6 ground-contact pressure-treated'],
  ['Floor joists', '2×6 pressure-treated, installed 16″ on center'],
  ['Floor decking', '3/4″ 7-ply pressure-treated plywood'],
  ['Wall framing', '2×4 kiln-dried Spruce, 16″ on center'],
  ['Top plates', 'Double interlocking top plates for added strength'],
  ['Roof-to-wall connections', 'Hurricane clips at all rafters'],
  ['Wall sheathing', '1/2″ wall sheathing for added stability and siding backing'],
  ['Roof profile', roofProfile],
  ['Roof framing', '2×6 engineered roof trusses'],
  ['Roof sheathing', '1/2″ exterior-grade plywood'],
  ['Roof covering', '3-tab standard asphalt shingles, available in eight colors'],
  ['Doors', 'Low-maintenance 6-panel fiberglass entry doors with heavy-duty hardware and keyed lock'],
  ['Windows', 'Aluminum-framed single-hung windows with window locks and removable screens'],
  ['Ventilation', 'Aluminum screened louver vents for passive ventilation'],
  ['Siding', 'Five siding systems, LP SmartSide Vertical Panel standard (see Siding Choices)'],
  ['Sizes', sizesText],
  ['Construction', 'Built on site at your property'],
  ['Warranty', 'Appalachian Sheds 30-Year Structural Warranty'],
];

export const notIncluded = 'Interior finishes, optional upgrades, site preparation, delivery, site-specific requirements, custom details and applicable taxes, unless identified in the final written price.';

// FAQ answers that are the same on every model page; {name} is replaced with the model name.
export const commonFaqs = (name) => [
  { q: 'What exactly does the pricing calculator show?', a: `The calculator shows the standard build price for the exact ${name} size and siding selected. Site conditions, access, placement and requested upgrades are reviewed before the final written project price is confirmed.` },
  { q: 'Does the price include any interior finishes?', a: 'No. The price covers the standard exterior structure only: foundation, framing, roofing, siding, exterior doors and windows. It does not include insulation, drywall or wall finish, flooring, electrical or lighting, HVAC, interior trim or interior paint. Interior finish work is priced separately as an option.' },
  { q: 'Which siding gives the lowest price?', a: `LP SmartSide Vertical Panel Siding is the standard siding and has the lowest standard build price at every ${name} size. Once a size is selected, the calculator shows the prices for all five siding systems side by side.` },
  { q: `Is the ${name} built at my property?`, a: `Yes. The ${name} is built on site at its intended location rather than delivered as a completed prebuilt structure.` },
  { q: 'Can I add windows, doors, lofts, electrical or insulation?', a: 'Yes. Options and upgrades are reviewed after the standard size and siding are selected, and the features you request are included in the final written project price.' },
  { q: 'What warranty is included?', a: `Every ${name} includes the Appalachian Sheds 30-Year Structural Warranty as part of the standard building. Full warranty terms are provided with your final written project documentation.` },
];
