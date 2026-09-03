# Windows: Vercel-Adapter und EPERM

## Diagnose

Der TRMT-Build kompiliert Client und Server erfolgreich und kann anschließend beim Packaging mit einem Fehler dieser Form enden:

```text
EPERM: operation not permitted, symlink '..\![-]\catchall.func' -> '.vercel\output\functions\api\indexnow.func'
```

Das ist kein Svelte-, TypeScript- oder Anwendungscodefehler. `@sveltejs/adapter-vercel` erzeugt für mehrere Routen Verzeichnis-Symlinks auf dieselbe Vercel Function. Der normale Windows-Prozess darf solche Symlinks nur mit passender Berechtigung erzeugen.

Am 3. September 2026 bestätigt:

- lokaler Prozess nicht als Administrator gestartet
- Windows Developer Mode nicht aktiviert
- derselbe Build erreicht vorher die vollständige Vite-/SvelteKit-Kompilierung
- `split: true` ändert nur das Symlink-Ziel und behebt den Fehler nicht
- ein Windows-Junction-Test funktioniert, wird vom offiziellen Adapter aber nicht als Option angeboten
- Vercels Linux-Cloud-Build ist von der Windows-Symlink-Berechtigung nicht betroffen

## Dauerhafte lokale Lösung

Windows **Einstellungen > System > Für Entwickler > Entwicklermodus** einmal aktivieren und danach Terminal beziehungsweise Codex neu starten. Alternativ die konkrete Build-Sitzung als Administrator starten.

Danach erneut ausführen:

```bash
npm run build
```

## Release-Regel

Bis Developer Mode aktiviert ist, gilt lokal:

- erfolgreiche Client- und Server-Kompilierung: Anwendungscode PASS
- anschließendes Windows-`EPERM`: lokales Vercel-Packaging FAIL
- grüner Vercel-/Linux-Build: vollständiger Produktions-Build PASS

Es wird bewusst kein Patch in `node_modules` und kein eigener Adapter-Fork gepflegt. Beides würde die lokale Berechtigungsursache nur mit zusätzlicher Wartung umgehen und könnte vom offiziellen Vercel-Output abweichen.
