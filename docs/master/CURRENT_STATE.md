# Current State

Updated: 2026-09-29 — Batch C code/focused tests pass; host browser verification pending; proactive Codex self-review mode adopted
Role: 00 MASTER / authoritative dynamic state

## 1. Active product / version

Product: **知而能讲** — Study-first + in-app teach-back.

Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Accepted committed baseline before Batch C:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Batch A: MASTER-ACCEPTED.

Batch B / Phase 3A: MASTER-ACCEPTED and finalized locally.

Batch C / CORRECTNESS-BOUNDARIES-01:
**IMPLEMENTED IN WORKTREE / FOCUSED+NODE+HOST-BROWSER PASS / FINAL SELF-REVIEW+LOCAL COMMIT PENDING**.

## 2. Batch C receipt

Codex returned `BLOCKED_BROWSER_VALIDATION` through ACTIVE_EXCHANGE.

MASTER verified the meta-branch reply changed only:
`docs/master/ACTIVE_EXCHANGE.md`.

Local product identity reported:
- repo root `F:/Chat-Codex-Handoff/validation-repo`;
- branch `prototype/study-teachback-v0.1`;
- base/final HEAD still `dd8317b43100b8cbaad684cab7fc02957e32de62`;
- no local Batch C commit;
- six tracked modified files plus one new untracked test file;
- no staging.

Changed Batch C files:
1. `study-teachback-app/core.mjs`
2. `study-teachback-app/server.mjs`
3. `study-teachback-app/app.mjs`
4. new `study-teachback-app/correctness-boundaries.test.mjs`
5. `study-teachback-app/correctness-hygiene.test.mjs`
6. `study-teachback-app/browser-tests-r4.mjs`
7. `study-teachback-app/run-offline-tests.mjs`

## 3. Batch C technical assessment

### MF-01 — Tutor/history length contract

Pre-fix isolated reproduction:
- 2500-char accepted assistant reply -> next turn 200;
- 2501-char reply -> next turn failed 422 before second stub dispatch;
- 4000-char reply -> next turn failed 422 before second stub dispatch.

Correction:
- shared `TUTOR_MESSAGE_LIMIT=4000`;
- runtime Tutor output validation and assistant-history validation now use the same ceiling;
- user-message limits remain unchanged;
- no truncation/provenance rewriting;
- aggregate HTTP/input caps remain intact.

Focused regression now verifies 2500/2501/4000 accepted continuity and 4001 rejection.

MASTER assessment: **PASS at focused/offline scope**.

### MF-02 — content confirmation concurrency

Pre-fix actual-handler VM reproduction:
- double confirm while first diagnosis pending created two correction versions;
- only one diagnosis dispatched;
- report attached to v1 while latest became v2;
- visible result count became 0.

Post-fix:
- processing lock begins before correction mutation;
- repeated confirm during save/diagnosis creates no new correction and no second dispatch;
- first report remains latest/visible;
- lock releases on success/failure;
- later legitimate edited confirmation can create the next version;
- replay/raw/corrected provenance unchanged.

Focused VM tests PASS.

The new browser-r4 double-confirm assertion did not run because Edge/CDP failed before product navigation in the Codex sandbox.

MASTER assessment: **PASS at VM/offline scope; host browser validation still required before Batch C acceptance**.

### MF-03 — /api/status unreadable ledger boundary

Pre-fix isolated reproduction showed `LEDGER_UNREADABLE` escaping the status callback boundary.

Post-fix:
- `GET /api/status` returns controlled 503 `BUDGET_UNAVAILABLE`;
- healthy status remains normal;
- paid routes fail closed while ledger state is unreadable;
- server/root remains available;
- provider dispatch count remains 0;
- corrupt/unreadable synthetic ledger bytes remain unchanged;
- no reset/release/fabricated zero summary;
- UI explicitly shows budget unavailable.

MASTER assessment: **PASS at focused/offline scope**.

## 4. Batch C fresh evidence

Final focused correctness-boundaries suite:
**11/11 PASS**.

Full isolated Node/offline suite:
**114/114 PASS**.

`git diff --check`:
PASS.

Protected files unchanged:
- provider.mjs
- ledger.mjs
- storage.mjs
- schemas.mjs
- dependency declaration
- replay function region

Production ledger hash remained:
`D17AF9EC53787E484CD66B8928A80023D7A7A9570372F3FA64AA4C71F7E9C525`.

