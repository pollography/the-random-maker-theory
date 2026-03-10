# TRMT Content-Workflow

## Content-Engine (Hauptworkflow)

**Skill:** `trmt-content-engine` (Claude Code)
**Input:** Ein Thema
**Output:** Blog + Podcast-Seite + Assets, automatisch deployed

### Was passiert automatisch:
1. NotebookLM Research + Deep Research
2. Outline + Key Facts generieren
3. Blog-Artikel schreiben (NotebookLM Report)
4. Assets parallel: Podcast, Video, Hero-Image, Infocharts, Thumbnail
5. Anti-AI-Polish + Voice-DNA
6. SEO + Frontmatter + Crosslinks (podcastSlug, videoUrl)
7. Export: Blog + Podcast-Seite + Bilder in Projekt-Ordner
8. Quality Gate (14 Checks)
9. Auto-Deploy: git add + commit + push → Vercel

### Was du manuell machst:
1. Podcast MP3 auf Spotify hochladen (aus output/ Ordner)
2. Video auf YouTube hochladen (aus output/ Ordner)
3. Spotify-URL + YouTube-URL in Frontmatter nachtragen
4. Nochmal git commit + push

### Media-Hosting:
- **Bilder** → GitHub/Vercel (static/images/blog/)
- **Podcast Audio** → Spotify for Creators (NICHT GitHub)
- **Video** → YouTube (NICHT GitHub)
- Grund: GitHub Free = 1 GB Limit, ein Video = 100-500 MB

---

## Automatischer Daily KI-News Workflow

**Scheduled Task:** `trmt-daily-ki-news`
**Schedule:** Täglich um 07:00 Uhr
**RSS-Quellen:** `config/rss-sources.yaml` (25+ KI-News-Feeds)
**Output:** `src/content/blog/ki-news-[YYYY-MM-DD].md`

### Was passiert automatisch:
1. RSS-Feeds parsen (letzte 24h)
2. Google Trends checken (KI-Keywords in DE)
3. Top 5-10 Stories identifizieren
4. Blogpost im TRMT-Stil schreiben
5. Hero-Image generieren
6. Auto-Deploy

### RSS-Quellen (Kategorien):
- **Hersteller:** OpenAI, Anthropic, Google AI, Meta AI, Mistral, Stability AI
- **Tech-Medien:** The Verge, Ars Technica, TechCrunch, MIT Tech Review, Wired
- **Deutsch:** heise, Golem, t3n
- **Insider:** Simon Willison, The Neuron, Ben's Bites
- **Research:** arXiv cs.AI, Papers with Code

---

## Blog-Post Frontmatter Schema

```yaml
---
title: "Titel des Posts"
slug: "url-slug-kebab-case"
date: "YYYY-MM-DD"
description: "Max 160 Zeichen SEO-Description"
tags: ["tag1", "tag2"]
category: "kategorie"
draft: false
readingTime: 12
---
```

### Verfügbare Kategorien:
- `ki-news` — Tägliche/wöchentliche KI-Nachrichten
- `ki-tools` — Tool-Reviews, Vergleiche, Tutorials
- `automatisierung` — n8n, Workflows, Scripting
- `maker-projekt` — Arduino, ESP32, 3D-Druck, Home Assistant
- `produktivitaet` — Obsidian, Notion, Workflows
- `fotografie` — Lightroom, KI-Tools, Bildbearbeitung
- `life-learning` — ADHS, Freelancer, Tech-Philosophie

### Verfügbare Tags:
`ki-news`, `ki-tools`, `tools`, `tutorial`, `open-source`, `automatisierung`, `n8n`, `smart-home`, `home-assistant`, `arduino`, `esp32`, `3d-druck`, `diy`, `maker`, `fotografie`, `lightroom`, `workflow`, `produktivitaet`, `obsidian`, `notion`, `kaufberatung`, `vergleich`, `kostenlos`, `anfaenger`

---

## Voice-DNA Kurzreferenz

