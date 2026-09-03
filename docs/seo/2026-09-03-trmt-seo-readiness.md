# TRMT SEO Readiness, 3. September 2026

## Ergebnis

| Bereich | Status | Befund |
| --- | --- | --- |
| Google Images Discovery | PASS | Die bestehende `/sitemap.xml` nutzt die Google-Image-Erweiterung. Eine zweite Bild-Sitemap ist nicht notwendig. |
| Bilddateien und Metadaten | PASS | Alle referenzierten Prompt-, Artikel- und Live-Sitemap-Bilder sind erreichbar und lokal bekannt. |
| Große Bildvorschauen | PARTIAL | `max-image-preview:large` ist lokal global ergänzt und geprüft; der Produktions-Readback folgt nach dem Release. |
| Doppelte Seitentitel | PARTIAL | Podcast-Detailseiten erhalten lokal den Präfix `Podcast:`. Damit werden die vier aktuell gemeldeten Blog/Podcast-Paare unterschieden; der Produktions-Readback folgt nach dem Release. |
| Google Indexing API | PASS | Die ungeeignete automatische Übermittlung normaler Blogseiten ist aus beiden Skripten entfernt. |
| Inhaltliche Kannibalisierung | PASS | Der stärkste Themencluster `prompt engineering` verteilt 214 Impressionen auf genau eine URL. Aktuell ist keine Kannibalisierung belegt. Die übrigen Gruppen bleiben Beobachtungskandidaten. |
| Search Console Live-Daten | PASS | Mit `info@pollography.de` geprüft: Property aktiv, Sitemap erfolgreich, keine manuelle Maßnahme, kein Sicherheitsproblem. |
| Outreach | OUT OF SCOPE | Bewusst nicht Bestandteil dieses Sprints. |

## Google-Images-Lane

Google bewertet eine separate Bild-Sitemap und Bild-Tags in der normalen Sitemap gleich. TRMT verwendet deshalb weiter genau eine kanonische Sitemap statt einer zweiten, doppelten Datenquelle.

Aktueller Live-Readback:

- 95 Seiten-URLs in `/sitemap.xml`
- 611 Bildzuordnungen, davon 285 eindeutige Bild-URLs
- 147 Bildzuordnungen auf `/tools/bildprompt-library`
- 285 von 285 eindeutigen Live-Bild-URLs erfolgreich und mit Bild-Content-Type; die 611 Sitemap-Zuordnungen enthalten erwartete Mehrfachverwendungen
- 147 von 147 öffentlichen Prompt-Bildern als echte `<img>`-Elemente gerendert
- 147 von 147 Prompt-Bildern als `ImageObject` mit `contentUrl`, Urheber-, Credit- und Rechteangaben vorhanden
- 147 von 147 Prompt-Datensätzen mit nicht leerem Alt-Text, lokaler Datei und generierten Größenmetadaten
- 267 von 267 in veröffentlichten Artikeln verwendeten eindeutigen Bildern mit lokaler Datei und Größenmetadaten
- 74 von 74 veröffentlichten Artikeln mit Hero-Bild, mindestens 1200 Pixel breit und mehr als 300.000 Pixel Gesamtfläche
- 73 Hero-Bilder im 16:9-Format; die Architektur-Grafik von `claude-code-ultimate-setup-produktivitaet-2026` ist 1200 x 850 Pixel und damit die einzige Format-Ausnahme
- Das Library-Vorschaubild ist 1200 x 675 Pixel und besitzt eine 400-Pixel-Variante
- Standard-`src` bleibt neben `srcset` erhalten, sodass Google die Bilder ohne CSS-Hintergrund oder JavaScript-Sonderpfad finden kann

Lokal ergänzt:

- `<meta name="robots" content="max-image-preview:large" />` in `src/app.html`

Diese Direktive wird mit diesem freigegebenen Release veröffentlicht und danach live geprüft.

## Technischer SEO-Readback

Ubersuggest, Standort Deutschland (`locId 2276`), Sprache Deutsch:

- Site Audit vom 31. August 2026: 205 URLs gecrawlt, 203 erfolgreich, 2 erwartbar blockiert
- 0 Seiten mit 4xx-Antwort, 0 defekte interne Anker, 0 fehlende Meta-Descriptions, 0 doppelte Meta-Descriptions
- 8 doppelte Titel-URLs waren genau vier Blog/Podcast-Paare:
  - ESP32 + Home Assistant
  - KI-Bildbearbeitungs-Workflow
  - KI-Bilder-erstellen-Guide
  - Prompt-Engineering-Guide
