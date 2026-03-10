---
name: trmt-content-engine
description: >
  Vollautomatische Content-Pipeline fuer TRMT (The Random Maker Theory).
  Erstellt SEO-optimierte, authentische deutsche Blog-Artikel (1500-2500+ Woerter)
  via NotebookLM-Research + Claude Code. Inklusive Podcast, Video, Infocharts, Thumbnails.
  Kein User-Input noetig nach dem Thema. Feynman-Methode, Anti-AI-Polish, TRMT Voice-DNA.
  Use whenever: "neuer Artikel", "schreib einen Post", "Blog schreiben", "Content erstellen",
  "Artikel ueber X", oder alles was TRMT-Content-Produktion betrifft.
  Auch bei "Ueberarbeite diesen Artikel" oder "Mach den Text besser".
---

# TRMT Content Engine

Vollautomatische Content-Pipeline fuer The Random Maker Theory. Eingabe: Ein Thema. Ausgabe: Fertiger Blog-Artikel + Podcast + Video + Infocharts. Null manuelle Zwischenschritte.

## Trigger

- "Schreib einen Artikel ueber..."
- "Neuer Blogpost zu..."
- "Content erstellen"
- "Blog schreiben"
- "Artikel ueber X"
- "Ueberarbeite diesen Artikel"

## Defaults (IMMER, sofern nicht explizit anders angegeben)

- **Laenge:** 1500-2500+ Woerter (so lang wie moeglich = besser fuer SEO)
- **Zielgruppe:** Anfaenger bis Fortgeschrittene
- **Sprache:** Deutsch, Tech-Begriffe Englisch
- **Methode:** Feynman-Methode (erklaere alles so einfach, dass ein 12-Jaehriger es versteht)
- **Stimme:** TRMT Voice-DNA (siehe Phase 4)
- **Automatisierung:** 100% — keine Rueckfragen, keine Pausen, durchlaufen bis fertig

## Voraussetzungen

- `notebooklm` CLI installiert und authentifiziert
- Pruefe mit `notebooklm status` ob Auth aktiv ist
- Falls Auth fehlt: `notebooklm login` ausfuehren
- **Windows-Encoding-Fix:** IMMER `export PYTHONIOENCODING=utf-8` vor jedem notebooklm-Befehl

## Der Workflow (8 Phasen)

```
INPUT: Thema vom User
  |
  v
[1. BRIEF]         — Auto-Analyse des Themas (Claude Code)
  |
  v
[2. RESEARCH]      — NotebookLM: Externe Quellen suchen + Deep Research
  |
  v
[3. OUTLINE]       — NotebookLM: Struktur generieren lassen
  |
  v
[4. WRITE]         — NotebookLM: Ausfuehrlichen Blog-Artikel generieren
  |
  v
[4.5 ASSETS]       — NotebookLM: Podcast + Video + Infocharts + Thumbnail (PARALLEL)
  |
  v
[5. POLISH]        — Claude Code: Anti-AI-Filter + Voice-DNA anwenden
  |
  v
[6. SEO+META]      — Claude Code: Frontmatter, SEO, interne Links
  |
  v
[7. EXPORT]        — Dateien in Projekt-Ordner kopieren + optimieren
  |
  v
[8. VERIFY]        — Quality Gate: 10-Punkte-Check
```

---

## Phase 1: BRIEF (Claude Code — automatisch)

Analysiere das vom User genannte Thema und leite automatisch ab:

1. **Thema:** Exaktes Thema aus User-Eingabe extrahieren
2. **Saeule:** Automatisch zuordnen zu einer der 5 TRMT-Saeulen:
   - KI/Tech | Produktivitaet | Maker/DIY | Fotografie | Life-Learning
3. **Format:** Automatisch waehlen: Tutorial, Review, Deep-Dive, Vergleich, News, Maker-Projekt
4. **Slug:** Generiere URL-Slug (kebab-case, max 5 Woerter, Keyword vorne)
5. **Kernaussage:** Formuliere 1 Satz was der Leser mitnehmen soll

**Output:** Interner Brief (wird NICHT angezeigt, sofort weiter zu Phase 2).

---

## Phase 2: RESEARCH (NotebookLM — automatisch)

### Schritt 1 — Output-Ordner anlegen:
```bash
mkdir -p output/content-engine/YYYY-MM-DD-<slug>
```

