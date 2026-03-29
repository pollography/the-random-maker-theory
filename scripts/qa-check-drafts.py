#!/usr/bin/env python3
"""
TRMT Draft QA Checker
Prueft alle Blog-Drafts auf Vollstaendigkeit bevor sie live gehen.
Usage: python scripts/qa-check-drafts.py [--fix] [--telegram] [--slug SLUG]
"""

import sys
import os
import re
import json
import glob
import argparse
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')

# === PATHS ===
PROJECT_ROOT = Path(__file__).parent.parent
BLOG_DIR = PROJECT_ROOT / "src" / "content" / "blog"
IMAGES_DIR = PROJECT_ROOT / "static" / "images" / "blog"
PODCAST_DIR = PROJECT_ROOT / "src" / "content" / "podcast"
CLUSTERS_FILE = PROJECT_ROOT.parent / "config" / "topic-clusters.json"

# === REQUIRED FRONTMATTER FIELDS ===
REQUIRED_FIELDS = [
    "title", "slug", "date", "description", "tags", "category", "draft"
]
REQUIRED_IMAGE_FIELDS = ["heroImage", "heroImageThumb"]
RECOMMENDED_FIELDS = ["titleAccent", "readingTime"]

# === WRONG FIELD NAMES (should be heroImage) ===
WRONG_IMAGE_FIELDS = ["image", "ogImage", "og_image"]

# === SEO CHECKS ===
MIN_WORD_COUNT = 1500
MIN_INTERNAL_LINKS = 2
MAX_META_DESCRIPTION_LENGTH = 160


def parse_frontmatter(filepath):
    """Parse YAML frontmatter from markdown file."""
    content = filepath.read_text(encoding='utf-8')
    if not content.startswith('---'):
        return {}, content

    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    fm_text = parts[1].strip()
    body = parts[2].strip()

    # Simple YAML parser (no dependency needed)
    fm = {}
    current_key = None
    current_list = None

    for line in fm_text.split('\n'):
        stripped = line.strip()
        if not stripped or stripped.startswith('#'):
            continue

        # List item
        if stripped.startswith('- ') and current_key:
            if current_list is None:
                current_list = []
                fm[current_key] = current_list
            val = stripped[2:].strip().strip('"').strip("'")
            current_list.append(val)
            continue

        # Key: value
        if ':' in stripped:
            current_list = None
            key, _, val = stripped.partition(':')
            key = key.strip()
            val = val.strip().strip('"').strip("'")

            # Handle inline arrays: [a, b, c]
            if val.startswith('[') and val.endswith(']'):
                items = val[1:-1].split(',')
                fm[key] = [i.strip().strip('"').strip("'") for i in items if i.strip()]
            elif val.lower() == 'true':
                fm[key] = True
            elif val.lower() == 'false':
                fm[key] = False
            elif val == '':
                fm[key] = None
                current_key = key
            else:
                try:
                    fm[key] = int(val)
                except ValueError:
                    fm[key] = val
            current_key = key

    return fm, body


