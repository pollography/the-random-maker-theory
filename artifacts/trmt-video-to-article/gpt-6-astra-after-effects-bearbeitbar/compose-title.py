"""Add the exact TRMT title copy to the approved 16:9 image base.

The source image is generated separately. This deterministic formatting step keeps
the German text exact and exports the real 400 x 225 thumbnail.
"""

from pathlib import Path
import argparse

from PIL import Image, ImageDraw, ImageFont, ImageOps


def compose(source: Path, output_dir: Path, font_path: Path) -> tuple[Path, Path]:
    if not source.is_file() or not font_path.is_file():
        raise FileNotFoundError("Image source and Inter font must both exist")
    output_dir.mkdir(parents=True, exist_ok=True)
    master = ImageOps.fit(Image.open(source).convert("RGB"), (1600, 900), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(master)
    font_small = ImageFont.truetype(str(font_path), 58)
    font_big = ImageFont.truetype(str(font_path), 91)
    cream = (249, 239, 224)
    orange = (223, 160, 91)

    for copy, top, font, color in (
        ("AFTER EFFECTS", 200, font_small, orange),
        ("MIT GPT-6 ASTRA", 279, font_small, cream),
        ("ANIMATION", 396, font_big, cream),
        ("BLEIBT", 499, font_big, cream),
        ("ÄNDERBAR", 602, font_big, cream),
    ):
        left = 88
        if draw.textbbox((0, 0), copy, font=font)[2] + left > 635:
            raise ValueError(f"Copy exceeds the safe left area: {copy}")
        draw.text((left, top), copy, font=font, fill=color)

    master_path = output_dir / "gpt-6-astra-after-effects-bearbeitbar-1.webp"
    thumb_path = output_dir / "gpt-6-astra-after-effects-bearbeitbar-1-thumb.webp"
    master.save(master_path, "WEBP", quality=86, method=6)
    master.resize((400, 225), Image.Resampling.LANCZOS).save(thumb_path, "WEBP", quality=84, method=6)
    return master_path, thumb_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("font_path", type=Path)
    args = parser.parse_args()
    print("\n".join(map(str, compose(args.source, args.output_dir, args.font_path))))
