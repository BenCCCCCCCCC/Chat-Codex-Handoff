# Active Handoff — REPLAY-REVIEW-UX-01

Updated: 2026-09-29
Role: 00 MASTER
Status: CHAT_TO_CODEX / ZERO PROVIDER / OWNER UX DECISION

Accepted product HEAD:
bdd0635597006881d6f8f7213122ae53ccbc99a9

## Owner decision

Per-span replay must not be a hard prerequisite for content diagnosis.

Replay remains useful for checking ASR errors, but normal users should be able to continue without mechanically finishing every span.

## Required behavior

1. Content diagnosis should be available once a valid ASR transcript exists.
2. Do not require all transcript spans to be in an in-memory heard set before content diagnosis.
3. Keep clear warning:
   - diagnosis uses the current transcript;
   - ASR may mishear negation, numbers, conditions and terms;
   - user may replay/edit before continuing.
4. Per-span replay remains optional.
5. Full audio player remains available.
6. User edits remain explicit corrections; do not add filler words automatically.
7. Process-candidate confirmation may still require replay of that specific process event before saving process evidence.
8. No extra semantic/provider call.
9. Do not conflate transcript review with process evidence.
10. Remove or revise misleading NOT_HEARD behavior for content diagnosis.

## Review-state UX

Astra should inspect the simplest coherent treatment of replay state after rerender.

Goal:
- do not show a misleading “must replay again” impression after diagnosis;
- avoid persisting false claims that audio was reviewed if it was not;
- if a transcript version is explicitly confirmed for diagnosis, represent that confirmation honestly and separately from per-span playback completion.

Astra may choose the smallest coherent implementation after inspecting current data model and adjacent replay/process gates.

## Project-aware autonomy

Read canonical state and current product context first.

Astra may inspect surrounding replay, transcript-version, process-confirmation, storage/export and browser-test flows.

Inside this UX scope, iterate freely.

Outside-scope findings return separately as Must Fix candidate / User Decision Needed / Future Optional / Project observations.

## Tests

Zero provider only.

Cover at least:
- content diagnosis can proceed without playing every span;
- current transcript/corrections are what content diagnosis receives;
- optional span replay still works;
- no extra provider request;
- process-event confirmation still requires event replay if that safety gate is retained;
- rerender/history reload does not produce misleading hard-gate state;
- existing provenance/process/content regressions remain green.

Run focused + full Node/offline + browser stub if possible.

If UI changed and Codex browser is environment-blocked, return NEEDS_HOST_VERIFY without final commit.

No live API.
No new recording.
No ASR.
No push/merge.
