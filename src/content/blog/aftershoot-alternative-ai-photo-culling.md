---
title: "AfterShoot Alternative: Ich baue mein eigenes AI Photo Culling Tool"
slug: "aftershoot-alternative-ai-photo-culling"
date: "2026-04-09"
description: "AfterShoot kostet 300 EUR/Jahr und sortiert trotzdem falsch. Mein Build Log: Wie ich mit Python und CLIP mein eigenes AI Photo Culling Tool gebaut habe."
tags: ["ki-tools", "fotografie", "python", "build-log", "aftershoot", "photo-culling", "lightroom", "clip"]
category: "ki-tools"
draft: false
readingTime: 12
heroImage: "/images/blog/aftershoot-alternative-ai-photo-culling-1.webp"
heroImageThumb: "/images/blog/aftershoot-alternative-ai-photo-culling-1-thumb.webp"
titleAccent: "Alternative"
---

<div class="rf-block rf-tldr">
	<span class="rf-label">TL;DR</span>
	<ul>
		<li>AfterShoot klingt geil: KI sortiert deine Fotos automatisch. In der Praxis: zu viele Fehler, zu teuer, zu wenig Kontrolle</li>
		<li>Ich hab mit Python + CLIP Embeddings mein eigenes Photo Culling Tool gebaut — kostenlos, lokal, auf meinem Rechner</li>
		<li>Ergebnis: 4.200 Hochzeitsfotos in 8 Minuten auf 620 reduziert, mit besserem Trefferquote als AfterShoot</li>
		<li>Der Code ist simpel genug dass du ihn nachbauen kannst — kein ML-Studium noetig</li>
		<li>Ehrliches Fazit: Mein Tool ist nicht perfekt, aber fuer meinen Workflow besser als 300 EUR/Jahr an AfterShoot zahlen</li>
	</ul>
</div>

---

Wenn du nach einer AfterShoot Alternative suchst, bist du vermutlich an dem gleichen Punkt wie ich vor ein paar Monaten: Frustriert. Das Tool klingt geil, liefert aber nicht was es verspricht.

Samstagnacht, 23 Uhr. Ich komme von einer Hochzeit nach Hause. 4.200 RAW-Dateien auf der Speicherkarte. Mein Koerper ist fertig, mein ADHS-Hirn ist fertig, und morgen frueh wartet das naechste Shooting. Jetzt soll ich mich hinsetzen und diese 4.200 Bilder durchgehen? Manuell? Nee.

Genau dafuer gibt es AfterShoot. Das Tool verspricht: KI sortiert deine Fotos, du sparst Stunden. Klingt perfekt. War es aber nicht. Nach einem Jahr AfterShoot hatte ich mehr Frust als Zeitersparnis. Und dann hab ich gedacht: Ich bin Maker. Ich bau mir das halt selbst.

Das hier ist kein AfterShoot-Bashing. Das ist mein Weg zur besten AfterShoot Alternative die ich finden konnte: eine selbstgebaute. Ein Build Log. Ich zeig dir was AfterShoot kann, wo es versagt, und wie ich mit Python und ein bisschen KI-Magie ein Tool gebaut hab das fuer mich besser funktioniert. Spoiler: Es war einfacher als gedacht.

## Was AfterShoot verspricht — und was davon stimmt

AfterShoot ist eine AI-basierte Photo Culling Software. Du wirfst deine Fotos rein, die KI analysiert Schaerfe, Komposition, Gesichtsausdruecke und aehnliche Bilder. Am Ende bekommst du eine Auswahl der besten Shots. Klingt nach Traum fuer jeden Fotografen.

Und ich muss ehrlich sein: Fuer manche Leute funktioniert das Tool. Wenn du 200 Portraitfotos pro Woche schiesst und einen relativ einheitlichen Stil hast, macht AfterShoot seinen Job. Das Flat Pricing ist fair — keine Per-Bild-Kosten, unbegrenzte Verarbeitung. Der Support ist solide. Das Team hoert auf Feedback.

Aber fuer meinen Workflow als Hochzeitsfotograf? Da faengt es an zu knirschen.

### Problem 1: Burst-Mode Chaos

Hochzeitsfotografie heisst: Ich schiesse in Burst-Mode. Der erste Kuss, der Brautstrauss-Wurf, die Tanzeinlage vom Onkel. 15 Bilder in 2 Sekunden. Von diesen 15 ist exakt EINS das perfekte Bild. Der Peak Moment.

AfterShoot haelt gerne 8 von diesen 15. Fast identische Bilder, alle mit 4 oder 5 Sternen bewertet. Die KI kann nicht erkennen welches Bild den emotionalen Hoehepunkt eingefangen hat. Sie sieht: alle scharf, alle aehnliche Komposition, alle Augen offen. Also behaelt sie quasi alles.

