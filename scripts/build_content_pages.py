#!/usr/bin/env python3
"""
Convert the recovered options-upgrades/ and planning-guides/ static pages
(49 total: 2 hub pages + 47 content pages) into Astro pages under the shared
Base layout. Unlike the model pages, these already use real image files
(no base64) and mostly share one external stylesheet -- so this script just
extracts <main>, keeps each page's own small style additions (normalizing
the one outlier page's drifted colors), and drops the embedded
header/footer/script since Base.astro now supplies all three.
"""
import re, json, os, glob
from bs4 import BeautifulSoup

SRC = "recovered-chatgpt-build-2026-11-24"
ROOT_OUT = "src/pages"

HEX_MAP = {
    "#2b3030": "#2B3030", "#24312a": "#2B3030", "#242b28": "#2B3030",
    "#26302b": "#2B3030", "#242827": "#2B3030", "#282c2b": "#2B3030",
    "#24302b": "#2B3030", "#272c2b": "#2B3030", "#242a27": "#2B3030",
    "#2a2a2a": "#2B3030",
    "#202827": "#202827", "#19231f": "#202827", "#212727": "#202827",
    "#f8f7f4": "#F8F7F4",
    "#fff": "#FFFFFF", "#fffdf9": "#FFFFFF",
    "#e1ded8": "#E1DED8", "#d6d5cf": "#E1DED8", "#d8d3c9": "#E1DED8",
    "#cecfc8": "#E1DED8", "#d8d7d1": "#E1DED8", "#ebe7de": "#E1DED8",
    "#b79b79": "#C9A06C", "#d2b47c": "#C9A06C", "#e5c79a": "#C9A06C",
    "#a68a6a": "#C9A06C", "#d4b17a": "#C9A06C", "#d9b783": "#C9A06C",
    "#a8794a": "#C9A06C", "#b48a65": "#C9A06C", "#bda07b": "#C9A06C",
    "#314a3e": "#2E473A", "#243b30": "#2E473A", "#2e473a": "#2E473A",
    "#355a47": "#2E473A",
}

def normalize_hex(html: str) -> str:
    def repl(m):
        return HEX_MAP.get(m.group(0).lower(), m.group(0))
    return re.sub(r"#[0-9a-fA-F]{6}\b", repl, html)

def convert(src_path: str, out_path: str):
    raw = normalize_hex(open(src_path, encoding="utf-8").read())
    soup = BeautifulSoup(raw, "html.parser")

    title_tag = soup.find("title")
    page_title = title_tag.get_text(strip=True) if title_tag else os.path.basename(out_path)

    desc_tag = soup.find("meta", attrs={"name": "description"})
    page_desc = desc_tag.get("content", "").strip() if desc_tag else ""
    page_desc = re.sub(r"\s+", " ", page_desc)

    styles = [s.decode_contents() for s in soup.find_all("style")]
    style_css = "\n".join(styles)

    main = soup.find("main")
    if main is None:
        raise RuntimeError(f"No <main> found in {src_path}")
    body_html = main.decode_contents()

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    astro = f"""---
import Base from '../../layouts/Base.astro';
const pageTitle = {json.dumps(page_title)};
const pageDescription = {json.dumps(page_desc)};
---
<Base title={{pageTitle}} description={{pageDescription}}>
<Fragment set:html={{{json.dumps(body_html)}}} />
</Base>

<style is:global>
{style_css}
</style>
"""
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(astro)

count = 0
for section in ["options-upgrades", "planning-guides"]:
    # hub page
    convert(os.path.join(SRC, section, "index.html"), os.path.join(ROOT_OUT, section, "index.astro"))
    count += 1
    # subpages
    for sub_dir in sorted(glob.glob(os.path.join(SRC, section, "*/"))):
        slug = os.path.basename(os.path.normpath(sub_dir))
        src_file = os.path.join(sub_dir, "index.html")
        if not os.path.exists(src_file):
            continue
        out_file = os.path.join(ROOT_OUT, section, f"{slug}.astro")
        convert(src_file, out_file)
        count += 1

print(f"Converted {count} pages")
