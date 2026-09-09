# Active Handoff

Updated: 2026-09-09
Role: 00 MASTER

## Phase

**USABILITY-SPIKE-01 — owner feedback received / return UX research complete / overall acceptance open**

Gate 5 remains ON HOLD. MASTER evidence review remains PASS for owner-validation entry, not overall usability acceptance. The latest feedback is a real project need; do not manufacture another test task or start cosmetic redesign.

## Current Local State

- Repo: `F:\Chat-Codex-Handoff\validation-repo`
- Branch: `prototype/usability-spike-01`
- Spike baseline: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- Implementation checkpoint: `9eae64b42a6cc809e61fda60514c09c7b270fe93`
- Latest Codex-reported local HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Last independently checked pushed product branch: `869414c77d227fe2f1675c7cfa08b04250520279`
- Canonical dynamic state: `BenCCCCCCCCC/Chat-Codex-Handoff`, `meta/master-state`, the two files under `docs/master/`.

No product/code push, merge, public release, private external sharing, dependency installation, paid use or privilege escalation is authorized. No local implementation was performed by this research turn. Do not reset to the older remote branch.

## Completed

- Bounded native GUI implementation and UF-01 test-owned lifecycle correction.
- Final reported core regression 30/30, isolated UI suite 38/38 at the above local HEAD.
- Test child READY / CLOSED / exit 0 evidence, without system-process scanning.
- MASTER independent reading of the transferred source diff, review evidence, screenshot inventory and representative demo screenshots.
- Prior source/evidence review PASS for entering owner validation.
- Owner supplied the final packet and reported new-tab behavior, inability to identify the real final delivery from screenshots, and deferred aesthetic polish.
- Targeted official OpenAI / Chrome / Microsoft research and five relevant GitHub patterns reviewed.

## Owner Feedback and Acceptance Boundary

The owner asks for:

- a reliable way to recognize the intended captured delivery;
- avoiding a new browser tab for every return;
- use in ordinary Chat in the official Windows ChatGPT Desktop;
- technical feasibility and comparable GitHub solutions.

Do not infer unreported owner-test steps from the pasted Delivery Packet. The received packet matches the previously reviewed final-version report, but this turn has not supplied a new independently measured clipboard equality result or complete usability comparison.

The original screenshots are all explicitly DEMO. They cannot prove which live packet is current. Correct the acceptance instructions rather than making the user re-certify demo data. A current Git HEAD displayed by the panel is not automatically the version declared by the captured packet.

Overall acceptance remains open / PARTIAL at owner-validation level. Do not reverse accepted UF-01 or Alpha results without contradictory evidence.

## Focused Technical Findings

### Current implementation

`Get-PanelSnapshot` reads the current checkout's Branch/Head, raw packet preview, capture/file timestamp and stored target. It hashes binding + metadata + packet to detect changes. That consistency check does not prove the packet is the user's intended latest task.

The unchanged core `handoff.ps1` unconditionally runs both `Set-Clipboard` and `Start-Process` with the stored HTTPS Chat URL after validation. No supported copy-only switch, existing-tab identity, profile selection or native ordinary-Chat route is implemented.

### Reuse an existing browser tab

Chrome's official extension APIs can query authorized URLs, activate a matching tab and focus its window. This can be designed without composer injection or auto-send.

For this project, match the exact intended conversation, not the first ChatGPT tab or a title. Preserve drafts; do not navigate another conversation into the requested one. Missing/duplicate matches and browser-profile scope require explicit handling. A local-panel-to-extension path also needs an authorized communication/install mechanism, for example native messaging.

Conclusion: technically feasible with an extra browser integration; not currently implemented or authorized.

### Ordinary Chat in Desktop

OpenAI documents ordinary Chat inside Desktop and synchronization of Chat conversations between web and Desktop. Manually selecting the same conversation and pasting an already prepared packet is a valid usage route, not a requirement to change this project to Work or another product.

Automatic exact native-conversation opening is a different capability. No documented Windows contract for it was established in this research. App activation, native Chat view selection, and exact conversation routing must be tested separately. An in-app browser remains a web route, not the native Chat requested here.

Do not invent `chatgpt://` conversation paths, infer Windows support from macOS code, or repurpose Codex thread links as ChatGPT conversation links.

## GitHub Reference Patterns

