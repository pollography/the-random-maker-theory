---
title: "Bildprompts für Creator und KI-Videos"
slug: "bildprompts-creator-ki-video"
date: "2026-08-31"
description: "Sechs Mini-Prompts für Brandboard, Verpackung, Merch, Kontaktbogen, Storyboard und Start-/Endbilder plus eine konkrete KI-Video-Pipeline."
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

## 81. `/brandBoard`: Eine komplette Marke aus dem Nichts

```prompt
/brandBoard
```

![Brandboard mit Porträt, erfundenem Logo, Farben, Schrift und Anwendungen](/images/blog/ki-bildprompts/81-brand-board.webp)

Das Modell baute ein vollständiges Brandboard mit Logo, Mission, Vision, Farbwerten, Typografie, Symbolen, Visitenkarte, Tasse und Notizbuch. Das sieht sofort präsentationsfähig aus. Inhaltlich ist es eine Fiktion: Name, Texte, Farbwerte und Positionierung wurden nicht von mir vorgegeben.

**Wofür sinnvoll:** Als schneller Richtungsvergleich für Personal Branding, Kanaldesign oder ein internes Moodboard. Nicht als fertige Marke und nicht als Ersatz für Namens-, Marken- oder Lesbarkeitsprüfung.

```prompt
Erstelle ein Brandboard für [NAME/PROJEKT] anhand meines Porträts. Verwende ausschließlich diese Markenwerte: [WERT 1 bis 3]. Farbpalette: [FARBEN]. Schriftstimmung: [BESCHREIBUNG]. Zeige Porträt, eine einfache eigenständige Wortmarken-Idee, Farbflächen, zwei Typografie-Richtungen und drei neutrale Anwendungen. Verwende keine erfundene Mission, keine fremden Logos und keine Produktversprechen. Querformat 16:9.
```

## 82. `/packagingBoard`: Verpackung plus erfundene Versprechen

```prompt
/packagingBoard
```

![Fiktive Brillenverpackung mit Porträt und erfundenen Produktangaben](/images/blog/ki-bildprompts/82-packaging-board.webp)

Statt mehrerer Verpackungsrichtungen entstand eine einzelne Blisterkarte für eine orangefarbene Brille. Das Modell erfand einen Produktnamen sowie Aussagen zu UV-Schutz, Blendung, Kontrast, Komfort und Haltbarkeit.

Visuell ist das ein starkes Mockup. Inhaltlich wäre eine Veröffentlichung ohne echte Produktdaten problematisch. Ein Bildmodell prüft keine Materialeigenschaften.

**Wofür sinnvoll:** Für frühe Verpackungsrichtungen, Pitch-Mockups und Größenverhältnisse. Alle Claims, Kennzeichnungen und Pflichtangaben müssen aus verlässlichen Produktdaten kommen.

```prompt
Erstelle ein Packaging-Moodboard mit drei unterschiedlichen Verpackungsrichtungen für [PRODUKT]. Zeige jeweils nur Form, Farbflächen und Platzhalterzonen. Verwende mein Porträt klein als Markenreferenz. Keine Leistungsversprechen, keine Prüfzeichen, keine Prozentwerte, keine Inhaltsstoffe und keine erfundenen Zertifikate. Schreibe nur „NAME“, „PRODUKT“ und „INFO“. Weißer Hintergrund, Querformat 16:9, keine reale Marke.
```

## 83. `/merchMockup`: Sofort auf Hoodie, Tasse, Shirt und Tasche

```prompt
/merchMockup
```

![Merch-Mockup mit Porträt auf Hoodie, Tasse, Shirt, Stofftasche und Handyhülle](/images/blog/ki-bildprompts/83-merch-mockup.webp)

Das Modell setzte das Porträt auf fünf Produkte. Dadurch lässt sich schnell erkennen, wie das Motiv auf unterschiedlich großen Flächen wirkt. Es ist aber auffällig, dass das Bild einfach das komplette rechteckige Porträt aufdruckt. Für gutes Merch wäre meist eine freigestellte, vereinfachte Grafik besser.

**Wofür sinnvoll:** Für Produktauswahl, erste Shopideen, Community-Abstimmungen oder die Frage, welches Motiv auf welcher Fläche funktioniert.

