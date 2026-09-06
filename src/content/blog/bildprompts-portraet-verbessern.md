---
title: "Diese Bildprompts verändern dein Porträt"
seoTitle: "KI-Bildprompts für Porträts: 6 echte Beispiele"
slug: "bildprompts-portraet-verbessern"
date: "2026-08-31"
description: "Sechs Mini-Prompts für Studiofoto, Farbanalyse, Frisurenraster, Lichtkorrektur, Cover-Pack und Karriere-Karikatur im echten Porträttest."
tags: ["ki-bilder", "prompts", "portraet", "frisuren", "profilbild"]
category: "ki-tools"
draft: false
readingTime: 9
heroImage: "/images/blog/bildprompts-portraet-verbessern-1.webp"
heroImageThumb: "/images/blog/bildprompts-portraet-verbessern-1-thumb.webp"
titleAccent: "dein Porträt"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>`/hairstyleGrid` liefert sofort neun sichtbare Frisurenideen.</li>
		<li>`/colorAnalysis` erzeugt eine überzeugende Beratungstafel, deren Diagnose aber nicht automatisch stimmt.</li>
		<li>`/studioHeadshot` und `/fixLighting` veränderten das bereits saubere Studiofoto kaum.</li>
		<li>`/coverPack` wurde unerwartet als verpackte Sammelfigur interpretiert.</li>
	</ul>
</div>

Kann ein einziges Wort ein Porträt verbessern, eine passende Frisur finden oder sogar die besten Farben bestimmen?

Die kurze Antwort lautet: Es kann **Ideen sichtbar machen**. Es kann aber nicht automatisch entscheiden, was in der Realität wirklich zu dir passt.

Für diesen Test habe ich wieder dasselbe helle Porträt verwendet. Das ist wichtig, weil zwei scheinbar schwache Ergebnisse damit zu tun haben: Licht und Hintergrund waren bereits sauber.

![Ausgangsporträt für die Porträt- und Looktests](/images/blog/ki-bildprompts/00-ausgangsbild.webp)

Das erste Bild jedes Abschnitts bleibt der ehrliche Ein-Wort-Test. Die ausführliche Vorlage darunter ist ein unabhängiger kontrollierter Gegenversuch mit demselben Originalmaterial. Das folgende Bild zeigt die gezieltere Variante; eckige Platzhalter ersetzt du durch deinen eigenen Inhalt.

**So vergleichst du fair:** Öffne für die kontrollierte Vorlage einen neuen Chat und lade nur dein ursprüngliches Ausgangsbild als Bild 1 hoch. Das Ein-Wort-Ergebnis bleibt der Vergleichsbeleg, ist aber keine Referenz für den kontrollierten Prompt.

## 75. `/studioHeadshot`: Kaum Veränderung bei gutem Ausgangsbild

```prompt
/studioHeadshot
```

![Leicht geglättetes Studio-Porträt vor weißem Hintergrund](/images/blog/ki-bildprompts/75-studio-headshot.webp)

Das Ergebnis ähnelt dem Ausgangsfoto stark. Das Gesicht wirkt etwas geglättet, der Ausschnitt etwas sauberer. Einen deutlichen Vorher-nachher-Effekt gibt es nicht.

Das ist logisch: Das Ausgangsbild war bereits frontal, hell und freigestellt. Bei einem dunklen Handyfoto könnte derselbe Begriff deutlich mehr verändern.

**Wofür sinnvoll:** Für einen schnellen ersten Versuch mit einem unruhigen Porträt. Für ein professionelles Profilbild sollten Hintergrund, Licht, Kleidung, Ausschnitt und gewünschte Wirkung ausdrücklich beschrieben werden.

