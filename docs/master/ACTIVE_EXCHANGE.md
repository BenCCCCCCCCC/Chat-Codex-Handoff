# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: DIAGNOSIS-STATE-UX-01
task: DIAGNOSIS-STATE-UX-01
writer: CHAT_MASTER
transport_only: true
status: DISPATCHED / BOUNDED_P1_UX_FIX
accepted_base_head: 20be403f7bb736ab0cde2758af7306a00c2290db

## Why this task exists

Read-only audit verified a real diagnosis-state UX problem.

Two preserved transcript versions had identical final text but were reconfirmed about 100 seconds apart and produced two distinct diagnosis reports.

Do not infer retry semantics or owner intent.

Current code audit verified:
- in-flight lock exists, but diagnosis CTA is not disabled/relabelled;
- transcript remains editable while request is pending;
- pending edits can be overwritten on success rerender;
- completed result is not strongly exposed as a completed/current state;
- editing text does not mark the prior result stale;
- same unchanged content can be reconfirmed into a fresh version/request after completion;
- no explicit re-diagnosis label/state exists.

## Goal

Make diagnosis state unambiguous and prevent accidental/ambiguous repeat diagnosis without expanding persistence architecture.

## Required behavior

1. Before diagnosis, show clear confirmed/current transcript state.
2. On submit, synchronously disable diagnosis action and make the submitted transcript editors readonly until the request/final save resolves.
3. Show a local adjacent textual busy state such as "诊断中…"; optional subtle spinner/motion is secondary and must respect reduced-motion.
4. On success, show an explicit "诊断完成" current-result state.
5. Keep result on the same page; move focus/scroll to a focusable result heading only when appropriate for a user-initiated completion.
6. Show a lightweight binding to the confirmed transcript version/time.
7. If transcript text changes after a completed result, mark the prior result stale / based on previous content.
8. Stale-result repair actions must not appear applicable to the edited draft.
9. Changed text uses an explicit re-diagnosis CTA such as "确认修改并重新诊断".
10. If edited text returns exactly to the confirmed text, restore current-result/reuse state.
11. Unchanged completed text must reuse/view the existing result by default and must not create a new version/provider request.
12. Preserve the prior result during a new request and on known failure; do not silently erase it.

## Interaction design decision

Do not add a mandatory full-page transition.

Use same-page state hierarchy:
confirmed -> diagnosing -> diagnosis complete -> edited/stale -> explicit re-diagnosis.

Animation is supportive only, not the state model.

## Required zero-provider tests

At minimum cover:
- rapid/double activation while pending;
- diagnosis action disabled while pending;
- transcript readonly while pending;
- dirty -> stale;
- dirty -> revert -> current/reuse;
- unchanged completed activation does not dispatch;
- changed-text explicit re-diagnosis;
- prior-result retention during pending/failure;
- keyboard activation uses the same guard;
- result focus/visibility behavior where testable;
- provider/live-call count remains zero in deterministic test path.

## Out of scope

- durable idempotency across tabs/reload/server restart;
- persistent request deduplication key/cache;
- schema/storage migration;
- provider or ledger contract changes;
- full historical version selector;
- new model/provider;
- Phase 4 multi-source implementation;
- new recording/ASR/diagnosis/live calls;
- product push/merge/public release.

## Return

Return CODEX_TO_CHAT with:
- exact changed paths;
- diff summary;
- tests run and outputs;
- browser status;
- no-live-call evidence;
- any Must Fix / User Decision / Future Optional findings.

If browser execution is blocked, say so and do not claim browser PASS.
