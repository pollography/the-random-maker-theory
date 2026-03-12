---
title: "GPT-5.4, Codex Security, Siri+Gemini: Die grössten AI-Releases im März 2026"
slug: "ai-releases-maerz-2026"
date: "2026-03-12"
description: "GPT-5.4 kann deinen Computer bedienen, Siri wird von Gemini angetrieben und Qwen läuft offline auf deinem iPhone. Was die AI-Releases im März 2026 für Content Creator bedeuten."
tags: ["ki-news", "ki-tools", "gpt-5", "siri", "gemini", "qwen"]
category: "ki-news"
draft: false
readingTime: 9
heroImage: "/images/blog/ai-releases-maerz-2026-1.webp"
heroImageThumb: "/images/blog/ai-releases-maerz-2026-1-thumb.webp"
titleAccent: "AI-Releases"
keywords: ["AI Releases März 2026", "GPT-5.4", "Siri Gemini", "Codex Security", "Qwen 3.5", "AI Tools 2026"]
---

Dein Computer gehorcht jetzt einem Chatbot. Siri hat ein Google-Gehirn. Ein Modell das auf dein iPhone passt, schlägt Riesen die 13 Mal grösser sind. März 2026 halt. Der Monat wo "AI als Agent" aufgehört hat, Marketing-Gelaber zu sein.

Wild.

Die letzten zwei Wochen hab ich quasi alles verfolgt was rauskam. Und ich muss sagen: Das ist einer dieser Monate über die wir in zwei Jahren noch reden. Nicht weil ein einzelnes Ding alles umgeworfen hat. Sondern weil gefühlt alle gleichzeitig den Schalter umgelegt haben. Gleichzeitig. Jedes grosse Lab. Als hätten die alle denselben Kalender.

Also. Was ist passiert, was davon taugt, und was bedeutet das für uns?

## GPT-5.4: Weniger Chatbot, mehr Agent

OpenAI hat am 5. März GPT-5.4 gedroppt. Wenn du denkst "ach, wieder ein neues Modell"... nein. Das hier ist echt anders.

### 1 Million Token Context Window

1 Million Token. Klingt erstmal nach ner Zahl für Leute die gern Benchmarks lesen. Aber überleg kurz: Du kannst damit einen ganzen Roman reinwerfen. Den kompletten Quellcode eines mittleren Projekts. Alle E-Mails deines letzten Jahres. Das Modell verliert halt einfach nicht den Faden.

Ich hab mit [Claude Code meine ganze Workflow-Maschine gebaut](/blog/claude-code-ultimate-setup-produktivitaet-2026). Das grösste Problem bei sowas war immer, dass der Kontext irgendwann abgebrochen ist. Mitten in der Arbeit. Einfach weg. 1 Million Token löst das.

<div class="vb-stat">
<span class="vb-stat-number">1M</span>
<span class="vb-stat-text">Token Context Window. Ein ganzer Roman, ein komplettes Projekt, ein Jahr E-Mails. Alles in einem einzigen Prompt.</span>
</div>

### Native Computer Use

Das hat mich am meisten umgehauen, ehrlich gesagt. GPT-5.4 kann Screenshots lesen, Mausbewegungen ausführen und auf die Tastatur hauen. Direkt. Nativ. Kein fragiles Python-Script dazwischen.

Überleg dir das mal. Du sagst: "Geh auf Canva, erstell mir ein Thumbnail für diesen Artikel, exportier es und lad es in den Google Drive Ordner rauf." Und es macht das. Schritt für Schritt. Eigenständig.

Kein Witz.

Weniger Chatbot. Mehr Agent.

### 33% weniger Halluzinationen

OpenAI sagt GPT-5.4 halluziniert 33% weniger als GPT-5.2. Wer mal erlebt hat wie ein LLM mit Vollüberzeugung kompletten Unsinn behauptet... das ist einfach das nervigste Feature überhaupt. Kein Bug, ein Feature. Buchstäblich. Ein Drittel weniger davon? Nehm ich ohne zu zögern.

<div class="vb-glow"></div>

### Die Zahlen die nachdenklich machen

83% der getesteten Aufgaben schlägt GPT-5.4 professionelle Arbeiter in 44 Berufen. Harvey Legal AI hat damit 91% auf dem BigLaw Benchmark erreicht.

Ohhh maaaan.

Ich sag nicht dass Anwälte jetzt arbeitslos werden. Aber Tools die professionelle Qualität liefern, gibt es jetzt für 2,50 Dollar pro Million Input-Token. Das verändert halt schon was möglich ist. Auch für Einzelkämpfer wie uns.

<div class="vb-highlight">

**Für Content Creator konkret:** Tool Search ist auch dabei. Das Modell entscheidet quasi selbst welche Werkzeuge es nutzt. Kombiniert mit Computer Use heisst das: "Recherchiere mir die letzten 5 AI-Releases, schreib eine Zusammenfassung, erstell ein Social Post Image und poste es auf LinkedIn." Ein Satz. Modell plant, handelt, verifiziert.

