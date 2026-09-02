# TRMT Informationsarchitektur Variante A

**Status:** vom Nutzer am 2. September 2026 als Richtung A bestaetigt; schriftliches Spec-Review offen

**Basis:** `origin/main` bei `167a5f7840df6205a3c68c174450151f2d70b48b`

**Arbeitsbereich:** isolierter Worktree `D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-ia-variant-a-20260902`, Branch `codex/trmt-ia-variant-a`

**Ziel:** Blogbeitraege schneller sichtbar machen, `/blog` zu einem vollstaendig crawlbaren Archiv ausbauen und die vorhandenen fuenf Hauptthemen zu belastbaren Hubs staerken, ohne eine neue `/themen`-Route oder neue Bildassets einzufuehren.

## Bestaetigte Produktentscheidung

TRMT bleibt in dieser Welle ein **text-first Fachblog mit kuratierter Homepage**:

- Die Homepage erklaert und kuratiert.
- `/blog` ist das vollstaendige chronologische Archiv.
- Die fuenf bestehenden Kern-Tagseiten sind die thematischen Hubs.
- Einzelne Artikel sind die inhaltlichen Speichen dieser Hubs.
- Video und Podcast bleiben ergaenzende Formate; ihre Produktion und Distribution werden nicht automatisiert.

Der Lesepfad lautet: **Versprechen -> Themenwahl -> handverlesene Beitraege -> vertiefender Kontext**.

## Erfolgskriterien

Die Welle ist erfolgreich, wenn:

1. auf der Homepage bei 1440 x 1000 der Titel des Beitragsbereichs innerhalb der ersten 72 Prozent der Viewporthoehe und die erste Artikelkarte innerhalb der ersten 82 Prozent beginnt;
2. auf 390 x 844 der Titel des Beitragsbereichs mindestens 160 CSS-Pixel und die erste Artikelkarte mindestens 96 CSS-Pixel vor der unteren Viewportkante beginnt;
3. `/blog` jeden veroeffentlichten Artikel ueber normale, servergerenderte Links und paginierte Archivseiten erreichbar macht;
4. nur die fuenf Kern-Hubs im Sitemap-Tagbereich verbleiben und alle anderen Tagseiten `noindex,follow` ausgeben;
5. jeder Kern-Hub drei redaktionell festgelegte Einstiegsartikel, alle weiteren passenden Artikel und Links zu den vier anderen Kern-Hubs zeigt;
6. Homepage und Blog keine zusaetzliche Client-Bibliothek, kein neues schweres JavaScript und keine neuen Bildassets laden;
7. die kontrollierte lokale Lighthouse-Messung gegen denselben Basisstand bei Performance und SEO nicht regressiert;
8. die bestehenden 78 `svelte-check`-Fehler und 9 Warnungen nicht zunehmen und geaenderte Dateien keine neue Diagnose erzeugen.
9. Hubseiten als Navigation/Cluster erkennbar bleiben und keine der unten zugewiesenen konkreten Artikelsuchintentionen beanspruchen.

## 1. Kompaktere Homepage

### Hero und CTAs

Inhalt und Marken-H1 bleiben erhalten. Der Hero verliert seine Full-Viewport-Anmutung: Mindesthoehe, oberes/unteres Padding sowie Abstaende zwischen Badge, H1, Versprechen, Intro, Buttons und Zaehler werden gemeinsam reduziert.

Die Buttons erhalten eindeutige, verschiedene Aufgaben:

- Primaer: **`Alle Beitraege`** verlinkt auf `/blog`.
- Sekundaer: **`Themen waehlen`** verlinkt auf `#topics`.

Beide bleiben normale Links ohne JavaScript-Abhaengigkeit. Der Themenanker und der Beitragsanker behalten ausreichenden `scroll-margin-top` fuer den Sticky Header.

### Themen-Navigator

Die fuenf bestehenden Bilddateien und ihr Stil bleiben unangetastet. Nur ihre Darstellung wird verdichtet:

- Desktop: fuenf gleichwertige Links in einer Reihe, Bildausschnitt im kompakteren Querformat statt quadratischer Vollflaeche;
- Mobile: horizontal scrollbare, per CSS Scroll-Snap gefuehrte Reihe mit sichtbarem Anschnitt der naechsten Karte;
- jede Karte behaelt Themenname und kurze Orientierung;
- Bilder bleiben lazy, explizit dimensioniert und dekorativ mit leerem Alt-Text innerhalb des beschrifteten Links;
- kein horizontaler Seiten-Overflow ausserhalb der Themenreihe.

