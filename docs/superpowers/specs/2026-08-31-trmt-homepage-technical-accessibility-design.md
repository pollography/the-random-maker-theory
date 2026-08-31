# TRMT Homepage Technical Accessibility Design

**Status:** zur Freigabe
**Basis:** `origin/main` bei `9f6f19a` im isolierten Worktree `codex/trmt-homepage-a11y`
**Ziel:** Die technisch belegten Impeccable-, Accessibility- und Performance-Maengel der TRMT-Homepage reparieren, ohne Hero, Inhalte, Reihenfolge oder visuelle Identitaet neu zu gestalten.

## Begrenzter Umfang

Diese Welle veraendert nur technische Bedienbarkeit, Rueckmeldung, Kontrast und Bewegungsreduktion. Sie umfasst:

1. verstaendliche Newsletter-Zustaende fuer sichtbare Nutzer und Screenreader,
2. programmatisch erkennbare aktive Navigation,
3. kontrollierbares Mobile-Menue mit Escape, Click-outside und Fokus-Rueckgabe,
4. deutsch beschrifteten Theme-Schalter mit mindestens 44 x 44 px,
5. einen Skip-Link zum Hauptinhalt,
6. sichtbare Tastaturfoki und mindestens 44 px hohe relevante Linkziele,
7. reduzierte Animation bei `prefers-reduced-motion`,
8. WCAG-AA-taugliche neutrale Texttokens fuer normale und kleine Texte.
9. die render-blockierende externe Font-Kette entfernen,
10. YouTube erst nach bewusster Nutzeraktion laden,
11. die Homepage-Daten ausschliesslich serverseitig erzeugen und den Browser nicht mehr mit den Content-Modulen aller Artikel und Podcastfolgen beladen,
12. nur die sechs auf der Homepage benoetigten Artikel-Metadaten an den Browser uebergeben.

Ausdruecklich nicht enthalten sind:

- neue Hero-Texte oder Hero-Elemente,
- Umordnung oder Kuerzung der Inhaltsbereiche,
- andere Themenkarten, Emojis, Post-Auswahl oder Newsletter-Anzahl,
- neue SEO-Metadaten, Artikelbearbeitungen oder Pollography-Aenderungen,
- NotebookLM-, n8n-, Deployment-, Publish- oder globale Skill-Aenderungen,
- eine Bereinigung der bereits vorhandenen 79 `svelte-check`-Fehler und 9 Warnungen ausserhalb der beruehrten Dateien.

## Frische Performance-Baseline

Die Performance wird nicht aus dem Design-Audit abgeleitet, sondern ist am 31.08.2026 separat gemessen worden:

| Messung | Score | FCP | LCP | TBT | CLS | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| Live, Lighthouse Mobile | 66 | 5,3 s | 5,4 s | 0 ms | 0,07 | 655 KiB |
| Live, Lighthouse Desktop | 91 | 1,3 s | 1,4 s | 0 ms | 0,014 | 1.919 KiB |
| Lokale Produktionsvorschau, Mobile | 61 | 6,2 s | 6,3 s | 0 ms | 0,07 | 654 KiB |

Lighthouse weist mobil bis zu 1,63 s Einsparpotenzial durch render-blockierende Requests aus. Die Google-Font-Kette beginnt als CSS-`@import`, uebertraegt rund 112 KiB von Fremd-Hosts und verlaengert die kritische Abhaengigkeitskette. Desktop werden bereits beim ersten Seitenaufruf rund 1 MiB YouTube-Ressourcen geladen, obwohl das Video weit unterhalb des Hero liegt. Zusaetzlich lieferte die Live-Homepage mobil 98 eigene Script-Requests mit rund 528 KiB JavaScript aus. Die Ursache ist der universelle `+page.ts`-Loader: Seine eager Content-Globs werden in den Client-Graph aufgenommen, obwohl die Homepage daraus nur sechs Artikelkarten und eine Podcastkarte rendert. Der Server selbst ist mit rund 20 ms TTFB nicht der Engpass; TBT liegt bei 0 ms. Die PageSpeed-API war wegen HTTP 429 nicht nutzbar, daher bleiben reale CrUX-/Nutzerdaten `UNKNOWN`.

## Abgewogene Performance-Ansätze

