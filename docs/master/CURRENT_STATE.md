# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**UI-UX-FOUNDATION-01R2 — MASTER-ACCEPTED (ENGINEERING/UI SCOPE)**

**LOCAL-LAUNCH-PREFLIGHT-01 — PASS / ROUTE A SELECTED**

**LOCAL-LAUNCH-01 — BOUNDED WINDOWS LAUNCHER AUTHORIZED / NOT YET EXECUTED**

**OWNER-VALIDATION-01 — OWNER-DEFERRED / NOT EXECUTED**

Active product: **知而能讲**, existing local Web Study-first + spoken teach-back app.
Flow remains:
`local file extraction -> preview/select -> Learn -> continuous Explain -> replay/confirm -> Diagnose -> legitimate Repair/new attempt -> Apply`.

## Exact product state

Private repo: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Current MASTER-accepted feature checkpoint:
`3a6137d9b39d8e2bdfef8e6366d9bceec7d01031`

R2 is accepted at the bounded engineering/UI scope: Node45/45, Edge27/27 with synthetic media/stub providers, extraction6/6, prominent local file entry, import/preview zero provider calls, neutral sans-serif product UI, and unchanged safe ledger/new paid calls0. Owner Validation remains deferred.

## LOCAL-LAUNCH-PREFLIGHT-01 — current/collision findings

### Current product source facts

- Runtime is a loopback-only Node HTTP server at `127.0.0.1:4317` (`study-teachback-app/server.mjs`).
- Today the operator must explicitly run `node study-teachback-app/server.mjs` and then open `http://127.0.0.1:4317`.
- The app remains plain HTML/CSS/ES modules with no `package.json`/framework requirement in `study-teachback-app`.
- Source extraction also depends on the existing repo-owned `.venv` / pinned pypdf contract; normal runtime never installs dependencies.
- Provider credential remains process environment only (`OPENAI_API_KEY`); source code does not read or create `.env` and the launcher must not introduce secret persistence.
- Ledger path is import-relative under `study-teachback-app/runtime/usage.json`, so launch CWD should not redefine ledger identity.
- Browser learning data/microphone permissions are tied to the current localhost origin; preserving `http://127.0.0.1:4317` avoids an unnecessary storage/permission migration.

### Verified external/current facts

1. **Microsoft Edge can install any website as an app**, not only a manifest-defined PWA, and can create Start/taskbar/desktop shortcuts. Official support: `https://support.microsoft.com/en-us/edge/install-manage-or-uninstall-apps-in-microsoft-edge`.
2. Edge PWAs can integrate with Windows, but that installation layer assumes the web origin is available; it does not itself start this repo's Node server or Python extractor. Official developer docs: `https://learn.microsoft.com/en-us/microsoft-edge/progressive-web-apps/ux`.
3. `http://127.0.0.1` / `localhost` are potentially trustworthy origins for secure-context web APIs, so the existing local browser media path does not require HTTPS merely for local use. Current MDN secure-context reference: `https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Secure_Contexts`.
4. Current ChatGPT Desktop/Codex includes local folders, terminals and a built-in browser useful for development/review, but current official docs do not provide a mechanism that packages or starts this external local product for an end user. OpenAI references: `https://help.openai.com/en/articles/20001276/` and `https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app`.
5. **PWABuilder** is active and appropriate for packaging/installing web apps/store routes, but does not remove this product's local Node/Python sidecar startup requirement. Repo: `https://github.com/pwa-builder/PWABuilder`.
6. **Nativefier** is archived/unmaintained since 2023 and explicitly recommends browser site-app shortcuts or Electron instead; reject as a new dependency. Repo: `https://github.com/nativefier/nativefier`.
7. **Electron** is an established native wrapper, but official distribution guidance adds packaging/signing/update responsibilities; it would duplicate a browser engine and does not solve Python-sidecar packaging for free. `https://www.electronjs.org/docs/latest/tutorial/distribution-overview`.
8. **Tauri** uses Windows WebView2 and is lighter than Electron in some cases, but adds Rust/build/installer integration and still requires an explicit sidecar/runtime design. Current prerequisites: `https://v2.tauri.app/start/prerequisites/`.
9. Microsoft WebView2 has active official samples, but a bespoke WebView2 host is still a new native application layer, not a free launcher. `https://github.com/MicrosoftEdge/WebView2Samples`.
10. Node single-executable applications are improving, but remain an additional packaging track and do not package the Python/pypdf extractor by themselves. Not selected for this alpha.

### Route comparison

**Route A — repo-owned Windows launcher: SELECTED.**
Smallest change; preserves exact localhost origin, current Node/Python boundaries, IndexedDB/mic permissions and browser auto-updates. Can reduce `cd -> run server -> find/open URL` to one explicit launcher action. No framework or installer is required.

