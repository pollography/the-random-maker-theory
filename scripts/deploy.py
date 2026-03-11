#!/usr/bin/env python3
"""
TRMT Unified Deploy & Index Script
===================================
Ein Script fuer alles: Git commit/push, Vercel deploy abwarten,
Suchmaschinen benachrichtigen (IndexNow + Google Indexing API).

USAGE:
  python scripts/deploy.py                # Full deploy: git + index
  python scripts/deploy.py --index-only   # Nur Indexierung (kein git)
  python scripts/deploy.py --dry-run      # Alles anzeigen, nichts tun
  python scripts/deploy.py --force-index  # Alle URLs indexieren, nicht nur neue
  python scripts/deploy.py --setup        # Ersteinrichtung (IndexNow Key etc.)

TERMINAL OEFFNEN IN:
  C:\\Users\\User\\Documents\\Claude_Code\\the-random-maker-theory
"""

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request
import urllib.parse
import uuid
import xml.etree.ElementTree as ET
from datetime import datetime
from pathlib import Path

# ============================================================
# Config
# ============================================================

SITE_URL = "https://therandommakertheory.com"
SITEMAP_URL = f"{SITE_URL}/sitemap.xml"
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
INDEXNOW_KEY_FILE = PROJECT_DIR / "static" / "indexnow-key.txt"
LAST_URLS_FILE = SCRIPT_DIR / ".last-indexed-urls.json"
GSC_CREDENTIALS_FILE = SCRIPT_DIR / "gsc-service-account.json"

# Farben fuer Terminal Output (Windows + Unix)
if sys.platform == "win32":
    os.system("")  # Aktiviert ANSI auf Windows

GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
CYAN = "\033[96m"
BOLD = "\033[1m"
RESET = "\033[0m"


def log_ok(msg):
    print(f"  {GREEN}[OK]{RESET} {msg}")

def log_skip(msg):
    print(f"  {YELLOW}[SKIP]{RESET} {msg}")

def log_warn(msg):
    print(f"  {YELLOW}[WARN]{RESET} {msg}")

def log_err(msg):
    print(f"  {RED}[ERROR]{RESET} {msg}")

def log_info(msg):
    print(f"  {CYAN}[INFO]{RESET} {msg}")

def header(title):
    print(f"\n{BOLD}{'=' * 50}{RESET}")
    print(f"{BOLD}  {title}{RESET}")
    print(f"{BOLD}{'=' * 50}{RESET}\n")


# ============================================================
# Git Operations
# ============================================================

def cleanup_git_locks():
    """Verwaiste .lock Files entfernen (z.B. nach Absturz)."""
    lock_files = [
        PROJECT_DIR / ".git" / "HEAD.lock",
        PROJECT_DIR / ".git" / "index.lock",
    ]
    for lock in lock_files:
        if lock.exists():
            try:
                lock.unlink()
                log_warn(f"Lock-File entfernt: {lock.name}")
            except Exception as e:
                log_err(f"Lock-File {lock.name} konnte nicht entfernt werden: {e}")


def run_git(*args):
    """Git Command ausfuehren, Output zurueckgeben."""
    result = subprocess.run(
        ["git"] + list(args),
        capture_output=True, text=True, cwd=str(PROJECT_DIR)
    )
    return result.returncode, result.stdout.strip(), result.stderr.strip()


def git_deploy(dry_run=False):
    """Git add, commit, pull --rebase, push."""

    # 0. Lock-Files aufraeumen
    cleanup_git_locks()

    # 1. Status checken
    code, out, _ = run_git("status", "--porcelain")
    if code != 0:
        log_err("Kein Git-Repository gefunden!")
        return False

    if not out:
        log_info("Keine Aenderungen. Nichts zu committen.")
        return True

    # Geaenderte Files anzeigen
    print("  Geaenderte Dateien:")
    for line in out.split("\n")[:15]:
        print(f"    {line}")
    if out.count("\n") > 15:
        print(f"    ... und {out.count(chr(10)) - 15} weitere")
    print()

    if dry_run:
        log_info("[DRY RUN] Wuerde committen + pushen.")
        return True

    # 2. Stage all
    code, _, err = run_git("add", "-A")
    if code != 0:
        log_err(f"git add fehlgeschlagen: {err}")
        return False

    # 3. Commit
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    code, _, err = run_git("commit", "-m", f"content: update {timestamp}")
    if code != 0:
        if "nothing to commit" in err:
            log_info("Nichts zu committen.")
            return True
        log_err(f"git commit fehlgeschlagen: {err}")
        return False
    log_ok("Commit erstellt")

    # 4. Pull --rebase (falls Remote-Aenderungen, z.B. Sveltia CMS)
    code, _, err = run_git("pull", "--rebase", "origin", "main")
    if code != 0:
        log_err(f"git pull --rebase fehlgeschlagen: {err}")
        log_warn("Moeglicherweise Merge-Konflikt. Manuell loesen: git rebase --abort")
        return False
    log_ok("Remote synchronisiert")

    # 5. Push
    code, _, err = run_git("push", "origin", "main")
    if code != 0:
        log_err(f"git push fehlgeschlagen: {err}")
        return False
    log_ok("Pushed to GitHub -> Vercel baut jetzt...")

    return True


