@echo off
:: TRMT Deploy Script - Ein Klick zum Deployen
:: Einfach doppelklicken oder im Terminal: deploy.bat
::

echo.
echo  ====================================
echo   TRMT Deploy - therandommakertheory.com
echo  ====================================
echo.

cd /d "%~dp0"

:: Check ob es Aenderungen gibt
git status --porcelain >nul 2>&1
if errorlevel 1 (
    echo  Fehler: Kein Git-Repository gefunden!
    pause
    exit /b 1
)

:: Zeige was sich geaendert hat
echo  Geaenderte Dateien:
echo  -------------------
git status --short
echo.

:: Alles stagen
git add -A

:: Commit mit Timestamp
for /f "tokens=*" %%i in ('powershell -command "Get-Date -Format 'yyyy-MM-dd HH:mm'"') do set TIMESTAMP=%%i
git commit -m "content: update %TIMESTAMP%"

if errorlevel 1 (
    echo.
    echo  Nichts zu deployen - alles aktuell!
    timeout /t 3
    exit /b 0
)

:: Push
echo.
echo  Pushing to GitHub...
git push origin main

if errorlevel 1 (
    echo.
    echo  Push fehlgeschlagen! Bist du eingeloggt bei GitHub?
    echo  Tipp: git config credential.helper store
    pause
    exit /b 1
)

echo.
echo  ====================================
echo   DEPLOYED! Vercel baut jetzt...
echo   Live in ~30 Sekunden auf:
echo   https://therandommakertheory.com
echo  ====================================
echo.
timeout /t 5
