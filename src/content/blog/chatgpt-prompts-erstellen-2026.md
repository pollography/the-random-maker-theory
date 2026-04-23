---
title: "ChatGPT Prompts erstellen: So schreibst du Prompts die funktionieren"
slug: "chatgpt-prompts-erstellen-2026"
date: "2026-04-01"
description: "ChatGPT Prompts erstellen die wirklich funktionieren — mit System-Prompts, Vorher/Nachher-Beispielen und Copy-Paste-Templates für Content Creator."
tags: ["chatgpt", "prompting", "prompting", "ki-tools", "tutorial", "prompting", "prompting"]
category: "ki-tools"
draft: false
readingTime: 11
heroImage: "/images/blog/chatgpt-prompts-erstellen-2026-1.webp"
heroImageThumb: "/images/blog/chatgpt-prompts-erstellen-2026-1-thumb.webp"
titleAccent: "Prompts"
podcastUrl: ""
videoUrl: ""
---

# ChatGPT Prompts erstellen: So schreibst du Prompts die funktionieren

<div class="rf-block rf-tldr" role="note" aria-label="TL;DR">
	<span class="rf-label" aria-hidden="true">TL;DR</span>
	<ul>
		<li>Die meisten Leute schreiben ChatGPT Prompts wie Google-Suchanfragen — das ist das Problem</li>
		<li>Ein guter Prompt hat vier Teile: Rolle, Aufgabe, Kontext, Format</li>
		<li>System-Prompts sind das mächtigste Feature das die meisten nie nutzen</li>
		<li>Vorher/Nachher zeige ich für jeden Tipp konkret — nicht abstrakt</li>
		<li>Am Ende: 8 fertige Templates für die häufigsten Content-Creator-Aufgaben</li>
		<li>Companion-Piece zu meinem <a href="/blog/prompt-engineering-lernen-2026">Prompt Engineering Artikel</a> — der gibt das Fundament, dieser hier die Praxis</li>
	</ul>
</div>

---

Ich habe in den letzten zwei Jahren locker tausend Prompts geschrieben. Für Blog-Artikel, Social-Media-Texte, Research-Zusammenfassungen, Code-Snippets, Automatisierungs-Workflows. Und ich habe dabei einen Fehler gemacht der mir wahrscheinlich Hunderte von Stunden gekostet hat.

Ich habe ChatGPT Prompts erstellt wie ich Google-Anfragen formuliere. Kurz. Stichwortartig. Ohne Kontext.

Das Ergebnis war meistens okay. Selten gut. Nie wirklich was ich wollte.

Dann habe ich angefangen zu verstehen wie diese Modelle eigentlich ticken — und plötzlich war der Unterschied zwischen "okay" und "direkt verwendbar" nicht mehr magisch. Es war handwerklich. Das kann man lernen. Das zeige ich dir jetzt.

---

## Warum deine Prompts gerade nicht funktionieren

Bevor es an die Lösung geht — kurze Diagnose.

Es gibt drei Muster die ich immer wieder sehe wenn Leute schlechte ChatGPT-Ergebnisse bekommen:

**Muster 1: Kein Kontext**
"Schreib mir einen Newsletter." — ChatGPT weiß nicht: Für wen? Über was? In welchem Ton? Mit welchem Ziel?

**Muster 2: Kein Zielformat**
"Gib mir Ideen für Social Media Posts." — Wie viele? Welche Plattform? Wie lang? Als Liste, als Absätze, als Tabelle?

**Muster 3: Keine Rolle**
Du stellst dem Modell eine Fachfrage ohne ihm zu sagen aus welcher Perspektive es antworten soll. Ergebnis: Generische Antwort die für alle passt und deshalb für niemanden gut ist.

Diese drei Probleme ließen sich alle mit einer einfachen Struktur lösen. Kommen wir dazu.

---

## Die Grundstruktur: RAKE

Ich nenne meine Prompt-Struktur RAKE. Vier Teile, jeder macht einen klaren Job:

**R — Rolle:** Wer soll das Modell sein?
**A — Aufgabe:** Was soll es konkret tun?
**K — Kontext:** Was muss es wissen um die Aufgabe gut zu machen?
**E — Ergebnis-Format:** Wie soll der Output aussehen?

