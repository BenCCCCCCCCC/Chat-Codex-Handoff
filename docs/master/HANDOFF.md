# Active Handoff

Updated: 2026-09-09  
Role: MASTER

## Phase

Post-Source-Maintenance-Probe hardening and combined-workflow preparation.

## Goal

Keep dynamic MASTER state out of repeated ChatGPT Project Source upload/delete cycles while preserving a lightweight Chat ↔ Codex workflow and user control.

## Completed

- Productization Spike 01 = PASS.
- Official Existing-Chat → Codex Probe 01 = PASS.
- Official Existing-Chat → Codex Probe 02 = PASS.
- Source Maintenance Probe 01 = PASS.
- Private GitHub repository is live and readable through the connected GitHub path.
- MASTER independently read the canonical files and exact commit.
- Dedicated dynamic-state branch `meta/master-state` has been created.
- `docs/master/CURRENT_STATE.md` is updated on the dedicated state branch.

## Current Product Direction

Use:

`official existing Chat → Codex`
→ `local repo execution`
→ `Delivery Packet + Review Evidence`
→ `Stop Hook materialization`
→ `handoff.ps1`
→ `origin MASTER`
→ `manual paste / send`

Do not build a second custom Chat → Codex bridge while the official path is sufficient.

## Dynamic State Policy

Authoritative dynamic state lives on private GitHub branch:

`meta/master-state`

Canonical paths:

- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

Standing narrow permission:

- MASTER may update these two canonical docs on `meta/master-state` as normal project maintenance.
- This permission does not extend to product/code branch pushes.
- No merge, force push, release, public visibility change, paid API use, or scope expansion is implied.

Reason for the dedicated branch:

A docs-only update on the active code branch could later push intervening code commits as part of normal Git history. Keeping state on a separate branch preserves the least-privilege boundary while keeping the user-facing workflow simple.

## Verified

- Source Maintenance Probe 01 remote read = PASS.
- Project Source add/delete for that update = 0.
- wrong-version read = 0.
- private repository = verified.
- canonical state branch exists.

## Likely

- One final Project Sources migration should be enough: keep stable bootstrap docs, remove versioned dynamic state/handoff snapshots, and add one stable pointer to the GitHub canonical state.
- After that migration, future MASTER handoffs should no longer require routine Project Source maintenance.

## Unknown / Validation Gates

- A brand-new MASTER must still be tested against the one-time stable pointer.
- A real modification task must still test the complete official Chat → Codex + existing Codex → Chat workflow.
- Real Must Fix / Correction Packet remains unverified.

## Next Smallest Steps

Parallel preparation is allowed until validation is required:

1. Prepare one-time Project Sources migration / stable pointer.
2. Prepare Combined Lightweight Workflow Dogfood 01.

The next user-facing validation gate is the one-time Project Sources migration followed by a fresh-MASTER recovery check.

## Do Not Start Yet

- Project Source CRUD automation
- Browser/DOM/CDP automation
- GUI / daemon / server
- Safe Prefill
- auto paste / auto send
- full bridge
- Work / multi-model / Open WebUI
- paid API
- code push without explicit policy/authorization
- merge / force push / public release
