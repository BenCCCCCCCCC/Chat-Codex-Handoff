# Active Handoff — OWNER-VALIDATION-01 CLEAN PHASE 2 RERUN

Updated: 2026-09-12
Role: 00 MASTER
Status: **PROVENANCE FIX MASTER-ACCEPTED / CLEAN OWNER VALIDATION RERUN NEXT**

## Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Branch: `prototype/study-teachback-v0.1`
Current accepted feature HEAD:
`f6a000ca96fedfbeb9eaa803dfcd990a13d90c53`

Direct validation server/origin remains:
`node study-teachback-app/server.mjs`
`http://127.0.0.1:4317`

Read `docs/master/CURRENT_STATE.md` first. Preserve unrelated work; no reset/clean/force.

## Retained owner-validation evidence

Phase 1 real owner file import/preview/selection = PASS.

Original Phase 2 produced useful evidence but is not a clean provenance-valid journey:
- first live Tutor result was rejected locally as `INVALID_SOURCE_QUOTE` after provider completion;
- no automatic retry occurred;
- one later explicit owner question produced a source-grounded answer;
- owner then found that the automatic Learn starter was shown/persisted as `role:'user'` / `你的想法`;
- walkthrough stopped before microphone.

The original contaminated topic must be preserved as evidence and not resumed.

## Accepted provenance fix

MASTER reviewed `912bce... -> f6a000c...`.

Accepted behavior:
- automatic Learn starter remains internal request input only;
- it is not added to `topic.messages`;
- it is not rendered as a user bubble;
- it is excluded from later provider history;
- initial validation rejection leaves no fabricated user entry;
- the first genuine owner submission becomes the first real `role:'user'` message;
- assistant replies continue normally;
- no schema migration or historical-topic rewrite.

Evidence:
`artifacts/study-teachback/owner-validation-provenance-fix-01/`

Verified:
- Node 48/48 PASS;
- final Edge 29/29 PASS with zero page exceptions;
- focused success/failure/first-real-user provenance tests PASS;
- existing recording/replay/repair/apply/history/delete/recovery cases PASS;
- ledger byte-identical during the fix;
- new paid product/provider calls = 0.

Retained limitation:
- first Edge run had one generic Promise exception only in the final exception assertion while all functional cases passed;
- a full rerun after improved test exception capture passed without any production-code change;
- investigate only if it reproduces.

## Clean rerun — owner action

Do not resume the old topic.

1. Reload the product page so the browser loads the new `app.mjs`.
2. Create a **new clean topic**. Use `学习新主题` / the normal new-topic path; do not delete the old evidence topic yet.
3. Re-import `OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`.
4. Use the same coherent source text. Phase 1 semantics are already accepted; only spot-check that the file still parses normally.
5. Click `开始学习`.
6. Before the owner types anything, verify that the automatic starter does **not** appear as `你的想法` or any user bubble.
7. If the Tutor initial response succeeds, only Tutor/assistant content should appear.
8. If local validation rejects it again, no fabricated user bubble/history should appear.
9. Owner sends exactly one genuine source-grounded question.
10. Confirm that this genuine question is the first owner-authored bubble/message.
11. Return screenshot/text to MASTER before using the microphone.

Suggested genuine question:
`我理解为完成注册只是获得申请资格，不代表一定能进去。那真正能进入还需要哪些条件？`

## Live-call boundary

The already-approved one coherent owner journey continues. Avoid unnecessary retries. Current safe ledger before clean rerun is requests 39, known cost US$0.01293075, exposure US$0.06973825, unsettled 4. Existing US$5 exposure hard stop / US$10 cash ceiling remains.

## Stop conditions

Stop and return to MASTER if:
- the automatic starter still appears/persists as owner-authored content;
- a failed initial Tutor request leaves fabricated user history;
- repeated provider retry becomes necessary;
- source identity/state is lost;
- any existing budget/storage/access guard fails.

Do not start microphone recording until the clean Learn checkpoint passes.

## Classification

Completed: Phase 1; original Phase 2 observation; provenance correction and MASTER acceptance.
Verified: bounded provenance defect is fixed in source/tests; no paid calls for correction.
Unknown: corrected behavior in the owner's real browser until the clean rerun.
Not Done: clean Learn checkpoint; microphone/ASR; Diagnose/Repair/Apply; export/history; final owner-validation decision.
Must Fix: none currently unresolved for provenance.
User Decision Needed: none.
Future Optional: extraction `&#x20;` formatting cleanup; generic test-page exception only if reproduced.

## Next Smallest Step

**Reload the updated product, create a new topic with the same synthetic DOCX, rerun one minimal Learn interaction, and return the real-browser result to MASTER.**
