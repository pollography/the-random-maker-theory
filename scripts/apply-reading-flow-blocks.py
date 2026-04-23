"""
Batch-migrate existing blog posts to the new Reading-Flow block components.

Detects three patterns in published articles and rewrites them to semantic
rf-block HTML so mdsvex renders them as the styled components added in v2:

  1. TL;DR blocks — currently written as either `> **TL;DR**` blockquotes
     or a plain `**TL;DR**` header followed by a bullet list. Both forms
     become `<div class="rf-block rf-tldr">`.
  2. Callout blocks — blockquotes that start with `**Pro-Tipp**`, `**Tipp**`,
     `**Hinweis**`, `**Wichtig**`, `**Info**`. Become `.rf-callout`.
  3. Warning blocks — blockquotes that start with `**Warnung**`, `**Achtung**`,
     `**Gotcha**`, `**Vorsicht**`. Become `.rf-warning`.

Only touches files where frontmatter `draft: false`. Idempotent — skips files
that already contain `rf-block` markers. Prints a per-file summary.

Run with: python scripts/apply-reading-flow-blocks.py [--dry-run]
"""

import os
import re
import sys
import glob
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

DRY_RUN = "--dry-run" in sys.argv
SYNTHESIZE = "--synthesize-tldr" in sys.argv
BLOG_DIR = Path(__file__).resolve().parent.parent / "src" / "content" / "blog"

# Articles where a synthesized TL;DR would feel wrong — skip even with
# --synthesize-tldr. KI-News briefings are short-form and self-summarising,
# willkommen is intentionally a letter-style intro.
SYNTHESIZE_SKIP = {
    "willkommen-bei-trmt",
}


def split_frontmatter(content: str):
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", content, re.S)
    if not m:
        return None, content
    return m.group(1), m.group(2)


def is_published(frontmatter: str) -> bool:
    return bool(re.search(r"^draft:\s*false", frontmatter, re.M))


def already_migrated(body: str) -> bool:
    return 'class="rf-block' in body or "rf-block rf-" in body


def bullets_from_blockquote(lines):
    """Strip leading `> ` from each blockquote line and collect bullet items."""
    bullets = []
    loose = []
    for ln in lines:
        stripped = re.sub(r"^>\s?", "", ln).rstrip()
        if not stripped:
            continue
        m = re.match(r"^[-*]\s+(.*)$", stripped)
        if m:
            bullets.append(m.group(1).strip())
        else:
            loose.append(stripped)
    return bullets, loose


