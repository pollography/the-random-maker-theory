# TRMT Bildprompt-Gegenversuche und Library-Paare Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trenne 86 Ein-Wort-Tests sauber von unabhängigen kontrollierten Gegenversuchen, ersetze die falsche Farbanalyse, ergänze den Frisuren-Bonus und mache beide Promptvarianten direkt in der Library vergleichbar.

**Architecture:** Die zwölf Markdown-Artikel erklären den Versuchsaufbau und enthalten je Eintrag die kontrollierte Vorlage als zweiten Promptblock. `src/lib/data/image-prompts.json` erweitert die 86 zugehörigen Kurzprompt-Datensätze um das gleiche Prompt-Bild-Paar. `PromptCard.svelte` verwaltet die lokale A/B-Auswahl und übergibt die aktive Bildvariante an die vorhandene Lightbox.

**Tech Stack:** SvelteKit, Svelte 5, mdsvex, JSON, Node Test Runner, WebP, integrierte Bildgenerierung.

## Global Constraints

- Arbeite ausschließlich in `D:/AI_Workspaces/Claude_Code/.release-worktrees/trmt-image-prompt-followups-20260906` auf `codex/trmt-image-prompt-comparison-fix-20260907`.
- Alte Ein-Wort-Ergebnisbilder nicht verändern.
- Nur echte, separat betitelte Weiterarbeitsprompts dürfen ein generiertes Ergebnis referenzieren.
- `src/lib/data/image-prompts.json` bleibt die kanonische Library-Quelle.
- Erst nach frischer Gesamt- und Live-Prüfung nach `main` veröffentlichen.

---

### Task 1: Neuen Promptvertrag als RED-Test festhalten

**Files:**
- Modify: `src/content/blog/image-prompt-followups.test.js`
- Modify: `src/lib/utils/prompt-library.test.js`
- Modify: `src/lib/components/prompt-library/prompt-library-component.test.js`

- [ ] Fordere in allen zwölf Artikeln die sichtbare Neuer-Chat-Regel.
- [ ] Benenne den zweiten Schritt als kontrollierten Gegenversuch statt als unklaren zweiten Prompt.
- [ ] Verbiete `Bild 2` und andere Ergebnisreferenzen im zweiten Promptblock aller 86 Einträge.
- [ ] Erlaube Ergebnisreferenzen nur in separat betitelten Weiterarbeitsabschnitten.
- [ ] Fordere bei Farbanalyse echte textliche Analyse plus angewandten Farbvergleich.
- [ ] Fordere den zusätzlichen femininen 3x3-Frisuren-Bonus mit eigenem Bild.
- [ ] Fordere exakt 86 gepaarte Kurzprompt-Datensätze sowie A/B- und Copy-Controls in der Library.
- [ ] Run: `node --test src/content/blog/image-prompt-followups.test.js src/lib/utils/prompt-library.test.js src/lib/components/prompt-library/prompt-library-component.test.js`
- [ ] Confirm: RED wegen der noch fehlenden neuen Struktur.

### Task 2: Artikel und 86 Gegenprompts unabhängig machen

**Files:**
- Modify: die zwölf nummerierten Bildprompt-Artikel unter `src/content/blog/`

- [ ] Ergänze pro Artikel den fairen Vergleichshinweis mit neuem Chat und ausschließlich Originalmaterial.
- [ ] Ersetze `Was der zweite Prompt macht` durch eine eindeutige Gegenversuch-Bezeichnung.
- [ ] Prüfe jeden zweiten Promptblock und beschreibe benötigtes Layout, Stil und Ziel vollständig ohne Kurzprompt-Ergebnis.
- [ ] Trenne echte Auswahl-, Korrektur- und Weiterverarbeitungsprompts unter `Mit dem Ergebnis weiterarbeiten` ab.
- [ ] Entferne insbesondere alle CoverPack-Negativreferenzen.
- [ ] Run: `node --test src/content/blog/image-prompt-followups.test.js`
- [ ] Confirm: Artikelvertrag grün bis auf noch fehlende neue Bild-/Library-Felder.

