# CURRENT_STATE — Chat ↔ Codex Handoff / 知而能讲

Updated: 2026-09-30
Authority: 00 MASTER
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Local checkout: F:\Chat-Codex-Handoff\validation-repo
Product branch: prototype/study-teachback-v0.1
Meta authority branch: meta/master-state

## 1. Active product

Active product: **知而能讲** — source-first learning + in-app teach-back.

Primary product objective:
- portfolio / AI Product Manager evidence first;
- if the product proves useful, long-term personal use can follow;
- primary user = students;
- main scenarios include exam prep, learning complex concepts, interview/oral explanation prep, and technical/paper study.

Current result priority:
1. tell the learner what is wrong;
2. tell the learner what is missing;
3. tell the learner what to repair first;
4. only then surface possible weak/uncertain areas;
5. do not rush to a global "mastery" judgment.

No overall mastery score is currently required.

## 2. Accepted local baseline

Accepted local HEAD:
`20be403f7bb736ab0cde2758af7306a00c2290db`

Accepted behavior baseline:
`aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`

No product push/merge has been authorized or performed.

Phase 3B:
**PASS / CLOSED for the bounded feasibility question.**

Verified:
- one real source-first owner flow completed;
- Tutor 1 / real recording 1 / ASR 1 / diagnosis 1 / retries 0;
- content/process evidence separation held on the sample;
- optional transcript replay UX accepted;
- current entry docs aligned;
- original Phase 3B live allowance fully consumed.

Not verified:
- broad learning efficacy;
- detector sensitivity/specificity at scale;
- cross-user/course generalization;
- process-only knowledge diagnosis.

## 3. Phase 4 collision check — updated 2026-09-30

Strong collision is confirmed for generic product features.

OpenAI Study mode already supports uploaded study materials, guided/Socratic learning, understanding checks and personalized study guidance.

Gemini Study Notebooks already support:
- uploaded class materials;
- learning goals;
- diagnostic quizzes;
- knowledge-gap identification;
- automatic next-priority lesson ranking.

Gemini Notebook already supports:
- many sources in one notebook;
- user source selection;
- source-grounded citations;
- automatic source categorization/labels for larger source sets;
- manual label correction.

Current open-source FeynmanAI also covers:
- source-grounded learning;
- learning goal / learning contract;
- observable attempts;
- source selection and source anchors;
- evidence-backed next action.

MASTER conclusion:
Do not treat these as differentiation by themselves:
- multiple file upload;
- automatic source categorization;
- user-correctable source labels;
- learning goal;
- teach-back;
- generic gap finding;
- next-best-action;
- source citation.

Public documentation checked so far does **not** establish an explicit product contract for:
- conflicting learning sources;
- explicit source authority;
- conflict surfaced before diagnosis;
- user arbitration of diagnosis-relevant source conflict;
- using that resolved authority to drive error/omission/repair-priority judgments.

This is a candidate gap only, not a claim that competitors cannot do it.

## 4. Owner product decisions — Phase 4

Accepted owner decisions:

### Multi-source
- the product should not be conceptually limited to one uploaded file;
- final production file-count limit is NOT frozen yet;
- Phase 4 benchmark should use multi-source cases rather than implement "unlimited upload".

### Source conflict
- if sources conflict on a diagnosis-relevant claim, the system must not silently choose;
- surface the conflict;
- let the user decide which source / interpretation has authority;
- source roles may guide context but do not authorize silent conflict resolution.

### Source roles
Default:
- infer roles automatically;
- user can correct them.

Possible roles include:
- primary course material / textbook;
- lecture;
- tutorial;
- supplementary reading;
- past exam;
- personal notes.

Role UI/ontology is not yet an implementation requirement.

### Learning goal
A structured learning goal is useful and can constrain:
- source scope;
- diagnostic resolution;
- prioritization;
- remediation wording.

Examples:
- exam prep;
- full conceptual understanding;
- interview/oral explanation;
- bounded week/topic review.

### Diagnostic priority
Primary ordering principle:
1. prerequisite/dependency importance;
2. severity of the learner's error;
3. importance supported by the uploaded material + learning goal.

Do not infer "exam importance" without evidence such as syllabus/rubric/past exam/teacher emphasis or explicit user instruction.

### Diagnostic resolution
Resolution may vary with source content and user goal.
For future product design, a default "standard" diagnostic resolution is acceptable, with user-adjustable depth as an optional control.
Do not confuse diagnostic resolution with answer length.

### Output
Default result should be conclusion-first:
- wrong;
- missing;
- repair first.

Source/user-answer evidence may be available on demand.
Do not default to a dense evidence rail.

### Process evidence
Speech/process evidence (pause clusters, hesitation etc.) is not a Phase 4 core differentiator.
Existing capability is retained but de-prioritized.
It must never independently establish a knowledge gap.

## 5. Phase 4A — FROZEN PRODUCT QUESTION, NOT YET DISPATCHED

Name:
**Multi-source Diagnostic Prioritization Benchmark**

