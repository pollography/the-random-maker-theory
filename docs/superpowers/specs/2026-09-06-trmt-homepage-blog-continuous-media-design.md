# TRMT Homepage, Medienmodule und fortlaufendes Blogarchiv

**Status:** Grundstruktur A3 vom Nutzer am 6. September 2026 bestaetigt; schriftliches Spec-Review offen

**Basis:** `origin/main` bei `962cb2634819700fa8665ed4677b13014ca1c695`

**Arbeitsbereich:** isolierter Worktree `D:\AI_Workspaces\Claude_Code\.release-worktrees\trmt-homepage-blog-final-20260906`, Branch `codex/trmt-homepage-blog-final-20260906`

**Ziel:** Die bestaetigte Homepage-Variante A3 als ruhige, medientaugliche TRMT-Startseite umsetzen, das Blogarchiv automatisch fortlaufend laden und die Bildsprache auf native 16:9-Motive vereinheitlichen, ohne den initialen Seitenaufruf durch Drittanbieter-Player oder das komplette Artikelarchiv zu belasten.

## Bestaetigte Produktentscheidung

Die Startseite folgt dieser Reihenfolge:

1. kompakter Marken-Hero mit genau einem Primaer-CTA `Zum Blog`;
2. fuenf direkt sichtbare Themenkarten ohne zusaetzliche Ueberschrift;
3. `Das Neueste aus der Werkstatt` mit exakt den vier neuesten veroeffentlichten Artikeln in strenger Chronologie;
4. der vorhandene kurze Orientierungsabsatz;
5. ein klar erkennbares YouTube-Video, eine tatsaechlich abspielbare Podcastfolge und die direkte Newsletter-Anmeldung;
6. die bestehende FAQ und der vorhandene Footer.

Die Homepage bleibt die kuratierte Eingangstuer. `/blog` wird das vollstaendige chronologische Scrollarchiv. Video und Podcast sollen auf TRMT konsumierbar sein, behalten aber sichtbare Links zu YouTube beziehungsweise Spotify fuer Abos, Kommentare und Plattformreichweite.

## 1. Hero und Themenzugang

Der Hero behaelt Markenname, redaktionelles Versprechen, Badge und Zaehler, wird aber luftiger und kuerzer als die alte Full-Viewport-Fassung. Der bisherige Button `Themen waehlen` entfaellt. Es bleibt genau ein orangefarbener Link:

- **`Zum Blog`** -> `/blog`

Die fuenf Themenkarten folgen unmittelbar. Die sichtbare Ueberschrift `Womit willst du anfangen?` beziehungsweise eine Ersatzueberschrift wird nicht gerendert. Fuer Screenreader erhaelt der Bereich weiterhin eine eindeutige, visuell versteckte Beschriftung.

Desktop zeigt fuenf gleichwertige Karten in einer Reihe. Auf Mobile wird die Reihe horizontal scrollbar, besitzt CSS Scroll-Snap und zeigt einen Anschnitt der naechsten Karte. Nur die Themenreihe darf horizontal scrollen; die Seite selbst darf keinen horizontalen Overflow bekommen.

## 2. Native 16:9-Themenbilder

Alle fuenf Themenmotive werden als zusammenhaengende neue Serie nativ in 16:9 erzeugt. Die vorhandenen quadratischen Dateien bleiben fuer einen sicheren Rollback erhalten; `CORE_TOPICS` verweist nach der Freigabe auf neue Dateinamen. Das ist eine vom Nutzer fuer diese Homepage bestaetigte projektspezifische Ausnahme zur bisherigen quadratischen Themenkarten-Regel und aendert keine globale Skill-Datei.

Die Motive folgen dem aktuellen TRMT-Crafted-Editorial-System und werden nicht aus 1:1-Quellen gecroppt:

- **KI & Tech:** eine sofort lesbare physische Mensch-Maschine-/Wissensschnittstelle;
- **Maker & DIY:** eine handgebaute Werkbank-Maschine mit konkreter Bauhandlung;
- **Automatisierung:** ein sichtbarer Ablauf, der Arbeit selbststaendig weiterreicht;
- **Fotografie:** ein klares Kamera-/Licht-/Bearbeitungsmotiv statt einer dunklen, unlesbaren Nische;
- **Produktivitaet:** ein physischer Sortier- oder Entlastungsmechanismus statt allgemeiner Notizzettel-Deko.

