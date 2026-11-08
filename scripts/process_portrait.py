"""
Make Furugh's cinematic hero photos from one original portrait.

Usage (from the project root):
    python scripts/process_portrait.py "C:/path/to/photo.HEIC"

Writes to public/images/profile/:
  hero-wide-{1200,1920,2560}.webp   wide frame for laptops/desktops
  hero-tall-{640,960,1280}.webp     portrait frame for phones
and prints the blur preview strings to paste into src/data/portrait.ts.

The crop boxes below are fractions of the (rotated) original image, chosen
for the current photo. For a new photo, adjust WIDE_BOX / TALL_BOX.
The grade is gentle (a little contrast, warmth and a soft vignette); skin
tones and the original color profile are kept.
"""

import base64
import io
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageOps

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:
    pass

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images" / "profile"

# (left, top, right, bottom) as fractions of the full photo.
WIDE_BOX = (0.0, 0.405, 0.86, 0.77)  # ~16:9: Furugh right of center, maples on the left for the title
TALL_BOX = (0.22, 0.30, 0.86, 0.86)  # 4:5-ish: Furugh with the red maple behind her


def grade(im: Image.Image) -> Image.Image:
    im = ImageEnhance.Contrast(im).enhance(1.08)
    im = ImageEnhance.Color(im).enhance(1.06)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.02)))
    b = b.point(lambda v: int(v * 0.97))
    im = Image.merge("RGB", (r, g, b))
    # Soft oval vignette.
    w, h = im.size
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).ellipse((-w * 0.15, -h * 0.2, w * 1.15, h * 1.2), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(min(w, h) * 0.18))
    dark = ImageEnhance.Brightness(im).enhance(0.62)
    return Image.composite(im, dark, mask)


def crop(im, box):
    w, h = im.size
    return im.crop((round(box[0] * w), round(box[1] * h), round(box[2] * w), round(box[3] * h)))


def save(im, name, widths, icc):
    for tw in widths:
        out = im if tw >= im.width else im.resize((tw, round(im.height * tw / im.width)), Image.Resampling.LANCZOS)
        out.save(OUT / f"{name}-{tw}.webp", "WEBP", quality=84, method=6, icc_profile=icc)
    tiny = im.resize((24, max(1, round(im.height * 24 / im.width))), Image.Resampling.BILINEAR)
    buf = io.BytesIO()
    tiny.save(buf, "WEBP", quality=45)
    print(f'{name}: {im.width}x{im.height}  blur: "data:image/webp;base64,{base64.b64encode(buf.getvalue()).decode()}"')


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    OUT.mkdir(parents=True, exist_ok=True)
    with Image.open(sys.argv[1]) as raw:
        icc = raw.info.get("icc_profile")
        im = ImageOps.exif_transpose(raw).convert("RGB")
    save(grade(crop(im, WIDE_BOX)), "hero-wide", [1200, 1920, 2560], icc)
    save(grade(crop(im, TALL_BOX)), "hero-tall", [640, 960, 1280], icc)


if __name__ == "__main__":
    main()
