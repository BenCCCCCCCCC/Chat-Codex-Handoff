# HANDOFF — NEW MASTER CHAT START

Updated: 2026-09-30
Purpose: current authoritative product handoff.

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Canonical branch:
`meta/master-state`

Read in order:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/master/ACTIVE_EXCHANGE.md`

## Accepted baseline

Active product:
**知而能讲**

Local repo:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Accepted local HEAD:
`20be403f7bb736ab0cde2758af7306a00c2290db`

Behavior baseline:
`aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`

Phase 3B:
**CLOSED / PASS for bounded feasibility.**

No product push/merge authorized.
Original Phase 3B live allowance is fully consumed.

## Current product objective

Portfolio / AI Product Manager evidence first.

Primary user:
students.

Desired feedback order:
1. what is wrong;
2. what is missing;
3. what to repair first;
4. possible weak/uncertain areas;
5. avoid unsupported global mastery claims.

No overall mastery score is currently required.

## Phase 4 collision result

Generic AI tutoring / teach-back / multi-source learning is heavily collided.

Current products already cover combinations of:
- uploaded materials;
- multiple sources;
- source-grounded citations;
- learning goals;
- diagnostic quizzes;
- knowledge-gap identification;
- next-priority recommendations;
- teach-back;
- voice;
- source selection;
- automatic source categorization.

Do not build generic multi-file or teach-back features as differentiation.

## Frozen Phase 4 product direction

Candidate narrow differentiator:

**multi-source diagnostic reliability under explicit source authority and conflict.**

Owner decisions:
- support multiple sources conceptually;
- typical scope can be topic/week or several weeks/module depending on the learner; whole-course/semester is not the default target;
- source roles auto-inferred, user-correctable, shown compactly/expandably rather than requiring blocking up-front confirmation;
- every detected source conflict is surfaced;
- diagnosis-relevant conflicts require user arbitration before the affected diagnosis/priority is finalized;
- irrelevant conflicts remain visible but non-blocking;
- structured learning goal is allowed;
- repair priority = prerequisite dependency + severity + source/goal-supported importance;
- no guessed exam importance without evidence;
- diagnostic resolution can vary by source/goal; default standard depth is acceptable later;
- conclusion-first result;
- process evidence is de-prioritized and cannot independently prove a knowledge gap.

## Phase 4A

Name:
`Multi-source Diagnostic Prioritization Benchmark`

This is currently a **frozen product question, not an implementation task**.

Hypotheses:
- distinguish error / omission / no issue;
- choose repair priority correctly;
- surface diagnosis-relevant source conflicts instead of silently resolving;
- adapt valid priority/depth to learning goal;
- do not convert speaking style/hesitation into knowledge judgment.

Initial benchmark:
- controlled ground-truth cases;
- 2–4 sources per case;
- multi-source consistency/complementarity/conflict;
- prerequisite/severity priority;
- same source set with different goals;
- verbose-correct vs fluent-wrong;
- insufficient evidence / abstention;
- user correction of inferred source role.

Metrics:
error/omission precision-recall, unsupported diagnosis, conflict surfacing, silent conflict resolution, top remediation priority, goal sensitivity, false process inference, traceability, abstention.

Do not freeze numerical KPI thresholds until a calibration run exists.

## Diagnosis UX audit

The read-only audit is complete.

Verified:
- the two preserved transcript versions have identical final transcript content;
- they were reconfirmed about 100 seconds apart;
- two distinct diagnosis reports coexist and differ;
- current UX allows completed same-text resubmission after the in-flight lock releases;
- diagnosis CTA/loading/completion/stale-version states are not explicit enough;
- transcript remains editable while request is pending and unsaved typing can be overwritten;
- current result is not marked stale after transcript edits.

Do not call the second historical submission a retry.
Do not claim a verified single diagnosis call.

## Active task

`DIAGNOSIS-STATE-UX-01`

This is a bounded P1 interaction-state fix.

Implement only:
- disabled + local busy diagnosis state;
- readonly submitted transcript while request pending;
- explicit diagnosis-complete state;
- strong same-page result entry with focus/scroll as appropriate;
- current result bound visibly to confirmed transcript version/time;
- dirty/stale state after edits;
- explicit changed-text re-diagnosis action;
- unchanged-text result reuse / no new request;
- prior-result retention during pending/failure;
- zero-provider tests.

Do not implement:
- durable cross-tab/reload idempotency;
- schema/storage migration;
- provider/ledger contract changes;
- full version-history product;
- full-page result navigation;
- Phase 4 multi-source features;
- live provider calls;
- push/merge.

After this task returns, MASTER reviews the delta before resuming `NATIVE-COLLISION-PROBE-01`.
