# Sveltia CMS Setup Guide

## Was ist fertig?

- ✅ `/static/admin/index.html` — Admin-Panel HTML
- ✅ `/static/admin/config.yml` — CMS-Konfiguration mit allen Frontmatter-Feldern
- ✅ `robots.txt` — /admin wird nicht indexiert

## Was du noch machen musst (5 Minuten)

### Schritt 1: GitHub OAuth App erstellen

1. Geh zu: https://github.com/settings/developers
2. Klick **"New OAuth App"**
3. Füll aus:
   - **Application name:** `TRMT CMS`
   - **Homepage URL:** `https://therandommakertheory.com`
   - **Authorization callback URL:** `https://therandommakertheory.com/admin/`
4. Klick **"Register application"**
5. Notier dir die **Client ID**
6. Klick **"Generate a new client secret"** und notier den **Client Secret**

### Schritt 2: Sveltia CMS Authenticator deployen

Der einfachste Weg ist der offizielle Sveltia Authenticator auf Cloudflare Workers (kostenlos):

1. Geh zu: https://github.com/sveltia/sveltia-cms-auth
2. Klick den **"Deploy to Cloudflare"** Button
3. Cloudflare-Account erstellen (falls nötig, kostenlos)
4. Im Setup eingeben:
   - `GITHUB_CLIENT_ID` = deine Client ID von Schritt 1
   - `GITHUB_CLIENT_SECRET` = dein Client Secret von Schritt 1
   - `ALLOWED_DOMAINS` = `therandommakertheory.com`
5. Nach dem Deploy bekommst du eine URL wie: `https://sveltia-cms-auth.DEIN-NAME.workers.dev`

### Schritt 3: Config updaten

Öffne `static/admin/config.yml` und ergänze unter `backend:`:

```yaml
backend:
  name: github
  repo: pollography/the-random-maker-theory
  branch: main
  base_url: https://sveltia-cms-auth.DEIN-NAME.workers.dev
```

Ersetze `DEIN-NAME` mit deinem Cloudflare Workers Subdomain-Namen.

### Schritt 4: Deploy & Testen

1. `deploy.bat` ausführen
2. Geh zu `https://therandommakertheory.com/admin/`
3. Login mit deinem GitHub Account
4. Du siehst alle 16 Blog-Posts und kannst sie bearbeiten!

## Features im CMS

- **Neuen Post erstellen**: Klick "New Blog Post"
- **Posts bearbeiten**: Klick auf einen Post, editiere Felder + Markdown
- **Bilder hochladen**: Drag & Drop ins Hero-Bild Feld
- **Entwürfe**: Setze "Entwurf" auf true, Post wird nicht veröffentlicht
- **Kategorien**: Dropdown mit allen Kategorien
- **Tags**: Komma-getrennte Tags eingeben

## Technisch

- CMS lädt als statisches JS (<300KB)
- Keine Datenbank, kein Server
- Editiert direkt Markdown-Files im Git Repo
- Jede Änderung = automatischer Git Commit
- Vercel baut automatisch neu nach jedem Commit
