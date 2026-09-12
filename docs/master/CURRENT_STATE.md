# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**OWNER-VALIDATION-01 — IN PROGRESS / CLEAN PHASE 2 PASS / PHASE 3 MICROPHONE+ASR NEXT**

**OWNER-VALIDATION-PROVENANCE-FIX-01 — MASTER-ACCEPTED**

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

Active product: **知而能讲**.
Feature branch: `prototype/study-teachback-v0.1`.
Current accepted feature HEAD for validation:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`.

## OWNER-VALIDATION evidence retained

### Phase 1 — PASS

Owner imported `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx` in the real product.

Verified:
- local DOCX extraction worked;
- necessary-vs-sufficient meaning remained intact;
- same-day visitor badge, laboratory-open state and 18:00 limit remained understandable;
- owner selected the extracted material into the learning source;
- import/preview/use-all added 0 provider/model requests and the usage ledger remained byte-identical;
- server remained ready.

Minor non-blocking extraction formatting issue: literal `&#x20;` appeared after the title.

### Original Phase 2 — provenance issue found and corrected

The first owner Learn run produced useful content evidence but also exposed a provenance defect: the automatic Learn starter was displayed/persisted as if owner-authored. MASTER paused before microphone.

`OWNER-VALIDATION-PROVENANCE-FIX-01` corrected this at `f6a000c...`:
- internal starter remains request input only;
- it is not stored/rendered as `role:'user'`;
- failed initial Tutor validation leaves no fabricated user history;
- the first genuine owner input becomes the first stored/rendered user message;
- Node 48/48 and Edge 29/29 PASS; zero paid calls for the correction.

### Clean Phase 2 rerun — PASS

Owner reloaded the updated product, created a new clean topic with the same synthetic DOCX and reran the minimal Learn path in the real browser.

Verified from owner screenshots:
- before any owner text, only Tutor/assistant content was visible; the automatic starter did not appear as `你的想法` or any user bubble;
- the initial Tutor response remained source-grounded: registration was treated as necessary but not sufficient, with same-day badge, open-state and time constraints retained;
- owner then sent one genuine question;
- the first visible `你的想法` bubble is exactly the owner-authored question, not application scaffolding;
- subsequent Tutor reply remained source-grounded and did not add an unsupported guarantee of entry.

Decision:

**Clean Phase 2 = PASS. Provenance fix is confirmed in the real Owner browser.**

The older contaminated topic remains evidence and must not be resumed.

## Phase 3 — physical microphone / ASR

Next goal: validate one real owner recording and the replay/correction boundary before any diagnosis.

Owner should use the current clean topic and:
1. click `我来讲讲`;
2. choose `无提示` for this bounded run;
3. record roughly 20–45 seconds in natural language, not a polished script;
4. explain that registration alone does not guarantee entry and mention relevant additional conditions;
5. include one natural self-correction if comfortable, e.g. begin with an overstatement then explicitly correct it, to test withdrawn-claim handling later;
6. keep the page visible during recording; do not switch tabs or hide the page because visibility interruption is treated conservatively;
7. finish the recording and wait for original-audio save + ASR;
8. once replay/transcript UI appears, **do not start diagnosis yet**;
9. first play the original audio and inspect the raw transcript/segment timing;
10. return transcript/screenshot to MASTER before confirming diagnosis.

Critical checks before diagnosis:
- original audio must be playable and retained;
- all validated segments must be replayed;
- negation/number/condition/term ASR errors must be corrected before confirmation;
- word timing may be PARTIAL; no fabricated precision is required.

## Retained live-call boundary

The already-approved one coherent owner journey continues. Approved live models remain `whisper-1` + `gpt-5.6-luna`; no provider/model switch, recharge or stress loop. Existing US$5 exposure hard stop and US$10 cash ceiling remain.

The last explicitly read ledger before the provenance correction was requests 39, known cost US$0.01293075, exposure US$0.06973825, unsettled 4. The clean Phase 2 rerun used expected live Tutor requests; a fresh safe ledger checkpoint will be collected after the recording/ASR checkpoint unless a guard/error appears sooner.

## Stop conditions

Stop and return to MASTER if:
- microphone permission cannot be obtained without unsafe workaround;
- original audio is missing/corrupted;
- ASR meaning errors in negation/number/conditions cannot be corrected safely;
- source/attempt identity is lost;
- repeated API retry becomes necessary;
- storage/access/budget guard fails;
- any diagnosis is shown before required replay/confirmation.

## Classification

Completed:
- readiness;
- real-owner Phase 1;
- provenance defect discovery/correction/MASTER acceptance;
- clean real-browser Phase 2 rerun.

Verified:
- Phase 1 import boundary;
- clean provenance in the Owner browser;
- source-grounded Tutor behavior for the clean Learn path.

Likely:
- the corrected clean topic is suitable to continue the same bounded owner journey into microphone/ASR.

Unknown:
- real physical-microphone capture;
- real ASR transcript/timing behavior;
- replay/correction UX;
- diagnosis/repair/apply/export-history owner journey.

Not Done:
- Phase 3 microphone/ASR/replay confirmation;
- Diagnose/Repair/Apply;
- export/history review;
- final OWNER-VALIDATION acceptance.

Must Fix:
- none currently blocking Phase 3.

User Decision Needed:
- none; continue the already-approved bounded validation.

Future Optional:
- literal `&#x20;` extraction cleanup;
- investigate test-page Promise exception only if reproduced.

## Next Smallest Step

**Owner records one 20–45 second natural explanation on the clean topic, waits for ASR, then returns the replay/transcript state to MASTER before any diagnosis confirmation.**
