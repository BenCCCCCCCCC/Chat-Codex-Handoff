# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: PROCESS-EVIDENCE-FEASIBILITY-01
task: PROCESS-EVIDENCE-FEASIBILITY-01
writer: CODEX
transport_only: true
accepted_base_head: ac875a100b159781037746ea0b8bd2188457d13a
result: NEEDS_HOST_VERIFY

## Binding and scope

Product branch: prototype/study-teachback-v0.1.
Base/final HEAD: ac875a100b159781037746ea0b8bd2188457d13a.
Tracked worktree was clean before editing. Changes are UNCOMMITTED pending fresh host UI validation; unrelated untracked work/artifacts preserved.
Authority blobs read: ACTIVE_EXCHANGE 109784afdc12a8f1f28a32a7f941022a4fb4d2e0; HANDOFF cc50b382e07593a92bda786a4f684a42a131312f; CURRENT_STATE 25a1d50fa2f435d1c524b80108fa64d2eb67d70e.

Exact changed files:
- study-teachback-app/core.mjs
- study-teachback-app/diagnostic-localization.mjs
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/process-evidence.test.mjs (new, untracked)

## Architecture finding

The main replay-confirm action saves a reviewed transcript version then calls only content diagnosis. contentInput excludes acoustic evidence; that separation remains intact.
Accepted code already has a local confirmProcess path that saves channel=process, invokes no model, and rerenders. localize already combines independently confirmed, overlapping process context with an existing source-grounded content target. Therefore no new delivery semantic call or orchestration layer is needed.
This change extends that existing path to a new timing candidate, labels it in the process area, and clarifies the post-content notice that local process replay/confirmation is a separate step.
Confirmation still requires replay plus a reviewed, uninterrupted transcript. Candidates are not silently promoted. After confirmation, rerender computes co-location with current-version content findings locally.
Process-only evidence creates no knowledge target. Supported/final-correct content remains supported; missing content with no spoken span never borrows a process timestamp.

## Chosen deterministic rule

Keep the existing 20ms RMS frames, 0.008 near-silence threshold, >=0.7s continuous internal near-silence events, and interruption/clipping/near-silent quality gates.

Add short_pause_cluster_candidate using the same frame-derived gaps:
- start on a substantial internal short gap;
- at least 3 gaps each 0.12..0.50s;
- those substantial gaps contribute >=0.60s low energy in total;
- candidate spans 0.8..2.0s and includes >=0.30s above-threshold activity between gaps;
- a >=0.7s long gap breaks the cluster;
- consume emitted cluster gaps to avoid repeated overlapping candidates;
- cap added clusters at 8; preserve existing long-event IDs.

This is a conservative, UNVALIDATED_ACTIVITY timing heuristic, not reliable speech/VAD or lexical analysis. Small phoneme/syllable gaps alone cannot qualify. Ordinary discourse pauses or noise can still produce candidates; human replay is mandatory and no sensitivity/specificity claim is made.

Map a confirmed matching event to processEvidence.type=short_pause_cluster using the existing exact fields, IDs, transcript-version binding and replay validation. This adds event/type vocabulary within existing observation/report objects, not a new storage schema, migration or provider output contract. Legacy near-silence evidence remains supported.

## Derived real-sample feasibility

No owner export or original audio was located in the current repository. No original audio, transcript export or personal data was uploaded to GitHub.
Used only MASTER's derived, non-sensitive gap timings to synthesize constant active/quiet PCM. This is a timing feasibility fixture, NOT the real owner audio and NOT a voiced-filler oracle.

Compared the accepted baseline core loaded directly from git against current core with that fixture:
- baseline: e0 near_silence_candidate 14.54..15.42 only;
- current: same e0 plus e1 short_pause_cluster_candidate 16.08..17.28.
The bounded candidate overlaps the reported 16..18s transition and s2, without identifying any word or determining knowledge.
Actual output on the original WebM remains unverified. Old saved observation arrays are NOT automatically recomputed or migrated. This implementation applies when local observations are computed from PCM; it does not modify the already-saved owner attempt or resume its diagnosis.