</div>

## OpenAI Codex Security: AI scannt deinen Code auf Lücken

Einen Tag später, 6. März, kam Codex Security. Ein AI-Agent der Repositories nach Sicherheitslücken durchsucht. Nicht mit stumpfen Pattern-Matchern.

### LLM-Reasoning statt Pattern Matching

Klassische Security-Scanner sind halt ziemlich dumb. Die suchen nach bekannten Mustern. SQL Injection hier, Hardcoded Password dort. Reicht nicht mehr.

Codex Security nutzt LLM-Reasoning. Es *versteht* den Code. Erkennt Lücken die kein Pattern-Matcher finden würde, weil sie erst durch die Interaktion mehrerer Teile entstehen. Das ist ne andere Hausnummer, keine Frage.

<div class="vb-stat">
<span class="vb-stat-number">10.561</span>
<span class="vb-stat-text">High-Severity Issues in 1,2 Millionen gescannten Commits. 14 CVEs zugewiesen, unter anderem Probleme in OpenSSH, PHP und Chromium.</span>
</div>

10.561 High-Severity Issues. In echten, produktiven Repos. Kurz sacken lassen.

### Kleine Fussnote am Rande

Anthropic hatte 14 Tage vorher "Claude Code Security" gelauncht. Wer die [Claude Code Setup-Serie](/blog/claude-code-ultimate-setup-produktivitaet-2026) kennt: Das ist mein Daily Driver. Beide Ansätze sind gut fürs Ecosystem. Konkurrenz macht beide besser, so läuft das.

Codex Security ist gratis für den ersten Monat, für ChatGPT Pro, Enterprise, Business und Edu. Danach? Mal sehen.

<div class="vb-gradient"></div>

## Apple Siri + Google Gemini: Das unwahrscheinlichste Paar des Jahres

Hätte ich vor zwei Jahren nicht getippt. Ernsthaft. Apple, die Datenschutz-Fraktion, partnert mit Google für Siris Gehirn. Und irgendwie macht es trotzdem Sinn.

### Was iOS 26.4 mitbringt

Ende März kommt iOS 26.4. Siri wird von Google Gemini angetrieben. 1,2 Billionen Parameter. Das Ganze läuft auf Apples Private Cloud Compute, also Anfragen gehen über Apples Infrastruktur. Nicht direkt zu Google. Der Datenschutz-Pitch steht damit irgendwie noch, zumindest auf dem Papier.

On-Screen Awareness ist auch dabei. Siri liest deinen Bildschirm. Du hast ne E-Mail offen? Siri weiss das. Du guckst dir Fotos von nem Restaurant an? Siri gibt dir Infos dazu, ohne dass du nochmal was tippst.

<div class="vb-shimmer">
<div class="vb-shimmer-inner">

**Multi-Step Tasks, der eigentliche Killer.** Bis zu 10 Aktionen aus einem einzigen Satz. Apples eigenes Beispiel: "Buch Flug nach New York, trag es in meinen Kalender ein und schick Sarah eine SMS dass ich Donnerstag in der Stadt bin." Ein Satz. Drei Apps. Zehn Zwischenschritte. Erledigt.

</div>
</div>

Als ADHS-Mensch ist das eigentlich das Beste was passieren konnte. Kennst du das, wenn du fünf verschiedene Apps aufmachst, den Gedanken mittendrin verlierst und dann halt doch nichts gebucht hast? Das kenn ich definitiv. Das könnte jetzt vorbei sein.

### Was ich noch nicht weiss

Wie gut ist die deutsche Sprachqualität? Wie tief die Integration in Third-Party Apps? Funktioniert das offline? Alles noch unklar. Klärt sich wenn iOS 26.4 ausgerollt wird.

<div class="vb-glow"></div>

## Google Gemini in Workspace: Dokumente die sich selbst schreiben

Am 11. März hat Google Gemini tief in Workspace reingebaut. Docs, Sheets, Slides, Drive. Alles kriegt ein KI-Gehirn.

"Ask Gemini in Drive" hat mich am meisten interessiert. Du kannst quer über alle deine Google Drive Dokumente Fragen stellen. Nicht ein Dokument. Alle. "Was hat der Kunde letztes Quartal bestellt?" und Gemini durchsucht alle relevanten Dateien und fasst zusammen. Klingt simpel. Ist es aber nicht. Wer mal händisch durch 200 Dokumente gewühlt hat um eine Zahl zu finden, weiss was ich mein.

Bei komplexen Projekten wo du hunderte von Dokumenten, E-Mails und Notizen rumliegen hast: Das könnte echt massiv Zeit sparen. Ich bin gespannt ob es in der Praxis so gut ist wie auf der Bühne.

Verfügbar für Google AI Ultra und Pro Subscriber. Nicht kostenlos, aber auch nicht astronomisch.

<div class="vb-gradient"></div>

## Qwen 3.5 Small: Das unterschätzte Release des Monats

Alibabas Qwen 3.5 Small ist vom 1. März. Ich wette die Hälfte der Leute hat das komplett ignoriert. Fehler.

