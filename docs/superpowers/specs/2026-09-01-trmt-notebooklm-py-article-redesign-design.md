# TRMT Artikel-Redesign: Codex steuert NotebookLM mit notebooklm-py

**Status:** inhaltliche Richtung vom Nutzer am 01.09.2026 bestätigt; vor Umsetzung zur finalen Sichtprüfung dokumentiert

**Basis:** `origin/main` bei `9e5e36b` im isolierten Branch `codex/trmt-notebooklm-py-article-redesign-spec`

**Live-Artikel:** `https://therandommakertheory.com/blog/gemini-notebook-kostenlos-codex-content-workflow`

**Quelldatei:** `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md`

## Ziel und Leserfrage

Der veröffentlichte Artikel wird inhaltlich neu aufgebaut. Nicht die einzelnen Funktionen von NotebookLM beziehungsweise Gemini Notebook sind die Hauptgeschichte, sondern die inoffizielle Open-Source-Brücke `notebooklm-py`: Ein Schreibagent wie Codex oder Claude Code kann damit NotebookLM als Recherche-, Struktur- und Medienwerkzeug ansprechen und mehrere Arbeitsschritte orchestrieren.

Der Artikel beantwortet vor allem diese Leserfrage:

> Wie kann ich Codex oder Claude Code über `notebooklm-py` mit NotebookLM verbinden, damit der Agent gründliche Recherche, Artikel-Briefings und spätere Medien aus einem Ablauf anstoßen kann?

Die Leser sollen nach dem Artikel verstehen:

1. was `notebooklm-py` anders macht als eine bloße manuelle NotebookLM-Nutzung,
2. wie der getestete Recherche-Pilot funktioniert und wie daraus der geplante Ablauf bis zum multimedialen Artikel entsteht,
3. welche Aufgaben NotebookLM und welche Aufgaben Codex oder Claude Code übernehmen,
4. warum dieser Aufbau manuelle Übergaben und Agent-Kontext reduzieren kann,
5. wo die inoffizielle Schnittstelle, Login, Quellenqualität und Rate Limits Grenzen setzen.

## Redaktionelle Positionierung

### Haupttitel

`Der eigentliche NotebookLM-Hack: Codex verbindet Recherche und Medien mit notebooklm-py`

### SEO-Titel

`notebooklm-py mit Codex: NotebookLM per Agent steuern`

### Meta-Description

`notebooklm-py verbindet Codex oder Claude Code mit NotebookLM. So steuert der Agent Deep Research, Quellen, Artikel-Briefings und Medien in einem Workflow.`

### URL

Der bestehende Slug bleibt unverändert:

`/blog/gemini-notebook-kostenlos-codex-content-workflow`

Damit bleiben bestehende Indexierung, Links und der bereits veröffentlichte Pfad erhalten. `notebooklm-py`, `NotebookLM mit Codex` und `NotebookLM mit Claude Code` bilden die primäre Suchintention. Die allgemeinere „Content Pipeline“ bleibt ein unterstützendes Thema, damit der Artikel nicht unnötig mit dem vorhandenen Beitrag `meine-content-pipeline-ai-agents-2026` konkurriert. Der vorhandene Beitrag `claude-code-ultimate-setup-produktivitaet-2026` behält die Suchintention rund um Installation, Setup und allgemeine Claude-Code-Produktivität; der neue Text erklärt nicht erneut das gesamte Agenten-Setup.

## Kernthese

Der Produktivitätsgewinn entsteht nicht allein dadurch, dass NotebookLM Audio, Video oder Infografiken erzeugen kann. Der eigentliche Hebel ist, dass Codex oder Claude Code über `notebooklm-py` den gesamten Übergabeprozess steuert:

```text
Auftrag an Codex oder Claude Code
  -> Content-Skill und Deep-Research-Prompt
  -> notebooklm-py startet NotebookLM Deep Research
  -> Quellen finden, importieren, sortieren und prüfen
  -> NotebookLM erstellt Outline und Abschnittsbriefings
  -> Codex oder Claude Code schreibt und redigiert den Artikel
  -> finale Fassung wird als Medien-Master zurückgegeben
  -> NotebookLM erzeugt Audio, Video, Infografik und Slides
  -> geprüfte Medien werden in Artikel und Homepage eingebunden
```

