---
title: "GPT-6 Astra & Claude Fable 5.1 kombinieren: Einer baut, einer prüft"
seoTitle: "Claude Code und Codex kombinieren: Builder-Reviewer-Workflow"
description: "GPT-6 Astra und Claude Fable 5.1 als Builder und Reviewer kombinieren: ein begrenzter Workflow für Claude Code, Codex, Tests und klare Freigaben."
slug: "claude-code-codex-zweitmodell-review"
date: "2026-09-08"
tags: ["claude-code", "codex", "gpt-6-astra", "claude-fable-5-1", "ki-tools", "workflow", "code-review"]
category: "ki-tools"
draft: true
titleAccent: "Einer baut, einer prüft"
readingTime: 10
---

**GPT-6 Astra und Claude Fable 5.1 müssen nicht gegeneinander antreten: Du kannst Claude Code und Codex als getrennte Rollen verbinden, sodass ein Modell baut und das andere die Arbeit mit frischem Kontext prüft. Das macht Fehler nicht unmöglich, schafft aber eine zusätzliche Kontrollschicht, wenn Aufgabe, Rechte, Prüfkriterien und Abbruchregeln vorher feststehen.**

Beide Anbieter unterstützen nicht interaktive CLI-Läufe. Dadurch kann ein Agent einen klar begrenzten Auftrag an die andere Umgebung übergeben, ohne dass du jede Antwort manuell kopieren musst. Der sinnvolle Kern ist trotzdem kein vollautomatisches Agentenkarussell, sondern eine saubere Rollentrennung.

<div class="rf-block rf-tldr" role="note" aria-label="Kurz gesagt">
  <span class="rf-label" aria-hidden="true">Kurz gesagt</span>
  <ul>
    <li><strong>Ein Koordinator:</strong> Eine laufende Sitzung hält Ziel, Entscheidungen und Freigaben zusammen.</li>
    <li><strong>Ein Builder:</strong> Genau ein Agent setzt den bestätigten Plan um.</li>
    <li><strong>Ein Zweitmodell:</strong> Der andere Anbieter prüft Plan oder Diff mit frischem Kontext und möglichst nur lesend.</li>
    <li><strong>Harte Belege:</strong> Tests, Build, Screenshots und echte Laufzeitdaten entscheiden stärker als das Urteil eines Modells.</li>
    <li><strong>Begrenzte Schleife:</strong> Nach wenigen Prüf- und Korrekturrunden ist Schluss. Offene Risiken werden sichtbar festgehalten.</li>
  </ul>
</div>

## Was wird hier überhaupt kombiniert?

Nicht zwei Chatfenster, die sich gegenseitig Komplimente machen. Kombiniert werden **zwei klar getrennte Rollen** in demselben Entwicklungsauftrag:

<div class="decision-grid">
  <section>
    <h3>Koordinator</h3>
    <p>Hält Nutzerziel, Entscheidungen, Plan, Grenzen und Freigaben zusammen. Diese Rolle bleibt während des gesamten Auftrags stabil.</p>
  </section>
  <section>
    <h3>Builder</h3>
    <p>Schreibt den Code in einem sauberen Branch oder einem isolierten Worktree und führt die vereinbarten Prüfungen aus.</p>
  </section>
  <section>
    <h3>Reviewer</h3>
    <p>Liest Plan, betroffene Dateien und Diff. Er sucht konkrete Abweichungen, fehlende Fälle und schwache Tests, ändert aber nichts.</p>
  </section>
  <section>
    <h3>Beleg</h3>
    <p>Tests, Build und visuelle Prüfung bestätigen den realen Pfad. Ein Modellurteil allein ist kein Freigabesignal.</p>
  </section>
</div>

Du kannst in Claude Code starten und Codex prüfen lassen. Oder du startest in Codex und nutzt Claude Code als Zweitmeinung. Wichtig ist nicht, welcher Name links oder rechts steht. Wichtig ist, dass **der Builder seine eigene Arbeit nicht als einzige Prüfinstanz abnimmt**.

Der Workflow passt deshalb gut als zusätzliche Qualitätsschicht zu einem größeren [Claude-Code-Setup](/blog/claude-code-ultimate-setup-produktivitaet-2026). Er ersetzt weder Git noch CI noch einen Menschen, der eine folgenreiche Änderung tatsächlich freigibt.

## Warum ein zweites Modell helfen kann

Wer eine Lösung gerade selbst entwickelt hat, trägt viele Annahmen aus Planung und Umsetzung im selben Kontext mit. Beim späteren Prüfen wirken diese Annahmen schnell wie feststehende Tatsachen. Ein frischer Reviewer kennt diese gedanklichen Abkürzungen nicht und muss sich stärker an Plan, Code und Belegen orientieren.

