---
title: "Claude Code Ultimate Setup: Die komplette Maschine fuer maximale Produktivitaet"
slug: "claude-code-ultimate-setup-produktivitaet-2026"
date: "2026-03-11"
description: "Der ultimative Guide: Claude Code mit Obsidian, NotebookLM, Playwright, Hooks und Scheduled Tasks zur perfekten Arbeitsmaschine kombinieren. Schritt fuer Schritt, von der Installation bis zum fertigen System."
tags: ["claude-code", "ki-tools", "produktivitaet", "workflow", "automation", "tutorial", "obsidian", "notebooklm"]
category: "ki-tools"
draft: true
readingTime: 25
heroImage: "/images/blog/claude-code-ultimate-setup-produktivitaet-2026-1.webp"
heroImageThumb: "/images/blog/claude-code-ultimate-setup-produktivitaet-2026-1-thumb.webp"
titleAccent: "Ultimate"
podcastSlug: ""
podcastUrl: ""
videoUrl: ""
---

Stell dir vor: Du wachst morgens auf und dein KI-News-Briefing liegt schon in deiner Knowledge Base. Dein naechster Blog-Artikel wurde ueber Nacht recherchiert. Deine Social-Media-Posts sind fertig getextet. Und du hast genau NICHTS davon manuell gemacht. Das ist keine Science Fiction. Das ist mein aktuelles Setup mit Claude Code.

Ich hab die letzten Wochen wie ein Besessener an einem System gebaut, das Claude Code von einem cleveren Chat-Partner in eine vollstaendige Arbeitsmaschine verwandelt. Das Ergebnis: 10 Tools, 0 Euro Zusatzkosten, und ein Workflow der sich anfuehlt wie ein persoenliches Team aus 5 Leuten.

Dieser Artikel ist der komplette Deep Dive. Von der ersten Installation bis zum fertigen System. Keine Theorie, kein Marketing-Gelaber. Nur das was funktioniert.

## Was du nach diesem Artikel haben wirst

Ein System das Claude Code mit Obsidian, NotebookLM, Playwright und Scheduled Tasks so verbindet, dass du einen Grossteil deiner digitalen Arbeit automatisieren kannst. Und zwar nicht mit irgendeiner No-Code-Plattform die 200 Euro im Monat kostet, sondern mit Open-Source-Tools die alle kostenlos sind.

Konkret: Automatische Research-Pipelines. Browser-Automation fuer alles was einen Login braucht. Ein Second Brain das mit jeder Session schlauer wird. Und ein Scheduling-System das deine Tasks ausfuehrt waehrend du schlaefst.

## Die 6 Level von Claude Code: Wo stehst du?

Bevor wir ins Setup einsteigen, ein Reality Check. Chase Hannegan, einer der besten Claude-Code-Content-Creator da draussen, hat die Nutzung in 6 Level eingeteilt. Die meisten Leute haengen bei Level 1-2 fest. Dieses Setup bringt dich auf Level 5-6.

**Level 1: Der Prompt-Schreiber.** Du tippst Fragen ein, kriegst Antworten. Einbahnstrasse. Kein Plan-Mode, kein Context-Management. Das ist wie einen Ferrari im ersten Gang zu fahren.

**Level 2: Der Planer.** Du nutzt Plan-Mode, laesst Claude erst nachdenken bevor er baut. Guter Anfang. Aber du gibst Claude immer noch nur Text als Input.

**Level 3: Der Context-Engineer.** Du verstehst dass Claude ein Gedaechtnis-Problem hat. 200.000 Tokens Budget pro Session. Ab 100.000-120.000 Tokens setzt "Context Rot" ein, die Performance faellt messbar ab. Du nutzt `/context` um den Verbrauch zu checken und `/clear` um frisch zu starten. Das alleine macht dich besser als 50% aller Claude-Code-Nutzer.

**Level 4: Der Tool-Selektor.** Du installierst nicht alles was glaenzt, sondern wahlst chirurgisch die Tools die du brauchst. CLI-Tools statt MCP-Server (weniger Token-Verbrauch). Wenige, aber perfekt passende Integrationen.

**Level 5: Der Skill-Builder.** Du erstellst eigene Skills. Wiederverwendbare Workflows als Slash-Commands. Nicht 100 Skills, sondern 5 perfekte. Du testest sie mit dem Skill Creator, laesst A/B-Tests laufen, optimierst die Trigger.

**Level 6: Der Orchestrator.** Mehrere Claude-Sessions parallel. Worktrees fuer isolierte Feature-Entwicklung. Agent Teams die miteinander kommunizieren. Sub-Agents die in frischen Context-Fenstern arbeiten.

Das Setup das ich dir jetzt zeige, deckt Level 3-6 ab. Gleichzeitig.

![Die 6 Level von Claude Code: Vom Prompt-Schreiber zum Orchestrator](/images/blog/claude-code-ultimate-setup-6-levels.webp)

## Die Architektur: Wie alles zusammenhaengt

Mein System hat drei Schichten:

**Schicht 1: Command Center.** Hier sitzt du. Cowork Desktop fuer persistente Scheduled Tasks und das Dashboard. Claude Code CLI fuer Terminal-basierte Arbeit, /loop Monitoring und Agent Teams.

