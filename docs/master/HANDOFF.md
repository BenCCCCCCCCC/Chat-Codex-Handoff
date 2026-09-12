# Active Handoff — OWNER-VALIDATION-PROVENANCE-FIX-01

Updated: 2026-09-12
Role: 00 MASTER
Status: **OWNER-VALIDATION-01 PAUSED / PROVENANCE MUST FIX AUTHORIZED**

## Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Branch: `prototype/study-teachback-v0.1`
Base feature HEAD for this correction: `912bce6542eef4fe813f32fe4e160acd97ca2d71`
Server/origin remains `http://127.0.0.1:4317`.

Read `docs/master/CURRENT_STATE.md` first. Preserve worktree/unrelated files; no reset/clean/force.

## Owner-validation evidence retained

Phase 1 real owner file import/preview/selection = PASS.

Phase 2 observed:
- 2 explicit semantic requests after Learn started;
- first provider-completed result rejected locally as `INVALID_SOURCE_QUOTE`;
- no automatic retry;
- second explicit owner question succeeded with source-grounded Tutor content;
- safe cost/exposure delta US$0.00113830;
- server/state remained usable.

Do not repeat paid calls for this correction.

## Proven Must Fix

Owner identified that this automatic starter instruction:

`请先帮我理解这段材料，从核心关系开始，问我一个简短问题。`

appears as a `你的想法` user bubble.

Source review confirms current flow:
- new topic starts with `messages: []`;
- `learn` invokes `teach(starterText)`;
- `teach()` unconditionally performs `target.messages.push({role:'user', text:message})`.

Therefore the app falsely attributes application-generated scaffolding to the owner, persists it as a user utterance, and may feed it into later history.

This is a provenance defect, not just styling.

## Required bounded fix

Implement the smallest correction such that:

1. The automatic initial Learn starter may still be passed internally to `/api/teach` for the first Tutor response.
2. It is **not** added to `topic.messages` as a user entry.
3. It is **not** rendered with `.message.user` / `你的想法`.
4. If the initial provider result is rejected by local validation, no fabricated user-role item remains in the topic/history.
5. The first genuine text typed/submitted by the owner becomes the first stored `role:'user'` message.
6. Successful Tutor/assistant replies may still render normally.
7. Genuine later user messages, repair/apply flow, source/attempt identity, ASR/replay, storage/history/delete and budget guards remain unchanged.
8. Do not silently rewrite the already-existing owner-validation topic; preserve it as evidence. The clean validation rerun will create a new topic after this fix.

Suggested shape only: add an explicit internal/bootstrap option to `teach()` or a tiny bootstrap wrapper so persistence/rendering is conditional. Do not introduce a new business state machine or schema migration.

## Required tests/evidence

New paid product API calls = **0**.

At minimum:
- focused source/unit assertion that initial Learn scaffolding is not stored as user history;
- browser success-path: before actual owner input, no user-labelled bubble exists; first Tutor reply can display;
- browser failure-path: simulated rejected initial Tutor output leaves no fabricated user message/history;
- browser next-step: first actual owner submission creates the first user-labelled message and request history does not contain the fabricated starter;
- retained Node and Edge regressions appropriate to the changed app/history logic;
- safe ledger before/after unchanged;
- no raw owner file/audio or private browser data in evidence.

Track evidence under a focused directory such as:
`artifacts/study-teachback/owner-validation-provenance-fix-01/`

## Scope boundaries

Do not fix unrelated extraction `&#x20;` formatting in this turn.
Do not change prompts/models/providers/ASR semantics/extractor limits/persistence schema.
Do not perform live owner microphone/file walkthrough while editing.
Do not make paid product calls.

Standing authorization: normal fast-forward push to the same private feature branch only, with exact SHA returned. No merge/release.

## Return packet

```text
Status: OWNER-VALIDATION-PROVENANCE-FIX-01 READY_FOR_MASTER_REVIEW / BLOCKED
Branch: prototype/study-teachback-v0.1
Exact remote SHA: <sha>
Base: 912bce6542eef4fe813f32fe4e160acd97ca2d71
Changed: <files/scope>
Provenance fix: <actual behavior>
Tests: <actual counts/results>
Failure-path test: <result>
First-real-user test: <result>
Ledger before/after: <safe summary>
New paid product API calls: 0
Evidence: <path>
Must Fix / User Decision Needed / Future Optional
Owner Validation: PAUSED / CLEAN RERUN NOT YET EXECUTED
```

## After MASTER acceptance

Do not resume the old contaminated topic. Start a new topic using the same synthetic DOCX, re-import/select it, then rerun only the minimal Learn checkpoint. Phase 1 extraction semantics remain accepted unless the fix unexpectedly changes ingestion behavior.

## Classification

Completed: Owner Validation Phase 1 plus bounded Phase 2 observation.
Verified: provenance bug exists in current source; no automatic retry occurred; Phase 1 boundary held.
Unknown: corrected behavior until implemented.
Not Done: provenance fix, clean Learn rerun, microphone/ASR/diagnosis/apply/export.
Must Fix: application-generated starter must not be represented or persisted as owner-authored content.
User Decision Needed: none.
Future Optional: extraction formatting polish.

## Next Smallest Step

**Implement only OWNER-VALIDATION-PROVENANCE-FIX-01, test with stubs/synthetic fixtures and zero paid calls, push the same private feature branch, return exact SHA for MASTER review.**