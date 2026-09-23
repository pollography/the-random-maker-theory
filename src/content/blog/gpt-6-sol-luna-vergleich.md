---
title: "GPT-6 Sol oder Luna: Welches Modell spart dir wirklich Geld?"
seoTitle: "GPT-6 Sol vs. Luna: Preise und Unterschiede einfach erklärt"
description: "GPT-6 Sol ist für schwierige Aufgaben gedacht, Luna für viele klare Wiederholungen. Hier verstehst du Preise, Unterschiede und die richtige Wahl."
slug: "gpt-6-sol-luna-vergleich"
date: "2026-09-23"
tags: ["gpt-6", "gpt-6-sol", "gpt-6-luna", "openai", "codex", "ki-modelle"]
category: "ki-tools"
draft: true
titleAccent: "wirklich Geld"
readingTime: 9
heroImage: "/images/blog/gpt-6-sol-luna-vergleich-1.webp"
heroImageThumb: "/images/blog/gpt-6-sol-luna-vergleich-1-thumb.webp"
---

**OpenAI hat mit GPT-6 Sol und GPT-6 Luna zwei günstigere KI-Modelle veröffentlicht. Sol soll schwierige Aufgaben lösen, Luna viele klare Aufgaben besonders billig abarbeiten; dieser Artikel zeigt dir ohne Vorwissen, welches Modell du zuerst wählen solltest.**

<div class="rf-block rf-tldr" role="note" aria-label="Kurz gesagt">
  <span class="rf-label" aria-hidden="true">Kurz gesagt</span>
  <ul>
    <li><strong>Sol ist der kräftigere Arbeiter:</strong> Nimm es für komplizierten Code, Fehlersuche und Aufgaben mit mehreren Schritten.</li>
    <li><strong>Luna ist der günstige Fließbandhelfer:</strong> Nimm es für viele kurze, klar beschriebene Aufgaben wie Sortieren, Prüfen oder Umformulieren.</li>
    <li><strong>Die Listenpreise sind deutlich gefallen:</strong> Sol kostet 2 Dollar für Eingabe und 10 Dollar für Ausgabe pro Million Tokens. Luna kostet 0,10 beziehungsweise 0,50 Dollar.</li>
    <li><strong>„50 Prozent günstiger“ bezieht sich auf GPT-5.6:</strong> Es ist kein Versprechen, dass jede echte Aufgabe automatisch halb so viel kostet.</li>
    <li><strong>Astra bleibt für die schwierigsten Fälle:</strong> Du musst das teuerste Modell aber nicht mehr bei jeder Aufgabe starten.</li>
  </ul>
</div>

## Was ist bei GPT-6 Sol und Luna neu?

[GPT-6 Sol und Luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/) sind zwei neue Modelle innerhalb der GPT-6-Familie. Ein **KI-Modell** ist vereinfacht gesagt der Motor hinter ChatGPT, Codex oder einer eigenen Anwendung. Du gibst eine Aufgabe hinein und das Modell erzeugt daraus Text, Code oder Arbeitsschritte.

Die drei aktuellen GPT-6-Modelle haben verschiedene Rollen:

| Modell | Einfache Erklärung | Typischer Startpunkt |
| --- | --- | --- |
| GPT-6 Astra | stärkstes Modell der Familie | sehr schwierige, riskante oder noch unklare Aufgaben |
| GPT-6 Sol | viel Leistung für deutlich weniger Geld | komplexer Code und längere Arbeitsabläufe |
| GPT-6 Luna | extrem niedriger Preis bei klarer Aufgabe | viele kurze, wiederholbare Arbeiten |

Das ist die eigentliche Nachricht: Du musst nicht mehr automatisch Astra bezahlen, nur weil du ein Modell aus der GPT-6-Familie nutzen willst. Du kannst die Stärke näher an die Aufgabe anpassen.

## Sol oder Luna: Die einfache Entscheidung

Stell dir einen kleinen Online-Shop vor. Dort gibt es zwei sehr unterschiedliche Arbeiten.

