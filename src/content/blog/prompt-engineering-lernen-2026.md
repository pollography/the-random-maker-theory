---
title: "Prompt Engineering lernen: Mein System"
slug: "prompt-engineering-lernen-2026"
date: "2026-03-27"
description: "90% der Leute prompten falsch – mit meinem System lernst du Prompt Engineering in unter einer Stunde. Konkret, praxisnah, ohne Entwickler-Vorkenntnisse."
tags:
  [
    "prompting",
    "chatgpt",
    "claude",
    "ki-tools",
    "tutorial",
    "prompting",
  ]
category: "ki-tools"
draft: false
readingTime: 12
heroImage: "/images/blog/prompt-engineering-lernen-2026-1.webp"
heroImageThumb: "/images/blog/prompt-engineering-lernen-2026-1-thumb.webp"
titleAccent: "Prompt Engineering"
podcastUrl: ""
videoUrl: ""
---

# Prompt Engineering lernen: Mein komplettes System

<div class="rf-block rf-tldr">
	<span class="rf-label">TL;DR</span>
	<ul>
		<li>90% der Leute verschenken das Potenzial von ChatGPT und Claude, weil sie prompten wie sie googeln</li>
		<li>Prompt Engineering lernen heißt nicht: komplizierte Formeln auswendig lernen</li>
		<li>Vier Techniken reichen für 80% der Anwendungsfälle</li>
		<li>Rollen-Prompting und Output-Format-Vorgabe bringen sofort die meiste Verbesserung</li>
		<li>Chain-of-Thought klingt fancy, hilft aber vor allem bei logischen Aufgaben</li>
		<li>Am Ende des Artikels: mein Template-System mit 10 Copy-Paste-Prompts</li>
	</ul>
</div>

---

Ich erinnere mich noch genau an meinen ersten ChatGPT-Prompt. "Schreib mir einen Blog-Artikel über KI-Bildbearbeitung." Das Ergebnis war... okay. Generisch. Austauschbar. Hätte jeder schreiben können, der zehn Minuten Wikipedia liest.

Drei Monate später hatte ich dasselbe Tool, aber vollkommen andere Ergebnisse. Nicht weil ChatGPT sich verändert hatte. Sondern weil ich gelernt hatte, wie ich mit ihm rede.

Das ist Prompt Engineering lernen in der Praxis. Kein Entwickler-Kurs. Kein Python. Kein API-Wissen nötig. Nur das Verständnis, wie diese Modelle eigentlich "denken" — und wie du diese Eigenheit zu deinem Vorteil nutzt.

---

## Was Prompt Engineering wirklich ist (und was nicht)

Ich habe lange gedacht, Prompt Engineering sei Magie. Irgendwelche Zauberwörter die du in einen Prompt tippst und die KI dann plötzlich dreimal besser wird.

Ist es nicht.

Prompt Engineering ist im Kern: **Kontext liefern, den das Modell braucht, um die richtige Antwort zu geben.**

Das Modell weiß beim Start eines Chats nichts über dich. Nichts über dein Projekt. Nichts darüber, für wen der Text ist, wie lang er sein soll, in welchem Ton, mit welchem Fokus. Je mehr du davon explizit machst, desto besser das Ergebnis.

Stell dir vor, du bestellst in einem Restaurant und sagst nur: "Ich hätte gerne was zu essen." Der Koch muss raten. Er gibt dir halt irgendwas. Funktioniert — aber ob du das wolltest? Weißt du nicht.

Wenn du sagst: "Ich möchte ein vegetarisches Gericht, nicht zu scharf, am liebsten mit Pasta, und ich bin heute eher auf etwas Leichtes" — dann kann der Koch tatsächlich was Passendes machen.

Genau das ist Prompt Engineering lernen. Du lernst, dem Modell zu sagen was es braucht.

---

## Die 5 Grundprinzipien (bevor es zu den Techniken geht)

Bevor ich auf die konkreten Techniken eingehe: fünf Grundprinzipien, die alles andere fundieren. Wenn du diese verinnerlicht hast, verbesserst du jeden Prompt automatisch.

