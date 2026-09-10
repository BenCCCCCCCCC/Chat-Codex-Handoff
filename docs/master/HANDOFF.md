# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**BUILD-01 REMOTE CHECKPOINT REVIEWED / PARTIAL ACCEPTED / BUILD-01R AUTHORIZED**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

Private checkpoint sync is now operational. MASTER directly reviewed remote `prototype/study-teachback-v0.1` at HEAD `99228bed6aa17b05790083de5ecdd45c4a96c28f`; GitHub shows parent product checkpoint `be5cef57564ed16bf2f25467ad0247bb9d7a717a`. The sync commit only adds readable review evidence.

BUILD-01 is a **PARTIAL engineering checkpoint**, not integrated product PASS. The active next contract is:
`docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`.

PRODUCT-CORE-01 stays PAUSED; INTERVIEW-DEMO-01 stays SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Remote Review Findings

MASTER directly verified:
- Delivery Packet/review manifest/source are readable on GitHub; no need for owner manual upload;
- Node receipt 18/18 at engineering-fixture scope;
- Edge receipt 14/14 with real MediaRecorder/IndexedDB but synthetic tone and stub provider;
- real Luna API evidence exists, including five text challenge cases and Learn/Repair/Apply schema outputs;
- real Whisper test used a 7.31s synthetic Mandarin Windows voice and returned HTTP 401, with no transcript/timestamps;
- known Luna cost estimate US$0.00259815; exposure including unsettled reservations US$0.02340565 / US$5;
- no owner physical mic/full live integration/live delivery/owner walkthrough yet.

## Must Fix 1 — Auth Diagnosis

`provider.mjs` uses the same `process.env.OPENAI_API_KEY`, Bearer pattern and `api.openai.com` host for successful Responses calls and the failing transcription call. An obvious separate in-code key/header/base-URL bug is therefore not supported.

But the failure path discarded the provider error body and the evidence says `responseBodyRead:false`; Luna and Whisper checks were separate processes. Exact 401 cause is still Unknown.

BUILD-01R must run one same-process diagnostic using the existing approved credential: one tiny Luna call + one existing short synthetic Whisper call. It may record only a non-reversible short key fingerprint for equality, HTTP status, x-request-id and sanitized error type/code/param/message. Never record the raw key or Authorization header.

If Luna passes and Whisper still returns 401, stop paid calls and use the safe provider error to determine whether owner action on API-key endpoint permissions/project/model/account membership is required. OpenAI currently supports Restricted per-endpoint API-key permissions and project model permissions, so these are plausible only if the returned error points there. Do not ask for a secret value.

## Must Fix 2 — Logic Fidelity

Current synthetic source uses `只有 A 才 B`, which makes A necessary for B, not automatically sufficient. Yet the live Learn result says dry soil means one should water, and parts of the current challenge set accept a strengthened `dry -> water` interpretation.

Therefore the reported Luna 5/5 is accepted as real API/schema/channel-control evidence, **not as logic-quality 5/5**.

BUILD-01R must:
- correct necessary-vs-sufficient expectations;
- add a direct `只有持票者才可以入场` vs `只要持票就一定可以入场` challenge;
- revise Tutor/content behavior or fixtures so source logic is not silently strengthened;
- rerun the bounded semantic challenge set and report disagreements honestly.

## BUILD-01R Execution Boundary

No new owner approval is required because this is inside the already-approved BUILD-01 provider/model/data/budget/local-development scope.

If same-process Whisper succeeds, proceed to actual Mandarin timestamp shape checks, fail-closed negation/number/condition/term handling, live delivery, remaining export/quota/per-attempt-delete/pending-navigation checks, then one integrated owner walkthrough.

If same-process Whisper still 401 and safe evidence identifies an owner-controlled permission/account setting, stop with one precise User Decision Needed. If Luna also fails, stop and report current credential/runtime access changed; do not rotate/replace automatically.