### Task 3: Farbanalyse ersetzen und Frisuren-Bonus erzeugen

**Files:**
- Modify: `src/content/blog/bildprompts-portraet-verbessern.md`
- Replace: `static/images/blog/ki-bildprompts/followups/76-color-analysis-applied-followup.webp`
- Create: `static/images/blog/ki-bildprompts/followups/77-hairstyle-grid-feminine-bonus.webp`

- [ ] Prüfe `00-ausgangsbild.webp` visuell und nutze es als einzige Personenreferenz.
- [ ] Formuliere die Farbanalyse mit Eignungsprüfung, Unsicherheitsgrenze, schriftlicher Empfehlung und sichtbar angewandten Farben.
- [ ] Erzeuge und prüfe ein neues Farbanalyse-Ergebnis; ersetze das alte Bild erst nach Zieltreueprüfung.
- [ ] Formuliere einen respektvoll-spielerischen Prompt für neun deutlich unterschiedliche feminine Frisuren.
- [ ] Erzeuge und prüfe das 3x3-Bonusbild auf Identität, konstante übrige Merkmale und klare Frisurunterschiede.
- [ ] Ergänze ehrliche Bildunterschriften und Grenzen.

### Task 4: A/B-Paare in die Library integrieren

**Files:**
- Modify: `src/lib/data/image-prompts.json`
- Modify: `src/lib/utils/prompt-library.js`
- Modify: `src/lib/components/prompt-library/PromptCard.svelte`
- Modify: `src/lib/components/prompt-library/PromptLibrary.svelte` falls für aktive Vorschauen nötig
- Modify: zugehörige Tests

- [ ] Übertrage für genau 86 Kurzprompt-Einträge kontrollierten Prompt, Kontrollbild und Alt-Text.
- [ ] Lasse `/expressions` sowie die 60 vorhandenen Detailed-Einträge unverändert einspurig.
- [ ] Ergänze pro gepaarter Karte die direkt sichtbare Umschaltung `Ein-Wort-Test` / `Kontrollierte Vorlage`.
- [ ] Kopiere und öffne immer die aktuell gewählte Variante; die Lightbox zeigt dasselbe aktive Bild.
- [ ] Nimm kontrollierte Prompttexte in die Suche auf und erhalte bestehende Filter/Counts.
- [ ] Run: `node --test src/lib/utils/prompt-library.test.js src/lib/components/prompt-library/prompt-library-component.test.js`
- [ ] Confirm: genau 147 Ideen, davon 86 A/B-Paare, ohne Regression der 60 Detailed-Einträge.

### Task 5: Metadaten, Gesamt-QA und Veröffentlichung

**Files:**
- Regenerate: `src/lib/data/image-metadata.generated.js`
- Regenerate: `src/lib/data/blog-image-usage.generated.js`
- Create: `docs/verification/2026-09-07-trmt-bildprompt-gegenversuche-library.md`

- [ ] Run: `npm run images:metadata`.
- [ ] Run: `node --test` und erwarte null Fehlschläge.
- [ ] Run: `npm run check` und erwarte null Fehler.
- [ ] Run: `npm run build` und erwarte erfolgreichen Produktions-Build.
- [ ] Run: `git diff --check` und prüfe den exakten Dateiumfang.
- [ ] Prüfe Farbanalyse-Artikel, Frisuren-Bonus und Library A/B auf Desktop und Mobil inklusive Kopieren, Lightbox, Tastatur und horizontalem Überlauf.
- [ ] Dokumentiere Prüfbelege und bekannte Modellgrenzen im QA-Bericht.
- [ ] Committe nur die beabsichtigten Dateien, integriere einen inzwischen vorgerückten `origin/main` ohne Force-Push und wiederhole die relevante Verifikation.
- [ ] Pushe nach `main`, warte auf das Produktions-Deployment und prüfe die Live-Seiten zurück.
- [ ] Ergänze den verifizierten Release knapp in der kanonischen TRMT-Obsidian-Projektnotiz.