- 21 als lang gemeldete Titel werden nicht automatisch gekürzt. Google nennt keine feste Zeichenbegrenzung; Priorität haben beschreibende, eindeutige und kompakte Titel sowie echte CTR-Daten.
- 97 Wortzahl-Warnungen betreffen überwiegend dünne Tag-Seiten, die bereits `noindex,follow` tragen, plus drei Podcastseiten. Daraus folgt kein pauschaler Auftrag, Texte künstlich aufzublähen.
- Rank-Tracking vom 29. August 2026: 64 Keywords. 45 waren noch `pending`; bei den belastbaren Zeilen gab es desktop keine Top-100-Platzierung und mobil eine Platzierung für `prompt engineering anleitung` auf Position 52 mit `/blog/perfekt-prompten-llm-guide`.

Ubersuggest ist hier nur ein zusätzlicher SERP- und Crawl-Hinweis. Es ersetzt keine Search-Console-Impressionen, Klicks oder Query/Page-Zuordnung.

## Search-Console-Livebefund

Geprüft am 3. September 2026 mit dem bestätigten Inhaber `info@pollography.de` und der URL-Präfix-Property `https://therandommakertheory.com/`:

- Property am 9. März 2026 per HTML-Tag bestätigt
- `/sitemap.xml`: erfolgreich, am 1. September eingereicht, zuletzt am 2. September gelesen, 213 erkannte Seiten
- alter Eintrag `/sitemaps.xml`: nicht abrufbar; dieser falsche Alt-Eintrag ist nicht die aktive Sitemap
- 5 indexierte und 18 nicht indexierte Seiten (Datenstand 28. August)
- Gründe für nicht indexierte Seiten: 14 `Gecrawlt – zurzeit nicht indexiert`, 3 frühere 5xx-Fehler mit bestandener Validierung und 1 bewusstes `noindex`
- letzte drei Monate: 4 Web-Klicks, 626 Web-Impressionen, 0,6 Prozent CTR, durchschnittliche Position 36,8
- Bildsuche im selben Zeitraum: 0 Klicks und 0 Impressionen
- 167 gültige Bild-Metadaten, 0 ungültige; 6 gültige Navigationspfade, 0 ungültige
- keine manuelle Maßnahme und kein Sicherheitsproblem
- 4.292 Crawling-Anfragen in den letzten 90 Tagen; `robots.txt` gültig

Die Daten zeigen eine junge Website mit bereits stattfindendem Crawling und ersten Impressionen. Sie zeigen keine Abstrafung. `Gecrawlt – zurzeit nicht indexiert` bedeutet, dass Google die URLs kennt, sie aktuell aber nicht in den Index aufgenommen hat; es ist keine manuelle Strafe.

## Kannibalisierungs-Kandidaten

Die folgenden Gruppen teilen Begriffe oder Themen. Das ist ein Prüfauftrag, kein Beweis für Kannibalisierung:

1. `perfekt-prompten-llm-guide` und `prompt-engineering-lernen-2026`
   - Aktuelle Rollen: Framework-Guide versus persönliches Lernsystem
   - Ubersuggest sieht bisher nur die erste URL für `prompt engineering anleitung`
2. `beste-chatgpt-prompts-2026` und `chatgpt-prompts-erstellen-2026`
   - Aktuelle Rollen: fertige Prompt-Sammlung versus Anleitung zum Schreiben eigener Prompts
3. `esp32-projekte-anfaenger-2026` und `esp32-smart-home-projekte-unter-20-euro`
   - Höchster lokale Themen-Overlap; beide behandeln günstige Sensor-, Bewegungs- und Pflanzenprojekte
4. `anthropic-2026-rueckblick-pentagon-bis-billion`, `anthropic-vs-pentagon-ki-safety` und die täglichen KI-News vom 7. bis 9. März
   - Ereignisüberschneidung, aber unterschiedliche Aktualitäts- und Analysefunktion
5. `ultimate-bildprompts-part-2` und `bildprompts-creator-ki-video`
   - Hub versus vertiefte Unterkategorie; die interne Verlinkung bildet diese Hierarchie bereits ab

Die Live-Prüfung des stärksten messbaren Clusters `prompt engineering` ergab 214 Impressionen, durchschnittliche Position 66,1 und genau eine angezeigte Landingpage: `/blog/perfekt-prompten-llm-guide`. Auch die exakte Top-Anfrage `prompt engineering tipps` lag mit allen 70 Impressionen ausschließlich auf dieser URL. Damit ist für diesen Cluster keine Kannibalisierung vorhanden.

Vor einem Merge, Redirect, Canonical-Wechsel oder einer Neu-Ausrichtung muss Search Console bei einer künftig ausreichend sichtbaren Anfrage zeigen, dass dieselbe Anfrage auf mehrere URLs verteilt ist und keine URL klar gewinnt. Bis dahin werden die Kandidaten nur beobachtet und in ihrer jeweiligen Suchabsicht klar gehalten.

## Search-Console-Ablauf für neue Artikel

