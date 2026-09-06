---
title: "Die kürzesten Bildprompts: Avatare & Reaktionen"
seoTitle: "Kurze KI-Bildprompts für Avatare & Reaktionen"
slug: "kuerzeste-bildprompts-avatare-reaktionen"
date: "2026-08-30"
description: "Sieben Ein-Wort-Bildprompts für Sticker, Avatare, Reaktionen, Miniaturen und Riesenbilder. Echt getestet mit demselben Porträt."
tags: ["ki-bilder", "prompts", "avatar", "sticker", "social-media"]
category: "ki-tools"
draft: false
readingTime: 9
heroImage: "/images/blog/kuerzeste-bildprompts-avatare-reaktionen-1.webp"
heroImageThumb: "/images/blog/kuerzeste-bildprompts-avatare-reaktionen-1-thumb.webp"
titleAccent: "Avatare & Reaktionen"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">Teil 2</span>
	<ul>
		<li>Sieben Mini-Prompts machen aus einem Porträt Sticker, Reaktionen, Avatare und extreme Größenwechsel.</li>
		<li>Stickerpacks und Reaction Packs sind schnell brauchbar, müssen aber für echte Transparenz meist nachbearbeitet werden.</li>
		<li>Miniature und Giantify liefern starke Einzelideen für Social Posts und Thumbnails.</li>
	</ul>
</div>

In diesem Teil wird aus dem Porträt kein Character Sheet, sondern ein kleines Content-Paket. Sticker, Reaktionen und Avatare sind für Messenger, Communities und Social Media deutlich näher am fertigen Einsatz.

Ich habe alle sieben Begriffe wieder mit demselben Ausgangsbild getestet. Genau dadurch wird sichtbar, wie gut Brille, Bart, Gesicht und Hoodie über sehr unterschiedliche Stile hinweg erhalten bleiben.

Das erste Bild jedes Abschnitts bleibt das unveränderte Ergebnis des kurzen Prompts. Der zweite Prompt darunter ist nun als konkreter Arbeitsschritt erklärt, nennt die nötigen Uploads und wird mit einem eigenen getesteten Ergebnis belegt. In der kopierbaren Vorlage kommen persönliche Merkmale aus deinen Referenzbildern, nicht aus fest eingebauten Beschreibungen.

## 11. `/sticker`: ein einzelner Cutout

```prompt
/sticker
```

Der Prompt erzeugte ein freundliches Halbporträt mit weißer Kontur und Schatten. Optisch sieht es sofort wie ein Sticker aus. Der Hintergrund war allerdings weiß statt wirklich transparent.

![Einzelner Porträt-Sticker mit weißer Kontur](/images/blog/ki-bildprompts/11-sticker.webp)

**Nützlich für:** Kanalgrafiken, Community-Posts, Stream Overlays und digitale Sticker.

