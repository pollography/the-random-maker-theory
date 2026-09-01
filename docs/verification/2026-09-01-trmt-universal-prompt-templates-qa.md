# TRMT universelle Prompt-Vorlagen – QA vom 01.09.2026

## Ergebnis

Die 60 ausführlichen Copy-Paste-Prompts aus den beiden Artikeln und der Bildprompt-Library sind jetzt universelle Vorlagen. Jeder Prompt enthält mindestens einen klar markierten `[[PLATZHALTER]]`, übernimmt die übrigen erkennbaren Merkmale aus dem hochgeladenen Referenzbild und beschreibt nicht mehr das ursprüngliche Testporträt oder die getestete Kamera.

Die Ergebnisbilder und die redaktionellen Testbeschreibungen bleiben bewusst unverändert. Sie dokumentieren weiterhin ehrlich, mit welchem Ausgangsbild die Richtungen ausprobiert wurden. Universalisiert wurden die Texte, die Leser kopieren und selbst verwenden.

## Automatische Prüfungen

- `node --test`: PASS, 66 von 66 Tests.
- PDF-Generator-Tests: PASS, 19 von 19 Tests.
- Universelle Vorlagen: PASS, 60 von 60 ausführlichen Prompts enthalten `[[...]]`; 0 verbotene hart codierte Merkmale in den Copy-Paste-Texten.
- Artikelabgleich: PASS, 36 beziehungsweise 24 kanonische Prompt-Blöcke stimmen bytegenau mit der Library-Datenquelle überein; auch die drei zusätzlichen Folgeprompts enthalten Platzhalter.
- `git diff --check`: PASS; nur die bestehende Windows-Zeilenenden-Warnung wurde ausgegeben.
- `npm run check`: bekannter Projektstatus mit 78 Fehlern und 9 Warnungen in 10 Altdateien; 0 Diagnosen in den für dieses Release geänderten Dateien.
- `npm run build`: Client- und SSR-Build PASS; der abschließende lokale Windows-Adapter-Schritt bleibt mit dem bekannten `EPERM` beim Erzeugen eines Vercel-Symlinks stehen.

## PDF-Prüfung

- `trmt-ultimate-bildprompts-part-3.pdf`: 18 Seiten, A4 quer, 3.302.497 Byte, SHA-256 `179009BAE7764E0BE1C0D33EEAB1FCCF919301F4B18506E4D497667C797EFB0B`.
- `trmt-praezise-bildprompts.pdf`: 13 Seiten, A4 quer, 2.318.786 Byte, SHA-256 `6D6DDEEC313C91D21446149462A18557E05B4E1C553E6F0A93D9BAC722AEF404`.
- Öffentliche Dateien und QA-Kopien sind jeweils byteidentisch.
- Alle 31 Seiten wurden als Rasterbilder gerendert und visuell geprüft: keine abgeschnittenen Texte, keine Überlagerungen, keine fehlenden Seiten.
- Part 3 zeigt jetzt zwei statt drei Prompt-Karten pro Seite und verwendet mindestens 10,5 pt für den Prompttext.
- Beide PDFs erklären vor den Vorlagen, dass `[[PLATZHALTER]]` ersetzt werden müssen.

## Browserprüfung

Geprüft im Codex In-App-Browser gegen die lokale SvelteKit-Seite:

- Bildprompt-Library Desktop: Platzhalter-Hinweis, neue PDF-Beschriftung `Größere Schrift · 18 Seiten`, Suche und Detailansicht sichtbar; keine Browser-Warnungen oder -Fehler.
- Bildprompt-Library mobil bei 390 × 844: kein horizontaler Überlauf; Suche nach `/behindTheScenes`, Aufklappen und Kopieren erfolgreich.
- Artikel `praezise-bildprompts-weniger-zufall` mobil: Platzhalter-Erklärung sichtbar, erster Prompt kopierbar, Zwischenablage enthält `[[PERSON IM REFERENZBILD]]`, keine Altmerkmale, kein horizontaler Überlauf.
- Artikel `ultimate-bildprompts-part-3` mobil: Platzhalter-Erklärung sichtbar, erster Prompt kopierbar, Zwischenablage enthält `[[PERSON IN THE REFERENCE IMAGE]]`, keine Altmerkmale, kein horizontaler Überlauf.

## Redaktionelle Abnahme

- Die Artikel trennen nun ausdrücklich zwischen dokumentierten Testergebnissen und universellen Kopiervorlagen.
- Die Vorlagen sind ohne Kenntnis des ursprünglichen Testbilds verständlich und direkt mit einem eigenen Upload verwendbar.
- Variable Wünsche wie Person, Produkt, Farben, Textinhalt, Ort oder Seitenverhältnis sind mit doppelten eckigen Klammern markiert.
- Feste Stil- und Kompositionsentscheidungen bleiben erhalten, damit die ausführliche Variante weiterhin eine gezieltere Version des jeweiligen Kurzprompts ist.