- Deutsch, Tech-Begriffe Englisch
- Kurze Sätze, Parataxe
- Füllwörter: halt, eigentlich, quasi, echt, schon
- Apokopen: find, grad, mach, hab
- Bewertungen: geil, kacke, nervt, stark, wild
- "ich", nie "wir". Autor = TRMT
- Keine langen Gedankenstriche als Stilmittel
- Anti-KI-Wörter vermeiden: revolutionär, game-changer (außer ironisch), "in der heutigen Zeit", "es ist wichtig zu beachten"
- Posts enden mit `— TRMT`

---

## Bild-Platzhalter Format

```html
<!-- TODO: Bild — [Was soll auf dem Bild sein] -->
<!-- Alt: "[Barrierefreier Alt-Text für das Bild]" -->
```

### Automatische Bild-Generierung (v2)

Ein Script generiert UND ersetzt automatisch alle TODO-Platzhalter:

```bash
# Bilder generieren + in Posts einbauen (alles in einem Schritt)
node scripts/generate-blog-images.mjs

# Optionen:
#   --dry-run              Nur Prompts zeigen, nichts generieren
#   --post slug-name       Nur einen bestimmten Post
#   --provider flux        Flux statt Gemini nutzen
```

Der Prompt-Transformer wandelt jede Beschreibung automatisch in einen Style um,
der zu 100% funktioniert. "Screenshot: XY" wird zu einer atmosphärischen
Workspace-Szene, "Infografik: ABC" zu einer abstrakten Visualisierung.

### API-Provider

| Provider | Modell | Preis | Free Tier |
|---|---|---|---|
| **Gemini** (default) | Imagen 4 | $0.02/Bild | **500/Tag kostenlos!** |
| Together AI | Flux Schnell | ~$0.003/Bild | 3 Monate kostenlos |

Setup: `GEMINI_API_KEY` in `.env` eintragen (Key holen: https://aistudio.google.com/apikey)

### Was der Prompt-Transformer macht

| TODO sagt... | AI generiert... |
|---|---|
| "Screenshot: Tool-UI" | Atmospheric workspace scene mit thematischen Objekten |
| "Infografik: Vergleich X vs Y" | Abstrakte Shapes + Farben, kein Text |
| "Foto: Hardware-Setup" | Moody Still-Life mit echten Objekten |
| "Logo: Brand XY" | Geometrische abstrakte Formen |

**Design-System wird automatisch angewendet:**
Dark BG, Honey/Amber Key-Light, Teal Accent, Film Grain, 16:9

---

## Bild-Optimierung (Pflicht nach Generierung!)

### Format & Größen
Alle generierten Bilder MÜSSEN vor dem Einbau optimiert werden:

| Variante | Größe | Format | Qualität | Ziel-KB | Verwendung |
|---|---|---|---|---|---|
| **Full** | 1200x675px | WebP | 85 | 50-150KB | Hero-Image, Inline im Blog |
| **Thumbnail** | 400x225px | WebP | 80 | 8-25KB | BlogCard-Grid auf Übersichtsseite |

### Datei-Benennung
```
static/images/blog/[blog-slug]-[nummer].webp        # Full-Size
static/images/blog/[blog-slug]-[nummer]-thumb.webp   # Thumbnail
```

### Gemini AI-Logo entfernen
Gemini-generierte Bilder haben ein 4-Stern-Logo unten rechts. Muss rausgepatcht werden (Bereich mit umgebender Hintergrundfarbe füllen) BEVOR resized wird.

### Optimierungs-Script (Python/Pillow)
```bash
python3 optimize-images.py
# Macht alles in einem Schritt: Logo entfernen, 16:9 croppen, WebP konvertieren, Thumbnails erstellen
```

---

## Hero-Image Regel (WICHTIG!)

**Das heroImage aus dem Frontmatter wird automatisch als Header über dem Artikel angezeigt.**

Deshalb: Das erste Bild eines Posts (heroImage) darf NICHT nochmal als Inline-Bild im Markdown-Body vorkommen. Sonst sieht der Leser dasselbe Bild zweimal.

**Richtig:**
```markdown
heroImage: "/images/blog/slug-1.webp"
---

Text text text...

![Zweites Bild](/images/blog/slug-2.webp)
```

**Falsch:**
```markdown
heroImage: "/images/blog/slug-1.webp"
---

Text text text...

![Erstes Bild nochmal](/images/blog/slug-1.webp)  ← DOPPELT!
```