- RightClickGPT (`eimexdev/RightClickGPT`): browser tab reuse is implemented; pinned `background.js` at `087b201e99cb361cb6d5d11ba29695c5254c5d0f` uses the first provider-domain match and then injects a prompt. Useful API reference, unsafe target-selection template for MASTER and not a no-auto-send drop-in.
- Codex Web Review Relay (`David-JA/codex-web-review-relay`): user manually opens/Arms the intended tab; native host plus extension performs review transport and composer/send operations. Useful explicit target ownership and version-envelope reference, but heavier and outside current sending rules.
- PopClip ChatGPT App (`pilotmoon/PopClip-Extensions`, Config.ts at `315e34f5d9f80095d46f79fc75f6c1551b49ad2c`): macOS-oriented `chatgpt://` launch plus Command-V/Return automation. Not Windows exact-conversation evidence.
- Codex Bridge (`anightmonarch/codex-bridge-chatgpt`): in-app Browser, explicit browser-risk consent, structured packets/receipts. Web control, not demonstrated native Chat routing.
- codex-from-chatgpt (`joseanu/codex-from-chatgpt`): Chat invokes MCP/local Codex App Server and receives results as tool output. This avoids the UI-return problem architecturally, but adopting the service/tunnel orchestration would be a separate product decision, not a small GUI patch.

Primary-source URLs and source boundaries are recorded in CURRENT_STATE.md. No project was installed, contacted or executed.

## Recommended Minimum Combination — PENDING IMPLEMENTATION APPROVAL

### A. Make the actual delivery recognizable

Proposed narrow behavior:

- show a readable task/correction label when supplied by the actual packet;
- show capture time and a delivery identity/detail view;
- distinguish packet-declared version from current checkout HEAD;
- label absent/ambiguous values as unknown/not supplied;
- keep full raw preview and exact copy; no rewriting or fabricated identity;
- retain confirmation and before/after consistency checks.

This is functional clarity, not a cosmetic redesign or new persistent freshness subsystem.

### B. Separate preparation from navigation

Propose explicit 'copy delivery only' alongside the existing prepare/open route. A user can then switch manually to an already-open browser or native Desktop Chat without creating a new tab.

Be explicit about the tradeoff: copy-only avoids navigation; it does NOT automatically select/verify the destination and may require manual search. Keep strict repo/packet/binding validation and clearly display the stored target.

The current core always opens the URL. A supported optional no-open mode needs a minimal backward-compatible core-interface change, which was read-only in USABILITY-SPIKE-01. This change is NOT authorized yet. Do not silently replace core behavior, monkey-patch live Start-Process, or use a second unvalidated copy implementation.

### C. Desktop native routing — research only

The next useful local feasibility check is current-user, read-only OS-exposed application package/version and declared protocol-registration metadata. Microsoft documents package-manifest retrieval, but registration is not proof of a conversation-routing contract.

Do not read application source bundles, internal chat/history/cache, cookies, credentials or tokens. Do not modify registry/default handlers, scan unrelated processes, elevate, install dependencies, control UI, or brute-force URL paths. Stop on denied access. Report exactly what is documented/registered versus what remains unknown.

Do not launch a URI or act on a real Desktop Chat during an unattended research run. Any actual exact-conversation navigation check is a later owner gate.

## Decisions

- Aesthetic polish deferred per the owner.
- Do not call the GUI successful solely because engineering tests passed.
- Keep web and native ordinary-Chat destination requirements distinct.
- Keep automatic paste/send prohibited.
- No extension/native host/server/CDP/UI automation adoption now.
- Preserve existing CLI behavior and no-code-push boundary.
- No new code task is dispatched by this handoff; it records a research result and proposed bounded change.

## Must Fix / User Decision Needed / Future Optional

Must Fix for acceptance clarity: demo screenshots and current checkout HEAD must not be used as proof of the intended live final packet. The owner recognizability concern is real; no packet corruption or new wrong-target defect is established by this report.

User Decision Needed: approve or reject the narrow delivery-identification + optional-copy-only implementation, including the minimal compatible core-interface exception. Read-only Desktop routing research may be prepared separately; live validation is not implied.

Future Optional: UI styling, high-DPI/manual accessibility testing, extension-based exact-tab focus after setup-cost evaluation, native routing only after its exact contract is established.

## Not Done / Unknown

- Full owner live-flow acceptance and net-usability verdict.
- A new independently measured clipboard-vs-packet equality result.
- Proposed delivery-identification and copy-only implementation.
- Read-only local Desktop protocol audit and any real native routing test.
- Previous ambiguous test process status, 150%/200% DPI and exhaustive manual keyboard evaluation.
- Gate 5/external validation, product push and distribution.

## Next Smallest Step

Present research and the bounded recommendation to the owner. On approval, prepare a compact same-project Codex task for A+B, with C as a separately labelled read-only feasibility question. Stop at any new scope or permission boundary. Do not begin a full browser bridge, synthetic product task, or speculative visual redesign.