**Schicht 2: Tool Layer.** Die Werkzeuge die Claude benutzt. Playwright CLI fuer Browser-Automation. Firecrawl CLI fuer Web Scraping. NotebookLM CLI fuer kostenlose Research-Analyse. Optional: Google Workspace CLI fuer Gmail, Calendar und Drive.

**Schicht 3: Knowledge Layer.** Das Gedaechtnis. Obsidian Vault als Second Brain, wo alles gespeichert wird. CLAUDE.md Hierarchie als persistentes Projektgedaechtnis. Skills und Rules als kodifizierte Workflows.

Die drei Schichten arbeiten zusammen: Du gibst einen Befehl (Schicht 1), Claude nutzt die Tools (Schicht 2) und speichert Ergebnisse im Knowledge Layer (Schicht 3). Jede neue Session profitiert vom gesammelten Wissen.

![System Architektur: 3 Schichten fuer maximale Produktivitaet](/images/blog/claude-code-ultimate-setup-architecture.webp)

## Context Rot: Das Problem das alles ruiniert (und wie wir es loesen)

Bevor wir irgendwas installieren, muessen wir das fundamentale Problem verstehen. Context Rot. Das ist der Grund warum Claude nach 30 Nachrichten ploetzlich vergisst was du vor 10 Minuten gesagt hast.

Jede Nachricht die du schickst, sendet nicht nur deinen neuen Text. Sie sendet den GESAMTEN bisherigen Chatverlauf plus deinen neuen Input. Nachricht 1 kostet 2 Tokens. Nachricht 50 kostet 50.000+ Input-Tokens, nur fuer die History.

Research von Chroma hat gezeigt: Egal ob Claude, GPT-4 oder Gemini. Ab 100.000-120.000 Tokens faellt die Performance messbar ab. Gemini hat theoretisch 2 Millionen Token Kapazitaet, trotzdem degradiert die Reasoning-Qualitaet nach demselben Schwellenwert.

**Die Loesung? Frische Contexts.** Statt eine endlose Session zu fuehren, arbeiten wir mit:

1. **Sub-Agents:** Jede Teilaufgabe bekommt einen eigenen Agent mit frischem Context. Kein mueder Agent, keine Context-Verschmutzung.

2. **Compaction Hooks:** Wenn Context komprimiert wird, injiziert ein Hook automatisch die kritischsten Informationen zurueck.

3. **CLAUDE.md als persistentes Gedaechtnis:** Was in der CLAUDE.md steht, wird bei JEDER neuen Session geladen. Das ist kein Chat-Verlauf der verfaellt. Das ist permanentes Wissen.

4. **Obsidian als externes Gedaechtnis:** Was Claude nicht im Context behaelt, lebt als Markdown-File in Obsidian und kann jederzeit gelesen werden.

## Teil 1: Das Fundament. CLAUDE.md richtig aufsetzen

Die CLAUDE.md ist nicht einfach eine Readme. Sie ist das Betriebssystem deines Claude-Setups. Sie wird bei jedem Session-Start geladen und definiert wie Claude denkt, arbeitet und antwortet.

### Die Hierarchie

Claude Code hat ein dreistufiges Gedaechtnis-System:

**Global** (`~/.claude/CLAUDE.md`): Gilt fuer ALLE Projekte. Hier stehen deine persoenlichen Praeferenzen: Sprache, Kommunikationsstil, bevorzugte Tools. Bei mir steht hier: Deutsch, direkt, ADHS-freundlich, TL;DR zuerst.

**Projekt** (`dein-projekt/CLAUDE.md`): Gilt fuer ein spezifisches Projekt. Tech-Stack, Ordnerstruktur, Konventionen. Bei mir: SvelteKit, Tailwind, Supabase, Vercel.

**Rules** (`.claude/rules/*.md`): Conditional Rules die nur geladen werden wenn bestimmte Dateien beruehrt werden. Der Clou: Sie werden lazy-loaded, verbrauchen also nur Tokens wenn sie relevant sind.

### Praxis-Beispiel: Meine Rules-Struktur

```
.claude/rules/
├── content-engine.md      → Wird geladen bei Content-Arbeit
├── svelte-conventions.md  → Wird geladen bei .svelte Dateien
├── brand-voice.md         → Wird geladen bei Marketing-Content
└── deployment.md          → Wird geladen bei Deploy-Tasks
```

Jede Rule-Datei ist unter 200 Zeilen. Das ist wichtig. Laenger = mehr Token-Verbrauch = weniger Platz fuer deine eigentliche Arbeit.

### Auto Memory

Seit Anfang 2026 hat Claude Code ein Auto-Memory-Feature. Claude speichert sich selbst Notizen: Build-Commands die funktioniert haben, Debugging-Insights, Code-Style-Praeferenzen. Diese Notizen ueberleben Sessions automatisch.

Das bedeutet: Je mehr du mit Claude arbeitest, desto besser wird er. Nicht theoretisch, sondern messbar. Nach 3-4 Wochen erkennt Claude deine Analyse-Patterns. Nach einem Monat antizipiert er deine Arbeitsstruktur.

## Teil 2: Hooks. Dein Autopilot

Hooks sind deterministische Shell-Commands die bei bestimmten Events automatisch ausfuehren. Kein "ich hoffe Claude macht das". Hooks machen es IMMER.

### 18 Lifecycle Events

