---
title: "Meine Content Pipeline: Wie AI Agents meinen Blog am Laufen halten"
slug: meine-content-pipeline-ai-agents-2026
description: "3 Artikel pro Woche als Solo-Creator? So sieht meine komplette Content Pipeline mit AI Agents aus — von der Idee bis zum fertigen Blogpost. Zum Nachbauen."
date: "2026-04-12"
category: automation
tags:
  [
    content-pipeline,
    ai-agents,
    automation,
    paperclip,
    blogging,
    content-creation,
  ]
image: /images/blog/meine-content-pipeline-ai-agents-2026-og.webp
pillar: automation
draft: true
readingTime: 12
titleAccent: "Content Pipeline"
keywords:
  [
    content pipeline,
    content pipeline automatisieren,
    ai content erstellung,
    blog automatisierung,
    content erstellung ki,
  ]
heroImage: "/images/blog/meine-content-pipeline-ai-agents-2026-1.webp"
heroImageThumb: "/images/blog/meine-content-pipeline-ai-agents-2026-1-thumb.webp"
---

# Meine Content Pipeline: Wie AI Agents meinen Blog am Laufen halten

## TL;DR

- Ich publiziere 3 Blog-Artikel pro Woche als Solo-Creator — moeglich durch eine automatisierte Content Pipeline
- Jeder Artikel durchlaeuft 7 Stationen: Queue, Research, Outline, Write, Visual, Social, Deploy
- Die Pipeline basiert auf Paperclip AI Agents — jeder Agent hat genau eine Aufgabe
- Alles startet mit einer JSON-Datei die ich content-queue.json nenne — die Single Source of Truth
- Completion Chains triggern automatisch den naechsten Schritt: Artikel fertig? Visual Creator startet sofort
- Ehrlich: 70% der Pipeline laeuft automatisch, 30% brauchen mein manuelles Feedback

---

Drei Artikel pro Woche. Jeder mindestens 1.500 Woerter. SEO-optimiert. Mit Bildern, Meta-Tags, Social Media Posts und einer Podcast-Episode obendrauf.

Das klingt nach einem kleinen Redaktionsteam. Ist es auch — nur dass mein Team aus AI Agents besteht.

In meinem letzten Artikel hab ich erklaert, [wie ich 28 AI Agents mit Paperclip orchestriere](/blog/paperclip-ai-agent-orchestration-setup). Das war der Big Picture Artikel. Heute wird es konkret. Ich nehm dich mit durch die komplette Content Pipeline — Schritt fuer Schritt, von der Idee bis zum fertigen Blogpost.

Kein theoretisches Framework. Keine Powerpoint-Slides. Sondern die echte Pipeline die diesen Artikel hier produziert hat.

## Station 1: Die Content Queue — wo alles anfaengt

Jeder gute Workflow braucht eine Single Source of Truth. Bei mir ist das eine JSON-Datei namens `content-queue.json`. Kein Notion. Kein Trello. Eine Datei.

Warum? Weil AI Agents JSON lesen koennen ohne dass ich irgendein UI bauen muss. Der Dispatch Controller oeffnet die Datei, liest den naechsten Eintrag mit `status: "queued"` und startet die Chain.

So sieht ein Eintrag aus:

```json
{
  "id": 4,
  "title": "n8n Tutorial Deutsch: Automatisierung fuer Einsteiger",
  "slug": "n8n-tutorial-deutsch-2026",
  "primaryKW": "n8n tutorial deutsch",
  "type": "Tutorial",
  "length": "2000-2500",
  "status": "queued",
  "nlmResearchPrompt": "n8n Tutorial Deutsch Anfaenger...",
  "nlmOutlinePrompt": "Outline fuer: n8n Tutorial...",
  "nlmWritePrompt": "Deutsch, locker, ich-Perspektive...",
  "interlinks": ["n8n-workflow-beispiele-2026", "n8n-self-hosting-2026"]
}
```

Jeder Eintrag hat alles was die Pipeline braucht: Keywords, gewuenschte Laenge, Prompts fuer Research und Writing, interne Verlinkungen, sogar potenzielle Affiliate-Links. Die Content-Planung passiert einmal pro Monat — ich sitz dann ein paar Stunden da, mach Keyword Research, und befuell die Queue fuer die naechsten 4-6 Wochen.

Das Status-Feld steuert den gesamten Flow: `queued` → `in-progress` → `review` → `published`. Simpel. Funktioniert.

## Station 2: Research — der Research Scout macht die Vorarbeit

