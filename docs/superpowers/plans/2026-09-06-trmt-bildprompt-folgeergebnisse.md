# TRMT Bildprompt-Folgeergebnisse Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ergänze die 86 nummerierten TRMT-Kurzprompt-Tests um universelle, erklärte und mit einem echten Ergebnis belegte zweite Prompt-Schritte.

**Architecture:** Die zwölf bestehenden Markdown-Artikel bleiben die öffentliche Oberfläche. Ein neuer Node-Test liest sie gemeinsam mit `image-prompts.json`, ordnet die Einträge über Nummer und Bild-ID zu und erzwingt den Zwei-Schritt-Vertrag sowie vorhandene Folge-WebPs. Die Bilder werden nicht ersetzt, sondern als nummerierte Geschwister unter `static/images/blog/ki-bildprompts/followups/` ergänzt.

**Tech Stack:** SvelteKit, mdsvex, Node Test Runner, WebP, integrierte Bildgenerierung.

## Global Constraints

- Bearbeite ausschließlich die isolierte Arbeitskopie `D:/AI_Workspaces/Claude_Code/.release-worktrees/trmt-image-prompt-followups-20260906`.
- Kein Commit, Push, Deployment oder Veröffentlichung ohne gesonderten Auftrag.
- Alte Kurzprompt-Ergebnisse bleiben bytegenau unangetastet.
- Öffentliche Vorlagen bleiben universell; konkrete Demo-Werte werden separat kenntlich gemacht.
- Ein Bild wird erst nach visueller Prüfung als Folgeergebnis referenziert.

---

### Task 1: Vertrag als RED-Test festhalten

**Files:**
- Create: `src/content/blog/image-prompt-followups.test.js`

- [ ] Teste exakt 86 nummerierte Einträge in den zwölf Detailartikeln.
- [ ] Fordere pro Eintrag Zweckbeschreibung, Eingabehinweis, kopierbare Vorlage und Folgeergebnis-Pfad.
- [ ] Verbiete feste Testporträt-Merkmale in den ausführlichen Vorlagen.
- [ ] Fordere vorhandene lesbare WebP-Dateien und den entfernten Acht-Sekunden-Prompt.
- [ ] Führe den Test aus und bestätige RED wegen der noch fehlenden Struktur und Assets.

### Task 2: Folgeprompt-Inventar und Artikelstruktur

**Files:**
- Modify: zwölf nummerierte Detailartikel unter `src/content/blog/`
- Modify: `src/lib/data/image-prompts.json` nur wenn die neue Zuordnung dort ohne UI-Drift sinnvoll zentralisiert werden kann.

- [ ] Ordne jedem nummerierten Eintrag genau einen primären zweiten Bildauftrag zu; zusätzliche Auswahlbeispiele bleiben erklärende Unterfälle.
- [ ] Ergänze Zweck, nötige Eingaben und universelle Vorlage.
- [ ] Ersetze feste Portraitmerkmale durch Referenzrollen und eindeutige Platzhalter.
- [ ] Entferne ausschließlich den finalen Acht-Sekunden-Bewegungsprompt; Titel, SEO-Titel und Slug bleiben bestehen.
- [ ] Führe den RED-Test erneut aus; übrig bleiben ausschließlich fehlende Folge-WebPs.

### Task 3: Folgeergebnisse artikelweise erzeugen und prüfen

**Files:**
- Create: `static/images/blog/ki-bildprompts/followups/01-...-followup.webp` bis `86-...-followup.webp`
- Modify: die jeweils zugehörigen Artikel für Alt-Text und Ergebnisbeobachtung.

- [ ] Arbeite artikelweise in zwölf Wellen, beginnend mit `bildprompts-comics-retro.md` wegen der bestätigten Probleme bei 64 und 66.
- [ ] Lade pro Eintrag nur die im Artikel genannten Eingaben und kennzeichne ihre Rollen im Generierungsprompt.
- [ ] Prüfe jeden Output visuell; korrigiere bei Bedarf nur die verletzte Anforderung.
- [ ] Konvertiere das ausgewählte Ergebnis nicht-destruktiv zu WebP und speichere es im Projekt.
- [ ] Ergänze Bildbeleg, Alt-Text und eine ehrliche Ergebnisbeobachtung.
- [ ] Führe nach jeder Artikelwelle den gezielten Vertragstest aus.

### Task 4: Bildmetadaten und Gesamtverifikation

**Files:**
- Regenerate: `src/lib/data/image-metadata.generated.js`
- Regenerate: `src/lib/data/blog-image-usage.generated.js`

- [ ] Führe `npm run images:metadata` aus.
- [ ] Führe `node --test src/content/blog/image-prompt-followups.test.js` aus.
- [ ] Führe `node --test` aus und erwarte null Fehlschläge.
- [ ] Führe `npm run check` aus und vergleiche etwaige Altfehler mit der Baseline.
- [ ] Führe `npm run build` aus und trenne bekannte Windows-Adapterprobleme von Featurefehlern.
- [ ] Prüfe `git diff --check` und den exakten Dateiumfang.
- [ ] Rendere die zwölf Artikel lokal und prüfe repräsentativ Desktop und Mobil auf Lesefluss, Bildgrößen und horizontalen Überlauf.
- [ ] Lege einen QA-Bericht unter `docs/verification/` ab; nichts veröffentlichen.
