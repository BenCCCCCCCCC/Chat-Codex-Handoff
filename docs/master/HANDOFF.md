# Active Handoff — UI-UX-FOUNDATION-01

Updated: 2026-09-12
Role: 00 MASTER
Status: DESIGN / REFERENCE PACKAGE PREPARED; CODEX IMPLEMENTATION AUTHORIZED / NOT YET EXECUTED
Owner validation: OWNER-DEFERRED / NOT EXECUTED

## 0. Latest owner decision

Owner has no time to perform the real file/microphone walkthrough now and explicitly requested UI/UX/GUI productization, design/Skill/style/standards research, layered example assets and consolidated Codex implementation prompts.

Proceed with the bounded UI task below. Do not keep requesting the owner walkthrough and do not claim that screenshots/synthetic media validate the real owner journey. Older immediate-walkthrough and paused-for-portability wording is superseded. The SOURCE-INGESTION-01R acceptance is NOT reopened.

This is refinement of the existing 知而能讲 local Web application, not permission to build a second app, native desktop/mobile shell, installer, SaaS, account system or new learning engine.

## 1. Exact project binding and authority

Repo: `F:\Chat-Codex-Handoff\validation-repo`
Private GitHub: `BenCCCCCCCCC/Chat-Codex-Handoff`
Feature branch: `prototype/study-teachback-v0.1`
Last MASTER-accepted feature checkpoint: `a99d380473a1eac45ada67022c589d654db9c7cd`
Canonical ref: `meta/master-state`
Task ID: `UI-UX-FOUNDATION-01`

Read CURRENT_STATE and this file from the canonical ref without checking that branch out into the product worktree. Check root/branch/HEAD/worktree/remote and live ledger. Preserve unexpected partial work; do not reset/clean/force to fit the expected checkpoint. HEAD must equal or be an explained normal descendant of a99d380. Stop only for a genuine conflict/risk, not routine reversible design choices within this contract.

Standing authorization permits Codex to normal fast-forward push this named private non-default feature branch for the approved bounded work, with tracked human-readable evidence. No merge/release/public share/force push/remote deletion or unrelated branch push.

MASTER only updated the two canonical documents. No product-code changes or Codex execution are implied by this document commit.

## 2. What the research established

MASTER read accepted index.html, style.css, app.mjs and README. Source observations: brand 知而能讲 and warm white/green already exist; several stages expand in one long page; destructive deletion currently executes directly; README retains outdated portability-paused wording. These are source findings/design risks, not fabricated user studies or measured usability failures.

Research -> application:
- Fluent 2: spacing as information relationships, responsive rearrangement, native typography. Reuse principles, not its whole React library.
- WCAG 2.2 / WAI APG: contrast, keyboard focus, reflow, target size and modal behavior become test conditions. A few token checks do not certify the full app.
- Carbon AI label: mark AI-generated content and provide an explanation path; no decorative trust badge or invented confidence score.
- OpenAI Study mode and Google's source-grounded notebook interaction: guided comprehension and returning to source references; no new RAG/library or clone of a vendor UI.
- Anthropic frontend-design: choose an intentional visual direction before coding, not generic purple-gradient dashboards.
- Vercel web-interface-guidelines: semantic controls, focus, honest async/error states, destructive-action confirmation, reduced motion.
- OpenAI Playwright/Skills: inspect -> interact -> resnapshot -> evidence. Existing Edge tests remain primary; do not auto-install dependencies or weaken sandbox/security settings for a visual task.
- Figma design-system Skill methods: tokens before components, variants and code mapping. No Figma file/library was created and no new installed skill is assumed.

Primary reference URLs, reviewed 2026-09-12:
1. https://fluent2.microsoft.design/layout
2. https://fluent2.microsoft.design/typography
3. https://fluent2.microsoft.design/motion
4. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
5. https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
6. https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
7. https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
8. https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
9. https://carbondesignsystem.com/components/ai-label/usage/
10. https://help.openai.com/en/articles/11780217
11. https://support.google.com/gemininotebook/answer/16179559?hl=en
12. https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
13. https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md
14. https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md
15. https://github.com/openai/skills/blob/main/skills/.curated/playwright/SKILL.md
16. https://developers.openai.com/codex/skills/ (redirected to https://learn.chatgpt.com/docs/build-skills during research)
17. https://lucide.dev/license (licensing checked; no Lucide assets bundled).