**Arbeit A:** Der Warenkorb berechnet manchmal die falsche Versandart. Jemand muss mehrere Dateien prüfen, die Ursache finden, Code ändern und Tests ausführen. Dafür passt Sol besser. Die Aufgabe ist nicht nur lang, sondern verlangt Entscheidungen über mehrere Schritte.

**Arbeit B:** 5.000 neue Produktbeschreibungen sollen festen Kategorien zugeordnet werden. Jede Beschreibung folgt derselben klaren Regel. Dafür passt Luna besser. Die einzelne Entscheidung ist überschaubar, aber sie muss sehr oft wiederholt werden.

Eine brauchbare Faustregel lautet deshalb:

- **Schwierig, mehrstufig oder voller Abhängigkeiten:** Starte mit Sol.
- **Klar, kurz und oft wiederholt:** Starte mit Luna.
- **Unklar, besonders kritisch oder mit hohen Fehlerkosten:** Vergleiche zusätzlich Astra.

Luna ist nicht einfach ein langsames Sol. Sol ist auch nicht automatisch besser, nur weil es mehr kann. Wenn Luna eine klar begrenzte Aufgabe zuverlässig löst, wäre zusätzliche Modellleistung nur unnötig teuer.

## Was kosten Sol und Luna wirklich?

Bei der API bezahlst du nach **Tokens**. Ein Token ist ein kleines Stück Text. Deine Frage, mitgesendete Dateien, Zwischenschritte und die Antwort verbrauchen solche Stücke.

Die Standardpreise für kurze Kontexte sehen laut den aktuellen Modellseiten so aus:

| Modell | Eingabe pro 1 Mio. Tokens | Ausgabe pro 1 Mio. Tokens | Gelesener Cache |
| --- | ---: | ---: | ---: |
| GPT-6 Sol | 2,00 $ | 10,00 $ | 0,20 $ |
| GPT-6 Luna | 0,10 $ | 0,50 $ | 0,01 $ |
| GPT-6 Astra | 10,00 $ | 50,00 $ | 1,00 $ |

Der **Cache** speichert bereits verarbeiteten Kontext. Wenn der Shop-Agent dieselben Projektdateien in mehreren Runden braucht, muss dieser Teil nicht jedes Mal zum vollen Eingabepreis gelesen werden. OpenAI nennt für gelesenen GPT-6-Cache einen Rabatt von 90 Prozent gegenüber normaler Eingabe.

Bei sehr langen Eingaben über 272.000 Tokens gelten höhere Preise. Auch der schnelle Fast-Modus, Batch-Verarbeitung und regionale Datenhaltung verändern die Rechnung. Die Tabelle ist daher ein verständlicher Startpunkt, kein Festpreis für jeden Einsatz.

## Ein Kostenbeispiel mit derselben Arbeit

Nehmen wir für beide Shop-Aufgaben zunächst dieselbe Menge an Text: 100.000 Eingabe-Tokens und 20.000 Ausgabe-Tokens. Cache, Werkzeuge und Wiederholungen lassen wir weg, damit die Rechnung sichtbar bleibt.

| Modell | Rechnung | Beispielkosten |
| --- | --- | ---: |
| GPT-6 Luna | `0,1 × 0,10 $ + 0,02 × 0,50 $` | 0,02 $ |
| GPT-6 Sol | `0,1 × 2,00 $ + 0,02 × 10,00 $` | 0,40 $ |
| GPT-6 Astra | `0,1 × 10,00 $ + 0,02 × 50,00 $` | 2,00 $ |

Für dieselbe Tokenmenge ist Luna zwanzigmal günstiger als Sol. Das bedeutet aber nicht, dass du den komplizierten Warenkorb-Fehler für zwei Cent lösen kannst. Wenn Luna die Ursache nicht findet und fünf neue Versuche braucht, war das billigere Modell möglicherweise die teurere Entscheidung.

