---
title: "GPT-5.4, Codex Security, Siri+Gemini: Die groessten AI-Releases im Maerz 2026"
slug: "ai-releases-maerz-2026"
date: "2026-03-12"
description: "GPT-5.4 kann deinen Computer bedienen, Siri wird von Gemini angetrieben und Qwen laeuft offline auf deinem iPhone. Was die AI-Releases im Maerz 2026 fuer Content Creator bedeuten."
tags: ["ki-news", "ki-tools", "gpt-5", "siri", "gemini", "qwen"]
category: "ki-news"
draft: false
readingTime: 9
heroImage: "/images/blog/ai-releases-maerz-2026-1.webp"
heroImageThumb: "/images/blog/ai-releases-maerz-2026-1-thumb.webp"
titleAccent: "AI-Releases"
keywords: ["AI Releases März 2026", "GPT-5.4", "Siri Gemini", "Codex Security", "Qwen 3.5", "AI Tools 2026"]
---

Dein Computer gehorcht jetzt einem Chatbot. Siri hat ein Google-Gehirn. Und ein Modell das auf dein iPhone passt, schlaegt Riesen die 13 Mal groesser sind. Maerz 2026 halt. Der Monat wo "AI als Agent" aufgehoert hat, Marketing-Gelaber zu sein.

Die letzten zwei Wochen waren echt wild. Ich hab quasi alles verfolgt was rauskam und muss sagen: Das ist einer dieser Monate ueber die wir in zwei Jahren noch reden werden. Nicht weil ein einzelnes Ding alles umgeworfen hat. Sondern weil gefuehlt alle gleichzeitig den Schalter umgelegt haben.

Also. Was ist passiert, was davon taugt, und was bedeutet das fuer uns?

## GPT-5.4: Weniger Chatbot, mehr Agent

OpenAI hat am 5. Maerz GPT-5.4 gedroppt. Und wenn du denkst "ach, wieder ein neues Modell"... nein. Das hier ist echt anders.

### 1 Million Token Context Window

1 Million Token. Klingt erstmal nach ner Zahl fuer Leute die gern Benchmarks lesen. Aber ueberleg mal kurz: Du kannst damit einen ganzen Roman reinwerfen. Den kompletten Quellcode eines mittleren Projekts. Alle E-Mails deines letzten Jahres. Und das Modell verliert halt einfach nicht den Faden.

Ich hab mit [Claude Code meine ganze Workflow-Maschine gebaut](/blog/claude-code-ultimate-setup-produktivitaet-2026). Das groesste Problem bei sowas war immer, dass der Kontext irgendwann abgebrochen ist. Mitten in der Arbeit. Einfach weg. 1 Million Token loest das.

<div class="vb-stat">
<span class="vb-stat-number">1M</span>
<span class="vb-stat-text">Token Context Window. Ein ganzer Roman, ein komplettes Projekt, ein Jahr E-Mails. Alles in einem einzigen Prompt.</span>
</div>

### Native Computer Use

Das hat mich ehrlich gesagt am meisten umgehauen. GPT-5.4 kann Screenshots lesen, Mausbewegungen ausfuehren und auf die Tastatur hauen. Direkt. Nativ. Kein fragiles Python-Script dazwischen.

Ueberleg dir das mal: Du sagst "Geh auf Canva, erstell mir ein Thumbnail fuer diesen Artikel, exportier es und lad es in den Google Drive Ordner rauf." Und es macht das. Schritt fuer Schritt. Eigenstaendig. Kein Witz.

Weniger Chatbot. Mehr Agent.

### 33% weniger Halluzinationen

OpenAI sagt GPT-5.4 halluziniert 33% weniger als GPT-5.2. Wer mal erlebt hat wie ein LLM mit Vollueberzeugung kompletten Unsinn behauptet... das ist einfach das nervigste Feature ueberhaupt. Ein Drittel weniger davon? Nehm ich.

<div class="vb-glow"></div>

### Die Zahlen die nachdenklich machen

83% der getesteten Aufgaben schlaegt GPT-5.4 professionelle Arbeiter in 44 Berufen. Harvey Legal AI hat damit 91% auf dem BigLaw Benchmark erreicht.

Ich sag nicht dass Anwaelte arbeitslos werden. Aber Tools die professionelle Qualitaet liefern, gibt es jetzt fuer 2,50 Dollar pro Million Input-Token. Das veraendert halt schon was moeglich ist. Auch fuer Einzelkaempfer wie uns.

<div class="vb-highlight">

**Fuer Content Creator konkret:** Tool Search ist auch dabei. Das Modell entscheidet quasi selbst welche Werkzeuge es nutzt. Kombiniert mit Computer Use heisst das: "Recherchiere mir die letzten 5 AI-Releases, schreib eine Zusammenfassung, erstell ein Social Post Image und poste es auf LinkedIn." Ein Satz. Modell plant, handelt, verifiziert.

</div>

