@echo off
:: ====================================
::  TRMT Deploy - One Click
::  Doppelklick oder: deploy.bat
::  Optionen: deploy.bat --dry-run
::            deploy.bat --index-only
::            deploy.bat --force-index
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

python scripts/deploy.py %*

if errorlevel 1 (
    echo.
    echo  Deploy fehlgeschlagen. Siehe Fehler oben.
    pause
    exit /b 1
)

timeout /t 5
