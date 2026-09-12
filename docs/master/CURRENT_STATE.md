# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**OWNER-VALIDATION-01 — IN PROGRESS / CLEAN PHASE 2 RERUN NEXT**

**OWNER-VALIDATION-PROVENANCE-FIX-01 — MASTER-ACCEPTED**

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

Active product: **知而能讲**.
Feature branch: `prototype/study-teachback-v0.1`.
Current accepted feature HEAD for validation:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`.

## OWNER-VALIDATION evidence retained

### Phase 1 — PASS

Owner used `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`.

Verified:
- local DOCX extraction worked;
- critical necessary-vs-sufficient meaning remained intact;
- same-day visitor badge, laboratory-open state and 18:00 limit remained understandable;
- owner selected the extracted material into the learning source;
- import/preview/use-all added 0 provider/model requests and the usage ledger remained byte-identical;
- server remained ready.

Minor non-blocking extraction formatting issue: literal `&#x20;` appeared after the title.

### Original Phase 2 — useful but provenance-contaminated evidence

Owner clicked `开始学习`, then sent one genuine source-grounded question.

Observed:
- 2 live semantic requests using the approved Luna model;
- request 1 completed at provider level but local validation rejected `INVALID_SOURCE_QUOTE`;
- automatic retry = NO;
- request 2 completed and displayed a source-grounded answer;
- known cost/exposure delta = US$0.00113830;
- server/state remained usable.

Tutor content on the successful reply correctly kept registration as necessary but not sufficient and referenced the same-day badge, open state and 18:00 limit without observed unsupported rules.

However, direct owner review found that the application-generated starter instruction was displayed and persisted as if it were an owner-authored `role:'user'` message. MASTER confirmed this as a provenance defect and paused the walkthrough before microphone.

## OWNER-VALIDATION-PROVENANCE-FIX-01 — MASTER review

Git comparison confirms `f6a000c...` is one normal commit ahead of base `912bce...`.

Production change is deliberately small:
- `teach()` now accepts an explicit `internalStarter` option;
- the initial automatic Learn instruction is still passed as the first internal teaching request input;
- when `internalStarter=true`, it is not appended to `topic.messages`, not rendered as `.message.user`, and not included in later provider history;
- successful assistant replies still persist/render normally;
- genuine owner input still becomes a normal `role:'user'` message;
- existing historical topics are not migrated or silently rewritten.

Verified evidence:
- Node 48/48 PASS;
- Edge final rerun 29/29 PASS;
- final Edge receipt reports zero page/console exceptions;
- initial-success provenance case PASS;
- initial local-validation rejection leaves no fabricated user history PASS;
- first genuine owner input becomes the first stored/rendered user message PASS;
- automatic starter is excluded from subsequent provider history on both success/failure paths;
- existing recording/replay/repair/apply/history/delete/recovery regressions remain passing;
- ledger before/after byte-identical;
- requests remain 39, known cost US$0.01293075, exposure US$0.06973825, unsettled 4;
- new paid product/provider calls for the fix = 0.

Evidence:
`artifacts/study-teachback/owner-validation-provenance-fix-01/`

Evidence limitation retained:
- the first Edge run passed all 29 functional checks but its final no-exception assertion observed one generic unclassified Promise exception;
- after improved synthetic test exception capture, a full rerun passed 29/29 with zero page exceptions and no further production-code change;
- treat the first-run event as retained test evidence, not a current blocking product defect unless it reproduces.

## Validation disposition

**OWNER-VALIDATION-PROVENANCE-FIX-01 = MASTER-ACCEPTED.**

Phase 1 remains PASS and does not need to be re-proven semantically.

The previous contaminated topic must remain preserved as evidence and must not be resumed for microphone validation.

Next run must create a **new clean topic** using the same low-risk synthetic DOCX. Re-import/select the material, then rerun only the minimal Learn checkpoint needed to verify the owner-visible provenance fix in the real browser. After that, microphone/ASR may continue.

The existing direct server can remain in use if still healthy; because `server.mjs` serves product files from disk, the owner browser must reload/navigate to a fresh page so the updated `app.mjs` is loaded before creating the clean topic.

## Clean Phase 2 rerun criteria

On the new topic:
1. re-import the same DOCX and use the same coherent source text;
2. click `开始学习`;
3. before the owner types anything, there must be **no `你的想法` / user bubble** containing the automatic starter instruction;
4. if the initial Tutor response succeeds, only assistant/Tutor content should appear;
5. if the initial Tutor response is rejected again, there still must be no fabricated user bubble/history;
6. owner then sends one genuine question;
7. that genuine question must become the first visible/stored owner-authored message;
8. return screenshot/text evidence to MASTER before microphone.

Do not repeat stress tests or add more live calls than necessary for this clean checkpoint.

## Classification

Completed: readiness; real-owner Phase 1; original Phase 2 observation; provenance correction and MASTER delta review.

Verified: Phase 1 import boundary; fail-closed `INVALID_SOURCE_QUOTE` with no automatic retry; provenance correction logic/tests; zero paid calls for the fix.

Likely: clean rerun should allow Owner Validation to resume without the prior attribution defect.

Unknown: real owner-visible corrected Learn behavior; physical microphone/ASR; diagnosis/repair/apply owner journey.

Not Done: clean Phase 2 rerun; Explain/ASR; Diagnose/Repair/Apply; export/history; final OWNER-VALIDATION acceptance.

Must Fix: none currently unresolved for the bounded provenance defect.

User Decision Needed: none; continue the already-approved owner validation.

Future Optional: literal `&#x20;` extraction cleanup; investigate test-page Promise exceptions only if reproduced.

## Next Smallest Step

**Owner reloads the updated product, creates a new clean topic with the same synthetic DOCX, reruns the minimal Learn checkpoint, and returns the real-browser result to MASTER. Do not begin microphone recording until this clean checkpoint passes.**