Jedes Bild besitzt genau eine Hauptidee, bleibt textfrei und muss im echten 400-x-225-Kartenbild nach einer Sekunde verstaendlich sein. Mini-Pollo darf die selbstironische Handlung tragen, das Sachmotiv muss aber vollstaendig lesbar bleiben. Die fuenf 400-x-225-Ableitungen duerfen zusammen hoechstens 160 KiB wiegen; groessere 16:9-Quellen werden nur ueber `srcset` an groesseren Renderflaechen ausgeliefert.

Alle Themenbilder erhalten feste intrinsische Dimensionen, `decoding="async"`, passende `sizes` und das bestehende responsive Bild-Metadatensystem. Sie sind keine LCP-Ressourcen.

## 3. Das Neueste aus der Werkstatt

Der Abschnitt heisst verbindlich **`Das Neueste aus der Werkstatt`**. Er zeigt keine manuell kuratierte oder nach Kategorien diversifizierte Auswahl mehr. Die serverseitige Quelle wird stabil nach `date DESC, slug ASC` sortiert und liefert nur `slice(0, 4)` an die Homepage.

Die Darstellung folgt A3:

- der neueste Beitrag ist eine breite Leitkarte mit 16:9-Bild und eigenem Textbereich;
- darunter stehen die drei folgenden Artikel als gleichwertige Karten in einer Reihe;
- bei diesen drei Karten liegt das vollstaendige 16:9-Bild ueber Titel und Metadaten, nie als schmaler seitlicher Ausschnitt;
- Mobile stapelt alle vier Karten in identischer DOM- und Lesereihenfolge;
- `Alle Beitraege` verlinkt normal auf `/blog`.

Alle vier Bilder verwenden die vorhandenen 16:9-Thumbnails, feste Dimensionen und responsive Quellen. Nur das sichtbare Leitbild darf `loading="eager"` und hohe Fetch-Prioritaet erhalten; die drei nachfolgenden Bilder bleiben lazy.

## 4. YouTube-Modul: deutlich erkennbar, aber erst nach Klick geladen

### Abgewogene Varianten

1. **Iframe sofort laden:** auf der Seite bequem, aber unnoetig schwer und mit Drittanbieter-Requests vor jeder Interaktion. Verworfen.
2. **Nur zu YouTube verlinken:** technisch sehr leicht, verliert aber die vom Nutzer gewuenschte direkte Wiedergabe und schickt Leser sofort von TRMT weg. Verworfen.
3. **Lokale Klick-Fassade mit spaetem Privacy-Embed:** klarer Player auf TRMT, vor dem Klick keine YouTube-Requests und danach ein echter Player. Bestaetigte Richtung.

Das Modul zeigt ein lokal gespeichertes 16:9-Vorschaubild, einen grossen roten Play-Button, eine schmale rote Rahmenkante und den sichtbaren Hinweis `YouTube-Video`. Es wird kein nachgebautes YouTube-Logo verwendet. Der rote Akzent bleibt auf Player, Label und Fokuszustand begrenzt und konkurriert nicht mit Honey und Teal im restlichen Design.

Erst der Klick ersetzt die Fassade durch einen offiziellen `youtube-nocookie.com`-Iframe mit `autoplay=1`, sichtbaren Controls, `playsinline=1`, Fullscreen und einem korrekten Referrer-Kontext. Der Nutzer bleibt auf TRMT. Direkt beim Titel steht zusaetzlich der normale externe Link **`Auf YouTube oeffnen`**, damit Kommentare, Kanalbesuch und Abo weiterhin moeglich sind.

Die Homepage zeigt nicht laenger das aeltere, hart codierte Prompt-Engineering-Video. Aus den lokalen Podcast-/Medienmetadaten wird beim Build die neueste veroeffentlichte Episode mit nichtleerer `videoUrl` gewaehlt. Der am 6. September 2026 gepruefte aktuelle Treffer ist `KI Bildbearbeitung: Mein Workflow als Hochzeitsfotograf` (`l-PP-PrOdAs`). Bei einer spaeteren Episode mit echter Video-URL wechselt die Homepage beim naechsten Build automatisch.

Vor Sichtnaehe des Abschnitts wird auch das lokale Poster nicht angefordert. Vor dem Klick duerfen keine Requests an YouTube, `ytimg`, DoubleClick oder Google-Ads-Hosts entstehen. Der echte Iframe darf erst durch die bewusste Aktivierung in den DOM gelangen.

## 5. Podcast-Modul: neueste wirklich hoerbare Folge

Die vorhandene Datenlage enthaelt mehrere Episoden ohne Audio-URL. Deshalb darf die Homepage weder die nominell neueste Metadaten-Datei noch eine dekorative Fake-Wellenform als abspielbar ausgeben. Ausgewaehlt wird stabil die neueste veroeffentlichte Episode mit einer nichtleeren `audioUrl`, sortiert nach `date DESC, slug ASC`.

