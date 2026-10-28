"""
Turn Furugh's original nail photos into web-ready, color-accurate WebP files.

Usage (from the project root):
    python scripts/process_images.py "<folder with original photos>"

What it does, for every .jpg / .jpeg / .png / .heic in that folder:
  * applies the camera's EXIF rotation, so nothing appears sideways
  * keeps the embedded color profile (iPhones shoot in Display P3, so pinks,
    reds and metallics stay true on modern screens) - no filters, no edits
  * writes three widths to public/images/nails/  (480, 960, 1600 px)
  * writes a tiny blurred preview used while the real photo loads
  * records sizes in src/data/artwork-images.json (generated - don't hand edit)

Then it lists any photo that has no entry yet in src/data/artworks.ts, so you
know which titles / categories / colors to fill in. Photos without an entry
still appear in the gallery (as "Untitled"), so nothing ever breaks.

Requires:  pip install pillow pillow-heif
"""

import base64
import io
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:  # HEIC files will be skipped with a warning
    pillow_heif = None

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "images" / "nails"
MANIFEST = ROOT / "src" / "data" / "artwork-images.json"
METADATA = ROOT / "src" / "data" / "artworks.ts"
WIDTHS = [480, 960, 1600]
QUALITY = 82
EXTS = {".jpg", ".jpeg", ".png", ".heic", ".heif"}


def slug(stem: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", stem.lower()).strip("-")


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text("utf-8")) if MANIFEST.exists() else {}

    files = sorted(p for p in src.iterdir() if p.suffix.lower() in EXTS)
    for path in files:
        if path.suffix.lower() in {".heic", ".heif"} and pillow_heif is None:
            print(f"  skip {path.name}: install pillow-heif for HEIC support")
            continue
        id_ = slug(path.stem)
        with Image.open(path) as raw:
            icc = raw.info.get("icc_profile")
            im = ImageOps.exif_transpose(raw)
            im = im.convert("RGB")
        w, h = im.size
        for target in WIDTHS:
            out = OUT_DIR / f"{id_}-{target}.webp"
            if target >= w:
                resized = im
            else:
                resized = im.resize((target, round(h * target / w)), Image.Resampling.LANCZOS)
            resized.save(out, "WEBP", quality=QUALITY, method=6, icc_profile=icc)
        tiny = im.resize((16, max(1, round(h * 16 / w))), Image.Resampling.BILINEAR)
        buf = io.BytesIO()
        tiny.save(buf, "WEBP", quality=40, icc_profile=icc)
        manifest[id_] = {
            "source": path.name,
            "width": w,
            "height": h,
            "blur": "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode(),
        }
        print(f"  ok  {path.name} -> {id_} ({w}x{h})")

    MANIFEST.write_text(json.dumps(dict(sorted(manifest.items())), indent=2) + "\n", "utf-8")
    print(f"\nWrote {len(manifest)} entries to {MANIFEST.relative_to(ROOT)}")

    known = set(re.findall(r'id:\s*"([^"]+)"', METADATA.read_text("utf-8"))) if METADATA.exists() else set()
    missing = [k for k in manifest if k not in known]
    if missing:
        print("\nThese photos have no details yet. Copy into src/data/artworks.ts and fill in:")
        for k in missing:
            print(
                f'  {{ id: "{k}", title: "Untitled", alt: "Describe the nails here", '
                f'categories: [], colors: [], featured: false, order: 999 }},'
            )


if __name__ == "__main__":
    main()
