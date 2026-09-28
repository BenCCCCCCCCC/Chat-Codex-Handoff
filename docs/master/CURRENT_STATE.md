# Current State

Updated: 2026-09-28 — executable-task consolidation
Role: 00 MASTER / authoritative dynamic state

## 1. Current status and single next action

**OWNER-VALIDATION-01: clean Phase 2 historically PASS; physical-microphone Phase 3 NOT EXECUTED.**
**Batch A — CORRECTNESS-HYGIENE-01: READY / NOT DISPATCHED / NOT STARTED.**
**Batch B — DIAGNOSTIC-LOCALIZATION-01 (Phase 3A): PLANNED / GATED BY MASTER REVIEW OF A.**
**Phase 3B — real owner speech evidence: NOT STARTED / COST-READINESS HOLD.**

The owner stated on 2026-09-28 at 16:45 +10:00 that the previous Codex trigger had not been sent. No later dispatch or execution evidence has been received. Preparing this executable task does not start it.

Next action: the owner sends the canonical Batch A trigger in HANDOFF to Codex. Codex performs A only, then returns evidence to MASTER. Do not automatically start B or a paid test.

| Work item | Status | Exit / next decision |
| --- | --- | --- |
| Architecture and owner-goal clarification | Documented; no feature implementation | Use decisions below, do not repeat the same questions |
| A: provenance, documentation entry, recording registration | Ready, not dispatched | A acceptance matrix in HANDOFF; return to MASTER |
| B / Phase 3A: diagnostic evidence separation and fixtures | Planned, not started | Separate MASTER authorization after A delta review |
| Phase 3B: physical audio / ASR / replay / diagnostic value | On hold, not started | Specific experiment need, data/cost preflight and owner permission |
| Custom retention, reminders, replay UX | Direction recorded; behavior undecided | Separate design/migration decision, not silently included in A |

## 2. Repository and authority

Product: **知而能讲** — Study-first + in-app teach-back.
Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`.
Recorded local checkout: `F:\Chat-Codex-Handoff\validation-repo`.
Feature branch: `prototype/study-teachback-v0.1`.
Accepted feature HEAD and freshly re-read remote branch HEAD on 2026-09-28:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`.

Dynamic authority is ONLY these files on branch `meta/master-state`:
- `docs/master/CURRENT_STATE.md`: status, product decisions, evidence limits and execution order.
- `docs/master/HANDOFF.md`: the self-contained active task, constraints, acceptance matrix, stop conditions, delivery contract and exact short trigger.

A branch name is not a directory prefix. Same-named files in the feature checkout are currently stale historical Handoff-tool documents; do not execute their old next steps. Batch A will replace misleading entry content with explicit ref-aware pointers, not create a second live state.

Local HEAD, dirty work, running server, browser records, microphone and live ledger have not been inspected by MASTER. A remote read is not proof of local synchronization.

Detailed historical review is retained in these same paths at `9a3c77789f99add12f6523282a2114cc8cb78e39`. The complete pre-consolidation decisions and task history are retained at `e3dc9e1bd2a0b7bb7eb9c457eea67c1a8b576b87`. These are evidence references, not competing active instructions.

## 3. Owner decisions — D1 through D7 retained

**D1 — outcomes.** Stable personal use first; a demonstrable/job-search portfolio second. No current commercialization, broad release or external-user rollout priority. Portfolio claims must use real artifacts and evidence, not invented adoption or learning gains.

**D2 — scenario.** Mainly students using course concepts and bounded learning materials. An exact course/niche is not fixed. Interview project explanation is an adjacent hypothesis, not an approved interview-coaching subsystem. Retain learning before teach-back and recording inside the app.

**D3 — time and cost.** Phase 3 was deferred for lack of time and incomplete cost preparation, not demonstrated loss of interest or product failure. The owner will consider spending when necessity is high; no amount is authorized. Current instruction is zero additional live product API calls. This is an authorization boundary, not a newly implemented runtime switch. Do not ask for a budget without a concrete experiment rationale.

