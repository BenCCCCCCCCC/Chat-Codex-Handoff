# Current State

Updated: 2026-09-29 — Batch C MASTER-ACCEPTED / Phase 3B owner checkpoint next
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
`ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2`

Commit message:
`fix: harden learning confirmation and budget boundaries`

Batch A: MASTER-ACCEPTED.
Batch B / Phase 3A: MASTER-ACCEPTED.
Batch C / CORRECTNESS-BOUNDARIES-01: **MASTER-ACCEPTED**.

No product push/merge has been authorized or performed.

## 2. Batch C final acceptance

Base:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Final local commit:
`ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2`

Exactly seven Batch C files were committed:
- `study-teachback-app/app.mjs`
- `study-teachback-app/browser-tests-r4.mjs`
- `study-teachback-app/core.mjs`
- `study-teachback-app/correctness-boundaries.test.mjs`
- `study-teachback-app/correctness-hygiene.test.mjs`
- `study-teachback-app/run-offline-tests.mjs`
- `study-teachback-app/server.mjs`

Final diff:
171 insertions / 12 deletions.

Accepted evidence:
- MF-01 reproduced and fixed.
- MF-02 reproduced and fixed.
- MF-03 reproduced and fixed.
- focused correctness suite: 11/11 PASS.
- full isolated Node/offline suite: 114/114 PASS.
- host browser r4 suite outside Codex sandbox: 46/46 PASS.
- MF-02 delayed-diagnosis/double-confirm browser case PASS.
- git diff checks PASS.
- 50/50 host source hashes matched before staging, before commit and after commit.
- no code/test drift after host browser validation.
- final tracked worktree CLEAN.
- production ledger SHA unchanged.
- live provider calls 0.
- physical microphone 0.
- incremental exposure 0.
- no model/provider/retention/schema/cap/dependency change.

MASTER independently verified the meta exchange reply after dispatch changed only:
`docs/master/ACTIVE_EXCHANGE.md`.

## 3. Batch C fixes now in accepted baseline

### MF-01
Tutor output/history contract is consistent at 4000 characters for accepted assistant messages and re-input assistant history, while aggregate request/input guards remain bounded.

### MF-02
Content confirmation is mutually exclusive before transcript-version mutation. Repeated confirmation while save/diagnosis is pending cannot create an extra correction or second dispatch; the first report stays visible/current.

### MF-03
Unreadable ledger state returns controlled `503 BUDGET_UNAVAILABLE`, paid routes fail closed, the server remains available, and the UI no longer silently displays stale budget text.

## 4. Operating model — proactive Codex/Astra self-review

Within explicit MASTER scope, Codex/Astra may:
- analyze and recommend;
- implement;
- identify edge cases;
- run tests;
- review its own diff;
- perform up to two in-scope self-correction passes;
- return extra recommendations separately.

Codex must stop for MASTER/owner if:
- scope expands;
- a product tradeoff appears;
- new spend/live actions are required;
- new dependency/framework/model/provider/schema/retention policy is required;
- push/merge/public release/high-risk/data-loss action is needed;
- blocker persists after bounded self-correction;
- next change would be speculative.

MASTER / GPT-5.6 remains responsible for scope, freshness, independent review, classification and final acceptance.

## 5. GitHub exchange

Single-file relay is accepted for the current serial workflow.

Authority:
- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

Transport only:
- `docs/master/ACTIVE_EXCHANGE.md`

Supported states:
- `CHAT_TO_CODEX`
- `CODEX_TO_CHAT`
- `WAITING_OWNER`

Codex may write only ACTIVE_EXCHANGE on the meta branch unless a later explicit authorization says otherwise.

## 6. Phase 3B authorization

The owner previously authorized PHASE3B-LIVE-01:
- maximum 3 provider calls;
- zero retries;
- incremental local exposure ceiling US$0.03432;
- one real recording maximum.

This authorization remains valid and fully unused.

