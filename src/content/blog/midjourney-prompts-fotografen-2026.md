---
title: "Midjourney Prompts Deutsch: Der Guide fuer Fotografen"
titleAccent: "Midjourney"
slug: midjourney-prompts-fotografen-2026
date: 2026-03-18
updated: 2026-03-18
draft: false
category: ki-tools
pillar: ai-creative
primaryKW: midjourney prompts deutsch
description: "Midjourney Prompts Deutsch erklaert von einem Fotografen: Kamera-Parameter, Licht, Style und 15 echte Prompt-Beispiele fuer fotorealistische Portraits und Landschaften."
heroImage: "/images/blog/midjourney-prompts-fotografen-2026-1.webp"
heroImageThumb: "/images/blog/midjourney-prompts-fotografen-2026-1-thumb.webp"
tags:
  - midjourney
  - ki-bildgenerierung
  - fotografie
  - prompting
interlinks:
  - ki-bilder-erstellen-guide-2026
  - ki-bildbearbeitung-workflow-fotograf-2026
affiliate:
  - name: "Midjourney"
    desc: "Midjourney Abo"
    price: "~10 USD/Monat"
    url: "https://midjourney.com"
---

# Midjourney Prompts Deutsch: Der Guide fuer Fotografen

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>Midjourney "denkt" in fotografischen Begriffen — wenn du als Fotograf promptest, kriegst du deutlich bessere Ergebnisse</li>
		<li>Die wichtigsten Parameter: <code>--ar</code>, <code>--v 6.1</code>, <code>--style raw</code>, <code>--chaos</code>, <code>--stylize</code></li>
		<li>Licht ist alles: Golden Hour, Rembrandt, Softbox — Midjourney kennt die alle</li>
		<li>Kamera-Specs im Prompt verbessern den Output sichtbar (Brennweite, Blende, Body)</li>
		<li>15 Copy-Paste-Prompts am Ende des Artikels</li>
	</ul>
</div>

---

Als ich vor zwei Jahren das erste Mal Midjourney ausprobiert habe, war mein erster Prompt so ungefaehr: "ein schoenes Foto von einer Landschaft". Das Ergebnis war... nunja, KI-typischer Kitsch. Saettigte Farben, zu dramatisch, irgendwie plastisch.

Was ich nicht kapiert hatte: Midjourney war trainiert auf fotografischem Fachvokabular. Das Tool "versteht" Begriffe wie Brennweite, Blendeneffekt, Beleuchtungssetup und Filmemulsionen — weil ein riesiger Teil des Trainingsdatensatzes aus der Fotografiewelt kommt. Als Fotograf mit eigenem Fachvokabular hatte ich die ganze Zeit einen unfairen Vorteil, den ich einfach nicht genutzt habe.

Das aendert sich jetzt. Dieser Guide ist fuer Fotografen geschrieben, die Midjourney ernsthaft als Werkzeug einsetzen wollen — nicht fuer Leute die "KI-Kunst" machen, sondern fuer Leute die fotorealistische Bilder fuer Moodboards, Konzept-Previews oder Content brauchen.

---

## Warum Fotografen bessere Midjourney-Prompts schreiben koennen

Die meisten Midjourney-Tutorials erklaeern Prompts aus der Sicht von Grafikdesignern oder KI-Hobbyisten. Das Problem: Die schreiben Prompts wie "dramatic fantasy portrait of a woman, epic lighting, cinematic". Klingt toll, liefert aber meistens uebersaettigten Over-the-Top-Kram.

Ein Fotograf wuerde stattdessen schreiben: "portrait, 85mm f/1.4, golden hour backlight, slight lens flare, Canon 5D Mark IV, natural skin tones, VSCO Fuji preset". Das klingt nuechterner, aber das Ergebnis sieht tatsaechlich fotografisch aus.

Grund: Midjourney wurde mit echten Fotos trainiert, die echte EXIF-Metadaten hatten. Das Modell hat gelernt, welche Kamera-Setups welche Ergebnisse produzieren. Wenn du diese Sprache sprichst, landest du viel naeher an dem, was tatsaechlich fotografisch aussieht.

Die Kernregel fuer midjourney prompts deutsch ist deshalb: **Beschreibe das Foto-Setup, nicht das "Ergebnis".**

