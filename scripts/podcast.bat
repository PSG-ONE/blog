@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  BRECHA PODCAST
echo  ───────────────────────────────────
echo.
set /p URL="URL del articulo: "
echo.
echo  Formato: [1] deep-dive  [2] brief  [3] critique  [4] debate
set /p OPT="Elige (1-4, default=1): "

if "%OPT%"=="2" set FMT=brief
if "%OPT%"=="3" set FMT=critique
if "%OPT%"=="4" set FMT=debate
if not defined FMT set FMT=deep-dive

echo.
echo  Generando podcast "%FMT%"...
echo.
python brecha.py podcast --url "%URL%" --formato %FMT%
echo.
pause