1. **Gezielte Critical-Path-Welle (empfohlen):** Den universellen Homepage-Loader in einen Server-Loader umwandeln, Nutzdaten auf die sichtbaren Karten begrenzen, Fonts lokal ausliefern und YouTube als Click-to-load einbetten. Das entfernt die drei konkret gemessenen Hauptursachen bei kleinem, reversiblem Aenderungsradius.
2. **Zusaetzliche Asset-/Rendering-Welle:** fuenf Thumbnails neu komprimieren und aggressive `content-visibility`-Grenzen setzen. Spart laut Audit nur etwa 40 KiB und birgt sichtbare Bild- beziehungsweise Scrollbar-/CLS-Risiken; deshalb erst nach erneuter Messung.
3. **Weiterer Rendering-/Architekturumbau:** CSS-Bundling, generierter Metadatenindex, Scroll-Handler-Umbau und umfassende Route-Splitting-Arbeit. Groesserer Wartungs- und Regressionsradius; bei aktuell 0 ms TBT fuer diese erste technische Welle nicht gerechtfertigt.

Die Umsetzung folgt Ansatz 1. Ansatz 2 wird nur als spaeterer, separat sichtbar gepruefter Schritt vorgeschlagen, falls die gemessenen Ziele nach Ansatz 1 verfehlt werden. Ansatz 3 bleibt ausserhalb des Auftrags.

## Technisches Design

### Newsletter-Rueckmeldung

`NewsletterSignup.svelte` behaelt Text, API und Formularablauf. Das E-Mail-Feld erhaelt ein visuell verstecktes echtes Label `E-Mail-Adresse`, eine pro Komponenteninstanz mit Sveltes `$props.id()` erzeugte eindeutige ID sowie `autocomplete="email"`. Das Formular meldet den laufenden Request mit `aria-busy`. Der Button zeigt waehrenddessen `Wird angemeldet…` statt `...`. Erfolg wird als hoeflicher Live-Status, Fehler als unmittelbarer Alert ausgegeben. Das verhindert stille Zustandswechsel, ohne neue UI-Flaechen einzufuehren.

### Navigation und Mobile-Menue

`Header.svelte` setzt `aria-current="page"` auf den jeweils aktiven Desktop- und Mobile-Link; auf `/` uebernimmt das Logo diesen Zustand. Routen werden an Segmentgrenzen erkannt, damit beispielsweise `/blogroll` nicht versehentlich als Blog gilt. Der Burger verweist per `aria-controls` auf das Menue und benennt seine aktuelle Aktion auf Deutsch. Escape schliesst ein offenes Menue und gibt den Fokus an den Burger zurueck. Ein Klick ausserhalb des Headers schliesst es ebenfalls. Linkklicks behalten das bisherige Schliessen bei; das nichtmodale Disclosure erhaelt keinen Fokus-Trap.

### Skip-Link, Fokus und Trefferflaechen

`+layout.svelte` erhaelt vor dem Header einen erst bei Tastaturfokus sichtbaren Link `Zum Inhalt springen`; das vorhandene `main` erhaelt das zugehoerige Ziel und `tabindex="-1"`, damit Aktivierung nicht nur scrollt, sondern den Tastaturfokus verlaesslich versetzt. Globale und komponentennahe `:focus-visible`-Regeln verwenden den vorhandenen Honig-Akzent mit ausreichendem Abstand. Theme-Schalter, Header-/Footer-Navigation und die kleinen Homepage-Section-Links erhalten mindestens 44 px Zielhoehe, ohne die bestehende 56-px-Headergeometrie zu vergroessern. Inhalt und Reihenfolge bleiben gleich.

### Kontrast

Die dunklen neutralen Texttokens werden minimal aufgehellt: `--color-text-muted` auf `#9a9186` und `--color-text-dim` auf `#8d857b`. Damit ergeben sich rechnerisch auf `#1a1a1a` mindestens 5,61:1 beziehungsweise 4,79:1. Im hellen Theme bleibt `--color-text-muted: #5a534b`; `--color-text-dim` wird auf `#625c56` gesetzt und erreicht auf der hellen Kartennaeherung `#e6ded0` etwa 4,94:1.

Fuer Text und Icons kommen getrennte semantische Foreground-Tokens fuer Honey, Teal, Danger und Fokus hinzu. Im dunklen Theme entsprechen sie den bestehenden Akzenten; im hellen Theme werden sie dunkler kalibriert, ohne die Akzentfarben fuer Buttons, Flaechen, Gradients und Glows zu veraendern. `--color-on-accent` wird im hellen Theme auf `#111111` gesetzt, damit Buttontext auf Honey und Teal sicher lesbar bleibt. Nur Text-/Icon-Verwendungen in Homepage, Header, Footer, ThemeToggle und Newsletter werden auf die Foreground-Tokens umgestellt. Markenflaechen und Schatten bleiben unveraendert.

