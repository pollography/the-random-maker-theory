---
title: "Comics und Retro aus einem Foto"
seoTitle: "KI-Bildprompts für Comics & Retro-Looks"
slug: "bildprompts-comics-retro"
date: "2026-08-31"
description: "Sechs Mini-Prompts machen aus einem Porträt Comic, Fantasy-Zeitung, Filmstreifen, Reisetagebuch, Tarotkarte und einen gescheiterten Game-Screen-Test."
tags: ["ki-bilder", "prompts", "comic", "retro", "storytelling"]
category: "ki-tools"
draft: false
readingTime: 6
heroImage: "/images/blog/bildprompts-comics-retro-1.webp"
heroImageThumb: "/images/blog/bildprompts-comics-retro-1-thumb.webp"
titleAccent: "Comics & Retro"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>`/comicStrip`, `/fantasyNewspaper`, `/filmStrip`, `/travelScrapbook` und `/tarotCard` erzeugten sofort erkennbare Layouts.</li>
		<li>Text und Fakten sehen oft überzeugend aus, sind aber frei erfunden.</li>
		<li>`/gameScreen` veränderte das Porträt in diesem Test praktisch gar nicht.</li>
		<li>Für einen brauchbaren Comic oder Artikel müssen Handlung und Wortlaut im Folgeprompt festgelegt werden.</li>
	</ul>
</div>

Ein Retro-Rahmen macht aus einem Porträt noch keine Geschichte. Aber er kann in wenigen Sekunden zeigen, **welche Art Geschichte daraus werden könnte**.

Ich habe sechs kurze Begriffe getestet. Fünf bauten sofort komplette Gestaltungen. Einer tat fast nichts. Gerade der Vergleich zeigt, wann ein Ein-Wort-Prompt als Ideenmaschine funktioniert und wann er klare Regie braucht.

Das erste Bild jedes Abschnitts zeigt weiterhin ehrlich, was nur mit dem kurzen Slash-Prompt entstanden ist. Danach folgt ein zweiter, genauer erklärter Arbeitsauftrag mit einem eigenen Ergebnis. Die kopierbare Vorlage übernimmt die Person und ihre sichtbaren Merkmale aus deinen hochgeladenen Bildern. Eckige Platzhalter ersetzt du nur dort, wo dein eigener Inhalt nötig ist.

![Ausgangsporträt für die Comic- und Retrotests](/images/blog/ki-bildprompts/00-ausgangsbild.webp)

## 63. `/comicStrip`: Vier Panels, vier Reaktionen

```prompt
/comicStrip
```

![Vierfelder-Comic mit verschiedenen Reaktionen und englischen Sprechblasen](/images/blog/ki-bildprompts/63-comic-strip.webp)

Das Modell erzeugte ein sauberes Vierfelder-Layout mit verschiedenen Gesichtsausdrücken, Sprechblasen und kräftigen Pop-Art-Farben. Die Texte sind motivierend, aber vollständig erfunden. Eine echte Handlung gibt es nicht.

**Wofür sinnvoll:** Für Social Carousels, kurze Erklärungen, Reaktionsbilder, Newsletter-Aufmacher oder ein Storyboard mit fertiger Comicoptik.

**Was der zweite Prompt macht:** Er ersetzt die erfundenen Sprechblasen durch vier vorgegebene Szenen und Texte und hält die Person über alle Panels zusammen.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und das Kurzprompt-Ergebnis als Bild 2 für Layout und Comicstil.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Referenz für Raster, Linienführung und Farbwirkung. Erstelle einen quadratischen Comicstrip mit vier gleich großen Panels. Panel 1: [[SZENE 1]], Sprechblase exakt „[[TEXT 1]]“. Panel 2: [[SZENE 2]], Sprechblase exakt „[[TEXT 2]]“. Panel 3: [[SZENE 3]], Sprechblase exakt „[[TEXT 3]]“. Panel 4: [[SZENE 4]], Sprechblase exakt „[[TEXT 4]]“. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 in allen Panels. Kräftige Pop-Art-Farben, klare deutsche Sprechblasen, keine weiteren Wörter, keine zusätzliche Person und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Ein missglückter Möbelaufbau in vier Schritten mit den kurzen Texten „Das geht schnell“, „Wo ist Teil B?“, „Ah“ und „Jetzt hält es“.

