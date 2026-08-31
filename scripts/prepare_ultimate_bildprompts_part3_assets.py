"""Prepare optimized TRMT web assets for Ultimate Bildprompts Part 3."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BLOG_IMAGES = PROJECT_ROOT / "static" / "images" / "blog"
PROMPT_IMAGES = BLOG_IMAGES / "ki-bildprompts"
PROMPT_THUMBS = PROMPT_IMAGES / "thumbs"

RESULTS = [
    ("01-behind-the-scenes.png", "87-behind-the-scenes.webp"),
    ("02-relighting-grid.png", "88-relighting-grid.webp"),
    ("03-lens-grid.png", "89-lens-grid.webp"),
    ("04-viseme-sheet.png", "90-viseme-sheet.webp"),
    ("05-walk-cycle.png", "91-walk-cycle.webp"),
    ("06-shot-breakdown.png", "92-shot-breakdown.webp"),
    ("07-thermography.png", "93-thermography.webp"),
    ("08-schlieren.png", "94-schlieren.webp"),
    ("09-scanography.png", "95-scanography.webp"),
    ("10-photogram.png", "96-photogram.webp"),
    ("11-chemigram.png", "97-chemigram.webp"),
    ("12-slit-scan.png", "98-slit-scan.webp"),
    ("13-string-art.png", "99-string-art.webp"),
    ("14-wire-portrait.png", "100-wire-portrait.webp"),
    ("15-pressed-flowers.png", "101-pressed-flowers.webp"),
    ("16-sand-sculpture.png", "102-sand-sculpture.webp"),
    ("17-ice-sculpture.png", "103-ice-sculpture.webp"),
    ("18-fore-edge-painting.png", "104-fore-edge-painting.webp"),
    ("19-drone-light-show.png", "105-drone-light-show.webp"),
    ("20-cymatics.png", "106-cymatics.webp"),
    ("21-pcb-portrait.png", "107-pcb-portrait.webp"),
    ("22-oscilloscope-portrait.png", "108-oscilloscope-portrait.webp"),
    ("23-lenticular-portrait.png", "109-lenticular-portrait.webp"),
    ("24-hologram.png", "110-hologram.webp"),
    ("25-raw-phone-night.png", "111-raw-phone-night.webp"),
    ("26-point-and-shoot.png", "112-point-and-shoot.webp"),
    ("27-digicam-2003.png", "113-digicam-2003.webp"),
    ("28-soft-mist-portrait.png", "114-soft-mist-portrait.webp"),
    ("29-direct-flash.png", "115-direct-flash.webp"),
    ("30-equirectangular-360.png", "116-equirectangular-360.webp"),
    ("31-crowd-search.png", "117-crowd-search.webp"),
    ("32-creator-livestream.png", "118-creator-livestream.webp"),
    ("33-product-angle-grid.png", "119-product-angle-grid.webp"),
    ("34-product-detail-page.png", "120-product-detail-page.webp"),
    ("35-museum-breakdown.png", "121-museum-breakdown.webp"),
    ("36-premium-product-ad.png", "122-premium-product-ad.webp"),
]


def open_rgb(path: Path) -> Image.Image:
    with Image.open(path) as source:
        return ImageOps.exif_transpose(source).convert("RGB")


def save_contained(source: Image.Image, destination: Path, max_size: tuple[int, int], quality: int) -> None:
    image = source.copy()
    image.thumbnail(max_size, Image.Resampling.LANCZOS)
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "WEBP", quality=quality, method=6)


def save_thumbnail(source: Image.Image, destination: Path) -> None:
    contained = ImageOps.contain(source, (400, 300), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (400, 300), "#f4f4f2")
    canvas.paste(contained, ((400 - contained.width) // 2, (300 - contained.height) // 2))
    destination.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(destination, "WEBP", quality=78, method=6)


def save_hero(source: Image.Image, destination: Path, size: tuple[int, int], quality: int) -> None:
    hero = ImageOps.fit(source, size, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    destination.parent.mkdir(parents=True, exist_ok=True)
    hero.save(destination, "WEBP", quality=quality, method=6)


def save_overview(source: Image.Image, destination: Path) -> None:
    """Export only the 36-result grid, without the source sheet's stale round label."""

    header_height = round(source.height * 0.085)
    result_grid = source.crop((0, header_height, source.width, source.height))
    save_contained(result_grid, destination, (1800, 1800), 82)


def prepare(source_dir: Path) -> dict[str, object]:
    missing = [name for name, _ in RESULTS if not (source_dir / name).exists()]
    for extra in ["board-04-maker-wow.png", "kontaktbogen.png", "source-camera.webp"]:
        if not (source_dir / extra).exists():
            missing.append(extra)
    if missing:
        raise FileNotFoundError(f"Missing source assets: {', '.join(missing)}")

    PROMPT_IMAGES.mkdir(parents=True, exist_ok=True)
    PROMPT_THUMBS.mkdir(parents=True, exist_ok=True)
    outputs: list[Path] = []

    for source_name, destination_name in RESULTS:
        image = open_rgb(source_dir / source_name)
        full_path = PROMPT_IMAGES / destination_name
        thumb_path = PROMPT_THUMBS / destination_name
        save_contained(image, full_path, (1400, 1400), 82)
        save_thumbnail(image, thumb_path)
        outputs.extend([full_path, thumb_path])

    hero_source = open_rgb(source_dir / "board-04-maker-wow.png")
    hero_path = BLOG_IMAGES / "ultimate-bildprompts-part-3-1.webp"
    hero_thumb_path = BLOG_IMAGES / "ultimate-bildprompts-part-3-1-thumb.webp"
    save_hero(hero_source, hero_path, (1200, 675), 85)
    save_hero(hero_source, hero_thumb_path, (400, 225), 80)
    outputs.extend([hero_path, hero_thumb_path])

    overview_source = open_rgb(source_dir / "kontaktbogen.png")
    overview_path = BLOG_IMAGES / "ultimate-bildprompts-part-3-overview.webp"
    save_overview(overview_source, overview_path)
    outputs.append(overview_path)

    camera_source = open_rgb(source_dir / "source-camera.webp")
    camera_path = BLOG_IMAGES / "ultimate-bildprompts-part-3-camera-source.webp"
    save_contained(camera_source, camera_path, (1200, 1200), 84)
    outputs.append(camera_path)

    if len(outputs) != 76 or any(not path.exists() or path.stat().st_size < 3_000 for path in outputs):
        raise RuntimeError("Asset export validation failed")

    return {
        "resultImages": len(RESULTS),
        "thumbnails": len(RESULTS),
        "supportingAssets": 4,
        "outputFiles": len(outputs),
        "bytes": sum(path.stat().st_size for path in outputs),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path, required=True)
    args = parser.parse_args()
    print(json.dumps(prepare(args.source_dir.resolve()), indent=2))


if __name__ == "__main__":
    main()
