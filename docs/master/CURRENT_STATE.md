# Current State

Updated: 2026-09-09  
Role: MASTER / authoritative dynamic state

## Current Stage

**USABILITY-SPIKE-01 — bounded guided local handoff panel / READY FOR CODEX**

Gate 5 external execution is **ON HOLD** following the user's current direction: no external participant is available, and the user wants a more understandable, usable visible prototype first.

Alpha v0.1 remains the accepted technical baseline. This is still product/technical validation and bounded prototyping, not Beta or full application development. The UI has NOT been implemented or validated yet. MASTER has prepared the task; no local Codex execution has been started by this Chat.

## Active Repo / Version

- repo: `F:\Chat-Codex-Handoff\validation-repo`
- last confirmed active code branch: `prototype/lightweight-handoff-v0.1`
- last Codex-reported local code HEAD: `a77cacdbda70bcd8b0808a4c4853740f481adbc0`
- last independently checked pushed code HEAD: `869414c77d227fe2f1675c7cfa08b04250520279`
- private remote: `BenCCCCCCCCC/Chat-Codex-Handoff`
- planned LOCAL task branch, not yet confirmed created: `prototype/usability-spike-01`

Codex must verify local repo/branch/HEAD/worktree before writing. Do not treat the remote branch as the latest local code, and do not reset to it. Code push, merge, force push, external sharing, public release and paid API use remain unauthorized.

## Dynamic State Authority

- repository: `BenCCCCCCCCC/Chat-Codex-Handoff`
- ref: `meta/master-state`
- `docs/master/CURRENT_STATE.md`
- `docs/master/HANDOFF.md`

MASTER may maintain only these two canonical paths on this state branch under standing permission. Product-branch copies of these paths are not current authority. Codex must not edit or merge the state branch as part of the UI task.

## Completed / Accepted Baseline

- Gate 4 = PIVOT; do not rewrite it as a later market-value PASS.
- Productization Spike 01 = PASS.
- Official Existing-Chat -> Codex Probes 01 and 02 = PASS.
- Combined Lightweight Workflow Dogfood 01 = FULL PASS.
- Source Maintenance Probe 01 and Fresh MASTER Recovery = PASS.
- Repository / State Integrity Audit 01 = PASS at its recorded checkpoint.
- Dogfood 02 original root README task = PASS, commit `a0bf8d74568a3a955126281991180f8641114bf9`.
- MF-01 wrong-return-target = fixed via explicit safe `-Rebind`, commit `5cd04c811fad6f59f530bfd146a36148bdece98a`; 30/30 Windows PowerShell 5.1 focused tests were reported PASS.
- First natural concise Correction Packet = PASS in the recorded same-task workflow.
- Attached-Chat Identity Probe 01 = completed with negative identity result: context readable, no exact conversation ID/URL exposed in that tested path; zero commands/files/browser automation.
- MF-02 stale README evidence wording = PASS, commit `a77cacdbda70bcd8b0808a4c4853740f481adbc0`.
- Post-turn external handoff sequencing verification = PASS.
- Combined Lightweight Workflow Dogfood 02 = FULL PASS after corrections and evidence reconciliation, not a friction-free first-pass run.
- Gate 5 Micro Pilot protocol was prepared internally; no participant contact/sharing/execution occurred.
- USABILITY-SPIKE-01 task, acceptance criteria, isolated-test plan, visual review plan and owner validation boundary are now prepared in canonical HANDOFF.

## User Direction / MASTER Scope Decision

The user asked for a substantial Codex task while resting, remaining within this project, prioritizing ease of use, suitability and a visible product exterior before external users.

MASTER interprets that request narrowly as permission for one **repo-local, on-demand, user-operated GUI usability prototype**, using the existing CLI primitives. This is an explicit limited exception to the former no-GUI/no-launcher freeze, not permission for a full companion app or general platform.

Permitted: local UI implementation, a repo-local double-click entry, isolated regression tests, own-window demo rendering/screenshots, relevant usage documentation and bounded local checkpoint commits.

Not permitted: server/daemon, installer/global launcher, auto-start, browser/ChatGPT automation, automatic target discovery, clipboard monitoring, auto paste/send, credential access, new external services/dependencies, paid API/credits, product push, merge, public or private external distribution.

Do not reinterpret 'a long task' as unlimited iterations or permission to fill time with new features. Codex should complete the bounded design -> implementation -> tests -> visual review -> evidence cycle, then stop.

## User Hypothesis, Not Market Fact

The user proposes AI beginners/light users as an important audience. Treat this as a hypothesis for accessible language and interaction, not proof that most Chat/Codex users are beginners or that low-frequency users necessarily benefit.

Working target: a non-specialist individual who actually needs Chat planning plus local Codex execution. For occasional one-shot edits, native tools/manual copy may remain cheaper than configuring this kit. UI should explain when it is unnecessary rather than force adoption.

