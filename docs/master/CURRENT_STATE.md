# Current State

Updated: 2026-09-29 — Phase 3B live attempt blocked before first call; browser-start diagnostic next
Role: 00 MASTER / authoritative dynamic state

## 1. Current status

**OWNER-VALIDATION-01:** clean Phase 2 historically PASS.

**Batch A — CORRECTNESS-HYGIENE-01:** MASTER-ACCEPTED.

**Batch B — DIAGNOSTIC-LOCALIZATION-01 / Phase 3A:** MASTER-ACCEPTED and version-finalized locally.

Accepted local feature baseline:
`dd8317b43100b8cbaad684cab7fc02957e32de62`.

**PHASE3B-PREFLIGHT-01:** PASS / zero-call / read-only.

**PHASE3B-LIVE-01:** OWNER-AUTHORIZED / **BLOCKED AT L1 BEFORE FIRST PROVIDER CALL OR RECORDING**.

**PHASE3B-BROWSER-STARTUP-01:** READY / NOT DISPATCHED / ZERO PROVIDER CALLS / NO MICROPHONE.

Original live authorization remains intact and unspent:
- maximum 3 provider calls;
- zero retries;
- incremental local exposure ceiling US$0.03432;
- one recording maximum.

No live provider/model call has yet occurred under this authorization.

## 2. L1 blocked execution receipt

Codex read canonical commit:
`72dee8644bdd7df820734afea6d7dbea8e2398cf`.

Identity:
- checkout `F:\Chat-Codex-Handoff\validation-repo`;
- branch `prototype/study-teachback-v0.1`;
- HEAD `dd8317b43100b8cbaad684cab7fc02957e32de62`;
- tracked worktree CLEAN;
- ledger lock absent.

The canonical laboratory-visitor-rules source was available from HANDOFF.

Before clicking `开始学习`, Codex launched a fresh isolated Edge profile. Browser control returned:
`Target crashed`.

Consequences:
- clean topic creation was not completed;
- Tutor calls = 0;
- ASR calls = 0;
- content-diagnosis calls = 0;
- recordings = 0;
- retries = 0;
- incremental exposure = US$0.