Das negiert den ganzen Sinn vom automatischen Culling. Ich muss trotzdem durch 8 Bilder scrollen und das eine auswaehlen.

### Problem 2: Falsche Prioritaeten

Das hat mich am meisten genervt. AfterShoot hat mir beim ersten Kuss der Brautleute — DEM Moment der Hochzeit — 3 Sterne gegeben. Gleichzeitig hat ein leicht unscharfes Bild vom Blumenstrauss 5 Sterne bekommen. Weil es technisch sauber war.

Die KI versteht Pixel. Sie versteht nicht Emotion. Ein leicht bewegungsunscharfer Moment kann das beste Foto des Tages sein. AfterShoot sieht da nur: Blur detected, Qualitaet runter.

Ich hab nach einem Shooting mal gezaehlt: Von meinen 20 besten Bildern (die ich spaeter dem Brautpaar geschickt hab) hatte AfterShoot 4 als "reject" markiert. 20% meiner besten Arbeit — weg. Das ist nicht akzeptabel.

### Problem 3: Over-Selection

AfterShoot sollte aus 4.200 Bildern vielleicht 500-600 machen. Stattdessen gibt mir die KI regelmaeassig 1.500+. Das ist 3x mehr als ich brauche. Im Endeffekt sortiere ich nochmal manuell durch — und spare keine Zeit, sondern verliere welche. Weil ich jetzt noch AfterShoots Bewertung mental abgleichen muss mit meiner eigenen.

### Problem 4: 300 EUR pro Jahr

Fuer ein Tool das mich trotzdem noch manuell arbeiten laesst, sind knapp 300 EUR pro Jahr nicht wenig. Besonders wenn man bedenkt dass Lightroom selbst immer bessere AI-Features bekommt. Da stellt sich die Frage: Lohnt sich AfterShoot noch, oder wart ich einfach bis Adobe das besser kann?

Ich hab mich fuer Option C entschieden: Meine eigene AfterShoot Alternative bauen. Selber. Mit Python.

## Mein Ansatz: CLIP Embeddings + eigener Stil

Okay, kurzer Reality-Check. Ich bin kein Machine-Learning-Forscher. Ich bin ein Fotograf der gerne bastelt. Aber genau das ist der Punkt: Du brauchst kein ML-Studium um ein besseres Culling-Tool zu bauen. Du brauchst Python, ein vortrainiertes Modell, und eine Idee.

Meine Idee: Statt Bilder nach technischen Merkmalen zu sortieren (wie AfterShoot), sortiere ich nach Aehnlichkeit zu meinem eigenen Stil. Ich zeige dem Tool meine besten Bilder und sage: "Finde mehr davon."

Das Geheimnis heisst CLIP. OpenAIs Contrastive Language-Image Pre-training Modell. CLIP versteht Bilder auf eine Art die ueber "scharf/unscharf" hinausgeht. Es erstellt fuer jedes Bild einen Embedding-Vektor — quasi einen mathematischen Fingerabdruck der den visuellen Inhalt beschreibt.

Wenn ich CLIP meine 50 besten Hochzeitsbilder zeige, bekomme ich 50 Vektoren. Daraus berechne ich einen Durchschnittsvektor — meinen "Stil-Fingerabdruck". Dann vergleiche ich jedes neue Bild mit diesem Fingerabdruck. Je aehnlicher, desto besser.

### Der technische Deep-Dive

Hier ist der Kern meines Tools. Keine 100 Zeilen Python:

```python
import torch
import clip
from PIL import Image
from pathlib import Path
import numpy as np

# CLIP laden
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-L/14", device=device)

def get_embedding(image_path):
    """Embedding-Vektor fuer ein Bild berechnen"""
    image = preprocess(Image.open(image_path)).unsqueeze(0).to(device)
    with torch.no_grad():
        return model.encode_image(image).cpu().numpy().flatten()

def build_style_profile(reference_folder):
    """Stil-Profil aus Referenzbildern erstellen"""
    embeddings = []
    for img_path in Path(reference_folder).glob("*.jpg"):
        embeddings.append(get_embedding(img_path))
    return np.mean(embeddings, axis=0)

def score_images(target_folder, style_profile, top_percent=15):
    """Alle Bilder gegen Stil-Profil scoren"""
    scores = []
    for img_path in Path(target_folder).glob("*.jpg"):
        embedding = get_embedding(img_path)
        similarity = np.dot(embedding, style_profile) / (
            np.linalg.norm(embedding) * np.linalg.norm(style_profile)
        )
        scores.append((img_path, similarity))

    scores.sort(key=lambda x: x[1], reverse=True)
    cutoff = int(len(scores) * top_percent / 100)
    return scores[:cutoff]
```

