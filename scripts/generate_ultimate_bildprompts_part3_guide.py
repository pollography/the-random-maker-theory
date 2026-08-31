"""Generate the detailed twelve-page TRMT Part 3 prompt guide."""

from __future__ import annotations

import json
import shutil
from io import BytesIO
from pathlib import Path
from typing import Any

from PIL import Image, ImageOps
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "src" / "lib" / "data" / "image-prompts.json"
QA_OUTPUT = PROJECT_ROOT / "output" / "pdf" / "trmt-ultimate-bildprompts-part-3.pdf"
PUBLIC_OUTPUT = PROJECT_ROOT / "static" / "downloads" / "trmt-ultimate-bildprompts-part-3.pdf"

BACKGROUND = HexColor("#0B0B0B")
SURFACE = HexColor("#191919")
SURFACE_EDGE = HexColor("#312B25")
TEXT = HexColor("#EDE8E0")
MUTED = HexColor("#A99F92")
HONEY = HexColor("#D4893E")
TEAL = HexColor("#3AB0A2")
PARTIAL = HexColor("#F0B35A")
IMAGE_BACKGROUND = HexColor("#F4F4F2")


def load_library(path: Path = DATA_PATH) -> dict[str, Any]:
    """Load the canonical prompt library."""

    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def build_page_groups(data: dict[str, Any]) -> list[dict[str, Any]]:
    """Split the 36 Part 3 prompts into twelve stable groups of three."""

    prompts = [
        prompt
        for prompt in data["prompts"]
        if prompt.get("series") == "ultimate-bildprompts-part-3"
        and prompt.get("status") == "tested"
    ]
    return [
        {"prompts": prompts[index : index + 3]}
        for index in range(0, len(prompts), 3)
    ]


def validate_export(groups: list[dict[str, Any]]) -> None:
    """Reject incomplete or inconsistent guide data before rendering."""

    prompts = [prompt for group in groups for prompt in group["prompts"]]
    commands = [prompt["command"] for prompt in prompts]
    verdicts = [prompt["verdict"] for prompt in prompts]

    if len(groups) != 12 or any(len(group["prompts"]) != 3 for group in groups):
        raise ValueError("Expected twelve pages containing three prompts each")
    if len(prompts) != 36 or len(set(commands)) != 36:
        raise ValueError("Expected 36 unique Part 3 prompts")
    if verdicts.count("PASS") != 32 or verdicts.count("TEILWEISE") != 4:
        raise ValueError("Expected the verified 32 PASS to 4 TEILWEISE split")

    for prompt in prompts:
        if prompt.get("promptType") != "detailed" or len(prompt.get("promptText", "")) <= 80:
            raise ValueError(f"Incomplete detailed prompt: {prompt['command']}")
        image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
        if not image_path.exists():
            raise FileNotFoundError(f"Missing result image for {prompt['command']}: {image_path}")


def prepare_image(image_path: Path, max_size: tuple[int, int] = (1200, 900)) -> BytesIO:
    """Downsample and flatten one result image for compact PDF embedding."""

    with Image.open(image_path) as source:
        image = ImageOps.exif_transpose(source)
        if image.mode in {"RGBA", "LA"}:
            background = Image.new("RGB", image.size, "white")
            background.paste(image.convert("RGB"), mask=image.getchannel("A"))
            image = background
        else:
            image = image.convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=83, optimize=True, progressive=True)
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
    """Contain an image without cropping or distortion."""

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
    pdf.roundRect(x, y, width, height, 4, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(prepared),
        draw_x,
        draw_y,
        width=draw_width,
        height=draw_height,
        preserveAspectRatio=True,
        mask="auto",
    )


