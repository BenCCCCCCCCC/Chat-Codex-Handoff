# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01R2 REMOTE REVIEWED / AUTH + ASR TRANSPORT RECOVERED / WORD TIMESTAMP PARTIAL POLICY SELECTED / BUILD-01 CONTINUATION AUTHORIZED**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Normal flow records inside the product; no pre-record/upload requirement.

Private feature-branch checkpoint sync is operational. MASTER directly reviewed `prototype/study-teachback-v0.1` at remote HEAD `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`.

## Verified fifth Whisper result

The fifth explicitly authorized `whisper-1 /v1/audio/transcriptions` request succeeded at HTTP transport level using the already-verified runtime credential fingerprint `deecd15c4b0b`.

Verified from committed evidence:
- HTTP 200;
- request id `req_1136d20fdc6c4f00954060e20866e094`;
- the safe response was persisted before normalization;
- transcript: `只有土壤乾燥時才給這盆植物澆水,土壤濕潤時不要澆水。`;
- 22 provider word entries;
- one segment from 0 to `6.460000038146973`, within the 7.31-second recording;
- word index 14 (`土`) has start=end=`4.579999923706055`;
- current strict shared span validator therefore returned `INVALID_TIME` because it required `end > start` for every word as well as segments.

No sixth Whisper request was made. Authentication no longer requires investigation for this runtime credential.

## MASTER timestamp decision

A new active contract exists at:
`docs/research/strategy-reset-01/BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md`.

MASTER does **not** treat the single zero-duration provider word as grounds to reject the entire transcript/segment result or to spend another ASR request. Current official OpenAI API docs permit requesting word and segment timestamp granularities but do not document a guarantee that every word has strictly positive duration. Public OpenAI Whisper discussions also document zero/effectively-zero-duration word timestamps and limitations of alignment-derived word boundaries.

The current product UI uses ASR **segment spans** for replay and transcript confirmation; individual `words[]` are not a hard dependency for the primary replay/feedback path.

Therefore:
- **segments remain strict hard gates**: finite, in range, ordered, `end > start`;
- **word timings become partial-quality evidence**: finite, in range, ordered, `end >= start`;
- a word with `end == start` is preserved and explicitly marked unusable/zero-duration, not widened/interpolated/merged;
- precise word-level anchors are allowed only for positive-duration usable words;
- critical negation/number/condition/term on unusable/missing word timing remains fail-closed to containing-segment replay + user confirmation;
- no word timestamp is treated as fluency measurement.

After offline implementation against the preserved real response, the fifth fixture may be classified at most as:
**ASR TRANSCRIPT + SEGMENT TIMESTAMP TRANSPORT PASS / WORD TIMESTAMPS PARTIAL / HUMAN REPLAY REVIEW REQUIRED**.

This is not calibrated word-alignment accuracy.

## Logic state

The necessary/sufficient-condition defect remains corrected at source/offline scope: `只有 A 才 B` preserves `B -> A` only and must not be strengthened into `A -> B` without source support.

The corrected bounded Luna semantic challenge has still not run because R2 stopped at timestamp validation. It is now authorized to run after the offline timestamp-policy regression passes. Historical Luna 5/5 remains schema/channel evidence only, not logic-quality evidence.

## Authorized BUILD-01 continuation

No new owner decision is required for the timestamp-policy correction or normal continuation because no provider/model/dependency/budget/data boundary changes.

Codex may:
1. separate segment and word validation, preserving explicit word timing quality metadata;
2. test the exact saved fifth-response shape offline plus malformed cases;
3. make **no new Whisper request** for this recovery;
4. run the corrected bounded `gpt-5.6-luna` logic challenge;
5. if acceptable at its stated scope, resume remaining BUILD-01 C-F;
6. finish export completeness, quota recovery, per-attempt delete, pending-navigation and remaining browser engineering checks;
7. validate delivery only from supported audio observations + segment context, not zero-duration word timings;
8. prepare one integrated owner microphone walkthrough only after engineering readiness;
9. normal fast-forward push sanitized checkpoints to the private feature branch.

If a new live Whisper request becomes genuinely necessary, stop and return a precise User Decision Needed. No implicit sixth same-fixture retry.

## Current cost / boundaries

Reviewed latest checkpoint:
- known conservative cost: US$0.00421565;
- exposure including unsettled reservations: US$0.06102315 / US$5;
- BUILD-01 total new-cash ceiling: US$10;
- no recharge, reset, relabel or provider/model switch.

Still approved:
- local code/commits and normal fast-forward private checkpoint pushes on `prototype/study-teachback-v0.1`;
- loopback Node + Edge + explicit product mic for owner validation;
- owner-selected low-risk single-speaker audio/source through approved OpenAI default/global endpoints;
- models only `whisper-1` + `gpt-5.6-luna`;
- US$5 API exposure/reservation hard stop and US$10 BUILD-01 cash ceiling.

Still prohibited without a new owner decision:
- sixth same-fixture Whisper retry or other additional live ASR not already authorized;
- new provider/model/endpoint workaround, `gpt-transcribe`, local ASR/VAD or new dependency install;
- ledger reset/relabel to bypass limits;
- public hosting, merge/release, force push/destructive remote action;
- external users, third-party/sensitive recordings, secret/private-client publication.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R3_TIMESTAMP_DEGRADATION_AND_RESUME.md` — active continuation policy
4. `docs/research/strategy-reset-01/BUILD_01R2_ASR_EVIDENCE_RECOVERY.md` — completed recovery evidence contract
5. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`
6. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md`
7. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4

## State Summary

Completed: credential/auth recovery; fifth Whisper HTTP 200; transcript + word + segment fields safely persisted; exact zero-duration word defect isolated; private review; 28/28 prior offline regression.

Verified: remote HEAD `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`; successful ASR response shape; 22 words/1 segment; exact `土` zero-duration boundary; latest ledger/cost/exposure.

Likely: segment-level replay is sufficient for current v0.1 primary evidence UX while word timing remains partial metadata; this must be confirmed by offline regression and remaining engineering flow.

Unknown: perceptual word-boundary accuracy beyond the observed shape; corrected live Luna semantic fidelity; remaining C-F and physical-mic product behavior.

Not Done: timestamp-policy code/regression; corrected live Luna logic run; remaining C-F; integrated owner walkthrough; external validation/release.

Must Fix: separate hard segment validity from partial word-timing quality; never fabricate/interpolate zero-duration word boundaries; preserve fail-closed critical-term review.

User Decision Needed: none for current offline fix + Luna/remaining BUILD-01 continuation. New decision only if another live ASR request or another retained boundary becomes necessary.

Future Optional: calibrated word alignment/acoustic analysis, local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Next Smallest Step

**Codex executes BUILD-01R3 from remote HEAD `ef918b4eb9329e424ff90256a9f24fa47ae2abe6`: adapt timestamp validation offline using the preserved real response, run corrected Luna logic challenge, then continue the remaining authorized BUILD-01 C-F without another Whisper retry.**
