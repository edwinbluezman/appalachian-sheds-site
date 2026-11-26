# Appalachian Sheds website

This is the active build of appalachiansheds.com: a real Astro project (`src/`) for the 12
custom building models (Appalachian Farmhouse, Laurel Ridge, Urban Studio, Grand Depot,
Carriage Lane, Nordic Retreat, Foxfire Cottage, Pine Ridge Shed, Appalachian Barn, Appalachian
Firewood Shed, Country Cottage with Shed Dormer, Antique Saltbox), plus the buildings hub and
homepage. Built with `npm install && npm run build`; output goes to `dist/`.

Every push to `main` builds and deploys automatically to Cloudflare Pages via GitHub Actions
(`.github/workflows/deploy.yml`) — requires the `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` secrets to be set in this repo's Settings → Secrets.

## Where this came from

Rebuilt from a ChatGPT/Cloudflare build that was lost when its conversation hit a length
limit — recovered as a static-HTML snapshot in `recovered-chatgpt-build-2026-11-24/` (kept
as the original source of record) and converted into the Astro project above using
`scripts/build_models.py`.

The conversion fixed three things found in the recovered pages:
- **Inconsistent colors** — every model page had its own slightly different color palette
  from being regenerated independently. All pages now share one locked palette (see the
  `:root` variables in `src/layouts/Base.astro`).
- **No real site navigation** — model pages had no way to get to other parts of the site.
  All pages now share one working header/footer (`src/layouts/Base.astro`).
- **Images embedded as base64 text**, bloating pages to 1–4&nbsp;MB each. Replaced with real
  image files in `public/`; the Appalachian Barn page, for example, went from ~1.5&nbsp;MB to
  24&nbsp;KB.

Each model's pricing calculator (the exact approved numbers and logic) was preserved
unchanged — only its surrounding colors and images were normalized.

## What's left to build

Still to convert from `recovered-chatgpt-build-2026-11-24/` into real Astro pages:
options & upgrades pages, planning guides, galleries, and the founder's-letter / our-story
pages. The content is in hand; it just hasn't been converted yet.

## Earlier build removed

A different, earlier build of this site (5 different models, a separate set of planning
guides) previously lived in this repo as reference material. It has been removed to avoid
confusion with the active build above; it remains available in this repo's git history if
ever needed.
