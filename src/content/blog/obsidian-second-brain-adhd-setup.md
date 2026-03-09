---
title: "Obsidian als Second Brain , Mein ADHD-Setup 2026"
slug: "obsidian-second-brain-adhd-setup"
date: "2026-03-06"
description: "Obsidian ist geil, aber mit ADHD auch schnell chaotisch. Mein Setup mit Daily Notes, Emoji-Tags und Dataview-Queries. Copy-Paste-ready."
tags: ["obsidian", "produktivitaet", "workflow", "notion", "tools"]
category: "produktivitaet"
draft: false
heroImage: "/images/blog/obsidian-1.webp"
readingTime: 4
---

> **TL;DR**
> - PARA-System (Projects, Areas, Resources, Archive), 5 Ordner, Inbox default, Minimal Viable System
> - Daily Note Anchor mit Top 3, Quick Wins, Emoji-Tags für visuelle Scans, 5 Plugins (Dataview, Templater, Tasks, Calendar, Periodic)
> - Offline, Markdown, Speed, 1.000 Plugins, Obsidian vs Notion, ADHD braucht Anker
> - Fehler: zu viele Plugins, kein Daily Note, Inbox ignorieren, perfekt vor start, Inbox einmal/Woche sortieren

Ich hab ADHD. Mein Gehirn ist brillant darin, Dinge zu vergessen. Termine, Ideen, wo ich letzte Woche aufgehört hab. Alles weg.

Obsidian rettet mich. Aber nur, weil ich ein System hab, das mit meinem Gehirn arbeitet, nicht dagegen.

## Warum Obsidian und nicht Notion?

Kurz:

**Obsidian ist offline.** Kein Internet nötig, kein Laden, kein Warten. Öffnen, schreiben, fertig.

**Markdown-Dateien.** Deine Notizen gehören dir. Plain Text, kein Vendor-Lock-in. In 20 Jahren noch lesbar.

**Speed.** Obsidian startet in Sekunden. Notion braucht gefühlt immer erstmal 10 Sekunden zum Laden. Bei ADHD sind das 10 Sekunden, in denen ich schon wieder was anderes mache.

**Plugins.** Über 1.000 Community-Plugins. Alles anpassbar. Und Version 1.12 (aktuell) bringt iOS Share Extension, besseren Tablet-Support und einen Headless-Client.

## Das Problem: ADHD + Obsidian = Chaos

Ohne System passiert das hier:

→ Du installierst 40 Plugins
→ Du baust drei verschiedene Ordnerstrukturen
→ Du startest ein Zettelkasten-System
→ Du vergisst es nach zwei Tagen
→ Dein Vault ist ein Friedhof ungenutzter Notizen

Kenn ich. War bei mir genauso. Bis ich das Minimal-Viable-System entdeckt hab.

## Mein Setup: 5 Ordner, fertig

```
Mein Vault/
├── 00-Inbox       ← Alles rein, sortieren später
├── 01-Projects    ← Aktive Ziele mit Deadline
├── 02-Areas       ← Verantwortungsbereiche ohne Deadline
├── 03-Resources   ← Referenzmaterial
└── Archive/       ← Abgeschlossenes
```

Das ist PARA (Projects, Areas, Resources, Archive) von Tiago Forte, aber radikal vereinfacht. Kein Zettelkasten-Overhead, keine 15 Unterordner.

**Die goldene Regel:** Inbox ist die Default-Ablage. Alles kommt erstmal rein. Sortieren ist optional und passiert beim Weekly Review.

## Daily Notes: Mein Anker

Jeden Tag eine neue Notiz. Immer gleicher Aufbau:

```markdown
# Heute

## Top 3
- [ ] Hauptaufgabe 1
- [ ] Hauptaufgabe 2
- [ ] Hauptaufgabe 3

## Quick Wins (5-10 Min)
- [ ] Kleine Aufgabe A
- [ ] Kleine Aufgabe B

## Notizen
(Freies Feld, was mir einfällt)
```

**Warum drei?** Weil mein ADHD-Gehirn bei "Was muss ich heute machen?" sonst eine Liste mit 47 Sachen generiert. Drei ist machbar. Drei schafft man.

