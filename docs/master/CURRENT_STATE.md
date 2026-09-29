# CURRENT_STATE — Chat ↔ Codex Handoff / 知而能讲

Updated: 2026-09-30
Authority: 00 MASTER
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Local checkout: F:\Chat-Codex-Handoff\validation-repo
Product branch: prototype/study-teachback-v0.1
Meta authority branch: meta/master-state

## 1. Active product

Active product: **知而能讲** — source-first learning + in-app teach-back.

Primary current user direction:
- students learning bounded course/material content;
- user provides material first;
- system helps teach, then the learner explains in their own words;
- diagnosis should precisely locate unfamiliar / weak / unsmooth concept relations or reasoning transitions;
- feedback stays separated into:
  1. 内容理解
  2. 讲解过程证据
- process evidence is supporting/localizing evidence, never proof of misunderstanding.

Legacy Handoff tooling remains retained infrastructure/history, not the active product.

## 2. Accepted local product baseline

Accepted HEAD:
`20be403f7bb736ab0cde2758af7306a00c2290db`

Commit:
`docs: align entry guides with completed Phase 3B validation`

Behavior baseline remains:
`aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`
`fix: make transcript replay optional for content diagnosis`

The accepted HEAD advances only documentation; runtime/product behavior is unchanged from `aa240f8...`.

No product push/merge has been authorized or performed.

Accepted milestones:
- Batch A — correctness hygiene: accepted
- Batch B / Phase 3A — diagnostic localization architecture: accepted
- Batch C — correctness boundaries: accepted
- SETUP-FLOW-01 — source-first setup: accepted
- FILE-IMPORT-AUTO-USE-01 — small imported files auto-populate learning source: accepted
- PROCESS-EVIDENCE-FEASIBILITY-01 — long-silence + bounded short-pause-cluster process evidence: accepted
- REPLAY-REVIEW-UX-01 — optional transcript replay for content diagnosis: accepted
- DOC-CLEANUP-PHASE3B-01 — current entry documentation aligned: accepted

## 3. Phase 3B — FORMALLY CLOSED / PASS

MASTER decision:
**Phase 3B = PASS / CLOSED for the bounded validation question.**

What this PASS means:
- one real owner flow completed end to end;
- source-first Tutor -> microphone -> ASR -> content diagnosis worked without retry;
- content diagnosis and process evidence remained meaningfully separable;
- the accepted process-evidence detector can surface the owner-confirmed hesitation on the preserved sample;
- transcript replay is no longer a mandatory content-diagnosis prerequisite after explicit current-text confirmation;
- current-facing entry documentation now reflects the accepted state.

What this PASS does **not** mean:
- broad learning efficacy is validated;
- detector sensitivity/specificity is validated at scale;
- one sample generalizes to other users/courses/speech patterns;
- process evidence can diagnose knowledge gaps by itself;
- retention or long-term ASR strategy is resolved.

## 4. Phase 3B real owner validation evidence

Real owner validation used:
- synthetic DOCX: OWNER_VALIDATION_01_测试材料_实验室访客规则.docx
- Tutor semantic: 1
- real microphone recording: 1
- ASR: 1
- content diagnosis: 1
- retries: 0

Original live authorization is fully consumed.
No further live provider calls are authorized under PHASE3B-LIVE-01.

Production ledger hash:
`1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21`

Real content result:
- badge/same-day validity captured;
- lab open/closed state captured;
- 18:00 visitor-admission cutoff omitted.

Real process result:
- owner-confirmed hesitation around 16–18s;
- preserved-audio reanalysis surfaces short-pause cluster about 16.08–17.24s;
- this process target does not converge on the omitted 18:00 content target.

Conclusion:
content/process evidence separation is supported by the real sample; no causal knowledge inference is justified from process evidence alone.

## 5. REPLAY-REVIEW-UX-01 — ACCEPTED