### Schritt 2 — Notebook erstellen:
```bash
export PYTHONIOENCODING=utf-8
notebooklm create "TRMT: <thema-kurz>" --json
```
Notebook-ID merken. Ab hier IMMER `--notebook <id>` oder `-n <id>` verwenden.

### Schritt 3 — Sprache auf Deutsch setzen:
```bash
notebooklm language set de
```

### Schritt 4 — Deep Research starten:
Erstelle eine kompakte Research-Query. Die Query muss das Thema + Kontext enthalten, aber knapp bleiben (~200-300 Zeichen).

**Query-Template:**
```
[THEMA] [KONTEXT] [SPEZIFIKA] deutsch 2025 2026
```

**Beispiele:**
```
"n8n Automatisierung Workflow Tutorial Anfaenger selbst hosten open-source deutsch 2025 2026"
"ESP32 Smart Home Sensor Home Assistant Tutorial Projekt Anfaenger deutsch 2025 2026"
"Claude Code vs Cursor vs GitHub Copilot Vergleich AI Coding Features Preis deutsch 2025 2026"
```

```bash
notebooklm source add-research "<query>" --mode deep --no-wait --notebook <id>
```

### Schritt 5 — Ergaenzende Quellen per WebSearch (Claude Code):
Waehrend NotebookLM im Hintergrund recherchiert, fuehre parallel eigene WebSearch durch:
- Suche 3-5 relevante URLs zum Thema
- Fuege sie als zusaetzliche Sources hinzu:
```bash
notebooklm source add "<url1>" --notebook <id> --json
notebooklm source add "<url2>" --notebook <id> --json
notebooklm source add "<url3>" --notebook <id> --json
```

### Schritt 6 — Research importieren:
```bash
notebooklm research wait -n <id> --import-all --timeout 600
```
Falls Timeout: Weiter ohne Research, Hinweis loggen. Nicht blockieren.

### Schritt 7 — Source-Readiness pruefen:
```bash
notebooklm source list --notebook <id> --json
```
Warte bis alle Sources `status: ready` haben (max 2 Min).

**Output:** Notebook mit 10-30+ Quellen, bereit fuer Content-Generierung.

---

## Phase 3: OUTLINE (NotebookLM — automatisch)

Erstelle die Artikel-Struktur ueber NotebookLM Chat.

### Schritt 1 — Outline generieren:
```bash
notebooklm ask "Erstelle eine detaillierte Outline fuer einen Blog-Artikel zum Thema '[THEMA]'. Zielgruppe: Anfaenger bis Fortgeschrittene. Sprache: Deutsch, locker, Buddy-like. Erklaere alles nach der Feynman-Methode (so einfach wie moeglich). Struktur: Hook (2-3 Saetze) -> 4-6 Hauptabschnitte mit je 2-3 Unterpunkten -> Fazit. Jeder Abschnitt soll 300-500 Woerter umfassen. Gesamtlaenge: mindestens 2000 Woerter. Fuer jeden Abschnitt: Nenne die Kernaussage und welche Quellen/Fakten einfliessen sollen." --notebook <id> --save-as-note --note-title "OUTLINE" --json
```

### Schritt 2 — Key Facts extrahieren:
```bash
notebooklm ask "Basierend auf allen verfuegbaren Quellen: Liste die 10-15 wichtigsten Fakten, Zahlen, Zitate und Erkenntnisse zum Thema auf. Fuer jeden Fakt: Nenne die Quelle. Achte auf aktuelle Daten (2025/2026)." --notebook <id> --save-as-note --note-title "KEY-FACTS" --json
```

**Output:** Outline + Key-Facts als Notizen im Notebook gespeichert.

---

## Phase 4: WRITE (NotebookLM — automatisch)

### Strategie: Gesamten Artikel in einem Report generieren

NotebookLM's Report-Funktion liefert die laengsten und detailliertesten Outputs. Nutze `--format blog-post` mit ausfuehrlichen Append-Instructions.

```bash
notebooklm generate report --format blog-post --append "WICHTIG: Schreibe einen AUSFUEHRLICHEN Blog-Artikel auf Deutsch. Mindestens 2000 Woerter. Zielgruppe: Anfaenger bis Fortgeschrittene. Erklaerungen nach der Feynman-Methode (so einfach, dass es jeder versteht). Stil: Locker, Buddy-like, ehrlich, direkt. Nicht wie eine KI. Schreibe in Ich-Perspektive. Verwende Fuellwoerter wie 'halt', 'quasi', 'echt', 'basically'. Kurze Saetze. Klare Wertungen ('geil', 'nervt', 'stark'). KEINE Corporate-Floskeln. KEINE 'In der heutigen Zeit'. Jeder Abschnitt 300-500 Woerter. Baue konkrete Beispiele, Zahlen und Quellen ein. Erwaehne Vor- UND Nachteile ehrlich. Fazit mit klarer Meinung. Ende mit '— TRMT'." --notebook <id> --json
```