**Was der kontrollierte Prompt macht:** Er legt Ausschnitt, Hintergrund und Licht fest, ohne das Gesicht zu erfinden oder die Haut glattzubügeln.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein professionelles Brustporträt mit direktem Blick, natürlicher Hautstruktur und einem ruhigen freundlichen Ausdruck. Verwende einen neutralen warmgrauen Hintergrund, ein weiches Hauptlicht von links und dezentes Aufhelllicht von rechts. Übernimm Identität, Kleidung, Accessoires und alle anderen erkennbaren Merkmale aus Bild 1. Format 4:5, keine Beauty-Überglättung, kein Text und kein Logo.
```

![Ergebnis des kontrollierten Prompts: kontrolliertes Studio-Porträt vor warmgrauem Hintergrund](/images/blog/ki-bildprompts/followups/75-studio-headshot-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Hintergrund und Licht haben jetzt eine erkennbare Richtung. Das Porträt bleibt natürlich, wirkt aber geschlossener als der offene Ein-Wort-Versuch.</p>
</div>

## 76. `/colorAnalysis`: Sieht fachlich aus, ist aber nur eine Hypothese

```prompt
/colorAnalysis
```

![Farbanalyse-Tafel mit angeblichem Typ Deep Autumn und Farbpaletten](/images/blog/ki-bildprompts/76-color-analysis.webp)

Das Modell stufte die Person als „Deep Autumn“ ein und ergänzte Unterton, Kontrast, Farben, Metalle, Muster und zu vermeidende Töne. Die Tafel ist erstaunlich lesbar und sieht professionell aus.

Trotzdem ist die Diagnose nicht belastbar. Orange getönte Gläser, türkiser Hoodie, Weißabgleich und Studiolicht beeinflussen das Bild. Das Modell kann außerdem Eigenschaften nur schätzen.

**Wofür sinnvoll:** Als spielerischer Start für Outfitfarben, Moodboards oder eine Einkaufsliste. Nicht als Beweis für Hautton, Saison oder professionelle Farbberatung.

**Was der kontrollierte Prompt macht:** Er prüft zuerst, ob das Foto für eine Farbanalyse überhaupt taugt. Danach nennt er Unsicherheiten und vorläufige Empfehlungen schriftlich und zeigt die vorgeschlagenen Farben direkt als Stoff am Gesicht statt als beliebige Palette daneben.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Prüfe zuerst schriftlich die Fotoeignung für eine vorläufige Farbanalyse: Beleuchtung, Weißabgleich, Farbstich, getönte Brille, kräftige Kleidung nahe am Gesicht und sichtbare Display- oder Kameraverfälschungen. Wenn das Foto ungeeignet ist, stoppe und bitte um ein neutrales Tageslichtporträt statt eine Saison oder einen Unterton zu erraten. Wenn es ausreicht, nenne schriftlich 1. erkennbare Warm-Kühl-Tendenz, 2. Kontrastwirkung, 3. Sicherheit und Unsicherheit der Einschätzung, 4. vier empfehlenswerte Farbrichtungen und 5. vier eher schwierige Farbrichtungen. Kennzeichne alles ausdrücklich als vorläufigen visuellen Eindruck, nicht als Diagnose. Erzeuge danach ein textfreies 4:5-Vergleichsbild als 2×2-Raster mit vier identischen Brustporträts. Wende die vier empfohlenen Farben als matte Kleidung oder Stoff direkt gesichtsnah an. Halte Hautfarbe, Gesicht, Ausdruck, Accessoires, Licht, Hintergrund, Ausschnitt und Farbkorrektur in allen Feldern identisch. Keine losen Farbpaletten, keine Farbbalken, keine Wörter, Zahlen, Logos oder Saisonlabels.
```

