# Anti-AI Writing Patterns — Erweiterte Referenz

Dieses Dokument enthält die komplette Sammlung an Mustern, die KI-generierten Text verraten, und wie man sie vermeidet. Nutze dies als Checkliste beim Polish-Schritt.

## Kategorie 1: Lexikalische Patterns

### 1.1 Copula-Eröffnungen
**Problem:** KI startet Sätze gerne mit "Es ist...", "Es gibt...", "Es wird..."
**Fix:** Subjekt nach vorne. Aktiv statt passiv.

| Schlecht (KI) | Gut (TRMT) |
|---|---|
| Es ist wichtig zu beachten, dass... | Wichtig: ... |
| Es gibt viele Tools die... | Drei Tools stechen raus: ... |
| Es wird erwartet, dass... | OpenAI plant laut Berichten... |

### 1.2 Synonym-Cycling
**Problem:** KI variiert zwanghaft Synonyme für dasselbe Konzept.
"Das Tool... Die Software... Die Anwendung... Das Programm..."
**Fix:** Bleib bei einem Wort. Wiederholung ist menschlich.

### 1.3 KI-Buzzwords (Banned List)
Diese Wörter in TRMT-Content vermeiden (außer ironisch):
- revolutionär, bahnbrechend, Paradigmenwechsel
- nahtlos, ganzheitlich, Synergie
- game-changer, next-level (außer bei direktem Zitat)
- ermöglicht es, bietet die Möglichkeit
- in der heutigen Zeit, in der modernen Welt
- es ist wichtig zu beachten, es sei darauf hingewiesen
- zweifellos, unbestreitbar, fraglos
- innovative Lösung, cutting-edge
- skalierbar, robust, State-of-the-Art

### 1.4 Hedging-Phrasen
**Problem:** KI hedged zu viel aus Vorsicht.
"Es könnte möglicherweise der Fall sein, dass..."
**Fix:** Sei direkt. Wenn unsicher, sag "ich bin mir nicht sicher" statt akademisches Hedging.

### 1.5 Falsche Ranges
**Problem:** KI erfindet "3-5 Minuten", "10-15 Tools", "20-30% schneller"
**Fix:** Konkrete Zahl oder lass es weg. "Dauert ca. 4 Minuten" statt "3-5 Minuten".

## Kategorie 2: Strukturelle Patterns

### 2.1 Uniforme Absatzlänge
**Problem:** Jeder Absatz hat 4-5 Sätze. Gleichmäßig wie ein Metronom.
**Fix:** Variiere wild. Manchmal 1 Satz. Manchmal 6. Das ist menschlich.

### 2.2 Vorhersagbare Transitionen
**Problem:** "Zunächst... Darüber hinaus... Abschließend..."
**Fix:**
- Einfach den nächsten Punkt machen (kein Übergang nötig)
- "Und dann..." / "Ah, und:" / "Noch was:"
- Oder direkt mit dem neuen Gedanken starten

### 2.3 Symmetrische Listen
**Problem:** Jeder Listenpunkt hat exakt gleich viel Text. 3-3-3 oder 5-5-5.
**Fix:** Manche Punkte brauchen mehr Erklärung als andere. Das ist OK.

### 2.4 Frage-Antwort-Muster
**Problem:** "Was bedeutet das? Es bedeutet, dass..." Rhetorische Fragen mit sofortiger Antwort.
**Fix:** Wenn du eine Frage stellst, lass sie kurz wirken. Oder überspring die Frage komplett.

### 2.5 Dreier-Strukturen
**Problem:** KI liebt Dreiergruppen. Drei Punkte, drei Beispiele, drei Vorteile.
**Fix:** Manchmal sind es 2. Oder 4. Oder 7. Real Life ist nicht symmetrisch.

## Kategorie 3: Tonale Patterns

### 3.1 Emotionale Flatline
**Problem:** Jeder Absatz klingt gleich "sachlich-neutral". Kein Hoch, kein Tief.
**Fix:** Misch Begeisterung ("mega geil"), Frustration ("nervt"), Staunen ("whoa"), Gleichgültigkeit ("naja, ok").

### 3.2 Fake Enthusiasm
**Problem:** "Das ist wirklich aufregend!" / "Ein faszinierender Ansatz!"
**Fix:** Echte Begeisterung ist spezifisch: "Die API-Response kommt in 200ms. Das ist krass schnell."

### 3.3 Prediger-Ton
**Problem:** "Man sollte bedenken..." / "Es lohnt sich zu erwähnen..."
**Fix:** "Check das mal:" / "Wichtig:" / Einfach sagen was Sache ist.

### 3.4 Übermäßige Höflichkeit
**Problem:** "Es wäre möglicherweise ratsam zu erwägen, ob..."
**Fix:** "Mach X." oder "Ich würd Y nehmen."

## Kategorie 4: Authentizitäts-Booster

### 4.1 Burstiness (Satzlängen-Variation)
Menschen schreiben unterschiedlich lange Sätze. KI ist gleichmäßig.
**Ziel:** Mix aus 3-Wort-Sätzen und 25-Wort-Sätzen.

Gut:
```
Krass. Ich hab den ganzen Abend damit verbracht, das Setup zum Laufen zu
kriegen, und am Ende war es ein fehlender API-Key. Ein einziger String.
Drei Stunden meines Lebens.
```

### 4.2 Persönliche Tangenten
Menschen schweifen ab. Kurz. Dann kommen sie zurück.
```
Das Modell kann 128k Token verarbeiten. (Zum Vergleich: Dieses ganze
Blog-Post hat vielleicht 2000 Token. Also echt viel Platz.)
```

### 4.3 Implizites Wissen
Menschen erklären nicht alles. Manche Dinge setzen sie voraus.
Nicht: "Docker, ein Tool zur Container-Virtualisierung, ermöglicht es..."
Sondern: "Schmeißt es in Docker und gut."

### 4.4 Fehler eingestehen
Nichts ist menschlicher als "Ich lag falsch" oder "Hab ich unterschätzt".
```
Ich dachte erst, das ist Spielzeug. War falsch. Das Ding kann echt was.
```

### 4.5 Spezifische statt generische Details
Nicht: "Viele Entwickler nutzen dieses Tool."
Sondern: "In meiner Timeline haben letzte Woche mindestens 5 Leute darüber gepostet."

## Quick-Check: Die 5-Sekunden-Regel

Lies einen beliebigen Absatz deines Artikels. Frag dich:
1. Könnte das von ChatGPT stammen? → Umschreiben.
2. Klingt das wie ein Wikipedia-Eintrag? → Umschreiben.
3. Wuerde TRMT das so zu einem Kumpel sagen? → Wenn nein: Umschreiben.
4. Fehlt eine Meinung oder Erfahrung? → Ergänzen.
5. Sind alle Sätze gleich lang? → Variieren.