---

## Die Anatomie eines guten Midjourney-Prompts

Bevor ich Beispiele zeige, kurz die Struktur die bei mir am besten funktioniert:

```
[Motiv + Pose/Situation], [Kamera-Setup], [Licht-Setup], [Style/Stimmung], [technische Parameter]
```

In der Praxis sieht das so aus:

```
environmental portrait of a craftsman working in his workshop,
35mm lens, natural window light from left side, slight dust particles visible,
documentary style, muted warm tones --ar 3:2 --v 6.1 --style raw --stylize 50
```

Jeder Block hat einen Job:

- **Motiv** sagt was auf dem Bild ist
- **Kamera-Setup** sagt wie es aufgenommen wurde
- **Licht** sagt woher das Licht kommt
- **Style** sagt die aesthetische Richtung vor
- **Parameter** kontrollieren Midjourney-Verhalten direkt

---

## Die wichtigsten Midjourney Parameter fuer Fotografen

### `--v 6.1` (Version)

Immer aktuellste Version nutzen. v6.1 ist Stand Anfang 2026 die Standardversion und liefert bei weitem fotorealistischste Ergebnisse. Falls du mit aelteren Versionen experimentierst: v5.2 war fuer bestimmte Portraetstile besser, aber fuer allgemeine Fotorealistik ist 6.1 klarer Gewinner.

### `--style raw`

Das ist mein meistgenutzter Parameter. `--style raw` deaktiviert Midjourneys eingebaute "Verschoenerungsfilter" — das Tool macht die Bilder standardmaessig etwas polierter und dramatischer als noetig. Mit `--style raw` kriegst du etwas weniger geschlecktes, aber viel fotografischeres Ergebnis. Fuer Reportage-Style oder Documentary fast immer erste Wahl.

### `--stylize` (0-1000, Standard: 100)

Kontrolliert wie stark Midjourney seinen eigenen aesthetischen Geschmack einbringt. Niedrig (20-50) = du hast mehr Kontrolle, das Bild folgt deinem Prompt staerker. Hoch (700+) = Midjourney wird "kuenstlerischer" aber ignoriert teile deines Prompts. Fuer fotorealistische midjourney prompts deutsch empfehle ich 30-80.

### `--chaos` (0-100, Standard: 0)

Wie unterschiedlich die vier Ergebnis-Varianten ausfallen. Bei 0 sind alle vier sehr aehnlich. Bei 50-70 bekommst du mehr Vielfalt, gut fuer Exploration. Ich starte meist mit 20-30 wenn ich einen neuen Prompt entwickle.

### `--ar` (Aspect Ratio)

- `--ar 3:2` — klassisches Kamera-Format, fuer die meisten Fotos richtig
- `--ar 16:9` — Widescreen, gut fuer Landschaften und Panoramen
- `--ar 4:5` — Instagram-Hochformat
- `--ar 2:3` — Hochkant Portrait
- `--ar 1:1` — Quadrat

### `--no`

Negativprompt. Ich nutze fast immer `--no watermark, text, signature, oversaturation`. Manchmal auch `--no lens blur, bokeh` wenn ich etwas dokumentarisch scharf haben will, oder `--no studio background` wenn ich Umgebungsportraets mache.

---

## Licht: Der wichtigste Bestandteil deiner Prompts

Als Fotograf weisst du: Licht entscheidet. Das gilt auch fuer Midjourney. Diese Begriffe funktionieren besonders gut:

**Naturlicht:**

- `golden hour backlight` — klassisches Gegenlichtportrait
- `overcast diffused light` — weiches, richtungsloses Licht, perfekt fuer Portraits ohne harte Schatten
- `blue hour ambient light` — duestere Stimmung, staedtische Szenen
- `harsh midday sun, hard shadows` — dokumentarisch, Reportage-Stil
- `window light from left, soft shadow falloff` — klassisches Studio-Ersatz-Licht

**Studioprobleme reproduzieren:**

- `Rembrandt lighting setup` — das charakteristische Dreieck unter dem Auge
- `split lighting, half face in shadow` — dramatisch
- `butterfly lighting, beauty dish effect` — klassisches Beautylicht
- `softbox from 45 degrees above, fill reflector` — sauberes Portraitlicht
- `ring flash, flat even light` — Fashion-Style