Der am 6. September 2026 gepruefte aktuelle Treffer ist ebenfalls `KI Bildbearbeitung: Mein Workflow als Fotograf` mit der Spotify-Episode `2gg5xxS45Nusk0vC1kknD3`. Das Modul wird mit `Direkt anhoeren` beschriftet, nicht mit einer falschen Behauptung ueber eine noch nicht veroeffentlichte Audiofolge.

Vor dem Klick zeigt TRMT eine leichte eigene Fassade aus Cover, Titel, Dauer und Play-Button. Der erste Klick laedt den offiziellen Spotify-Episode-Embed und versucht ueber die offizielle Iframe-Steuerung die Wiedergabe zu starten. Weil Browser wie Safari automatischen Ton auch bei programmatischer Steuerung blockieren koennen, bleibt der native Spotify-Play-Button sichtbar und bedienbar. Dieser best-effort-Fallback wird nicht als garantierter Ein-Klick-Autostart beschrieben.

Das Spotify-Script und der Iframe werden erst nach dem Klick geladen. Der Embed behaelt die von Spotify geforderten Attribute einschliesslich `encrypted-media`. Ein sichtbarer Link **`Auf Spotify oeffnen`** und der interne Link **`Alle Folgen`** bleiben erhalten. Fehlt jede echte Audio-URL, rendert die Homepage keinen Player, sondern nur einen ehrlichen Link zur Podcastuebersicht.

## 6. Newsletter-Modul

Der Newsletter bleibt kein dekorativer Linkkasten. Die bestehende funktionsfaehige `NewsletterSignup`-Logik wird direkt in die A3-Karte integriert:

- sichtbares E-Mail-Feld mit echtem Label und `autocomplete="email"`;
- direkter Button `Eintragen`;
- bestehender Double-Opt-In-Ablauf ueber `/api/newsletter`;
- sichtbare und programmatisch angekuendigte Lade-, Erfolgs- und Fehlerzustaende;
- kurzer Hinweis auf Abmeldung und Spamfreiheit.

Es wird kein zweites Newsletter-Formular im Footer eingefuehrt. Das vorhandene API- und Datenschutzmodell bleibt unveraendert.

## 7. Fortlaufendes Blogarchiv

`/blog` zeigt die Artikel weiterhin servergerendert in stabiler Chronologie, laedt Folgeseiten aber nach unten automatisch nach. Die bestehenden crawlbaren Routen `/blog/seite/2` bis `/blog/seite/N` bleiben als SEO-, No-JavaScript- und Fehler-Fallback erhalten.

### Ladeverhalten

- Der erste Request enthaelt nur die ersten 12 Artikel.
- Ein `IntersectionObserver` beobachtet einen Sentinel mit ungefaehr 600 bis 900 CSS-Pixeln Vorlauf.
- Bei Sichtnaehe wird genau eine naechste 12er-Seite ueber die bestehende begrenzte JSON-Route angefordert.
- Doppelte Slugs werden vor dem Anhaengen verworfen.
- Solange ein Request laeuft, kann kein zweiter gestartet werden.
- Nach dem letzten Batch wird der Observer getrennt und `Alle Artikel geladen` angezeigt.
- Bilder in neu angehaengten Karten bleiben lazy und werden erst in ihrer eigenen Sichtnaehe geladen.

Auf der ersten Seite gibt es im Normalzustand keine sichtbaren Seitennummern und keinen erforderlichen `Mehr laden`-Klick. Eine dezente Ladeanzeige und ein `aria-live`-Status nennen den Fortschritt. Bei Fetch-Fehlern erscheint ein echter Retry-Button sowie ein normaler Link zur naechsten Archivseite. Ohne JavaScript bleibt ein normaler `Weiter`-Link erreichbar. Direkte Aufrufe paginierter URLs behalten ihre Seitennavigation und Self-Canonicals.

Die FAQ bleibt nur auf `/blog`. Nachgeladene Batches duerfen weder weitere FAQ-Kopien noch neue `head`-Metadaten einstreuen. Der servergerenderte `CollectionPage`-Datensatz beschreibt weiterhin nur die initiale kanonische Seite; die Einzelartikel bleiben ueber Sitemap und die paginierten Archivseiten vollstaendig crawlbar.

## 8. Neues Fable-5.1-Titelbild

Der Artikel `claude-fable-5-1-preis-benchmarks` erhaelt ein komplett neues natives 16:9-Hero im aktuellen TRMT-Crafted-Editorial-System. Das alte dunkle Glasplatten-/Chipmotiv wird nicht weiterverwendet und nicht lediglich nachbearbeitet.