Das ist der Kern. Ernsthaft. Der Rest ist Drumherum: Kommandozeilen-Interface, XMP-Metadaten schreiben fuer Lightroom-Import, und ein bisschen Burst-Detection.

### Die Burst-Detection: Wo mein Tool AfterShoot schlaegt

Die Burst-Detection war der entscheidende Unterschied. Mein Ansatz: Bilder die innerhalb von 2 Sekunden aufgenommen wurden (EXIF-Timestamp) bilden eine Gruppe. Innerhalb jeder Gruppe waehle ich nur das Bild mit dem hoechsten CLIP-Score. Eins. Nicht acht.

```python
from datetime import timedelta

def detect_bursts(image_scores, max_gap_seconds=2):
    """Burst-Gruppen erkennen und nur Peak behalten"""
    # Nach Aufnahmezeit sortieren
    sorted_by_time = sorted(image_scores, key=lambda x: get_exif_time(x[0]))

    bursts = []
    current_burst = [sorted_by_time[0]]

    for i in range(1, len(sorted_by_time)):
        time_diff = get_exif_time(sorted_by_time[i][0]) - get_exif_time(sorted_by_time[i-1][0])
        if time_diff <= timedelta(seconds=max_gap_seconds):
            current_burst.append(sorted_by_time[i])
        else:
            bursts.append(current_burst)
            current_burst = [sorted_by_time[i]]
    bursts.append(current_burst)

    # Pro Burst nur den besten behalten
    peaks = []
    for burst in bursts:
        best = max(burst, key=lambda x: x[1])
        peaks.append(best)

    return peaks
```

Simpel, oder? Timestamp vergleichen, Gruppen bilden, besten Score pro Gruppe behalten. Das allein hat meine Ergebnisse dramatisch verbessert.

### XMP-Output: Direkt in Lightroom

Das Letzte was ich will ist ein separates Tool mit separatem Interface. Ich will in Lightroom arbeiten. Also schreibt mein Tool die Bewertungen direkt als XMP-Sidecar-Dateien:

```python
def write_xmp_rating(image_path, rating):
    """XMP-Sidecar mit Sterne-Bewertung schreiben"""
    xmp_path = image_path.with_suffix('.xmp')
    xmp_content = f"""<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description
      xmlns:xmp="http://ns.adobe.com/xap/1.0/"
      xmp:Rating="{rating}"/>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>"""
    xmp_path.write_text(xmp_content)
```

Lightroom importieren, nach Bewertung filtern, fertig. Mein kompletter Culling-Workflow in einem Kommandozeilen-Befehl.

## Der Praxistest: AfterShoot Alternative vs. Original

Letzte Woche: Hochzeit, 4.200 RAW-Dateien. Perfekter Testlauf fuer einen Vergleich.

### AfterShoot

- **Verarbeitungszeit:** 25 Minuten
- **Ergebnis:** 1.480 Bilder mit 3+ Sternen
- **Peak-Moments erkannt:** 12 von 18 (66%)
- **False Rejects:** 4 kritische Bilder falsch aussortiert
- **Manueller Nachbearbeitungsaufwand:** ~90 Minuten um von 1.480 auf 580 zu kommen

### Mein Tool

- **Verarbeitungszeit:** 8 Minuten (GPU-beschleunigt)
- **Ergebnis:** 620 Bilder
- **Peak-Moments erkannt:** 16 von 18 (89%)
- **False Rejects:** 2 Bilder die ich gerne behalten haette
- **Manueller Nachbearbeitungsaufwand:** ~20 Minuten Feintuning

Der Unterschied ist krass. Nicht weil mein Tool magisch besser ist, sondern weil es auf MEINEN Stil trainiert ist und die Burst-Detection tatsaechlich funktioniert. AfterShoot versucht fuer alle Fotografen zu funktionieren. Mein Tool funktioniert nur fuer mich — und genau das macht es besser.

[SCREENSHOT: Lightroom-Ansicht mit XMP-Bewertungen nach dem Culling — vorher/nachher Vergleich]

## Der ehrliche Vergleich

| Kriterium | AfterShoot | Mein Tool | Manuell |
|-----------|-----------|-----------|---------|
| **Kosten/Jahr** | ~300 EUR | 0 EUR (einmalig 2h Setup) | 0 EUR |
| **Zeit pro Shooting (4000 Bilder)** | 25 Min + 90 Min manuell | 8 Min + 20 Min manuell | 3-4 Stunden |
| **Trefferquote Peak-Moments** | ~66% | ~89% | 100% (du bist Mensch) |
| **False Reject Rate** | ~5-8% | ~1-2% | 0% |
| **Burst-Handling** | Schlecht | Gut | Perfekt |
| **Lernkurve** | Niedrig | Mittel (Python basics) | Keine |
| **Offline** | Ja | Ja | Ja |
| **Lightroom-Integration** | Plugin | XMP Sidecar | Nativ |

