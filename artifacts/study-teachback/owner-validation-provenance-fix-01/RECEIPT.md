# OWNER-VALIDATION-PROVENANCE-FIX-01

Status: READY_FOR_MASTER_REVIEW. Branch: prototype/study-teachback-v0.1.
Base: 912bce6542eef4fe813f32fe4e160acd97ca2d71.

The automatic initial Learn instruction remains the first internal teaching request input, but is explicitly marked internalStarter and never appended to topic.messages. History is captured before any genuine user message is appended. Successful assistant replies remain stored/rendered normally. Rejected initial output leaves no invented user entry. Existing topics are not migrated or edited.

Production delta: app.mjs only. Tests: provenance.test.mjs and browser-tests-r4.mjs. No prompt/provider/model/schema/extractor/ASR/budget changes. Repair/Apply defaults retain their existing behavior. The literal extraction entity issue is deferred.

## Verification

- Node: 48/48 PASS, including three new provenance checks using the actual teach function with stubbed dependencies.
- Edge final run: 29/29 PASS, zero page exceptions (browser-1789211038225.json, edge-rerun.txt).
- Edge first run: all 29 functional checks passed, but final no-exception assertion failed on one generic Uncaught (in promise). Its cause remains unknown; after improving synthetic-page exception detail capture, the full rerun passed without further product changes. First-run receipt/log retained rather than overwritten.
- Initial success: no .message.user bubble or persisted user role before real input; assistant appears.
- Initial failure: real local validateTeaching rejects a stub with an invalid source quote; IndexedDB history contains no fabricated user entry; exactly one stub request before explicit next input.
- First real user: exactly one stored/rendered user message; both success/failure paths exclude automatic starter from subsequent provider history.
- Existing Edge regressions include import, R3/R4 remediation, recording with synthetic media, history/export/delete, quota and pending navigation. Tests use separate profile and loopback port 4318. Owner browser/topic at 4317 was not accessed or rewritten. Screenshots depict only synthetic test data.
- No new extraction suite run: extractor unchanged; Node ingestion coverage and Edge local import regression retained.

## Ledger and safety

Before and after SHA256: 2F57583878E36312CA8B497287B45C3F2A918FE6C44A4FF815ABE52D3D220961 (byte-identical).

Before = after: requests 39; attempts 1; minutes 15; inputReserved 151799; outputReserved 57728; known cost US$0.01293075; exposure US$0.06973825; unsettled 4; cashSpent US$0. New paid product/provider calls: 0. No ledger reset/relabel. Original server remains available; no Owner walkthrough performed.

Only product source, test source and synthetic/sanitized evidence are included. No raw Owner source/audio, credentials, environment files, private profiles or runtime data included. Unrelated untracked work preserved.

Must Fix: none known for the bounded provenance defect after correction; first-run transient browser exception remains an evidence limitation.
User Decision Needed: MASTER delta review before clean validation rerun.
Future Optional: investigate recurring test-page exceptions if reproduced; extraction formatting cleanup remains separate.
Owner Validation: PAUSED / CLEAN RERUN NOT YET EXECUTED. Preserve old topic as evidence; use a new clean topic after acceptance.