**Film und Vintage:**

- `practical lights only, tungsten color cast` — warme Raumlichtatmosphaere
- `neon signage reflections, wet street` — urbaner Night-Stil
- `candlelight, chiaroscuro` — malerisch, sehr warm

---

## Kamera und Optik im Prompt

Brennweiten und Blenden funktionieren ueberraschend gut in Midjourney. Das Modell hat verstanden, welche optischen Effekte zu welchen Specs gehoeren:

- `24mm wide angle, slight distortion` — Weitwinkelverzerrung sichtbar
- `35mm f/2, natural field of view` — klassische Reportage-Brennweite
- `50mm f/1.4, shallow depth of field` — Portraitschwerpunkt, Hintergrundunschaerfe
- `85mm f/1.8 portrait lens, background separation` — typisches Portraitobjektiv
- `135mm f/2, compressed perspective, telephoto bokeh` — stark komprimierte Perspektive
- `24-70mm zoom, environmental portrait` — Allrounder-Look

Kamera-Bodies funktionieren auch, allerdings subtiler:

- `shot on Canon 5D Mark IV, full frame sensor` — wirkt etwas waermer, klassischer DSLR-Look
- `shot on Sony A7 series, mirrorless` — etwas neutraler, moderner
- `shot on Fujifilm GFX medium format` — tonal fein, sehr scharf wirkend
- `shot on Leica M, rangefinder aesthetic` — charakteristischer Leica-Look

**Filmemulsionen** sind einer meiner Lieblingstricks:

- `Kodak Portra 400 film grain, warm skin tones` — der Klassiker fuer Portraits
- `Fujifilm Velvia slide film, saturated greens` — Landschaft mit knalligen Farben
- `Kodak Tri-X black and white, high contrast grain` — harten S/W-Look erzeugen
- `Ilford HP5 pushed to 3200 ISO, heavy grain` — koernige Nachtfotografie

---

## 15 Prompt-Beispiele zum Kopieren

Jetzt das eigentliche Herzstueck. Alle Prompts direkt im Discord `/imagine` nutzbar.

### Portraits

**1. Natuerliches Umgebungsportrait**

```
environmental portrait of a middle-aged man in his workshop,
leather apron, focused expression, 35mm f/2 lens,
natural window light from the right, dust particles in light beam,
documentary photography style, muted warm tones, Kodak Portra 400
--ar 3:2 --v 6.1 --style raw --stylize 40 --no text, watermark
```

**2. Stadtportrait Blue Hour**

```
street portrait of a young woman in front of city lights,
blue hour ambient light, slight neon reflections on face,
50mm f/1.4, shallow depth of field, bokeh city background,
candid documentary style, Fujifilm aesthetic
--ar 2:3 --v 6.1 --style raw --stylize 60
```

**3. Klassisches Beauty-Portrait**

```
beauty portrait of a woman, butterfly lighting setup,
catchlights in eyes, slight retouching, 85mm portrait lens,
white seamless background, clean skin texture,
high-fashion editorial style, natural makeup
--ar 4:5 --v 6.1 --stylize 80
```

**4. Reportage-Portrait**

```
candid portrait of an elderly fisherman on a boat,
weathered face, deep wrinkles, harsh midday sun,
hard shadows, authentic expression,
35mm street photography style, Ilford HP5 black and white film
--ar 3:2 --v 6.1 --style raw --stylize 25
```

**5. Low-Light Portraitstimmung**

```
portrait by candlelight, warm tungsten atmosphere,
chiaroscuro lighting, soft shadows,
50mm lens, shallow focus, bokeh flame in background,
moody and intimate atmosphere, Kodak Portra 800 pushed film look
--ar 3:2 --v 6.1 --style raw --stylize 50
```

### Landschaft und Architektur

**6. Klassische Golden Hour Landschaft**

```
landscape photography, rolling hills at golden hour,
backlight through grass, lens flare,
24mm wide angle, deep depth of field,
long exposure motion blur in clouds,
Fujifilm Velvia film saturation, rich greens and golds
--ar 16:9 --v 6.1 --style raw --stylize 70
```

