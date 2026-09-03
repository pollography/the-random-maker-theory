# Google-Indexierung fuer TRMT

## Was nicht verwendet wird

Die Google Indexing API ist kein allgemeiner Beschleuniger fuer Blogartikel. Google erlaubt sie nur fuer Seiten mit `JobPosting` oder fuer Livestream-Seiten mit `BroadcastEvent` in einem `VideoObject`. TRMT hat keine solchen Seitentypen, deshalb senden `index-notify.py` und `deploy.py` keine TRMT-URLs an diese API.

## Unterstuetzter Google-Weg

1. Im Chrome-Profil `info@pollography` mit `TEAM Pollography (info@pollography.de)` arbeiten.
2. In der Google Search Console die bestaetigte Property `https://therandommakertheory.com/` oeffnen.
3. Die bereits erfolgreich eingereichte Sitemap `https://therandommakertheory.com/sitemap.xml` wird von Google wiederholt gelesen. Sie muss nicht nach jedem Artikel neu eingereicht werden.
4. Nach einem Release im Bericht **Seitenindexierung** auf neue Fehler oder ausgeschlossene kanonische URLs pruefen.
5. Im Bericht **Leistung** die letzten 28 Tage mit dem vorherigen Zeitraum vergleichen. Fuer die Bild-Lane den Suchtyp **Bild** separat auswaehlen.
6. Nur einzelne wichtige neue oder deutlich ueberarbeitete URLs bei Bedarf mit der URL-Pruefung kontrollieren und dort einen erneuten Crawl anfragen. Das ist eine manuelle Anfrage und nicht die Indexing API.

Die Sitemap steht bereits in `static/robots.txt`. Sie enthaelt normale Seiten-URLs und die zugeordneten Bilder ueber Googles Image-Sitemap-Erweiterung.

Ausfuehrliche Betriebs- und Berechtigungshinweise stehen in `docs/seo/SEARCH-CONSOLE-OPERATIONS.md`.

## Andere Suchmaschinen

`python scripts/index-notify.py` bleibt fuer IndexNow zustaendig. Das betrifft unterstuetzende Suchmaschinen, aber nicht Google.

## Quellen

- https://developers.google.com/search/apis/indexing-api/v3/using-api
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://support.google.com/webmasters/answer/7451001
