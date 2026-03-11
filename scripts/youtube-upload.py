#!/usr/bin/env python3
"""
TRMT YouTube Upload & Update Script
Laedt Videos via YouTube Data API v3 hoch und kann bestehende Videos updaten.

SETUP (einmalig):
1. Google Cloud Console: https://console.cloud.google.com
2. Neues Projekt erstellen oder bestehendes nutzen
3. YouTube Data API v3 aktivieren
4. OAuth 2.0 Client-ID erstellen (Typ: Desktop-App)
5. client_secret.json runterladen und in diesen Ordner legen
6. pip install google-api-python-client google-auth-oauthlib

USAGE:
  # Neues Video hochladen:
  python youtube-upload.py video.mp4 --meta meta.json
  python youtube-upload.py video.mp4 --title "Mein Video" --description "Beschreibung"

  # Bestehendes Video updaten (Title, Description, Tags, Privacy):
  python youtube-upload.py --update VIDEO_ID --meta meta.json
  python youtube-upload.py --update KWIH_InMQZ8 --privacy public

TERMINAL OEFFNEN IN:
  C:\\Users\\User\\Documents\\Claude_Code\\the-random-maker-theory\\scripts

VIDEO-DATEIEN LIEGEN IN:
  C:\\Users\\User\\Documents\\Claude_Code\\output\\content-engine\\{datum}-{slug}\\video.mp4
"""

import argparse
import json
import os
import sys
from pathlib import Path

try:
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request
    from googleapiclient.discovery import build
    from googleapiclient.http import MediaFileUpload
except ImportError:
    print("Fehlende Pakete. Installiere mit:")
    print("  pip install google-api-python-client google-auth-oauthlib")
    sys.exit(1)

# Breitere Scope: Upload + Video-Management (Update, Thumbnails etc.)
SCOPES = ["https://www.googleapis.com/auth/youtube"]
SCRIPT_DIR = Path(__file__).parent
TOKEN_FILE = SCRIPT_DIR / "youtube-token.json"
CLIENT_SECRET = SCRIPT_DIR / "client_secret.json"

# TRMT Standard-Werte
TRMT_DEFAULTS = {
    "categoryId": "28",  # Wissenschaft & Technik
    "defaultLanguage": "de",
    "tags": [
        "trmt", "the random maker theory", "tech blog deutsch",
        "ki tools", "tutorial deutsch"
    ],
    "privacyStatus": "public",
    "madeForKids": False,
}


