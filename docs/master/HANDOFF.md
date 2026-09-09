# Active Handoff

Updated: 2026-09-09
Role: 00 MASTER

## Phase

**USABILITY-SPIKE-01 — UX-02 / UX-03 correction APPROVED + Desktop Route Probe 01 read-only**

Gate 5 remains ON HOLD. This is a bounded correction to the existing GUI plus one read-only local capability probe. Do not restart the Spike, redesign the product, or add a browser bridge.

## Current Local State

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Branch: `prototype/usability-spike-01`
- Expected starting HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Spike baseline: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- Pushed product branch remains older: `869414c77d227fe2f1675c7cfa08b04250520279`

First verify actual repo / branch / HEAD / worktree. Preserve `.codex/hooks.json`, `T09_LIVE_PACKET.txt` and existing `artifacts/` unless updating this Spike's evidence files. Do not reset to remote, merge, push or amend accepted commits.

## User-approved goal

Owner feedback established two real usability costs:

1. The captured Delivery Packet is hard to recognize confidently from the current UI; demo screenshots and current Git HEAD are not proof of the intended live packet.
2. The normal return path always requests opening the stored HTTPS Chat URL, which opens an unwanted new tab in the owner's environment.

The owner approved MASTER's recommended bounded correction:

- make the actual captured delivery more recognizable;
- add a validated copy-only route that works with an already-open web or ordinary Desktop Chat;
- in parallel, inspect only OS-exposed metadata for a possible official Windows Desktop native route;
- defer visual polish, extensions, automation and actual Desktop navigation.

## A — UX-02 Delivery identity summary

Implement this in the existing GUI/adapter surface; do not alter the Delivery Packet bytes.

### Required summary

For each valid captured packet show a compact, clearly labelled summary above/beside the raw preview:

- **交付标题**: use the first actual Markdown heading from the captured packet when present; otherwise `未提供`.
- **捕获时间**: use `captured_at` when present, otherwise the existing file timestamp fallback and label that honestly.
- **交付版本**: parse only explicit packet-declared final/current version labels when they contain a Git-like SHA. Prefer clearly final labels such as `Final HEAD`, `After HEAD`, `Current HEAD`, `Correction / Final HEAD`, `最终 HEAD` or exact Chinese equivalents already found in real packets. Do not treat `Before HEAD` as the delivered version. If zero candidates -> `未提供`; if multiple conflicting final/current candidates -> `不明确（查看原文）`.
- **当前项目版本**: current checkout HEAD from Git, displayed separately.
- **版本关系**: only if one unambiguous packet-declared version exists: `与当前项目一致` or `与当前项目不同`; otherwise `无法判断`. A mismatch is informational and must not silently block or rewrite the packet.
- **交付指纹**: short SHA-256 fingerprint derived from exact packet bytes (for example first 12 uppercase hex characters), with full fingerprint available in details if convenient.

Optional details may include session_id / turn_id and stored target, but do not overload the main panel.

### Honesty rules

- Do not claim `latest`, `task complete`, `tests passed`, `accepted`, or `current MASTER verified` from these fields.
- Do not infer packet version from current checkout HEAD.
- Do not scan arbitrary prose for any SHA and call it final version.
- Preserve the full raw preview.
- Confirmation must still reset on refresh / target change / packet change.
- Existing binding+metadata+packet identity consistency checks remain.

### Tests

Add focused cases for:

- real-style packet with Before + Final/After HEAD -> chooses final only;
- no heading / no declared version -> `未提供`;
- conflicting final/current declared versions -> `不明确`;
- Chinese/Unicode title and payload;
- packet fingerprint stable for same bytes and changes for changed bytes;
- current checkout HEAD remains separate from declared packet version;
- summary generation has no clipboard/browser/binding side effect.

## B — UX-03 Copy-only return

This is the only approved core-interface exception in this correction.

### Core contract

Modify `handoff-kit/handoff.ps1` minimally:

```powershell
.\handoff-kit\handoff.ps1            # existing behavior unchanged
.\handoff-kit\handoff.ps1 -CopyOnly  # strict validation + exact clipboard; NO Start-Process
```

Requirements:

- add `[switch] $CopyOnly` only; no additional transport modes;
- all existing binding / metadata / repo / packet / size / URL validation still runs before clipboard write;
- packet bytes/text copied exactly as before;
- without `-CopyOnly`, existing URL-open behavior and output semantics remain backward compatible;
- with `-CopyOnly`, do not call `Start-Process` at all;
- output must state clearly that clipboard was prepared and Chat opening was skipped by explicit CopyOnly mode;
- no automatic paste/send.

Do not implement copy-only by duplicating validation in the GUI or monkey-patching `Start-Process` in normal live use. The core script remains the validation authority.

### Core tests

Update existing `handoff-kit/tests.ps1` with focused regression proving:

- existing no-arg handoff still prepares exact clipboard and requests the correct bound URL;
- `-CopyOnly` prepares the exact same packet;
- `-CopyOnly` makes zero browser/open requests;
- all current fail-closed cases remain fail-closed;
- `-CopyOnly` does not weaken URL validation even though it does not navigate;
- no auto paste/send mechanism appears.

### GUI behavior

Keep explicit confirmation. Replace the single forced-navigation experience with two clear real actions:

1. **仅复制交付** — recommended/default low-friction route. Calls accepted core `handoff.ps1 -CopyOnly`; success text tells the user to switch to the intended already-open web/Desktop Chat and manually paste/send.
2. **复制并打开网页对话** — secondary route. Calls existing no-arg handoff behavior and preserves stored HTTPS target navigation.

Both actions must:

- disable concurrent execution;
- re-read and compare target/metadata/packet identity before action;
- re-check after action and warn if changed;
- never auto paste/send;
- not claim that copy-only selected or verified the destination.

Opening/refreshing the GUI alone still has zero clipboard/browser/binding side effect.

### UI tests

Extend the isolated seam to prove:

- copy-only passes the core switch safely;
- copy-only captures exact packet in fixture/mock and records zero open requests;
- open-web route still requests the exact stored URL;
- both routes require explicit confirmation;
- target/packet change invalidates confirmation for both;
- busy guard prevents double action;
- success/failure copy is truthful and distinct.

Regenerate only screenshots materially affected by this correction, using DEMO labels. At minimum provide a captured-delivery view showing the new summary and the two action choices; if success states differ, capture both or document them clearly.

## C — Desktop Route Probe 01 (READ-ONLY ONLY)

Perform after/beside A+B, but do not couple its result to product behavior in this turn.

### Allowed local reads

At current user privileges, inspect OS-exposed metadata only:

- `Get-AppxPackage` results narrowed to the installed official ChatGPT/OpenAI package(s);
- package name, PackageFullName, PackageFamilyName, Version;
- `Get-StartApps` entry / AppID if available;
- `Get-AppxPackageManifest` for the exact matched package;
- extension declarations relevant to `windows.protocol` and `windows.appUriHandler`;
- exact declared protocol scheme names and web hosts, if any.

Use exact/narrow queries. Do not broad-sweep unrelated packages or processes.

### Prohibited

- do not launch any custom URI, HTTPS link, ChatGPT app action or conversation;
- do not open/control ChatGPT or browser UI;
- do not read files from the app install directory beyond the manifest returned by the OS API;
- do not read local databases, history, cache, cookies, tokens, credentials or private client state;
- do not modify registry, protocol registration, defaults, package settings or app state;
- do not install anything, elevate, use WMI/CIM process sweeps or UI Automation/CDP;
- do not guess conversation URI paths and try them.

### Required report

Write a small evidence section/file under the existing untracked `artifacts/usability-spike-01/` area (for example `DESKTOP_ROUTE_PROBE_01.md`) containing only non-sensitive OS metadata and commands/results.

Report exactly:

```text
desktop_app_present = Yes / No / Unknown
package_name = <value or None>
package_family = <value or None>
package_version = <value or None>
start_app_id = <value or None>
registered_custom_protocols = <exact list or None>
registered_app_uri_hosts = <exact list or None>
exact_ordinary_chat_conversation_route = Supported / Undocumented / None
can_prove_exact_conversation_routing = Yes / No
live_uri_launches = 0
ui_automation = 0
client_internal_files_read = 0
```

Interpretation rules:

- a registered scheme only proves app activation registration;
- a registered `chatgpt`-like scheme does NOT establish `/c/<id>` or any other exact conversation semantics;
- an app-uri host registration only proves declared web-to-app association, not that the browser/OS/user settings will route a specific conversation to the app;
- if exact conversation semantics are not documented/exposed, classify `Undocumented` and stop.

Any live Desktop deep-link test requires a later owner decision.

## Allowed files / scope

Expected product/test changes should stay within:

- `handoff-kit/handoff.ps1`
- `handoff-kit/tests.ps1`
- `handoff-kit/ui/PanelAdapter.ps1`
- `handoff-kit/ui/HandoffPanel.ps1`
- `handoff-kit/ui/tests.ps1`
- `handoff-kit/ui/README.md`
- root `README.md` only if needed to document the new copy-only usage and Desktop compatibility boundary.

`Start-Handoff.cmd`, `HandoffKit.Common.ps1`, `configure.ps1`, Hook files and unrelated product files should remain unchanged unless a genuine blocker proves otherwise. If a correct implementation requires changing them, stop and report the minimal scope Gate before doing so.

Evidence under `artifacts/usability-spike-01/` may be regenerated/untracked. Do not commit live URLs, packet contents, credentials or private package data.

## Validation

On final HEAD:

1. run existing core suite under Windows PowerShell 5.1 and report exact pass/fail count;
2. run full UI suite under Windows PowerShell 5.1 STA and report exact pass/fail count;
3. run `git diff --check` for baseline/current correction ranges;
4. confirm tests do not alter live binding / live Stop metadata / live packet / Hook;
5. confirm no live browser/Chat/clipboard action occurred from tests (fixture/mocked clipboard capture is allowed);
6. inspect updated DEMO screenshots at actual available DPI and label untested DPI honestly.

Create at most one additional local correction commit for A+B if practical. The read-only probe does not need a product commit. Do not push or merge.

## Final Delivery Packet

Status may be `IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION` only if A+B final regression passes and evidence is complete. Probe C may return a negative/Undocumented result without failing A+B.

Include:

- starting/final HEAD and commit(s);
- exact changed files / diff stat;
- UX-02 summary behavior and tests;
- UX-03 `-CopyOnly` core behavior and regression evidence;
- final core/UI test commands + counts;
- updated screenshot/evidence inventory;
- Desktop Route Probe 01 exact report and commands;
- `git diff --check`;
- working-tree status;
- Completed / Not Done / Verified / Likely / Unknown;
- Must Fix / User Decision Needed / Future Optional.

## Stop boundaries

STOP instead of expanding if any of the following is required:

- browser extension/native messaging/native host;
- actual existing-tab automation;
- any live Desktop URI/conversation launch;
- auto paste/send;
- ChatGPT internal files/tokens/cache/history access;
- new service/daemon/installer/dependency;
- core redesign beyond backward-compatible `-CopyOnly`;
- elevation/global configuration;
- product push/merge/release/share/paid use.

Do not run live handoff in the same turn whose final response is being returned.

## Next owner gate after Codex completes

If A+B passes, owner validates the real GUI in this order:

1. confirm the live delivery summary is understandable and the raw packet matches expectations;
2. use **仅复制交付** once and manually switch to the already-open ordinary Desktop Chat or web Chat, Ctrl+V and Send;
3. confirm no new tab was created by CopyOnly;
4. optionally use **复制并打开网页对话** once to verify backward-compatible navigation;
5. compare which route is actually easier;
6. only if Desktop Route Probe finds a credible supported exact route, MASTER decides whether to authorize a separate live native-navigation probe.