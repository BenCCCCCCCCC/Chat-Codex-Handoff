# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**AUTH RECOVERED / BUILD-01 PARTIAL / BUILD-01R2 OWNER APPROVED — EXACTLY ONE FIFTH WHISPER RETRY NEXT**

Active product remains:
`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`
with normal **in-product microphone recording**, not pre-record/upload.

MASTER directly reviewed remote `prototype/study-teachback-v0.1` at accepted checkpoint `cb973500bafbd58fb8154835292db1e30d1c3e0b`. No manual artifact upload is needed.

## Verified latest state

Current runtime credential fingerprint `deecd15c4b0b` successfully authenticated both approved endpoint families:
- tiny `gpt-5.6-luna` Responses smoke -> HTTP 200;
- fourth `whisper-1 /v1/audio/transcriptions` request on the existing 7.31-second synthetic Mandarin fixture -> HTTP 200.

The fourth Whisper JSON was parsed and settled in the ledger, so auth recovery is complete for this runtime credential. However the executed diagnostic normalized before saving the returned transcript/timestamp fields; local validation threw and the catch path discarded the precise validation category and provider text/word/segment evidence. Therefore actual Mandarin transcript, word timestamps, segment timestamps and the exact shape defect remain Unknown.

Current branch fixes that evidence path in `study-teachback-app/asr-evidence.mjs`: sanitized allowlisted transcript + word/segment timing evidence is persisted **before** normalization, a safe validation category is retained, and non-empty word timestamps are required. Offline regression reports 28/28 PASS; this is only offline engineering evidence.

## Owner approval — satisfied

Owner explicitly said:

> 批准第五次 Whisper 重试。

This authorizes exactly **one fifth** `whisper-1` request for the same existing `synthetic-mandarin-build01` fixture. Only that fixture's submission allowance may change from 4 to 5.

Do not reset/release/relabel prior ledger history, reservations, minutes, requests, attempts or fixture identity.

## Execution order

1. Verify repo/branch/HEAD/worktree and preserve lineage from `cb973500bafbd58fb8154835292db1e30d1c3e0b`.
2. Before paid ASR, compute only the irreversible short fingerprint of runtime `OPENAI_API_KEY`.
   - must equal `deecd15c4b0b`;
   - if different, stop with `RUNTIME_CREDENTIAL_CHANGED` before Whisper;
   - never print/store/commit raw key or Authorization header.
3. Run exactly one fifth Whisper request for the same 7.31-second fixture and same attempt ID.
4. HTTP non-2xx: save sanitized status/request ID/error and stop.
5. HTTP 2xx: first persist sanitized allowlisted `text`, `words[{word,start,end}]`, and `segments[{text,start,end}]`, then run normalization/validation.
6. If validation fails, preserve exact safe local category + saved provider shape and stop. No sixth request and no weakening guards merely for PASS.
7. If transcript + segment timestamps + non-empty word timestamps validate, run the corrected bounded Luna necessary/sufficient logic challenge.
8. If that passes at its stated scope, continue remaining already-authorized BUILD-01 C–F: real ASR critical-term gates, supported delivery observations, remaining export/quota/per-attempt-delete/pending-navigation checks, then one integrated owner walkthrough.
9. Fast-forward push sanitized evidence to `prototype/study-teachback-v0.1`. No merge/release/public deploy/force push.

## Logic state

`只有 A 才 B` remains constrained to `B -> A` only; no silent strengthening into `A -> B`. Historical Luna 5/5 is not logic-quality evidence. Corrected live Luna semantic quality remains Not Done until rerun after ASR evidence passes.

## Cost / limits

Current reviewed checkpoint:
- known conservative cost: `US$0.00341565`;
- exposure: `US$0.06022315 / US$5`;
- BUILD-01 total new cash ceiling: `US$10`;
- no recharge or ledger reset.

Still approved: local code/commits, private feature-branch fast-forward checkpoint sync, loopback Node + Edge + explicit product mic, owner-selected low-risk single-speaker data, `whisper-1` + `gpt-5.6-luna`, unchanged US$5/US$10 limits.

Still prohibited without a new owner decision: sixth same-fixture Whisper request, provider/model/dependency change, `gpt-transcribe`, local ASR/VAD install, ledger reset/relabel, public hosting, merge/release, force push, external users, third-party/sensitive audio, secrets/private-client publication.

## Authority / Read Order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md`
4. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`
5. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
6. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

## Minimal Resume Trigger

```text
恢复 BUILD-01R2 / BUILD-01。

Owner 已明确批准第五次 Whisper 重试。

允许对现有 7.31 秒 synthetic-mandarin-build01 fixture 进行 exactly one 次第五次 whisper-1 /v1/audio/transcriptions 请求。仅把该 fixture 的 submission allowance 从 4 提高到 5；不得 reset / release / relabel 既有 ledger、reservation、minutes、request、attempt 或历史事件。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: cb973500bafbd58fb8154835292db1e30d1c3e0b

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md
- docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md
- docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md

执行：
1. 核对 branch/HEAD/worktree并保留 lineage。
2. 任何付费 ASR 前，只计算当前 runtime OPENAI_API_KEY 的不可逆短 fingerprint；必须等于已验证的 deecd15c4b0b。若不同，停止并返回 RUNTIME_CREDENTIAL_CHANGED。不得打印/保存 raw key。
3. 只先执行这一笔第五次 Whisper 请求。
4. HTTP 2xx 后，必须先通过已修正的 asr-evidence.mjs 保存 sanitized allowlisted transcript / word timestamps / segment timestamps，再调用 normalizeASR。
5. 若校验失败，保存 exact safe validation category + 已保存 provider shape，立即停止；不得自动第六次请求，不得为了通过而弱化 guard。
6. 若 transcript + segment timestamps + non-empty word timestamps 校验通过，运行修正后的 bounded Luna necessary/sufficient logic challenge，然后继续 active BUILD-01 剩余 C-F。
7. 保持 whisper-1 + gpt-5.6-luna、US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling；不换 provider/model，不安装依赖，不重置账本，不自动充值。
8. 完成或阻塞后正常 fast-forward push sanitized checkpoint 到同一 private feature branch；不 merge/release/public deploy/force push。

最终只返回：status、remote branch、exact remote SHA、Whisper evidence result、Luna logic result（如实际运行）、known cost、exposure。无需 owner 手工上传 review 文件。
```

## State Summary

Completed: auth recovered; fourth Whisper HTTP 200; evidence-capture defect fixed offline; 28/28 regression; fifth retry approved.

Verified: accepted remote checkpoint; same credential fingerprint; Luna 200; Whisper 200; preserved ledger/cost; fixed evidence helper.

Likely: fifth request will expose the actual ASR response shape.

Unknown: actual Mandarin transcript/timestamps, exact prior validation failure, corrected live Luna logic fidelity, remaining C–F.

Not Done: fifth response capture/validation, corrected live semantic rerun, remaining C–F, integrated owner walkthrough, external validation/release.

Must Fix: persist successful ASR evidence before validation; no inferred reconstruction; no automatic sixth retry.

User Decision Needed: none for this authorized retry or normal continuation if it passes. New decision only for retained stop conditions.

Future Optional: broader ASR/acoustic/pedagogy calibration, local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