# ============================================================
# Wait for Vercel (optional, best-effort)
# ============================================================

def wait_for_deploy(timeout=90):
    """Warte bis die Sitemap sich aendert (= Deploy ist durch)."""
    log_info(f"Warte auf Vercel Deploy (max {timeout}s)...")

    # Aktuelle Sitemap holen als Baseline
    old_sitemap = None
    try:
        req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "TRMT-Deploy/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            old_sitemap = resp.read()
    except Exception:
        pass

    # 30s Mindestwartezeit (Vercel braucht ~30-60s)
    time.sleep(30)

    # Dann alle 10s pruefen ob Site erreichbar
    start = time.time()
    while time.time() - start < timeout - 30:
        try:
            req = urllib.request.Request(
                SITE_URL,
                headers={"User-Agent": "TRMT-Deploy/1.0"},
                method="HEAD"
            )
            with urllib.request.urlopen(req, timeout=5) as resp:
                if resp.status == 200:
                    log_ok("Site ist live!")
                    return True
        except Exception:
            pass
        time.sleep(10)

    log_warn("Timeout beim Warten auf Deploy. Indexierung laeuft trotzdem.")
    return True


# ============================================================
# IndexNow
# ============================================================

def get_indexnow_key():
    if INDEXNOW_KEY_FILE.exists():
        return INDEXNOW_KEY_FILE.read_text().strip()
    return None


def setup_indexnow():
    key = uuid.uuid4().hex[:32]
    INDEXNOW_KEY_FILE.write_text(key)
    key_verify_file = PROJECT_DIR / "static" / f"{key}.txt"
    key_verify_file.write_text(key)
    log_ok(f"IndexNow Key: {key}")
    log_info(f"Gespeichert: {INDEXNOW_KEY_FILE}")
    log_info(f"Verify-File: {key_verify_file}")
    log_info(f"Nach Deploy erreichbar: {SITE_URL}/{key}.txt")
    return key


