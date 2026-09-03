# Search Console: TRMT-Betriebsablauf

## Richtige Sitzung

- Chrome-Profil: `info@pollography`
- Google-Konto: `TEAM Pollography (info@pollography.de)`
- Aktive Property: `https://therandommakertheory.com/`

Vor jeder Prüfung diese drei Angaben kontrollieren. Die Domain-Properties `sc-domain:therandommakertheory.com` und `sc-domain:pollography.de` sind derzeit nicht bestätigt und deshalb keine Quelle für TRMT-Livedaten.

## Indexierung nach einer Veröffentlichung

1. Der Artikel muss öffentlich mit HTTP 200 erreichbar, indexierbar, kanonisch korrekt und intern verlinkt sein.
2. Der Build nimmt veröffentlichte Artikel automatisch in `https://therandommakertheory.com/sitemap.xml` auf. Die Sitemap enthält außerdem die zugeordneten Bilder über die Google-Image-Erweiterung.
3. Die Sitemap ist in `robots.txt` angegeben und in der Search Console bereits erfolgreich eingereicht. Sie wird nicht täglich oder nach jedem Artikel erneut eingereicht.
4. Google entscheidet nach Crawling und Bewertung selbst, ob und wann eine URL in den Index kommt. Veröffentlichung, Crawling und Indexierung sind getrennte Zustände.
5. Nur bei einer einzelnen wichtigen neuen oder stark aktualisierten Seite: URL in der **URL-Prüfung** öffnen und bei Bedarf **Indexierung beantragen**. Das ist eine manuelle Crawl-Anfrage, keine API und keine Garantie.
6. Für normale Blogartikel niemals die Google Indexing API verwenden. Sie ist auf `JobPosting` und bestimmte Livestream-Seiten begrenzt.

`python scripts/index-notify.py` benachrichtigt weiterhin unterstützte IndexNow-Suchmaschinen. Google gehört nicht zu diesem IndexNow-Pfad.

## Regelmäßige Kontrolle

- **Seitenindexierung:** neue 5xx-, `noindex`-, Canonical- oder Crawling-Probleme prüfen.
- **Sitemaps:** nur `/sitemap.xml` als aktiven erfolgreichen Eintrag verwenden.
- **Leistung:** Web und Bild getrennt auswerten; bei einer Anfrage den Tab **Seiten** öffnen, bevor Kannibalisierung angenommen wird.
- **Sicherheit und manuelle Maßnahmen:** nur explizite Meldungen dort gelten als Beleg für eine Google-Maßnahme.

## Nutzer und Rechte

Mehrere Google-Konten können parallel Zugriff auf dieselbe Property haben:

- **Vollständiger Nutzer:** kann alle Berichte sehen und viele Aktionen ausführen.
- **Delegierter Inhaber:** besitzt praktisch vollständige Kontrolle einschließlich Nutzerverwaltung.
- **Bestätigter Inhaber:** hat die Inhaberschaft selbst über ein Token wie HTML-Tag oder DNS bestätigt.

Aktueller Stand am 3. September 2026:

- `info@pollography.de`: bestätigter Inhaber, seit 9. März 2026
- `trmt-indexing`: delegierter Inhaber, seit 11. März 2026; für den aktuellen Sitemap-/URL-Prüfungsablauf nicht mehr erforderlich

Nutzer hinzufügen, Rollen ändern, das Dienstkonto entfernen oder alte Sitemap-Einträge löschen sind externe Kontenänderungen. Vor der Ausführung immer die genaue Zieladresse beziehungsweise den genauen Eintrag bestätigen lassen.

## Quellen

- https://developers.google.com/search/apis/indexing-api/v3/using-api
- https://support.google.com/webmasters/answer/9012289
- https://support.google.com/webmasters/answer/7451001
- https://support.google.com/webmasters/answer/7687615
