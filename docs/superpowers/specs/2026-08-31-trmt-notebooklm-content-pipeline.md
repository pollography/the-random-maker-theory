# TRMT NotebookLM Content Pipeline ohne n8n

Status: Sicherheits- und Staging-Pilot umgesetzt; Google-Login und erster Cloud-Run noch offen

## Entscheidung

`notebooklm-py` wird als manuell gestarteter Research- und Media-Assistent eingesetzt. Es schreibt keine fertigen Inhalte direkt in den öffentlichen Content-Ordner, setzt niemals `draft: false` und führt weder Git-, Deployment- noch Suchmaschinen-Aktionen aus.

Die schwere Recherche und Medienerzeugung läuft bei Google. Lokal bleiben ein kleiner Einmalprozess, Text-/JSON-Artefakte und Downloads. n8n, Server, Scheduler und Dauerdaemon sind nicht nötig.

## Verifizierter Stand

- Projekt: [teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py)
- geprüfte Version: `0.8.1`, vom Projekt als Beta beschrieben
- Python: 3.10 bis 3.14 unterstützt; lokal ist Python 3.12 vorhanden
- wichtige Grenze: undokumentierte Google-Endpunkte, Rate Limits und mögliche Response-Änderungen
- Login-Dateien sind wie Kontozugangsdaten zu behandeln und dürfen nie in Repository, Run-Manifest oder Logs gelangen
- Notebook-Limits hängen vom Google-Tarif ab; der konkrete TRMT-Account-Tier ist noch nicht geprüft
- `notebooklm-py==0.8.1` ist isoliert per `uv tool` installiert und der lokale Versions-Readback ist grün
- zwei offizielle interaktive Login-Läufe (gebündeltes Chromium und Chrome) endeten ohne erkannte Anmeldung; es wurde noch kein Auth-Profil gespeichert