### Reduzierte Bewegung

Die bestehende Bounce-Animation erhaelt eine explizite weiche Easing-Kurve. Bei `prefers-reduced-motion: reduce` werden Smooth Scrolling, die dauerhafte Bounce-Bewegung, der Mobile-Menue-Einflug und die rein dekorativen Lift-/Zoom-Bewegungen der direkt beteiligten Homepage-Komponenten gezielt deaktiviert. Zustandsfeedback wird nicht durch einen pauschalen globalen Animations-Kill entfernt. Der JavaScript-Zaehler ueberspringt seine Count-up-Animation und zeigt direkt den Endwert. Ohne diese Systemeinstellung bleibt das bestehende Erlebnis erhalten.

### Lokale Fonts und kritischer Renderpfad

Die vier auf der Homepage tatsaechlich angeforderten WOFF2-Dateien fuer Instrument Serif Regular und Italic, Inter Variable und JetBrains Mono Variable werden mit ihrer offenen Google-Fonts-Lizenz unter `static/fonts/` abgelegt. `app.css` ersetzt den externen Google-CSS-`@import` durch lokale `@font-face`-Regeln mit `font-display: swap`. `app.html` entfernt die beiden Google-Preconnects und laedt beide fuer den textbasierten Hero-LCP benoetigten Instrument-Serif-Schnitte vor, weil die H1 Regular- und Italic-Text enthaelt. Die Fontfamilien und damit der sichtbare Markencharakter bleiben unveraendert; lediglich Host, Abhaengigkeitskette und Fallback-Verhalten aendern sich.

### YouTube nur nach Nutzeraktion

Der bestehende Videoabschnitt, Titel und seine Position bleiben erhalten. Vor der Interaktion erscheint ein lokal abgelegtes, komprimiertes Poster mit eindeutigem Play-Button. Erst ein Klick erzeugt das Iframe und startet das Video ueber `youtube-nocookie.com`; vorher duerfen keine Requests an YouTube, ytimg, DoubleClick oder Google Ads entstehen. Tastaturaktivierung, sichtbarer Fokus und ein beschreibender Accessible Name sind Pflicht.

### Serverseitiger Homepage-Loader und kleinere Nutzdaten

`src/routes/+page.ts` wird in `src/routes/+page.server.ts` umbenannt. Der bestehende prerenderbare Loader laeuft dadurch ausschliesslich auf dem Server beziehungsweise waehrend des statischen Builds; die eager Content-Globs aus `posts.ts` und `episodes.ts` gelangen nicht mehr in den Client-Modulgraphen der Homepage. Die Gesamtzahl wird weiterhin aus allen veroeffentlichten Artikeln und der neuesten Podcastfolge berechnet, an den Browser gehen aber nur die sechs auf der Homepage gerenderten Artikel-Metadaten und die eine sichtbare Podcastfolge. Inhalt, Sortierung, Zaehler und Anzahl sichtbarer Karten aendern sich nicht.

Der bestehende `bind:scrollY`, der mobile Hintergrund und die Sticky-Header-Darstellung bleiben in dieser Welle bewusst unveraendert: Die Messung zeigt 0 ms TBT und keinen Beleg, dass diese Stellen vor Server-Loader, Fonts oder YouTube der relevante Engpass sind. Aggressives globales `content-visibility`, neue CSS-Bundling-Regeln und Bild-Neukompression gehoeren ebenfalls noch nicht zu dieser Welle.

## Fehler- und Randfallverhalten

- Ein fehlgeschlagener Newsletter-Request laesst das Formular bedienbar und gibt die bestehende Fehlermeldung als Alert aus.
- Mehrfachklicks waehrend eines Requests bleiben durch `disabled` und `aria-busy` blockiert.
- Escape veraendert nichts, wenn das Mobile-Menue geschlossen ist.
- Click-outside schliesst nur das offene Mobile-Menue; Klicks innerhalb des Headers werden nicht abgefangen.
- Ohne `matchMedia` bleibt der bestehende Counter-Fallback erhalten.
- Die zwei bestehenden Newsletter-Instanzen duerfen keine doppelten DOM-IDs erzeugen; jede Instanz leitet ihre Feld-ID deshalb aus `$props.id()` ab.
- Ohne Video-Klick existiert kein Iframe; nach dem Klick bleibt der vorhandene Videotitel erhalten und das eingebettete Video ist bedienbar.
- Falls lokale Fonts nicht laden, zeigt `font-display: swap` sofort die bestehenden System-Fallbacks statt unsichtbarem Text.

