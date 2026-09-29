# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: PROCESS-EVIDENCE-FEASIBILITY-01-PROJECT-AWARE-FINALIZE
task: PROCESS-EVIDENCE-FEASIBILITY-01-FINALIZE
writer: CODEX
transport_only: true
accepted_base_head: ac875a100b159781037746ea0b8bd2188457d13a
result: NEEDS_HOST_REVERIFY

## Result

Project-aware review found and corrected an in-scope UI integration defect after the host run. No final product commit was created; the old host PASS is not used to finalize changed bytes.
Base/final HEAD remains ac875a100b159781037746ea0b8bd2188457d13a on prototype/study-teachback-v0.1.
Unrelated untracked files/artifacts preserved. No product push/merge, no live API or diagnosis.

Authority blobs read:
- ACTIVE_EXCHANGE: 40108374dcf6bf9ea7347228edea711139a43b45
- HANDOFF: 7ad7edb66072921a4bd872a7e9777cb748ca9746
- CURRENT_STATE: 984b5089a0002452a060d0bfc9456c4f45459bf5

## Project context established

Read root README, active product README, Start-Study entry, recent six accepted commits, process detector and localization, app capture/replay/confirmation/render/export flows, storage, server/provider boundaries and adjacent process/localization/regression tests.
Active product is 知而能讲; handoff-kit remains a legacy workflow helper. Source-first setup and small-file auto-use are already accepted.
Recent history includes ac875a1 file auto-use, 89c23a1 source-first setup, ab5d2ea confirmation/budget correctness and dd8317b separate evidence/replay.
Server content input and schemas remain separated from acoustic observations. Legacy paid delivery endpoint exists but current process confirmation does not call it. Existing reports storage/export carries process evidence without migration; version binding intentionally excludes evidence from older transcript versions.

Confirmed current canonical CURRENT_STATE section 4 explicitly recognizes one owner Tutor semantic call and one ASR call already consumed. The third call is reserved/held for content diagnosis pending MASTER. Engineering did not reset or consume that allowance. No new recording or diagnosis was performed.

## Original host receipt directly verified

Artifact: artifacts/study-teachback/process-evidence-feasibility-01/browser-1790677050376-ofTKzn
receipt.json exit=0.
browser-1790677050514.json: 51 cases / 51 PASS / 0 FAIL, including short-gap local replay/save case.
liveAPI=false; physicalMicrophone=false.
At initial review all 53 sourceSHA256 entries matched current files exactly.
Host ledger before/after unchanged.

This evidence was valid for the incoming bytes. It is now stale for the three post-host source/test edits listed below.

## In-scope finding and correction

Finding: core appends short_pause_cluster_candidate events after all long near-silence events, while renderAttempt previously displayed events.slice(0,8). With eight or more long events, short-cluster candidates were entirely unreachable in the UI despite having been detected. Array order also caused misleading chronological ordering.

Small correction:
- keep the existing eight-row limit;
- reserve up to four rows for each detector type;
- fill spare capacity by time;
- display selected rows chronologically;
- retain original event objects/IDs and stored ordering;
- disclose visible/total candidate count.
This guarantees both detected types can be represented without increasing replay burden beyond the existing row cap. It is still a bounded subset, not a claim every event is shown.

Exact post-host edits:
1. study-teachback-app/app.mjs — bounded balanced candidate selection/count and chronological presentation.
2. study-teachback-app/process-evidence.test.mjs — five tests execute the actual rendering/action body with long/short event counts 9/1, 1/8, 9/8, 0/8 and 9/0; verify limit, both types, original object identity, no initial mutation, correct replay/confirmation and order.
3. study-teachback-app/browser-tests-r4.mjs — locate and retain the short-cluster row by its label instead of assuming it is the last row, since rows now sort by time.

The whole uncommitted task still contains exactly six source/test files:
- study-teachback-app/core.mjs
- study-teachback-app/diagnostic-localization.mjs
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/process-evidence.test.mjs (new)

## Self-review answers

