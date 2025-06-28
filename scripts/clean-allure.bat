@echo off
echo Running Allure Results Cleanup...
echo.

REM Run the PowerShell cleanup script
powershell -ExecutionPolicy Bypass -File "%~dp0clean-allure-results.ps1" %*

echo.
echo Cleanup completed!
pause 