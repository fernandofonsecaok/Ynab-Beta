@echo off
echo Starting Tarn locally...
echo.
echo Once the server starts, open this in your browser:
echo   http://localhost:8000
echo.
echo To use it from your phone (same Wi-Fi), find your PC's IP with
echo   ipconfig
echo and open http://YOUR-PC-IP:8000 on the phone instead.
echo.
echo Press CTRL+C in this window to stop the server.
echo.
cd /d "%~dp0"
python -m http.server 8000
if errorlevel 1 (
    echo.
    echo "python" was not found. Trying "py" instead...
    py -m http.server 8000
)
pause
