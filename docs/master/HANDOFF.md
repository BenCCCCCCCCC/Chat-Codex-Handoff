# Active Handoff

Updated: 2026-09-09  
Role: MASTER

## Phase

**Dogfood 02 — BLOCKED on wrong return target**

## Latest Observation

A real Dogfood 02 return attempt produced:

- Delivery Packet / clipboard content: correct;
- Chat opened by `handoff.ps1`: wrong;
- opened target: previous MASTER Chat;
- expected target: current MASTER Chat.

This is the first natural Must Fix in the post-Alpha combined workflow.

## Classification

### Must Fix

**MF-01 — Current MASTER target rebinding**

The repo-local persistent origin binding does not automatically follow a MASTER transition. The current Alpha intentionally refuses implicit rebinding, so a new MASTER can recover canonical project state while `handoff.ps1` still opens the previous MASTER target.

This violates the core no-wrong-target requirement.

### User Decision Needed

Approve or reject a bounded product-code fix:

**Bounded Fix 01 — Explicit Current-MASTER Rebind**

Smallest proposed change:

- add an explicit `-Rebind` switch (or equally explicit equivalent) to `handoff-kit/configure.ps1`;
- preserve current fail-closed behavior by default;
- only replace a different existing binding when the user explicitly supplies `-Rebind`;
- validate the new target before replacement;
- failed/invalid rebind must preserve the old binding;
- add focused Windows PowerShell 5.1 tests;
- update the relevant usage documentation only as needed;
- no other product behavior changes.

Approval authorizes local implementation + focused tests only.

It does **not** authorize:

- product/code push;
- merge;
- auto paste/send;
- automatic target discovery;
- GUI / daemon / installer;
- browser/UI automation;
- public release;
- paid API;
- broader scope expansion.

### Future Optional

- automatic/stale-binding detection beyond explicit rebind;
- from-any-directory launch;
- clipboard protection;
- stale packet replay protection.

Do not mix these into the Must Fix.

## Likely Root Cause

The persisted origin binding still points to the previous MASTER. This matches the current implementation: binding is repo-local/persistent and `configure.ps1` rejects a different existing target rather than silently replacing it.

Confirm the actual local binding during the fix/re-verification step.

## Correction Packet Opportunity

This is the first real natural Must Fix, but the original Dogfood 02 task was README-only. Changing `configure.ps1` expands that task's implementation scope, so MASTER must stop for user approval before sending the correction.

If approved, use a concise Correction Packet to the same Codex task where practical:

`MF-01 only`
→ explicit rebind implementation
→ focused tests
→ configure binding to current MASTER
→ rerun `handoff.ps1`
→ verify correct current MASTER opens
→ user paste/send
→ MASTER delta review

Do not repeat full history or include Future Optional items.

## Dogfood 02 Status

> **BLOCKED / RETURN TARGET FAIL**

Do not mark PASS until the return target is re-verified against the current MASTER.

## Current Product Boundary

Still preserve:

- official Existing Chat → Codex for initial context handoff;
- local execution;
- Delivery Packet + Review Evidence;
- Stop Hook materialization;
- explicit helper invocation;
- manual paste/send;
- fail closed;
- no full bridge.

## Next Smallest Step

Wait for the user decision on **Bounded Fix 01 — Explicit Current-MASTER Rebind**.

If approved: prepare the minimal Correction Packet and execute the bounded local fix through Codex.

If rejected: record Dogfood 02 as blocked by manual binding maintenance and reassess Pivot/Stop rather than implementing another workaround silently.
