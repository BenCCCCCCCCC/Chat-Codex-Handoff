# ACTIVE_EXCHANGE

state: CODEX_TO_CHAT
turn_id: PHASE3B-DIAGNOSIS-UX-AUDIT-01
task: PHASE3B-DIAGNOSIS-UX-AUDIT-01
writer: CODEX_ASTRA
transport_only: true
status: READ_ONLY_AUDIT_COMPLETE / MASTER_REVIEW_REQUIRED
accepted_base_head: 20be403f7bb736ab0cde2758af7306a00c2290db
final_local_head: 20be403f7bb736ab0cde2758af7306a00c2290db

## Scope / verification

Read CURRENT_STATE, HANDOFF, ACTIVE_EXCHANGE in order. ACTIVE_EXCHANGE supplies the newly dispatched audit following the older MASTER_HOLD text.
Repo F:/Chat-Codex-Handoff/validation-repo; branch prototype/study-teachback-v0.1.
HEAD unchanged; tracked worktree clean before/after.
No files changed, tests run, product commit, app/browser launch, recording, ASR, diagnosis, live provider call, push or merge.
Only this authorized meta reply is written. No private transcript/report/source text transported.

## Verified — preserved structural comparison

Re-read the same local localhost application IndexedDB log; SHA256 unchanged:
bf1bd6188966f70a08c466e52dcd71724aba34791235f1a614e713f1e32bc68c.
PREP established CRC-checked WriteBatch sequence 353 at physical offset 165764, containing both versions/reports in the normal topic record; value SHA256:
5b5da21f5f9ce986abf1e786231b3f941dd803b30a4f7a9a3c6f0747c89949f7.
This turn decoded the matching array bytes in that unchanged log, without opening IndexedDB.

Version 1:
- id 5cb3e984-2cee-47a9-af75-c22847bad920
- confirmed 2026-09-29T12:19:46.744Z
- report saved 2026-09-29T12:19:52.515Z
- findings: 2 supported; 0 missing/incorrect/unknown
- report JSON.stringify UTF-8 SHA256:
  5fa6873bc90233df5ab2d06b5cf4d718ec881c31552e9bd51afcbf121950405e

Version 2:
- id 607e3b58-8644-4f0a-a456-70bd5e18bcba
- confirmed 2026-09-29T12:21:27.189Z
- report saved 2026-09-29T12:21:32.679Z
- findings: 2 supported + 1 missing; 0 incorrect/unknown
- report JSON.stringify UTF-8 SHA256:
  41ea4f6c6b94975cc56bb8d2dac7833374e4a89fc012879e0547c66439876091

Comparison:
- confirmation interval 100445 ms; report interval 100164 ms;
- each transcript contains 4 spans, 60 characters when concatenated without separators;
- 0 changed span texts; 0 inserted/deleted characters; IDs/times of spans also identical;
- SHA256 of JSON.stringify(array of span text strings), UTF-8, both versions:
  4d80cdcd15d29df5b0f2a4a44bf4aeee14638cf3b543a6fb154f979b92843f0b.
- Both historical origins USER_REPLAY_CORRECTION, reviewed=true.
- Reconfirmation/version identity changed; final persisted transcript content did not.
- Reports differ in wording as well as finding count/type; no private wording quoted.
- Two versions and two reports coexist in the persisted array, not an overwrite.
- Current implementation appends corrections/reports; UI filters to latest transcriptVersion and hides older reports rather than offering a version selector.

Ledger relationship (UTC; same unchanged ledger):
- request reservation a884aa9e-8beb-45f2-b6ea-b1d995b9fbdd: reserve 12:19:46.765, settle 12:19:52.508; reserve 21 ms after first confirmation, settle 7 ms before first report.
- request reservation 69f2dc68-8310-462b-8be4-d2baf60a6203: reserve 12:21:27.269, settle 12:21:32.673; reserve 80 ms after second confirmation, settle 6 ms before second report.
- Both settled semantic requests have attemptId=null; no direct request ID is stored on the reports.
- Ledger SHA256: 1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21.

## Verified — current accepted interaction (static code audit)

