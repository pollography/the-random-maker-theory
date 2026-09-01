# TRMT Homepage Hybrid C Design

**Status:** freigegeben am 2. September 2026
**Basis:** `origin/main` bei `9e5e36b` im isolierten Worktree `codex/trmt-homepage-hybrid-c`
**Ziel:** Die Homepage so verdichten, dass neue Besucher TRMT sofort verstehen und bereits direkt nach dem ersten Themenueberblick relevante Blogbeitraege sehen.

## Bestaetigte Richtung

Umgesetzt wird die im visuellen Vergleich ausgewaehlte Variante C:

1. Der Hero erklaert in derselben Flaeche Marke, Themen und Nutzen.
2. Direkt danach folgt ein kompakter visueller Navigator fuer die fuenf Themenbereiche.
3. Anschliessend stehen ein hervorgehobener Leitartikel und drei weitere aktuelle, thematisch moeglichst unterschiedliche Blogbeitraege.
4. Die bisherigen langen Themenkarten mit Emoji, Absatztexten und Tag-Wolken entfallen von der Homepage.
5. Video, Podcast, Newsletter und FAQ bleiben danach in ihrer bisherigen Funktion erhalten.

Der Lesepfad lautet damit: **Versprechen -> Orientierung -> Beweis -> weitere Formate**.

## Zielgruppe und Erfolg

Die Homepage richtet sich an neugierige Einsteiger und technikinteressierte Leser, die noch nicht wissen, welcher einzelne Artikel fuer sie relevant ist. Innerhalb weniger Sekunden sollen sie erkennen:

- TRMT behandelt Tech, KI-Tools, Maker-Projekte, Automatisierung, Fotografie und Produktivitaet,
- die Inhalte sind praktisch, persoenlich eingeordnet und verstaendlich erklaert,
- es gibt sofort konkrete Artikel zum Weiterlesen.

Die neue Struktur ist erfolgreich, wenn auf Desktop im ersten beziehungsweise beginnenden zweiten Viewport bereits Themen-Navigator und Artikelanfang sichtbar sind und auf 390-Pixel-Mobile keine ausfuehrlichen Erklaerkarten mehr zwischen Hero und Artikeln liegen.

## Informationsarchitektur

### 1. Verdichteter Hero

Der Hero behaelt die bestehende Marken-H1 `The Random Maker Theory` und den Badge `News · Reviews · Tutorials · Projekte`. Der Satz `Content, den ich selbst lese.` wird vollstaendig entfernt.

An seine Stelle kommen unmittelbar:

- `Entdecken. Verstehen. Und alles Frei Schnauze.` als deutliches redaktionelles Versprechen,
- `Tech, KI-Tools, Maker-Projekte, Automatisierung und Produktivität. Aufbereitet und erklärt, so dass es hängen bleibt. Für alle Neugierigen, die mehr wissen wollen!` als kurze Einordnung,
- ein primaerer CTA `Aktuelle Beiträge` zum Beitragsbereich,
- ein sekundaerer CTA `Alle Themen` zum Themen-Navigator.

Der bisherige Full-Viewport-Eindruck wird reduziert. Die Marke bleibt die groesste Zeile, aber Hero-Text, CTAs und Zaehler muessen deutlich kompakter zusammenstehen. Die separate Entdecken-Sektion unterhalb des Hero wird entfernt, weil ihr Inhalt nun im Hero lebt.

### 2. Kompakter Themen-Navigator

Die bisherigen fuenf Themen bleiben erhalten:

1. KI & Tech
2. Maker & DIY
3. Automatisierung
4. Fotografie
5. Produktivitaet

Jeder Bereich wird zu einer vollstaendig klickbaren Kachel mit:

- eigenstaendigem quadratischem Motiv,
- Themenname,
- sehr kurzer Orientierung aus zwei bis vier Woertern,
- Link auf die bestehende passende Tag-Seite.

Lange Beschreibungen, Highlight-Chips und Emojis entfallen. Desktop zeigt eine kompakte Fuenferreihe. Mobile zeigt eine horizontal scrollbare Reihe mit sichtbarem Anschnitt der naechsten Kachel und CSS Scroll-Snap. Die DOM- und Tastaturreihenfolge bleibt linear von links nach rechts.

### 3. Neu und handverlesen

Direkt nach dem Themen-Navigator folgt der Blogbereich. Desktop zeigt einen grossen Leitartikel und daneben drei kompaktere Artikelkarten. Mobile ordnet alle vier Karten vertikal, Leitartikel zuerst.

Die Auswahl ist halbautomatisch:

- Ein optionaler `FEATURED_POST_SLUG` in `+page.server.ts` pinnt den Leitartikel. Zum Start ist dies `gemini-notebook-kostenlos-codex-content-workflow`.
- Fehlt der konfigurierte Artikel, wird automatisch der neueste veroeffentlichte Beitrag zum Leitartikel.
- Fuer die drei weiteren Plaetze werden die neuesten Beitraege mit moeglichst unterschiedlichen `category`-Werten gewaehlt.
- Reichen unterschiedliche Kategorien nicht aus, werden die restlichen Plaetze chronologisch mit den neuesten noch nicht verwendeten Beitraegen gefuellt.

Damit bleibt die Homepage aktuell, ohne dass eine am selben Tag veroeffentlichte Artikelserie alle sichtbaren Plaetze besetzt. Ein deutlicher Link `Alle Beiträge ansehen` fuehrt zum vollstaendigen Blogindex.

## Bildsprache der Themenmotive

Die fuenf Motive werden als zusammengehoerige Serie neu erzeugt. Sie sind keine Icons, Emojis, Logos oder Stockfotos, sondern kleine objektbasierte Editorial-Stillleben im bestehenden TRMT-Look: dunkler Grain, warme Honey-Lichter, tiefe Teal-Schatten, greifbare Materialien und ein klarer zentraler Gegenstand.

Geplante Gegenstaende:

- **KI & Tech:** ein transluzenter Rechenkern mit feinen Leiterbahnen,
- **Maker & DIY:** ein zerlegtes ESP32-aehnliches Modul mit Schrauben, Draht und 3D-Druckteil,
- **Automatisierung:** eine physische Kette aus Relais, Kabelwegen und leuchtenden Knoten,
- **Fotografie:** ein Objektiv-Prisma mit Lichtbrechung und optischer Kaustik,
- **Produktivitaet:** ein modulares System aus Karteikarten, Registerelementen und verbindenden Fadenlinien.

Alle Motive bleiben textfrei. Menschen, Haende, Gesichter, Markenlogos, Interface-Screenshots und generische Roboterkoepfe sind ausgeschlossen. Die Bilder duerfen sich farblich unterscheiden, muessen aber Perspektive, Licht, Materialitaet und Grain teilen.

Die Produktionsdateien werden auf quadratische Web-Bilder zugeschnitten. Pro sichtbarer Kachel wird eine explizit dimensionierte WebP- oder AVIF-Datei verwendet. Ziel sind hoechstens 35 KiB pro Motiv und hoechstens 175 KiB fuer die komplette Serie. Die Bilder laden lazy, reservieren ihren Platz ueber `width`, `height` und `aspect-ratio` und erhalten innerhalb des bereits beschrifteten Links leere Alt-Texte, damit Screenreader den Themennamen nicht doppelt ausgeben.

## Visuelles Verhalten

Die bestehende TRMT-Identitaet bleibt verbindlich:

- vorhandene Instrument-Serif- und Inter-Typografie,
- vorhandene HSL-Tokens, Honey- und Teal-Akzente,
- vorhandene Dark-Grain- und Surface-Logik,
- keine neue Component Library und kein zweites Designsystem.

Die neue Homepage setzt Hierarchie vor Dekoration. Der Hero fuehrt, der Themen-Navigator orientiert und der Blogbereich liefert den Hauptbeweis. Hover-Effekte bleiben klein und werden bei `prefers-reduced-motion` deaktiviert. Touch-Ziele bleiben mindestens 44 Pixel gross. Die Themenbilder duerfen nicht als riesiger zweiter Hero wirken.

## Technische Umsetzung

Die Hauptaenderungen bleiben auf folgende Bereiche begrenzt:

- `src/routes/+page.svelte` fuer Reihenfolge, Hero, Themen-Navigator und Beitragslayout,
- `src/routes/+page.server.ts` fuer die halbautomatische Beitragsauswahl,
- ein einzelnes kleines Homepage-Karten-Component nur dann, wenn die hervorgehobene und kompakte Artikeldarstellung mit dem bestehenden `BlogCard` nicht sauber darstellbar ist,
- `static/images/homepage/topics/` fuer die fuenf optimierten Motive,
- die vorhandenen Homepage-Vertragstests und bei Bedarf ein neuer fokussierter Auswahllogik-Test.

Die bestehende serverseitige Metadaten-Ladung bleibt erhalten. Es werden nur die vier auf der Homepage benoetigten Post-Datensaetze an den Browser gegeben. Vollstaendige Artikelinhalte und Drafts gelangen weiterhin nicht in den Client.

## SEO und Accessibility

- Es bleibt genau eine H1 auf der Homepage.
- Das redaktionelle Versprechen und die Themenbegriffe stehen als sichtbarer HTML-Text im ersten Inhaltsbereich und nicht in Bildern.
- Jede Themenkachel ist ein echtes crawlbares `<a href>` mit aussagekraeftigem Linktext.
- Jeder sichtbare Beitrag verlinkt mit seinem vollstaendigen Titel auf die kanonische Artikelroute.
- Die visuelle Reihenfolge entspricht DOM-, Fokus- und Screenreader-Reihenfolge.
- Horizontales Scrollen der Themenreihe darf kein horizontales Seiten-Overflow erzeugen.
- Dark und Light Theme muessen dieselbe Hierarchie und ausreichenden Kontrast behalten.

