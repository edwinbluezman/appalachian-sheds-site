// Runs before and after every build. If anything is wrong with any model's prices,
// the build stops and nothing is published.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const SIDINGS = ['vp', 'dt', 'bb', 'fv', 'lp'];

// One entry per model. A fingerprint changes only when Edwin approves a new price list.
const MODELS = [
  {
    name: 'Appalachian Classic',
    csv: 'src/data/classic-prices.csv',
    sizes: 26,
    page: 'dist/buildings/appalachian-classic/index.html',
    fingerprint: 'd2e6f169aa36fd0f7630216f7cb7fa2c78279c7441e893b96ba1e32d9fe66ea6', // approved November 1, 2026
  },
  {
    name: 'Appalachian Antique Saltbox',
    csv: 'src/data/antique-saltbox-prices.csv',
    sizes: 20,
    page: 'dist/buildings/appalachian-antique-saltbox/index.html',
    fingerprint: '36aaf6ba3af7294f2bfd0cada1d15129f5647d37bc4cbf23925f3de03ff06f1f', // approved November 1, 2026
  },
  {
    name: 'Appalachian Laurel Lean-To',
    csv: 'src/data/laurel-lean-to-prices.csv',
    sizes: 9,
    page: 'dist/buildings/appalachian-laurel-lean-to/index.html',
    fingerprint: 'ea8e2b65f846840b03fb2fe848ed25c0ebbabff94b4a2d3040dacda025cf6cba', // approved November 1, 2026
  },
  {
    name: 'Appalachian Country Cottage',
    csv: 'src/data/country-cottage-prices.csv',
    sizes: 23,
    page: 'dist/buildings/appalachian-country-cottage/index.html',
    fingerprint: 'd22d26f53f6a98ac39772a48a61ec7e77cfdf0a687afc0566ef0a96ace570bcc', // approved November 1, 2026
  },
  {
    name: 'Appalachian Saltbox Overhang',
    csv: 'src/data/saltbox-overhang-prices.csv',
    sizes: 23,
    page: 'dist/buildings/appalachian-saltbox-overhang/index.html',
    fingerprint: 'f2f69a41a73ba13ef58c4aace5bb555d82e9e1fd17abc015ccef74a77fbe9029', // approved November 1, 2026
  },
];

const afterBuild = process.argv.includes('--after-build');

// Options price list: fingerprint plus every price must appear on its options page.
const OPTIONS = {
  file: 'src/data/option-prices.json',
  fingerprint: '2a089452fb18a6493198beae7e2c516d30f17ae4371f8ab58474c26bc525836f',
  pages: { doors: 'dist/options/doors-entry/index.html', windows: 'dist/options/windows-natural-light/index.html', materials: 'dist/options/siding-exterior-materials/index.html' },
};
const fail = (model, msg) => { console.error(`PRICE CHECK FAILED (${model}): ${msg}`); process.exit(1); };

for (const m of MODELS) {
  const text = readFileSync(m.csv, 'utf8');
  const fingerprint = createHash('sha256').update(text).digest('hex');
  if (fingerprint !== m.fingerprint) fail(m.name, `${m.csv} has changed from the approved price list (fingerprint ${fingerprint}).`);

  const rows = text.trim().split(/\r?\n/).slice(1).map((l) => l.split(','));
  const expected = m.sizes * SIDINGS.length;
  if (rows.length !== expected) fail(m.name, `expected ${expected} prices, found ${rows.length}.`);
  const sizes = new Map();
  for (const [size, w, l, code, , price, approved] of rows) {
    if (`${w}x${l}` !== size) fail(m.name, `size label ${size} does not match ${w}x${l}.`);
    if (!SIDINGS.includes(code)) fail(m.name, `unknown siding code ${code}.`);
    if (!/^\d+$/.test(price) || Number(price) <= 0) fail(m.name, `bad price ${price} for ${size} ${code}.`);
    if (approved.trim() !== 'YES') fail(m.name, `${size} ${code} is not marked approved.`);
    if (!sizes.has(size)) sizes.set(size, []);
    sizes.get(size).push(code);
  }
  if (sizes.size !== m.sizes) fail(m.name, `expected ${m.sizes} sizes, found ${sizes.size}.`);
  for (const [size, codes] of sizes) if (codes.join() !== SIDINGS.join()) fail(m.name, `${size} does not list the five sidings in order.`);

  if (afterBuild) {
    if (!existsSync(m.page)) fail(m.name, `${m.page} was not built.`);
    const html = readFileSync(m.page, 'utf8');
    const missing = rows.filter((r) => !html.includes('$' + Number(r[5]).toLocaleString('en-US')));
    if (missing.length) fail(m.name, `${missing.length} prices missing from the built page, e.g. ${missing[0][0]} ${missing[0][3]}.`);
  }
  console.log(`Price check passed: ${m.name}, ${rows.length} prices${afterBuild ? ', all on the built page' : ''}.`);
}

{
  const text = readFileSync(OPTIONS.file, 'utf8');
  const fingerprint = createHash('sha256').update(text).digest('hex');
  if (fingerprint !== OPTIONS.fingerprint) fail('Options', `${OPTIONS.file} has changed from the recorded option price list (fingerprint ${fingerprint}).`);
  const data = JSON.parse(text);
  let count = 0;
  for (const [cat, page] of Object.entries(OPTIONS.pages)) {
    const rows = Object.values(data[cat]).flat();
    count += rows.length;
    if (afterBuild) {
      if (!existsSync(page)) fail('Options', `${page} was not built.`);
      const html = readFileSync(page, 'utf8').replace(/&amp;/g, '&');
      const missing = rows.filter((r) => !html.includes(r.price));
      if (missing.length) fail('Options', `${missing.length} option prices missing from ${page}, e.g. ${missing[0].item}.`);
    }
  }
  console.log(`Price check passed: Options, ${count} prices${afterBuild ? ', all on the built pages' : ''}.`);
}
