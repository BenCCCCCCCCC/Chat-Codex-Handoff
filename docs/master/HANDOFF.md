# Active Handoff

## Phase

Source Maintenance Probe 01 — Private GitHub Canonical State.

## Goal

Test whether two stable files in a private GitHub repository can become the canonical source for frequently changing MASTER state, avoiding repeated ChatGPT Project Source delete/upload/version-suffix maintenance.

## Completed Before This Probe

- Productization Spike 01 = PASS.
- Official Existing-Chat → Codex Probe 01 = PASS.
- Official Existing-Chat → Codex Probe 02 = PASS.
- Preferred workflow established as official Chat → Codex context entry plus the existing Codex → Chat thin helper.
- Custom Chat → Codex helper moved to Future Optional.

## What This Probe Is Testing

- Create `docs/master/CURRENT_STATE.md` and `docs/master/HANDOFF.md` at stable paths.
- Commit only those files.
- Create one private GitHub repository without a naming or remote collision.
- Push only `prototype/lightweight-handoff-v0.1`.
- Let MASTER recover the correct current state from GitHub without adding or deleting a Project Source.

## Verified

- Active repo: `F:\Chat-Codex-Handoff\validation-repo`.
- Active branch: `prototype/lightweight-handoff-v0.1`.
- Starting HEAD: `a48446f0572ecb5e94d35783dd1ace0eecb7c1ec`.
- Existing unrelated untracked files are preserved and excluded from this probe's commit.
- Project Source maintenance churn is a real observed cost.

## Likely

- Git commit/SHA identity and stable paths will provide a safer dynamic-state source than repeatedly versioning uploaded Project Source files.

## Unknown

- Whether MASTER can directly read both canonical files from the new private GitHub repository.
- Whether the remote retrieval returns the exact intended commit without version confusion.
- Final probe acceptance until MASTER performs that read.

## Current User Authorization Boundary

Authorized only for this probe: create one private GitHub repository, add it as `origin`, create one focused commit containing the two canonical state files, and push the current productization branch once.

Not authorized: public visibility, merge, force push, other branches, tags, release, GitHub Actions, automatic future pushes, product feature expansion, or destructive remote changes.

## Next Smallest Step

After the bounded push, return a complete Delivery Packet through `handoff-kit\handoff.ps1`; MASTER then reads both canonical paths from GitHub and decides PASS or FAIL.

## Do Not Start Yet

- Another productization spike.
- Custom Chat → Codex helper development.
- Project Source CRUD automation or history migration.
- Merge, release, Actions, automatic push, public repository, GUI, daemon, Safe Prefill, automatic paste/send, or full bridge work.