Two-area integration: content stays in 内容理解 and process observations in 讲解过程. Confirmed overlapping context is associated locally with an existing content target. Process-only evidence cannot manufacture a content deficit.
Reachability: corrected detector-type starvation; no new button/subsystem needed.
Confirmation: requires event replay and reviewed uninterrupted transcript. The path is intentionally sequential: content review first, then local process confirmation. Rerender deduplicates evidence; repeat confirmation causes no provider request.
Knowledge leakage: process has no knowledge status; candidate evidence never corroborates targets; missing content with no spoken location cannot borrow timing. Correct/self-repaired content remains supported.
Provider requests: main confirm invokes only the existing content diagnosis; process confirmation makes no request. No added ASR/semantic call.
Legacy safety: old long-only attempts remain valid; no automatic reanalysis/migration of the saved owner attempt. New candidates are not retroactively invented.
Wording: low-energy candidate, not lexical filler identification, emotion/personality/global fluency or proven ignorance. Row count now makes truncation visible.
Simplification: reused existing storage/localizer/replay architecture and a small local selection step; no broader refactor justified.
No model/provider/schema/retention/budget/dependency change.

## Fresh zero-call checks

Focused: 33/33 PASS.
artifacts/study-teachback/process-evidence-feasibility-01/process-1790677559777-QF4Yr4

Full Node/offline: 150/150 PASS.
artifacts/study-teachback/process-evidence-feasibility-01/node-1790677560133-FqbDzv

Initial new UI harness run failed because its code slicing assumed LF in Windows CRLF source. Normalized line endings in the test harness only, reran both suites and all passed. Failed logs retained at process-1790677535634-YY6s4t and node-1790677535979-KjdEO8.
Browser row-selection helper was adjusted after those passing Node runs; no production change after them. Browser syntax check passes.
git diff --check PASS.
No new browser execution in the known unreliable sandbox; fresh host browser run is required, not optional.

Ledger hash before/after fresh runs and final check:
b305a5680a1fff6844b2c3e34d08cdc7c1183d9d95ee62d9d5ff92889194197e
Live provider/microphone/new owner recording/additional ASR/incremental exposure: all zero.
Test credentials synthetic; loopback/test-ledger isolation; existing intentional negative outbound probe is blocked before I/O.

## Broader observations — not implemented

Must Fix candidate (documentation/MASTER triage): root/product READMEs still say physical microphone Phase 3 has not run. CURRENT_STATE section 4 is corrected, but historical paragraphs retain "fully unused" and sections 9/10 describe a pre-checkpoint next step. These stale statements can mislead a future operator into repeating already-consumed live actions. Follow current section 4/HANDOFF; MASTER should mark superseded text or reconcile summaries. No canonical or README edits made.
User Decision Needed: whether/how to reanalyse the existing original owner audio locally without a new ASR/recording; this implementation does not refresh old saved observations.
Future Optional: simplify sequential transcript/process confirmation UX after measured owner feedback, preserving replay gates; broaden offline natural-speech evaluation.
Project observation: provider/server retain legacy paid delivery route, whereas current process UI uses only local confirmation. No current extra-call regression found; do not remove a historical route as part of this bounded task.

## Gate / next step

Blocking: NEEDS_HOST_REVERIFY due to the three exact post-host edits above.
Host command from normal owner PowerShell:
node study-teachback-app/run-offline-tests.mjs browser process-evidence-feasibility-01
Check the new row ordering/type labels/count and native replay/local save. Bind a fresh receipt to final source hashes before a local commit.

Tests Not Run: fresh host browser on corrected bytes; original owner PCM analysis; live diagnosis.
Unknown: original owner audio detector output and natural-speech false-positive/negative rates remain unverified; only derived timing fixtures were evaluated.
No final product commit, no product push/merge, no live diagnosis/Phase3B resumption.
Only this remote ACTIVE_EXCHANGE is written as transport; CURRENT_STATE/HANDOFF untouched. Verify exact readback, current turn/state and sole meta path before relay success.
