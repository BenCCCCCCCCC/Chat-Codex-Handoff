# Active Handoff

Updated: 2026-09-09  
Role: MASTER

## Phase

**Dogfood 02 — Bounded Fix 01 APPROVED / Correction Packet READY**

## Latest Real Failure

A real Dogfood 02 return attempt produced:

- Delivery Packet / clipboard content: correct;
- Chat opened by `handoff.ps1`: wrong;
- opened target: previous MASTER Chat;
- expected target: current MASTER Chat.

This is the first natural Must Fix in the post-Alpha combined workflow.

## Must Fix

**MF-01 — Current MASTER target rebinding**

The repo-local persistent origin binding does not automatically follow a MASTER transition. The current Alpha intentionally refuses implicit rebinding, so a new MASTER can recover canonical project state while `handoff.ps1` still opens the previous MASTER target.

This violates the core no-wrong-target requirement.

## User Decision

Approved on 2026-09-09:

> **Bounded Fix 01 — Explicit Current-MASTER Rebind**

Authorization:

- local product-code implementation;
- focused Windows PowerShell 5.1 tests;
- directly relevant usage-doc update;
- rebind to the current MASTER;
- rerun the real Dogfood 02 return path.

Not authorized:

- product/code push;
- merge;
- auto paste/send;
- automatic/silent target discovery;
- browser/UI automation;
- GUI / daemon / installer;
- public release;
- paid API;
- unrelated scope expansion.

## UX Preference Captured

The user prefers not to manually edit or paste a Chat URL every time.

For this bounded fix:

- explicit rebind is the safe unblocker;
- it should only be required when the MASTER Chat changes, not on every normal handoff;
- removing manual URL entry entirely is a separate follow-up UX problem, not part of MF-01;
- do not solve it through guessing, browser automation, client-internal access, tokens, or credentials.

A future addressless/current-MASTER rebind path requires supported target-source research before implementation.

## Correction Packet — Send to Same Codex Task

Use only the following correction scope:

```text
Dogfood 02 Correction — MF-01 only.

A real return-target failure occurred: the Delivery Packet/clipboard content was correct, but handoff.ps1 opened the previous MASTER Chat instead of the current MASTER Chat.

Bounded Fix 01 is approved.

Implement the smallest safe explicit current-MASTER rebind:

1. First confirm the current local persisted binding and verify that it points to the previous MASTER.
2. Add an explicit -Rebind switch (or equally explicit safe equivalent) to handoff-kit/configure.ps1.
3. Preserve existing fail-closed behavior by default: a different existing binding must still fail when -Rebind is absent.
4. With -Rebind, validate the new OriginChat using the existing strict URL rules before changing state.
5. An invalid/failed rebind must leave the old binding unchanged.
6. Add focused Windows PowerShell 5.1 tests covering:
   - different binding without -Rebind still fails;
   - valid -Rebind replaces the old target;
   - invalid -Rebind preserves the old binding;
   - same-target configure remains safe/idempotent.
7. Update only directly relevant usage documentation if necessary.
8. Do not modify handoff.ps1 unless the approved rebind cannot be implemented correctly without doing so; if that becomes necessary, stop and report before expanding scope.
9. Do not implement automatic target discovery, browser/UI automation, auto paste/send, launcher, installer, daemon, GUI, or any Future Optional item.
10. Do not push or merge.

After implementation and focused tests, configure/rebind this repo to the current MASTER Chat URL supplied by the user, then rerun the existing handoff.ps1 path.

Final Delivery Packet must include:
- before/after HEAD
- changed files
- exact commit scope
- git diff --stat
- relevant complete diff/content
- focused test commands + outputs
- binding before/after target (redact nothing except credentials; there should be none)
- real handoff re-verification result
- Tests Not Run
- Unverified
- Blocking Issues
- User Decision Needed

Do not repeat the full project background and do not expand scope.
```

## Dogfood 02 Status

> **BLOCKED / FIX APPROVED / CORRECTION READY**

Do not mark PASS until the real return target is re-verified against the current MASTER.

## Next Smallest Step

Send the correction above to the same Codex task.

During the correction, the user will need to provide the **current MASTER Chat URL once** for the explicit rebind. This is a current Alpha limitation, not the desired long-term UX.

After Codex finishes:

1. run the approved focused tests;
2. rebind to current MASTER;
3. run `handoff.ps1`;
4. verify current MASTER opens;
5. user paste/send;
6. MASTER performs delta review.

If Codex discovers that implementing MF-01 requires broader product changes, stop for a new user scope decision.
