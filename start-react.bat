@echo off
title Fundraising Intern Portal - React Version
color 0B

echo.
echo ========================================
echo    Fundraising Intern Portal - React
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "react-frontend\package.json" (
    echo ERROR: React frontend not found!
    echo Please make sure you're in the project root directory.
    echo.
    echo Current directory: %CD%
    echo.
    pause
    exit /b 1
)

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js from:
    echo https://nodejs.org/
    echo.
    echo After installing Node.js, restart this batch file.
    echo.
    pause
    exit /b 1
)

echo Node.js found ✓
echo.

REM Check if npm is installed
echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm is not installed!
    echo Please install Node.js which includes npm.
    echo.
    pause
    exit /b 1
)

echo npm found ✓
echo.

REM Navigate to React frontend directory
cd react-frontend

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing React dependencies...
    echo This may take a few minutes...
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Dependencies installed successfully! ✓
    echo.
)

REM Start the React development server
echo ========================================
echo    Starting React Development Server
echo ========================================
echo.
echo React app will be available at: http://localhost:3001
echo Backend should be running at: http://localhost:3000
echo.
echo To stop the server, press Ctrl + C
echo.
echo ========================================
echo.

npm start

echo.
echo React server stopped.
pause 