#!/usr/bin/env python3
"""
TRMT Daily Content Orchestrator
Verbindet alle Pipeline-Phasen: RSS → Thema → Artikel → Assets → Deploy

USAGE:
  # Automatisch (RSS Top-Thema):
  python daily-content.py

  # Mit spezifischem Thema:
  python daily-content.py --topic "Claude 4 Release: Was ist neu?"

  # Mit Link als Quelle:
  python daily-content.py --topic "Claude 4 Release" --link "https://..."

  # Dry Run (nur Thema waehlen, nichts erstellen):
  python daily-content.py --dry-run

  # Nur RSS fetchen und Thema anzeigen:
  python daily-content.py --rss-only

HINWEIS:
  Dieses Script ist der ORCHESTRATOR. Es ruft die einzelnen Phasen auf:
  1. RSS-Fetch (scripts/rss-fetch.py)
  2. NotebookLM Content Generation (notebooklm CLI)
  3. Image Optimization (PIL/Pillow)
  4. Git commit + push
  5. Search Engine Notification (scripts/index-notify.py)

  Phase 2 (NotebookLM) benoetigt lokale Auth.
  In GitHub Actions wird Phase 2 uebersprungen und ein Topic-Brief
  als Artifact gespeichert fuer manuelle Ausfuehrung.
"""

import argparse
import json
import os
import subprocess
import sys
import shutil
from datetime import datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
OUTPUT_DIR = PROJECT_DIR / "output" / "content-engine"
BLOG_DIR = PROJECT_DIR / "src" / "content" / "blog"
PODCAST_DIR = PROJECT_DIR / "src" / "content" / "podcast"
IMAGES_DIR = PROJECT_DIR / "static" / "images" / "blog"

# Max image sizes
MAX_IMAGE_SIZE_KB = 180
MAX_THUMB_SIZE_KB = 30
IMAGE_QUALITY_START = 80
IMAGE_QUALITY_MIN = 50


def run_cmd(cmd, capture=True, check=True):
    """Run a shell command and return output."""
    print(f"  $ {cmd}")
    result = subprocess.run(
        cmd, shell=True, capture_output=capture, text=True, check=check,
        env={**os.environ, "PYTHONIOENCODING": "utf-8"}
    )
    if capture and result.stdout:
        return result.stdout.strip()
    return ""


def phase1_fetch_rss(hours=24, top=5):
    """Phase 1: RSS-Feeds aggregieren und Top-Thema waehlen."""
    print("\n=== PHASE 1: RSS FETCH ===\n")

    rss_script = SCRIPT_DIR / "rss-fetch.py"
    if not rss_script.exists():
        print("[ERROR] rss-fetch.py nicht gefunden!")
        return None

    try:
        output = run_cmd(f"python3 {rss_script} --top {top} --hours {hours} --json --save")
        topics = json.loads(output)

        if not topics:
            print("[WARN] Keine Themen in den RSS-Feeds gefunden.")
            return None

        print(f"\n  Top {len(topics)} Themen:")
        for i, t in enumerate(topics, 1):
            print(f"  {i}. [{t['source_name']}] {t['title']} (Score: {t.get('score', 0):.0f})")

        return topics[0]  # Top-1 zurueckgeben

    except subprocess.CalledProcessError as e:
        print(f"[ERROR] RSS-Fetch fehlgeschlagen: {e}")
        return None
    except json.JSONDecodeError:
        print("[ERROR] RSS-Fetch Output ist kein valides JSON")
        return None


