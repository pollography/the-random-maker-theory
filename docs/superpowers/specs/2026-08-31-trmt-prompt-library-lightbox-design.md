# TRMT Prompt-Library: Sticker-Darstellung und Lightbox

## Ausgangslage

Die beiden Ergebnisse `/sticker` und `/stickerPack` besitzen einen fest eingebrannten weißen Hintergrund. In der hellen Kartenansicht sind die weißen Stickerkonturen deshalb nur schwer zu erkennen. Ein Klick auf ein Vorschaubild öffnet aktuell die Bilddatei in einem neuen Browser-Tab.

## Freigegebene Lösung

- Die beiden vorhandenen WebP-Dateien bleiben unverändert und bilden weiterhin die dokumentierten Originalergebnisse ab.
- Für die Prompt-Library entstehen zwei separate transparente WebP-Darstellungsvarianten. Die KI-Freistellung liefert nur die Alpha-Maske; die sichtbaren RGB-Pixel stammen unverändert aus den Originalen. Nur diese beiden Karten verwenden die Varianten.
- Transparente Varianten liegen auf einer dezenten, kontrastreichen Transparenzfläche. Alle anderen Karten behalten ihre bisherige Bilddarstellung.
- Jedes Vorschaubild wird zu einem echten Button und öffnet eine gemeinsame In-Page-Lightbox.
- Die Lightbox zeigt das Bild groß, ergänzt Titel und Prompt-Kürzel und bleibt auf derselben Seite.

## Interaktion und Barrierefreiheit

- Ein natives `dialog` liefert Modal-Semantik und begrenzt den Tastaturfokus.
- Schließen funktioniert über den sichtbaren Button, `Escape` und einen Klick außerhalb des Bildfensters.
- Während die Lightbox geöffnet ist, scrollt die Seite im Hintergrund nicht.
- Nach dem Schließen kehrt der Fokus zum auslösenden Vorschaubild zurück.
- Der Schließen-Button erhält ein gezeichnetes SVG-Icon und einen eindeutigen zugänglichen Namen.
- Reduzierte Bewegung deaktiviert die leichte Einblendanimation.

## Grenzen

- Keine bestehenden Originalbilder werden ersetzt oder gelöscht.
- Keine anderen Prompt-Ergebnisse werden visuell verändert.
- Die bestehende Such-, Filter-, Copy- und Artikelnavigation bleibt unverändert.

## Abnahme

- Genau die beiden Sticker-Datensätze referenzieren eine zusätzliche transparente Darstellungsdatei.
- Beide Dateien besitzen einen echten Alpha-Kanal.
- Kein Vorschaubild verwendet mehr `target="_blank"`.
- Lightbox, Schließen-Wege, Fokus-Rückgabe und Scroll-Sperre funktionieren per Maus und Tastatur.
- Desktop- und Mobilansicht zeigen weder Überlauf noch abgeschnittene Bedienelemente.
