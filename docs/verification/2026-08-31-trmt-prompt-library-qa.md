# TRMT Bildprompt-Library – QA vom 31.08.2026

## Ergebnis

Die neue öffentliche Feature-Seite unter `/tools/bildprompt-library` ist lokal vollständig umgesetzt und geprüft. Sie verwendet eine zentrale Datenquelle für 87 getestete Prompts, hält 17 recherchierte Ideen intern und bietet Suche, Kategorien, echte Beispielbilder, Use Cases, Artikelverweise, Copy-Buttons und ein sechseitiges PDF-Cheat-Sheet.

Ein Deployment war nicht Teil dieser Umsetzung.

## Automatische Prüfungen

- `node --test ...`: PASS, 20 von 20 Tests.
- `python -m unittest scripts.test_generate_prompt_cheatsheet`: PASS, 6 von 6 Tests.
- PDF-Struktur: PASS, 6 Seiten im A4-Querformat.
- PDF-Inhalt: PASS, alle 87 getesteten Slash-Befehle exakt einmal als eigene Textzeile; 0 interne Ideen im PDF.
- PDF-Dateigröße: 8.053.910 Byte.
- PDF-SHA-256: `F29ED9CDEC2E7333D7512719326C90789C1F2DACC2DB14996A1C131927D0099B`.
- `npm run check`: bestehender Projektstatus weiterhin FAIL mit 79 Fehlern und 9 Warnungen in 11 Altdateien; 0 Diagnosen in den neuen oder für die Library angepassten Dateien.
- `npm run build`: Svelte/Vite-Transformation und Ausgabe der neuen Route PASS; abschließender Windows-Adapter-Schritt FAIL wegen `EPERM` beim Erzeugen eines Vercel-Symlinks. Die neue Route wurde davor erfolgreich als Server-Entry gebaut.

## Browserprüfung

Geprüft im Codex In-App-Browser gegen `http://127.0.0.1:5175/tools/bildprompt-library`:

- Desktop 1280 × 720: 87 Karten, 0 horizontaler Überlauf, keine sichtbaren defekten Bilder, keine Browser-Warnungen oder -Fehler.
- Mobil 390 × 844: 87 Karten, 0 horizontaler Überlauf, einspaltige Karten, horizontale Kategoriechips und sichtbare mobile Navigation.
- Suche `video`: 11 Treffer.
- Suche `video` plus Kategorie `Menschen & Posen`: 4 Treffer.
- Copy-Button: sichtbarer Status `Kopiert`; Zwischenablage enthielt `/posepack` beziehungsweise `/turnaround`.
- Leersuche: 0 Karten und sichtbarer Reset; Reset stellte alle 87 Karten wieder her.
- Bild-, Artikel- und PDF-Links: korrekte Ziele im DOM.
- Theme-Umschalter: Wechsel `dark` zu `light` erfolgreich.
- Tastaturfokus: Suchfeld war per Tastatur fokussiert und erfüllte `:focus-visible`.
- SEO: Titel und Canonical-URL im Browser korrekt.

## Visueller Abgleich mit der bestätigten Richtung C

Verglichen wurden die bestätigte Konzeptansicht aus `.superpowers/brainstorm/1340-1788160395/content/library-direction.html` und die finale Desktopansicht. Beide wurden in nativer 1280 × 720 Ansicht erfasst und mit `view_image` geprüft.

Fidelity Ledger:

1. Zentrale dunkle Arbeitsfläche mit warmem TRMT-Honey und Teal-Akzenten: umgesetzt.
2. Schnelle visuelle Übersicht mit echten Ergebnissen statt abstrakter Platzhalter: umgesetzt und gegenüber dem Konzept ausgebaut.
3. Such-/Filter-Workbench mit dauerhaft sichtbaren Kategorien: umgesetzt; Desktop als Sidebar, mobil als horizontale Chips.
4. Direkter Copy-Workflow pro Prompt: umgesetzt, inklusive Statusmeldung und Clipboard-Fallback aus der bestehenden Utility.
5. Öffentlicher Cheat-Sheet-Zugang aus derselben Datenquelle: umgesetzt als prominenter Download im Hero.
6. Kompakte Karten mit Prompt, Ergebnis und Nutzungskontext: umgesetzt; ergänzt um drei konkrete Use Cases und den passenden Vertiefungsartikel.
7. Responsive Übertragung der Richtung: umgesetzt und nach visueller Prüfung mit einer kleineren mobilen H1 korrigiert.

## Copy-Abgleich und bewusste Abweichungen

Die abgestimmte Above-the-fold-Copy wurde unverändert umgesetzt: `Bildprompt-Library`, die kurze Nutzenbeschreibung, `PDF-Cheat-Sheet`, `6 Seiten · kostenlos` und die Suchaufforderung.

Bewusste Abweichungen vom frühen Richtungs-Mockup:

- Das Mockup war eine Richtungsentscheidung mit drei Varianten, kein pixelgenaues Seitendesign.
- Die Produktionsseite verwendet die vorhandene TRMT-Navigation, Themes, Typografie und den Footer.
- Die früher skizzierte interne Verwaltungsansicht ist entsprechend der späteren Entscheidung nicht Teil der öffentlichen Seite; gepflegt wird ausschließlich die kanonische JSON-Datei im Repository.
- Die reale Seite zeigt alle 87 getesteten Ergebnisse und echte Use Cases; das Mockup zeigte nur wenige repräsentative Karten.

Offene technische Altlasten außerhalb des Features sind die bereits vorhandenen `svelte-check`-Diagnosen und die Windows-Symlink-Beschränkung des Vercel-Adapters.