**Was der zweite Prompt macht:** Er setzt den Sticker ohne äußeren Schlagschatten auf eine ruhige, kontrastierende Farbfläche. Diese lässt sich anschließend in einem Bildeditor sauber transparent machen.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und den mit `/sticker` erzeugten Cutout als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Referenz für Ausschnitt und Kontur. Erstelle einen einzelnen quadratischen Porträt-Sticker. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Gleichmäßige weiße Kontur rund um die gesamte Figur, 12 Prozent freier Rand und dahinter eine ruhige kontrastierende Fläche in [[HINTERGRUNDFARBE]] ohne Muster oder Gegenstände. Kein äußerer Schlagschatten, kein Text und kein Logo. Stelle kein Transparenz-Schachbrett dar.
```

**Für dieses Beispiel eingesetzt:** Eine ruhige dunkelviolette Fläche, die sich deutlich von Person und weißer Kontur trennt.

![Ergebnis des zweiten Prompts: einzelner Porträt-Sticker auf einfarbigem Hintergrund](/images/blog/ki-bildprompts/followups/11-sticker-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der Sticker liegt einzeln, mit sauberem Rand und ohne Schlagschatten vor. Wichtig: Die Fläche ist absichtlich einfarbig; echte Transparenz muss anschließend per Freistellung erzeugt werden.</p>
</div>

## 12. `/stickerPack`: neun Gesten

```prompt
/stickerPack
```

Hier entstand ein 3×3-Set mit Lachen, Daumen hoch, Überraschung, Herzgeste und weiteren Reaktionen. Die Bildsprache war sofort verständlich. Für einen echten Export müssten die Sticker anschließend einzeln getrennt werden.

![Neun Porträt-Sticker mit unterschiedlichen Gesten in einem Raster](/images/blog/ki-bildprompts/12-sticker-pack.webp)

**Nützlich für:** Discord, Telegram, WhatsApp, Twitch, YouTube-Mitgliedschaften und interne Teams.

**Was der zweite Prompt macht:** Er löst die gewählte Herzgeste aus dem Neuner-Raster und setzt sie als genau ein Motiv auf eine leicht freizustellende Farbfläche.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 3×3-Stickerpack als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 3×3-Stickerpack, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist [[SICHTBARE BESCHREIBUNG]]. Erstelle nur diese Variante als einzelnen quadratischen Sticker. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 sowie Geste und Ausdruck aus der gewählten Zelle. Gleichmäßige weiße Kontur, 12 Prozent freier Rand und eine ruhige kontrastierende Fläche in [[HINTERGRUNDFARBE]] ohne Muster oder Gegenstände. Keine weiteren Sticker, kein Transparenz-Schachbrett, kein Text und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Reihe 2, Spalte 2 – die positive Herzgeste mit beiden Händen – auf einer ruhigen dunkelvioletten Fläche.

![Ergebnis des zweiten Prompts: einzelne Herzgeste als freigestellter Sticker](/images/blog/ki-bildprompts/followups/12-sticker-pack-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Statt des ganzen Auswahlrasters entsteht genau ein exportierbares Motiv. Die Herzgeste, die Person und die weiße Kontur bleiben klar lesbar.</p>
</div>

## 13. `/emojiPack`: Mensch plus Symbole

```prompt
/emojiPack
```

Das Ergebnis war kein reines Emoji-Set. Es mischte stilisierte Porträtreaktionen mit Herz, Glitzer, Party und Feuer. Gerade diese Mischung kann für Social Content praktisch sein, ist aber weniger kontrollierbar als ein genau beschriebenes Set.

![Emoji Pack mit Porträtreaktionen und farbigen Symbolen](/images/blog/ki-bildprompts/13-emoji-pack.webp)

**Nützlich für:** Livestream-Reaktionen, Stories, Kommentarantworten und Community-Badges.

**Was der zweite Prompt macht:** Er ersetzt die zufällige Mischung aus Porträts und Symbolen durch sechs fest definierte, zusammengehörige Gesichts-Emojis auf einer ruhigen Fläche.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das erste Emoji-Pack als Bild 2 für Illustrationsstil und Kontur.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Referenz für Illustrationsstil und Kontur. Erstelle ein 3×2-Raster mit sechs Porträt-Emojis derselben Person: lachen, staunen, nachdenken, feiern, müde und genervt. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 in allen Feldern. Einheitliche Kopfgröße, getrennte weiße Stickerkonturen und ein ruhiger heller Hintergrund ohne Muster oder Gegenstände. Keine zusätzlichen Symbole, kein Transparenz-Schachbrett, kein Text und kein Logo.
```