## OpenAI Codex Security: AI scannt deinen Code auf Luecken

Einen Tag spaeter, 6. Maerz, kam Codex Security. Ein AI-Agent der Repositories nach Sicherheitsluecken durchsucht. Und zwar nicht mit stumpfen Pattern-Matchern.

### LLM-Reasoning statt Pattern Matching

Klassische Security-Scanner sind halt ziemlich dumb. Die suchen nach bekannten Mustern. SQL Injection hier, Hardcoded Password dort. Reicht nicht mehr.

Codex Security nutzt LLM-Reasoning. Es *versteht* den Code. Es erkennt Luecken die kein Pattern-Matcher finden wuerde, weil sie erst durch die Interaktion mehrerer Teile entstehen. Das ist schon ne andere Hausnummer.

<div class="vb-stat">
<span class="vb-stat-number">10.561</span>
<span class="vb-stat-text">High-Severity Issues in 1,2 Millionen gescannten Commits. 14 CVEs zugewiesen, unter anderem Probleme in OpenSSH, PHP und Chromium.</span>
</div>

### Kleine Fussnote am Rande

Anthropic hatte 14 Tage vorher "Claude Code Security" gelauncht. Wer die [Claude Code Setup-Serie](/blog/claude-code-ultimate-setup-produktivitaet-2026) kennt: Das ist mein Daily Driver. Beide Ansaetze sind gut fuers Ecosystem. Konkurrenz macht beide besser.

Codex Security ist gratis fuer den ersten Monat, fuer ChatGPT Pro, Enterprise, Business und Edu. Danach? Mal sehen.

<div class="vb-gradient"></div>

## Apple Siri + Google Gemini: Das unwahrscheinlichste Paar des Jahres

Haette ich vor zwei Jahren nicht getippt. Ernsthaft. Apple, die Datenschutz-Fraktion, partnert mit Google fuer Siris Gehirn. Und irgendwie macht es trotzdem Sinn.

### Was iOS 26.4 mitbringt

Ende Maerz kommt iOS 26.4. Siri wird von Google Gemini angetrieben. 1,2 Billionen Parameter. Das Ganze laeuft auf Apples Private Cloud Compute, also Anfragen gehen ueber Apples Infrastruktur. Nicht direkt zu Google. Der Datenschutz-Pitch steht damit irgendwie noch.

On-Screen Awareness ist auch dabei. Siri liest deinen Bildschirm. Du hast ne E-Mail offen? Siri weiss das. Du guckst dir Fotos von nem Restaurant an? Siri kann dir Infos dazu geben ohne dass du nochmal was tippst.

<div class="vb-shimmer">
<div class="vb-shimmer-inner">

**Multi-Step Tasks, der eigentliche Killer.** Bis zu 10 Aktionen aus einem einzigen Satz. Apples eigenes Beispiel: "Buch Flug nach New York, trag es in meinen Kalender ein und schick Sarah eine SMS dass ich Donnerstag in der Stadt bin." Ein Satz. Drei Apps. Zehn Zwischenschritte. Erledigt.

</div>
</div>

Fuer mich als ADHS-Mensch ist das eigentlich das Beste was passieren konnte. Kennst du das wenn du fuenf verschiedene Apps aufmachst, den Gedanken mittendrin verlierst und dann halt doch nichts gebucht hast? Ja. Das koennte vorbei sein.

### Was ich noch nicht weiss

Wie gut ist die deutsche Sprachqualitaet? Wie tief die Integration in Third-Party Apps? Funktioniert das offline? Alles noch unklar. Klaert sich in den naechsten Wochen wenn iOS 26.4 ausgerollt wird.

<div class="vb-glow"></div>

## Google Gemini in Workspace: Dokumente die sich selbst schreiben

Am 11. Maerz hat Google Gemini tief in Workspace reingebaut. Docs, Sheets, Slides, Drive. Alles kriegt ein KI-Gehirn.

"Ask Gemini in Drive" hat mich am meisten interessiert. Du kannst quer ueber alle deine Google Drive Dokumente Fragen stellen. Nicht ein Dokument. Alle. "Was hat der Kunde letztes Quartal bestellt?" und Gemini durchsucht alle relevanten Dateien und fasst zusammen.

Bei komplexen Projekten wo du hunderte von Dokumenten, E-Mails und Notizen rumliegen hast: Das koennte echt massiv Zeit sparen. Ich bin gespannt ob es in der Praxis so gut ist wie auf der Buehne.

Verfuegbar fuer Google AI Ultra und Pro Subscriber. Nicht kostenlos, aber auch nicht astronomisch.

<div class="vb-gradient"></div>

## Qwen 3.5 Small: Das unterschaetzte Release des Monats

Alibabas Qwen 3.5 Small ist vom 1. Maerz. Ich wette die Haelfte der Leute hat das komplett ignoriert. Fehler.

### Die Zahlen die eigentlich nicht stimmen koennen