Claude Code hat 18 Events an denen du Hooks aufhaengen kannst. Die wichtigsten:

**SessionStart:** Feuert bei jedem Session-Start. Perfekt um kritischen Context zu injizieren. Besonders nach Compaction (wenn Claude seinen Verlauf zusammenfasst), weil dabei Details verloren gehen.

**PreToolUse:** Feuert BEVOR Claude ein Tool benutzt. Hier kannst du Edits an geschuetzte Dateien blocken. Exit Code 2 = blockiert, Claude bekommt Feedback warum.

**PostToolUse:** Feuert NACHDEM Claude ein Tool benutzt hat. Perfekt fuer Auto-Formatting: Prettier laeuft automatisch nach jedem Edit.

**Notification:** Feuert wenn Claude auf Input wartet. Desktop-Notification statt Terminal-Starren.

**Stop:** Feuert wenn Claude aufhoert zu arbeiten. Ein Prompt-Hook kann hier pruefen ob wirklich ALLES erledigt ist. Wenn nein, arbeitet Claude weiter.

### Vier Hook-Typen

**Command:** Shell-Befehl. Simpel, zuverlaessig.
**HTTP:** POST an einen Endpoint. Gut fuer externe Logging-Services.
**Prompt:** Single-Turn LLM-Evaluation. Ein kleines Modell entscheidet ob eine Aktion ok ist.
**Agent:** Multi-Turn Verification. Ein Sub-Agent prueft Dateien und fuehrt Tests aus bevor er entscheidet.

### Mein Hook-Setup

Notification-Hook: Windows-Popup wenn Claude auf mich wartet. Klingt simpel, ist ein Game-Changer. Ich kann weiterarbeiten und werde benachrichtigt.

Auto-Format-Hook: Prettier laeuft nach jedem File-Edit automatisch. Kein manuelles Formatting mehr. Nie wieder.

File-Protection-Hook: .env, package-lock.json und .git/ sind geschuetzt. Claude bekommt Feedback wenn er versucht sie zu aendern.

Compaction-Recovery-Hook: Nach Context-Komprimierung wird automatisch injiziert: Tech-Stack, aktuelle Sprint-Ziele, wichtige Datei-Pfade. Claude verliert nie den Faden.

Task-Completion-Check: Ein Prompt-Hook prueft bei jedem Stop ob alle angeforderten Tasks wirklich erledigt sind. Kein vorzeitiges Aufhoeren mehr.

![Hooks: Automatische Kontrolle ueber den gesamten Session-Lifecycle](/images/blog/claude-code-ultimate-setup-hooks.webp)

## Teil 3: Die Tool-Schicht

### Playwright CLI: Browser-Automation die funktioniert

Playwright ist der Hammer. Wenn du jemals versucht hast, ueber Claude etwas in einem Browser zu machen und an Login-Screens, Cookie-Bannern oder File-Uploads gescheitert bist: Playwright loest das.

**Warum Playwright statt MCP Browser Server?** Token-Effizienz. Ein MCP-Server schickt den kompletten Accessibility Tree jeder Seite in deinen Context. Das sind schnell 90.000 extra Tokens. Playwright CLI komprimiert das auf Element-Referenzen wie `e15: [Button] "Submit"`. Das spart circa 18% Context.

**Was es kann:**
- Formulare ausfuellen und absenden
- Screenshots fuer Dokumentation
- Daten aus dynamischen Seiten extrahieren
- File Uploads (umgeht Chrome-Extension-Limitierungen!)
- Session-Persistence: Einmal einloggen, danach automatisch
- Multi-Tab Operationen
- PDF-Generierung von Webseiten

**Headed vs. Headless:** Headed zeigt dir den Browser, du siehst was passiert. Headless laeuft unsichtbar im Hintergrund. Starte mit Headed zum Debuggen, wechsle auf Headless fuer Production.

**Mein Use Case:** Spotify-Podcast-Upload. Spotify hat keine Upload-API. Bisher musste ich jede Episode manuell hochladen. Mit Playwright: Ein Slash-Command, Claude oeffnet Spotify for Creators, fuellt Titel und Description aus, laedt die MP3 hoch, klickt Publish. Fertig.

### Firecrawl CLI: Web Scraping fuer KI

Firecrawl macht aus jeder Website sauberes Markdown. Das ist der Unterschied zu normalem Scraping: Du kriegst nicht HTML-Muell, sondern formatierte Daten die Claude sofort verarbeiten kann.

**Vier Commands:**
- **Scrape:** Eine einzelne Seite in Markdown konvertieren
- **Crawl:** Eine komplette Website systematisch durchgehen
- **Map:** Sitemap einer Website erstellen
- **Search:** Web-Suche die Markdown zurueckgibt

**Kostenloser Tier:** 500 Credits pro Monat. Das reicht fuer circa 100 Seiten Scraping. Fuer die meisten Content-Creator mehr als genug.

**Mein Use Case:** KI-News-Aggregation. Jeden Morgen scraped Claude 10-15 KI-News-Seiten, extrahiert die wichtigsten Meldungen, und erstellt ein strukturiertes Briefing. Ohne dass ich eine einzige URL oeffne.

### NotebookLM CLI: Research zum Nulltarif

