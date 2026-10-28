"""Build the three 1200x630 social-share images in public/og/ from real gallery photos.
Usage: python scripts/make_og.py   (run after process_images.py)"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
NAILS = ROOT / "public" / "images" / "nails"
OUT = ROOT / "public" / "og"
INK, PAPER, PINK, BUTTER = "#191919", "#FAFAF7", "#FF75B7", "#FFE17B"
FONT = "C:/Windows/Fonts/georgiab.ttf"
SANS = "C:/Windows/Fonts/segoeui.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default(size)


def card(id_, w, angle):
    im = Image.open(NAILS / f"{id_}-960.webp").convert("RGB")
    im = ImageOps.fit(im, (w, round(w * 4 / 3)))
    framed = Image.new("RGB", (im.width + 16, im.height + 16), "white")
    framed.paste(im, (8, 8))
    framed = ImageOps.expand(framed, border=4, fill=INK)
    return framed.convert("RGBA").rotate(angle, expand=True, resample=Image.Resampling.BICUBIC)


def make(name, bg, title, sub, photos, size=96):
    c = Image.new("RGBA", (1200, 630), bg)
    d = ImageDraw.Draw(c)
    d.text((70, 150), title, font=font(FONT, size), fill=INK, spacing=6)
    d.text((74, 440), sub, font=font(SANS, 38), fill=INK)
    d.rounded_rectangle((70, 520, 520, 572), radius=26, outline=INK, width=3, fill="white")
    d.text((92, 527), "Furugh's Little Universe", font=font(SANS, 30), fill=INK)
    for id_, x, y, w, a in photos:
        k = card(id_, w, a)
        c.alpha_composite(k, (x, y))
    c.convert("RGB").save(OUT / f"{name}.png", optimize=True)


OUT.mkdir(parents=True, exist_ok=True)
make("home", PAPER, "Hi, I'm\nFurugh.", "I work with people. And I make tiny masterpieces.",
     [("img-1486", 760, 60, 230, -6), ("img-2848", 930, 150, 220, 7)])
make("nails", PINK, "Tiny Canvases.\nBig Personalities.", "Nail art by Furugh",
     [("img-7897", 720, 90, 190, -8), ("img-5950", 870, 40, 190, 4), ("img-8329", 990, 170, 180, 10)], size=72)
make("retail", BUTTER, "Meet Furugh.", "Retail sales professional. People person.", [])
print("wrote", [p.name for p in OUT.iterdir()])
