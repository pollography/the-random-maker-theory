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

Das erste Bild jedes Abschnitts bleibt das ehrliche Ergebnis des kurzen Slash-Prompts. Darunter zeige ich nun, wozu der zweite Prompt dient, welche Bilder du dafür hochlädst und was bei meinem tatsächlich ausgeführten Folgeauftrag herauskam. Die kopierbaren Vorlagen übernehmen sichtbare Merkmale aus deinen Bildern; eckige Platzhalter ersetzt du durch deinen eigenen Inhalt.

## 1. `/turnaround`: mehrere Blickwinkel

```prompt
/turnaround
```

Bei mir entstand ein sauberes Raster mit Front, Dreiviertelansichten, Profilen und Rückansicht. Überraschend war, dass der Prompt keinen kompletten Körper-Turnaround erzeugte, sondern Kopf und Schultern. Für eine Gesichtsreferenz ist das sehr brauchbar. Für 3D-Modelling oder ein exaktes Character Sheet wäre es noch zu frei.

![Sechs Kopfansichten derselben Person von vorne, seitlich und hinten](/images/blog/ki-bildprompts/01-turnaround.webp)

**Nützlich für:** Character-Referenzen, Profilabgleich, KI-Video, 3D-Blocking und konsistentere Folgegenerationen.

**Was der zweite Prompt macht:** Er nutzt die verschiedenen Kopfansichten als Identitätskontrolle und baut daraus ein einzelnes, vollständiges Ganzkörperbild.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und den mit `/turnaround` erzeugten Ansichtenbogen als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 zusätzlich zur Kontrolle der Kopfansichten. Erstelle ein einzelnes Ganzkörperbild im Format 4:5 in neutraler A-Pose, frontal zur Kamera. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus den Referenzen. Gleichmäßiges weiches Studiolicht, schlichter heller Hintergrund, vollständige Figur einschließlich Füßen. Kein Raster, keine Beschriftung und kein Logo.
```

![Ergebnis des zweiten Prompts: einzelne Ganzkörperansicht in neutraler A-Pose](/images/blog/ki-bildprompts/followups/01-turnaround-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Aus dem reinen Kopf-Turnaround wird eine einzelne, direkt nutzbare Ganzkörperreferenz. Die Person und ihr sichtbarer Look bleiben erhalten, während Raster und Beschriftungen verschwinden.</p>
</div>

## 2. `/expression`: eine starke Mimik

```prompt
/expression
```

Der Singular erzeugte in meinem Test kein Raster. Stattdessen bekam ich ein einzelnes, sehr aufgeregtes Porträt mit geöffnetem Mund und geballten Fäusten. Das ist ein gutes Beispiel dafür, wie viel Interpretation in einem einzigen Wort steckt.

![Einzelnes KI-Porträt mit aufgeregtem Gesichtsausdruck und geballten Fäusten](/images/blog/ki-bildprompts/02-expression.webp)

**Nützlich für:** Reaktionsbilder, Thumbnails, Social Posts und einzelne Emotionsreferenzen.

**Was der zweite Prompt macht:** Er übernimmt gezielt die starke Mimik und setzt sie in ein Thumbnail mit bewusst freigehaltener Textfläche.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das mit `/expression` erzeugte Reaktionsbild als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Referenz für Mimik und Körperspannung. Erstelle ein einzelnes 16:9-Thumbnail. Zeige die Person groß auf der linken Seite und lasse rechts eine ruhige dunkle Fläche für späteren Text frei. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Dramatisches, aber natürliches Licht; keine Schrift, kein Logo und keine weitere Person.
```