Live provider/API calls = 0.
Physical microphone = 0.
Phase3B actions = 0.
Incremental exposure = 0.

Browser r4:
BLOCKED before first functional case by the already-known Codex-sandbox Edge GPU/CDP startup limitation.
This is not evidence that MF-02 failed in the product browser.

## 5. Next validation for Batch C

Run exactly one host-side browser regression outside Codex sandbox from a normal owner PowerShell:

`node study-teachback-app/run-offline-tests.mjs browser correctness-boundaries-01`

This uses the existing isolated stub/fake-provider browser suite and the current Batch C worktree.

Do not run it from Codex.

PASS requirement:
- full r4 suite completes;
- new MF-02 delayed-diagnosis/double-confirm case executes and passes;
- no live provider call;
- no owner profile/microphone.

If PASS, MASTER can authorize Codex to self-review the diff and create one focused Batch C local commit.

If FAIL in a product assertion, MASTER writes a correction turn into ACTIVE_EXCHANGE; Codex may self-diagnose and iterate inside the same MF-01/02/03 scope.

## 6. Operating model update — proactive Codex/Astra self-review

Owner explicitly wants Codex/Astra to contribute more than mechanical execution.

Accepted operating model:

### MASTER / Chat GPT-5.6
Responsible for:
- project scope and phase gates;
- owner decisions;
- current external/freshness verification;
- independent review of Codex findings/evidence;
- deciding which recommendations become Must Fix / Decision / Optional;
- final acceptance.

### Codex/Astra
Within an explicitly authorized task, Codex is encouraged to:
- inspect relevant project context before acting;
- propose the smallest implementation approach;
- identify risks/edge cases independently;
- implement within scope;
- run self-checks/tests;
- review its own diff against acceptance criteria;
- fix defects it finds that are clearly **inside the already-approved scope**;
- return additional recommendations separately.

### Bounded self-iteration

Codex does not need to return to MASTER for every small in-scope defect it discovers during implementation/testing.

It may perform up to **two self-correction passes after the initial implementation** when:
- the problem is directly caused by or required to satisfy the current task;
- no new product requirement is introduced;
- no spending/public release/push-merge/data-loss/high-risk action is required;
- no new dependency/framework/model/provider/storage-schema/retention policy is introduced.

Codex must stop and return to MASTER if:
- the same blocker remains after the bounded self-correction passes;
- scope must expand;
- a user/product tradeoff appears;
- a paid/live call not already authorized is needed;
- evidence is ambiguous enough that another change would be speculative.

This uses model diversity for independent analysis while retaining owner/MASTER scope control.

### Recommendations

Codex may always include:
- Must Fix candidates;
- User Decision Needed;
- Future Optional;
- simplification ideas;
- test/maintainability suggestions.

It must not implement recommendation-only items unless they are already inside the authorized task or MASTER subsequently promotes them into scope.

## 7. GitHub exchange state machine

The one-file exchange remains accepted.

Supported states now include:
- `CHAT_TO_CODEX`
- `CODEX_TO_CHAT`
- `WAITING_OWNER`

`WAITING_OWNER` means Codex must not execute/repeat the previous turn if nudged; the next action is outside Codex until MASTER writes a new `CHAT_TO_CODEX` turn.

This prevents duplicate execution while waiting for a manual host/browser/user step.

## 8. Backlog retained from project-wide review

User Decision Needed later:
- portable fixed synthetic audio fixture / clean-clone reproducibility;
- atomic ledger replacement/recovery strategy;
- lifecycle of historical browser/live/helper entrypoints;
- retention/export/recovery policy;
- timing of real Phase3B after Batch C.

Future Optional:
- small-step app.mjs decomposition when touched naturally;
- active-vs-legacy test/helper index;
- handoff-kit explicitly documented as fallback behind GitHub exchange;
- focused diagnostic UX;
- synthetic portfolio demonstration;
- replay burden measurement;
- long-term ASR migration after freshness check.

## 9. Phase 3B

Existing owner authorization remains intact and unused:
- max 3 calls;
- zero retries;
- incremental exposure <= US$0.03432;
- one recording.

Host browser root smoke already PASS outside Codex sandbox.

Phase3B remains PAUSED until Batch C is accepted and committed.

## 10. Classification

