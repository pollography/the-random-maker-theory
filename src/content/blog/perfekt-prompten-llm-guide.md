---
title: "Prompt Engineering: So holst du alles aus ChatGPT, Claude und Gemini"
slug: "perfekt-prompten-llm-guide"
date: "2026-03-10"
description: "Lerne mit Frameworks wie COSTAR und RISEN, wie du LLMs richtig promptest. Praxistipps, Techniken und konkrete Beispiele für bessere KI-Ergebnisse."
tags: ["ki-tools", "tutorial", "anfaenger", "tools", "produktivitaet"]
category: "ki-tools"
draft: false
readingTime: 12
heroImage: "/images/blog/perfekt-prompten-llm-guide-1.webp"
heroImageThumb: "/images/blog/perfekt-prompten-llm-guide-1-thumb.webp"
titleAccent: "Prompt"
podcastSlug: "002-perfekt-prompten-llm-guide"
podcastUrl: "https://open.spotify.com/show/2gzpv9JphhoWBmjXXP2Pjd"
---

Stell dir vor, du springst in ein Taxi und sagst: „Fahr mich mal irgendwohin Schönes." Der Fahrer guckt dich an wie'n Auto. Fährt dich zum nächsten Stadtpark, der nach Frittenfett riecht. Genau das passiert, wenn du ChatGPT, Claude oder Gemini mit vagen Prompts fütterst. Du landest irgendwo — aber halt nicht da, wo du hinwolltest.

Gibst du dem Fahrer die exakte Adresse, die Route und den Fahrstil vor? Perfekte Ankunft. Das ist Prompt Engineering in einer Nussschale.

Ich hab in den letzten Monaten echt viel mit verschiedenen LLMs rumexperimentiert. Und mein größtes Learning: Die KI ist selten das Problem. Dein Prompt ist es.

## Warum Prompting quasi das neue Coding ist

LLMs sind keine Wunderkisten. Punkt. Die berechnen Wahrscheinlichkeiten fürs nächste Wort. Klingt unsexy, ist aber wichtig zu verstehen. Wenn du die nicht führst, raten die halt ins Blaue.

Kennst du den Schmetterlingseffekt? Aus der Chaostheorie — winzige Änderungen am Anfang, völlig andere Ergebnisse am Ende. Beim Prompting ist das genauso. Ein fehlendes Adjektiv, eine unpräzise Formulierung, und du kriegst statt einer genialen Analyse nur generisches Gelaber.

Ich seh das ständig in Foren: Leute beschweren sich, die KI sei „dumm". Ganz ehrlich? Meistens sind die Prompts schuld.

Warum du Prompting als echten Skill ernst nehmen solltest:

- **Consistency:** Feste Frameworks liefern jedes Mal ähnlich starke Ergebnisse. Kein Glücksspiel mehr.
- **Performance:** Gute Prompts holen die maximale Power raus. Weniger verschwendete Tokens, besserer Output.
- **Safety:** Du gibst der KI Leitplanken. Wichtig, wenn du sie auf Kunden loslässt.

Basically: Wer heute nicht lernt, richtig zu prompten, steht in fünf Jahren so da wie jemand, der nicht googeln kann.

## Die drei Grundregeln: Klarheit, Kontext, Rolle

Drei Dinge müssen in fast jeden Prompt. Ich nenn das die heilige Dreifaltigkeit.

### Klarheit

Sei spezifisch. „Schreib was Kurzes" ist Müll. „Schreibe eine Zusammenfassung in genau drei Stichpunkten, maximal 15 Wörter pro Punkt" — das versteht die KI.

### Kontext

Gib Hintergründe. Wer bist du? Was ist das Ziel? Gibt's eine Vorgeschichte? Ohne Kontext weiß die KI nicht, ob sie für einen Professor oder einen Fünftklässler schreibt.

### Rolle

Mein Lieblingstrick. Sag der KI, wer sie sein soll.