Die Bilddateien unter `static/images/homepage/topics/` werden in dieser Welle weder ersetzt noch neu komprimiert.

### Neu und handverlesen

Das bestehende Layout aus einem Leitartikel und drei kleineren Karten bleibt. Zwei Fehler werden korrigiert:

1. Kategorien werden vor der Auswahl mit genau einer exportierten puren Funktion normalisiert. Die Familien lauten:
   - `ki-tools`: `ki-tools`, `ki-news`, `tools`, `ai`
   - `maker`: `maker`, `maker-projekt`, `diy`, `smart-home`, `3d-druck`
   - `automatisierung`: `automatisierung`, `automation`
   - `fotografie`: `fotografie`, `photography`
   - `produktivitaet`: `produktivitaet`, `productivity`
   - `general`, leere und unbekannte Werte werden nicht in eine der fuenf Familien gezwungen, sondern als stabiler eigener Wert `other:<normalisierter-wert>` behandelt.
2. Ein Leitartikel ohne Hero-Bild darf nicht kuenstlich auf die volle Hoehe der rechten Dreier-Spalte gestreckt werden. Er bleibt eine bewusste typografische Karte mit inhaltsnaher Hoehe.

Der konfigurierte Gemini-Notebook-Beitrag bleibt vorerst Leitartikel. Fehlt er, greift weiterhin der bestehende Fallback auf den neuesten veroeffentlichten Beitrag.

### Kompakter SEO- und Orientierungstext

Direkt **unter** den vier Beitraegen steht folgender sichtbarer Absatzblock. Die fuenf fett markierten Themennamen werden als beschreibende Links auf die Kern-Hubs umgesetzt:

> Bei TRMT findest du praktische Artikel, nachvollziehbare Anleitungen und persoenliche Einordnungen rund um **KI-Tools**, Tech und digitale Workflows. In **Maker & DIY** geht es um ESP32, 3D-Druck und Smart Home; bei **Automatisierung** um n8n, Skripte und verbundene Tools. **Fotografie** buendelt Bildbearbeitung, KI-Workflows und Technik aus der Praxis. Unter **Produktivitaet** findest du Systeme fuer Wissen, Fokus und digitale Ordnung. Waehle ein Thema oder spring direkt ins vollstaendige Blogarchiv - alle Beitraege bleiben frei zugaenglich und lassen sich ohne Anmeldung lesen.

Der Block wiederholt keine langen Pillar-Texte und fuegt keine unbelegten Erfahrungs-, Test- oder Frequenzbehauptungen hinzu. Video, Podcast, Newsletter und FAQ bleiben danach in ihrer bestehenden Reihenfolge und Funktion.

## 2. `/blog` als crawlbares Archiv

### Kopfbereich und Themenzugang

Der Blogkopf wird auf Desktop als kompakte Zweispaltenstruktur angelegt:

- links H1 und kurze Unterzeile;
- rechts der bestehende Einordnungstext und die Artikelanzahl;
- darunter eine als Navigation ausgezeichnete Reihe aus fuenf Themenlinks zu den Kern-Hubs.

Auf Mobile stapelt sich der Block linear. Die Textzeilen bleiben fuer Lesbarkeit begrenzt; die Gesamtflaeche nutzt dennoch die vorhandene Containerbreite. Das Artikelgrid soll bei 1440 x 1000 innerhalb der ersten 42 Prozent der Viewporthoehe beginnen.

### Servergerenderte Pagination

Das clientseitige `Mehr laden` entfaellt. Beide Archivloader sind ausdruecklich server-only: `/blog/+page.server.ts` und `/blog/seite/[page]/+page.server.ts`. Das Archiv zeigt **12 Artikel pro Seite**:

