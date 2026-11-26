# ASI Options Pricing & Visual Gallery — Research Review (2026-11-22)

This is a **research-stage website preview, not a current ASI price list**. Twenty-five option pages now show their relevant recovered monetary ranges or expressly indicate that no defensible universal amount is in the archival source.

## Pricing provenance
- 493 de-duplicated historical monetary-reference instances captured from the original 2026-10-30 Divi 4 exports, many of them repetitive and some not option sell prices. See `LEGACY_OPTION_PRICE_EVIDENCE.csv`.
- Curated line items on the site were selected only where the exact number and its unit/scope were read in the original JSON. No automatic inflation factor was applied.
- The model siding multipliers (+8%, +11%, +22.5%, +24%) come from the subsequently approved model-pricing schedule and are already reflected in model calculators. **Never add them twice.**
- Site & Foundation Options lacks a defensible standard add-on range; provide a written proposal after engineering/site scope review. No prices were invented.
- Market benchmarks are **comparisons**. Most regional dealers sell prefabricated sheds and have different included work, operating models, grade of materials, and scopes; these numbers do not verify ASI labor/install totals. Source URLs in the benchmark CSV.
- ASI standard included 4×6 PT beams, concrete support pads (16×16×4), 2×6 PT joists at 16 OC, 3/4 PT plywood, two traditional windows and Craftsman double doors, ridge/soffit vent package, cedar trim and architectural shingles MUST NOT be sold as default-priced extras.
- Historical per-square-foot total system cost cannot be treated as an incremental upgrade price.
- Currency references need current supplier quotations, actual ASI estimating, quantities, labor, mobilization, permits, crew burden, engineering and approval before any customer-facing quote.

## Gallery decision
16 of 25 categories receive three **planned image positions** when visual evidence improves understanding of material, size, access, proportions, detailing, or finished appearance. The remaining category content should remain text, measurements or diagrams; imagery is not valuable solely for decoration.

## Current deliverables
- `options-gallery/` visual review hub with 16 categories, photo assignment slots and interactive filters.
- `options-upgrades/<slug>/` review pages with descriptive historical price tables and standardized disclaimers.
- `assets/asi-option-pricing-gallery.css` shared style.
- `OPTIONS_MASTER_PRICING_RECONCILIATION_DRAFT.csv` item-level source/status register.
- `CINCINNATI_TRI_STATE_MARKET_BENCHMARKS.csv` external competitors and meaningful limitations.
- `LEGACY_OPTION_PRICE_EVIDENCE.csv` source-derived extraction, audit only.
- `OPTION_IMAGE_DECISION_MATRIX.json` structured image plan.

## Approval gates
1. Verify assumptions and actual ASI contractor costs for each monetary amount.
2. Separate standard options, replacement substitutions and true added openings; account for any included allowances.
3. Verify product compatibility and local permitting with jurisdiction/engineer/electrician as applicable.
4. Replace image placeholders with approved authentic ASI materials / clearly marked conceptual illustrations.
5. Retain noindex on the review pages until final pricing and content approval.
6. Validate local Cloudflare staging (desktop/mobile) before launch.
