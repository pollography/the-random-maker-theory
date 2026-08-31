---
title: "Die kürzesten Bildprompts: Menschen & Posen"
seoTitle: "Kurze KI-Bildprompts für Menschen & Posen"
slug: "kuerzeste-bildprompts-menschen-posen"
date: "2026-08-30"
description: "Acht extrem kurze Bildprompts für Posen, Mimik, Kleidung und Character Sheets. Mit echten Ergebnissen und Folgeprompts für einzelne Motive."
tags: ["ki-bilder", "prompts", "portrait", "character-design", "tutorial"]
category: "ki-tools"
draft: false
readingTime: 11
heroImage: "/images/blog/kuerzeste-bildprompts-menschen-posen-1.webp"
heroImageThumb: "/images/blog/kuerzeste-bildprompts-menschen-posen-1-thumb.webp"
titleAccent: "Menschen & Posen"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">Teil 1</span>
	<ul>
		<li>Acht Mini-Prompts erzeugen Ansichten, Mimik, Posen, Kleidung und Character Sheets aus einem Porträt.</li>
		<li>Am zuverlässigsten waren klare visuelle Konzepte wie Posepack, Outfitvarianten und Turnaround.</li>
		<li><code>/expression</code> und <code>/expressions</code> lieferten bei mir deutlich unterschiedliche Ergebnisse.</li>
		<li>Für ein fertiges Bild musst du die gewünschte Zelle eindeutig auswählen und neu erzeugen lassen.</li>
	</ul>
</div>

Wie viele neue Bilder stecken in einem einzigen Porträt?

Für diesen ersten Teil habe ich acht extrem kurze Prompts getestet, die sich auf Menschen konzentrieren: Blickwinkel, Posen, Gesichtsausdrücke, Körpersprache und Kleidung. Als Referenz diente jedes Mal dasselbe bereinigte Ausgangsbild.

Wenn du zuerst nur die vier wichtigsten Begriffe ausprobieren möchtest, findest du [Posepack, Outfitvarianten, Action Poses und Character Sheet auch als kurzen Direktvergleich](/blog/ein-foto-vier-slash-befehle-ki-bilder).

![Ausgangsporträt mit kahlem Kopf, langem Bart, orangefarbener Brille und türkisem Hoodie](/images/blog/ki-bildprompts/00-ausgangsbild.webp)

Die markanten Merkmale helfen der KI sichtbar bei der Wiedererkennung. Trotzdem bleibt nicht jede Version identisch. Besonders Ganzkörperansichten, Hände und seitliche Profile verändern die Person teilweise.

## 1. `/turnaround`: mehrere Blickwinkel

```prompt
/turnaround
```

Bei mir entstand ein sauberes Raster mit Front, Dreiviertelansichten, Profilen und Rückansicht. Überraschend war, dass der Prompt keinen kompletten Körper-Turnaround erzeugte, sondern Kopf und Schultern. Für eine Gesichtsreferenz ist das sehr brauchbar. Für 3D-Modelling oder ein exaktes Character Sheet wäre es noch zu frei.

![Sechs Kopfansichten derselben Person von vorne, seitlich und hinten](/images/blog/ki-bildprompts/01-turnaround.webp)

**Nützlich für:** Character-Referenzen, Profilabgleich, KI-Video, 3D-Blocking und konsistentere Folgegenerationen.

```prompt
Nutze den Turnaround als feste Personenreferenz. Erstelle daraus ein einzelnes Ganzkörperbild in neutraler A-Pose, frontal zur Kamera, weißer Studiohintergrund. Erhalte Gesichtsform, Bart, orange Brille und türkisen Hoodie. Keine Beschriftung, kein Raster und kein Logo.
```

## 2. `/expression`: eine starke Mimik

```prompt
/expression
```

Der Singular erzeugte in meinem Test kein Raster. Stattdessen bekam ich ein einzelnes, sehr aufgeregtes Porträt mit geöffnetem Mund und geballten Fäusten. Das ist ein gutes Beispiel dafür, wie viel Interpretation in einem einzigen Wort steckt.

![Einzelnes KI-Porträt mit aufgeregtem Gesichtsausdruck und geballten Fäusten](/images/blog/ki-bildprompts/02-expression.webp)

**Nützlich für:** Reaktionsbilder, Thumbnails, Social Posts und einzelne Emotionsreferenzen.

