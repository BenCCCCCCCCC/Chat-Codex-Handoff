# Active Handoff — SETUP-FLOW-01 HOST VERIFY

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / OUTSIDE CODEX SANDBOX / ZERO LIVE API

## 1. Current implementation evidence

SETUP-FLOW-01 is implemented locally but uncommitted.

Focused setup tests:
9/9 PASS.

Full Node/offline:
123/123 PASS.

git diff --check:
PASS.

Live provider calls:
0.

Codex browser run:
environment-blocked before product cases due to known Windows Codex sandbox Edge/CDP limitation.

## 2. Owner host browser command

Run from normal Windows PowerShell, not Codex terminal:

Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\run-offline-tests.mjs browser setup-flow-01

Do not reset/clean/checkout the current worktree.

## 3. PASS expectations

The browser suite should execute the new setup cases, including:
- source-only Start/Learn succeeds;
- direct-paste title derivation;
- focus-only / known-only / both / neither context combinations;
- setupContext persists/reloads;
- setup context does not render/store as user-message history;
- new-topic clearing;
- existing provenance/browser regressions remain green.

This is isolated fake-provider/test-ledger validation, not live Phase3B.

## 4. Report to MASTER

Return:
- PASS/FAIL;
- final pass/fail count;
- exact error if any.

No long logs needed unless requested.

## 5. After PASS

MASTER will dispatch a new ACTIVE_EXCHANGE turn for Astra to:
- read the host receipt;
- independently self-review current setup-flow diff;
- iterate only if an in-scope issue is found;
- if no post-host source changes are needed, create one focused local commit;
- if source/test changes are made after host PASS, return NEEDS_HOST_REVERIFY rather than relying on stale host evidence.

## 6. Astra autonomy

Within the approved SETUP-FLOW-01 scope Astra may iterate freely through analysis, implementation, testing and self-review.

No fixed two-pass limit applies.

Stop if the same failure survives three meaningful fix/test cycles or if scope/risk boundaries require MASTER.

Do not resume Phase3B until setup-flow is accepted.
