# Active Handoff — PHASE3B-HOST-BROWSER-SMOKE-01

Updated: 2026-09-29
Role: 00 MASTER
Status: OWNER MANUAL ACTION / OUTSIDE CODEX SANDBOX / ZERO PROVIDER CALLS

## Why manual

OpenAI's Windows Codex sandbox is write-restricted to the workspace/configured writable roots, and child processes inherit the same boundary. The prior `%LOCALAPPDATA%` profile creation failure and Codex-launched Edge ACCESS_DENIED behavior are consistent with that sandbox. Do not use Full Access, broad writable roots, ACL/policy changes or elevation just to run this validation.

## Binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Branch: `prototype/study-teachback-v0.1`
Accepted HEAD: `dd8317b43100b8cbaad684cab7fc02957e32de62`
Fresh manual Edge profile: `F:\Chat-Codex-Handoff\phase3b-edge-profile-01`

PHASE3B-LIVE-01 remains paused. Its existing authorization is unchanged and unused: max 3 provider calls, zero retries, incremental local exposure <= US$0.03432.

## Owner manual smoke

Use normal Windows PowerShell opened by the owner, not a Codex-run terminal.

PowerShell window 1:
```powershell
git -C F:\Chat-Codex-Handoff\validation-repo rev-parse HEAD
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs
```

Expected HEAD: `dd8317b43100b8cbaad684cab7fc02957e32de62`.

Leave the server window open.

PowerShell window 2:
```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --user-data-dir="F:\Chat-Codex-Handoff\phase3b-edge-profile-01" `
  --no-first-run `
  --no-default-browser-check `
  "http://127.0.0.1:4317"
```

Verify only:
- Edge opens normally;
- product root loads and basic UI is visible;
- browser remains stable;
- no unexpected provider/API activity appears in server output.

Do NOT:
- click `开始学习`;
- submit the learning source;
- create a topic intentionally;
- grant/use microphone;
- trigger Tutor/ASR/diagnosis;
- inspect the normal Edge profile or old topics.

## Report to MASTER

Return:
- server started successfully or exact error;
- Edge opened successfully or exact error/crash;
- product root visible yes/no;
- any unexpected provider/API activity yes/no;
- screenshot if useful.

Do not continue into live learning/recording until MASTER confirms the smoke result.