Die Bildaussage ist **wiederverwendeter Kontext wird am Cache-Ruecklauf drastisch billiger**: Ein klarer physischer Token-/Kontextkreislauf fuehrt bereits gelesene Elemente durch ein sichtbares Cache-Tor zurueck; die Preismechanik faellt von `1` auf `0,25`. Diese beiden kurzen Kontextanker sind die einzige zulaessige Copy im Bild. Mini-Pollo wird von seinem uebertrieben effizienten Ruecklauf charmant mitgezogen, waehrend Kreislauf und Preisvorteil auch ohne die Figur verstaendlich bleiben.

Hero und Thumbnail werden als neue, versionierte Dateien eingebunden:

- 1200 x 675 WebP fuer Artikel und grosse Karten;
- 400 x 225 WebP fuer Archiv- und Homepagekarten;
- zentrale Safe-Zone fuer Kreislauf, Cache-Tor, Preiswechsel und vollstaendige Figur;
- aktuelle Rechte-/Credit-Metadaten und Alt-Text;
- Blindtest im 400-x-225-Format sowie reale Desktop-/Mobile-Komponentenpruefung.

Das bisherige Asset bleibt unreferenziert im Repository, bis eine getrennte spaetere Bereinigung ausdruecklich freigegeben wird.

## 9. Performance-, Datenschutz- und Marketingvertrag

Die Umsetzung darf keine neue Runtime-Abhaengigkeit einfuehren. Blog-, Podcast- und Artikelmetadaten werden im server-only Homepage-Loader verarbeitet; an den Browser gehen nur vier Artikel, der eine Video-Datensatz und die eine wirklich spielbare Audioepisode.

Harte Gates:

- vor Video-Klick 0 YouTube-/Google-Werbe-Requests;
- vor Podcast-Klick 0 Spotify-Requests;
- keine eingebetteten Drittanbieter-Iframes im initialen DOM;
- Blog-Startpayload maximal 12 Artikel, keine Liste aller Artikel im Client-State;
- keine Bilddatei ohne feste Dimensionen;
- alle Offscreen-Artikelbilder lazy;
- keine Regression bei LCP, CLS, TBT, eigenem JavaScript und initialem Transfer gegen denselben lokalen Produktions-Basisstand;
- CLS hoechstens 0,05 und TBT weiterhin ohne messbare Regression;
- kein horizontaler Seiten-Overflow bei 320, 390, 768 und 1440 CSS-Pixeln.

Marketingprioritaet ist **Onsite first, Plattform second**: Ein Klick auf Play ermoeglicht Konsum auf TRMT; separate Links zu YouTube und Spotify bleiben sichtbar, aber nicht primaerer Klickpfad. So bleibt die Lesereise zusammenhaengend, ohne Plattformabos und Kommentare abzuschneiden.

## 10. Accessibility und Fehlerverhalten

- Alle Themen, Artikel-CTAs und Plattformwege sind echte Links.
- Play-Fassaden sind echte Buttons mit vollstaendigem Accessible Name.
- Tastaturaktivierung entspricht dem Klickverhalten.
- Fokus bleibt beim Player sichtbar; nach dem Austausch wird er sinnvoll in den echten Player uebergeben, soweit der Fremd-Iframe dies erlaubt.
- Reduzierte Bewegung deaktiviert dekorative Hover-Lifts, nicht notwendige Statusrueckmeldung.
- Lade- und Fehlerzustaende des Blogfeeds werden per `aria-live` angekuendigt.
- Ein Feedfehler entfernt bereits geladene Artikel nicht.
- Leere Video- oder Audio-URLs erzeugen keinen falschen Play-Button.
- Wenn ein Fremdplayer blockiert wird, bleibt der externe Plattformlink nutzbar.

## 11. Frische Ausgangslage

- isolierter Worktree basiert bytegenau auf `origin/main` bei `962cb2634819700fa8665ed4677b13014ca1c695`;
- `node --test`: 133 von 133 Tests bestanden;
- der schmutzige Haupt-Checkout wurde nicht veraendert;
- der aktuelle YouTube-Kanal enthaelt als juengstes langes Video `l-PP-PrOdAs`, gefolgt von `KWIH_InMQZ8`;
- nur Episode 003 besitzt derzeit eine nichtleere Spotify-Audio-URL;
- der bestehende Homepage-Code besitzt bereits eine lokale Klick-Fassade fuer YouTube, aber noch ohne roten YouTube-Akzent und mit dem aelteren Video;
- der bestehende Podcastbereich ist derzeit nur eine Linkkarte und kein Player.

