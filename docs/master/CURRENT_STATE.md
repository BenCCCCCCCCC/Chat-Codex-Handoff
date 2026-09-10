# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**AUTH RECOVERED / BUILD-01 PARTIAL / BUILD-01R2 OWNER APPROVED — EXACTLY ONE FIFTH WHISPER EVIDENCE-RECOVERY RETRY AUTHORIZED**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Normal flow records inside the product; no pre-record/upload requirement.

Private feature-branch checkpoint sync is operational. MASTER directly reviewed `prototype/study-teachback-v0.1` at accepted checkpoint `cb973500bafbd58fb8154835292db1e30d1c3e0b`.

## Verified latest checkpoint

Credential/auth recovery is complete at endpoint transport scope for runtime fingerprint `deecd15c4b0b`:
- tiny `gpt-5.6-luna` Responses smoke -> HTTP 200;
- fourth `whisper-1 /v1/audio/transcriptions` request on the existing 7.31-second synthetic Mandarin fixture -> HTTP 200;
- both calls used the same runtime fingerprint;
- Whisper JSON was parsed and the request settled in the preserved ledger.

Authentication should not be reopened unless the runtime credential fingerprint changes.

The fourth Whisper response cannot establish transcript/timestamp quality because the diagnostic runner normalized before persisting the allowlisted response fields. Local validation threw and the catch path lost the exact category and transcript/word/segment evidence. This is an agent-authored evidence-capture defect.

Checkpoint `cb9735...` fixes the evidence path with `study-teachback-app/asr-evidence.mjs`, persisting sanitized `text`, word timing and segment timing before normalization and requiring non-empty word timestamps. Offline regression reports 28/28 PASS; accepted only at offline engineering scope.

## Owner approval — active

Owner explicitly approved:

> 批准第五次 Whisper 重试。

Therefore BUILD-01R2 is authorized for **exactly one fifth** `whisper-1` request using the same `synthetic-mandarin-build01` fixture.

This raises only that fixture's ASR submission allowance from 4 to 5. No previous ledger event, reservation, minute, request, attempt, or audio identity may be reset/released/relabelled.

Before the paid ASR call, Codex must verify only the irreversible runtime fingerprint. If it is not `deecd15c4b0b`, stop before Whisper with `RUNTIME_CREDENTIAL_CHANGED`.

On HTTP 2xx, the diagnostic must persist sanitized transcript/word/segment evidence **before** normalization. If validation fails, preserve the exact safe local validation category and saved provider shape and stop; no sixth automatic request and no weakening of guards.

If transcript + segment timestamps + non-empty word timestamps validate, proceed under the existing BUILD-01 authorization to:
1. corrected bounded Luna necessary/sufficient logic challenge;
2. remaining BUILD-01 C–F engineering checks;
3. one integrated owner walkthrough only after engineering readiness.

## Logic state

The earlier necessary/sufficient-condition defect remains corrected at source/offline scope. `只有 A 才 B` must preserve `B -> A` only and cannot be strengthened into `A -> B` without source support.

Corrected live Luna logic fidelity is still Not Done; historical Luna 5/5 remains schema/channel-control evidence only.

## Current cost / boundaries

Reviewed checkpoint:
- known conservative cost: US$0.00341565;
- exposure including unsettled reservations: US$0.06022315 / US$5;
- BUILD-01 total new-cash ceiling: US$10;
- no recharge or ledger reset.

Still approved:
- local code/commits and normal fast-forward private checkpoint pushes on `prototype/study-teachback-v0.1`;
- loopback Node + Edge + explicit product mic;
- owner-selected low-risk single-speaker audio/source via approved OpenAI default/global endpoints;
- models only `whisper-1` + `gpt-5.6-luna`;
- US$5 API exposure/reservation hard stop and US$10 BUILD-01 cash ceiling.

Still prohibited without a new owner decision:
- a sixth same-fixture Whisper request or any retry beyond the currently authorized fifth request;
- new provider/model/endpoint workaround, `gpt-transcribe`, local ASR/VAD or new dependency install;
- ledger reset/relabel to bypass limits;
- public hosting, merge/release, force push/destructive remote action;
- external users, third-party/sensitive recordings, secret/private-client publication.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md` — active authorized recovery
4. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`
5. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
6. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

## State Summary

Completed: authentication recovered for Luna and Whisper transport; evidence-capture defect identified/fixed offline; private review works; 28/28 offline regression; fifth retry explicitly approved.

Verified: remote checkpoint `cb973500bafbd58fb8154835292db1e30d1c3e0b`; Luna 200; Whisper 200; same credential fingerprint; ledger/cost/exposure; fixed evidence helper source.

Likely: the fifth request will expose the real ASR response shape without further credential work.

Unknown: actual Mandarin transcript/timestamp quality, exact prior normalization failure, corrected live Luna logic quality, remaining C–F behavior.

Not Done: fifth ASR capture/validation, corrected live semantic rerun, remaining C–F, integrated owner walkthrough, external validation/release.

Must Fix: successful ASR evidence must be persisted before validation; no inference from the lost fourth response; no automatic sixth retry.

User Decision Needed: none for the authorized fifth retry or normal continuation if it passes. New decision only for retained stop conditions.

Future Optional: broader ASR/acoustic/pedagogy calibration, local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Next Smallest Step

**Codex executes BUILD-01R2 from `cb973500bafbd58fb8154835292db1e30d1c3e0b`: verify fingerprint, run exactly one fifth Whisper request, save allowlisted response evidence before validation, and either stop with exact preserved evidence or continue the existing BUILD-01 path if it passes.**
