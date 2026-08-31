# Bildprompt-Masterseite und Use Cases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die Bildprompt-Masterseite zeigt sofort sechs repräsentative Ergebnisse, erklärt drei echte Folgeanwendungen mit fertigen Assets und verwendet global kompaktere Prompt-Boxen.

**Architecture:** Die bestehende Markdown-Seite bleibt die kanonische Inhaltsquelle. Vorhandene Serienbilder werden für das Einstiegsraster wiederverwendet; drei neue WebP-Dateien bilden die Endanwendungen ab. Die bereits funktionierende Progressive-Enhancement-Logik für Prompt-Aktionen bleibt unverändert, nur ihre globale CSS-Darstellung in `BlogLayout.svelte` wird verdichtet.

**Tech Stack:** SvelteKit 2, Svelte 5, mdsvex/Markdown, CSS, Node-Test-Runner, Sharp oder gleichwertige verlustarme Bildkonvertierung, Vercel.

## Global Constraints

- Im isolierten Worktree `D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-ki-slash-20260830` arbeiten; den schmutzigen Ursprungs-Checkout nicht verändern.
- Titel, Slug, Datum, Draft-Status, Hero-Bild und alle sechs Detailartikel unverändert lassen.
- Nur vorhandenes Porträtmaterial als Personenreferenz verwenden; keine Logos, Wasserzeichen, erfundenen Zitate oder Videoquellen einbauen.
- Öffentliche Texte in direktem, einfachem Deutsch ohne internen Namen `Pollo` und ohne Em-Dash schreiben.
- Veröffentlichung erst nach lokalem Test, Bildprüfung, Browserprüfung und Drift-Check von `origin/main`.

---

### Task 1: Kompakte Prompt-Box als überprüfbare CSS-Änderung

**Files:**

- Modify: `src/lib/components/layout/BlogLayout.svelte`
- Modify: `src/lib/utils/prompt-actions.test.js`

- [ ] Einen zunächst fehlschlagenden Quelltest ergänzen, der die kompakten Invarianten prüft: 32-Pixel-Buttons, höchstens 0,72-Rem-Buttontext, kleineres Code-Padding und ein Statusbereich ohne dauerhaft reservierte Leerhöhe.

```js
test('prompt block uses the compact presentation contract', async () => {
	const source = await readFile(new URL('../components/layout/BlogLayout.svelte', import.meta.url), 'utf8');
	assert.match(source, /min-height:\s*2rem/);
	assert.match(source, /font-size:\s*0\.72rem/);
	assert.match(source, /\.prompt-status:empty/);
});
```

- [ ] Den fokussierten Test ausführen und das erwartete FAIL wegen der bisherigen großen Werte bestätigen.

Run: `node --test src/lib/utils/prompt-actions.test.js`

Expected: Der neue Compact-CSS-Test schlägt fehl, die vorhandenen fünf Funktionsprüfungen bleiben grün.

- [ ] In `BlogLayout.svelte` ausschließlich die Darstellung verdichten:

```css
:global(.prompt-block) { margin: 1.25rem 0; border-radius: 0.75rem; box-shadow: 0 0.5rem 1.5rem hsl(0 0% 0% / 0.12); }
:global(.prompt-toolbar) { gap: 0.5rem; padding: 0.5rem 0.625rem; }
:global(.prompt-actions) { gap: 0.375rem; }
:global(.prose .prompt-action) { min-height: 2rem; padding: 0.35rem 0.55rem; font-size: 0.72rem; }
:global(.prompt-block pre code) { padding: 0.75rem 0.875rem; font-size: 0.88rem; line-height: 1.55; }
:global(.prompt-status) { min-height: 0; padding: 0.3rem 0.625rem 0.45rem; }
:global(.prompt-status:empty) { display: none; }
```

- [ ] Den fokussierten Test erneut ausführen.

Run: `node --test src/lib/utils/prompt-actions.test.js`

Expected: Alle Tests PASS.

- [ ] Änderung prüfen und als eigenen Commit sichern.