- `/blog` ist Seite 1;
- `/blog/seite/2` bis `/blog/seite/N` sind statisch vorgerenderte Folgeseiten;
- jede Seite besitzt normale Links auf vorherige, naechste und benachbarte Seitennummern;
- Seite 1 behaelt ihren Canonical `/blog`;
- Folgeseiten erhalten Self-Canonicals und Titel im Muster `Blog - Seite N | TRMT`;
- nur kanonische Ganzzahlen von `2` bis `totalPages` sind gueltig; `01`, `2.0`, `+2`, Nichtzahlen, Seite 1 sowie `N+1` liefern 404;
- die FAQ erscheint nur auf Seite 1, damit sie nicht auf jeder Archivseite dupliziert wird;
- jede Seite erhaelt ein `CollectionPage`-Schema mit einem `ItemList` der dort sichtbaren Artikel.

Die Pagination wird ueber eine kleine pure Utility berechnet. Sie sortiert stabil nach `date DESC, slug ASC`, damit gleiche Publikationsdaten keine Seitengrenze verschieben. `entries()` erzeugt ausschliesslich `2..N`. Die Routen liefern nur die 12 sichtbaren Post-Metadaten sowie `currentPage`, `totalPages` und `totalCount` an den Client. Damit sinkt die Payload gegenueber den aktuell an `/blog` uebergebenen 73 Datensaetzen.

## 3. Fuenf Kern-Hubs

Die einzige kanonische Kernliste lautet:

1. `ki-tools` - KI & Tech
2. `maker` - Maker & DIY
3. `automatisierung` - Automatisierung
4. `fotografie` - Fotografie
5. `produktivitaet` - Produktivitaet

Eine gemeinsame Projektdatei stellt Slug, sichtbaren Namen, Kurztext und Einstiegsartikel bereit. Homepage, Blogfilter, Tagroute und Sitemap importieren diese Quelle, damit die Definitionen nicht auseinanderlaufen.

### SEO-Rolle und Landingpage-Grenzen

Die Kern-Hubs sind navigierende Sammlungsseiten, keine Ersatzartikel fuer konkrete Suchaufgaben. Ihre Titel folgen dem Muster `[Thema]: Artikel, Guides und Projekte | TRMT`; Intro und interne Links beschreiben die Breite, ohne spezifische Einzelkeywords als alleinige Antwort zu beanspruchen.

| Hub | Eigene Rolle | Nicht vom Hub beanspruchen; zustaendige Zielseite |
|---|---|---|
| `ki-tools` | Ueberblick ueber KI-&-Tech-Teilthemen und Einstiege | `ki tools uebersicht` -> spaetere Aktualisierung von `5-beste-ki-tools-maerz-2026`; `claude prompting` -> `perfekt-prompten-llm-guide`; `notebooklm api` -> `gemini-notebook-kostenlos-codex-content-workflow`; `ki bilder prompts beispiele` -> `50-bildprompts-echt-getestet` |
| `maker` | Navigation zu Maker-, ESP32-, 3D-Druck- und Smart-Home-Inhalten | `esp32 projekte` -> `esp32-projekte-anfaenger-2026`; `3d drucker anfaenger` -> `3d-druck-einstieg-welcher-drucker-2026` |
| `automatisierung` | Navigation zu Workflow-, n8n-, Script- und Agent-Inhalten | `ki automatisierung` -> eigener spaeterer Pillar; `n8n tutorial deutsch` -> `n8n-tutorial-deutsch-2026` |
| `fotografie` | Navigation zu Fotografie, KI-Bildbearbeitung und Foto-Workflows | `ki bildbearbeitung` -> `ki-bildbearbeitung-workflow-fotograf-2026`; `ki fotografie` -> `ki-fotografie-2026-was-wirklich-funktioniert` |
| `produktivitaet` | Navigation zu Wissens-, Fokus- und Ordnungssystemen | `produktivitaet app` -> erst ein spaeterer eigener Vergleich; `obsidian adhs` -> `obsidian-fuer-adhs-system-2026` |

Diese Matrix ist ein Zustandsvertrag fuer interne Links und Seitentitel, keine Anweisung, neue Artikel in dieser Welle zu schreiben.

### Feste Einstiegsartikel

Die erste Welle verwendet folgende vorhandene Slugs:

- **KI & Tech:** `perfekt-prompten-llm-guide`, `50-bildprompts-echt-getestet`, `gemini-notebook-kostenlos-codex-content-workflow`
- **Maker & DIY:** `esp32-projekte-anfaenger-2026`, `3d-druck-einstieg-welcher-drucker-2026`, `home-assistant-einrichten-2026`
- **Automatisierung:** `n8n-tutorial-deutsch-2026`, `n8n-workflow-beispiele-2026`, `n8n-chatgpt-workflow-2026`
- **Fotografie:** `ki-fotografie-2026-was-wirklich-funktioniert`, `ki-bildbearbeitung-workflow-fotograf-2026`, `aftershoot-alternative-ai-photo-culling`
- **Produktivitaet:** `obsidian-fuer-adhs-system-2026`, `claude-code-ultimate-setup-produktivitaet-2026`, `beste-chatgpt-prompts-2026`