def phase2_generate_content(topic_title, topic_link=None, slug=None):
    """Phase 2: Content via NotebookLM generieren."""
    print("\n=== PHASE 2: CONTENT GENERATION ===\n")

    # Check if notebooklm CLI is available
    nlm_available = shutil.which("notebooklm") is not None

    if not nlm_available:
        print("[WARN] notebooklm CLI nicht gefunden.")
        print("[INFO] Content muss manuell erstellt werden.")
        print(f"[INFO] Nutze den TRMT Content Engine Skill:")
        print(f'  "Schreib einen Artikel ueber: {topic_title}"')

        # Save topic brief for manual execution
        brief = {
            "topic": topic_title,
            "link": topic_link,
            "slug": slug,
            "date": datetime.now().strftime("%Y-%m-%d"),
            "status": "pending_manual",
            "instructions": f"Nutze den TRMT Content Engine Skill mit: 'Schreib einen Artikel ueber: {topic_title}'"
        }
        brief_dir = OUTPUT_DIR / f"{datetime.now().strftime('%Y-%m-%d')}-{slug}"
        brief_dir.mkdir(parents=True, exist_ok=True)
        brief_file = brief_dir / "topic-brief.json"
        with open(brief_file, "w", encoding="utf-8") as f:
            json.dump(brief, f, ensure_ascii=False, indent=2)
        print(f"\n[OK] Topic-Brief gespeichert: {brief_file}")
        return False

    # NotebookLM is available — run the full pipeline
    print(f"  Topic: {topic_title}")
    print(f"  Link: {topic_link or 'N/A'}")
    print(f"  Slug: {slug}")

    # Check auth
    try:
        run_cmd("notebooklm status")
    except subprocess.CalledProcessError:
        print("[ERROR] NotebookLM Auth fehlt. Bitte 'notebooklm login' ausfuehren.")
        return False

    # Create notebook
    date_str = datetime.now().strftime("%Y-%m-%d")
    work_dir = OUTPUT_DIR / f"{date_str}-{slug}"
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        # Create notebook
        result = run_cmd(f'notebooklm create "TRMT: {topic_title[:50]}" --json')
        nb_data = json.loads(result)
        nb_id = nb_data.get("id") or nb_data.get("notebook_id")
        print(f"  Notebook ID: {nb_id}")

        # Set language
        run_cmd("notebooklm language set de")

        # Add source link if available
        if topic_link:
            run_cmd(f'notebooklm source add "{topic_link}" --notebook {nb_id} --json', check=False)

        # Deep research
        query = f"{topic_title} deutsch 2025 2026"
        run_cmd(f'notebooklm source add-research "{query}" --mode deep --no-wait --notebook {nb_id}', check=False)

        # Wait for research
        run_cmd(f'notebooklm research wait -n {nb_id} --import-all --timeout 300', check=False)

        # Generate report
        append_text = (
            "WICHTIG: Schreibe einen AUSFUEHRLICHEN Blog-Artikel auf Deutsch. "
            "Mindestens 2000 Woerter. Zielgruppe: Anfaenger bis Fortgeschrittene. "
            "Feynman-Methode. Stil: Locker, Buddy-like, ehrlich. Ich-Perspektive. "
            "Fuellwoerter: halt, quasi, echt, basically. Kurze Saetze. "
            "KEINE Corporate-Floskeln. Ende mit — TRMT."
        )
        run_cmd(
            f'notebooklm generate report --format blog-post '
            f'--append "{append_text}" --notebook {nb_id} --json'
        )

        # Download report
        run_cmd(f'notebooklm download report "{work_dir}/blog-raw.md" -n {nb_id}', check=False)

        # Generate audio (podcast)
        run_cmd(
            f'notebooklm generate audio '
            f'"Podcast-Zusammenfassung. Zwei Hosts, locker, natuerlich. Mindestens 15 Min." '
            f'--format deep-dive --length long --notebook {nb_id} --json',
            check=False
        )

        # Generate infographic (hero image)
        run_cmd(
            f'notebooklm generate infographic --orientation landscape --detail standard '
            f'--append "Blog-Header 16:9. Chalk-on-blackboard style. Dark charcoal (#1a1a1a). '
            f'Hand-drawn sketch. Amber (#d4893e) 70%. Teal (#3ab0a2) 30%. '
            f'No photographs, only hand-drawn chalk sketches." --notebook {nb_id} --json',
            check=False
        )

        print(f"\n[OK] Content generiert in: {work_dir}")
        return True

    except Exception as e:
        print(f"[ERROR] Content Generation fehlgeschlagen: {e}")
        return False


