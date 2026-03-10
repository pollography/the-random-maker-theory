# TRMT Visual Style Guide: Chalk-on-Blackboard

Zentrale Referenz fuer ALLE visuellen Assets (Blog-Infocharts, Thumbnails, Social Media, Illustrationen).

## Core Aesthetic

**Stil:** Hand-drawn chalk sketches auf dunkler Tafel.
**Vibe:** Wie ein leidenschaftlicher Maker, der seine Ideen nachts auf eine Tafel kritzelt.
**Keine Fotos.** Nur gezeichnete/skizzierte Elemente.

## Farbpalette

| Farbe       | Hex       | Anteil | Verwendung                                    |
|-------------|-----------|--------|-----------------------------------------------|
| Background  | `#1A1A1A` | 100%   | Dunkler Kohle-Hintergrund (Tafel)             |
| Amber/Honey | `#D4893E` | 70%    | Titel, Headlines, Highlights, primaere Icons  |
| Teal        | `#3AB0A2` | 30%    | Akzente, Hervorhebungen, sekundaere Highlights|
| Weiss       | `#FFFFFF` | Text   | Normaler Text, Beschriftungen, Labels         |

**WICHTIG:** Immer exakte Hex-Codes im Prompt verwenden, nie nur "orange" oder "blau".

## Stil-Regeln

- **Hand-drawn / Sketch Aesthetic:** Wobbelige, ungleichmaessige Linien. Nichts perfekt Gerades.
- **Chalk-Textur:** Wie mit Kreide auf eine echte Tafel gezeichnet.
- **16:9 Seitenverhaeltnis** fuer Blog-Infocharts und Thumbnails.
- **1:1 Format** fuer Social Media Posts.
- **Einfache Icons:** Hand-drawn Icons statt komplexer Illustrationen.
- **Lesbarkeit:** Trotz Sketch-Look muessen alle Texte klar lesbar sein.
- **Weniger ist mehr:** Max 5-7 Hauptelemente pro Bild.

## Prompt-Template (Master)

Jeder Bild-Prompt MUSS mit diesem Header beginnen:
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a).
Hand-drawn wobbly lines, sketch aesthetic.
[FORMAT: 16:9 aspect ratio / square 1:1 aspect ratio]
```

Und mit dieser Zeile enden:
```
No photographs, only hand-drawn chalk sketches.
```

## Prompt-Tipps

- **Sprache:** Prompts auf Englisch, deutsche Texte in Anfuehrungszeichen.
- **Umlaute vermeiden:** "fuer" statt "fuer", "Ueberblick" statt "Ueberblick" im Bild-Text.
- **Farben immer mit Hex:** `amber (#d4893e)`, `teal (#3ab0a2)`, nicht "orange".
- **Icons benennen:** "a hand-drawn lightning bolt icon" statt "ein Symbol".
- **Layout beschreiben:** "at top", "on the left side", "bottom center".

## Datei-Benennung

```
[blog-slug]-[nummer].webp           # Full-Size (1200x675, Quality 85)
[blog-slug]-[nummer]-thumb.webp     # Thumbnail (400x225, Quality 80)
```

**WICHTIG:** Immer WebP, niemals PNG deployen! PNGs nur als Zwischenschritt.

## Post-Processing (Pflicht!)

1. **Gemini AI-Logo entfernen** (4-Stern-Icon unten rechts, mit Hintergrundfarbe patchen)
2. **Auf 16:9 croppen** falls Seitenverhaeltnis leicht abweicht
3. **WebP konvertieren** in zwei Groessen:
   - Full: 1200x675px, WebP Quality 85 (50-150KB)
   - Thumbnail: 400x225px, WebP Quality 80 (8-25KB)
4. **Script:** `python3 optimize-images.py` (macht alles automatisch)

## Hero-Image Regel

Das erste Bild eines Posts (= heroImage im Frontmatter) wird automatisch als grosser Header ueber dem Artikel gerendert. Es darf NICHT nochmal als Inline `![Alt](url)` im Markdown-Body vorkommen!

## Qualitaets-Checkliste

- [ ] Hintergrund dunkel (#1a1a1a)?
- [ ] Alle Texte lesbar?
- [ ] Amber (#d4893e) fuer Titel/Headlines?
- [ ] Teal (#3ab0a2) nur fuer Akzente?
- [ ] Hand-drawn / Sketch-Aesthetik erkennbar?
- [ ] Korrektes Format (16:9 oder 1:1)?
- [ ] Keine Fotos oder fotorealistische Elemente?
- [ ] Gemini AI-Logo entfernt?
- [ ] WebP konvertiert (Full + Thumbnail)?