## Verified / Likely / Unknown

### Verified within recorded evidence

- The existing official Chat-context entry and local return helper work in the tested private workflow.
- MASTER state recovery and repo binding are separate: recovering state did not migrate the old Chat URL.
- Explicit rebind corrected the observed wrong-target case; default conflict refusal remains.
- A final response must exist before it can be materialized/returned. The tested external post-turn sequence delivered the intended MF-02 packet.
- Previous wrong-target, clipboard/retry, evidence-reconciliation and command/cwd steps created real user coordination costs; final PASS does not erase them.
- Current attached-chat identity probe did not expose an exact identity. Do not generalize one negative probe into a universal impossibility claim.
- Microsoft documents native .NET Windows Forms use from Windows PowerShell; the new UI's compatibility is still to be tested locally.

### Likely / Design hypothesis

A guided window may lower command/working-directory burden and make target/packet/timing visible while retaining manual send. This is not yet an observed usability improvement.

### Unknown

- Whether the proposed GUI actually reduces total effort rather than adding a new window.
- Beginner comprehension and low-frequency user value.
- UI runtime, scaling, keyboard usability and live integration on the user's machine.
- Long-task Existing Chat refresh behavior.
- Independent external value, installability and sustained use.
- Earlier clipboard symptom's exact causal sequence was not independently logged; post-turn retry success does not prove all possible stale-packet cases impossible. No new persistent freshness subsystem is authorized.

## Current Product Contract

Keep official Existing Chat -> Codex as the initial context path. The new GUI must only wrap existing repo-local configure/rebind/handoff behavior.

- Single checkout; derive location from the launched script, not incidental cwd.
- Read-only status/preview on launch and refresh; no clipboard/browser/binding side effects without an explicit action.
- Show the stored target honestly; do not claim it has been automatically confirmed as the current MASTER.
- No identity guessing. A new MASTER still requires one explicitly provided URL and confirmed rebind.
- Show 'captured delivery' rather than 'task completed'. Stop/metadata alone does not prove current-turn completion or acceptance.
- User confirms that Codex has ended and that the displayed packet/target is intended before return.
- Preserve exact packet text, existing validation and the 64 KiB limit.
- Never auto paste/send. Success means preparation/launch request, not independent browser verification or sent message.
- Keep the accepted CLI fallback intact.

## Freshness / Collision Check — 2026-09-09

MASTER read current primary sources for this scope:

- OpenAI Desktop: `https://help.openai.com/en/articles/20001275/`.
- Official Projects/chats: `https://learn.chatgpt.com/docs/projects`.
- Official Hooks: `https://learn.chatgpt.com/docs/hooks`.
- Microsoft PowerShell/Windows Forms: `https://learn.microsoft.com/en-us/powershell/scripting/samples/creating-a-custom-input-box?view=powershell-7.5`.
- Current GitHub READMEs of `joseanu/codex-from-chatgpt`, `David-JA/codex-web-review-relay`, and `anightmonarch/codex-bridge-chatgpt` through the connected GitHub read path.

The checked projects use MCP/App Server/tunnel or extension/browser-control paths, not a directly reusable no-service native GUI around this repo's approved primitives. No exact replacement was established in this bounded check; this is not a claim that none exists anywhere. Do not rebuild their bridge/transport features.

## Must Fix / User Decision Needed / Future Optional

Must Fix: none outstanding from the accepted Alpha task. UI implementation defects must be judged against this new bounded task, not retroactively added to Dogfood 02.

User Decision Needed: none to begin the bounded local work defined in HANDOFF under the current request. Stop for new scope, core-contract changes, permissions, installation, spending, external sharing or live owner validation.

Future Optional: addressless rebinding if a supported source emerges, global installation, multi-repo UI, persistent freshness/clipboard protection. Do not implement these now.

## Not Done

- Codex task dispatch/execution; planned local branch creation.
- UI implementation, automated tests and screenshots.
- Owner's real UI -> clipboard -> current MASTER acceptance.
- Beginner/external validation and Beta decision.
- Product/code push or distribution.

## Next Smallest Step

User launches the prepared **USABILITY-SPIKE-01** in local Codex. The complete task is canonical HANDOFF, not a new Project Source upload.

Codex may autonomously finish the bounded local work and isolated self-tests, but must not change live binding, write the real clipboard, open the user's Chat, or run live handoff while the user rests. Real integration remains a later owner-controlled gate.

Maximum self-delivery status: **IMPLEMENTED / SELF-TESTED / READY FOR OWNER VALIDATION**, or an honest PARTIAL/BLOCKED. Do not mark UI, market value or Gate 5 PASS.

After the turn ends, the owner can open the local entry, confirm project/target/packet, explicitly prepare the return and manually paste/send for MASTER review. Then decide whether usability improved; no automatic next spike.