Artifact-ID merken.

### Alternative bei kurzem Output: Section-by-Section via Chat

Falls der Report zu kurz ist (<1500 Woerter), nutze den Chat fuer jeden Abschnitt einzeln:

```bash
# Fuer jeden Abschnitt aus der Outline:
notebooklm ask "Schreibe Abschnitt [N]: '[TITEL]' fuer den Blog-Artikel. 400-600 Woerter. Deutsch, locker, Ich-Perspektive. Feynman-Methode. Baue Fakten aus den Quellen ein mit Quellenangaben. Fuellwoerter: halt, quasi, echt. Kurze Saetze. Ehrliche Meinung." --notebook <id> --save-as-note --note-title "SECTION-[N]" --json
```

Wiederhole fuer alle Abschnitte. Dann alle Notizen zusammenfuehren.

**Output:** Blog-Artikel als Report-Artifact oder als zusammengefuehrte Notizen.

---

## Phase 4.5: ASSETS (NotebookLM — PARALLEL)

Starte ALLE Generierungen gleichzeitig als Background-Agents. Jeder Agent nutzt `-n <id>`.

**WICHTIG:** Lies `references/trmt-visual-style.md` fuer das Design-System. Lies `references/infochart-pipeline.md` fuer die Bild-Generierung.

### Agent 1 — Podcast:
```bash
notebooklm generate audio "Erstelle eine ausfuehrliche Podcast-Zusammenfassung. Stil: Zwei Hosts unterhalten sich locker und natuerlich. Wie ein echter Podcast, nicht wie KI. Humor erlaubt. Wichtigste Punkte auf den Punkt, aber unterhaltsam. Fachbegriffe kurz erklaeren. Mindestens 15 Minuten." --format deep-dive --length long --notebook <id> --json
```

### Agent 2 — Video:
```bash
notebooklm generate video "Erklaervideo zum Kerninhalt. 3-5 wichtigste Takeaways. Deutsch, locker, verstaendlich." --format explainer --style whiteboard --notebook <id> --json
```
**Hinweis:** `--style` Optionen: `auto|classic|whiteboard|kawaii|anime|watercolor|retro-print|heritage|paper-craft`. Whiteboard passt am besten zum TRMT Chalk-Look. `--format` ist `explainer` oder `brief`.

### Agent 3 — YouTube Thumbnail (16:9):
```bash
notebooklm generate infographic "YouTube-Thumbnail 16:9 (1280x720px). Chalk-on-blackboard style. Dark charcoal (#1a1a1a). Hand-drawn wobbly lines. Maximal 3-5 Woerter als grossen Titel in weisser Kreide. Amber (#d4893e) fuer Highlights. Teal (#3ab0a2) fuer Akzente. Ein zentrales hand-drawn Icon. KEIN Fliesstext. Eye-catching. No photographs, only hand-drawn chalk sketches." --orientation landscape --detail concise --notebook <id> --json
```

### Agent 4 — Blog Hero-Image (16:9):
```bash
notebooklm generate infographic "Blog-Header 16:9. Chalk-on-blackboard style. Dark charcoal background (#1a1a1a). Hand-drawn sketch aesthetic mit wobbly lines. Thema: [THEMA]. Amber (#d4893e) fuer Titel und primaere Icons (70%). Teal (#3ab0a2) fuer Akzente (30%). Weiss fuer Labels. Max 5-7 Hauptelemente. Klar lesbar. No photographs, only hand-drawn chalk sketches." --orientation landscape --detail standard --notebook <id> --json
```

### Agent 5 — Infochart(s) fuer den Artikel:
Identifiziere aus dem Artikel-Inhalt 2-3 Stellen die ein Infochart brauchen (Vergleiche, Prozesse, Uebersichten). Generiere fuer jede Stelle:
```bash
notebooklm generate infographic "[PROMPT NACH INFOCHART-PIPELINE TEMPLATE — siehe references/infochart-pipeline.md]" --orientation landscape --detail detailed --notebook <id> --json
```

