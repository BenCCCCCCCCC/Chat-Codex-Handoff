# Active Handoff — FILE-IMPORT-AUTO-USE-01

Updated: 2026-09-29
Role: 00 MASTER
Status: DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO LIVE API / BOUNDED FILE-IMPORT UX FIX

## 1. Binding

Repo:
F:\Chat-Codex-Handoff\validation-repo

Branch:
prototype/study-teachback-v0.1

Expected base HEAD:
89c23a155ac7c32e6357b33144edf93bd9850309

Tracked worktree must be CLEAN before editing.

## 2. Owner-observed defect

On the accepted setup flow, owner uploaded:
OWNER_VALIDATION_01_测试材料_实验室访客规则.docx

Extraction completed and preview showed the document, but:
- preview selection count remained 0;
- the actual learning-source textarea remained empty;
- Start/Learn returned the local “put material into this learning round first” validation;
- owner had to understand that an extra “use all text” click was required.

This violates the intended file-first flow.

The failed click caused 0 provider calls.

## 3. Required behavior

### F1 — small imported files auto-use full extracted text

After successful extraction, if normalized extracted full text length is <= 5,000:
- automatically set the learning source to the full extracted text;
- keep the extracted preview visible;
- derive title locally from filename as already accepted;
- update source character count;
- Start/Learn should work without clicking “use all text” or selecting preview text.

Do not trigger any provider call at extraction time.

### F2 — large imported files remain explicit

If extracted full text length > 5,000:
- do not silently truncate;
- do not automatically choose the first 5,000;
- do not use AI chunking;
- keep preview and selected-text flow;
- clearly tell the user that the material is over the current learning-round limit and they must select a subsection up to 5,000 characters.

### F3 — manual override remains possible

Even when a <=5,000 file auto-populates the source:
- user may still select a subset from preview and replace the source intentionally;
- clearing preview/source behavior remains coherent;
- no duplicate source insertion.

### F4 — provenance/setup behavior

Preserve:
- source identity/title behavior;
- setupContext focus/known metadata;
- setup context does not become role=user;
- first real user message provenance;
- file parsing remains local;
- no extra provider request.

### F5 — tests

First reproduce the owner-observed state with a deterministic file-import harness if practical:
successful extraction + preview populated + source empty before manual use-all.

Add/adjust zero-call coverage for:
- imported file extracted text length 1..5000 -> source auto-populated;
- exactly 5000 -> auto-populated;
- 5001+ -> source not silently truncated/auto-used; explicit selection notice;
- filename-derived title still correct;
- source count updates;
- manual selected-text override after auto-use;
- clear preview/source behavior;
- direct paste unaffected;
- existing setup-flow/provenance regressions remain green;
- no extra provider dispatch.

Run focused tests + applicable full Node/offline.

Run browser stub suite if possible; if blocked inside Codex sandbox, return NEEDS_HOST_VERIFY and leave product changes uncommitted.

git diff --check required.

## 4. Astra autonomy

Astra may inspect, design, implement, test, self-review and iterate freely inside FILE-IMPORT-AUTO-USE-01 scope.

No fixed pass limit.

Stop if:
- same failure signature survives three meaningful fix/test cycles;
- scope expands into automatic document chunking/summarization;
- new dependency/provider/model/schema/retention policy is required;
- live/paid calls would be needed;
- next change would be speculative.

## 5. Scope protection

Do not:
- redesign the entire onboarding;
- add AI chunking/title generation;
- change 5,000 source limit in this task;
- change model/provider/budget/retention;
- add dependency;
- resume Phase3B;
- push/merge.

One focused local commit is allowed only after required validation is complete.

## 6. Exchange return

Write only meta/master-state/docs/master/ACTIVE_EXCHANGE.md with CODEX_TO_CHAT.

Include:
- base/final HEAD and commit status;
- exact changed files;
- reproduction evidence;
- implementation summary;
- focused/Node/browser results;
- zero-live-call evidence;
- whether host browser verification is required;
- self-review findings;
- Tests Not Run / Unknown / Blocking / User Decision Needed / Future Optional.

If host verification is required, do not create the final product commit before that host evidence.

Do not modify CURRENT_STATE.md or HANDOFF.md.