Vier Modelle: 0,8B, 2B, 4B und 9B Parameter. Klingt klein. Ist klein. Aber das 9B-Modell matched GPT-OSS-120B. Ein Modell das 13 Mal kleiner ist liefert dieselbe Performance. Wie bitte?

Das 2B-Modell laeuft auf einem iPhone offline. 4GB RAM. Kein Internet noetig. Einfach so.

<div class="vb-highlight-teal">

**Warum mich das als Fotograf interessiert:** Ich bin viel auf Locations ohne Internet unterwegs. Berghuetten, abgelegene Outdoor-Spots. Wenn ich dort KI-Assistenz nutzen will, ging das bisher nicht. Mit Qwen 3.5 Small geht das jetzt. Text und Bilder, komplett lokal. Fuer ESP32-Bastler die lokale Home Assistant Setups bauen auch mega spannend. Edge AI, aber halt wirklich.

</div>

## Die grosse Uebersicht: Wer steht wo im Maerz 2026

<div class="vb-card">

| Modell | Was es kann | Besonders |
|--------|-------------|-----------|
| GPT-5.4 | 1M Context, Computer Use, Tool Search | Computer Use nativ |
| Claude Sonnet 4.6 | Near-Opus Qualitaet, Sonnet-Preis, 1M Context Beta | Preis-Leistung |
| Claude Opus 4.6 | Staerkstes Reasoning aktuell verfuegbar | Komplexe Aufgaben |
| Gemini 3.1 Pro | 77,1% ARC-AGI-2 | Benchmark-Koenig |
| Grok 4.20 | Multi-Agent Reasoning | Komplexe Ketten |
| Qwen 3.5 Small | GPT-Level offline | Edge AI, Datenschutz |

</div>

Mein Daily Driver bleibt Claude Sonnet 4.6. Die Preis-Leistung ist fuer mich einfach unschlagbar. GPT-5.4 hat mich mit Computer Use echt beeindruckt, aber preislich ist das nochmal ne ganz andere Liga wenn du da intensiv mit arbeitest.

<div class="vb-glow"></div>

## Was sich grad wirklich veraendert

Im Maerz 2026 sind zwei Sachen gleichzeitig passiert.

AI-Modelle hoeren auf, reine Chatbots zu sein. GPT-5.4 Computer Use, Siri Multi-Step Tasks, Codex Security als autonomer Scanner. Das sind alles Agenten. Dinger die eigenstaendig handeln, nicht nur antworten.

Und gleichzeitig: AI laeuft jetzt auf jedem Device. On-Device. Offline. Nicht in der Cloud. Fuer alle die nicht wollen dass jeder Gedanke durch Server von OpenAI oder Google geht. Das ist halt ein komplett anderes Spiel als noch vor drei Monaten.

<div class="vb-shimmer">
<div class="vb-shimmer-inner">

**Was das fuer uns als Content Creator heisst:** Der Aufwand fuer "normale" Tasks geht gegen null. Recherche, erste Drafts, Social Posts, Code-Checks. Was bleibt ist das was nur wir koennen. Die Perspektive. Die Erfahrung. Das Urteil.

</div>
</div>

## Was ich jetzt teste

Drei Sachen, auf die ich konkret gespannt bin:

1. **GPT-5.4 Computer Use fuer meinen Thumbnail-Workflow.** Wenn das Ding wirklich Canva selbst bedienen kann, spar ich mir ne Stunde pro Artikel. Mindestens.

2. **iOS 26.4 Siri im Alltag.** Wenn "einen Satz sagen und 10 Aktionen passieren" wirklich funktioniert, ist das ein echtes Lebensqualitaets-Upgrade. Grad mit ADHS.

3. **Qwen 3.5 Small auf meinem alten iPad offline.** Hab noch ein iPad Air das ich fast nicht mehr nutz. Wenn ich dort ein lokales 2B-Modell fuer Recherche laufen lassen kann... ja. Das will ich ausprobieren.

Ich berichte.

<div class="vb-gradient"></div>

## Fazit: Der Monat wo Agenten real wurden

Maerz 2026 ist der Monat wo "AI als Agent" von der Theorie in die Praxis gerutscht ist. GPT-5.4 plant und handelt. Siri koordiniert Apps. Codex Security scannt eigenstaendig. Das ist kein gradueller Fortschritt. Das ist ein Sprung.

Die Preise sind dabei nicht explodiert. GPT-5.4 kostet 2,50 Dollar pro Million Input-Token. Qwen 3.5 ist open weight. Siri-Gemini kommt einfach mit dem iOS-Update. Das macht AI-Agenten fuer Einzelkaempfer und kleine Teams zugaenglich. Und das ist eigentlich die groesste Nachricht von allen.

Bleib fokussiert. Oder versuch's zumindest.

---

*Quellen: Integrated Cognition, OpenAI Blog, The Hacker News, 9to5Mac, MacRumors, Google Workspace Blog, LLM Stats, VentureBeat*
