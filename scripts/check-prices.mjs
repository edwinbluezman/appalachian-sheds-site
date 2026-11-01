// Runs before and after every build. If anything is wrong with the prices,
// the build stops and nothing is published.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const CSV = 'src/data/classic-prices.csv';
// Fingerprint of the price file as extracted from the old Appalachian Classic page.
// Change this only when Edwin approves a new price list.
const APPROVED_FINGERPRINT = 'a75dcab351c639c12079308a48848ba8d15b42a8872a664f64bf22b9dc813619';
const SIDINGS = ['vp', 'dt', 'bb', 'fv', 'lp'];

const fail = (msg) => { console.error('PRICE CHECK FAILED: ' + msg); process.exit(1); };
const text = readFileSync(CSV, 'utf8');
const fingerprint = createHash('sha256').update(text).digest('hex');
if (fingerprint !== APPROVED_FINGERPRINT) fail(`${CSV} has changed from the recorded price list (fingerprint ${fingerprint}).`);

const rows = text.trim().split(/\r?\n/).slice(1).map((l) => l.split(','));
if (rows.length !== 130) fail(`expected 130 prices, found ${rows.length}.`);
const sizes = new Map();
for (const r of rows) {
  const [size, w, l, code, , price] = r;
  if (`${w}x${l}` !== size) fail(`size label ${size} does not match ${w}x${l}.`);
  if (!SIDINGS.includes(code)) fail(`unknown siding code ${code}.`);
  if (!/^\d+$/.test(price) || Number(price) <= 0) fail(`bad price ${price} for ${size} ${code}.`);
  if (!sizes.has(size)) sizes.set(size, []);
  sizes.get(size).push(code);
}
if (sizes.size !== 26) fail(`expected 26 sizes, found ${sizes.size}.`);
for (const [size, codes] of sizes) if (codes.join() !== SIDINGS.join()) fail(`${size} does not list the five sidings in order.`);

// After the build: every price must appear on the published page.
if (process.argv.includes('--after-build')) {
  const page = 'dist/buildings/appalachian-classic/index.html';
  if (!existsSync(page)) fail(`${page} was not built.`);
  const html = readFileSync(page, 'utf8');
  const missing = rows.filter((r) => !html.includes('$' + Number(r[5]).toLocaleString('en-US')));
  if (missing.length) fail(`${missing.length} prices missing from the built page, e.g. ${missing[0][0]} ${missing[0][3]}.`);
  console.log('Price check passed: all 130 Appalachian Classic prices are on the built page.');
} else {
  console.log('Price check passed: 130 prices, 26 sizes, 5 sidings, matches the recorded price list.');
}