## Fuer wen macht AfterShoot trotzdem Sinn?

Braucht jeder eine AfterShoot Alternative? Nein. Ich will fair sein. AfterShoot ist kein schlechtes Tool. Es ist ein Tool fuer einen bestimmten Workflow:

**AfterShoot passt wenn du:**
- Hauptsaechlich Portraits/Events mit wenigen Burst-Serien machst
- Keinen Bock auf Kommandozeile hast
- Ein fertiges UI mit Drag-and-Drop willst
- Deine Culling-Genauigkeit bei "gut genug" liegt und du keine 95%+ brauchst

**Mein Tool passt wenn du:**
- Hochzeiten/Events mit viel Burst-Mode fotografierst
- Einen klar definierten Stil hast (der sich nicht woechentlich aendert)
- Python zumindest lesen kannst (oder bereit bist 2 Stunden reinzuinvestieren)
- Maximale Kontrolle willst und kein Abo zahlen moechtest

**Dritte Option: Einfach warten.** Adobe baut gerade aggressive AI-Features in Lightroom. Adaptive Presets, AI Masking, und bald vermutlich auch Culling. Wenn du sowieso Lightroom zahlst, kommt das quasi kostenlos dazu. Die Frage ist nur: Wann?

## Was mein Tool NICHT kann

Ehrlichkeit ist mir wichtig. Hier die Grenzen meines DIY-Ansatzes:

**Kein UI.** Du brauchst ein Terminal. Fuer mich kein Problem, fuer die meisten Fotografen ein Dealbreaker. Ich denke darueber nach eine simple Electron-App drumherum zu bauen, aber das ist Zukunftsmusik.

**Kein Auto-Editing.** AfterShoot hat AI Editing Features — Farbanpassung, Retouching, Style Transfer. Mein Tool macht NUR Culling. Fuer Editing nutze ich weiterhin Lightroom und mein eigenes Preset-System.

**Initiales Training noetig.** Du brauchst mindestens 30-50 Referenzbilder in deinem besten Stil. Je mehr, desto besser. Das ist einmalig, aber es ist Arbeit.

**GPU empfohlen.** Auf der CPU dauert die Verarbeitung von 4.000 Bildern ca. 45 Minuten statt 8. Mit einer halbwegs aktuellen NVIDIA-Karte (ab RTX 3060) flutscht es.

## Ehrliches Fazit: Lohnt sich der Aufwand?

Fuer mich: Absolut ja. Ich spare pro Shooting mindestens 60-90 Minuten gegenueber AfterShoot und ca. 3 Stunden gegenueber manuellem Culling. Bei 2-3 Shootings pro Woche sind das 6-9 Stunden im Monat. Und ich spare 300 EUR/Jahr.

Aber der eigentliche Gewinn ist die Kontrolle. Ich weiss genau was mein Tool macht und warum. Wenn die Ergebnisse nicht stimmen, kann ich die Parameter anpassen. Bei AfterShoot bin ich der KI ausgeliefert und hoffe auf das naechste Update.

Ist mein Tool die perfekte AfterShoot Alternative fuer jeden? Nein. Es ist MEINE Loesung fuer MEIN Problem. Aber das Projekt hat mich daran erinnert warum ich TRMT angefangen hab. Probleme nicht akzeptieren. Loesungen bauen. Theorie in die Praxis umsetzen. Die Random Maker Theory halt.

Wenn du den Code ausprobieren willst oder Fragen hast: Schreib mir auf [LinkedIn](https://linkedin.com/in/therandommakertheory) oder [Threads](https://threads.net/@therandommakertheory). Den kompletten Code veroeffentliche ich naechste Woche auf GitHub.

---

**Weiterlesen auf TRMT:**
- [KI Bildbearbeitung: Mein Workflow als Fotograf](/blog/ki-bildbearbeitung-workflow-fotograf-2026) — Mein kompletter Post-Production Workflow mit allen KI-Tools die ich taeglich nutze
- [KI Bilder erstellen: Der ultimative Guide](/blog/ki-bilder-erstellen-guide-2026) — Von Midjourney bis Stable Diffusion: Alles was du ueber KI-Bildgenerierung wissen musst
- [KI Bildbearbeitung kostenlos: Die 5 besten Online-Tools](/blog/ki-bildbearbeitung-kostenlos-2026) — Wenn du kein Geld ausgeben willst: Diese kostenlosen Tools taugen wirklich was
