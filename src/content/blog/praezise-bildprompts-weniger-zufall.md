---
title: "24 präzise Bildprompts: weniger Zufall, mehr Kontrolle"
seoTitle: "24 präzise Bildprompts mit echten Beispielen"
slug: "praezise-bildprompts-weniger-zufall"
date: "2026-09-01"
description: "24 ausführliche Bildprompts, echte Ergebnisse und klare Einsatzideen: So steuerst du Motiv, Material, Licht und Identität genauer."
tags: ["ki-bilder", "prompts", "tutorial", "chatgpt", "workflow"]
category: "ki-tools"
draft: false
readingTime: 17
heroImage: "/images/blog/praezise-bildprompts-weniger-zufall-1.webp"
heroImageThumb: "/images/blog/praezise-bildprompts-weniger-zufall-1-thumb.webp"
titleAccent: "mehr Kontrolle"
---

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>Ich habe 24 ausführliche Bildprompts mit demselben Porträt getestet.</li>
		<li>23 Richtungen waren visuell klar. Der Moiré-Versuch bleibt ein gekennzeichnetes Experiment.</li>
		<li>Die Prompts steuern Motiv, Medium, Komposition, Licht, Farbe und geschützte Identitätsmerkmale.</li>
		<li>Jede Vorlage enthält ein konkretes Einsatzgebiet und lässt sich direkt kopieren.</li>
		<li>Ein anderes Modell oder ein zweiter Durchlauf kann trotzdem sichtbar abweichen.</li>
	</ul>
</div>

Ein-Wort-Prompts sind geil, wenn du überrascht werden willst. Sie nerven, sobald du schon weißt, welches Bild du eigentlich brauchst.

Genau deshalb habe ich nach meinen [87 kurzen Bildprompt-Tests](/blog/ultimate-bildprompts-part-2) die Richtung gewechselt. Statt noch mehr einzelne Stilwörter zu sammeln, habe ich **24 konkrete Creative Briefs mit demselben Ausgangsporträt getestet**. Jeder Prompt legt nicht nur einen Look fest. Er beschreibt Motiv, Material, Bildaufbau, Licht, Farben und die Details, die das Modell nicht verändern soll.

Das Ergebnis ist deutlich weniger zufällig. Nicht perfekt und nicht in jedem Modell identisch. Aber wesentlich näher an einem echten Arbeitsauftrag als `/machMalIrgendwasCooles`.

## Warum ein einzelnes Stilwort irgendwann nicht mehr reicht

Ein kurzer Prompt ist ein guter Ideengenerator. `/claymation`, `/movieScene` oder `/tinyWorkers` geben dem Modell eine Richtung und lassen viel Platz für Interpretation. Genau daraus entsteht oft der Wow-Effekt.

Für ein bestimmtes Cover, Thumbnail oder Editorial-Motiv wird diese Freiheit schnell zum Problem. Das Modell entscheidet dann selbst:

- ob es ein Porträt, eine Ganzkörperaufnahme oder eine Collage baut,
- welche Farben und Materialien auftauchen,
- ob die Person noch dieselbe bleibt,
- ob ein Effekt das Gesicht überdeckt,
- ob plötzlich Schrift, Logos oder zusätzliche Figuren im Bild stehen.

Die längeren Prompts schließen diesen Spielraum nicht komplett. Sie verteilen ihn nur sinnvoller. Das Modell darf weiterhin gestalten, bekommt aber klare Leitplanken.

## Die zehn Bausteine meiner präzisen Bildprompts

Alle 24 Vorlagen folgen im Kern derselben Reihenfolge:

```text
Einsatz + Format + Rolle des Ausgangsbilds + Motiv + Medium + Bildaufbau + Licht + Palette + Materiallogik + Preserve/Avoid
```

Das klingt erstmal nach ziemlich viel. Praktisch sind es zehn kurze Entscheidungen:

1. **Einsatz:** Soll das Ergebnis ein Hero, Cover, Poster, Profilbild oder Video-Keyframe werden?
2. **Format:** Brauchst du 4:5, quadratisch oder 16:9?
3. **Referenzrolle:** Liefert das Ausgangsbild nur die Identität oder auch Pose und Komposition?
4. **Motiv:** Was ist konkret zu sehen?
5. **Medium:** Ist es ein Foto, Druck, Relief, Textil oder physisches Objekt?
6. **Bildaufbau:** Frontal, von oben, Brustporträt, viel Negativraum oder ein bestimmter Kamerastandpunkt?
7. **Licht:** Studio, Projektor, Langzeitbelichtung, Tageslicht oder eine einzelne harte Lichtquelle?
8. **Palette:** Welche Farben sind erlaubt?
9. **Materiallogik:** Wie verhält sich Papier, Holz, Metall, Garn, Glas oder Flüssigkeit wirklich?
10. **Preserve und Avoid:** Was muss gleich bleiben und was darf auf keinen Fall entstehen?

