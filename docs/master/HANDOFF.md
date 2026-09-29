# Active Handoff — SETUP-FLOW-01

Updated: 2026-09-29
Role: 00 MASTER
Status: DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO LIVE API / BOUNDED UX-CORRECTNESS CHANGE

## 1. Binding

Repo:
F:\Chat-Codex-Handoff\validation-repo

Branch:
prototype/study-teachback-v0.1

Expected base HEAD:
ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2

Tracked worktree must be CLEAN before editing.

Canonical authority:
- meta/master-state/docs/master/CURRENT_STATE.md
- meta/master-state/docs/master/HANDOFF.md

Transport:
- meta/master-state/docs/master/ACTIVE_EXCHANGE.md

## 2. Owner decision

The user should not be required to type a Topic/Title before learning.

Required setup:
- source material only.

Optional setup context:
- “这次重点想学什么？” / learning focus;
- “已经掌握了什么？” / owner-reported prior understanding.

These optional values:
- are not chat messages;
- are not evidence that the learner truly mastered something;
- may guide Tutor emphasis while remaining source-grounded.

## 3. Required behavior

### S1 — automatic title

File import:
- derive title locally from filename without extension;
- keep existing file-selection/import behavior.

Direct paste:
- derive title locally from the first meaningful non-empty source line;
- trim/bound only for metadata display; do not alter source text.

Fallback:
- if source is valid but no meaningful title line can be derived, use neutral local fallback “学习材料”.

No provider call for title generation.

Manual title entry must not be required to start learning.

If an optional rename capability already exists naturally, it may remain; do not build a new rename subsystem.

### S2 — optional learning context

Add two optional setup fields with clear labels:
- 这次重点想学什么？（可选）
- 已经掌握了什么？（可选）

Store them as setup/source/topic metadata or another explicit non-message context structure.

Do NOT append them to topic.messages as role=user.

Tutor request may receive them as explicit setup context. The prompt/contract should make clear:
- focus = what to emphasize;
- already-known = owner self-report used to reduce redundancy, not trusted proof of mastery;
- source remains authoritative;
- contradictions between self-report and source/actual answer should not be hidden.

Do not create an additional provider request for these fields.

### S3 — Start/Learn validation

A non-empty valid source must be sufficient to start learning.

Empty source still fails closed with a clear notice.

Starting with source + no optional context must work.

Starting with source + either/both optional context fields must work.

### S4 — provenance and persistence

Verify:
- auto title persists with the topic/source identity;
- optional focus/known metadata persists/reloads as intended;
- generated title is not stored/rendered as a user utterance;
- focus/known setup context is not stored/rendered as a user utterance;
- first real user chat input remains the first user message after the internal starter behavior already accepted.

### S5 — tests

First reproduce current direct-paste empty-title blocker in a focused test where practical.

Add/adjust deterministic zero-call tests for:
- direct paste source only -> start succeeds;
- auto title from first meaningful line;
- file import title from filename;
- neutral fallback title;
- focus-only;
- known-only;
- both fields;
- neither field;
- no setup context leaks into user-message history;
- Tutor request receives setup context exactly once and no extra provider call is created;
- existing Learn/Repair/Apply provenance remains green.

Run:
- focused setup-flow tests;
- applicable full Node/offline suite;
- applicable browser stub suite if safe in Codex environment; if browser startup is blocked by known sandbox limitation, do not loop/retry and return that limitation separately.
- git diff --check.

No real provider call.

## 4. Scope protection

Do not:
- redesign the entire onboarding;
- add AI title generation;
- add a wizard;
- add a new dependency;
- change model/provider;
- change retention/storage schema unless a truly minimal backward-compatible metadata addition is necessary; if schema migration is required, STOP and ask MASTER instead of widening scope;
- change budget/pricing/caps;
- resume Phase3B;
- push/merge.

Codex may perform up to two in-scope self-correction passes.

## 5. Delivery through exchange

Return CODEX_TO_CHAT in ACTIVE_EXCHANGE with:
- base/final HEAD and commit status;
- exact changed files;
- reproduction evidence;
- implementation summary;
- focused + regression results;
- provenance evidence;
- zero-live-call evidence;
- whether browser evidence ran or was sandbox-blocked;
- git diff --check;
- self-review findings;
- Tests Not Run;
- Unknown;
- Blocking;
- User Decision Needed;
- Future Optional;
- no push/merge / no Phase3B confirmation.

One focused local commit is permitted only if required evidence passes and no host-browser revalidation is still required for changed UI behavior. If Codex believes host validation is necessary, leave changes uncommitted and return NEEDS_HOST_VERIFY.

Do not modify CURRENT_STATE.md or HANDOFF.md.