def get_authenticated_service():
    """OAuth2 Login. Beim ersten Mal oeffnet sich der Browser."""
    creds = None

    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except Exception:
                # Token ungueltig, neu authentifizieren
                creds = None

        if not creds:
            if not CLIENT_SECRET.exists():
                print(f"FEHLER: {CLIENT_SECRET} nicht gefunden!")
                print("Lade die OAuth Client-ID von Google Cloud Console runter.")
                print("https://console.cloud.google.com/apis/credentials")
                sys.exit(1)

            flow = InstalledAppFlow.from_client_secrets_file(
                str(CLIENT_SECRET), SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open(TOKEN_FILE, "w") as f:
            f.write(creds.to_json())
        print("Token gespeichert. Naechstes Mal kein Browser-Login noetig.")

    return build("youtube", "v3", credentials=creds)


def merge_tags(custom_tags=None):
    """TRMT Default-Tags mit Custom-Tags mergen, Duplikate entfernen."""
    all_tags = list(TRMT_DEFAULTS["tags"])
    if custom_tags:
        all_tags.extend(custom_tags)
    # Duplikate entfernen, Reihenfolge beibehalten
    all_tags = list(dict.fromkeys(all_tags))

    # YouTube Tag-Limit: 500 Zeichen gesamt
    total_chars = sum(len(t) for t in all_tags)
    while total_chars > 480 and all_tags:
        removed = all_tags.pop()
        total_chars -= len(removed)
        print(f"  [WARN] Tag entfernt (500-Zeichen-Limit): {removed}")

    return all_tags


def upload_video(youtube, video_file, title, description, tags=None,
                 category_id=None, privacy="public", thumbnail=None):
    """Video hochladen mit allen Metadaten."""

    all_tags = merge_tags(tags)

    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": all_tags,
            "categoryId": category_id or TRMT_DEFAULTS["categoryId"],
            "defaultLanguage": TRMT_DEFAULTS["defaultLanguage"],
            "defaultAudioLanguage": TRMT_DEFAULTS["defaultLanguage"],
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": TRMT_DEFAULTS["madeForKids"],
        },
    }

    print(f"Uploading: {video_file}")
    print(f"Title: {title}")
    print(f"Tags ({len(all_tags)}): {', '.join(all_tags)}")
    print(f"Privacy: {privacy}")

    media = MediaFileUpload(
        video_file,
        mimetype="video/mp4",
        resumable=True,
        chunksize=10 * 1024 * 1024  # 10MB chunks
    )

    request = youtube.videos().insert(
        part="snippet,status",
        body=body,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            pct = int(status.progress() * 100)
            print(f"  Upload: {pct}%")

    video_id = response["id"]
    video_url = f"https://www.youtube.com/watch?v={video_id}"
    print(f"\nErfolgreich hochgeladen!")
    print(f"URL: {video_url}")

    # Thumbnail setzen
    set_thumbnail(youtube, video_id, thumbnail)

    return video_id, video_url


def update_video(youtube, video_id, title=None, description=None,
                 tags=None, category_id=None, privacy=None, thumbnail=None):
    """Bestehendes Video updaten (Metadaten, Privacy, Thumbnail)."""

    # Aktuelle Video-Daten holen
    print(f"Lade aktuelle Daten fuer Video: {video_id}")
    current = youtube.videos().list(
        part="snippet,status",
        id=video_id
    ).execute()

    if not current.get("items"):
        print(f"FEHLER: Video {video_id} nicht gefunden!")
        sys.exit(1)

    video = current["items"][0]
    snippet = video["snippet"]
    status = video["status"]

    # Nur geaenderte Felder ueberschreiben
    if title:
        snippet["title"] = title
    if description:
        snippet["description"] = description
    if tags:
        snippet["tags"] = merge_tags(tags)
    if category_id:
        snippet["categoryId"] = category_id

    body = {
        "id": video_id,
        "snippet": snippet,
        "status": status,
    }

    if privacy:
        body["status"]["privacyStatus"] = privacy

    print(f"Updating: {video_id}")
    print(f"Title: {snippet['title']}")
    if tags:
        print(f"Tags ({len(snippet.get('tags', []))}): {', '.join(snippet.get('tags', []))}")
    if privacy:
        print(f"Privacy: {privacy}")

    youtube.videos().update(
        part="snippet,status",
        body=body
    ).execute()

    print(f"\nErfolgreich aktualisiert!")
    print(f"URL: https://www.youtube.com/watch?v={video_id}")

    # Thumbnail setzen
    set_thumbnail(youtube, video_id, thumbnail)

    return video_id


def set_thumbnail(youtube, video_id, thumbnail):
    """Thumbnail fuer ein Video setzen."""
    if not thumbnail:
        return

    # Relativer Pfad? Relativ zu SCRIPT_DIR aufloesen
    thumb_path = Path(thumbnail)
    if not thumb_path.is_absolute():
        thumb_path = SCRIPT_DIR / thumbnail

    if not thumb_path.exists():
        print(f"[WARN] Thumbnail nicht gefunden: {thumb_path}")
        return

    # Mimetype bestimmen
    ext = thumb_path.suffix.lower()
    mime = {"png": "image/png", ".png": "image/png",
            ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
            ".webp": "image/webp"}.get(ext, "image/png")

    print(f"Setze Thumbnail: {thumb_path}")
    try:
        youtube.thumbnails().set(
            videoId=video_id,
            media_body=MediaFileUpload(str(thumb_path), mimetype=mime)
        ).execute()
        print("Thumbnail gesetzt.")
    except Exception as e:
        print(f"[WARN] Thumbnail konnte nicht gesetzt werden: {e}")
        print("       (Kanal muss verifiziert sein fuer Custom Thumbnails)")


def load_meta(meta_file):
    """Lade Metadaten aus JSON-Datei."""
    with open(meta_file, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    parser = argparse.ArgumentParser(description="TRMT YouTube Upload & Update")
    parser.add_argument("video", nargs="?", help="Pfad zur Video-Datei (fuer Upload)")
    parser.add_argument("--title", "-t", help="Video-Titel")
    parser.add_argument("--description", "-d", help="Video-Beschreibung")
    parser.add_argument("--tags", nargs="+", help="Zusaetzliche Tags")
    parser.add_argument("--thumbnail", help="Thumbnail-Bild (PNG/JPG/WebP)")
    parser.add_argument("--privacy", default=None,
                        choices=["public", "private", "unlisted"])
    parser.add_argument("--meta", "-m", help="JSON-Datei mit Metadaten")
    parser.add_argument("--category", default="28",
                        help="YouTube Kategorie-ID (28=Science&Tech)")
    parser.add_argument("--update", "-u", help="Video-ID zum Updaten (statt Upload)")

    args = parser.parse_args()

    # Metadaten aus JSON oder Argumenten
    title = args.title
    description = args.description or ""
    tags = args.tags or []
    thumbnail = args.thumbnail
    privacy = args.privacy
    category = args.category

    if args.meta:
        meta = load_meta(args.meta)
        title = meta.get("title", title)
        description = meta.get("description", description)
        tags = meta.get("tags", tags)
        thumbnail = meta.get("thumbnail", thumbnail)
        privacy = meta.get("privacy", privacy)
        category = meta.get("categoryId", category)

    youtube = get_authenticated_service()

    # UPDATE-Modus
    if args.update:
        video_id = args.update
        update_video(
            youtube, video_id,
            title=title, description=description,
            tags=tags if tags else None,
            category_id=category, privacy=privacy,
            thumbnail=thumbnail
        )
        return

    # UPLOAD-Modus
    if not args.video:
        print("FEHLER: Video-Datei oder --update VIDEO_ID angeben!")
        parser.print_help()
        sys.exit(1)

    if not os.path.exists(args.video):
        print(f"FEHLER: Video-Datei nicht gefunden: {args.video}")
        sys.exit(1)

    if not title:
        print("FEHLER: Titel ist Pflicht (--title oder --meta)")
        sys.exit(1)

    video_id, video_url = upload_video(
        youtube, args.video, title, description,
        tags=tags, category_id=category,
        privacy=privacy or "public", thumbnail=thumbnail
    )

    # URL in Datei speichern fuer weitere Nutzung
    result_file = Path(args.video).with_suffix(".youtube.json")
    with open(result_file, "w") as f:
        json.dump({"videoId": video_id, "url": video_url, "title": title}, f, indent=2)
    print(f"Video-Info gespeichert: {result_file}")


if __name__ == "__main__":
    main()