Quellen: [Release v0.8.1](https://github.com/teng-lin/notebooklm-py/releases/tag/v0.8.1), [Stability](https://github.com/teng-lin/notebooklm-py/blob/main/docs/stability.md), [Security](https://github.com/teng-lin/notebooklm-py/blob/main/docs/security.md), [Google NotebookLM limits](https://support.google.com/gemininotebook/answer/16215270?hl=en-GB)

## Verantwortungsgrenzen

### Automatisch

- Run-Ordner und Manifeste anlegen
- URLs und Dateien normalisieren, Duplikate erkennen, Hashes bilden
- Quellen in kleinen, begrenzten Batches importieren
- Status mit Timeout und Resume-Zustand abfragen
- Research-, Report- und Media-Artefakte herunterladen
- Dateischemata, Checksums und `draft: true` prüfen
- bei Fehlern stoppen und einen lesbaren Receipt schreiben

Automatik beginnt erst nach einem manuellen Upload-Gate. Jede Quelle erhält `upload_allowed: true|false`. `UNKNOWN` bedeutet immer Stopp. Credentials, Cookies, Tokens, Kundendaten, private Chats sowie personenbezogene oder unveröffentlichte Dokumente werden ohne ausdrückliche Einzelfreigabe nicht in einen Cloud-Dienst übertragen.

Quellen bleiben untrusted Input:

- nur `https://` und bei begründetem Bedarf `http://`; keine `file:`, `data:`, `javascript:`, FTP-, Loopback- oder privaten Netzwerkadressen
- lokale Dateien nur aus explizit freigegebenen Roots
- Python-API oder Argumentlisten, niemals `shell=True` oder zusammengesetzte Command-Strings
- Seitentitel, Quelltext und Modellausgaben sind Daten und niemals auszuführende Anweisungen
- kein experimenteller Fallback-Fetch

### Assistiert

- Kandidaten aus Deep Research sammeln
- Quellen nach Relevanz und Primärquellen-Nähe vorsortieren
- Fragen, mögliche Claims und Widersprüche herausarbeiten
- Research-Report, Strukturvorschlag, Podcast- und Videoentwurf erzeugen
- Visual Brief und Infografikentwurf erzeugen

### Manuell

- Google-Login und Kontoauswahl
- Profilalias, Account-Tier und live gemeldetes Source-Limit bestätigen; bei unklarem Account oder Limit stoppen
- Rechte und Eignung jeder Quelle prüfen
- finale Quellenauswahl und zeitkritische Primärquellenprüfung
- persönliche `ich`-Aussagen bestätigen
- Artikel, Bilder, Podcast und vollständiges Video abnehmen
- Dateien kontrolliert nach `src/content` übernehmen
- `draft: false`, Git, Push, Deployment und Veröffentlichung freigeben
- Notebooks oder fehlerhafte Quellen löschen
- am Run-Ende ausdrücklich entscheiden, ob das Cloud-Notebook behalten oder gelöscht wird; Löschung nur nach Freigabe und anschließendem Readback

## Ablauf

```text
manueller Start
  -> Run-Ordner und Manifest
  -> Account-, Quota- und Upload-Gate
  -> Quellen normalisieren und deduplizieren
  -> Notebook erstellen
  -> kleine Import-Batches mit Receipt
  -> menschliche Quellenfreigabe
  -> Fragen, Widersprüche und Claim-Ledger
  -> menschliche Evidenzfreigabe
  -> pollo-blog Source-bound Lane
  -> pollo-blog Publication Lane
  -> menschliche Artikelfreigabe
  -> Podcast, Video und Visuals aus dem freigegebenen Inhaltskern
  -> vollständige Medienprüfung
  -> Release-Paket
  -> separate Publish-Freigabe
```

Media wird erst nach dem Claim- und Artikel-Freeze erzeugt. So laufen Artikel, Podcast und Video nicht fachlich auseinander und es wird keine Quote für verworfene Rohideen verbraucht.

## Run-Artefakte

Der bereits ignorierte `output/`-Ordner bleibt Staging-Bereich:

```text
output/content-runs/YYYY-MM-DD--slug/
|-- run.json
|-- events.jsonl
|-- 00-brief/
|   |-- reader-brief.yaml
|   |-- topic-brief.md
|   `-- author-context.md
|-- 01-sources/
|   |-- source-ledger.csv
|   |-- import-results.jsonl
|   |-- rejected-sources.csv
|   `-- source-selection.json
|-- 02-research/
|   |-- notebook.json
|   |-- research-report.md
|   |-- evidence.jsonl
|   |-- claim-ledger.csv
|   |-- contradictions.md
|   `-- author-questions.md
|-- 03-editorial/
|   |-- notebooklm-report.md
|   |-- structure-map.md
|   |-- article-draft.md
|   `-- pollo-blog-qa.md
|-- 04-media/
|   |-- podcast.m4a
|   |-- podcast-transcript.md (optional; separater Transkriptionsschritt)
|   |-- podcast-review.md
|   |-- video.mp4
|   |-- video-review.md
|   |-- visual-brief.md
|   |-- infographic.png
|   `-- media-sha256.json
`-- 05-release/
    |-- article.md
    |-- podcast-frontmatter.yaml
    |-- release-manifest.json
    `-- approval.json
```

`run.json` speichert nur nicht geheime Zustände: Paketversion, Notebook-ID, erkannte Limits, Quellanzahl, Stage, Fehler, Zeitstempel und Hashes. Keine Cookies, Tokens oder Browserprofile.

`events.jsonl` enthält nur Fehlerklasse, Stage, Source-ID und eine bereinigte Kurzmeldung. Raw-Tracebacks, Response-Bodies, vollständige lokale Pfade, Account-E-Mail, Source-Snippets und komplette Prompts gehören nicht ins Standardlog. Accounts werden nur über ein bestätigtes Profilalias oder einen Hash referenziert. CSV-Exporte neutralisieren führende `=`, `+`, `-` und `@`, damit Tabellenprogramme sie nicht als Formeln ausführen.

## Quellenstrategie für 50 bis 100 Quellen

- nicht blind `--import-all` verwenden
- breit recherchieren, danach 20 bis 40 hochwertige und nicht redundante Quellen auswählen
- im ersten Pilot sequenziell importieren (`concurrency = 1`); erst nach erfolgreicher Messung optional maximal zwei parallele Imports
- nach jedem Batch Status und Receipt sichern
- fehlgeschlagene Quellen nicht automatisch löschen
- Websites liefern primär HTML-Text; YouTube-Quellen liefern vorhandene Captions, keine visuelle Videoanalyse
- visuelle Produkt- oder UI-Behauptungen separat prüfen

## Übergabe an pollo-blog

NotebookLM liefert ein Evidence-Paket, keinen Text zum bloßen "Humanizen".

1. Reader Job in einem Satz festhalten.
2. Claims als `BELEGT`, `ZU PRUEFEN`, `AUTOR NOETIG`, `STREICHEN` oder `UNKNOWN` markieren.
3. Content-Typ und Struktur-Map bestimmen.
4. Artikel aus Leserfrage, Claims und Quellen neu aufbauen; den NotebookLM-Report nicht linear paraphrasieren.
5. TRMT-Profilpass durchführen.
6. Publication Lane und verbleibende Entscheidungen prüfen.

Persönliche Stimme stammt ausschließlich aus `author-context.md` oder einer ausdrücklichen Bestätigung. Quellen und NotebookLM dürfen niemals eine Aussage wie "ich habe getestet" erzeugen oder belegen.

## Medienprüfung

Podcast, Video und Infografik bleiben Entwürfe, bis ein Mensch sie vollständig geprüft hat:

- Fakten, sichtbarer Text, Namen, Zahlen und Aussprache
- Bildrechte, Quellprovenienz und vorhandene Watermarks
- Alt-Text und grundlegende Accessibility
- Video vollständig ansehen; ein Transcript allein reicht nicht
- Podcast vollständig anhören; `podcast-transcript.md` ist nur vorhanden, wenn ein separater Transkriptionsschritt bewusst ausgeführt wurde
- externe Plattform-URL erst nach erfolgreichem Upload-Readback in ein Release-Manifest übernehmen

## Kontrollierte Release-Übernahme

- nur Dateien übernehmen, die in `release-manifest.json` gelistet sind
- SHA-256 vor und nach der Übernahme vergleichen
- `draft: true` fail-closed erzwingen
- Dirty-Worktree und Diff vor jeder Übernahme prüfen
- Publish bleibt ein eigener späterer Vorgang
- Cloud-Retention-Entscheidung und Zeitpunkt im Receipt festhalten

## Aktueller Ausführungsstand und verbleibende Grenzen

- Installation ist erfolgt; der nächste Schritt bleibt der einmalige interaktive Google-Login durch den Nutzer
- keine Auth-Dateien im Projekt
- kein Schreiben in `src/content/blog` oder `src/content/podcast` durch den Runner
- kein Aufruf der bestehenden `scripts/daily-content.py`, weil sie Git, Push und Suchmaschinenmeldung koppelt
- der lokale `.claude/skills/trmt-content-engine` ist jetzt ein dünner Draft-only-Router ohne Fail-open-, erfundene-Ich- oder Auto-Publish-Regeln
- der globale `pollo-blog`-Skill enthält nach ausdrücklicher Freigabe einen eigenen NotebookLM-Evidence-Importvertrag
- der lokale Runner `scripts/notebooklm_content_pilot.py` validiert Upload-Gates, begrenzt den Pilot auf zehn Quellen, blockiert private/gefährliche URLs und Secret-Querys, prüft DNS plus Redirect-Ziel, erzwingt das ignorierte Staging-Root, neutralisiert CSV-Formeln, redigiert Event-Logs und prüft eindeutiges `draft: true` plus SHA-256
- 17 fokussierte Sicherheits- und Skill-Verträge sowie beide nativen Skill-Validatoren sind grün
- der vorbereitete Run liegt ausschließlich im ignorierten `output/content-runs/2026-08-31--ki-content-pipeline-ohne-n8n/`
- kein Notebook, keine Quelle und kein Report wurde cloudseitig erzeugt, solange `notebooklm auth check --test --passive --json` nicht `status: ok` und `checks.token_fetch: true` meldet

## Kleinster sicherer Pilot

Ein einziges, nicht zeitkritisches TRMT-Thema mit höchstens zehn freigegebenen Quellen:

1. `notebooklm-py==0.8.1` isoliert installieren und Login manuell durchführen. Installation ist erledigt; Login ist noch offen.
2. Auth-Test ausführen, ohne Auth-Dateien auszulesen oder zu protokollieren. Der erwartete Fail-closed-Readback ist aktuell rot, weil noch kein Profil existiert.
3. Zehn Quellen im ersten Pilot strikt sequenziell importieren.
4. Evidence-Paket erzeugen und gegen die Originalquellen prüfen.
5. Einen Artikelentwurf ausschließlich im ignorierten `output/`-Run ablegen.
6. Qualität, Zeitbedarf, Fehler und Quota bewerten.
7. Erst danach über Podcast-/Videoerzeugung und die dauerhafte Skill-Integration entscheiden.
