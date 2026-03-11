#!/usr/bin/env python3
"""
TRMT Auto-Indexing Script
Benachrichtigt Suchmaschinen nach jedem Deploy ueber neue/aktualisierte Seiten.

Methoden:
1. IndexNow (Bing, Yandex, Naver, DuckDuckGo - braucht API Key in static/)
2. Google Search Console API (optional, fuer URL-spezifische Indexierung)

HINWEIS: Google/Bing Sitemap Ping Endpoints sind seit 2023 deprecated.
IndexNow ist jetzt der Standard-Weg fuer sofortige Indexierung.

USAGE:
  python index-notify.py                    # IndexNow + optional GSC
  python index-notify.py --urls-only        # Nur neue URLs submitten
  python index-notify.py --setup-indexnow   # IndexNow Key generieren
  python index-notify.py --setup-gsc        # Google Search Console einrichten
  python index-notify.py --dry-run          # Nur anzeigen, nichts senden
"""

import argparse
import json
import os
import sys
import time
import urllib.request
import urllib.parse
import uuid
import xml.etree.ElementTree as ET
from pathlib import Path

SITE_URL = "https://therandommakertheory.com"
SITEMAP_URL = f"{SITE_URL}/sitemap.xml"
SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
INDEXNOW_KEY_FILE = PROJECT_DIR / "static" / "indexnow-key.txt"
LAST_URLS_FILE = SCRIPT_DIR / ".last-indexed-urls.json"
GSC_CREDENTIALS_FILE = SCRIPT_DIR / "gsc-service-account.json"
GSC_PROPERTY = "https://therandommakertheory.com/"


# ============================================================
# IndexNow (Bing, Yandex, Naver, DuckDuckGo, Seznam)
# ============================================================

def get_indexnow_key():
    """IndexNow API Key lesen oder None."""
    if INDEXNOW_KEY_FILE.exists():
        return INDEXNOW_KEY_FILE.read_text().strip()
    return None


def setup_indexnow():
    """IndexNow API Key generieren und speichern."""
    key = uuid.uuid4().hex[:32]
    INDEXNOW_KEY_FILE.write_text(key)
    key_verify_file = PROJECT_DIR / "static" / f"{key}.txt"
    key_verify_file.write_text(key)
    print(f"[OK] IndexNow Key generiert: {key}")
    print(f"     Gespeichert: {INDEXNOW_KEY_FILE}")
    print(f"     Verify-File: {key_verify_file}")
    print(f"     Nach Deploy erreichbar unter: {SITE_URL}/{key}.txt")
    return key


def submit_indexnow(urls, key=None):
    """URLs via IndexNow an Bing/Yandex/Naver/DuckDuckGo melden."""
    if not key:
        key = get_indexnow_key()
    if not key:
        print("[SKIP] IndexNow: Kein API Key. Nutze --setup-indexnow")
        return False

    # Batches von max 100 URLs (konservativ, Spec erlaubt 10k)
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

        # Nur einen Endpoint nutzen - api.indexnow.org verteilt an alle
        try:
            req = urllib.request.Request(
                "https://api.indexnow.org/indexnow",
                data=payload,
                headers={"Content-Type": "application/json; charset=utf-8"},
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=15) as resp:
                if resp.status in (200, 202):
                    print(f"[OK] IndexNow: {len(batch)} URLs submitted")
                    success = True
        except urllib.error.HTTPError as e:
            if e.code == 429:
                print(f"[WAIT] IndexNow: Rate limited. Warte 60s...")
                time.sleep(60)
                # Retry einmal
                try:
                    req = urllib.request.Request(
                        "https://api.indexnow.org/indexnow",
                        data=payload,
                        headers={"Content-Type": "application/json; charset=utf-8"},
                        method="POST"
                    )
                    with urllib.request.urlopen(req, timeout=15) as resp:
                        if resp.status in (200, 202):
                            print(f"[OK] IndexNow (retry): {len(batch)} URLs submitted")
                            success = True
                except Exception as e2:
                    print(f"[WARN] IndexNow retry fehlgeschlagen: {e2}")
            else:
                print(f"[WARN] IndexNow: HTTP {e.code} - {e.reason}")
        except Exception as e:
            print(f"[WARN] IndexNow: {e}")

        # Kleine Pause zwischen Batches
        if i + batch_size < len(urls):
            time.sleep(2)

    return success


# ============================================================
# Google Search Console API (URL Inspection + Indexing)
# ============================================================

def setup_gsc():
    """Anleitung fuer Google Search Console API Setup."""
    print("=== Google Search Console API Setup ===\n")
    print("Fuer automatische URL-Indexierung bei Google:\n")
    print("1. Google Cloud Console: https://console.cloud.google.com")
    print("2. Neues Projekt erstellen (oder bestehendes nutzen)")
    print("3. 'Web Search Indexing API' aktivieren")
    print("   -> APIs & Services -> Library -> 'Indexing API' suchen")
    print("4. Service Account erstellen:")
    print("   -> APIs & Services -> Credentials -> Create Credentials")
    print("   -> Service Account -> Name: 'trmt-indexing'")
    print("5. JSON Key erstellen:")
    print("   -> Service Account anklicken -> Keys -> Add Key -> JSON")
    print(f"6. JSON-Datei hierher kopieren: {GSC_CREDENTIALS_FILE}")
    print("7. Service Account Email in Search Console als 'Owner' hinzufuegen:")
    print("   -> Search Console -> Settings -> Users and permissions")
    print("   -> Add user -> Email aus dem JSON (endet auf @...iam.gserviceaccount.com)")
    print("   -> Permission: Owner")
    print("\nDanach: python index-notify.py")
    print("Das Script nutzt dann automatisch die Google Indexing API.")


