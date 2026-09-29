# ACTIVE_EXCHANGE

state: MASTER_HOLD
turn_id: PHASE4A-SCOPE-FROZEN
task: NONE
writer: CHAT_MASTER
transport_only: true
status: PHASE4A_PRODUCT_DIRECTION_FROZEN / NO_IMPLEMENTATION_DISPATCHED
accepted_base_head: 20be403f7bb736ab0cde2758af7306a00c2290db

## Current decision

Phase 3B remains CLOSED / PASS.

Phase 4A product direction has been refined and frozen for planning.

No Codex implementation task is active.

## Owner decisions captured

- portfolio / AI Product Manager evidence is primary objective;
- students are primary users;
- result priority: wrong -> missing -> repair first -> weak/uncertain -> mastery last;
- no overall mastery score required;
- multiple sources are required conceptually;
- final upload-count limit is not frozen;
- source roles should be auto-inferred and user-correctable;
- diagnosis-relevant source conflicts must be surfaced;
- user must arbitrate the relevant conflict rather than the system silently selecting;
- structured learning goal is allowed;
- remediation priority is prerequisite dependency + error severity + importance supported by source/goal;
- do not guess exam importance without evidence;
- diagnostic depth may vary by source/goal;
- process/pause evidence is de-prioritized and cannot independently prove misunderstanding.

## Collision update

Generic multi-source and evidence-first learning is already strongly represented.

Gemini Notebook publicly supports many sources, source selection, citations, automatic categorization/labels and manual label changes.

Gemini Study Notebooks already provide learning goals, diagnostic quizzes, knowledge-gap identification and ranked next-priority lessons.

Current FeynmanAI open source also covers source grounding, learner contracts, observable attempts, source selection/anchors and evidence-backed next actions.

Therefore "multi-file", "automatic categorization", "goal", "gap finding", "next action" and "evidence first" are not sufficient differentiation.

Candidate narrower product question:

> Can explicit source-authority/conflict handling make multi-source diagnostic error/omission/repair-priority judgments more reliable and trustworthy?

## Frozen Phase 4A benchmark question

`Multi-source Diagnostic Prioritization Benchmark`

Planning only.

No UI or ingestion implementation is approved.

Initial benchmark should use controlled 2–4 source bundles with ground truth and evaluate:
- errors;
- omissions;
- unsupported diagnoses;
- prerequisite/severity priority;
- source conflict surfacing;
- user authority correction;
- learning-goal sensitivity;
- abstention;
- verbose-correct / fluent-wrong robustness.

Do not invent numerical KPI pass thresholds before calibration.

## Immediate next proposed experiment

`NATIVE-COLLISION-PROBE-01`

Still awaiting explicit owner approval.

It should precede multi-source implementation:
- reuse preserved Phase 3B sample/result;
- compare to a strong native/general baseline;
- no new 知而能讲 live provider call.

No product code change.
No new recording/ASR/diagnosis.
No push/merge.

## Open owner questions

1. Typical source-set scope:
   topic/week vs module vs whole course.

2. Conflict interruption:
   proposed default is to interrupt only when conflict can change the current diagnosis or remediation priority; irrelevant conflict stays non-blocking.

3. Inferred source roles:
   show/confirm up front, or reveal only when a role affects conflict/priority.

Next action belongs to the owner / MASTER.