NotebookLM dient dabei als quellengebundene Recherche- und Medien-Engine. Der Agent bleibt Orchestrator, Autor, Prüfer und Integrator. Der Research-Teil bis zur kuratierten Quellenbasis ist praktisch getestet. Outline, Abschnittsbriefings, Rück-Upload der finalen Fassung und Medienproduktion bilden die technisch verifizierte Zielarchitektur, sind aber noch nicht als vollständiger End-to-End-Lauf abgenommen.

## Artikelstruktur

### 1. Der Hook: Nicht noch ein NotebookLM-Tutorial

Der Einstieg beginnt mit der konkreten Situation: Ich möchte Codex oder Claude Code künftig nur noch sagen, welchen Beitrag ich brauche. Der Agent soll dann meinen Content-Skill starten und NotebookLM über `notebooklm-py` bedienen. Der bereits getestete Research-Pilot zeigt, dass diese Brücke funktioniert; der vollständige Ablauf bis zu den Medien ist die nächste Ausbaustufe. Das manuelle Kopieren zwischen Chat, Recherche, Outline und Medien ist nicht die Pointe des Workflows.

Der Absatz darf zugespitzt sein, muss den später erklärten Ablauf aber ehrlich einlösen. Er verspricht keinen magischen Ein-Klick-Autopiloten.

### 2. Was notebooklm-py eigentlich ist

Kurze, verständliche Erklärung der Brücke:

- inoffizielles Open-Source-Projekt mit MIT-Lizenz,
- CLI und Python-Schnittstelle für NotebookLM,
- Agent-Skill für unter anderem Codex und Claude Code,
- kann Notebooks, Quellen, Recherche-Abfragen, Chats und Medienartefakte steuern,
- ist keine offizielle Google-API und kann sich bei Änderungen der internen Endpunkte verändern.

Hier steht ein kleiner lesbarer Befehlsauszug als Beleg, aber kein langer CLI-Kurs.

### 3. Der geplante End-to-End-Workflow Schritt für Schritt

Dieser Abschnitt bildet die technisch geprüfte Zielarchitektur ab und trennt sie sichtbar vom bereits ausgeführten Research-Pilot:

1. Codex oder Claude Code erhält Thema, Zielgruppe und Artikelauftrag.
2. Der lokale Content-Skill erzeugt einen ausführlichen Deep-Research-Prompt.
3. `notebooklm-py` startet NotebookLM Deep Research und importiert nur ausgewählte beziehungsweise zitierte Quellen mit einem festen Limit.
4. NotebookLM beantwortet einen eigenen Outline-Prompt.
5. Für jeden geplanten Abschnitt liefert NotebookLM ein Briefing mit den zwingend benötigten Aussagen, Belegen, Widersprüchen und offenen Punkten.
6. Codex oder Claude Code schreibt den Artikel lokal aus diesen Briefings neu; NotebookLM verfasst nicht automatisch den finalen TRMT-Text.
7. Der geprüfte Markdown-Artikel wird als eigene Quelle wieder in NotebookLM hochgeladen.
8. Audio-Zusammenfassung, Video, Infografik und Slides werden ausschließlich aus dieser finalen Artikelquelle erzeugt, damit verworfene Rohinformationen nicht erneut auftauchen.
9. Medien werden vollständig geprüft und anschließend gezielt in Artikel oder Homepage übernommen.

Outline und Abschnittsbriefings werden technisch als normale `ask --prompt-file`-Abfragen umgesetzt. Sie sind keine eigenen NotebookLM-Artefakttypen. Der Artikel sagt das in Alltagssprache und stellt keine nicht existierende Spezialfunktion dar.

### 4. Warum das Agent-Tokens und Handarbeit sparen kann

Die Argumentation bleibt konkret:

- NotebookLM übernimmt breite Quellensuche und quellengebundene Synthese außerhalb des laufenden Agent-Kontexts.
- Im Pilot fand Deep Research 62 Kandidaten; nach der Auswahl mussten nicht alle Kandidaten als vollständige Dokumente in den laufenden Schreibkontext übernommen werden.
- Stattdessen erhält der Schreibagent eine kuratierte Auswahl, Outline, Abschnittsbriefings und gezielte Belegstellen.
- Recherche, Schreiben und Medien hängen an demselben geprüften Inhaltskern.
- Wiederkehrende Übergaben können durch den Content-Skill reproduzierbar angestoßen werden.