**WICHTIG:** Bei `generate infographic` ist die Beschreibung ein **positionales Argument** (erster Parameter), KEIN `--append` Flag. Die Beschreibung kommt VOR den Options-Flags.

### Agent 6 — Mind Map:
```bash
notebooklm generate mind-map --notebook <id> --json
notebooklm download mind-map "output/content-engine/YYYY-MM-DD-<slug>/mind-map.json" -n <id>
```

### Typische Generierungszeiten:
| Asset | Dauer | Timeout |
|-------|-------|---------|
| Infographic | 2-5 Min | 10 Min |
| Podcast (Audio) | 5-10 Min | 15 Min |
| Video | 10-20 Min | 30 Min |
| Mind Map | Sofort (synchron) | — |
| Report | 2-5 Min | 10 Min |

### Polling-Strategie:
1. Alle `generate`-Befehle parallel starten
2. Mind Map sofort downloaden (ist synchron)
3. **Erster Check nach 5 Min** — Infographics sollten fertig sein → sofort downloaden
4. **Zweiter Check nach 5 Min** — Podcast sollte fertig sein → downloaden
5. **Dritter Check nach 10 Min** — Video pruefen → downloaden wenn fertig
6. Wenn Video nach 20 Min noch nicht fertig: Download-Befehl loggen, nicht blockieren
7. **WICHTIG:** Nutze `sleep` zwischen den Checks, nicht aktives Polling

### Downloads:
```bash
notebooklm download audio "output/content-engine/YYYY-MM-DD-<slug>/podcast.mp3" -n <id>
notebooklm download video "output/content-engine/YYYY-MM-DD-<slug>/video.mp4" -n <id>
notebooklm download report "output/content-engine/YYYY-MM-DD-<slug>/blog-raw.md" -n <id>
# Bei mehreren Infographics: -a <artifact-id> verwenden um gezielt zu downloaden
notebooklm download infographic "output/.../thumbnail.png" -n <id> -a <artifact-id>
notebooklm download infographic "output/.../hero-image.png" -n <id> -a <artifact-id>
notebooklm download infographic "output/.../infochart-1.png" -n <id> -a <artifact-id>
# Alternativ alle auf einmal: --all <output-directory>
notebooklm download infographic --all "output/content-engine/YYYY-MM-DD-<slug>/" -n <id>
```

**WICHTIG:** Bei `download infographic` mit mehreren Bildern: Nutze `-a <artifact-id>` (NICHT `--id`!) um ein spezifisches Bild zu waehlen. Artifact-IDs bekommst du aus `notebooklm artifact list`.

**Output:** Alle Assets im Output-Ordner.

---

## Phase 5: POLISH (Claude Code — automatisch)

Jetzt uebernimmt Claude Code. Lade den rohen Blog-Artikel (`blog-raw.md`) und wende den Anti-AI-Filter + Voice-DNA an.

### Voice-DNA — So klingt TRMT:

**Sprache:**
- Deutsch. Tech-Begriffe bleiben Englisch.
- Kurze Saetze. Parataxe (Reihung, nicht Verschachtelung).
- Fuellwoerter sind Pflicht: halt, eigentlich, quasi, echt, schon, basically
- Apokopen: find, grad, mach, hab
- Bewertungen klar: geil, kacke, nervt, stark, wild, mega, heftig

**Ton:**
- Buddy-like. Wie ein Kumpel der dir was erklaert.
- Ehrlich. Wenn was kacke ist, sag's.
- Neugierig. "Ich hab das mal getestet und..."
- Kein Predigen. Keine Moralapostel-Energie.

**Perspektive:**
- Immer "ich", nie "wir". TRMT = eine Person.
- Direkte Ansprache: "du" (nicht "Sie", nicht "man")

**Struktur:**
- Absaetze: 2-4 Saetze max. Dann Luft.
- Satzlaenge variieren! Kurz. Dann laenger. Dann wieder kurz.
- Zwischenueberschriften: Alle 200-300 Woerter
- Listen nur wenn sie Sinn machen

**Verboten:**
- "In der heutigen Zeit", "Es ist wichtig zu beachten"
- "Revolutionaer", "game-changer" (ausser ironisch)
- Lange Gedankenstriche als Stilmittel
- Doppelpunkt-Headlines ("KI: Die Zukunft der Technologie")
- Uniforme Absatzlaengen (alle gleich lang = KI-Signal)
- Copula-Ketten ("Es ist... Es wird... Es kann...")