Gerade die letzten beiden Punkte machen viel aus. `Erhalte Gesicht, Glatze, Bart und Brille` ist ein anderer Auftrag als nur `mach daraus Kintsugi`. Und `kein zweites Gesicht` ist bei einem Prisma-Effekt keine übertriebene Vorsicht. Das war in meinem ersten Versuch tatsächlich nötig.

## 1. Historische Druck- und Fotoverfahren

Diese sechs Prompts verändern die Bildsprache stark, halten das Motiv aber bewusst einfach. Sie eignen sich gut, wenn das Porträt erkennbar bleiben und trotzdem wie ein echter Print oder ein besonderes fotografisches Verfahren wirken soll.

![Sechs getestete Porträts als Cyanotypie, Risographie, Linolschnitt, Sicherheitsstich, Nassplatte und Falschfarben-Infrarot](/images/blog/praezise-bildprompts/01-print-photo-processes-board.webp)

### 1. Botanische Cyanotypie

**Stark für:** ruhige Editorial-Porträts, Kunst- und Fotoartikel, Poster.

Der begrenzte Farbraum funktioniert hier erstaunlich gut. Die Farn-Photogramme geben dem Bild eine zweite Ebene, ohne Gesicht und Bart zu verschlucken.

```prompt
Nutze mein hochgeladenes Porträt als feste Identitätsreferenz. Erstelle ein einzelnes Brustporträt als handbeschichtete botanische Cyanotypie auf warmweißem Baumwollpapier. Verwende ausschließlich tiefes Preußischblau und Papierweiß, sichtbare Pinselränder der lichtempfindlichen Beschichtung und wenige feine Farn-Photogramme rund um die Person. Erhalte Glatze, Gesichtsproportionen, langen Bart, Pilotenbrille, freundliches Lächeln und Hoodie-Silhouette. Frontal, Kopf und Bart vollständig sichtbar, Format 4:5. Keine weiteren Farben, keine zweite Person, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 2. Zweifarbige Risographie

**Stark für:** Zine-Cover, Social-Serien, Maker-Editorials.

Hier sind die kleinen Druckfehler Teil des Looks. Der Prompt begrenzt die Fehlpassung trotzdem, damit aus Risographie nicht einfach nur ein kaputter RGB-Versatz wird.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Drucke die Person als echte zweifarbige Risographie mit fluoreszierendem Orange und Türkis auf warmem ungestrichenem Papier. Grobe Rasterpunkte, sichtbare Papierfasern und eine kleine absichtliche Farbfehlpassung von höchstens zwei Millimetern. Glatze, langer dunkler Bart, orange Pilotenbrille, Lächeln und Hoodie bleiben eindeutig erkennbar. Zentriertes Brustporträt, Format 4:5. Keine zusätzlichen Schmuckfarben, kein glatter Digitalverlauf, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 3. Reduktions-Linolschnitt

**Stark für:** textfreie Thumbnails, Poster, Kapiteltrenner.

Schwarze Schnittflächen, türkiser Hoodie und orange Brille erzeugen schon bei kleiner Darstellung eine klare Silhouette. Das ist für Thumbnails oft wertvoller als feine fotorealistische Details.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Erstelle einen handgedruckten dreifarbigen Reduktions-Linolschnitt: kräftige schwarze Schnittflächen, eine türkise Druckplatte für den Hoodie und eine gebrannt-orange Platte für die Brille. Zeige unregelmäßige handgeschnitzte Kerben, leicht ungleichmäßigen Farbauftrag und faseriges Druckpapier. Erhalte Gesichtsform, Glatze, langen Bart und freundlichen Ausdruck. Frontal, Brustporträt, Format 4:5. Keine Comic-Sprechblasen, kein glatter Vektorlook, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 4. Fiktiver Sicherheitsstich

**Stark für:** Archivästhetik, Intro-Grafiken, hochwertige Detail-Teaser.

Bei diesem Motiv ist die Abgrenzung wichtig. Der Prompt fordert ausdrücklich ein eigenständiges Kunstblatt und verbietet Geldwert, Siegel und offizielle Merkmale.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Gestalte ein eigenständiges Kunstblatt im Stil eines feinen Sicherheitsstichs: dichte Guilloché-Kurven, präzise Kreuzschraffur, ornamentale Anti-Fälschungs-Geometrie, Dunkelblau und warmes Orange auf cremefarbenem Papier. Das Porträt bleibt frontal und freundlich; Glatze, langer Bart und Pilotenbrille sind klar lesbar. Es muss eindeutig ein Kunstprint sein und darf nicht wie echtes Geld oder ein offizielles Dokument wirken. Keine Zahlen, Währungssymbole, Siegel, Unterschriften, Schrift, Logos oder Wasserzeichen.
```

