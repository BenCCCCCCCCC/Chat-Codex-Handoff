# Active Handoff — PHASE3B-LIVE-01 FINAL CONTENT DIAGNOSIS

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / ONE REMAINING LIVE CALL AUTHORIZED / NO RETRY

Accepted product HEAD:
bdd0635597006881d6f8f7213122ae53ccbc99a9

## Live budget state

Already used:
- 1 Tutor semantic call
- 1 ASR call
- 1 real recording

Remaining authorized:
- exactly 1 content-diagnosis semantic call
- zero retries

No second recording.
No second ASR.
No Repair/Apply.

## Before clicking diagnosis

Prefer to restart onto accepted HEAD so current UI code is loaded while preserving IndexedDB data in the same isolated Edge profile.

Verify:
git -C F:\Chat-Codex-Handoff\validation-repo rev-parse HEAD

Expected:
bdd0635597006881d6f8f7213122ae53ccbc99a9

If HEAD differs, STOP.

Restart server from normal PowerShell:
Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\server.mjs

Open/reload the same isolated Edge profile at:
http://127.0.0.1:4317

Open the existing owner topic/attempt. Do not create a new topic.

## Transcript review

Use the existing raw/corrected transcript.

Do not insert filler words such as 额/嗯 merely to represent process evidence.

Replay/confirm every required transcript segment if the UI still requires it.

Only correct actual ASR semantic mishearing.

## Final live action

Click:
确认已回听，开始诊断

Exactly once.

Do not retry if provider/ledger/UI returns an error.

## What to capture

After the content diagnosis returns, provide MASTER:
- screenshot of the full feedback area;
- exact 内容理解 findings/text;
- any 讲解过程证据 shown;
- any “值得验证 / 重新解释” target;
- whether the UI still shows historical old process candidates only;
- any error/notice.

Do not click:
- Repair
- Apply
- re-record
- retry ASR
- another diagnosis

## Interpretation boundary

MASTER already has independently derived real-audio process evidence:
- long near-silence about 14.54–15.42s;
- short-pause cluster about 16.08–17.24s overlapping owner-confirmed hesitation.

Do not manually force these into the transcript/UI.

After the one content call, MASTER will evaluate whether content findings and process evidence converge or appropriately remain separate.


## Resume the preserved owner attempt after restart

Using the same isolated Edge profile intentionally preserves IndexedDB topics and attempts across server/browser restarts.

Expected after reopen:
- the prior topic/source/Tutor state may already be visible;
- this does NOT mean a new file upload or new recording is required.

To reopen the preserved real recording:
1. click `学习记录` in the top-right;
2. find the existing `OWNER_VALIDATION_01_测试材料_实验室访客规则` topic;
3. under that topic, choose the saved attempt button labelled like `完整 · <time>`;
4. do not click `继续学习` if the goal is to reopen the prior recording;
5. do not click `我来讲讲`, which would start a new recording flow.

Selecting the saved attempt restores the `回听与反馈` panel with the original audio/transcript/report state.

Then follow the current final-content-diagnosis instructions. No new recording or ASR is authorized.
