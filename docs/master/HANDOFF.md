# Active Handoff

Updated: 2026-09-09
Role: 00 MASTER

## Phase

**USABILITY-SPIKE-01 — UX-02 / UX-03 self-test complete / MASTER evidence review pending**

Gate 5 remains ON HOLD. The approved owner-feedback correction has been implemented locally according to Codex, but overall Spike acceptance remains open pending independent review and one real owner-controlled copy-only flow.

## Current Local State

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Branch: `prototype/usability-spike-01`
- Starting HEAD for this correction: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Reported final HEAD: `3a925c13dae51e7d3f3a89977a993ebafb771f1d`
- Pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

No push, merge, external sharing, public release, paid API use, dependency install or privilege escalation is authorized.

## Reported Completed

### UX-02 Delivery Identity Summary

Codex reports the GUI now separates:

- actual packet heading/title;
- capture time;
- packet-declared final/current version when explicit and unambiguous;
- current checkout HEAD;
- version relationship;
- SHA-256 packet fingerprint;
- full raw packet preview.

Missing or conflicting fields are reportedly labelled rather than inferred. No completion/acceptance claim is derived from these fields.

### UX-03 Copy-only

Codex reports minimal backward-compatible core support:

```powershell
.\handoff-kit\handoff.ps1
.\handoff-kit\handoff.ps1 -CopyOnly
```

No-arg behavior remains the existing validated exact-copy + open stored HTTPS Chat URL path.

`-CopyOnly` reportedly performs the same strict validation and exact clipboard preparation while making zero `Start-Process`/open requests.

GUI reportedly provides:

- `仅复制交付` as the low-friction route;
- `复制并打开网页对话` as the explicit navigation route.

Both preserve confirmation, identity checks, busy guard and no-auto-paste/send.

## Reported Correction Scope

```text
README.md
handoff-kit/handoff.ps1
handoff-kit/tests.ps1
handoff-kit/ui/HandoffPanel.ps1
handoff-kit/ui/PanelAdapter.ps1
handoff-kit/ui/README.md
handoff-kit/ui/tests.ps1

7 files changed, 141 insertions(+), 40 deletions(-)
```

`HandoffKit.Common.ps1`, `configure.ps1`, launcher and Hook reportedly remain unchanged.

## Reported Final Tests

```text
Core: 43 passed / 0 failed; exit 0
UI:   57 passed / 0 failed; exit 0
```

Reported checks include old open-web behavior, exact copy-only fixture payload, zero open request in CopyOnly, fail-closed URL validation, both GUI actions' confirmation/change/busy behavior, live-file hash isolation and `git diff --check`.

These results are not yet independently reviewed by MASTER because the new local evidence has not been transferred into Chat.

## Desktop Route Probe 01

Codex reports:

```text
desktop_app_present = Unknown
package_name = None
package_family = None
package_version = None
start_app_id = None
registered_custom_protocols = None
registered_app_uri_hosts = None
exact_ordinary_chat_conversation_route = None
can_prove_exact_conversation_routing = No
live_uri_launches = 0
ui_automation = 0
client_internal_files_read = 0
```

Narrow current-user package/start-app searches returned no ChatGPT/OpenAI match. This is **inconclusive** rather than evidence that the Desktop app is absent. No manifest/URI launch was performed. No native exact-conversation routing claim is opened.

## MASTER Review Gate

Before real owner acceptance, transfer the minimum new evidence from:

`F:\Chat-Codex-Handoff\validation-repo\artifacts\usability-spike-01\`

Required:

1. `UX-02-UX-03.diff`
2. updated `REVIEW_EVIDENCE.md`
3. `DESKTOP_ROUTE_PROBE_01.md`
4. updated `screenshot-inventory.json`
5. representative updated screenshots: `Captured.png`, copy-only success state, `Success-open-web.png` if present, and `Small-window.png` if materially changed.

MASTER reviews only the new correction/probe delta. Do not reopen accepted Alpha history without contradictory evidence.

## Owner Validation After Review PASS

After the relevant Codex turn has fully ended:

1. open `Start-Handoff.cmd`;
2. verify the live delivery summary is understandable and distinct from current checkout state;
3. confirm target/packet and tick explicit completion confirmation;
4. click **仅复制交付** once;
5. confirm no browser/web tab is opened by that action;
6. manually switch to the already-open ordinary ChatGPT Desktop Chat or web Chat;
7. Ctrl+V and Send without copying anything else;
8. report whether the pasted packet is the intended exact delivery and whether this route is `更简单 / 差不多 / 更麻烦` than the prior flow;
9. optionally test **复制并打开网页对话** once for backward compatibility.

Do not treat manual use of Desktop Chat as proof of native exact-conversation routing. CopyOnly deliberately does not select/verify a destination.

## Classification

### Must Fix

None reported; MASTER review pending.

### User Decision Needed

No new scope decision now. Transfer evidence, then run owner validation only if review finds no Must Fix.

### Future Optional

- improved read-only package identification if a safe reliable identifier source is found;
- exact native Desktop routing only with supported evidence;
- browser exact-tab focus only if extension/native messaging setup cost is justified later;
- visual polish/high-DPI/manual accessibility after functional acceptance.

## Stop Boundaries

Do not start:

- extension/native messaging/native host;
- tab automation;
- live Desktop URI test;
- auto paste/send;
- client-internal file/token/history/cache reads;
- new service/daemon/installer/dependency;
- broader core redesign;
- product push/merge/release/share/paid use.
