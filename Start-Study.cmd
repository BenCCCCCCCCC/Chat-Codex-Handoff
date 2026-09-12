@echo off
powershell.exe -NoProfile -File "%~dp0study-teachback-app\launch.ps1"
if errorlevel 1 pause
