# Google Indexing API Setup (optional, aber geil)

IndexNow deckt Bing, Yandex, DuckDuckGo und Naver ab.
Fuer Google brauchst du die Indexing API separat.

## Was das bringt
- Neue Blog-Posts werden Google direkt gemeldet
- Laeuft automatisch mit `deploy.bat`
- Statt Tage/Wochen warten: Stunden

## Schritt 1: Google Cloud Console

Falls du schon ein Projekt hast (z.B. TRMT-YouTube), nutze das.

1. https://console.cloud.google.com
2. **APIs & Services** -> **Library**
3. Suche: `Web Search Indexing API` (NICHT "Custom Search")
4. **Enable**

## Schritt 2: Service Account erstellen

1. **APIs & Services** -> **Credentials**
2. **+ CREATE CREDENTIALS** -> **Service account**
   - Name: `trmt-indexing`
   - Create and Continue
   - Role: kannst du skippen -> Done
3. Klick auf den neuen Service Account
4. Tab **Keys** -> **Add Key** -> **Create new key** -> **JSON**
5. Datei hierhin verschieben:

```
the-random-maker-theory/scripts/gsc-service-account.json
```

## Schritt 3: Service Account in Search Console eintragen

1. Oeffne die JSON-Datei und kopiere die `client_email` (sieht so aus: `trmt-indexing@trmt-youtube-xxxx.iam.gserviceaccount.com`)
2. Geh zu https://search.google.com/search-console
3. **Settings** (Zahnrad) -> **Users and permissions**
4. **Add user**
   - Email: die `client_email` von oben einfuegen
   - Permission: **Owner**
   - Add

## Schritt 4: Python-Pakete

```bash
pip install google-api-python-client google-auth
```

(Wenn du YouTube-Upload schon eingerichtet hast, ist das schon installiert)

## Schritt 5: Testen

```bash
cd the-random-maker-theory
python scripts/index-notify.py --dry-run
```

Sollte zeigen: "Google Indexing API: X URLs submitted" (im nicht-dry-run Modus)

## Limits

- Neue Properties: 200 URLs/Tag
- Etablierte Properties: bis zu 2.000 URLs/Tag
- Das Script respektiert Rate Limits automatisch

## Fertig

Ab jetzt meldet `deploy.bat` nach jedem Push automatisch neue URLs an:
- Bing, Yandex, DuckDuckGo, Naver (via IndexNow)
- Google (via Indexing API)
