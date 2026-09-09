# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — owner feedback received / return-destination research complete / overall acceptance open**

Gate 5 external execution remains ON HOLD. This is product/technical validation and bounded prototyping, not Beta or full application development.

The prior MASTER source/evidence review remains PASS for entry into owner validation. The owner has now returned the final packet and reported usability concerns. Do not equate receipt of that packet with proof of every live GUI step, byte-exact clipboard equality, or a positive net-usability verdict. Overall Spike acceptance remains open / PARTIAL at owner-validation level; the underlying accepted Alpha is not reopened.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Active local branch, last reported by Codex: `prototype/usability-spike-01`
- Spike baseline: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- Implementation checkpoint: `9eae64b42a6cc809e61fda60514c09c7b270fe93`
- UF-01 correction / latest reported local HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Last independently checked pushed product-branch HEAD: `869414c77d227fe2f1675c7cfa08b04250520279`
- Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`

No local code execution, product/code push, merge, installation, external sharing or paid API use was performed by MASTER in this research turn. Local and remote versions intentionally differ; do not reset local work to the old remote.

## Dynamic State Authority

- Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
- Ref: `meta/master-state`
- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

Standing MASTER write permission covers only these two canonical docs on this state branch. Product-branch copies are not authoritative dynamic state.

## Completed / Accepted Evidence

- Gate 4 remains PIVOT; later technical passes do not rewrite its result.
- Productization Spike 01 and Combined Dogfood 01/02 accepted in their recorded scopes.
- Dogfood 02 included real failures, corrections and manual recovery; eventual FULL PASS was not a friction-free first run.
- MF-01 explicit safe MASTER rebind and MF-02 README evidence correction accepted.
- Attached-Chat Identity Probe: context readable, no exact conversation ID or canonical URL exposed in the tested path. This is not a universal impossibility claim.
- Correct external post-turn invocation returned the intended final packet. The exact causal sequence of all earlier clipboard symptoms was not independently logged.
- Bounded native GUI and repo-local launcher implemented on the reported UI branch.
- UF-01 deterministic test-owned lifecycle correction completed at self-test level.
- Final core 30/30 and UI 38/38 reported at `1055cc6...`; uploaded Review Evidence, full source diff, inventory and four representative demo screenshots independently reviewed by MASTER.
- Prior source/evidence review PASS for owner entry remains valid.
- Current owner feedback, focused source inspection, current official capability review and targeted GitHub comparison completed.

## Latest Owner Feedback — Evidence, Not Assumptions

The owner supplied the final packet again and stated:

1. The requested confirmation that the captured delivery is the intended final packet cannot be established from the screenshots.
2. UI design/hierarchy is mediocre, but aesthetic polishing should be deferred.
3. Return still opens a new browser tab; investigate whether that can be avoided.
4. Investigate use in ordinary Chat inside the official Windows ChatGPT Desktop, not only web.
5. Study comparable GitHub implementations.

Record these as real workflow feedback. Do not ask the owner to invent another task. No new implementation was authorized by a request to investigate technical feasibility alone.

## Focused Findings

### Packet recognizability

All seven supplied screenshot records explicitly describe DEMO data, not live handoff. They cannot identify the owner's actual latest captured packet. MASTER's prior instruction should not require the user to infer live correctness from demo screenshots.

The source diff shows `Get-PanelSnapshot` displaying raw packet text and a capture/file timestamp. Its Branch/Head fields are read from the CURRENT checkout. Its internal Identity hashes binding + metadata + packet for change detection.

These are different claims:

- displayed current checkout HEAD;
- version declared in a captured Delivery Packet;
- identity/consistency of the captured bytes;
- whether this is the user's intended completed task.

Do not collapse them into 'latest task verified'. A checksum is useful for consistency, not proof of intent or task acceptance. Readable task/correction identification is a bounded usability candidate; missing/ambiguous fields must say so, not be inferred from the current HEAD.

### Why a new tab is requested

The accepted unchanged core `handoff.ps1` ends its successful path with:

`Set-Clipboard -Value $packet`
`Start-Process -FilePath $originChat`

There is no clipboard-only mode, browser tab ID, profile-aware tab selection or native ordinary-Chat route in this current helper. It requests opening an HTTPS URL through the system handler. The owner's browser opens a new tab; the code alone does not establish that all browsers always do so.

### Browser tab reuse

Chrome documents extension APIs to query authorized tab URLs, activate an existing tab and focus its window. Thus automatic reuse is technically feasible without composer injection or auto-send.

A correct implementation for this project would require exact bound-conversation matching within the authorized browser profile, handling duplicates/missing tabs explicitly, and not navigating an arbitrary existing chat or overwriting drafts. A generic first matching `chatgpt.com` tab is not sufficient.

Connecting the local panel to such an extension introduces an additional integration/installation boundary, for example native messaging. This is not a hidden PowerShell option and is not authorized for implementation now.

### Ordinary Chat in Windows ChatGPT Desktop

Current OpenAI documentation confirms ordinary Chat remains available in the desktop app and Chat conversations sync between web and desktop. Therefore the user can use the same ordinary conversation in Desktop and manually paste an already prepared packet there.

This does NOT prove the current helper can automatically open the exact ordinary Desktop conversation. No documented Windows exact-conversation launch contract was established in the reviewed official sources. Opening the app, opening its ordinary Chat view, and selecting a particular conversation are separate capabilities.

Do not infer a Windows route from a macOS `chatgpt://` example, a Codex-thread deep link, or the app's built-in browser. Browser-in-Desktop is not the ordinary Chat view requested by the owner.

## Nearby GitHub Patterns Reviewed

