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
`aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`

Commit:
`fix: make transcript replay optional for content diagnosis`

No product push/merge has been authorized or performed.

Accepted milestones:
- Batch A — correctness hygiene: accepted
- Batch B / Phase 3A — diagnostic localization architecture: accepted
- Batch C — correctness boundaries: accepted
- SETUP-FLOW-01 — source-first setup: accepted
- FILE-IMPORT-AUTO-USE-01 — small imported files auto-populate learning source: accepted
- PROCESS-EVIDENCE-FEASIBILITY-01 — long-silence + bounded short-pause-cluster process evidence: accepted
- REPLAY-REVIEW-UX-01 — optional transcript replay for content diagnosis: accepted

## 3. Phase 3B real owner validation — COMPLETED

Real owner test used:
- synthetic DOCX: OWNER_VALIDATION_01_测试材料_实验室访客规则.docx
- 1 Tutor semantic call
- 1 real microphone recording
- 1 ASR call
- 1 content-diagnosis semantic call
- retries: 0

The original live authorization is **fully consumed**.
No further live provider calls are authorized under PHASE3B-LIVE-01.

Current production ledger hash:
`1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21`

## 4. Verified real-test findings

### Content diagnosis
Real explanation captured:
- visitor must have a valid/same-day badge;
- lab open/closed state matters;
- visitor badge is valid only on the issue day / unusable the next day.

Real explanation omitted:
- 18:00 visitor-admission cutoff.

### Process evidence
Preserved original audio analysis supports:
- long near-silence about 14.54–15.42s;
- short-pause cluster about 2.26–4.14s;
- short-pause cluster about 16.08–17.24s.

Owner replay confirmed hesitation/filler around 16–18s.

The 16–18s hesitation overlaps the visitor-badge/day-validity explanation, while the content omission is the 18:00 cutoff. They do not converge on the same target, so the process evidence does not prove the missing knowledge point.

This is accepted evidence that content diagnosis and process evidence must remain separated.

## 5. REPLAY-REVIEW-UX-01 — ACCEPTED

Owner decision:
per-span transcript replay is recommended, not mandatory for content diagnosis.

Accepted behavior:
- content diagnosis can proceed after explicit confirmation of the current transcript text;
- warning remains that ASR may mishear negation/numbers/conditions/terms;
- per-span and full-audio replay remain optional for transcript review;
- playback completion remains transient UI feedback, not persisted as false proof;
- `USER_TRANSCRIPT_CONFIRMATION` records text confirmation, not playback proof;
- legacy saved origins remain compatible;
- process-candidate confirmation still requires genuine replay of that specific candidate;
- no extra provider call;
- no schema migration, model/provider, retention, or budget change.

Finalization evidence reported by Codex/Astra and accepted by MASTER:
- host browser: 52/52 PASS, 0 failures;
- host sourceSHA256 binding: 53/53 matched before staging, before commit, and after commit;
- focused deterministic suite: 36/36 PASS;
- full Node/offline suite: 151/151 PASS;
- `git diff --check` and staged diff check: PASS;
- exactly six authorized files, 47 insertions / 29 deletions;
- no post-host source/test drift;
- final tracked worktree clean; unrelated untracked artifacts left untouched;
- production ledger unchanged;
- live provider calls / recordings / ASR / diagnosis during finalization: 0;
- no product push/merge.

MASTER decision:
**REPLAY-REVIEW-UX-01 = ACCEPTED.**

## 6. Current gate — DOC-CLEANUP-PHASE3B-01

Reason:
Codex identified stale current-facing documentation that still describes Phase 3 as not executed, live allowance as unused, or predates the accepted optional-replay UX.

Approved scope is documentation-only.

In scope:
- root README;
- product README;
- other currently active/canonical/entry-point documentation that presents stale current-state claims;
- targeted search for stale current-facing statements;
- one focused local documentation commit.

Required corrections where applicable:
- Phase 3B real owner validation has completed;
- original live allowance is fully consumed;
- accepted product HEAD is `aa240f8df5da2cf249b5cd6e9d09308a5ecd1947`;
- transcript replay is optional for content diagnosis after explicit current-text confirmation;
- process-candidate confirmation still requires replay of the specific candidate;
- content/process evidence separation remains mandatory.

Do not rewrite immutable historical handoffs merely because they accurately describe an earlier point in time.

Out of scope:
- product code or test changes;
- new product behavior;
- schema / retention / model / provider / budget changes;
- new dependency/framework;
- live provider calls, recording, ASR, or diagnosis;
- product push/merge/public release.

Acceptance:
1. verify repo / branch / HEAD starts at accepted baseline;
2. identify current-facing stale docs before editing;
3. change documentation only;
4. preserve historical evidence as historical evidence;
5. targeted search confirms no known stale current-facing Phase 3 / allowance / replay requirement claims remain in active entry docs;
6. `git diff --check` PASS;
7. create one focused local documentation commit;
8. no product push/merge;
9. return CODEX_TO_CHAT through ACTIVE_EXCHANGE with changed paths, search evidence, diff summary, commit, and any unresolved ambiguity.

## 7. Codex/Astra operating model

Default:
1. read CURRENT_STATE.md / HANDOFF.md / ACTIVE_EXCHANGE.md first;
2. verify repo / branch / HEAD / tracked status;
3. inspect active product entry docs and relevant history as useful;
4. reading/analysis scope may expand across the repo;
5. implementation scope remains bounded by the current MASTER-approved task;
6. stop for scope expansion, product tradeoff, live spend, new dependency/framework/model/provider/schema/retention, destructive/high-risk action, push/merge/public release;
7. outside-scope findings return as Must Fix candidate / User Decision Needed / Future Optional / Project observations.

Authorized ACTIVE_EXCHANGE writes on meta/master-state are transport commits and are distinct from product push/merge.

## 8. Must Fix / User Decision / Future Optional

### Must Fix
- complete DOC-CLEANUP-PHASE3B-01 so current-facing docs match the accepted Phase 3B and replay state.

### User Decision Needed
- retention policy: customizable retention/default/reminders and migration semantics;
- long-term ASR migration/timing strategy before deeper dependence on current timestamp behavior;
- whether legacy paid delivery route should later be removed/deprecated/documented;
- any new live validation requires fresh explicit authorization and cost boundary;
- after documentation cleanup, whether current Phase 3B evidence is sufficient to close this validation phase.

### Future Optional
- small-step app.mjs decomposition;
- active-vs-legacy test/helper index;
- handoff-kit fallback documentation;
- broader consented offline natural-speech evaluation;
- synthetic portfolio demo;
- replay-burden measurement after UX change.

## 9. Verified / Likely / Unknown

Verified:
- Phase 3B real flow completed with 1 Tutor + 1 ASR + 1 diagnosis and 0 retries;
- original Phase 3B live allowance is fully consumed;
- content/process separation worked on the real sample;
- accepted short-pause detector can surface the owner-confirmed hesitation on preserved audio;
- REPLAY-REVIEW-UX-01 passed host-bound and deterministic finalization evidence and is accepted at `aa240f8...`.

Likely:
- current Phase 3B evidence is sufficient to support a formal phase-closure decision after documentation consistency is restored.

Unknown:
- natural-speech detector sensitivity/specificity at scale;
- long-term usefulness across courses/users;
- final retention policy;
- final ASR migration choice;
- whether Phase 3B should formally close until DOC-CLEANUP-PHASE3B-01 returns.

## 10. Next smallest step

Codex/Astra performs DOC-CLEANUP-PHASE3B-01 only, commits documentation locally, and returns CODEX_TO_CHAT.

No new live experiment or new productization feature is authorized.