Der Artikel behauptet keine gemessene prozentuale Token- oder Geldersparnis. Er unterscheidet klar zwischen einem eventuell kostenlos nutzbaren NotebookLM-Standardzugang und den möglichen Kosten für Codex, Claude Code oder andere Dienste. „Kostenlos recherchieren“ bedeutet nicht, dass der gesamte Stack garantiert kostenlos ist.

### 5. Der ehrliche Praxistest

Der bereits ausgeführte Pilot wird nicht als perfekte Erfolgsgeschichte geglättet:

- Deep Research fand 62 Kandidaten.
- 50 zitierte Kandidaten wurden für die weitere Auswahl übernommen.
- Die erste automatische Quellenbewertung beziehungsweise Importannahme war widersprüchlich.
- Deshalb benötigt der Workflow feste Grenzen, Quellenauswahl und einen Originalstellen-Check.

Die Zahlen dienen als konkretes Beispiel dafür, dass die Brücke bereits viel Arbeit ausführen kann, aber kein Qualitäts-Gate ersetzt.

### 6. NotebookLM ist die Engine, nicht die Hauptstory

Deep Research, Audio, Video, Infografiken und Slides werden kompakt erklärt, weil sie den Wert der Pipeline tragen. Sie werden nicht erneut zu einem allgemeinen Feature-Überblick aufgebläht. Der Artikel verlinkt bei zeitabhängigen Limits und Produktbezeichnungen auf aktuelle Google-Hilfe statt dauerhaft starre Zahlen zu versprechen.

### 7. Grenzen und Ausfallsicherheit

- `notebooklm-py` nutzt inoffizielle, undokumentierte Google-Endpunkte.
- Login-Sitzungen können ablaufen; ein Auth-Check ist Pflicht, bevor ein Lauf startet.
- Quellen und Modellausgaben bleiben untrusted Input.
- Deep Research und Mediengenerierung können an Quoten oder Rate Limits scheitern.
- Die Automatik muss Zwischenergebnisse und Fehlerzustände nach jedem Schritt prüfen, statt bei einem unklaren Ergebnis einfach weiterzulaufen.
- Medien werden erst nach dem Artikel-Freeze erzeugt und anschließend vollständig angesehen beziehungsweise angehört.
- Credentials, Cookies, Tokens und die private Konto-E-Mail erscheinen weder im Artikel noch in Logs oder Repository-Dateien.

### 8. Schluss: Der sinnvolle Hybrid

Der Schluss fasst die Rollen ohne Fachwortballast zusammen: NotebookLM liest breit, bündelt Quellen und baut Medien; Codex oder Claude Code steuert, schreibt, prüft und veröffentlicht. `notebooklm-py` ist das verbindende Stück, das aus mehreren guten Einzelwerkzeugen eine nutzbare Content-Pipeline macht.

## Quellen- und Wahrheitsgrenzen

### Verifiziert

