---
title: "Claude Opus 5.5 ist da: Mehr Coding-Leistung, weniger Kosten als Opus 5"
seoTitle: "Claude Opus 5.5: Preis, Leistung und Vergleich erklärt"
description: "Claude Opus 5.5 soll stärker, klarer und günstiger als Opus 5 arbeiten. Hier verstehst du Preis, Benchmarks und die richtige Modellwahl."
slug: "claude-opus-5-5-preis-vergleich"
date: "2026-09-23"
tags: ["claude", "opus-5-5", "fable-5-1", "gpt-6-astra", "ki-coding", "ki-modelle"]
category: "ki-tools"
draft: true
titleAccent: "weniger Kosten als Opus 5"
readingTime: 9
heroImage: "/images/blog/claude-opus-5-5-preis-vergleich-1.webp"
heroImageThumb: "/images/blog/claude-opus-5-5-preis-vergleich-1-thumb.webp"
---

**Anthropic hat Claude Opus 5.5 veröffentlicht. Das neue KI-Modell soll bei langen Coding- und Rechercheaufgaben fast auf Fable-Niveau arbeiten, kostet aber weniger als Opus 5; hier siehst du, was davon belegt ist und welches Modell für deine Aufgabe sinnvoll startet.**

<div class="rf-block rf-tldr" role="note" aria-label="Kurz gesagt">
  <span class="rf-label" aria-hidden="true">Kurz gesagt</span>
  <ul>
    <li><strong>Opus 5.5 ist ein neues Claude-Modell:</strong> Es ist für schwierige Aufgaben gedacht, bei denen die KI mehrere Schritte und Werkzeuge selbstständig abarbeitet.</li>
    <li><strong>Die API ist günstiger als bei Opus 5:</strong> Eine Million Eingabe-Tokens kosten 4 statt 5 US-Dollar, eine Million Ausgabe-Tokens 20 statt 25 US-Dollar.</li>
    <li><strong>Die 40 Prozent sind kein einfacher Listenrabatt:</strong> Anthropic schätzt typische Aufgaben insgesamt günstiger ein, weil Opus 5.5 zusätzlich weniger Tokens und Werkzeugschritte brauchen soll.</li>
    <li><strong>Fable 5.1 und GPT-6 Astra sind nicht automatisch geschlagen:</strong> Je nach Aufgabe, Aufwandseinstellung und Test liegt ein anderes Modell vorn.</li>
    <li><strong>Für den ersten Versuch reicht meist mittlerer Denkaufwand:</strong> Mehr Rechenzeit kostet mehr und brachte in einzelnen offiziellen Tests kaum zusätzlichen Nutzen.</li>
  </ul>
</div>

## Was ist Claude Opus 5.5?