```prompt
Erstelle ein neutrales Merch-Mockup mit genau vier Produkten: schwarzer Hoodie, weiße Tasse, weißes T-Shirt und naturfarbene Stofftasche. Verwende auf jedem Produkt dieselbe freigestellte Illustration meines Kopfes mit Glatze, Bart und orangefarbener Brille. Kein rechteckiger Fotohintergrund. Realistische Druckgröße und Stofffalten, hellgrauer Studiohintergrund, Querformat 16:9, keine Marken und kein zusätzlicher Text.
```

## 84. `/contactSheet`: Die wichtigste Referenz für weitere Bilder

```prompt
/contactSheet
```

![Kontaktbogen mit Frontansicht, Dreiviertelansichten, Profilen und Rückansicht](/images/blog/ki-bildprompts/84-contact-sheet.webp)

Der Prompt erzeugte sechs sauber beschriftete Ansichten: Front, Dreiviertel links, linkes Profil, Dreiviertel rechts, rechtes Profil und Rückseite. Gesicht, Brille, Bart und Hoodie bleiben weitgehend zusammenhängend.

Genau so ein Blatt ist wertvoll, wenn eine Person später in mehreren Szenen auftauchen soll. Es macht sichtbare Merkmale und Winkel vergleichbar. Es garantiert trotzdem keine perfekte Identität zwischen neuen Generierungen.

**Wofür sinnvoll:** Für KI-Video-Referenzen, Charakterentwicklung, 3D-Moodboards, Storyboards und die Auswahl eines konkreten Blickwinkels.

```prompt
Erstelle ein konsistentes Kontaktblatt der Person aus meinem Referenzfoto mit sechs Ansichten: Front, 3/4 links, linkes Profil, 3/4 rechts, rechtes Profil und Rücken. Gleiche Kleidung, gleiche orange Brille, gleicher Bart, gleiche Brennweite und identische weiche Studiobeleuchtung in jedem Feld. Weißer Hintergrund, 3×2-Raster, kurze deutsche Labels, keine zusätzlichen Posen und kein Logo.
```

### So wähle ich eine Ansicht eindeutig aus

Nur „nimm Bild vier“ ist unnötig riskant. Ich nenne Position und sichtbare Ansicht:

```prompt
Nutze den letzten Kontaktbogen als Referenz. Wähle ausschließlich Reihe 2, Spalte 2, gezählt von oben links. Gemeint ist das rechte Profil mit orangefarbener Brille und vollständig sichtbarem Bart. Erstelle daraus ein einzelnes hochauflösendes Porträt im Format 16:9 mit zusätzlichem freien Raum auf der linken Seite. Identität, Kleidung, Winkel und Licht bleiben gleich. Kein Raster, keine Beschriftung und keine weiteren Ansichten.
```

Wenn das Modell trotzdem die falsche Zelle nimmt, schneide ich das gewünschte Feld grob aus und lade nur diesen Ausschnitt als neue Referenz hoch.

## 85. `/storyboard`: Erfindet gleich einen ganzen Werbefilm

```prompt
/storyboard
```

![Sechsteiliges Storyboard für eine erfundene Barbershop-Geschichte](/images/blog/ki-bildprompts/85-storyboard.webp)

Aus dem Porträt entstand eine vollständige Barbershop-Geschichte mit sechs Einstellungen, Beschreibungen und einem erfundenen Slogan. Das Modell leitete den Friseurplot offenbar aus dem langen Bart ab.

Das ist kreativ, aber nicht mein Briefing. Für eine echte Produktion muss zuerst die Handlung feststehen.

**Wofür sinnvoll:** Für Shotlisten, Reels, Werbeideen, Musikvideos, Erklärfilme und die Vorbereitung einzelner Keyframes.

```prompt
Erstelle ein Storyboard mit sechs nummerierten Einstellungen für diesen Ablauf: [HANDLUNG IN 4 BIS 6 SÄTZEN]. Die Person aus meinem Referenzfoto ist in allen passenden Panels dieselbe. Gib pro Panel nur Einstellungsgröße, sichtbare Aktion und Kamerabewegung an. Schwarz-weiße Skizzen mit türkisen und orangefarbenen Akzenten, Querformat 16:9. Keine neue Handlung, kein erfundener Dialog, kein Slogan und kein Logo.
```