- [teng-lin/notebooklm-py](https://github.com/teng-lin/notebooklm-py) bezeichnet sich als inoffizielle Python-API und Agent-Skill für Google Gemini Notebook und nennt Codex sowie Claude Code als unterstützte Agenten.
- Der geprüfte stabile Release ist [v0.8.1](https://github.com/teng-lin/notebooklm-py/releases/tag/v0.8.1); die lokale Installation meldet ebenfalls `0.8.1`.
- Deep Research, begrenzter Import zitierter Quellen, Chat-Abfragen aus Prompt-Dateien, Datei-Upload sowie Audio-, Video-, Infografik- und Slide-Generierung sind in der [CLI-Referenz zu v0.8.1](https://github.com/teng-lin/notebooklm-py/blob/v0.8.1/docs/cli-reference.md) dokumentiert.
- Der lokale Pilot lieferte die oben genannten 62 beziehungsweise 50 Quellenkandidaten und machte eine fehlerhafte automatische Triage sichtbar.

### Abgeleitet, aber plausibel

- Der Workflow kann bezahlten Agent-Kontext und manuelle Übergaben reduzieren, weil die breite Synthese bei NotebookLM stattfindet. Die tatsächliche Ersparnis hängt von Thema, Quellenmenge, Prompts und Agent ab und wurde noch nicht als Prozentwert gemessen.
- Medien werden konsistenter, wenn sie nur aus der finalen Artikelquelle statt aus allen Rohquellen erzeugt werden.

### Noch unbekannt oder nicht zu behaupten

- Eine garantierte Token-, Zeit- oder Geldersparnis für jeden Lauf.
- Gleichbleibende Qualität aller Outline-, Abschnitts- und Medienausgaben ohne einen neuen realen Testlauf.
- Dauerhafte Verfügbarkeit einzelner Gratislimits und Studioformate.
- Ein offiziell unterstützter Google-API-Vertrag für `notebooklm-py`.

## Umfang dieser Korrekturwelle

Enthalten sind:

- vollständiger Neuaufbau genau dieses einen Artikels,
- H1, SEO-Titel, Description, Einstieg, Struktur und Fließtext,
- aktuelle Primärquellen zu `notebooklm-py` und Google-Produktgrenzen,
- ein kompakter technischer Ausschnitt und eine verständliche Workflow-Darstellung,
- interne Verlinkung ohne neue Keyword-Kannibalisierung,
- Inhalts-, Link-, Metadaten-, Build- und Live-Readback-Prüfung.

Nicht enthalten sind:

- Änderung des bestehenden Slugs,
- tatsächliche Mediengenerierung oder Medienintegration,
- Änderung von Hero, Homepage oder anderen Artikeln,
- Änderung des lokalen oder globalen Content-Skills,
- automatischer NotebookLM-Lauf mit dem aktuell abgelaufenen lokalen Login,
- neue pauschale Auto-Publish- oder Deployment-Automatik.

Der Content-Skill benötigt anschließend eine eigene kleine Erweiterung um explizite Prompt-Stufen für Outline und Abschnittsbriefings. Diese folgt separat, damit Artikelkorrektur und globale Workflow-Änderung unabhängig geprüft werden können.

Die interne Verlinkung erhält feste Rollen:

- `/blog/meine-content-pipeline-ai-agents-2026` wird einmal mit einer Formulierung wie „mein allgemeiner Content-Pipeline-Aufbau“ verlinkt; der Zielartikel bleibt für die breite Pipeline-Strategie zuständig.
- `/blog/claude-code-ultimate-setup-produktivitaet-2026` wird einmal als „mein Claude-Code-Setup“ verlinkt; der Zielartikel bleibt für Installation und allgemeine Agenten-Produktivität zuständig.
- Der neue Artikel selbst besitzt die konkrete Integrationsintention rund um `notebooklm-py` und NotebookLM-Steuerung.

## Verifikation und Veröffentlichung

Vor einer neuen Veröffentlichung müssen folgende Punkte frisch geprüft werden:

1. `notebooklm-py` steht bereits in H1, Einstieg und erster inhaltlicher Erklärung im Mittelpunkt.
2. Der beschriebene Ablauf stimmt mit den tatsächlich verfügbaren v0.8.1-Befehlen überein.
3. Kostenlose NotebookLM-Nutzung und mögliche Kosten der Schreibagenten werden nicht vermischt.
4. Jede konkrete Produkt- oder Versionsaussage besitzt eine aktuelle Primärquelle.
5. Keine erfundene persönliche Erfahrung, kein nicht gemessener Sparwert und kein „vollautomatisch“-Versprechen.
6. Der vorhandene Slug, Veröffentlichungsstatus und geschützte Medienfelder bleiben erhalten.
7. Der neue Text konkurriert weder mit dem allgemeinen Content-Pipeline-Artikel noch mit dem Claude-Code-Setup-Artikel; Linkziel und Anchor-Rolle sind eindeutig.
8. Fokussierte Content- und Route-Tests, `git diff --check` und die Vite-Kompilierung bestehen; vorhandene projektweite Baseline-Fehler werden separat ausgewiesen.
9. Ein unabhängiger Review prüft Fokus, Fachrichtigkeit, Sprache und Claim-Grenzen.
10. Nach Push und Deployment bestätigen Live-Readback, Canonical, Indexierbarkeit, Blog-Liste, Sitemap und RSS die neue Fassung.

Erst dann gilt die Artikelkorrektur als veröffentlicht. Die spätere Skill-Erweiterung und echte Medienproduktion bleiben eigene, nachvollziehbare Schritte.
