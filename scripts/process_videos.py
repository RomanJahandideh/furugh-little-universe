"""
Turn Forough's phone videos into small web videos for the Decorative Painting page.

Usage (from the project root):
    pip install imageio-ffmpeg pillow
    python scripts/process_videos.py "<folder with the original .MOV files>" [clip-id ...]

For each clip listed in CLIPS below it writes to public/videos/:
  <id>.mp4   H.264, 720p short side, no audio, streams while it downloads
  <id>.webp  poster frame shown before the video starts
Audio is removed on purpose: phone clips often carry background talk, and
the videos play silently on loop on the page.
"""
import subprocess, sys
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

FF = imageio_ffmpeg.get_ffmpeg_exe()
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "videos"

# id: (source file, start second, length in seconds or None for all, poster second, crop or None)
# crop is ffmpeg "w:h:x:y", used to cut away borders (IMG_0772 is a screen recording
# with a grey frame around the actual footage).
CLIPS = {
    "process-wall": ("2023_03_09_19_16_IMG_0772.MOV", 0, None, 12, "452:796:136:292"),
    "process-cornice": ("2023_05_29_11_02_IMG_2560.MOV", 0, None, 5, None),
    "process-panel": ("IMG_0822.MOV", 0, None, 3, None),
    "dome-hall": ("IMG_8305.MOV", 0, None, 4, None),
    "blossom-oval": ("IMG_1040.MOV", 0, None, 12, None),
    "grand-hall": ("IMG_8285.MOV", 26, 30, 8, None),
}


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    only = sys.argv[2:]
    for vid, (name, start, length, poster_t, crop) in CLIPS.items():
        if only and vid not in only:
            continue
        inp = src / name
        out = OUT / f"{vid}.mp4"
        cmd = [FF, "-hide_banner", "-loglevel", "error", "-y", "-ss", str(start), "-i", str(inp)]
        if length:
            cmd += ["-t", str(length)]
        cmd += [
            "-vf", (f"crop={crop},fps=30" if crop else "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)',fps=30"),
            "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-profile:v", "high",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", str(out),
        ]
        subprocess.run(cmd, check=True)
        png = OUT / f"{vid}.png"
        subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", "-ss", str(poster_t), "-i", str(out), "-frames:v", "1", str(png)], check=True)
        with Image.open(png) as im:
            w, h = im.size
            im.convert("RGB").save(OUT / f"{vid}.webp", "WEBP", quality=78)
        png.unlink()
        print(f"{vid}: {w}x{h}  {out.stat().st_size / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