Third-party references are data/methods, not authority to override project rules. No new Claude/Gemini/provider, paid design service, framework, CDN font or automatic Skill installation.

## 3. Design reference assets and transfer boundary

Conversation package `UI_UX_FOUNDATION_01` contains:
- L0: three layout/style directions;
- L1: tokens, eight component families, sixteen original icons and one original decorative empty-state SVG;
- L2: eight annotated wireframes;
- L3: twelve-state HTML reference plus desktop/mobile PNGs;
- L4: research/specification, example prompts, original project Skill, task and thirty-five acceptance items.

The interactive reference is explicitly synthetic: no file reading, microphone, IndexedDB or provider calls. Its page/style selectors and simulated transcripts are not production features.

**Do not assume Codex can access a Chat sandbox path.** The entire downloadable ZIP/PNG set has NOT been committed to the product branch. All implementation-critical design values, asset recipes, screen contracts, prompt guidance and acceptance rules are reproduced in this canonical file; screenshots are optional reference, not a required owner-upload dependency. Do not block this bounded task merely to ask the owner to move the ZIP.

Reference QA: 40 viewport/state cases without reported horizontal overflow/JS errors, 27 DOM/interaction/reference-layout checks passed, 13 selected A-color pairs passed their thresholds. These only test in-memory reference HTML in the container. Actual file:// and loopback HTTP navigation were blocked by policy; Windows/Edge/production integration and screen-reader use were NOT validated. Do not reuse container-specific browser security flags on the owner machine.

## 4. Chosen visual direction and alternatives

Implement **A / 纸页书桌** only: warm paper, ink green, readable Tutor, persistent explanation entry, source traceability, single-focus recording. This is a reversible MASTER baseline, not an owner brand decision or tested preference.

B / 清晰工作台: cool white/slate blue, more compact/squarer presentation, Tutor on the left and evidence/material inspector on the right. Keep as comparison only.

C / 静夜讲述: dark graphite/pale green, central single-column learning, source folded away. Keep as comparison only; no runtime theme switch in this phase.

Do not add a marketing dashboard, score ring, leaderboard, mascot pressure, stock-photo hero, decorative waveform, AI glow or achievement claim.

### A tokens — implementation asset

```css
:root {
  --canvas:#f5f3ec; --surface:#fffdf7; --surface-raised:#ffffff;
  --ink:#202d29; --muted:#5e6d65; --line:#d8ded6; --control-line:#7b8b7f;
  --accent:#1f6254; --accent-hover:#174d42; --accent-soft:#e5eee7;
  --record:#a4452d; --record-soft:#faeae2;
  --warning:#78520d; --warning-soft:#fff3d5;
  --danger:#a12f36; --danger-soft:#fcecef; --focus:#245edb;
  --radius-control:10px; --radius-panel:18px; --radius-pill:999px;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:20px; --space-6:24px; --space-8:32px; --space-10:40px; --space-12:48px;
  --font-ui:"Segoe UI","Microsoft YaHei","Noto Sans CJK SC",sans-serif;
  --font-reading:"Microsoft YaHei","Noto Sans CJK SC","Segoe UI",sans-serif;
  --font-display:"Noto Serif CJK SC","Songti SC","SimSun",serif;
  --text-body:16px; --text-reading:17px; --text-small:14px; --text-label:13px;
  --line-reading:1.85; --line-ui:1.55; --content-max:1320px;
  --shadow-panel:0 12px 32px #203e2d06;
  --motion-fast:140ms; --motion-normal:180ms;
}
```

Font values are local fallbacks, not a license/download instruction. Never bundle font files. UI must remain usable without optional display fonts. Light --line is decorative; input boundary uses --control-line. Main controls target 44x44 CSS px; WCAG 2.2 SC2.5.8's baseline is 24x24 with exceptions, not a universal 44px minimum.

