---
title: "50 Bildprompts. Echt getestet."
slug: "50-bildprompts-echt-getestet"
date: "2026-08-30"
description: "50 extrem kurze Bildprompts im Praxistest: echte Ergebnisse mit demselben Porträt, sinnvolle Use Cases und fertige Folgeprompts zum Kopieren."
tags: ["ki-bilder", "prompts", "tutorial", "chatgpt", "workflow"]
category: "ki-tools"
draft: false
readingTime: 12
heroImage: "/images/blog/50-bildprompts-echt-getestet-1.webp"
heroImageThumb: "/images/blog/50-bildprompts-echt-getestet-1-thumb.webp"
titleAccent: "Echt getestet"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>Ich habe 50 Ein-Wort-Prompts mit demselben Porträt getestet.</li>
		<li>Die Begriffe erzeugen Posen, Sticker, Altersvarianten, technische Ansichten, Infografiken und komplette Filmszenen.</li>
		<li>Es sind Mini-Prompts, keine garantierten Systembefehle. Derselbe Begriff kann bei einem anderen Modell anders reagieren.</li>
		<li>Der eigentliche Nutzen entsteht erst im zweiten Schritt: gewünschte Variante auswählen, einzeln neu erzeugen und für einen konkreten Zweck formatieren.</li>
		<li>Alle Prompts lassen sich direkt kopieren oder zusammen mit einem neuen ChatGPT- beziehungsweise Claude-Tab öffnen.</li>
	</ul>
</div>

Ein Bild. Ein Wort. Und plötzlich steht dieselbe Person in sechs Posen da, taucht als Stickerpack auf oder läuft durch eine Cyberpunk-Stadt.

Das klingt nach einem billigen Prompt-Trick. Deshalb wollte ich nicht nur ein paar besonders schöne Beispiele sammeln. Ich habe **50 kurze Bildprompts mit demselben Ausgangsporträt getestet**. Immer wieder derselbe kahle Kopf, derselbe lange Bart, dieselbe orange Brille und derselbe türkise Hoodie.

![Bereinigtes Ausgangsporträt für alle 50 Bildprompt-Tests](/images/blog/ki-bildprompts/00-ausgangsbild.webp)

Und das ist die Reise, die aus diesem einen Porträt entstanden ist:

<div class="prompt-result-grid" aria-label="Sechs Richtungen der Bildprompt-Serie">
	<a class="prompt-result-card" href="/blog/kuerzeste-bildprompts-menschen-posen">
		<img src="/images/blog/ki-bildprompts/04-action-poses.webp" alt="Sechs Actionposen derselben Person" loading="lazy" />
		<span>Posen</span>
	</a>
	<a class="prompt-result-card" href="/blog/kuerzeste-bildprompts-avatare-reaktionen">
		<img src="/images/blog/ki-bildprompts/12-sticker-pack.webp" alt="Stickerpack mit mehreren Reaktionen derselben Person" loading="lazy" />
		<span>Avatare</span>
	</a>
	<a class="prompt-result-card" href="/blog/kuerzeste-bildprompts-alter-transformation">
		<img src="/images/blog/ki-bildprompts/19-multiverse.webp" alt="Alternative Versionen derselben Person" loading="lazy" />
		<span>Transformation</span>
	</a>
	<a class="prompt-result-card" href="/blog/kuerzeste-bildprompts-technik-innenansichten">
		<img src="/images/blog/ki-bildprompts/extra-product-exploded-view.webp" alt="Explosionsdarstellung einer Kamera" loading="lazy" />
		<span>Technik</span>
	</a>
	<a class="prompt-result-card" href="/blog/kuerzeste-bildprompts-infografiken-wissen">
		<img src="/images/blog/ki-bildprompts/39-visual-guide.webp" alt="Visueller Leitfaden als KI-Infografik" loading="lazy" />
		<span>Wissen</span>
	</a>
	<a class="prompt-result-card" href="/blog/kuerzeste-bildprompts-welten-filmszenen">
		<img src="/images/blog/ki-bildprompts/50-movie-scene.webp" alt="Cineastische Filmszene mit derselben Person" loading="lazy" />
		<span>Filmszenen</span>
	</a>
</div>

