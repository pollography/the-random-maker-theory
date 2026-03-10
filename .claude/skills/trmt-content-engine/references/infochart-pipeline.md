# Infochart Pipeline — Prompt-Templates

Workflow zur Erstellung von Chalk-on-Blackboard Infocharts via NotebookLM oder Gemini Pro.

## Master-Prompt-Struktur

Jeder Prompt besteht aus 5 Pflicht-Bloecken:

### Block 1: Style-Header (IMMER identisch)
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a).
Hand-drawn wobbly lines, sketch aesthetic.
16:9 aspect ratio.
```

### Block 2: Topic-Zeile
```
Topic: [Titel/Thema des Infocharts]
```

### Block 3: Inhaltsbeschreibung
Detaillierte Beschreibung: Welche Elemente, Texte, Anordnung.
Farbangaben IMMER mit Hex-Codes:
- Amber fuer Titel/Headlines: `#d4893e`
- Teal fuer Akzente: `#3ab0a2`
- Weiss fuer normalen Text: `"in white chalk"`

### Block 4: Icon-Beschreibungen
Fuer jedes Element ein einfaches, hand-drawn Icon benennen:
```
Each has a hand-drawn icon: code brackets for v0,
lightning bolt for Bolt, heart for Lovable.
```

### Block 5: Anti-Foto-Clause (IMMER identisch)
```
No photographs, only hand-drawn chalk sketches.
```

## Diagramm-Typen + Templates

### 1. Vergleichstabelle (Comparison Grid)
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a). Hand-drawn wobbly lines, sketch aesthetic. 16:9 aspect ratio.

Topic: [PRODUKT A] vs [PRODUKT B] vs [PRODUKT C] Comparison.

Draw a chalk-style comparison grid with [N] columns.
Headers in amber (#d4893e): "[A]", "[B]", "[C]".
Each has a hand-drawn icon: [icon for A], [icon for B], [icon for C].
Rows: [Feature 1] ([A value]/[B value]/[C value]),
[Feature 2] ([A value]/[B value]/[C value]),
[Feature 3] ([A value]/[B value]/[C value]).
Highlight "[WINNER]" column with teal (#3ab0a2) border labeled "[LABEL]".
Bottom: "[TAGLINE]" in white chalk.

No photographs, only hand-drawn chalk sketches.
```

### 2. Flowchart / Entscheidungsbaum
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a). Hand-drawn wobbly lines, sketch aesthetic. 16:9 aspect ratio.

Topic: [ENTSCHEIDUNG]?

Draw a chalk-style decision flowchart.
Start node: "[FRAGE]?" in amber (#d4893e).
Branch 1: "[OPTION 1]" arrow to "[ERGEBNIS 1]" in teal (#3ab0a2).
Branch 2: "[OPTION 2]" arrow to "[ERGEBNIS 2]" in amber.
Branch 3: "[OPTION 3]" arrow to "[ERGEBNIS 3]" in teal.
Each endpoint has a small hand-drawn icon.
Title: "[TITEL]" in amber at top.
Arrows are hand-drawn with slight wobble.

No photographs, only hand-drawn chalk sketches.
```

### 3. Balkendiagramm (Stepped Bars)
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a). Hand-drawn wobbly lines, sketch aesthetic. 16:9 aspect ratio.

Topic: [VERGLEICHS-THEMA].

Draw a chalk-style stepped bar chart.
Title: "[TITEL]" in amber (#d4893e).
Horizontal bars, tallest at top:
- [ITEM 1]: [WERT] bar in amber (#d4893e), label: "[LABEL]"
- [ITEM 2]: [WERT] bar in amber, label: "[LABEL]"
- [ITEM 3]: [WERT] bar in teal (#3ab0a2), label: "[LABEL]"
Y-axis: [KATEGORIE]. X-axis: [EINHEIT].
Draw a dashed line at [SCHWELLWERT] labeled "[ERKLAERUNG]".

No photographs, only hand-drawn chalk sketches.
```

### 4. Workflow-Diagramm (Horizontal Flow)
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a). Hand-drawn wobbly lines, sketch aesthetic. 16:9 aspect ratio.

Topic: [WORKFLOW-TITEL].

Draw a chalk-style horizontal workflow with [N] connected nodes.
Each node is a hand-drawn rounded rectangle.
Node 1 (amber #d4893e): "[SCHRITT 1]" with [ICON] icon.
Arrow to Node 2 (white): "[SCHRITT 2]" with [ICON] icon.
Arrow to Node 3 (teal #3ab0a2): "[SCHRITT 3]" with [ICON] icon.
Below each node: "[LABEL 1]", "[LABEL 2]", "[LABEL 3]".
Title: "[TITEL]" in amber at top.

No photographs, only hand-drawn chalk sketches.
```

### 5. Timeline / Zeitachse
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a). Hand-drawn wobbly lines, sketch aesthetic. 16:9 aspect ratio.

Topic: [TIMELINE-THEMA].

Draw a chalk-style horizontal timeline.
[N] milestones connected by a hand-drawn line.
Milestone 1 (amber #d4893e): "[DATUM/EVENT 1]"
Milestone 2 (white): "[DATUM/EVENT 2]"
Milestone 3 (teal #3ab0a2): "[DATUM/EVENT 3]"
Title: "[TITEL]" in amber at top.

No photographs, only hand-drawn chalk sketches.
```

### 6. Kostenvergleich (Liniendiagramm)
```
Generate a hand-drawn infographic image in chalk-on-blackboard style.
Dark charcoal background (#1a1a1a). Hand-drawn wobbly lines, sketch aesthetic. 16:9 aspect ratio.

Topic: [KOSTENVERGLEICH-THEMA].

Draw a chalk-style line graph.
X-axis: [ZEITRAUM]. Y-axis: [EINHEIT].
Line 1 (amber #d4893e): "[OPTION A]" [VERLAUF], labeled "[KOSTEN A]".
Line 2 (teal #3ab0a2): "[OPTION B]" [VERLAUF], labeled "[KOSTEN B]".
Lines cross at [PUNKT], marked with chalk circle: "[LABEL]".
Title: "[TITEL]" in amber at top.

No photographs, only hand-drawn chalk sketches.
```

## Wann welchen Typ verwenden

| Situation im Artikel | Diagramm-Typ |
|---|---|
| Tool/Produkt-Vergleiche, Feature-Grids | Vergleichstabelle |
| Entscheidungshilfen, "Welches Tool fuer...?" | Flowchart |
| Mengenvergleiche, Rankings, Specs | Balkendiagramm |
| Prozessschritte, Automationen, Pipelines | Workflow-Diagramm |
| Chronologische Ablaeufe, Roadmaps | Timeline |
| Finanzielle Vergleiche, Kosten ueber Zeit | Kostenvergleich |

## Tipps fuer beste Ergebnisse

1. **Maximal 5-7 Hauptelemente** pro Infochart
2. **Texte kurz halten** — lieber 3 lesbare Woerter als 30 abgeschnittene
3. **Prompts immer auf Englisch**, deutsche Texte in Anfuehrungszeichen
4. **Umlaute vermeiden** im Bild-Text: "fuer" statt "fuer"
5. **Layout explizit beschreiben:** "at top", "on the left", "bottom center"
6. **Parallelisierung:** Bis zu 3 Bilder gleichzeitig generieren
