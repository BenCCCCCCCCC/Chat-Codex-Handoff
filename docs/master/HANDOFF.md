# Active Handoff — LOCAL-LAUNCH-LIFECYCLE-DIAG-01

Updated: 2026-09-12
Role: 00 MASTER
Status: **LOCAL-LAUNCH-01 ENGINEERING-ACCEPTED / FIRST SHELL SMOKE PARTIAL / LIFECYCLE DIAG NEXT**
Owner Validation: **OWNER-DEFERRED / NOT EXECUTED**

## Product binding

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current reviewed remote feature state: `074941a9072db4f56f04691fe51b9d9ed5194d64`
Launcher implementation checkpoint: `a4a360d4e86a71db39213cb42baca29837b433bd`

Read `docs/master/CURRENT_STATE.md` and this file from `meta/master-state`; do not switch the product worktree to the meta branch. Preserve unexpected work; no reset/clean/force.

## What the first real Shell smoke proved

Tracked receipt:
`artifacts/study-teachback/local-launch-smoke-01/SMOKE_RECEIPT.md`

Verified:
- actual Windows Shell execution invoked the real repo-root launcher entry;
- a real listener and expected product status became available at `127.0.0.1:4317`;
- no learning/file/microphone action occurred;
- provider/model calls caused by the smoke = 0;
- ledger bytes before/after are identical;
- no unknown/pre-existing process was stopped;
- README now marks Explorer/double-click/Enter/Ctrl+C as unverified where appropriate and Owner Validation as owner-deferred.

Still not verified:
- default-browser open/window target;
- visible control-console lifecycle;
- normal Enter stop;
- Ctrl+C/window-close behavior;
- Explorer mouse double-click specifically.

New blocker-to-understand:
- twice, the product listener appeared and passed identity checks, but before the bounded recovery step the launcher/server and ownership-state record had disappeared;
- there was no evidence of an intentional Enter/Ctrl+C/recovery stop;
- cause remains UNKNOWN.

Do not infer the cause from timing alone.

## Task — LOCAL-LAUNCH-LIFECYCLE-DIAG-01

This is diagnosis only. **Do not change production launcher or product logic in this turn.**

### Goal

Determine whether the early exit is best explained by:
A. noninteractive/closed console input in the automation Shell context;
B. a launcher/process lifecycle defect;
C. an environment boundary that remains inconclusive.

### Allowed diagnostic actions

1. Confirm exact branch/HEAD/worktree and that port4317 has no unknown owner before starting.
2. Hash/summarize the existing usage ledger before the diagnostic; do not perform learning/model operations.
3. Use temporary ignored files under the existing runtime/temp boundary for diagnostics; delete/leave ignored as appropriate, never commit machine-private process dumps.
4. Run a tiny temporary PowerShell console-input probe through the **same `UseShellExecute=true` / Shell execution style** used by the prior smoke. Record only safe facts such as:
   - shell/process IDs and parent-child timing;
   - host/console type;
   - whether console input is redirected/unavailable;
   - whether a bounded `Read-Host`-style wait returns immediately without injected user input;
   - exit timing/status.
   Do not record environment contents or secret values.
5. If needed, invoke the actual `Start-Study.cmd` **at most one additional bounded time** and observe, without clicking/typing:
   - launcher/shell/Node process-tree timing;
   - creation/removal timing of ignored launcher ownership state;
   - port readiness and disappearance;
   - shell/PowerShell exit status where safely available.
6. Do not try to prove browser UI in this diagnostic. The question here is process lifetime, not browser rendering.
7. Do not send Enter, Ctrl+C, UI Automation clicks, file/mic actions or provider/model requests.
8. Verify ledger before/after byte identity and provider/model calls = 0.
9. Correct one remaining README inconsistency if present: localhost launch must not be described as waiting for Owner Validation to resume. Owner Validation remains deferred, but local launch itself is already an engineering capability.
10. Track a compact sanitized receipt under `artifacts/study-teachback/local-launch-lifecycle-diag-01/` if evidence/docs change, then normal fast-forward push the same private feature branch.

### Stop conditions

Stop immediately and report if:
- port4317 has an unknown owner;
- the experiment would require persistent configuration, OS/browser policy changes or installation;
- capturing the needed evidence would expose credentials/user desktop/private data;
- any provider/model request occurs;
- one bounded repeat is inconclusive.

No repeated exploratory retries.

## Decision rule

Return one classification only:

### `ENVIRONMENT_LIMITED_CONFIRMED`
Use only if evidence shows the same automation Shell context has noninteractive/closed input and the wait exits immediately without user input, consistent with the observed server cleanup. This does **not** prove Explorer double-click works; it explains why this automated smoke cannot verify it. Keep launcher code unchanged and defer true desktop interaction to future manual/owner validation.

### `LAUNCHER_DEFECT_SUPPORTED`
Use only if the process/input evidence points to launcher behavior independent of the automation interaction boundary. Do not fix it in this diagnostic. Return exact evidence and a concise proposed correction scope.

### `INCONCLUSIVE`
Use when neither can be supported safely. Stop rather than iterating.

## Retained boundaries

No changes to:
- study UI/business logic;
- source ingestion or extractor contract;
- ASR/replay/remediation semantics;
- browser storage/history/delete;
- models/provider/budget logic;
- port/origin;
- installer/native wrapper/PWA/service worker/system startup.

New paid product API calls: **0**.
Owner Validation remains **OWNER-DEFERRED / NOT EXECUTED**.

## Required return

```text
Status: LOCAL-LAUNCH-LIFECYCLE-DIAG-01 ENVIRONMENT_LIMITED_CONFIRMED / LAUNCHER_DEFECT_SUPPORTED / INCONCLUSIVE
Branch: prototype/study-teachback-v0.1
Exact remote SHA: <sha or unchanged>
Base reviewed feature state: 074941a9072db4f56f04691fe51b9d9ed5194d64
Input/console evidence: <sanitized conclusion>
Process lifecycle evidence: <sanitized conclusion>
Actual launcher repeat: RUN ONCE / NOT NEEDED / BLOCKED
Provider/model calls: 0 / unexpected
Ledger before/after: identical / changed
README correction: yes/no
Evidence: <tracked path or none>
Must Fix / User Decision Needed / Future Optional
Owner Validation: OWNER-DEFERRED / NOT EXECUTED
```

## Classification

Completed: launcher implementation, engineering review, first Shell smoke and evidence correction.
Verified: the real Shell path can reach the expected local product; no provider/model call and no ledger change.
Unknown: cause of early exit; real browser/control-window UX.
Not Done: this diagnosis, actual interactive desktop validation, Owner Validation, packaging/distribution.
Must Fix: none proven in launcher code yet; end-user one-action launch must not be claimed fully validated.
User Decision Needed: none for this diagnosis.
Future Optional: manual desktop smoke and later bootstrap/distribution work after the lifecycle question is classified.

## Next Smallest Step

**Run this one bounded lifecycle diagnosis. Do not patch launcher code during the diagnostic.**