**1. Spezifisch schlägt allgemein — immer.**
Je vager dein Prompt, desto generischer die Antwort. "Schreib was über Social Media" ist kein Auftrag. "Schreib mir drei Instagram-Captions für ein Foto von meinem neuen Espresso-Setup, Zielgruppe: Home-Barista-Enthusiasten, Ton: locker und ein bisschen nerdy, max. 100 Zeichen je Caption" — das ist ein Auftrag.

**2. Kontext ist kein Overhead, sondern Investition.**
Zwei Sätze Kontext können die Ausgabequalität verdoppeln. Die KI will nicht raten — sie muss raten, wenn du nichts sagst.

**3. Zeig, was du willst — nicht nur was du meinst.**
Wenn du einen bestimmten Stil willst, gib ein Beispiel. "Schreib wie der Eröffnungsabsatz hier" ist mächtiger als "schreib locker".

**4. Das Modell ist keine Suchmaschine.**
Google ist für Fakten-Retrieval. ChatGPT und Claude sind für Synthese, Transformation, Formulierung. Wenn du eine KI wie eine Suchmaschine nutzt, verschwendest du 80% des Potenzials.

**5. Iterieren ist kein Zeichen von Schwäche.**
Der erste Prompt muss nicht perfekt sein. "Das ist gut, aber mach den Ton persönlicher" oder "kürz das auf die Hälfte und behalte nur die wichtigsten Punkte" — Follow-up-Prompts sind ein vollwertiger Teil des Workflows.

---

## Technik 1: Rollen-Prompting

Das ist die Technik die ich zuerst gelernt habe und die sofort den größten Unterschied gemacht hat.

Die Idee: Du gibst dem Modell eine Rolle — und es antwortet aus dieser Perspektive. Das Modell hat im Training massiv viel Text von Experten in allen möglichen Bereichen gesehen. Mit Rollen-Prompting rufst du gezielt dieses Wissen ab.

**Vorher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Erkläre mir, wie ich meinen Blog-Artikel für SEO optimiere."</p>
</div>

Das bekommst du: Eine generische Liste mit "Benutze Keywords", "Schreibe Meta-Descriptions", "Mach interne Links". Alles richtig. Alles nutzlos spezifisch.

**Nachher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Du bist ein erfahrener SEO-Spezialist der sich auf Content-Creator-Blogs im Tech-Bereich spezialisiert hat. Ich schreibe einen Artikel über Prompt Engineering für Nicht-Entwickler, Zielgruppe sind Content Creator zwischen 25-45. Erkläre mir die drei wichtigsten On-Page-SEO-Maßnahmen die ich vor dem Publish noch erledigen sollte. Geh davon aus, dass ich Grundkenntnisse in SEO habe, aber kein Experte bin."</p>
</div>

Das bekommst du: Konkrete, kontextbezogene Empfehlungen die tatsächlich zu meiner Situation passen.

Das Muster: **"Du bist [Rolle mit relevanter Spezialisierung]. [Kontext über dein Projekt/deine Situation]. [Konkrete Aufgabe mit Constraints]."**

Wichtig: Die Rolle muss zur Aufgabe passen. "Du bist ein Marketing-Guru" bringt wenig. "Du bist ein Texter der sich auf E-Mail-Marketing für SaaS-Produkte spezialisiert hat und vor allem Onboarding-Sequenzen schreibt" — das ist eine Rolle mit echtem Signal.

Ein Hinweis aus meiner Erfahrung: Rollen-Prompting funktioniert am besten bei Inhalten und Analysen. Bei reinen Fakten-Fragen bringt es weniger.

---

## Technik 2: Chain of Thought

Diese Technik klingt technischer als sie ist. Der Name "Chain of Thought" kommt aus der KI-Forschung — im Kern geht es aber um etwas ganz Simples.

Du bittest das Modell, **seinen Denkprozess explizit zu machen**, bevor es die Antwort liefert.