- `eimexdev/RightClickGPT`: optional reuse of an existing provider tab. Pinned `background.js` at `087b201e99cb361cb6d5d11ba29695c5254c5d0f` selects `tabs[0]` from provider-domain matches, then injects a prompt. Borrow the browser tab API pattern, not first-domain-match selection or auto-submission.
- `David-JA/codex-web-review-relay`: user selects a ChatGPT tab and explicitly Arms it; native host + extension transports review and performs browser composer/send actions. Borrow explicit target selection and evidence envelopes; do not import its sending/runtime architecture into this Alpha.
- `pilotmoon/PopClip-Extensions`: ChatGPT App extension at `315e34f5d9f80095d46f79fc75f6c1551b49ad2c` is macOS-oriented, opens `chatgpt://`, then uses Command-key paste/send. It is not evidence for Windows exact-conversation routing and conflicts with current no-auto-paste/send scope.
- `anightmonarch/codex-bridge-chatgpt`: Codex in-app Browser plus explicit browser-automation consent and evidence receipts; operates ChatGPT Web, not a demonstrated native ordinary-Chat deep link.
- `joseanu/codex-from-chatgpt`: Chat calls MCP/local Codex App Server and receives tool results. Architecturally this can avoid a browser-return navigation step, but adopting it changes setup/runtime/orchestration substantially and does not establish Desktop availability for the owner's account.

No inspected project is a drop-in, no-extension/no-service, Windows native exact-Chat return solution satisfying all current boundaries.

## Proposed Smallest Progression — NOT IMPLEMENTED

Priority 1: readable delivery identification from actual packet/metadata, with current checkout version kept separate from the packet's declared version. No guessing, new persistent freshness subsystem, or fabricated readiness.

Priority 2: separate preparation from navigation. Offer an explicit 'copy delivery only' action while retaining the existing prepare-and-open path. This avoids creating a browser tab and permits manual return to an already-open web or Desktop Chat. It does not automatically locate that Chat and must not claim target verification. Keep strict packet/repo/binding checks and exact unmodified payload.

The current core always opens a URL; introducing a supported optional no-open mode changes a previously read-only core interface. A bounded implementation decision is required before coding. Do not work around the interface by silently monkey-patching live navigation.

Parallel research candidate: inspect only OS-exposed installed ChatGPT package/version and protocol-registration metadata, at current-user privileges, to discover whether a documented native launch route exists. Do not read application bundles, history/cache, tokens or credentials; do not change registrations/defaults. Stop on denied access. Registered app activation alone is not evidence of exact conversation support. Any actual Desktop navigation test is a later owner gate.

Extension-based tab reuse is a later option only if its additional setup is justified. Aesthetic polish stays deferred per the owner.

## Verified / Likely / Unknown

### Verified within available evidence

- The posted packet names the reviewed final local HEAD and previously reviewed self-test results.
- Supplied screenshots are demo evidence, not live current-packet proof.
- The current core couples clipboard preparation and URL opening.
- The GUI reads current Git HEAD separately from packet bytes and performs internal consistency checks.
- Chrome documents tab/window activation APIs; Microsoft documents URI handlers and read-only package-manifest retrieval.
- OpenAI documents ordinary Desktop Chat and web/desktop Chat synchronization.

### Likely / engineering inference

- Optional clipboard-only preparation could reduce unnecessary tab creation for users who already have the intended conversation open.
- A readable delivery summary could reduce uncertainty about what is being copied.
- Both benefits require later owner comparison; avoiding navigation may instead add manual conversation-search cost.

### Unknown / Not Done

- New independent byte-exact clipboard comparison for the latest owner attempt.
- Complete live GUI step-by-step observation and net-usability verdict.
- Exact Windows native Chat conversation deep-link/API for the owner's installed build.
- Local protocol-registration audit and owner navigation validation.
- Any implementation of copy-only or improved delivery identification.
- 150%/200% DPI, exhaustive manual keyboard testing, prior ambiguous process status.
- Gate 5, external value, product push or distribution.

## Must Fix / User Decision Needed / Future Optional

Must Fix for acceptance clarity: stop treating demo screenshots/current checkout HEAD as proof of the intended captured final response. Record the owner's recognizability concern; there is no newly confirmed packet-corruption or wrong-target code defect in this report.

User Decision Needed: whether to authorize the narrow delivery-identification + optional-copy-only change, including the minimal compatible core-interface exception. Browser extension, native host, automatic Desktop routing and broader architecture remain unapproved.

Future Optional: visual polish, extension-based exact-tab focus after cost validation, native routing only with a proven supported contract. No automatic paste/send.

## Next Smallest Step

Return the research conclusions and recommended bounded combination to the owner. Do not start a new implementation or ask for another synthetic task. On approval, hand the narrow changes to the same Codex project and keep Windows native routing investigation separate from any promise of support.

## Primary Sources Checked — 2026-09-09

- OpenAI Desktop: https://help.openai.com/en/articles/20001275/
- OpenAI Projects/chats: https://learn.chatgpt.com/docs/projects
- OpenAI Hooks: https://learn.chatgpt.com/docs/hooks
- Chrome tabs: https://developer.chrome.com/docs/extensions/reference/api/tabs
- Chrome windows: https://developer.chrome.com/docs/extensions/reference/api/windows
- Chrome native messaging: https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging
- Microsoft URI launch: https://learn.microsoft.com/en-us/windows/apps/develop/launch/launch-default-app
- Microsoft Get-AppxPackageManifest: https://learn.microsoft.com/en-us/powershell/module/appx/get-appxpackagemanifest
- The above GitHub READMEs and pinned code were read through the connected GitHub tool, not substituted for official OpenAI capability documentation.
