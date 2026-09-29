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
- any detected source conflict should be surfaced to the learner in a lightweight way;
- if the conflict can change the current diagnosis or remediation priority, the system must not silently choose and must ask the user to arbitrate the relevant authority/interpretation before finalizing the affected judgment;
- if the conflict is not relevant to the current diagnosis/priority, it remains visible but non-blocking;
- source roles may guide context but do not authorize silent conflict resolution.

### Source roles
Default:
- infer roles automatically;
- user can correct them;
- do not require a blocking up-front confirmation step;
- inferred roles may be shown compactly / behind a small expandable control;
- ask for explicit confirmation when a role materially affects conflict handling or remediation priority.

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
**NATIVE-COLLISION-PROBE-01 — APPROVED**
- reuse the existing Phase 3B source/transcript/result;
- compare with a strong native/general baseline;
- no new 知而能讲 live provider call;
- determine whether the narrower diagnostic layer offers any value over generic current tools.

Before the native comparison, run one read-only preparation step:
**NATIVE-COLLISION-PROBE-01-PREP**
- recover the exact preserved Phase 3B confirmed learner transcript/explanation and accepted diagnosis/result from local artifacts;
- bind them to the exact source/receipt;
- do not reconstruct wording from summaries;
- do not modify product files;
- do not run Tutor/ASR/diagnosis or any live provider call;
- do not commit on the product branch.

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

**MASTER_HOLD — NATIVE-COLLISION-PROBE-01 RECONCILIATION REQUIRED**

`NATIVE-COLLISION-PROBE-01-PREP` recovered the exact local evidence successfully, but the baseline is not yet frozen.

Verified PREP facts:
- accepted local HEAD remained `20be403f7bb736ab0cde2758af7306a00c2290db`;
- tracked worktree clean;
- no product/source/test/documentation changes;
- no product commit/push/merge;
- live provider / recording / ASR / diagnosis calls this turn = 0;
- exact stored source, raw ASR text/spans, confirmed transcript and structured content reports were recovered from preserved local artifacts;
- source/export/log bindings and hashes were recovered;
- full verbatim evidence was not transported to GitHub because repository disclosure approval was not established.

Blocking discrepancy:
- canonical Phase 3B history says one content-diagnosis call;
- preserved local record contains two distinct content reports for two confirmed versions about 100 seconds apart;
- production ledger contains two temporally associated settled semantic requests;
- request-to-attempt binding is temporal rather than direct;
- MASTER must not label the second event a retry or select a baseline report without owner-history reconciliation.

Therefore:
- do not run the native baseline yet;
- do not freeze the scoring sheet against either report yet;
- do not change the historical call count yet;
- ask the owner to reconcile what actually happened during Phase 3B.

## 12. Next smallest step

Owner-history reconciliation only.

Need to determine:
1. whether the owner intentionally triggered content diagnosis once or more than once;
2. whether the learner transcript was edited/reconfirmed between the two stored report versions;
3. which result, if any, was the one the owner actually reviewed/accepted during Phase 3B.

If owner memory is insufficient, the next allowed step is another read-only local evidence comparison that reports non-sensitive structural differences between report/version 1 and report/version 2. No live calls or product changes.