`npm ci` meldet 17 vorhandene Abhaengigkeitswarnungen beziehungsweise Vulnerabilities. Ein pauschales Dependency-Upgrade oder `npm audit fix` ist nicht Teil dieses UI-Auftrags und wird nicht still ausgefuehrt.

## 12. Verifikation

Die Implementierung erfolgt testgetrieben. Fertig bedeutet mindestens:

1. neue Unit-Tests fuer stabile neueste-vier-Auswahl sowie neueste nichtleere Video-/Audioquelle beginnen rot und enden gruen;
2. Feed-Tests decken automatische sequenzielle Batches, Deduplizierung, letzte Seite, Fehler, Retry und No-JavaScript-Link ab;
3. Homepage-Vertragstests pruefen einen Hero-CTA, fehlende sichtbare Themenueberschrift, fuenf Themenlinks, A3-Kartenreihenfolge und echte Newsletterfelder;
4. Video-Tests pruefen lokales Poster, roten Akzent, 0 Drittanbieter-Requests vor Klick und `youtube-nocookie.com` erst danach;
5. Podcast-Tests pruefen Auswahl nur aus nichtleeren Audio-URLs, 0 Spotify-Requests vor Klick, echten Embed nach Klick und externen Fallbacklink;
6. Bildtests pruefen 16:9-Dimensionen, responsive Varianten, Budget und aktuelle Metadaten;
7. `node --test` bleibt vollstaendig gruen;
8. `svelte-check` wird gegen die vorhandene normalisierte Fehlerbasis verglichen; geaenderte Dateien duerfen keine neue Diagnose enthalten;
9. der Produktionsbuild muss die SvelteKit-/Vite-Kompilierung bestehen; ein bekannter lokaler Windows-Vercel-Symlinkfehler wird getrennt von der Kompilierung ausgewiesen;
10. Desktop- und Mobile-Browser-QA pruefen Dark/Light, Tastatur, Reduced Motion, Scrollfeed, Feedfehler, Video, Podcast, Newsletter, Konsole und Overflow;
11. ein echter Netzwerk-Readback belegt die Drittanbieter- und Lazy-Load-Gates;
12. kontrollierte Lighthouse-Laeufe verwenden dieselbe Version, Viewports und Cold-Cache-Bedingungen vor und nach der Aenderung; der Median entscheidet;
13. `git diff --check`, `git status --short` und ein vollstaendiges Untracked-Inventar sind sauber beziehungsweise erklaert.

## 13. Offizielle Plattformgrundlage

- YouTube dokumentiert Iframe-Embeds, `autoplay`, Controls und die Datenerhebung bei Autoplay: <https://developers.google.com/youtube/player_parameters>
- YouTube beschreibt `youtube-nocookie.com` als Privacy-Enhanced Mode und verlangt einen korrekten Referrer fuer die Wiedergabe: <https://support.google.com/youtube/answer/171780?expand=PrivacyEnhancedMode&hl=en-GB>
- Spotify bestaetigt interaktive Episode-Embeds und die programmatische Iframe-Steuerung: <https://developer.spotify.com/documentation/embeds>
- Spotify weist darauf hin, dass programmatisches `play()` nicht in allen Browsern und fuer alle Nutzer garantiert ist: <https://developer.spotify.com/documentation/embeds/references/iframe-api>
- Spotify verlangt fuer vollstaendige Wiedergabe unter anderem das unveraenderte Embed und `encrypted-media`: <https://developer.spotify.com/documentation/embeds/tutorials/troubleshooting>

## Nicht enthalten

- kein Push, Merge, Deployment oder Produktions-Readback ohne getrennte Freigabe;
- keine neue YouTube-, Spotify-, Podcast-Upload-, n8n- oder Newsletter-Automation;
- keine Bearbeitung der Artikeltexte oder Podcasttranskripte;
- keine globale Aenderung des `pollo-blog`-Skills oder seiner bisherigen quadratischen Homepage-Regel;
- keine Loeschung alter Bilder;
- keine pauschale Behebung bestehender `svelte-check`-, Dependency- oder Content-Altlasten ausserhalb der geaenderten Dateien;
- keine Analytics-, Cookie-, Search-Console- oder Ubersuggest-Mutation.

## Rollback und Freigabegrenze

Code, Tests und neue Assets bleiben zunaechst im isolierten Branch. Die bisherigen quadratischen Themenbilder, das alte Fable-Hero und die Produktionsseite bleiben unveraendert. Ein Rollback besteht damit aus dem Zuruecknehmen der neuen Referenzen und Komponenten; es erfordert weder Datenmigration noch das Loeschen alter Assets.