Das ist vielleicht der cleverste Hack im ganzen Setup. NotebookLM ist Googles Research-Tool. Es analysiert Quellen, erstellt Zusammenfassungen, generiert Podcasts, Mind Maps und Infografiken. Und das Beste: Es ist komplett kostenlos. Google bezahlt die Gemini-Tokens.

**Der Workflow:**
1. Claude sammelt Quellen (Web Search + Firecrawl + YouTube)
2. Claude erstellt ein NotebookLM Notebook mit diesen Quellen
3. NotebookLM analysiert alles (auf Googles Servern, keine Claude-Token-Kosten!)
4. Claude holt die Ergebnisse und baut daraus Content
5. Ergebnisse werden in Obsidian gespeichert

**Was NotebookLM generieren kann:**
- Audio Overviews (Podcast-artige Diskussionen ueber deine Quellen)
- Mind Maps (Konzept-Beziehungen visualisiert)
- Flashcards und Quizzes
- Slide Decks
- Infografiken
- Text-Analysen mit zitierbaren Quellen

**Token-Ersparnis:** Die teure Analyse (20 Videos ingestieren, RAG-Index bauen, Zusammenfassungen generieren) laeuft komplett auf Google-Infrastruktur. Claude verbraucht nur Tokens fuer die Orchestrierung: Requests senden, Ergebnisse empfangen.

**Bis zu 50 Quellen pro Notebook.** Jede Quelle kann bis zu 500.000 Woerter lang sein. Das ist absurd viel Research-Kapazitaet fuer 0 Euro.

### Google Workspace CLI (Optional)

Gmail, Calendar, Drive, Sheets, Docs. Alles in einem CLI. Google hat das Anfang Maerz 2026 offiziell auf GitHub veroeffentlicht. Circa 100 vorgebaute Agent-Skills inklusive.

**Der Haken:** Die OAuth-Einrichtung ist brutal. 45-60 Minuten, Google Cloud Project, 85 Scopes konfigurieren, App Verification. Nicht fuer den ersten Tag. Aber wenn es einmal laeuft: Game-Changer.

**Security-Feature:** Model Armor. Googles eingebauter Schutz der alles scannt was Claude einliest. Prompt-Injection-Attacken werden erkannt und blockiert. 2 Millionen kostenlose Tokens pro Monat.

Ich empfehle: Erstmal ohne starten. In Woche 2-3 nachholen wenn der Rest steht.

![Tool Layer Vergleich: 8 Tools, 0 EUR Zusatzkosten](/images/blog/claude-code-ultimate-setup-tool-comparison.webp)

## Teil 4: Obsidian als Second Brain

Obsidian ist eine kostenlose, lokale Markdown-Notiz-App. Was sie besonders macht: Wiki-Links (`[[Thema]]`), eine Graph-View die Zusammenhaenge zwischen Notizen visualisiert, und komplette Offline-Funktionalitaet. Keine Cloud, keine Subscription, deine Daten gehoeren dir.

### Warum Obsidian + Claude Code perfekt zusammenpassen

Claude Code arbeitet nativ mit Markdown. Obsidian speichert alles als Markdown. Das bedeutet: Claude kann direkt in deinem Vault lesen und schreiben. Kein Export, kein Import, kein Format-Conversion. Claude erstellt eine Notiz, Obsidian zeigt sie sofort an. Mit Backlinks.

### Die Vault-Struktur

```
TRMT-Vault/
├── inbox/           → Quick Capture, unsortierte Notizen
├── research/        → NotebookLM Outputs, Web Research
├── content-ideas/   → Blog/Podcast/Video Ideen
├── workflows/       → Dokumentierte Prozesse
├── learnings/       → Was funktioniert hat (und was nicht)
├── people/          → Kontakte, Affiliates, Collabs
├── daily-notes/     → Automatische Tagesnotizen
└── templates/       → Obsidian Templates
```

### Der Compounding-Effekt

Jede Claude-Session fuegt Wissen hinzu. Research-Ergebnisse, Content-Ideen, Workflow-Optimierungen. Alles landet als Markdown in Obsidian. Naechste Session: Claude liest die bisherigen Notizen und hat sofort den vollen Context.

Nach einer Woche: Marginale Verbesserungen. Nach 3-4 Wochen: Claude erkennt deine Analyse-Muster. Nach einem Monat: Claude antizipiert deine Arbeitsstruktur und Terminologie. Nach einem Jahr: Ein echtes Second Brain das deine Denkweise kennt.

## Teil 5: Scheduling. Claude arbeitet waehrend du schlaefst

### Cowork Desktop Scheduled Tasks

Desktop Scheduled Tasks sind persistent. Sie ueberleben Restarts, laufen nach Zeitplan, und feuern solange die App offen ist. Das ist der wichtigste Unterschied zum CLI-/loop-Command.

**Mein Scheduling-Setup:**

07:00 Uhr, Montag-Freitag: **Morning Dashboard.** Claude checkt KI-News der letzten 24 Stunden, Content-Queue-Status, naechste Deadlines. Speichert als Daily Note in Obsidian. Wenn ich um 7:30 aufwache, ist alles da.

08:00 Uhr, Montag-Freitag: **Content Pipeline.** Claude nimmt den naechsten Artikel aus der Queue, fuehrt Research durch, erstellt einen Draft. Bis ich am Schreibtisch sitze, liegt ein erster Entwurf bereit.