### 5. Nassplatten-Kollodium

**Stark für:** Alt-neu-Kontraste, Fotogeschichte, ungewöhnliche Profilporträts.

Der interessante Teil ist nicht bloß der Vintage-Look. Moderne Brille und Hoodie bleiben bewusst im historischen Verfahren erhalten. Genau dieser Widerspruch macht das Bild eigenständig.

```prompt
Nutze mein hochgeladenes Porträt als feste Identitätsreferenz. Erzeuge ein authentisch wirkendes Nassplatten-Kollodium-Porträt auf einer dunklen Metallplatte: silbergraues Monochrom, geringe Schärfentiefe, weiches historisches Studiolicht, dunkler Randabfall sowie wenige kleine Emulsionsschlieren und Altersmarken. Die moderne Pilotenbrille und der Hoodie bleiben bewusst erhalten; Gesicht, Glatze, Bartform und Lächeln dürfen sich nicht ändern. Zentriertes Brustporträt, Format 4:5. Kein Kostüm, keine historische Kulisse, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 6. Falschfarben-Infrarot

**Stark für:** Feed-Stopper, Musik- und Tech-Cover, visuelle Experimente.

Ohne klare Farben wird daraus schnell beliebiger Neon-Cyberpunk. Deshalb definiert der Prompt Haut, Bart, Hoodie und Vegetation getrennt.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Erstelle eine realistische Falschfarben-Infrarotfotografie als Brustporträt. Haut hell und natürlich detailliert, Bart beinahe schwarz, Hoodie leuchtend türkis, Hintergrundvegetation in klaren Korall- und Rotorangetönen. Erhalte Gesichtsproportionen, Glatze, orange Pilotenbrille und freundliches Lächeln. Frontal, Augen scharf, Format 4:5, glaubwürdige fotografische Textur. Kein Cyberpunk, kein Neonstadt-Hintergrund, keine zweite Person, keine Schrift, kein Logo und kein Wasserzeichen.
```

## 2. Handwerkliche Materialporträts

Bei diesen Prompts reicht ein Stilwort besonders selten. Holz, Papier, Emaille, Porzellan, Garn und getriebenes Kupfer brauchen jeweils eine eigene Materiallogik. Sonst malt das Modell oft nur eine Textur über ein normales Foto.

![Sechs getestete Porträts als Papier-Schattenbox, Marquetterie, Cloisonné, Kintsugi, Tufting und Kupfer-Relief](/images/blog/praezise-bildprompts/02-handmade-materials-board.webp)

### 7. Papier-Schattenbox

**Stark für:** Hero-Grafiken, DIY-Artikel, haptische Markenwelten.

Sieben bis neun Lagen, sichtbare Schnittkanten und echte Schlagschatten sorgen dafür, dass das Ergebnis wie ein gebautes Objekt wirkt. Nicht wie eine flache Vektorillustration mit Papierfilter.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Baue das Brustporträt als reale Papier-Schattenbox aus sieben bis neun klar getrennten Lagen schweren Schnittpapiers. Sichtbare Schnittkanten und echte Schlagschatten zwischen den Ebenen; Palette aus Creme, Türkis, Orange und Anthrazit. Gesicht, Glatze, langer Bart, Pilotenbrille und Lächeln bleiben klar erkennbar. Frontal, vollständig im Rahmen, Format 4:5. Keine flache Vektorillustration, keine Origami-Figur, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 8. Holz-Marquetterie

**Stark für:** Maker- und Werkstattthemen, Titelgrafiken, physische Produktideen.

Die Holzmaserung folgt im Bart sichtbar der Form. Dieses kleine Detail verkauft das Material besser als zehn zusätzliche Stiladjektive.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Setze das Porträt als handgefertigte Marquetterie-Tafel aus exakt eingepassten Furnieren um: Walnuss, Ahorn und Ebenholz für Haut und Bart, gefärbtes türkises Furnier für den Hoodie, dünne orange Einlage für die Pilotenbrille. Der Bart folgt sichtbar der Richtung der Holzmaserung. Satinierte Oberfläche, gerade von vorn fotografiert, Format 4:5. Keine gemalte Holztextur, kein 3D-Plastik, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 9. Cloisonné-Emaille

