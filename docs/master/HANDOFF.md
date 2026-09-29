# Active Handoff — PROCESS-EVIDENCE-FEASIBILITY-01

Updated: 2026-09-29
Role: 00 MASTER
Status: CHAT_TO_CODEX / ZERO PROVIDER / REAL-LIVE-EVIDENCE-DRIVEN

## 1. Binding

Repo:
F:\Chat-Codex-Handoff\validation-repo

Branch:
prototype/study-teachback-v0.1

Accepted HEAD:
ac875a100b159781037746ea0b8bd2188457d13a

Tracked worktree must be CLEAN before editing.

Do not resume the live owner diagnosis.

## 2. Verified real-live evidence

Owner's 21.96s real attempt:
- raw ASR omits 额/嗯;
- s2 = 16.56–19.14s, text: 以及访客证他只是当天有效;
- owner replay confirms hesitation/filler around 16–18s;
- current saved process event list has only e0 near-silence 14.54–15.42s;
- current rule: 20ms frames, nearSilenceRMS 0.008, minCandidateSeconds 0.7.

MASTER zero-call PCM audit around 16–18s found short low-energy runs:
- 16.08–16.22 = 0.14s;
- 16.74–16.94 = 0.20s;
- 16.96–17.28 = 0.32s;
with substantial voiced activity in the same region.

Interpretation:
the live hesitation is not representable by the current “>=0.7s continuous near-silence” rule alone.

Also verify current UI/control flow:
the main replay-confirm action requests content diagnosis; delivery/process analysis is separately triggered from confirmed candidate events.

## 3. Task

Astra has broad in-scope autonomy to analyze -> design -> implement -> test -> self-review -> iterate.

Goal:
make process evidence useful for diagnostic localization while preserving strict evidence separation.

Required model:
- contentFindings: semantic/source-grounded only;
- processEvidence: local observable audio/timing evidence; no knowledge status;
- diagnosticTarget: only combines channels when they converge on the same bounded span/reasoning transition.

Do not infer confidence, anxiety, personality, accent quality or global fluency.

## 4. Candidate capabilities to evaluate

A. Existing long near-silence:
keep and test.

B. Short-pause / micro-pause cluster:
evaluate a deterministic local observation that can surface a cluster of short low-energy gaps around a speech transition without calling it ignorance or a filler word.

The exact rule is Astra's engineering choice, but it must be:
- locally computable;
- bounded;
- testable with deterministic audio fixtures;
- resistant to ordinary phoneme/syllable gaps;
- labeled as candidate evidence requiring replay, not as a diagnosis.

C. Voiced filler:
do not claim lexical 额/嗯 detection from generic energy/VAD alone.
If reliable voiced-filler evidence is not possible without a new model/dependency/ASR behavior, report that limitation and keep it out of the automatic label.

D. Combined UX:
evaluate whether processEvidence can be shown locally in the “讲解过程证据” area, and after contentFindings return, whether a deterministic diagnosticTarget can highlight overlap/convergence without a separate paid delivery semantic call.

## 5. Real-sample acceptance target

The new design should explain this real sample correctly:
- e0 14.54–15.42 remains a long near-silence candidate;
- the owner-confirmed 16–18 hesitation should not be falsely labeled “额” automatically;
- if the new deterministic short-pause evidence can support it, surface a bounded process candidate around that transition;
- if not supportable, say “not detected” rather than fabricate evidence.

Process evidence alone must never create content missing/incorrect status.

## 6. Tests

Zero provider only.

Add deterministic fixtures for:
- long silence;
- ordinary speech micro-gaps that should NOT trigger;
- clustered short pauses that should trigger only if the proposed rule is justified;
- content-correct but hesitant -> no knowledge deficit;
- content-wrong but fluent -> content issue remains;
- convergent content gap + process evidence -> diagnostic target worth verifying, not proven ignorance;
- self-repair final-correct -> content supported, process may retain self-repair evidence;
- no extra semantic/provider dispatch for local process evidence.

Run focused + full Node/offline + applicable browser stub suite.

If UI changes need host browser verification and Codex sandbox blocks Edge, return NEEDS_HOST_VERIFY and leave final product commit pending.

## 7. Scope protection

No:
- live provider/API;
- second owner recording;
- second ASR pass;
- new dependency/audio ML model;
- model/provider migration;
- retention/schema/budget changes;
- global fluency/PTE-like scoring;
- emotion/confidence/personality inference;
- product push/merge.

If a new dependency or model is truly required for voiced-filler detection, stop and return User Decision Needed.

## 8. Exchange return

Write CODEX_TO_CHAT only to remote meta/master-state/docs/master/ACTIVE_EXCHANGE.md.

Include:
- architecture analysis;
- chosen evidence model/rule;
- what was deliberately NOT implemented;
- exact changed files;
- focused/full/browser tests;
- zero-live-call evidence;
- self-review findings;
- whether host verify is required;
- Must Fix / User Decision Needed / Future Optional;
- no push/merge/Phase3B confirmation.
