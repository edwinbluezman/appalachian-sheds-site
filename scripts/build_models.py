#!/usr/bin/env python3
"""
One-time conversion: recovered ChatGPT static HTML model pages -> Astro pages.
Normalizes the drifting per-page color palettes to one locked ASI palette,
replaces inline base64 images with real asset files, and separates the
pricing-calculator script so it keeps running unchanged.
"""
import re, json, os, shutil
from bs4 import BeautifulSoup

SRC = "recovered-chatgpt-build-2026-11-24"
OUT_PAGES = "src/pages/buildings"
PUBLIC = "public"

MODELS = [
    "antique-saltbox", "appalachian-barn", "appalachian-farmhouse",
    "appalachian-firewood-shed", "carriage-lane", "country-cottage-with-shed-dormer",
    "foxfire-cottage", "grand-depot", "laurel-ridge", "nordic-retreat",
    "pine-ridge-shed", "urban-studio",
]

# Old hex (case-insensitive) -> canonical ASI palette
HEX_MAP = {
    "#2b3030": "#2B3030", "#24312a": "#2B3030", "#242b28": "#2B3030",
    "#26302b": "#2B3030", "#242827": "#2B3030", "#282c2b": "#2B3030",
    "#24302b": "#2B3030", "#272c2b": "#2B3030", "#242a27": "#2B3030",
    "#202827": "#202827", "#19231f": "#202827", "#212727": "#202827",
    "#f8f7f4": "#F8F7F4",
    "#fff": "#FFFFFF", "#fffdf9": "#FFFFFF",
    "#e1ded8": "#E1DED8", "#d6d5cf": "#E1DED8", "#d8d3c9": "#E1DED8",
    "#cecfc8": "#E1DED8", "#d8d7d1": "#E1DED8", "#ebe7de": "#E1DED8",
    "#b79b79": "#C9A06C", "#d2b47c": "#C9A06C", "#e5c79a": "#C9A06C",
    "#a68a6a": "#C9A06C", "#d4b17a": "#C9A06C", "#d9b783": "#C9A06C",
    "#a8794a": "#C9A06C",
    "#314a3e": "#2E473A", "#243b30": "#2E473A", "#2e473a": "#2E473A",
    "#355a47": "#2E473A",
}

def normalize_hex(html: str) -> str:
    def repl(m):
        old = m.group(0).lower()
        return HEX_MAP.get(old, m.group(0))
    return re.sub(r"#[0-9a-fA-F]{6}\b", repl, html)

def title_case_name(slug: str) -> str:
    small = {"with", "shed", "dormer"}
    words = slug.split("-")
    return " ".join(w.capitalize() for w in words)

def gallery_files(slug: str):
    d = os.path.join(SRC, "assets/gallery/model-photos", slug)
    if not os.path.isdir(d):
        return []
    return sorted(os.listdir(d))

def real_image_pool(slug: str):
    pool = []
    if os.path.exists(os.path.join(SRC, "assets/models", f"{slug}.jpg")):
        pool.append(f"/models/{slug}.jpg")
    if os.path.exists(os.path.join(SRC, "assets/standard-features", f"{slug}.png")):
        pool.append(f"/standard-features/{slug}.png")
    for fn in gallery_files(slug):
        pool.append(f"/gallery/model-photos/{slug}/{fn}")
    if not pool:
        pool = [f"/models/{slug}.jpg"]
    return pool

results = []

for slug in MODELS:
    path = os.path.join(SRC, "approved-pages", f"{slug}.html")
    raw = open(path, encoding="utf-8").read()
    raw = normalize_hex(raw)
    soup = BeautifulSoup(raw, "html.parser")

    title_tag = soup.find("title")
    page_title = title_tag.get_text(strip=True) if title_tag else title_case_name(slug)

    style_tag = soup.find("style")
    style_css = style_tag.decode_contents() if style_tag else ""

    body = soup.find("body")

    # Pull out the inline pricing-calculator script (no src attr) to keep verbatim;
    # drop external shared scripts (site-controls.js / gallery-placeholders.js) —
    # the new shared layout provides nav behavior, and galleries are rendered as
    # real <img> below rather than injected by JS.
    inline_script = ""
    for sc in body.find_all("script"):
        if sc.get("src"):
            sc.decompose()
        else:
            if sc.string:
                inline_script += sc.string
            sc.decompose()

    # Swap every base64 image for a real asset file, in order of appearance.
    pool = real_image_pool(slug)
    imgs = body.find_all("img", src=re.compile(r"^data:image"))
    for i, img in enumerate(imgs):
        img["src"] = pool[i] if i < len(pool) else pool[0]

    body_html = body.decode_contents()

    out_dir = os.path.join(OUT_PAGES)
    os.makedirs(out_dir, exist_ok=True)

    astro = f"""---
import Base from '../../layouts/Base.astro';
const pageTitle = {json.dumps(page_title)};
---
<Base title={{pageTitle}}>
<Fragment set:html={{{json.dumps(body_html)}}} />
</Base>

<style is:global>
{style_css}
</style>

<script is:inline>
{inline_script}
</script>
"""
    with open(os.path.join(out_dir, f"{slug}.astro"), "w", encoding="utf-8") as f:
        f.write(astro)

    results.append(slug)

print("Generated:", len(results), "model pages")