**Stark für:** Embleme, Schmuck- und Craft-Themen, luxuriöse Profilgrafiken.

Der Prompt beschreibt Zellen, Metalldrähte, leicht durchscheinende Emaille und Brennunregelmäßigkeiten. Damit bekommt das Modell ein Herstellungsprinzip statt nur das Wort `Emaille`.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Gestalte eine physische Cloisonné-Emaille-Plakette. Feine dunkle Metalldrähte teilen Gesicht, Glatze, langen Bart, orange Brille und türkisen Hoodie in große herstellbar wirkende Zellen. Fülle sie mit leicht durchscheinender Emaille in Türkis, Amber, Creme und Schwarz; zeige kleine Unregelmäßigkeiten vom Brennen und polierte Metallkanten. Frontal, rechteckige Plakette, Format 4:5. Kein Kirchenfenster, keine losen Glasscherben, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 10. Kintsugi-Porzellanbüste

**Stark für:** Transformation, Reparatur, Resilienz, hochwertige Editorial-Metaphern.

Kintsugi kann schnell in wildes Gold-Dekor kippen. Wenige glaubwürdige Bruchlinien und schmale Fugen halten die Idee ruhig und lesbar.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Forme eine realistische weiße Porzellanbüste derselben Person mit orange glasierter Pilotenbrille und türkis glasiertem Hoodie-Kragen. Wenige glaubwürdige Bruchlinien über Kopf, Wange und Schulter sind mit schmalen goldenen Kintsugi-Fugen repariert. Erhalte Gesichtsproportionen, Glatze, langen Bart und freundliches Lächeln. Fotografiere die Büste auf einem neutralen Museumsockel, Format 4:5. Keine zerstörten oder fehlenden Teile, keine dramatischen Goldornamente, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 11. Getuftetes Wandporträt

**Stark für:** Merch-Ideen, Interior- und Textilthemen, freundliche Social-Grafiken.

Loop- und Cut-Pile-Garn geben dem Bild sichtbare Tiefe. Der Ausschluss von Stickerei, Plüschfigur und Fotodruck verhindert drei naheliegende Fehlinterpretationen.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Erstelle ein tatsächlich gefertigtes, rechteckiges getuftetes Wandporträt mit dickem Loop- und Cut-Pile-Garn. Sichtbare Fasern, klare vereinfachte Farbflächen und saubere Außenkante. Türkis für den Hoodie, Orange für die Pilotenbrille, Creme für die Haut, Schwarz und Dunkelbraun für den langen Bart. Gerade von vorn als physisches Textil fotografiert, Format 4:5. Keine Stickerei im Rahmen, keine Plüschfigur, kein Fotodruck, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 12. Kupfer-Repoussé-Medaillon

**Stark für:** Maker-Handwerk, Metallartikel, prägnante Embleme.

Auch hier muss das Material arbeiten. Werkzeugspuren, polierte Höhen und Patina in den Vertiefungen erklären dem Modell, wie das Relief entstanden sein soll.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Treibe das Gesicht als rundes Kupfer-Repoussé-Medaillon aus einem einzigen Metallblech. Kopf, Nase, Brille und langer Bart stehen als plastisches Relief hervor; sichtbare handgetriebene Werkzeugspuren, polierte warme Kupferhöhen und türkis oxidierte Patina in den Vertiefungen. Orangefarbene Brillengläser bleiben als dezente Emaille-Einlage erkennbar. Fotografiere das Medaillon auf neutralem Stein, quadratisch. Keine Münze, kein Geldwert, keine Schrift, kein Logo und kein Wasserzeichen.
```

## 3. Optik, Licht und Dunkelkammer

Optische Effekte greifen schnell direkt ins Gesicht ein. Deshalb sind die Preserve- und Avoid-Zeilen hier besonders konkret. Prisma und Moiré brauchten in meinem Test sogar eine zweite, gezieltere Fassung.

![Sechs getestete Porträts mit Projection-Mapping, Prisma, Lichtmalerei, Moiré, Solarisation und Lichtkaustik](/images/blog/praezise-bildprompts/03-optical-darkroom-board.webp)

### 13. Projection-Mapping auf Gipsbüste

**Stark für:** Event- und Bühnenideen, Tech-Heros, Video-Keyframes.

Der sichtbare Lichtkegel und der Helligkeitsabfall machen aus farbigen Flächen eine glaubwürdige Projektion. Der Prompt verbietet deshalb auch die bequeme Ersatzlösung: generischen Neon-Glow.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Zeige dieselbe Person als matte weiße Gipsbüste in einer dunklen Galerie. Ein echter Projektor wirft scharf begrenzte türkise und amberfarbene geometrische Lichtflächen über Gesicht, Pilotenbrille, Bart und Hoodie. Sichtbarer Lichtkegel und glaubwürdiger Helligkeitsabfall; die Farbflächen sind nur projiziert und nicht aufgedruckt. Frontal, Brustbild, Format 4:5. Keine zweite Projektion, keine Schrift, kein Logo, kein Wasserzeichen und keine generische Neonbeleuchtung.
```

