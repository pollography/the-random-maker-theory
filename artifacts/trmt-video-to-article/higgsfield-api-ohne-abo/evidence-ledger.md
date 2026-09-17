# Higgsfield API ohne Abo: KI-Bilder und Videos nur bei Nutzung bezahlen — Evidence ledger

| ID | Claim or step | Evidence state | Source locator | Editorial decision | Notes |
|---|---|---|---|---|---|
| E-001 | Higgsfield hat am 16. September 2026 eine öffentliche API angekündigt. | VERIFIED | SRC-003, SRC-009 | KEEP | Datumsangabe aus offizieller Hilfe/Launch-Beitrag. |
| E-002 | API und Website-Abo sind getrennte Produkte. | VERIFIED | SRC-003, SRC-005 | KEEP | Guthaben und Abo-Credits sind nicht austauschbar. |
| E-003 | Für die API ist kein Monatsabo nötig; sie nutzt ein vorausbezahltes USD-Guthaben. | VERIFIED | SRC-003 | KEEP | Kernnachricht. |
| E-004 | Die kleinste Aufladung beträgt 5 US-Dollar. | VERIFIED | SRC-003 | KEEP | Aktueller offizieller Grenzwert; vor Nutzung erneut prüfbar. |
| E-005 | Bei leerem Guthaben werden neue Aufträge angehalten; ein negatives Guthaben ist nicht möglich. | VERIFIED | SRC-003 | KEEP | Auto-Aufladung ist optional. |
| E-006 | Der Katalog umfasst mehr als 50 aktuelle Bild- und Videomodelle. | VERIFIED | SRC-003, SRC-004 | KEEP | Keine vergängliche exakte Modellliste in den Artikel. |
| E-007 | Videos werden je Sekunde, Bilder je Bild abgerechnet; Konfigurationen können den Preis ändern. | VERIFIED | SRC-003 | KEEP | Allgemeine Abrechnungslogik. |
| E-008 | Ein Estimate-Endpunkt kann Kosten vor dem Start schätzen. | VERIFIED | SRC-003, SRC-006 | KEEP | Für Anfänger als Budgetbremse erklärt. |
| E-009 | Fehlgeschlagene Generierungen werden nicht berechnet beziehungsweise zurückerstattet. | VERIFIED | SRC-003 | KEEP | Offizielle Abrechnungsregel. |
| E-010 | Ergebnisdateien bleiben mindestens sieben Tage abrufbar. | VERIFIED | SRC-003 | KEEP | Daher lokal speichern. |
| E-011 | Der normale Ablauf ist asynchron: Auftrag senden, Status abfragen oder Webhook nutzen. | VERIFIED | SRC-003, SRC-006 | KEEP | Fachbegriffe beim ersten Auftreten erklärt. |
| E-012 | Ein API-Schlüssel wird nur einmal vollständig angezeigt. | VERIFIED | SRC-003 | KEEP | Sicherheitsrelevant. |
| E-013 | Das offizielle JavaScript-SDK ist für serverseitige Nutzung gedacht; Umgebungsvariablen werden empfohlen. | VERIFIED | SRC-007 | KEEP | Keine Schlüssel im Browser oder Artikelcode. |
| E-014 | MCP/CLI-Skills verwenden Website-Credits; die API verwendet ein getrenntes Guthaben. | VERIFIED | SRC-005 | KEEP | Beseitigt zentrale Anfänger-Verwechslung. |
| E-015 | Ein Creator-Skill spart pauschal Geld und erzeugt einen konkreten 15-Sekunden-Clip unter fünf Dollar. | CREATOR_ONLY | SRC-001, SRC-002 | DROP | Fremder Test, temporäre Preise und fremdes Ergebnis werden nicht übernommen. |
| E-016 | Der im Video gezeigte Skill und dessen Installationsablauf sind der empfohlene Standardweg. | CREATOR_ONLY | SRC-001, SRC-002 | DROP | Nicht als stabiler offizieller Produktweg belegt. |
| E-017 | Vier Bilder plus drei Videos mit je fünf Sekunden ergeben vier Bildpreise plus 15 Videosekunden. | INFERRED | Redaktionelle Rechenhilfe auf Basis von E-007 | KEEP | Fiktives Beispiel, keine Preis- oder Qualitätszusage. |
| E-018 | Qualität und Laufzeit des Schreibtischlampen-Beispiels. | UNKNOWN | Kein eigener bezahlter API-Lauf | DROP | Nicht behauptet. |

## Contradictions

- Die Radarquelle stellt API-Nutzung als mögliche Ersparnis dar. Offizielle Quellen belegen die getrennte Prepaid-Abrechnung, aber keinen allgemeinen Kostenvorteil gegenüber jedem Abo. Der Artikel verspricht deshalb keine Ersparnis.
- Start- und Rabattpreise im Live-Katalog sind zeitabhängig. Der Artikel nennt keine Momentaufnahme als dauerhafte Wahrheit.

## Author-needed slots

- Keine für den Draft. Ein eigener API-Qualitätstest wäre ein separater, kostenpflichtiger und ausdrücklich zu autorisierender Folgeauftrag.