def submit_indexnow(urls, dry_run=False):
    key = get_indexnow_key()
    if not key:
        log_skip("IndexNow: Kein API Key. Nutze --setup")
        return False

    if dry_run:
        log_info(f"[DRY RUN] Wuerde {len(urls)} URLs via IndexNow senden")
        return True

    batch_size = 100
    success = False

    for i in range(0, len(urls), batch_size):
        batch = urls[i:i + batch_size]
        payload = json.dumps({
            "host": "therandommakertheory.com",
            "key": key,
            "keyLocation": f"{SITE_URL}/{key}.txt",
            "urlList": batch
        }).encode("utf-8")

        try:
            req = urllib.request.Request(
                "https://api.indexnow.org/indexnow",
                data=payload,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                if resp.status in (200, 202):
                    log_ok(f"IndexNow: {len(batch)} URLs submitted")
                    success = True
        except urllib.error.HTTPError as e:
            if e.code == 429:
                log_warn("IndexNow: Rate limited, warte 60s...")
                time.sleep(60)
            else:
                log_warn(f"IndexNow: HTTP {e.code}")
        except Exception as e:
            log_warn(f"IndexNow: {e}")

        if i + batch_size < len(urls):
            time.sleep(2)

    return success


# ============================================================
# Google Indexing API
# ============================================================

def submit_google(urls, dry_run=False):
    if not GSC_CREDENTIALS_FILE.exists():
        log_skip("Google Indexing API: Kein Service Account (gsc-service-account.json)")
        return False

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
    except ImportError:
        log_skip("Google API Libraries fehlen: pip install google-api-python-client google-auth")
        return False

    if dry_run:
        log_info(f"[DRY RUN] Wuerde {len(urls)} URLs an Google senden")
        return True

    try:
        credentials = service_account.Credentials.from_service_account_file(
            str(GSC_CREDENTIALS_FILE),
            scopes=["https://www.googleapis.com/auth/indexing"]
        )
        service = build("indexing", "v3", credentials=credentials)
    except Exception as e:
        log_err(f"Google Auth fehlgeschlagen: {e}")
        return False

    success_count = 0
    error_count = 0

    for url in urls[:200]:  # Max 200/Tag fuer neue Properties
        try:
            service.urlNotifications().publish(
                body={"url": url, "type": "URL_UPDATED"}
            ).execute()
            success_count += 1
            time.sleep(1.1)  # Rate limit: 1 req/s
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "rateLimitExceeded" in error_str:
                log_warn(f"Google Rate Limit nach {success_count} URLs. Stop.")
                break
            error_count += 1
            if error_count <= 3:
                log_warn(f"Google ({url}): {e}")

    if success_count > 0:
        log_ok(f"Google Indexing API: {success_count} URLs submitted")
    if error_count > 0:
        log_warn(f"Google Indexing API: {error_count} Fehler")

    return success_count > 0


# ============================================================
# Sitemap + URL Tracking
# ============================================================

def fetch_sitemap_urls():
    try:
        req = urllib.request.Request(SITEMAP_URL, headers={"User-Agent": "TRMT-Deploy/1.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            xml_data = resp.read()
        root = ET.fromstring(xml_data)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        return [loc.text for loc in root.findall(".//sm:loc", ns)]
    except Exception as e:
        log_err(f"Sitemap laden fehlgeschlagen: {e}")
        return []


def get_new_urls(current_urls):
    if LAST_URLS_FILE.exists():
        with open(LAST_URLS_FILE, "r") as f:
            old_urls = set(json.load(f))
    else:
        old_urls = set()
    return [u for u in current_urls if u not in old_urls]


def save_indexed_urls(urls):
    with open(LAST_URLS_FILE, "w") as f:
        json.dump(urls, f, indent=2)


# ============================================================
# Main
# ============================================================

def main():
    parser = argparse.ArgumentParser(description="TRMT Deploy & Index")
    parser.add_argument("--index-only", action="store_true",
                        help="Nur Indexierung, kein Git deploy")
    parser.add_argument("--dry-run", action="store_true",
                        help="Alles anzeigen, nichts ausfuehren")
    parser.add_argument("--force-index", action="store_true",
                        help="Alle URLs indexieren, nicht nur neue")
    parser.add_argument("--no-wait", action="store_true",
                        help="Nicht auf Vercel Deploy warten")
    parser.add_argument("--setup", action="store_true",
                        help="Ersteinrichtung (IndexNow Key)")
    args = parser.parse_args()

    header("TRMT Deploy & Index")

    if args.setup:
        print(f"{BOLD}--- IndexNow Setup ---{RESET}")
        setup_indexnow()
        print(f"\n{BOLD}--- Google Indexing API ---{RESET}")
        if GSC_CREDENTIALS_FILE.exists():
            log_ok("Service Account vorhanden")
        else:
            log_warn("gsc-service-account.json fehlt")
            log_info("Setup: python scripts/deploy.py (altes Script: --setup-gsc)")
        return

    # ---- PHASE 1: GIT DEPLOY ----
    if not args.index_only:
        print(f"{BOLD}--- Phase 1: Git Deploy ---{RESET}\n")
        git_ok = git_deploy(dry_run=args.dry_run)
        if not git_ok:
            log_err("Deploy abgebrochen.")
            sys.exit(1)

        # Auf Vercel warten (nur wenn was gepusht wurde)
        if not args.no_wait and not args.dry_run:
            print(f"\n{BOLD}--- Phase 2: Vercel Deploy ---{RESET}\n")
            wait_for_deploy(timeout=90)
    else:
        log_info("--index-only: Git-Phase uebersprungen")

    # ---- PHASE 3: INDEXIERUNG ----
    print(f"\n{BOLD}--- Phase 3: Suchmaschinen-Indexierung ---{RESET}\n")

    log_info("Lade Sitemap...")
    all_urls = fetch_sitemap_urls()
    if not all_urls:
        log_err("Keine URLs in Sitemap. Indexierung abgebrochen.")
        sys.exit(1)
    log_info(f"{len(all_urls)} URLs in Sitemap")

    new_urls = get_new_urls(all_urls)
    if new_urls:
        print(f"\n  Neue URLs ({len(new_urls)}):")
        for u in new_urls[:10]:
            print(f"    + {u}")
        if len(new_urls) > 10:
            print(f"    ... und {len(new_urls) - 10} weitere")
        print()

    # URLs bestimmen
    if args.force_index:
        urls_to_submit = all_urls
        log_info(f"Force-Index: alle {len(urls_to_submit)} URLs")
    elif new_urls:
        urls_to_submit = new_urls
    else:
        urls_to_submit = []
        log_info("Keine neuen URLs. Nichts zu indexieren.")

    if urls_to_submit:
        # IndexNow (Bing, Yandex, DuckDuckGo, Naver)
        print()
        submit_indexnow(urls_to_submit, dry_run=args.dry_run)

        # Google Indexing API
        print()
        submit_google(urls_to_submit, dry_run=args.dry_run)

    # URL-Stand speichern
    if not args.dry_run:
        save_indexed_urls(all_urls)

    # ---- DONE ----
    header("Fertig!")
    print(f"  {GREEN}Site:{RESET}  {SITE_URL}")
    if urls_to_submit:
        print(f"  {GREEN}Indexiert:{RESET} {len(urls_to_submit)} URLs")
    print()


if __name__ == "__main__":
    main()