### 14. Kontrollierte Prisma-Refraktion

**Stark für:** moderne Porträts, Kamera- und Fotothemen, subtile Eyecatcher.

Der erste Versuch erzeugte ein zweites Gesicht. Die korrigierte Fassung begrenzt den Effekt auf die linke untere Ecke und nennt die typischen Fehler ausdrücklich.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Erstelle genau ein fotorealistisches Brustporträt derselben Person. Platziere ein kleines dreieckiges Glasprisma nahe am unteren linken Objektivrand. Es erzeugt nur einen kontrollierten Regenbogenreflex und eine schmale farbige Kantenverschiebung in der linken unteren Ecke; das vollständige Gesicht bleibt einmalig, scharf und frei. Erhalte Glatze, langen Bart, orange Pilotenbrille, Lächeln und türkisen Hoodie. Dunkler neutraler Hintergrund, quadratisch. Kein zweites Gesicht, kein Geisterprofil, kein doppeltes Auge, kein Kaleidoskop, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 15. Langzeitbelichtete Lichtmalerei

**Stark für:** Creator- und Tech-Thumbnails, Musikcover, dynamische Heros.

Der kurze Blitz friert die Person ein. Eine einzige kontrollierte Lichtspur sorgt für Bewegung, ohne Augen und Mund mit buntem Chaos zuzuschmieren.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Fotografiere die Person in einer einzigen Langzeitbelichtung vor tiefschwarzem Hintergrund. Ein kurzer Blitz friert Gesicht, Glatze, Bart, orange Brille und türkisen Hoodie scharf ein. Eine einzige durchgehende Lichtspur zeichnet eine kontrollierte türkis-orange Spirale hinter und um die Person, ohne Augen oder Mund zu überdecken. Frontal, Brustporträt, Format 4:5. Keine zufälligen Lichtkritzeleien, keine Laserstrahlen, keine zweite Person, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 16. Zweilagiger Moiré-Siebdruck

**Stark für:** experimentelle Prints und Optical-Art-Ideen. Noch nicht als zuverlässigen Standard verwenden.

Das ist der eine Test, den ich nicht schönreden will. Auch die zweite Fassung wirkt eher wie eine starke Liniengrafik als wie ein deutliches Moiré mit breiten Interferenzbändern. Die Idee ist spannend. Die Reproduzierbarkeit bleibt in diesem Test aber **nur teilweise bestätigt**.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Rekonstruiere das Brustporträt als echten zweilagigen Moiré-Siebdruck. Ebene 1 besteht aus dichten schwarzen konzentrischen Konturlinien, die Kopf, Gesicht, Brille, langen Bart und Hoodie formen. Ebene 2 ist ein zweites halbtransparentes Linienfeld, exakt um sieben Grad gedreht, sodass breite deutlich sichtbare Interferenzbänder über das Motiv laufen. Brille als eine flache orange Schmuckfarbe, Hoodie mit einer dünnen türkisen Kontur. Weißes Papier, quadratisch. Genau zwei Linienebenen, keine normale Gravur, keine Guilloché-Ornamente, keine Rasterpunkte, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 17. Solarisation aus der Dunkelkammer

**Stark für:** experimentelle Fotografie, dunkle Editorials, Album- und Podcast-Cover.

Teilweise Tonwertumkehr und feine Konturlinien liefern einen klaren Dunkelkammer-Look. Die Ausschlüsse verhindern, dass daraus ein Röntgenbild oder Horror-Make-up wird.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Erzeuge einen echten schwarzweißen Silbergelatine-Abzug mit kontrollierter Dunkelkammer-Solarisation: teilweise Tonwertumkehr, tiefe Schwarztöne und feine leuchtende Konturlinien um Glatze, Gesicht, Pilotenbrille und langen Bart. Sichtbare Faserpapier-Textur und sehr dezente chemische Randhöfe. Frontal, Kopf und Bart vollständig sichtbar, quadratisch. Kein Röntgenbild, kein Negativfilmrahmen, kein Horror-Make-up, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 18. Lichtkaustik durch Strukturglas

