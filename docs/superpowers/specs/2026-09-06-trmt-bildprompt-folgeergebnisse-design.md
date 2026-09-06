# TRMT Bildprompt-Folgeergebnisse Design

## Ziel

Die 86 nummerierten Kurzprompt-Tests aus den zwölf Detailartikeln werden zu einem belegten Zwei-Schritt-Workflow. Das bisherige Bild bleibt das ehrliche Ergebnis des Kurzprompts. Unter dem bereits vorhandenen ausführlichen Prompt erscheint künftig ein zweites, tatsächlich mit diesem Arbeitsauftrag erzeugtes und visuell geprüftes Ergebnis.

## Leserführung pro Eintrag

Jeder nummerierte Eintrag behält diese Reihenfolge:

1. Kurzprompt und vorhandenes Originalergebnis.
2. Beobachtung und sinnvoller Einsatz.
3. `Was der zweite Prompt macht:` mit einem konkreten Satz zu Auswahl, Korrektur, Präzisierung, Formatwechsel oder Weiterverarbeitung.
4. `Dafür hochladen:` mit den tatsächlich benötigten Eingaben.
5. `Kopierbare Vorlage:` mit einem universellen Prompt.
6. Falls Platzhalter nötig sind: `Für dieses Beispiel eingesetzt:` mit den konkreten Demo-Werten.
7. Neues Ergebnisbild mit ehrlichem Alt-Text.
8. Ein knapper Satz dazu, was verbessert wurde und welche Grenze bleibt.

## Universalität

- Die kopierbare Vorlage enthält keine Merkmale des Testporträts wie Glatze, Bart, orange Brille oder türkisen Hoodie.
- Identität, Kleidung, Accessoires und andere erkennbare Merkmale werden aus dem hochgeladenen Referenzbild übernommen.
- Nutzerinhalte stehen als eindeutige `[[PLATZHALTER]]` in der Vorlage.
- Das erzeugte Beispiel verwendet ausgefüllte Demo-Werte. Diese Werte werden am Bild sichtbar dokumentiert; die Vorlage bleibt trotzdem universell.
- Der Eingabehinweis unterscheidet zwischen Ausgangsporträt, Kurzprompt-Ergebnis, ausgewähltem Rasterbild und zusätzlich nötigen Fotos oder Texten.

## Bilder und Qualitätsgrenze

- Die vorhandenen Kurzprompt-Bilder werden nicht überschrieben oder retuschiert.
- Neue Dateien liegen unter `static/images/blog/ki-bildprompts/followups/` und verwenden stabile nummerierte Namen.
- Nur ein Ergebnis, das den beschriebenen Zweck sichtbar erfüllt, wird in einen Artikel eingebunden.
- Fehlversuche bleiben außerhalb der veröffentlichten Artikel. Nach einem Fehlversuch wird genau die verletzte Anforderung präzisiert und erneut geprüft.
- Das visuelle Urteil prüft Zieltreue, Identität, Komposition, Farb- und Stilanschluss, erfundene Texte/Objekte, Anatomie und direkte Verwendbarkeit.
- Nummer 64 integriert das Porträt in Papierfarbe, Druckkontrast und Holzschnittästhetik der Fantasy-Zeitung.
- Nummer 66 ersetzt den isolierten Studioeindruck durch eine glaubwürdige Reiseaufnahme und gleicht Farbe, Korn, Kontrast und Alterung an die Scrapbook-Seite an.

## Creator- und KI-Video-Ausnahme

Der einzelne Acht-Sekunden-Bewegungsprompt am Ende von `bildprompts-creator-ki-video.md` wird entfernt. Titel, SEO-Titel und Slug bleiben unverändert, weil der Artikel weiterhin bildbasierte Kontaktbögen, Storyboards sowie Start- und Endframes für KI-Videos erklärt. Es wird in dieser Bildprompt-Serie kein unbelegtes Videoergebnis versprochen.

## Verifikation

- Automatischer Test zählt exakt 86 nummerierte Einträge in zwölf Artikeln.
- Jeder Eintrag besitzt Zweck, Eingaben, universelle Vorlage und vorhandenes Folgeergebnis.
- Kein ausführlicher Prompt enthält feste Merkmale des Testporträts.
- Jede referenzierte Folgeergebnis-Datei existiert und ist ein lesbares WebP.
- Der Acht-Sekunden-Bewegungsprompt ist entfernt, Titel und Slug sind unverändert.
- Alle Repository-Node-Tests, Bildmetadaten-Generierung, `git diff --check` und ein lokaler Desktop-/Mobil-Render werden frisch geprüft.

## Grenzen

- Keine Veröffentlichung, kein Push und kein Deployment in diesem Auftrag.
- Der schmutzige Haupt-Checkout und andere Worktrees bleiben unangetastet.
- Ein generiertes Bild ist ein dokumentierter Einzellauf, keine Garantie für identische Ergebnisse bei anderen Modellen oder späteren Modellversionen.
