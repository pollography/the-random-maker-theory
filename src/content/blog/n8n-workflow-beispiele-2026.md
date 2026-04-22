---
title: "n8n Workflow Beispiele: 5 Automationen die ich täglich nutze"
titleAccent: "Workflow"
slug: "n8n-workflow-beispiele-2026"
description: "Fünf echte n8n Workflow Beispiele aus meinem Alltag: RSS zu Telegram, KI-News Monitoring, Discord Alerts, Deploy-Notifications und Content-Queue. Mit Node-Aufbau und ehrlicher Einschätzung."
date: "2026-03-30"
draft: false
category: "automatisierung"
pillar: "automatisierung"
primaryKW: "n8n workflow beispiele"
tags:
  - n8n
  - automatisierung
  - workflow
  - telegram
  - rss
  - discord
author: "pollo"
interlinks:
  - "n8n-tutorial-deutsch-2026"
  - "n8n-chatgpt-workflow-2026"
readingTime: 11
wordCount: 2240
heroImage: "/images/blog/n8n-workflow-beispiele-2026-1.webp"
heroImageThumb: "/images/blog/n8n-workflow-beispiele-2026-1-thumb.webp"
---

# n8n Workflow Beispiele: 5 Automationen die ich täglich nutze

**TL;DR**

- Ich nutze n8n seit über einem Jahr produktiv — hier sind meine fünf wichtigsten Workflows
- Workflow 1 sammelt RSS-Feeds und schickt Zusammenfassungen per Telegram
- Workflow 2 monitort KI-News aus 46 Quellen und filtert mit GPT-4o-mini
- Workflow 3 überwacht Discord-Channels und meldet Community-Aktivität
- Workflow 4 schickt nach jedem Blog-Deploy automatisch eine Benachrichtigung
- Workflow 5 hält meine Content-Queue auf dem aktuellen Stand
- Alle Workflows laufen auf Self-Hosted n8n in Docker — kein Cloud-Abo nötig

---

Ich erkläre dir n8n immer so: Stell dir Lego-Steine vor. Jeder Stein ist ein Node — ein kleines Programm das eine Sache kann. RSS-Feed lesen. Nachricht an Telegram schicken. GPT fragen. Datenbank schreiben. Und du verbindest diese Steine zu einer Kette. Das ist ein n8n Workflow.

Die Theorie klingt simpel. Der Moment wo es klickt, ist wenn du zum ersten Mal um 23 Uhr ins Bett gehst und morgens aufwachst und dein Handy zeigt dir 12 Telegram-Nachrichten — alle automatisch generiert, während du geschlafen hast. Ab da gibt es kein Zurück mehr.

Ich nutze n8n täglich. Nicht als Hobby-Spielerei sondern als echtes Werkzeug für zwei Projekte: meinen Blog [The Random Maker Theory](/blog/n8n-tutorial-deutsch-2026) und das Community-Management für ein Indie-Spielestudio. Und ich zeige dir heute die fünf n8n Workflow Beispiele die wirklich jeden Tag laufen. Mit dem konkreten Node-Aufbau — nicht so ein "dann verbindest du irgendwie alles"-Tutorial.

---

## Workflow 1: RSS Intelligence — 65 Feeds, ein Telegram-Briefing

**Was er macht:** Alle sechs Stunden zieht dieser Workflow 65 RSS-Feeds aus meiner Source-Liste, dedupliziert die Artikel gegen eine Supabase-Datenbank und schickt mir ein kompaktes Briefing auf Telegram.

**Warum ich ihn brauche:** Ich folge einer Menge Tech-Blogs, Gaming-News und KI-Newslettern. Früher habe ich das manuell in Feedbin gemacht — theoretisch. In der Praxis habe ich Feedbin wochenlang nicht geöffnet. Jetzt kommt das Briefing zu mir, nicht umgekehrt.

**Node-Aufbau:**

```
Schedule Trigger (alle 6h: 06:00 / 12:00 / 17:00 / 20:30)
  → Code Node: Feed-Liste laden (65 URLs aus Config)
  → HTTP Request Node: RSS-XML fetchen (continueOnFail: true)
  → Code Node: XML parsen, Items extrahieren
  → Supabase Node: Gegen trmt_rss_items prüfen (Duplikat-Check via item_hash)
  → Filter Node: Nur neue Items durchlassen
  → Code Node: Briefing-Text zusammenbauen
  → Telegram Node: Nachricht an TRMT Bot schicken
  → Supabase Node: Neue Items als "gesehen" markieren
```

