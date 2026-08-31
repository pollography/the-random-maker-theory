"""Generate the public TRMT image-prompt cheat sheet from canonical JSON data."""

from __future__ import annotations

import json
import math
import shutil
from io import BytesIO
from pathlib import Path
from typing import Any

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "src" / "lib" / "data" / "image-prompts.json"
QA_OUTPUT = PROJECT_ROOT / "output" / "pdf" / "trmt-bildprompt-cheatsheet.pdf"
PUBLIC_OUTPUT = PROJECT_ROOT / "static" / "downloads" / "trmt-bildprompt-cheatsheet.pdf"

BACKGROUND = HexColor("#0B0B0B")
SURFACE = HexColor("#191919")
SURFACE_EDGE = HexColor("#312B25")
TEXT = HexColor("#EDE8E0")
MUTED = HexColor("#978D80")
HONEY = HexColor("#D4893E")
TEAL = HexColor("#3AB0A2")
IMAGE_BACKGROUND = HexColor("#F4F4F2")

PAGE_DEFINITIONS = [
    {
        "title": "Menschen & Posen",
        "subtitle": "Blickwinkel, Mimik, Gesten und Kleidung",
        "categories": ["menschen-posen"],
    },
    {
        "title": "Avatare & Transformation",
        "subtitle": "Sticker, Reaktionen, Alter und alternative Versionen",
        "categories": ["avatare-reaktionen", "alter-transformation"],
    },
    {
        "title": "Technik & Wissen",
        "subtitle": "Innenansichten, Funktionsgrafiken und visuelle Erklärungen",
        "categories": ["technik-innenansichten", "infografiken-wissen"],
    },
    {
        "title": "Welten & Geschichten",
        "subtitle": "Filmszenen, neue Umgebungen, Comics und Retroformate",
        "categories": ["welten-filmszenen", "comics-retro"],
    },
    {
        "title": "Spielzeug & Materialien",
        "subtitle": "Sammlerstücke, Miniaturwelten, Stoff, Knete und Glas",
        "categories": ["spielzeug-sammlerstuecke", "miniaturwelten", "stoff-knete-glas"],
    },
    {
        "title": "Porträt & Creator",
        "subtitle": "Profilbilder, Looks, Markenideen und KI-Video-Referenzen",
        "categories": ["portraet-look", "creator-ki-video"],
    },
]


def load_library(path: Path = DATA_PATH) -> dict[str, Any]:
    """Load the canonical prompt library."""

    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def build_page_groups(data: dict[str, Any]) -> list[dict[str, Any]]:
    """Group tested prompts into the six approved PDF pages."""

    tested = [prompt for prompt in data["prompts"] if prompt.get("status") == "tested"]
    groups = []
    for definition in PAGE_DEFINITIONS:
        category_ids = set(definition["categories"])
        prompts = [prompt for prompt in tested if prompt["category"] in category_ids]
        groups.append({**definition, "prompts": prompts})
    return groups


def validate_export(data: dict[str, Any], groups: list[dict[str, Any]]) -> None:
    """Reject incomplete or duplicated export data before drawing anything."""

    tested = [prompt for prompt in data["prompts"] if prompt.get("status") == "tested"]
    exported = [prompt for group in groups for prompt in group["prompts"]]
    tested_commands = [prompt["command"] for prompt in tested]
    exported_commands = [prompt["command"] for prompt in exported]

    if len(groups) != 6:
        raise ValueError(f"Expected 6 page groups, found {len(groups)}")
    if len(tested) != 87:
        raise ValueError(f"Expected 87 tested prompts, found {len(tested)}")
    if sorted(tested_commands) != sorted(exported_commands):
        raise ValueError("PDF page groups do not cover every tested prompt exactly once")
    if len(set(exported_commands)) != len(exported_commands):
        raise ValueError("PDF page groups contain duplicate commands")
    if any(len(group["prompts"]) > 18 for group in groups):
        raise ValueError("A PDF page contains more than 18 prompt cards")

    for prompt in exported:
        image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
        if not image_path.exists():
            raise FileNotFoundError(f"Missing result image for {prompt['command']}: {image_path}")


def grid_columns(item_count: int) -> int:
    """Use larger cards on sparse pages and at most six columns."""

    if item_count <= 9:
        return 3
    if item_count <= 12:
        return 4
    if item_count <= 15:
        return 5
    return 6


def prepare_image(image_path: Path, max_size: tuple[int, int] = (900, 700)) -> BytesIO:
    """Downsample a source image before ReportLab embeds it in the PDF."""

    with Image.open(image_path) as source:
        image = ImageOps.exif_transpose(source)
        if image.mode in {"RGBA", "LA"}:
            background = Image.new("RGB", image.size, "white")
            alpha = image.getchannel("A")
            background.paste(image.convert("RGB"), mask=alpha)
            image = background
        else:
            image = image.convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)

        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=80, optimize=True, progressive=True)
        buffer.seek(0)
        return buffer


