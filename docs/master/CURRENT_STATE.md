# Current State

Updated: 2026-09-29 — SETUP-FLOW-01 MASTER-ACCEPTED / Phase 3B owner live checkpoint next
Role: 00 MASTER / authoritative dynamic state

## 1. Active product / version

Product: **知而能讲** — Study-first + in-app teach-back.

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Accepted local feature baseline:
`89c23a155ac7c32e6357b33144edf93bd9850309`

Commit:
`feat: make learning setup source-first`

Accepted sequence:
- Batch A: MASTER-ACCEPTED
- Batch B / Phase 3A: MASTER-ACCEPTED
- Batch C / correctness boundaries: MASTER-ACCEPTED
- SETUP-FLOW-01: **MASTER-ACCEPTED**

No product push/merge is authorized or performed.

## 2. SETUP-FLOW-01 acceptance

Base:
`ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2`

Final local commit:
`89c23a155ac7c32e6357b33144edf93bd9850309`

Exactly 9 product/test files committed:
- `study-teachback-app/app.mjs`
- `study-teachback-app/browser-tests-r4.mjs`
- `study-teachback-app/core.mjs`
- `study-teachback-app/index.html`
- `study-teachback-app/provenance.test.mjs`
- `study-teachback-app/run-offline-tests.mjs`
- `study-teachback-app/schemas.mjs`
- `study-teachback-app/server.mjs`
- `study-teachback-app/setup-flow.test.mjs`

Final diff:
112 insertions / 16 deletions.

Accepted evidence:
- focused setup-flow: 9/9 PASS;
- full Node/offline: 123/123 PASS;
- fresh host browser outside Codex sandbox: **50/50 PASS**;
- host wrapper exit 0;
- 51/51 host sourceSHA256 entries matched current files before staging, before commit and after commit;
- no product/test source changed after host browser validation;
- git diff checks PASS;
- tracked worktree CLEAN;
- production ledger SHA unchanged;
- live provider calls 0;
- physical microphone 0;
- incremental exposure 0.

MASTER independently verified the finalization meta reply changed only:
`docs/master/ACTIVE_EXCHANGE.md`.

## 3. Accepted source-first setup behavior

Required user input:
- learning source/material only.

Title:
- file import: locally derived from filename without final extension;
- direct paste: first meaningful non-empty line;
- local fallback: `学习材料`;
- manual title is optional metadata, never required to Start/Learn;
- no AI/provider call is used for title generation.

Optional setup context:
- `这次重点想学什么？（可选）`
- `已经掌握了什么？（可选）`

Semantics:
- stored as setupContext metadata;
- not inserted/rendered as `role=user` history;
- focus guides emphasis;
- known is owner self-report, not proof of mastery;
- supplied source remains authoritative;
- no extra provider call is introduced.

Legacy topics without setupContext receive empty defaults.

## 4. Phase 3B live authorization

Owner authorization remains valid and fully unused:
- maximum 3 provider calls total;
- zero retries;
- incremental local exposure ceiling US$0.03432;
- one real recording maximum.

