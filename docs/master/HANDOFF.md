# Active Handoff

Updated: 2026-09-09  
Role: MASTER

## Phase

**Current-MASTER Binding UX Research 01 → Attached-Chat Identity Probe 01**

## Completed

- Dogfood 02 exposed real wrong-target MF-01.
- Bounded Fix 01 approved and implemented locally.
- `configure.ps1` now supports explicit safe `-Rebind`.
- `handoff.ps1` unchanged.
- Windows PowerShell 5.1 focused suite = `30/30` PASS.
- Real binding moved from previous MASTER to current MASTER.
- Real handoff retry returned to the current MASTER.
- `CLIPBOARD_EXACT=True` and the packet was actually pasted into the current MASTER.
- First real Correction Packet validation = PASS.
- Current-MASTER Binding UX Research 01 official + nearby-project review completed.

## Version

- repo: `F:\Chat-Codex-Handoff\validation-repo`
- branch: `prototype/lightweight-handoff-v0.1`
- local HEAD: `5cd04c811fad6f59f530bfd146a36148bdece98a`
- pushed code HEAD: `869414c77d227fe2f1675c7cfa08b04250520279`

## MASTER Review

### Must Fix

None remaining for MF-01.

### User Decision Needed

The next step is a real read-only Desktop/Codex validation gate.

### Verified UX Cost

A new MASTER transition currently requires the user to provide the new Chat URL once for explicit `-Rebind`.

The user prefers to eliminate this manual URL transfer if it can be done through a supported, low-risk source.

## Research Findings

### Official

- Existing ChatGPT chat → Codex attachment is an official desktop workflow.
- Reviewed official documentation does not publish a stable local API/metadata contract exposing the attached/current ChatGPT conversation URL or ID to repo-local scripts.
- Codex remains a separate view/history.
- The official in-app Browser can control a current page, but using it to infer the MASTER target would introduce browser automation rather than a stable target identity primitive.

### Existing patterns

- `codex-web-review-relay`: user manually opens and Arms the intended ChatGPT tab; it deliberately does not select conversations automatically.
- `codex-bridge-chatgpt`: browser-based handoff with explicit automation consent and browser/account-risk controls.
- `codex-from-chatgpt`: heavier MCP/App Server orchestration; not a lightweight source of current Chat identity for this repo-local return helper.

## Product Decision

Do not implement automatic/silent current-MASTER rebinding from undocumented UI or internal state.

Keep explicit `-Rebind` as the corrected Alpha boundary unless an official attached-chat identity can be observed and validated.

## Next Smallest Step — Attached-Chat Identity Probe 01

Run in a Codex chat that has the **current MASTER Chat already attached through the official Existing ChatGPT chat flow**.

Read-only goal:

> Determine whether Codex can access and report a stable identity or canonical URL for the attached ChatGPT chat from official attachment context/metadata, without browser automation or internal-file access.

Probe constraints:

- no file changes;
- no commands needed unless Codex explicitly needs a harmless read-only check unrelated to ChatGPT internals;
- no commit;
- no push;
- no paid API;
- no browser/DOM/CDP automation;
- no ChatGPT client-internal files;
- no cookies/tokens/credentials;
- do not reconstruct or guess the URL from visible text;
- distinguish `accessible exact identity`, `context-only/no identity`, and `unknown`.

Expected report:

- attached MASTER context readable: Yes/No;
- exact conversation ID accessible from attachment metadata: Yes/No;
- exact canonical Chat URL accessible from attachment metadata: Yes/No;
- source of identity if Yes;
- whether that source appears documented/supported versus incidental/undocumented;
- commands/files/browser automation used: must remain 0 for Chat identity discovery.

If exact supported identity is unavailable, stop: explicit `-Rebind` remains Alpha behavior and no automatic target-discovery implementation is opened.

If a supported identity is available, return to MASTER for a bounded implementation decision before changing code.

## Gate 5

Still **NOT READY**.

## Do Not Start Yet

- automatic/silent current-Chat discovery implementation
- browser/DOM/CDP automation
- ChatGPT client-internal mutation
- token/credential access
- auto paste / send
- global launcher / installer
- GUI / daemon / server
- full bridge / companion app
- paid API
- product/code push
- merge / public release