Beim Sortieren der 5.000 Produktbeschreibungen kann die Rechnung anders aussehen. Wenn du hundert geprüfte Beispiele nacheinander verarbeitest, dieselben Regeln im Cache bleiben und Luna die Zuordnung zuverlässig schafft, zählt vor allem der geringe Stückpreis.

## Was bedeutet „50 Prozent günstiger“?

OpenAI vergleicht die neuen Modelle mit ihren direkten Vorgängern aus der GPT-5.6-Familie:

| Vergleich | Alter Preis Eingabe / Ausgabe | Neuer Preis Eingabe / Ausgabe |
| --- | ---: | ---: |
| GPT-5.6 Sol zu GPT-6 Sol | 4 $ / 20 $ | 2 $ / 10 $ |
| GPT-5.6 Luna zu GPT-6 Luna | 0,20 $ / 1,20 $ | 0,10 $ / 0,50 $ |

Bei Sol halbieren sich beide Listenpreise. Bei Luna halbiert sich der Eingabepreis, der Ausgabepreis sinkt sogar etwas stärker. Die Schlagzeile beschreibt also einen echten Preisrückgang.

Trotzdem ist „50 Prozent günstiger“ keine Garantie für deine fertige Aufgabe. Entscheidend sind auch die Zahl der Tokens, der eingestellte Denkaufwand, genutzte Werkzeuge, Wiederholungen und Fehler. Miss deshalb die Kosten eines vollständigen Arbeitsablaufs und nicht nur den Preis einer Million Tokens.

## Wie gut sind die günstigeren Modelle?

OpenAI zeigt mehrere eigene Tests. Auf **AutomationBench**, einem Test für Arbeitsabläufe über mehrere Programme, kam Sol mit hohem Denkaufwand auf 33,2 Prozent. Astra erreichte mit niedrigem Denkaufwand 30,3 Prozent, kostete laut OpenAI pro Aufgabe aber fast viermal so viel. Bei **DeepSWE**, einem Test für echte Software-Aufgaben, lag Sol mit maximalem Aufwand nur 1,1 Prozentpunkte hinter Claude Fable 5 und kostete pro Aufgabe ungefähr 80 Prozent weniger.

Das sind interessante Signale, aber keine Einkaufsliste. Ein **Benchmark** ist eine feste Sammlung von Testaufgaben. Er zeigt, wie ein Modell unter bestimmten Bedingungen abgeschnitten hat. Er sagt nicht sicher voraus, ob dein Warenkorb-Fehler oder deine Produktkategorien genauso funktionieren.

Außerdem stammen diese Zahlen aus der Veröffentlichung des Anbieters. Für eine echte Entscheidung brauchst du einen kleinen Test mit deiner eigenen Aufgabe, deinen Erfolgskriterien und deinem tatsächlichen Verbrauch.

## Denkaufwand: Mehr ist nicht immer nötig

Bei Sol und Luna kannst du einstellen, wie viel Rechenarbeit das Modell vor der Antwort einsetzen darf. OpenAI nennt das **Reasoning Effort**, auf Deutsch etwa Denkaufwand. Möglich sind mehrere Stufen von `none` bis `max`.

Für den Shop wäre ein sinnvoller Start:

1. **Luna mit niedrigem oder mittlerem Aufwand** für zehn Produktbeschreibungen testen.
2. **Sol mit mittlerem Aufwand** auf einer sicheren Kopie des Warenkorb-Projekts starten.
3. **Ergebnis prüfen:** Stimmt die Kategorie? Ist die Fehlerursache belegt? Laufen die Tests?
4. **Erst dann erhöhen:** Mehr Denkaufwand oder Astra nur verwenden, wenn die Aufgabe sichtbar zu schwer bleibt.

Mehr Denkaufwand kann Qualität erhöhen, verbraucht aber Zeit und Tokens. Ein höherer Schalter ist deshalb kein kostenloses Qualitätsversprechen.

## Ein fairer Test für deine eigene Aufgabe

Teste nicht sofort mit Zugangsdaten, Kundendaten oder einem produktiven System. Nimm zehn harmlose Beispieldaten oder eine lokale Projektkopie. Gib Sol und Luna denselben Auftrag und prüfe dasselbe Ergebnis.