**Stark für:** Foto-Editorials, Lichtdesign, abstrakte Tech-Looks ohne Cyberpunk.

Kaustik sind die gebündelten Lichtmuster, die durch Brechung entstehen. Zwei strukturierte Glasscheiben und klar definierte Farben machen den Effekt konkreter als ein allgemeines `dramatisches Licht`.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Fotografiere die Person realistisch in einem dunklen Studio. Türkises und warmes amberfarbenes Licht wird durch zwei strukturierte Glasscheiben gebrochen und erzeugt klar definierte Kaustik-Muster auf Kopf, Gesicht, Bart und Hoodie. Die Muster folgen glaubwürdig den Oberflächen; Augen und Gesicht bleiben gut lesbar. Erhalte Glatze, lange Bartform, orange Pilotenbrille und Lächeln. Brustporträt, Format 4:5. Keine Wasseroberfläche, kein Cyberpunk, kein allgemeiner Neon-Glow, keine Schrift, kein Logo und kein Wasserzeichen.
```

## 4. Konkrete Motive statt bloßer Stilwechsel

Diese sechs Ideen sind für mich die stärkste Gruppe. Sie ändern nicht einfach die Oberfläche des Porträts. Sie ersetzen das komplette Bildprinzip durch Werkzeuge, Landschaft, Schatten, Architektur, Pflanzen oder magnetische Flüssigkeit.

<div class="prompt-result-grid" aria-label="Sechs konzeptuelle Porträts aus Werkzeugen, Landschaft, Schatten, Wandbild, Pflanzen und Ferrofluid">
	<a class="prompt-result-card" href="/images/blog/praezise-bildprompts/19-maker-tool-assemblage.webp" target="_blank" rel="noopener noreferrer">
		<img src="/images/blog/praezise-bildprompts/19-maker-tool-assemblage.webp" alt="Porträt aus Maker-Werkzeugen" loading="lazy" />
		<span>Werkzeuge</span>
	</a>
	<a class="prompt-result-card" href="/images/blog/praezise-bildprompts/20-aerial-landscape-portrait.webp" target="_blank" rel="noopener noreferrer">
		<img src="/images/blog/praezise-bildprompts/20-aerial-landscape-portrait.webp" alt="Porträt als Luftlandschaft" loading="lazy" />
		<span>Landschaft</span>
	</a>
	<a class="prompt-result-card" href="/images/blog/praezise-bildprompts/21-shadow-only-portrait.webp" target="_blank" rel="noopener noreferrer">
		<img src="/images/blog/praezise-bildprompts/21-shadow-only-portrait.webp" alt="Schattenporträt aus Werkzeugen" loading="lazy" />
		<span>Schatten</span>
	</a>
	<a class="prompt-result-card" href="/images/blog/praezise-bildprompts/22-anamorphic-street-mural.webp" target="_blank" rel="noopener noreferrer">
		<img src="/images/blog/praezise-bildprompts/22-anamorphic-street-mural.webp" alt="Anamorphes Straßenwandbild" loading="lazy" />
		<span>Wandbild</span>
	</a>
	<a class="prompt-result-card" href="/images/blog/praezise-bildprompts/23-living-topiary-bust.webp" target="_blank" rel="noopener noreferrer">
		<img src="/images/blog/praezise-bildprompts/23-living-topiary-bust.webp" alt="Lebende Topiary-Büste" loading="lazy" />
		<span>Topiary</span>
	</a>
	<a class="prompt-result-card" href="/images/blog/praezise-bildprompts/24-ferrofluid-portrait-bust.webp" target="_blank" rel="noopener noreferrer">
		<img src="/images/blog/praezise-bildprompts/24-ferrofluid-portrait-bust.webp" alt="Magnetische Ferrofluid-Büste" loading="lazy" />
		<span>Ferrofluid</span>
	</a>
</div>

### 19. Porträt aus Maker-Werkzeugen

**Stark für:** TRMT- und Maker-Heros, Werkzeugartikel, visuelle Markenmotive.

Die Person besteht komplett aus realen Objekten. Genau diese Regel verhindert, dass Werkzeuge nur als Dekoration um ein normales Gesicht herumliegen.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Lege Hunderte echte Werkstattobjekte auf einer dunklen Fläche so exakt an, dass sie aus frontaler Entfernung das erkennbare Gesicht bilden. Orange Schutzbrillenteile formen die Pilotenbrille, schwarze Kabel, Bohrer und Bits den langen Bart, türkise Werkzeugteile den Hoodie. Es darf keine normale menschliche Haut sichtbar sein; das Gesicht entsteht vollständig aus den realen Objekten. Gerade von oben fotografiert, quadratisch. Keine schwebenden Teile, keine zusätzlichen Gesichter, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 20. Porträt als Luftlandschaft

**Stark für:** überraschende Heros, Umwelt- und Geo-Themen, starke Scroll-Stop-Grafiken.

Das Bild soll zuerst wie eine glaubwürdige Landschaft wirken. Das Gesicht entsteht erst in der Gesamtsicht. Diese Reihenfolge hält die Idee subtiler als eine simple Fotocollage.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Erzeuge eine glaubwürdige senkrechte Luftaufnahme aus Feldern, Hecken, Straßen, Wald und Wasser. Erst aus der Gesamtsicht soll die Landschaft subtil das bekannte Gesicht mit Glatze und langem Bart bilden. Zwei orange Gewächshausdächer deuten die Pilotenbrille an; türkisfarbene Seen formen die Hoodie-Silhouette. Das Bild muss zuerst wie eine reale Landschaft und erst danach wie ein Porträt wirken. Quadratisch. Keine normale menschliche Haut, keine Collagekante, keine Gebäude-Schrift, kein Logo und kein Wasserzeichen.
```

