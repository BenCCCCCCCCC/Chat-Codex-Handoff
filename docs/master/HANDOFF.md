# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01R RESUME REVIEWED / PARTIAL ACCEPTED / USER DECISION NEEDED — NEW DEDICATED KEY BINDING RETURNS `invalid_api_key`**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

MASTER directly reviewed remote `prototype/study-teachback-v0.1` at HEAD `79988de15ca72a6e2339cb1a4437448008a02153`. No manual artifact upload is needed.

## Verified Latest Recovery

The current runtime key fingerprint changed from the old credential fingerprint, proving the launched runtime inherited a different `OPENAI_API_KEY` value. Exactly one additional Whisper retry was then made with the existing 7.31-second synthetic Mandarin fixture.

Result:
- `whisper-1` `/v1/audio/transcriptions` -> HTTP 401
- safe provider type/code: `invalid_request_error` / `invalid_api_key`
- provider message: supplied API key is incorrect
- no transcript/timestamps
- no Luna semantic rerun after the failure
- paid calls stopped
- 26/26 offline regression PASS
- known conservative cost US$0.00260690
- exposure including unsettled reservations US$0.05941440 / US$5
- ledger/history preserved; no reset/relabel/recharge/model/provider switch.

This supersedes the previous immediate `missing_scope` diagnosis for the old credential. The new runtime value is not accepted as a valid key, so endpoint-scope debugging is premature until credential validity/binding is corrected.

## Owner Action — No Secret Sharing

OpenAI's current official troubleshooting for `Incorrect API key` says to verify the key being used, avoid accidental use of a different/old key, and ensure the intended organization/context. Full secrets are only shown at key creation; if the exact secret was not safely retained, create a new key rather than reconstructing it.

Do not send the key to Chat/Codex or commit it.

Preferred recovery:
1. open the dedicated `Chat-Codex-Handoff` project in OpenAI Platform;
2. confirm the intended product key record exists and is not deleted/revoked;
3. if there is any doubt that the locally stored value is the exact full secret, create a **fresh dedicated key in the same project** rather than guessing the old one;
4. put the fresh secret only in the local server-side/user `OPENAI_API_KEY` environment variable;
5. fully close/reopen the terminal/Codex/runtime so the value is inherited;
6. do not `echo` or screenshot the secret; Codex may only compare a short irreversible fingerprint.

## Next Bounded Resume — Requires Explicit Owner Approval

The existing synthetic fixture has now consumed three Whisper submissions. Do not reset/relabel the attempt or ledger.

After the owner finishes private credential recovery, the next resume should be intentionally two-stage:

1. **one tiny Luna Responses auth smoke first** using the newly inherited runtime credential;
   - if this returns `invalid_api_key`, stop immediately and do not consume another Whisper attempt;
2. only if Luna is HTTP 2xx, allow **exactly one additional Whisper request** on the same existing 7.31-second fixture, raising its allowance from 3 to 4.

If Luna 2xx + Whisper 2xx: validate Mandarin transcript + word/segment timestamps, run corrected live logic challenges, then resume remaining BUILD-01 C-F.

If Luna 2xx + Whisper `missing_scope`: stop and return to endpoint permission/project-role diagnosis.

If Whisper returns another auth failure: stop; no provider/model/dependency workaround.

## Logic State

The `只有 A 才 B` necessary/sufficient correction remains accepted at offline scope. Current source explicitly forbids strengthening necessary conditions into sufficient conditions. The old Luna 5/5 remains schema/channel evidence only. Corrected live Luna logic fidelity is still Not Done because no live rerun occurred after the auth stops.

## Standing Private Sync / Limits

Still approved:
- local code/commits + normal fast-forward private checkpoint pushes on `prototype/study-teachback-v0.1`
- loopback Node + Edge + explicit product mic
- owner-selected low-risk single-speaker audio/source via OpenAI default/global endpoints
- models only `whisper-1` + `gpt-5.6-luna`
- BUILD-01 cash <= US$10; API exposure/reservation hard stop <= US$5

Still prohibited without a new decision:
- secret sharing/printing/committing
- provider/model/dependency change or local ASR/VAD install
- ledger reset/relabel to bypass limits
- public hosting, merge/release, force push
- external users, third-party/sensitive recordings, private client data.

## State Summary

Completed: latest remote checkpoint review; changed runtime key proven; third Whisper submission safely classified as `invalid_api_key`; 26/26 offline regression; no extra paid calls after failure.

Verified: remote branch/SHA, provider auth classification, ledger/cost/exposure at stated scope.

Likely: the newly created dedicated key was not bound exactly/validly, was revoked/deleted, or the wrong value was copied; not yet proven.

Unknown: exact credential mistake, successful ASR/timestamps, corrected live semantic quality, remaining integration behavior.

Not Done: credential correction, tiny Luna validity smoke, one additional bounded Whisper retry, successful speech chain, remaining C-F, owner walkthrough, external validation/release.

Must Fix: valid server-side credential; do not burn another Whisper retry before validating the key with Luna; preserve ledger/history.

User Decision Needed: privately correct/recreate/rebind the dedicated project key, then approve one tiny Luna auth smoke + exactly one additional same-fixture Whisper request under unchanged budget.

Future Optional: local/calibrated VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Minimal Resume Trigger — only after owner has rebound a known-good fresh key

```text
恢复 BUILD-01R credential recovery。

Owner 已在 dedicated Chat-Codex-Handoff OpenAI Project 中确认/重新创建一把新的 product API key，并已将完整 secret 仅绑定到本机 server-side OPENAI_API_KEY；没有把 secret 发到聊天、源码、GitHub 或日志。启动该运行环境的终端/Codex 已完全重启。

批准本轮按以下顺序执行：
1. 先用当前 runtime credential 做 exactly one 个极小 gpt-5.6-luna /v1/responses auth smoke；
2. 只有 Luna HTTP 2xx 时，才批准对现有 7.31 秒 synthetic-mandarin-build01 fixture 再做 exactly one 次 whisper-1 /v1/audio/transcriptions 请求，把该 fixture 的 submission allowance 从 3 提高到 4。

不得 reset/release/relabel 既有 ledger、reservation、minutes、attempt 或历史事件。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: 79988de15ca72a6e2339cb1a4437448008a02153

先读取 meta/master-state CURRENT_STATE.md / HANDOFF.md / BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md / BUILD_01_STUDY_TEACHBACK_HANDOFF.md。

若 Luna 返回 invalid_api_key：立即停止，不调用 Whisper。
若 Luna 2xx + Whisper 2xx：验证真实 transcript + word/segment timestamps，然后运行修正后的 bounded Luna logic challenge，并继续 active BUILD-01 剩余 C-F。
若 Luna 2xx + Whisper 401/missing_scope 或其他 auth failure：立即停止，保存 sanitized status/x-request-id/error type/code/param/message，不继续其他 paid calls。

保持 whisper-1 + gpt-5.6-luna、US$5 API exposure hard stop / US$10 BUILD-01 new-cash ceiling；不换 provider/model、不安装依赖、不重置账本、不自动充值。

完成或阻塞后正常 fast-forward push sanitized checkpoint 到同一 private feature branch，并返回 exact remote SHA/status。
```