Run: `git diff --check && git diff -- src/lib/components/layout/BlogLayout.svelte src/lib/utils/prompt-actions.test.js`

Commit: `git commit -am "style: Prompt-Aktionen kompakter darstellen"`

### Task 2: Drei konkrete Endanwendungen als WebP bauen

**Files:**

- Read: `static/images/blog/ki-bildprompts/00-ausgangsbild.webp`
- Read: `static/images/blog/ki-bildprompts/04-action-poses.webp`
- Read: `static/images/blog/ki-bildprompts/15-avatar-pack.webp`
- Read: `static/images/blog/ki-bildprompts/01-turnaround.webp`
- Read: `static/images/blog/ki-bildprompts/03-pose-pack.webp`
- Read: `static/images/blog/ki-bildprompts/06-emotion-grid.webp`
- Create: `static/images/blog/ki-bildprompts/usecase-youtube-thumbnail.webp`
- Create: `static/images/blog/ki-bildprompts/usecase-profilbild.webp`
- Create: `static/images/blog/ki-bildprompts/usecase-ki-video-referenz.webp`

- [ ] Alle sechs Referenzbilder vor Bearbeitung visuell prüfen.

- [ ] Ein kontrastreiches 16:9-Thumbnail aus der Zeigegeste erstellen. Die Person bleibt eindeutig dieselbe, und die finale Typografie lautet exakt `1 FOTO. 1 WORT.`.

- [ ] Aus der frontalsten Avatar-Variante ein quadratisches Profilbild mit ruhigem Hintergrund und genügend Rand erstellen.

- [ ] Das 16:9-Video-Referenzboard deterministisch aus Turnaround, Posepack und Emotionsraster zusammensetzen, damit keine neue Gesichtsvariante entsteht.

- [ ] Alle drei Dateien als WebP speichern und Abmessungen sowie Dateigröße prüfen.

Run: `Get-Item static/images/blog/ki-bildprompts/usecase-*.webp | Select-Object Name,Length`

Expected: Drei nichtleere Dateien; Thumbnail und Referenzboard 16:9, Profilbild 1:1.

- [ ] Alle drei finalen Bilder einzeln visuell auf Gesicht, Hände, Schrift, Rand, Artefakte, Logos und Wasserzeichen prüfen.

- [ ] Nur die drei neuen Binärdateien committen.

Commit: `git add static/images/blog/ki-bildprompts/usecase-*.webp && git commit -m "assets: Bildprompt-Use-Cases ergänzen"`

### Task 3: Masterseite um sichtbaren Überblick und Pipeline-Beispiele erweitern

**Files:**

- Modify: `src/content/blog/50-bildprompts-echt-getestet.md`
- Create: `src/content/blog/50-bildprompts-echt-getestet.test.js`

- [ ] Zunächst einen fehlschlagenden Inhaltsvertrag anlegen, der sechs Karten, drei neue Assets, die sechs Zielrouten und drei Folgeprompt-Blöcke prüft.

```js
for (const asset of expectedUseCaseAssets) assert.match(article, new RegExp(asset));
for (const route of expectedDetailRoutes) assert.match(article, new RegExp(route));
assert.match(article, /Vom Mini-Prompt zum fertigen Asset/);
```

- [ ] Test ausführen und erwartetes FAIL bestätigen.

Run: `node --test src/content/blog/50-bildprompts-echt-getestet.test.js`

Expected: FAIL, weil Raster, Überschrift und neue Assets noch fehlen.

- [ ] Direkt nach dem Ausgangsporträt ein semantisches, responsives Sechs-Karten-Raster ergänzen. Jede Karte enthält vorhandenes Bild, kurze Beschriftung und Link zum zugehörigen Detailartikel.

- [ ] `Fünf konkrete Use Cases` durch `Vom Mini-Prompt zum fertigen Asset` ersetzen. Für Thumbnail, Profilbild und KI-Video-Referenz jeweils Ausgangsmaterial, Endergebnis, Zweck, Auswahlprinzip und kopierbaren Folgeprompt beschreiben.