### 21. Schattenporträt aus Gegenständen

**Stark für:** Rätsel- und Reveal-Motive, Maker-Videos, reale Nachbauten.

Eine einzige Lichtquelle und eine plausible Schattenrichtung sind hier wichtiger als ein langer Stilabsatz. Das Motiv könnte man theoretisch sogar physisch nachbauen.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Arrangiere gewöhnliche Maker-Werkzeuge knapp unterhalb des Bildes so, dass eine einzige seitliche Lichtquelle ihren Schatten auf eine warme weiße Wand wirft. Nur der gemeinsame Schatten bildet klar die Silhouette von Glatze, Pilotenbrille, Nase, Lächeln und langem Bart. Einige der realen Werkzeuge dürfen am unteren Rand sichtbar sein, aber kein normales Gesicht. Frontal, quadratisch, physikalisch plausible Schattenrichtung. Keine zweite Lichtquelle, kein gemalter Schatten, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 22. Anamorphes Straßenwandbild

**Stark für:** Street-Art- und Eventideen, spektakuläre Thumbnails, Behind-the-Scenes-Konzepte.

Ein anamorphes Bild funktioniert nur von einem bestimmten Standpunkt. Deshalb nennt der Prompt zwei Wände, den Boden und genau eine Kameraansicht. Sonst entsteht einfach ein normales Mural.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Male ein großes anamorphes geometrisches Wandbild über zwei rechtwinklige Betonwände und den Boden. Aus genau einem klaren Kamerastandpunkt richten sich die verzerrten Fragmente zum erkennbaren Porträt mit Glatze, langem Bart, orange Pilotenbrille und türkisem Hoodie aus. Aus allen anderen Winkeln wären es nur auseinandergezogene Formen. Realistisches Tageslicht, leere urbane Umgebung, 16:9. Keine Zuschauer, keine Wörter, kein Graffiti-Tag, kein Logo und kein Wasserzeichen.
```

### 23. Lebende Topiary-Büste

**Stark für:** Garten- und Naturthemen, surreale Markenposts, saisonale Varianten.

Die Büste besteht vollständig aus Zweigen und Blättern. Brille und Hoodie werden nur mit Gartenmaterial angedeutet. So bleibt die Idee in einer gemeinsamen Materialwelt.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Schneide eine physisch plausible lebende Topiary-Büste aus dichtem dunkelgrünem Laub. Glatze, Gesicht und langer Bart entstehen ausschließlich aus sorgfältig geformten Zweigen und Blättern. Eine orange transparente Gartenrahmen-Brille und ein Ring aus kleinen türkisen Blüten deuten Brille und Hoodie an. Zeige die Büste vollständig auf einem steinernen Gartensockel, Format 4:5. Keine menschliche Haut, keine Plastikpflanze, keine zusätzliche Figur, keine Schrift, kein Logo und kein Wasserzeichen.
```

### 24. Magnetische Ferrofluid-Büste

**Stark für:** KI- und Tech-Heros, futuristische Profilbilder, Video-Keyframes.

Ferrofluid wird schnell zu einem schwarzen Monster oder einer festen Metallskulptur. Oberflächenspannung, Tropfen, Spiegelungen und magnetisch geformte Spitzen halten das Material lesbar.

