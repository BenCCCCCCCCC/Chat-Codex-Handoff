# BUILD-01R2 — ASR successful-response evidence recovery

Date: 2026-09-11
Role: 00 MASTER
Status: READY FOR ONE OWNER RETRY APPROVAL / NARROW RECOVERY ONLY

## 1. Trigger

Remote private feature branch `prototype/study-teachback-v0.1` is now at `cb973500bafbd58fb8154835292db1e30d1c3e0b`.

MASTER directly reviewed that checkpoint. The previous credential blocker is resolved at transport/auth scope:
- one tiny `gpt-5.6-luna` Responses smoke returned HTTP 200;
- the fourth `whisper-1` request for the existing 7.31-second synthetic Mandarin fixture also returned HTTP 200;
- both used the same runtime credential fingerprint `deecd15c4b0b`;
- the Whisper response JSON was parsed and the ledger request was settled.

However the diagnostic runner called `normalizeASR(...)` before persisting allowlisted transcript/timestamp fields. Local validation then threw, and the catch path discarded the precise validation category and successful-response fields. Therefore the actual returned transcript, word timestamps, segment timestamps and exact shape defect are not recoverable from committed evidence.

This is an engineering evidence-capture defect, not an authentication failure and not yet evidence of poor Mandarin ASR/timestamp quality.

## 2. Accepted fix at offline scope

Checkpoint `cb9735...` adds `study-teachback-app/asr-evidence.mjs` so the synthetic diagnostic can:
1. persist only sanitized allowlisted `text`, `words[{word,start,end}]`, and `segments[{text,start,end}]` before normalization;
2. preserve a safe local validation category;
3. require non-empty word timestamps before claiming timestamp transport pass.

Offline regression reports 28/28 PASS, including invalid-timestamp evidence preservation and missing-word/valid-shape cases. This does not replace one fresh live response.

## 3. User decision needed

The same fixture has consumed four submissions. One additional live response requires explicit owner approval.

Recommended exception: raise only `synthetic-mandarin-build01` from 4 to 5 submissions for exactly one additional `whisper-1 /v1/audio/transcriptions` request. Do not reset/release/relabel any prior ledger event, reservation, minutes, request count or attempt identity.

Existing limits remain unchanged:
- BUILD-01 total new cash <= US$10;
- API exposure/reservation hard stop <= US$5;
- models only `whisper-1` + `gpt-5.6-luna`;
- no auto recharge/provider/model switch/new dependency/local ASR.

## 4. Execution procedure after owner approval

1. Verify repo/branch/HEAD/worktree and preserve lineage. Expected remote checkpoint: `cb973500bafbd58fb8154835292db1e30d1c3e0b`.
2. Before any paid call, compute only the existing irreversible short fingerprint of runtime `OPENAI_API_KEY`.
   - If fingerprint != `deecd15c4b0b`, stop before Whisper and report `RUNTIME_CREDENTIAL_CHANGED`.
   - Do not print/store the raw key or Authorization header.
3. Perform exactly one fifth request for the same existing 7.31-second synthetic Mandarin fixture and same attempt ID.
4. On HTTP non-2xx: save only status, x-request-id and sanitized provider error fields; stop paid calls.
5. On HTTP 2xx: before normalization, persist sanitized allowlisted response evidence through the fixed `asr-evidence.mjs`; then run validation.
6. If validation fails, stop and report the exact safe local category plus preserved text/word/segment shape. Do not automatically make a sixth request and do not weaken guards merely to get PASS.
7. If transcript + segment timestamps + non-empty word timestamps validate, mark ASR transport/timestamp evidence PASS (human replay review still required), then run the corrected bounded Luna necessary-vs-sufficient semantic challenge and resume remaining authorized BUILD-01 C-F.
8. Continue to preserve original audio, fail-closed critical-ASR review, content/delivery separation, remaining lifecycle checks and one integrated owner walkthrough before any readiness claim.
9. Fast-forward push sanitized review evidence to the same private feature branch; no merge/release/public deploy/force push.

## 5. Current cost/evidence state

Reviewed checkpoint reports:
- known conservative cost: US$0.00341565;
- exposure including unsettled reservations: US$0.06022315 / US$5;
- no recharge or ledger reset.

The fifth request is justified only because the fourth provider request succeeded but the agent-authored evidence path lost the fields needed to validate it.

## 6. State classification

Completed: credential recovery at auth/HTTP transport scope; fourth Whisper request HTTP 200; evidence-capture defect fixed offline; 28/28 regression.

Verified: remote checkpoint/lineage; Luna 200; Whisper 200; same runtime credential fingerprint; fixed evidence helper source; ledger/cost at stated scope.

Likely: one fifth request with the fixed capture path will reveal the real transcript/timestamp shape without further credential work.

Unknown: actual returned Mandarin transcript/timestamp quality and exact prior normalization failure; corrected live Luna logic fidelity; remaining C-F.

Not Done: successful ASR field/timestamp validation, corrected live Luna semantic rerun, remaining full-chain engineering checks, owner walkthrough, external validation/release.

Must Fix: capture the next successful provider response before validation; do not infer or invent the lost fourth-response fields.

User Decision Needed: approve exactly one fifth same-fixture Whisper request under unchanged budget/history limits.

Future Optional: broader ASR/acoustic/pedagogy calibration after the bounded end-to-end path works.
