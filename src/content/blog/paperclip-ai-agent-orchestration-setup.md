---
title: "28 AI Agents die für mich arbeiten — Mein Paperclip Setup"
slug: paperclip-ai-agent-orchestration-setup
description: "Wie ich mit Paperclip AI 28 Agents orchestriere — ohne einen Cent extra zu zahlen. Claude Code, Codex, Gemini und Ollama in einem System."
date: "2026-04-08"
category: automation
tags: [paperclip, ai-agents, automation, claude-code, orchestration]
heroImage: /images/blog/paperclip-agent-empire-og.webp
pillar: automation
draft: false
readingTime: 14
titleAccent: "28 AI Agents"
keywords: [ai agent orchestration, paperclip ai, claude code agents, multi agent system]
heroImage: "/images/blog/paperclip-ai-agent-orchestration-setup-1.webp"
heroImageThumb: "/images/blog/paperclip-ai-agent-orchestration-setup-1-thumb.webp"
---

# 28 AI Agents die für mich arbeiten — Mein Paperclip Setup

## TL;DR

- Paperclip AI ist ein Open-Source Agent Orchestration Framework
- Ich hab 22 Agents in 2 Companies aufgesetzt — für meinen Blog und mein Gaming Studio
- Alles läuft über bestehende Subscriptions: Claude Max, ChatGPT Pro, Google Workspace, Ollama
- Kein einziger Extra-Cent für API-Keys
- Die Agents haben Completion Chains — Research → Schreiben → Design → Deploy passiert automatisch
- Nachts arbeiten lokale Ollama-Agents während ich schlafe
- Ein Health Monitor Agent überwacht alle 30 Minuten ob alles läuft

---

Stell dir vor, du hast ein Team. Nicht irgendein Team — 22 spezialisierte AI Agents, die für dich recherchieren, schreiben, coden, designen, deployen und sogar nachts weiterarbeiten während du schläfst.

Klingt nach Science Fiction? Ist es seit letzter Woche nicht mehr. Willkommen in meinem Paperclip Setup. Das hier ist kein theoretischer Artikel. Kein "10 Wege wie AI Agents die Zukunft verändern" Gelaber. Das ist ein ehrlicher Build Log von jemandem, der das Ding tatsächlich aufgesetzt hat, eine Woche lang benutzt hat, und dir jetzt erzählt was funktioniert — und was nicht.

## Was ist Paperclip AI eigentlich?

Paperclip ist ein Open-Source Framework das mehrere AI Agents als virtuelles Unternehmen orchestriert. Wenn Claude Code ein einzelner Mitarbeiter ist, dann ist Paperclip das Büro in dem alle sitzen.

Stell's dir so vor: Du hast einen Fotografen (Visual Creator), einen Texter (Content Writer), einen SEO-Spezialisten (SEO Analyst) und einen Deployment-Ingenieur (Deploy Bot). Bisher musstest du jedem einzeln sagen was er tun soll. Mit Paperclip gibst du dem CEO (Dispatch Controller) EINE Aufgabe, und der verteilt die Arbeit automatisch.

**Was Paperclip konkret macht:**

- Org Charts mit Hierarchie (CEO → Teams → Agents)
- Per-Agent Budgets und Cost Tracking
- Heartbeat-System — Agents wachen auf Schedule auf und arbeiten
- Approval Gates — ich genehmige wichtige Entscheidungen
- Multi-Company Support — mein Blog und mein Gaming Studio sind getrennte Firmen
- Audit Trail — ich seh genau was welcher Agent wann gemacht hat

Und das Beste: Es ist keine Cloud-SaaS. Läuft auf deinem Rechner. Port 3100. Fertig.

## Mein Setup: 2 Companies, 22 Agents, 4 AI-Backends

### Die Agent-Hierarchie

An der Spitze sitzt der **Dispatch Controller**. Der wird alle 15 Minuten per Heartbeat geweckt und checkt: Gibt es neue Aufgaben? Sind Chains steckengeblieben? Muss jemand eskaliert werden? Der Typ ist quasi mein virtueller Projektmanager.

