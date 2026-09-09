# Current State

Updated: 2026-09-09  
Role: MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION**

Gate 5 external execution remains **ON HOLD**. The project is still in product/technical validation and bounded prototyping; it has not entered Beta or full application development.

The bounded native GUI prototype has now completed its final isolated self-test cycle. The Spike is **not yet accepted as PASS** because MASTER still needs (1) independent source/evidence review of the local artifacts and (2) one real owner-controlled GUI return validation.

## Active Repo / Version

- repo: `F:\Chat-Codex-Handoff\validation-repo`
- active local branch: `prototype/usability-spike-01`
- original Spike baseline: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- implementation checkpoint: `9eae64b42a6cc809e61fda60514c09c7b270fe93`
- UF-01 correction / current local HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- pushed product-branch HEAD remains: `869414c77d227fe2f1675c7cfa08b04250520279`
- private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`

No product/code push, merge, force push, external sharing, public release or paid API use is authorized.

## Dynamic State Authority

- repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
- ref: `meta/master-state`
- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

## Implemented Product Surface

Reported final bounded implementation on `prototype/usability-spike-01`:

- native Chinese Windows Forms handoff panel;
- current project / target Chat / captured-delivery preview;
- explicit initial configure and explicit rebind flow;
- confirmation-gated call into the existing handoff flow;
- isolated demo mode;
- repo-local launcher;
- relevant README / UI documentation.

Original implementation checkpoint scope:

- `M README.md`
- `A Start-Handoff.cmd`
- `A handoff-kit/ui/Start-Handoff.ps1`
- `A handoff-kit/ui/HandoffPanel.ps1`
- `A handoff-kit/ui/PanelAdapter.ps1`
- `A handoff-kit/ui/tests.ps1`
- `A handoff-kit/ui/README.md`

Checkpoint diff stat: `7 files changed, 464 insertions(+)`.

UF-01 correction scope:

- `M handoff-kit/ui/Start-Handoff.ps1`
- `M handoff-kit/ui/tests.ps1`
- `2 files changed, 28 insertions(+), 8 deletions(-)`.

Accepted core configure/handoff scripts, original core tests and Hook were reported unchanged.

## UF-01 Final Result

**PASS / CLOSED at self-test level.**

The previous fragile `WaitForInputIdle` / external process-state approach was replaced with a deterministic test-owned lifecycle:

- Demo child records READY from its own `Shown` event;
- its own Timer closes the form;
- resources are disposed and CLOSED is recorded;
- parent test manages only the `Process` object it created and verifies child exit/exit code;
- no process enumeration, WMI/CIM sweep, privilege escalation or unrelated process killing.

Reported final lifecycle evidence:

- owned child PID: `30360`;
- `EXITED=True`;
- `READY pid=30360 repo=<isolated fixture checkout>`;
- `CLOSED disposed=True`;
- `ExitCode=0`;
- timeout cleanup was not triggered.

The earlier ambiguous prior-turn process remains **Unknown** and was not queried or managed in the final correction. This is honest residual uncertainty, not a current blocker.

## Final Self-Test Evidence Reported

On final HEAD `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`:

- core regression: **30 passed / 0 failed**, exit `0`;
- final isolated UI suite: **38 passed / 0 failed**, exit `0`;
- `git diff --check` and correction diff checks: PASS;
- final tests reported no change to live binding, metadata, packet or Hook hash;
- no real clipboard/browser/live handoff action was performed;
- no install, global config, push, merge, paid use or external sharing occurred.

Reported screenshots regenerated from the final version, all using demo data:

- `Unconfigured.png`
- `Captured.png`
- `Error.png`
- `Success.png`
- `Rebind-dialog.png`
- `Rebind-confirmation.png`
- `Small-window.png`

Reported rendering checks:

- normal window: `960x640`;
- smaller window: `740x560`;
- actual tested DPI: `96 DPI`;
- 150% / 200% scaling: **NOT VERIFIED**.

## Evidence Artifacts Reported Locally

Codex reports local evidence under:

`F:\Chat-Codex-Handoff\validation-repo\artifacts\usability-spike-01\`

including:

- `REVIEW_EVIDENCE.md`
- `UF-01.diff`
- `source.diff`
- `core-tests.txt`
- `ui-tests.txt`
- `screenshot-inventory.json`
- the demo screenshots listed above.

These are still **local evidence references only**. MASTER has not independently read those local files in Chat, so the source/evidence delta review is not complete yet.

## Classification

### Must Fix

None currently reported after final self-test.

### User Decision Needed

No new product-scope decision is required for the next step.

Owner validation is now required before Spike acceptance:

1. provide MASTER the local review artifacts needed for independent delta review;
2. open the real GUI and perform one user-controlled return using the existing live binding/packet only after the current Codex turn has fully ended;
3. manually paste/send into the Chat opened by the GUI;
4. compare actual usability against the CLI path.

### Future Optional

- 150% / 200% DPI validation;
- fuller manual keyboard traversal validation;
- any additional usability polish only if owner validation reveals a real issue.

Do not implement new features before owner validation.

## Current Product Contract

Unchanged:

- official Existing Chat -> Codex remains the initial context path;
- GUI only wraps accepted repo-local configure/rebind/handoff primitives;
- one checkout only;
- no silent target discovery;
- no automatic paste/send;
- no browser/ChatGPT automation;
- no clipboard monitoring;
- no global installer/launcher;
- no server/daemon;
- CLI fallback remains intact.

## Not Done

- MASTER independent source/evidence delta review of the local final implementation;
- one real owner GUI -> current binding/packet -> clipboard -> current MASTER validation;
- actual owner usability judgment versus CLI;
- 150% / 200% DPI validation;
- full manual keyboard-use validation;
- external validation / Gate 5;
- product/code push or distribution.

## Next Smallest Step

**Owner Validation Gate.**

First transfer only the minimum local review evidence to MASTER: `REVIEW_EVIDENCE.md`, `source.diff`, and the final screenshot inventory / representative screenshots. Then MASTER performs the final delta review.

If that review finds no Must Fix, the owner runs `Start-Handoff.cmd`, confirms project/target/captured packet, explicitly confirms the completed Codex turn, uses the GUI prepare/open action, manually pastes/sends, and reports the usability result.

Only after both evidence review and real owner validation can MASTER classify USABILITY-SPIKE-01 as PASS / PARTIAL / FAIL.
