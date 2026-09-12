# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED (ENGINEERING/UI SCOPE)**

**LOCAL-LAUNCH-01 — MASTER-ACCEPTED (ENGINEERING SCOPE)**

**LOCAL-LAUNCH-SMOKE-01 — PARTIAL / CLOSED AS EVIDENCE**

**LOCAL-LAUNCH-LIFECYCLE-DIAG-01 — INCONCLUSIVE / CLOSED**

**LOCAL-BOOTSTRAP-PREFLIGHT-01 — PASS / NO NEW IMPLEMENTATION AUTHORIZED**

**OWNER-VALIDATION-01 — OWNER-DEFERRED / NOT EXECUTED**

Active product: **知而能讲**, Windows local-Web Study-first + spoken teach-back alpha.

Feature branch: `prototype/study-teachback-v0.1`
Current reviewed remote feature state: `912bce6542eef4fe813f32fe4e160acd97ca2d71`.
Launcher production implementation checkpoint remains `a4a360d4e86a71db39213cb42baca29837b433bd`; the two later commits contain only docs/evidence corrections/diagnostics.

## LOCAL-LAUNCH-LIFECYCLE-DIAG-01 review

Git comparison confirms `912bce...` is one normal docs/evidence commit after `074941a...`; production launcher and product logic were not modified.

Tracked evidence:
`artifacts/study-teachback/local-launch-lifecycle-diag-01/RECEIPT.md`

Verified:
- the diagnostic Windows PowerShell host was `ConsoleHost` on PowerShell 5.1;
- console input was not redirected, the input handle was valid, and console mode was readable;
- only a pre-wait record was captured; there is no after-wait record and therefore no evidence that `Read-Host` returned immediately;
- the observer reached its 12-second bound; diagnostic cleanup then encountered an access-denied process-handle boundary;
- the production launcher was not repeated and no product server was started in this diagnostic;
- provider/model calls = 0 and the usage-ledger byte hash was unchanged;
- README stale localhost/Owner-Validation wording was corrected.

Conclusion:
- **environment-limited cause is NOT confirmed**;
- **launcher defect is NOT supported**;
- the prior early-exit cause remains unknown;
- per the pre-declared stop rule, do not keep retrying this automated desktop lifecycle question.

The launcher remains accepted at engineering scope, but Explorer double-click/default-browser/visible-console Enter/Ctrl+C lifecycle must remain described as unverified.

## LOCAL-BOOTSTRAP-PREFLIGHT-01

Goal: determine whether the next productization step should automate fresh-machine prerequisites/credential setup or bundle runtimes.

### Current-product setup facts

A brand-new machine currently needs, outside the normal app runtime:
- Node available to start the loopback server;
- Python 3.14.x available for explicit setup;
- repo-owned `.venv` with the pinned `pypdf==6.18.0` extractor dependency;
- the approved API credential supplied through the launch environment;
- no runtime auto-install and no application-owned secret store.

The current owner machine is already configured enough for the accepted engineering tests/launcher. Therefore fresh-machine setup cost is **not yet an observed blocker on the current owner workflow**.

### Current external/collision findings

- OpenAI's current API-key safety guidance still recommends environment variables and gives Windows user-environment setup examples. This supports the current environment-based boundary but does not justify the app silently persisting credentials.
  - `https://help.openai.com/en/articles/5112595`
- WinGet can install packages such as Python, but using it would intentionally change machine state and belongs to an explicit setup/distribution decision.
  - `https://learn.microsoft.com/windows/package-manager/winget/install`
  - `https://learn.microsoft.com/windows/dev-environment/python`
- Python 3.14 provides an embeddable Windows distribution intended for embedding into another application. This is a future packaging option, not needed for the current repo-local alpha.
  - `https://docs.python.org/3/using/windows.html`
- Node supports Single Executable Applications, but the feature is still in active development and would only solve the Node half; the Python extractor/runtime still needs a packaging design.
  - `https://nodejs.org/api/single-executable-applications.html`
- `uv` can create virtual environments and automatically acquire Python, but that introduces a new runtime manager/download behavior rather than removing product complexity for the current owner alpha.
  - `https://docs.astral.sh/uv/guides/install-python/`
- Volta/fnm/nvm-style Node managers exist, but on Windows they add another toolchain and PATH/shell integration. They are developer-environment tools, not a simpler end-user product boundary here.
  - `https://docs.volta.sh/guide/getting-started`
  - `https://github.com/Schniz/fnm`