Die zwei vorhandenen Artikel `50-bildprompts-echt-getestet` und `gemini-notebook-kostenlos-codex-content-workflow` erhalten ausschliesslich den zusaetzlichen Taxonomie-Tag `ki-tools`; sichtbarer Artikeltext, Titel, Slug, Bilder und alle anderen Frontmatter-Felder bleiben unveraendert. Damit werden sie entsprechend ihrer bereits bestaetigten KI-&-Tech-Zuordnung erreichbar, ohne eine parallele Inhaltsbearbeitung zu starten.

Ein fokussierter Test stellt sicher, dass jeder konfigurierte Slug existiert und den jeweiligen Kern-Tag wirklich traegt. Ein Fehler wird nicht still durch einen anderen Artikel verdeckt.

### Hub-Aufbau

Nur fuer diese fuenf Tags rendert die Tagroute:

- eine kompakte Breadcrumb-Navigation `Startseite -> Themenname`;
- einen zweispaltigen Kopf aus Titel/Intro und Artikelanzahl;
- `Hier anfangen` mit den drei festgelegten Einstiegsartikeln;
- `Alle Artikel` mit den restlichen, nach Datum sortierten Beitraegen ohne Doppeldarstellung;
- `Weitere Themen` mit Links auf die vier anderen Kern-Hubs;
- `BreadcrumbList`, `CollectionPage` und `ItemList` als JSON-LD;
- die bestehende FAQ nur dann, wenn fuer das Thema bereits Daten vorhanden sind.

Jeder Kern-Hub setzt ausdruecklich `index,follow`, einen eindeutigen Titel und eine eindeutige Description, Self-Canonical sowie stabile JSON-LD-`@id`-Werte. `CollectionPage.mainEntity` verweist auf das sichtbare `ItemList`; das FAQ-Schema wird nur zusammen mit der identisch sichtbaren FAQ ausgegeben.

Die bisherigen Emoji-Icons entfallen aus dem sichtbaren Kern-Hub-Kopf. Es werden keine Ersatzbilder erzeugt.

## 4. Duenne Tagseiten und Sitemap

Alle veroeffentlichten Tags bleiben als statische Seiten erreichbar, damit bestehende Links nicht brechen. Fuer jeden Tag ausserhalb der fuenf Kern-Hubs gilt:

- `<meta name="robots" content="noindex,follow">`;
- Self-Canonical bleibt bestehen;
- kein FAQ-Schema und kein `CollectionPage`-/`ItemList`-Schema;
- kompakter Archivkopf und normales Artikelgrid bleiben nutzbar;
- die Seite wird nicht in `sitemap.xml` aufgenommen.

Der serverseitige Tagloader akzeptiert nur Tags, die mindestens einem veroeffentlichten Artikel exakt zugeordnet sind. Unbekannte Tags liefern 404 statt einer leeren indexierbaren 200-Seite. Die Themenfamilien-Normalisierung der Homepage veraendert keine Artikelzuordnung: Hublisten verwenden den kanonischen Tag und nur die zwei oben ausdruecklich genehmigten `ki-tools`-Ergaenzungen.

Die Sitemap enthaelt weiterhin Homepage, Blog, Tools, Podcast, statische Seiten, alle kanonischen Artikel und Episoden, aber im Tagbereich nur die fuenf Kern-Hubs. Paginierte Blogseiten muessen nicht in die Sitemap, weil alle Artikel bereits einzeln enthalten sind und die Archivseiten ueber normale Pagination verlinkt werden.

## 5. Typografie und bestehende visuelle Identitaet

Die vorhandenen Fonts, Farbvariablen, Honey-/Teal-Akzente, Grain-Hintergruende, Karten und Dark-/Light-Themes bleiben verbindlich. Die Welle ist eine Layout- und Informationsarchitektur-Verdichtung, kein Rebranding.