**Feynman-Methode:**
- Erklaere Konzepte so einfach wie moeglich
- Nutze Analogien und Alltagsbeispiele
- Wenn du einen Fachbegriff brauchst, erklaer ihn sofort in einem Nebensatz
- "X ist quasi wie Y, nur fuer Z"

**Outro:**
- Jeder Post endet mit `— TRMT`

### Anti-AI-Filter (22 Checks):

Lies `references/anti-ai-patterns.md` fuer die vollstaendige Liste. Kurzversion:

**MUSS behoben werden:**
1. Copula-Eroeffnungen entfernen
2. Synonym-Cycling stoppen
3. KI-Buzzwords raus
4. Falsche Ranges durch konkrete Zahlen ersetzen
5. Hedging-Phrasen streichen
6. Absatzlaengen variieren
7. Transitionen variieren
8. Frage-Antwort-Muster aufbrechen

**MUSS vorhanden sein:**
9. Mindestens 1 echte Meinung pro 500 Woerter
10. Mindestens 1 "ich hab das getestet"-Moment
11. Burstiness (Satzlaengen 5-25 Woerter im Mix)
12. Fuellwoerter (2+ pro 500 Woerter)
13. Apokopen (1+ pro 300 Woerter)
14. Flesch Reading Ease > 70

### Polish-Prozess:
1. Artikel komplett lesen
2. Alle KI-klingenden Stellen markieren und umschreiben
3. Voice-DNA anwenden (Fuellwoerter, Apokopen, Bewertungen einfuegen)
4. Feynman-Check: Ist jeder Abschnitt fuer Anfaenger verstaendlich?
5. Burstiness pruefen (Satzlaengen-Variation)
6. Quellen-Links einbauen (aus NotebookLM Key-Facts)

### Bild-Platzhalter ersetzen:
Ersetze die TODO-Platzhalter durch echte Bildpfade:
```markdown
![Alt-Text](/images/blog/<slug>-1.webp)
```
HeroImage = Bild 1 (nur im Frontmatter, NICHT inline). Inline-Bilder ab Bild 2.

**Output:** Polierter Artikel im TRMT-Stil.

---

## Phase 6: SEO + META (Claude Code — automatisch)

### Frontmatter generieren:

```yaml
---
title: "[Max 60 Zeichen, Keyword moeglichst vorne]"
slug: "[kebab-case, keyword-rich, max 5 Woerter]"
date: "[YYYY-MM-DD]"
description: "[Max 160 Zeichen, CTA-orientiert, Keyword enthalten]"
tags: ["tag1", "tag2", "tag3"]
category: "[ki-news|ki-tools|automatisierung|maker-projekt|produktivitaet|fotografie|life-learning]"
draft: true
readingTime: [geschaetzte Minuten]
heroImage: "/images/blog/[slug]-1.webp"
heroImageThumb: "/images/blog/[slug]-1-thumb.webp"
titleAccent: "[Ein Wort aus dem Titel zum Highlighten]"
---
```

### Verfuegbare Tags:
`ki-news`, `ki-tools`, `tools`, `tutorial`, `open-source`, `automatisierung`, `n8n`, `smart-home`, `home-assistant`, `arduino`, `esp32`, `3d-druck`, `diy`, `maker`, `fotografie`, `lightroom`, `workflow`, `produktivitaet`, `obsidian`, `notion`, `kaufberatung`, `vergleich`, `kostenlos`, `anfaenger`, `news`, `analyse`

### SEO-Checkliste (automatisch anwenden):
- Primaeres Keyword in Titel (erste 30 Zeichen)
- Keyword in erster H2 + ersten 100 Woertern
- 3-5 interne Links zu bestehenden TRMT-Artikeln
- Meta-Description mit Keyword + Handlungsaufforderung
- Alt-Texte fuer alle Bilder
- URL-Slug matcht Keywords

### Quellen-Section am Ende:
```markdown
## Quellen & Links

- [Titel der Quelle](URL) — Kurzbeschreibung
- [Titel der Quelle](URL) — Kurzbeschreibung
```

Fuer detaillierte SEO-Infos: Lies `references/seo-checklist.md`.

**Output:** Fertiger Artikel mit Frontmatter + SEO.

---

## Phase 7: EXPORT (Claude Code — automatisch)