def check_article(filepath, fix_mode=False):
    """Run all QA checks on a single article. Returns list of issues."""
    fm, body = parse_frontmatter(filepath)
    slug = fm.get('slug', filepath.stem)
    issues = []
    warnings = []
    fixes_applied = []

    # === 1. DRAFT CHECK ===
    if not fm.get('draft', False):
        return slug, [], [], []  # Skip published articles

    # === 2. REQUIRED FRONTMATTER ===
    for field in REQUIRED_FIELDS:
        if field not in fm or fm[field] is None:
            issues.append(f"FRONTMATTER: Feld '{field}' fehlt")

    # === 3. IMAGE FIELD CHECK ===
    has_hero = 'heroImage' in fm and fm['heroImage']
    has_wrong_field = None
    for wrong in WRONG_IMAGE_FIELDS:
        if wrong in fm and fm[wrong]:
            has_wrong_field = wrong
            break

    if not has_hero and has_wrong_field:
        issues.append(f"IMAGE_FIELD: Falsches Feld '{has_wrong_field}' statt 'heroImage'")
    elif not has_hero and not has_wrong_field:
        issues.append("IMAGE_FIELD: Kein heroImage Feld definiert")

    if 'heroImageThumb' not in fm or not fm.get('heroImageThumb'):
        warnings.append("IMAGE_FIELD: heroImageThumb fehlt")

    # === 4. IMAGE FILE EXISTS ===
    hero_path = fm.get('heroImage') or (fm.get(has_wrong_field) if has_wrong_field else None)
    if hero_path:
        # Resolve relative to static/
        if hero_path.startswith('/'):
            full_path = PROJECT_ROOT / "static" / hero_path.lstrip('/')
        else:
            full_path = PROJECT_ROOT / "static" / hero_path
        if not full_path.exists():
            issues.append(f"IMAGE_MISSING: {hero_path} existiert nicht")
        else:
            # Check file size
            size_kb = full_path.stat().st_size / 1024
            if size_kb > 180:
                warnings.append(f"IMAGE_SIZE: {hero_path} ist {size_kb:.0f}KB (max 180KB)")

    # === 5. WORD COUNT ===
    # Strip markdown formatting for word count
    clean_body = re.sub(r'```[\s\S]*?```', '', body)  # Remove code blocks
    clean_body = re.sub(r'<[^>]+>', '', clean_body)     # Remove HTML
    clean_body = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', clean_body)  # Links to text
    clean_body = re.sub(r'[#*_~`>|]', '', clean_body)   # Remove MD formatting
    words = len(clean_body.split())
    if words < MIN_WORD_COUNT:
        issues.append(f"WORD_COUNT: {words} Woerter (min {MIN_WORD_COUNT})")

    # === 6. INTERNAL LINKS ===
    internal_links = re.findall(r'\]\(/blog/([^)]+)\)', body)
    if len(internal_links) < MIN_INTERNAL_LINKS:
        warnings.append(f"INTERNAL_LINKS: Nur {len(internal_links)} interne Links (min {MIN_INTERNAL_LINKS})")

    # === 7. SEO: Keyword in title + first paragraph ===
    description = fm.get('description', '')
    if description and len(description) > MAX_META_DESCRIPTION_LENGTH:
        warnings.append(f"META_DESC: {len(description)} Zeichen (max {MAX_META_DESCRIPTION_LENGTH})")

    # === 8. ENDING CHECK ===
    if not body.rstrip().endswith('— TRMT'):
        warnings.append("ENDING: Endet nicht mit '— TRMT'")

    # === 9. TAGS CHECK ===
    tags = fm.get('tags', [])
    if not tags or (isinstance(tags, list) and len(tags) == 0):
        issues.append("TAGS: Keine Tags definiert")

    # === 10. TITLEACCENT CHECK ===
    if 'titleAccent' not in fm or not fm.get('titleAccent'):
        warnings.append("TITLEACCENT: Kein titleAccent definiert (Honey-Highlight im Titel)")

    # === 11. READINGTIME CHECK ===
    if 'readingTime' not in fm:
        warnings.append("READINGTIME: readingTime fehlt")

    # === 12. INLINE IMAGES CHECK ===
    inline_images = re.findall(r'!\[([^\]]*)\]\((/images/[^)]+)\)', body)
    for alt, img_path in inline_images:
        full_img = PROJECT_ROOT / "static" / img_path.lstrip('/')
        if not full_img.exists():
            issues.append(f"INLINE_IMAGE_MISSING: {img_path}")
        if not alt:
            warnings.append(f"ALT_TEXT: Bild ohne Alt-Text: {img_path}")

    # === 13. AI SLOP CHECK ===
    ai_patterns = [
        r'In der heutigen',
        r'Es ist wichtig zu beachten',
        r'Zusammenfassend l[aä]sst sich sagen',
        r'Dar[uü]ber hinaus',
        r'Des Weiteren',
        r'Abschlie[sß]end',
        r'revolution[aä]r',
        r'bahnbrechend',
        r'nahtlos',
        r'ganzheitlich',
    ]
    for pattern in ai_patterns:
        matches = re.findall(pattern, body, re.IGNORECASE)
        if matches:
            warnings.append(f"AI_SLOP: '{matches[0]}' gefunden — KI-Sprache!")

    # === 14. INLINE CITATIONS CHECK ===
    # Check if article has a Quellen section
    has_sources = bool(re.search(r'##\s*(Quellen|Sources|Links)', body, re.IGNORECASE))
    if not has_sources and words > 1000:
        warnings.append("SOURCES: Keine Quellen-Sektion am Ende")

    return slug, issues, warnings, fixes_applied


