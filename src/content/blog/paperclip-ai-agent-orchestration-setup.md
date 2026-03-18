---
title: "28 AI Agents die fuer mich arbeiten — Mein Paperclip Setup"
slug: "paperclip-ai-agent-orchestration-setup"
date: "2026-03-19"
description: "Ich orchestriere 28 AI Agents mit Paperclip — ohne extra API-Kosten. Mein AI Agent Orchestration Setup mit Claude, Codex, Gemini und Ollama zum Nachbauen."
tags: ["paperclip", "ai-agents", "automation", "claude-code", "orchestration", "ai-agent-orchestration"]
category: "automatisierung"
draft: true
titleAccent: "28 AI Agents"
heroImage: "/images/blog/paperclip-agent-empire-og.webp"
readingTime: 14
pillar: "automation"
keywords: ["paperclip ai", "ai agent orchestration", "claude code agents", "multi agent system"]
---

## TL;DR

- Paperclip ist ein Open-Source Framework fuer AI Agent Orchestration — es koordiniert mehrere AI Agents als virtuelles Unternehmen
- Ich hab 28 Agents in 2 Companies aufgesetzt: Content Pipeline fuer meinen Blog + Gaming Studio Operations
- Alles laeuft ueber bestehende Subscriptions (Claude Max, ChatGPT Pro, Gemini, Ollama) — kein einziger Extra-Cent fuer API-Keys
- Nachts arbeiten lokale Ollama-Agents auf meiner RTX 5080 waehrend ich schlafe
- Die Completion Chains automatisieren den kompletten Weg von Research bis Deploy
- Mein [Life OS Dashboard](/blog/life-os-paperclip-agent-office-widget) zeigt alle Agents als Widget in Echtzeit

---

Ich muss dir was zeigen. Und ich weiss, das klingt erstmal komplett uebertrieben — aber ich hab 28 AI Agents die fuer mich arbeiten. Nicht als Spielerei. Nicht als Proof of Concept. Als echtes, produktives System das jeden Tag Content produziert, Code reviewed, Social Media Posts erstellt und Deployments macht.

Das Ganze heisst Paperclip. Und ich nehm dich jetzt mit durch mein komplettes Setup.

## Was ist Paperclip eigentlich?

Paperclip ist ein Open-Source Framework fuer AI Agent Orchestration. Wenn Claude Code ein Mitarbeiter ist, dann ist Paperclip das Unternehmen drum herum. Es ist quasi die Management-Schicht die dafuer sorgt, dass mehrere AI Agents zusammenarbeiten koennen ohne sich gegenseitig in die Quere zu kommen.

Und das ist ein wichtiger Punkt: Es ist **nicht** ein weiterer Chatbot. Nicht ein Workflow-Builder wie [n8n](/blog/n8n-automatisierung-fuer-anfaenger). Nicht ein Prompt Manager. Es ist die Koordinationsebene darueber.

**Was Paperclip konkret macht:**

- **Org Charts mit Hierarchie** — CEO Agent delegiert an Team Leads, die delegieren an Spezialisten
- **Per-Agent Budgets und Cost Tracking** — ich seh genau was jeder Agent kostet
- **Heartbeat-System** — Agents wachen auf Schedule auf, checken ihre Tasks, arbeiten, und gehen wieder schlafen
- **Approval Gates** — bei wichtigen Entscheidungen muss ich als Mensch genehmigen
- **Multi-Company Support** — mein Blog und mein Gaming Studio sind komplett getrennt
- **Immutable Audit Trail** — ich kann nachvollziehen was welcher Agent wann gemacht hat

Das klingt nach viel. Ist es auch. Aber im Alltag fuehlt sich das erstaunlich natuerlich an — wie ein kleines Buero das halt zufaellig aus AI Agents besteht.

Und bevor du fragst: Ja, das laeuft alles lokal. Paperclip ist eine Node.js App die auf deinem Rechner oder Server laeuft. Keine Cloud, kein SaaS, deine Daten bleiben bei dir. Das war fuer mich ein Hauptgrund — ich will nicht dass meine Content-Strategie und meine Agent-Instructions auf irgendeinem fremden Server liegen.

