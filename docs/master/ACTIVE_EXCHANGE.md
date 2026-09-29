# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: SETUP-FLOW-01-RELAY-RECOVERY-V2
task: SETUP-FLOW-01-RELAY-RECOVERY
original_turn_id: SETUP-FLOW-01
original_dispatch_commit: 24f462de06845d4069077b63539a759009489cc8
recovery_dispatch_commit: 03ba43515e1583d3347b955f559033bb04d6bad0
writer: CODEX
transport_only: true
accepted_base_head: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

result: NEEDS_HOST_VERIFY

## Recovery result — SETUP-FLOW-01-RELAY-RECOVERY-V2

Read the latest ACTIVE_EXCHANGE, CURRENT_STATE and HANDOFF from meta/master-state at recovery_dispatch_commit. Recovered the existing local receipt and inspected existing worktree/artifacts only. No implementation, test rerun, product/test edit or product commit/push/merge was performed in this recovery turn.

The previous reply existed only locally. This V2 turn explicitly authorizes its publication through the authenticated GitHub Contents connector, changing only docs/master/ACTIVE_EXCHANGE.md on meta/master-state. Optimistic concurrency uses incoming blob SHA 6e6e8adb2d662604eb2de972ca6d51b8c2b5ab1e. After this write, Codex must read back the full file at the returned commit and verify the state, V2 turn_id, exact content and sole changed path before claiming relay success.

Recovery verification: all 51 current source hashes match the prior browser receipt. Focused and Node receipts differ only for browser-tests-r4.mjs, whose four setup cases were added after those runs. Current production ledger still matches the recorded hash. Product HEAD remains ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2.

## Recovered execution result — SETUP-FLOW-01

Implementation and deterministic offline checks complete. Fresh host browser validation remains required. Product changes are UNCOMMITTED; no final commit, push, merge or Phase3B action performed.

Product checkout: F:\Chat-Codex-Handoff\validation-repo
Product branch: prototype/study-teachback-v0.1
Base HEAD = final HEAD: ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2
Tracked worktree was clean before editing; pre-existing untracked artifacts were preserved.
Authority read from origin/meta/master-state at 24f462d after fetching that branch.
Recovery source: F:\Chat-Codex-Handoff\validation-repo\artifacts\study-teachback\setup-flow-01\meta-master-state\docs\master\ACTIVE_EXCHANGE.md
This remote receipt supersedes that local draft. CURRENT_STATE.md and HANDOFF.md remain untouched.

## Exact product changed files

- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/core.mjs
- study-teachback-app/index.html
- study-teachback-app/provenance.test.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/schemas.mjs
- study-teachback-app/server.mjs
- study-teachback-app/setup-flow.test.mjs (new, untracked; must include in eventual reviewed commit)

Evidence is under artifacts/study-teachback/setup-flow-01/, outside the proposed product commit.

## Reproduction

Before changing product code, ran the actual Learn handler through a VM DOM harness with source='Only enter when open.' and an empty title. The new focused test failed as expected: requests 0 rather than 1, notice '先写一个主题，再放入这一轮的有限材料。'. No network or provider was used for reproduction. The same test now passes.

## Implementation

- Source alone starts Learn. Empty source and source over 5,000 characters return a clear local notice without dispatch.
- Local autoTitle selects the first non-empty line containing a letter/number, bounds metadata to 120 characters, and falls back to 学习材料. Existing source trimming is preserved; title derivation does not rewrite source text.
- Accepting imported text derives title from the selected filename without its final extension. This happens on using the selection, so merely previewing a different file does not rename the current pasted material.
- Existing title input remains optional metadata with an explicit automatic-title label; no rename subsystem added.
- Two optional fields have the required labels. topic.setupContext contains focus/known (500 characters each), persists through existing storage/export without an IndexedDB version/schema migration, clears for a new topic and carries forward for explicit source revision.
- Tutor receives one explicit setupContext object in the existing request. Server validates it; legacy records without the field receive empty defaults. No extra provider request.
- TEACH explicitly treats setup context as untrusted metadata, known as self-report rather than mastery evidence, and source as authoritative; contradictions must remain visible.
- No model/provider/dependency/retention/budget/pricing/cap changes. Existing aggregate provider input limits remain enforced.