def draw_fitted_image(
    pdf: canvas.Canvas,
    image_path: Path,
    x: float,
    y: float,
    width: float,
    height: float,
) -> None:
    """Contain a source image inside the requested rectangle without distortion."""

    prepared = prepare_image(image_path)
    with Image.open(prepared) as source:
        source_width, source_height = source.size
    prepared.seek(0)

    scale = min(width / source_width, height / source_height)
    draw_width = source_width * scale
    draw_height = source_height * scale
    draw_x = x + (width - draw_width) / 2
    draw_y = y + (height - draw_height) / 2

    pdf.setFillColor(IMAGE_BACKGROUND)
    pdf.rect(x, y, width, height, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(prepared),
        draw_x,
        draw_y,
        width=draw_width,
        height=draw_height,
        preserveAspectRatio=True,
        mask="auto",
    )


def draw_card(
    pdf: canvas.Canvas,
    prompt: dict[str, Any],
    x: float,
    y: float,
    width: float,
    height: float,
    columns: int,
) -> None:
    """Draw one compact result preview plus its exact slash command."""

    radius = 6
    padding = 4
    command_height = 20 if columns <= 4 else 17
    image_x = x + padding
    image_y = y + command_height
    image_width = width - 2 * padding
    image_height = height - command_height - padding

    pdf.setFillColor(SURFACE)
    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.roundRect(x, y, width, height, radius, stroke=1, fill=1)

    image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
    draw_fitted_image(pdf, image_path, image_x, image_y, image_width, image_height)

    font_size = 8.2 if columns <= 3 else 7.2 if columns <= 4 else 6.6
    command = prompt["command"]
    while pdf.stringWidth(command, "Courier-Bold", font_size) > width - 2 * padding and font_size > 5.4:
        font_size -= 0.2

    pdf.setFillColor(HONEY)
    pdf.setFont("Courier-Bold", font_size)
    pdf.drawCentredString(x + width / 2, y + 6.2, command)


def draw_page(
    pdf: canvas.Canvas,
    group: dict[str, Any],
    page_number: int,
    page_count: int,
) -> None:
    """Draw one landscape A4 cheat-sheet page."""

    page_width, page_height = landscape(A4)
    margin_x = 24
    top_margin = 22
    header_height = 52
    footer_height = 24
    grid_top = page_height - top_margin - header_height
    grid_bottom = footer_height + 10
    available_width = page_width - 2 * margin_x
    available_height = grid_top - grid_bottom

    pdf.setFillColor(BACKGROUND)
    pdf.rect(0, 0, page_width, page_height, stroke=0, fill=1)

    pdf.setFillColor(HONEY)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(margin_x, page_height - 20, "TRMT BILDPROMPT-CHEAT-SHEET")

    pdf.setFillColor(TEXT)
    pdf.setFont("Helvetica-Bold", 21)
    pdf.drawString(margin_x, page_height - 43, group["title"])

    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 8.5)
    pdf.drawString(margin_x, page_height - 57, group["subtitle"])

    count_label = f"{len(group['prompts'])} getestete Prompts"
    pdf.setFillColor(TEAL)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawRightString(page_width - margin_x, page_height - 43, count_label)

    columns = grid_columns(len(group["prompts"]))
    rows = math.ceil(len(group["prompts"]) / columns)
    gap = 7
    card_width = (available_width - gap * (columns - 1)) / columns
    card_height = (available_height - gap * (rows - 1)) / rows
    last_row_count = len(group["prompts"]) - columns * (rows - 1)

    for index, prompt in enumerate(group["prompts"]):
        row = index // columns
        column = index % columns
        row_count = columns if row < rows - 1 else last_row_count
        row_width = row_count * card_width + (row_count - 1) * gap
        row_offset = (available_width - row_width) / 2 if row == rows - 1 else 0
        x = margin_x + row_offset + column * (card_width + gap)
        y = grid_top - (row + 1) * card_height - row * gap
        draw_card(pdf, prompt, x, y, card_width, card_height, columns)

    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.line(margin_x, 25, page_width - margin_x, 25)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 7)
    pdf.drawString(margin_x, 13, "therandommakertheory.com/tools/bildprompt-library")
    pdf.drawRightString(page_width - margin_x, 13, f"Seite {page_number} / {page_count}")


def generate_pdf(output_path: Path = QA_OUTPUT) -> Path:
    """Generate the canonical PDF and copy identical bytes to the website."""

    data = load_library()
    groups = build_page_groups(data)
    validate_export(data, groups)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    pdf = canvas.Canvas(str(output_path), pagesize=landscape(A4), pageCompression=1)
    pdf.setTitle("TRMT Bildprompt-Cheat-Sheet")
    pdf.setAuthor("The Random Maker Theory")
    pdf.setSubject("87 getestete Bildprompts mit echten Ergebnisbildern")

    for page_number, group in enumerate(groups, start=1):
        draw_page(pdf, group, page_number, len(groups))
        pdf.showPage()

    pdf.save()
    shutil.copyfile(output_path, PUBLIC_OUTPUT)
    return output_path


if __name__ == "__main__":
    generated = generate_pdf()
    print(
        json.dumps(
            {
                "qaOutput": str(generated),
                "publicOutput": str(PUBLIC_OUTPUT),
                "pages": 6,
                "testedPrompts": 87,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
