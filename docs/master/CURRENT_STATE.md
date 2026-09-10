# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**AUTH RECOVERED / BUILD-01 PARTIAL / BUILD-01R2 READY FOR ONE FIFTH WHISPER RETRY APPROVAL — ASR EVIDENCE CAPTURE DEFECT**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Normal flow records inside the product; no pre-record/upload requirement.

Private feature-branch checkpoint sync is working. MASTER directly reviewed remote `prototype/study-teachback-v0.1` at `cb973500bafbd58fb8154835292db1e30d1c3e0b`.

## Verified Latest Recovery

Remote lineage is a normal descendant of `79988de15ca72a6e2339cb1a4437448008a02153`.

The latest checkpoint proves credential/auth recovery at endpoint transport scope:
- runtime credential fingerprint is `deecd15c4b0b`;
- tiny `gpt-5.6-luna` Responses smoke returned HTTP 200;
- the fourth `whisper-1` request for the existing 7.31-second synthetic Mandarin fixture returned HTTP 200;
- both calls used the same runtime credential fingerprint;
- Whisper response JSON was parsed and the request was settled in the preserved ledger.

Authentication no longer requires further investigation for this runtime credential unless the fingerprint changes.

## ASR Evidence Defect

The fourth Whisper request cannot be accepted as transcript/timestamp PASS because the diagnostic runner normalized the successful provider response before persisting allowlisted transcript/time fields. Local validation then threw and the catch path discarded both the precise validation category and the successful-response text/word/segment fields.

Therefore the following remain Unknown for that request:
- actual Mandarin transcript;
- word timestamps;
- segment timestamps;
- exact normalization failure.

Do not reconstruct or infer these fields from the HTTP 200 result.

Checkpoint `cb9735...` fixes this evidence path with `study-teachback-app/asr-evidence.mjs`: sanitized `text`, word timing and segment timing are persisted before normalization; safe validation categories are retained; non-empty word timestamps are required before timestamp transport can pass. Offline regression reports **28/28 PASS**. This is accepted only as offline engineering evidence.

## Logic State

The earlier necessary/sufficient-condition defect remains corrected at source/offline scope. `只有 A 才 B` is constrained to `B -> A` only and cannot be strengthened into `A -> B` without source support.

The corrected bounded Luna semantic challenge has still NOT RUN because execution stopped after the ASR evidence failure. Historical Luna 5/5 remains schema/channel evidence only, not logic-fidelity proof.

## Current Cost / Ledger

Reviewed latest evidence:
- known conservative cost: **US$0.00341565**;
- exposure including unsettled reservations: **US$0.06022315 / US$5**;
- no recharge;
- no ledger/reservation/minute/attempt reset or relabel;
- original BUILD-01 total new-cash ceiling remains US$10.

## New Narrow Recovery Gate

A new active recovery contract exists at:
`docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md`.

The same synthetic fixture has consumed four submissions. One fresh provider response is required because the fourth response was lost to the agent-authored evidence-capture defect.

### User Decision Needed

Approve exactly **one fifth** `whisper-1 /v1/audio/transcriptions` request for the same `synthetic-mandarin-build01` 7.31-second fixture.

This exception:
- raises only that fixture's allowance from 4 to 5;
- does not reset/release/relabel prior ledger history, reservations, minutes, request counts or attempt identity;
- keeps models limited to `whisper-1` + `gpt-5.6-luna`;
- keeps US$5 API exposure hard stop and US$10 BUILD-01 cash ceiling;
- does not authorize provider/model/dependency changes.

Before the fifth request, Codex must compare the runtime credential fingerprint to the reviewed `deecd15c4b0b`. If it differs, stop before paid ASR and report `RUNTIME_CREDENTIAL_CHANGED`.

On fifth-request HTTP 2xx, persist sanitized allowlisted response fields **before** validation. If validation fails again, stop with the exact safe local category and preserved response shape; do not auto-run a sixth request or weaken guards. If transcript + segment timestamps + non-empty word timestamps validate, proceed to corrected live Luna logic challenge and resume remaining already-authorized BUILD-01 C-F.

## Standing Private Sync / Active Limits

Approved:
- local code/commits + normal fast-forward private checkpoint pushes on `prototype/study-teachback-v0.1`;
- loopback Node + Edge + explicit product mic;
- owner-selected low-risk single-speaker audio/source via OpenAI default/global endpoints;
- models only `whisper-1` + `gpt-5.6-luna`;
- BUILD-01 cash <= US$10; API exposure/reservation hard stop <= US$5.

Still prohibited without new decision:
- provider/model/dependency change or local ASR/VAD install;
- ledger reset/relabel to bypass limits;
- public hosting, merge/release, force push;
- external users, third-party/sensitive recordings, secret/private-client publication.

## State Summary

Completed: dedicated credential recovered; Luna 200 and Whisper 200 verified on same runtime credential; ASR evidence-loss defect identified and fixed offline; private remote sync/review; 28/28 offline regression.

Verified: remote SHA `cb973500bafbd58fb8154835292db1e30d1c3e0b`; HTTP 200 for both approved endpoints; same credential fingerprint; ledger/cost/exposure at stated scope; fixed capture helper source.

Likely: one fifth request using the fixed capture path will reveal the actual transcript/timestamp shape without further credential work.

Unknown: actual Mandarin transcript/timestamps from successful provider response; exact prior normalization failure; corrected live Luna semantic fidelity; remaining C-F behavior.

Not Done: one fifth ASR response capture/validation; corrected live semantic rerun; remaining end-to-end C-F; integrated owner walkthrough; external validation/release.

Must Fix: persist successful ASR evidence before validation; do not infer lost response fields; no sixth automatic retry if the fifth response still fails validation.

User Decision Needed: approve exactly one fifth same-fixture Whisper request under unchanged history/budget boundaries.

Future Optional: broader ASR/acoustic/pedagogy calibration, local VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Next Smallest Step

**Owner approves one fifth same-fixture Whisper request. Codex captures sanitized text/word/segment evidence before validation; success resumes corrected Luna logic and remaining BUILD-01 C-F, failure stops with exact evidence.**
