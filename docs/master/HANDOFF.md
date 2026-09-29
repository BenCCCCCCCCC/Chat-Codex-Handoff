# HANDOFF — NEW MASTER CHAT START

Updated: 2026-09-30
Purpose: compact authoritative handoff for the next Chat / 00 MASTER conversation.

## Read first

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Canonical branch:
`meta/master-state`

Read in this order:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/master/ACTIVE_EXCHANGE.md`

Do not reconstruct current state from historical numbered/version-suffixed files unless evidence is needed.

## Product

Active product:
**知而能讲**

Accepted local HEAD:
`20be403f7bb736ab0cde2758af7306a00c2290db`

Accepted commit:
`docs: align entry guides with completed Phase 3B validation`

Behavior baseline:
`aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`
`fix: make transcript replay optional for content diagnosis`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

No product push/merge authorized.

## Phase 3B — CLOSED / PASS

MASTER has formally closed Phase 3B for the bounded validation question.

Validated:
- one real source-first owner flow;
- Tutor 1;
- real microphone recording 1;
- ASR 1;
- content diagnosis 1;
- retries 0;
- content/process separation on the real sample;
- accepted optional-replay UX;
- current entry documentation aligned.

This does not validate:
- broad learning efficacy;
- detector accuracy at scale;
- generalization across users/courses/speech patterns;
- process-only knowledge diagnosis.

Original live authorization is fully consumed.
No further live provider calls are authorized.

Production ledger:
`1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21`

## Accepted documentation cleanup

`DOC-CLEANUP-PHASE3B-01` is accepted.

Commit:
`20be403f7bb736ab0cde2758af7306a00c2290db`

Changed only:
- `README.md`
- `study-teachback-app/README.md`

Evidence:
- 11 insertions / 7 deletions;
- targeted stale-state search clean;
- diff checks PASS;
- final tracked worktree clean;
- no runtime/test changes;
- live calls 0;
- no push/merge.

## Phase 4 pre-implementation collision result

Fresh 2026-09-30 review found strong collision with the generic product shape.

Current native overlap:
- ChatGPT Study mode supports uploaded learning materials, guided/Socratic teaching and understanding checks;
- Study mode currently does not apply inside Projects and documents dictation rather than a unified live-voice Study workflow;
- ChatGPT Voice/GPT-Live supports files and Projects.

Current external/open-source overlap:
- NotebookLM covers source-grounded study outputs and quizzes;
- multiple products already market spoken Explain Back / Feynman / gap-finding workflows;
- GitHub projects such as `VihaanMotwani/deep-study-skills` and `GibbonTech/feynman-learning-app` cover teach-back, tutoring, file context and/or voice.

MASTER decision:
do not build more generic teach-back features.

The remaining candidate differentiation is:
**precise source-grounded gap localization + strict separation between content-understanding evidence and speech/process evidence.**

That value is not yet proven.

## Proposed next Phase 4 experiment

`NATIVE-COLLISION-PROBE-01`

No code changes.

Reuse the existing Phase 3B source / confirmed learner explanation / accepted product result.

Compare against:
1. ChatGPT Study mode using the same source and same explanation/transcript;
2. optionally ChatGPT Voice + file/Project if the first comparison leaves a meaningful voice-specific question.

Judge:
- correct omission detection;
- false positives;
- localization precision;
- source grounding;
- actionable feedback;
- content/process contamination;
- manual friction.

Important:
the current product should not be rerun for this probe unless MASTER later authorizes new live calls. Use the preserved Phase 3B output as its side of the comparison.

## Current state

No Codex implementation task is active.

ACTIVE_EXCHANGE remains MASTER_HOLD until the owner approves the Phase 4 native-collision probe.

## Hard boundaries

Without fresh owner approval:
- no new product feature;
- no new app-side live provider calls;
- no new recording/ASR/diagnosis;
- no schema/retention/model/provider/budget change;
- no push/merge/public release.

## Next

Owner decides whether to run NATIVE-COLLISION-PROBE-01.