Der wichtigste Teil ist `continueOnFail: true` auf dem HTTP Request Node. Ohne das bricht der ganze Workflow ab sobald ein Feed einen 404 zurückgibt. Ich hatte das anfangs nicht drin — ein kaputter t3n-Feed hat mir wochenlang das Briefing gekillt, ohne dass ich es gemerkt habe. Jetzt laufen fehlerhafte Feeds einfach durch ohne den Rest zu blockieren.

[SCREENSHOT: n8n Canvas zeigt RSS Intelligence Workflow mit 8 verbundenen Nodes]

Das zweite gelernte Ding: In n8n's Docker-Umgebung funktioniert `require('https')` nicht. Für alle HTTP-Requests muss `this.helpers.httpRequest()` genutzt werden — das ist der offizielle n8n-Weg und funktioniert auch im Task Runner.

---

## Workflow 2: KI-News Intelligence — 46 KI-Quellen, GPT-Filterung, Confidence Score

Das ist mein komplexester Workflow und gleichzeitig mein liebstes n8n Workflow Beispiel.

**Was er macht:** Alle drei Stunden (zwischen 01:00 und 22:00 Uhr) prüft dieser Workflow 46 RSS-Feeds speziell zu KI-Themen — Claude, Gemini, Mistral, xAI, OpenAI und co. Neue Artikel werden mit GPT-4o-mini klassifiziert: Ist das wirklich Breaking News oder nur Marketing-Gelaber? Alles mit einem Confidence Score über 0.7 landet im Telegram-Channel.

**Warum ich ihn brauche:** Der reguläre RSS-Workflow ist gut. Aber KI bewegt sich so schnell, dass ich ein dediziertes Monitoring-System wollte — mit Priorisierung. Nicht jede Ankündigung ist gleich wichtig. GPT bewertet für mich.

**Node-Aufbau:**

```
Schedule Trigger (alle 3h, 01-22 Uhr)
  → Code Node: 46 KI-spezifische Feed-URLs laden
  → HTTP Request Node: RSS fetchen (this.helpers.httpRequest, continueOnFail)
  → Code Node: Items extrahieren, Cross-Referencing (mehrere Quellen = höherer Score)
  → Supabase Node: Duplikat-Check gegen trmt_news_articles
  → Filter Node: Nur ungesehene Items
  → OpenAI Node: GPT-4o-mini Klassifizierung + Confidence Score (0.0-1.0)
  → Filter Node: confidence >= 0.7 durchlassen
  → Code Node: Breaking-News-Format zusammenbauen
  → Telegram Node: Formatierte Nachricht mit Score-Badge
  → Supabase Node: Artikel archivieren (trmt_news_articles)
```

Das Cross-Referencing ist das geilste Feature: Wenn drei verschiedene Quellen über dasselbe Thema berichten, steigt der Score automatisch. Ein einzelner Hype-Artikel von einer Marketing-Seite kommt damit kaum durch — aber wenn The Verge, Ars Technica und Heise alle zur gleichen Zeit dasselbe melden, ist das definitiv relevant.

[SCREENSHOT: Telegram-Nachricht mit KI-News Alert, Confidence Score 0.89 sichtbar]

Ein echter Zahlen-Check: Letzte Woche hat der Workflow 847 Artikel gecheckt und 23 weitergeleitet. Das ist eine Filtrate von 97 Prozent — ohne den Workflow würde ich 847 Headlines manuell scannen. Das mache ich nicht. Ich würde einfach nichts lesen. Der Workflow liest für mich.

---

## Workflow 3: Discord Community Monitor — alle 10 Minuten, Hype-Detection

Dieses n8n Workflow Beispiel ist spezifisch für meine Arbeit beim Spielestudio, aber das Prinzip ist auf jede Community übertragbar.

**Was er macht:** Alle zehn Minuten scannt dieser Workflow mehrere Discord-Channels. Er filtert Nachrichten der letzten Stunde, analysiert sie auf Sentiment und Community-Hype mit GPT-4o-mini und schickt bei relevanter Aktivität eine strukturierte Telegram-Meldung.

**Warum ich ihn brauche:** Community-Management bedeutet: nah dran sein wenn etwas passiert. Ein Bug-Report der viral geht, eine Spieler-Frage die viele bewegt, ein Lob-Post der gepinnt werden sollte — das passiert alles im Discord. Ohne Monitoring verpasse ich das im Rauschen. Mit dem Workflow werde ich automatisch informiert wenn gerade "was los ist".

**Node-Aufbau:**

