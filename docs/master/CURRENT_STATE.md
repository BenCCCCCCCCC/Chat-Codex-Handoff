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
- Tutor 1 / real recording 1 / ASR 1; exact historical diagnosis-call count is under reconciliation because two preserved diagnosis submissions/results were recovered;
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

## 11. Diagnosis UX audit — ACCEPTED

Read-only audit result:
- two preserved transcript versions contain identical final transcript content;
- the versions were reconfirmed about 100 seconds apart;
- two distinct diagnosis reports coexist;
- report 1: 2 supported findings;
- report 2: 2 supported + 1 missing finding;
- two settled semantic requests are strongly time-associated with the two reports;
- direct request-ID -> report binding is not stored;
- exact owner intent remains unknown.

MASTER interpretation:
- do not describe the second event as a retry;
- do not keep claiming a verified single diagnosis call;
- same-input result variance is itself relevant evidence for Phase 4 evaluation;
- future native comparison must not cherry-pick the more favorable preserved report.

Verified current UX issues:
- diagnosis button is not disabled or relabelled while processing;
- transcript textareas remain editable while the submitted snapshot is pending;
- pending edits can be overwritten on success rerender;
- completed result is not visually/version-bound strongly enough;
- editing transcript after a result does not mark that result stale;
- unchanged text can be reconfirmed into a new version and spend another diagnosis call;
- no explicit re-diagnosis state/label exists;
- older report versions are persisted but hidden by latest-version filtering;
- existing in-flight lock prevents simultaneous duplicate dispatch but is not durable idempotency.

## 12. Current gate — DIAGNOSIS-STATE-UX-01

MASTER decision:
The P1 diagnosis-state UX defects are now a real observed product problem and may be fixed before the Phase 4 native comparison.

Approved minimal behavior:
1. before request: explicit confirmed/current transcript state;
2. on submit: synchronously disable diagnosis action and make submitted transcript fields readonly;
3. show local adjacent state such as "诊断中…" rather than relying on the global notice;
4. after success: clear "诊断完成" state and a strong current-result entry;
5. keep the result on the same page; use focus/scroll to a focusable result heading when appropriate;
6. no mandatory full-page transition;
7. subtle motion/spinner may reinforce state but must respect reduced-motion and never replace text state;
8. bind the visible result to the confirmed transcript version/time;
9. if transcript text changes, mark the prior result stale and disable/qualify actions that would falsely imply it applies to the new draft;
10. CTA becomes explicit "确认修改并重新诊断" only when content differs from the confirmed version;
11. if the learner edits and then returns exactly to the confirmed text, reuse the existing current result;
12. unchanged text must not create a new version/request by default;
13. preserve prior result for inspection while a new diagnosis is pending/fails.

Implementation boundary:
- P1 local interaction/state only;
- no durable cross-tab/reload idempotency contract;
- no schema/storage migration;
- no provider/ledger contract change;
- no new model/provider;
- no live calls;
- no full version-history productization beyond the minimum current/stale version label;
- no Phase 4 multi-source implementation.

Required tests should be zero-provider and cover at least:
- rapid/double activation while pending;
- transcript readonly while pending;
- dirty -> stale;
- dirty -> revert -> current/reuse;
- unchanged completed click does not dispatch;
- explicit changed-text re-diagnosis path;
- prior-result retention during pending/failure;
- keyboard activation through the same guarded state;
- result completion focus/visibility behavior where testable;
- no extra provider call in deterministic tests.

If browser execution is blocked in Codex sandbox, return the deterministic result and request host verification rather than claiming browser PASS.

## 13. Native-collision probe status

`NATIVE-COLLISION-PROBE-01` remains OWNER APPROVED but paused until DIAGNOSIS-STATE-UX-01 is reviewed.

The native comparison will later treat same-input output stability as an evaluation dimension; the two preserved product reports must not be silently collapsed to whichever is more favorable.

No new live product diagnosis is authorized.