Darunter die Spezialisten. Hier die komplette Liste — ja, mit echten Model-Zuweisungen und Kosten:

| Agent                     | Model            | Kosten-Tier | Aufgabe                     |
| ------------------------- | ---------------- | ----------- | --------------------------- |
| Dispatch Controller       | Opus 4.6         | $$$         | Orchestrierung, Routing     |
| Content Writer            | Opus 4.6         | $$$         | Blog-Artikel in TRMT Voice  |
| Claude Engineer           | Sonnet 4.6       | $$          | SvelteKit, Architektur      |
| Code Engineer             | Codex 5.4        | $$          | Code Reviews, Bugs          |
| Life OS Dev               | Sonnet 4.6       | $$          | React Dashboard             |
| Video AI Engineer         | Sonnet 4.6       | $$          | Python/PyTorch              |
| Research Scout            | Haiku 4.5        | $           | KI-News, Trends             |
| Social Publisher          | Haiku 4.5        | $           | LinkedIn, X, Threads        |
| SEO Analyst               | Haiku 4.5        | $           | Keywords, Rankings          |
| Deploy Bot                | Haiku 4.5        | $           | Git + Vercel                |
| QA Inspector              | Haiku 4.5        | $           | Lighthouse, Links           |
| **System Health Monitor** | **Haiku 4.5**    | **$**       | **Alle Systeme überwachen** |
| Visual Creator            | Gemini 2.5 Pro   | $$          | OG Images, Thumbnails       |
| Night Worker              | Ollama qwen3:14b | **GRATIS**  | Nacht-Batch                 |
| Vault Keeper              | Ollama qwen3:14b | **GRATIS**  | Obsidian Vault              |
| Knowledge Miner           | Ollama qwen3:14b | **GRATIS**  | ChatGPT Export              |

Die Logik dahinter: Kreative Arbeit (Content, Architektur) kriegt Opus oder Sonnet — da zählt Qualität. Repetitive Checks (SEO, QA, Deploy) kriegen Haiku — 10x billiger, reicht völlig. Und nachts? Ollama. Kostet halt nichts. Meine RTX 5080 macht die Arbeit.

### Der Trick: Keine API-Keys, nur Subscriptions

Hier wird's interessant. Paperclip startet die CLI-Tools als Subprozesse. Die nutzen automatisch deine bestehende Subscription-Auth:

| CLI             | Subscription              | Extra-Kosten |
| --------------- | ------------------------- | ------------ |
| Claude Code     | Max Plan (~100 USD/Mo)    | 0 EUR extra  |
| Codex           | ChatGPT Pro (~200 USD/Mo) | 0 EUR extra  |
| Gemini          | Google Workspace          | 0 EUR extra  |
| Ollama          | Lokal (RTX 5080)          | Strom        |
| **Total Extra** |                           | **0 EUR**    |

**Wichtig:** Keine `ANTHROPIC_API_KEY` in den Environment Variables setzen! Sonst nutzt die CLI die API statt der Subscription — und du zahlst per Token.

## Completion Chains: Die eigentliche Magie

OK, einzelne Agents sind nett. Aber das Killer-Feature sind die **Completion Chains**. Die funktionieren so:

```
Research Scout findet Trend [done]
    ↓ automatisch
Content Writer schreibt Artikel [done]
    ↓ automatisch (parallel!)
Visual Creator: OG Image ──┐
Social Publisher: Posts ────┤ gleichzeitig
    ↓ warte auf beide
Deploy Bot: Git Push + Vercel [done]
    ↓ automatisch
QA Inspector: Lighthouse Check
```

Wenn der Research Scout seinen Job erledigt, erstellt ein n8n Workflow automatisch den nächsten Task für den Content Writer. Kein manuelles Eingreifen. Kein "Hey Claude, der Research ist fertig, jetzt schreib bitte den Artikel."

In der Praxis heißt das: Ich gehe abends ins Bett, der Night Worker hat über Nacht ein paar News zusammengefasst, morgens um 07:00 wacht der Dispatch Controller auf, sieht die fertigen Summaries, erstellt Tasks für den Content Writer, und bis ich meinen ersten Kaffee hab, ist ein Artikel-Draft fertig.

