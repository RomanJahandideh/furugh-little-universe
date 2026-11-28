"""Publish Forough's nail certificate exactly as it is.

Usage:  python scripts/process_certificate.py "<path to certificate.pdf>"
Needs:  pip install pymupdf pillow

Copies the PDF unchanged to public/certificates/nail-certificate.pdf and renders
each page to WebP (public/certificates/nail-certificate-<n>.webp) so the page can
show it on every phone. Then writes src/data/certificate-pages.json.
Check the PDF for ID numbers or QR codes BEFORE running this: whatever is in the
file is what visitors will see and download.
"""
import json, shutil, sys
from pathlib import Path
import pymupdf
from PIL import Image

src = Path(sys.argv[1])
root = Path(__file__).resolve().parent.parent
out = root / "public" / "certificates"
out.mkdir(parents=True, exist_ok=True)
for old in out.glob("nail-certificate*"):
    old.unlink()
shutil.copyfile(src, out / "nail-certificate.pdf")
pages = []
doc = pymupdf.open(src)
for i, page in enumerate(doc, 1):
    zoom = 1600 / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom))
    im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    name = f"nail-certificate-{i}.webp"
    im.save(out / name, "WEBP", quality=86)
    pages.append({"src": f"/certificates/{name}", "width": im.width, "height": im.height})
(root / "src" / "data" / "certificate-pages.json").write_text(json.dumps({"pdf": "/certificates/nail-certificate.pdf", "pages": pages}, indent=2))
print(f"ok: {len(pages)} page(s)")