„Du bist ein skeptischer Finanzanalyst" liefert was komplett anderes als „Du bist ein begeisterter Startup-Coach". Rollen-Prompting ist quasi ein Filter, der bestimmte Wissensbereiche aktiviert.

Hier der direkte Vergleich:

| Vager Prompt | Präziser Prompt |
| :--- | :--- |
| „Fass den Bericht zusammen." | „Du bist Senior-Unternehmensberater. Analysiere den Quartalsbericht für den Vorstand. Fokus: Business-Impact. Format: Markdown-Tabelle mit Risiko und Chance." |
| „Hilf mir beim Code-Fehler." | „Du bist Senior-Python-Entwickler mit Security-Fokus. Analysiere diesen Code auf SQL-Injection. Erkläre den Fehler, dann gib den fixierten Code." |

Der Unterschied? Nacht und Tag. Probier's mal aus.

## Anfänger-Techniken: Zero-Shot, Few-Shot, Role-Prompting

Okay, lass uns über die Basics reden. Drei Level, die du kennen musst.

### Zero-Shot

Du klatschst der KI einen Befehl hin. Keine Beispiele, kein Kontext.

```
Übersetze ins Englische: "Ich hätte gerne einen Kaffee."
```

Funktioniert für simple Sachen. Für alles andere? Zu wenig.

### Few-Shot

Das hier ändert alles. Du gibst 2-3 Beispiele mit. Die KI erkennt das Muster und wendet es an.

```
Klassifiziere die Stimmung:
Input: "Das Essen war super!" -> Positiv
Input: "Der Service war lahm." -> Negativ
Input: "War okay, nichts Besonderes." -> Neutral
Input: "Schlechtestes Produkt ever!" ->
```

