---
title: "Die kürzesten Bildprompts: Menschen & Posen"
seoTitle: "Kurze KI-Bildprompts für Menschen & Posen"
slug: "kuerzeste-bildprompts-menschen-posen"
date: "2026-08-30"
description: "Acht extrem kurze Bildprompts für Posen, Mimik, Kleidung und Character Sheets. Mit echten Ergebnissen und kontrollierten Vorlagen für einzelne Motive."
tags: ["ki-bilder", "prompts", "portrait", "character-design", "tutorial"]
category: "ki-tools"
draft: false
readingTime: 11
heroImage: "/images/blog/kuerzeste-bildprompts-menschen-posen-1.webp"
heroImageThumb: "/images/blog/kuerzeste-bildprompts-menschen-posen-1-thumb.webp"
titleAccent: "Menschen & Posen"
---

<div class="rf-block rf-tldr" role="note" aria-label="Kurz gesagt">
	<span class="rf-label" aria-hidden="true">Kurz gesagt</span>
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

Das erste Bild jedes Abschnitts bleibt der ehrliche Ein-Wort-Test. Die ausführliche Vorlage darunter ist ein unabhängiger kontrollierter Gegenversuch mit demselben Originalmaterial. Das folgende Bild zeigt die gewünschte Richtung. Nur wo ausdrücklich „Mit dieser Vorlage neu getestet“ steht, stammt es aus einem frischen Lauf mit der jetzt kopierbaren Vorlage. Eckige Platzhalter ersetzt du durch deinen eigenen Inhalt.

**So vergleichst du fair:** Öffne für die kontrollierte Vorlage einen neuen Chat und lade die unter „Dafür hochladen“ genannten Originale hoch. Das Ein-Wort-Ergebnis bleibt der Vergleichsbeleg, ist aber keine Referenz für den kontrollierten Prompt.

[Alle Ein-Wort-Tests und kontrollierten Vorlagen direkt vergleichen](/tools/bildprompt-library).

## 1. `/turnaround`: mehrere Blickwinkel

```prompt
/turnaround
```

Bei mir entstand ein sauberes Raster mit Front, Dreiviertelansichten, Profilen und Rückansicht. Überraschend war, dass der Prompt keinen kompletten Körper-Turnaround erzeugte, sondern Kopf und Schultern. Für eine Gesichtsreferenz ist das sehr brauchbar. Für 3D-Modelling oder ein exaktes Character Sheet wäre es noch zu frei.

![Sechs Kopfansichten derselben Person von vorne, seitlich und hinten](/images/blog/ki-bildprompts/01-turnaround.webp)

**Nützlich für:** Character-Referenzen, Profilabgleich, KI-Video, 3D-Blocking und konsistentere Folgegenerationen.