1. Ein veröffentlichter Artikel wird automatisch in `/sitemap.xml` aufgenommen; dort stehen auch seine auffindbaren Bilder. `robots.txt` verweist auf diese Sitemap.
2. Die Sitemap muss nicht nach jedem Artikel erneut eingereicht werden. Google liest den bereits erfolgreichen Eintrag wiederholt und entdeckt außerdem interne Links beim Crawlen.
3. Für eine einzelne besonders wichtige neue oder stark überarbeitete URL kann die **URL-Prüfung** in der Search Console genutzt und dort **Indexierung beantragen** angeklickt werden. Das ist eine manuelle Crawl-Anfrage und nicht die Google Indexing API; eine Aufnahme oder ein Zeitpunkt wird nicht garantiert.
4. Für normale Blogartikel niemals die Google Indexing API verwenden. Sie ist nur für `JobPosting` sowie Livestream-Seiten mit `BroadcastEvent` in `VideoObject` vorgesehen.
5. Nach einem Release in der Seitenindexierung auf neue technische Fehler achten. Nicht jede veröffentlichte URL wird sofort oder überhaupt indexiert.
6. Unter **Leistung** für **Web** und separat **Bild** die letzten 28 Tage mit dem vorherigen Zeitraum vergleichen. Im Bild-Bericht zeigt der Tab **Seiten** Landingpages, nicht die Roh-URL der Bilddatei.
7. Für eine Kannibalisierungsprüfung zuerst nach der Anfrage filtern und danach den Tab **Seiten** öffnen. Erst bei ausreichend Daten und mindestens zwei tatsächlich sichtbaren URLs handeln.

Interne Beobachtungsschwelle, keine Google-Regel: mindestens 50 Impressionen für eine Anfrage in 28 Tagen, mindestens zwei URLs mit Impressionen und die schwächere URL mit mindestens 25 Prozent der gemeinsamen Impressionen oder wiederholtem Wechsel der führenden URL.

## Konten und Berechtigungen

- Für TRMT-Arbeiten in der Search Console den Chrome-Browser mit dem Profil `info@pollography` verwenden und den angemeldeten Google-Nutzer `TEAM Pollography (info@pollography.de)` kontrollieren.
- Aktive Property: `https://therandommakertheory.com/` (URL-Präfix, bestätigt).
- `sc-domain:therandommakertheory.com` und `sc-domain:pollography.de` erscheinen im Property-Wähler als **nicht bestätigt** und dürfen nicht als aktive Datenquelle behandelt werden.
- Aktuell gibt es zwei Inhaber: `info@pollography.de` als bestätigten Inhaber und das alte Dienstkonto `trmt-indexing` als delegierten Inhaber. Das Dienstkonto wurde am 11. März 2026 hinzugefügt und wird von der Website-Automation nicht mehr benötigt.
- Weitere Personen können als vollständige Nutzer oder delegierte Inhaber ergänzt werden. Eine Rechteänderung oder Entfernung erfolgt nur nach ausdrücklicher Freigabe und mit der exakt bestätigten E-Mail-Adresse.

## Quellen

- [Google: Image sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps)
- [Google: Image SEO best practices](https://developers.google.com/search/docs/appearance/google-images)
- [Google: Discover image recommendations](https://developers.google.com/search/docs/appearance/google-discover)
- [Google: Image license metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Google: Robots meta tags](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Google: Title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google: Indexing API scope](https://developers.google.com/search/apis/indexing-api/v3/using-api)
- [Google: URL Inspection and manual indexing request](https://support.google.com/webmasters/answer/9012289)
- [Google: Search Console users and permissions](https://support.google.com/webmasters/answer/7687615)
- [Google: Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Google: Search Console image performance](https://support.google.com/webmasters/answer/10268906)
- [Google: Submit and monitor a sitemap](https://support.google.com/webmasters/answer/7451001)

## Frische Verifikation

- `node --test`: 129 von 129 Tests bestanden
- Python-Syntax und `--help`: beide Indexierungs-/Deploy-Skripte bestanden
- Lokaler SSR-Readback: globale große Bildvorschau, eindeutiger Podcast-Titel, 95 Sitemap-URLs, 611 Bildzuordnungen, 147 Library-`img`-Elemente und 147 Library-`ImageObject`-Einträge bestätigt
- `npm run check`: unveränderter Ausgangszustand mit 99 Fehlern und 9 Warnungen in 10 unberührten Dateien; keine Diagnose in einer Sprint-Datei
- `npm run build`: Svelte-/Vite-Anwendung vollständig kompiliert; danach bekannte Windows-`EPERM`-Sperre beim Vercel-Adapter-Symlink für `api/indexnow.func`
- `git diff --check`: bestanden; nur Zeilenende-Hinweise
- Search Console read-only geprüft; kein Nutzerrecht geändert, kein Sitemap-Eintrag entfernt und kein Indexierungsrequest ausgelöst
