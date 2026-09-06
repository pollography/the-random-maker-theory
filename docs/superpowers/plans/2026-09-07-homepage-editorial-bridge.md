# Homepage Editorial Bridge Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Den Abschnitt `Worum geht es hier?` als visuell integrierte Editorial Bridge gestalten und den unruhigen Leerraum vor dem Videomodul beseitigen.

**Architecture:** Die bestehende Homepage-Struktur und Datenlogik bleiben unverändert. Nur das Markup des Orientierungstextes und seine lokale CSS-Struktur in `src/routes/+page.svelte` werden hierarchisch gegliedert; vorhandene Themenlinks und Media-Lazy-Loading bleiben unangetastet.

**Tech Stack:** Svelte 5, SvelteKit, komponentenlokales CSS, Node-Test-Runner, Vite/Vercel.

## Global Constraints

- Kein weiterer schwerer Kartencontainer.
- Aufmacher exakt `Hier wird Neugier praktisch.` und Überschrift exakt `Worum geht es hier?`.
- Vor einem Play-Klick keine YouTube- oder Spotify-Iframes.
- Desktop zweispaltig; Mobil gestapelt und ohne globalen horizontalen Overflow.
- Abstand zwischen Editorial Bridge und Videomodul ungefähr 28 bis 32 Pixel.

---

### Task 1: Editorial Bridge implementieren

**Files:**
- Modify: `src/routes/+page.svelte:142-148,220-248,262-281`
- Test: `src/routes/homepage-hybrid.test.js`
- Test: `src/routes/homepage-ia.test.js`

**Interfaces:**
- Consumes: bestehende CSS-Tokens und die fünf vorhandenen Tag-Links.
- Produces: `.context-heading`, `.context-eyebrow`, `.context-copy` und `.context-note` innerhalb von `.homepage-context`.

- [ ] **Step 1: Failing regression tests schreiben**

```js
assert.match(page, /class="context-eyebrow">Hier wird Neugier praktisch\.<\/p>/);
assert.match(page, /class="context-heading"/);
assert.match(page, /class="context-copy"/);
assert.match(page, /class="context-note"/);
assert.match(page, /\.homepage-context\s*\{[^}]*display:\s*grid[^}]*background:/s);
assert.match(page, /\.posts-section\s*\{[^}]*padding-bottom:\s*0/s);
```

- [ ] **Step 2: RED-Lauf bestätigen**

Run: `node --test src/routes/homepage-hybrid.test.js src/routes/homepage-ia.test.js src/routes/homepage-media.test.js`

Expected: FAIL, weil Aufmacher, Strukturklassen, Bridge-Hintergrund und Spacing-Override noch fehlen.

- [ ] **Step 3: Markup und responsive Bridge-CSS minimal implementieren**

```svelte
<div class="homepage-context">
	<div class="context-heading">
		<p class="context-eyebrow">Hier wird Neugier praktisch.</p>
		<h2 class="context-title">Worum geht es hier?</h2>
	</div>
	<div class="context-copy">
		<p>TRMT bündelt praktische Artikel, nachvollziehbare Anleitungen und persönliche Einordnungen rund um KI-Tools, Tech und digitale Workflows. In Maker &amp; DIY geht es um ESP32, 3D-Druck und Smart Home; bei Automatisierung um n8n, Skripte und verbundene Tools. Fotografie bündelt Bildbearbeitung, KI-Workflows und Technik aus der Praxis. Unter Produktivität findest du Systeme für Wissen, Fokus und digitale Ordnung.</p>
		<p class="context-note">Wähle ein Thema oder spring direkt ins vollständige Blogarchiv. Alle Beiträge bleiben frei zugänglich – ohne Anmeldung.</p>
	</div>
</div>
```

Die lokale CSS-Struktur verwendet ein Zweispalten-Grid, eine feine Trennlinie, einen Petrol-zu-Honig-Verlauf und einen mobilen Breakpoint, der auf eine Spalte wechselt. `.posts-section` erhält `padding-bottom: 0`; `.bottom-sections` behält ungefähr 28 Pixel oberen Abstand.

- [ ] **Step 4: GREEN-Lauf bestätigen**

Run: `node --test src/routes/homepage-hybrid.test.js src/routes/homepage-ia.test.js src/routes/homepage-media.test.js`

Expected: alle fokussierten Tests PASS.

- [ ] **Step 5: UI-Änderung committen**

```bash
git add src/routes/+page.svelte src/routes/homepage-hybrid.test.js src/routes/homepage-ia.test.js
git commit -m "fix: integrate homepage editorial bridge"
```

### Task 2: Qualität prüfen und veröffentlichen

**Files:**
- Verify: `src/routes/+page.svelte`
- Verify: gesamtes Repository

**Interfaces:**
- Consumes: fertige Editorial Bridge aus Task 1.
- Produces: verifizierter Produktionsstand auf `main`.

- [ ] **Step 1: Mechanischen Design-Scan ausführen**

Run: `node C:\Users\Pollo\.agents\skills\impeccable\scripts\detect.mjs --json --scope layout src/routes/+page.svelte`

Expected: keine ungeklärten neuen Layout-Verstöße.

- [ ] **Step 2: Gesamttests und Build ausführen**

Run: `node --test`

Expected: 143 oder mehr Tests, 0 Fehler.

Run: `npm run build`

Expected: Exit-Code 0.

- [ ] **Step 3: Desktop und Mobil in einem visuellen Pass prüfen**

Expected: klare Links-rechts-Hierarchie auf Desktop, natürliche Stapelung auf Mobil, kein globaler Overflow, 28 bis 32 Pixel Abstand zum Video und 0 externe Iframes vor Play.

- [ ] **Step 4: Branch pushen, PR erstellen und nach grüner Vorschau normal mergen**

```powershell
git push -u origin codex/trmt-homepage-editorial-bridge-20260907
gh pr create --base main --head codex/trmt-homepage-editorial-bridge-20260907
$prNumber = gh pr view --json number --jq .number
gh pr merge $prNumber --merge
```

- [ ] **Step 5: Produktionsdeployment und Live-Seite verifizieren**

Expected: Vercel-Status `Ready`; Live-Markup enthält den Aufmacher und die neue Struktur, Desktop/Mobil bleiben ohne Overflow und Media-Iframes werden weiterhin erst nach Play geladen.