![Ergebnis des zweiten Prompts: vierteiliger Comic über einen Möbelaufbau](/images/blog/ki-bildprompts/followups/63-comic-strip-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der zweite Prompt macht aus dem reinen Reaktionsraster eine kleine, verständliche Handlung. Alle vier Texte wurden korrekt übernommen und die Person bleibt über die Panels hinweg klar wiedererkennbar.</p>
</div>

## 64. `/fantasyNewspaper`: Eine komplette erfundene Titelseite

```prompt
/fantasyNewspaper
```

![Fantasy-Zeitung mit Porträt, Drachen, Burg und erfundenen Artikeln](/images/blog/ki-bildprompts/64-fantasy-newspaper.webp)

Hier baute das Modell eine erstaunlich vollständige Zeitung: Name, Datum, Hauptüberschrift, Drachenmeldung, Zauberer-Rat, Trankrezept und Wetter. Visuell überzeugend, sachlich komplett erfunden.

**Wofür sinnvoll:** Für Rollenspiel-Handouts, Fantasy-Hochzeiten, Geburtstagsüberraschungen, Escape Rooms oder eine fiktionale Welt. Für echte Nachrichten ist diese Methode ungeeignet.

**Was der zweite Prompt macht:** Er ersetzt die erfundenen Meldungen durch vorgegebenen Text und passt das helle Farbfoto an Papierfarbe, Druckkontrast und Holzschnittstil der Zeitung an. Das Porträt wird dafür entsättigt und nahezu monochrom in den Druck eingebaut.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und die mit `/fantasyNewspaper` erzeugte Seite als Bild 2.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz und Bild 2 nur als Layoutreferenz. Gestalte eine fiktionale Fantasy-Zeitungsseite auf gealtertem Papier im A4-Hochformat. Verwandle die Person vollständig in dieselbe schwarz-weiße Holzschnitt- und Druckrasterästhetik wie die übrigen Illustrationen. Gleiche Haut, Kleidung und Hintergrund an den warmen Papierton und den niedrigen Druckkontrast an; keine leuchtenden modernen Farben und kein neutraler Studiohintergrund. Hinter der Person liegt [[FANTASY-ORT]]. Verwende ausschließlich diese Texte: Zeitungstitel „[[TITEL]]“, Hauptüberschrift „[[ÜBERSCHRIFT]]“, Nebenmeldungen „[[TEXT 1]]“, „[[TEXT 2]]“ und „[[TEXT 3]]“. Keine weiteren Wörter, keine reale Zeitungsmarke und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Fantasy-Ort „Bergtal mit Burg“, Titel „DIE MAKER-POST“, Hauptüberschrift „DAS TOR IST OFFEN“ sowie die Nebenmeldungen „DRACHE GESICHTET“, „WERKSTATT-RAT“ und „TRANK DES TAGES“.

![Ergebnis des zweiten Prompts: einheitlich gedruckte Fantasy-Zeitung](/images/blog/ki-bildprompts/followups/64-fantasy-newspaper-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Genau hier ist der Unterschied besonders deutlich: Das helle Farbfoto ist verschwunden. Person, Kleidung, Bergtal und Zeitung wirken jetzt wie aus demselben alten Druckvorgang; auch die fünf vorgegebenen Überschriften stimmen.</p>
</div>

## 65. `/filmStrip`: Ein Kontaktbogen mit Persönlichkeit

```prompt
/filmStrip
```

![Analoger Filmstreifen mit neun Ansichten und Gesichtsausdrücken](/images/blog/ki-bildprompts/65-film-strip.webp)

Das Ergebnis kombinierte neun Ansichten und Emotionen in einem analogen Filmrahmen. Im Rohbild stand auf dem Rand eine bekannte Filmmarke. Für die veröffentlichte Version habe ich ausschließlich diesen Schriftzug durch „Analog Film 400“ ersetzt.

**Wofür sinnvoll:** Für About-Seiten, Kontaktbögen, Künstlerprofile, Albumgestaltung, Casting-Referenzen oder die Auswahl einer passenden Expression.

**Was der zweite Prompt macht:** Er baut den Kontaktbogen mit festgelegten Blickwinkeln und Mimiken neu auf und verhindert erfundene Filmmarken.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und optional das Kurzprompt-Ergebnis als Bild 2 für die gewünschte analoge Rahmung.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Bild 2 darf nur die analoge Rahmung und Körnung vorgeben. Erstelle einen quadratischen analogen Kontaktbogen mit neun Porträts: Frontansicht, linkes Profil, rechtes Profil, Lachen, Nachdenken, Überraschung, ernstes Gesicht, Blick nach oben und Zwinkern. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1. Verwende in jedem Feld denselben Bildausschnitt, dieselbe Brennweitenwirkung und dasselbe Licht. Schwarzer generischer Filmrahmen mit ausschließlich der Aufschrift „ANALOG FILM 400“, keine reale Filmmarke, keine weiteren Wörter und kein Logo.
```

![Ergebnis des zweiten Prompts: analoger Kontaktbogen mit neun kontrollierten Porträts](/images/blog/ki-bildprompts/followups/65-film-strip-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der Kontaktbogen zeigt neun klar unterscheidbare Blickrichtungen und Ausdrücke bei gleichbleibender Person. Der Rand bleibt generisch und enthält nur den gewünschten Schriftzug statt einer erfundenen Marke.</p>
</div>

## 66. `/travelScrapbook`: Ein Reisetagebuch ohne echte Reise

```prompt
/travelScrapbook
```

![Reisetagebuch mit Porträt, Bergen, Stadt, Straße, Strand und Notizen](/images/blog/ki-bildprompts/66-travel-scrapbook.webp)

Das Modell setzte das Porträt zwischen Bergsee, Italien, Wüstenstraße und Strand. Dazu kamen Bucket List, Stempel und Zitate. Das sieht persönlich aus, obwohl keine dieser Reisen durch das Foto belegt ist.

**Wofür sinnvoll:** Als Layout-Idee für echte Reisebilder, Geschenkseite, Jahresrückblick oder visuelles Bucket-List-Moodboard. Die Orte sollten mit eigenen Fotos und geprüften Beschriftungen ersetzt werden.

**Was der zweite Prompt macht:** Er ersetzt den freigestellten Studioeindruck durch ein Porträt in einer sichtbaren Reiseumgebung und gleicht Farbe, Körnung, Kontrast und Alterung an die übrigen Scrapbook-Fotos an.

**Dafür hochladen:** Dein Porträt als Bild 1, vier eigene Reisefotos als Bilder 2 bis 5 und optional das Kurzprompt-Ergebnis als Bild 6 für Seitenaufbau und Materialstil.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz, die Bilder 2 bis 5 als einzige Reiseorte und Bild 6 höchstens als Referenz für Seitenaufbau, Papier und Klebeband. Gestalte eine Reisetagebuch-Doppelseite im Format 4:5 aus gealtertem Papier. Zeige die Person in einem echten Bildhintergrund aus [[AUSGEWÄHLTES REISEFOTO]] statt vor einem neutralen Studiohintergrund. Gleiche dieses Personenfoto an Farbtemperatur, Filmkorn, Kontrast, Ausbleichung und Papieralterung der vier Reisefotos an, sodass es wie Teil derselben analogen Sammlung wirkt. Schreibe ausschließlich die geprüften Bildunterschriften „[[TEXT 1]]“, „[[TEXT 2]]“, „[[TEXT 3]]“ und „[[TEXT 4]]“. Ergänze Klebeband, Kartenlinien und neutrale Stempel ohne Datum. Keine erfundenen Orte, keine Zitate, keine Logos und keine weiteren Wörter.
```

**Für dieses Beispiel eingesetzt:** Die vier Landschaften der vorhandenen, ausdrücklich fiktionalen Testseite dienen nur als Demoorte. Das zentrale Porträt wird in die Bergsee-Landschaft versetzt; die vier neutralen Bildunterschriften lauten „BERGSEE“, „ALTSTADT“, „WÜSTENSTRASSE“ und „KÜSTE“.

![Ergebnis des zweiten Prompts: farblich einheitliches Reisetagebuch mit Porträt am Bergsee](/images/blog/ki-bildprompts/followups/66-travel-scrapbook-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Das Porträt steht nun wirklich am Bergsee und teilt Körnung, Ausbleichung und warme Farbtemperatur mit den übrigen Reisebildern. Der weiße Studiohintergrund und der grelle Freisteller-Eindruck sind weg; alle vier neutralen Beschriftungen stimmen.</p>
</div>

## 67. `/tarotCard`: Ein starkes Symbolbild

```prompt
/tarotCard
```

![Tarotartige Karte mit Porträt, Sonne und Sonnenblumen](/images/blog/ki-bildprompts/67-tarot-card.webp)

Der Prompt machte aus der Person eine sonnige Kartenfigur mit Strahlen, Blumen, römischer Zahl und dem Titel „The Sun“. Die orange Brille und der türkise Hoodie passten zufällig sehr gut in die Farbwelt.

**Wofür sinnvoll:** Für symbolische Charakterkarten, Musikcover, Coaching-Impulse, Rollenspielkarten oder eine persönliche Serie aus Archetypen.

**Was der zweite Prompt macht:** Er ersetzt den zufällig erfundenen Kartentitel und die Symbole durch ein selbst gewähltes Thema mit kontrollierter Farb- und Pflanzenwelt.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1 und optional die erste Karte als Bild 2 für Drucktextur und Rahmung.

**Kopierbare Vorlage:**

```prompt
Nutze Bild 1 als feste Personenreferenz. Bild 2 darf nur Drucktextur und Rahmenwirkung vorgeben. Gestalte eine originelle symbolische Orakelkarte im Hochformat 2:3. Thema: [[THEMA]]. Zentrales Symbol: [[SYMBOL]]. Pflanzen: [[PFLANZEN]]. Farbpalette: [[FARBPALETTE]]. Übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus Bild 1 und übersetze sie in eine historische Druckgrafik. Unten steht ausschließlich der Titel „[[TITEL]]“. Eigene Rahmengestaltung, keine Kopie einer bestehenden Karte, keine weiteren Wörter und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Thema „Neugier“, Kompass als zentrales Symbol, Wildblumen, die Farben Türkis, Orange, Gold und warmes Papier sowie der Titel „NEUGIER“.

![Ergebnis des zweiten Prompts: eigenständige Orakelkarte zum Thema Neugier](/images/blog/ki-bildprompts/followups/67-tarot-card-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Statt die bekannte Sonnenkarte nur umzubenennen, entstand eine eigenständige Neugier-Karte mit Kompass, Wildblumen und dem einzigen gewünschten Titel. Identität und Accessoires bleiben dabei erkennbar.</p>
</div>

## 68. `/gameScreen`: Der Prompt, der nichts auslöste

```prompt
/gameScreen
```

![Nahezu unverändertes Ausgangsporträt nach dem Prompt gameScreen](/images/blog/ki-bildprompts/68-game-screen.webp)

In diesem Versuch entstand kein Spielbildschirm, kein Interface und keine Spielfigur. Das Modell gab mir fast nur das Porträt zurück.

Das ist ein nützlicher Fehlversuch. Der Begriff ist zu offen: Menü, Kampf, Charakterauswahl, Inventar oder Spielwelt könnten alle gemeint sein.

**Wofür sinnvoll:** Erst mit genauer Spielart, Perspektive und UI-Angaben. Dann kann daraus ein guter Konzeptentwurf werden.

**Was der zweite Prompt macht:** Er ersetzt das fast unveränderte Porträt durch einen eindeutig lesbaren Charakterauswahl-Bildschirm mit festgelegter Figur, Perspektive und Oberfläche.

**Dafür hochladen:** Dein ursprüngliches Porträt als Bild 1. Das beinahe unveränderte Kurzprompt-Ergebnis wird für diesen Neuaufbau nicht benötigt.

**Kopierbare Vorlage:**

```prompt
Nutze das hochgeladene Porträt als feste Personenreferenz. Verwandle die Person in den spielbaren Charakter eines fiktiven [[SPIELGENRE]]-Games. Zeige einen vollständigen Charakterauswahl-Bildschirm im Format 16:9. Links steht die Figur in Ganzkörperansicht; übernimm Identität, Kleidung, Accessoires und andere erkennbare Merkmale aus dem Referenzbild. Rechts befinden sich drei neutrale Auswahlfelder für Outfit, Fähigkeit und Ausrüstung. Verwende ausschließlich die Überschrift „CHARAKTERAUSWAHL“. Eigenständiges Interface in [[FARBPALETTE]], keine reale Spielmarke, keine zusätzlichen Wörter und kein Logo.
```

**Für dieses Beispiel eingesetzt:** Spielgenre „Adventure“ und die Farbpalette Türkis, Dunkelblau und Orange.

![Ergebnis des zweiten Prompts: vollständiger Adventure-Charakterauswahl-Bildschirm](/images/blog/ki-bildprompts/followups/68-game-screen-followup.webp)

<div class="rf-block rf-callout" role="note" aria-label="Ergebnis">
	<span class="rf-label" aria-hidden="true">Ergebnis</span>
	<p>Der genaue Auftrag löst das Problem des zu offenen Ein-Wort-Prompts: Aus dem fast unveränderten Porträt wird ein klarer Charakterauswahl-Bildschirm mit Ganzkörperfigur, drei visuellen Auswahlfeldern und nur der gewünschten Überschrift.</p>
</div>

## Erst die Geschichte, dann der Stil

Der häufigste Fehler wäre, den schönen Rahmen bereits als fertigen Inhalt zu behandeln. Ein Comic braucht eine Pointe. Eine Zeitung braucht eine überprüfte Meldung. Ein Reisetagebuch braucht echte Orte. Eine Karte braucht ein bewusst gewähltes Symbol.

Mein sinnvoller Ablauf ist deshalb:

1. Mini-Prompt für die visuelle Richtung testen.
2. Handlung oder Aussage außerhalb des Bildmodells schreiben.
3. Panel, Überschrift oder Karte mit exaktem Text neu erzeugen.
4. Lange Texte notfalls später in einem Layoutprogramm setzen.
5. Vor Veröffentlichung Namen, Daten, Symbole und Marken prüfen.

Mein Favorit ist `/comicStrip`, weil die vier Panels sofort mehrere nutzbare Reaktionen liefern. Der überraschendste Test ist `/fantasyNewspaper`. Der wichtigste ist aber `/gameScreen`, weil er zeigt, dass der Slash allein keine Funktion garantiert.

[Zur Übersicht mit allen 36 neuen Prompts](/blog/ultimate-bildprompts-part-2) · [Zurück zu den Miniaturwelten](/blog/bildprompts-miniaturwelten) · [Weiter zu Stoff, Knete und Glas](/blog/bildprompts-stoff-knete-glas)