Warum das hilft: KI-Modelle machen mehr Fehler wenn sie direkt zur Antwort springen, als wenn sie Zwischenschritte zeigen. Es ist ähnlich wie bei Menschen — wer laut denkt macht seltener Flüchtigkeitsfehler.

**Vorher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Welche drei Content-Formate sollte ich für meinen Tech-Blog priorisieren?"</p>
</div>

Ergebnis: Drei Formate mit Begründung. Aber du weißt nicht, ob die Logik stimmt — du siehst nur die Schlussfolgerung.

**Nachher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Ich betreibe einen Tech-Blog über KI und Smart Home, hauptsächlich für Hobby-Tüftler und Content Creator. Ich habe momentan 4-5 Stunden pro Woche für Content. Überlege Schritt für Schritt: Welche drei Content-Formate sollte ich priorisieren? Zeig mir deine Überlegung — welche Faktoren du berücksichtigst, welche Abwägungen du machst — bevor du zur Empfehlung kommst."</p>
</div>

Das Ergebnis ist länger, aber du kannst die Logik nachvollziehen. Und du kannst eingreifen: "Der erste Faktor stimmt, aber beim zweiten liegst du falsch weil..."

Der einfachste Trigger für Chain of Thought: **"Denke Schritt für Schritt"** oder **"Erkläre deinen Gedankengang bevor du antwortest"** ans Ende eines Prompts hängen.

Ehrlich gesagt: Diese Technik macht bei einfachen Aufgaben wenig Unterschied. Bei komplexen Analysen, Entscheidungen mit mehreren Faktoren oder logischen Problemen — da ist sie Gold wert. Bei "Schreib mir eine Caption" brauchst du sie nicht.

---

## Technik 3: Few-Shot Examples

Few-Shot bedeutet: Du gibst der KI Beispiele von dem, was du willst — bevor du die eigentliche Aufgabe stellst.

Das Modell erkennt Muster aus diesen Beispielen und wendet sie auf deine Aufgabe an. Es ist im Grunde der direkteste Weg, einen bestimmten Stil, eine bestimmte Struktur oder ein bestimmtes Format zu übermitteln.

**Vorher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Schreib mir fünf Twitter-Posts über KI-Tools. Locker und direkt."</p>
</div>

Was du bekommst: Fünf Posts. Die sind "locker" aus der Perspektive des Modells — was unter Umständen ganz anders ist als was du unter "locker" verstehst.

**Nachher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Schreib mir fünf Twitter-Posts über KI-Tools in genau diesem Stil:</p>
	<p>Beispiel 1: 'Hab heute 2h mit dem neuen Midjourney-Update gespielt. Fazit: Portrait-Mode ist jetzt wirklich gut. Haare und Hände — endlich. Das war bisher mein größtes Frustrations-Thema.'</p>
	<p>Beispiel 2: 'n8n + Claude API = mein neuer Lieblings-Stack. Hab gestern einen Workflow gebaut der automatisch meine Artikel-Ideen in strukturierte Briefs verwandelt. 4h Arbeit. Spart mir jetzt 3h/Woche.'</p>
	<p>Meine Regel: Immer konkret, immer mit persönlicher Erfahrung, niemals generische Tipps-und-Tricks-Energie."</p>
</div>

Jetzt weiß das Modell genau was "mein Stil" ist — nicht weil ich es beschrieben habe, sondern weil ich es gezeigt habe.

Few-Shot ist besonders nützlich wenn du einen etablierten Schreibstil reproduzieren willst, spezifische Formatierung brauchst die schwer zu beschreiben ist, oder konsistente Ausgaben über viele Prompts hinweg brauchst.

---

## Technik 4: Output-Format vorgeben

Diese Technik ist die unspektakulärste von allen — und gleichzeitig die die ich täglich am meisten nutze.

Die meisten Leute sagen was sie wollen, aber nicht wie das Ergebnis aussehen soll. Dann bekommen sie einen Fließtext statt einer Tabelle, fünf Absätze statt einer Liste, oder einen Roman statt drei Bullets.

