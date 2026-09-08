# Current State

Updated: 2026-09-09  
Role: MASTER / authoritative dynamic state

## Current Stage

**Post-Alpha Internal Validation — Dogfood 02 return-target failure**

The project remains in product validation + technical feasibility validation + bounded dogfooding. It has not entered Beta or full application development.

## Active Repo / Version

- repo: `F:\Chat-Codex-Handoff\validation-repo`
- active code branch: `prototype/lightweight-handoff-v0.1`
- local code HEAD last reported by Codex before Dogfood 02: `ddb74cbefeda621108ec209ce4fbc3b3f463329f`
- pushed code-branch HEAD: `869414c77d227fe2f1675c7cfa08b04250520279`
- private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`

No product/code push, merge, paid API use, or public release is authorized.

## Dynamic State Authority

- repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
- ref: `meta/master-state`
- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

## Product Direction

Preferred workflow remains:

`official existing ChatGPT chat → Codex`
→ `local repo execution`
→ `Delivery Packet + Review Evidence`
→ `Stop Hook materialization`
→ `handoff.ps1`
→ `origin MASTER`
→ `manual paste / send`
→ `delta review`

No full bridge, auto paste/send, GUI, daemon, installer, or custom Chat → Codex helper is justified.

## Latest Real Validation — Dogfood 02

A real Dogfood 02 task was started to turn the validated Alpha into a clearer product skeleton / root README without adding product behavior.

During the Codex → Chat return step, a real failure was observed:

- clipboard / pasted Delivery Packet content: **correct**;
- opened Chat target: **incorrect**;
- `handoff.ps1` opened the previous MASTER Chat instead of the current MASTER Chat.

This is not a synthetic test and not a Future Optional UX issue. It violates the core correctness requirement that the return target must be the correct origin Chat.

Dogfood 02 end-to-end status:

> **BLOCKED / RETURN TARGET FAIL**

Do not mark Dogfood 02 PASS until the target-binding problem is resolved and the real return path is re-verified.

## Verified

- Delivery Packet materialization / clipboard transport still worked in this run.
- The wrong-target symptom is real: the helper opened the previous MASTER Chat instead of the current MASTER.
- Current Alpha binding is repo-local and persistent under Git state.
- Current `configure.ps1` intentionally refuses implicit rebinding when a different origin Chat is already bound.
- Existing Alpha has no automatic mechanism to update the origin binding when MASTER transitions to a new Chat.
- Earlier Fresh MASTER Recovery validated dynamic-state recovery, but it did not validate migration of the repo-local origin Chat binding.

## Likely Root Cause

The persisted repo-local origin binding still points to the previous MASTER Chat. When the new MASTER was created, canonical state recovered correctly, but the handoff binding remained unchanged.

This root cause is strongly supported by the current implementation design, but the exact local binding value should be confirmed during the bounded fix / re-verification step rather than guessed.

## Must Fix

### MF-01 — Current MASTER target rebinding

The product must provide a safe, explicit way to move an existing repo binding from an old MASTER Chat to the current MASTER Chat.

Requirements for any fix:

- explicit user action only;
- validate the new URL with the existing strict HTTPS / exact `chatgpt.com` conversation-target rules;
- no silent rebinding;
- preserve fail-closed behavior;
- no token / credential access;
- no auto paste / send;
- no UI automation;
- focused Windows PowerShell 5.1 tests;
- re-run the real Dogfood 02 return path after the fix.

## Bounded Fix Candidate

Smallest candidate:

> add an explicit `-Rebind` (or equivalently explicit, clearly named) switch to `handoff-kit/configure.ps1`.

Expected UX:

```powershell
.\handoff-kit\configure.ps1 -OriginChat '<current MASTER URL>' -Rebind
```

Behavior:

- without `-Rebind`, a different existing binding continues to fail closed;
- with `-Rebind`, after full URL/repo validation, replace the old binding with the new current MASTER target;
- invalid rebind attempts must leave the previous binding unchanged;
- no automatic target discovery.

This is a product-code change and is outside the README-only Dogfood 02 task scope, so it requires the user's scope decision before implementation.

## User Decision Needed

Approve or reject **Bounded Fix 01 — Explicit Current-MASTER Rebind**.

Approval would authorize local implementation + focused tests only. It would **not** authorize product/code push, merge, public release, paid use, GUI/daemon/full bridge, or any other feature expansion.

## Correction Packet Status

A natural Must Fix has now occurred for the first time.

However, because the required fix changes product code outside the README-only Dogfood 02 implementation scope, do not send a Correction Packet to Codex until the user approves this bounded scope expansion.

If approved, this becomes the first real Correction Packet validation:

`MASTER Must Fix`
→ `concise Correction Packet`
→ same Codex task where practical
→ bounded fix + tests
→ `handoff.ps1` real re-verification
→ current MASTER delta review

## Not Done

- Bounded Fix 01 implementation.
- current MASTER binding reconfiguration.
- Dogfood 02 successful return to the current MASTER.
- Dogfood 02 delta review / final PASS-or-FAIL decision.
- real Correction Packet validation.
- Gate 5 external validation.

## Do Not Start Yet

- silent / automatic rebind
- auto paste / send
- custom Chat → Codex helper
- global launcher / installer
- GUI / daemon / server
- browser/DOM/CDP automation
- ChatGPT client-internal mutation
- full bridge / companion app
- Work / multi-model / Open WebUI
- paid API
- product/code push without explicit authorization
- merge / force push / public release