Nicht immer brauche ich alle vier. Für eine einfache Frage reicht die Aufgabe. Für alles was länger als drei Sätze werden soll — alle vier.

Und RAKE ist kein starres Template das du stur ausfüllen musst. Es ist eine Checkliste die du im Kopf abhakst, bevor du auf Enter drückst.

---

## Teil 1: Die Rolle — und warum sie mehr macht als du denkst

Wenn du ChatGPT eine Rolle gibst, passiert etwas Interessantes: Das Modell filtert sein riesiges Wissen durch diese Perspektive. Ein SEO-Spezialist und ein Journalist würden denselben Artikel-Outline sehr unterschiedlich strukturieren — und ChatGPT spiegelt das.

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Wie mache ich mein YouTube-Video bekannter?"</p>
</div>

Ergebnis: Generische Tipps die du schon zehnmal gelesen hast. Thumbnail optimieren, guter Titel, Keywords in der Beschreibung. Alles stimmt. Nichts hilft konkret.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Du bist ein YouTube-Wachstumsstratege der sich auf Tech-Creators mit unter 10.000 Abonnenten spezialisiert hat. Mein Kanal dreht sich um Smart Home und KI-Tools für Hobbyisten. Mein letztes Video über ESP32-Sensoren hat 340 Views in 30 Tagen. Was sind die drei spezifischsten Maßnahmen die ich jetzt angehen sollte — mit Begründung warum genau diese drei?"</p>
</div>

Ergebnis: Konkrete Handlungsempfehlungen die auf meine Niche und meine aktuelle Situation zugeschnitten sind.

Der Unterschied liegt nicht daran, dass der zweite Prompt länger ist. Er liegt daran, dass ich dem Modell sage wer es ist — und damit den gesamten Antwortrahmen setze.

**Mein Tipp für gute Rollen:** Sei spezifisch über die Spezialisierung, nicht nur die Berufsbezeichnung. "Du bist ein Texter" ist schwach. "Du bist ein Conversion-Texter der E-Mail-Onboarding-Sequenzen für Software-Produkte schreibt" ist stark.

---

## Teil 2: Die Aufgabe — konkret statt vage

Die Aufgabe klingt nach dem offensichtlichsten Teil. Ist sie nicht. Das ist wo die meisten Leute scheitern.

Das Problem: Wir formulieren Aufgaben wie Wünsche statt wie Briefings.

"Schreib mir was über Automatisierung" ist ein Wunsch. "Schreib einen 400-Wörter-Intro-Absatz für einen Artikel mit dem Titel 'n8n für Einsteiger: Dein erster Workflow in 30 Minuten'" ist ein Briefing.

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Hilf mir mit meiner Instagram-Bio."</p>
</div>

Ergebnis: Allgemeine Ratschläge was eine gute Bio ausmacht. Oder eine generische Bio die nichts über mich verrät.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Schreib drei Varianten für meine Instagram-Bio. Ich bin Fotograf und Content Creator, mein Account dreht sich um Smart Home, KI-Fotografie und Maker-Projekte. Ich spreche deutschsprachige Tech-Hobbyisten an. Max. 150 Zeichen je Variante. Kein Marketing-Speak. Direkt, persönlich, ein bisschen nerd-ig."</p>
</div>

Jetzt weiß das Modell nicht nur was, sondern auch wie viel, für wen, und in welchem Ton.

**Checkliste für die Aufgabe beim ChatGPT Prompts erstellen:**
- Was genau soll produziert werden? (nicht "hilf mir" sondern "schreib/analysiere/erstelle")
- Wie lang / wie viele?
- Welche Einschränkungen?
- Was ist der Zweck des Ergebnisses?

---

## Teil 3: Kontext — die unterschätzte Investition

Zwei Sätze Kontext können die Qualität eines Outputs verdoppeln. Das ist keine Übertreibung — das ist meine Erfahrung aus hunderten von Prompts.

Das Modell weiß zu Beginn eines Chats nichts über dich. Nichts über dein Projekt, deine Zielgruppe, deinen Stil, deine Einschränkungen. Alles was es nicht weiß, muss es raten. Und geraten ist selten gut.

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Erstell mir eine Outline für einen Artikel über KI-Bildbearbeitung."</p>
</div>