Hat bei mir nicht immer funktioniert. Aber wenn es funktioniert — ist es halt krass geil.

## Der Health Monitor: Mein autonomer Sysadmin

Letzte Woche hab ich den **System Health Monitor** gebaut. Ein Agent der alle 30 Minuten 10 Systeme checkt:

1. Paperclip Server (läuft?)
2. Agent Error States (jemand gecrasht?)
3. n8n Docker Container (gesund?)
4. n8n Workflow Errors (Fehler in den letzten 30 Min?)
5. Trigger Server (Auth funktioniert?)
6. Content Queue (Artikel stecken fest?)
7. Supabase (Datenbank erreichbar?)
8. NotebookLM (Auth noch gültig?)
9. Git/Vercel (Merge Conflicts?)
10. Scheduled Tasks (alle aktiv?)

Wenn was kaputt ist, versucht er es erst selbst zu fixen. Agent in Error State? Reset auf idle. Trigger Server down? Neustart. Erst wenn er es nicht hinkriegt, schickt er mir eine Telegram-Nachricht.

Kostet quasi nichts — läuft auf Haiku. Die billigste Versicherungspolice die ich hab.

## Der Zeitplan: Wer wacht wann auf?

| Schedule         | Agent                     | Frequenz        |
| ---------------- | ------------------------- | --------------- |
| Heartbeat        | Dispatch Controller       | Alle 15 Min     |
| **Health Check** | **System Health Monitor** | **Alle 30 Min** |
| Morning Routine  | Dispatch Controller       | 07:00           |
| Community Watch  | Community Pulse           | Alle 4h         |
| Vault Sync       | Vault Keeper              | Alle 6h         |
| SEO Report       | SEO Analyst               | Montag 09:00    |
| Evening Summary  | Dispatch Controller       | 20:00           |
| Night Batch      | Night Worker              | 23:00           |

Das läuft über Windows Task Scheduler. Jeder Heartbeat weckt den Agent, der checkt seine Inbox, arbeitet offene Tasks ab, und geht wieder schlafen. Kein 24/7-Prozess, kein Token-Verbrauch wenn nichts zu tun ist.

## n8n als Brücke: 34 Workflows verbinden alles

Meine 34 n8n Workflows sind das Nervensystem. Ein paar Highlights:

**Paperclip Heartbeat Workflow** — checkt alle 5 Minuten ob ein Task "done" ist, und erstellt automatisch den Nachfolger-Task. Das sind die Completion Chains von oben.

**Queue Trigger** — scannt alle 30 Minuten die Content Queue. Ist ein Artikel queued und nichts in-progress? Starte die Content Engine. Telegram-Notification ans Handy.

**Article Approval Handler** — wenn ein Artikel fertig ist, bekomme ich Telegram-Buttons: "Veröffentlichen" oder "Muss überarbeitet werden". Ein Klick und der Artikel geht live.

**Daily Auto-Publish** — jeden Morgen um 09:00 geht automatisch ein Artikel online. Der älteste mit Status "ready" wird published. Ich hab grad 19 Artikel im Buffer — das reicht für fast drei Wochen ohne dass ich einen Finger rühre.

## Mobile Access: Alles vom Handy

Paperclip ist eine PWA. Auf meinem iPhone als Home-Screen App installiert. Im WLAN seh ich alle Agents, ihre Tasks, das Dashboard. Fühlt sich an wie Slack für AI Agents.

Und mit Telegram hab ich einen zweiten Kanal: Push-Notifications wenn ein Agent fertig ist, Approval-Buttons, Status-Updates. Ich steuere meine AI-Firma halt quasi vom Sofa.

## Was ehrlich gesagt noch nicht funktioniert

Ich wär kein TRMT-Autor wenn ich dir nicht auch die Kacke erzählen würde.

**Permission-Problem:** Agents die Bash-Commands ausführen müssen (curl, git, etc.) brauchen `dangerouslySkipPermissions`. Klingt genau so gefährlich wie es ist. Ich hab das für alle 11 Claude-Agents aktiviert. Ist ein Sicherheitskompromiss — die Agents können halt ALLES machen. Deshalb: gute Instructions sind Pflicht.