Current known ledger before live use:
- reservations 41;
- attempts 1;
- reserved minutes 15;
- reserved input/output 164237 / 61328;
- known settled estimate US$0.01399455;
- exposure US$0.07080205;
- unsettled 4;
- ledger SHA `d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

Host browser smoke outside Codex sandbox already PASS.

## 7. Phase 3B execution model

Real browser/microphone work must be owner-driven in a normal Windows session outside Codex sandbox.

Use:
- normal PowerShell to start local server;
- fresh isolated Edge profile already validated;
- canonical synthetic laboratory-visitor-rules source;
- one 20–45 second natural Mandarin explanation;
- no prompt assistance;
- exactly one ASR submission;
- stop at replay/transcript checkpoint before diagnosis.

At the checkpoint the owner returns to MASTER with:
- raw transcript;
- corrected transcript if ASR misheard anything;
- screenshot if useful;
- whether original audio saved;
- whether replay works;
- any critical uncertainty in negation/numbers/conditions/terms.

Do not click/trigger content diagnosis until MASTER reviews the checkpoint unless the canonical handoff explicitly says otherwise.

This preserves the remaining semantic diagnosis call for a controlled second step.

## 8. Product-wide review backlog retained

User Decision Needed later:
- portable synthetic audio fixture / clean-clone reproducibility;
- atomic ledger persistence/recovery;
- historical helper/live entrypoint lifecycle;
- retention/export/recovery policy;
- long-term ASR migration.

Future Optional:
- small-step app.mjs decomposition;
- active-vs-legacy test/helper index;
- handoff-kit documented as fallback behind GitHub exchange;
- focused diagnostic UX;
- synthetic portfolio demo;
- replay burden measurement.

None blocks the owner Phase 3B checkpoint now.

## 9. Classification

Completed:
- Batch A/B/C engineering corrections and validation;
- GitHub exchange relay;
- project-wide Codex review;
- outside-sandbox host browser validation.

Ready / Waiting Owner:
- Phase 3B owner-led recording through replay/transcript checkpoint.

Not Done:
- real ASR checkpoint;
- content diagnosis live call;
- real usefulness/replay-burden assessment;
- long-term ASR migration;
- retention decisions;
- product push/merge/final product acceptance.

## 10. Next smallest step

Owner performs the first half of PHASE3B-LIVE-01 manually outside Codex sandbox:
clean topic -> optional Tutor if required -> one natural recording -> one ASR -> replay/transcript checkpoint -> stop and return to MASTER.


## Owner Phase 3B manual protocol — explicit steps

Owner requested a concrete, self-contained procedure before beginning the live test.

Protocol: start local server from normal owner PowerShell; open the validated isolated Edge outside Codex sandbox; create a new clean topic from the exact laboratory-visitor-rules source in HANDOFF; run the normal Learn entry once if required; record one natural 20–45 second Mandarin explanation with no prompt; allow exactly one ASR submission; replay and compare raw ASR against actual speech; correct only ASR mishearing; stop before content diagnosis and return the checkpoint to MASTER.

Expected provider use by the replay checkpoint: at most one Tutor semantic call, exactly one ASR call, zero diagnosis calls. No retries. Any Tutor/ASR/audio/replay/ledger failure stops the experiment.


## PHASE3B-L1-START-LEARN-NO-RESPONSE — 2026-09-29

Owner began the manual Phase3B flow outside Codex sandbox and reports that clicking Start/Learn produced no visible response.

Do not click Start/Learn again until MASTER determines whether the first click dispatched a Tutor/provider request. Existing authorization permits at most one initial Tutor call and zero retries.

Unknown: whether POST /api/teach was sent; whether the server received it; whether provider dispatch began; whether the click failed before network; whether UI failed to render.

No recording/ASR/diagnosis may proceed until this blocker is classified.


## PHASE3B-L1 title validation root cause — 2026-09-29

Owner screenshots show the direct-paste source was present but the Topic/Title field was empty when Start/Learn was clicked.

Current app start handler checks title and source before topic creation/provider work; if either is empty it returns with the notice `先写一个主题，再放入这一轮的有限材料。` and does not call teach()/provider.

Therefore the first Start/Learn click did not consume the authorized Tutor semantic call and is not counted as a provider retry.

Owner may set title to `实验室访客入场规则` and click Start/Learn once. That click is the first authorized Tutor attempt if the normal flow dispatches Tutor.

UX note retained: the required title field and validation feedback were not obvious enough to the owner. This is a usability observation, not a Phase3B blocker after the title is supplied.


## Owner product decision — source-first setup, no required manual title

Owner explicitly rejected the current requirement that the user must fill the Topic/Title field before Start/Learn.

Decision:
- the learning material is the required input;
- the user should not be required to invent or type a topic/title;
- title is generated automatically and is metadata, not a prerequisite;
- the user may optionally provide learning context:
  1. what they especially want to learn/focus on;
  2. what they believe they already understand/master;
- those optional fields are setup context, not chat-history user messages and not proof of mastery;
- Tutor may use them to prioritize explanation while remaining bounded by the supplied source.

Title behavior:
- file upload/import: derive title locally from the filename without extension;
- direct paste: derive title locally from the first meaningful non-empty line, bounded to a sensible display length;
- if no meaningful line exists but source text is valid, use a neutral local fallback such as “学习材料”, without a provider call;
- user may rename later only as optional metadata, but title is never required to start learning.

The observed Start/Learn no-response was therefore both:
- a correctly identified empty-title validation return in current code; and
- a product UX/design defect relative to the owner’s intended flow.

Because no Tutor/provider call was dispatched, PHASE3B-LIVE-01 has consumed 0 calls and 0 exposure. The live experiment is paused until this setup-flow correction is accepted.

## SETUP-FLOW-01

Status: READY / DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO LIVE API.

Goal:
remove required manual title entry, add optional learning-focus/already-known context, preserve provenance and source-grounding, and keep setup minimal.

Acceptance:
- valid source alone can start learning;
- file import auto-title works;
- direct-paste auto-title works;
- empty/manual title is no longer a blocker;
- optional focus/known context is persisted as setup metadata and reaches Tutor as explicit setup context;
- it is not inserted into messages as a user utterance;
- “already known” is treated as owner self-report, not validated mastery;
- no extra provider call is introduced;
- existing source limits, provenance, Batch A/B/C behavior and budget boundaries remain unchanged;
- zero live provider calls in implementation/testing.

Codex/Astra may analyze, recommend, self-review and make up to two in-scope correction passes under the proactive operating rule. It must not expand into broader onboarding redesign, retention, model/provider, schema migration, new dependency, or live Phase3B.

Next step: Codex executes SETUP-FLOW-01 through ACTIVE_EXCHANGE and returns evidence to MASTER.


## SETUP-FLOW-01 relay delivery failure — 2026-09-29

Owner reports Codex executed SETUP-FLOW-01, but GitHub meta/master-state shows no commit after the CHAT_TO_CODEX dispatch commit `24f462de06845d4069077b63539a759009489cc8`.

Therefore the execution result is currently unverified by MASTER and must not be inferred from owner memory or partial UI text.

Recovery policy: do not rerun SETUP-FLOW-01 automatically. Codex should inspect the existing local worktree/current artifacts only, summarize the already-performed work, and write the missing CODEX_TO_CHAT receipt to ACTIVE_EXCHANGE. If the local work is absent/incomplete, report that explicitly instead of reimplementing.

This is an exchange delivery failure, not yet a product acceptance failure.


## Permanent relay rule — meta exchange write is not product push

The previous SETUP-FLOW relay recovery exposed an ambiguity: Codex interpreted “no commit/push” as forbidding the GitHub transport write itself.

Permanent distinction:
- product branch commit/push/merge remains separately controlled by MASTER;
- an authorized ACTIVE_EXCHANGE reply on `meta/master-state` **must** be written through the GitHub connector and therefore creates a meta-branch commit;
- that meta transport commit is not a product push/merge and is allowed whenever the current turn authorizes an exchange reply;
- Codex must not replace this with a repo-local artifact copy.

Required relay close-out:
1. write only `docs/master/ACTIVE_EXCHANGE.md` on `meta/master-state`;
2. use optimistic concurrency with the incoming exchange blob/version;
3. read back the file from the resulting commit;
4. verify `state=CODEX_TO_CHAT`, correct `turn_id`, and full receipt content;
5. verify the meta commit changed only ACTIVE_EXCHANGE;
6. if any step fails, report BLOCKED in Codex UI; do not claim relay success.

## Astra autonomy envelope — expanded

Within an explicitly approved task, Codex/Astra may independently:
- inspect broader relevant project context;
- propose and choose the smallest coherent approach;
- add/adjust in-scope tests and helpers;
- refactor touched code locally when directly necessary for correctness/maintainability;
- implement;
- run tests and fault/edge-case checks;
- review its own diff;
- fix in-scope defects it discovers;
- iterate repeatedly without asking MASTER for every small edit;
- return extra recommendations separately.

There is no fixed two-pass limit for ordinary in-scope corrections. Codex may iterate until acceptance criteria pass, subject to stop conditions.

Hard stop:
- if the same failure signature remains unresolved after three meaningful fix/test cycles, return to MASTER instead of continuing to churn;
- stop immediately for scope expansion, new product tradeoff, unapproved spend/live calls, new dependency/framework/model/provider/storage schema/retention policy, destructive/high-risk action, push/merge/public release, or speculative next change.

Recommendations remain non-executable unless already inside the approved task.


## SETUP-FLOW-01 recovered result — remote relay verified

Remote recovery result: NEEDS_HOST_VERIFY.

Verified relay:
- recovery dispatch commit: 03ba43515e1583d3347b955f559033bb04d6bad0;
- Codex wrote the receipt to GitHub meta/master-state;
- comparison shows exactly one changed path: docs/master/ACTIVE_EXCHANGE.md.

Local SETUP-FLOW-01 state:
- base/final HEAD remains ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2;
- product changes are uncommitted;
- changed files: app.mjs, browser-tests-r4.mjs, core.mjs, index.html, provenance.test.mjs, run-offline-tests.mjs, schemas.mjs, server.mjs, plus new setup-flow.test.mjs;
- valid source alone can start Learn;
- direct paste derives a local title from the first meaningful line;
- file import derives title from filename without final extension;
- fallback title is 学习材料;
- optional focus/known fields are setupContext metadata, not role=user messages;
- already-known is explicitly treated as owner self-report, not mastery evidence;
- no extra provider request is introduced.

Fresh deterministic evidence:
- focused setup-flow: 9/9 PASS;
- full Node/offline: 123/123 PASS;
- git diff --check: PASS;
- production ledger SHA unchanged;
- live provider calls 0;
- microphone 0;
- incremental exposure 0.

Codex browser attempt was blocked before application cases by the known Codex-sandbox Edge/CDP environment limitation. Therefore SETUP-FLOW-01 is pending one host-side browser validation before final commit/MASTER acceptance.

### Current Astra autonomy rule supersedes older pass-count language

Any earlier statement limiting Codex to two self-correction passes is superseded.

Within an approved task Astra may iterate as needed inside scope until acceptance passes or a stop condition is triggered.

Mandatory return to MASTER:
- same failure signature survives three meaningful fix/test cycles;
- scope/product tradeoff changes;
- unapproved spend/live call;
- new dependency/framework/model/provider/schema/retention policy;
- destructive/high-risk action;
- push/merge/public release;
- next step would be speculative.

This gives Astra broad engineering autonomy without transferring product-scope authority.
