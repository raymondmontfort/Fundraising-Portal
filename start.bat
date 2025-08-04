@echo off
title Fundraising Intern Portal
color 0A

echo.
echo ========================================
echo    Fundraising Intern Portal
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please make sure you're in the project directory.
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

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
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

REM Kill any existing Node.js processes
echo Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1
echo.

REM Start the server
echo ========================================
echo    Starting Fundraising Intern Portal
echo ========================================
echo.
echo Server will be available at: http://localhost:3000
echo.
echo To stop the server, press Ctrl + C
echo.
echo ========================================
echo.

REM Use call to ensure the batch file doesn't exit when npm start exits
call npm start

echo.
echo Server stopped.
pause 