No provider/model change, `gpt-transcribe`, new package/local ASR/VAD, admin API, budget increase, public/merge/release action or private-client access.

## Standing Private Sync

Codex may normal fast-forward push this bounded feature branch and sanitized review checkpoints to the existing private repo without repeated owner approval. No force push, remote branch delete, merge/default-branch integration, release/public deploy, secrets/`.env`, raw owner/private audio or sensitive material.

After the checkpoint push, report exact remote branch/SHA; MASTER reads the evidence directly.

## Active Limits

- models only `whisper-1` + `gpt-5.6-luna`
- OpenAI default/global endpoints already approved for this build
- total new cash <= US$10
- API exposure/reservation hard stop <= US$5
- no automatic recharge/model/provider escalation
- owner-selected low-risk single-speaker data only

## State Summary

Completed: remote sync and direct MASTER artifact/source review; partial checkpoint accepted at stated evidence scope; auth and semantic-logic defects localized; BUILD-01R created.

Verified: remote branch/head/parent; readable source/evidence; real Luna use; real Whisper HTTP 401; coded auth path is shared in `provider.mjs`.

Likely: product shell/state/guard work is sufficient to continue; auth may be runtime/account permission rather than request construction, but not proven.

Unknown: exact 401 safe provider error; whether prior Luna/Whisper runs used the same secret value; successful Mandarin timestamps; live delivery and full user journey.

Not Done: BUILD-01R, end-to-end speech PASS, remaining live/browser checks, owner walkthrough, external learner validation/release.

Must Fix: auth classification/recovery; necessary/sufficient logic fidelity; no fake end-to-end or semantic-quality status.

User Decision Needed: none now; only if same-process safe diagnostic points to an owner-controlled API credential/project/account permission.

Future Optional: local VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Minimal Codex Trigger

```text
执行 BUILD-01R：Whisper auth + logic-fidelity recovery。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote/local checkpoint lineage: be5cef57564ed16bf2f25467ad0247bb9d7a717a -> 99228bed6aa17b05790083de5ecdd45c4a96c28f

先读取 meta/master-state：
docs/master/CURRENT_STATE.md
docs/master/HANDOFF.md
docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md
以及原 BUILD_01_STUDY_TEACHBACK_HANDOFF.md。

本轮在现有 BUILD-01 授权内执行，不需要普通实现细节再次审批。

重点：
1. 先做 same-process auth diagnostic：同一 OPENAI_API_KEY runtime value 下一个极小 Luna 请求 + 一个现有短 synthetic Whisper 请求。不得打印/提交 raw key 或 Authorization；只允许不可逆短 fingerprint、HTTP status、x-request-id 和 sanitized error type/code/param/message。
2. 不重置 usage ledger/未结算预留。
3. 如果 Luna PASS + Whisper 401，立即停止付费调用；根据安全 error evidence 返回精确 User Decision Needed，不换 provider/model、不安装东西。
4. 如果 Whisper PASS，继续验证真实 transcript/timestamps 并恢复剩余 BUILD-01 C-F。
5. 修正 `只有A才B` 必要/充分条件错误；增加“只有持票者才可入场”但用户说“只要持票就一定可以入场”的挑战，不能判 source-supported。
6. Schema-valid 不等于 logic-valid；重新报告 semantic challenge 结果。
7. 正常 fast-forward push 最新 sanitized checkpoint 到 private `prototype/study-teachback-v0.1`；不 merge/release/public deploy/force push。

保留原模型/预算/数据边界：whisper-1 + gpt-5.6-luna，US$10 cash ceiling / US$5 API exposure hard stop，无自动充值/切模。

若仍需 owner 修改 key/project/account 权限，最终返回 BUILD-01R PARTIAL / USER DECISION NEEDED，并给出不涉及 secret 的具体 UI 操作；否则继续原 BUILD-01 到最高允许状态 READY FOR INTEGRATED OWNER VALIDATION。
```
