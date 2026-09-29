# CURRENT_STATE — Chat ↔ Codex Handoff / 知而能讲

Updated: 2026-09-29
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
`bdd0635597006881d6f8f7213122ae53ccbc99a9`

Commit:
`feat: add bounded short-pause process evidence`

No product push/merge has been authorized or performed.

Accepted milestones:
- Batch A — correctness hygiene: accepted
- Batch B / Phase 3A — diagnostic localization architecture: accepted
- Batch C — correctness boundaries: accepted
- SETUP-FLOW-01 — source-first setup: accepted
- FILE-IMPORT-AUTO-USE-01 — small imported files auto-populate learning source: accepted
- PROCESS-EVIDENCE-FEASIBILITY-01 — long-silence + bounded short-pause-cluster process evidence: accepted

## 3. Phase 3B real owner validation — COMPLETED

Real owner test used:
- synthetic DOCX: OWNER_VALIDATION_01_测试材料_实验室访客规则.docx
- 1 Tutor semantic call
- 1 real microphone recording
- 1 ASR call
- 1 content-diagnosis semantic call
- retries: 0

Therefore the original max-3-call live authorization is **fully consumed**.
No further live provider calls are authorized under PHASE3B-LIVE-01.

Current production ledger hash after completed live validation:
`1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21`

## 4. Verified real-test findings

### Content diagnosis
Real explanation successfully captured:
- visitor must have a valid/same-day badge;
- lab open/closed state matters;
- visitor badge is valid only on the issue day / unusable the next day.

Real explanation omitted:
- 18:00 visitor-admission cutoff.

### Process evidence
Old stored attempt originally contained:
- near-silence candidate about 14.54–15.42s.

Owner replay confirmed hesitation/filler around 16–18s.

Zero-provider reanalysis of the preserved original audio showed the accepted detector would derive:
- long near-silence about 14.54–15.42s;
- short-pause cluster about 2.26–4.14s;
- short-pause cluster about 16.08–17.24s.

Important interpretation:
- the 16–18s process hesitation overlaps the visitor-badge/day-validity explanation;
- the content omission is the 18:00 cutoff;
- those do **not** converge on the same target;
- therefore there is no evidence to claim the hesitation proves the missing 18:00 knowledge point.

This is a successful validation of evidence separation.

## 5. Accepted process-evidence model

Current accepted detector:
- existing internal continuous near-silence >=0.7s;
- bounded `short_pause_cluster_candidate`;
- 20ms frames / RMS threshold 0.008;
- at least 3 qualifying gaps of 0.12..0.50s;
- >=0.60s qualifying quiet total;
- candidate span 0.8..2.0s;
- >=0.30s above-threshold activity between gaps;
- long silence breaks a cluster;
- candidate remains UNVALIDATED_ACTIVITY;
- human replay required before saving process evidence.

Explicit non-capabilities:
- no lexical “额/嗯” detector;
- no confidence/anxiety/personality/accent/global fluency inference;
- no PTE-style score;
- no process-only knowledge judgment.

## 6. Current uncommitted task — REPLAY-REVIEW-UX-01

Owner decision:
per-span replay should be recommended, not a hard prerequisite for content diagnosis.

Codex/Astra implemented this on top of accepted HEAD, but it is **uncommitted pending host browser verification**.

Exact modified files:
- study-teachback-app/app.mjs
- study-teachback-app/core.mjs
- study-teachback-app/index.html
- study-teachback-app/correctness-boundaries.test.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs

Implemented behavior:
- removes content diagnosis hard gate requiring every span to be replayed;
- diagnosis uses the current explicit transcript confirmation;
- warning remains that ASR may mishear negation/numbers/conditions/terms;
- per-span/full-player replay remain optional;
- replay completion is transient UI feedback, not falsely persisted;
- transcript confirmation uses `USER_TRANSCRIPT_CONFIRMATION` rather than pretending the user replay-corrected;
- old saved origins remain untouched;
- process-candidate confirmation still requires replay of that specific candidate;
- no extra provider call;
- no schema migration/model/provider/retention/budget change.

Fresh deterministic evidence:
- focused: 36/36 PASS
- full Node/offline: 151/151 PASS
- browser syntax: PASS
- git diff --check: PASS
- production ledger unchanged
- live API / ASR / recording: 0

Codex browser result:
- blocked before application cases by known Edge GPU/CDP sandbox failure;
- therefore NOT a browser PASS.

Current result:
**HOST PASS / FINALIZATION PENDING**

## 7. Current gate

Owner host browser validation has PASSed outside Codex sandbox for the current uncommitted REPLAY-REVIEW-UX-01 bytes.

Owner screenshot confirms:
- all visible browser cases PASS;
- wrapper exit 0;
- error null;
- production ledger before/after identical;
- unchanged=true.

Exact total browser case count and sourceSHA256 binding must be read from the fresh receipt by Astra before commit.

Next: final project-aware self-review and focused local commit only if there is no post-host source/test drift. Any post-host source/test edit requires fresh host reverify.

## 8. Codex/Astra operating model

Default for future Codex turns:
1. read CURRENT_STATE.md / HANDOFF.md / ACTIVE_EXCHANGE.md first;
2. verify repo / branch / HEAD / tracked status;
3. inspect active product entry docs and recent relevant history as useful;
4. autonomously expand **reading/analysis scope** across the repo when needed;
5. implementation scope remains bounded by the current MASTER-approved task;
6. inside approved scope, Astra may analyze -> design -> implement -> test -> self-review -> iterate;
7. stop if the same failure signature survives 3 meaningful fix/test cycles;
8. stop for scope expansion, product tradeoff, live spend, new dependency/framework/model/provider/schema/retention, destructive/high-risk action, push/merge/public release;
9. outside-scope findings return as Must Fix candidate / User Decision Needed / Future Optional / Project observations.

Authorized `ACTIVE_EXCHANGE.md` writes on meta/master-state are transport commits and are distinct from product push/merge.

## 9. Must Fix / User Decision / Future Optional

### Must Fix
- finish REPLAY-REVIEW-UX-01 host verification and finalization;
- reconcile stale root/product README and historical canonical text that still says Phase 3 was not run or allowance unused.

### User Decision Needed
- retention policy: customizable retention/default/reminders and migration semantics;
- long-term ASR migration/timing strategy before deeper dependence on current timestamp behavior;
- whether legacy paid delivery route should later be removed/deprecated/documented;
- any new live validation requires fresh explicit authorization and cost boundary.

### Future Optional
- small-step app.mjs decomposition;
- active-vs-legacy test/helper index;
- handoff-kit fallback documentation;
- broader consented offline natural-speech evaluation;
- synthetic portfolio demo;
- replay-burden measurement after UX change.

## 10. Verified / Likely / Unknown

Verified:
- Phase 3B real flow completed with 1 Tutor + 1 ASR + 1 diagnosis and 0 retries;
- content/process separation worked on the real sample;
- accepted short-pause detector can surface the owner-confirmed hesitation on preserved audio;
- REPLAY-REVIEW-UX-01 Node/offline tests pass.

Likely:
- optional replay UX is the correct owner direction and is internally coherent.

Unknown:
- exact fresh host browser case count/source-hash binding until Astra reads the receipt;
- natural-speech detector sensitivity/specificity at scale;
- long-term usefulness across courses/users;
- final retention policy;
- final ASR migration choice.

## 11. Next smallest experiment

Astra reads the fresh host receipt/source hashes, performs final project-aware self-review, and creates one focused local commit if unchanged. No live provider calls.