12:00 Uhr, Montag-Mittwoch-Freitag: **Social Recycler.** Claude nimmt den neuesten publizierten Artikel und erstellt 3 Social-Media-Posts. LinkedIn, X, Threads. Angepasst an jede Plattform.

09:00 Uhr, Montag: **SEO Health Check.** Lighthouse Score, Core Web Vitals, Broken Links. Wochenbericht als Markdown.

**Wichtig:** Die Tasks laufen nur wenn der PC an ist und die App offen. Wenn der PC schlaeft, wird der Task beim naechsten Aufwachen nachgeholt.

### CLI /loop fuer Session-Monitoring

/loop ist fuer kurzfristige, session-basierte Tasks. Es ueberwacht Dinge WAEHREND du arbeitest.

Beispiel: Du deployst eine neue Version. `/loop 5m check if vercel deployment succeeded and show status`. Alle 5 Minuten prueft Claude den Deploy-Status und meldet sich wenn es fertig ist oder fehlschlaegt.

Oder: PR-Monitoring waehrend eines Sprints. `/loop 20m check open PRs and summarize any new comments`. Du arbeitest an deinem Feature, Claude behaelt die PRs im Blick.

**Limits:** Max 50 Tasks pro Session. Auto-Expiry nach 3 Tagen. Feuert nur wenn Claude idle ist. Terminal muss offen bleiben.

**Faustregel:** Taeglich wiederkehrend → Scheduled Task (Desktop). Waehrend einer Arbeitssession → /loop (CLI).

## Teil 6: Skills. Deine wiederverwendbaren Workflows

Skills sind Markdown-Dateien mit YAML-Frontmatter die Claude beibringen, spezifische Aufgaben auf eine spezifische Art auszufuehren. Kein Code. Nur Text. Aber unglaublich maechtig.

### Zwei Arten von Skills

**Capability Uplift Skills:** Verbessern etwas das Claude schon kann. Beispiel: PDF-Erstellung, PowerPoint-Generierung, Frontend-Design. Risiko: Koennen obsolet werden wenn Claude nativ besser wird.

**Encoded Preference Skills:** Definieren Workflows die Claude in einer bestimmten Reihenfolge ausfuehren soll. Beispiel: "Erst Research, dann Draft, dann SEO-Check, dann formatieren, dann speichern." Diese Skills bleiben relevant weil sie DEINEN Prozess kodifizieren.

### Der Skill Creator

Anthropic hat einen offiziellen Skill Creator als Plugin. Vier Modi: Create, Eval, Improve, Benchmark.

**Create:** Du beschreibst was der Skill tun soll, der Creator baut ihn.
**Eval:** Automatische Tests ob der Skill macht was er soll. Pass/Fail Kriterien.
**Improve:** Vorschlaege zur Optimierung basierend auf Test-Ergebnissen.
**Benchmark:** A/B-Vergleich zwischen Skill-Versionen. Token-Verbrauch, Pass-Rate, Qualitaet.

**Praxis-Tipp:** Starte mit 5 Core-Skills. Nicht 100. Mehr Skills = schlechtere Trigger-Genauigkeit. Anthropics eigene Tests zeigen: Optimierte Skill-Descriptions gehen von 50/50 Trigger-Rate auf nahezu 100%.

### Meine 5 Core-Skills

1. **YouTube Upload** (`/youtube-upload`): Meta-JSON erstellen, Video uploaden, Thumbnail setzen. Ein Command.
2. **Content Engine** (`/content-engine`): Komplette Blog-Artikel-Pipeline von Research bis fertigem Markdown.
3. **Social Post** (`/social-post`): Aus einem Artikel 3 Plattform-angepasste Social-Media-Posts generieren.
4. **Research** (`/research`): NotebookLM + Firecrawl + Web Search orchestriert, Ergebnis in Obsidian.
5. **Deploy** (`/deploy`): Git commit, push, Vercel Deploy Check, Screenshot QA.

## Teil 7: Sub-Agents und Agent Teams

### Sub-Agents: Frischer Context fuer jede Teilaufgabe

Das GSD Framework (Get Shit Done) hat ein Prinzip das Gold wert ist: Jede Aufgabe bekommt einen eigenen Agent mit frischem Context-Fenster.

Warum? Weil ein Agent der gerade erst gestartet ist, die "smarteste Version" des Modells ist. Kein Context Rot, keine Ablenkung durch irrelevanten Chat-Verlauf.

Statt: Eine endlose Session die langsam degradiert.
Jetzt: Task 1 → Neuer Agent → Execute → Commit. Task 2 → Neuer Agent → Execute → Commit. Jeder Task bekommt die volle Aufmerksamkeit.

### Agent Teams: Mehrere Claude-Sessions parallel

Agent Teams sind experimental. Mehrere Claude-Instanzen arbeiten gleichzeitig und kommunizieren miteinander. Ein Team Lead koordiniert, Teammates implementieren.

**Bester Use Case:** Frontend + Backend + Tests parallel entwickeln. Oder 3 Blog-Artikel gleichzeitig in verschiedenen Phasen bearbeiten.

**Trade-off:** 3-4x Token-Verbrauch gegenueber einer einzelnen Session. Aber die Zeitersparnis bei komplexen Projekten rechtfertigt die Kosten.

**Sweet Spot laut Chase AI:** 2-3 parallele Sessions. Mehr bringt Koordinations-Overhead ohne proportionalen Gewinn.