Sobald der Dispatch Controller einen queued Eintrag findet, wird der **Research Scout** losgeschickt. Das ist ein Haiku 4.5 Agent — guenstig, schnell, gut genug fuer Research.

Der Research Scout kriegt den `nlmResearchPrompt` aus der Queue und macht Folgendes:

1. **Web Research** — aktuelle Quellen, Statistiken, Vergleiche
2. **Bestehende TRMT-Artikel checken** — was haben wir schon geschrieben? Wo koennen wir verlinken?
3. **NotebookLM Notebook erstellen** — alle Quellen reinladen fuer spaetere Referenz
4. **Research Summary** — kompakte Zusammenfassung als Markdown-Datei

Das Ergebnis landet als `research-summary.md` im Output-Ordner. Der naechste Agent in der Chain kann das lesen.

Warum NotebookLM? Weil es die Quellen nicht nur speichert, sondern auch eine Audio Overview generieren kann. Das wird spaeter zum Podcast. Aber dazu gleich mehr.

## Station 3: Outline — Struktur vor Content

Hier wird es interessant. Die Outline entsteht nicht einfach aus dem Nichts — sie baut auf dem Research auf.

Der Content Writer (das bin ich, beziehungsweise der Opus 4.6 Agent der in meiner Stimme schreibt) kriegt den `nlmOutlinePrompt` und die Research Summary. Daraus entsteht eine H2/H3-Struktur mit:

- Kernaussage pro Abschnitt
- Wo kommen Beispiele, Screenshots, Code-Snippets?
- Welche internen Links passen wo?
- Geschaetzte Woerter pro Section

Die Outline ist der Moment wo ich meistens manuell reingehe. Ich check ob der Angle stimmt, ob die Reihenfolge Sinn macht, ob irgendwas fehlt. Manchmal aendere ich 2-3 Sachen, manchmal lass ich es durchlaufen. Aber dieser Schritt ist wichtig — eine schlechte Outline wird auch mit dem besten KI-Model kein guter Artikel.

## Station 4: Schreiben — Content Writer in TRMT Brand Voice

Das ist die Station die am meisten Rechenzeit frisst. Der Content Writer laeuft auf Opus 4.6 — dem groessten und teuersten Claude Model. Warum? Weil Schreibqualitaet bei einem Blog der einzige Grund ist, warum jemand wiederkommt.

Der Writer kriegt drei Dinge:

1. Die Outline aus Station 3
2. Die Research Summary aus Station 2
3. Den `nlmWritePrompt` — ein detaillierter Schreib-Prompt mit Brand Voice Regeln

Und diese Brand Voice Regeln sind ziemlich spezifisch:

- **Deutsch mit natuerlichen Anglizismen** — "Workflow" statt "Arbeitsablauf", aber kein Denglisch-Overkill
- **Ich-Perspektive** — immer. Kein "wir", kein passiv
- **Fuellwoerter erlaubt** — "halt", "quasi", "eigentlich" machen den Text menschlich
- **Klare Wertungen** — "das ist geil" oder "das nervt" statt diplomatischem Herumeiern
- **Kein AI-Slop** — keine "In der heutigen digitalen Welt..." Einleitungen, keine "transformativen Loesungen"

Der Anti-AI-Filter ist entscheidend. Wenn ein Artikel nach ChatGPT klingt, wird er nicht publiziert. Punkt. Ich hab eine Checkliste dafuer — wenn ich den Text lese und auch nur einmal denke "das klingt generated", geht er zurueck.

Der Output: Ein kompletter Markdown-Artikel mit Frontmatter, Bilderplatzhaltern und allem.

## Station 5: Visuals — der Visual Creator liefert Bilder

Parallel zum Social Publisher (Station 6) startet der **Visual Creator**. Das ist ein Gemini 2.5 Pro Agent der fuer jeden Artikel erstellt:

- **OG Image** — das Vorschaubild das in Social Media und Google erscheint
- **Hero Image** — das Bild oben im Artikel
- **Thumbnail** — die kleine Version fuer Artikellisten

Die Bilder muessen zur TRMT Brand passen: dunkler Hintergrund, klare Typografie, ein visuelles Element das zum Thema passt. Der Visual Creator kennt das Brand Kit und generiert entsprechend.

Alle Bilder werden als WebP gespeichert und auf maximal 200KB komprimiert. SEO-Basics: Alt-Text wird direkt aus dem Artikel-Titel generiert.

## Station 6: Social — automatisch posten? Fast.

Hier wird es ehrlich: Die Social-Pipeline ist die Station die am oeftesten manuelles Eingreifen braucht.