Known pre-live ledger snapshot remains:
- 41 reservations;
- 1 attempt;
- 15 reserved minutes;
- 164237 / 61328 reserved input/output;
- known cost US$0.01399455;
- exposure US$0.07080205;
- 4 unsettled;
- SHA `d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

No live allowance has been consumed by A/B/C/setup-flow work.

## 5. Phase 3B execution boundary

Real browser/microphone work is owner-driven outside Codex sandbox.

For the first live checkpoint:
- use a new clean topic;
- prefer the actual synthetic DOCX file import path to validate intended file-first UX;
- leave both optional setup-context fields empty in this first live experiment to avoid adding another experimental variable;
- one normal Tutor/Learn call if the clean flow requires it;
- one 20–45 second natural Mandarin explanation with no prompt assistance;
- exactly one ASR submission;
- replay and transcript review;
- STOP before content diagnosis.

The remaining content-diagnosis semantic call is reserved until MASTER reviews the replay/transcript checkpoint.

## 6. Owner manual material

Use:
`OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`

Expected source semantics:
- completed registration is necessary but not sufficient;
- same-day visitor badge is required;
- lab must be open;
- badge is valid only on issue day;
- no visitor admission after 18:00.

Prompt for the owner explanation:
`为什么完成注册不等于一定可以进入实验室？`

Do not memorize/read a supplied answer.

## 7. GitHub exchange / Astra autonomy

Canonical authority:
- `CURRENT_STATE.md`
- `HANDOFF.md`

Transport:
- `ACTIVE_EXCHANGE.md`

Authorized ACTIVE_EXCHANGE replies on `meta/master-state` are transport commits and are distinct from product push/merge.

Codex/Astra may iterate freely inside an approved scope through analysis, implementation, testing and self-review.

Mandatory return to MASTER when:
- same failure signature survives three meaningful fix/test cycles;
- scope/product tradeoff changes;
- unapproved spend/live call is needed;
- new dependency/framework/model/provider/schema/retention policy is needed;
- destructive/high-risk action is needed;
- push/merge/public release is needed;
- next change would be speculative.

MASTER/GPT-5.6 retains product scope, freshness checks and final acceptance.

## 8. Retained backlog

User decisions later:
- portable fixed synthetic audio fixture / clean-clone reproducibility;
- atomic ledger persistence/recovery;
- historical helper/live entrypoint lifecycle;
- retention/export/recovery policy;
- long-term ASR migration.

Future optional:
- small-step app decomposition;
- active-vs-legacy helper/test index;
- handoff-kit documented as fallback;
- focused diagnostic UX;
- synthetic portfolio demo;
- replay-burden measurement.

None blocks the current live checkpoint.

## 9. Classification

Completed:
- engineering corrections through SETUP-FLOW-01;
- GitHub relay;
- project-wide Codex review;
- host browser validation.

Ready / WAITING OWNER:
- Phase 3B live flow through replay/transcript checkpoint.

Not Done:
- real Tutor/ASR checkpoint;
- live content diagnosis;
- real usefulness / false-inference / replay-burden validation;
- long-term ASR migration;
- retention decisions;
- product push/merge/final product acceptance.

## 10. Next smallest step

Owner starts the accepted product outside Codex sandbox, imports the synthetic DOCX into a new clean topic without manually entering a title, performs one natural recording and one ASR, reviews replay/transcript, then stops and returns the checkpoint to MASTER.


## SETUP-FLOW-01 MASTER acceptance — 2026-09-29

Final local commit: `89c23a155ac7c32e6357b33144edf93bd9850309` (`feat: make learning setup source-first`).

MASTER accepts SETUP-FLOW-01 based on: focused 9/9 PASS; Node/offline 123/123 PASS; host browser 50/50 PASS; 51/51 host source hashes matched before staging/commit/after commit; no post-host source/test drift; final tracked worktree CLEAN; zero live provider/microphone/exposure; no model/provider/retention/schema/cap/dependency change.

Accepted behavior: source material alone is sufficient to start; file import title derives locally from filename; direct-paste title derives locally from first meaningful line; fallback title is `学习材料`; optional focus/known are setup metadata rather than role=user history; known is owner self-report rather than mastery evidence; no extra provider call is introduced.

New accepted local baseline is `89c23a155ac7c32e6357b33144edf93bd9850309`.

PHASE3B-LIVE-01 remains authorized and unused. The next owner checkpoint should use the actual synthetic DOCX file import path, no manual title, optional focus/known left blank, one Learn/Tutor call at most, one natural 20–45 second recording, exactly one ASR, then stop at replay/transcript before diagnosis.


## FILE-IMPORT-AUTO-USE-01 — new Must Fix from live owner setup

Owner attempted the accepted source-first flow with the synthetic DOCX.

Observed UI:
- file extraction completed successfully;
- preview contained the document text;
- preview showed selected count = 0;
- the actual learning-source textarea remained 0 / 5,000;
- top notice said to first place material into the learning round;
- Start/Learn therefore remained a local validation no-op.

No Tutor/provider call was dispatched, so PHASE3B-LIVE-01 still has 0 calls and 0 incremental exposure consumed.

Owner product requirement is stricter than the current implementation:
- uploading a small supported file should itself make the parsed material ready for learning;
- the user should not need a second “use all text” action for a file already fully parsed and within the source-size limit.

Decision:
- for imported/extracted text whose normalized full text length is <= 5,000 characters, automatically place the full extracted text into the learning source after successful extraction and derive title from filename;
- keep preview visible for transparency/edit/reselection;
- preserve manual selected-text override if the user intentionally wants a subset;
- for extracted text > 5,000 characters, do not silently truncate or auto-pick an arbitrary chunk; require explicit selection/subset and show a clear local notice;
- direct-paste behavior remains unchanged;
- no AI/provider call for this behavior.

Status: FILE-IMPORT-AUTO-USE-01 READY / DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO LIVE API.

Phase3B remains paused until this owner-observed setup friction is corrected and verified.


## FILE-IMPORT-AUTO-USE-01 recovered result — 2026-09-29

Codex returned NEEDS_HOST_VERIFY.

Verified relay:
- dispatch commit: 30b01fdd50f375e89c32be16a693b3908ad6602a;
- response changed only docs/master/ACTIVE_EXCHANGE.md.

Local implementation state:
- base/final HEAD remains 89c23a155ac7c32e6357b33144edf93bd9850309;
- changes remain uncommitted;
- changed files:
  - study-teachback-app/app.mjs
  - study-teachback-app/browser-tests-r4.mjs
  - study-teachback-app/run-offline-tests.mjs
  - new study-teachback-app/file-import-auto-use.test.mjs

Implemented behavior:
- extracted full text length 1..5000 auto-populates the actual learning source after successful extraction;
- filename-derived title remains local;
- preview remains visible;
- user can still intentionally override with a selected subset;
- extracted text >5000 is not silently truncated or auto-chunked and requires explicit subsection selection;
- direct paste and setupContext behavior remain unchanged;
- no provider call is added during extraction.

Fresh deterministic evidence:
- focused import suite: 8/8 PASS;
- full Node/offline: 131/131 PASS;
- git diff --check: PASS;
- browser syntax check PASS;
- production ledger SHA unchanged;
- live provider calls 0;
- microphone 0;
- incremental exposure 0.

Codex browser attempt was environment-blocked before application cases by the known Windows Codex sandbox Edge/CDP limitation.

Therefore FILE-IMPORT-AUTO-USE-01 is pending one host-side browser validation before final commit/MASTER acceptance.


## FILE-IMPORT-AUTO-USE-01 host browser result

Owner reports the host browser regression `browser file-import-auto-use-01` PASSed outside Codex sandbox. This clears the browser-validation gate for the unchanged current worktree, pending Astra receipt/hash verification before commit.

Owner also observed an occasional audible Chinese phrase during the browser regression, approximately about moist soil / watering. MASTER inspected the main product files `app.mjs`, `index.html`, and `server.mjs` on the product branch and found no `speechSynthesis`/TTS API usage and no matching phrase text. Because the browser suite intentionally exercises replay/media paths, the leading hypothesis is synthetic test-media playback rather than product-generated speech. This must be verified from the test fixture/artifacts before classification.