Ergebnis: Eine generische Outline die für jeden halbwegs informativen Artikel funktionieren würde. Kein Alleinstellungsmerkmal, kein Winkel, keine Persönlichkeit.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Erstell mir eine Outline für einen Artikel über KI-Bildbearbeitung. Kontext: Ich bin Fotograf mit 15 Jahren Erfahrung und schreibe aus der Perspektive jemand der KI-Tools erst skeptisch war und jetzt täglich nutzt. Zielgruppe: Hobbyfotografen die noch nicht mit KI-Bearbeitung angefangen haben. Ziel: Sie sollen nach dem Artikel wissen welche zwei Tools sie als erstes ausprobieren sollten. Ton: Persönlich, ehrlich, kein Tool-Promo-Speak. Länge: ~2500 Wörter."</p>
</div>

Das ist kein langer Prompt — das sind fünf Sätze Kontext. Aber der Output ist völlig anders.

**Was in den Kontext gehört:**
- Wer schreibt / für wen ist das Ergebnis
- Welches Problem soll gelöst werden
- Was sind Einschränkungen oder Besonderheiten
- Was hat man schon probiert / was soll anders werden

---

## Teil 4: Das Ergebnis-Format — Kontrolle über den Output

Das ist die Technik die mir täglich die meiste Zeit spart.

Die meisten Leute sagen dem Modell was sie wollen, aber nicht wie der Output aussehen soll. Dann bekommen sie Fließtext wenn sie eine Tabelle brauchen, einen Roman wenn sie drei Bullets wollen, oder eine nummerierte Liste wenn sie eigentlich Markdown-Headings für einen Blog-Artikel brauchen.

Das lässt sich vollständig kontrollieren. Und ich tue das bei fast jedem Prompt.

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Vergleich die drei besten Automatisierungs-Tools für Content Creator."</p>
</div>

Ergebnis: Irgendeine Mix-Struktur, unvorhersehbar, wahrscheinlich nicht was ich brauche.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Vergleich Make, n8n und Zapier für Content Creator. Erstelle eine Tabelle mit den Spalten: Tool | Kostenloser Plan | Beste Stärke | Größte Schwäche | Mein Urteil. Unter der Tabelle: zwei Sätze wann ich welches Tool empfehlen würde."</p>
</div>

Ich bekomme genau das. Kein Raten, keine Nacharbeit, direkt verwendbar.

**Format-Optionen die ich regelmäßig nutze:**
- "Als Markdown-Tabelle mit Spalten X, Y, Z"
- "Als nummerierte Liste, max. 7 Punkte, je max. 20 Wörter"
- "In drei Abschnitte gegliedert: Problem, Lösung, nächster Schritt"
- "Als JSON mit den Feldern: title, teaser, tags"
- "Bullet Points, jeder beginnt mit einem starken Verb"
- "H2 für jeden Hauptpunkt, darunter 2-3 Sätze"

---

## System-Prompts: Das mächtigste Feature das kaum jemand nutzt

Kommen wir zum Teil der den meisten Leuten beim ChatGPT Prompts erstellen komplett fehlt.

Ein System-Prompt ist eine Anweisung die vor dem eigentlichen Gespräch steht — und das gesamte Verhalten des Modells für diesen Chat definiert. Es ist wie ein dauerhafter Kontext den du nur einmal setzen musst statt in jedem einzelnen Prompt zu wiederholen.

In der ChatGPT-Oberfläche findest du System-Prompts unter "Mein GPT" oder in Custom GPTs. In der API sind sie der `system`-Parameter. Im Alltag nutze ich sie über Custom Instructions in den ChatGPT-Einstellungen.

**Was ein System-Prompt kann:**
- Deinen Schreibstil permanent definieren
- Deine Zielgruppe ein für alle Mal beschreiben
- Ausgabe-Regeln setzen die immer gelten
- Das Modell auf eine spezifische Aufgabe fokussieren

**Mein persönlicher System-Prompt für Content-Erstellung:**