1. Duplicate protection:
app.mjs:239-246 sets processing=true synchronously before the first await. Repeat clicks while processing/controller/record/capturePending reject REQUEST_IN_PROGRESS before a new correction or request. Existing correctness-boundaries.test.mjs:59-81 covers delayed double-confirm and lock-before-save. Those tests were read, not rerun.

2. Server concurrency versus idempotency:
server.mjs:11,27-28 uses one process-local busy flag for POSTs, released in finally. This serializes concurrent requests in that server instance. It is not persistent request idempotency.
No diagnosis deduplication key/cache is present. provider.mjs:26 reserves a new semantic request on each dispatch. After completion/reload/server restart, the same content may be submitted again.

3. Button and loading:
The diagnosis button is not disabled and its label does not change during processing. api() disables send/explain and marks workspace aria-busy, but not confirm or transcript editors (app.mjs:16-20).
Busy/error/success text is written to one shared top-of-page notice (role=status, aria-live=polite). Repeated click rejection can replace the diagnosing message with a busy error. There is no adjacent diagnosis spinner/state badge or completed button state.

4. Editing while pending:
Generated transcript textareas remain editable, with no input/change dirty handler or request-time readonly flag (app.mjs:201).
The request snapshots text before awaiting save/diagnose. Later typing does not alter the submitted snapshot.
On success renderAttempt clears and reconstructs editors from latest saved version (app.mjs:195-203,252). Any typing after the snapshot can therefore be overwritten. No current draft-preservation path is present.

5. Success / focus / navigation:
Success appends the validated report, marks DIAGNOSED, saves, rerenders then sets notice.
No result scrollIntoView or focus transfer occurs in diagnose/renderAttempt. Content cards follow transcript and confirmation controls; results may be below the viewport.
Result container is not a dedicated live region; status is announced through the shared notice.
Navigation into another topic/history is guarded while processing. beforeunload warns during active work. These do not create persistent request recovery after reload.

6. Result binding and stale drafts:
attemptRequest uses latest saved correction, not live textarea values; validateFindings checks source/attempt/transcriptVersion; renderAttempt filters reports by saved latest version.
This protects persisted association.
However, editing textarea text alone neither creates a version nor marks the visible prior report stale. Old cards remain visible alongside edited draft text, with active repair actions.
On resubmit a fresh correction UUID is always created, even with identical text (core.mjs:163-165). During the pending request old cards are not cleared/labelled stale.
After a new version is saved but request fails, a later history reload filters out old-version reports with no explanation/version switcher. Stored evidence survives, but is not readily discoverable.

7. Re-diagnosis / history:
The button remains the same initial confirmation label after success. There is no explicit “re-diagnose”, changed-text indicator, unchanged-text reuse, or extra-call disclosure at that action.
History is attempt-level with recording timestamps, not transcript/report version-level (app.mjs:278).
The status field DIAGNOSED is not presented as an explicit completion/version badge in the attempt header.

8. Keyboard:
Confirm is a native button outside chatForm. Enter in transcript textarea inserts a newline rather than submitting diagnosis. Focused-button Enter/Space follows the same click handler and in-flight lock.
A new activation after the lock releases is a new request; there is no completed-state or same-content guard.
Exact key-repeat timing/focus/AT behavior was not browser-tested this turn; do not claim observed keyboard failures.

9. Request/result provenance:
Provider returns reservationId, but app stores result.value plus channel/createdAt, dropping the envelope reservationId (app.mjs:252). Ledger semantic reservations omit attempt identity. This explains why forensic request/report binding is only temporal.
No automatic retry loop found in the inspected diagnosis path.

## Likely

- Two separately confirmed submissions, rather than simultaneous double-click dispatch, best fit the ~100-second separation, identical text and two settlements.
- Weak persistent completion indication and unchanged action label could contribute to uncertainty/re-submission.
- Result cards can be mistaken for feedback on an edited draft because stale state is not shown.
These are code/evidence-based inferences, not proof of the owner's actions or motive.

## Unknown