Die Ergebnisse reichen von erstaunlich brauchbar bis komplett schräg. Genau das macht den Test interessant. Einige Begriffe liefern sofort Material für Thumbnails, Profilbilder oder Storyboards. Andere produzieren hübsche, aber inhaltlich erfundene Schaubilder. Und manche verstehen das Wort ganz anders, als ich es erwartet hatte.

## Sind das echte Slash-Befehle?

Kurz gesagt: Ich würde sie nicht so behandeln.

Ein vorangestellter Slash sieht nach einer eingebauten Funktion aus. In meinen Tests wirkten die Begriffe aber wie extrem kurze Prompts. Das Bildmodell erkennt offenbar das visuelle Konzept hinter Wörtern wie `posepack`, `blueprint` oder `movieScene` und baut daraus eine eigene Interpretation.

Das bedeutet:

- Das Ergebnis ist nicht fest definiert.
- Ein anderes Modell oder ein späteres Update kann anders reagieren.
- Singular und Plural können bereits einen Unterschied machen.
- Ein passendes Ausgangsbild ist oft wichtiger als der eigentliche Ein-Wort-Prompt.
- Schrift, Anatomie, Marken und technische Details bleiben prüfpflichtig.

Ich nenne sie deshalb im Artikel **Ein-Wort-Prompts** oder **Mini-Prompts**. Das ist weniger magisch, aber deutlich ehrlicher.

## Der Ablauf, der aus einem Gimmick ein Werkzeug macht

Der Ein-Wort-Prompt ist nur der Start. Der brauchbare Workflow sieht so aus:

1. Lade ein klares Ausgangsbild hoch.
2. Sende genau einen Mini-Prompt.
3. Prüfe Identität, Hände, Schrift, Logos und Bildaufbau.
4. Wähle eine konkrete Variante aus dem Ergebnis.
5. Lass diese Variante einzeln und im passenden Format neu erzeugen.
6. Nutze erst dieses Einzelbild für Thumbnail, Profilbild, Video, Storyboard oder Produktgrafik.

```prompt
/posepack
```

<div class="rf-block rf-callout" role="note" aria-label="Hinweis zu den Prompt-Buttons">
	<span class="rf-label" aria-hidden="true">Hinweis</span>
	<p>Der Kopieren-Button legt den Prompt in deine Zwischenablage. Die ChatGPT- und Claude-Buttons öffnen zusätzlich den jeweiligen Dienst. Dein Bild musst du dort selbst hochladen und den kopierten Text gegebenenfalls noch einfügen. Eine Webseite darf nicht still dein privates Porträt an einen fremden Dienst übertragen.</p>
</div>

## So wählst du ein bestimmtes Bild aus einem Raster

Genau hier hören viele kurze Demos zu früh auf. Ein 3×3-Raster sieht nett aus, ist aber noch kein fertiges Asset.

Zähle Reihen und Spalten immer **von oben links**:

| Position | Bedeutung |
|---|---|
| Reihe 1, Spalte 1 | oben links |
| Reihe 1, Spalte 3 | oben rechts |
| Reihe 2, Spalte 2 | genau in der Mitte |
| Reihe 3, Spalte 1 | unten links |
| Reihe 3, Spalte 3 | unten rechts |

Verlass dich nicht nur auf die Koordinate. Nenne zusätzlich die sichtbare Emotion, Pose oder Kleidung. So bleibt die Auswahl eindeutig, selbst wenn die KI das Raster anders zählt.

```prompt
Nutze das zuletzt erzeugte 3×3-Raster als Referenz. Wähle ausschließlich Reihe 2, Spalte 1, gezählt von oben links. Gemeint ist die überraschte Variante mit weit geöffneten Augen und offenem Mund. Erstelle daraus ein einzelnes hochauflösendes Porträt im Format 4:5. Gesicht, orange Brille, Bart und türkiser Hoodie sollen gleich bleiben. Kein Raster, keine Beschriftung, keine weiteren Varianten, kein Logo und kein Wasserzeichen.
```

Wenn das Modell trotzdem das falsche Feld nimmt, schneide die gewünschte Zelle grob aus, lade nur diesen Ausschnitt neu hoch und formuliere den Zielprompt noch einmal. Das ist weniger elegant, aber oft zuverlässiger.

