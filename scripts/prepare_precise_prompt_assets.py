"""Prepare verified precise-prompt PNGs as deterministic website WebPs."""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from pathlib import Path

from PIL import Image, ImageOps


PROJECT_ROOT = Path(__file__).resolve().parents[1]
RESULT_DIRECTORY = Path("static/images/blog/praezise-bildprompts")
THUMB_DIRECTORY = Path("static/images/blog/ki-bildprompts/thumbs")
HERO_FILENAME = "praezise-bildprompts-weniger-zufall-1.webp"
THUMB_FILENAME = "praezise-bildprompts-weniger-zufall-1-thumb.webp"


@dataclass(frozen=True)
class Asset:
    source_name: str
    output_name: str


RESULT_ASSETS = [
    Asset("01-cyanotype-botanical.png", "01-cyanotype-botanical.webp"),
    Asset("02-risograph-two-ink.png", "02-risograph-two-ink.webp"),
    Asset("03-reduction-linocut.png", "03-reduction-linocut.webp"),
    Asset("04-security-engraving.png", "04-security-engraving.webp"),
    Asset("05-wet-plate-collodion.png", "05-wet-plate-collodion.webp"),
    Asset("06-false-color-infrared.png", "06-false-color-infrared.webp"),
    Asset("07-paper-cut-shadowbox.png", "07-paper-cut-shadowbox.webp"),
    Asset("08-wood-marquetry.png", "08-wood-marquetry.webp"),
    Asset("09-cloisonne-enamel.png", "09-cloisonne-enamel.webp"),
    Asset("10-kintsugi-porcelain-bust.png", "10-kintsugi-porcelain-bust.webp"),
    Asset("11-tufted-textile-portrait.png", "11-tufted-textile-portrait.webp"),
    Asset("12-copper-repousse-medallion.png", "12-copper-repousse-medallion.webp"),
    Asset("13-projection-mapped-bust.png", "13-projection-mapped-bust.webp"),
    Asset("14-prism-refraction-v2.png", "14-prism-refraction.webp"),
    Asset("15-long-exposure-light-painting.png", "15-long-exposure-light-painting.webp"),
    Asset("16-moire-line-portrait-v2.png", "16-moire-line-portrait.webp"),
    Asset("17-solarized-darkroom-print.png", "17-solarized-darkroom-print.webp"),
    Asset("18-caustic-light-portrait.png", "18-caustic-light-portrait.webp"),
    Asset("19-maker-tool-assemblage.png", "19-maker-tool-assemblage.webp"),
    Asset("20-aerial-landscape-portrait.png", "20-aerial-landscape-portrait.webp"),
    Asset("21-shadow-only-portrait.png", "21-shadow-only-portrait.webp"),
    Asset("22-anamorphic-street-mural.png", "22-anamorphic-street-mural.webp"),
    Asset("23-living-topiary-bust.png", "23-living-topiary-bust.webp"),
    Asset("24-ferrofluid-portrait-bust.png", "24-ferrofluid-portrait-bust.webp"),
]

BOARD_ASSETS = [
    Asset("01-print-photo-processes-board.png", "01-print-photo-processes-board.webp"),
    Asset("02-handmade-materials-board.png", "02-handmade-materials-board.webp"),
    Asset("03-optical-darkroom-board-v2.png", "03-optical-darkroom-board.webp"),
    Asset("04-conceptual-motifs-board.png", "04-conceptual-motifs-board.webp"),
]


def open_rgb(path: Path) -> Image.Image:
    """Load an image, apply EXIF orientation, and detach it as RGB."""

    with Image.open(path) as source:
        return ImageOps.exif_transpose(source).convert("RGB")


def save_webp(image: Image.Image, path: Path, quality: int = 86) -> None:
    """Write a stable project WebP without metadata."""

    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="WEBP", quality=quality, method=6, exact=True)


def prepare_assets(source_root: Path, project_root: Path = PROJECT_ROOT) -> list[Path]:
    """Convert the verified source package into all website image assets."""

    if not source_root.is_dir():
        raise FileNotFoundError(f"Precise-prompt source directory not found: {source_root}")

    result_root = project_root / RESULT_DIRECTORY
    thumb_root = project_root / THUMB_DIRECTORY
    blog_root = project_root / "static" / "images" / "blog"
    outputs: list[Path] = []

    for asset in RESULT_ASSETS:
        source_path = source_root / asset.source_name
        image = open_rgb(source_path)
        image = ImageOps.fit(image, (512, 512), Image.Resampling.LANCZOS)
        output_path = result_root / asset.output_name
        save_webp(image, output_path)
        outputs.append(output_path)

        thumbnail = image.resize((480, 480), Image.Resampling.LANCZOS)
        thumb_path = thumb_root / asset.output_name
        save_webp(thumbnail, thumb_path, quality=80)
        outputs.append(thumb_path)

    for asset in BOARD_ASSETS:
        source_path = source_root / asset.source_name
        image = open_rgb(source_path)
        image = ImageOps.fit(image, (1200, 800), Image.Resampling.LANCZOS)
        output_path = result_root / asset.output_name
        save_webp(image, output_path, quality=84)
        outputs.append(output_path)

    concept_board = open_rgb(source_root / "04-conceptual-motifs-board.png")
    hero = ImageOps.fit(concept_board, (1200, 675), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    hero_path = blog_root / HERO_FILENAME
    save_webp(hero, hero_path, quality=85)
    outputs.append(hero_path)

    thumbnail = hero.resize((400, 225), Image.Resampling.LANCZOS)
    thumb_path = blog_root / THUMB_FILENAME
    save_webp(thumbnail, thumb_path, quality=80)
    outputs.append(thumb_path)

    return outputs


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", required=True, type=Path)
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    generated = prepare_assets(args.source_dir)
    print(f"Prepared {len(generated)} WebP assets.")