**Was der kontrollierte Prompt macht:** Er fordert aus dem Original direkt eine einzelne Ganzkörperreferenz mit festem Format, neutraler Pose und vollständigen Füßen.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein einzelnes Ganzkörperbild im Format 4:5 in neutraler A-Pose, frontal zur Kamera. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Gleichmäßiges weiches Studiolicht, schlichter heller Hintergrund, vollständige Figur einschließlich Füßen. Kein Raster, keine Beschriftung und kein Logo.
```



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: einzelne Ganzkörperansicht in neutraler A-Pose](/images/blog/ki-bildprompts/followups/01-turnaround-followup.webp)

**Vergleich:** Kontrollierte Vorlage gewinnt. Die kontrollierte Vorlage fordert aus dem Original direkt eine einzelne Ganzkörperreferenz mit festem Format, neutraler Pose und vollständigen Füßen.

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

**Was der kontrollierte Prompt macht:** Er legt Mimik, Körperspannung und Thumbnail-Aufbau direkt fest, statt einen zufälligen Ausdruck aus dem Ein-Wort-Ergebnis zu übernehmen.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein einzelnes 16:9-Thumbnail mit [[MIMIK UND KÖRPERSPANNUNG]]. Zeige die Person groß auf der linken Seite und lasse rechts eine ruhige dunkle Fläche für späteren Text frei. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Dramatisches, aber natürliches Licht, keine Schrift, kein Logo und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Eine aufgeregte, freudige Mimik mit geöffnetem Mund und sichtbar gespannter Haltung.



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: aufgeregtes Thumbnail mit freier dunkler Fläche](/images/blog/ki-bildprompts/followups/02-expression-followup.webp)

**Vergleich:** Kommt auf dein Ziel an. Der Kurzprompt ist schneller und überraschender; die längere Vorlage lohnt sich, sobald Format oder Motiv planbar sein müssen.

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

**Was der kontrollierte Prompt macht:** Er beschreibt die gewünschte Pose und den Kamerawinkel direkt und erzeugt daraus ein eigenständiges Ganzkörpermotiv.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein einzelnes Ganzkörperbild im Format 4:5 mit [[POSE UND KAMERAWINKEL]]. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Ganze Figur einschließlich Füßen, anatomisch saubere Hände, neutraler Hintergrund, kein Raster, kein Text und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Eine natürliche gehende Pose in leichter Dreiviertelansicht.



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: einzelne gehende Ganzkörperpose](/images/blog/ki-bildprompts/followups/03-pose-pack-followup.webp)

**Vergleich:** Kontrollierte Vorlage gewinnt. Die kontrollierte Vorlage beschreibt die gewünschte Pose und den Kamerawinkel direkt und erzeugt daraus ein eigenständiges Ganzkörpermotiv.

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

**Was der kontrollierte Prompt macht:** Er beschreibt Geste und Ausdruck direkt, fordert saubere Hände und reserviert im Thumbnail gezielt Platz für eine spätere Überschrift.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein einzelnes 16:9-Motiv mit [[GESTE UND AUSDRUCK]]. Zeige die Person rechts und lasse links eine ruhige freie Fläche. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Korrigiere Hände anatomisch sauber. Kein Text, kein Logo und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Eine direkte Zeigegeste zur Kamera mit entschlossen-freundlichem Ausdruck.



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: einzelne Zeigegeste mit freier Fläche links](/images/blog/ki-bildprompts/followups/04-action-poses-followup.webp)

**Vergleich:** Kontrollierte Vorlage gewinnt. Die kontrollierte Vorlage beschreibt Geste und Ausdruck direkt, fordert saubere Hände und reserviert im Thumbnail gezielt Platz für eine spätere Überschrift.

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

**Was der kontrollierte Prompt macht:** Er entfernt erfundene Eigenschaften und reduziert die Tafel auf festgelegte Ansichten, Ausdrücke und geprüfte Labels.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein neues sauberes Character Sheet mit Frontansicht, linker Profilansicht, Rückansicht und drei Porträts mit freundlichem, ernstem und überraschtem Ausdruck. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Verwende ausschließlich die Labels „FRONT“, „PROFIL“, „RÜCKEN“, „FREUNDLICH“, „ERNST“ und „ÜBERRASCHT“. Keine Eigenschaften, Notizen, Logos oder weiteren Wörter.
```



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: bereinigtes Character Sheet mit deutschen Labels](/images/blog/ki-bildprompts/followups/05-character-sheet-followup.webp)

**Vergleich:** Kontrollierte Vorlage gewinnt. Die kontrollierte Vorlage entfernt erfundene Eigenschaften und reduziert die Tafel auf festgelegte Ansichten, Ausdrücke und geprüfte Labels.

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

**Was der kontrollierte Prompt macht:** Er fordert die gewünschte Mimik direkt als einzelnes Profilbild an und braucht dafür kein Emotionsraster.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein einzelnes quadratisches Profilbild mit der Mimik [[MIMIK]]. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Natürliche Haut, schlichter heller Hintergrund, kein Text, kein Rahmen und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Deutlich überrascht mit geöffneten Augen und leicht geöffnetem Mund.



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: einzelnes quadratisches Porträt mit verwirrter Mimik](/images/blog/ki-bildprompts/followups/06-emotion-grid-followup.webp)

