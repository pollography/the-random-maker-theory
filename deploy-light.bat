@echo off
:: ====================================
::  TRMT Deploy Light - Schnell & Schlank
::  Kein Wait-for-Vercel, kein Polling.
::  Git push + Indexierung, fertig.
::
::  Doppelklick oder: deploy-light.bat
::  Optionen: deploy-light.bat --dry-run
::            deploy-light.bat --index-only
::            deploy-light.bat --force-index
:: ====================================

cd /d "%~dp0"

where python >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [ERROR] Python nicht gefunden!
    echo  Installiere Python: https://python.org
    pause
    exit /b 1
)

python scripts/deploy.py --no-wait %*

if errorlevel 1 (
    echo.
    echo  Deploy fehlgeschlagen. Siehe Fehler oben.
    pause
    exit /b 1
)

echo.
echo  [OK] Deploy abgeschlossen. Vercel baut automatisch.
timeout /t 3
