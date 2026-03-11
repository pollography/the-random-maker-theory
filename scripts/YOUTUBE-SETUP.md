# YouTube Upload Setup (einmalig)

## Was du brauchst
- Google Account (dein YouTube-Kanal)
- Python 3.x installiert
- 10 Minuten Zeit

## Schritt 1: Google Cloud Console

1. Geh zu https://console.cloud.google.com
2. Oben links: **Select a project** -> **New Project**
   - Name: `TRMT-YouTube` (egal was, nur fuer dich)
   - Create
3. Warte bis das Projekt erstellt ist, waehle es aus

## Schritt 2: YouTube Data API aktivieren

1. Im Menue links: **APIs & Services** -> **Library**
2. Suche: `YouTube Data API v3`
3. Klick drauf -> **Enable**

## Schritt 3: OAuth Client-ID erstellen

1. **APIs & Services** -> **Credentials**
2. Oben: **+ CREATE CREDENTIALS** -> **OAuth client ID**
3. Falls "Configure Consent Screen" kommt:
   - User Type: **External** -> Create
   - App Name: `TRMT Upload`
   - User Support Email: deine Email
   - Developer Contact: deine Email
   - Save and Continue (alles andere skippen)
   - **Publish App** (sonst Token laeuft nach 7 Tagen ab!)
4. Zurueck zu Credentials -> **+ CREATE CREDENTIALS** -> **OAuth client ID**
   - Application Type: **Desktop app**
   - Name: `TRMT Upload`
   - Create
5. **Download JSON** klicken

## Schritt 4: Datei platzieren

Die runtergeladene JSON-Datei hierhin verschieben:

```
the-random-maker-theory/scripts/client_secret.json
```

Der Dateiname muss EXAKT `client_secret.json` sein.

## Schritt 5: Python-Pakete installieren

```bash
pip install google-api-python-client google-auth-oauthlib
```

## Wichtig: Wo liegen die Video-Dateien?

Die Content-Engine speichert Videos hier:
```
C:\Users\User\Documents\Claude_Code\output\content-engine\{datum}-{slug}\video.mp4
```

Beispiel Episode 002:
```
C:\Users\User\Documents\Claude_Code\output\content-engine\2026-03-10-perfekt-prompten-llm-guide\video.mp4
```

IMMER den vollen Pfad angeben, weil das Script aus `scripts/` laeuft!

## Schritt 6: Erster Upload (Test)

**Terminal oeffnen in:**
```
C:\Users\User\Documents\Claude_Code\the-random-maker-theory\scripts
```
(Im Explorer zum Ordner gehen -> Adressleiste anklicken -> `cmd` tippen -> Enter)

Dann ausfuehren:
```bash
python youtube-upload.py "C:\Users\User\Documents\Claude_Code\output\content-engine\2026-03-10-perfekt-prompten-llm-guide\video.mp4" --meta meta-002.json --privacy unlisted
```

Beim ersten Mal oeffnet sich der Browser fuer die Google-Anmeldung.
Einloggen, Zugriff erlauben, fertig. Token wird gespeichert.

`--privacy unlisted` -> Video ist erstmal nur mit Link sichtbar. Wenn alles passt, auf YouTube Studio auf public stellen (oder nochmal mit `--privacy public` hochladen).

## Danach: Jedes Video hochladen

**Terminal IMMER oeffnen in:**
```
C:\Users\User\Documents\Claude_Code\the-random-maker-theory\scripts
```

```bash
# Mit Meta-JSON (empfohlen) - IMMER vollen Pfad zur Video-Datei:
python youtube-upload.py "C:\Users\User\Documents\Claude_Code\output\content-engine\{datum}-{slug}\video.mp4" --meta meta-XXX.json

# Oder direkt:
python youtube-upload.py "C:\pfad\zum\video.mp4" --title "Mein Titel" --description "Beschreibung" --tags tag1 tag2
```

## Meta-JSON Template

Kopiere `scripts/meta-002.json` und passe an:

```json
{
  "title": "Titel | TRMT #003",
  "description": "Beschreibung...",
  "tags": ["tag1", "tag2"],
  "thumbnail": "pfad/zum/thumbnail.png",
  "privacy": "public",
  "categoryId": "28"
}
```

## Video updaten (Titel, Tags, Description, Privacy)

```bash
python youtube-upload.py --update VIDEO_ID --meta meta-XXX.json
python youtube-upload.py --update KWIH_InMQZ8 --privacy public
```

## Kompletter Workflow pro Video

1. Content-Engine erstellt Video in `output/content-engine/{datum}-{slug}/video.mp4`
2. Meta-JSON erstellen: `scripts/meta-XXX.json` (Titel, Description, Tags, Thumbnail)
3. Thumbnail komprimieren falls > 2MB (YouTube-Limit). JPG mit quality 85 reicht.
4. Terminal oeffnen in `scripts/`
5. Upload: `python youtube-upload.py "C:\...\video.mp4" --meta meta-XXX.json --privacy unlisted`
6. In YouTube Studio pruefen: Thumbnail, Timestamps, End Screen
7. KI-Disclosure setzen: YouTube Studio -> Video -> "Veraenderter Inhalt" -> Ja
8. Video in passende Playlist einordnen
9. Auf Public stellen: `python youtube-upload.py --update VIDEO_ID --privacy public`
10. Video-Embed in Homepage aktualisieren (src/routes/+page.svelte -> video-embed iframe src)

## YouTube Playlists (TRMT)

Passend zu den 5 Content-Saeulen:

| Playlist | Fuer welche Videos |
|----------|-------------------|
| KI-Tools & Tutorials | Tool-Reviews, Prompt Engineering, Vergleiche |
| KI-News Weekly | Woechentliche News-Zusammenfassungen |
| Maker & DIY Projekte | Arduino, ESP32, 3D-Druck, Smart Home |
| Produktivitaet & Automatisierung | n8n, Obsidian, Notion, Workflows |
| Fotografie & KI-Editing | Lightroom AI, Topaz, Gear-Reviews |

## Troubleshooting

**"client_secret.json nicht gefunden"**
-> Datei muss im `scripts/` Ordner liegen

**"Token abgelaufen"**
-> `scripts/youtube-token.json` loeschen, nochmal ausfuehren

**"Quota exceeded"**
-> YouTube API hat Tageslimit von 10.000 Units. Ein Upload = ~1.600 Units. ~6 Videos/Tag.

**"App not verified" Warnung im Browser**
-> Normal bei eigenen OAuth Apps. Klick auf "Advanced" -> "Go to TRMT Upload (unsafe)"