Du kannst das vollständig kontrollieren. Und das spart massiv Nachbearbeitung.

**Vorher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Vergleich ChatGPT und Claude für Content Creator."</p>
</div>

Ergebnis: Irgendein Mix aus Text, vielleicht eine Liste, vielleicht nicht. Unvorhersehbar.

**Nachher:**

<div class="rf-block rf-callout">
	<span class="rf-label">Notiz</span>
	<p>"Vergleich ChatGPT und Claude für Content Creator. Erstelle eine Tabelle mit diesen Spalten: Feature | ChatGPT | Claude | Gewinner. Zeilen: Texte schreiben, Recherche zusammenfassen, Social Media Posts, Bildgenerierung (falls vorhanden), Preis/Leistung, Kontext-Fenster. Unter der Tabelle: drei Sätze Fazit mit konkreter Empfehlung wann ich welches Tool nehmen sollte."</p>
</div>

Ich bekomme genau das was ich brauche. Keine Nacharbeit. Direkt verwendbar.

Mögliche Output-Format-Anweisungen die ich regelmäßig nutze:

- "Als nummerierte Liste mit max. 8 Punkten"
- "Als Tabelle mit Spalten X, Y, Z"
- "In drei Absätzen: Problem, Lösung, nächster Schritt"
- "Als JSON mit den Keys: title, summary, tags, cta"
- "Bullet Points, max. 15 Wörter pro Bullet"
- "Markdown-Format mit H2-Überschriften für jeden Abschnitt"

---

## Mein Template-System

Einzelne Techniken zu kennen ist gut. Ein System zu haben ist besser.

Ich nutze eine einfache Vorlage die alle vier Techniken kombiniert. Sie sieht so aus:

```
[ROLLE] Du bist [spezifische Rolle mit Kontext].

[AUFGABE] [Konkrete Aufgabe].

[KONTEXT]
- Zielgruppe: [wer liest/nutzt das Ergebnis]
- Zweck: [wozu wird es genutzt]
- Constraints: [Länge, Ton, was vermeiden]

[BEISPIEL] [Optional: ein Beispiel-Output wenn Stil wichtig ist]

[FORMAT] Antworte als [Format-Vorgabe].

[DENKPROZESS] [Optional: "Denke Schritt für Schritt" wenn Analyse nötig]
```

Klingt formal? Ist es nicht — wenn man es einmal verinnerlicht hat fließt das in 60 Sekunden. Und die Zeitersparnis durch bessere Erster-Ergebnisse macht das mehr als wett.

---

## 10 Beispiel-Prompts für verschiedene Use Cases

Das Beste für den Schluss: Konkrete Prompts die du direkt verwenden oder anpassen kannst. Alle basieren auf meinem Template-System.

**1. Blog-Artikel-Outline**

```
Du bist ein erfahrener Content Strategist der sich auf Tech-Blogs für Nicht-Entwickler spezialisiert hat.

Erstelle eine detaillierte Outline für einen Artikel mit dem Titel: "[TITEL]".

Kontext:
- Zielgruppe: Tech-interessierte Hobbyisten, keine Entwickler
- Länge: 2500-3000 Wörter
- Ton: locker, direkt, persönlich (ich-Perspektive)
- Primäres Keyword: "[KEYWORD]" muss in H1, erster Absatz und min. 3 H2s vorkommen

Format: Markdown mit H2 für Hauptabschnitte, darunter Bullet Points mit Kernaussagen pro Abschnitt. Schätz die Wortanzahl pro Abschnitt.
```

**2. Social Media Caption (Instagram/Threads)**

```
Du bist ein Social Media Manager der für Indie-Maker und Tech-Content-Creator arbeitet.

Schreib drei Instagram-Captions für dieses Bild: [BILDBESCHREIBUNG]

Kontext:
- Account-Thema: [DEIN NISCHENTHEMA]
- Zielgruppe: [ZIELGRUPPE]
- Ton: authentisch, kein Marketing-Speak

Beispiel-Style: [EIN BEISPIEL DEINER BESTEN CAPTION]

Format: Drei Varianten — eine kurz (unter 50 Zeichen), eine mittel (2-3 Sätze), eine mit Frage am Ende. Je ein passender Hashtag-Block darunter.
```