![Ergebnis des zweiten Prompts: aufgeregtes Thumbnail mit freier dunkler Fläche](/images/blog/ki-bildprompts/followups/02-expression-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die spontane Mimik bekommt eine konkrete Funktion: ein fertiger 16:9-Aufbau mit Motiv links und gut nutzbarer Ruhefläche rechts, ohne bereits Text in das Bild zu erfinden.</p>
</div>

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

**Was der zweite Prompt macht:** Er löst eine gewünschte Zelle aus dem Raster und erzeugt daraus ein eigenständiges Ganzkörpermotiv.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 2×3-Posepack als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 2×3-Raster, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist die Variante [[SICHTBARE BESCHREIBUNG]]. Erstelle daraus ein einzelnes Ganzkörperbild im Format 4:5. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1; übernimm Pose und Kamerawinkel aus der gewählten Zelle. Ganze Figur einschließlich Füßen, anatomisch saubere Hände, kein Raster, kein Text und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Reihe 1, Spalte 3 – die gehende Pose.

![Ergebnis des zweiten Prompts: einzelne gehende Ganzkörperpose](/images/blog/ki-bildprompts/followups/03-pose-pack-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die gewählte Pose steht nun einzeln und in brauchbarer Größe zur Verfügung. Durch Reihe, Spalte und sichtbare Beschreibung ist außerdem eindeutig, welche Rasterzelle gemeint war.</p>
</div>

## 4. `/actionposes`: Gesten für Thumbnails

```prompt
/actionposes
```

Dieser Prompt konzentrierte sich stärker auf Gesten: zeigen, Daumen hoch, Faust nach vorn, Brille anfassen und locker zur Seite schauen. Solche Bilder sind für klickstarke Motive oft nützlicher als neutrale Ganzkörperposen.

![Sechs Action Poses mit Zeigegeste, Daumen hoch und weiteren Bewegungen](/images/blog/ki-bildprompts/04-action-poses.webp)

**Nützlich für:** YouTube-Thumbnails, Erklärgrafiken, Call-to-Action-Bereiche und Social Ads.

**Was der zweite Prompt macht:** Er wählt die direkte Zeigegeste aus, korrigiert die Hand und baut daraus ein Thumbnail mit Platz für eine Überschrift.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 2×3-Action-Pose-Raster als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 2×3-Raster, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist [[SICHTBARE BESCHREIBUNG]]. Erstelle ein einzelnes 16:9-Motiv mit der Person rechts und einer ruhigen freien Fläche links. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 sowie Geste und Ausdruck aus der gewählten Zelle. Korrigiere Hände anatomisch sauber. Kein Text, kein Logo und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Reihe 1, Spalte 1 – die Person zeigt direkt zur Kamera.

![Ergebnis des zweiten Prompts: einzelne Zeigegeste mit freier Fläche links](/images/blog/ki-bildprompts/followups/04-action-poses-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Aus der kleinen Rasterpose wird ein klar komponiertes Thumbnail-Motiv. Die Zeigehand ist vollständig sichtbar und links bleibt genug ruhige Fläche für später gesetzten Text.</p>
</div>

## 5. `/characterSheet`: eine komplette Referenztafel

```prompt
/characterSheet
```

Das Character Sheet kombinierte Ganzkörperansichten, Gesichtsausdrücke, Farbflächen und Detailausschnitte. Als visuelle Übersicht wirkt das erstaunlich komplett. Die kleinen Texte und Eigenschaften sind allerdings von der KI erfunden und dürfen nicht ungeprüft als Fakten übernommen werden.

![Character Sheet mit vier Körperansichten, Gesichtsausdrücken und Detailfeldern](/images/blog/ki-bildprompts/05-character-sheet.webp)

**Nützlich für:** Figurenentwicklung, Game- und Filmideen, Briefings und konsistente Bildserien.

**Was der zweite Prompt macht:** Er entfernt erfundene Eigenschaften und reduziert die Tafel auf festgelegte Ansichten, Ausdrücke und geprüfte Labels.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das erste Character Sheet als Bild 2 für Aufbau und Ansichtsreferenzen.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Referenz für Aufbau und Blickwinkel; ignoriere sämtliche Aussagen und Texte aus Bild 2. Erstelle ein neues sauberes Character Sheet mit Frontansicht, linker Profilansicht, Rückansicht und drei Porträts mit freundlichem, ernstem und überraschtem Ausdruck. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Verwende ausschließlich die Labels „FRONT“, „PROFIL“, „RÜCKEN“, „FREUNDLICH“, „ERNST“ und „ÜBERRASCHT“. Keine Eigenschaften, Notizen, Logos oder weiteren Wörter.
```

![Ergebnis des zweiten Prompts: bereinigtes Character Sheet mit deutschen Labels](/images/blog/ki-bildprompts/followups/05-character-sheet-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die neue Tafel zeigt nur die benötigten Ansichten und Emotionen. Die zuvor erfundenen Charaktereigenschaften sind entfernt; übrig bleiben überprüfbare visuelle Referenzen.</p>
</div>

## 6. `/emotionGrid`: neun klar getrennte Emotionen

```prompt
/emotionGrid
```

Das Ergebnis war ein 3×3-Raster mit englischen Emotionslabels. Die Person blieb gut erkennbar, bei manchen Feldern änderten sich Zähne, Stirnfalten und Bartform leicht. Für die Auswahl einer Stimmung ist das Raster trotzdem sehr praktisch.

![Emotionsraster mit neun Gesichtsausdrücken und englischen Labels](/images/blog/ki-bildprompts/06-emotion-grid.webp)

**Nützlich für:** Thumbnail-Varianten, Reaktionsbilder, Schauspielreferenzen, Storyboards und KI-Video.

**Was der zweite Prompt macht:** Er löst eine einzelne gewünschte Emotion aus dem Raster und entfernt Rahmen sowie englische Labels.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 3×3-Emotionsraster als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 3×3-Raster, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist die Mimik [[SICHTBARE BESCHREIBUNG]]. Erstelle daraus ein einzelnes quadratisches Profilbild. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 sowie den Ausdruck aus der gewählten Zelle. Natürliche Haut, schlichter heller Hintergrund, kein Text, kein Rahmen und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Reihe 2, Spalte 3 – die verwirrte Mimik.

![Ergebnis des zweiten Prompts: einzelnes quadratisches Porträt mit verwirrter Mimik](/images/blog/ki-bildprompts/followups/06-emotion-grid-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Statt eines beschrifteten Rasters bleibt genau die ausgewählte Reaktion übrig. Das quadratische Bild kann direkt als Profil- oder Reaktionsmotiv weiterverwendet werden.</p>
</div>

## 7. `/bodylanguage`: Körpersprache statt Raster

```prompt
/bodylanguage
```

Ich hatte mehrere Varianten erwartet. Tatsächlich entstand ein einzelnes Halbporträt mit verschränkten Armen. Der Begriff wählte also selbst eine typische Körpersprache aus, statt ein Set anzulegen.

![Halbporträt mit verschränkten Armen als Interpretation von Körpersprache](/images/blog/ki-bildprompts/07-body-language.webp)

**Nützlich für:** Über-uns-Seiten, Speaker-Profile, Autorenseiten und ruhige Businessporträts.

**Was der zweite Prompt macht:** Er erweitert die zufällig gewählte Einzelpose zu sechs bewusst unterschiedlichen Formen von Körpersprache.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und optional das Kurzprompt-Ergebnis als Bild 2 für Licht und Bildausschnitt.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Bild 2 darf nur Licht und Bildausschnitt vorgeben. Erstelle ein 2×3-Raster mit sechs klar unterschiedlichen Formen von Körpersprache: offen, nachdenklich, selbstbewusst, skeptisch, begeistert und entspannt. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 in allen Feldern. Halbkörperansichten vor einem schlichten hellen Hintergrund, anatomisch saubere Hände, keine Beschriftung und kein Logo.
```

![Ergebnis des zweiten Prompts: sechs bewusst unterschiedliche Körpersprachen](/images/blog/ki-bildprompts/followups/07-body-language-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der Folgeauftrag liefert wirklich eine Auswahl statt nur einer zufälligen Armhaltung. Die sechs Felder unterscheiden sich sichtbar, ohne dafür erfundene Labels ins Bild zu schreiben.</p>
</div>

## 8. `/outfitVariants`: sechs neue Looks

```prompt
/outfitVariants
```

Die Ausgabe zeigte sechs Outfits von Overshirt und Jeansjacke bis zu schwarzer Kombination und Sakko. Gesicht, Bart und Brille blieben meist erkennbar. Gleichzeitig änderten sich Schuhe, Pose, Körperbau und Details. Das ist eine Look-Ideenmaschine, keine virtuelle Anprobe.

![Sechs Outfitvarianten derselben Person von Freizeitlook bis Sakko](/images/blog/ki-bildprompts/08-outfit-variants.webp)

**Nützlich für:** Stilfindung, Moodboards, Personal Branding, Kostümideen und grobe Modeberatung.

**Was der zweite Prompt macht:** Er wählt einen Look aus dem Raster und vergrößert ihn zu einem einzelnen Ganzkörperporträt.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 2×3-Outfit-Raster als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 2×3-Raster, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist das Outfit [[SICHTBARE BESCHREIBUNG]]. Erstelle ein einzelnes Ganzkörperporträt im Format 4:5. Übernimm Identität, Accessoires und andere erkennbare Merkmale aus Bild 1, aber exakt die Kleidung aus der gewählten Zelle. Schlichter neutraler Studiohintergrund, vollständige Figur, keine sichtbare Marke, kein Text und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Reihe 1, Spalte 3 – das dunkelblaue Sakko mit hellem Shirt.

![Ergebnis des zweiten Prompts: ausgewähltes Outfit als einzelnes Ganzkörperporträt](/images/blog/ki-bildprompts/followups/08-outfit-variants-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der ausgewählte Look steht nun einzeln statt nur als kleine Kachel bereit. Das bleibt eine Visualisierung und keine verlässliche Aussage darüber, wie echte Kleidung sitzen würde.</p>
</div>

## Die sichere Auswahlformel

Bei Rasterbildern funktioniert diese Kombination am besten:

**Rastergröße + Reihe und Spalte + sichtbare Beschreibung + gewünschtes Endformat + feste Merkmale + Ausschlüsse.**

Nur `nimm Bild 4` ist riskant. Das Modell kann von links nach rechts, nach Bedeutung oder ganz anders zählen. `Reihe 2, Spalte 1, die überraschte Variante mit offenem Mund` ist deutlich eindeutiger.

## Mein Favorit aus Teil 1

Für den direkten Alltag finde ich `/posepack` und `/emotionGrid` am stärksten. Beide liefern nicht unbedingt das fertige Bild, aber sofort mehrere Richtungen, aus denen sich ein konkretes Motiv auswählen lässt.

Der wichtigste Befund bleibt trotzdem der Unterschied zwischen `/expression` und `/expressions`: Diese Wörter sind keine stabilen Menübefehle. Sie sind winzige Anstöße für das Modell. Genau deshalb lohnt sich der zweite, präzise Folgeprompt.

[Zur Übersicht mit allen 50 Bildprompts](/blog/50-bildprompts-echt-getestet)

[Weiter zu Teil 2: Avatare & Reaktionen](/blog/kuerzeste-bildprompts-avatare-reaktionen)