**Route B — PWA / Edge install-as-app: useful complement, NOT the primary solution now.**
It can provide an app-like window/shortcut, but the local server still must be started. A service worker/offline shell does not remove network dependence of model calls and introduces caching/update surface. Do not add a service worker merely for optics. Manifest/favicon may be future polish after launcher behavior is proven.

**Route C — Electron/Tauri/WebView2/native installer: DEFER.**
Potentially relevant only when the owner chooses real external distribution/installer packaging. Current single-owner alpha does not justify new build systems, code signing, runtime bundling or origin migration risk.

## Product decision

**LOCAL-LAUNCH-PREFLIGHT-01 = PASS.**

Proceed with one bounded implementation experiment: **LOCAL-LAUNCH-01 — Windows One-Action Local Launcher**.

This is not authorization for an installer, native shell, startup daemon, Windows service, system-wide PATH mutation, browser policy change, PWA service worker, Microsoft Store publication or public release.

## LOCAL-LAUNCH-01 required behavior

Goal: from the repository on the current Windows machine, reduce normal startup to one explicit launcher action while failing closed on uncertain state.

Implement a transparent repo-owned launcher; exact file split is Codex's choice but keep it small (for example one PowerShell launcher plus an optional tiny `.cmd` double-click entry and focused tests/docs).

Required:
- locate repo/app from the launcher file path, not the caller's current directory;
- work from a fresh/non-repo shell directory;
- require existing Node and existing repo-owned extractor environment; **never auto-install/download** Node/Python/pypdf;
- safely check current extractor readiness without modifying it;
- never read/write `.env`, credential stores, browser profiles or ChatGPT/Codex private files;
- check whether `OPENAI_API_KEY` is available to the launch process without printing/logging its value; if unavailable, fail closed with a concise setup message rather than persisting a secret;
- preserve port/origin `127.0.0.1:4317`;
- if the expected app server is already running, reuse it and do not start a duplicate;
- if port 4317 is occupied by an unknown/non-matching process, fail closed and **do not kill it**;
- if starting a new server, make its lifetime/state visible and user-controlled; no hidden permanent daemon/service/autostart;
- wait for safe readiness before opening the URL; do not open a broken page optimistically;
- open only the exact loopback product URL; no browser automation, paste or send;
- provide a clear shutdown/recovery path that only targets a launcher-owned/positively identified process;
- no provider/model request merely from launching;
- preserve all current app/ledger/storage/source/ASR contracts.

Testing must use no live model call. A temporary fake key may be scoped only to a launcher smoke process if needed to exercise readiness, but it must not be persisted or sent to a provider. Record actual Windows PowerShell 5.1 behavior, fresh CWD behavior, already-running reuse, missing Node/venv/key, unknown port occupancy, startup readiness/open target, shutdown ownership and ledger before/after.

Standing private fast-forward permission applies to the same named feature branch for this bounded approved work. Return exact remote SHA and tracked human-readable evidence. No merge/release follows automatically.

## Classification

Completed:
- BUILD-01/R3/R4/source ingestion/portability;
- UI-UX-FOUNDATION-01 R1/R2 and MASTER review;
- LOCAL-LAUNCH-PREFLIGHT-01 research/collision check.

Verified:
- current accepted product SHA `3a6137d...`;
- current manual loopback server architecture and secret/extractor/ledger boundaries from source;
- Edge/PWA/current wrapper facts listed above;
- no existing lightweight option examined removes the local Node+Python startup requirement without integration work.

Likely:
- a repo-owned launcher is the lowest-cost way to make the current single-owner alpha feel materially more launchable without premature packaging.

Unknown:
- exact current-machine experience of one-action launch/reuse/shutdown until Codex runs the experiment;
- whether a visible/minimized local service window is acceptable long term;
- future external distribution/signing/runtime-bundling design;
- real owner file/microphone journey.

Not Done:
- LOCAL-LAUNCH-01 implementation/review;
- OWNER-VALIDATION-01;
- installer/native packaging/store/public release/external validation.

Must Fix:
- none currently known before launcher experiment.

User Decision Needed:
- none for the bounded repo-local launcher authorized by the owner's request to continue product/app landing;
- installer/native wrapper, OS startup/background service, system-wide changes, public distribution, signing spend or new framework requires a new owner decision.

Future Optional:
- Edge site-as-app/PWA manifest/icon after launcher proves useful;
- Node/Python runtime bundling;
- Tauri/WebView2/Electron packaging only if external distribution becomes a real requirement;
- UI footer copy polish/broader AT/device validation.

## Next Smallest Step

**Codex implements LOCAL-LAUNCH-01 on top of `3a6137d...`, with zero paid product API calls, no installs/system changes, then pushes tracked evidence for MASTER delta review. Owner Validation remains deferred.**