```prompt
AUFGABE
[Beschreibe genau eine Arbeit, zum Beispiel: Ordne 100 Produktbeschreibungen fünf vorhandenen Kategorien zu.]

MATERIAL
[Nenne die Beispieldaten und die erlaubten Regeln.]

ERFOLG
1. Mindestens [98 von 100] Ergebnisse stimmen mit meiner geprüften Musterlösung überein.
2. Unklare Fälle werden markiert statt geraten.
3. Das Ausgabeformat bleibt exakt erhalten.

GRENZEN
- Keine echten Kunden- oder Zugangsdaten verwenden.
- Keine Dateien oder Systeme außerhalb des Testordners verändern.
- Wenn eine Information fehlt, den Fall als unklar markieren.

AUSGABE
Liefere das Ergebnis, die unklaren Fälle, den Tokenverbrauch und die geschätzten Kosten getrennt.
```

Vergleiche danach vier Dinge: richtige Ergebnisse, nötige Korrekturen, Laufzeit und Gesamtkosten. Für den Warenkorb-Fehler kommen bestandene Tests und die Größe der Codeänderung dazu. Wiederhole den Versuch, denn KI-Ergebnisse können schwanken.

Wenn du grundsätzlich verstehen willst, wie ein Modell mehrere Schritte selbstständig abarbeitet, hilft dir meine [einfache Erklärung zu KI-Agenten](/blog/ki-agents-shoppen-posten-mailen-2026). Für längere Coding-Arbeit findest du außerdem mein [Claude-Code-Setup](/blog/claude-code-ultimate-setup-produktivitaet-2026), dessen Prüfkriterien sich auch auf Codex übertragen lassen.

## Wo kannst du Sol und Luna nutzen?

In der API heißen die Modelle `gpt-6-sol` und `gpt-6-luna`. Laut OpenAI sind beide außerdem in ChatGPT Work und Codex für Plus, Pro, Business, Enterprise und Edu vorgesehen. In Free und Go soll Luna in der Desktop-App verfügbar sein. Die Freischaltung kann schrittweise erfolgen, deshalb kann ein Modell in deinem Konto später auftauchen als in der Ankündigung.

Beide Modelle unterstützen laut den aktuellen Modellseiten sehr große Kontexte mit bis zu 1.050.000 Tokens und Ausgaben bis 128.000 Tokens. Für eingebaute Werkzeuge und Funktionsaufrufe empfiehlt OpenAI die Responses API. Das ist erst wichtig, wenn du eine eigene Anwendung baust. Für die erste Auswahl reicht die einfache Trennung: Sol für schwierige Arbeit, Luna für klare Massenarbeit.

## Mein Fazit

GPT-6 Sol und Luna machen nicht jede KI-Aufgabe pauschal halb so teuer. Sie geben dir aber zwei deutlich günstigere Startpunkte unterhalb von Astra.

Für den komplizierten Warenkorb-Fehler würde ich Sol mit mittlerem Denkaufwand wählen. Für 5.000 klar definierte Zuordnungen würde ich Luna zuerst an zehn geprüften Beispielen testen und dann hochskalieren. Astra bleibt die Reserve für Fälle, in denen Fehler teuer sind oder Sol nachweislich nicht ausreicht.

## Offizielle Quellen

- [OpenAI: Einführung von GPT-6 Sol und Luna](https://openai.com/index/introducing-gpt-6-sol-and-luna/)
- [OpenAI: GPT-6 Sol, Eigenschaften und Preise](https://developers.openai.com/api/docs/models/gpt-6-sol)
- [OpenAI: GPT-6 Luna, Eigenschaften und Preise](https://developers.openai.com/api/docs/models/gpt-6-luna)
- [OpenAI: Aktuelle API-Preise](https://developers.openai.com/api/docs/pricing)
- [OpenAI: Modellwahl innerhalb der GPT-6-Familie](https://developers.openai.com/api/docs/guides/latest-model)
