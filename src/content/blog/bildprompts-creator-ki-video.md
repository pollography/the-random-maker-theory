---
title: "Bildprompts für Creator und KI-Videos"
seoTitle: "KI-Bildprompts für Creator & KI-Videos"
slug: "bildprompts-creator-ki-video"
date: "2026-08-31"
description: "Sechs Mini-Prompts für Brandboard, Verpackung, Merch, Kontaktbogen, Storyboard und Start-/Endbilder als Vorbereitung für spätere KI-Videos."
tags: ["ki-bilder", "prompts", "creator", "ki-video", "storyboard"]
category: "ki-tools"
draft: false
readingTime: 8
heroImage: "/images/blog/bildprompts-creator-ki-video-1.webp"
heroImageThumb: "/images/blog/bildprompts-creator-ki-video-1-thumb.webp"
titleAccent: "Creator & KI-Video"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>`/brandBoard`, `/merchMockup`, `/contactSheet` und `/storyboard` liefern sofort brauchbare Konzeptbilder.</li>
		<li>Branding, Produktversprechen und Texte werden ungefragt erfunden und dürfen nicht ungeprüft veröffentlicht werden.</li>
		<li>Ein Kontaktbogen ist die beste Brücke zwischen einem Porträt und konsistenteren KI-Video-Bildern.</li>
		<li>`/firstLastFrame` scheiterte im Rohversuch und erzeugte nur einen einzelnen Filmrahmen.</li>
	</ul>
</div>

Die spannendste Frage ist nicht, wie viele Bilder eine KI erzeugen kann. Sie lautet: **Wie komme ich von einem Porträt zu einer Auswahl, einem Storyboard und schließlich zu einer kontrollierbaren Szene?**

Diese sechs Begriffe zielen genau auf diese Pipeline. Einige liefern überraschend komplette Layouts. Andere erfinden Markenversprechen oder verstehen das Ziel falsch. Deshalb zeige ich zu jedem Rohprompt auch die Version, die ich für echte Arbeit verwenden würde.

![Ausgangsporträt für die Creator- und Video-Tests](/images/blog/ki-bildprompts/00-ausgangsbild.webp)

Das erste Bild jedes Abschnitts bleibt der ehrliche Ein-Wort-Test. Die ausführliche Vorlage darunter ist ein unabhängiger kontrollierter Gegenversuch mit demselben Originalmaterial. Das folgende Bild zeigt die gezieltere Variante; eckige Platzhalter ersetzt du durch deinen eigenen Inhalt.

**So vergleichst du fair:** Öffne für die kontrollierte Vorlage einen neuen Chat und lade nur dein ursprüngliches Ausgangsbild als Bild 1 hoch. Das Ein-Wort-Ergebnis bleibt der Vergleichsbeleg, ist aber keine Referenz für den kontrollierten Prompt.

## 81. `/brandBoard`: Eine komplette Marke aus dem Nichts

```prompt
/brandBoard
```

![Brandboard mit Porträt, erfundenem Logo, Farben, Schrift und Anwendungen](/images/blog/ki-bildprompts/81-brand-board.webp)

Das Modell baute ein vollständiges Brandboard mit Logo, Mission, Vision, Farbwerten, Typografie, Symbolen, Visitenkarte, Tasse und Notizbuch. Das sieht sofort präsentationsfähig aus. Inhaltlich ist es eine Fiktion: Name, Texte, Farbwerte und Positionierung wurden nicht von mir vorgegeben.

**Wofür sinnvoll:** Als schneller Richtungsvergleich für Personal Branding, Kanaldesign oder ein internes Moodboard. Nicht als fertige Marke und nicht als Ersatz für Namens-, Marken- oder Lesbarkeitsprüfung.