Der **Social Publisher** (Haiku 4.5) erstellt Entwuerfe fuer:

- LinkedIn (laengerer Post mit Storytelling)
- X / Twitter (knackiger Thread oder Single Post)
- Threads (lockerer Ton)

Aber — und das ist wichtig — die Posts gehen NICHT automatisch live. Sie landen als Entwuerfe die ich kurz gegenlese. Warum? Weil Social Media Posts persoenlich sein muessen. Ein Blog-Artikel kann mit KI-Unterstuetzung geschrieben sein und trotzdem authentisch klingen. Ein LinkedIn-Post der nach Bot riecht? Toetet deine Credibility.

Also: Der Social Publisher spart mir 80% der Arbeit (Formulierung, Hashtags, Hook, CTA), aber die letzten 20% mache ich selbst. Und das ist okay so.

## Station 7: Deploy + QA — die letzte Meile

Wenn Visual Creator und Social Publisher fertig sind (beide laufen parallel, erinnere dich an die Completion Chain), startet der **Deploy Bot**.

Der Deploy Bot ist einer meiner simpelsten Agents — Haiku 4.5, weil er hauptsaechlich Git-Befehle ausfuehrt:

1. Markdown-Datei in den Blog-Ordner kopieren
2. Bilder in den richtigen Ordner
3. Git commit mit sauberem Message
4. Push zu GitHub
5. Vercel triggert automatisch den Build

Nach dem Deploy kommt der **QA Inspector** — auch Haiku 4.5 — und prueft:

- Laesst sich die Seite laden? (kein 404, kein Build-Error)
- Stimmt die Meta Description?
- Funktionieren die internen Links?
- Sind die Bilder da und unter 200KB?
- Lighthouse Score akzeptabel?

Erst wenn der QA Inspector gruenes Licht gibt, wird der Content Queue Eintrag auf `published` gesetzt.

## Die Completion Chain: Wie alles zusammenhaengt

Das Herzstueck meiner Content Pipeline ist die **Completion Chain**. Das Prinzip ist simpel: Wenn ein Agent seine Aufgabe als `done` markiert, wird automatisch der naechste Agent in der Kette getriggert.

```
Research Scout [done]
    ↓ auto-trigger
Content Writer [todo → in_progress → done]
    ↓ auto-trigger (PARALLEL)
Visual Creator [todo → done]   +   Social Publisher [todo → done]
    ↓ beide done? auto-trigger
Deploy Bot [todo → done]
    ↓ auto-trigger
QA Inspector [todo → done]
    ↓
Status: published ✓
```

Der Dispatch Controller ueberwacht das alle 15 Minuten. Wenn eine Chain laenger als 2 Stunden haengt, kriege ich eine Telegram-Nachricht. Wenn ein Agent als `blocked` markiert ist, wird eskaliert.

Das klingt aufwendig, aber in der Praxis laeuft es erstaunlich reibungslos. Die meisten Artikel gehen innerhalb von 2-3 Stunden durch die komplette Pipeline — von Research bis Deploy. Meine aktive Zeit dabei: vielleicht 20-30 Minuten fuer Outline-Check und Social-Review.

## Was ich dabei gelernt hab

### Content Pipeline automatisieren heisst nicht "Qualitaet aufgeben"

Das groesste Missverstaendnis bei automatisierter Content Erstellung: Leute denken, Automatisierung bedeutet schlechtere Qualitaet. Das Gegenteil ist der Fall. Durch die Pipeline hab ich MEHR Zeit fuer die Dinge die wirklich zaehlen — den Angle eines Artikels, die persoenliche Note, das eine Beispiel das den Unterschied macht.

Statt 4 Stunden pro Artikel mit Recherche, Formatierung und technischem Kram zu verbringen, nutze ich meine 20-30 Minuten fuer die kreative Arbeit. Den Rest erledigen Agents die dafuer gebaut sind.

### Die Brand Voice ist das schwerste Element

Alles andere — Research, Formatierung, Bilder, Deploy — ist relativ straightforward zu automatisieren. Die Brand Voice nicht. Ich hab Wochen gebraucht, um die Prompts so zu tunen, dass die Texte nach TRMT klingen und nicht nach "AI hat einen Blog geschrieben".

Der Trick: Extrem spezifische Negativbeispiele. Nicht "schreibe natuerlich", sondern "NIEMALS 'In der heutigen Zeit' als Einstieg, NIEMALS passive Konstruktionen, NIEMALS mehr als zwei Saetze ohne Ich-Perspektive". Je konkreter die Verbote, desto besser das Ergebnis.