Für Sprachmodelle gibt es zusätzlich Hinweise auf **Self-Preference Bias**. Eine [EMNLP-Studie von 2025](https://aclanthology.org/2025.emnlp-main.86/) untersuchte, ob Modelle eigene Antworten beim Bewerten bevorzugen. Die Autoren fanden solche Verzerrungen, weisen aber zugleich darauf hin, dass Antwortqualität, Stil und Training die Messung kompliziert machen.

Das ist kein Beweis, dass ein anderes Modell jeden Coding-Fehler besser findet. Es ist ein guter Grund, Selbstbewertung nicht mit unabhängiger Verifikation zu verwechseln. Auch ein Zweitmodell kann denselben Fehler übersehen, eine falsche Kritik erfinden oder sich von überzeugend geschriebenem Code blenden lassen.

<div class="rf-block rf-takeaway" role="note" aria-label="Die entscheidende Grenze">
  <span class="rf-label" aria-hidden="true">Die entscheidende Grenze</span>
  <p><strong>Anderer Anbieter bedeutet andere Perspektive, nicht automatisch Wahrheit.</strong> Der Reviewer liefert prüfbare Einwände. Die Freigabe kommt erst durch nachvollziehbare Belege und deine Entscheidung.</p>
</div>

## Was du vor dem ersten Lauf brauchst

Der technische Teil ist kleiner als der organisatorische. Für einen belastbaren Durchlauf brauchst du:

- **beide CLIs installiert und angemeldet:** `codex --version` und `claude --version` müssen funktionieren;
- **ein Git-Repository mit bekanntem Ausgangspunkt:** idealerweise ein eigener Branch oder ein Worktree;
- **eine konkrete Aufgabe:** keine offene Formulierung wie „Mach das Projekt besser“;
- **beobachtbare Erfolgskriterien:** zum Beispiel exakte Tests, ein Build und eine visuelle Prüfung;
- **klare Rechte:** Der Reviewer liest. Der Builder darf nur im vereinbarten Arbeitsbereich schreiben;
- **ein Rundenlimit:** etwa zwei Review-Runden statt einer endlosen Korrekturschleife.

Prüfe zuerst den Ausgangszustand. Wenn die Tests schon vor deiner Änderung rot sind, muss das im Auftrag stehen. Sonst kann später niemand sauber trennen, was neu kaputtgegangen ist.

```powershell
git status --short
git rev-parse HEAD
[[DEIN_TESTBEFEHL]]
```

**Beispielwert:** `[[DEIN_TESTBEFEHL]]` = `npm test`

## Der Workflow in fünf Phasen

### 1. Aufgabe und Erfolg gemeinsam festnageln

Schreibe vor dem ersten Modellaufruf einen kurzen Auftrag. Er muss nicht schön sein. Er muss eindeutig sein.

```prompt
Ziel: [[WAS SOLL NACHHER FUNKTIONIEREN?]]

Im Scope:
- [[BETROFFENE FUNKTION ODER DATEIEN]]

Nicht im Scope:
- [[BEWUSST AUSGESCHLOSSENE ÄNDERUNGEN]]

Akzeptanzkriterien:
1. [[BEOBACHTBARES ERGEBNIS]]
2. [[FEHLERFALL, DER FUNKTIONIEREN MUSS]]
3. [[PRÜFBEFEHL UND ERWARTETES RESULTAT]]

Grenzen:
- Kein Push, Merge oder Deployment ohne separate Freigabe.
- Bestehende fremde Änderungen bleiben unangetastet.
```

**Beispielwerte:** `[[WAS SOLL NACHHER FUNKTIONIEREN?]]` = „Der CSV-Import weist ungültige Datumswerte verständlich zurück.“ `[[PRÜFBEFEHL UND ERWARTETES RESULTAT]]` = „`npm test`, alle Tests grün.“

### 2. Einen Plan schreiben, bevor jemand baut

Der Koordinator untersucht die betroffenen Stellen und schreibt daraus einen kleinen Plan. Dazu gehören Normalfall, relevante Fehlerfälle, Berechtigungen und die genaue Verifikation. Bei einer simplen Ein-Datei-Änderung reichen wenige Punkte. Bei Migrationen, Daten oder Sicherheit braucht der Plan mehr Tiefe.

Der Plan wird als Datei gespeichert, zum Beispiel `PLAN.md`. Damit bekommen Builder und Reviewer dasselbe Zielbild. Ändert sich der Plan später wesentlich, ist eine frühere Freigabe veraltet.

### 3. Den Plan mit dem anderen Anbieter angreifen lassen

Jetzt kommt der erste sinnvolle Modellwechsel. Der Reviewer soll nicht umformulieren, sondern Lücken belegen: fehlende Aufrufer, nicht berücksichtigte Zustände, ungeprüfte Annahmen oder Tests, die das Ziel gar nicht beweisen.

```prompt
Prüfe PLAN.md gegen das tatsächliche Repository.

Arbeite strikt lesend. Ändere keine Dateien und starte keine externen Aktionen.
Suche konkrete Abweichungen, fehlende Fehlerfälle und schwache Prüfkriterien.

Gib zurück:
- Urteil: FREIGEGEBEN, ÜBERARBEITEN oder BLOCKIERT
- Findings: Schweregrad, Datei oder Anforderung, Beleg, konkrete Korrektur
- Geprüfte Bereiche
- Nicht geprüfte oder unbekannte Bereiche

Erfinde keine Mindestzahl an Findings. Ein leerer Befund ist erlaubt, aber kein Beweis für Vollständigkeit.
```

**Beispielwert:** Datei = `PLAN.md`, Ausgangspunkt = der zuvor notierte Commit aus `git rev-parse HEAD`.

Für Codex ist der offizielle nicht interaktive Einstieg [`codex exec`](https://developers.openai.com/codex/noninteractive). Der Modus startet standardmäßig lesend; OpenAI empfiehlt für Automationen die kleinsten nötigen Rechte. Ein aktueller PowerShell-Aufruf kann so aussehen:

```powershell
Get-Content -Raw review-prompt.txt | codex exec --model gpt-6-astra --sandbox read-only -C "C:\Pfad\zum\Projekt" -
```

Claude Code unterstützt mit [`claude -p`](https://code.claude.com/docs/en/headless) ebenfalls nicht interaktive Läufe. Die Toolauswahl lässt sich für eine Prüfung auf Lesewerkzeuge begrenzen:

```powershell
claude --safe-mode -p --model claude-fable-5-1 --permission-mode dontAsk --tools "Read,Glob,Grep" --allowedTools "Read,Glob,Grep" --output-format json "Prüfe PLAN.md nach dem Inhalt von review-prompt.txt."
```

Die expliziten Modellnamen funktionieren nur, wenn deine aktuelle CLI-Version und dein Konto Zugriff darauf haben. Falls ein Modell nicht aufgelöst wird, aktualisierst du zuerst die CLI oder lässt den Modellparameter weg und prüfst die tatsächlich verwendete Version im Protokoll.

Die Schalter sind kein Ersatz für eine sichere Umgebung. Ein fremdes Repository kann Konfigurationen, Hooks oder manipulierte Anweisungen enthalten. Arbeite bei unbekanntem Code in einem frischen Clone oder Container und gib einem Reviewer weder Secrets noch Schreibrechte.

### 4. Genau einen Builder umsetzen lassen

Nach der Planprüfung entscheidet der Koordinator über jedes Finding. Berechtigte Kritik kommt in den Plan, unbelegte Vorschläge werden nicht blind übernommen. Danach baut **ein** Agent die Änderung. Das vermeidet Mischzustände, in denen später unklar ist, wer welchen Teil geschrieben und geprüft hat.

Der Builder bekommt den finalen Plan, den Ausgangs-Commit und die Freigabegrenzen. Er darf nicht selbst entscheiden, dass ein Push oder Deployment jetzt schon in Ordnung sei. Nach der Umsetzung laufen die vereinbarten Tests unabhängig vom Modelltext.

### 5. Den finalen Diff frisch prüfen

Die Abschlussprüfung beginnt in einer neuen Sitzung beim anderen Anbieter. Der Reviewer erhält mindestens:

- den finalen Plan;
- den Ausgangs-Commit;
- den vollständigen Git-Diff einschließlich neuer Dateien;
- die tatsächlich ausgeführten Testbefehle und Ergebnisse;
- bekannte Grenzen und unveränderte Baseline-Fehler.

Der frische Kontext ist wichtig. Eine fortgesetzte Plan-Session hat bereits viele Entscheidungen akzeptiert und kann dadurch weniger kritisch lesen. Wenn der Koordinator nach dem Review selbst Code ändert, braucht genau dieser neue Diff wieder eine Prüfung.

## Die drei Regeln, die den Loop stabil halten

### Eine Freigabe gehört zu einem festen Stand

Notiere Commit oder Diff-Fingerprint. Eine Freigabe für Version A gilt nicht automatisch für Version B. Besonders bei nachträglichen „kleinen“ Fixes entsteht sonst eine ungeprüfte Lücke.

### Findings brauchen Belege

„Das könnte problematisch sein“ reicht nicht. Ein brauchbares Finding nennt Datei, Stelle, verletztes Kriterium und eine reproduzierbare Folge. Der Koordinator darf Kritik verwerfen, wenn sie am Code vorbeigeht.

### Jede Schleife braucht ein Ende

Setze vorab ein Limit für Plan-Review, Korrekturen und Abschlussprüfung. Wenn das Limit erreicht ist, werden offene Punkte als Risiko dokumentiert. Mehr Runden bedeuten nicht automatisch mehr Qualität. Sie können auch Kosten erhöhen und dieselben Argumente im Kreis drehen.

## Wo der Ansatz oft scheitert

- **Beide Agenten schreiben gleichzeitig:** Der Diff wird unübersichtlich und die Prüfrollen verschwimmen.
- **Der Reviewer sieht nur eine Zusammenfassung:** Dann prüft er die Erzählung des Builders statt den tatsächlichen Code.
- **Es fehlen Akzeptanzkriterien:** Ohne Zielmaßstab entsteht Geschmacksfeedback statt Review.
- **Grüne Tests werden überschätzt:** Ein Happy-Path-Test beweist keine Berechtigungen, Timeouts, Last oder Produktionskonfiguration.
- **Das Zweitmodell erhält Vollzugriff:** Aus einer Prüfung wird unbemerkt eine zweite Implementierung.
- **Der Loop läuft ohne Budget:** Zwei starke Modelle können sehr überzeugend sehr lange diskutieren.

Wenn du solche Abläufe häufiger nutzt, passt die Rollenlogik auch in eine [größere Content- oder Agenten-Pipeline](/blog/meine-content-pipeline-ai-agents-2026). Für Code sollte die letzte Meile aber strenger sein: reproduzierbare Tests, ein nachvollziehbarer Diff und eine menschliche Freigabe vor externen Wirkungen.

## Brauchst du dafür wirklich Astra und Fable 5.1?

Nicht zwingend. OpenAI beschreibt [GPT-6 Astra](https://developers.openai.com/api/docs/models/gpt-6-astra) als Modell für besonders schwierige End-to-End-Aufgaben. Anthropic positioniert [Claude Fable 5.1](https://platform.claude.com/docs/de/models/fable-5-1/overview) für anspruchsvolles Reasoning und lang laufende Agentenarbeit. Damit sind beide plausible Kandidaten für komplexe Planung, Implementierung oder Review.

Das macht sie nicht zur Pflichtbesetzung jeder Rolle. Ein kleiner, klar formulierter Prüfauftrag kann mit einem günstigeren verfügbaren Modell ausreichen. Entscheidend sind echte Aufgaben, dieselben Kriterien und gemessene Resultate. Preise und Benchmarkwerte von Fable 5.1 stehen in meiner [separaten Einordnung](/blog/claude-fable-5-1-preis-benchmarks); dieser Artikel bewertet bewusst den Workflow statt eine Rangliste.

## Fazit: Der zweite Agent ist ein Prüfer, kein Orakel

Die Kombination aus Claude Code und Codex wird dann interessant, wenn sie Verantwortlichkeiten trennt. Ein Agent koordiniert, einer baut, der andere prüft mit begrenzten Rechten. Tests und menschliche Entscheidungen schließen den Kreis.

Der eigentliche Gewinn ist nicht „doppelte KI“. Es ist eine nachvollziehbare Übergabe zwischen zwei Perspektiven. Mit festem Plan, festem Ausgangspunkt, harten Belegen und wenigen Runden kann daraus eine sinnvolle Qualitätsstufe werden. Ohne diese Grenzen verdoppelst du vor allem Kontext, Kosten und Chaos.

## Primärquellen und Stand

Stand dieser Einordnung ist der **8. September 2026**:

- [OpenAI: Codex im nicht interaktiven Modus](https://developers.openai.com/codex/noninteractive)
- [OpenAI: Sandboxing und Berechtigungen in Codex](https://developers.openai.com/codex/security)
- [OpenAI: GPT-6 Astra Modelldokumentation](https://developers.openai.com/api/docs/models/gpt-6-astra)
- [Anthropic: Claude Code programmgesteuert ausführen](https://code.claude.com/docs/en/headless)
- [Anthropic: Claude Code CLI-Referenz](https://code.claude.com/docs/en/cli-reference)
- [Anthropic: Claude Fable 5.1 Modelldokumentation](https://platform.claude.com/docs/de/models/fable-5-1/overview)
- [EMNLP 2025: Self-Preference Bias bei LLM-Bewertungen](https://aclanthology.org/2025.emnlp-main.86/)