## Verifikation

Die Umsetzung erfolgt testgetrieben in kleinen Schritten:

1. Ein neuer statischer Node-Vertragstest liest die betroffenen Svelte-/CSS-Dateien und schlaegt vor der Implementierung fuer die fehlenden Accessibility-Merkmale fehl.
2. Jeder Teil wird erst nach beobachtetem RED minimal implementiert und danach auf GREEN gebracht.
3. Die auf der aktuellen Basis 20 Tests umfassende Node-Suite muss weiterhin vollstaendig bestehen.
4. `svelte-check` darf gegen die dokumentierte Ausgangsbasis von 79 Fehlern und 9 Warnungen nicht schlechter werden; neue Meldungen in beruehrten Dateien werden behoben.
5. Die Vite-Kompilierungsstufe des Builds muss weiterhin erfolgreich sein. Der bekannte Windows-`EPERM`-Symlinkfehler des Vercel-Adapters wird separat als Baseline-Grenze ausgewiesen.
6. Ein lokaler Browserdurchlauf prueft Desktop und 390 x 844 px, Dark und Light Theme, Tastaturfokus, Skip-Link auch auf einer Unterseite, aktive Navigation, Mobile-Menue, Video-Aktivierung und Reduced Motion.
7. Kontrastwerte werden fuer die geaenderten neutralen Tokens rechnerisch gegengeprueft.
8. `git diff --check` muss sauber sein; nur die in diesem Dokument genannten Projektdateien und die zugehoerigen Test-/Plan-Dokumente duerfen veraendert sein.
9. Lighthouse wird auf derselben lokalen Produktionsvorschau dreimal mobil und einmal Desktop ausgefuehrt; fuer Mobile wird der Median mit der dokumentierten Vorher-Messung verglichen.
10. Vor dem Video-Klick muessen externe Google-Font- und YouTube-/Werbe-Requests jeweils 0 betragen. Nach dem Klick muss genau dann das Video-Iframe entstehen.
11. Der erzeugte Homepage-Client darf keine Blog- oder Podcast-Markdown-Module mehr als Modulepreloads enthalten. Script-Anzahl, eigene JavaScript-Bytes und Gesamttransfer werden aus dem Lighthouse-Netzwerkprotokoll gegen die Baseline ausgewertet.

## Erfolgskriterien

- Newsletter-Laden, Erfolg und Fehler sind programmatisch wahrnehmbar.
- Alle Hauptwege besitzen einen eindeutigen Tastaturfokus; die genannten kleinen Ziele sind mindestens 44 px hoch.
- Der aktive Navigationsweg ist per `aria-current` erkennbar.
- Das offene Mobile-Menue kann mit Escape und Click-outside verlassen werden; Escape gibt Fokus zurueck.
- Skip-Link erreicht den Hauptinhalt.
- Reduzierte Bewegung verhindert Bounce und Count-up.
- Die geaenderten neutralen Textfarben erreichen mindestens 4,5:1 auf ihren primaeren Flaechen.
- Mobile Lighthouse soll im Median mindestens 85 Punkte, weniger als 2,5 s FCP und LCP sowie hoechstens 0,05 CLS erreichen. Falls eines dieser Ziele trotz nachweislicher Critical-Path-Verbesserung verfehlt wird, bleibt Performance `PARTIAL` und Ansatz 2 wird nicht stillschweigend als erledigt ausgegeben.
- Die Homepage liefert hoechstens 20 eigene Script-Requests und hoechstens 100 KiB eigenes JavaScript aus; Blog- und Podcast-Markdown-Chunks werden nicht an den Browser geschickt.
- Der initiale Gesamttransfer liegt mobil unter 300 KiB und Desktop unter 600 KiB. Desktop Lighthouse bleibt mindestens bei 90 Punkten.
- Der erste Seitenaufruf besitzt keine Requests an `fonts.googleapis.com`, `fonts.gstatic.com`, `youtube.com`, `ytimg.com`, `doubleclick.net` oder Google-Ads-Hosts.
- Keine Hero-, Inhalts-, Struktur-, Publish- oder Deployment-Aenderung gelangt in den Patch.

## Rollback

Die Aenderung bleibt in einem separaten Worktree und einer separaten Branch. Es wird weder committed noch gepusht noch deployed, solange dafuer keine eigene Freigabe vorliegt. Der Patch kann daher durch Entfernen des Worktrees oder gezieltes Rueckgaengigmachen der wenigen geaenderten Dateien vollstaendig verworfen werden.