**7. Urbane Street Photography**

```
street photography, rainy night in a city alley,
wet cobblestones reflecting neon signs,
pedestrian with umbrella, motion blur,
28mm wide angle, high ISO grain,
documentary style, Kodak Tri-X pushed to 3200
--ar 3:2 --v 6.1 --style raw --stylize 30
```

**8. Architektur-Interieur**

```
interior architecture photography, abandoned industrial hall,
shafts of light through broken roof windows,
dust particles floating, long exposure,
16mm ultra wide angle, strong leading lines,
HDR toning, desaturated color palette
--ar 3:2 --v 6.1 --stylize 60
```

**9. Minimalistisches Winterlandschaft**

```
minimalist winter landscape, single bare tree in snow field,
overcast flat light, pure white snow,
long focal length compression, telephoto 200mm,
negative space composition, Scandinavian aesthetic,
high key exposure, very subtle warm tones
--ar 16:9 --v 6.1 --style raw --stylize 40
```

**10. Berglandschaft bei Daemmerung**

```
mountain landscape at blue hour, jagged peaks,
last light on highest summit, dark valley below,
16mm ultra wide, deep depth of field,
foreground interest with rocks, dramatic cloud formation,
Fujifilm Velvia saturation, cold blue shadows, warm peak
--ar 16:9 --v 6.1 --stylize 90
```

### Konzept und Moodboard

**11. Fashion Editorial**

```
fashion editorial photograph, model in avant-garde outfit,
against brutalist concrete wall, overcast diffused daylight,
85mm lens, slight motion blur on fabric,
high fashion magazine style, desaturated tones,
strong geometric composition
--ar 4:5 --v 6.1 --stylize 100
```

**12. Food Photography**

```
food photography, rustic sourdough bread on wooden board,
natural side light from left window,
slight steam rising, selective focus 50mm macro,
warm and inviting atmosphere, dark moody food styling,
shallow depth of field, garnish herbs
--ar 1:1 --v 6.1 --stylize 60
```

**13. Produktfoto Stimmung**

```
product photography, vintage camera on weathered leather,
Rembrandt lighting, dramatic shadow play,
macro lens close-up detail,
dark background, warm tone, museum still life aesthetic,
Leica M6 film camera
--ar 4:5 --v 6.1 --style raw --stylize 50
```

**14. Reportage Dokumentarfoto**

```
documentary photograph, open air market in morning light,
vendors setting up stalls, candid moment,
28mm street photography perspective,
natural color, gritty texture,
Kodak Ektar 100 film look, slight vignette
--ar 3:2 --v 6.1 --style raw --stylize 20 --chaos 20
```

**15. Konzept-Moodboard Portrait**

```
conceptual portrait, woman surrounded by blooming flowers,
mixed natural and artificial light,
85mm f/2 soft focus, intentional dreamy quality,
pastel color palette, slightly overexposed,
editorial beauty photography, Kodak Portra 160
--ar 4:5 --v 6.1 --stylize 120
```

---

## Was bei mir nicht funktioniert — ehrliche Bilanz

Nach zwei Jahren mit Midjourney gibt es ein paar Sachen die mich noch immer nerven:

**Haende.** Das ist ein Klischee, aber es stimmt immer noch. Midjourney v6.1 ist besser als seine Vorgaenger, aber sobald du die Haende im Bild hast, ist es Gluecksspiel. Mein Workaround: Haende weich bokeht oder ausserhalb des Frames halten, wenn moeglich.

**Konsistenz.** Wenn ich einen Charakter ueber mehrere Bilder hinweg konsistent halten muss — geht nicht ohne erheblichen Aufwand. Das `--cref` und `--sref` System hilft, aber fuer professionelle Kampagnen mit echten Personen ist Midjourney noch kein Ersatz fuer ein echtes Shooting.

**Sehr spezifische Locations.** "Berliner Strasse in Prenzlauer Berg" liefert generischen europaeischen Strassen-Look. Wenn ich echte, erkennbare Orte brauche, hilft nur echtes Shooting.

**Schrift im Bild.** Finger weg, das endet immer in unleserlichem Kauderwelsch.

---

## Mein Workflow fuer neue Prompts

