@echo off
echo Check for process on port 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a
echo Starting GoConcurrencyPPT App...
cd /d "c:\Users\dhruv\Downloads\personal_space\go-concurrency-ppt"
start "GoConcurrencyPPT Backend" npm run server
start "GoConcurrencyPPT Frontend" npm run dev

echo Applications started in separate windows.
echo.
echo Press any key to stop the backend server (port 3001) and exit this script...
pause >nul
echo Stopping process on port 3001...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3001" ^| find "LISTENING"') do taskkill /f /pid %%a
