# TRMT Bildprompt-Gegenversuche und Library-Paare

## Ziel

Die zwölf Artikel bleiben ehrliche Tests sehr kurzer Bildprompts. Das erste Bild dokumentiert weiterhin, was der jeweilige Ein-Wort-Prompt tatsächlich erzeugt hat. Die ausführliche Vorlage wird jedoch nicht mehr als Bearbeitung dieses Ergebnisses dargestellt, sondern als unabhängiger, kontrollierter Gegenversuch mit demselben Originalmaterial.

## Leserlogik

Jeder nummerierte Eintrag folgt demselben Vergleich:

1. `Ein-Wort-Test`: Kurzprompt und unverändertes Testbild.
2. Beobachtung: Was daran brauchbar, überraschend oder unzuverlässig ist.
3. `Kontrollierter Gegenversuch`: Zweck, benötigtes Originalmaterial und eine unabhängig nutzbare Vorlage.
4. Ergebnis: Das bereits getestete kontrollierte Bild und eine ehrliche Einordnung.

Vor den Einträgen erklärt jeder Artikel einmal sichtbar: Für einen fairen Gegenversuch wird ein neuer Chat geöffnet und nur das Originalmaterial hochgeladen. Das Ein-Wort-Ergebnis bleibt Vergleichsbeleg, wird aber nicht als Referenz verwendet.

## Unabhängigkeit und Weiterarbeit

- Der kontrollierte Prompt darf ausschließlich auf das Originalmaterial verweisen.
- Ein vorher erzeugtes Bild wird weder als `Bild 2` noch als Stil-, Layout- oder Negativreferenz vorausgesetzt.
- Layout, Stil und gewünschte Wirkung müssen im kontrollierten Prompt selbst stehen.
- Echte Folgeaufträge wie Rasterfeld auswählen, Schrift entfernen oder ein Ergebnis korrigieren werden separat als `Mit dem Ergebnis weiterarbeiten` markiert. Nur dort ist die Referenz auf ein erzeugtes Bild zulässig.
- Jede kopierbare Vorlage bleibt ohne die umgebende Artikelprosa verständlich.

## Sonderfälle

### Farbanalyse

Der bisherige Palettenvergleich wird ersetzt. Der neue Prompt soll das Portrait zuerst auf Fotoeignung, Lichtverfälschung, Temperatur, Kontrast und erkennbare Unsicherheiten analysieren. Ist das Foto ungeeignet, soll das Modell statt einer Scheindiagnose ein besseres Foto anfordern. Bei ausreichender Grundlage folgen eine vorsichtige schriftliche Einordnung und ein visuelles Vergleichsbild, in dem empfohlene Farben tatsächlich gesichtsnah an Kleidung oder Stoff angewandt werden. Lose Farbfelder allein reichen nicht.

### Frisuren

Der kontrollierte Hauptprompt wird ohne Abhängigkeit vom Kurzprompt-Ergebnis neu formuliert. Zusätzlich zeigt ein ausdrücklich spielerischer Bonus-Test neun bewusst feminine Frisuren auf demselben Portrait. Identität, Gesicht, Bart, Brille, Kleidung, Licht und Bildausschnitt bleiben dabei konstant; verändert wird nur die Frisur.

### CoverPack und ähnliche Fälle

Formulierungen wie `falls Bild 2 vorhanden ist` oder `als Negativbeispiel` entfallen vollständig. Der gewünschte Aufbau wird positiv und eigenständig beschrieben.

## Prompt-Library

Die bestehende Library bleibt bei 147 Ideen. Für die 86 nummerierten Ein-Wort-Tests erhält die vorhandene Karte eine direkte A/B-Umschaltung:

- `Ein-Wort-Test`: bisheriger Kurzprompt, bisheriges Bild und eigener Kopierbutton.
- `Kontrollierte Vorlage`: ausführlicher Gegenprompt, getestetes Kontrollbild und eigener Kopierbutton.

Beide Varianten bleiben in einer Karte unmittelbar vergleichbar. Der zusätzliche Alias `/expressions` bleibt ein reiner Kurzprompt ohne erfundenes Gegenstück. Die 60 bereits vorhandenen ausführlichen Library-Einträge bleiben unverändert.

## Datenmodell

Die 86 betroffenen Kurzprompt-Datensätze in `src/lib/data/image-prompts.json` erhalten:

- `controlledPromptText`
- `controlledImage`
- `controlledAlt`

Die Artikel bleiben die redaktionelle Erklärung, die Library ist die direkte Vergleichsoberfläche. Ein Vertragstest verhindert, dass Artikelvorlage und Library-Prompt auseinanderlaufen.

## Qualitätsgrenzen

- Alte Ein-Wort-Ergebnisse bleiben unangetastet.
- Das alte Farbanalyse-Kontrollbild wird gelöscht; das neue, inhaltlich passende Ergebnis erhält einen cache-sicheren neuen Pfad.
- Der Frisuren-Bonus erhält einen eigenen stabilen Bildpfad.
- Generierte Ergebnisse bleiben dokumentierte Einzelläufe, keine Garantie für identische Ergebnisse bei anderen Modellen oder späteren Versionen.
- Alle 86 Gegenprompts werden auf versteckte Ergebnisreferenzen geprüft.
- Desktop, Mobil, Tastaturbedienung, Kopieren, Bildwechsel und Lightbox werden lokal geprüft.
- Nach grüner Gesamtprüfung wird die freigegebene Änderung auf `main` veröffentlicht und live zurückgelesen.