## Teil 8: Installation. Schritt fuer Schritt

Hier ist die komplette Installations-Reihenfolge. Windows-fokussiert, weil das mein System ist.

### Voraussetzungen

- Claude Desktop App (installiert, eingeloggt)
- Node.js (LTS Version, https://nodejs.org)
- Python 3.10+ (https://python.org)
- Git (https://git-scm.com)
- Ein Texteditor (VS Code empfohlen)

### Phase 1: CLAUDE.md + Hooks (30 Minuten, Claude macht das meiste)

In Claude Code oder Cowork eingeben:

"Erstelle mir eine optimierte CLAUDE.md Hierarchie: Global CLAUDE.md mit meinen Praeferenzen (Deutsch, direkt, TL;DR zuerst), Projekt CLAUDE.md mit meinem Tech-Stack, und conditional Rules in .claude/rules/ fuer Content, Code, Brand und Deployment. Jede Datei unter 200 Zeilen."

Dann Hooks:

"Richte folgende Hooks ein in .claude/settings.json: Notification-Hook fuer Windows Desktop, Auto-Format mit Prettier nach Edits, File-Protection fuer .env und package-lock.json, Compaction-Recovery Hook der meinen Tech-Stack injiziert, und einen Stop-Hook der prueft ob alle Tasks erledigt sind."

### Phase 2: Playwright CLI (10 Minuten)

In PowerShell:
```
npm install -g @playwright/cli@latest
npx playwright install chromium
```

Dann in Claude Code:
"Erstelle einen Playwright-Skill fuer Browser-Automation mit Support fuer Headed/Headless Mode, Form Filling, File Uploads und Screenshots."

Test: "Oeffne https://example.com im Browser und mach einen Screenshot."

### Phase 3: Firecrawl CLI (10 Minuten)

In PowerShell:
```
npm install -g firecrawl
```

Dann: https://firecrawl.dev registrieren, API Key kopieren.

Environment Variable setzen:
```
setx FIRECRAWL_API_KEY "fc-dein-key-hier"
```

Test in Claude Code: "Scrape die Startseite von therandommakertheory.com und zeig mir den Markdown."

### Phase 4: NotebookLM CLI (15 Minuten)

In PowerShell:
```
pip install notebooklm-mcp-cli
nlm auth login
```

Browser oeffnet sich, Google-Login durchfuehren.

Dann in Claude Code:
```
nlm setup add claude-code
```

Test: "Erstelle ein NotebookLM Notebook mit 3 YouTube-Videos ueber Claude Code und lass mir eine Zusammenfassung generieren."

### Phase 5: Obsidian (15 Minuten)

Download von https://obsidian.md und installieren. Vault-Ordner waehlen oder erstellen.

Dann Claude Code im Vault-Ordner oeffnen und eingeben:
"Erstelle die Obsidian Vault Struktur: inbox, research, content-ideas, workflows, learnings, people, daily-notes, templates. Erstelle in jedem Ordner ein README und erstelle eine CLAUDE.md im Vault-Root die Obsidian-Konventionen definiert (Wiki-Links, Backlinks, Tags)."

### Phase 6: Scheduled Tasks (20 Minuten)

In Cowork Desktop, jeden Task einzeln anlegen:
- Morning Dashboard (07:00, Mo-Fr)
- Content Pipeline (08:00, Mo-Fr)
- Social Recycler (12:00, Mo-Mi-Fr)
- SEO Health Check (09:00, Montag)

### Phase 7: Skills erstellen (30 Minuten)

In Claude Code:
"Nutze den Skill Creator um folgende Skills zu erstellen: youtube-upload, social-post, research, deploy. Teste jeden Skill einmal mit einem Eval."

### Gesamtzeit: ca. 2-3 Stunden

Davon ist vielleicht 30 Minuten echte Handarbeit (npm installs, API Key holen, Google Login). Den Rest macht Claude.

## Was das Ganze kostet

Nichts extra. Alles was du brauchst:

- Claude API/Pro Plan (hast du schon)
- Obsidian: Kostenlos
- NotebookLM: Kostenlos (Google zahlt)
- Playwright CLI: Open Source
- Firecrawl CLI: 500 Credits/Monat kostenlos
- Alle anderen Tools: Open Source

Der einzige potenzielle Zusatz: Firecrawl Pro fuer $19/Monat wenn du mehr als 100 Seiten pro Monat scrapen willst. Fuer die meisten Leute reicht der Free Tier.

## Risiken und ehrliche Einschaetzung

Ich bin kein Typ der dir ein perfektes Bild malt und verschweigt wo es hakt.

**NotebookLM CLI ist inoffiziell.** Das Package basiert auf einer Reverse-Engineered API. Google koennte das jederzeit aendern. Das Repository hat 1.300+ GitHub Stars und aktive Wartung, aber es gibt keine Garantie. Fallback: Claude direkt fuer Research nutzen (kostet dann Tokens).

**Context Rot ist real.** Auch mit allen Hooks und Sub-Agents: Wenn du eine 3-Stunden-Session ohne /clear machst, wird die Qualitaet sinken. Die Tools mindern das Problem, loesen es aber nicht zu 100%.

**Scheduled Tasks brauchen einen laufenden PC.** Kein PC an, kein Task. Kein macOS oder Windows, keine Desktop-Tasks. Workaround: GitHub Actions fuer Tasks die 24/7 laufen muessen.

**Playwright Login-Sessions laufen ab.** Spotify, LinkedIn, jeder Service hat Session-Timeouts. Du musst gelegentlich neu einloggen. Nicht oft, aber es passiert.

**Skills muessen gepflegt werden.** Wenn Claude ein groesseres Update bekommt, koennen Capability Uplift Skills obsolet werden. Loesung: Skill Creator Evals regelmlaessig laufen lassen.

## Der Daily Workflow: So sieht ein Tag aus

**07:00:** PC wacht auf. Cowork startet Morning Dashboard Task. KI-News werden gescraped, analysiert, als Daily Note in Obsidian gespeichert.

**07:30:** Du oeffnest Obsidian. Dein Briefing liegt da. 5 Minuten scannen, fertig informiert.

**08:00:** Content Pipeline startet. Claude nimmt den naechsten Artikel aus der Queue, recherchiert, schreibt einen Draft.

**09:00:** Du setzt dich hin. Draft liegt bereit. Du liest, gibst Feedback: "Mehr Praxis-Beispiele in Abschnitt 3, die Einleitung ist zu lang." Claude ueberarbeitet.

**09:30:** Artikel fertig. Ein Command: `/deploy`. Claude macht Git Commit, Push, checkt den Vercel Deploy, macht einen Screenshot der Live-Seite zur QA.

**10:00:** `/youtube-upload` wenn ein Video dabei ist. `/social-post` fuer LinkedIn, X, Threads. Alles automatisch.

**10:15:** Du arbeitest an deinem naechsten Projekt. Claude ueberwacht im Hintergrund: `/loop 10m check if deploy is live and social posts are scheduled`.

**12:00:** Social Recycler postet automatisch aeltere Artikel in neuen Formaten.

**Zwischendurch:** Spontane Idee? Schnell in Obsidian notieren. Claude findet es bei der naechsten Research-Session und baut es ein.

![Der Daily Workflow: So laeuft ein automatisierter Tag ab](/images/blog/claude-code-ultimate-setup-daily-workflow.webp)

## Teil 9: Das GSD Framework. Fuer die grossen Projekte

Alles was ich bisher beschrieben habe, funktioniert fuer taeglich wiederkehrende Tasks und mittelgrosse Aufgaben. Aber was wenn du ein komplett neues Feature bauen willst? Eine neue Webapp? Ein Design-System-Rebuild?

Dafuer gibt es GSD: Get Shit Done. Ein Framework das Claude Code in einen strukturierten Entwicklungsprozess zwingt.

### Das Problem das GSD loest

Ohne Framework passiert folgendes: Du sagst "Bau mir eine Landingpage", Claude legt los, nach 30 Nachrichten ist der Context voll, die Haelfte funktioniert nicht, du faengst von vorne an. Classic Context Rot Loop.

GSD verhindert das durch einen 6-Phasen-Prozess:

**Phase 1: Initialize.** Claude generiert ein PRD (Product Requirements Document). Was wird gebaut? Warum? Fuer wen? Welche Features?

**Phase 2: Discuss.** Du und Claude gehen das PRD durch. Was fehlt? Was ist zu viel? Hier wird debattiert, nicht gebaut.

**Phase 3: Plan.** Claude bricht das PRD in atomare Tasks auf. Oft 200+ Zeilen XML-Planungsdokument. Jeder Task ist klein genug fuer einen einzelnen Agent.

**Phase 4: Execute.** Sub-Agents arbeiten die Tasks ab. Jeder Agent bekommt einen frischen Context. Kein Context Rot. Der smarteste Agent den du kriegen kannst.

**Phase 5: Verify.** Testing. Manuelle Validation. Screenshots. Unit Tests. Hier wird geprueft, nicht weiterentwickelt.

**Phase 6: Repeat.** Naechste Phase des PRD. Zurueck zu Phase 3.

### Installation

```
npx get-shit-done-cc@latest
```

Dann in Claude Code: `/gsd:new_project` fuer neue Projekte oder `/gsd:map_codebase` fuer bestehende.

### Wann GSD nutzen, wann nicht

**GSD:** Neues Feature > 1 Stunde Arbeit. Kompletter Rebuild. Multi-File-Aenderungen. Alles wo du ein PRD brauchst.

**Kein GSD:** Content schreiben. Social Posts. Einfache Bug Fixes. Alles was in 3-4 Nachrichten erledigt ist.

GSD braucht mehr Tokens upfront (Planning-Phase), spart aber langfristig weil du nicht in Doom-Loops landest.

## Teil 10: Worktrees. Parallele Welten

Worktrees sind ein Git-Feature das Claude Code brillant nutzt. Jede Claude-Session bekommt ihren eigenen Branch, ihre eigene Kopie des Codes, komplett isoliert.

```
Terminal 1: claude --worktree feature-dark-mode
Terminal 2: claude --worktree feature-export
Terminal 3: claude --worktree bugfix-login
```

Drei Terminals, drei Branches, drei komplett unabhaengige Arbeitsbereiche. Kein Merge-Conflict waehrend der Entwicklung. Merge erst wenn alles fertig ist.

Das ist besonders maechtig in Kombination mit Scheduled Tasks: Ein Task kann in einem isolierten Worktree laufen und deine aktuelle Arbeit nicht stoeren.

## Teil 11: Advanced Tipps

### Token-Monitoring mit Status Bar

Richte dir eine permanente Status-Leiste ein die Model-Name, Context-Verbrauch in Prozent und Arbeitsordner anzeigt. Immer sichtbar. Kein Raten mehr ob du bei 30% oder 80% bist.

### /rewind statt Panic

Wenn Claude was kaputt macht: `/rewind`. Laedt einen vorherigen Conversation Save Point. Kein "git checkout", kein manuelles Rueckgaengig-Machen.

### Screenshots statt Beschreibungen

UI-Bug? Mach einen Screenshot und gib ihn Claude. Visueller Context ist praeziser als jede Beschreibung. Claude kann Bilder nativ verarbeiten.

### Web Search fuer aktuelle Infos

Claude's Wissensstand hat ein Cutoff-Datum. Fuer aktuelle Infos: "Nutze Web Search fuer aktuelle Best Practices zu X". Claude sucht live und integriert die Ergebnisse.

### Effort Level anpassen

`/model` laesst dich zwischen Modellen wechseln UND den Effort-Level einstellen. Schnelle Frage? Haiku. Komplexe Architektur? Opus mit maximaler Tiefe. Spart Tokens wo es nicht drauf ankommt.

### CLI > MCP fuer die meisten Tools

Chase Hannegan sagt es, und meine Erfahrung bestaetigt es: CLI-Tools sind fast immer besser als MCP-Server. Weniger Token-Verbrauch, schneller, stabiler. MCP-Server bleiben aktiv und fressen Tokens auch wenn du sie nicht benutzt. 10 ungenutzte MCP-Server = 20.000+ Tokens pro Nachricht verschwendet.

### Skill-Triggering optimieren

Mehr Skills = schlechtere Trigger-Genauigkeit. Anthropics eigene Daten zeigen: Optimierte Descriptions gehen von 50/50 Trigger-Rate auf fast 100%. Wenige, aber perfekt beschriebene Skills schlagen 100 mittelmlaessige Skills jedes Mal.

## Fazit: Die Maschine steht

Das ist kein theoretisches Konzept. Das ist ein funktionierendes System das ich taeglich nutze. 10 Tools, 0 Euro Zusatzkosten, 2-3 Stunden Setup.

Der wichtigste Mindset-Shift: Claude Code ist nicht ein Tool das du benutzt. Es ist ein System das FUeR dich arbeitet. Der Unterschied ist fundamental.

Frueher: Du sitzt am Computer und tippst.
Jetzt: Du gibst Richtung vor und Claude arbeitet. Waehrend du schlaefst, duschst, spazieren gehst.

Das ist nicht faul. Das ist intelligent. Und mit ADHS ist es ueberlebensnotwendig. Jede Entscheidung die ich nicht treffen muss, ist eine Entscheidung die mein Gehirn fuer etwas Kreatives nutzen kann.

Die Maschine steht. Jetzt bist du dran.

## Bonus: Quellen und Weiterlernen

Dieses System ist nicht im luftleeren Raum entstanden. Es basiert auf hunderten Stunden Recherche, Trial-and-Error, und den Insights einiger der besten Claude-Code-Creator im Netz.

**Chase Hannegan (@Chase-H-AI)** hat mit seinen Blog-Posts auf chaseai.io den Grossteil der Tool-Kombinationen dokumentiert die hier beschrieben sind. Seine Posts zu NotebookLM + Obsidian, Playwright CLI, GSD Framework und den 6 Levels of Claude Code sind Pflichtlektuere fuer jeden der Claude Code ernst nimmt.

**Die offizielle Claude Code Dokumentation** (code.claude.com/docs) ist seit Anfang 2026 massiv gewachsen. Hooks, Skills, Sub-Agents, Agent Teams, alles ist dort dokumentiert mit Beispielen und Edge Cases.

**Die Anthropic Community** auf Discord und GitHub hat eine unglaubliche Menge an Open-Source-Skills und Tools produziert. Das Skill-Format (SKILL.md) funktioniert mittlerweile in Claude Code, Cursor, Gemini CLI, Codex CLI und mehr. Ein Skill den du fuer Claude Code schreibst, laeuft auch woanders.

Was mich an diesem ganzen Oekosystem am meisten fasziniert: Wir sind Anfang 2026. Das hier ist Version 1.0. In 6 Monaten wird das alles noch mal deutlich leistungsfaehiger sein. Agent Teams werden aus dem Experimental-Status rauskommen. MCP-Server werden effizienter. Neue CLI-Tools werden auftauchen.

Aber das Fundament das du jetzt aufbaust, CLAUDE.md, Hooks, Skills, Obsidian Vault, das bleibt. Es wird nur besser. Jede Stunde die du jetzt in das Setup investierst, zahlt sich exponentiell aus.

Und ehrlich: Fuer jemanden mit ADHS ist das System pures Gold. Kein "ich muss mich erinnern X zu machen". Kein "ich hab vergessen Y zu checken". Kein Decision Fatigue bei Routine-Aufgaben. Claude uebernimmt die kognitive Last. Du behaltst die kreative Kontrolle.

Das ist keine Zukunftsvision. Das ist jetzt. Und es funktioniert verdammt gut.