- Whether the owner deliberately submitted twice, mistakenly retriggered, used keyboard activation, reopened a tab, or considered the second action a retry.
- Whether temporary text edits were made then reverted before confirmation.
- Which report was actually reviewed/accepted; report 2 structurally matches the summary but no independent screenshot acceptance marker was recovered.
- Which exact client bytes ran at each historical submission. Do not retroactively attribute current UX behavior as proven historical cause.
- Direct semantic request-to-report linkage; two close settlement times are strong association, not an embedded ID.
Do not change canonical historical counts or freeze a native comparison baseline solely on this audit.

## Must Fix candidates (recommendations only)

P1 — Preserve in-flight edits: smallest fix is readonly transcript inputs while the submitted snapshot is pending, clearly labelled. Alternative editable-draft design requires separate draft state and must never replace it on completion.

P1 — Explicit dirty/stale state: on text change mark prior results as belonging to the previous confirmed version; prevent their actions being presented as applicable to the new draft. Preserve the prior result for inspection.

P1 — Distinct diagnosing/completed/re-diagnosis states: disable the action synchronously through persistence/request/final save; use visible local state and clear labels. After success prefer “view current result”; only explicit re-diagnosis can spend another call.

P2 — Durable diagnosis idempotency/provenance: client/server in-flight locks are not enough across tabs/reload. Requires separately approved storage/request contract; do not silently implement in this audit.

P2 — Version/result visibility: show report version/time and permit explicitly inspecting prior results, especially after a failed new submission.

## User Decision Needed

- Reconcile history and choose which preserved report(s) belong in the native baseline; do not silently select the more favorable one.
- For unchanged text, recommend reuse existing result by default; decide whether deliberate same-text regeneration is allowed behind an explicit extra-call action.
- Choose readonly-during-request (minimal) versus independently retained editable draft.
- Approve provenance/idempotency persistence scope separately, including failure/unknown-outcome semantics.

## Recommended minimal state machine

ASR available / draft
-> explicit confirmation creates immutable snapshot
-> CONFIRMED / SAVING
-> DIAGNOSING (snapshot/version fixed, action disabled, editor readonly)
-> COMPLETE (matching result saved, version/time shown, view-result action).

COMPLETE -> text edit -> DIRTY / PRIOR RESULT STALE
-> explicit “confirm changes and re-diagnose” -> new immutable snapshot -> DIAGNOSING -> COMPLETE.

Unchanged text in COMPLETE -> view/reuse existing result; no automatic new version/request.
Typing then reverting to the exact confirmed text -> COMPLETE / existing result reusable.
Persistence failure before dispatch -> local save error, no call.
Known request failure -> explicit failure state with prior result retained; no auto retry.
Unknown outcome/reload while pending -> outcome unknown, avoid claiming failed/no cost; reconcile by request ID if a future idempotency contract is approved.
Success followed by local save failure -> result in memory / not saved, offer local retry-save/export rather than another diagnosis call.
Historical report/version remains inspectable; process-event confirmation is a separate state and still requires its own replay.

## Recommended visual-feedback hierarchy

1. Adjacent to the confirmation action: persistent textual state, disabled/busy button, current submitted version; clear ASR warning.
2. Completion/result heading: “diagnosis complete”, version/time and conclusion-first wrong/missing/repair-first summary; separate process context.
3. On edit: inline stale banner and explicit re-diagnosis action with extra-call meaning.
4. Failure: actionable local message distinguishing request failure, unknown outcome and save failure; global notice is secondary.
5. Compact expandable version history and evidence details.

Move focus/scroll to a focusable result heading on user-initiated completion only when it will not disrupt active reading; announce concise status for assistive technology.
A small spinner is optional; respect reduced-motion preference. Full page transitions are unnecessary and could obscure version/context. Animation is not a substitute for state labels.

## Future Optional / next gate

Add zero-provider interaction checks in a separately approved implementation: pending edit preservation; dirty/revert stale state; same-text completed click; slow-save double activation; keyboard activation; reload/unknown outcome; old-version inspection; result save failure.
No new tests or implementation created here.
NATIVE-COLLISION-PROBE-01 remains blocked until MASTER reviews this audit.

Remote reply contains only non-sensitive structure, hashes, identifiers and code findings. Exact readback/sole-path verification follows.
