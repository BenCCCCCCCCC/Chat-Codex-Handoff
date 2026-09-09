@echo off
start "" "%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -STA -WindowStyle Hidden -File "%~dp0handoff-kit\ui\Start-Handoff.ps1"