Title, Description, Canonical, OpenGraph, FAQ-Schema und Website-Schema bleiben in dieser Welle unveraendert. Die neue Struktur aendert keine Artikel, Slugs, Tag-Seiten oder Sitemap-Routen.

## Nicht enthalten

- kein Deployment, Push oder Merge,
- keine Bearbeitung einzelner Blogartikel,
- keine neue Navigation oder Footer-Struktur,
- keine Aenderung an Podcast-, Newsletter- oder Video-Funktion,
- keine Reparatur der bereits vorhandenen globalen 78 `svelte-check`-Fehler und 9 Warnungen,
- keine Analytics-, Cookie-, Ubersuggest-, NotebookLM- oder n8n-Aenderung,
- keine automatisierte Auswahl nach Klickzahlen, weil dafuer derzeit keine belastbare Homepage-Datenquelle vorgesehen ist.

## Verifikation

Die Implementierung gilt nur dann als abgeschlossen, wenn frisch belegt ist:

1. Die vorhandenen 12 Homepage-A11y- und Performance-Tests bleiben gruen.
2. Neue Tests belegen Hero-Text, entfernten alten Subtitle, Linkziele der fuenf Themen, vier Post-Datensaetze, Featured-Fallback und Kategorie-Diversifizierung.
3. `svelte-check` wird erneut ausgefuehrt. Die dokumentierte Baseline von 78 Fehlern und 9 Warnungen darf nicht schlechter werden; in geaenderten Dateien darf keine neue Meldung entstehen.
4. Die Vite-Kompilierungsstufe des Produktionsbuilds besteht. Ein vorhandener Windows-Vercel-Symlinkfehler wird gegebenenfalls separat als bekannte Umgebungsgrenze ausgewiesen.
5. `git diff --check` ist sauber und der Diff enthaelt nur Homepage-, Bild-, Test-, Spec- und Plan-Dateien dieses Auftrags.
6. Desktop bei 1440 Pixeln und Mobile bei 390 x 844 Pixeln werden im lokalen Produktionslayout visuell geprueft.
7. Auf Mobile gibt es kein horizontales Seiten-Overflow; nur die Themenreihe selbst darf horizontal scrollen.
8. Die Blogbeitraege beginnen erheblich frueher als auf der aktuellen Homepage; die langen Themenbeschreibungen sind nicht mehr vorhanden.
9. Alle fuenf Bilder haben feste Dimensionen, passende Formate, zusammen hoechstens 175 KiB und verursachen keinen sichtbaren Layout-Shift.
10. Die Seite bleibt ohne JavaScript in sinnvoller Lesereihenfolge und alle primaeren Wege funktionieren als normale Links.

### Harte Performance- und SEO-Grenze

Vor der ersten Codeaenderung wird die aktuelle Homepage mit einer festen Lighthouse-Version und identischem Testprofil mehrfach gemessen. Dieselbe Messung wird nach der Umsetzung lokal gegen den unveraenderten Basisstand wiederholt. Der Median ist die Vergleichsgroesse; ein einzelner schwankender Lauf entscheidet nicht.

Die neue Homepage darf den gemessenen Performance- oder SEO-Score nicht verschlechtern. LCP, CLS, TBT, Gesamttransfer und eigenes JavaScript duerfen gegen die kontrollierte Baseline nicht regressieren. Die fuenf neuen Themenbilder muessen innerhalb des festgelegten Gesamtbudgets bleiben und duerfen weder LCP-Ressource noch Layout-Shift verursachen. Wenn die Werte schlechter sind, ist die Umsetzung nicht abgeschlossen: Bildgewicht, Ladeverhalten oder Layout werden innerhalb des bestaetigten Designs korrigiert und erneut gemessen.

Der vom Nutzer beobachtete Google-PageSpeed-Wert nahe 100 wird nicht aus Erinnerung als Messwert uebernommen, sondern vor der Aenderung frisch erhoben. Ein spaeterer echter Produktionswert bleibt bis zu einem separat autorisierten Deployment `UNKNOWN`.

## Rollback und Freigabegrenzen

Die Arbeit bleibt auf Branch `codex/trmt-homepage-hybrid-c` im separaten Worktree. Die bestehende Homepage auf `origin/main` wird nicht veraendert. Spec-Commit, spaetere Implementierungs-Commits, Push, Merge und Deployment bleiben getrennte Schritte. Dieser Auftrag autorisiert lokale Umsetzung und Verifikation, aber keine Veroeffentlichung.