**Vergleich:** Kommt auf dein Ziel an. Der Kurzprompt ist schneller und überraschender; die längere Vorlage lohnt sich, sobald Format oder Motiv planbar sein müssen.

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

**Was der kontrollierte Prompt macht:** Er erweitert die zufällig gewählte Einzelpose zu sechs bewusst unterschiedlichen Formen von Körpersprache.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein 2×3-Raster mit sechs klar unterschiedlichen Formen von Körpersprache: offen, nachdenklich, selbstbewusst, skeptisch, begeistert und entspannt. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 in allen Feldern. Halbkörperansichten vor einem schlichten hellen Hintergrund, anatomisch saubere Hände, keine Beschriftung und kein Logo.
```



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: sechs bewusst unterschiedliche Körpersprachen](/images/blog/ki-bildprompts/followups/07-body-language-followup.webp)

**Vergleich:** Kommt auf dein Ziel an. Der Kurzprompt ist schneller und überraschender; die längere Vorlage lohnt sich, sobald Format oder Motiv planbar sein müssen.

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die kontrollierte Vorlage liefert wirklich eine Auswahl statt nur einer zufälligen Armhaltung. Die sechs Felder unterscheiden sich sichtbar, ohne dafür erfundene Labels ins Bild zu schreiben.</p>
</div>

## 8. `/outfitVariants`: sechs neue Looks

```prompt
/outfitVariants
```

Die Ausgabe zeigte sechs Outfits von Overshirt und Jeansjacke bis zu schwarzer Kombination und Sakko. Gesicht, Bart und Brille blieben meist erkennbar. Gleichzeitig änderten sich Schuhe, Pose, Körperbau und Details. Das ist eine Look-Ideenmaschine, keine virtuelle Anprobe.

![Sechs Outfitvarianten derselben Person von Freizeitlook bis Sakko](/images/blog/ki-bildprompts/08-outfit-variants.webp)

**Nützlich für:** Stilfindung, Moodboards, Personal Branding, Kostümideen und grobe Modeberatung.

**Was der kontrollierte Prompt macht:** Er beschreibt das gewünschte Outfit direkt und erzeugt daraus ein einzelnes Ganzkörperporträt.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein einzelnes Ganzkörperporträt im Format 4:5 mit dem Outfit [[OUTFIT]]. Übernimm Identität, Accessoires und andere erkennbare Merkmale aus Bild 1. Schlichter neutraler Studiohintergrund, vollständige Figur, keine sichtbare Marke, kein Text und keine weitere Person.
```

**Für dieses Beispiel eingesetzt:** Ein dunkler, sportlich-eleganter Look ohne sichtbare Marken.



**Belegstatus:** Beispiel für die gewünschte Richtung.

![Zielbeispiel der kontrollierten Vorlage: ausgewähltes Outfit als einzelnes Ganzkörperporträt](/images/blog/ki-bildprompts/followups/08-outfit-variants-followup.webp)

**Vergleich:** Kontrollierte Vorlage gewinnt. Die kontrollierte Vorlage beschreibt das gewünschte Outfit direkt und erzeugt daraus ein einzelnes Ganzkörperporträt.

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

Der wichtigste Befund bleibt trotzdem der Unterschied zwischen `/expression` und `/expressions`: Diese Wörter sind keine stabilen Menübefehle. Sie sind winzige Anstöße für das Modell. Genau deshalb lohnt sich der kontrollierte Gegenversuch.

[Zur Übersicht mit allen 50 Bildprompts](/blog/50-bildprompts-echt-getestet)

[Weiter zu Teil 2: Avatare & Reaktionen](/blog/kuerzeste-bildprompts-avatare-reaktionen)