**Chain-Duplikate:** Am Anfang hab ich die Completion Chain Logik DOPPELT eingebaut — einmal in n8n, einmal in den Dispatch Controller Instructions. Ergebnis: doppelte Tasks. Musste ich fixen. Jetzt macht n8n die Chains und der Dispatch Controller überwacht nur noch.

**Heartbeat-Kosten:** Opus 4.6 für den Dispatch Controller alle 15 Minuten ist nicht billig. Manchmal wacht er auf, checkt seine Inbox, findet nichts, und hat trotzdem Tokens verbraucht. An manchen Tagen 2-3 USD nur fürs Aufwachen.

**Ollama-Qualität:** qwen3:14b ist OK für Zusammenfassungen und Cleanup. Aber wenn du einen echten Artikel in Brand Voice brauchst — vergiss es. Da muss Opus ran. Lokal ist halt lokal.

**Windows Task Scheduler:** Fragil. Tasks laufen nur wenn du eingeloggt bist (kein Passwort = keine Hintergrund-Tasks). Ich plane auf PM2 umzusteigen für die Services.

## Was ich gelernt hab

1. **Agent Instructions sind alles.** Nicht der Agent-Name. Nicht das Model. Die Instructions. Schreib sie wie SOPs für echte Mitarbeiter — mit konkreten Dateipfaden, Quellen, und vor allem: was der Agent NICHT tun soll.

2. **Heartbeats staffeln.** Nie alle Agents gleichzeitig aufwachen lassen. Rate Limits existieren. Mein Schedule: 15 Min (CEO), 30 Min (Health), 4h (Community), 6h (Vault).

3. **Haiku für 80% der Jobs.** SEO-Check, Deploy, QA, Social Posts — brauchst du kein Opus für. Spar die teuren Models für kreative und strategische Arbeit.

4. **Monitoring ist nicht optional.** Ohne den Health Monitor hab ich Fehler erst gemerkt wenn die Pipeline 3 Stunden still stand. Jetzt nach 30 Minuten.

5. **Chains brauchen Dedup-Logik.** Wenn du Chains in mehreren Systemen implementierst, kriegst du Duplikate. Eine Quelle der Wahrheit — bei mir n8n.

6. **Ollama als Fallback rettet dich.** Wenn Claude oder Codex Subscriptions auslaufen oder Rate-Limited sind, springt das lokale Model ein. Qualität leidet, aber der Workflow stoppt nicht.

## Setup in 30 Minuten

Falls du das nachbauen willst:

```bash
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev
```

Browser auf: `http://localhost:3100`. Company erstellen. Agents hinzufügen. Goals setzen. Los geht's.

Für die Heartbeats brauchst du einen Scheduler — Windows Task Scheduler, cron, oder PM2. Die BAT-Dateien sehen so aus:

```bash
cd paperclip
pnpm paperclipai heartbeat run --agent-id <agent-uuid> --source timer --trigger system
```

Das weckt den Agent, der checkt seine Inbox, arbeitet, und beendet sich.

## Fazit: Lohnt sich das?

Für einen Solo-Creator mit ADHS? Absolut. Mein Gehirn ist nicht dafür gemacht, 15 verschiedene Tasks im Kopf zu behalten und zur richtigen Zeit auszuführen. Mein Paperclip Setup macht genau das — zuverlässiger als ich es je könnte.

Ist es perfekt? Nein. Die Permission-Geschichte nervt. Die Kosten für Opus-Heartbeats sind spürbar. Und manchmal crasht ein Agent und niemand merkt es (deshalb der Health Monitor).

Aber: Ich hab in einer Woche 18 Blog-Artikel produziert, einen Content-Buffer für fast einen Monat aufgebaut, und meine Community wird automatisch monitored. Ohne Paperclip hätte ich das alles manuell machen müssen.

28 Agents. 0 Euro extra. Ein Abend Setup. Das ist der Deal.

— TRMT