```
Du bist mein Content-Assistent für den Tech-Blog TRMT (The Random Maker Theory).

WER ICH BIN: Fotograf, Maker und Content Creator aus Berlin. Schreibe über Smart Home, KI-Tools und Automatisierung für Hobbyprojekte.

MEINE ZIELGRUPPE: Deutschsprachige Tech-Hobbyisten, 25-45, die Dinge gerne selbst bauen und verstehen. Keine Entwickler, aber technisch interessiert.

SCHREIBSTIL:
- Immer "ich"-Perspektive, nie "wir"
- Locker, direkt, Buddy-like
- Kurze Sätze. Max. 3-4 Sätze pro Absatz.
- Ehrliche Wertungen erlaubt: "Das ist geil", "Das nervt", "Hat bei mir nicht funktioniert"
- Kein Corporate-Deutsch, kein AI-Slop

VERBOTEN:
- "In der heutigen Zeit..." / "Es ist wichtig zu beachten..." / "Zusammenfassend lässt sich sagen..."
- Unnötige Superlative ohne Beleg
- Mehr als zwei Satzfragmente in Folge die mit "Ich" beginnen

IMMER LIEFERN:
- TL;DR am Anfang (4-6 Bullet Points)
- Konkrete Beispiele statt abstrakte Behauptungen
- Ehrliche Einschränkungen wo sie existieren
```

Seit ich das einmal eingerichtet habe, spare ich mir bei jedem einzelnen Prompt den Kontext-Overhead. Das Modell weiß wer ich bin und wie es antworten soll.

---

## Vorher/Nachher: Drei häufige Fehler und die Fixes

Lass mich drei konkrete Situationen durchspielen die ich selbst erlebt habe.

### Fehler 1: Der Ideen-Prompt ohne Nische

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Gib mir 10 Blog-Artikel-Ideen über KI."</p>
</div>

Was du bekommst: "Was ist künstliche Intelligenz", "Die besten KI-Tools 2026", "KI und die Zukunft der Arbeit" — generisch bis zur Schmerzgrenze.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Ich brauche 10 Blog-Artikel-Ideen für meine Nische: Smart Home und KI-Tools für Hobbyisten ohne Entwickler-Hintergrund. Meine Stärken: Ich fotografiere seit 15 Jahren und baue Smart-Home-Projekte mit ESP32 und Home Assistant. Was ich NICHT will: Generische 'Top 10 AI Tools' Listen, Unternehmens-Perspektive, rein theoretische Artikel. Gib mir zu jeder Idee: Titel, einen Satz was ihn besonders macht, und welches meiner eigenen Projekte ich als Praxisbeispiel einbauen könnte."</p>
</div>

Das Ergebnis ist spezifisch genug dass du weißt, ob du den Artikel schreiben willst — und direkt anfangen kannst.

### Fehler 2: Der Überarbeitungs-Prompt der nichts ändert

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Mach den Text besser."</p>
</div>

Was du bekommst: Marginale Stiländerungen, der Text bleibt im Kern gleich.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Überarbeit diesen Absatz. Das Problem: Er klingt zu distanziert und wie ein Wikipedia-Artikel. Was ich will: Es soll sich anfühlen wie jemand der seinem Kumpel am Tisch erklärt wie das Ding funktioniert. Konkrete Sprache, nicht abstrakt. Und kürz es um 30% — streiche alles was nicht direkt zur Hauptaussage beiträgt. Hauptaussage ist: [KERNAUSSAGE HIER]."</p>
</div>

Jetzt weißt das Modell nicht nur das Ziel, sondern auch das Problem mit dem aktuellen Stand und die Prioritäten.

### Fehler 3: Der Research-Prompt der Floskeln produziert

**Vorher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Was sind die Vor- und Nachteile von Home Assistant?"</p>
</div>

Was du bekommst: Aufgelistete Bullets, alle korrekt, keiner überraschend, nichts was du nicht schon wusstest.

**Nachher:**
<div class="rf-block rf-callout" role="note" aria-label="Notiz">
	<span class="rf-label" aria-hidden="true">Notiz</span>
	<p>"Ich überlege ob ich von Philips Hue auf Home Assistant umsteige. Ich habe aktuell: 12 Hue-Lampen, 3 Steckdosen, Echo Dot als Sprachsteuerung, und ich bin kein Entwickler aber kann YAML lesen. Was sind die drei konkreten Punkte die ich wirklich abwägen sollte — nicht allgemeine Vor/Nachteile sondern was für jemanden mit meinem Setup und meinem Tech-Level tatsächlich relevant ist? Sei ehrlich wo Home Assistant mehr Aufwand bedeutet als der Mehrwert rechtfertigt."</p>
