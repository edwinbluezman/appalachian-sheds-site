// Prepares design renderings for the website, one time per image.
//
// For every original image in the originals folder it creates web-size copies that:
//   - carry a small "AppalachianSheds.com" mark in the lower-right corner,
//   - store ownership details and an industry-standard "AI-created" label inside the file,
//   - contain no location or camera data,
//   - never exceed 1,600 pixels wide, so full-quality originals stay private.
// It also creates a 1200×630 share image with the logo band for links shared on social media and in texts.
//
// Originals are NOT kept in the website code (they would become public). Run:
//   node scripts/prepare-designs.mjs /path/to/originals
// The results go to public/designs/ and src/data/design-images.json.

import sharp from 'sharp';
import { readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const SRC = process.argv[2] ?? '../work/design-originals';
const OUT = 'public/designs';
const MANIFEST = 'src/data/design-images.json';
const LOGO = 'src/assets/appalachian-sheds-logo.png';
const WIDTHS = [480, 800, 1200, 1600];
const YEAR = new Date().getFullYear();

const COPYRIGHT = `© ${YEAR} Appalachian Sheds Inc. All rights reserved.`;
const xmp = (title) => `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"
    photoshop:Credit="Appalachian Sheds Inc."
    xmpRights:Marked="True"
    xmpRights:WebStatement="https://appalachiansheds.com/"
    Iptc4xmpExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia">
   <dc:creator><rdf:Seq><rdf:li>Appalachian Sheds Inc.</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${COPYRIGHT}</rdf:li></rdf:Alt></dc:rights>
   <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${title}</rdf:li></rdf:Alt></dc:title>
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">Design rendering, AI-visualized from an original Appalachian Sheds design.</rdf:li></rdf:Alt></dc:description>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

// The corner mark, drawn at a size relative to the image so it looks the same at every width.
function mark(w, h) {
  const size = Math.max(11, Math.round(h * 0.026));
  const pad = Math.round(w * 0.025);
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs><filter id="s" x="-20%" y="-50%" width="140%" height="200%"><feDropShadow dx="0" dy="1" stdDeviation="${Math.max(1, size / 8)}" flood-color="#000" flood-opacity="0.55"/></filter></defs>
    <text x="${w - pad}" y="${h - pad}" text-anchor="end" font-family="Montserrat" font-style="italic" font-weight="700"
      font-size="${size}" fill="#ffffff" fill-opacity="0.62" filter="url(#s)">AppalachianSheds.com</text>
  </svg>`);
}

const titleFrom = (name) => name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

async function run() {
  if (!existsSync(SRC)) { console.log(`No originals folder at ${SRC}; nothing to prepare.`); return; }
  mkdirSync(OUT, { recursive: true });
  const manifest = existsSync(MANIFEST) ? JSON.parse((await import('node:fs')).readFileSync(MANIFEST, 'utf8')) : {};
  const logo = await sharp(LOGO).resize({ height: 70 }).png().toBuffer();
  const logoMeta = await sharp(logo).metadata();

  for (const file of readdirSync(SRC).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
    const key = parse(file).name;
    const meta = await sharp(join(SRC, file)).metadata();
    const title = titleFrom(key);
    const widths = WIDTHS.filter((w) => w < meta.width).concat(Math.min(meta.width, 1600)).filter((v, i, a) => a.indexOf(v) === i);
    const sizes = [];
    for (const w of widths) {
      const h = Math.round((meta.height * w) / meta.width);
      const out = `${key}-${w}.webp`;
      await sharp(join(SRC, file)).rotate().resize({ width: w })
        .composite([{ input: mark(w, h) }])
        .withExif({ IFD0: { Artist: 'Appalachian Sheds Inc.', Copyright: COPYRIGHT, ImageDescription: `${title}. Design rendering, AI-visualized from an original Appalachian Sheds design.` } })
        .withXmp(xmp(title))
        .webp({ quality: 80 })
        .toFile(join(OUT, out));
      sizes.push({ w, h, src: `designs/${out}` });
    }

    // Share image: the rendering above a dark band carrying the logo.
    const band = 110;
    const shareOut = `${key}-share.jpg`;
    // Buildings usually sit near the middle of a rendering, so the crop is centered there.
    const scaledH = Math.round((meta.height * 1200) / meta.width);
    const cropH = 630 - band;
    const top = scaledH > cropH
      ? await sharp(join(SRC, file)).rotate().resize({ width: 1200 })
          .extract({ left: 0, top: Math.max(0, Math.min(scaledH - cropH, Math.round(scaledH * 0.5 - cropH / 2))), width: 1200, height: cropH }).toBuffer()
      : await sharp(join(SRC, file)).rotate().resize({ width: 1200, height: cropH, fit: 'cover' }).toBuffer();
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#2A2A2A' } })
      .composite([
        { input: top, top: 0, left: 0 },
        { input: Buffer.from(`<svg width="1200" height="${band}" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="3" fill="#A68A6A"/></svg>`), top: 630 - band, left: 0 },
        { input: logo, top: 630 - band + Math.round((band - logoMeta.height) / 2), left: 36 },
        { input: Buffer.from(`<svg width="560" height="${band}" xmlns="http://www.w3.org/2000/svg"><text x="524" y="${band / 2 + 4}" text-anchor="end" font-family="Montserrat" font-style="italic" font-weight="700" font-size="22" fill="#E4E1DB">Design rendering · AppalachianSheds.com</text></svg>`), top: 630 - band, left: 640 },
      ])
      .withExif({ IFD0: { Artist: 'Appalachian Sheds Inc.', Copyright: COPYRIGHT } })
      .withXmp(xmp(title))
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(join(OUT, shareOut));

    manifest[key] = { width: meta.width, height: meta.height, sizes, share: `designs/${shareOut}` };
    console.log(`Prepared ${key}: ${sizes.map((s) => s.w).join(', ')} + share image`);
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
}

run();
