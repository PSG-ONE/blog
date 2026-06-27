@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  BRECHA RESEARCH
echo  ───────────────────────────────────
echo.
set /p TEMA="Tema a investigar: "
echo.
python brecha.py research --tema "%TEMA%"
echo.
pause