Blog- und Hub-H1 verwenden dieselbe Seitentitel-Skala `clamp(2.5rem, 6vw, 3.5rem)`. Die Marken-H1 der Homepage bleibt bewusst groesser. Die Bildprompt-Library bleibt wegen ihres Werkzeug-/Produktcharakters ausserhalb dieser Typografieaenderung; an ihr wird kein Code geaendert.

## 6. Accessibility und Fehlerverhalten

- Alle CTAs, Themen, Karten und Paginationselemente sind echte Links.
- Die aktuelle Archivseite traegt `aria-current="page"`.
- Pagination besitzt eine eindeutige deutsche Accessible-Beschriftung.
- Fokus- und DOM-Reihenfolge entsprechen der sichtbaren Reihenfolge.
- Touch-Ziele bleiben mindestens 44 px hoch.
- Reduced Motion unterbindet dekorative Lift-/Zoom-Bewegung wie bisher.
- Ein Kern-Hub ohne restliche Artikel blendet nur den leeren Abschnitt aus; die Einstiegsartikel und Navigation bleiben bestehen.
- Ein konfigurierter, fehlender oder falsch getaggter Einstiegsartikel ist ein Build-/Testfehler.
- Archivseiten ausserhalb des gueltigen Bereichs liefern 404 statt leere indexierbare Seiten.

Der No-JavaScript-Vertrag bezieht sich auf die in dieser Welle geaenderten Hauptwege: den im Hero sichtbaren Link zu `/blog`, die servergerenderte Pagination, die Themenlinks, Hubnavigation und Artikellinks. Das bestehende mobile Header-Disclosure ist ausserhalb dieser Welle; es ist kein erforderlicher Einstieg, weil der primaere Blog-Link direkt im Hero gerendert wird.

## 7. Performance- und SEO-Gates

Vor der UI-Implementierung wird der Basisstand lokal mit einer festgehaltenen Lighthouse-Version und demselben Produktions-Preview gemessen. Mobile und Desktop erhalten jeweils drei Cold-Cache-Laeufe nach abgeschlossener Fontladung; nach der Implementierung wird die identische Messung wiederholt. Je Profil entscheidet der Median.

Harte Grenzen:

- Performance- und SEO-Score nicht schlechter als die kontrollierte Basis;
- LCP nicht schlechter als die Basis;
- CLS nicht schlechter als die Basis und weiterhin hoechstens 0,05;
- TBT weiterhin 0 ms beziehungsweise keine messbare Regression;
- initialer Homepage-Transfer und eigener JavaScript-Graph, jeweils raw und gzip, nicht groesser als die Basis;
- `/blog` liefert nur die Metadaten der sichtbaren Seite;
- SSR-HTML/Page-Data raw und gzip, initiale Bildrequests und Bildbytes werden fuer Homepage und `/blog` deterministisch vor/nach verglichen;
- keine neuen npm-Abhaengigkeiten;
- keine neuen Bilddateien oder Bildbytes;
- normale Navigation und Archivzugang funktionieren ohne Client-JavaScript.

Ein echter Produktions-PageSpeed-Wert bleibt bis zu einem getrennt freigegebenen Deployment `UNKNOWN`.

## 8. Teststrategie

Die Implementierung erfolgt testgetrieben:

1. Homepage-Vertragstests fuer CTA-Ziele, kompakte Struktur, SEO-Orientierungsblock und unveraenderte Themenassets zuerst rot schreiben.
2. Unit-Tests fuer normalisierte Themenfamilien und diverse Homepage-Auswahl zuerst rot schreiben.
3. Unit-Tests fuer 12er-Pagination, stabile Sortierung, Seitenanzahl, Grenzen und 404-Faelle zuerst rot schreiben.
4. Tag-/Sitemap-Vertragstests fuer exakt fuenf `index,follow`-Hubs mit eindeutigen Metadaten und `noindex,follow` fuer alle anderen Tags zuerst rot schreiben.
5. Hub-Konfiguration gegen reale Artikel-Slugs und Tags pruefen.
6. Archivvertrag fuer 0, 1, 12 und 13 Artikel sowie identische Datumswerte pruefen: jeder veroeffentlichte Artikel ist ueber alle Archivseiten genau einmal serverseitig verlinkt; Seiten ueberlappen nicht; erste und letzte Seite sind erreichbar; `ItemList` enthaelt korrekte URLs und fortlaufende globale Positionen.
7. Bestehende fokussierte Node-Tests ausfuehren.
8. `svelte-check` gegen eine normalisierte Baseline aus Datei, Diagnosecode und Meldung vergleichen; nicht nur die Gesamtzahl von 78 Fehlern/9 Warnungen. In geaenderten Dateien ist keine neue Diagnose erlaubt.
9. Vite-Build bis einschliesslich erfolgreicher SvelteKit-Kompilierung lokal pruefen. Zusaetzlich ist vor Release ein vollstaendig erfolgreicher Linux-/CI-Produktionsbuild Pflicht; ein lokaler Windows-Vercel-Symlink-`EPERM` allein ist kein vollstaendiger Buildnachweis.
10. Desktop- und Mobile-Browser-QA fuer Homepage, Blogseite 1, Folgeseite, Kern-Hub und duennen Tag ausfuehren; Konsole, Overflow, Fokus, Pagination und Accessibility pruefen. Bei 200 Prozent Textzoom beziehungsweise 320 CSS-Pixeln duerfen Aktionen nicht ueberlappen, abgeschnitten werden oder verschwinden.
11. Impeccable-Layoutdetektor einmal nach Abschluss ueber die geaenderten UI-Dateien laufen lassen.
12. Eine unabhaengige Code-/SEO-Review prueft Diff, Indexierungslogik, Schema und Performance-Risiken.
13. `git diff --check`, `git diff --cached --check`, `git status --short` und ein vollstaendiges Untracked-Inventar muessen sauber beziehungsweise erklaert sein.

Die Foldmessung verwendet `getBoundingClientRect().top` nach `document.fonts.ready`, 100 Prozent Zoom und DPR 1 im festgelegten Browser. Gemessen werden Viewport, sichtbarer Section-Titel und erste Kartenkante; eine blosse Dokument-Y-Schaetzung zaehlt nicht als Nachweis.

## Nicht enthalten

- keine neue `/themen`-Route;
- keine Bearbeitung von Artikeltext, Titel, Slug, Bildern oder sonstigem Frontmatter; ausgenommen sind nur die oben festgelegten zwei `ki-tools`-Tag-Ergaenzungen;
- keine neuen Bilder, Bildgenerierung oder Aenderung der fuenf Themenassets;
- keine Podcast-, YouTube-, Gemini-Notebook-, n8n- oder Social-Automation;
- keine Verbindung von Analytics oder Search Console;
- keine Ubersuggest-Projektmutation;
- keine Bereinigung der 78 bestehenden `svelte-check`-Fehler ausserhalb geaenderter Dateien;
- kein Push, Merge oder Deployment ohne getrennten, frischen Release-Readback und ausdrueckliche Produktionsfreigabe.

Der bestehende Crawl-Befund von vier Blog-/Podcast-Paaren mit doppelten Titeln bleibt ein separat zu entscheidender SEO-Follow-up. Diese Welle veraendert keine Podcast-URL, keinen Podcast-Canonical und keine Episode; ihr Erfolg darf deshalb nicht als Behebung dieser bekannten Kollision ausgegeben werden.

## Erwarteter Dateiradius

- `src/routes/+page.svelte`
- `src/lib/utils/homepage-posts.js`
- `src/routes/blog/+page.ts`
- `src/routes/blog/+page.svelte`
- neue paginierte Blogroute und eine kleine gemeinsame Archiv-Komponente beziehungsweise Utility
- `src/routes/tags/[tag]/+page.ts`
- `src/routes/tags/[tag]/+page.svelte`
- `src/routes/sitemap.xml/+server.ts`
- neue gemeinsame Kern-Hub-Datendatei
- `src/content/blog/50-bildprompts-echt-getestet.md` und `src/content/blog/gemini-notebook-kostenlos-codex-content-workflow.md` ausschliesslich fuer den zusaetzlichen `ki-tools`-Tag
- fokussierte Testdateien
- diese Spezifikation und der spaetere Implementierungsplan

## Rollback

Die Arbeit bleibt auf `codex/trmt-ia-variant-a`. Bis zur getrennten Produktionsfreigabe veraendert sie weder `origin/main` noch die Live-Seite. Jeder Implementierungsschritt wird klein committed; die Welle kann durch Weglassen des Branches oder gezieltes Revertieren der Feature-Commits vollstaendig zurueckgenommen werden.