```prompt
Nutze die erzeugte aufgeregte Mimik als Referenz. Erstelle ein einzelnes 16:9-Thumbnail. Person groß links, freie dunkle Fläche rechts, gleiche Identität, orange Brille, Bart und türkiser Hoodie. Keine Schrift und kein Logo.
```

### Bonus: `/expressions` reagiert anders

Mit dem Plural entstand bei mir ein 3×3-Raster mit neutral, freundlich, lachend, überrascht, skeptisch, ernst, verwirrt, zwinkernd und leicht genervt.

```prompt
/expressions
```

![Neun beschriftete Gesichtsausdrücke derselben Person in einem 3 mal 3 Raster](/images/blog/ki-bildprompts/extra-expressions-plural.webp)

Das ist kein Beweis für eine feste Grammatik. Es zeigt nur, dass schon ein einziges `s` die Interpretation verändern kann.

## 3. `/posepack`: sechs Ganzkörperposen

```prompt
/posepack
```

Hier bekam ich sechs Ganzkörperposen: locker stehend, Arme verschränkt, gehend, angelehnt, sitzend und hockend. Die Kleidung blieb recht stabil, während Körperbau und Gesicht leicht drifteten.

![Sechs Ganzkörperposen derselben Person mit türkisem Hoodie](/images/blog/ki-bildprompts/03-pose-pack.webp)

**Nützlich für:** Storyboards, Webseiten, Social-Media-Motive, Präsentationen und erste Bewegungsreferenzen.

```prompt
Wähle aus dem 2×3-Posepack Reihe 1, Spalte 3, gezählt von oben links. Gemeint ist die gehende Pose. Erstelle daraus ein einzelnes hochauflösendes Ganzkörperbild im Format 4:5. Erhalte Gesicht, Brille, Bart, Hoodie, schwarze Hose und weiße Schuhe. Kein Raster, keine weiteren Personen und kein Text.
```

## 4. `/actionposes`: Gesten für Thumbnails

```prompt
/actionposes
```

Dieser Prompt konzentrierte sich stärker auf Gesten: zeigen, Daumen hoch, Faust nach vorn, Brille anfassen und locker zur Seite schauen. Solche Bilder sind für klickstarke Motive oft nützlicher als neutrale Ganzkörperposen.

![Sechs Action Poses mit Zeigegeste, Daumen hoch und weiteren Bewegungen](/images/blog/ki-bildprompts/04-action-poses.webp)

**Nützlich für:** YouTube-Thumbnails, Erklärgrafiken, Call-to-Action-Bereiche und Social Ads.

```prompt
Wähle im 2×3-Raster Reihe 1, Spalte 1. Gemeint ist die Person, die direkt zur Kamera zeigt. Erstelle ein einzelnes 16:9-Motiv mit der Person rechts und freier Fläche links. Erhalte Gesicht, Bart, orange Brille und türkisen Hoodie. Korrigiere die Hand anatomisch sauber. Kein Text und kein Logo.
```

## 5. `/characterSheet`: eine komplette Referenztafel

```prompt
/characterSheet
```

Das Character Sheet kombinierte Ganzkörperansichten, Gesichtsausdrücke, Farbflächen und Detailausschnitte. Als visuelle Übersicht wirkt das erstaunlich komplett. Die kleinen Texte und Eigenschaften sind allerdings von der KI erfunden und dürfen nicht ungeprüft als Fakten übernommen werden.

![Character Sheet mit vier Körperansichten, Gesichtsausdrücken und Detailfeldern](/images/blog/ki-bildprompts/05-character-sheet.webp)

**Nützlich für:** Figurenentwicklung, Game- und Filmideen, Briefings und konsistente Bildserien.

```prompt
Nutze das Character Sheet als visuelle Referenz, aber ignoriere alle darin erzeugten Texte. Erstelle ein neues sauberes Character Sheet mit Frontansicht, linker Profilansicht, Rückansicht und drei Gesichtsausdrücken. Erhalte Identität und Kleidung. Verwende nur diese deutschen Labels: Front, Profil, Rücken, freundlich, ernst, überrascht. Keine weiteren Texte oder Logos.
```

## 6. `/emotionGrid`: neun klar getrennte Emotionen

```prompt
/emotionGrid
```

