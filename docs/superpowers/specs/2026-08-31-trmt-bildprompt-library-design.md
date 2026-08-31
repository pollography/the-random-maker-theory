# TRMT Bildprompt-Library - Design

## Ziel

TRMT erhält unter `/tools/bildprompt-library` eine öffentliche, eigenständige Tool-Seite. Sie zeigt die real mit demselben Porträt getesteten Bildprompts als kompakte visuelle Bibliothek. Besucher können suchen, nach Kategorien filtern, einen Prompt mit einem Klick kopieren und ein sechsseitiges PDF-Cheat-Sheet herunterladen.

Die Library ist kein Blogartikel, kein CMS und keine separate Offline-Anwendung. Neue Einträge pflegt der Autor beziehungsweise Codex direkt in einer zentralen Datendatei. Die Seite und das PDF lesen dieselbe Quelle.

## Bestätigte Entscheidungen

- Öffentliche TRMT-Unterseite statt privater oder passwortgeschützter Anwendung.
- Nur lesen, suchen, filtern und kopieren; keine Bearbeitungsoberfläche.
- Eine zentrale strukturierte Datendatei ist die einzige Inhaltsquelle.
- Öffentlich erscheinen ausschließlich real getestete Prompts mit vorhandenem Ergebnisbild.
- Recherche-Ideen dürfen intern in derselben Datei stehen, bleiben aber mit `status: "idea"` unsichtbar.
- Ein PDF mit genau sechs A4-Querformatseiten bündelt alle getesteten Prompts.
- Keine Datenbank, kein Login, keine neue API und keine laufenden Kosten.
- Newsletter-Gating ist nicht Bestandteil dieser Version.
- Kein automatisches Deployment oder Veröffentlichung ohne separate Freigabe.

## Visuelle Referenz

Die bestätigte Richtung ist Variante C aus:

`D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-ki-slash-20260830\.superpowers\brainstorm\1340-1788160395\content\library-direction.html`

Sie kombiniert die durchsuchbare Arbeitsbibliothek aus Variante B mit einem öffentlichen PDF-Download. Die Umsetzung übernimmt das vorhandene TRMT-Designsystem: dunkler Hintergrund, Instrument Serif für große Überschriften, Inter für UI-Text, JetBrains Mono für Prompts, Honey als primärer und Teal als sekundärer Akzent.

## Informationsarchitektur

### Öffentliche Route

`/tools/bildprompt-library`

Die Seite besteht aus:

1. einer knappen Einführung mit H1, Ergebniszahl und PDF-Download;
2. einer Suchzeile;
3. einer Kategorienavigation links auf Desktop beziehungsweise horizontal scrollbar auf Mobilgeräten;
4. einer kompakten Ergebniszeile mit Trefferzahl und Reset;
5. einem responsiven Raster aus Promptkarten;
6. einem unaufdringlichen Hinweis, dass kurze Befehle modellabhängig unterschiedlich ausfallen können;
7. einem Link zum Masterartikel mit Anwendungshinweisen.

### Auffindbarkeit

- Footer-Link `Bildprompt-Library` unter Navigation.
- Eintrag in `sitemap.xml`.
- Eigenständige SEO-, Open-Graph- und Canonical-Metadaten.
- Kein Blogpost und kein Eintrag im Blogfeed.

## Datenmodell

Kanonische Datei: `src/lib/data/image-prompts.json`

Jeder getestete Eintrag enthält mindestens:

```json
{
  "id": "posepack",
  "command": "/posepack",
  "title": "Sechs Ganzkörperposen",
  "category": "menschen-posen",
  "status": "tested",
  "image": "/images/blog/ki-bildprompts/03-pose-pack.webp",
  "alt": "Sechs Ganzkörperposen aus dem Prompt /posepack",
  "articleSlug": "kuerzeste-bildprompts-menschen-posen",
  "useCases": ["YouTube-Thumbnails", "KI-Video", "Personenreferenz"]
}
```

Recherche-Einträge verwenden `status: "idea"`, haben kein öffentliches Bild und werden von allen öffentlichen Selektoren ausgeschlossen.

Die Datendatei enthält außerdem Kategorien mit stabiler Reihenfolge und kurze interne Quellenhinweise für neue Ideen. Die UI importiert nicht das rohe JSON direkt, sondern nutzt reine Hilfsfunktionen aus `src/lib/utils/prompt-library.js`. Dadurch lassen sich Validierung, Filterung und Suche ohne Browser testen.

## Kategorien

Die Website nutzt zwölf Filterkategorien:

1. Menschen & Posen
2. Avatare & Reaktionen
3. Alter & Transformation
4. Technik & Innenansichten
5. Infografiken & Wissen
6. Welten & Filmszenen
7. Spielzeug & Sammlerstücke
8. Miniaturwelten
9. Comics & Retro
10. Stoff, Knete & Glas
11. Porträt & Look
12. Creator & KI-Video

Das PDF bündelt diese zwölf Kategorien auf sechs Seiten:

1. Menschen & Posen
2. Avatare & Transformation
3. Technik & Wissen
4. Welten & Geschichten
5. Spielzeug & Materialien
6. Porträt & Creator

## Bedienung

### Suche

Die Suche berücksichtigt Befehl, Titel, Kategoriename und Usecases. Sie ist nicht case-sensitiv und ignoriert umgebende Leerzeichen.

### Filter

Ein aktiver Kategorienfilter und die Suche wirken gemeinsam. `Alle` setzt nur die Kategorie zurück. `Zurücksetzen` leert Suche und Kategorie.

