# Current State

Updated: 2026-09-09
Role: 00 MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — OWNER FEEDBACK CORRECTION APPROVED / Desktop Route Probe approved read-only**

Gate 5 remains ON HOLD. The project is still in product/technical validation and bounded prototyping; it is not Beta or full application development.

The prior GUI implementation, UF-01 self-test closure and MASTER source/evidence review remain accepted in their recorded scopes. Overall usability acceptance remains open because the owner found two real workflow costs: captured-delivery recognizability is insufficient, and the current successful return always requests opening the stored HTTPS Chat URL, producing an unwanted new browser tab in the owner's environment.

## Active Repo / Version

- Local repo: `F:\Chat-Codex-Handoff\validation-repo`
- Active local branch last reported: `prototype/usability-spike-01`
- Spike baseline: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- Implementation checkpoint: `9eae64b42a6cc809e61fda60514c09c7b270fe93`
- UF-01 correction / latest reported local HEAD: `1055cc6bcfa5afc9ca75d9bf10b651562d7b6311`
- Last independently checked pushed product branch: `869414c77d227fe2f1675c7cfa08b04250520279`
- Private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`

No product/code push, merge, external sharing, public release, paid API use, dependency installation or privilege escalation is authorized.

## Dynamic State Authority

- Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
- Ref: `meta/master-state`
- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

MASTER standing write permission remains limited to these two files on the state branch.

## Accepted Evidence

- Existing Alpha / Dogfood acceptance stays unchanged.
- GUI implementation and UF-01 deterministic test lifecycle are accepted at engineering-evidence level.
- Final reported core suite = `30/30 PASS`; final isolated UI suite = `38/38 PASS` at `1055cc6...`.
- MASTER independently reviewed transferred `source.diff`, `REVIEW_EVIDENCE.md`, screenshot inventory and representative final demo screenshots.
- Demo screenshots are explicitly demo-only and cannot prove which real packet is the owner's intended latest delivery.
- Current GUI reads current checkout Branch/HEAD, raw packet text, capture time and target; its identity hash detects changes but does not prove user intent.
- Current accepted core `handoff.ps1` couples exact clipboard preparation with `Start-Process` of the stored HTTPS Chat URL.

## Owner Decision — Approved 2026-09-09

The owner approved MASTER's recommended bounded progression:

### A. Delivery identity clarity

Implement a readable summary derived from the actual captured packet / metadata while preserving the raw packet unchanged.

Required semantics:

- show a task/correction title only when present in the actual packet;
- show capture time;
- show a short packet fingerprint for byte identity;
- distinguish packet-declared version from current checkout HEAD;
- absent or ambiguous fields must say `未提供 / 不明确`, never be guessed from current Git state;
- keep the full raw preview and current confirmation/identity checks;
- do not claim `latest task verified`, task completion or acceptance.

### B. Separate copy from navigation

Add a minimal backward-compatible core option for **copy-only** preparation.

Required semantics:

- existing no-argument `handoff.ps1` behavior remains unchanged: strict validation -> exact clipboard -> request opening stored HTTPS Chat URL;
- add an explicit `-CopyOnly` mode: perform the same validation and exact clipboard write but do **not** call `Start-Process`;
- GUI makes `仅复制交付` the low-friction route for an already-open web or ordinary Desktop Chat;
- GUI retains an explicit secondary `复制并打开网页对话` route for users who need navigation;
- both real actions remain explicit confirmation-gated and preserve target/packet before/after consistency checks;
- no automatic paste/send, tab control, clipboard monitoring, target guessing or browser automation.

This is an approved narrow exception to the prior read-only core boundary. Only the compatible `CopyOnly` interface and its tests/docs are authorized; no broader core redesign.

### C. Desktop Route Probe 01 — read-only only

Codex may inspect current-user, OS-exposed metadata for the installed official Windows ChatGPT app:

- installed package identity/name/version/family;
- Start-menu AppID if available;
- package manifest extension declarations relevant to `windows.protocol` and `windows.appUriHandler`;
- declared protocol scheme names / web hosts if exposed by the manifest.

Rules:

- do not launch any URI or ChatGPT app route;
- do not read ChatGPT application source/bundle files, local databases, history/cache, cookies, tokens, credentials or internal configuration;
- do not modify registry, app associations, defaults, package state or settings;
- do not enumerate unrelated processes or use UI automation/CDP/browser automation;
- no elevation and no dependency install;
- stop on denied access;
- a registered app/protocol alone is NOT proof that an exact conversation deep link exists.

Final probe classification must distinguish:

- Desktop app present: Yes/No/Unknown;
- registered custom protocol(s): exact names or None;
- registered app-uri web host(s): exact hosts or None;
- exact ordinary-Chat conversation route: Supported / Undocumented / None;
- can prove exact conversation routing from current evidence: Yes/No.

Any live Desktop navigation test remains a later owner-controlled gate.

## Freshness / Comparison Findings

Current official Windows documentation confirms that URI activation depends on app-declared protocol/app-URI handlers; package registration alone does not define conversation-path semantics. Current OpenAI material reviewed by MASTER did not provide a documented Windows exact-conversation launch contract for ordinary Chat.

Nearby GitHub patterns remain references only:

- RightClickGPT demonstrates browser-tab reuse via Chrome extension APIs but selects a provider-domain tab and performs prompt injection; not safe to copy for MASTER targeting.
- Codex Web Review Relay uses explicit Arm + extension/native host and then browser composer/send actions; heavier than this approved correction.
- PopClip ChatGPT App uses macOS `chatgpt://` plus keyboard automation; not Windows exact-conversation evidence.
- codex-bridge-chatgpt uses browser automation with explicit consent; not native ordinary-Chat routing.
- codex-from-chatgpt changes architecture to MCP/App Server orchestration; not a small return-path patch.

Do not implement an extension/native host/server in this correction.

## Classification

### Must Fix before USABILITY-SPIKE-01 acceptance

- **UX-02 — Captured delivery must be recognizable without treating demo screenshots/current checkout HEAD as proof of the intended packet.**
- **UX-03 — Return preparation must not force a new web tab when the user only needs the validated packet copied for an already-open web/Desktop Chat.**

### User Decision Needed

None to begin this approved bounded correction and read-only probe.

Stop again for: browser extension/native host, any actual Desktop URI launch, automatic exact-tab focus, core redesign beyond `-CopyOnly`, new dependencies, elevated access, external sharing, push/merge/public release or paid use.

### Future Optional

- exact existing-browser-tab focus only if extension/setup cost is later justified;
- native Desktop exact-conversation routing only if a supported contract is established;
- visual polish, high-DPI and fuller accessibility validation after functional owner feedback.

## Not Done

- UX-02 implementation/tests;
- UX-03 `-CopyOnly` core/UI implementation/tests;
- Desktop Route Probe 01 local read-only result;
- updated final evidence / screenshots as needed;
- owner live comparison of `仅复制交付` versus old open-new-tab path;
- exact Desktop conversation navigation validation;
- Gate 5, product push/distribution.

## Next Smallest Step

Resume the **same USABILITY-SPIKE-01 Codex task** from local HEAD `1055cc6...` with the compact correction in canonical HANDOFF.

Codex may implement A+B, run final core/UI regression, perform C read-only, regenerate bounded evidence, and stop at `IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION` if all approved evidence passes.

Do not run a live real handoff or Desktop navigation in the same turn. The next owner gate is a real GUI test after the Codex turn fully ends.