![Ergebnis des zweiten Prompts: sechs einheitliche Porträt-Emojis ohne Zusatzsymbole](/images/blog/ki-bildprompts/followups/13-emoji-pack-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Das Ergebnis ist jetzt ein kontrolliertes Personen-Set statt einer Mischung mit Herzen, Feuer und Deko. Die sechs Emotionen unterscheiden sich sichtbar und bleiben stilistisch zusammen.</p>
</div>

## 14. `/reactionPack`: Gesichter statt Deko

```prompt
/reactionPack
```

Der Prompt blieb stärker beim Gesicht. Das Raster zeigte zwölf Reaktionen mit kleinen Änderungen von Blick, Mund und Kopfhaltung. Für wiederkehrende Videoreaktionen ist das nützlicher als das dekorativere Emoji Pack.

![Zwölf Gesichtsreaktionen derselben Person in einem Raster](/images/blog/ki-bildprompts/14-reaction-pack.webp)

**Nützlich für:** Kommentarvideos, Memes, Community Management, Tutorials und Präsentationen.

**Was der zweite Prompt macht:** Er nimmt nur die überraschte Reaktion aus dem Zwölfer-Raster und setzt sie als eigenständiges quadratisches Reaktionsbild neu auf.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 3×4-Reaktionsraster als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 3×4-Reaktionsraster, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist [[SICHTBARE BESCHREIBUNG]]. Erstelle ein einzelnes quadratisches Porträt. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 sowie die Mimik aus der gewählten Zelle. Ruhiger heller Hintergrund ohne Muster oder Gegenstände, kein Transparenz-Schachbrett, kein Rahmen, kein Text und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Reihe 1, Spalte 3 – die überraschte Reaktion mit offenem Mund.

![Ergebnis des zweiten Prompts: einzelne überraschte Reaktion als quadratisches Porträt](/images/blog/ki-bildprompts/followups/14-reaction-pack-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die gewünschte Reaktion steht nun einzeln und ohne Raster zur Verfügung. Dadurch lässt sie sich viel leichter in Video, Kommentar oder Präsentation einsetzen.</p>
</div>

## 15. `/avatarPack`: mehrere Profilansichten

```prompt
/avatarPack
```

Bei mir entstand ein 2×2-Raster mit Front, Dreiviertelansicht, verschränkten Armen und Profil. Die Ausschnitte waren nicht vollkommen einheitlich. Als Auswahltafel für ein Profilbild ist das trotzdem brauchbar.

![Vier Avatarvarianten mit Frontansicht, Profil und Halbporträt](/images/blog/ki-bildprompts/15-avatar-pack.webp)

**Nützlich für:** Profilbilder, Autorenboxen, Teamseiten, Foren und Plattformvarianten.

**Was der zweite Prompt macht:** Er wählt die frontale Avatarvariante aus und normiert Blickhöhe, Zentrierung und Kopfraum.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das vollständige 2×2-Avatar-Raster als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Wähle aus Bild 2, einem 2×2-Avatar-Raster, Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist [[SICHTBARE BESCHREIBUNG]]. Erstelle daraus ein einzelnes quadratisches Profilporträt. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 sowie Blickwinkel und Ausdruck aus der gewählten Zelle. Augen waagerecht, Gesicht mittig, 20 Prozent Kopfraum, ruhiger hellgrauer Hintergrund, kein Text und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Reihe 1, Spalte 1 – die frontal lächelnde Kopf-Schulter-Ansicht.

![Ergebnis des zweiten Prompts: sauber zentrierter einzelner Avatar](/images/blog/ki-bildprompts/followups/15-avatar-pack-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der Avatar hat nun einen konsistenten quadratischen Zuschnitt mit kontrolliertem Kopfraum. Das macht ihn für Profilfelder brauchbarer als die uneinheitliche Übersicht.</p>
</div>

## 16. `/miniature`: die Person als Figur

```prompt
/miniature
```

Das Ergebnis war eine winzige Figur auf einer Fingerspitze. Die übergroßen Proportionen gingen leicht in Richtung Sammelfigur. Brille, Bart und Hoodie blieben sofort erkennbar.

![Winzige Figur der porträtierten Person auf einer Fingerspitze](/images/blog/ki-bildprompts/16-miniature.webp)

**Nützlich für:** Produkt-Mockups, humorvolle Social Posts, Sammlerfiguren-Ideen und Thumbnail-Hooks.

**Was der zweite Prompt macht:** Er verwandelt die spontane Fingerspitzen-Miniatur in eine inszenierte Produktaufnahme auf einem Schreibtisch.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und die mit `/miniature` erzeugte Figur als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 als Referenz für die kleine Figurenform. Erstelle eine realistische 16:9-Produktaufnahme. Die Miniatur steht auf einem kleinen mattschwarzen Sockel auf einem kreativen Arbeitstisch mit wenigen unscharfen Werkzeugen im Hintergrund. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 in die Figur. Makrofotografie, geringe Schärfentiefe, weiches Seitenlicht und freie Fläche rechts. Kein Text, keine sichtbare Marke und kein Logo.
```

![Ergebnis des zweiten Prompts: Miniaturfigur als Produktaufnahme auf einem Arbeitstisch](/images/blog/ki-bildprompts/followups/16-miniature-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die Figur erhält nun einen klaren Nutzungskontext und eine geplante Komposition. Sockel, Makrolook und freie Fläche machen aus dem Gag ein brauchbares Aufmacherbild.</p>
</div>

## 17. `/giantify`: riesig in der Stadt

```prompt
/giantify
```

Der Größenwechsel funktionierte sofort. Die Person stand als Riese zwischen Hochhäusern. Perspektive und Größenverhältnisse waren nicht physikalisch perfekt, aber die Idee liest sich in einer Sekunde.

![Riesige Version der Person zwischen kleinen Hochhäusern](/images/blog/ki-bildprompts/17-giantify.webp)

**Nützlich für:** aufmerksamkeitsstarke Thumbnails, Eventmotive, Memes und surreale Kampagnenideen.

**Was der zweite Prompt macht:** Er setzt die Riesenidee auf glaubwürdige Straßenperspektive, Licht und Schatten fest, ohne Zerstörung zu erfinden.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das mit `/giantify` erzeugte Motiv als Bild 2 für Größenidee und Stimmung.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Referenz für die surreale Größenidee. Erstelle eine glaubwürdige 16:9-Filmszene auf Straßenniveau. Die riesige Person steht ruhig zwischen Hochhäusern, wird aus leichter Froschperspektive fotografiert und schaut freundlich nach unten. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Stimmige atmosphärische Perspektive und realistische Kontaktschatten; unbeschädigte Stadt, keine Schrift, keine Logos und keine Panikszene.
```

![Ergebnis des zweiten Prompts: friedliche Riesenszene aus Straßenperspektive](/images/blog/ki-bildprompts/followups/17-giantify-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die Größenwirkung entsteht nun durch Froschperspektive, Gebäudestaffelung und Schatten statt nur durch einen großen Freisteller. Die Stadt bleibt bewusst unzerstört.</p>
</div>

## Was sich direkt verwenden lässt

Der schnellste Weg zu einem fertigen Asset ist hier der Sticker. Für eine saubere Datei würde ich trotzdem immer noch drei Dinge festlegen:

1. transparenter oder einfarbiger Hintergrund,
2. einheitliche Kontur und Randbreite,
3. exakt ein Motiv pro Datei.

Bei Packs ist die Rasterausgabe nur die Auswahltafel. Erst die einzeln neu erzeugte Variante ist für einen Upload in Messenger, Community-Plattform oder Videoschnitt wirklich praktisch.

## Mein Favorit aus Teil 2

`/stickerPack` liefert den größten direkten Nutzen. `/miniature` und `/giantify` sind dagegen die stärkeren Ideen für einen visuellen Hook. Sie lösen kein alltägliches Problem, aber sie sorgen dafür, dass jemand beim Scrollen kurz hängen bleibt.

[Zur Übersicht mit allen 50 Bildprompts](/blog/50-bildprompts-echt-getestet)

[Zurück zu Teil 1: Menschen & Posen](/blog/kuerzeste-bildprompts-menschen-posen)

[Weiter zu Teil 3: Alter & Transformation](/blog/kuerzeste-bildprompts-alter-transformation)
