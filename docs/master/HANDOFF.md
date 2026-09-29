# Active Handoff — PHASE3B-LIVE-01 OWNER CHECKPOINT v2

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / LIVE AUTHORIZATION ACTIVE / STOP BEFORE DIAGNOSIS

## Binding

Repo: F:\Chat-Codex-Handoff\validation-repo
Branch: prototype/study-teachback-v0.1
Accepted HEAD: 89c23a155ac7c32e6357b33144edf93bd9850309

Run browser/microphone work outside Codex sandbox.

Authorization remains:
- max 3 provider calls total
- zero retries
- incremental local exposure <= US$0.03432
- one recording maximum

At this checkpoint allow at most:
- one Tutor/Learn semantic call
- exactly one ASR call
- zero content-diagnosis calls

## Owner flow

1. Start the local server in normal PowerShell.
2. Open the previously validated isolated Edge profile at http://127.0.0.1:4317.
3. Use the file picker to import:
   OWNER_VALIDATION_01_测试材料_实验室访客规则.docx
4. Use the extracted full material.
5. Do not manually enter a title. The product should derive it locally from the filename.
6. Leave both optional setup fields empty for this first live experiment:
   - 这次重点想学什么？（可选）
   - 已经掌握了什么？（可选）
7. Click Start/Learn once only. If Tutor contradicts the source or errors, stop.
8. Do not ask extra Tutor follow-up questions.
9. Choose teach-back with no prompt assistance.
10. Record one natural 20–45 second Mandarin explanation of:
    为什么完成注册不等于一定可以进入实验室？
11. Submit exactly one ASR. No retry.
12. Replay the saved audio and compare raw ASR against actual speech.
13. Check negation, 18:00, same-day badge, lab open/closed state, and necessary-vs-sufficient meaning.
14. Correct only ASR mishearing. Do not correct an actual spoken mistake.
15. Stop before content diagnosis.

Return to MASTER with:
- raw transcript
- corrected transcript or “no correction needed”
- original audio saved yes/no
- replay completed yes/no
- any critical ASR uncertainty
- screenshot if useful

Stop immediately for provider/ASR/audio/replay/ledger/version errors.
No Repair/Apply.
No second recording.


## Exact local server startup commands

Use a normal Windows PowerShell window opened by the owner, not a Codex-run terminal.

Run:

```powershell
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs
```

Expected output:

```text
Study Teach-back: http://127.0.0.1:4317 (loopback only)
```

Leave this PowerShell window open while using the product.

Then open the product in the validated isolated Edge profile, or manually browse to:

`http://127.0.0.1:4317`

To stop the local server after the test, return to the server PowerShell window and press `Ctrl+C`.

Do not close the server window before finishing the current browser test.