```prompt
Nutze mein Porträt als feste Identitätsreferenz. Forme eine erkennbare Büste aus glänzend schwarzem Ferrofluid über einem mattschwarzen Becken. Verdeckte Magnetfelder ziehen feine reale Flüssigkeitsspitzen so zusammen, dass Glatze, Gesicht und langer Bart lesbar werden. Ergänze nur orange Glas-Pilotenbrillen und ein sehr zurückhaltendes türkises Kantenlicht. Realistische Oberflächenspannung, Spiegelungen und Tropfen, dunkles Studio, Format 4:5. Keine feste Metallskulptur, kein Monster, keine zusätzliche Person, keine Schrift, kein Logo und kein Wasserzeichen.
```

## Drei Folgeprompts für kontrollierte Änderungen

Wenn das Grundmotiv stimmt, würde ich nicht wieder alles von vorn beschreiben. Ändere genau eine Variable und wiederhole die geschützten Details.

### Nur die Farbpalette ändern

```prompt
Behalte das letzte Bild einschließlich Identität, Bildausschnitt, Material und Komposition unverändert. Ändere ausschließlich die Palette von Türkis/Orange zu Dunkelblau/Kupfer. Keine neuen Gegenstände, keine zusätzliche Schrift und kein neues Gesicht.
```

### Nur das Format für ein Thumbnail ändern

```prompt
Behalte Identität, Materialtechnik und Licht unverändert. Erzeuge nur eine 16:9-Fassung mit der Person im rechten Drittel und 40 Prozent ruhiger negativer Fläche links. Füge dort keinen Text und keine Dekoration ein.
```

### Nur einen konkreten Fehler reparieren

```prompt
Behalte das letzte Ergebnis als feste Referenz. Entferne ausschließlich [FEHLER]. Stelle [GESCHÜTZTES DETAIL] exakt wieder her. Verändere sonst weder Gesicht, Farbe, Material, Bildausschnitt noch Hintergrund.
```

## Was du trotz präzisem Prompt weiter prüfen musst

Mehr Details bedeuten nicht automatisch mehr Qualität. Ein langer Prompt kann sich sogar selbst widersprechen. Deshalb prüfe ich nach jeder Generation dieselben Punkte:

- Ist die Person noch eindeutig dieselbe?
- Wurde das geforderte Material wirklich umgesetzt oder nur als Textur aufgemalt?
- Stimmen Format und Bildaufbau?
- Sind Hände, Augen, Brillenbügel und andere kleine Formen plausibel?
- Hat das Modell Schrift, Logos oder zusätzliche Objekte erfunden?
- Ist der wichtigste Effekt auch in kleiner Darstellung noch lesbar?

Die 24 Bilder stammen aus einem konsistenten Testlauf. **Sie sind Beispiele, keine garantierten Sollausgaben.** Ein anderer Bildgenerator, eine neue Modellversion oder schon ein zweiter Durchlauf kann Komposition und Details verändern.

## Mein Take

Ein-Wort-Prompts bleiben eine verdammt gute Ideenmaschine. Für echte Assets würde ich aber früher in einen konkreten Creative Brief wechseln.

Der entscheidende Schritt ist nicht, möglichst viele Adjektive anzuhäufen. Du musst dem Modell sagen, **was gebaut wird, wie es sich materiell verhält, was gleich bleiben muss und welche naheliegende Fehlinterpretation ausgeschlossen ist**.

Alle 24 Creative Briefs liegen zusammen mit den 87 kurzen Tests in der [TRMT Bildprompt-Library](/tools/bildprompt-library). Dort kannst du nach Einsatz und Kategorie filtern, das echte Ergebnis öffnen und den vollständigen Prompt direkt kopieren. Für offline gibt es zusätzlich das [PDF mit allen 24 präzisen Bildprompts](/downloads/trmt-praezise-bildprompts.pdf).

## Quellen zur Prompt-Struktur

- [OpenAI: GPT Image Prompting Guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-models-prompting-guide)
- [Google: Gemini Image Generation](https://ai.google.dev/gemini-api/docs/generate-content/image-generation)
- [Adobe Firefly: Bilder aus Text](https://helpx.adobe.com/uk/firefly/web/work-with-images/generate-images/generate-images-from-text-descriptions.html)
- [Midjourney: Image Prompts](https://docs.midjourney.com/hc/en-us/articles/32040250122381-Image-Prompts)
- [Ideogram: Character Reference](https://docs.ideogram.ai/using-ideogram/generation-settings/character-reference)