Das Ergebnis war ein 3×3-Raster mit englischen Emotionslabels. Die Person blieb gut erkennbar, bei manchen Feldern änderten sich Zähne, Stirnfalten und Bartform leicht. Für die Auswahl einer Stimmung ist das Raster trotzdem sehr praktisch.

![Emotionsraster mit neun Gesichtsausdrücken und englischen Labels](/images/blog/ki-bildprompts/06-emotion-grid.webp)

**Nützlich für:** Thumbnail-Varianten, Reaktionsbilder, Schauspielreferenzen, Storyboards und KI-Video.

```prompt
Wähle aus dem 3×3-Emotionsraster Reihe 2, Spalte 3, gezählt von oben links. Gemeint ist die verwirrte Mimik. Erstelle daraus ein einzelnes quadratisches Profilbild. Erhalte Identität, orange Brille, Bart und Hoodie. Natürliche Haut, sauberer weißer Hintergrund, kein Text und kein Rahmen.
```

## 7. `/bodylanguage`: Körpersprache statt Raster

```prompt
/bodylanguage
```

Ich hatte mehrere Varianten erwartet. Tatsächlich entstand ein einzelnes Halbporträt mit verschränkten Armen. Der Begriff wählte also selbst eine typische Körpersprache aus, statt ein Set anzulegen.

![Halbporträt mit verschränkten Armen als Interpretation von Körpersprache](/images/blog/ki-bildprompts/07-body-language.webp)

**Nützlich für:** Über-uns-Seiten, Speaker-Profile, Autorenseiten und ruhige Businessporträts.

```prompt
Erstelle auf Basis dieses Porträts ein 2×3-Raster mit sechs klar unterschiedlichen Formen von Körpersprache: offen, nachdenklich, selbstbewusst, skeptisch, begeistert und entspannt. Gleiche Person und Kleidung in allen Feldern. Weißer Hintergrund, keine Beschriftung und kein Logo.
```

## 8. `/outfitVariants`: sechs neue Looks

```prompt
/outfitVariants
```

Die Ausgabe zeigte sechs Outfits von Overshirt und Jeansjacke bis zu schwarzer Kombination und Sakko. Gesicht, Bart und Brille blieben meist erkennbar. Gleichzeitig änderten sich Schuhe, Pose, Körperbau und Details. Das ist eine Look-Ideenmaschine, keine virtuelle Anprobe.

![Sechs Outfitvarianten derselben Person von Freizeitlook bis Sakko](/images/blog/ki-bildprompts/08-outfit-variants.webp)

**Nützlich für:** Stilfindung, Moodboards, Personal Branding, Kostümideen und grobe Modeberatung.

```prompt
Wähle aus dem 2×3-Outfit-Raster Reihe 1, Spalte 3, gezählt von oben links. Gemeint ist das dunkelblaue Sakko mit weißem Shirt. Erstelle ein einzelnes Ganzkörperporträt im Format 4:5. Übernimm genau dieses Outfit, erhalte aber Gesicht, Bart und orange Brille. Neutraler Studiohintergrund, keine Marke und kein Text.
```

## Die sichere Auswahlformel

Bei Rasterbildern funktioniert diese Kombination am besten:

**Rastergröße + Reihe und Spalte + sichtbare Beschreibung + gewünschtes Endformat + feste Merkmale + Ausschlüsse.**

Nur `nimm Bild 4` ist riskant. Das Modell kann von links nach rechts, nach Bedeutung oder ganz anders zählen. `Reihe 2, Spalte 1, die überraschte Variante mit offenem Mund` ist deutlich eindeutiger.

## Mein Favorit aus Teil 1

Für den direkten Alltag finde ich `/posepack` und `/emotionGrid` am stärksten. Beide liefern nicht unbedingt das fertige Bild, aber sofort mehrere Richtungen, aus denen sich ein konkretes Motiv auswählen lässt.

Der wichtigste Befund bleibt trotzdem der Unterschied zwischen `/expression` und `/expressions`: Diese Wörter sind keine stabilen Menübefehle. Sie sind winzige Anstöße für das Modell. Genau deshalb lohnt sich der zweite, präzise Folgeprompt.

[Zur Übersicht mit allen 50 Bildprompts](/blog/50-bildprompts-echt-getestet)

[Weiter zu Teil 2: Avatare & Reaktionen](/blog/kuerzeste-bildprompts-avatare-reaktionen)