### Die Zahlen die eigentlich nicht stimmen können

Vier Modelle: 0,8B, 2B, 4B und 9B Parameter. Klingt klein. Ist klein. Aber das 9B-Modell matched GPT-OSS-120B.

Ein Modell das 13 Mal kleiner ist liefert dieselbe Performance. Whuuuaht the f.

Das 2B-Modell läuft auf einem iPhone offline. 4GB RAM. Kein Internet nötig. Einfach so.

<div class="vb-highlight-teal">

**Warum mich das als Fotograf interessiert:** Ich bin viel auf Locations ohne Internet unterwegs. Berghütten, abgelegene Outdoor-Spots. Wenn ich dort KI-Assistenz nutzen will, ging das bisher nicht. Mit Qwen 3.5 Small geht das jetzt. Text und Bilder, komplett lokal. Für ESP32-Bastler die lokale Home Assistant Setups bauen auch mega spannend. Edge AI, aber halt wirklich.

</div>

## Die grosse Übersicht: Wer steht wo im März 2026

<div class="vb-card">

| Modell | Was es kann | Besonders |
|--------|-------------|-----------|
| GPT-5.4 | 1M Context, Computer Use, Tool Search | Computer Use nativ |
| Claude Sonnet 4.6 | Near-Opus Qualität, Sonnet-Preis, 1M Context Beta | Preis-Leistung |
| Claude Opus 4.6 | Stärkstes Reasoning aktuell verfügbar | Komplexe Aufgaben |
| Gemini 3.1 Pro | 77,1% ARC-AGI-2 | Benchmark-König |
| Grok 4.20 | Multi-Agent Reasoning | Komplexe Ketten |
| Qwen 3.5 Small | GPT-Level offline | Edge AI, Datenschutz |

</div>

Mein Daily Driver bleibt Claude Sonnet 4.6. Die Preis-Leistung ist für mich unschlagbar. GPT-5.4 hat mich mit Computer Use echt beeindruckt, aber preislich ist das nochmal ne ganz andere Liga wenn du da intensiv mit arbeitest.

<div class="vb-glow"></div>

## Was sich grad wirklich verändert

Im März 2026 sind zwei Sachen gleichzeitig passiert.

AI-Modelle hören auf, reine Chatbots zu sein. GPT-5.4 Computer Use, Siri Multi-Step Tasks, Codex Security als autonomer Scanner. Das sind alles Agenten. Dinger die eigenständig handeln, nicht nur antworten. Handeln, planen, verifizieren.

Und parallel dazu: AI läuft jetzt auf jedem Device. On-Device. Offline. Nicht in der Cloud. Für alle die nicht wollen dass jeder Gedanke durch Server von OpenAI oder Google geht. Das ist basically ein komplett anderes Spiel als noch vor drei Monaten.

<div class="vb-shimmer">
<div class="vb-shimmer-inner">

**Was das für uns als Content Creator heisst:** Der Aufwand für "normale" Tasks geht gegen null. Recherche, erste Drafts, Social Posts, Code-Checks. Was bleibt ist das was nur wir können. Die Perspektive. Die Erfahrung. Das Urteil.

</div>
</div>

## Was ich jetzt teste

Drei Sachen, auf die ich konkret gespannt bin:

1. **GPT-5.4 Computer Use für meinen Thumbnail-Workflow.** Wenn das Ding wirklich Canva selbst bedienen kann, spar ich mir ne Stunde pro Artikel. Mindestens.

2. **iOS 26.4 Siri im Alltag.** Wenn "einen Satz sagen und 10 Aktionen passieren" wirklich funktioniert, ist das ein echtes Lebensqualitäts-Upgrade. Grad mit ADHS.

3. **Qwen 3.5 Small auf meinem alten iPad offline.** Hab noch ein iPad Air das ich fast nicht mehr nutz. Wenn ich dort ein lokales 2B-Modell für Recherche laufen lassen kann... ja. Das will ich ausprobieren.

Ich berichte.

<div class="vb-gradient"></div>

## Fazit: Der Monat wo Agenten real wurden

März 2026 ist der Monat wo "AI als Agent" von der Theorie in die Praxis gerutscht ist. GPT-5.4 plant und handelt. Siri koordiniert Apps. Codex Security scannt eigenständig. Das ist kein gradueller Fortschritt. Das ist ein Sprung.

Die Preise sind dabei nicht explodiert. GPT-5.4 kostet 2,50 Dollar pro Million Input-Token. Qwen 3.5 ist open weight. Siri-Gemini kommt einfach mit dem iOS-Update. Das macht AI-Agenten für Einzelkämpfer und kleine Teams zugänglich. Und das ist eigentlich die grösste Nachricht von allen.

Bleib fokussiert. Oder versuch's zumindest.

---

*Quellen: Integrated Cognition, OpenAI Blog, The Hacker News, 9to5Mac, MacRumors, Google Workspace Blog, LLM Stats, VentureBeat*
