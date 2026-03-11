@echo off
:: ====================================
::  Pagefile (Auslagerungsdatei) auf 48 GB setzen
::  MUSS als Administrator ausgefuehrt werden!
::
::  Aktuell: Windows-verwaltet (~22 GB)
::  Neu:     48 GB fest (min 16 GB, max 48 GB)
::
::  Warum: Hyper-V VMs (Cowork + Codex) brauchen
::  mehr virtuellen Speicher als 32 GB RAM bieten.
::  896 GB frei auf C: - 48 GB Pagefile ist kein Problem.
::
::  Nach dem Ausfuehren: PC NEUSTARTEN!
:: ====================================

cd /d "%~dp0"

:: Admin-Check
net session >nul 2>&1
if errorlevel 1 (
    echo.
    echo  ============================================
    echo   FEHLER: Muss als Administrator laufen!
    echo  ============================================
    echo.
    echo   Rechtsklick auf fix-pagefile.bat
    echo   -^> "Als Administrator ausfuehren"
    echo.
    pause
    exit /b 1
)

echo.
echo  ============================================
echo   Pagefile Upgrade fuer Hyper-V Workloads
echo  ============================================
echo.
echo   RAM:      32 GB
echo   Aktuell:  Windows-verwaltet (~22 GB)
echo   Neu:      Min 16384 MB / Max 49152 MB (48 GB)
echo   Disk:     896 GB frei auf C:
echo.
echo   Das loest HCS-Fehler (Hyper-V Container crashes)
echo   wenn Cowork, Codex und Deploy gleichzeitig laufen.
echo.

set /p CONFIRM="Fortfahren? (J/N): "
if /i not "%CONFIRM%"=="J" (
    echo  Abgebrochen.
    pause
    exit /b 0
)

echo.
echo  [1/3] Automatische Verwaltung deaktivieren...
powershell -NoProfile -Command "$cs = Get-CimInstance Win32_ComputerSystem; Set-CimInstance -InputObject $cs -Property @{AutomaticManagedPagefile=$false}"
if errorlevel 1 (
    echo  [ERROR] Konnte automatische Verwaltung nicht deaktivieren.
    pause
    exit /b 1
)
echo  [OK] Automatische Verwaltung deaktiviert.

echo.
echo  [2/3] Pagefile setzen: Min 16384 MB, Max 49152 MB...
powershell -NoProfile -Command "$pf = Get-CimInstance Win32_PageFileSetting -ErrorAction SilentlyContinue; if ($pf) { Set-CimInstance -InputObject $pf -Property @{InitialSize=16384; MaximumSize=49152} } else { New-CimInstance -ClassName Win32_PageFileSetting -Property @{Name='C:\pagefile.sys'; InitialSize=16384; MaximumSize=49152} }"
if errorlevel 1 (
    echo  [ERROR] Pagefile konnte nicht gesetzt werden.
    pause
    exit /b 1
)
echo  [OK] Pagefile konfiguriert: 16 GB min / 48 GB max

echo.
echo  [3/3] Einstellungen ueberpruefen...
powershell -NoProfile -Command "Get-CimInstance Win32_PageFileSetting | Format-List Name, InitialSize, MaximumSize"
echo.
echo  ============================================
echo   FERTIG! PC muss jetzt NEUGESTARTET werden.
echo  ============================================
echo.
echo   Nach dem Neustart:
echo   - Cowork, Codex und Deploy gleichzeitig testen
echo   - Falls immer noch Probleme: Pagefile auf 64 GB erhoehen
echo.

set /p RESTART="Jetzt neustarten? (J/N): "
if /i "%RESTART%"=="J" (
    shutdown /r /t 10 /c "Pagefile-Upgrade: Neustart in 10 Sekunden..."
    echo  Neustart in 10 Sekunden... (shutdown /a zum Abbrechen)
) else (
    echo  Bitte spaeter manuell neustarten!
)

pause