**3. E-Mail-Newsletter**

```
Du bist ein Newsletter-Autor der wöchentliche Tech-Briefings für Hobbyisten schreibt.

Schreib die Einleitung für meinen Newsletter diese Woche. Thema: [THEMA/HAUPTNEWS]

Kontext:
- Subscriber: ~[ZAHL] Leser, tech-affin aber keine Profis
- Stil: persönlich, wie ein Freund der seinen Lieblings-Fund der Woche teilt
- Max. 150 Wörter

Format: Drei Absätze. Erster Absatz: Hook/persönlicher Aufhänger. Zweiter: was diese Woche passiert ist. Dritter: was sie in dieser Ausgabe erwartet + CTA.
```

**4. Produkt-Beschreibung**

```
Du bist ein Conversion-Copywriter der auf digitale Produkte spezialisiert ist.

Schreib eine Produktbeschreibung für: [PRODUKT]

Kontext:
- Preis: [PREIS]
- Hauptvorteil: [KERNNUTZEN]
- Zielgruppe: [BESCHREIBUNG]
- Hauptproblem das gelöst wird: [PROBLEM]

Denke Schritt für Schritt: Was ist der stärkste emotionale Aufhänger? Was ist der stärkste rationale Aufhänger? Welcher Einwand muss proaktiv entkräftet werden?

Format: Hook-Satz (max. 15 Wörter), dann 3 Bullet Points mit Benefit (nicht Feature), dann ein CTA-Satz.
```

**5. Code erklären / debuggen**

```
Du bist ein geduldiger Entwickler-Mentor der an Nicht-Entwickler erklärt ohne sie zu überfordern.

[CODE HIER EINFÜGEN]

Erkläre was dieser Code macht. Ich bin kein Entwickler aber ich verstehe grundlegende Konzepte.

Format: Erst eine Zusammenfassung in einem Satz was der Code insgesamt macht. Dann Zeile für Zeile oder Block für Block mit kurzen, einfachen Erklärungen. Nutze Alltagsmetaphern wo möglich.
```

**6. Recherche-Zusammenfassung**

```
Du bist ein Research-Analyst der komplexe Themen für Entscheider zusammenfasst.

Fasse diesen Text zusammen: [TEXT/URL/INHALT]

Kontext:
- Ich muss entscheiden ob: [ENTSCHEIDUNG DIE DU TREFFEN MUSST]
- Max. 5 Minuten Lesezeit

Denke Schritt für Schritt was für meine Entscheidung relevant ist und was nicht.

Format: Executive Summary (3 Bullets), dann Abschnitt "Relevant für meine Entscheidung" (max. 5 Punkte), dann "Was offen bleibt" (offene Fragen die du noch klären müsstest).
```

**7. Feedback auf einen Text**

```
Du bist ein erfahrener Lektor der auf [TEXTTYP] spezialisiert ist.

Gib mir Feedback auf diesen Text: [TEXT]

Kontext:
- Zweck des Textes: [ZWECK]
- Zielgruppe: [ZIELGRUPPE]
- Mein Hauptanliegen: [WO DU DIR UNSICHER BIST]

Bitte nicht alles kommentieren — fokussiere auf die drei wichtigsten Verbesserungen die den größten Impact haben. Zeig mir für jede Kritik ein konkretes Verbesserungsbeispiel.

Format: Drei nummerierte Punkte. Je: Problem, Warum es ein Problem ist, Verbesserter Satz/Abschnitt.
```

**8. Titel/Headline-Varianten**

