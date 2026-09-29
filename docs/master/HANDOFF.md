# Active Handoff — PHASE3B-LIVE-01 OWNER CHECKPOINT v3

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / LIVE AUTHORIZATION ACTIVE / STOP BEFORE DIAGNOSIS

## Binding

Repo: F:\Chat-Codex-Handoff\validation-repo
Branch: prototype/study-teachback-v0.1
Accepted HEAD: ac875a100b159781037746ea0b8bd2188457d13a

Run the real browser/microphone flow outside Codex sandbox.

Authorization remains:
- max 3 provider calls total
- zero retries
- incremental local exposure <= US$0.03432
- one recording maximum

At this checkpoint allow:
- at most one Tutor/Learn semantic call
- exactly one ASR call
- zero content-diagnosis calls

## 1. Restart onto the accepted baseline

If the old server is still running, return to its PowerShell window and press Ctrl+C.

Start a fresh server in normal PowerShell:
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs

Expected:
Study Teach-back: http://127.0.0.1:4317 (loopback only)

Close the old isolated Edge window and relaunch the isolated profile at http://127.0.0.1:4317.

## 2. Import the synthetic DOCX

Use the file picker and select:
OWNER_VALIDATION_01_测试材料_实验室访客规则.docx

Expected after extraction:
- preview appears
- because material is <=5000 characters, the actual learning source auto-populates
- filename-derived title appears automatically
- no second use-all action is required

Leave both optional setup fields empty:
- 这次重点想学什么？（可选）
- 已经掌握了什么？（可选）

If source does not auto-populate, STOP.

## 3. Start Learn

Click Start/Learn once only.
Do not double-click or retry.

Expected Tutor meaning:
- registration alone is not sufficient
- same-day badge matters
- lab open/closed state matters
- no admission after 18:00

If Tutor errors or contradicts the source, STOP.
Do not ask extra Tutor follow-up questions.

## 4. Record

Choose teach-back / recording.
Assistance: 无提示
Prompt: 为什么完成注册不等于一定可以进入实验室？
Speak naturally for 20–45 seconds.
Do not read a prepared script.
Natural hesitation/self-correction is allowed.
Preserve original audio.
Submit exactly one ASR. No retry.

## 5. Replay/transcript checkpoint

After ASR:
- do not start content diagnosis
- replay saved audio
- compare raw ASR to actual speech
- inspect negation, 18:00, same-day badge, open/closed condition, necessary-vs-sufficient meaning
- correct only ASR mishearing
- do not correct an actual spoken mistake

## 6. Mandatory stop

Do not click content diagnosis.

Return to MASTER with:
- raw transcript
- corrected transcript or no correction needed
- original audio saved yes/no
- replay completed yes/no
- any critical ASR uncertainty
- screenshot if useful

Expected calls at checkpoint:
- Tutor 0 or 1
- ASR exactly 1
- diagnosis 0

## 7. Known test-audio note

During browser regression an audible Chinese phrase about moist soil/watering may occur from the synthetic test fixture. That fixture is not part of the live product flow and should not occur in this manual live session unless a test runner is active.

Stop rules: provider/ASR/audio/replay/ledger/version errors -> STOP with no retry.
No Repair/Apply.
No second recording.

## Verify accepted local baseline before Phase 3B

Before starting the local server, verify the local checkout is exactly the accepted baseline.

Normal Windows PowerShell:

```powershell
git -C F:\Chat-Codex-Handoff\validation-repo rev-parse HEAD
git -C F:\Chat-Codex-Handoff\validation-repo status --short
```

Expected HEAD:

```text
ac875a100b159781037746ea0b8bd2188457d13a
```

Expected tracked status: no tracked modifications.

If HEAD differs, STOP and report to MASTER; do not reset/pull/fetch/rebase automatically.

If HEAD matches:
1. stop any old server with Ctrl+C;
2. start a fresh server from the accepted checkout;
3. close the old isolated Edge window;
4. relaunch the isolated Edge profile or perform a hard refresh;
5. then begin the owner Phase 3B flow.

Server command:

```powershell
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs
```
