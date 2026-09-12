# LOCAL-LAUNCH-LIFECYCLE-DIAG-01

Date: 2026-09-12. Classification: **INCONCLUSIVE**.

Branch: prototype/study-teachback-v0.1. Before HEAD: 074941a9072db4f56f04691fe51b9d9ed5194d64. Launcher implementation: a4a360d4e86a71db39213cb42baca29837b433bd. Production launcher and product logic unchanged. Existing unrelated untracked files preserved.

MASTER meta/master-state read: CURRENT_STATE.md blob 2069cca7c11e5ac16d6fddcdb69b2999c9fb5e25; HANDOFF.md blob 79f8cdd6ecfb48e283170d99ebce272d280c74bc.

## Single bounded experiment

One temporary ignored CMD wrapper invoked Windows PowerShell through ProcessStartInfo UseShellExecute=true, WindowStyle=Normal, working directory C:\Windows\System32, matching the prior smoke style. No input was injected. No environment values or credentials were inspected or recorded. Helpers and machine process metadata remain ignored under study-teachback-app/runtime/temp; they are not review artifacts.

The child persisted these facts at 2026-09-12T09:32:24.9004289Z, immediately before Read-Host:

| Fact | Observation |
| --- | --- |
| Host | ConsoleHost |
| Windows PowerShell | 5.1.26100.9444 |
| Console.IsInputRedirected | false |
| Input handle invalid | false |
| Input file type | 2 (character device) |
| GetConsoleMode on input | successful |
| Persisted wait stage | before-wait only |

No after-wait record was saved. The observer reached its 12-second observation limit rather than recording a natural shell exit. Its bounded diagnostic cleanup then failed on the held Shell process handle with Access is denied; observer exited 1. No complete child/parent exit timeline or reliable natural exit code was persisted. A subsequent elevated, read-only process query found no matching diagnostic CMD/PowerShell process remaining. No additional termination or retry was performed.

These observations do not establish closed/redirected input or immediate Read-Host return. They also do not establish an independent launcher defect: the actual launcher was not repeated, and the probe did not reproduce the full browser/start/wait/cleanup sequence. The earlier smoke's early cleanup cause therefore remains unknown. Production source's finally block would clean the owned server/state when the start session ends, but this alone does not identify the trigger.

Actual launcher repeat: **NOT NEEDED** to reach the bounded stop decision; not executed. No browser UI, keystrokes, owner file/microphone actions or product operations. No product server started. Port 4317 had zero listeners before and after. No pre-existing server was stopped.

## Safety and delivery

Provider/model calls: **0**. Ledger byte identity verified by equal SHA256 before/after:

`03C05453D3B9A1002DD17B69E6B73C9BE836BA6E11A247FE6E18DC9038104147`

README corrected only the stale instruction tying localhost opening to Owner Validation resumption. No production files modified; no runtime installation, configuration, policy or settings changes. Product regressions not rerun for this documentation-only delta.

Must Fix: no launcher-code defect proven; do not claim interactive end-user lifecycle verified.

User Decision Needed: MASTER disposition of this inconclusive diagnostic; no further automated retries under this authorization.

Future Optional: separately authorized manual desktop lifecycle validation with observable control console; Explorer double-click, default browser and Enter/Ctrl+C remain unverified.

Owner Validation: **OWNER-DEFERRED / NOT EXECUTED**.
