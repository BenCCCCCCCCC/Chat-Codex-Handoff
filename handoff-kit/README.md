# Lightweight Handoff Alpha v0.1

This Alpha combines two distinct handoff paths:

- **ChatGPT to Codex:** use Codex's official `New chat` flow to add the existing MASTER Chat as context, then select the correct local repository. This is the preferred entry point. It supplies relevant Chat context to the Codex task; it is not a claim that ChatGPT and Codex histories are fully merged.
- **Codex to ChatGPT:** use this repository's `handoff.ps1` helper to return the materialized Delivery Packet to the bound origin MASTER Chat.

## One-time setup

From the repository, bind its origin MASTER Chat once:

```powershell
.\handoff-kit\configure.ps1 -OriginChat 'https://chatgpt.com/g/PROJECT_ID/c/CONVERSATION_ID'
```

The binding is stored under this checkout's Git directory, so it persists without becoming product source or dirtying the normal worktree. A checkout will not silently use another repository's binding.

## Combined workflow

1. Confirm the complete task, scope, and acceptance criteria in the MASTER Chat.
2. In Codex, choose `New chat`, add that existing ChatGPT MASTER Chat as context, and select the correct local repository.
3. Send a minimal trigger that identifies the task in the MASTER Chat. The full Task Packet does not need to be copied into Codex.
4. Codex performs the bounded work and returns a Delivery Packet with sufficient Review Evidence.
5. The configured Stop Hook materializes that Delivery Packet and records its path for the current repository.
6. From a Windows PowerShell 5.1 session in the same repository, run:

```powershell
.\handoff-kit\handoff.ps1
```

7. The helper opens the bound origin MASTER Chat with the Delivery Packet on the clipboard. Paste and send it manually for review.

The official existing-Chat context is the ChatGPT-to-Codex entry point. This repository does not replace or automate that official path. `handoff.ps1` handles only the Codex-to-ChatGPT return path.

## Safety boundaries

`handoff.ps1` reads only the fixed `%TEMP%\chat-codex-t06-session.json` Stop Hook record, verifies that it belongs to the current repository, validates the materialized packet and bound URL, copies the packet exactly to the clipboard, and opens the Chat.

The workflow remains repo-local and fail-closed. Paste and send remain manual. There is no automatic paste, automatic send, packet guessing, implicit rebinding, browser automation, or full-history merge.

## Compatibility checks

Run the focused compatibility suite with Windows PowerShell 5.1:

```powershell
C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\handoff-kit\tests.ps1
```
