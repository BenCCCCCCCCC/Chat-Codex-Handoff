# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**AUTH RECOVERED / BUILD-01 PARTIAL / BUILD-01R2 READY FOR ONE FIFTH WHISPER RETRY APPROVAL**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

MASTER directly reviewed remote `prototype/study-teachback-v0.1` at HEAD `cb973500bafbd58fb8154835292db1e30d1c3e0b`. No manual artifact upload is needed.

## Verified Latest Checkpoint

The latest recovery successfully authenticated both approved endpoint families with the same runtime credential fingerprint `deecd15c4b0b`:
- tiny `gpt-5.6-luna` Responses smoke -> HTTP 200;
- fourth `whisper-1 /v1/audio/transcriptions` request for the existing 7.31-second synthetic Mandarin fixture -> HTTP 200.

Whisper JSON was parsed and its ledger reservation was settled. Authentication is therefore recovered for this runtime credential.

However the executed diagnostic script called local ASR normalization before saving the successful provider response fields. Normalization threw; the catch path discarded the precise validation category and transcript/timestamp fields. The fourth response therefore cannot establish transcript or timestamp correctness.

Do not reopen credential investigation unless the runtime credential fingerprint changes.

## Fixed Evidence Path — Offline Only

Current branch adds `study-teachback-app/asr-evidence.mjs` to persist only sanitized allowlisted:
- transcript text;
- word text/start/end;
- segment text/start/end;
before normalization.

It then records a safe validation category and requires non-empty word timestamps for timestamp-transport PASS.

Offline regression reports **28/28 PASS**. This validates the capture/guard code only; it cannot reconstruct the lost fourth provider response.

## Current User Decision — One Narrow Retry

The same fixture has consumed four Whisper submissions. One additional live response is needed solely because the successful fourth response was lost by the diagnostic evidence path.

Owner must explicitly approve **exactly one fifth** `whisper-1` request for the same existing `synthetic-mandarin-build01` fixture.

This authorization must not reset/release/relabel prior ledger history, reservations, minutes, requests or attempt identity. It only raises this fixture's allowance from 4 to 5. Existing BUILD-01 caps remain US$5 API exposure and US$10 total new cash.

### Execution after approval

1. Verify branch/HEAD/worktree; preserve lineage from `cb973500bafbd58fb8154835292db1e30d1c3e0b`.
2. Before paid ASR, compute only the existing irreversible credential fingerprint.
   - If it is not `deecd15c4b0b`, stop before Whisper with `RUNTIME_CREDENTIAL_CHANGED`.
3. Run exactly one fifth Whisper request on the same 7.31-second fixture.
4. On HTTP non-2xx, save sanitized status/request ID/error and stop.
5. On HTTP 2xx, persist sanitized text/word/segment evidence **before** calling normalization.
6. If validation fails, report the exact safe category and preserved provider shape. No automatic sixth request; do not weaken validation blindly.
7. If transcript + segment timestamps + non-empty word timestamps validate, then run the corrected bounded Luna logic challenge and resume remaining authorized BUILD-01 C-F.
8. Fast-forward push sanitized checkpoint to the same private feature branch. No merge/release/public deploy/force push.

## Logic State

The necessary/sufficient-condition correction remains accepted at offline scope. `只有 A 才 B` must not be strengthened into `A -> B` without source support.

Corrected live Luna logic fidelity is still Not Done; historical Luna 5/5 is schema/channel evidence only.

## Cost / Ledger

Current reviewed checkpoint:
- known conservative cost: `US$0.00341565`;
- exposure: `US$0.06022315 / US$5`;
- no recharge;
- no ledger/reset/relabel;
- BUILD-01 cash ceiling remains `US$10`.

## Standing Private Sync / Boundaries

Still approved:
- local code/commits + normal fast-forward private checkpoint push on `prototype/study-teachback-v0.1`;
- loopback Node + Edge + explicit product mic;
- owner-selected low-risk single-speaker data through approved OpenAI default/global endpoints;
- models only `whisper-1` + `gpt-5.6-luna`;
- no auto recharge/provider/model switch.

Still prohibited without new decision:
- new provider/model/dependency/local ASR/VAD;
- reset/relabel to bypass limits;
- public hosting, merge/release, force push;
- external users, third-party/sensitive audio, secrets/private-client data.

## Minimal Resume Trigger — only after owner approves the fifth request

```text
恢复 BUILD-01R2 / BUILD-01。

Owner 批准对现有 7.31 秒 synthetic-mandarin-build01 fixture 进行 exactly one 次第五次 whisper-1 /v1/audio/transcriptions 请求。仅把该 fixture 的 submission allowance 从 4 提高到 5；不得 reset / release / relabel 既有 ledger、reservation、minutes、request、attempt 或历史事件。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: cb973500bafbd58fb8154835292db1e30d1c3e0b

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md
- docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md
- docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md

执行顺序：
1. 核对 branch/HEAD/worktree，保留当前 lineage。
2. 在任何付费调用前，只计算当前 runtime OPENAI_API_KEY 的不可逆短 fingerprint。必须等于已验证的 deecd15c4b0b；若不同，停止并返回 RUNTIME_CREDENTIAL_CHANGED。不得打印/保存 raw key。
3. 只先执行这一笔第五次 Whisper 请求。
4. HTTP 2xx 时，必须先通过已修正 asr-evidence.mjs 保存 sanitized allowlisted transcript / word timestamps / segment timestamps，再做 normalizeASR 校验。
5. 若校验失败，保存 exact safe validation category + 已保存 provider shape，立即停止；不得自动第六次请求，不得为了通过而弱化 guard。
6. 若 transcript + segment timestamps + non-empty word timestamps 校验通过，运行修正后的 bounded Luna necessary/sufficient logic challenge，然后继续 active BUILD-01 剩余 C-F。
7. 保持 whisper-1 + gpt-5.6-luna、US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling，不换 provider/model，不安装依赖，不重置账本，不自动充值。
8. 完成或阻塞后正常 fast-forward push sanitized checkpoint 到同一 private feature branch；不 merge/release/public deploy/force push。

最终返回 exact remote SHA + status。无需 owner 手工上传 review 文件。
```

## State Summary

Completed: authentication recovered for both approved endpoints; fourth Whisper request HTTP 200; ASR evidence-loss defect fixed offline; 28/28 regression.

Verified: remote checkpoint, same credential fingerprint, Luna 200, Whisper 200, preserved ledger/cost/exposure, fixed evidence helper source.

Likely: a fifth request with pre-validation capture will expose the real ASR transcript/timestamp shape.

Unknown: actual Mandarin transcript/timestamp quality and exact prior validation failure; corrected live Luna logic fidelity; remaining C-F behavior.

Not Done: fifth response capture/validation, live semantic rerun, remaining C-F, integrated owner walkthrough, external validation/release.

Must Fix: successful ASR evidence must be saved before validation; no inferred reconstruction of lost fields; no automatic sixth retry.

User Decision Needed: approve exactly one fifth same-fixture Whisper request under unchanged budget/history constraints.

Future Optional: broader ASR/acoustic/pedagogy calibration, local VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