</div>

Der Schlüssel hier: Ich gebe meinen konkreten Stand an und bitte explizit um Ehrlichkeit über Schwächen.

---

## 8 Copy-Paste-Templates für Content Creator

Kommen wir zum praktischen Teil. Diese Templates habe ich mir über Monate zusammengebaut — jedes hat seinen spezifischen Job.

**Template 1: Blog-Artikel-Intro**
```
Du bist ein Tech-Blogger der für Hobby-Tüftler und Maker schreibt.

Schreib den Eröffnungsabsatz für einen Artikel mit dem Titel: "[TITEL]"

Kontext:
- Primary Keyword: "[KEYWORD]" muss in den ersten 100 Wörtern stehen
- Hook: Starte mit einer persönlichen Situation oder einem konkreten Problem, kein "In der heutigen Zeit"
- Ton: Locker, direkt, ich-Perspektive
- Länge: max. 150 Wörter

Danach: Ein TL;DR mit 4-5 Bullet Points was der Leser aus dem Artikel mitnimmt.
```

**Template 2: Social Media Post (X/Threads)**
```
Du bist ein Social Media Manager für einen Tech-Content-Creator.

Schreib 3 Varianten eines Posts über: [THEMA/NEWS]

Kontext:
- Plattform: X (Twitter) und Threads
- Max. 280 Zeichen je Variante
- Kein Hashtag-Spam, max. 2 Hashtags wenn überhaupt
- Ton: Meinung haben, nicht neutral berichten

Beispiel meines Stils: "[DEIN BESTER BISHERIGER POST]"

Format: Drei nummerierte Varianten. Je Variante: Post-Text + ein Satz warum diese Variante funktioniert.
```

**Template 3: Newsletter-Sektion**
```
Du bist ein Newsletter-Autor der wöchentliche Tech-Briefings schreibt.

Schreib eine "Tool der Woche"-Sektion für: [TOOL-NAME]

Kontext:
- Ich habe das Tool [X WOCHEN] lang genutzt, hauptsächlich für: [USE CASE]
- Was mich überrascht hat: [EHRLICHE BEOBACHTUNG]
- Zielgruppe: Tech-Hobbyisten die Tools produktiv nutzen wollen
- Ton: Wie ein Freund der seinen Lieblings-Fund teilt
- Länge: 120-160 Wörter

Format: Ein kurzer Einstiegssatz der erklärt was das Tool macht, dann was ich konkret damit mache, dann ein Satz Ehrlichkeit (was nervt oder fehlt), dann ein CTA.
```

**Template 4: YouTube-Video-Beschreibung**
```
Du bist ein YouTube-Content-Stratege der auf Maker und Tech-Content spezialisiert ist.

Schreib eine YouTube-Beschreibung für ein Video über: [THEMA]

Kontext:
- Video-Länge: [LÄNGE]
- Hauptinhalt: [2-3 Bullet Points was gezeigt wird]
- Primäres Keyword: [KEYWORD]
- Tone: Direkt, kein Clickbait, kein übertriebenes Superlativ-Geschrei

Format:
- Erster Absatz (2-3 Sätze): Was wird im Video gezeigt — keine Fragen stellen, direkt sagen
- Timestamps: [VIDEO-ABSCHNITTE HIER]
- Equipment/Links: [AFFILIATE-LINKS PLACEHOLDER]
- Social: [SOCIAL LINKS PLACEHOLDER]
- Tags (für YouTube SEO): 10-15 relevante Tags
```

**Template 5: Produkt-Vergleich als Tabelle**
```
Du bist ein Tech-Reviewer der für Hobbyisten ohne Entwickler-Hintergrund schreibt.

Erstelle einen strukturierten Vergleich von: [PRODUKT/TOOL A] vs [PRODUKT/TOOL B]

Kontext:
- Mein Use Case: [WOFÜR ICH DAS NUTZE]
- Entscheidungskriterien die für mich relevant sind: [LISTE]
- Ich will wissen was WIRKLICH anders ist, nicht nur Spec-Sheets

Format:
Tabelle mit Spalten: Kriterium | [A] | [B] | Gewinner für meinen Use Case
Dann drei Sätze: Wann A nehmen. Wann B nehmen. Mein Urteil.
```