**D4 — clarity and replay.** AI teaching, feedback and UI should be clear, direct, non-redundant, sufficiently complete, unambiguous and simply worded. Do not turn this into an invented fluency rubric for the owner. Replay means listening to the owner's saved audio and checking transcription. Restoring an ASR mishearing is not a new oral performance; editing a genuine spoken error into a correct answer cannot demonstrate improvement. No skip policy or required review burden has been approved. Current segment-replay gate remains unchanged in A.

**D5 — retention.** Owner-approved requirement direction: customizable retention with a default and reminders. Exact duration, expiry anchor, reminder channel, grace period and existing-record migration remain undecided. A 30-day default is only a MASTER proposal. In-app reminders do not imply notification while the app is closed; local keep-until-manual-delete is not guaranteed backup. No retention change in A/B; do not delete first and claim the user was warned.

**D6 — diagnostic purpose and split.** Use content plus speech-process evidence to locate the specific concept relation or reasoning transition worth checking, not to polish presentation or reproduce PTE scoring. Feedback areas remain distinct: **内容理解** and **讲解过程** (internal evidence name: processEvidence / 表达过程证据). Content judges source-grounded correctness, completeness and logic. Process evidence describes observable recording/transcript phenomena. Pauses, restarts, repetitions or pitch alone do not prove lack of knowledge. Localization is a candidate followed by a targeted question/re-explanation, not a diagnosis of a person's stable ability. Do not infer anxiety, confidence, personality or accent quality. Judge an explicitly corrected final stance rather than penalizing the withdrawn statement again.

**D7 — execution records.** Every actionable scope, constraint, acceptance test, evidence requirement, sequence and stop condition must be in the canonical files before a Codex trigger is provided. Chat is a convenience surface. Status may progress from ready -> in progress -> delivered/pending review -> MASTER accepted only with corresponding evidence; BLOCKED remains possible at any step. A Codex final response is not acceptance. No undocumented chat-only instruction may silently widen a batch.

## 4. Retained historical evidence

Phase 1: owner imported `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`. Local extraction/preview/selection worked; registration was necessary, not sufficient, with same-day badge, laboratory-open state and 18:00 limit preserved. Import actions caused zero provider requests and an unchanged ledger in that run. Literal `&#x20;` after the title remains a non-blocking extraction issue.

Initial-Learn provenance correction at `f6a000c...`: the internal starter is request context, not fabricated user speech. Historical Node48/48 and Edge29/29 passed with zero paid calls for that correction. These counts are NOT fresh runs.

Clean Phase 2: real owner-browser screenshots confirmed no fabricated initial user bubble, genuine first owner input and source-grounded Tutor replies. Original contaminated topic is historical evidence only, not a clean baseline. Neither old topic is assumed to survive today.

Retained engineering acceptance: UI-UX-FOUNDATION-01R2 and LOCAL-LAUNCH-01 (engineering scope). These do not establish actual microphone success, complete owner flow or repeated learning benefit.

## 5. Active findings and routing

| ID | Confirmed remote-source finding | Treatment |
| --- | --- | --- |
| R01 | openStore invokes expiry using topic createdAt + 7 days | Safe preflight before touching old records; no expiry invocation for inspection |
| R02 | Generated Repair/Apply prompts omit internal provenance and become user-history entries | Batch A; preserve the accepted initial-Learn fix |
| R03 | Root/app READMEs and feature-branch state misidentify current product/phase | Batch A; product-first entry and ref-aware pointers |
| R04 | Runtime mixes historical probes/recovery scripts; synthetic fixture has a special retry allowance | Retained backlog; no broad move or cap/history change in A |
| R05 | Registration precedes successful microphone startup and counts against attempt quota | Batch A; valid recording boundary and idempotency before ASR |
| R06 | Schema, quote and reference validity cannot establish semantic entailment or learning benefit | Keep engineering, semantic and owner-value acceptance separate |

R01 detail: an unchanged 2026-09-12 topic became eligible for expiry around 2026-09-19. Actual local survival is UNKNOWN. Do not ask the owner to reload or launch the application just to inspect it. Preserve available records through a safe export/read-only path when possible. If gone, recreate the synthetic source and perform only a minimal clean-topic sanity check before later live work. Do not promise restoration or reset the ledger. Batch A tests must use isolated synthetic data, not the owner's profile.

## 6. Execution and validation structure

