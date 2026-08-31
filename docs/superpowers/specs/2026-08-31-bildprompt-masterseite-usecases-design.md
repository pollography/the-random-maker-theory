# Bildprompt-Masterseite: Vorschauen, echte Use Cases und kompakte Prompt-Boxen

Datum: 2026-08-31

Status: Inhaltliche Richtung vom Nutzer bestätigt

## Ziel

Die Masterseite `50 Bildprompts. Echt getestet.` soll bereits im ersten Lesedrittel zeigen, welche Bandbreite aus den Mini-Prompts entsteht. Danach soll sie an drei echten Endergebnissen beweisen, wie aus einem Raster oder Referenzbild ein verwendbares Asset wird.

Nach der Überarbeitung versteht ein Leser ohne Öffnen der sechs Detailartikel:

- welche sechs visuellen Richtungen die Serie abdeckt,
- wie aus einem kurzen Prompt ein fertiger Anwendungsfall entsteht,
- welchen Folgeprompt er dafür kopieren kann,
- und dass Mini-Prompts nur der Start einer Bild-Pipeline sind.

## Gewählte Darstellung

### 1. Kompakter Überblick direkt nach dem Ausgangsbild

Nach dem Ausgangsporträt folgt ein responsives Raster mit sechs vorhandenen, bereits geprüften Ergebnissen:

1. Menschen und Posen: `04-action-poses.webp`
2. Avatare und Reaktionen: `12-sticker-pack.webp`
3. Alter und Transformation: `19-multiverse.webp`
4. Technik und Innenansichten: `extra-product-exploded-view.webp`
5. Infografiken und Wissen: `39-visual-guide.webp`
6. Welten und Filmszenen: `50-movie-scene.webp`

Die Beschriftungen lauten `Posen`, `Avatare`, `Transformation`, `Technik`, `Wissen` und `Filmszenen`. Jede Karte verlinkt auf den passenden Serienteil. Ab 64 Rem zeigt das Raster drei Spalten, zwischen 42 und 64 Rem zwei Spalten und darunter eine Spalte.

### 2. Drei direkt angewendete Use Cases

Der bisher überwiegend beschreibende Abschnitt wird in `Vom Mini-Prompt zum fertigen Asset` umgebaut.

#### YouTube-Thumbnail

- Ausgang: die Zeigegeste aus `04-action-poses.webp`.
- Ergebnis: fertiges 16:9-Thumbnail mit klarer Person, starkem Kontrast und der exakten Hook-Zeile `1 FOTO. 1 WORT.`.
- Zweck: zeigen, dass das Raster nur die Motivwahl liefert und danach Komposition, Freiraum und Typografie folgen.
- Artikelinhalt: Ausgangsergebnis, fertiges Asset, genauer Folgeprompt und kurzer Hinweis auf den Layout-Schritt.

#### Profilbild

- Ausgang: die frontale Variante aus `15-avatar-pack.webp`.
- Ergebnis: quadratisches Profilbild mit sauberem Rand, ruhigem Hintergrund und erhaltener Identität.
- Zweck: zeigen, wie aus einem Mehrfachraster ein einzelnes direkt nutzbares Bild wird.
- Artikelinhalt: Ausgangsergebnis, fertiges Asset und genauer Folgeprompt.

#### Personenreferenz für KI-Video

- Ausgang: Turnaround, Posepack und Emotionsraster.
- Ergebnis: sauberes 16:9-Referenzboard aus vorhandenen Porträt-Ergebnissen.
- Zweck: zeigen, welche Ansichten und Merkmale einem Videomodell als konsistente Referenz übergeben werden können.
- Artikelinhalt: drei Ausgangsquellen, fertiges Referenzboard, genauer Folgeprompt und ehrlicher Hinweis, dass das Videomodell selbst Referenzbilder unterstützen muss.

Die beiden bisherigen Ideen `Modeberatung` und `Technische Produktgrafik` bleiben als kurze weitere Anwendungen erhalten. Sie bekommen in diesem Schritt kein zusätzliches Endergebnis.

