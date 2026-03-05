# TRMT Deploy Anleitung

## So funktioniert der Workflow

### Wenn du sagst "Lad das hoch" / "Deploy das":

1. **Ich** schreibe die Dateien direkt in deinen Projektordner
   - Blog: `src/content/blog/mein-post.md`
   - Podcast: `src/content/podcast/002-mein-episode.md`
   - Bilder: `static/images/`

2. **Du** doppelklickst `deploy.bat` im Projektordner
   - Das macht automatisch: git add + commit + push
   - Vercel deployed dann in ~30 Sekunden

3. **Fertig** - Live auf therandommakertheory.com

## Ablauf

```
Du sagst: "Mach einen Artikel ueber X"
    |
    v
Ich erstelle die .md Datei im richtigen Ordner
    |
    v
Du doppelklickst deploy.bat
    |
    v
GitHub bekommt den Code
    |
    v
Vercel baut automatisch
    |
    v
therandommakertheory.com ist aktualisiert
```

## Erster Lauf

Beim allerersten Mal musst du evtl. deine GitHub-Zugangsdaten eingeben.
Damit du das nicht jedes Mal machen musst:

```
git config credential.helper store
```

Danach merkt sich Git dein Passwort.