## Ausschneiden oder neu erzeugen?

Beides ist möglich, aber nicht dasselbe.

**Ausschneiden** erhält exakt die Pixel des Rasters. Dafür bleibt nur ein Bruchteil der ursprünglichen Auflösung übrig. Das reicht oft für eine kleine Reaktionsgrafik, aber selten für einen großen Header.

**Neu erzeugen** kann ein sauberes Hochformat, mehr Hintergrund und höhere Auflösung liefern. Dabei kann sich allerdings das Gesicht verändern. Deshalb müssen die festen Merkmale noch einmal in den Prompt: Gesichtsform, Bart, Brille, Kleidung und alles, was nicht driften soll.

## Die 50 Prompts in sechs Teilen

Ich habe die Liste nicht alphabetisch sortiert, sondern nach dem späteren Einsatz. So findest du schneller die Gruppe, die zu deinem Projekt passt.

### Teil 1: Menschen, Posen und Kleidung

`/turnaround`, `/expression`, `/posepack`, `/actionposes`, `/characterSheet`, `/emotionGrid`, `/bodylanguage`, `/outfitVariants`

Für Creator, Fotografen, Personal Brands, Character-Referenzen, Modeideen, YouTube-Thumbnails und KI-Videos.

[Alle acht Menschen- und Posen-Prompts ansehen](/blog/kuerzeste-bildprompts-menschen-posen)

### Teil 2: Avatare, Sticker und Reaktionen

`/sticker`, `/stickerPack`, `/emojiPack`, `/reactionPack`, `/avatarPack`, `/miniature`, `/giantify`

Für Social Media, Messenger, Community-Reaktionen, Streamer, Profilbilder und auffällige Thumbnail-Motive.

[Alle sieben Avatar- und Reaktions-Prompts ansehen](/blog/kuerzeste-bildprompts-avatare-reaktionen)

### Teil 3: Alter, Zeit und alternative Versionen

`/ageprogression`, `/characterEvolution`, `/cloneScene`, `/multiverse`, `/evolution`, `/beforeAfter`, `/timeTravel`, `/futureVersion`, `/pastVersion`, `/alternateReality`

Für Storytelling, Figurenentwicklung, Games, Filmideen, Moodboards und Vorher-nachher-Konzepte.

[Alle zehn Transformations-Prompts ansehen](/blog/kuerzeste-bildprompts-alter-transformation)

### Teil 4: Technik und Innenansichten

`/cutaway`, `/explodedView`, `/blueprint`, `/xray`, `/anatomy`, `/crossSection`, `/assembly`, `/disassembly`, `/howItWorks`

Für Maker, Produktdesigner, Reparaturideen, Erklärgrafiken und technische Moodboards. Hier zeigt ein zusätzlicher Kameratest, warum ein Produkt oft die bessere Eingabe ist.

[Alle neun Technik-Prompts ansehen](/blog/kuerzeste-bildprompts-technik-innenansichten)

### Teil 5: Infografiken und Wissen

`/mindMap`, `/flashcard`, `/infographic`, `/timeline`, `/visualGuide`, `/comparison`

Für Blogs, Workshops, Unterricht, Kurse, Präsentationen und visuelle Zusammenfassungen. Die Layout-Idee ist oft brauchbar. Die automatisch erzeugten Fakten sind es nicht automatisch.

[Alle sechs Wissens-Prompts ansehen](/blog/kuerzeste-bildprompts-infografiken-wissen)

### Teil 6: Welten und Filmszenen

`/environmentExpand`, `/worldBuild`, `/underwater`, `/spaceScene`, `/cyberpunk`, `/postApocalypse`, `/portal`, `/dreamscape`, `/doubleExposure`, `/movieScene`

Für Filmemacher, Game-Entwicklung, Musikvisuals, Storyboards, KI-Video-Referenzen und YouTube-Thumbnails.

[Alle zehn Welt- und Film-Prompts ansehen](/blog/kuerzeste-bildprompts-welten-filmszenen)

## Welche Prompts sind wirklich nützlich?

Nach einem Durchlauf mit allen 50 Begriffen würde ich sie in drei Gruppen einteilen.