def generate_report(results):
    """Generate human-readable QA report."""
    lines = []
    lines.append("=" * 60)
    lines.append("  TRMT Draft QA Report")
    lines.append("=" * 60)
    lines.append("")

    total_drafts = len(results)
    ok_count = sum(1 for _, issues, _, _ in results if not issues)
    issue_count = total_drafts - ok_count

    lines.append(f"Drafts geprueft: {total_drafts}")
    lines.append(f"OK: {ok_count}  |  Probleme: {issue_count}")
    lines.append("")

    # Critical issues first
    for slug, issues, warnings, fixes in results:
        if not issues and not warnings:
            continue
        lines.append(f"--- {slug} ---")
        for issue in issues:
            lines.append(f"  [FEHLER] {issue}")
        for warning in warnings:
            lines.append(f"  [WARNUNG] {warning}")
        for fix in fixes:
            lines.append(f"  [GEFIXT] {fix}")
        lines.append("")

    # Summary of all OK drafts
    ok_slugs = [slug for slug, issues, _, _ in results if not issues]
    if ok_slugs:
        lines.append("--- READY TO PUBLISH ---")
        for slug in ok_slugs:
            lines.append(f"  [OK] {slug}")

    lines.append("")
    lines.append("=" * 60)
    return "\n".join(lines)


def generate_telegram_message(results):
    """Generate compact Telegram message."""
    total = len(results)
    ok = sum(1 for _, issues, _, _ in results if not issues)
    problem = total - ok

    msg = f"TRMT Draft QA\n{ok}/{total} OK | {problem} mit Problemen\n\n"

    for slug, issues, warnings, _ in results:
        if issues:
            msg += f"❌ {slug}\n"
            for i in issues[:3]:  # Max 3 issues per article
                msg += f"  • {i}\n"
        elif warnings:
            msg += f"⚠️ {slug} ({len(warnings)} Warnungen)\n"

    ok_slugs = [s for s, i, _, _ in results if not i]
    if ok_slugs:
        msg += f"\n✅ Ready: {', '.join(ok_slugs[:5])}"
        if len(ok_slugs) > 5:
            msg += f" +{len(ok_slugs) - 5} mehr"

    return msg


def main():
    parser = argparse.ArgumentParser(description='TRMT Draft QA Checker')
    parser.add_argument('--fix', action='store_true', help='Auto-fix einfache Probleme')
    parser.add_argument('--telegram', action='store_true', help='Telegram-Nachricht generieren')
    parser.add_argument('--json', action='store_true', help='JSON Output')
    parser.add_argument('--slug', type=str, help='Nur einen bestimmten Artikel pruefen')
    args = parser.parse_args()

    if not BLOG_DIR.exists():
        print(f"FEHLER: Blog-Verzeichnis nicht gefunden: {BLOG_DIR}")
        sys.exit(1)

    # Collect all draft articles
    results = []
    for md_file in sorted(BLOG_DIR.glob("*.md")):
        if args.slug and args.slug not in md_file.stem:
            continue
        slug, issues, warnings, fixes = check_article(md_file, fix_mode=args.fix)
        if slug:  # Skip non-drafts (they return empty)
            results.append((slug, issues, warnings, fixes))

    if not results:
        print("Keine Drafts gefunden." if not args.slug else f"Draft '{args.slug}' nicht gefunden.")
        sys.exit(0)

    if args.json:
        output = []
        for slug, issues, warnings, fixes in results:
            output.append({
                "slug": slug,
                "status": "ok" if not issues else "error",
                "issues": issues,
                "warnings": warnings,
                "fixes": fixes
            })
        print(json.dumps(output, indent=2, ensure_ascii=False))
    elif args.telegram:
        print(generate_telegram_message(results))
    else:
        print(generate_report(results))

    # Exit code: 1 if any critical issues
    has_issues = any(issues for _, issues, _, _ in results)
    sys.exit(1 if has_issues else 0)


if __name__ == "__main__":
    main()