- PowerShell SecretManagement/SecretStore remains supported for security/critical fixes but is feature-complete and archived; adding it as a new core credential dependency is not compelling for this alpha.
  - `https://learn.microsoft.com/powershell/utility-modules/secretmanagement/overview`
- Windows generic Credential Manager credentials are a possible secure-store primitive, but adopting them would be a new credential architecture and requires an owner decision rather than being slipped into launch polish.
  - `https://learn.microsoft.com/windows/win32/api/wincred/ns-wincred-credentiala`

### Route decision

**Route A — current configured-machine alpha: KEEP.**
Keep the accepted explicit setup contract and environment-based credential boundary. Do not change current-machine setup merely to manufacture a fresh-machine installer problem.

**Route B — repo-local Setup helper: DEFER UNTIL FRESH-MACHINE NEED IS REAL.**
A future explicit helper could create/verify the repo `.venv` and pinned extractor dependency using an already-installed Python, without installing Node/Python or storing secrets. It would reduce clone/setup commands, but the current owner machine does not need it now.

**Route C — WinGet/uv/Volta/fnm automatic runtime provisioning: REJECT FOR CURRENT ALPHA.**
It changes machine/toolchain state and adds new download/update behavior. Only revisit if fresh-machine onboarding becomes an observed cost.

**Route D — application-owned secure credential storage: USER DECISION REQUIRED.**
Do not add Credential Manager/DPAPI/SecretManagement or another vault silently. Current environment-variable mechanism is retained.

**Route E — bundled Node/Python/native installer: USER DECISION REQUIRED / DEFER.**
Node SEA + Python embeddable/native packaging may later reduce external-user prerequisites, but that is distribution architecture, not a small continuation of the current local alpha.

## Product decision

**LOCAL-BOOTSTRAP-PREFLIGHT-01 = PASS.**

No new bootstrap implementation is justified now. The project has reached a genuine decision boundary rather than a missing coding task.

Recommended next product action when owner time is available: resume the real OWNER-VALIDATION-01 file + microphone journey against the accepted UI/launcher state.

If the owner instead wants continued work without owner interaction, they must explicitly choose a new productization goal such as:
1. fresh-machine onboarding/bootstrap;
2. runtime bundling/native installer/distribution;
3. external-user validation preparation.

Those paths introduce new setup/system/distribution or credential decisions and are not auto-authorized by the earlier local-alpha work.

## Retained accepted state

UI R2 remains accepted. LOCAL-LAUNCH-01 remains accepted at engineering scope: PowerShell 5.1 launcher suite 14/14 PASS, Node45/45, extraction6/6, historical accepted R2 Edge27/27, ledger unchanged, zero new paid product calls. All source-ingestion, ASR/replay/remediation, storage/history/delete and budget guards remain unchanged.

No external-user/release claim follows. Owner Validation remains deferred.

## Classification

Completed:
- UI R2 implementation/review;
- local-launch preflight/implementation/engineering review;
- first real Shell smoke;
- bounded lifecycle diagnosis;
- fresh-machine/bootstrap preflight.

Verified:
- actual Shell invocation can reach the local product;
- launcher engineering guards/tests;
- no provider/model calls or ledger changes from launch/smoke/diagnosis;
- current external bootstrap/runtime options above.

Likely:
- further automated desktop lifecycle probing has lower value than a true interactive/manual smoke;
- fresh-machine packaging work would be premature until onboarding/distribution is a real requirement.

Unknown:
- real Explorer/default-browser/Enter lifecycle;
- real owner file/microphone learning journey;
- external-user onboarding and learning efficacy.

Not Done:
- OWNER-VALIDATION-01;
- manual interactive desktop launch validation;
- fresh-machine setup implementation;
- installer/native packaging/public release/external validation.

Must Fix:
- no proven launcher/product code defect currently blocks the accepted engineering scope;
- do not claim end-user one-action launch fully validated.

User Decision Needed:
- **yes, before any further implementation beyond the current local alpha**: choose whether to prioritize owner validation, fresh-machine onboarding, or distribution/packaging.

Future Optional:
- true manual desktop smoke;
- repo-local setup helper if fresh-machine setup becomes a real need;
- Edge install-as-app/manifest/icon;
- runtime bundling/native packaging only after explicit decision.

## Next Smallest Step

**Default: pause new implementation and resume OWNER-VALIDATION-01 when the owner has time. Do not continue automated launcher retries or introduce bootstrap/installer/credential-persistence scope without a new owner decision.**