**Sofort verständlich und praktisch:** Posepacks, Outfitvarianten, Stickerpacks, Emotionsraster, Umgebungserweiterung und Filmszenen. Das Ergebnis verrät direkt, wozu es gut sein kann.

**Gut als Ideenmaschine:** Multiverse, Dreamscape, Cyberpunk, Blueprint oder Timeline. Diese Begriffe liefern schnell eine Richtung, brauchen danach aber einen genaueren zweiten Prompt.

**Nur mit Kontrolle verwenden:** Anatomy, X-ray, How It Works, Assembly und Infographic. Sie können überzeugend aussehen und trotzdem falsche Beschriftungen, erfundene Bauteile oder Unsinn enthalten.

## Vom Mini-Prompt zum fertigen Asset

Ein Raster ist noch kein Endergebnis. Es liefert dir Auswahlmaterial. Erst der Folgeprompt macht daraus ein Bild mit passendem Format, sauberem Ausschnitt und einem konkreten Zweck. Diese drei Beispiele zeigen den ganzen Weg.

### 1. YouTube-Thumbnail

Im `/actionposes`-Raster steckt bereits eine starke Zeigegeste. Für ein Thumbnail braucht sie aber mehr Platz, einen klaren Hintergrund und eine Seite, auf der die Überschrift sofort lesbar ist.

![Ausgangsraster mit sechs Actionposen](/images/blog/ki-bildprompts/04-action-poses.webp)

```prompt
Nutze im zuletzt hochgeladenen 2×3-Raster ausschließlich Reihe 1, Spalte 1, gezählt von oben links. Gemeint ist die lächelnde Person mit der Zeigegeste zur Kamera. Erstelle daraus ein einzelnes Bild im Format 16:9. Setze die Person auf die rechte Bildhälfte und lass links viel ruhigen, dunklen Freiraum. Erhalte Gesicht, langen Bart, orange Brille und türkisen Hoodie. Kräftiger Kontrast, cyanfarbenes und warmes Kantenlicht, glaubwürdige Hand mit fünf Fingern. Keine Schrift, kein Raster, kein Logo und kein Wasserzeichen.
```

![Fertiges YouTube-Thumbnail mit der Hook 1 Foto, 1 Wort](/images/blog/ki-bildprompts/usecase-youtube-thumbnail.webp)

Die Auswahl aus dem Raster lieferte die Figur. Hintergrund, Beschnitt und Freiraum kamen im Folgeprompt dazu. Die exakte Hook **1 FOTO. 1 WORT.** habe ich anschließend als Layout gesetzt. Das ist zuverlässiger, als ein Bildmodell mit fehlerfreier Typografie zu beauftragen.

### 2. Profilbild oder Avatar

Beim `/avatarPack` ist die frontale Variante oben links die klarste Ausgangsbasis. Ein bloßer Ausschnitt wäre schnell erledigt, hätte aber wenig Auflösung und kaum sicheren Rand für den runden Beschnitt vieler Plattformen.

![Avatar-Pack mit vier Ansichten derselben Person](/images/blog/ki-bildprompts/15-avatar-pack.webp)

```prompt
Nutze ausschließlich die frontale, lächelnde Variante oben links aus dem zuletzt hochgeladenen 2×2-Avatar-Raster. Erstelle daraus ein einzelnes quadratisches Profilbild. Kopf und Schultern frontal zur Kamera, ruhiger dunkelblauer Hintergrund, weiches Studio-Licht und ausreichend Abstand zu allen Bildrändern für einen späteren runden Zuschnitt. Erhalte Gesichtsform, kahlen Kopf, langen dunklen Bart, orange Brille und türkisen Hoodie. Kein Raster, kein Rahmen, keine Schrift, kein Logo und kein Wasserzeichen.
```

![Fertiges quadratisches Profilbild mit sicherem Rand](/images/blog/ki-bildprompts/usecase-profilbild.webp)

Das fertige Bild funktioniert quadratisch und bleibt auch im runden Avatar-Ausschnitt lesbar. Trotzdem gilt: Beim Neuerzeugen kann das Gesicht leicht driften. Vergleiche deshalb Brillenform, Nase, Bartansatz und Gesichtsproportionen noch einmal mit dem Original.

