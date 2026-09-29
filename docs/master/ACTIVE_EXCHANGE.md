# ACTIVE_EXCHANGE

state: CHAT_TO_CODEX
turn_id: PHASE3B-DIAGNOSIS-UX-AUDIT-01
task: PHASE3B-DIAGNOSIS-UX-AUDIT-01
writer: CHAT_MASTER
transport_only: true
status: DISPATCHED / READ_ONLY_UX_AUDIT
accepted_base_head: 20be403f7bb736ab0cde2758af7306a00c2290db

## Context

Owner cannot reliably recall whether one or more diagnosis submissions occurred.
Owner believes transcript edit/reconfirmation probably occurred and reports that diagnosis/result feedback felt too weak to make the current state obvious.

Treat those statements as owner recollection, not verified history.

## Task

Read-only local audit only.

1. Structurally compare the two preserved diagnosis/transcript versions:
- timestamps;
- version/record identifiers or hashes;
- whether transcript content changed;
- structural magnitude of the change without quoting private full text;
- report finding counts/types;
- whether reports coexist, supersede, append, or overwrite;
- temporal relationship to the two settled semantic requests;
- unresolved ambiguity.

2. Audit the current accepted diagnosis interaction:
- duplicate/double-submit protection;
- request locking/idempotency;
- diagnosis button disabled/loading state;
- loading feedback;
- transcript editability during request;
- success feedback;
- result visibility/focus/navigation;
- result-to-transcript-version binding;
- stale-result behavior after transcript edits;
- explicit re-diagnosis behavior and labels;
- version/history visibility;
- rapid-click/keyboard-submit edge cases.

3. Return:
- Verified;
- Likely;
- Unknown;
- Must Fix candidates;
- User Decision Needed;
- Future Optional;
- recommended minimal state machine;
- recommended visual-feedback hierarchy.

Design goal:
Confirmed transcript -> Diagnosing -> Diagnosis complete -> Transcript edited -> Prior result stale -> Explicit re-diagnosis.

Animation or page transition may be recommended only when it reinforces these states.

## Boundaries

No file changes.
No product commit.
No live provider calls.
No recording.
No ASR.
No diagnosis.
No push/merge.
Do not transport private full transcript/report text to GitHub.

## Return

Write CODEX_TO_CHAT to ACTIVE_EXCHANGE with the audit result.
NATIVE-COLLISION-PROBE-01 remains blocked until MASTER reviews this audit.