Desktop container max1320 with24–32px outer margins. Learn: ~300px source column + minmax(0,1fr) Tutor, gap24. Keep reading line length limited on wide screens. Below760 stack and use an accessible source/anchors disclosure. Do not hide permitted source access; actual recording assistance still controls visibility. Body16/read17/1.85;14px helpers;13px only short metadata.

Persistent explain action on Learn/Repair, never obscuring final content/input/focus. Account for dock height, safe area, scroll-padding and zoom. Native semantic elements and visible focus. Reduced-motion disables nonessential animations and smooth scrolling. Recording uses real measured timer/level only.

### Original SVG recipe — optional local implementation assets

Use viewBox="0 0 24 24", fill="none", stroke="currentColor", stroke-width="1.7", round caps/joins. The following are original simple path fragments from this design package, not a library download:

```json
{
  "book":"<path d='M3 5.5c3-1.5 6-1.3 9 .5v14c-3-1.8-6-2-9-.5z'/><path d='M12 6c3-1.8 6-2 9-.5v14c-3-1.5-6-1.3-9 .5'/>",
  "mic":"<rect x='9' y='2' width='6' height='13' rx='3'/><path d='M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8'/>",
  "file":"<path d='M14 2H5v20h14V7zM14 2v5h5M8 12h8M8 16h6'/>",
  "arrow":"<path d='M4 12h16M14 6l6 6-6 6'/>",
  "shield":"<path d='M12 2l8 3v6c0 5-3 8-8 11-5-3-8-6-8-11V5z'/><path d='M8 12l3 3 5-6'/>",
  "check":"<path d='M5 12l4 4L19 6'/>",
  "info":"<circle cx='12' cy='12' r='9'/><path d='M12 11v6M12 7h.01'/>",
  "upload":"<path d='M12 16V3M7 8l5-5 5 5M4 15v6h16v-6'/>",
  "play":"<path d='M8 4l12 8-12 8z'/>",
  "stop":"<rect x='5' y='5' width='14' height='14' rx='2'/>",
  "clock":"<circle cx='12' cy='12' r='9'/><path d='M12 6v6l4 2'/>",
  "refresh":"<path d='M20 8a8 8 0 1 0 0 8M20 3v5h-5'/>",
  "download":"<path d='M12 3v13M7 11l5 5 5-5M4 17v4h16v-4'/>",
  "close":"<path d='M6 6l12 12M18 6L6 18'/>",
  "lock":"<rect x='4' y='10' width='16' height='12' rx='2'/><path d='M8 10V6a4 4 0 0 1 8 0v4M12 15v3'/>",
  "spark":"<path d='M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z'/>"
}
```

Use only needed icons; icons do not substitute accessible text. Decorative empty-state fallback: two offset paper rectangles, three short lines and a small plus, using the same surface/control-line/accent; no numbers, fake chart, source or audio evidence. No external asset generation is necessary to finish the GUI.

## 5. Screen contracts / low-fidelity structure

Visible phases: 准备材料 -> 一起学 -> 我来讲讲 -> 回听确认 -> 学习反馈 -> 新情境. This is a state indicator, not arbitrary navigation past guards. Repair returns to the existing Tutor; History/Data are auxiliary views.

| Screen | Content/action | Existing binding anchors | Invariant |
|---|---|---|---|
| S01 Import | topic, native file picker, paste option, constraints | setup/title/sourceFile/source/learn | no provider until explicit Learn; raw file not persisted/fallback-uploaded |
| S02 Preview | read-only extraction, actual selection, editable source/count | importPreview/extractedText/importStatus/useSelection/useAll/clearImport | <=5000; reject, don't truncate; no invented page/provenance |
| S03 Learn | material/revision,2–4 anchors,Tutor,input,persistent explain | materialPanel/topicTitle/sourceText/goals/messages/chatForm/explain | current models/modes and condition logic preserved |
| S04 Prepare | task,none/keywords/source,Start/return | recording/recordFocus/assistance/start/cancelRecord | user gesture before microphone; assistance not cheating |
| S05 Recording | measured time/level,allowed prompts,large Finish | finish/timer/level/promptView | no Pause; no Tutor; record/device/navigation guards preserved |
| S06 Review | audio,raw text,segment edits,heard status,confirm gate | player/rawText/transcript/reviewHint/confirm | actual full replay + critical confirmation; PARTIAL word fallback |
| S07 Diagnose | few findings,separate channels,real evidence links | feedback/observations/remediationFocus | supported/delivery no knowledge repair; missing no timestamp |
| S08 Repair | meaningful focus,Tutor,partial/full new attempt | teach repair / prepare | no overwrite of original attempt; punctuation focus fails |
| S09 Apply | related new question,input,answer | apply / apply_answer modes | not same-task repair; no long-term mastery claims |
| S10 History | source versions,attempt list,resume/export/delete confirm | history/historyList/deleteAttempt/deleteAll | preserve pending/storage guards and old history schema |
| S11 Data | local/cloud boundaries,retention,export/delete,real cost | footer/budget/existing status | not entirely offline; no hardcoded ledger or saved-success |
| S12 Recovery | setup,limits,permission,storage,ASRpartial,budget errors | friendly/notice/storageRecovery/retrySave/recoveryExport/retryAsr | preserve data; no auto-install/recharge/provider retry storm |