**Was der kontrollierte Prompt macht:** Er begrenzt das Board auf vorgegebene Werte, Farben und Anwendungen. Erfundenes Markenversprechen und scheinbar fertige Strategie fallen weg.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personen- oder Motivreferenz. Erstelle ein Brand-Moodboard für [[NAME ODER PROJEKT]]. Verwende ausschließlich diese drei Markenwerte: [[WERT 1]], [[WERT 2]] und [[WERT 3]]. Farbpalette: [[FARBEN]]. Schriftstimmung: [[BESCHREIBUNG]]. Zeige das Referenzmotiv, vier klare Farbflächen, zwei typografische Stimmungen ohne lesbaren Beispieltext und drei neutrale Anwendungen. Keine erfundene Mission, keine Produktversprechen, keine fremden Logos und keine zusätzlichen Behauptungen. Querformat 16:9.
```

**Für dieses Beispiel eingesetzt:** Nordlicht Studio; warm, klar und neugierig; Türkis, Orange, Anthrazit und warmes Weiß; geometrisch und freundlich.

![Ergebnis des kontrollierten Prompts: begrenztes Brand-Moodboard ohne erfundene Versprechen](/images/blog/ki-bildprompts/followups/81-brand-board-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Farben, Motiv und Anwendungen bilden eine erkennbare Richtung. Das Board behauptet aber weder Mission noch Produkteigenschaften und bleibt dadurch ehrlich ein Moodboard.</p>
</div>

## 82. `/packagingBoard`: Verpackung plus erfundene Versprechen

```prompt
/packagingBoard
```

![Fiktive Brillenverpackung mit Porträt und erfundenen Produktangaben](/images/blog/ki-bildprompts/82-packaging-board.webp)

Statt mehrerer Verpackungsrichtungen entstand eine einzelne Blisterkarte für eine orangefarbene Brille. Das Modell erfand einen Produktnamen sowie Aussagen zu UV-Schutz, Blendung, Kontrast, Komfort und Haltbarkeit.

Visuell ist das ein starkes Mockup. Inhaltlich wäre eine Veröffentlichung ohne echte Produktdaten problematisch. Ein Bildmodell prüft keine Materialeigenschaften.

**Wofür sinnvoll:** Für frühe Verpackungsrichtungen, Pitch-Mockups und Größenverhältnisse. Alle Claims, Kennzeichnungen und Pflichtangaben müssen aus verlässlichen Produktdaten kommen.

**Was der kontrollierte Prompt macht:** Er zeigt drei unterschiedliche Verpackungsrichtungen nur über Form, Material und Farbe. Leistungsversprechen und erfundene Prüfzeichen sind ausdrücklich ausgeschlossen.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Motivreferenz. Erstelle ein Packaging-Moodboard mit genau drei klar getrennten Verpackungsrichtungen für [[PRODUKT]]: [[RICHTUNG 1]], [[RICHTUNG 2]] und [[RICHTUNG 3]]. Zeige ausschließlich Verpackungsform, Material, Farbflächen und leere Platzhalterzonen. Setze das Motiv aus Bild 1 klein und dezent ein. Keine Leistungsversprechen, Prüfzeichen, Prozentwerte, Inhaltsstoffe, Zertifikate, lesbare Schrift oder reale Marke. Heller neutraler Hintergrund, Querformat 16:9.
```

**Für dieses Beispiel eingesetzt:** Kameragurt; naturfarbener Karton, dunkle Schiebebox und helle Stoffhülle.