## Deliberately not implemented

No lexical 额/嗯 detection; no transcript insertion; no automatic self-repair/restart detector; no second ASR; no additional semantic delivery call.
No emotion/confidence/personality/accent/global fluency score.
No automatic reinterpretation of correct content from pauses; no claim co-location proves a reasoning deficit.
Self-repair fixture evidence remains prelabelled only, with final-correct content producing no deficit target.
No new dependency/model/provider/retention/budget change, no storage migration.

## Tests and self-review

Focused: node study-teachback-app/run-offline-tests.mjs process process-evidence-feasibility-01
28/28 PASS (14 existing localization tests + 14 new process tests).
Artifact: artifacts/study-teachback/process-evidence-feasibility-01/process-1790676563665-UhpZqN

Full Node/offline: node study-teachback-app/run-offline-tests.mjs node process-evidence-feasibility-01
145/145 PASS.
Artifact: artifacts/study-teachback/process-evidence-feasibility-01/node-1790676602309-cox0VT

New tests cover the derived timings, unchanged long e0, ordinary micro-gaps, isolated gaps, insufficient counts/duration, insufficient active sound, long-gap separation, quality gates/candidate cap, content-correct but hesitant, content-wrong but fluent, confirmed vs unconfirmed convergence, missing-without-time, final-correct self-repair and actual local save/rerender with forbidden provider functions.
New browser case exercises a synthetic preconstructed short-cluster event through native replay, local confirmation, persistence and no semantic dispatch; detector correctness is separately tested with PCM.
git diff --check and browser syntax check PASS.

Self-review found that tiny gaps should not contribute to the substantial-gap duration threshold; adjusted the rule before tests to count only qualifying 0.12..0.50 gaps toward >=0.60s, while all quiet gaps are subtracted from the active-time guard. All final deterministic checks pass.
Reviewed event identity, unchanged content channel, replay/version gates, no automatic promotion, no knowledge-field leakage and zero-dispatch local path. No blocking implementation finding remains.

## Browser
One attempt, exit 1 before application cases: CDP_TIMEOUT Runtime.enable; Edge GPU process exited -1073741790 and GPU process isn't usable. No retry and no provider stub calls.
Artifact: artifacts/study-teachback/process-evidence-feasibility-01/browser-1790676620733-9wFuPT
All 53 receipt source hashes match the final worktree. New UI test has not successfully executed; this is environment failure, not browser acceptance. Prior host evidence is not reused.

## Zero-live evidence and limits

All runs used synthetic credentials, loopback-only networking and test-only ledgers. Full Node includes its existing intentional outbound negative probe, blocked before I/O.
This turn: live provider calls 0; real microphone/owner recording 0; additional ASR 0; incremental exposure 0.
Current production ledger SHA before/after both deterministic runs:
b305a5680a1fff6844b2c3e34d08cdc7c1183d9d95ee62d9d5ff92889194197e
This is the current post-owner-live ledger, not the earlier pre-live hash; this turn did not alter it.

Must Fix / Blocking: obtain fresh host browser verification before final commit.
Tests Not Run: successful host browser run; evaluation on original owner PCM; live diagnosis (forbidden).
Unknown: false-positive/false-negative rates on natural speech, original-recording detector output, perceived UX.
User Decision Needed: MASTER/owner host validation and, if desired, a separately controlled zero-provider reanalysis of the existing original recording. Reliable lexical filler detection is outside this deterministic implementation; no model/dependency request is required for the chosen bounded scope.
Future Optional: broader consented offline speech evaluation; local reanalysis of legacy observations without new recording/ASR (not implemented here).

Host command from normal owner PowerShell:
node study-teachback-app/run-offline-tests.mjs browser process-evidence-feasibility-01
Do not run a live product diagnosis as part of this verification.

No product commit/push/merge; no Phase3B resumed. Only remote ACTIVE_EXCHANGE is written; CURRENT_STATE/HANDOFF untouched. Verify full readback, turn/state and sole meta path after this transport write.
