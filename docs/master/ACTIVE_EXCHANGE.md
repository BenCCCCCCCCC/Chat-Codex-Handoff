# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: FILE-IMPORT-AUTO-USE-01
task: FILE-IMPORT-AUTO-USE-01
writer: CODEX
transport_only: true
accepted_base_head: 89c23a155ac7c32e6357b33144edf93bd9850309
result: NEEDS_HOST_VERIFY

## Binding and implementation

Base/final HEAD: 89c23a155ac7c32e6357b33144edf93bd9850309.
Branch: prototype/study-teachback-v0.1.
Tracked worktree was CLEAN before editing. Changes remain UNCOMMITTED pending fresh host browser verification. Existing unrelated untracked files/artifacts preserved.

Authority read through GitHub connector:
- incoming ACTIVE_EXCHANGE blob 52504036f90eaaafa3714afce9d6705a60e7ad06;
- HANDOFF blob 34a9fa755a943d6ceb1a7787594f4ac87628c90b;
- CURRENT_STATE blob 6920ed8b11431f78d764a7506c4664670703836b.

Exact changed product/test files:
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/file-import-auto-use.test.mjs (new, untracked)

After successful extraction, full preview text is measured with the same trim normalization used by existing useImported. Text of 1..5000 characters automatically runs the existing local use-all path: source replaced once, filename title derived, counters refreshed, preview retained, and notice says learning may start directly. Manual subset replacement remains available.
For >5000 characters, full preview remains intact, no truncation/chunking/auto-use occurs, and a clear notice requires a <=5000-character selection. Existing source is preserved and this is explicitly stated in the notice; on a clean setup it remains empty.
Clearing preview retains the accepted source; explicitly emptying source still blocks Learn. Direct paste and setupContext behavior are unchanged.
No extraction-time Tutor request; extraction still uses the existing local parser. No model/provider/budget/retention/schema/dependency changes.

## Reproduction

Before product edits, a deterministic harness executed the actual import handler with a successful extraction returning Rule. Preview became Rule but source was empty; the test failed with '' !== 'Rule'. No provider/network used. The identical test now passes and checks Learn without a use-all click.

## Deterministic evidence

Focused: node study-teachback-app/run-offline-tests.mjs import file-import-auto-use-01
8/8 PASS. Artifact: artifacts/study-teachback/file-import-auto-use-01/import-1790666547107-RSldRU

Full Node/offline: node study-teachback-app/run-offline-tests.mjs node file-import-auto-use-01
131/131 PASS. Artifact: artifacts/study-teachback/file-import-auto-use-01/node-1790666547461-hQb29f

Coverage includes 1, 4999, exactly 5000 and 5001 characters, whitespace normalization, filename/title/count, retained preview, manual subset override, clear-preview/source behavior, previous source preservation for oversized files, source-only Learn, direct paste and preserved setupContext. Existing setup/provenance/Batch A/B/C tests remain green.
Browser regression now asserts full auto-use, filename title and source count immediately after extraction, before any selection click.

git diff --check: PASS. Browser test syntax check: PASS.

## Browser evidence
One sandbox attempt: node study-teachback-app/run-offline-tests.mjs browser file-import-auto-use-01
Artifact: artifacts/study-teachback/file-import-auto-use-01/browser-1790666561483-BtpFvH
Exit 1 before application cases: CDP_TIMEOUT Runtime.enable. Edge GPU exited -1073741790 and logged GPU process isn't usable. No provider stub calls were recorded. No retry.
All 52 source hashes in the browser receipt match the final current files (zero drift). This is environment-failure evidence, not browser acceptance. Previous setup-flow 50/50 host evidence is stale for this changed implementation and is not reused.

## Safety and self-review

All suites use synthetic credentials, loopback-only networking, test-only ledgers and provider stubs. The full Node suite includes its existing deliberate blocked outbound probe, rejected before I/O. Live provider calls 0; physical microphone use 0; incremental exposure 0.
Production ledger remains:
d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525
Receipts record before/after equality and source hashes.

Reviewed normalized boundary parity with useImported, successful-extraction timing, local parser rejection of blank files, pending import guard, counters/title, manual override, clear-preview semantics, preservation of prior source for large imports, and untouched Tutor/provenance paths. No blocking code finding identified.

Tests Not Run: successful fresh host browser validation; live Tutor/ASR/diagnosis (forbidden).
Unknown: changed UI behavior in an unsandboxed browser and owner DOCX end-to-end usability; deterministic import harness uses a synthetic extraction result, not the owner's document.
Blocking: NEEDS_HOST_VERIFY; no final product commit before host evidence.
User Decision Needed: host verification and MASTER acceptance; no new product choice.
Future Optional: none added.

Host command from normal Windows PowerShell in the product checkout:
node study-teachback-app/run-offline-tests.mjs browser file-import-auto-use-01
Use only the isolated stub suite for validation; do not resume Phase3B. Verify fresh source hashes before finalization.

No product commit/push/merge, no Phase3B. Only this remote ACTIVE_EXCHANGE is written through the authorized meta relay; CURRENT_STATE and HANDOFF are untouched. Relay must be read back at its resulting commit and checked for exact content, turn/state and sole changed meta path before success is reported.