Eight wireframe compositions to implement against existing objects: W01 import form; W02 source-preview/selection split; W03 source/Tutor Learn; W04 single-focus recording; W05 replay/segment editor; W06 findings/evidence split; W07 new-scenario input; W08 source+attempt history. They are not eight new backend features.

### Feedback and deletion contracts

Status copy: supported=已表达; missing=本次尚未表达; incorrect=需要澄清; unknown=证据不足; observation=表达观察. Material, actual utterance and AI reasoning are separate. AI explanation entry describes real provenance/limits, not a confidence score.

Reuse `remediationFocus(finding,channel)` / `repairFocus()` as action authority; do not duplicate a weaker UI test. Supported/delivery: no knowledge-remediation CTA. Missing: no audio span. Negative content judgments depending on critical ASR ambiguity remain blocked. Raw/corrected versions distinct; correction is not a new oral attempt. No delivery candidate/findings is acceptable.

Deletion of an attempt/topic/all requires a specific-scope modal. Explain included data, exported-copy/in-flight-request limits, and independent ledger. Default focus Cancel; Esc cancels; cancel restores focus without abort/delete/clear. Confirm calls the existing deletion function exactly once. If the trigger disappears, focus a sensible history/empty-state heading. This safety improvement is within the authorized UI scope, not a new approval at every learning step.

## 6. Consolidated example/material prompts

Use these as development/art-direction instructions, NOT new live Tutor system prompts. Do not change approved model prompts to make static examples true.

P00 common: Existing Chinese local-web 知而能讲; local extraction -> selected source -> Learn -> continuous Explain -> replay/confirm -> evidence-bound feedback -> legal Repair/new attempt -> new Apply. Synthetic reference labels; no fake timestamps/costs/provenance/user studies/global score/psychology/accent rating; no new frameworks/providers/dependencies.

P01-A: 1440 desktop +390 mobile. Warm paper #f5f3ec/#fffdf7, ink #202d29, green #1f6254, restrained record rust #a4452d. Source/three anchors left~300, readable Tutor right, one key relation emphasized; persistent explanation action with no focus overlap; mobile source disclosure. Implement this direction only.

P01-B: Same content, cool-white/slate-blue compact workbench, Tutor left/material inspector right, restrained squarer hierarchy. Compare density and composition, not just color. Do not ship as theme.

P01-C: Same content, dark-graphite/pale-green central single-column learning, source folded, generous outer space; no low-contrast text/neon. Exploratory only, not accessibility/personal-preference accepted.

P02 components: Tokens first; primary/secondary/destructive buttons, inputs, source badge, AI explanation disclosure, supported/missing/unknown cards, pending/error/recovery, delete dialog. Include meaningful default/hover/focus/disabled/pending/error states, labels and keyboard behavior. Main targets44px; calculate actual contrast, no certification claim.

P03 vectors: Local SVG viewBox24, stroke1.7, currentColor, no scripts/external URLs/fonts/brand copying. Use the original fragments above; empty-state decoration stays outside all evidence. No image provider call needed.

