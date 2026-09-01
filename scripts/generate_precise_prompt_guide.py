"""Generate the public TRMT guide for 24 tested Creative Briefs."""

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
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "src" / "lib" / "data" / "image-prompts.json"
QA_OUTPUT = PROJECT_ROOT / "output" / "pdf" / "trmt-praezise-bildprompts.pdf"
PUBLIC_OUTPUT = PROJECT_ROOT / "static" / "downloads" / "trmt-praezise-bildprompts.pdf"

BACKGROUND = HexColor("#0B0B0B")
SURFACE = HexColor("#191919")
PROMPT_SURFACE = HexColor("#131313")
SURFACE_EDGE = HexColor("#332D26")
TEXT = HexColor("#EDE8E0")
MUTED = HexColor("#A69B8E")
HONEY = HexColor("#D4893E")
TEAL = HexColor("#3AB0A2")
IMAGE_BACKGROUND = HexColor("#F4F4F2")

FAMILY_DEFINITIONS = [
    {
        "title": "Druck & Fototechnik",
        "subtitle": "Cyanotypie, Risographie, Linolschnitt, Sicherheitsstich, Nassplatte und Infrarot",
        "ids": [
            "cyanotype-botanical",
            "risograph-two-ink",
            "reduction-linocut",
            "security-engraving",
            "wet-plate-collodion",
            "false-color-infrared",
        ],
    },
    {
        "title": "Handwerk & Material",
        "subtitle": "Papier, Holz, Emaille, Porzellan, Garn und getriebenes Kupfer",
        "ids": [
            "paper-cut-shadowbox",
            "wood-marquetry",
            "cloisonne-enamel",
            "kintsugi-porcelain-bust",
            "tufted-textile-portrait",
            "copper-repousse-medallion",
        ],
    },
    {
        "title": "Optik & Licht",
        "subtitle": "Projektion, Prisma, Lichtmalerei, Moiré, Solarisation und Lichtkaustik",
        "ids": [
            "projection-mapped-bust",
            "prism-refraction",
            "long-exposure-light-painting",
            "moire-line-portrait",
            "solarized-darkroom-print",
            "caustic-light-portrait",
        ],
    },
    {
        "title": "Konzeptuelle Motive",
        "subtitle": "Werkzeuge, Landschaft, Schatten, Wandbild, Topiary und Ferrofluid",
        "ids": [
            "maker-tool-assemblage",
            "aerial-landscape-portrait",
            "shadow-only-portrait",
            "anamorphic-street-mural",
            "living-topiary-bust",
            "ferrofluid-portrait-bust",
        ],
    },
]