Batch A fixes only R02/R03/R05 and their directly related tests/evidence. It does not create a new application architecture. Details and acceptance IDs A0-A4 are in HANDOFF. The separate meta-document commits made here are not feature changes.

Batch B / Phase 3A, after a separate MASTER decision, will test a small separation:
- contentFindings: source-grounded judgments;
- processEvidence: observable time/span/process evidence, no knowledge verdict and no mandatory textbook quote;
- diagnosticTarget: a relation worth verifying, with separately attributable evidence.

The six planned fixtures remain: fluent wrong; hesitant correct; an unexpressed/uncertain relation with related process evidence; explicit correct self-repair; unreviewed critical ASR error; content gap without process evidence. Fixtures test routing/invariants, not real recognition accuracy, model correctness or learning efficacy. Missing content has no literal spoken timestamp; association must cite a real neighboring segment or remain unlocalized. A restart/self-repair fixture is not proof of a working detector.

Do not require pitch, stress, pronunciation scoring, emotion inference, new audio ML dependencies, full word alignment, an agent framework or broad directory migration. Preserve current raw/corrected provenance, origin and storage identity. More feature extraction is justified only by observed diagnostic need.

The earlier Phase 3 label is retained for the still-unrun microphone checkpoint. Phase 3A is zero-call preparatory validation; Phase 3B is the future real-speech/value work. Neither label converts a planned test into a completed one. Retention UI, broad cleanup and full replay redesign are not prerequisites for the first bounded owner recording.

## 7. Public capability check and cost hold

Rechecked official documentation on 2026-09-28 (documentation evidence only, no paid probe):
- OpenAI deprecations lists whisper-1 announced deprecated on 2026-08-26 for shutdown on 2027-02-26: https://developers.openai.com/api/docs/deprecations
- File transcription recommends gpt-transcribe for general recordings but still directs word/segment timestamp needs to whisper-1: https://developers.openai.com/api/docs/guides/speech-to-text

Decision remains: preserve model/provider configuration in A/B; keep text and alignment conceptually replaceable; make a focused migration/timing decision before future live use, not inside this correctness batch. Other earlier model-specific statements must be rechecked when relevant rather than assumed from an archived note.

Existing-library candidates from the prior check remain ricky0123/vad and Meyda. No library was installed or validated in this app. No new dependency is needed for A or prewritten diagnostic fixtures. Re-evaluate a library only for an observed technical gap; do not repeat a full landscape review for each small fix.

Historical configured models: whisper-1 and gpt-5.6-luna. Historical application exposure US$5 and cash US$10 are ceilings, not funding permission or inspected account funds. No recharge, model switch, stress loop or automatic retry.

Historical pre-correction ledger: requests39, known estimated cost US$0.01293075, exposure US$0.06973825, unsettled4. Clean Phase2 made later calls. These are NOT today's totals. Before proposing live spend, read a safe fresh ledger, verify actual model/endpoint/rates, explain why a zero-call alternative is insufficient, and give a bounded request/retry cap and conservative estimate. No paid call solely to check readiness. Separate validation spending from recurring self-use cost.

## 8. Classification and next smallest step

Completed: remote audit, owner decisions, task/document consolidation; historical Phase1 and clean Phase2 retained.
Verified this turn: canonical files and remote branch identity read; public transcription documentation read. No local runtime verification.
Likely: isolated focused fixes are enough to unblock the next engineering increment; dual evidence may help localization. These are not measured product outcomes.
Unknown: local checkout/records/server/ledger, detector reliability, acceptable review effort, exact retention policy, justified budget and real-owner value.
Not Done: dispatch or execution of A, B, real Phase3/3B, fresh local tests, feature refactor, retention/replay changes, complete owner acceptance.
Must Fix: R02/R03/R05 within A; safe R01 handling before touching old data.
User Decision Needed: nothing additional to prepare/start the bounded zero-call A; future spend, retention/migration and scope expansion still need decisions.
Future Optional: broader reorganization, advanced prosody/pronunciation, separate interview product, cosmetic and non-blocking extraction cleanup.

**Next smallest experiment: Codex reproduces and fixes R02/R03/R05 with isolated zero-live-call regression evidence, returns one A Delivery Packet, and stops for MASTER review.**
