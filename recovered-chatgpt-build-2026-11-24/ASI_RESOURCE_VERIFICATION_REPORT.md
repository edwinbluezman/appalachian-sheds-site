# ASI Resource Center — Technical & Editorial Verification Pass

**Date:** November 22, 2026  
**Status:** Internal editorial review; NOT production certification

## Scope and methodology

- Audited **49 actual customer-facing resource article HTML files** from the approved navigation-fixed Cloudflare staging ZIP: 24 guides + 25 option pages.
- Tested page bodies for nine categories of potentially consequential statements; exported one row per page/topic to `RESOURCE_CONTENT_RISK_REGISTER.csv` and page-level metrics to `RESOURCE_PAGE_BY_PAGE_AUDIT.csv`.
- Compared high-risk claims against official public sources. This automated rule-based scan is a triage method, not a substitute for an engineer, local permit official, manufacturer or ASI management reviewing each article.
- **Preserved all 12 approved pricing pages and the working navigation**. Only the warranty guide received a narrowly scoped customer-copy correction, removing the previously superseded promotional reference and internal wording.
- Kept the Resource Center articles blocked from indexing until editorial sign-off.

## Findings and publication blockers

1. **Warranty:** The legacy 30-year structural reference still appeared in the warranty article, even as a warning. It has been removed from customer copy. Verify the actual issued workmanship-warranty form, limits, excluded work, claim procedure and manufacturer documents before describing a coverage duration as contractual.
2. **Permits and land use:** Do not claim any universal no-permit square-foot threshold. Ohio exemptions and review scope depend on the exact classification; zoning certificates, HOA rules and intended occupancy may still apply. Kentucky and Indiana have separate authorities. Obtain exact address-based confirmation.
3. **Low-slope roofing:** The approved Urban Studio and Laurel Ridge have 2/12 slopes. ARMA describes special asphalt-shingle procedures from 2/12 to under 4/12, but the exact shingle manufacturer must also permit the chosen assembly. Obtain roofing-system approval and details before release.
4. **Foundations / structure:** ASI's approved baseline includes 4×6 pressure-treated beams, 16×16×4-inch concrete support pads, 2×6 PT floor joists at 16 inches OC, ¾-inch PT exterior-rated plywood, and a stated maximum 6-inch site leveling allowance; support/anchorage and engineering remain size/load dependent. Do not infer universal pad spacing or complete structural adequacy from these baseline material sizes.
5. **Site work:** OHIO811 covers public/member utilities; privately owned service lines may require a private locator. Different state procedures apply across the Tri-State.
6. **Siding / finishes:** Roseburg DuraTemp recommends appropriate coating within 30 days; LP siding has product-specific clearance and installation requirements. ASI standard buildings are exterior weather-tight shells with finishing requirements and optional ASI finishing services separately scoped.
7. **On-site messaging:** Every ASI model is **built on site**. Competitor delivery comparisons may be educational but must never imply ASI delivers completed buildings.
8. **Editorial duplication:** Repeat headings and repeated copy remain on some pages; the audit CSV counts immediately adjacent identical H2/H3 titles for systematic editing.
9. **Noindex and technical approval:** Keep staging content unindexed until written operational and legal/technical review; page counts and link checks do not establish technical accuracy.

## Authoritative external references, checked this pass

- ARMA — Installation of Asphalt Shingles on Lower Sloped Roofs: https://www.asphaltroofing.org/installation-of-asphalt-shingles-on-lower-sloped-roofs/
- Ohio Revised Code §519.17 — Township zoning certificate: https://codes.ohio.gov/ohio-revised-code/section-519.17
- Ohio Revised Code §303.17 — County zoning certificate: https://codes.ohio.gov/ohio-revised-code/section-303.17
- Ohio Administrative Code rule 4101:10-1-01 — Classification-specific provisions: https://codes.ohio.gov/ohio-administrative-code/rule-4101%3A10-1-01
- OHIO811 — Homeowner responsibility and private utility locates: https://ohio811.org/homeowners/importantinfo/
- AWPA — Treated wood use categories and ground contact: https://awpa.com/info/technical/homeowners
- LP — SmartSide panel installation: https://lpcorp.com/resources/product-literature/smartside/installation-instructions/lp-smartside-panel-siding
- Roseburg — DuraTemp siding installation: https://www.roseburg.com/wp-content/uploads/2021/01/DuraTemp_Install_081717-2.pdf
- U.S. DOE — Grade slopes away from foundations: https://bsesc.energy.gov/energy-basics/land-graded-final-grade-slopes-away-foundation
- Google Search Central — Helpful, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Next production gates

**Gate A — ASI internal sign-off:** Construction baselines, exact warranty form, options scope, optional painting terms, service area, model roof specifications.  
**Gate B — professional/code sign-off:** Low-slope roof assemblies and shingle warranty, foundations/anchors by configuration, jurisdiction-specific code and electrical/occupancy claims.  
**Gate C — final editorial pass:** Resolve duplicates, verify every reference and outgoing link, create concise unique answers and related model links; verify ADA/accessibility and mobile readability.  
**Gate D — native Astro conversion:** Use collections/templates, canonical routes, legacy 301 redirect map, publishable metadata and sitemap, consistent menus and inquiry conversion.  
**Gate E — launch check:** Only remove `noindex` after the above gates are satisfied.

## Safe layout cleanup completed

Removed **80 redundant H3 headings** that repeated the immediately preceding H2 verbatim, without changing their surrounding body paragraphs. See `EDITORIAL_HEADINGS_CORRECTED.csv`. No construction or pricing claims were altered.