### Blog-Artikel exportieren:
```bash
cp output/content-engine/YYYY-MM-DD-<slug>/blog-final.md \
   src/content/blog/<slug>.md
```

### Bilder optimieren + exportieren (automatisch mit Pillow):

**WICHTIG:** Bilder werden SOFORT nach dem Download automatisch verarbeitet. Kein manueller Schritt noetig.

NotebookLM-generierte Bilder haben einen **weissen Wasserzeichen-Schriftzug** unten rechts. Dieser variiert je nach Quelle (NotebookLM-Logo, Gemini 4-Stern-Icon, oder anderer Text). Das Script entfernt ihn durch Croppen der unteren 4%.

```python
# Automatisches Image-Processing nach jedem Download
from PIL import Image
import os

def process_image(input_path, output_dir, slug, num, crop_watermark=True):
    """Verarbeitet ein NotebookLM-Bild: Watermark croppen, 16:9, WebP."""
    img = Image.open(input_path)
    w, h = img.size
    # 1. Watermark entfernen (untere 4% abschneiden)
    if crop_watermark:
        crop_h = int(h * 0.04)
        img = img.crop((0, 0, w, h - crop_h))
        w, h = img.size
    # 2. Auf 16:9 croppen (zentriert)
    target_ratio = 16 / 9
    current_ratio = w / h
    if abs(current_ratio - target_ratio) > 0.01:
        if current_ratio > target_ratio:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        else:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
    # 3. Full-Size: 1200x675px, WebP Quality 85
    full = img.resize((1200, 675), Image.LANCZOS)
    full_path = os.path.join(output_dir, f"{slug}-{num}.webp")
    full.save(full_path, "WEBP", quality=85, method=6)
    # 4. Thumbnail: 400x225px, WebP Quality 80
    thumb = img.resize((400, 225), Image.LANCZOS)
    thumb_path = os.path.join(output_dir, f"{slug}-{num}-thumb.webp")
    thumb.save(thumb_path, "WEBP", quality=80, method=6)
    return full_path, thumb_path
```

**Aufruf nach jedem Bild-Download:**
```python
# Ziel-Ordner: the-random-maker-theory/static/images/blog/
output_dir = "the-random-maker-theory/static/images/blog"
process_image("output/.../thumbnail.png", output_dir, "<slug>", 0)   # YouTube Thumb
process_image("output/.../hero-image.png", output_dir, "<slug>", 1)  # Hero
process_image("output/.../infochart-1.png", output_dir, "<slug>", 2) # Infochart 1
process_image("output/.../infochart-2.png", output_dir, "<slug>", 3) # Infochart 2
```

**Nummerierung:**
- 0 = YouTube Thumbnail
- 1 = Hero Image (= heroImage im Frontmatter)
- 2+ = Inline Infocharts

**Voraussetzung:** `pip install Pillow` (einmalig). Auf Windows `python` statt `python3`.

### Podcast-Episode erstellen:
Erstelle die Podcast-Frontmatter-Datei:
```bash
# src/content/podcast/[NNN]-<slug>.md
```

```yaml
---
title: "[Episoden-Titel]"
slug: "[episode-slug]"
date: "[YYYY-MM-DD]"
description: "[Kurze Episodenbeschreibung]"
audioUrl: ""
duration: ""
blogSlug: "[slug-des-blog-artikels]"
transcript:
  - "Absatz 1 der Zusammenfassung..."
  - "Absatz 2..."
---
```

### Podcast-Audio kopieren:
```bash
cp output/content-engine/YYYY-MM-DD-<slug>/podcast.mp3 \
   static/audio/podcast/
```

### Video exportieren:
Video braucht am laengsten (10-20 Min). Status pruefen und downloaden:
```bash
# Status checken
notebooklm artifact list -n <id> --json
# Download wenn completed
notebooklm download video "output/content-engine/YYYY-MM-DD-<slug>/video.mp4" -n <id>
```
Video wird NICHT in den static/-Ordner kopiert (zu gross fuer Git). Bleibt im Output-Ordner fuer manuellen Upload (YouTube etc.).

