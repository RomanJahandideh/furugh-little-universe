"""High-definition photos for the "Under the Glass" magnifier on /nails/.

Usage:  python scripts/make_zoom.py "<folder with the ORIGINAL phone photos>"
Needs:  pip install pillow pillow-heif

Looks for the four magnifier designs (IMG_8329, IMG_3436, IMG_4306, IMG_0291),
keeps full resolution (up to 3200 px on the long side), applies the camera
rotation, keeps the colour profile, and writes public/images/nails-zoom/<id>.webp.
Then updates src/data/zoom-images.json so the glass uses them.
"""
import json, sys
from pathlib import Path
from PIL import Image, ImageOps
try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass

IDS = ["img-8329", "img-3436", "img-4306", "img-0291"]
root = Path(__file__).resolve().parent.parent
out = root / "public" / "images" / "nails-zoom"
out.mkdir(parents=True, exist_ok=True)
manifest_path = root / "src" / "data" / "zoom-images.json"
manifest = json.loads(manifest_path.read_text() or "{}")
files = {p.stem.lower().replace("_", "-"): p for p in Path(sys.argv[1]).iterdir() if p.is_file()}
for id_ in IDS:
    src = files.get(id_)
    if not src:
        print("missing:", id_)
        continue
    im = ImageOps.exif_transpose(Image.open(src))
    icc = im.info.get("icc_profile")
    im = im.convert("RGB")
    im.thumbnail((3200, 3200), Image.LANCZOS)
    im.save(out / f"{id_}.webp", "WEBP", quality=90, method=6, icc_profile=icc)
    manifest[id_] = f"/images/nails-zoom/{id_}.webp"
    print("ok:", id_, im.size)
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