Kurz erklaert wie ich selbst mit Midjourney prompts deutsch arbeite wenn ich etwas Neues entwickle:

1. Erst grob testen mit `--chaos 30` — ich will sehen was das Modell grundsaetzlich mit dem Konzept macht
2. Vier Varianten anschauen, das interessanteste Ergebnis identifizieren
3. Dieses Bild als Ausgangspunkt nehmen (`V1-V4` Variation-Button) und den Prompt verfeinen
4. Sobald ich happy bin, `--chaos 0` setzen und weitere Variationen davon generieren
5. Fuer finale Versionen immer `--q 2` (max Quality) und `--v 6.1`

Den kompletten Workflow wie ich KI-generierte Bilder anschliessend bearbeite und in meinen Fotografie-Workflow einbinde, habe ich im Artikel [KI Bildbearbeitung: Mein Workflow als Fotograf](/blog/ki-bildbearbeitung-workflow-fotograf-2026) beschrieben. Und die Prompt-Prinzipien die ich hier fuer Bilder nutze — Kontext liefern, Output-Format vorgeben, iterieren — funktionieren genauso fuer Text: dazu habe ich einen eigenen [Prompt Engineering Guide](/blog/prompt-engineering-lernen-2026) geschrieben.

---

## Lohnt sich Midjourney fuer Fotografen?

Direkte Antwort: Ja, aber nicht als Fotografen-Ersatz.

Ich nutze Midjourney hauptsaechlich fuer:

- **Moodboards** vor einem Shooting — Kunden koennen sehen was ich mir vorstelle
- **Konzeptvisualisierungen** die sich nicht vernuenftig produzieren liessen
- **Blog und Social Media** wenn ich ein visuelles Beispiel brauche ohne ein eigenes Bild parat zu haben
- **Stilexperimente** bevor ich Zeit und Geld in ein echtes Shoot stecke

Was Midjourney _nicht_ ist: ein Ersatz fuer echte Fotografie. Das Gefuehl eines Moments, das echte Licht, die Substanz einer Szene — das kriegst du nicht mit einem KI-Bild. Meine besten Bilder sind immer noch die, die ich mit einer Kamera in der Hand gemacht habe.

Aber als Werkzeug in meinem kreativen Prozess ist es inzwischen Standard. Das [Midjourney Abo fuer ~10 USD/Monat](https://midjourney.com) ist fuer mich gerechtfertigt — ich nutze es regelmaessig genug.

Wenn du noch nie mit KI-Bildgeneratoren gearbeitet hast, empfehle ich erst meinen allgemeinen Guide [KI Bilder erstellen: Der ultimative Guide 2026](/blog/ki-bilder-erstellen-guide-2026) — da erklaere ich die Grundlagen aller Tools und warum ich am Ende bei Midjourney gelandet bin.

---

## Quick Reference: Die wichtigsten fotografischen Begriffe fuer Midjourney

Zum Bookmarken:

| Kategorie  | Begriff im Prompt       | Effekt                            |
| ---------- | ----------------------- | --------------------------------- |
| Brennweite | `24mm wide angle`       | Weites FOV, leichte Verzerrung    |
| Brennweite | `85mm portrait lens`    | Portrait-Kompression, Trennung    |
| Brennweite | `135mm telephoto`       | Starke Kompression, flacher Look  |
| Blende     | `f/1.4 shallow DOF`     | Starkes Bokeh                     |
| Blende     | `f/8 deep focus`        | Alles scharf                      |
| Licht      | `golden hour backlight` | Warmes Gegenlicht                 |
| Licht      | `overcast diffused`     | Weiches Licht ohne Schatten       |
| Licht      | `Rembrandt lighting`    | Charakteristisches Portraitlicht  |
| Film       | `Kodak Portra 400`      | Warme Hauttöne, klassisch         |
| Film       | `Fujifilm Velvia`       | Saettigte Farben, Natur           |
| Film       | `Kodak Tri-X B&W`       | Harter S/W Kontrast               |
| Style      | `--style raw`           | Weniger KI-Filter, fotografischer |
| Style      | `--stylize 30`          | Mehr Prompt-Treue                 |
| Style      | `--stylize 150`         | Mehr kuenstlerische Freiheit      |