def phase3_optimize_images(slug):
    """Phase 3: Bilder optimieren (WebP, max 180KB)."""
    print("\n=== PHASE 3: IMAGE OPTIMIZATION ===\n")

    try:
        from PIL import Image
    except ImportError:
        print("[WARN] Pillow nicht installiert. pip install Pillow")
        return False

    date_str = datetime.now().strftime("%Y-%m-%d")
    work_dir = OUTPUT_DIR / f"{date_str}-{slug}"

    if not work_dir.exists():
        print(f"[SKIP] Work dir nicht gefunden: {work_dir}")
        return False

    # Find all PNG images
    images = list(work_dir.glob("*.png")) + list(work_dir.glob("*.jpg"))

    if not images:
        print("[SKIP] Keine Bilder zum Optimieren gefunden.")
        return False

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    for i, img_path in enumerate(images, 1):
        print(f"  [{i}/{len(images)}] {img_path.name}")

        img = Image.open(img_path)

        # Determine output name
        if "hero" in img_path.stem.lower() or "thumbnail" in img_path.stem.lower():
            out_name = f"{slug}-1"
        elif "infochart" in img_path.stem.lower():
            num = 2 + i  # Start at 2 for infocharts
            out_name = f"{slug}-{num}"
        else:
            out_name = f"{slug}-{i+1}"

        # Resize to 1920x1080 if needed
        if img.size != (1920, 1080):
            img = img.resize((1920, 1080), Image.LANCZOS)

        # Save with decreasing quality until under MAX_IMAGE_SIZE_KB
        quality = IMAGE_QUALITY_START
        out_path = IMAGES_DIR / f"{out_name}.webp"

        while quality >= IMAGE_QUALITY_MIN:
            img.save(out_path, "WebP", quality=quality)
            size_kb = out_path.stat().st_size / 1024

            if size_kb <= MAX_IMAGE_SIZE_KB:
                print(f"    → {out_path.name} ({size_kb:.0f}KB, q={quality})")
                break

            quality -= 5
        else:
            print(f"    → {out_path.name} ({size_kb:.0f}KB, q={quality}) ⚠️ Ueber {MAX_IMAGE_SIZE_KB}KB!")

        # Generate thumbnail
        thumb = img.resize((400, 225), Image.LANCZOS)
        thumb_path = IMAGES_DIR / f"{out_name}-thumb.webp"
        thumb_quality = 75

        while thumb_quality >= 50:
            thumb.save(thumb_path, "WebP", quality=thumb_quality)
            thumb_size = thumb_path.stat().st_size / 1024

            if thumb_size <= MAX_THUMB_SIZE_KB:
                print(f"    → {thumb_path.name} ({thumb_size:.0f}KB, q={thumb_quality})")
                break

            thumb_quality -= 5

    return True


def phase4_deploy(slug):
    """Phase 4: Git commit + push → Vercel auto-deploy."""
    print("\n=== PHASE 4: DEPLOY ===\n")

    os.chdir(PROJECT_DIR)

    # Check if there are changes
    status = run_cmd("git status --porcelain")
    if not status:
        print("[SKIP] Keine Aenderungen zum Committen.")
        return False

    # Stage blog content + images
    run_cmd(f"git add src/content/blog/{slug}.md", check=False)
    run_cmd(f"git add src/content/podcast/", check=False)
    run_cmd(f"git add static/images/blog/{slug}-*", check=False)

    # Commit
    date_str = datetime.now().strftime("%Y-%m-%d")
    run_cmd(f'git commit -m "content: {slug} — Blog + Podcast + Assets ({date_str})"', check=False)

    # Pull + Push
    run_cmd("git pull --rebase origin main", check=False)
    run_cmd("git push origin main", check=False)

    print(f"\n[OK] Deployed! https://therandommakertheory.com/blog/{slug}")
    return True