def wrap_text(text: str, font_name: str, font_size: float, max_width: float) -> list[str]:
    """Wrap words to measured ReportLab line widths."""

    lines: list[str] = []
    current = ""
    for word in text.split():
        candidate = word if not current else f"{current} {word}"
        if stringWidth(candidate, font_name, font_size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_card(
    pdf: canvas.Canvas,
    prompt: dict[str, Any],
    x: float,
    y: float,
    width: float,
    height: float,
) -> None:
    """Draw one full prompt card with image, verdict and tested text."""

    padding = 10
    image_height = 185
    image_y = y + height - padding - image_height

    pdf.setFillColor(SURFACE)
    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.roundRect(x, y, width, height, 8, stroke=1, fill=1)

    image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
    draw_fitted_image(pdf, image_path, x + padding, image_y, width - 2 * padding, image_height)

    title_y = image_y - 18
    pdf.setFillColor(TEXT)
    pdf.setFont("Helvetica-Bold", 11)
    pdf.drawString(x + padding, title_y, prompt["title"])

    pdf.setFillColor(HONEY)
    pdf.setFont("Courier-Bold", 8.5)
    pdf.drawString(x + padding, title_y - 15, prompt["command"])

    verdict = prompt["verdict"]
    pdf.setFillColor(TEAL if verdict == "PASS" else PARTIAL)
    pdf.setFont("Helvetica-Bold", 7.5)
    pdf.drawRightString(x + width - padding, title_y - 15, verdict)

    prompt_y = title_y - 34
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Bold", 6.5)
    pdf.drawString(x + padding, prompt_y, "GETESTETER PROMPT")

    text_size = 7.2
    lines = wrap_text(prompt["promptText"], "Helvetica", text_size, width - 2 * padding)
    line_height = 9.2
    text_y = prompt_y - 12
    pdf.setFillColor(TEXT)
    pdf.setFont("Helvetica", text_size)
    for line in lines[:13]:
        pdf.drawString(x + padding, text_y, line)
        text_y -= line_height

    use_cases = " · ".join(prompt["useCases"])
    use_y = y + 14
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica-Bold", 6.5)
    pdf.drawString(x + padding, use_y + 10, "IDEAL FÜR")
    pdf.setFillColor(TEXT)
    pdf.setFont("Helvetica", 7.2)
    pdf.drawString(x + padding, use_y, use_cases)


def draw_page(
    pdf: canvas.Canvas,
    group: dict[str, Any],
    page_number: int,
    page_count: int,
) -> None:
    """Draw one landscape page containing three detailed prompt cards."""

    page_width, page_height = landscape(A4)
    margin_x = 24
    card_gap = 9
    card_top = page_height - 78
    card_bottom = 35
    card_width = (page_width - 2 * margin_x - 2 * card_gap) / 3
    card_height = card_top - card_bottom

    pdf.setFillColor(BACKGROUND)
    pdf.rect(0, 0, page_width, page_height, stroke=0, fill=1)

    pdf.setFillColor(HONEY)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(margin_x, page_height - 20, "TRMT · ULTIMATE BILDPROMPTS · PART 3")
    pdf.setFillColor(TEXT)
    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(margin_x, page_height - 44, "36 ausführliche Bildprompts im echten Test")
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 8)
    pdf.drawString(margin_x, page_height - 58, "Ergebnisbild, vollständiger Prompt, Nutzen und ehrliche Bewertung")

    for index, prompt in enumerate(group["prompts"]):
        x = margin_x + index * (card_width + card_gap)
        draw_card(pdf, prompt, x, card_bottom, card_width, card_height)

    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.line(margin_x, 26, page_width - margin_x, 26)
    pdf.setFillColor(MUTED)
    pdf.setFont("Helvetica", 7)
    pdf.drawString(margin_x, 13, "therandommakertheory.com/tools/bildprompt-library")
    pdf.drawRightString(page_width - margin_x, 13, f"Seite {page_number} / {page_count}")


def generate_pdf(output_path: Path = QA_OUTPUT) -> Path:
    """Generate the guide and copy identical bytes into the public downloads."""

    data = load_library()
    groups = build_page_groups(data)
    validate_export(groups)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    pdf = canvas.Canvas(str(output_path), pagesize=landscape(A4), pageCompression=1)
    pdf.setTitle("TRMT Ultimate Bildprompts Part 3")
    pdf.setAuthor("The Random Maker Theory")
    pdf.setSubject("36 getestete ausführliche Bildprompts mit Ergebnisbildern")

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
                "pages": 12,
                "testedPrompts": 36,
                "verdicts": {"PASS": 32, "TEILWEISE": 4},
            },
            ensure_ascii=False,
            indent=2,
        )
    )
