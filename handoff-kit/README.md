# Lightweight Handoff Alpha v0.1

From the repository, bind its origin Chat once:

```powershell
.\handoff-kit\configure.ps1 -OriginChat 'https://chatgpt.com/g/PROJECT_ID/c/CONVERSATION_ID'
```

Later, from a new Windows PowerShell 5.1 session in the same repository:

```powershell
.\handoff-kit\handoff.ps1
```

The binding is stored under this checkout's Git directory, so it persists without becoming product source or dirtying the normal worktree. `handoff.ps1` reads only the fixed `%TEMP%\chat-codex-t06-session.json` Stop Hook record, verifies that it belongs to the current repository, validates the materialized packet and bound URL, copies the packet exactly to the clipboard, and opens the Chat.

Paste and send remain manual. There is no automatic paste, automatic send, packet guessing, or implicit rebinding.

Run the focused compatibility suite with Windows PowerShell 5.1:

```powershell
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\handoff-kit\tests.ps1
```
