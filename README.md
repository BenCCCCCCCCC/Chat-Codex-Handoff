# Lightweight Handoff Alpha v0.1

Lightweight Handoff is a small, local workflow for carrying an approved task from a ChatGPT MASTER Chat into Codex, doing bounded work in the correct repository, and returning an evidence-ready Delivery Packet to the original Chat for review.

It addresses a practical gap: ChatGPT can hold the product context and decisions while Codex works in a local checkout, but moving the task into Codex and the result back into the right Chat can otherwise require repeated copying, prompt rewriting, and manual target selection.

## What the Alpha is

Alpha v0.1 combines two deliberately separate paths:

- **ChatGPT to Codex:** Codex's official `New chat` flow adds an existing MASTER Chat as context, after which the user selects the intended local repository. This is the preferred entry point; the repository does not replace it.
- **Codex to ChatGPT:** this repository's thin PowerShell helper resolves the Stop Hook's materialized Delivery Packet, copies it to the clipboard, and opens the repository's bound origin MASTER Chat.

This is a working, repo-local product skeleton built around an official context entry and a small return helper. It is **not** a full bridge, GUI, installer, launcher, daemon, or SaaS product. It does not merge ChatGPT and Codex histories.

## Complete workflow

```text
Existing MASTER Chat
  -> official Existing Chat context in a new Codex task
  -> correct local repository selected
  -> bounded local execution
  -> Delivery Packet + Review Evidence
  -> configured Stop Hook materializes the packet
  -> handoff.ps1 validates and prepares the return
  -> original MASTER Chat opens
  -> user manually pastes and sends
  -> MASTER performs delta review
```

## Minimal use

Prerequisites are Windows ChatGPT Desktop with Codex, the intended local Git checkout, the configured Stop Hook, and Windows PowerShell 5.1.

### 1. Bind the origin Chat once

Run from the repository:

```powershell
.\handoff-kit\configure.ps1 -OriginChat 'https://chatgpt.com/g/PROJECT_ID/c/CONVERSATION_ID'
```

`configure.ps1` validates the ChatGPT conversation URL and stores a repository-specific binding under the checkout's Git directory. The binding persists without becoming tracked product source, and a different origin Chat is not silently substituted or rebound.

To deliberately replace that target with a new MASTER Chat, use the explicit rebind path:

```powershell
.\handoff-kit\configure.ps1 -OriginChat 'https://chatgpt.com/g/PROJECT_ID/c/NEW_CONVERSATION_ID' -Rebind
```

Without `-Rebind`, a different target continues to fail closed. An invalid rebind leaves the existing binding unchanged.

### 2. Start a bounded Codex task

In Codex, create a new chat, add the existing MASTER Chat as context, select the correct local repository, and send a minimal trigger for the task already approved in MASTER. Codex performs only that bounded work and produces a Delivery Packet with Review Evidence.

### 3. Return the Delivery Packet

After the Codex response has ended and the Stop Hook has materialized its packet, open a new Windows PowerShell 5.1 session in the same repository and run:

```powershell
.\handoff-kit\handoff.ps1
```

`handoff.ps1` takes no packet or Chat parameters. It loads the repository binding, reads the fixed Stop Hook metadata record, verifies that the metadata belongs to the current repository, validates the packet and origin URL, copies the packet exactly to the clipboard, and opens the bound MASTER Chat.

The final control stays with the user: **no auto paste and no auto send**. Paste the packet and send it manually.

For command details, safety checks, and the focused compatibility command, see the [handoff-kit technical instructions](handoff-kit/README.md).

## Verified

- Productization Spike 01 passed for the repo-local binding and Codex-to-ChatGPT return helper.
- The official existing-Chat entry exposed the intended MASTER context to Codex together with the intended local repository.
- A real documentation task completed the combined workflow end to end: official existing Chat context, local execution, evidence-ready Delivery Packet, Stop Hook materialization, `handoff.ps1`, exact clipboard content, the correct origin MASTER Chat, and manual paste/send.
- That dogfood run required no full Task Packet copy, prompt rewrite, wrong-repository correction, missing-evidence follow-up, or manual copying of the Codex Delivery Packet.
- The helper remains repo-local and fail-closed, and automatic paste/send is absent.
- MF-01 was the first natural Must Fix: a concise Correction Packet returned to this same Codex task, and the explicit safe `-Rebind` passed focused tests and real current-MASTER handoff re-verification.

## Not yet verified

- Repeated net benefit across additional naturally occurring real tasks.
- Whether an already-created Codex task automatically receives later updates made in the origin ChatGPT Chat.
- External validation beyond the current private dogfood workflow.

These are evidence gaps, not claims that the Alpha provides those capabilities. They do not expand the current Alpha surface.

## Current boundaries

Alpha v0.1 intentionally does not provide:

- automatic paste or automatic send;
- browser automation or a full-history/full-session bridge;
- a custom ChatGPT-to-Codex transport that replaces the official existing-Chat entry;
- a GUI, installer, launcher, background daemon, or hosted SaaS service;
- automatic rebinding, implicit packet guessing, merge, release, or publishing behavior.

The product's current value is the smaller loop: low configuration, the correct local and Chat targets, an evidence-ready return, and explicit user control over the final send.