## Tests and evidence

Focused: node study-teachback-app/run-offline-tests.mjs setup setup-flow-01
PASS 9/9. Receipt/log: artifacts/study-teachback/setup-flow-01/setup-1790657224297-Y5w6SD/

Full Node/offline: node study-teachback-app/run-offline-tests.mjs node setup-flow-01
PASS 123/123. Receipt/log: artifacts/study-teachback/setup-flow-01/node-1790657224708-djp1hH/
Includes accepted Learn/Repair/Apply provenance and Batch A/B/C regression coverage.

Browser: node study-teachback-app/run-offline-tests.mjs browser setup-flow-01
One attempt only, FAIL before application cases: CDP_TIMEOUT Runtime.enable. Edge log reports GPU process exits (-1073741790) and GPU process isn't usable. No screenshots, provider stub calls or application network events were recorded. This is an environment failure, not browser acceptance evidence.
Receipt/log: artifacts/study-teachback/setup-flow-01/browser-1790657252200-SxDUg6/
New browser cases cover all four context combinations, source-only title, IndexedDB persistence/reload, absence of rendered user messages and new-topic field clearing. They have NOT run successfully.

git diff --check: PASS. Browser test source node --check: PASS.

All isolated suites used synthetic credentials, loopback-only networking and test-only ledgers. Correction to the prior local reply: focused/browser logs show 0 blocked outbound attempts; the full Node log shows 1 deliberately blocked negative probe in correctness-hygiene.test.mjs (A0 outbound tripwire), targeting https://offline-test.invalid/blocked and rejected before I/O. This is not a live provider request. Live provider calls: 0. Physical microphone use: 0. Incremental exposure: 0.
Production ledger SHA256 before/after every isolated run:
d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525
Source hashes are included in receipts; the browser receipt covers the final product/test source snapshot (browser cases were added after the Node run; production code did not change after that run).

## Provenance and self-review

Focused tests verify saved/reloaded metadata, exactly one initial request, empty initial user history and first actual chat input becoming the first user message. Existing Learn/Repair/Apply tests remain green. Setup data never enters topic.messages. Actual IndexedDB/browser rendering still needs the new host run.
Reviewed import title timing, legacy metadata defaults, source/context bounds, new-topic reset, revision carry-forward, source identity and existing provider dispatch path. No blocking code finding identified. Zero self-correction passes needed after implementation; browser validation remains the acceptance blocker.

## Tests Not Run / Unknown / Blocking

Tests Not Run: successful fresh host browser r4 run; visual review of new setup fields at supported viewport sizes; live Tutor/ASR/diagnosis (intentionally forbidden).
Unknown: fresh host UI behavior and visual layout; real model adherence to setup guidance (not asserted from stubs).
Blocking: NEEDS_HOST_VERIFY. Do not make a final product commit based on old 46/46 browser evidence.

Host verification: in normal owner PowerShell outside Codex sandbox, from the product checkout, run:
node study-teachback-app/run-offline-tests.mjs browser setup-flow-01
This is the isolated provider-stub suite, not the live product server. Review current setup UI on desktop/mobile, filename-derived title after accepted import, and source-only start. Compare source hashes before/after host verification and before any subsequent commit; send fresh results to MASTER.

User Decision Needed: no new product choice; host verification and MASTER acceptance required. V2 explicitly resolves transport authorization; no additional owner decision is needed for the meta receipt.
Future Optional: none added to this scope.
No product push/merge; no final product commit; no Phase3B resumed. The sole authorized meta-branch receipt commit is transport only. Earlier live authorization remains unused by this turn.
