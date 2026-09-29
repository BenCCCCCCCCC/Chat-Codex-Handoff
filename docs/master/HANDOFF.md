# Active Handoff — PROCESS-EVIDENCE-FEASIBILITY-01 HOST REVERIFY

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / FRESH HOST VERIFY REQUIRED

## Why

Project-aware Astra review found a post-host UI reachability issue:
- previous UI took the first eight process events
- enough long near-silence events could hide every short-pause candidate

Correction now keeps the eight-row cap while ensuring both detector types can be represented, fills spare capacity by time, sorts visible rows chronologically, and shows visible/total candidate count.

Because source/test files changed after the previous host PASS, that PASS is stale.

## Fresh deterministic evidence

- focused 33/33 PASS
- full Node/offline 150/150 PASS
- git diff --check PASS
- live provider calls 0
- additional ASR 0

## Owner host command

Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\run-offline-tests.mjs browser process-evidence-feasibility-01

Do not reset/clean/checkout the worktree.

## Fresh browser expectations

- short-pause row remains reachable even with many long events
- long and short candidate types can both appear within the eight-row cap
- visible rows are chronological
- visible/total count is coherent
- replay/local confirmation still works
- local process confirmation makes no provider request
- process evidence alone creates no content deficit
- existing setup/provenance/replay regressions remain green

Known synthetic moist-soil audio may play; expected test media.

Do not resume live diagnosis.

After PASS, MASTER will dispatch final self-review/commit.

Documentation cleanup for stale README/CURRENT_STATE historical wording remains a follow-up after this gate.