![Ergebnis des kontrollierten Prompts: drei textfreie Verpackungsrichtungen für einen Kameragurt](/images/blog/ki-bildprompts/followups/82-packaging-board-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die drei Richtungen lassen Material und Form vergleichen, ohne eine Produktwirkung zu erfinden. Pflichtangaben und echte Beschriftung müssten später separat gestaltet werden.</p>
</div>

## 83. `/merchMockup`: Sofort auf Hoodie, Tasse, Shirt und Tasche

```prompt
/merchMockup
```

![Merch-Mockup mit Porträt auf Hoodie, Tasse, Shirt, Stofftasche und Handyhülle](/images/blog/ki-bildprompts/83-merch-mockup.webp)

Das Modell setzte das Porträt auf fünf Produkte. Dadurch lässt sich schnell erkennen, wie das Motiv auf unterschiedlich großen Flächen wirkt. Es ist aber auffällig, dass das Bild einfach das komplette rechteckige Porträt aufdruckt. Für gutes Merch wäre meist eine freigestellte, vereinfachte Grafik besser.

**Wofür sinnvoll:** Für Produktauswahl, erste Shopideen, Community-Abstimmungen oder die Frage, welches Motiv auf welcher Fläche funktioniert.

**Was der kontrollierte Prompt macht:** Er reduziert den Test auf vier feste Produkte und verwendet überall dieselbe freigestellte Illustration statt eines rechteckig aufgedruckten Fotos.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Motivreferenz. Erstelle ein neutrales Merch-Mockup mit genau vier Produkten: [[PRODUKT 1]], [[PRODUKT 2]], [[PRODUKT 3]] und [[PRODUKT 4]]. Verwende auf jedem Produkt dieselbe vereinfachte freigestellte Illustration des Motivs aus Bild 1. Kein rechteckiger Fotohintergrund. Zeige realistische Druckgrößen, Materialfalten und natürliche Perspektiven. Heller Studiohintergrund, Querformat 16:9, keine Marke und kein zusätzlicher Text.
```

**Für dieses Beispiel eingesetzt:** Schwarzer Hoodie, weiße Tasse, weißes T-Shirt und naturfarbene Stofftasche.

![Ergebnis des kontrollierten Prompts: vier Merch-Produkte mit derselben freigestellten Illustration](/images/blog/ki-bildprompts/followups/83-merch-mockup-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Dasselbe vereinfachte Motiv ist nun auf allen vier Oberflächen vergleichbar. Es liegt nicht mehr als komplettes rechteckiges Porträt auf den Produkten.</p>
</div>

## 84. `/contactSheet`: Die wichtigste Referenz für weitere Bilder

```prompt
/contactSheet
```

![Kontaktbogen mit Frontansicht, Dreiviertelansichten, Profilen und Rückansicht](/images/blog/ki-bildprompts/84-contact-sheet.webp)

Der Prompt erzeugte sechs sauber beschriftete Ansichten: Front, Dreiviertel links, linkes Profil, Dreiviertel rechts, rechtes Profil und Rückseite. Gesicht, Brille, Bart und Hoodie bleiben weitgehend zusammenhängend.

Genau so ein Blatt ist wertvoll, wenn eine Person später in mehreren Szenen auftauchen soll. Es macht sichtbare Merkmale und Winkel vergleichbar. Es garantiert trotzdem keine perfekte Identität zwischen neuen Generierungen.

**Wofür sinnvoll:** Für KI-Video-Referenzen, Charakterentwicklung, 3D-Moodboards, Storyboards und die Auswahl eines konkreten Blickwinkels.

**Was der kontrollierte Prompt macht:** Er erzeugt sechs fest definierte Blickwinkel unter möglichst gleichen Bedingungen. Die Ziffern dienen als robuste Auswahlhilfe und ersetzen fehleranfällige KI-Beschriftungen.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein konsistentes 3×2-Kontaktblatt mit genau sechs Ansichten in dieser Reihenfolge: 1 Front, 2 Dreiviertel links, 3 linkes Profil, 4 Dreiviertel rechts, 5 rechtes Profil und 6 Rücken. Halte Identität, Kleidung, Accessoires, Brennweite, Kamerahöhe und weiche Studiobeleuchtung möglichst konstant. Beschrifte jedes Feld nur mit der passenden Ziffer 1 bis 6. Neutraler Hintergrund, keine zusätzlichen Posen, keine Wörter und kein Logo.
```

![Ergebnis des kontrollierten Prompts: nummeriertes Kontaktblatt mit sechs festen Blickwinkeln](/images/blog/ki-bildprompts/followups/84-contact-sheet-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die Blickwinkel folgen nun einer festen Reihenfolge und lassen sich über Ziffer, Position und Ansicht kontrollieren. Das Blatt ist damit eine bessere Referenz als sechs lose Bilder.</p>
</div>

### Mit dem Ergebnis weiterarbeiten

Nur „nimm Bild vier“ ist unnötig riskant. Ich nenne Position und sichtbare Ansicht und lade das gerade erzeugte Blatt erneut hoch.

**Was dieser Weiterarbeit-Prompt macht:** Er führt das rechte Profil aus Feld 5 als einzelnes Querformat weiter und ergänzt links bewusst freie Fläche.

**Dafür hochladen:** Das gerade erzeugte Kontaktblatt als Bild 1 und dein ursprüngliches Porträt als Bild 2 zur Identitätskontrolle.

**Kopierbare Weiterarbeit-Vorlage:**

```prompt
Nutze aus Bild 1 ausschließlich das Feld in Reihe [[REIHE]], Spalte [[SPALTE]], gezählt von oben links. Gemeint ist die Ansicht [[SICHTBARE ANSICHT]]. Erstelle daraus ein einzelnes hochauflösendes Porträt im Format [[FORMAT]] mit zusätzlichem freien Raum auf der [[SEITE]]. Nutze Bild 2 zur Kontrolle von Identität, Kleidung, Accessoires und anderen erkennbaren Merkmalen. Winkel und Licht bleiben wie im gewählten Feld. Kein Raster, keine Beschriftung, keine Ziffer und keine weiteren Ansichten.
```

**Für dieses Beispiel eingesetzt:** Reihe 2, Spalte 2, rechtes Profil, Format 16:9, freie Fläche links.

![Ergebnis des Auswahl-Prompts: rechtes Profil aus Feld 5 mit Freiraum links](/images/blog/ki-bildprompts/followups/extra-contact-sheet-selection-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Das richtige Feld wurde als einzelnes Bild übernommen. Ziffer, Rasterposition und sichtbare Ansicht haben gemeinsam verhindert, dass ein anderes Profil ausgewählt wurde.</p>
	<p>Wenn das Modell trotzdem die falsche Zelle nimmt, schneide ich das gewünschte Feld grob aus und lade nur diesen Ausschnitt als neue Referenz hoch.</p>
</div>

## 85. `/storyboard`: Erfindet gleich einen ganzen Werbefilm

```prompt
/storyboard
```

![Sechsteiliges Storyboard für eine erfundene Barbershop-Geschichte](/images/blog/ki-bildprompts/85-storyboard.webp)

Aus dem Porträt entstand eine vollständige Barbershop-Geschichte mit sechs Einstellungen, Beschreibungen und einem erfundenen Slogan. Das Modell leitete den Friseurplot offenbar aus dem langen Bart ab.

Das ist kreativ, aber nicht mein Briefing. Für eine echte Produktion muss zuerst die Handlung feststehen.

**Wofür sinnvoll:** Für Shotlisten, Reels, Werbeideen, Musikvideos, Erklärfilme und die Vorbereitung einzelner Keyframes.

**Was der kontrollierte Prompt macht:** Er bindet das Storyboard an eine vorgegebene Handlung. Sechs feste Bilder zeigen den Ablauf, ohne einen neuen Plot, Dialog oder Werbeslogan zu erfinden.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein Storyboard mit genau sechs nummerierten Einstellungen für diesen Ablauf: [[HANDLUNG IN SECHS KLAREN SCHRITTEN]]. Halte die Person in allen Panels wiedererkennbar. Zeige pro Panel nur die beschriebene Aktion, eine passende Einstellungsgröße und eine einfache Richtung der Kamerabewegung als Pfeil. Schwarz-weiße Skizzen mit [[AKZENTFARBEN]], Querformat 16:9. Außer den Ziffern 1 bis 6 keine Schrift, keine neue Handlung, kein Dialog, kein Slogan und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Die Person kommt an einem Bergsee an, packt die Kamera aus, sucht den Bildausschnitt, fotografiert, prüft das Display und geht bei Abendlicht weiter; türkise und orange Akzente.

![Ergebnis des kontrollierten Prompts: sechsteiliges Storyboard mit vorgegebenem Fotoablauf](/images/blog/ki-bildprompts/followups/85-storyboard-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Die sechs Panels erzählen jetzt den vorgegebenen Fotoablauf statt einer erfundenen Barbershop-Werbung. Das bleibt eine Bildplanung, noch kein Video.</p>
</div>

## 86. `/firstLastFrame`: Der zweite deutliche Fehlversuch

```prompt
/firstLastFrame
```

![Ein einzelnes Porträt in einem analogen Filmrahmen statt Start- und Endbild](/images/blog/ki-bildprompts/86-first-last-frame.webp)

Der Begriff erzeugte keinen sichtbaren Anfang und kein Ende. Das Ergebnis ist nur ein einzelnes Porträt in einem Filmrahmen. Eine bekannte Filmmarke im Rohbild habe ich für die Veröffentlichung durch „Analog Film 400“ ersetzt.

Der Fehlversuch ist nachvollziehbar: Ohne Handlung weiß das Modell weder, **was sich verändert**, noch wie Start und Ende zusammenhängen sollen.

**Wofür sinnvoll:** Erst mit einer klaren Bewegung oder Transformation. Start- und Endbild sollten dieselbe Kamera, Umgebung und Identität haben.

**Was der kontrollierte Prompt macht:** Er definiert Anfang und Ende als zwei vergleichbare Bilder. Kamera, Umgebung und Person bleiben gleich; nur die ausdrücklich beschriebene Veränderung findet statt.

**Dafür hochladen:** Nur dein ursprüngliches Ausgangsbild als Bild 1. Das Ein-Wort-Ergebnis wird nicht hochgeladen.

**Kopierbare kontrollierte Vorlage:**

```prompt
Nutze ausschließlich Bild 1 als feste Personenreferenz. Erstelle ein zweigeteiltes Referenzblatt: links [[STARTSITUATION]], rechts [[ENDSITUATION]]. In beiden Hälften bleiben Person, Identität, Kleidung, Accessoires, Kamera, Brennweite, Licht und Umgebung gleich. Verändere ausschließlich [[GEPLANTE VERÄNDERUNG]]. Querformat 16:9, keine Zwischenbilder, keine Beschriftung, keine Filmstreifen, kein Text und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Links steht die Person frontal und neutral vor einem geschlossenen weißen Studiotor; rechts ist das Tor geöffnet und die Person zeigt lächelnd in das Fotostudio; nur Tor, Ausdruck und Armhaltung verändern sich.

![Ergebnis des kontrollierten Prompts: konsistentes Start- und Endbild vor demselben Studiotor](/images/blog/ki-bildprompts/followups/86-first-last-frame-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Zum ersten Mal sind Anfang und Ende wirklich gleichzeitig sichtbar. Das Referenzblatt löst damit den Fehlversuch, ohne schon eine Bewegung zu simulieren.</p>
</div>

## Meine konkrete Bild-Pipeline für ein späteres KI-Video

Hier wird aus den einzelnen Prompts ein zusammenhängender Ablauf:

1. **Identitätsblatt erstellen:** Mit `/contactSheet` Front, Profile und Dreiviertelansichten erzeugen.
2. **Referenz prüfen:** Brille, Bartform, Ohren, Kleidung und Proportionen über alle Felder vergleichen.
3. **Handlung schreiben:** In einem Satz festlegen, was am Anfang passiert und was am Ende sichtbar sein soll.
4. **Storyboard erzeugen:** Mit sechs Panels Bildaufbau und Kamerabewegung planen.
5. **Keyframe auswählen:** Ein konkretes Panel über Reihe, Spalte und sichtbare Handlung benennen.
6. **Start und Ende separat bauen:** Beide Bilder mit identischem Format, Winkel, Licht und Hintergrund erzeugen.
7. **Bilder exportieren und prüfen:** Identität, Hände, Hintergrund, Auflösung und Seitenverhältnis kontrollieren, bevor ein separates Videowerkzeug ins Spiel kommt.

Bis hierhin bleibt der Ablauf vollständig bei Bildprompts. Eine echte Animation braucht ein Videomodell, eigene Einstellungen und eine erneute Sichtprüfung über die gesamte Sequenz. Das gehört deshalb in einen separaten Praxistest und nicht als einzelner ungetesteter Acht-Sekunden-Prompt in diese Bildserie.

## Was ist davon am wertvollsten?

Für Creator ist `/merchMockup` der schnellste Nutzentest. Für Markenideen ist `/brandBoard` ein guter Gesprächsstart. Für eine echte Bild- oder Video-Pipeline ist `/contactSheet` aber mit Abstand der wichtigste Prompt dieser Gruppe.

Das Storyboard plant die Handlung. Der Kontaktbogen stabilisiert die sichtbare Person. Start- und Endbilder begrenzen die Bewegung. Erst zusammen werden aus einzelnen KI-Bildern Bausteine für eine nachvollziehbare Sequenz.

[Zur Übersicht mit allen 36 neuen Prompts](/blog/ultimate-bildprompts-part-2) · [Zurück zu den Porträt-Prompts](/blog/bildprompts-portraet-verbessern) · [Die ersten 50 getesteten Prompts öffnen](/blog/50-bildprompts-echt-getestet)