Die KI kapiert sofort: kurze Antwort, ein Wort. Fertig. Laut Studien kann [Few-Shot Chain-of-Thought die Genauigkeit um bis zu 28% verbessern](https://www.promptingguide.ai/techniques/cot). Krass für so wenig Aufwand.

### Role-Prompting

Hab ich schon erwähnt, aber nochmal: Rollen sind mächtig. „Du bist ein Steuerberater" aktiviert komplett andere Muster als „Du bist ein Hippie-Poet". Ich nutz das bei quasi jedem Prompt.

## Fortgeschritten: Chain-of-Thought und Tree-of-Thought

Jetzt wird's spannend. Manchmal rast die KI zu schnell zur Antwort und überspringt Zwischenschritte. Wie ein Matheschüler, der das Ergebnis hinschreibt, aber den Rechenweg nicht kennt.

### Chain-of-Thought (CoT)

Simpelster Fix: Sag der KI „Lass uns Schritt für Schritt denken." Das zwingt sie, ihre Logik auszuschreiben. Die bemerkt dabei eigene Fehler. Quasi ein Selbstkorrektur-Mechanismus.

Konkretes Beispiel — ohne CoT:
```
Was ist günstiger: 3 Packungen à 500g für 4,99€ oder 2 Packungen à 800g für 6,49€?
```
Die KI spuckt oft einfach eine Antwort aus. Manchmal richtig, manchmal nicht.

Mit CoT:
```
Was ist günstiger: 3 Packungen à 500g für 4,99€ oder 2 Packungen à 800g für 6,49€?
Denke Schritt für Schritt. Berechne erst den Kilopreis für beide Optionen.
```
Jetzt rechnet die KI sauber: Option A = 1500g für 14,97€ = 9,98€/kg. Option B = 1600g für 12,98€ = 8,11€/kg. Klare Antwort, nachvollziehbarer Rechenweg. Dieser kleine Zusatz macht den Unterschied zwischen Raten und Rechnen.

### Tree-of-Thought (ToT)

Die absolute Endstufe. Statt einer Gedankenkette baut die KI einen Baum. Mehrere Lösungswege parallel, bewertet sie, wirft schlechte Zweige ab.

Stell dir das so vor wie beim Schach. Du überlegst nicht nur einen Zug voraus, sondern spielst mehrere Varianten im Kopf durch und wählst die beste.

Der ToT-Workflow:
1. **Generate** — Mehrere Lösungsansätze erstellen
2. **Evaluate** — Jeden Ansatz bewerten (Sackgasse oder vielversprechend?)
3. **Expand** — Nur die guten Zweige weiterverfolgen
4. **Search** — Breadth-First oder Depth-First durch den Baum

Und jetzt die Zahlen, die mich überzeugt haben. Forscher haben das beim „Game of 24" getestet:

- Standard Zero-Shot: **7,3%** Erfolgsquote
- Tree-of-Thought (1 Zweig): **45%**
- Tree-of-Thought (5 Zweige): **74%**

Von 7 auf 74 Prozent. Nur durch Struktur. [Das ist kein Hype, das sind Benchmark-Ergebnisse.](https://www.promptingguide.ai/techniques/tot)

Zusätzlich gibt's **Self-Consistency**: Die KI löst das Problem mehrmals unabhängig und die häufigste Antwort gewinnt. Quasi Demokratie für KIs.

## Framework-Showdown: COSTAR, RISEN, RTF und RACE

Keine Lust, jedes Mal das Rad neu zu erfinden? Nimm ein Framework. Sind wie Kochrezepte für Prompts.

![Frameworks-Vergleich: COSTAR, RISEN, RTF, RACE im Überblick](/images/blog/perfekt-prompten-llm-guide-2.webp)

### COSTAR — Mein Favorit für Business-Kram

Entwickelt von Sheila Teo. Sechs Komponenten:

- **C**ontext: Hintergrundinfos
- **O**bjective: Das genaue Ziel
- **S**tyle: Schreibstil (z.B. Business-Analyst)
- **T**one: Emotionale Lage (sachlich, optimistisch...)
- **A**udience: Wer liest das?
- **R**esponse: Format (Tabelle, JSON, Fließtext...)

Konkretes Beispiel:
```
Context: Ich launche nächste Woche ein SaaS-Produkt für Freelancer.
Objective: Erstelle 5 LinkedIn-Posts für die Launch-Woche.
Style: Thought Leadership, keine Buzzwords.
Tone: Selbstbewusst aber zugänglich.
Audience: Freelancer und Solo-Selbstständige, 25-40 Jahre.
Response: Nummerierte Liste, jeder Post max 200 Wörter, mit Emoji-Vorschlag.
```

Mein Urteil: Stark. Nutze ich für alles, wo's professionell sein muss.

### RISEN — Der Allrounder

- **R**ole: Die Persona
- **I**nstructions: Was genau tun?
- **S**teps: Arbeitsschritte vorgeben
- **E**nd Goal: Erwartetes Ergebnis
- **N**arrowing: Fokus einschränken ODER Novelty — kreative Freiheit geben

Das N ist das Besondere. Du entscheidest: Einschränken oder Loslassen. [Für Recherche und Content-Erstellung echt geil.](https://juuzt.ai/knowledge-base/prompt-frameworks/the-risen-framework/)

Konkretes RISEN-Beispiel:
```
Role: Du bist ein erfahrener Tech-Journalist.
Instructions: Schreibe einen Vergleichsartikel über drei KI-Coding-Tools.
Steps: 1) Recherchiere Features, 2) Vergleiche Preise, 3) Teste an einem Beispiel-Projekt, 4) Schreibe Fazit.
End Goal: Leser können nach dem Artikel eine fundierte Kaufentscheidung treffen.
Narrowing: Nur Tools die 2025/2026 aktiv weiterentwickelt werden. Keine Tools mit weniger als 10.000 Nutzern.
```

Merkst du den Unterschied? RISEN gibt der KI quasi eine Schritt-für-Schritt-Anleitung. Bei COSTAR beschreibst du eher das gewünschte Ergebnis, bei RISEN den Weg dahin. Beides hat seinen Platz.

### RTF — Der Quickie

- **R**ole: Wer bist du?
- **T**ask: Was machst du?
- **F**ormat: Wie sieht's aus?

Drei Buchstaben, fertig. Perfekt, wenn ich schnell eine Mail checken oder eine Liste sortieren will. Mein Go-To für den Alltag.

### RACE — Der Klassiker

- **R**ole, **A**ction, **C**ontext, **E**xpectation

Solide. Aber COSTAR ist eigentlich die bessere Version davon. RACE ist okay wenn's schnell gehen muss, aber mir manchmal zu oberflächlich.

## Profi-Tipps für den Alltag

Hier kommen die Hands-on-Tricks, die echt den Unterschied machen.

### Iteratives Prompting

Der erste Prompt ist quasi nie perfekt. Und das ist okay. Prompting ist ein Gespräch, kein Einzelschuss. Guck dir das Ergebnis an, korrigier nach, verfeinere. Ich nenn das „Feintuning im Dialog".

So sieht das in der Praxis aus: Du fragst ChatGPT nach einer Produktbeschreibung. Der erste Draft ist zu lang und zu formell. Statt komplett neu zu prompten, sagst du einfach: „Kürze das auf die Hälfte und schreib lockerer, als würdest du einem Freund davon erzählen." Zweite Runde: „Die ersten zwei Sätze sind stark, aber der Rest wiederholt sich. Streiche Absatz 3 und 4." Dritte Runde: Fertig. Drei Iterationen statt eines perfekten Mega-Prompts. Geht meistens schneller.

### Negative Prompts

Wird mega oft vergessen. Sag der KI explizit, was sie NICHT tun soll.

```
Schreibe den Text ohne Corporate-Floskeln.
Vermeide "In der heutigen Zeit" und ähnliche Phrasen.
Kein langes Intro — komm direkt zum Punkt.
Keine Aufzählung mit mehr als 5 Punkten.
```

Spart dir echt viel Editier-Zeit.

### Output-Format erzwingen

Wenn du die Daten weiterverarbeiten willst, sei hart:

```
Antworte ausschließlich im JSON-Format.
Keine Erklärungen, keine Einleitungssätze.
Nur valides JSON.
```

Das ist der Schlüssel für Automatisierung. Kein Gelaber, nur Daten.

### Modell-spezifische Eigenheiten

Nicht jedes Modell tickt gleich. Ein Prompt der bei Claude perfekt funktioniert, liefert bei ChatGPT manchmal was anderes. Meine Erfahrung nach vielen Tests:

- **Claude** ist stark bei langen Dokumenten und tiefgründiger Analyse. Mag strukturierte Prompts mit klaren Abschnitten.
- **ChatGPT (GPT-4o)** dominiert bei strikten Output-Formaten wie JSON oder Tabellen. Sehr gut bei Code.
- **Gemini** hat das größte Kontextfenster (1 Million Tokens). Ideal wenn du riesige Dokumente auf einmal verarbeiten willst.

Mein Tipp: Probier deinen wichtigen Prompt bei mindestens zwei Modellen aus. Manchmal überrascht dich das Ergebnis.

### Mega-Prompts mit Trennern

Bei komplexen Aufgaben (1000+ Wörter im Prompt) nutze Delimiter:

```
### ROLLE
Du bist ein erfahrener SEO-Spezialist.

### KONTEXT
Website: Tech-Blog für Anfänger. Zielgruppe: 20-35 Jahre.

### AUFGABE
Analysiere die folgenden 5 Artikel-Titel auf SEO-Potenzial.

### FORMAT
Markdown-Tabelle mit Spalten: Titel | Score (1-10) | Verbesserungsvorschlag
```

Die Raute-Trenner helfen der KI, die Bereiche sauber zu unterscheiden. Funktioniert mega bei allen Modellen.

![Erfolgsraten verschiedener Prompting-Techniken im Vergleich](/images/blog/perfekt-prompten-llm-guide-3.webp)

## Bonus: Agentic Workflows — wo die Reise hingeht

Kurzer Ausblick, weil's grad echt spannend wird. Wir bewegen uns weg vom „ich schreibe einen Text"-Prompting hin zu Agenten-Systemen. Du schreibst keinen einzelnen Prompt mehr — du baust ein System aus KI-Agenten, die selbstständig planen.

Vier Muster, die du kennen solltest:

1. **Sequential** — Ein Agent nach dem anderen. Fließband.
2. **Parallel** — Mehrere Agenten gleichzeitig. Einer analysiert Stimmung, einer extrahiert Fakten.
3. **Loop** — Wiederholen bis das Ergebnis stimmt.
4. **Swarm** — Spezialisierte Agenten diskutieren miteinander. Wild, aber teuer bei den API-Kosten.

Laut [Gartner werden bis 2028 rund 33% aller Enterprise-Apps über Agentic AI verfügen](https://www.ibm.com/think/prompt-engineering). Das ist keine ferne Zukunft, das ist übermorgen.

Und dann gibt's noch DSPy. Statt Prompts manuell zu schreiben, definierst du Signaturen in Code und lässt das System die Prompts automatisch optimieren. Quasi ein Compiler für Prompts. Kostet viele Tokens, aber für Business-Anwendungen, wo Präzision zählt, ist das [die Zukunft des Prompt Engineering](https://www.statsig.com/perspectives/dspy-vs-prompt-engineering).

## Fazit: Meine ehrliche Meinung

Ist Prompt Engineering bald überflüssig, weil die KIs immer schlauer werden? Nee. Wird eine Kernkompetenz bleiben. Die Modelle verstehen uns zwar besser, aber du musst trotzdem in der Lage sein, deine Absicht präzise zu kommunizieren.

Mein Rat: Fang mit RTF an für den Alltag. Steig auf COSTAR um wenn's professionell wird. Und wenn du komplexe Probleme lösen willst, probier Chain-of-Thought und Tree-of-Thought aus. Die Zahlen sprechen für sich — von 7% auf 74% Erfolgsquote, nur durch Struktur.

Prompting ist die Brücke zwischen deiner Absicht und dem KI-Output. Ohne Brücke bleibt die KI ein nettes Spielzeug. Mit ihr wird sie zum echten Produktivitäts-Partner.

Probier's aus. Fang heute an. Und wenn der erste Prompt nicht sitzt: Iterieren. Das ist der ganze Trick.

— TRMT

## Quellen & Links

- [Prompt Engineering Guide](https://www.promptingguide.ai/) — Umfassende Referenz für alle Prompting-Techniken
- [Tree of Thoughts (ToT) Framework](https://www.promptingguide.ai/techniques/tot) — Benchmark-Ergebnisse und Erklärung
- [Chain-of-Thought Prompting Guide](https://www.promptingguide.ai/techniques/cot) — CoT-Techniken im Detail
- [RISEN Framework](https://juuzt.ai/knowledge-base/prompt-frameworks/the-risen-framework/) — Advanced Prompt Engineering
- [COSTAR Framework erklärt](https://portkey.ai/blog/what-is-costar-prompt-engineering/) — Business-Prompting mit System
- [Prompt Frameworks 2025](https://www.encodedots.com/blog/prompt-frameworks-2025) — Übersicht aller aktuellen Frameworks
- [IBM Guide to Prompt Engineering 2026](https://www.ibm.com/think/prompt-engineering) — Enterprise-Perspektive
- [DSPy vs Prompt Engineering](https://www.statsig.com/perspectives/dspy-vs-prompt-engineering) — Programmatisches Prompting
- [Lakera Prompt Engineering Guide](https://www.lakera.ai/blog/prompt-engineering-guide) — Security-Perspektive auf Prompting
