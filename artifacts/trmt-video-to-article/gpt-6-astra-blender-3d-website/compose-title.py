"""Add exact TRMT title copy and export the real responsive thumbnail."""

from pathlib import Path
import argparse

from PIL import Image, ImageDraw, ImageFont, ImageOps


def compose(source: Path, output_dir: Path, font_path: Path) -> tuple[Path, Path]:
    if not source.is_file() or not font_path.is_file():
        raise FileNotFoundError("Image source and Inter font must both exist")
    output_dir.mkdir(parents=True, exist_ok=True)
    master = ImageOps.fit(Image.open(source).convert("RGB"), (1600, 900), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(master)
    cream = (249, 239, 224)
    orange = (224, 157, 82)
    safe_right = 625

    lines = (
        ("ASTRA + BLENDER", 168, 50, orange),
        ("3D-MODELL", 274, 84, cream),
        ("AUF DEINER", 386, 74, cream),
        ("WEBSITE", 488, 92, cream),
    )
    for copy, top, size, color in lines:
        font = ImageFont.truetype(str(font_path), size)
        left = 82
        if draw.textbbox((0, 0), copy, font=font)[2] + left > safe_right:
            raise ValueError(f"Copy exceeds the safe left area: {copy}")
        draw.text((left, top), copy, font=font, fill=color)

    master_path = output_dir / "gpt-6-astra-blender-3d-website-1.webp"
    thumb_path = output_dir / "gpt-6-astra-blender-3d-website-1-thumb.webp"
    master.save(master_path, "WEBP", quality=86, method=6)
    master.resize((400, 225), Image.Resampling.LANCZOS).save(
        thumb_path, "WEBP", quality=84, method=6
    )
    return master_path, thumb_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output_dir", type=Path)
    parser.add_argument("font_path", type=Path)
    args = parser.parse_args()
    print("\n".join(map(str, compose(args.source, args.output_dir, args.font_path))))