[Claude Opus 5.5](https://www.anthropic.com/claude-opus-5-5) ist das erste Modell aus Anthropics neuer Claude-5.5-Familie. Es ist für anspruchsvolle Aufgaben gedacht, die nicht nach einer kurzen Antwort enden. Dazu gehören große Code-Änderungen, technische Fehlersuche, Recherche und längere Arbeitsabläufe mit mehreren Werkzeugen.

Ein solches System wird oft **KI-Agent** genannt. Damit ist keine eigene Maschine gemeint. Das Modell darf eine Aufgabe planen, Dateien lesen, Befehle ausführen, Ergebnisse prüfen und den nächsten Schritt daraus ableiten. In [Claude Code](/blog/claude-code-ultimate-setup-produktivitaet-2026) passiert das zum Beispiel direkt in einem Softwareprojekt.

Anthropic beschreibt Opus 5.5 als deutlichen Sprung gegenüber Opus 5. Auf den eigenen Tests liegt es bei vielen Coding- und Wissensaufgaben nahe an Claude Fable 5.1 oder davor. Gleichzeitig soll es klarer schreiben, wichtige Punkte früher nennen und vorgegebenen Schreibregeln besser folgen.

Das klingt stark. Trotzdem ist die richtige Frage nicht: „Welches Modell gewinnt insgesamt?“ Sinnvoller ist: „Welches Modell löst meine wiederkehrende Aufgabe zuverlässig, verständlich und zu vertretbaren Kosten?“

## Was bedeutet „40 Prozent günstiger“ wirklich?

Bei einer API zahlst du nicht pauschal für einen Chat. Abgerechnet werden **Tokens**. Ein Token ist ein kleines Textstück. Deine Eingabe, mitgesendete Dateien, Zwischenschritte und die Antwort verbrauchen solche Textstücke.

Die offiziellen Standardpreise pro eine Million Tokens sehen so aus:

| Modell | Eingabe | Ausgabe | Cache-Lesen |
| --- | ---: | ---: | ---: |
| Claude Opus 5.5 | 4 $ | 20 $ | 0,20 $ |
| Claude Opus 5 | 5 $ | 25 $ | 0,50 $ |
| Claude Fable 5.1 | 10 $ | 50 $ | 0,25 $ |
| GPT-6 Astra | 10 $ | 50 $ | 1 $ |

**Cache-Lesen** bedeutet: Bereits verarbeiteter Kontext wird wiederverwendet, statt vollständig neu berechnet zu werden. Das ist bei langen Coding-Sitzungen wichtig, weil große Teile eines Projekts immer wieder gebraucht werden.

Die reinen Eingabe- und Ausgabepreise von Opus 5.5 liegen 20 Prozent unter Opus 5. Anthropics Aussage von rund 40 Prozent weniger Gesamtkosten bezieht zusätzlich ein, dass das neue Modell bei typischen Aufgaben weniger Tokens und Schritte brauchen soll. Das ist eine Herstellerrechnung, keine Garantie für jede Anfrage.

Noch eine wichtige Trennung: Diese Tabelle beschreibt die nutzungsabhängige API. Ein Claude-Abo wird über enthaltene Nutzung und Zeitlimits geregelt. Anthropic kündigt für Pro, Max, Team und bestimmte Enterprise-Pläne höhere Fünf-Stunden-Limits an. Daraus lässt sich aber nicht ableiten, wie viele deiner konkreten Aufgaben in ein Abo passen.

## Ein einfaches Kostenbeispiel

Stell dir einen fiktiven Online-Shop vor. Auf 30 Produktseiten lädt die Navigation zu langsam. Ein Coding-Agent soll die Ursache finden, eine kleine Änderung umsetzen und die Tests ausführen.

Angenommen, der gesamte Durchlauf benötigt 100.000 Eingabe-Tokens und 20.000 Ausgabe-Tokens. Cache, Werkzeuge und weitere Runden lassen wir für den einfachen Vergleich weg.

| Modell | Rechnung | Beispielkosten |
| --- | --- | ---: |
| Claude Opus 5.5 | `0,1 × 4 $ + 0,02 × 20 $` | 0,80 $ |
| Claude Opus 5 | `0,1 × 5 $ + 0,02 × 25 $` | 1,00 $ |
| Claude Fable 5.1 | `0,1 × 10 $ + 0,02 × 50 $` | 2,00 $ |
| GPT-6 Astra | `0,1 × 10 $ + 0,02 × 50 $` | 2,00 $ |

Das ist nur der Preis derselben Tokenmenge. In der Praxis können zwei Modelle unterschiedlich viele Schritte, Wiederholungen und Tokens brauchen. Ein Modell mit höherem Listenpreis kann deshalb bei einer bestimmten Aufgabe trotzdem günstiger enden. Umgekehrt verschwindet ein Preisvorteil schnell, wenn du drei Korrekturrunden brauchst.

## Schlägt Opus 5.5 Fable und Astra?

Nicht pauschal. Die offiziellen Zahlen zeigen ein starkes Modell, aber keinen Sieger für jede Art von Arbeit.

| Test | Opus 5.5 | Fable 5.1 | GPT-6 Astra | Was der Test grob prüft |
| --- | ---: | ---: | ---: | --- |
| Terminal-Bench 4.0 | 66,4 % | 55,8 % | 57,9 % | mehrstufige Aufgaben im Terminal |
| FrontierCode 1.1 Main | 54,4 % | 50,3 % | 53,3 % | ob Code-Änderungen akzeptiert würden |
| AutomationBench | 40,0 % | 31,4 % | 41,4 % | Arbeitsabläufe über mehrere Programme |
| Terminal-Bench Science | 58,7 % | 52,6 % | 64,6 % | wissenschaftliche Aufgaben mit Code und Terminal |

Diese Tabelle ist absichtlich kein Pokal. Die Werte stammen aus den Veröffentlichungen der Anbieter. Teilweise wurden unterschiedliche Denkstufen verwendet, manche Ergebnisse kommen aus fremden Ranglisten und bei einigen Aufgaben greifen Sicherheitsmechanismen. Anthropic schreibt selbst, dass kleine Benchmark-Abstände reale Unterschiede immer schlechter vorhersagen.

Für den Shop aus dem Beispiel ist vor allem wichtig, ob das Modell den echten Grund für die langsame Navigation findet, nur die nötigen Dateien ändert und die Tests sauber abschließt. Ein Prozentpunkt in einem Sammeltest beantwortet das nicht.

## Welches Modell passt zu welcher Aufgabe?

### Starte mit Opus 5.5, wenn du viel Code für weniger Geld bearbeiten willst

Opus 5.5 ist die naheliegende erste Wahl für größere Fehleranalysen, Umbauten über viele Dateien und lange Claude-Code-Sitzungen. Der niedrigere Preis hilft besonders dann, wenn das Modell viel Projektkontext wiederholt lesen muss.

### Vergleiche Fable 5.1 bei deinem schwierigsten Fall

[Claude Fable 5.1](/blog/claude-fable-5-1-preis-benchmarks) kostet pro Ein- und Ausgabe deutlich mehr. Anthropic sagt gleichzeitig, dass Opus 5.5 bei den meisten Arbeiten auf einem ähnlichen Niveau liegt. Fable bleibt deshalb kein automatischer Standard. Es ist ein sinnvoller Gegenkandidat, wenn eine besonders schwierige Aufgabe mit Opus 5.5 nicht zuverlässig klappt.

### Nimm GPT-6 Astra ernst, wenn Computerarbeit und dein OpenAI-Ablauf zählen

Astra lag in den veröffentlichten Vergleichen unter anderem bei AutomationBench und Terminal-Bench Science vor Opus 5.5. Außerdem kann die Einbindung in ChatGPT, Codex oder eine vorhandene OpenAI-API-Anwendung praktischer sein als ein Wechsel zu Claude. Der beste Rohwert bringt wenig, wenn dein eigentlicher Ablauf dadurch komplizierter wird.

### Bleib bei einem kleineren Modell, wenn die Aufgabe klein ist

Für eine kurze Zusammenfassung, eine einfache Textkorrektur oder eine klar begrenzte Codezeile brauchst du nicht automatisch ein Spitzenmodell. Ein günstigeres, schnelleres Modell kann dafür völlig reichen. Opus 5.5 lohnt sich vor allem, wenn die Aufgabe tatsächlich mehrere schwierige Schritte enthält.

## Warum „maximal denken“ nicht automatisch besser ist

Bei diesen Modellen kannst du oft einstellen, wie viel Rechenaufwand sie für eine Aufgabe verwenden. Anthropic nennt das **Effort**. Eine höhere Stufe gibt dem Modell mehr Raum zum Prüfen und Nachdenken, verbraucht aber meistens mehr Zeit und Tokens.

Im von Anthropic veröffentlichten FrontierCode-Test erreichte Opus 5.5 mit der mittleren Einstellung 54,6 Prozent. Die maximale Einstellung kam dort auf 54,4 Prozent. Dieser winzige Unterschied beweist nicht, dass „mittel“ immer besser ist. Er zeigt aber sehr deutlich: Mehr Aufwand ist keine kostenlose Qualitätsgarantie.

Für den Shop-Fehler wäre ein vernünftiger Start:

1. **Mittel wählen:** Das Modell soll Ursache, Änderung und Tests vollständig bearbeiten.
2. **Ergebnis prüfen:** Lädt die Navigation schneller? Laufen alle vorhandenen Tests? Wurden nur nötige Dateien geändert?
3. **Erst bei Bedarf erhöhen:** Wenn die Ursache unklar bleibt oder die Aufgabe sichtbar festhängt, wechselst du auf eine höhere Stufe.

So bezahlst du zusätzliche Rechenarbeit nur dort, wo sie wirklich etwas bringt.

## Ein fairer Vergleich mit deiner eigenen Aufgabe

Nimm für den ersten Test keine riesige produktive Codebasis. Ein kleines öffentliches Demo-Projekt oder eine Kopie ohne Zugangsdaten reicht. Gib jedem Modell denselben Ausgangspunkt, denselben Auftrag und dieselben Erfolgskriterien.

```prompt
AUFGABE
[Beschreibe genau einen Fehler oder eine klar begrenzte Änderung.]

MATERIAL
[Nenne die bereitgestellten Dateien, den Projektstand und die vorhandenen Tests.]

ERFOLGSKRITERIEN
1. Erkläre die tatsächliche Ursache in einfacher Sprache.
2. Ändere nur die Dateien, die für die Lösung nötig sind.
3. Führe die vorhandenen Tests aus und nenne das Ergebnis.
4. Zeige mir den vollständigen Unterschied der Änderung.

GRENZEN
- Keine Zugangsdaten, privaten Daten oder produktiven Systeme verwenden.
- Keine Abhängigkeiten aktualisieren, wenn das nicht zwingend nötig ist.
- Wenn Belege fehlen, zuerst nachfragen statt raten.

AUSGABE
Fasse Ursache, Änderung, Testbeleg, offene Risiken und geschätzten Tokenverbrauch getrennt zusammen.
```

Beispielwerte aus diesem Artikel:

- **Aufgabe:** Die Navigation des Demo-Shops lädt auf 30 Produktseiten zu langsam.
- **Material:** Eine lokale Kopie des fiktiven Shops mit vorhandenen Tests.
- **Erfolg:** Die Ladezeit sinkt im vorhandenen Messtest, alle Tests bleiben grün und es werden keine fremden Bereiche geändert.

Führe denselben Test mehr als einmal aus. KI-Ergebnisse schwanken. Vergleiche danach nicht nur die schönste Antwort, sondern fünf Dinge: richtige Ursache, Größe der Änderung, bestandene Tests, nötige Korrekturen und tatsächliche Kosten.

## Was du vor dem Wechsel noch wissen solltest

Opus 5.5 ist laut Anthropic auf allen Claude-Plattformen sowie über AWS, Google Cloud und Microsoft Azure verfügbar. In der Claude API heißt das Modell `claude-opus-5-5`.

Für bestimmte Cybersecurity- und Biologieanfragen gelten stärkere Schutzmaßnahmen. Solche Aufgaben können automatisch an ein anderes Claude-Modell weitergereicht werden. Wenn du genau in diesen Bereichen arbeitest, vergleichst du deshalb nicht immer nur das Modell, das du ausgewählt hast.

Opus 5.5 soll außerdem natürlicher und weniger jargonlastig schreiben als Opus 5. Das ist praktisch, aber weiterhin eine Hersteller- und Testerbeobachtung. Eine klare Antwort kann trotzdem falsch sein. Code gehört in Tests, Zahlen gehören zurück zur Quelle und wichtige Entscheidungen brauchen eine menschliche Prüfung.

## Mein Fazit

Claude Opus 5.5 ist kein billiger Ersatz für jedes Spitzenmodell. Es ist vor allem eine deutlich interessantere Opus-Version: stärker bei vielen komplexen Aufgaben, günstiger pro Token und laut Anthropic sparsamer im gesamten Arbeitsablauf.

Für anspruchsvolles Coding würde ich deshalb nicht automatisch die teuerste Denkstufe oder direkt Fable wählen. Starte mit Opus 5.5 auf mittlerem Aufwand, miss dein echtes Ergebnis und nimm Fable 5.1 oder GPT-6 Astra nur dann dazu, wenn dein eigener Vergleich einen Vorteil zeigt. Das ist weniger spektakulär als ein pauschaler Testsieger. Dafür hilft es dir bei der einzigen Entscheidung, die am Ende zählt.

## Offizielle Quellen

- [Anthropic: Claude Opus 5.5, Preise, Benchmarks und Einschränkungen](https://www.anthropic.com/claude-opus-5-5)
- [Anthropic: Claude Fable 5.1, Einsatzbereich und API-Preis](https://www.anthropic.com/claude/fable)
- [OpenAI: GPT-6 Astra, Benchmarks, Verfügbarkeit und API-Preis](https://openai.com/index/gpt-6-astra/)