## 86. `/firstLastFrame`: Der zweite deutliche Fehlversuch

```prompt
/firstLastFrame
```

![Ein einzelnes Porträt in einem analogen Filmrahmen statt Start- und Endbild](/images/blog/ki-bildprompts/86-first-last-frame.webp)

Der Begriff erzeugte keinen sichtbaren Anfang und kein Ende. Das Ergebnis ist nur ein einzelnes Porträt in einem Filmrahmen. Eine bekannte Filmmarke im Rohbild habe ich für die Veröffentlichung durch „Analog Film 400“ ersetzt.

Der Fehlversuch ist nachvollziehbar: Ohne Handlung weiß das Modell weder, **was sich verändert**, noch wie Start und Ende zusammenhängen sollen.

**Wofür sinnvoll:** Erst mit einer klaren Bewegung oder Transformation. Start- und Endbild sollten dieselbe Kamera, Umgebung und Identität haben.

```prompt
Erstelle ein zweigeteiltes Referenzblatt für eine KI-Videosequenz. Links steht „START“: Die Person aus meinem Foto steht frontal vor einem geschlossenen weißen Werkstatttor, Arme locker, neutraler Ausdruck. Rechts steht „ENDE“: dieselbe Person, gleiche Kamera und gleiches Licht, das Tor ist geöffnet und die Person zeigt lächelnd auf die Werkstatt. Format 16:9, gleiche Kleidung und Identität, keine Zwischenbilder, keine Filmrahmen, kein Logo.
```

## Meine konkrete Pipeline vom Porträt zum KI-Video

Hier wird aus den einzelnen Prompts ein zusammenhängender Ablauf:

1. **Identitätsblatt erstellen:** Mit `/contactSheet` Front, Profile und Dreiviertelansichten erzeugen.
2. **Referenz prüfen:** Brille, Bartform, Ohren, Kleidung und Proportionen über alle Felder vergleichen.
3. **Handlung schreiben:** In einem Satz festlegen, was am Anfang passiert und was am Ende sichtbar sein soll.
4. **Storyboard erzeugen:** Mit sechs Panels Bildaufbau und Kamerabewegung planen.
5. **Keyframe auswählen:** Ein konkretes Panel über Reihe, Spalte und sichtbare Handlung benennen.
6. **Start und Ende separat bauen:** Beide Bilder mit identischem Format, Winkel, Licht und Hintergrund erzeugen.
7. **Erst dann animieren:** Die Video-KI bekommt Referenzperson, Startbild, Endbild und eine kurze Bewegungsbeschreibung.
8. **Frame für Frame prüfen:** Gesicht, Brille, Bart, Hände, Hintergrund und unerwartete Objektwechsel kontrollieren.

Ein Beispiel für die Bewegungsbeschreibung:

```prompt
Die Person bleibt dieselbe und bewegt sich ruhig vom Startbild zum Endbild. Sie dreht den Oberkörper leicht nach rechts, hebt den rechten Arm und zeigt anschließend mit offener Hand in die Werkstatt. Die Kamera fährt sehr langsam 20 Zentimeter nach vorn. Keine neue Kleidung, keine zusätzlichen Personen, keine Änderung an Gesicht, Bart, Brille oder Hintergrundobjekten.
```

## Was ist davon am wertvollsten?

Für Creator ist `/merchMockup` der schnellste Nutzentest. Für Markenideen ist `/brandBoard` ein guter Gesprächsstart. Für eine echte Bild- oder Video-Pipeline ist `/contactSheet` aber mit Abstand der wichtigste Prompt dieser Gruppe.

Das Storyboard plant die Handlung. Der Kontaktbogen stabilisiert die sichtbare Person. Start- und Endbilder begrenzen die Bewegung. Erst zusammen werden aus einzelnen KI-Bildern Bausteine für eine nachvollziehbare Sequenz.

[Zur Übersicht mit allen 36 neuen Prompts](/blog/ultimate-bildprompts-part-2) · [Zurück zu den Porträt-Prompts](/blog/bildprompts-portraet-verbessern) · [Die ersten 50 getesteten Prompts öffnen](/blog/50-bildprompts-echt-getestet)