Completed:
- exchange relay;
- project-wide Codex review;
- MF-01/02/03 reproduction and implementation;
- focused 11/11 and Node 114/114.

Host browser validation:
- PASS outside Codex sandbox.
- The MF-02 delayed-diagnosis/double-confirm browser case executed and passed.

Pending before Batch C acceptance:
- Codex final independent diff self-review and focused local commit, with no post-validation code drift.

Not authorized:
- live Phase3B;
- additional backlog implementation;
- product push/merge.

## 11. Next smallest step

Codex performs BATCH-C-FINALIZE-01 through ACTIVE_EXCHANGE: inspect the host-browser artifact, independently self-review the Batch C diff, optionally rerun deterministic zero-call sanity tests, and create one focused local commit only if no code/test content changes are needed after the accepted host-browser validation.


## 11. Batch C review result — 2026-09-29

Codex returned CORRECTNESS-BOUNDARIES-01 with:
- focused correctness-boundaries suite: 11/11 PASS;
- full isolated Node/offline suite: 114/114 PASS;
- git diff --check: PASS;
- provider/API calls: 0;
- microphone: 0;
- Phase3B actions: 0;
- no local Batch C commit yet.

MF-01, MF-02 and MF-03 were reproduced in isolated tests and minimally corrected.

The only missing evidence is browser execution of the MF-02 delayed-diagnosis / repeated-confirm case. The browser suite did not reach any functional case because Edge/CDP failed at startup inside the known Codex Windows sandbox environment.

MASTER status:
- MF-01: PASS at focused/offline scope.
- MF-02: PASS at VM/offline scope; host browser validation still required.
- MF-03: PASS at focused/offline scope.
- Batch C overall: PENDING HOST BROWSER VALIDATION / NOT COMMITTED.

Next manual command from a normal owner PowerShell, outside Codex:

node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01

Do not run this browser step from Codex.

## 12. Operating model — proactive Codex/Astra self-review

Owner authorizes a more proactive Codex role inside explicitly approved task scope.

Within an authorized task Codex may:
- inspect relevant project context;
- recommend the smallest approach;
- identify edge cases;
- implement;
- run tests;
- review its own diff;
- fix defects clearly inside the same approved scope;
- return additional recommendations separately.

Codex may perform up to two in-scope self-correction passes after initial implementation without returning to MASTER for every small defect.

Codex must stop for MASTER/owner when:
- scope must expand;
- a product tradeoff is required;
- unapproved spending/live calls are needed;
- a new dependency/framework/model/provider/storage-schema/retention policy is needed;
- push/merge/public release/high-risk/data-loss action is needed;
- the same blocker remains after bounded self-correction;
- the next change would be speculative.

Codex recommendations do not automatically become implementation scope.

MASTER / GPT-5.6 remains responsible for:
- scope and phase gates;
- owner decisions;
- external freshness checks;
- independent review;
- Must Fix / User Decision / Future Optional classification;
- final acceptance.

This operating model intentionally uses model diversity: Codex/Astra can analyze and self-check independently, while MASTER/GPT-5.6 remains the acceptance and scope-control layer.


## MASTER command correction — 2026-09-29

Owner attempted the previously documented host-browser command and the wrapper immediately returned `INVALID_TEST_BATCH` before any browser/test execution.

Cause: MASTER supplied the invalid batch name `correctness-boundaries-01-host`; the runner accepts `correctness-boundaries-01`.

This was a MASTER instruction error, not a product/test failure.

Correct host command:
`node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01`

No Batch C acceptance status changed because the browser suite did not start.


## Host browser verification receipt — 2026-09-29

Owner ran from normal Windows PowerShell outside Codex sandbox:

`node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01`

The accepted run created:
`artifacts/study-teachback/correctness-boundaries-01/browser-1790650146813-0XtnC0`

Observed result:
- browser suite executed normally;
- all printed functional cases PASS;
- MF-02 browser case `C2 diagnosis replay gate and delayed double confirm preserve one visible current-version report` PASS;
- isolation summary: synthetic credential / loopback only / test ledgers only / blocked outbound attempts=0;
- wrapper receipt exit = 0;
- production ledger SHA before/after unchanged.

This clears the browser-evidence blocker for the current unchanged Batch C worktree.

If any product/test source is modified after this host run, the host-browser evidence is stale for that modified state and MASTER must decide whether a new host validation is required.
