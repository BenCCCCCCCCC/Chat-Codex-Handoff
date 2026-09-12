# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**OWNER-VALIDATION-01 — PAUSED AFTER PHASE 2 / MUST FIX BEFORE MICROPHONE**

**OWNER-VALIDATION-PROVENANCE-FIX-01 — AUTHORIZED / NOT YET EXECUTED**

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

Active product: **知而能讲**.
Feature branch: `prototype/study-teachback-v0.1`.
Feature HEAD under validation before the correction: `912bce6542eef4fe813f32fe4e160acd97ca2d71`.

## OWNER-VALIDATION evidence so far

### Phase 1 — PASS

Owner used `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`.

Verified:
- local DOCX extraction worked;
- necessary-vs-sufficient meaning remained intact;
- same-day visitor badge, laboratory-open state and 18:00 limit remained understandable;
- owner selected the extracted material into the learning source;
- import/preview/use-all added **0 provider/model requests** and the usage ledger remained byte-identical;
- server remained ready.

Minor non-blocking extraction formatting issue: literal `&#x20;` appeared after the title.

### Phase 2 — Learn evidence

Owner clicked `开始学习` and then sent one genuine source-grounded question.

Read-only checkpoint:
- 2 new semantic requests using the approved Luna model;
- request 1 completed at provider level but local validation rejected the result as `INVALID_SOURCE_QUOTE`;
- request 2 completed and displayed a source-grounded answer;
- automatic retry = **NO**;
- state remained usable;
- known cost changed from US$0.01179245 to US$0.01293075;
- exposure changed from US$0.06859995 to US$0.06973825;
- delta = US$0.00113830;
- four historical unsettled reservations remained.

The successful Tutor answer correctly kept registration as necessary but not sufficient and referenced the same-day badge, open state and 18:00 limit without observed unsupported rules.

The validation failure itself was fail-closed and recovered through one later explicit owner question; no retry loop occurred.

## New owner-found Must Fix — message provenance

The owner observed that the automatically generated starter instruction

`请先帮我理解这段材料，从核心关系开始，问我一个简短问题。`

is rendered as a user chat bubble labelled `你的想法`.

MASTER source review confirms this is not only presentation. Current `app.mjs` creates a new topic, then calls `teach(...)`; `teach()` unconditionally pushes every supplied message into `topic.messages` as `{role:'user'}` before the provider request. Therefore the application currently:
- visually attributes an application-generated instruction to the owner;
- persists it as if the owner said it;
- can include that fabricated user-role message in later conversational history.

This is a **provenance bug** and a Must Fix. It conflicts with the product's evidence/identity discipline. Do not proceed to microphone/ASR on the contaminated topic.

## OWNER-VALIDATION-PROVENANCE-FIX-01

Bounded correction on the same feature branch. No new product scope.

Required behavior:
1. The automatic initial Learn instruction may still be used internally to request the first Tutor response, but it must **not** be persisted or rendered as owner-authored chat content.
2. Before the owner actually types something, there must be no `.message.user` / `你的想法` item created from application scaffolding.
3. If the initial Tutor request fails local validation, no fake user message may remain in topic history.
4. The first real owner text entry must be the first stored `role:'user'` message.
5. Subsequent genuine owner/assistant history, repair/apply behavior and all R3/R4/source/storage/budget guards must remain unchanged.
6. Do not add a new provider/model call to implement or test this correction. Use stubbed/synthetic tests only.
7. Preserve the existing failed owner-validation topic as evidence; do not silently rewrite its historical record. After the fix, restart Owner Validation using a **new clean topic** with the same synthetic test file.

Suggested minimal implementation: make `teach()` able to distinguish an internal bootstrap request from a genuine owner message, instead of adding the bootstrap text to `topic.messages`. Exact code shape is Codex's choice.

Required evidence:
- focused test that initial Learn creates no user-labelled message before owner input;
- focused failure-path test that rejected initial Tutor output leaves no fabricated user-role history;
- focused success-path test that the first genuine owner submission becomes the first `role:'user'` item;
- retained Node + Edge regressions appropriate to the changed UI/history logic;
- zero new paid product API calls and safe ledger unchanged during the fix.

## Validation disposition

**Phase 1 remains PASS and does not need to be invalidated.**

Phase 2 content grounding is useful evidence, but the current topic is not a clean provenance-valid owner journey. After the correction:
- restart from a new topic;
- re-import the same low-risk synthetic file;
- no need to re-prove extraction semantics unless behavior changed;
- repeat only the minimal Learn checkpoint before continuing to microphone.

## Classification

Completed: readiness; real-owner Phase 1; bounded Phase 2 content/ledger observation.
Verified: Phase 1 import boundary; no automatic retry; successful Tutor content was source-grounded; provenance defect is confirmed in source.
Likely: a small presentation/history correction is sufficient; no learning-engine redesign is indicated.
Unknown: corrected Learn behavior until implemented; physical microphone/ASR; diagnosis/repair/apply owner journey.
Not Done: provenance correction; clean Phase 2 rerun; Explain/ASR; Diagnose/Repair/Apply; export/history; final OWNER-VALIDATION acceptance.
Must Fix: application-generated starter text must never be represented or persisted as owner-authored content.
User Decision Needed: none; this is a bounded fix required by direct owner validation feedback.
Future Optional: literal `&#x20;` extraction cleanup after the validation gate.

## Next Smallest Step

**Codex implements OWNER-VALIDATION-PROVENANCE-FIX-01 with zero paid calls, pushes the bounded delta/evidence, and returns exact remote SHA for MASTER review. Do not continue the microphone walkthrough until the correction is accepted.**