## Bildproduktion

- Alle neuen Motive verwenden ausschließlich das vorhandene Porträt und die bereits erzeugten Serienbilder als Referenzen.
- Das Thumbnail und das Profilbild werden identitätserhaltend aus den passenden Ergebnissen abgeleitet.
- Das KI-Video-Referenzboard wird deterministisch aus `01-turnaround.webp`, `03-pose-pack.webp` und `06-emotion-grid.webp` zusammengesetzt, damit keine neue Gesichtsvariante erfunden wird.
- Neue Dateien werden verlustarm als WebP im bestehenden Blog-Bildordner gespeichert.
- Keine Logos, Wasserzeichen oder fremden Marken.
- Die Bilder werden visuell auf Gesicht, Hände, Schrift, Bildränder und unerwünschte Artefakte geprüft.

Vorgesehene Dateien:

- `static/images/blog/ki-bildprompts/usecase-youtube-thumbnail.webp`
- `static/images/blog/ki-bildprompts/usecase-profilbild.webp`
- `static/images/blog/ki-bildprompts/usecase-ki-video-referenz.webp`

## Kompaktere Prompt-Boxen

Die bestehende globale Prompt-Komponente in `BlogLayout.svelte` bleibt funktional unverändert, wird aber visuell verdichtet:

- Außenabstand und Schatten reduzieren,
- Toolbar-Padding und Abstände verkleinern,
- Buttons auf 32 Pixel Mindesthöhe und 0,72 Rem Schrift bringen,
- Code-Padding und Code-Schrift leicht reduzieren,
- den aktuell dauerhaft reservierten leeren Statusbereich entfernen,
- Status-Padding nur anzeigen, wenn eine Meldung vorhanden ist,
- mobile Buttons kompakt umbrechen, ohne horizontalen Overflow.

Kopieren, ChatGPT, Claude Web und Claude App bleiben erhalten. Fokusmarkierung, Tastaturbedienung und Live-Status dürfen durch die Verdichtung nicht verloren gehen.

## Betroffene Dateien

- `src/content/blog/50-bildprompts-echt-getestet.md`
- `src/lib/components/layout/BlogLayout.svelte`
- drei neue WebP-Dateien unter `static/images/blog/ki-bildprompts/`
- vorhandene Prompt-Tests und fokussierte Browser-Assertions für die kompakte Darstellung

Titel, Slug, Datum, Veröffentlichungsstatus, bestehendes Hero-Bild und die sechs Detailartikel bleiben unverändert.

## Verifikation

### Inhalt und Assets

- alle neun neuen oder wiederverwendeten Bildreferenzen existieren,
- die sechs Übersichtskarten verlinken korrekt,
- alle drei Folgeprompts werden mit funktionierenden Aktionen erweitert,
- keine internen Namen, Videoquellen, Logos oder Em-Dashes gelangen in den Text.

### Funktion

- bestehende `prompt-actions`-Tests bleiben grün,
- Kopierbutton liefert live `Prompt kopiert.`,
- ChatGPT- und Claude-Ziele bleiben unverändert,
- Desktop und Mobile haben keinen horizontalen Overflow.

### Visuell

- Übersicht vermittelt innerhalb weniger Sekunden die sechs Richtungen,
- drei Endergebnisse sind ohne Erklärung als Thumbnail, Profilbild und Referenzboard erkennbar,
- Prompt-Boxen wirken deutlich kleiner, bleiben aber lesbar und bedienbar,
- Produktionsbuild und anschließend alle betroffenen Live-URLs sind erfolgreich.

## Veröffentlichung

Die Änderung wird aus dem isolierten Release-Worktree auf einem eigenen Branch umgesetzt. Nach lokaler Inhalts-, Funktions- und Browserprüfung wird ausschließlich der beschriebene Scope auf `main` veröffentlicht und anschließend auf `therandommakertheory.com` erneut geprüft.