Accepted behavior:
- content diagnosis can proceed after explicit confirmation of the current transcript text;
- ASR warning remains for negation/numbers/conditions/terms;
- per-span/full-audio transcript replay is optional;
- playback completion remains transient UI feedback;
- `USER_TRANSCRIPT_CONFIRMATION` means text confirmation, not playback proof;
- process-candidate confirmation still requires genuine replay of that candidate;
- no extra provider call;
- no schema/model/provider/retention/budget change.

Finalization evidence accepted by MASTER:
- host browser 52/52 PASS;
- sourceSHA256 53/53 matched before staging, before commit and after commit;
- focused 36/36 PASS;
- full Node/offline 151/151 PASS;
- diff checks PASS;
- exactly six authorized files;
- no post-host source/test drift;
- tracked worktree clean;
- production ledger unchanged;
- finalization live calls/recording/ASR/diagnosis: 0.

## 6. DOC-CLEANUP-PHASE3B-01 — ACCEPTED

Accepted local documentation commit:
`20be403f7bb736ab0cde2758af7306a00c2290db`
`docs: align entry guides with completed Phase 3B validation`

Reported and accepted evidence:
- exactly two changed paths:
  - `README.md`
  - `study-teachback-app/README.md`
- diff: 11 insertions / 7 deletions;
- no product code/test edits;
- targeted stale-state search had expected no-match result after edits;
- `git diff --check`, staged diff check and post-commit diff check PASS;
- final tracked worktree clean;
- no application tests rerun because the delta was documentation-only;
- live provider calls / recording / ASR / diagnosis / paid spend: 0;
- no push/merge.

The cleanup corrected current-facing claims about:
- completed Phase 3B validation;
- exhausted live allowance;
- optional transcript replay for content diagnosis;
- continued specific replay requirement for process-candidate confirmation;
- content/process separation;
- accepted small-file auto-use behavior.

Historical snapshots were intentionally not rewritten.

## 7. Phase 4 pre-implementation collision check — COMPLETE / MASTER HOLD

Date: 2026-09-30

Question:
Before building more of 知而能讲, does the remaining proposed value already exist in current native/market/open-source products?

### Official/current collision

Verified current OpenAI capability:
- ChatGPT Study mode can work from uploaded course materials, use Socratic guidance, ask open-ended questions, quiz the learner, and check understanding.
- Study mode is currently a regular-chat capability, not a Project capability.
- Study mode documentation explicitly supports voice dictation.
- GPT-Live/Voice now supports file uploads and Projects and can reference Project chats, sources and instructions.

Interpretation:
"source material + AI tutor + understanding checks + voice" is already strongly covered by native ChatGPT surfaces, even though the exact Study-mode + Project + live-voice combination is not documented as one unified workflow.

### Existing-product collision

Verified current examples include:
- NotebookLM: source-grounded study guides, quizzes and flashcards with source citations.
- Intu AI Study Hub: voice Explain Back, transcript, conceptual-clarity evaluation and missing-step feedback.
- LaoshiAI / TeachBack-style products: spoken explain-back and gap finding.
- BrainBack-style explain-back products: structured explanation grading and explicit gap feedback.

### GitHub/open-source collision

Current GitHub examples include:
- VihaanMotwani/deep-study-skills: Guided Tutor, Study Companion and Teach-Back Student for ChatGPT/Codex; voice-friendly interaction and explicit evidence boundaries.
- GibbonTech/feynman-learning-app: file import, voice input, Feynman-style explanation and knowledge-gap identification.
- other 2026 teach-back / learning-coach repositories exist and reinforce that generic Feynman/teach-back workflow is not an empty space.

### MASTER product decision

Do **not** treat any of these as sufficient differentiation by themselves:
- upload material;
- AI teaches;
- learner explains back;
- voice input;
- generic "find knowledge gaps";
- quizzes / flashcards / Socratic prompts.

The only currently evidence-supported candidate differentiator is narrower:

> source-grounded diagnostic localization of *what concept / relation / reasoning transition is weak*, while keeping content understanding evidence separate from speech/process evidence and refusing to infer knowledge gaps from process signals alone.

That differentiator is still a hypothesis, not validated product value.

Therefore:
**do not build Phase 4 features yet.**

## 8. Proposed Phase 4 question

Proposed question:

> Does 知而能讲's evidence-separated diagnostic layer produce materially more precise, actionable and trustworthy gap localization than a strong native/general teach-back baseline?

This question comes before:
- retention systems;
- spaced repetition;
- dashboards;
- more process detectors;
- broader speech analytics;
- app decomposition for feature growth;
- new tutoring modes.

## 9. Proposed next smallest experiment — NATIVE-COLLISION-PROBE-01

No code change.

Use the already-completed Phase 3B owner sample so the current product does **not** need to spend another Tutor/ASR/diagnosis call.

Compare the preserved 知而能讲 result against a native ChatGPT baseline using the same source and the same confirmed learner transcript/explanation.

Primary baseline:
- ChatGPT Study mode + same source + same learner explanation/transcript.

Optional second baseline only if useful and available:
- ChatGPT Voice/file or Voice/Project workflow using the same source.

Evaluate:
1. Did it correctly identify the real omitted 18:00 condition?
2. Did it avoid inventing gaps not supported by the source?
3. Did it localize the gap to the right concept/relation/condition?
4. Is the feedback actionable rather than generic?
5. Does it preserve source grounding?
6. Does it incorrectly use hesitation/process behavior as proof of missing knowledge?
7. How many manual steps are required?
8. Does our current product provide a meaningful advantage after accounting for setup friction?

Decision rule:
- if native baseline is effectively equivalent on the important dimensions, Pivot/Stop further diagnostic productization;
- if our evidence-separated localization is materially clearer or safer, continue with a bounded diagnostic-value validation;
- do not infer broad learning efficacy from this probe.

## 10. Authorization state

No new live product/API validation is authorized yet.

The proposed native comparison can reuse the already-preserved Phase 3B product output, so no new 知而能讲 provider call is required.

Owner decision is needed before running any new paid/live app-side validation beyond the native baseline.

## 11. Must Fix / User Decision / Future Optional

### Must Fix
None.

### User Decision Needed
- approve running NATIVE-COLLISION-PROBE-01 as the next bounded Phase 4 validation;
- retention policy: customizable retention/default/reminders and migration semantics;
- long-term ASR migration/timing strategy before deeper dependence on current timestamp behavior;
- any new app-side live validation requires fresh explicit authorization and cost boundary.

### Future Optional
- compact current-vs-historical test/helper index;
- small-step app.mjs decomposition;
- documentation-consistency review in future milestone closure;
- broader consented offline natural-speech evaluation with explicit false-positive/false-negative criteria;
- synthetic portfolio demo;
- replay-burden measurement after optional-replay UX.

## 12. Verified / Likely / Unknown

Verified:
- Phase 3B bounded feasibility flow completed and is closed;
- current native ChatGPT learning/voice capabilities substantially overlap generic source-first tutoring and voice interaction;
- current market/open-source products substantially overlap generic Feynman/teach-back and gap-finding workflows;
- accepted local HEAD remains `20be403f7bb736ab0cde2758af7306a00c2290db`.

Likely:
- differentiation, if any, must come from diagnostic evidence quality / localization / evidence separation rather than from the generic teach-back workflow.

Unknown:
- whether that narrower diagnostic layer is materially better than the native baseline;
- learning efficacy beyond the single bounded sample;
- detector sensitivity/specificity across natural speech;
- broader course/user generalization;
- final retention policy;
- final long-term ASR strategy.

## 13. Next smallest step

Await owner approval for NATIVE-COLLISION-PROBE-01.

No Codex implementation task is dispatched.
