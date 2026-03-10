---
title: "Prompt Engineering: So holst du alles aus ChatGPT, Claude und Gemini"
slug: "perfekt-prompten-llm-guide"
episodeNumber: 2
date: "2026-03-10"
description: "Frameworks wie COSTAR und RISEN, Techniken wie Chain-of-Thought und Tree-of-Thought, und praktische Tipps fürs perfekte Prompten bei LLMs."
audioUrl: ""
duration: "12 min"
draft: false
blogSlug: "perfekt-prompten-llm-guide"
transcript:
  - "In dieser Episode geht es um Prompt Engineering. Also die Kunst, KI-Modellen wie ChatGPT, Claude und Gemini die richtigen Anweisungen zu geben. Und ja, das ist tatsaechlich eine Kunst. Weil die meisten Leute einfach irgendeinen vagen Satz reinhauen und sich dann wundern, warum der Output Muell ist."
  - "Stell dir vor, du springst in ein Taxi und sagst: Fahr mich mal irgendwohin Schoenes. Der Fahrer guckt dich an, faehrt dich zum naechsten Stadtpark, der nach Frittenfett riecht. Genau das passiert, wenn du LLMs mit vagen Prompts fuetterst. Du landest irgendwo, aber halt nicht da, wo du hinwolltest."
  - "Die drei Grundregeln fuer jeden Prompt: Klarheit, Kontext und Rolle. Klarheit heisst: Sei spezifisch. Schreib was Kurzes ist Muell. Schreibe eine Zusammenfassung in genau drei Stichpunkten, maximal 15 Woerter pro Punkt, das versteht die KI. Kontext heisst: Gib Hintergruende. Wer bist du? Was ist das Ziel? Ohne Kontext weiss die KI nicht, ob sie fuer einen Professor oder einen Fuenftklaessler schreibt."
  - "Und dann Rolle. Mein Lieblingstrick. Sag der KI, wer sie sein soll. Du bist ein skeptischer Finanzanalyst liefert was komplett anderes als Du bist ein begeisterter Startup-Coach. Rollen-Prompting ist quasi ein Filter, der bestimmte Wissensbereiche aktiviert."
  - "Drei Techniken die du kennen musst: Zero-Shot, Few-Shot und Role-Prompting. Zero-Shot: Du klatschst der KI einen Befehl hin, keine Beispiele. Funktioniert fuer simple Sachen. Few-Shot aendert dann alles: Du gibst zwei bis drei Beispiele mit, die KI erkennt das Muster und wendet es an. Laut Studien kann Few-Shot Chain-of-Thought die Genauigkeit um bis zu 28 Prozent verbessern."
  - "Fuer Fortgeschrittene: Chain-of-Thought und Tree-of-Thought. Chain-of-Thought heisst: Du sagst der KI, sie soll Schritt fuer Schritt denken. Das zwingt sie, ihre Logik auszuschreiben. Sie bemerkt dabei eigene Fehler. Quasi ein Selbstkorrektur-Mechanismus. Tree-of-Thought geht noch weiter: Statt einer Gedankenkette baut die KI einen Baum. Mehrere Loesungswege parallel, bewertet sie, wirft schlechte Zweige ab."
  - "Die Benchmark-Ergebnisse sind krass: Standard Zero-Shot hat eine Erfolgsquote von nur 7,3 Prozent. Tree-of-Thought mit fuenf Zweigen kommt auf 74 Prozent. Von 7 auf 74 Prozent, nur durch Struktur. Das ist kein Hype, das sind echte Benchmark-Ergebnisse."
  - "Dann die Frameworks: COSTAR, RISEN, RTF und RACE. COSTAR ist mein Favorit fuer Business-Kram. Sechs Komponenten: Context, Objective, Style, Tone, Audience, Response. RISEN ist besser fuer technische Prompts: Role, Instructions, Steps, End Goal, Narrowing. RTF ist super fuer schnelle Marketing-Texte: Role, Task, Format. Und RACE fuer Recherche: Role, Action, Context, Expectation."
  - "Profi-Tipps aus der Praxis: Erstens, Negative Prompts nutzen. Sag der KI nicht nur was sie tun soll, sondern auch was sie NICHT tun soll. Keine Floskeln, keine Aufzaehlungen, kein Marketing-Sprech. Zweitens: Output-Formate erzwingen. Antworte nur in JSON, nur als Markdown-Tabelle, maximal 3 Saetze. Drittens: Iteratives Prompting. Nicht alles in einen Mega-Prompt packen, sondern als Gespraech fuehren."
  - "Temperature und Token-Limits sind auch wichtig. Temperature steuert die Kreativitaet. 0.0 bis 0.3 fuer faktische Antworten, 0.7 bis 1.0 fuer kreative Texte. Token-Limits bestimmen die Laenge. Weniger Tokens zwingen die KI zur Praezision."
  - "Das wichtigste Learning aus Monaten Prompt-Experimentieren: Die KI ist selten das Problem. Dein Prompt ist es. Wer heute nicht lernt, richtig zu prompten, steht in fuenf Jahren so da wie jemand, der nicht googeln kann. Den kompletten Artikel mit allen Code-Beispielen, Vergleichstabellen und Framework-Templates findest du im Blog."
---