```
Schedule Trigger (alle 10 Minuten)
  → Code Node: Channel-Liste laden (öffentliche + interne Channels)
  → HTTP Request Node: Discord API — Get Channel Messages
    (onError: continueRegularOutput — wichtig bei 403 Missing Access!)
  → Code Node: Nachrichten der letzten Stunde filtern
  → Filter Node: Hat der Channel neue Nachrichten? (hasMessages Check)
  → Code Node: Texte sammeln, hypeCount berechnen
  → OpenAI Node: Sentiment + Alert-Level einschätzen
  → Switch Node: alertLevel == "high" oder hypeCount > 5?
  → Telegram Node (true): Alert mit Nachrichten-Zusammenfassung
  → Supabase Node: Activity-Log schreiben
```

Der `onError: continueRegularOutput` auf dem Discord API Node hat mich einige Nerven gekostet bis ich ihn gefunden habe. Wenn der Bot keinen Zugang zu einem Channel hat, gibt Discord einen 403 zurück — und ohne diesen Error-Handler crasht der komplette Workflow. Dann kommen zehn Minuten lang keine Alerts, auch nicht für die Channels die eigentlich funktionieren.

[SCREENSHOT: n8n Switch Node mit zwei Output-Pfaden: "Alert senden" und "Kein Alert"]

**Realer Wert:** Ich habe das Community-Management für Medieval Frontiers. Der Discord hat dutzende Channels. Früher war das ein Tab den ich manchmal auf hatte. Jetzt bekomme ich nur dann eine Meldung wenn wirklich etwas passiert. Das ist der Unterschied zwischen reaktiv und passiv.

---

## Workflow 4: Deploy Notifier — nach jedem Blog-Deploy eine Meldung

Kleiner Workflow, aber täglich genutzt. Ein gutes n8n Workflow Beispiel für Webhooks.

**Was er macht:** Wenn ich einen neuen Artikel deploye, schickt mein SvelteKit-Build-Prozess einen Webhook an n8n. n8n empfängt den Payload, formatiert eine Benachrichtigung und schickt sie an Telegram — mit Titel, Slug und direktem Link zum Artikel.

**Warum ich ihn brauche:** Einfach QoL. Ich deploye per Terminal und will eine Bestätigung dass alles durchgelaufen ist. Außerdem triggere ich über den gleichen Webhook direkt die Social-Post-Generierung — der Deploy ist also der Startschuss für den ganzen Post-Deploy-Flow.

**Node-Aufbau:**

```
Webhook Node: POST /webhook/trmt-deploy
  (empfängt: title, slug)
  → Code Node: Link zusammenbauen (therandommakertheory.com/blog/[slug])
  → Telegram Node: "Artikel live: [title] — [link]"
  → HTTP Request Node: Social-Draft-Webhook triggern
    (POST /webhook/trmt-social-draft mit title, slug, description, pillar)
```

Was ich dabei gelernt habe: In n8n v2 müssen Workflows "published" sein — nicht nur gespeichert. Wenn ein Workflow nur auf "Save" steht, registriert n8n den Webhook nicht in der Datenbank. Das war bei mir lange ein Problem weil ich nicht wusste warum der Webhook einfach nicht reagiert. Lösung: nach jeder Änderung den "Publish"-Button klicken, nicht nur speichern.

[SCREENSHOT: n8n Webhook Node zeigt die empfangene Payload, Telegram-Vorschau daneben]

Der ganze Flow von "git push" bis "Telegram-Benachrichtigung ist da" dauert circa 90 Sekunden. Vercel baut in 60 Sekunden, der Rest ist Webhook-Latenz.

---

## Workflow 5: Content Queue Trigger — automatisches Starten der Artikel-Pipeline

Das hier ist das Meta-Beispiel: ein n8n Workflow der andere Prozesse steuert.

**Was er macht:** Alle zwei Stunden prüft dieser Workflow meine `content-queue.json`. Wenn ein Artikel mit Status `queued` drin ist und der Scheduled-Date-Wert heute oder früher ist, triggert er die Content Pipeline — ein Windows-Prozess der den Artikel-Schreibprozess startet.

**Warum ich ihn brauche:** Ich plane meine Artikel-Queue im Voraus. Aber ich will nicht jeden Morgen manuell eine BAT-Datei starten müssen. Der Workflow macht das für mich, nach Zeitplan.

**Node-Aufbau:**

```
Schedule Trigger (alle 2h)
  → HTTP Request Node: GET http://host.docker.internal:9123/health
    (Trigger-Server auf Windows Host aktiv?)
  → Filter Node: Server erreichbar?
  → Read/Write Node: content-queue.json lesen
  → Code Node: Artikel mit status="queued" und scheduled_date <= heute finden
  → Filter Node: Gibt es fällige Artikel?
  → HTTP Request Node: POST http://host.docker.internal:9123/trigger
    (startet BAT-Datei auf Windows Host, übergibt Artikel-Slug)
  → Supabase Node: Queue-Update loggen
```