Das Template erstellt Obsidian automatisch mit dem Plugin "Periodic Notes". Jeden Morgen öffne ich Obsidian → Daily Note ist da → ich schreib meine drei Sachen rein → los geht's.

## Emoji-Tags statt Kategorien

Statt langer Tag-Namen nutze ich Emojis. Mein ADHD-Gehirn scannt visuell, nicht textuell.

- ⭐ = Wichtig / Priorität
- ⏳ = Warte auf jemanden
- 🚀 = Im Flow, weitermachen
- 🐢 = Braucht Zeit, nicht hetzen
- 🧠 = Lern-Investment

Ein Blick auf die Notiz und ich weiß sofort, was Sache ist.

![Obsidian Daily Note mit Top 3 Aufgaben und Quick Wins Sektion](/images/blog/obsidian-2.webp)

## Die 5 Plugins, die du brauchst

Nicht 40. Fünf.

**1. Dataview.** Queries über deinen Vault. "Zeig mir alle offenen Tasks aus Projects", automatisch, immer aktuell.

**2. Templater.** Templates mit Logik. Daily Notes, Projekt-Templates, Meeting-Notes. Immer gleicher Aufbau, null Aktivierungsenergie.

**3. Tasks.** Due Dates, wiederkehrende Tasks, Filter. Alles an einem Ort aggregiert.

**4. Calendar.** Monatsansicht mit direktem Sprung zur Daily Note. Visuell, schnell.

**5. Periodic Notes.** Automatische Daily, Weekly, Monthly Notes. Das Rückgrat des Systems.

![Obsidian Dataview Query zeigt offene Tasks aus allen Projekten sortiert nach Deadline](/images/blog/obsidian-3.webp)

## Dataview-Query: Mein Dashboard

In meiner Daily Note hab ich diesen Query-Block:

```
TASK
FROM "01-Projects"
WHERE !completed
SORT due ASC
```

Das zeigt mir alle offenen Tasks aus meinen Projekten, sortiert nach Deadline. Automatisch. Ich muss nichts pflegen.

## Obsidian vs Notion vs Logseq

| | Obsidian | Notion | Logseq |
|---|---|---|---|
| Offline | Komplett | Nur Cache | Komplett |
| Speed | Sehr schnell | Langsam | Schnell |
| Datenhoheit | Lokal bei dir | Cloud | Lokal |
| Team-Arbeit | Nein | Sehr gut | Basic |
| ADHD-tauglich | Mit Setup: ja | Ablenkungspotenzial | Natürlich gut |
| Preis | Kostenlos | Free bis 10€/Mo | Kostenlos |

**Mein Take:** Obsidian für Solo-Arbeit und ADHD. Notion für Teams. Logseq, wenn du Outliner magst.

## Die häufigsten ADHD-Fehler

**Perfektes System bauen vor dem Start.** Du brauchst kein perfektes System. Du brauchst 5 Ordner und eine Daily Note. Den Rest baust du, wenn du merkst, dass dir was fehlt.

**Zu viele Plugins.** Jedes Plugin ist eine Entscheidung mehr. Und Entscheidungen kosten bei ADHD Energie. Fünf Plugins, fertig.

**Keine Daily Note.** Ohne Anker driftest du. Die Daily Note ist dein Startpunkt. Jeden. Einzelnen. Tag.

**Inbox ignorieren.** Die Inbox füllt sich. Das ist okay. Aber einmal pro Woche 15 Minuten: durchgehen, sortieren, löschen. Sonst wird der Vault zum Müllhaufen.

## Starte jetzt

1. Obsidian installieren (kostenlos)
2. Die 5 Ordner anlegen
3. Die 5 Plugins installieren
4. Daily Note Template einrichten
5. Morgen damit anfangen

Das perfekte System gibt es nicht. Aber ein funktionierendes System schlägt kein System. Jeden Tag.

---

Wie organisierst du dein Wissen? Notion-Fan? Zettelkasten-Nerd? Oder einfach Chaos?. TRMT