**Template 6: FAQ-Abschnitt für Blog**
```
Du bist ein SEO-Texter der strukturierte Inhalte für Tech-Blogs erstellt.

Erstelle 5 FAQ-Fragen und -Antworten zum Thema: [THEMA]

Kontext:
- Die Fragen sollen echte Such-Anfragen widerspiegeln die Leute stellen
- Antworten: max. 80 Wörter je Antwort, direkt, keine Floskeln
- Primäres Keyword "[KEYWORD]" soll in mindestens 2 Fragen vorkommen
- Ton: Erkläre wie du einem verständigen Freund erklären würdest, nicht wie ein Handbuch

Format: H3-Überschriften als Fragen, darunter der Antwort-Text. Schema-Markup-ready.
```

**Template 7: Affiliate-Link-Sektion**
```
Du bist ein Conversion-Texter der auf ehrliches Produkt-Marketing spezialisiert ist.

Schreib eine "Was du brauchst"-Einkaufsliste für mein Projekt: [PROJEKT]

Kontext:
- Produkte: [PRODUKTLISTE MIT UNGEFÄHREN PREISEN]
- Ton: Ehrlich — wenn etwas optional ist, sag es. Wenn es eine günstigere Alternative gibt, erwähn sie.
- Kein Overselling

Format: Nummerierte Liste. Je Produkt: Produktname (Link-Platzhalter), Preis ca., ein Satz warum es in dieses Projekt gehört. Am Ende: Gesamtkosten ca. X EUR.
```

**Template 8: Artikel-Fazit**
```
Du bist ein Content-Autor der Tech-Artikel für Hobbyisten schreibt.

Schreib das Fazit für meinen Artikel über: [THEMA]

Kontext:
- Hauptaussage des Artikels war: [KERNBOTSCHAFT]
- Nächster Schritt für den Leser: [KONKRETE HANDLUNG]
- Interne Links die ich setzen will: [ARTIKEL 1], [ARTIKEL 2]

Format:
- Kein "Zusammenfassend lässt sich sagen" — direkt ins Fazit
- Max. 3 kurze Absätze
- Letzter Satz: klarer Next Step für den Leser
- Unterschrift-Zeile: "— TRMT"
```

---

## Wie du jetzt anfängst (ohne alles auf einmal zu ändern)

ChatGPT Prompts erstellen ist eine Gewohnheit. Keine einmalige Sache.

Mein Vorschlag: Schnapp dir den nächsten Prompt den du sowieso schreiben würdest — und bau ihn nach RAKE um. Nicht alle acht Templates auf einmal. Ein Prompt. Schau was sich verändert.

Das zweite was ich empfehle: Leg dir ein Prompt-Dokument an. Eine einfache Textdatei mit deinen besten Prompts die du immer wieder nutzt. Ich habe über 40 gespeichert. Manche davon nutze ich mehrmals pro Woche. Das spart mehr Zeit als jedes andere Produktivitäts-Tool das ich kenne.

Und wenn du verstehen willst was hinter den Techniken steckt — also warum Rollen-Prompting funktioniert, was Chain of Thought wirklich macht, und wie du ein komplettes Prompt-Engineering-System aufbaust — dann lies meinen Artikel zum [Prompt Engineering lernen](/blog/prompt-engineering-lernen-2026). Der geht tiefer ins Fundament, dieser hier war die praktische Werkzeugkiste.

Wenn du außerdem wissen willst ob du für diese Aufgaben besser ChatGPT oder Claude verwenden solltest — das ist nicht immer eindeutig, und ich nutze beide täglich — kommt dazu bald mein [ehrlicher Vergleich der beiden Tools](/blog/chatgpt-vs-claude-content-creator-2026).

ChatGPT Prompts erstellen ist kein Hexenwerk. Es ist Handwerk. Und Handwerk kann man lernen.

— TRMT