### Kopieren

Jede Karte besitzt einen klaren Button `Prompt kopieren`. Er verwendet die vorhandene robuste Clipboard-Hilfe inklusive Fallback. Nach Erfolg zeigt die Karte kurz `Kopiert`; bei einem Fehler bleibt der Prompt sichtbar und die Statusmeldung erklärt, dass er manuell markiert werden kann.

### Karten

- reales Ergebnisbild, lazy geladen;
- Titel und Ein-Wort-Befehl;
- bis zu drei kurze Usecase-Begriffe;
- Kopierbutton;
- dezenter Link `Beispiel & Anwendung` zum passenden Detailartikel.

Die Bilder dienen als Vorschau und dürfen im Raster beschnitten werden. Der Klick auf das Bild öffnet die vollständige Datei in einem neuen Tab.

### Leerer Zustand

Wenn kein Prompt passt, erscheint eine klare Meldung mit Reset-Button. Es gibt keine leeren Platzhalterkarten.

## Responsives Verhalten

- Desktop ab 960 px: linke Kategorienavigation plus dreispaltiges Raster.
- Tablet: Kategorien als horizontale Leiste, zweispaltiges Raster.
- Mobil: horizontale Filterleiste, einspaltiges Raster, gut erreichbare Kopierbuttons.
- Keine horizontale Seitenüberbreite; nur die Kategorienleiste darf kontrolliert horizontal scrollen.
- Fokuszustände, Tastaturbedienung, `aria-live` für Kopierstatus und ausreichende Kontraste sind Pflicht.

## PDF

Dateiname: `trmt-bildprompt-cheatsheet.pdf`

- sechs Seiten, A4 quer;
- dunkle TRMT-Farbwelt mit Honey- und Teal-Akzenten;
- je Seite eigener Titel, kurze Einordnung, Seitennummer und TRMT-Webadresse;
- dynamisches Raster aus 3 bis 6 Spalten, abhängig von der Eintragszahl;
- jede Karte zeigt reales Ergebnisbild und Ein-Wort-Prompt;
- ausschließlich Einträge mit `status: "tested"` und vorhandenem Bild;
- Erzeugung über ein lokales Python-Skript mit ReportLab;
- Website-Kopie unter `static/downloads/`, QA-Kopie unter `output/pdf/`;
- Bilder und Datensätze werden vor dem Export validiert;
- alle sechs Seiten werden zu PNG gerendert und visuell geprüft.

## Fehlergrenzen

- Fehlende oder doppelte IDs, Befehle, Kategorien oder Ergebnisbilder lassen Tests beziehungsweise PDF-Export fehlschlagen.
- Die öffentliche Auswahl darf nie `status: "idea"` liefern.
- Ein fehlgeschlagener Clipboard-Zugriff darf die Seite nicht blockieren.
- Das PDF wird nicht zur Laufzeit auf Vercel erzeugt; damit gibt es keine Serverlast und keine zusätzliche Produktionsabhängigkeit.
- Ideen aus externer Recherche werden nicht als kopierte Fremdprompts veröffentlicht. Es werden nur kurze interne Konzeptnamen und eigene spätere Tests gespeichert.

## SEO und öffentliche Einordnung

- Title: `87 Bildprompts mit Beispielen | Kostenlose Library | TRMT`
- H1: `Bildprompt-Library`
- Description: `87 kurze Bildprompts, echte Ergebnisse und direkte Copy-Buttons. Durchsuche die kostenlose TRMT Bildprompt-Library und lade das PDF-Cheat-Sheet herunter.`
- Die Seite behauptet nicht, dass ein Ein-Wort-Prompt immer dasselbe Ergebnis erzeugt.
- Ein kurzer Hinweis erklärt, dass Modell, Ausgangsbild und Version das Resultat beeinflussen.
- Die Texte stehen eigenständig und erwähnen keine interne Video- oder Recherchequelle.

## Test- und Abnahmekriterien

1. Die Datenvalidierung zählt exakt 87 sichtbare getestete Prompts und mindestens einen unsichtbaren Ideen-Eintrag.
2. Jeder getestete Eintrag hat eine eindeutige ID, einen eindeutigen Befehl, eine gültige Kategorie und eine vorhandene Bilddatei.
3. Suche und kombinierter Kategorienfilter liefern deterministische Ergebnisse.
4. Die öffentliche Auswahl enthält keinen Ideen-Eintrag.
5. Der Kopierbutton kopiert exakt den sichtbaren Slash-Befehl.
6. Der PDF-Export erzeugt genau sechs Seiten; alle getesteten Prompts erscheinen genau einmal.
7. Text-Extraktion aus dem PDF enthält repräsentative Befehle aus allen sechs Seiten.
8. PNG-Renderings zeigen keine Überlappungen, abgeschnittenen Befehle oder defekten Bilder.
9. Browser-QA prüft Desktop und Mobil, Suche, Kategorie, Reset, Copy-Status, Bildlink, Artikellink und PDF-Download.
10. `npm run check` und `npm run build` werden frisch ausgeführt; bereits bekannte Projektfehler werden getrennt von neuen Regressionen ausgewiesen.

## Nicht Bestandteil

- Newsletter-Leadmagnet oder E-Mail-Zwang vor dem Download
- Administration im Browser
- Nutzerkonten, Favoriten oder Cloud-Synchronisierung
- automatische Bildgenerierung
- Veröffentlichung ungetesteter Prompts
- automatische Produktionsveröffentlichung