## Warum AI Agent Orchestration und nicht einfach Claude Code?

Berechtigte Frage. Ich hab Claude Code vorher schon intensiv genutzt — und wenn du wissen willst wie sich die verschiedenen AI Coding Tools schlagen, hab ich einen [ausfuehrlichen Vergleich](/blog/claude-code-vs-cursor-vs-copilot-2026) geschrieben.

Aber ein einzelner Agent hat Grenzen. Claude Code ist fantastisch fuer Coding Tasks. Aber wer schreibt die Blog-Artikel? Wer erstellt die Social Media Posts? Wer ueberwacht die SEO Rankings? Wer deployed? Wer macht Quality Assurance?

Sobald du mehr als 3-4 verschiedene Aufgabentypen hast, brauchst du Spezialisierung. Und Spezialisierung braucht Koordination. Und Koordination braucht ein System.

Das ist der Punkt wo AI Agent Orchestration ins Spiel kommt. Nicht weil ein Agent zu dumm ist — sondern weil verschiedene Aufgaben verschiedene Models, verschiedene Instructions und verschiedenen Kontext brauchen.

## Mein Setup: 2 Companies, 28 Agents

### Company 1: TRMT Blog Operations (21 Agents)

Mein Blog [therandommakertheory.com](https://therandommakertheory.com) hat eine komplette Content Pipeline. Und wenn ich komplett sage, meine ich komplett — von der Trend-Erkennung bis zum fertigen Deploy.

**Die Kernteam-Agents (Claude Code, Max Plan):**

| Agent | Rolle | Was er macht |
|-------|-------|-------------|
| Dispatch Controller | CEO | Orchestriert alles, erstellt Tasks, ueberwacht Deadlines |
| Content Writer | CMO | Schreibt 1500+ Woerter Artikel in meiner Brand Voice |
| Research Scout | Research | Findet KI-News und Trends, bereitet Briefings vor |
| Claude Engineer | Lead Dev | SvelteKit Features, Bug Fixes, Refactoring |
| Social Publisher | Social Media | LinkedIn, X und Threads Posts |
| SEO Analyst | SEO | Keywords, Rankings, Competitor Watch |
| Deploy Bot | DevOps | Baut und deployed die SvelteKit Seite |
| QA Inspector | Quality | Prueft Deployments auf Fehler |

**Codex Agent (ChatGPT Pro):**

| Agent | Rolle | Was er macht |
|-------|-------|-------------|
| Code Engineer | Code Review | Reviewed PRs parallel zu Claude, zweite Meinung |

Und ja — ich lasse bewusst einen Claude Agent und einen Codex Agent am gleichen Repo arbeiten. Verschiedene Models finden verschiedene Bugs. Das ist eigentlich einer der groessten Vorteile von Multi-Agent AI Agent Orchestration: Diversitaet in den Perspektiven.

**Gemini Agents (Google Workspace):**

| Agent | Rolle | Was er macht |
|-------|-------|-------------|
| Visual Creator | Design | OG Images, Thumbnails, Social Media Grafiken |
| Video AI Engineer | Video | Video Scripts, YouTube Metadaten |

**Ollama Agents (LOKAL, GRATIS):**

| Agent | Rolle | Model | Was er macht |
|-------|-------|-------|-------------|
| Night Worker | Nachtschicht | qwen3:14b | Arbeitet nachts waehrend ich schlafe |
| Vault Keeper | Wissensmanagement | qwen3:14b | Verwaltet meinen Obsidian Vault |
| Knowledge Miner | Data Mining | qwen3:14b | Extrahiert Wissen aus alten Chats |

### Company 2: Active Fungus Studios (7 Agents)

Mein Gaming Studio hat ein komplett separates Team. Getrennte Company, getrennte Daten, getrennte Budgets. Das ist wichtig — ich will nicht dass mein Blog-Content irgendwie in die Gaming-Kommunikation leakt.

- **AFS Director** — Studio Operations und Strategie
- **MF Community Lead** — Discord Community fuer Medieval Frontiers
- **Community Pulse** — Sentiment Analyse der Player-Community
- **Prospera Marketer** — Marketing Kampagnen
- **AFS Designer** — Game UI und Marketing Visuals

## Der Trick: Keine API-Keys, nur Subscriptions

Jetzt kommt der Teil der die meisten Leute ueberrascht. Paperclip startet die CLI-Tools als Subprozesse. Die nutzen automatisch deine bestehende Subscription-Authentifizierung. Das heisst: Kein `ANTHROPIC_API_KEY`. Kein `OPENAI_API_KEY`. Keine Extra-Kosten.

| CLI Tool | Subscription | Monatliche Kosten | Extra fuer Paperclip |
|----------|-------------|-------------------|---------------------|
| Claude Code | Max Plan (5x) | ~100 USD | 0 EUR |
| Codex CLI | ChatGPT Pro | ~200 USD | 0 EUR |
| Gemini CLI | Google Workspace | bereits vorhanden | 0 EUR |
| Ollama | Lokal (RTX 5080) | Stromkosten | 0 EUR |
| **Paperclip selbst** | Open Source | **0 EUR** | **0 EUR** |

**Wichtig:** Wenn du `ANTHROPIC_API_KEY` oder `OPENAI_API_KEY` in deinen Environment Variables gesetzt hast, nutzt die CLI die API statt der Subscription. Das willst du nicht — API-Calls kosten richtig Geld bei dem Volumen. Also: Keys raus aus den Env Vars wenn du ueber Subscription arbeiten willst.

Wenn du wissen willst wie sich [ChatGPT und Claude im direkten Vergleich](/blog/chatgpt-vs-claude-content-creator-2026) schlagen: Ich nutze beide jeden Tag und hab ausfuehrlich darueber geschrieben.

## Die Completion Chains: Automatischer Workflow von A bis Z

Das ist eigentlich das Herzstueck meiner AI Agent Orchestration. Die Completion Chains definieren was nach was passiert — automatisch, ohne dass ich eingreifen muss.

**Content Pipeline Chain:**

```
Research Scout findet Trend
    → Dispatch Controller erstellt Content Writer Task
        → Content Writer schreibt Artikel
            → Visual Creator erstellt OG Image (parallel)
            → Social Publisher erstellt Posts (parallel)
                → Deploy Bot baut und deployed
                    → QA Inspector prueft das Deployment
```

Das laeuft komplett autonom. Ich kriege eine Telegram-Notification wenn der Artikel im Draft ist und wenn der Deploy fertig ist. Dazwischen muss ich quasi nichts machen — ausser bei Approval Gates wo ich explizit absegnen muss.

**Wie das technisch funktioniert:**

Jeder Agent hat ein Heartbeat-System. Das heisst: Er wacht in regelmaessigen Intervallen auf, checkt ob er Tasks hat, arbeitet die ab, und geht wieder schlafen. Wenn ein Agent einen Task als "done" markiert, checkt der Dispatch Controller automatisch ob es einen Nachfolger in der Chain gibt und erstellt den naechsten Task.

Das klingt simpel, aber die Eleganz liegt im Detail. Wenn der Visual Creator und der Social Publisher parallel laufen, wartet der Deploy Bot bis **beide** fertig sind. Wenn einer blockiert ist, wird das eskaliert. Wenn ein Agent zu lange braucht, kriegt er einen Reminder.

## Model-Routing: Das richtige Gehirn fuer den richtigen Job

Nicht jeder Task braucht das teuerste Model. Das ist eigentlich eine der wichtigsten Lektionen die ich bei meinem AI Agent Orchestration Setup gelernt hab.

| Task-Typ | Model | Warum |
|----------|-------|-------|
| Artikel schreiben (Brand Voice) | Claude Opus 4.6 | Beste Schreibqualitaet, versteht Nuancen |
| Code Reviews | Codex 5.4 | Anderes Model = andere Perspektive |
| OG Images | Gemini 2.5 Pro | Multimodal, gut fuer visuellen Content |
| SEO Checks, Deployments | Claude Haiku 4.5 | Schnell, guenstig, reicht voellig |
| Nacht-Tasks (Low Priority) | Ollama qwen3:14b | Komplett kostenlos, laeuft lokal |

Die Faustregel: Kreative Tasks kriegen teure Models. Repetitive Tasks kriegen guenstige Models. Und alles was warten kann, laeuft nachts auf Ollama.

## Nacht-Modus: Agents die arbeiten waehrend ich schlafe

Das ist ehrlich gesagt einer meiner Lieblingsteile. Meine Ollama-Agents laufen auf meiner RTX 5080 mit 16GB VRAM. Komplett lokal, keine Cloud, keine Kosten ausser Strom.

**Typische Nacht-Aufgaben:**

- Ungelesene KI-News der letzten 48 Stunden zusammenfassen
- Keyword-Clustering fuer kommende SEO-Analysen
- Obsidian Vault aufraeumen und Cross-Referenzen finden
- Blog Draft Outlines fuer die naechste Woche vorbereiten
- Community Sentiment aus Discord analysieren

Morgens finde ich ein fertiges Briefing. Das ist quasi mein morgendlicher Stand-up — nur dass mein Team aus AI Agents besteht und der Stand-up ein Markdown-File ist.

Klappt das immer perfekt? Nein. Manchmal halluziniert der Night Worker und die Zusammenfassungen sind Quatsch. Manchmal crashed Ollama weil VRAM voll laeuft. Einmal hat der Vault Keeper angefangen, Obsidian-Notes zu duplizieren statt zu verlinken — das hab ich erst nach drei Tagen bemerkt.

Aber in 80% der Faelle spart es mir gut eine Stunde am Morgen. Und die 20% wo es schiefgeht? Dafuer hab ich den QA Inspector der morgens als erstes die Nacht-Ergebnisse prueft. Agent der Agent prueft. Klingt absurd, funktioniert aber.

## n8n als Bruecke zur Aussenwelt

Paperclip ist gut in Agent-zu-Agent Koordination. Aber fuer externe Trigger — Webhooks, RSS-Feeds, Telegram-Notifications — brauche ich [n8n](/blog/n8n-automatisierung-fuer-anfaenger). Die beiden ergaenzen sich perfekt.

Meine 25+ n8n Workflows sind ueber einen "Paperclip Task Router" verbunden:

```
n8n Workflow findet Trend (RSS/Twitter/Reddit)
    → POST /webhook/paperclip-task
        → Paperclip erstellt Issue
            → Richtiger Agent wird automatisch zugewiesen
                → Agent arbeitet
                    → Telegram Notification an mein Handy
```

Das geile daran: n8n triggert Paperclip, Paperclip orchestriert die Agents, und n8n informiert mich ueber das Ergebnis. Die beiden sind wie Legosteine die einfach zusammenpassen.

Wenn du n8n noch nicht kennst, fang mit meinem [n8n Tutorial](/blog/n8n-automatisierung-fuer-anfaenger) an. Und wenn du sehen willst wie ich n8n mit ChatGPT verbinde, schau dir meinen [n8n + ChatGPT Workflow Artikel](/blog/n8n-chatgpt-workflow-2026) an.

## Budget-Management: Wann Agents automatisch pausieren

Paperclip hat ein eingebautes Budget-System. Jeder Agent hat ein monatliches Budget in Cents. Ab 80% Verbrauch fokussiert der Agent nur noch auf kritische Tasks. Bei 100% wird er automatisch pausiert.

Das klingt streng, ist aber noetig. Ohne Limits wuerden die Agents endlos arbeiten und die Subscription-Limits sprengen. Besonders bei Claude Max, wo du zwar viel Kapazitaet hast aber nicht unendlich.

**Meine Budget-Strategie:**

- **Hohe Budgets** fuer Content Writer und Claude Engineer (die produzieren den meisten Wert)
- **Mittlere Budgets** fuer Research und Social (wichtig aber nicht kritisch)
- **Minimale Budgets** fuer QA und Deploy (kurze Tasks, wenig Tokens)
- **Kein Budget** fuer Ollama-Agents (kosten eh nichts)

## Approval Gates: Wo der Mensch entscheidet

Nicht alles soll autonom laufen. Es gibt Momente wo ich als Mensch eingreifen muss. Paperclip hat dafuer Approval Gates:

- **Agent Hiring** — wenn ein neuer Agent erstellt werden soll, muss ich genehmigen
- **Cross-Team Delegation** — wenn ein Blog-Agent einen Gaming-Agent braucht
- **Budget-Ueberschreitungen** — wenn ein Agent mehr braucht als zugeteilt

Das ist wichtig. AI Agent Orchestration ohne menschliche Kontrolle ist ein Rezept fuer Chaos. Die Agents sind gut in ausfuehrender Arbeit, aber strategische Entscheidungen will ich selbst treffen.

## Mobile Access und mein Life OS Dashboard

Paperclip ist eine PWA — ich hab sie auf meinem iPhone als Home-Screen App installiert. Funktioniert im lokalen WLAN perfekt. Unterwegs brauche ich einen VPN oder Tailscale zurueck zu meinem Home Server.

Aber das eigentliche Highlight ist mein [Life OS Dashboard mit dem Agent Office Widget](/blog/life-os-paperclip-agent-office-widget). Das pollt die Paperclip API alle 30 Sekunden und zeigt mir:

- Gruener Punkt = Agent ist idle
- Oranger Punkt mit Puls-Animation = Agent arbeitet gerade
- Roter Punkt = Agent ist blockiert und braucht meine Hilfe
- Gruppiert nach Company (TRMT / Active Fungus Studios)

Fuer mein ADHS-Gehirn ist das Gold wert. "Out of sight, out of mind" ist bei mir woertlich zu nehmen — wenn ich die Agents nicht sehe, vergesse ich dass sie existieren.

## Setup in 30 Minuten: So startest du selbst

```bash
git clone https://github.com/nicepaperweb/paperclip.git
cd paperclip
pnpm install
pnpm dev
```

Dann im Browser: `http://localhost:3100`. Company erstellen, ersten Agent hinzufuegen, einen Task zuweisen, Heartbeat triggern. Das wars.

**Voraussetzungen:** Node.js 20+, pnpm, und mindestens eins der CLI-Tools installiert (Claude Code, Codex, oder Ollama). Fuer den Start reicht Ollama voellig — das ist kostenlos und laeuft lokal. Wenn du Claude Code oder Codex nutzen willst, brauchst du natuerlich die jeweilige Subscription.

Die Dokumentation ist ehrlich gesagt noch ausbaufaehig — das Projekt ist jung und bewegt sich schnell. Aber der Code ist sauber und die Grundkonzepte sind innerhalb einer Stunde verstanden. Und die Community auf GitHub und Discord ist super hilfsbereit wenn du mal haengst.

**Mein Tipp fuer den Start:** Fang mit 3 Agents an. Nicht 28. Ein CEO/Dispatch Agent, ein Worker Agent fuer deine Hauptaufgabe, und ein QA Agent der das Ergebnis prueft. Sobald das laeuft, skalierst du.

## Was ich gelernt hab (und was noch nervt)

**Was genial funktioniert:**

1. **Completion Chains** — der automatische Workflow von Research bis Deploy ist echte Zeitersparnis
2. **Model-Diversitaet** — verschiedene Models finden verschiedene Probleme
3. **Nacht-Agents** — aufwachen und ein fertiges Briefing haben ist unschlagbar
4. **Audit Trail** — ich kann jederzeit nachvollziehen was passiert ist

**Was noch nervt:**

1. **Heartbeat Timing** — wenn alle Agents gleichzeitig aufwachen, gibt es Rate Limits. Ich muss die Schedules manuell staffeln
2. **Ollama Stabilitaet** — crashed gelegentlich bei langen Tasks wenn der VRAM voll laeuft
3. **Instructions schreiben** — jeder Agent braucht eine detaillierte Markdown-Datei mit Kontext, Regeln und Beispielen. Das ist Arbeit
4. **Debugging** — wenn eine Chain haengt, muss ich manchmal 5 verschiedene Agent-Logs durchgehen um zu verstehen warum
5. **Kein echtes Scheduling** — Heartbeats werden extern getriggert (cron oder n8n), Paperclip selbst hat keinen eingebauten Scheduler

Das ist ehrlich. Es ist kein magisches "Klick und alles funktioniert" Tool. Es ist ein Framework das dir Struktur gibt — aber die Arbeit, gute Instructions zu schreiben und die Agents richtig zu konfigurieren, die bleibt bei dir.

Und ganz ehrlich: Die Instructions sind der groesste Zeitfresser. Mein Content Writer hat eine Markdown-Datei mit ueber 200 Zeilen — Brand Voice Regeln, Anti-AI-Filter, SEO-Anforderungen, Interlink-Strategien. Das zu schreiben hat laenger gedauert als Paperclip selbst aufzusetzen. Aber es ist auch der Grund warum die Ergebnisse so gut sind. Garbage in, garbage out — das gilt bei AI Agent Orchestration genauso wie ueberall sonst.

**Mein Tipp:** Fang mit kurzen Instructions an und iteriere. Schreib 20 Zeilen, lass den Agent arbeiten, schau was schiefgeht, ergaenze die Instructions. Nach 2-3 Iterationen hast du 80% der Edge Cases abgedeckt.

## Was es kostet vs. was es bringt

Meine monatlichen Kosten:

| Posten | Kosten |
|--------|--------|
| Claude Max (5x) | ~100 USD |
| ChatGPT Pro | ~200 USD |
| Google Workspace | bereits vorhanden |
| Ollama + Strom | ~5 EUR |
| Paperclip | 0 EUR (Open Source) |
| **Total** | **~310 USD/Monat** |

Was ich dafuer kriege: 3-4 Blog-Artikel pro Woche, taegliche Social Media Posts, automatisches SEO Monitoring, Code Reviews, Community Management, und ein morgendliches Briefing. Das wuerde als Freelancer-Team locker 3.000-5.000 EUR pro Monat kosten.

Lohnt sich das? Fuer mich absolut. Aber ich hab auch Monate gebraucht um das System so aufzusetzen. Wenn du nur einen Blog-Artikel pro Woche schreibst, ist das Overkill. Wenn du aber wie ich mehrere Projekte parallel faehrst und jeden Tag Content produzieren willst, dann zahlt sich die Investition schnell aus.

Ein Rechenbeispiel: Allein der Research Scout spart mir taeglich 30-45 Minuten manuelle News-Recherche. Auf den Monat sind das 15-20 Stunden. Der Content Writer spart mir pro Artikel etwa 2-3 Stunden Schreibzeit (ich muss trotzdem reviewen und editieren, aber der erste Draft steht). Bei 3-4 Artikeln pro Woche sind das nochmal 8-12 Stunden. Rechne ich das zusammen, spart mir das System grob 25-30 Stunden pro Monat. Fuer ~310 USD. Das ist weniger als 12 USD pro gesparte Stunde.

## Naechste Schritte

Ich bin noch lange nicht fertig. Was als naechstes kommt:

- **Pixel-Art Agent Visualisierung** — die Agents als kleine Pixel-Figuren in meinem Life OS Dashboard darstellen (inspiriert von Claw Empire)
- **ChatGPT Knowledge Export** — 1+ Jahr alte Chats in Obsidian extrahieren und als Wissensbasis nutzen
- **AfterShoot-Alternative** — mein eigenes AI Photo Culling Tool bauen (dazu kommt bald ein eigener Artikel!)
- **24/7 Autonomous Operation** — besseres Heartbeat Scheduling damit die Agents wirklich rund um die Uhr arbeiten

---

AI Agent Orchestration ist kein Hype-Thema mehr. Es ist ein echtes Werkzeug das echte Arbeit erledigt. Und mit Paperclip kann das quasi jeder aufsetzen der bereit ist, sich ein paar Stunden hinzusetzen.

Ob du 28 Agents brauchst? Wahrscheinlich nicht. Ob du 3-5 Agents brauchen koenntest die dir repetitive Arbeit abnehmen? Ziemlich sicher ja. Und das Schoene an AI Agent Orchestration ist: Du kannst klein anfangen und nach Bedarf skalieren. Mein System hat auch mal mit 3 Agents angefangen. Die anderen 25 sind ueber Wochen dazugekommen, einer nach dem anderen, wenn ich gemerkt hab dass ich einen bestimmten Workflow automatisieren will.

*Paperclip ist Open Source unter MIT License. Fragen? Schreib mir auf [LinkedIn](https://linkedin.com/in/trmt) oder [X](https://x.com/trmt).*
