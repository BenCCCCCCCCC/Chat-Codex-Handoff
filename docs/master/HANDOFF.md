# Active Handoff — PHASE3B-LIVE-01 OWNER CHECKPOINT v2

Updated: 2026-09-29
Role: 00 MASTER
Status: **WAITING_OWNER / LIVE AUTHORIZATION ACTIVE / STOP BEFORE DIAGNOSIS**

## 1. Binding

Repo:
`F:\Chat-Codex-Handoff\validation-repo`

Branch:
`prototype/study-teachback-v0.1`

Accepted HEAD:
`89c23a155ac7c32e6357b33144edf93bd9850309`

Run real browser/microphone work outside Codex sandbox.

Authorization:
- maximum 3 provider calls total;
- zero retries;
- incremental local exposure <= US$0.03432;
- one recording maximum.

At this checkpoint allow:
- at most one Tutor/Learn semantic call;
- exactly one ASR call;
- zero content-diagnosis calls.

## 2. Start product

Normal owner PowerShell:

```powershell
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs
```

Open the previously validated isolated Edge profile at:
`http://127.0.0.1:4317`

## 3. Import material — no manual title

Use the product's file picker.

Select:
`OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`

Use the local extracted preview and select/use the intended full material.

Do **not** manually type a title.

Expected:
- title is derived locally from the filename;
- source is ready for learning.

For this first live experiment leave both optional setup fields empty:
- 这次重点想学什么？（可选）
- 已经掌握了什么？（可选）

Reason: keep the real ASR/diagnostic experiment focused; optional-context semantics already have deterministic coverage.

## 4. Start Learn

Click Start/Learn once.

Do not double-click or retry.

Expected:
- at most one Tutor semantic call;
- Tutor should preserve:
  - registration alone is not sufficient;
  - same-day badge matters;
  - lab open/closed state matters;
  - no admission after 18:00.

If Tutor contradicts the source or errors, STOP and return to MASTER.

Do not ask extra follow-up questions.

## 5. Record

Choose teach-back / recording.

Assistance:
`无提示`

Prompt:
`请用自己的话解释：为什么完成注册不等于一定可以进入实验室？`

Speak naturally for about 20–45 seconds.

Do not read source text or a prepared answer.

Natural hesitation/self-correction is allowed.

Preserve original audio.

Submit exactly one ASR.

No retry.

## 6. Replay/transcript checkpoint

After ASR:
- do not start content diagnosis;
- replay saved audio;
- compare raw ASR to actual speech;
- inspect negation, 18:00, same-day badge, open/closed condition, necessary vs sufficient meaning;
- correct only ASR mishearing;
- never correct an actual spoken mistake into a better answer;
- preserve raw and corrected versions.

## 7. Mandatory stop

Do NOT click content diagnosis / confirm diagnosis yet.

Return to MASTER with:
- raw transcript;
- corrected transcript or “no correction needed”;
- original audio saved: yes/no;
- replay completed: yes/no;
- any critical ASR uncertainty;
- screenshot if useful.

Expected calls at this checkpoint:
- Tutor: 0 or 1;
- ASR: exactly 1;
- diagnosis: 0.

## 8. Stop rules

Stop with no retry for:
- Tutor/provider error;
- ASR/provider error;
- missing/corrupt original audio;
- replay failure;
- critical transcript uncertainty;
- unexpected extra provider call;
- ledger/budget error;
- source/attempt/version identity issue.

No Repair/Apply.
No second recording.
