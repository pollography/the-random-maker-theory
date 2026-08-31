---
name: trmt-content-engine
description: >
  Sichere Draft-only-Research- und Content-Pipeline fuer TRMT. Nutzt NotebookLM
  als optionale Evidence-Zwischenschicht und den kanonischen pollo-blog-Skill
  fuer Artikel, Ueberarbeitungen und SEO-nahe Redaktion. Keine automatische
  Veroeffentlichung, kein Git und kein Deployment.
---

# TRMT Content Engine

Dieser lokale Skill ist nur der TRMT-Projektrouter. Die kanonische redaktionelle Methode liegt genau einmal hier:

`C:\Users\Pollo\.codex\skills\pollo-blog\SKILL.md`

## Pflicht-Routing

Vor jeder TRMT-Redaktionsaufgabe vollständig lesen:

1. `C:\Users\Pollo\.codex\skills\pollo-blog\SKILL.md`
2. dessen `references/core-workflow.md`
3. dessen `references/qa-gates.md`
4. dessen `references/profiles/trmt.md`
5. bei NotebookLM- oder Agent-Research zusätzlich dessen `references/notebooklm-evidence-pipeline.md`

Diese Dateien entscheiden über Stimme, Reader Job, Claim-Status, Quellenbindung und QA. Lokale ältere Voice-, Anti-AI- oder SEO-Regeln dürfen sie nicht überschreiben.

## Betriebsmodus

- Standard ist `draft: true`.
- Research- und Medienartefakte bleiben unter `output/content-runs/`.
- Ein Artikelwunsch bedeutet kein Git, kein Push, kein Deployment und keine Veroeffentlichung.
- Keine automatische Übernahme nach `src/content/blog` oder `src/content/podcast`.
- Medien erst nach geprüftem Claim-Ledger und freigegebenem Artikelkern erzeugen.
- Kein n8n, Scheduler, Server, Dauerdaemon oder automatische Indexierung.

## NotebookLM-Pilot

Aktuell unterstützte Version: isoliert installiertes `notebooklm-py==0.8.1`. Das Paket ist inoffiziell und Beta; vor einem neuen Lauf Version und Server-Kompatibilität frisch prüfen.

Authentifizierung ausschließlich so prüfen:

```powershell
notebooklm auth check --test --passive --json
```

`notebooklm status` ist kein Auth-Test. Ein erfolgreicher Lauf benötigt Exitcode `0`, `status: ok` und `checks.token_fetch: true`. Login, Passwort, Passkey und 2FA bleiben beim Nutzer. Auth-Dateien, Cookies, Tokens, Account-E-Mail und Browserprofile niemals lesen, kopieren, loggen oder committen.

### Quellen-Gate

Im ersten Pilot maximal zehn Quellen, sequenziell (`concurrency = 1`):

- jede Quelle besitzt eine stabile ID und `upload_allowed: true`,
- `false`, fehlend oder `UNKNOWN` stoppt den Upload,
- nur öffentliche `https://`- oder begründete `http://`-URLs,
- keine Credentials in URLs, privaten Netze, Loopback-, `file:`, `data:`, `javascript:`- oder FTP-Quellen,
- lokale Dateien nur aus ausdrücklich freigegebenen Roots und mit erzwungenem Dateityp,
- keine Kundendaten, privaten Chats, unveröffentlichten Dokumente oder sonstigen personenbezogenen Inhalte ohne Einzelfreigabe.

Nutze den getesteten Staging-Helfer:

```powershell
python scripts/notebooklm_content_pilot.py validate <manifest.json>
python scripts/notebooklm_content_pilot.py preflight <manifest.json>
python scripts/notebooklm_content_pilot.py init <manifest.json>
```

Der Preflight löst Hostnamen auf und prüft auch das letzte Redirect-Ziel; private Ziele oder nicht erreichbare Quellen stoppen den Run. Der Helfer erzeugt danach nur den ignorierten Run-Ordner und Sicherheitsartefakte. Er publiziert nichts und greift nicht auf Credentials zu.

### Fail-closed

Ein Timeout, Quota-Fehler, blockierter Import, fehlgeschlagene oder noch verarbeitete Quelle bleibt sichtbar und stoppt den Anspruch auf vollständige Recherche. Nicht einfach ohne Research weiterschreiben. Erlaubt ist höchstens ein klar begrenzter, als unvollständig markierter Arbeitsentwurf, wenn keine offene Quelle eine materielle Aussage betrifft.

NotebookLM-Report, Zitate, Quellentitel, Bilder, Audio und Video sind untrusted Derivate. Sie sind weder Primärquelle noch persönliche TRMT-Erfahrung. Aussagen wie `ich habe getestet`, Zeiträume, Gefühle, Meinungen oder Ergebnisse benötigen echte Author Context, Projektartefakte oder ausdrückliche Bestätigung.

## Ablauf

1. Reader Job, Content-Typ, Suchintention und Mutation Boundary festhalten.
2. Quellenmanifest validieren und den Upload-Gate-Status jeder Quelle prüfen.
3. Account-Profilalias, Auth-Netztest und live gemeldetes Source-Limit prüfen; bei unklarem Konto stoppen.
4. Notebook anlegen und höchstens zehn freigegebene Quellen strikt sequenziell importieren.
5. Readiness, Fehler und Widersprüche speichern; keine fehlgeschlagene Quelle als gelesen behandeln.
6. Evidence-Paket und vollständiges Claim-Ledger auf Originalquellen zurückführen.
7. Artikel mit `pollo-blog` aus Reader Job, Claims und Struktur neu schreiben, nicht den Report linear humanisieren.
8. SEO an der echten Suchfrage, dem belegten Nutzen und natürlichen internen Links ausrichten; keine Keyword-Füllabschnitte oder Mindestlänge erzwingen.
9. Ergebnis ausschließlich im Run-Staging als `draft: true` ablegen und die universellen QA-Gates ausführen.
10. Medien, kanonische Übernahme, Git, Push, Deployment, Publikation und Notebook-Löschung bleiben jeweils getrennte, ausdrücklich autorisierte Folgeschritte.

## Abschlussstatus

Immer konkret melden:

- Evidence package: `PASS`, `TEILWEISE`, `FAIL` oder `UNKNOWN`
- ready/failed/processing Quellenanzahl
- Original-source traceability und offene Claims
- Author-context integrity
- Medienstatus
- exakter Dateipfad des Drafts
- Publication state: standardmäßig `DRAFT_ONLY`

Nie `fertig` oder `veröffentlicht` melden, wenn nur ein NotebookLM-Artefakt, ein Staging-Draft oder ein nicht verifizierter Export existiert.