- [ ] Die Aussagen klar begrenzen: Ein Raster ist eine Auswahlhilfe; Identitätskonsistenz ist nicht garantiert; KI-Video benötigt ein Modell mit Bildreferenz-Unterstützung.

- [ ] Modeberatung und technische Produktgrafik als zwei kurze weitere Anwendungsideen erhalten.

- [ ] Inhaltsvertrag erneut ausführen.

Run: `node --test src/content/blog/50-bildprompts-echt-getestet.test.js`

Expected: PASS.

- [ ] Sprach- und Scope-Prüfung ausführen.

Run: `rg -n "Pollo|YouTube-Video|KmgmNGkvXaQ|—" src/content/blog/50-bildprompts-echt-getestet.md`

Expected: Keine Treffer.

- [ ] Artikel und Test committen.

Commit: `git add src/content/blog/50-bildprompts-echt-getestet.md src/content/blog/50-bildprompts-echt-getestet.test.js && git commit -m "content: Bildprompt-Pipeline mit Use Cases zeigen"`

### Task 4: Lokale Funktions- und Browserprüfung

**Files:**

- Verify: `src/content/blog/50-bildprompts-echt-getestet.md`
- Verify: `src/lib/components/layout/BlogLayout.svelte`
- Verify: `static/images/blog/ki-bildprompts/usecase-*.webp`

- [ ] Beide fokussierten Tests gemeinsam ausführen.

Run: `node --test src/lib/utils/prompt-actions.test.js src/content/blog/50-bildprompts-echt-getestet.test.js`

Expected: Alle Tests PASS.

- [ ] Svelte-Prüfung ausführen und nur neue Fehler als Blocker behandeln; bekannte Baseline-Probleme getrennt dokumentieren.

Run: `npm run check`

- [ ] Produktionsbuild ausführen. Den bekannten Windows-EPERM-Symlinkfehler erst nach erfolgreicher Inhalts-, Client- und Server-Kompilierung als Umgebungsgrenze einordnen.

Run: `npm run build`

- [ ] Lokalen Preview-Server starten und Masterseite in Desktop- sowie Mobile-Breite prüfen.

Browser assertions:

```text
- sechs Übersichtskarten sichtbar und korrekt verlinkt
- drei Endanwendungen vollständig geladen
- Copy-Klick zeigt "Prompt kopiert."
- ChatGPT- und Claude-Ziele unverändert
- Prompt-Buttonhöhe 32 px
- leerer Statusbereich belegt 0 px
- kein horizontaler Overflow bei 390 px und Desktopbreite
- keine neuen Console-Errors oder 404s
```

- [ ] `git diff --check`, `git status --short` und Commit-Scope prüfen.

### Task 5: Main-Drift prüfen, veröffentlichen und live verifizieren

**Files:**

- Update after success: `D:\UserData\ObsidianVault\LifeOS-Pollo\01-projects\trmt\TRMT.md`

- [ ] Remote-Stand frisch holen und sicherstellen, dass der Branch ohne fremde Änderungen auf aktuellem `origin/main` basiert.

Run: `git fetch origin && git merge-base --is-ancestor origin/main HEAD`

Expected: Exit 0. Bei Drift erst sauber rebasen und Task 4 wiederholen.

- [ ] Nur den geprüften Branch auf `main` veröffentlichen.

Run: `git push origin HEAD:main`

- [ ] GitHub-Actions- und Vercel-Deployment bis zum eindeutigen Erfolg beobachten.

- [ ] Live-Masterseite und alle drei neuen Asset-URLs mit Cache-Bypass prüfen; Copy-Status, externe Ziele, Links, Mobile-Overflow und Console erneut kontrollieren.

- [ ] Den tatsächlichen Commit, Deployment-Status und die Live-URL als knappen dauerhaften Handoff in `TRMT.md` ergänzen.

- [ ] Abschließend nur belegte PASS-, Teilstatus- oder Blocker-Aussagen melden.