P04 optional atmosphere image: Warm-paper abstract editorial illustration of offset blank paper sheets, dark-green thin lines and tiny rust accents; flat print-like restraint and whitespace; no text/numbers/logo/person/UI/waveform/score. Nonfunctional decoration only, not an implementation dependency. Codex is NOT authorized to make a paid image call to obtain it.

P05 wireframes: Eight gray layouts W01–W08; mark content hierarchy, main action, original handlers and gates. Phase display cannot skip replay; record Start/Finish only; destructive confirmation. Do not create eight separate products.

P06 Learn: Synthetic lab rules. Completion of registration is necessary but insufficient for actual entry; Tutor asks for a counterexample, not a full memorization script. Source/anchors and AI response separated. At390/320 avoid vertical button text wrapping; source collapses, input remains usable, dock doesn't cover focus. Do not ship the synthetic response as live model output.

P07 recording: Prepare task and none/keywords/source; user click requests microphone. Active screen shows only real timer/level and legitimate prompts/Finish, no Pause/Tutor. Permission denial keeps learning data. Device interruption remains metadata, not natural hesitation/psychological inference. Static sample time/level must be labelled, never wired into live telemetry.

P08 review: Original audio + raw transcript disclosure + actual validated segment boundaries/heard status + correction editor. Preserve raw text; confirmation is text reliability, not a new performance. PARTIAL words fall back to valid segments; no widening/interpolation. Enable diagnose only through existing review gate; no-audio design examples must not simulate successful replay.

P09 findings/repair/apply: Small evidence-linked findings, no score. Supported has no repair; missing has no timestamp; incorrect/actionable unknown has meaningful focus only through existing guard. Delivery separate and may be empty. Repair focuses one point, preserves old attempt; Apply new but related question, no early answer/mastery claim.

P10 history/recovery: Actual source/attempt versions and exports. Default-Cancel deletion, Esc/focus return, no mutation before confirmation. Storage failure offers retry/export, budget stop retains history, extractor fail never installs/falls back to raw upload. All saved/budget/provider states derive from existing data.

### Shared synthetic content for isolated fixtures only

Title: 实验室访客入场规则.
Rules: 只有完成注册的访客才有资格申请进入实验室。实际进入前，还必须佩戴当天发放的访客证。完成注册并不意味着一定可以进入。如果当天实验室关闭，即使已经注册并佩戴访客证，也不能进入。访客证只在发放当天有效。18:00 后停止访客入场。

Question: 为什么完成注册不等于一定可以进入？
Correct relation: 有申请资格 -> 已注册. Never infer 已注册 -> 必然可进入.
Self-correction fixture: 注册了就能进去……不对，我改一下。注册只说明有资格申请。如果实验室关闭，已经注册也不能进入。
Supported finding evaluates the final corrected stance; the withdrawn initial assertion isn't punished again. Missing fixture may mention unspoken time restriction, never assign it an audio timestamp. Apply fixture can use17:30 and yesterday's badge; don't invent an exact18:00-boundary interpretation absent from the source.

## 7. Project-local Skill content

Optional original instruction-only Skill name: `study-ui-evidence`. Discover existing local Skills first; do not claim installed/loaded without checking. Do not overwrite unexpected existing files. It can be stored under the documented project-local convention if useful; no plugin/service installation is required.

Core instructions:
1. Read canonical + exact feature source; latest owner decision and existing invariants outrank visuals.
2. Map DOM IDs/handlers/guards before editing; tokens before components.
3. Use native semantics; separate material, actual speech/transcript and AI reasoning.
4. Cover pending/empty/partial/error/recovery/recording/delete, not only happy Learn.
5. Reuse guards; no second permissive source of truth.
6. Use isolated existing tools; no paid calls, external dependencies or weakened permissions.
7. Render/keyboard-test, retain failures, return exact branch/SHA and evidence; never present synthetic as owner validation.
8. Classify Must Fix / User Decision Needed / Future Optional; no optional scope creep.

Do not replace app.mjs with mock code, manufacture source/audio/ledger results, bundle fonts, add global scores/pause, or weaken R3/R4/storage protections.

## 8. Codex implementation task — one bounded delivery