![Kontrollierter Farbvergleich mit vier identischen Porträts und vier gesichtsnah angewandten Stofffarben](/images/blog/ki-bildprompts/followups/76-color-analysis-applied-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Jetzt liegen die Farben dort, wo sie verglichen werden sollen: direkt unter Gesicht und Bart. Rost, dunkles Petrol, gedecktes Oliv und Aubergine sind in diesem Test vier plausible Richtungen. Wegen Brille, Hoodie und Ausgangslicht bleibt das eine vorläufige Bildidee, keine belastbare Farbtypen-Bestimmung.</p>
</div>

<div class="rf-block rf-callout" role="note" aria-label="Hinweis zur Farbanalyse">
	<span class="rf-label" aria-hidden="true">Praxischeck</span>
	<p>Wenn du Farben wirklich vergleichen willst, fotografiere dich bei neutralem Tageslicht ohne getönte Brille und ohne kräftig farbige Kleidung nah am Gesicht. Lege echte Stoffe daneben. Eine KI-Tafel kann Ideen sortieren, aber sie sieht keine Farbe unabhängig von Kamera, Licht und Display.</p>
</div>

## 77. `/hairstyleGrid`: Neun Frisuren auf einmal

```prompt
/hairstyleGrid
```

![Dreimal-drei-Raster mit Glatze und acht verschiedenen Frisuren](/images/blog/ki-bildprompts/77-hairstyle-grid.webp)

Der Prompt erzeugte ein sauberes 3×3-Raster: Glatze, Buzz Cut, Crew Cut, Short Crop, Pompadour, Seitenscheitel, Quiff, Slick Back und strukturierter Fade. Gesicht, Bart, Brille und Hoodie blieben dabei erstaunlich konsistent.

**Wofür sinnvoll:** Für einen ersten Frisurenvergleich, Figurenentwicklung, Kostümideen oder die Kommunikation mit einem Friseur. Haarlinie, Dichte und Machbarkeit sind im echten Leben natürlich nicht aus dem Bild ableitbar.

**Was der kontrollierte Prompt macht:** Er baut ein sauberes Vergleichsraster, in dem wirklich nur die Frisur wechseln soll. Nummern statt langer Beschriftungen vermeiden zusätzlich erfundene oder fehlerhafte Wörter im Bild.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein quadratisches 3×3-Frisurenraster. Halte Gesicht, Ausdruck, Kleidung, Accessoires, Licht und Kamerawinkel in allen neun Feldern so konstant wie möglich. Varianten in dieser Reihenfolge: 1 ohne Kopfhaar, 2 Buzz Cut, 3 Crew Cut, 4 kurzer Crop, 5 Pompadour, 6 Seitenscheitel, 7 Quiff, 8 zurückgekämmt, 9 strukturierter Fade. Beschrifte die Felder ausschließlich mit den Ziffern 1 bis 9. Neutraler Hintergrund, keine weiteren Wörter und keine Veränderung des Gesichts.
```

![Ergebnis des kontrollierten Prompts: nummeriertes 3-mal-3-Raster mit neun Frisuren](/images/blog/ki-bildprompts/followups/77-hairstyle-grid-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die neun Varianten sind jetzt als einheitlicher Vergleich aufgebaut. Kleine Abweichungen bleiben möglich, aber Licht, Kleidung und Perspektive springen deutlich weniger als bei neun getrennten Generierungen.</p>
</div>

### Bonus-Test: neun bewusst feminine Frisuren

Weil ein Frisurenraster auch einfach Spaß machen darf, habe ich denselben Aufbau noch einmal bewusst mit neun femininen Frisuren getestet. Das ist ein spielerischer Gag und keine Aussage darüber, wer welche Frisur tragen soll.

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein quadratisches 3×3-Frisurenraster mit neun bewusst femininen Frisuren: 1 lang und glatt mit Mittelscheitel, 2 lange große Wellen, 3 hoher Pferdeschwanz, 4 lange voluminöse Locken, 5 zwei lange Zöpfe, 6 geflochtener Hochsteckkranz, 7 welliger Bob bis zur Schulter, 8 langes glattes Haar mit Pony, 9 lange seitlich gelegte Glamour-Wellen. Verändere ausschließlich das Kopfhaar. Halte Identität, Gesicht, Bart, Brille, Kleidung, Ausdruck, Licht, Kamerawinkel, Ausschnitt und Hintergrund in allen neun Feldern so konstant wie möglich. Keine Veränderung von Gesicht oder Körper, kein zusätzliches Make-up, keine Hüte, keine Wörter, Ziffern oder Logos.
```

![Spielerisches 3-mal-3-Raster derselben Person mit neun femininen Frisuren](/images/blog/ki-bildprompts/followups/77-hairstyle-grid-feminine-bonus.webp)

Das Ergebnis trifft den gewünschten Kontrast ziemlich genau: lang, lockig, geflochten, hochgesteckt und mit Pony, während Bart, Brille, Hoodie und Gesicht klar dieselbe Person bleiben.

### Mit dem Ergebnis weiterarbeiten

Um eine Variante einzeln zu übernehmen, braucht die KI das gerade erzeugte Raster als neue Referenz. Position und sichtbare Frisur werden zusammen genannt, damit ein Zählfehler leichter auffällt.

**Was dieser Weiterarbeit-Prompt macht:** Er nimmt Feld 5 aus dem neuen Raster und führt es als einzelnes Porträt weiter.

**Dafür hochladen:** Das gerade erzeugte 3×3-Raster als Bild 1 und dein ursprüngliches Porträt als Bild 2 zur Identitätskontrolle.

**Kopierbare Weiterarbeit-Vorlage:**

```prompt
Nutze aus Bild 1 das Feld in Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist die dort sichtbare Frisur [[FRISUR]]. Erstelle daraus ein einzelnes hochauflösendes Brustporträt. Nutze Bild 2 zur Kontrolle von Identität, Kleidung, Accessoires und anderen erkennbaren Merkmalen. Übernimm Licht und Hintergrund aus dem gewählten Rasterfeld. Format 4:5, kein Raster, keine Beschriftung, keine Ziffer und keine weiteren Frisuren.
```

**Für dieses Beispiel eingesetzt:** Reihe 2, Spalte 2, Frisur Pompadour.

![Ergebnis des Auswahl-Prompts: die fünfte Frisur als einzelnes Brustporträt](/images/blog/ki-bildprompts/followups/extra-hairstyle-selection-followup.webp)

**Das Ergebnis des Auswahltests:** Das ausgewählte Feld wurde als einzelnes Hochformat weitergeführt. Damit ist nicht nur das Raster gezeigt, sondern auch der praktische nächste Schritt daraus.

## 78. `/fixLighting`: Fast keine sichtbare Änderung

```prompt
/fixLighting
```

![Nahezu unverändertes Porträt nach dem Prompt fixLighting](/images/blog/ki-bildprompts/78-fix-lighting.webp)

Auch hier war der Effekt sehr klein. Das Ausgangsbild hatte bereits gleichmäßiges Licht, weißen Hintergrund und klare Gesichtszüge. Der Prompt hatte wenig zu „reparieren“.

**Wofür sinnvoll:** Bei starkem Farbstich, hartem Schatten oder ungleichmäßiger Belichtung. Statt „fix“ sollte der gewünschte Zielzustand genannt werden.

**Was der kontrollierte Prompt macht:** Er beschreibt die konkrete Lichtkorrektur mit austauschbaren Feldern. Im Test habe ich bewusst nur eine sanfte Neutralisierung verlangt, weil das Ausgangsbild bereits ordentlich belichtet war.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Korrigiere darin ausschließlich die Beleuchtung. Entferne den sichtbaren Farbstich [[FARBSTICH]] und helle die verschattete Seite [[SEITE ODER BEREICH]] natürlich auf. Erhalte Identität, Hautstruktur, Gesicht, Haare, Kleidung, Accessoires, Hintergrund und Bildausschnitt unverändert. Ziel ist [[GEWÜNSCHTES LICHT]] ohne überstrahlte Haut. Keine Änderung der Gesichtsform, keine Beauty-Retusche, kein Text und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Kein deutlicher Farbstich; die rechte Gesichtshälfte nur leicht angleichen; neutrales weiches Tageslicht.

![Ergebnis des kontrollierten Prompts: sanft ausgeglichenes Porträt bei neutralem Licht](/images/blog/ki-bildprompts/followups/78-fix-lighting-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die Veränderung bleibt absichtlich zurückhaltend. Genau das zeigt auch die Grenze des Befehls: Ohne sichtbares Lichtproblem darf eine gute Korrektur kaum auffallen.</p>
</div>

## 79. `/coverPack`: Völlig anders verstanden

```prompt
/coverPack
```

![Porträt als verpackte Sammlerfigur mit Zubehör](/images/blog/ki-bildprompts/79-cover-pack.webp)

Ich erwartete mehrere Covervarianten. Das Modell interpretierte „Pack“ jedoch als Produktverpackung und baute eine komplette „Bearded Legend“-Sammelfigur mit Brille, Tasse und Kamm.

**Wofür sinnvoll:** Überraschend gut als Gag-Verpackung oder Sammelfiguren-Mockup. Für echte Thumbnail- oder Covervarianten ist der Begriff zu mehrdeutig.

**Was der kontrollierte Prompt macht:** Er löst die Mehrdeutigkeit auf und fordert ausdrücklich sechs Titelbild-Kompositionen statt einer Produktverpackung.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle sechs klar getrennte Titelbildvarianten derselben Person in einem 3×2-Raster: 1 seriöses Profil, 2 überraschter Ausdruck, 3 deutliche Zeigegeste, 4 dunkle Filmszene, 5 heller Tech-Look, 6 humorvolle Miniaturwelt. Jedes Feld wirkt wie ein eigenes 16:9-Cover und enthält freie Fläche für später hinzugefügten Titeltext. Kein Text, keine Ziffern und kein Logo.
```

![Ergebnis des kontrollierten Prompts: sechs echte Cover-Kompositionen statt Verpackung](/images/blog/ki-bildprompts/followups/79-cover-pack-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>„Pack“ ist nun als Sammlung von sechs Covers verstanden. Die Varianten unterscheiden sich in Stimmung und Pose, bleiben aber frei von KI-Schrift und Produktverpackungen.</p>
</div>

## 80. `/careerCaricature`: Der Beruf wird gleich miterfunden

```prompt
/careerCaricature
```

![Karikatur der Person am Schreibtisch mit Strategie- und Marketingbegriffen](/images/blog/ki-bildprompts/80-career-caricature.webp)

Das Modell setzte die Person an einen Schreibtisch und erfand eine Karriere rund um Strategie, Marketing, Branding und Führung. Das Motiv wirkt positiv und detailliert, basiert aber nicht auf Informationen aus dem Porträt. Eine kleine künstliche Signatur habe ich aus der veröffentlichten Version entfernt.

**Wofür sinnvoll:** Für LinkedIn-Posts, Teamvorstellungen, Abschiedsgeschenke, Berufsporträts oder eine visuelle Zusammenfassung echter Tätigkeiten. Die Aufgaben müssen vorgegeben werden.

**Was der kontrollierte Prompt macht:** Er verhindert, dass die KI den Beruf aus dem Aussehen errät. Beruf und vier echte Tätigkeiten werden als austauschbare Angaben eingesetzt und rein visuell gezeigt.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Zeichne eine freundliche Karriere-Karikatur dieser Person bei der Arbeit als [[BERUF]]. Zeige ausschließlich diese vier realen Tätigkeiten als klar erkennbare kleine Szenen oder Gegenstände: [[TÄTIGKEIT 1]], [[TÄTIGKEIT 2]], [[TÄTIGKEIT 3]] und [[TÄTIGKEIT 4]]. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Verwende [[FARBPALETTE]] als Akzente, dynamische handgezeichnete Linien und einen aufgeräumten Aufbau. Format 4:5, kein erfundener Slogan, keine Beschriftung, kein zusätzlicher Beruf, kein Logo und keine Signatur.
```

**Für dieses Beispiel eingesetzt:** Beruf Fotograf; fotografieren, Bilder auswählen, Farben bearbeiten und ein Fotoalbum überreichen; orange und türkise Akzente.

![Ergebnis des kontrollierten Prompts: Fotografen-Karikatur mit vier vorgegebenen Tätigkeiten](/images/blog/ki-bildprompts/followups/80-career-caricature-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die Karikatur zeigt nun vorgegebene Arbeitsschritte statt einer erfundenen Marketingkarriere. Dadurch bleibt die kreative Darstellung persönlich, ohne aus dem Porträt Lebenslauf-Fakten abzuleiten.</p>
</div>

## Was davon würde ich wirklich einsetzen?

`/hairstyleGrid` hat den direktesten Nutzen, weil mehrere Varianten unter vergleichbaren Bedingungen sichtbar werden. `/colorAnalysis` ist optisch stark, braucht aber den deutlichsten Warnhinweis. `/studioHeadshot` und `/fixLighting` zeigen, dass ein guter Ausgangspunkt wichtiger sein kann als ein spektakulärer Prompt.

Für ein öffentliches Profilbild würde ich nie ungeprüft das KI-Ergebnis nehmen. Ich würde es als Richtung verwenden, dann ein echtes Foto mit passendem Licht, Hintergrund und Styling aufnehmen oder die Änderungen sehr gezielt durchführen lassen.

[Zur Übersicht mit allen 36 neuen Prompts](/blog/ultimate-bildprompts-part-2) · [Zurück zu den Materialstilen](/blog/bildprompts-stoff-knete-glas) · [Weiter zum Creator- und KI-Video-Workflow](/blog/bildprompts-creator-ki-video)