Core question:

> Given multiple learning sources plus an explicit learner goal, can 知而能讲 diagnose what is wrong, what is missing, and what should be repaired first — while correctly surfacing source conflicts instead of silently resolving them?

Primary hypotheses:

H1 — Error/Omission Reliability
The diagnostic contract can distinguish supported error vs omission vs no issue without fabricating unsupported gaps.

H2 — Priority Reliability
Repair priority follows prerequisite dependency + error severity + source/goal-supported importance.

H3 — Source Conflict Safety
When diagnosis-relevant sources conflict, the system surfaces the conflict and requests user arbitration instead of choosing silently.

H4 — Goal Sensitivity
The same source set can legitimately produce different diagnostic depth/priority under different explicit learning goals.

H5 — Expression Robustness
Verbose/hesitant wording alone does not become a knowledge error; fluent wording does not protect a genuine conceptual error.

## 6. Phase 4A benchmark design

No user recruitment is required for the first benchmark because the owner currently has no available participants.

Use controlled, ground-truth cases first.

Minimum case families:
1. single-source correct explanation;
2. single-source explicit factual error;
3. single-source omission;
4. multiple consistent sources;
5. multiple complementary sources;
6. diagnosis-relevant source conflict;
7. irrelevant source conflict that should not interrupt the current diagnosis;
8. prerequisite error versus several minor omissions;
9. severe conceptual/relational error versus surface-detail omissions;
10. same sources + different learning goals -> different valid priority;
11. verbose/disfluent but correct explanation;
12. fluent but conceptually wrong explanation;
13. insufficient-source-support / abstention case;
14. auto-inferred source role corrected by user.

Initial benchmark source bundles should use a bounded 2–4 sources per case.
This is a benchmark design choice, NOT the final product upload limit.

Ground truth per case should define:
- supported concepts/relations/conditions;
- true errors;
- true omissions;
- prerequisite graph / dependency;
- source conflicts;
- expected conflict behavior;
- expected top remediation priority;
- acceptable abstention.

## 7. Metrics — record first, freeze thresholds after calibration

Do not invent attractive KPI thresholds before the benchmark baseline exists.

Record:
- error precision / recall;
- omission precision / recall;
- unsupported-diagnosis rate;
- conflict-surfacing rate;
- silent-conflict-resolution count;
- top-1 remediation priority correctness;
- learning-goal sensitivity correctness;
- false knowledge inference from style/process;
- evidence traceability;
- abstention correctness.

Hard failure categories:
- fabricating a source-unsupported learner error;
- silently selecting one of conflicting diagnosis-relevant sources;
- treating process/hesitation alone as proof of misunderstanding;
- labeling a correct explanation wrong because it is verbose/disfluent;
- ignoring an explicit user source-authority decision.

Comparative numeric pass thresholds will be frozen only after the first calibrated baseline run.

## 8. Sequence before implementation

Phase 4A must NOT start by implementing multi-file UI.

First:
**NATIVE-COLLISION-PROBE-01**
- reuse the existing Phase 3B source/transcript/result;
- compare with a strong native/general baseline;
- no new 知而能讲 live provider call;
- determine whether the narrower diagnostic layer offers any value over generic current tools.

If that comparison shows no meaningful diagnostic advantage:
- Pivot/Stop diagnostic productization;
- do not build multi-source support merely because the feature sounds useful.

If there is a meaningful diagnostic/safety gap:
- proceed to build the controlled multi-source benchmark dataset/runner before product UI.

## 9. In scope for Phase 4A planning

- benchmark contract;
- synthetic/controlled source bundles;
- source role metadata in benchmark cases;
- explicit user goal metadata;
- prerequisite/severity/importance priority contract;
- conflict/arbitration expected behavior;
- evaluation metrics;
- baseline comparison design.

## 10. Out of scope until a later gate

- production multi-file upload implementation;
- arbitrary/unlimited source counts;
- source-role UI;
- conflict-resolution UI;
- dashboards;
- spaced repetition;
- retention redesign;
- further pause/filler/process-detector tuning;
- overall mastery score;
- new model/provider;
- paid/live validation without fresh authorization;
- external participant study;
- push/merge/public release.

## 11. Current state

**MASTER_HOLD**

No Codex implementation task is active.

Next smallest action:
owner approves or declines running the already-proposed `NATIVE-COLLISION-PROBE-01`.

The new Phase 4A multi-source decisions are frozen as product direction, but they do not authorize implementation.

## 12. Open product questions for the owner

1. Typical source-set scope:
   - one lecture/week/topic bundle;
   - several weeks/module;
   - whole course/semester.
   This affects retrieval and authority design more than a raw file-count limit.

2. Conflict interruption:
   Proposed default: interrupt only when a conflict can change the current diagnosis or repair priority; keep irrelevant conflicts non-blocking.
   Owner decision still needed.

3. When source roles are inferred, should the learner see/confirm the inferred roles before studying, or only when a role affects a conflict/priority decision?
   Owner decision still needed.