```
Du bist ein Headline-Texter der für Tech-Blogs und YouTube-Kanäle arbeitet.

Schreib 10 Titel-Varianten für diesen Inhalt: [KURZE INHALTSBESCHREIBUNG]

Kontext:
- Primäres Keyword: [KEYWORD]
- Zielgruppe: [ZIELGRUPPE]
- Plattform: [BLOG/YOUTUBE/NEWSLETTER]
- Ton: [LOCKER/PROFESSIONELL/PROVOKATIV]

Format: 10 nummerierte Titel. Danach: deine Top 3 mit kurzer Begründung warum.
```

**9. Ideen-Brainstorming**

```
Du bist ein kreativer Stratege der für Content Creator arbeitet.

Ich brauche 15 Content-Ideen für [THEMA/NISCHE].

Kontext:
- Meine Plattform: [BLOG/YOUTUBE/INSTAGRAM]
- Meine Stärken: [WAS DU GUT KANNST/WEISST]
- Was ich nicht will: [THEMEN DIE ZU GENERISCH SIND ODER NICHT ZU DIR PASSEN]

Denke Schritt für Schritt: Welche Untergruppen von [THEMA] gibt es? Welche Perspektiven sind noch nicht überfüllt?

Format: 15 nummerierte Ideen mit je: Titel-Vorschlag (5-8 Wörter), ein Satz was den Artikel besonders macht.
```

**10. Automatisierungs-Workflow planen**

```
Du bist ein Automatisierungs-Experte der n8n und ähnliche Tools für kleine Creator-Businesses einsetzt.

Ich will folgendes automatisieren: [AUFGABE DIE DU LOSWERDEN WILLST]

Kontext:
- Tools die ich nutze: [DEIN STACK]
- Tech-Level: [ANFÄNGER/FORTGESCHRITTEN]
- Budget: [KEINE KOSTEN/BIS X EUR/MONAT]

Denke Schritt für Schritt: Was sind die Teilschritte dieser Aufgabe? Welche davon lassen sich automatisieren? Was braucht trotzdem menschliche Entscheidung?

Format: Erst eine kurze Bewertung ob das sinnvoll automatisierbar ist (und warum). Dann einen Schritt-für-Schritt-Plan mit konkreten Tool-Empfehlungen je Schritt.
```

---

## Was als nächstes

Diese zehn Prompts sind ein Startpunkt. Das eigentliche Prompt Engineering lernen passiert aber durch Iteration — du nimmst einen Prompt, schaust was rauskommt, verbesserst und merkst dir was besser funktioniert hat.

Mein Tipp: Leg dir ein einfaches Dokument an wo du deine besten Prompts sammelst. Nichts Elaboriertes. Einfach eine Datei mit Copy-Paste-bereiten Vorlagen. Nach einem Monat hast du damit mehr gelernt als durch jeden Kurs.

Wenn du tiefer reinwillst: In meinem Artikel zu [ChatGPT Prompts erstellen](/blog/chatgpt-prompts-erstellen-2026) gehe ich auf fortgeschrittenere Strukturen ein — inklusive System-Prompts und wie du ein konsistentes Verhalten über mehrere Chats hinweg aufbaust. Und wenn du verstehen willst wie sich ChatGPT und Claude in der Praxis unterscheiden, empfehle ich meinen [direkten Vergleich der beiden Tools](/blog/chatgpt-vs-claude-content-creator-2026).

Und wenn du die Erkenntnisse aus diesem Artikel direkt in die Praxis umsetzen willst: Mein Workflow für [KI-Bildbearbeitung als Fotograf](/blog/ki-bildbearbeitung-workflow-fotograf-2026) zeigt wie diese Techniken in einem echten Produktions-Workflow aussehen. Und wer über das Prompten hinaus gehen will — für [KI-generierte Bilder](/blog/ki-bilder-erstellen-guide-2026) gelten dieselben Prinzipien: Je präziser der Prompt, desto besser das Ergebnis. Das gilt für Midjourney genauso wie für ChatGPT — in meinem [Guide zu Midjourney Prompts für Fotografen](/blog/midjourney-prompts-fotografen-2026) zeige ich wie das in der Praxis aussieht.

Prompt Engineering lernen ist kein Sprint — es ist eine Gewohnheit. Fang heute damit an.

— TRMT
