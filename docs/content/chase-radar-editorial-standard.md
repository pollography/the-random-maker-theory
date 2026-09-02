# TRMT Chase-Radar: Redaktions- und Scan-Standard

## Zweck

Chase AI dient als schneller Themenhinweis. Ein Treffer startet eine unabhängige TRMT-Recherche. Er ist niemals Vorlage für Übersetzung, enge Paraphrase oder die Übernahme persönlicher Tests.

## Remote-Trigger

- GitHub Actions liest den offiziellen YouTube-Atom-Feed viermal pro Stunde.
- Shorts werden anhand der vom Feed gelieferten `/shorts/`-URL verworfen.
- Der Blog-RSS-Feed wird im selben Lauf geprüft.
- Jeder neue Treffer erhält einen stabilen Quellschlüssel und wird als GitHub-Issue gespeichert.
- Ein später erscheinender, ähnlich betitelter Blogbeitrag ergänzt das vorhandene Video-Issue.
- Fehler lassen den Lauf fehlschlagen. Es gibt keinen stillen Leer-Erfolg und keinen lokalen Dauerprozess.

## Recherchevertrag

1. Metadaten und öffentliche Quelle inventarisieren.
2. Gesprochenes und Gezeigtes getrennt erfassen.
3. Jede veröffentlichte Tatsachenbehauptung an einer aktuellen Primärquelle prüfen.
4. Fremde Tests selbst reproduzieren, klar als fremde Aussage kennzeichnen oder streichen.
5. Titel, Hook, Beispiele, Reihenfolge und Schluss aus dem Leserproblem neu entwickeln.
6. Kein öffentliches `ich habe getestet`, solange kein eigenes Testprotokoll existiert.
7. Entwurf und Quellenprotokoll zuerst. Veröffentlichung erst nach Fakten-, Rechte-, Ähnlichkeits- und Darstellungsprüfung.

## Scan-Grammatik für KI-News und Erklärstücke

- H1 benennt Gegenstand und konkrete Entscheidung.
- Die ersten drei Sätze liefern Relevanz, Kernantwort und Nutzen.
- Eine kompakte Kurzfassung enthält drei bis fünf belastbare Punkte.
- H2-Überschriften formulieren echte Leserfragen.
- Fettung markiert Begriffe, Zahlen und Abschnittsergebnisse, niemals ganze Textwände.
- Listen beginnen mit einem fett gesetzten Navigationsbegriff.
- `rf-takeaway` beantwortet nach komplexen Abschnitten: Was heißt das praktisch?
- `evidence-strip` zeigt höchstens drei direkt vergleichbare Kerndaten.
- `benchmark-bars` zeigt nur Werte mit gleicher Metrik und sichtbarer Quellenbegrenzung.
- Tabellen werden genutzt, wenn ein Leser damit schneller entscheiden kann.
- Jeder visuelle Block muss auch ohne Farbe und auf 360 Pixel Breite verständlich bleiben.

## Automatisierungsgrenze

Automatisch sind Erkennung, Deduplizierung, Pairing und die Anlage des Rechercheauftrags. Inhaltliche Recherche und Entwurf können agentisch vorbereitet werden. Veröffentlichung bleibt fail-closed, weil Rechteabstand, Primärquellenqualität und ehrliche Eigenerfahrung qualitative Prüfungen benötigen.
