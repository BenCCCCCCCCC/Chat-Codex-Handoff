# Active Handoff — PROCESS-EVIDENCE-FEASIBILITY-01 PROJECT-AWARE FINALIZE

Updated: 2026-09-29
Role: 00 MASTER
Status: CHAT_TO_CODEX / PROJECT-AWARE SELF-REVIEW + FINALIZATION

## Binding

Repo:
F:\Chat-Codex-Handoff\validation-repo

Branch:
prototype/study-teachback-v0.1

Base HEAD:
ac875a100b159781037746ea0b8bd2188457d13a

PROCESS-EVIDENCE-FEASIBILITY-01 changes are currently uncommitted.

## Project-awareness requirement

Before finalizing, Astra should build enough current project context to independently review the change.

Required starting context:
- latest CURRENT_STATE.md
- latest HANDOFF.md
- current ACTIVE_EXCHANGE.md
- repo root README
- study-teachback-app/README.md if present/relevant
- recent relevant git history
- current product entry and adjacent architecture as useful

At minimum understand:
- active product is 知而能讲, not the retained legacy Handoff helper;
- accepted product baseline is ac875a100b159781037746ea0b8bd2188457d13a;
- source-first setup and file auto-use are already accepted;
- content and process evidence must remain separate;
- real owner evidence exposed a 16–18s hesitation missed by the previous long-silence-only detector;
- one Tutor + one ASR live call have already been used; content diagnosis remains held;
- GitHub ACTIVE_EXCHANGE is transport; product push/merge is separate and not authorized.

Astra may autonomously inspect any additional repository files/history needed to validate assumptions or discover integration risks.

## Accepted evidence before finalization

Focused:
28/28 PASS.

Full Node/offline:
145/145 PASS.

Host browser outside Codex sandbox:
PASS, wrapper exit 0.

New host case:
short-gap candidate replays and saves locally without a semantic call — PASS.

Isolation:
synthetic credential / loopback only / test ledgers only / blocked outbound attempts=0.

Production ledger unchanged by the zero-call engineering runs.

## Current implementation intent

Preserve:
- existing >=0.7s long near-silence candidate;
- new bounded short_pause_cluster_candidate;
- no lexical 额/嗯 claim;
- replay confirmation before process evidence is accepted;
- process evidence has no knowledge status;
- content/process separation;
- local process confirmation makes zero provider calls;
- deterministic convergence may mark a bounded target worth verifying, never prove ignorance.

## Project-aware self-review

Astra should independently inspect this change in the context of the surrounding product.

It may explore:
- app.mjs flow and UI ordering;
- core.mjs observation semantics;
- diagnostic-localization.mjs convergence rules;
- schemas/server/provider boundaries;
- persistence/export/replay behavior;
- relevant browser/offline tests;
- recent accepted changes and possible interaction risks.

Questions Astra should answer before final commit:
- Does the new process evidence actually integrate coherently with the user's intended two-area feedback experience?
- Is there hidden duplication or an unreachable/awkward process-confirmation path?
- Can the local process path accidentally leak into content judgments?
- Does the design add any unneeded semantic/provider request?
- Are legacy attempts safe when they lack the new candidate type?
- Is the current UI wording honest about candidate uncertainty?
- Is there any simpler in-scope implementation that should replace the current one before versioning?

## Autonomy

Inside PROCESS-EVIDENCE-FEASIBILITY-01 scope Astra may analyze, refactor touched code, add tests, self-correct and iterate as needed.

However host PASS binds the currently tested bytes.

If any product/test source changes after the host run:
- do not create the final commit using stale browser evidence;
- return NEEDS_HOST_REVERIFY with exact changed files/reason.

If no post-host source/test changes are needed:
- inspect host artifact/receipt directly;
- confirm exact browser PASS count and source hashes;
- git diff --check;
- stage only the six process-evidence files;
- create one focused local commit;
- no product push/merge.

Expected files:
- study-teachback-app/core.mjs
- study-teachback-app/diagnostic-localization.mjs
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/process-evidence.test.mjs

Suggested commit:
feat: add bounded short-pause process evidence

## Broader findings

If broader exploration finds materially relevant issues outside this implementation scope, do NOT silently implement them.

Return them separately as:
- Must Fix candidate
- User Decision Needed
- Future Optional
- Project observations

Do not resume live owner diagnosis.
Do not make live provider/API calls.
Do not push/merge.
