"""Build the 1200x630 social-share images in public/og/.
Usage: python scripts/make_og.py   (run after process_portrait.py and process_images.py)"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "og"
PAPER, INK = "#F6F3EE", "#161514"
BOLD = "C:/Windows/Fonts/arialbd.ttf"
REG = "C:/Windows/Fonts/arial.ttf"


def font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except OSError:
        return ImageFont.load_default(size)


def home():
    photo = Image.open(PUBLIC / "images/profile/hero-wide-1920.webp").convert("RGB")
    c = ImageOps.fit(photo, (1200, 630), centering=(0.6, 0.45)).convert("RGBA")
    shade = Image.new("RGBA", c.size)
    d = ImageDraw.Draw(shade)
    for x in range(700):
        d.line([(x, 0), (x, 630)], fill=(14, 11, 9, int(215 * (1 - x / 700))))
    c.alpha_composite(shade)
    d = ImageDraw.Draw(c)
    d.text((70, 200), "RETAIL SALES ASSOCIATE", font=font(REG, 26), fill=(255, 255, 255, 200))
    d.text((66, 240), "Furugh", font=font(BOLD, 140), fill="white")
    d.text((70, 420), "I help shoppers find exactly\nwhat they came for.", font=font(REG, 36), fill="white", spacing=10)
    c.convert("RGB").save(OUT / "home.png", optimize=True)


def nails():
    ids = ["img-7897", "img-1486", "img-5950", "img-8329"]
    c = Image.new("RGB", (1200, 630), PAPER)
    d = ImageDraw.Draw(c)
    d.text((60, 70), "Nail art by", font=font(REG, 40), fill=INK)
    d.text((56, 115), "Furugh", font=font(BOLD, 110), fill=INK)
    d.text((60, 520), "60 original, hand-painted designs", font=font(REG, 30), fill="#625d55")
    x = 560
    for i, id_ in enumerate(ids):
        im = ImageOps.fit(Image.open(PUBLIC / f"images/nails/{id_}-480.webp").convert("RGB"), (150, 200 if i % 2 else 240))
        c.paste(im, (x, 120 if i % 2 else 80))
        x += 160
    c.save(OUT / "nails.png", optimize=True)


OUT.mkdir(parents=True, exist_ok=True)
home()
nails()
for stale in ["retail.png"]:
    (OUT / stale).unlink(missing_ok=True)
print("wrote", sorted(p.name for p in OUT.iterdir()))