def phase5_notify(slug):
    """Phase 5: Suchmaschinen benachrichtigen."""
    print("\n=== PHASE 5: SEARCH ENGINE NOTIFICATION ===\n")

    index_script = SCRIPT_DIR / "index-notify.py"
    if not index_script.exists():
        print("[SKIP] index-notify.py nicht gefunden.")
        return False

    run_cmd(f"python3 {index_script}", check=False)
    return True


def generate_slug(title):
    """Generate a URL-friendly slug from title."""
    import re
    # Remove special chars, lowercase
    slug = title.lower()
    slug = re.sub(r'[äÄ]', 'ae', slug)
    slug = re.sub(r'[öÖ]', 'oe', slug)
    slug = re.sub(r'[üÜ]', 'ue', slug)
    slug = re.sub(r'[ß]', 'ss', slug)
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'[\s]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    # Max 5 words
    words = slug.split('-')[:5]
    return '-'.join(words)


def main():
    parser = argparse.ArgumentParser(description="TRMT Daily Content Orchestrator")
    parser.add_argument("--topic", type=str, default=None, help="Spezifisches Thema")
    parser.add_argument("--link", type=str, default=None, help="Quell-URL")
    parser.add_argument("--source", type=str, default=None, help="Quell-Name")
    parser.add_argument("--dry-run", action="store_true", help="Nur Thema waehlen")
    parser.add_argument("--rss-only", action="store_true", help="Nur RSS fetchen")
    parser.add_argument("--skip-deploy", action="store_true", help="Kein Git push")
    parser.add_argument("--skip-notify", action="store_true", help="Keine Indexing-Notification")
    args = parser.parse_args()

    print("=" * 50)
    print("  TRMT Daily Content Pipeline")
    print(f"  {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print("=" * 50)

    # Phase 1: Thema waehlen
    if args.topic:
        topic_title = args.topic
        topic_link = args.link
        print(f"\n  Manuelles Thema: {topic_title}")
    else:
        rss_result = phase1_fetch_rss()
        if not rss_result:
            print("\n[EXIT] Kein Thema gefunden. Abbruch.")
            sys.exit(0)
        topic_title = rss_result["title"]
        topic_link = rss_result.get("link")

    slug = generate_slug(topic_title)
    print(f"\n  Thema: {topic_title}")
    print(f"  Slug: {slug}")
    print(f"  Link: {topic_link or 'N/A'}")

    if args.rss_only or args.dry_run:
        print("\n[DRY RUN] Fertig. Keine Content-Erstellung.")
        sys.exit(0)

    # Phase 2: Content generieren
    content_ok = phase2_generate_content(topic_title, topic_link, slug)

    if not content_ok:
        print("\n[INFO] Content muss manuell erstellt werden.")
        print(f"[INFO] Topic-Brief wurde gespeichert.")
        sys.exit(0)

    # Phase 3: Bilder optimieren
    phase3_optimize_images(slug)

    # Phase 4: Deploy
    if not args.skip_deploy:
        phase4_deploy(slug)

    # Phase 5: Notify
    if not args.skip_notify:
        phase5_notify(slug)

    # Status Report
    print("\n" + "=" * 50)
    print("  TRMT Content Pipeline — DONE!")
    print("=" * 50)
    print(f"\n  Blog:  https://therandommakertheory.com/blog/{slug}")
    print(f"  Slug:  {slug}")
    print(f"  Topic: {topic_title}")
    print(f"\n  Noch manuell:")
    print(f"  1. Podcast MP3 → Spotify hochladen")
    print(f"  2. Video MP4 → YouTube hochladen")
    print(f"  3. URLs in Frontmatter nachtragen")
    print()


if __name__ == "__main__":
    main()