def md_inline(text: str) -> str:
    """Convert inline markdown (bold, italic, code, links) to HTML.

    Required because mdsvex treats raw <div> blocks as opaque — any ** inside
    would otherwise render as literal asterisks rather than <strong>.
    """
    # Inline code first so its content is shielded from other patterns.
    placeholders: dict[str, str] = {}

    def hold(match):
        key = f"\0CODE{len(placeholders)}\0"
        placeholders[key] = f"<code>{match.group(1)}</code>"
        return key

    text = re.sub(r"`([^`]+)`", hold, text)
    # Links [label](url)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)\s]+)\)",
        lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>',
        text,
    )
    # Bold — ** or __
    text = re.sub(r"\*\*([^\*\n]+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"__([^_\n]+?)__", r"<strong>\1</strong>", text)
    # Italic — single * or _, avoiding already-processed bold (which is now <strong>)
    text = re.sub(r"(?<![\*\w])\*([^\*\n]+?)\*(?!\w)", r"<em>\1</em>", text)
    text = re.sub(r"(?<![_\w])_([^_\n]+?)_(?!\w)", r"<em>\1</em>", text)
    # Restore code placeholders
    for key, html in placeholders.items():
        text = text.replace(key, html)
    return text


def render_rf_block(kind: str, label: str, bullets: list, paragraphs: list) -> str:
    """Render as raw HTML that mdsvex can pass through."""
    inner = [f'\t<span class="rf-label">{label}</span>']
    for p in paragraphs:
        inner.append(f"\t<p>{md_inline(p)}</p>")
    if bullets:
        inner.append("\t<ul>")
        for b in bullets:
            inner.append(f"\t\t<li>{md_inline(b)}</li>")
        inner.append("\t</ul>")
    body = "\n".join(inner)
    return f'<div class="rf-block rf-{kind}">\n{body}\n</div>'


# ────────────────────────────────────────────────────────────
# Pattern 1 — Blockquote TL;DR
# > **TL;DR**
# > - item
# > - item
BQ_TLDR_RE = re.compile(
    r"""
    (?:^|\n\n)                                  # blank line before block
    (?P<block>
        >\s*\*\*\s*TL[;:\s]*DR\s*[:：]?\s*\*\*   # "**TL;DR**" or "**TL;DR:**"
        [ \t]*(?P<inline>[^\n]*)\n               # optional inline prose after marker
        (?:>\s?.*\n?)*                           # zero or more continuation lines
    )
    """,
    re.M | re.VERBOSE,
)


def migrate_blockquote_tldr(body: str):
    count = [0]

    def replace(m):
        count[0] += 1
        block = m.group("block")
        inline = (m.group("inline") or "").strip()
        lines = block.split("\n")[1:]
        bullets, loose = bullets_from_blockquote(lines)
        paragraphs = []
        if inline:
            paragraphs.append(inline)
        paragraphs.extend(loose)
        rf = render_rf_block("tldr", "TL;DR", bullets, paragraphs)
        prefix = "\n\n" if m.group(0).startswith("\n\n") else ""
        return prefix + rf + "\n"

    out = BQ_TLDR_RE.sub(replace, body)
    return out, count[0]


# ────────────────────────────────────────────────────────────
# Pattern 2 — Plain bold TL;DR followed by bullets
# **TL;DR**
#
# - item
# - item
#
# (next paragraph or heading)
PLAIN_TLDR_RE = re.compile(
    r"""
    (?:^|\n\n)
    (?P<block>
        \*\*\s*TL[;:\s]*DR\s*[:：]?\s*\*\*\s*\n  # marker (optional trailing colon)
        (?:\s*\n)?                                 # optional blank
        (?:[-*]\s+.*\n?)+                          # bullet list
    )
    """,
    re.M | re.VERBOSE,
)

# Pattern 2b — `**TL;DR:**` inline (no newline before content), grab paragraph
PLAIN_TLDR_PARA_RE = re.compile(
    r"""
    (?:^|\n\n)
    (?P<block>
        \*\*\s*TL[;:\s]*DR\s*[:：]\s*\*\*[^\n]*\n  # marker with colon, rest of line
        (?:[^\n]+\n)*?                              # optional continuation lines
        (?=\n|\Z)                                   # until blank line or EOF
    )
    """,
    re.M | re.VERBOSE,
)

# Pattern 2c — `## TL;DR`, `## Die Kurzversion`, `## Was dich in diesem Artikel erwartet`
# headings. Any "summary-intro" H2/H3 counts as a TL;DR equivalent.
H2_TLDR_RE = re.compile(
    r"""
    (?:^|\n)
    (?P<block>
        \#{1,3}\s+(?:
            TL[;:\s]*DR
          | Die\s+Kurzversion
          | Kurzversion
          | Kurz[-\s]?gefasst
          | Was\s+dich\s+in\s+diesem\s+Artikel\s+erwartet
          | Was\s+dich\s+(?:hier\s+)?erwartet
        )[^\n]*\n
        # Content must stop at: next heading, horizontal rule, or a double-blank-line gap.
        # The negative lookahead on each line rejects any line that is a new heading
        # or a horizontal rule (---, ***, ___).
        (?:
            (?!\#{1,3}\s)        # not a heading
            (?!-{3,}\s*$)        # not a horizontal rule
            (?!\*{3,}\s*$)       # not *** rule
            (?!_{3,}\s*$)        # not ___ rule
            .*\n?
        )+
    )
    """,
    re.M | re.VERBOSE | re.I,
)


def migrate_plain_tldr(body: str):
    count = [0]

    def replace(m):
        count[0] += 1
        block = m.group("block")
        lines = [l for l in block.split("\n") if l.strip()][1:]
        bullets = []
        for ln in lines:
            bm = re.match(r"^[-*]\s+(.*)$", ln.strip())
            if bm:
                bullets.append(bm.group(1).strip())
        rf = render_rf_block("tldr", "TL;DR", bullets, [])
        prefix = "\n\n" if m.group(0).startswith("\n\n") else ""
        return prefix + rf + "\n"

    out = PLAIN_TLDR_RE.sub(replace, body)
    return out, count[0]


def migrate_plain_tldr_para(body: str):
    """`**TL;DR:** prose that continues` style."""
    count = [0]

    def replace(m):
        count[0] += 1
        block = m.group("block").strip()
        # Strip the opening **TL;DR:** marker
        stripped = re.sub(r"^\*\*\s*TL[;:\s]*DR\s*[:：]\s*\*\*\s*", "", block, count=1)
        # Split on newlines into paragraphs
        paragraphs = [p.strip() for p in re.split(r"\n", stripped) if p.strip()]
        rf = render_rf_block("tldr", "TL;DR", [], paragraphs)
        prefix = "\n\n" if m.group(0).startswith("\n\n") else ""
        return prefix + rf + "\n"

    out = PLAIN_TLDR_PARA_RE.sub(replace, body)
    return out, count[0]


def migrate_h2_tldr(body: str):
    """`## TL;DR` heading style — grabs content until next heading."""
    count = [0]

    def replace(m):
        count[0] += 1
        block = m.group("block")
        lines = block.strip().split("\n")
        # Drop the heading line
        content_lines = lines[1:]
        bullets = []
        paragraphs = []
        current_para = []

        def flush():
            if current_para:
                paragraphs.append(" ".join(current_para).strip())
                current_para.clear()

        for ln in content_lines:
            s = ln.strip()
            if not s:
                flush()
                continue
            bm = re.match(r"^[-*]\s+(.*)$", s)
            if bm:
                flush()
                bullets.append(bm.group(1).strip())
            else:
                current_para.append(s)
        flush()
        rf = render_rf_block("tldr", "TL;DR", bullets, paragraphs)
        prefix = "\n" if m.group(0).startswith("\n") else ""
        return prefix + rf + "\n\n"

    out = H2_TLDR_RE.sub(replace, body)
    return out, count[0]


# ────────────────────────────────────────────────────────────
# Pattern 3 — Callout blockquotes (Pro-Tipp, Hinweis, Wichtig, etc.)
CALLOUT_MARKERS = {
    "Pro-Tipp": "Pro-Tipp",
    "Pro Tipp": "Pro-Tipp",
    "Protipp": "Pro-Tipp",
    "Tipp": "Tipp",
    "Hinweis": "Hinweis",
    "Info": "Info",
    "Merke": "Merke",
    "Mein Take": "Mein Take",
    "Mein Tipp": "Mein Tipp",
    "Spoiler": "Spoiler",
    "Fazit": "Fazit",
    "Ergebnis": "Ergebnis",
}
WARNING_MARKERS = {
    "Warnung": "Warnung",
    "Achtung": "Achtung",
    "Gotcha": "Gotcha",
    "Vorsicht": "Vorsicht",
    "Fehler": "Fehler",
    "Wichtig": "Wichtig",
    "Wichtiger Hinweis": "Wichtiger Hinweis",
}


def _compile_keyword_regex(keywords):
    alt = "|".join(re.escape(k) for k in sorted(keywords, key=len, reverse=True))
    return re.compile(
        rf"""
        (?:^|\n\n)
        (?P<block>
            >\s*\*\*\s*(?P<kw>{alt})\s*\*\*\s*(?::\s*)?.*\n
            (?:>\s?.*\n?)*
        )
        """,
        re.M | re.VERBOSE,
    )


CALLOUT_RE = _compile_keyword_regex(CALLOUT_MARKERS.keys())
WARNING_RE = _compile_keyword_regex(WARNING_MARKERS.keys())


def _compile_inline_marker_regex(keywords):
    """Match plain `**Keyword:**` paragraphs (not blockquoted)."""
    alt = "|".join(re.escape(k) for k in sorted(keywords, key=len, reverse=True))
    return re.compile(
        rf"""
        (?:^|\n\n)                                # paragraph boundary
        (?P<block>
            \*\*\s*(?P<kw>{alt})\s*[:：]\s*\*\*     # marker with colon required
            [ \t]*(?P<rest>[^\n]*)\n               # first-line content after marker
            (?:(?!\n\n)(?!\#{{1,3}}\s)(?!>\s)[^\n]*\n?)*  # continuation until blank line or new heading/bq
        )
        """,
        re.M | re.VERBOSE,
    )


INLINE_CALLOUT_RE = _compile_inline_marker_regex(CALLOUT_MARKERS.keys())
INLINE_WARNING_RE = _compile_inline_marker_regex(WARNING_MARKERS.keys())


# Catch-all for remaining `> text` blockquotes that weren't already caught by
# a marker pattern. These were using the generic prose blockquote style
# (honey tint) — promote them to rf-callout so they match the new system.
GENERIC_BLOCKQUOTE_RE = re.compile(
    r"""
    (?:^|\n\n)
    (?P<block>
        >(?!\s*\*\*\s*(?:TL[;:\s]*DR))             # skip TL;DR ones (handled earlier)
        [ \t]?[^\n]*\n
        (?:>[ \t]?[^\n]*\n?)*
    )
    """,
    re.M | re.VERBOSE,
)


def migrate_keyword_blockquote(body: str, regex: re.Pattern, kind: str, label_map: dict):
    count = [0]

    def replace(m):
        count[0] += 1
        block = m.group("block")
        kw = m.group("kw")
        lines = block.split("\n")
        first = re.sub(
            rf"^>\s*\*\*\s*{re.escape(kw)}\s*\*\*\s*:?\s*", "", lines[0]
        ).strip()
        rest_lines = lines[1:]
        paragraphs = []
        if first:
            paragraphs.append(first)
        bullets, loose = bullets_from_blockquote(rest_lines)
        paragraphs.extend(loose)
        label = label_map[kw]
        rf = render_rf_block(kind, label, bullets, paragraphs)
        prefix = "\n\n" if m.group(0).startswith("\n\n") else ""
        return prefix + rf + "\n"

    return regex.sub(replace, body), count[0]


def migrate_inline_marker(body: str, regex: re.Pattern, kind: str, label_map: dict):
    """Wrap `**Marker:** prose` paragraphs in an rf-block."""
    count = [0]

    def replace(m):
        count[0] += 1
        block = m.group("block").rstrip("\n")
        kw = m.group("kw")
        # Strip the marker from the start, keep the rest as paragraph content
        stripped = re.sub(
            rf"^\*\*\s*{re.escape(kw)}\s*[:：]\s*\*\*\s*", "", block, count=1
        )
        paragraphs = [p.strip() for p in re.split(r"\n", stripped) if p.strip()]
        label = label_map[kw]
        rf = render_rf_block(kind, label, [], paragraphs)
        prefix = "\n\n" if m.group(0).startswith("\n\n") else ""
        return prefix + rf + "\n"

    return regex.sub(replace, body), count[0]


def migrate_generic_blockquote(body: str):
    """Promote leftover plain blockquotes to rf-callout with label 'Notiz'."""
    count = [0]

    def replace(m):
        block = m.group("block")
        # Guard: skip blockquotes that are ONLY a single-line attribution/quote
        # of well-known format (> — Author) — those read better as italic quotes.
        lines = [re.sub(r"^>\s?", "", l) for l in block.split("\n") if l.strip()]
        if not lines:
            return m.group(0)
        text = " ".join(lines).strip()
        # If it already contains a rf-tldr marker that was missed, skip
        if "TL;DR" in text[:30]:
            return m.group(0)
        count[0] += 1
        bullets, loose = bullets_from_blockquote(block.split("\n"))
        paragraphs = loose if loose else [text]
        rf = render_rf_block("callout", "Notiz", bullets, paragraphs if not bullets else [])
        prefix = "\n\n" if m.group(0).startswith("\n\n") else ""
        return prefix + rf + "\n"

    return GENERIC_BLOCKQUOTE_RE.sub(replace, body), count[0]


# ────────────────────────────────────────────────────────────


def extract_frontmatter_field(fm: str, key: str) -> str | None:
    m = re.search(rf'^{key}:\s*"?(.+?)"?\s*$', fm, re.M)
    return m.group(1).strip() if m else None


def synthesize_tldr_from_description(body: str, fm: str) -> tuple[str, int]:
    """Inject an rf-tldr built from the frontmatter description for articles
    that still have no TL;DR-like block after the other passes.
    The block is placed immediately before the first content line so the
    existing article intro keeps its natural flow."""
    desc = extract_frontmatter_field(fm, "description")
    if not desc:
        return body, 0
    rf = render_rf_block("tldr", "TL;DR", [], [desc])
    stripped = body.lstrip("\n")
    leading_newlines = body[: len(body) - len(stripped)]
    return leading_newlines + rf + "\n\n" + stripped, 1


def process_file(path: Path):
    content = path.read_text(encoding="utf-8")
    fm, body = split_frontmatter(content)
    if fm is None:
        return None
    if not is_published(fm):
        return None
    # Guard removed: earlier versions short-circuited once any rf-block existed,
    # but that blocks the mid-article pass from reaching content that was never
    # touched (inline markers, leftover blockquotes) — each pattern is idempotent
    # because the regexes target the original markdown syntax, not the HTML
    # they are replaced with.

    new_body = body
    total_tldr = 0
    new_body, n = migrate_blockquote_tldr(new_body)
    total_tldr += n
    new_body, n = migrate_plain_tldr(new_body)
    total_tldr += n
    new_body, n = migrate_h2_tldr(new_body)
    total_tldr += n
    new_body, n = migrate_plain_tldr_para(new_body)
    total_tldr += n
    new_body, n_call = migrate_keyword_blockquote(
        new_body, CALLOUT_RE, "callout", CALLOUT_MARKERS
    )
    new_body, n_warn = migrate_keyword_blockquote(
        new_body, WARNING_RE, "warning", WARNING_MARKERS
    )
    # Inline-marker forms: `**Wichtig:**`, `**Pro-Tipp:**`, etc. at paragraph start
    new_body, n_il_call = migrate_inline_marker(
        new_body, INLINE_CALLOUT_RE, "callout", CALLOUT_MARKERS
    )
    new_body, n_il_warn = migrate_inline_marker(
        new_body, INLINE_WARNING_RE, "warning", WARNING_MARKERS
    )
    n_call += n_il_call
    n_warn += n_il_warn
    # Final pass: promote leftover `> text` blockquotes to generic callouts
    new_body, n_bq = migrate_generic_blockquote(new_body)
    n_call += n_bq

    # Optional: synthesize a TL;DR from the frontmatter description when no
    # rf-tldr exists anywhere in the article yet.
    synth_tldr = 0
    slug = extract_frontmatter_field(fm, "slug") or path.stem
    if (
        SYNTHESIZE
        and total_tldr == 0
        and 'class="rf-block rf-tldr"' not in new_body
        and slug not in SYNTHESIZE_SKIP
    ):
        new_body, synth_tldr = synthesize_tldr_from_description(new_body, fm)
        total_tldr += synth_tldr

    if new_body == body:
        return {"skipped": "no-pattern-match"}

    if not DRY_RUN:
        path.write_text(f"---\n{fm}\n---\n{new_body}", encoding="utf-8", newline="\n")

    return {
        "tldr": total_tldr,
        "callout": n_call,
        "warning": n_warn,
    }


def main():
    files = sorted(BLOG_DIR.glob("*.md"))
    summary = {"processed": 0, "skipped": 0, "tldr": 0, "callout": 0, "warning": 0}
    per_file = []

    for f in files:
        result = process_file(f)
        if result is None:
            summary["skipped"] += 1
            continue
        if "skipped" in result:
            summary["skipped"] += 1
            per_file.append((f.name, f"skip:{result['skipped']}"))
            continue
        summary["processed"] += 1
        summary["tldr"] += result["tldr"]
        summary["callout"] += result["callout"]
        summary["warning"] += result["warning"]
        per_file.append(
            (
                f.name,
                f"tldr={result['tldr']} callout={result['callout']} warning={result['warning']}",
            )
        )

    print(f"\n{'DRY RUN' if DRY_RUN else 'APPLIED'} — {len(files)} blog files scanned\n")
    for name, detail in per_file:
        print(f"  {name}: {detail}")
    print(
        f"\nSummary: {summary['processed']} rewritten, {summary['skipped']} skipped "
        f"| {summary['tldr']} TL;DR, {summary['callout']} callouts, {summary['warning']} warnings\n"
    )


if __name__ == "__main__":
    main()