def submit_to_google(urls):
    """URLs via Google Indexing API submitten."""
    if not GSC_CREDENTIALS_FILE.exists():
        print("[SKIP] Google Indexing API: Kein Service Account.")
        print("       Nutze --setup-gsc fuer Setup-Anleitung.")
        return False

    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
    except ImportError:
        print("[SKIP] Google Indexing API: google-api-python-client nicht installiert.")
        print("       pip install google-api-python-client google-auth")
        return False

    try:
        credentials = service_account.Credentials.from_service_account_file(
            str(GSC_CREDENTIALS_FILE),
            scopes=["https://www.googleapis.com/auth/indexing"]
        )
        service = build("indexing", "v3", credentials=credentials)
    except Exception as e:
        print(f"[ERROR] Google Auth fehlgeschlagen: {e}")
        return False

    success_count = 0
    error_count = 0

    # Google Indexing API: Max 200 Requests/Tag fuer neue Properties
    # Nur neue URLs submitten, nicht alle
    for url in urls[:200]:
        try:
            body = {
                "url": url,
                "type": "URL_UPDATED"
            }
            service.urlNotifications().publish(body=body).execute()
            success_count += 1
            # Rate limiting: max 1 Request pro Sekunde
            time.sleep(1.1)
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "rateLimitExceeded" in error_str:
                print(f"[WAIT] Google Rate Limit nach {success_count} URLs. Stop.")
                break
            else:
                error_count += 1
                if error_count <= 3:
                    print(f"[WARN] Google Indexing ({url}): {e}")
                elif error_count == 4:
                    print("[WARN] Weitere Fehler unterdrueckt...")

    if success_count > 0:
        print(f"[OK] Google Indexing API: {success_count} URLs submitted")
    if error_count > 0:
        print(f"[WARN] Google Indexing API: {error_count} Fehler")

    return success_count > 0


# ============================================================
# Sitemap + URL Tracking
# ============================================================

def fetch_sitemap_urls():
    """Aktuelle URLs aus der Sitemap holen."""
    try:
        req = urllib.request.Request(
            SITEMAP_URL,
            headers={"User-Agent": "TRMT-Indexer/1.0"}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            xml_data = resp.read()
        root = ET.fromstring(xml_data)
        ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        urls = [loc.text for loc in root.findall(".//sm:loc", ns)]
        return urls
    except Exception as e:
        print(f"[ERROR] Sitemap laden fehlgeschlagen: {e}")
        return []


def get_new_urls(current_urls):
    """Vergleiche aktuelle URLs mit dem letzten Stand."""
    if LAST_URLS_FILE.exists():
        with open(LAST_URLS_FILE, "r") as f:
            old_urls = set(json.load(f))
    else:
        old_urls = set()

    new_urls = [u for u in current_urls if u not in old_urls]
    return new_urls


def save_indexed_urls(urls):
    """Aktuellen URL-Stand speichern."""
    with open(LAST_URLS_FILE, "w") as f:
        json.dump(urls, f, indent=2)


# ============================================================
# Main
# ============================================================

def main():
    parser = argparse.ArgumentParser(description="TRMT Auto-Indexing")
    parser.add_argument("--setup-indexnow", action="store_true",
                        help="IndexNow API Key generieren")
    parser.add_argument("--setup-gsc", action="store_true",
                        help="Google Search Console API Setup-Anleitung")
    parser.add_argument("--urls-only", action="store_true",
                        help="Nur neue URLs submitten")
    parser.add_argument("--dry-run", action="store_true",
                        help="Nur anzeigen, nichts senden")
    parser.add_argument("--force-all", action="store_true",
                        help="Alle URLs submitten, nicht nur neue")
    args = parser.parse_args()

    if args.setup_indexnow:
        setup_indexnow()
        return

    if args.setup_gsc:
        setup_gsc()
        return

    print("=== TRMT Auto-Indexing ===\n")

    # 1. Aktuelle URLs aus Sitemap holen
    print("Lade Sitemap...")
    all_urls = fetch_sitemap_urls()
    if not all_urls:
        print("Keine URLs gefunden. Abbruch.")
        sys.exit(1)
    print(f"  {len(all_urls)} URLs in Sitemap\n")

    # 2. Neue URLs identifizieren
    new_urls = get_new_urls(all_urls)
    if new_urls:
        print(f"Neue URLs seit letztem Run ({len(new_urls)}):")
        for u in new_urls:
            print(f"  + {u}")
        print()
    else:
        print("Keine neuen URLs seit letztem Run.\n")

    if args.dry_run:
        print("[DRY RUN] Keine Requests gesendet.")
        save_indexed_urls(all_urls)
        return

    # URLs bestimmen
    if args.force_all:
        urls_to_submit = all_urls
        print(f"Force-All: {len(urls_to_submit)} URLs werden submitted.\n")
    elif new_urls:
        urls_to_submit = new_urls
    else:
        # Keine neuen URLs -> nichts submitten
        urls_to_submit = []
        print("Nichts zu submitten.\n")

    if urls_to_submit:
        # 3. IndexNow
        print("--- IndexNow (Bing, Yandex, DuckDuckGo, Naver) ---")
        submit_indexnow(urls_to_submit)
        print()

        # 4. Google Indexing API (wenn eingerichtet)
        print("--- Google Indexing API ---")
        submit_to_google(urls_to_submit)
        print()

    # 5. URL-Stand speichern
    save_indexed_urls(all_urls)
    print(f"URL-Stand gespeichert ({len(all_urls)} URLs)")
    print("\nFertig!")


if __name__ == "__main__":
    main()
