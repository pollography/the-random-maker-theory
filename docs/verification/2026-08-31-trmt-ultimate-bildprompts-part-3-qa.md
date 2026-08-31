# TRMT Ultimate Bildprompts Part 3: Release-QA

Datum: 2026-08-31  
Ausgangsrevision: `c22dc38`

## Release-Umfang

- Öffentlicher Artikel: `ultimate-bildprompts-part-3`
- 36 neue getestete Prompts mit 36 Ergebnisbildern und kompakten Vorschaubildern
- 32 Bewertungen `PASS`, 4 Bewertungen `TEILWEISE`, 0 Bewertungen `FAIL`
- Öffentliche Library von 87 auf 123 getestete Einträge und von 12 auf 18 Kategorien erweitert
- Detaillierte Einträge kopieren den vollständigen getesteten Prompt
- Bestehendes Kurzprompt-Cheat-Sheet bleibt bei 87 Einträgen auf 6 Seiten
- Neuer Part-3-Guide enthält 36 vollständige Prompts auf 12 Seiten

## Automatisierte Prüfungen

- Node-Testpaket nach Integration des aktuellen `origin/main`: 45 Tests, davon 45 bestanden
- Python-PDF-Paket: 9 Tests, davon 9 bestanden
- Artikelspezifisch: 36 Prompt-Blöcke, 36 eindeutige Bilder, alle Hero-, Quellen-, Übersichts- und Download-Dateien vorhanden
- Library-spezifisch: 123 öffentliche Tests, 18 Kategorien, keine doppelten IDs oder Befehle, keine privaten Rechercheideen veröffentlicht
- PDF-Textprüfung: 87 Kurzbefehle beziehungsweise 36 Detailbefehle jeweils genau einmal; keine Rechercheideen enthalten

## PDF-QA

- `trmt-bildprompt-cheatsheet.pdf`: 6 Seiten, 8.053.910 Byte
- `trmt-ultimate-bildprompts-part-3.pdf`: 12 Seiten, 3.286.913 Byte
- Alle 18 PDF-Seiten mit Poppler als PNG gerendert
- Part-3-Seiten 1, 6 und 12 sowie Kurzprompt-Seite 1 visuell geprüft: keine Überlagerung, kein abgeschnittener Prompt, Bilder proportional

## Browser-QA

- Artikel Desktop: richtiger Titel, 36 kopierbare Prompt-Blöcke, 40 Artikelbilder, 0 defekte Artikelbilder, kein horizontaler Überlauf
- Artikel Mobil: 375 Pixel Breite, 36 dynamisch erzeugte Copy-Buttons, 0 defekte Artikelbilder, kein horizontaler Überlauf
- Library Desktop: 123 Karten, 18 Kategorien plus Gesamtfilter, zwei PDF-Downloads, 0 defekte geladene Vorschaubilder
- Suche nach `hologram` und nach Text aus dem vollständigen Prompt liefert jeweils genau einen Treffer
- Kategorie `Maker & Tech` liefert genau sechs Treffer
- Copy-Test kopiert den vollständigen 218 Zeichen langen Hologramm-Prompt und nicht den Slash-Merknamen
- Library Mobil: mobile Filter sichtbar, Desktop-Sidebar verborgen, zwei Downloads vorhanden, kein horizontaler Überlauf
- Browser-Konsole: 0 Warnungen und 0 Fehler

## Build- und Typstatus

- Vite transformiert 353 SSR- und 320 Client-Module und erzeugt den vollständigen Produktions-Build einschließlich Artikel und Library.
- Der lokale Windows-Lauf endet erst beim bekannten Adapter-Schritt mit `EPERM` beim Erzeugen eines Vercel-Symlinks. Das ist kein Compile- oder Inhaltsfehler.
- `svelte-check` meldet weiterhin 78 Fehler und 9 Warnungen in 10 bereits vorhandenen, nicht geänderten Altdateien.
- In sämtlichen durch diesen Release geänderten Svelte- und JavaScript-Dateien: 0 neue `svelte-check`-Diagnosen.

## Schutzbereiche

- Die parallele unveröffentlichte 24-Prompt-Arbeit in `trmt-specific-prompts-20260831` wurde nicht verändert oder übernommen.
- Die ungetrackten Verzeichnisse `.superpowers/` und der vorhandene Part-2-Plan wurden nicht verändert und werden nicht veröffentlicht.
