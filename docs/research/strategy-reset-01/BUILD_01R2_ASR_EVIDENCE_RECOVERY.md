# BUILD-01R2 — ASR successful-response evidence recovery

Date: 2026-09-11
Role: 00 MASTER
Status: **OWNER APPROVED / AUTHORIZED FOR EXACTLY ONE FIFTH WHISPER RETRY**

## 1. Trigger / accepted checkpoint

Remote private feature branch `prototype/study-teachback-v0.1` is at accepted checkpoint `cb973500bafbd58fb8154835292db1e30d1c3e0b`.

MASTER directly reviewed that checkpoint. Credential/auth recovery is verified at transport scope:
- one tiny `gpt-5.6-luna` Responses smoke returned HTTP 200;
- the fourth `whisper-1` request for the existing 7.31-second synthetic Mandarin fixture returned HTTP 200;
- both used runtime credential fingerprint `deecd15c4b0b`;
- the Whisper JSON was parsed and the ledger request settled.

The fourth response cannot prove transcript/timestamp correctness because the diagnostic runner normalized before persisting allowlisted response fields; local validation threw and the catch path discarded the exact category plus transcript/word/segment fields. This is an engineering evidence-capture defect, not an auth failure and not evidence of poor Mandarin ASR.

Checkpoint `cb9735...` adds `study-teachback-app/asr-evidence.mjs` so sanitized `text`, `words[{word,start,end}]`, and `segments[{text,start,end}]` are persisted **before** normalization. It also preserves a safe validation category and requires non-empty word timestamps for timestamp-transport PASS. Offline regression reports 28/28 PASS; this is accepted only at offline engineering scope.

## 2. Owner decision — approved

Owner explicitly replied:

> 批准第五次 Whisper 重试。

This authorizes **exactly one** additional `whisper-1 /v1/audio/transcriptions` request for the existing `synthetic-mandarin-build01` 7.31-second fixture.

The exception raises only that fixture's submission allowance from 4 to 5. It does **not** reset, release, relabel or replace any prior ledger event, reservation, minutes, request count, attempt identity or audio fixture.

Existing limits remain unchanged:
- BUILD-01 total new cash <= US$10;
- API exposure/reservation hard stop <= US$5;
- models only `whisper-1` + `gpt-5.6-luna`;
- no auto recharge/provider/model switch;
- no new dependency, local ASR/VAD, `gpt-transcribe`, public deployment, merge/release or force push.

## 3. Authorized execution procedure

1. Verify repo/branch/HEAD/worktree and preserve lineage. Expected remote checkpoint: `cb973500bafbd58fb8154835292db1e30d1c3e0b`.
2. Before any paid ASR call, compute only the irreversible short fingerprint of runtime `OPENAI_API_KEY`.
   - It must equal reviewed fingerprint `deecd15c4b0b`.
   - If different, stop before Whisper with `RUNTIME_CREDENTIAL_CHANGED`.
   - Never print/store/commit the raw key or Authorization header.
3. Perform exactly one fifth request for the same existing 7.31-second synthetic Mandarin fixture and same attempt ID.
4. On HTTP non-2xx: save only status, `x-request-id` and sanitized provider error fields; stop paid calls.
5. On HTTP 2xx: **persist sanitized allowlisted text/word/segment response evidence before normalization** through the fixed evidence path.
6. Then run validation.
   - If validation fails, preserve the exact safe local category plus the saved provider shape and stop.
   - Do not automatically make a sixth request.
   - Do not weaken guards merely to make the result pass.
7. If transcript + segment timestamps + non-empty word timestamps validate, mark ASR transport/timestamp evidence PASS (still requiring replay/human review for content accuracy), then run the corrected bounded Luna necessary-vs-sufficient semantic challenge.
8. If corrected Luna challenge passes at its stated scope, resume the remaining already-authorized BUILD-01 C–F work: real ASR critical-term gates, supported delivery observations, remaining export/quota/per-attempt-delete/pending-navigation checks, and one integrated owner walkthrough.
9. Fast-forward push sanitized review evidence to the same private feature branch. No merge/release/public deploy/force push.

## 4. Current cost/evidence state

Reviewed checkpoint reports:
- known conservative cost: US$0.00341565;
- exposure including unsettled reservations: US$0.06022315 / US$5;
- no recharge or ledger reset.

The fifth request is justified solely because the fourth provider request succeeded but the agent-authored evidence path lost the fields required for validation.

## 5. State classification

Completed: credential recovery at auth/HTTP scope; fourth Whisper HTTP 200; evidence-capture defect fixed offline; 28/28 regression; owner fifth-retry approval.

Verified: remote checkpoint/lineage; Luna 200; Whisper 200; same runtime credential fingerprint; fixed evidence helper source; ledger/cost at stated scope.

Likely: one fifth request with pre-validation capture will reveal the actual provider transcript/timestamp shape without further credential work.

Unknown: actual Mandarin transcript/timestamp quality; exact prior normalization failure; corrected live Luna semantic fidelity; remaining C–F behavior.

Not Done: fifth response capture/validation; corrected live Luna semantic rerun; remaining end-to-end C–F; integrated owner walkthrough; external validation/release.

Must Fix: persist successful ASR evidence before validation; no inference from the lost fourth response; no automatic sixth retry.

User Decision Needed: **none for this fifth retry or ordinary continuation if it passes.** A new decision is required only if another retained stop is triggered (sixth paid ASR request, provider/model/dependency change, budget/scope expansion, merge/release/public action, credential change, etc.).

Future Optional: broader ASR/acoustic/pedagogy calibration, local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.