### JSON > Notion > Trello

Fuer eine AI-native Content Pipeline ist eine JSON-Datei besser als jedes Project Management Tool. Agents koennen sie direkt lesen und schreiben. Kein API-Wrapper, kein OAuth, kein Rate Limiting. Einfach eine Datei oeffnen und den naechsten Eintrag verarbeiten.

Klar, du verlierst damit ein schoenes Kanban Board. Aber weisst du was? [Mein Life OS Dashboard](/blog/life-os-paperclip-agent-office-widget) zeigt mir alles was ich wissen muss — und das ist flexibler als jedes Trello.

## Was noch nicht funktioniert

Ich waere kein ehrlicher Blogger wenn ich nicht auch die Probleme zeigen wuerde.

**Bilder-Qualitaet ist inconsistent.** Der Visual Creator trifft die Brand manchmal perfekt und manchmal komplett daneben. Generierte Bilder fuer Tech-Artikel funktionieren gut. Fuer persoenliche Erfahrungsberichte? Eher nicht. Da nehm ich oft eigene Fotos.

**Fact-Checking ist schwach.** Research Scout liefert gute Zusammenfassungen, aber manchmal stimmen Details nicht — veraltete Preise, falsche Versionsnummern. Ich muss technische Artikel immer noch manuell gegenchecken. Eine Automatisierung dafuer? Hab ich noch nicht geknackt.

**Social Media Timing.** Der Social Publisher postet wann die Pipeline fertig ist, nicht wann die Engagement-Rate am hoechsten ist. Scheduling-Tools wie Buffer koennten das loesen, aber die Integration fehlt noch.

**Gelegentliche Chain-Abbrueche.** Manchmal bleibt ein Agent stecken — meistens weil ein API-Call timeouted oder weil die Outline nicht den Erwartungen des Writers entspricht. Der Dispatch Controller fixt das meistens innerhalb von 30 Minuten, aber es nervt.

## Die Kosten

Der Elefant im Raum. Was kostet diese Content Pipeline pro Monat?

| Posten                                  | Kosten             |
| --------------------------------------- | ------------------ |
| Claude Max Plan (Opus + Sonnet + Haiku) | ~100 USD           |
| ChatGPT Pro (Codex fuer Code Reviews)   | ~200 USD           |
| Google Workspace (Gemini fuer Visuals)  | ~12 USD            |
| Ollama (lokal, Nacht-Agents)            | 0 USD (Strom)      |
| Vercel (Hosting)                        | 0 USD (Free Tier)  |
| **Gesamt**                              | **~312 USD/Monat** |

Fuer 12+ Artikel pro Monat, komplett mit Bildern, Social Posts und SEO-Optimierung. Das ist weniger als ein freiberuflicher Texter fuer einen einzigen Artikel berechnen wuerde.

Und bevor jemand fragt: Nein, ich zahle keine API-Keys extra. Alles laeuft ueber bestehende Subscriptions. Das war von Anfang an die Designentscheidung. Mehr dazu im [Paperclip Setup Artikel](/blog/paperclip-ai-agent-orchestration-setup).

## Fazit: Content Pipeline automatisieren lohnt sich — mit Einschraenkungen

Meine Content Pipeline ist kein "drueck einen Knopf und 10 Artikel kommen raus" System. Es ist eher wie ein gut geoeltes Fliessband, bei dem ich an den wichtigen Stationen stehe und Qualitaetskontrolle mache.

Die Automatisierung uebernimmt die 70% repetitive Arbeit: Research zusammenfassen, Texte formatieren, Bilder generieren, Git pushen, Links pruefen. Ich uebernehme die 30% kreative Arbeit: Den Angle bestimmen, die Brand Voice sicherstellen, Social Posts persoenlich machen.

Ist das fuer jeden geeignet? Ehrlich gesagt: nein. Du brauchst technisches Know-how fuer das Setup, Geduld fuer das Prompt-Tuning, und die Bereitschaft deine eigene Stimme in Regeln zu giessen die ein Agent verstehen kann.

Aber wenn du ein Solo-Creator bist der mehr Content produzieren will ohne Qualitaet zu opfern — dann ist eine Content Pipeline der beste Investition deiner Zeit. Nicht weil AI alles besser macht. Sondern weil sie dir die Freiheit gibt, dich auf das zu konzentrieren was nur du kannst: deine Perspektive, deine Erfahrung, deine Stimme.

Und genau das ist der Punkt. Die Pipeline schreibt nicht fuer mich. Sie schreibt mit mir. Und das macht den Unterschied.

— TRMT