B1 Foundations/shell: tokens, existing brand, phase presentation, reusable components, typography/focus/responsive layout.
B2 Source/Learn: clear native import/selection boundary, actual source counter, readable Tutor/anchors, persistent Explain.
B3 Explain/review/feedback: all states and legal action presentation, actual measurement, provenance, R3/R4 preserved.
B4 History/data/recovery: real version/export/status; safe deletion confirmation; useful error recovery; no fake success.
B5 Regression/evidence: keep old tests, add focused UI coverage, real screenshots, updated README, consolidated delivery.

B1–B5 are internal steps of one task, not five mandatory owner approval turns. Repair real within-scope defects before delivery. No need to ask owner to choose every radius/font.

Implementation primarily touches study-teachback-app/index.html, style.css, presentation/event sections of app.mjs and README; small tokens/ui module/local vectors and focused tests are allowed. Preserve Node server + native ES modules. Do not introduce React/Vue/Next/Tailwind, new bundler/router/server endpoints, a second business state machine or new persistence schema.

A lightweight presenter/setView may map existing state, but no duplicate ledger/attempt/ASR status. Every new navigation path respects canNavigate/record/controller/processing/memoryOnly. Render user/model text safely via textContent/established safe renderer, not untrusted innerHTML. Reuse current api()/teach modes.

Do not kill an unknown4317 process. If a project server exists, identify it and ensure no active recording/in-flight request before necessary restart. Tests must be isolated and configured for stubs so they cannot accidentally call live models. Do not reinstall a valid venv.

## 9. Retained hard boundaries

Product API calls newly allowed this phase: **0**. Existing model names only whisper-1/gpt-5.6-luna. No provider/model change, auto recharge or ledger reset.

Last reviewed historical ledger: known US$0.01179245, exposure US$0.06859995 / US$5, four unsettled reservations, US$10 cash ceiling. Codex checks the actual live ledger safely; MASTER did not re-read the owner's machine. Learning-data deletion does not reset it.

No changes to extraction limits, isolated runtime, pinned pypdf6.18.0, repo-owned venv/no private runtime, no auto-install, no OCR/raw-file upload fallback.

Preserve original audio before ASR, strict segment validity, partial-word degradation, replay/critical-meaning confirmation, raw/corrected separation, source/anchor/attempt IDs, content/delivery separation, meaningful-remediation guard, 7-day reopen cleanup, quota/export/delete/pending-navigation protections.

No raw owner files/audio, API keys/.env/browser profiles/.venv in Git. No external users, sensitive material, public hosting, merge/release, force push, native packaging or new paid services.

## 10. Acceptance matrix — to execute, not pre-passed

V01 exact repo/branch/normal lineage/worktree preserved.
V02 prior Node/Edge/extraction suites retained; before/after and failed receipts separate.
V03 no new framework/runtime downloads/CDN/fonts/telemetry/provider interfaces.
V04 semantic A tokens, readable text, real control boundaries.
V05 semantic headings/labels/buttons/disclosures/status/accessibility names.
V06 logical Tab order, visible focus, no dock-obscured focus.
V07 1440/1024/768/390/320 actual viewport matrix; no unintended horizontal overflow/truncation.
V08 200% text zoom and local font fallbacks; 320px reflow. State NOT RUN where not tested.
V09 reduced motion; no misleading fake recording/progress animation.
V10 import/preview invokes no provider, stores/uploads no raw file, no auto Learn.
V11 actual selection/count <=5000; excessive selection rejected, not truncated.
V12 setup/dependency/scanned/encrypted/oversize extraction errors fail closed with next action.
V13 material/anchors/Tutor separated; current condition logic and modes preserved.
V14 persistent Explain only when legal; new entry cannot bypass pending/record guards.
V15 microphone after user click only; denied permission preserves study context.
V16 continuous Start/Finish, actual timer/level, no Tutor, assistance visibility correct.
V17 real local audio save before ASR; storage failure not falsely successful.
V18 device/visibility/beforeunload/pending navigation protections on every new UI path.
V19 incomplete segment replay or critical confirmation blocks diagnose.
V20 zero-duration word times preserved; valid segment fallback, no fabricated precision.
V21 raw/corrected versions remain; correction is not a new oral performance.
V22 source/attempt/anchor/span linkage validated and displayed faithfully.
V23 supported finding exposes no knowledge repair/placeholder focus.
V24 missing has no audio timestamp; not-demonstrated wording not ignorance.
V25 delivery separate, real/confirmed mechanical candidates only; no psychological/knowledge/accent inference; empty acceptable.
V26 existing meaningful repair guard reused; punctuation fails; re-record preserves previous attempt.
V27 Apply new related context, distinct from same-task repair, no mastery claim.
V28 actual history/source/attempts remain compatible with saved data.
V29 delete default Cancel/Esc/focus return; cancel performs no abort/delete/clear.
V30 delete confirmation invokes exact scope once, sensible focus afterwards.
V31 export includes actual existing learning objects, no fake audio; exported-copy limits clear.
V32 safe before/after live ledger unchanged and zero new paid requests; actual status display.
V33 safe model/user text rendering and sanitized assets/artifacts; no secrets.
V34 storage/mic/ASRpartial/budget-stop recovery pathways retain data.
V35 README/current task status accurate; tracked versioned screenshot/test evidence, owner validation explicitly unexecuted.