Die spannende Stelle ist `host.docker.internal`. n8n läuft bei mir in Docker — aber der eigentliche Content-Prozess läuft auf dem Windows Host. Das ist die Brücke. Ein kleiner Python-Server auf Port 9123 empfängt die Trigger von n8n und startet dann lokal die richtigen Prozesse. Docker-Container → Windows Host, ohne kompliziertes Port-Forwarding.

[SCREENSHOT: n8n Execution Log zeigt Queue Trigger Workflow, letzter Run vor 47 Minuten]

Dieser Workflow-Typ — Orchestrator, der andere Prozesse steuert — ist das wo n8n für mich wirklich Sinn macht. Nicht nur "schick eine Nachricht wenn X passiert", sondern "entscheide wann welcher Prozess startet".

---

## Was alle fünf gemeinsam haben

Ich habe mir angeschaut was alle meine produktiven n8n Workflow Beispiele verbindet:

**Error Handling ist Pflicht.** Kein Workflow der produktiv läuft ohne `continueOnFail` oder `onError: continueRegularOutput` auf den kritischen Nodes. Ein einzelner 404 oder 403 der den ganzen Workflow killt ist in der Praxis nicht tolerierbar.

**Supabase als Gedächtnis.** Fast alle Workflows schreiben in eine Datenbank — für Deduplizierung, Logging, State. Ohne persistenten State bekommst du die gleiche Telegram-Nachricht 50 Mal.

**`this.helpers.httpRequest()` statt fetch.** In n8n's Docker Task Runner gibt es kein natives `fetch` und kein `require('https')`. Wer das nicht weiß, sitzt stundenlang vor einem Workflow der in der UI-Preview funktioniert aber in der Produktion 0 Items zurückgibt.

**Publish, nicht nur Save.** Bei Webhooks: n8n v2 registriert Webhooks nur für "published" Workflows. Das hat mich einen halben Tag Debugging gekostet.

---

## Setup: So läuft mein n8n

Kurz für den Kontext — mein n8n Setup falls du es nachbauen willst:

**Docker auf Windows 11.** n8n läuft in einem Docker-Container, der beim Systemstart automatisch hochfährt. Die Daten liegen in einem Named Volume, nicht im Container-Filesystem — so überleben sie Updates.

**Supabase als externe Datenbank.** Ich nutze zwei getrennte Supabase-Projekte: eines für meine TRMT-Inhalte, eines für das AFS-Community-System. Wichtig: nicht alles in eine DB kippen — das wird schnell unübersichtlich.

**Telegram für alle Notifications.** Zwei Bots, ein Chat. TRMT-Bot für Blog-Workflows, AFS-Bot für Community-Workflows. Gleiche Chat-ID, unterschiedliche Bot-Tokens — so weiß ich sofort welcher Workflow die Nachricht geschickt hat.

**Windows Trigger-Server.** Da n8n in Docker läuft, brauche ich eine Brücke zum Windows Host für Prozesse die lokal laufen müssen. Ein kleiner Python-HTTP-Server auf Port 9123 macht das — empfängt Webhooks von n8n, startet lokale Skripte.

Das ganze Setup ist self-hosted, kostet mich außer dem Strom nichts laufendes und läuft seit Monaten stabil.

---

## Ist n8n das richtige Tool für dich?

Kurze ehrliche Einschätzung: Wenn du heute anfängst und noch nie mit Automatisierung gearbeitet hast, schau dir zuerst meinen [n8n Tutorial Deutsch](/blog/n8n-tutorial-deutsch-2026) an. Der erklärt den Einstieg ohne vorausgesetztes Wissen.

Wenn du n8n schon kennst und wissen willst wie ich AI in die Workflows integriere, kommt da bald mehr — speziell zum Thema [n8n + ChatGPT Workflow](/blog/n8n-chatgpt-workflow-2026).

Für mich persönlich ist n8n das beste Tool in der Automation-Kategorie, weil es selbst-gehostet läuft, Open Source ist und trotzdem komplex genug für echte Produktions-Workflows. Make und Zapier sind User-freundlicher. Aber ich bezahle keinen monatlichen Preis pro Execution und meine Daten liegen auf meinem Server.

Das sind meine fünf echten n8n Workflow Beispiele. Keine Showcase-Demos — alles Workflows die heute Nacht wieder laufen während ich schlafe.

---

## Verwandte Artikel

- [n8n Tutorial Deutsch: Automatisierung für Einsteiger](/blog/n8n-tutorial-deutsch-2026) — der richtige Einstieg wenn du noch ganz am Anfang bist
- [n8n + ChatGPT: Mein Automatisierungs-Stack](/blog/n8n-chatgpt-workflow-2026) — wie ich AI-Nodes in die Workflows integriere
