@echo off
echo ========================================
echo Archive System Setup
echo ========================================
echo.

echo [1/4] Starting PostgreSQL with Docker...
docker-compose up -d
echo.

echo [2/4] Waiting for database to be ready...
timeout /t 5 /nobreak >nul
echo.

echo [3/4] Installing dependencies...
cd server
call npm install
cd ..
echo.

echo [4/4] Running migration (if needed)...
node server/database/migrate-archives.js
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Database is running on: localhost:5432
echo Database name: ppt_database
echo Username: ppt_user
echo.
echo Next steps:
echo 1. Update your server/index.js to include archive routes
echo 2. Start your server: npm run dev
echo 3. Test the API: curl http://localhost:3001/api/archive/stats
echo.
pause