Ledger before/after remained byte-identical:
`d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

Summary remained:
- 41 reservations;
- 1 distinct attempt;
- 15 reserved minutes;
- 164237 input / 61328 output;
- known settled estimate US$0.01399455;
- exposure US$0.07080205;
- 4 unsettled.

Codex exited the service process. When it attempted to verify the isolated Edge process for cleanup, the OS returned `Access denied`, so residual browser-process state is UNKNOWN.

Do not infer a browser crash root cause from this receipt.

Uncommitted task artifacts were created under:
`artifacts/study-teachback/phase3b-live-01`.

They are session evidence, not product-code changes. Tracked worktree remained CLEAN.

## 3. Classification of the blocker

This is not evidence of:
- provider failure;
- microphone failure;
- product learning-flow failure;
- ASR failure;
- ledger exhaustion;
- replay failure.

It is an **environment/browser-control startup blocker before L1 interaction**.

Because no provider request or recording occurred, the existing owner authorization remains valid. No new spending decision is required to diagnose the blocker.

The next step must diagnose browser startup separately and must not consume the live experiment budget.

## 4. PHASE3B-BROWSER-STARTUP-01 goal

Determine why a fresh isolated Microsoft Edge target crashed under the live execution harness and establish one safe, repeatable way to open the accepted product in a fresh isolated browser session without touching the owner's normal profile.

This is a zero-provider-call environment diagnostic.

No production product behavior change is authorized initially.

## 5. Diagnostic boundaries

Allowed:
- read the current session artifacts under `artifacts/study-teachback/phase3b-live-01`;
- inspect the exact Edge executable/path/version and launch arguments actually used;
- inspect only crash/exit/stderr/DevTools/CDP evidence created by this task/session;
- create a new temporary isolated Edge user-data directory;
- launch fresh non-headless Edge on `about:blank`/equivalent local blank page;
- start the local product server if necessary, provided no product/provider action is triggered;
- open the product root in the new empty isolated profile and verify the page/target remains alive;
- inspect page title/URL/visibility/focus and basic DOM availability;
- use only loopback/local requests;
- create test/session artifacts under the existing Phase 3B artifact area.

Not allowed:
- click `开始学习`;
- create a topic;
- send Tutor/ASR/diagnosis calls;
- microphone permission/use;
- inspect the owner's normal Edge profile;
- inspect old IndexedDB/topics;
- reuse or attach to an unknown existing Edge process;
- kill/terminate an unknown process;
- elevate privileges or change Windows/browser policy;
- delete a process/profile that returns Access denied;
- modify product code/provider/model/retention/schema/budget;
- retry the live experiment itself;
- push/merge/reset/clean/rebase/amend.

## 6. Diagnostic sequence

### E0 — preserve evidence and identity
Confirm accepted HEAD, tracked CLEAN, ledger unchanged/lock absent.

Record the existing Phase3B live artifact file list before writing new diagnostic artifacts.

Do not remove existing evidence.

### E1 — inspect failed launch
From existing session evidence and the exact launcher/harness code/command:
- record Edge executable path/version;
- record launch arguments;
- record temporary profile path;
- record CDP/DevTools endpoint/port behavior;
- record process start/exit status if available;
- record crash/stderr/event evidence if available;
- identify whether `Target crashed` came before navigation, during product navigation, or after target creation.

Do not infer beyond available evidence.

### E2 — blank-target probe
Launch a new non-headless Edge process with a brand-new temporary profile using the minimum safe arguments.

First navigate only to a blank local page/about:blank.

Verify:
- browser process starts;
- DevTools/CDP target is created and remains alive for a bounded interval;
- no Access denied is encountered for the newly launched owned process under normal cleanup;
- no owner profile is involved.

If blank-target probe crashes, STOP and return evidence. Do not launch the product.

### E3 — local product root probe
Only if E2 PASS:
- start the accepted local server in a zero-provider-safe manner;
- open the product root in a new fresh isolated profile;
- do not click `开始学习` or any provider-triggering action;
- verify target remains alive;
- verify product title/basic DOM loads;
- confirm fresh profile has no historical topic data;
- record only local/loopback network requests.

If the product root itself crashes, collect bounded browser/server/target evidence and STOP.

### E4 — repeatability
If E3 PASS, repeat the fresh-browser product-root startup **two more times** in new temporary profiles/processes, unchanged launcher configuration.

Total representative startup runs = 3.

Any failure stops the sequence. Do not loop until green.

If all three PASS, classify the original `Target crashed` as an isolated harness/startup failure not currently reproducible in the representative fresh-browser startup path.

## 7. Output required

Return:
- task ID and canonical commit;
- accepted repo/branch/HEAD;
- existing live artifact inventory;
- exact Edge executable/version/launch args;
- failed-launch evidence/root-cause if provable, otherwise UNKNOWN;
- E2/E3/E4 results;
- three startup-run results if reached;
- process/profile cleanup results for processes launched by this diagnostic only;
- explicit note that unknown Access-denied process was not touched;
- local network/request observations;
- ledger before/after SHA and summary;
- confirmation of 0 provider calls / 0 microphone / 0 topic creation / 0 exposure;
- any test/session-only files created;
- Blocking / Unknown / User Decision Needed / Future Optional.

Do not resume live Phase 3B within this diagnostic. Return to MASTER first.

## 8. After the diagnostic

If three representative startup runs PASS:
- MASTER may authorize resuming the already-approved PHASE3B-LIVE-01 from L1 without new spending authorization;
- the existing 3-call/zero-retry/US$0.03432 ceiling remains unchanged.

If startup still fails:
- keep PHASE3B-LIVE-01 blocked;
- do not consume provider calls;
- decide from the captured evidence whether the issue is launcher/harness-only, local Edge installation/policy, or product-page crash.

## 9. Classification

Completed:
- Batch A/B.
- Phase3B preflight.
- L0 of live task.
- source-material recovery.

Blocked:
- live L1 on fresh isolated Edge target crash.

User Decision Needed:
- none for the zero-call browser-start diagnostic.

Not Authorized in the diagnostic:
- any provider call, microphone, topic creation, live-flow retry or product behavior change.

## 10. Next smallest step

Execute `PHASE3B-BROWSER-STARTUP-01` from HANDOFF. Diagnose browser startup only, return evidence, then MASTER decides whether to resume L1.