### 3. Personenreferenz für KI-Video

Ein einzelnes Selfie zeigt einem Videomodell nur einen Blickwinkel. Turnaround, Posepack und Emotionsraster liefern zusammen mehr Informationen darüber, wie dieselbe Person von der Seite aussieht, sich bewegt und mimisch reagiert.

<div class="prompt-source-grid" aria-label="Drei Quellen für das KI-Video-Referenzboard">
	<img src="/images/blog/ki-bildprompts/01-turnaround.webp" alt="Turnaround mit sechs Blickwinkeln" loading="lazy" />
	<img src="/images/blog/ki-bildprompts/03-pose-pack.webp" alt="Posepack mit sechs Ganzkörperposen" loading="lazy" />
	<img src="/images/blog/ki-bildprompts/06-emotion-grid.webp" alt="Emotionsraster mit neun Gesichtsausdrücken" loading="lazy" />
</div>

```prompt
Ordne die drei hochgeladenen Referenzbilder zu einem übersichtlichen 16:9-Personenboard an. Links stehen die verschiedenen Kopfansichten, in der Mitte die Ganzkörperposen und rechts die Gesichtsausdrücke. Verwende ausschließlich die vorhandenen Bilder und erfinde keine neue Ansicht. Alle Bereiche vollständig zeigen, sauber voneinander trennen und klar beschriften. Dunkler, ruhiger Hintergrund, keine Logos und kein Wasserzeichen.
```

![Fertiges Personenreferenz-Board für KI-Video](/images/blog/ki-bildprompts/usecase-ki-video-referenz.webp)

Dieses Board ist kein Garant für ein konsistentes Video. **Das Videomodell muss Bildreferenzen unterstützen** und kann Merkmale trotzdem verändern. Das Board macht die Vorgabe aber eindeutiger als ein einziges Porträt.

### Zwei weitere sinnvolle Anwendungen

**Modeberatung und Look-Ideen:** Mit `/outfitVariants` bekommst du schnell Richtungen. Danach isolierst du ein Outfit und beschreibst exakt, welche Kleidungsstücke übernommen werden sollen. Verlass dich nicht auf die KI, wenn es um reale Größen, Passform oder Produktverfügbarkeit geht.

**Technische Produktgrafik:** `/explodedView` war am Porträt eher ein surrealer Gag. Mit einer klar fotografierten Kamera entstand dagegen sofort eine verständliche Explosionsdarstellung. Der Begriff war derselbe. Der Unterschied lag im Ausgangsmotiv.

## Die Serie geht mit 36 neuen Prompts weiter

Ich habe denselben Test inzwischen um sechs neue Richtungen erweitert: Sammelfiguren, Miniaturwelten, Comics und Retroformate, Stoff- und Materialstile, Porträtideen sowie Creator- und KI-Video-Workflows.

Darunter sind Begriffe wie `/tinyWorkers`, `/designerToy`, `/comicStrip`, `/plushToy`, `/hairstyleGrid`, `/contactSheet` und `/storyboard`. Auch die Fehlversuche bleiben sichtbar, damit klar wird, welche Wörter tatsächlich reagieren und welche erst mit einem genauen Folgeprompt brauchbar werden.

[36 neue Ultimate Bildprompts mit allen Ergebnissen öffnen](/blog/ultimate-bildprompts-part-2)

## Mein Fazit

Der kürzeste Prompt ist selten der fertige Prompt.

Als erster Schritt funktionieren diese Wörter aber erstaunlich gut. Sie sparen nicht unbedingt den gesamten Prompt, sondern die leere Seite im Kopf. Du bekommst schnell eine visuelle Richtung und kannst danach konkret sagen, welches Bild du behalten, wie du es formatieren und wofür du es einsetzen willst.

Der wichtigste Trick ist deshalb nicht der Slash. Es ist die Pipeline danach:

**Ausgangsbild → Mini-Prompt → Ergebnis prüfen → Variante eindeutig auswählen → Einzelbild erzeugen → echten Use Case bauen.**

Genau diese Schritte zeige ich in den sechs Teilen mit allen Ergebnissen, Folgeprompts und den Stellen, an denen ein einzelnes Wort eben nicht reicht.