def register_fonts() -> None:
    """Embed a Unicode-capable Windows font for reliable German text."""

    regular = Path(r"C:\Windows\Fonts\arial.ttf")
    bold = Path(r"C:\Windows\Fonts\arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("TRMT-Regular", str(regular)))
        pdfmetrics.registerFont(TTFont("TRMT-Bold", str(bold)))
    else:
        raise FileNotFoundError("Required Arial fonts were not found in C:\\Windows\\Fonts")


def load_library(path: Path = DATA_PATH) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def build_family_groups(data: dict[str, Any]) -> list[dict[str, Any]]:
    precise_prompts = [
        prompt
        for prompt in data["prompts"]
        if prompt.get("status") == "tested"
        and prompt.get("promptType") == "detailed"
        and prompt.get("articleSlug") == "praezise-bildprompts-weniger-zufall"
    ]
    prompts_by_id = {prompt["id"]: prompt for prompt in precise_prompts}
    return [
        {
            **definition,
            "prompts": [prompts_by_id[prompt_id] for prompt_id in definition["ids"]],
        }
        for definition in FAMILY_DEFINITIONS
    ]


def build_content_pages(groups: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Split every six-prompt family into three ordered two-prompt pages."""

    pages = []
    for group in groups:
        for offset in range(0, len(group["prompts"]), 2):
            pages.append(
                {
                    **group,
                    "part": offset // 2 + 1,
                    "partCount": 3,
                    "prompts": group["prompts"][offset : offset + 2],
                }
            )
    return pages


def validate_export(
    groups: list[dict[str, Any]], content_pages: list[dict[str, Any]]
) -> None:
    exported = [prompt for group in groups for prompt in group["prompts"]]
    paginated = [prompt for page in content_pages for prompt in page["prompts"]]
    if len(groups) != 4:
        raise ValueError(f"Expected four families, found {len(groups)}")
    if [len(group["prompts"]) for group in groups] != [6, 6, 6, 6]:
        raise ValueError("Every family must contain exactly six precise prompts")
    if len({prompt["id"] for prompt in exported}) != 24:
        raise ValueError("Precise prompt export contains missing or duplicate ids")
    if len({prompt["promptText"] for prompt in exported}) != 24:
        raise ValueError("Precise prompt export contains duplicate prompt texts")
    if len(content_pages) != 12:
        raise ValueError(f"Expected twelve content pages, found {len(content_pages)}")
    if any(len(page["prompts"]) != 2 for page in content_pages):
        raise ValueError("Every content page must contain exactly two prompts")
    if [prompt["id"] for prompt in paginated] != [prompt["id"] for prompt in exported]:
        raise ValueError("Content pagination changed the canonical prompt order")
    for prompt in exported:
        image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
        if not image_path.exists():
            raise FileNotFoundError(f"Missing result image for {prompt['id']}: {image_path}")


def prepare_image(image_path: Path, max_size: tuple[int, int]) -> BytesIO:
    with Image.open(image_path) as source:
        image = ImageOps.exif_transpose(source).convert("RGB")
        image.thumbnail(max_size, Image.Resampling.LANCZOS)
        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=82, optimize=True, progressive=True)
        buffer.seek(0)
        return buffer


def draw_contained_image(
    pdf: canvas.Canvas,
    image_path: Path,
    x: float,
    y: float,
    width: float,
    height: float,
) -> None:
    prepared = prepare_image(image_path, (1200, 800))
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


def wrap_text(text: str, font_name: str, font_size: float, max_width: float) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and pdfmetrics.stringWidth(candidate, font_name, font_size) > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def fit_prompt_lines(text: str, max_width: float, max_height: float) -> tuple[float, float, list[str]]:
    font_size = 11.2
    while font_size >= 10.5:
        leading = font_size * 1.34
        lines = wrap_text(text, "TRMT-Regular", font_size, max_width)
        if len(lines) * leading <= max_height:
            return font_size, leading, lines
        font_size = round(font_size - 0.1, 1)
    raise ValueError("Prompt text does not fit at the required minimum of 10.5 pt")


def draw_card(
    pdf: canvas.Canvas,
    prompt: dict[str, Any],
    x: float,
    y: float,
    width: float,
    height: float,
) -> None:
    padding = 14
    image_size = 136

    pdf.setFillColor(SURFACE)
    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.roundRect(x, y, width, height, 7, stroke=1, fill=1)

    image_path = PROJECT_ROOT / "static" / prompt["image"].lstrip("/")
    draw_contained_image(
        pdf,
        image_path,
        x + padding,
        y + height - padding - image_size,
        image_size,
        image_size,
    )

    text_x = x + padding + image_size + 14
    title_width = width - (text_x - x) - padding
    title_lines = wrap_text(prompt["title"], "TRMT-Bold", 13.8, title_width)
    pdf.setFillColor(TEXT)
    pdf.setFont("TRMT-Bold", 13.8)
    title_y = y + height - 25
    for line in title_lines[:2]:
        pdf.drawString(text_x, title_y, line)
        title_y -= 17

    use_cases = " · ".join(prompt["useCases"][:3])
    pdf.setFillColor(TEAL)
    pdf.setFont("TRMT-Regular", 8.3)
    for line in wrap_text(use_cases, "TRMT-Regular", 8.3, title_width)[:4]:
        pdf.drawString(text_x, title_y - 3, line)
        title_y -= 11

    if prompt.get("resultStatus") == "partial":
        pdf.setFillColor(HONEY)
        pdf.setFont("TRMT-Bold", 8.2)
        pdf.drawString(text_x, y + height - image_size - padding + 6, "EXPERIMENT · TEILWEISE")

    divider_y = y + height - padding - image_size - 15
    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.line(x + padding, divider_y, x + width - padding, divider_y)

    prompt_panel_y = y + padding
    prompt_panel_height = divider_y - prompt_panel_y - 10
    pdf.setFillColor(PROMPT_SURFACE)
    pdf.roundRect(
        x + padding,
        prompt_panel_y,
        width - 2 * padding,
        prompt_panel_height,
        5,
        stroke=0,
        fill=1,
    )

    label_y = divider_y - 28
    pdf.setFillColor(HONEY)
    pdf.setFont("TRMT-Bold", 8.5)
    pdf.drawString(x + 2 * padding, label_y, "COPY-PASTE PROMPT")

    prompt_top = label_y - 20
    prompt_bottom = prompt_panel_y + 14
    max_text_height = prompt_top - prompt_bottom
    font_size, leading, lines = fit_prompt_lines(
        prompt["promptText"], width - 4 * padding, max_text_height
    )
    pdf.setFillColor(TEXT)
    pdf.setFont("TRMT-Regular", font_size)
    cursor_y = prompt_top
    for line in lines:
        pdf.drawString(x + 2 * padding, cursor_y, line)
        cursor_y -= leading


def draw_cover(pdf: canvas.Canvas) -> None:
    page_width, page_height = landscape(A4)
    margin = 28
    pdf.setFillColor(BACKGROUND)
    pdf.rect(0, 0, page_width, page_height, stroke=0, fill=1)

    pdf.setFillColor(HONEY)
    pdf.setFont("TRMT-Bold", 9)
    pdf.drawString(margin, page_height - 34, "TRMT BILDPROMPT-GUIDE")

    pdf.setFillColor(TEXT)
    pdf.setFont("TRMT-Bold", 28)
    pdf.drawString(margin, page_height - 70, "24 präzise Bildprompts")
    pdf.setFont("TRMT-Regular", 13)
    pdf.setFillColor(MUTED)
    pdf.drawString(margin, page_height - 92, "Weniger Zufall. Mehr Kontrolle über Motiv, Material, Licht und Identität.")
    pdf.setFillColor(TEAL)
    pdf.setFont("TRMT-Bold", 8)
    pdf.drawString(
        margin,
        page_height - 112,
        "[[DOPPELTE KLAMMERN]] vor dem Absenden ersetzen und eigenes Referenzbild hochladen.",
    )

    hero_path = PROJECT_ROOT / "static" / "images" / "blog" / "praezise-bildprompts-weniger-zufall-1.webp"
    draw_contained_image(pdf, hero_path, margin, 102, page_width - 2 * margin, 360)

    pdf.setFillColor(TEXT)
    pdf.setFont("TRMT-Bold", 8)
    pdf.drawString(margin, 73, "24 echte Tests · 4 Familien · vollständige Creative Briefs")
    pdf.setFillColor(MUTED)
    pdf.setFont("TRMT-Regular", 7.2)
    pdf.drawString(margin, 56, "23 visuell klare Ergebnisse. Moiré bleibt als Experiment sichtbar gekennzeichnet.")
    pdf.drawString(margin, 40, "therandommakertheory.com/tools/bildprompt-library")


def draw_family_page(
    pdf: canvas.Canvas,
    group: dict[str, Any],
    page_number: int,
    page_count: int,
) -> None:
    page_width, page_height = landscape(A4)
    margin_x = 24
    top = page_height - 24
    header_height = 64
    footer_height = 28
    gap = 14
    grid_top = top - header_height
    grid_bottom = footer_height + 9
    card_width = (page_width - 2 * margin_x - gap) / 2
    card_height = grid_top - grid_bottom

    pdf.setFillColor(BACKGROUND)
    pdf.rect(0, 0, page_width, page_height, stroke=0, fill=1)
    pdf.setFillColor(HONEY)
    pdf.setFont("TRMT-Bold", 7.5)
    pdf.drawString(margin_x, top, "TRMT · 24 PRÄZISE BILDPROMPTS")
    pdf.setFillColor(TEXT)
    pdf.setFont("TRMT-Bold", 23)
    pdf.drawString(margin_x, top - 27, group["title"])
    pdf.setFillColor(HONEY)
    pdf.setFont("TRMT-Bold", 8.5)
    pdf.drawRightString(
        page_width - margin_x,
        top - 24,
        f"TEIL {group['part']} / {group['partCount']} · 2 PROMPTS",
    )
    pdf.setFillColor(MUTED)
    pdf.setFont("TRMT-Regular", 8.6)
    pdf.drawString(margin_x, top - 44, group["subtitle"])

    for index, prompt in enumerate(group["prompts"]):
        x = margin_x + index * (card_width + gap)
        y = grid_bottom
        draw_card(pdf, prompt, x, y, card_width, card_height)

    pdf.setStrokeColor(SURFACE_EDGE)
    pdf.line(margin_x, 24, page_width - margin_x, 24)
    pdf.setFillColor(MUTED)
    pdf.setFont("TRMT-Regular", 6.5)
    pdf.drawString(margin_x, 12, "Modelle und zweite Durchläufe können abweichen. Ergebnis immer prüfen.")
    pdf.drawRightString(page_width - margin_x, 12, f"Seite {page_number} / {page_count}")


def generate_pdf(output_path: Path = QA_OUTPUT) -> Path:
    register_fonts()
    data = load_library()
    groups = build_family_groups(data)
    content_pages = build_content_pages(groups)
    validate_export(groups, content_pages)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    PUBLIC_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    pdf = canvas.Canvas(str(output_path), pagesize=landscape(A4), pageCompression=1)
    pdf.setTitle("24 präzise Bildprompts: weniger Zufall, mehr Kontrolle")
    pdf.setAuthor("The Random Maker Theory")
    pdf.setSubject("24 getestete Creative Briefs mit echten Ergebnisbildern")

    draw_cover(pdf)
    pdf.showPage()
    page_count = len(content_pages) + 1
    for index, page in enumerate(content_pages, start=2):
        draw_family_page(pdf, page, index, page_count)
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
                "pages": 13,
                "precisePrompts": 24,
            },
            ensure_ascii=False,
            indent=2,
        )
    )