### Datei-Struktur nach Export:
```
src/content/blog/<slug>.md                          # Blog-Artikel
src/content/podcast/[NNN]-<slug>.md                 # Podcast-Episode
static/images/blog/<slug>-1.webp                    # Hero (Full)
static/images/blog/<slug>-1-thumb.webp              # Hero (Thumb)
static/images/blog/<slug>-2.webp                    # Infochart 1
static/images/blog/<slug>-3.webp                    # Infochart 2
static/audio/podcast/[NNN]-<slug>.mp3               # Podcast-Audio
output/content-engine/YYYY-MM-DD-<slug>/            # Alle Roh-Assets
  ├── blog-raw.md                                   # NotebookLM Output
  ├── blog-final.md                                 # Nach Polish
  ├── podcast.mp3
  ├── video.mp4
  ├── thumbnail.png
  ├── hero-image.png
  ├── infochart-1.png / infochart-2.png
  ├── mind-map.json
  └── info-package.md                               # Research-Zusammenfassung
```

**Output:** Alle Dateien im Projekt-Ordner, bereit fuer Vercel-Deploy.

---

## Phase 8: VERIFY (Claude Code — automatisch)

### Quality Gate — 12 Punkte:

1. ✅ Artikel hat 1500+ Woerter
2. ✅ Klingt wie TRMT, nicht wie ChatGPT
3. ✅ Hat mindestens 3 Quellen mit Links
4. ✅ Enthaelt mindestens 1 persoenliche Meinung/Erfahrung
5. ✅ Feynman-Check: Auch fuer Anfaenger verstaendlich
6. ✅ Flesch Reading Ease > 70
7. ✅ Alle Bilder vorhanden (Hero + mindestens 1 Infochart)
8. ✅ Frontmatter komplett (alle Felder)
9. ✅ SEO-Checkliste bestanden
10. ✅ Mindestens 2 interne Links
11. ✅ Anti-AI-Filter bestanden (keine roten Flags)
12. ✅ Endet mit `— TRMT`

### Bei Fehlern:
- Automatisch beheben (nicht fragen!)
- Fehlende Quellen? → WebSearch nachholen
- Zu kurz? → Abschnitte erweitern
- KI-Sprache? → Nochmal durch Phase 5

### Status-Report am Ende:
```
TRMT Content Engine — Fertig!

Blog:     src/content/blog/<slug>.md          [OK] (XXXX Woerter)
Podcast:  src/content/podcast/NNN-<slug>.md   [OK/PENDING]
Hero:     static/images/blog/<slug>-1.webp    [OK]
Charts:   static/images/blog/<slug>-2/3.webp  [OK]
Video:    output/.../video.mp4                [OK/PENDING]

Notebook-ID: <id>
Draft: true — Zum Publizieren: draft: true → false aendern

Naechste Schritte:
1. Draft reviewen
2. draft: false setzen
3. git commit + push → Vercel deployed automatisch
```

---

## Fuer Ueberarbeitungen bestehender Artikel

Wenn "Ueberarbeite diesen Artikel" oder "Mach den besser":
1. Lies den bestehenden Artikel komplett
2. Identifiziere Schwaechen (KI-Sprache, fehlende Quellen, schwacher Hook)
3. Wende Phase 5 (Polish) an
4. Pruefe Phase 6 (SEO) — fehlt was?
5. Zeig die Aenderungen als Diff
6. Automatisch speichern

---

## Referenz-Dateien

Lies diese bei Bedarf fuer detailliertere Informationen:
- `references/anti-ai-patterns.md` — 50+ Anti-AI-Patterns mit Beispielen
- `references/copywriting-frameworks.md` — PAS, BAB, AIDA, StoryBrand, R-C-C-O-V
- `references/seo-checklist.md` — E-E-A-T Framework, GEO, Schema.org
- `references/trmt-visual-style.md` — Chalk-on-Blackboard Design System
- `references/infochart-pipeline.md` — Prompt-Templates fuer Infochart-Generierung

---

## Error Handling

| Fehler | Aktion |
|--------|--------|
| Auth fehlt | `notebooklm login` ausfuehren |
| Permission denied (storage_state.json) | Playwright/Chromium-Prozesse killen |
| UnicodeEncodeError (Windows) | `export PYTHONIOENCODING=utf-8` |
| Source-Wait Timeout | Weiter ohne Source, loggen |
| Research Timeout | Weiter ohne Research, eigene WebSearch nutzen |
| Generation Rate-Limited | 5-10 Min warten, dann Retry |
| Report zu kurz (<1500w) | Section-by-Section via Chat als Fallback |
| Download fehlgeschlagen | Artifact-Status pruefen, ggf. noch nicht fertig |
| Video Timeout (>15min) | Manuellen Download-Befehl loggen, nicht blockieren |