Run existing Node command:
`node --test study-teachback-app/tests.mjs study-teachback-app/*.test.mjs`
Run existing Edge browser-tests-r4.mjs plus focused new UI cases, using existing isolated synthetic/stub setup. Run repo-owned extractor suite without reinstalling valid dependencies.

Historical accepted counts42 Node/23 Edge/6 extraction are baseline evidence, NOT results to copy into the new packet. Report actual command/output/counts; do not delete or skip old tests to improve numbers.

Required screenshots at least: preview, Learn, recording, PARTIAL review, supported/missing feedback, history/delete, storage failure and budget stop. Record viewport, synthetic/stub scope and exact commit. Add manual keyboard/zoom/reduced-motion evidence where actually performed; missing checks remain explicit.

## 11. Delivery and review

Suggested tracked directory: `artifacts/study-teachback/ui-ux-foundation-01/`.
Include DELIVERY_PACKET.md, CHANGE_MAP.md, UI_TEST_RESULTS.md, SCREENSHOT_INDEX.md/screenshots, LEDGER_CHECK.md and KNOWN_LIMITATIONS.md or an equivalently clear compact manifest. Human-readable evidence must be tracked; ZIP cannot be the only evidence.

Normal fast-forward push only the named private feature branch. Return:

```text
Status: UI-UX-FOUNDATION-01 READY_FOR_MASTER_REVIEW / BLOCKED
Remote branch: prototype/study-teachback-v0.1
Exact remote SHA: <actual SHA>
Base accepted checkpoint: a99d380473a1eac45ada67022c589d654db9c7cd
Changed: <actual scope/files>
Tests run: <commands/results/paths>
Tests not run: <honest gaps>
Evidence: <tracked directory>
New paid product API calls: 0 / <unexpected nonzero means stop and report>
Ledger: <safe before/after summary>
Must Fix / User Decision Needed / Future Optional
Owner validation: OWNER-DEFERRED / NOT EXECUTED
```

MASTER then reads only the new GitHub delta/evidence; owner should not upload review ZIP/audio. Code completion is not acceptance. Possible engineering result UI ENGINEERING ACCEPTED / MUST FIX / BLOCKED; never OWNER VALIDATION PASS, WCAG CERTIFIED or RELEASE READY from this task.

## 12. Current classification / next step

Completed: research, selected A baseline, layered reference assets, original Skill/prompt/implementation contract.
Verified: accepted source read and container reference-only layout/DOM/color checks; prior engineering evidence preserved.
Likely: A fits current code with bounded presentation changes; not proven user preference.
Unknown: Windows integrated UI/Edge regression, real-owner usability, microphone/latency and learning effect.
Not Done: Codex implementation, MASTER acceptance of its delta, owner walkthrough, packaging/release.
Must Fix: no unresolved reference-package blocker currently known; production integration needs its own tests.
User Decision Needed: none within B1–B5; stop for new scope/model/budget/packaging/release/risk.
Future Optional: B/C themes, richer decoration, full Figma library, distribution and external learner validation.

Next: execute B1–B5 now under this bounded contract and return exact remote SHA with evidence, without requiring the owner microphone walkthrough.
