# Active Handoff — PHASE3B-LIVE-01 / OWNER CHECKPOINT

Updated: 2026-09-29
Role: 00 MASTER
Status: **OWNER ACTION / AUTHORIZED LIVE BUDGET / STOP BEFORE DIAGNOSIS**

## 1. Binding

Repo:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Accepted HEAD:
`ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2`

Run the real browser outside Codex sandbox.

Existing authorization:
- max 3 provider calls total;
- zero retries;
- incremental local exposure <= US$0.03432;
- one recording maximum.

At this checkpoint use at most:
- one Tutor/Learn semantic call if normal fresh-topic flow requires it;
- exactly one ASR call.

Do not use the content-diagnosis call yet.

## 2. Start server

Normal owner PowerShell:

```powershell
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs
```

Keep it open.

## 3. Open isolated Edge

Normal owner PowerShell:

```powershell
& "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
  --user-data-dir="F:\Chat-Codex-Handoff\phase3b-edge-profile-01" `
  --no-first-run `
  --no-default-browser-check `
  "http://127.0.0.1:4317"
```

Use only this fresh isolated profile.

## 4. Clean source

Create a new clean topic using the canonical synthetic source already preserved in project state:

核心规则:
- 完成注册只是必要条件之一，不保证进入；
- 必须佩戴当天发放的访客证；
- 实验室关闭时不得进入；
- 访客证仅当天有效；
- 18:00 后停止访客入场。

Do not inspect/reuse old topics.

If the UI requires Learn/Tutor to reach recording, one Tutor call is allowed.

No retry if it fails.

## 5. Recording

Choose no prompt assistance.

Record one natural 20–45 second Mandarin explanation of:

“为什么完成注册不等于一定可以进入实验室？”

Do not read a supplied script.

Natural self-correction is allowed.

Preserve original audio.

Submit exactly one ASR request.

No retry on failure.

## 6. Mandatory stop checkpoint

After ASR:
- replay the saved audio;
- compare raw ASR to what was actually spoken;
- check negation, numbers, conditions and key terms;
- correct only ASR mishearing;
- preserve raw and corrected versions;
- do not turn an actual spoken mistake into a corrected performance.

Then STOP.

Do not click content diagnosis yet.

Return to MASTER with:
- raw transcript;
- corrected transcript, or “no correction needed”;
- whether original audio saved;
- whether replay completed normally;
- any critical ASR uncertainty;
- screenshot if useful.

MASTER will then decide whether the remaining one content-diagnosis call may proceed.

## 7. Stop rules

Stop immediately with no retry for:
- Tutor/provider failure;
- ASR/provider failure;
- missing/corrupt original audio;
- replay failure;
- critical transcript uncertainty;
- unexpected extra provider call;
- ledger/budget error;
- source/attempt/version identity problem.

Do not perform Repair/Apply or a second recording.

## 8. Codex state

ACTIVE_EXCHANGE is WAITING_OWNER.

Do not nudge Codex during this manual checkpoint.
