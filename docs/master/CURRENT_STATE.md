# Current State

Updated: 2026-09-29 — SETUP-FLOW-01 MASTER-ACCEPTED / Phase 3B owner live checkpoint next
Role: 00 MASTER / authoritative dynamic state

## 1. Active product / version

Product: **知而能讲** — Study-first + in-app teach-back.

Repository:
`BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Accepted local feature baseline:
`bdd0635597006881d6f8f7213122ae53ccbc99a9`

Commit:
`fix: auto-use small imported learning materials`

Accepted sequence:
- Batch A: MASTER-ACCEPTED
- Batch B / Phase 3A: MASTER-ACCEPTED
- Batch C / correctness boundaries: MASTER-ACCEPTED
- SETUP-FLOW-01: **MASTER-ACCEPTED**

No product push/merge is authorized or performed.

## 2. SETUP-FLOW-01 acceptance

Base:
`ab5d2ea9ad23359fe6cc3dc8abc0e963511996b2`

Final local commit:
`89c23a155ac7c32e6357b33144edf93bd9850309`

Exactly 9 product/test files committed:
- `study-teachback-app/app.mjs`
- `study-teachback-app/browser-tests-r4.mjs`
- `study-teachback-app/core.mjs`
- `study-teachback-app/index.html`
- `study-teachback-app/provenance.test.mjs`
- `study-teachback-app/run-offline-tests.mjs`
- `study-teachback-app/schemas.mjs`
- `study-teachback-app/server.mjs`
- `study-teachback-app/setup-flow.test.mjs`

Final diff:
112 insertions / 16 deletions.

Accepted evidence:
- focused setup-flow: 9/9 PASS;
- full Node/offline: 123/123 PASS;
- fresh host browser outside Codex sandbox: **50/50 PASS**;
- host wrapper exit 0;
- 51/51 host sourceSHA256 entries matched current files before staging, before commit and after commit;
- no product/test source changed after host browser validation;
- git diff checks PASS;
- tracked worktree CLEAN;
- production ledger SHA unchanged;
- live provider calls 0;
- physical microphone 0;
- incremental exposure 0.

MASTER independently verified the finalization meta reply changed only:
`docs/master/ACTIVE_EXCHANGE.md`.

## 3. Accepted source-first setup behavior

Required user input:
- learning source/material only.

Title:
- file import: locally derived from filename without final extension;
- direct paste: first meaningful non-empty line;
- local fallback: `学习材料`;
- manual title is optional metadata, never required to Start/Learn;
- no AI/provider call is used for title generation.

Optional setup context:
- `这次重点想学什么？（可选）`
- `已经掌握了什么？（可选）`

Semantics:
- stored as setupContext metadata;
- not inserted/rendered as `role=user` history;
- focus guides emphasis;
- known is owner self-report, not proof of mastery;
- supplied source remains authoritative;
- no extra provider call is introduced.

Legacy topics without setupContext receive empty defaults.

## 4. Phase 3B live authorization

Owner authorization remains valid but is now partially consumed:
- maximum 3 provider calls total;
- zero retries;
- one real recording maximum;
- owner live checkpoint has already used 1 Tutor semantic call and 1 ASR call;
- the remaining live call is being held for content diagnosis pending MASTER approval.

Known pre-live ledger snapshot remains:
- 41 reservations;
- 1 attempt;
- 15 reserved minutes;
- 164237 / 61328 reserved input/output;
- known cost US$0.01399455;
- exposure US$0.07080205;
- 4 unsettled;
- SHA `d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`.

A/B/C/setup-flow engineering work consumed no live allowance. The later owner Phase 3B checkpoint consumed one Tutor call and one ASR call.

## 5. Phase 3B execution boundary

Real browser/microphone work is owner-driven outside Codex sandbox.

For the first live checkpoint:
- use a new clean topic;
- prefer the actual synthetic DOCX file import path to validate intended file-first UX;
- leave both optional setup-context fields empty in this first live experiment to avoid adding another experimental variable;
- one normal Tutor/Learn call if the clean flow requires it;
- one 20–45 second natural Mandarin explanation with no prompt assistance;
- exactly one ASR submission;
- replay and transcript review;
- STOP before content diagnosis.

The remaining content-diagnosis semantic call is reserved until MASTER reviews the replay/transcript checkpoint.

## 6. Owner manual material

Use:
`OWNER_VALIDATION_01_测试材料_实验室访客规则.docx`

Expected source semantics:
- completed registration is necessary but not sufficient;
- same-day visitor badge is required;
- lab must be open;
- badge is valid only on issue day;
- no visitor admission after 18:00.

Prompt for the owner explanation:
`为什么完成注册不等于一定可以进入实验室？`

Do not memorize/read a supplied answer.

## 7. GitHub exchange / Astra autonomy

Canonical authority:
- `CURRENT_STATE.md`
- `HANDOFF.md`

Transport:
- `ACTIVE_EXCHANGE.md`

Authorized ACTIVE_EXCHANGE replies on `meta/master-state` are transport commits and are distinct from product push/merge.

Codex/Astra may iterate freely inside an approved scope through analysis, implementation, testing and self-review.

Mandatory return to MASTER when:
- same failure signature survives three meaningful fix/test cycles;
- scope/product tradeoff changes;
- unapproved spend/live call is needed;
- new dependency/framework/model/provider/schema/retention policy is needed;
- destructive/high-risk action is needed;
- push/merge/public release is needed;
- next change would be speculative.

MASTER/GPT-5.6 retains product scope, freshness checks and final acceptance.

## 8. Retained backlog

User decisions later:
- portable fixed synthetic audio fixture / clean-clone reproducibility;
- atomic ledger persistence/recovery;
- historical helper/live entrypoint lifecycle;
- retention/export/recovery policy;
- long-term ASR migration.

Future optional:
- small-step app decomposition;
- active-vs-legacy helper/test index;
- handoff-kit documented as fallback;
- focused diagnostic UX;
- synthetic portfolio demo;
- replay-burden measurement.

None blocks the current live checkpoint.

## 9. Classification

Completed:
- engineering corrections through SETUP-FLOW-01;
- GitHub relay;
- project-wide Codex review;
- host browser validation.

Ready / WAITING OWNER:
- Phase 3B live flow through replay/transcript checkpoint.

Not Done:
- real Tutor/ASR checkpoint;
- live content diagnosis;
- real usefulness / false-inference / replay-burden validation;
- long-term ASR migration;
- retention decisions;
- product push/merge/final product acceptance.

## 10. Next smallest step

Owner starts the accepted product outside Codex sandbox, imports the synthetic DOCX into a new clean topic without manually entering a title, performs one natural recording and one ASR, reviews replay/transcript, then stops and returns the checkpoint to MASTER.


## SETUP-FLOW-01 MASTER acceptance — 2026-09-29

Final local commit: `89c23a155ac7c32e6357b33144edf93bd9850309` (`feat: make learning setup source-first`).

MASTER accepts SETUP-FLOW-01 based on: focused 9/9 PASS; Node/offline 123/123 PASS; host browser 50/50 PASS; 51/51 host source hashes matched before staging/commit/after commit; no post-host source/test drift; final tracked worktree CLEAN; zero live provider/microphone/exposure; no model/provider/retention/schema/cap/dependency change.

Accepted behavior: source material alone is sufficient to start; file import title derives locally from filename; direct-paste title derives locally from first meaningful line; fallback title is `学习材料`; optional focus/known are setup metadata rather than role=user history; known is owner self-report rather than mastery evidence; no extra provider call is introduced.

New accepted local baseline is `89c23a155ac7c32e6357b33144edf93bd9850309`.

PHASE3B-LIVE-01 remains authorized and unused. The next owner checkpoint should use the actual synthetic DOCX file import path, no manual title, optional focus/known left blank, one Learn/Tutor call at most, one natural 20–45 second recording, exactly one ASR, then stop at replay/transcript before diagnosis.


## FILE-IMPORT-AUTO-USE-01 — new Must Fix from live owner setup

Owner attempted the accepted source-first flow with the synthetic DOCX.

Observed UI:
- file extraction completed successfully;
- preview contained the document text;
- preview showed selected count = 0;
- the actual learning-source textarea remained 0 / 5,000;
- top notice said to first place material into the learning round;
- Start/Learn therefore remained a local validation no-op.

No Tutor/provider call was dispatched, so PHASE3B-LIVE-01 still has 0 calls and 0 incremental exposure consumed.

Owner product requirement is stricter than the current implementation:
- uploading a small supported file should itself make the parsed material ready for learning;
- the user should not need a second “use all text” action for a file already fully parsed and within the source-size limit.

Decision:
- for imported/extracted text whose normalized full text length is <= 5,000 characters, automatically place the full extracted text into the learning source after successful extraction and derive title from filename;
- keep preview visible for transparency/edit/reselection;
- preserve manual selected-text override if the user intentionally wants a subset;
- for extracted text > 5,000 characters, do not silently truncate or auto-pick an arbitrary chunk; require explicit selection/subset and show a clear local notice;
- direct-paste behavior remains unchanged;
- no AI/provider call for this behavior.

Status: FILE-IMPORT-AUTO-USE-01 READY / DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO LIVE API.

Phase3B remains paused until this owner-observed setup friction is corrected and verified.


## FILE-IMPORT-AUTO-USE-01 recovered result — 2026-09-29

Codex returned NEEDS_HOST_VERIFY.

Verified relay:
- dispatch commit: 30b01fdd50f375e89c32be16a693b3908ad6602a;
- response changed only docs/master/ACTIVE_EXCHANGE.md.

Local implementation state:
- base/final HEAD remains 89c23a155ac7c32e6357b33144edf93bd9850309;
- changes remain uncommitted;
- changed files:
  - study-teachback-app/app.mjs
  - study-teachback-app/browser-tests-r4.mjs
  - study-teachback-app/run-offline-tests.mjs
  - new study-teachback-app/file-import-auto-use.test.mjs

Implemented behavior:
- extracted full text length 1..5000 auto-populates the actual learning source after successful extraction;
- filename-derived title remains local;
- preview remains visible;
- user can still intentionally override with a selected subset;
- extracted text >5000 is not silently truncated or auto-chunked and requires explicit subsection selection;
- direct paste and setupContext behavior remain unchanged;
- no provider call is added during extraction.

Fresh deterministic evidence:
- focused import suite: 8/8 PASS;
- full Node/offline: 131/131 PASS;
- git diff --check: PASS;
- browser syntax check PASS;
- production ledger SHA unchanged;
- live provider calls 0;
- microphone 0;
- incremental exposure 0.

Codex browser attempt was environment-blocked before application cases by the known Windows Codex sandbox Edge/CDP limitation.

Therefore FILE-IMPORT-AUTO-USE-01 is pending one host-side browser validation before final commit/MASTER acceptance.


## FILE-IMPORT-AUTO-USE-01 host browser result

Owner reports the host browser regression `browser file-import-auto-use-01` PASSed outside Codex sandbox. This clears the browser-validation gate for the unchanged current worktree, pending Astra receipt/hash verification before commit.

Owner also observed an occasional audible Chinese phrase during the browser regression, approximately about moist soil / watering. MASTER inspected the main product files `app.mjs`, `index.html`, and `server.mjs` on the product branch and found no `speechSynthesis`/TTS API usage and no matching phrase text. Because the browser suite intentionally exercises replay/media paths, the leading hypothesis is synthetic test-media playback rather than product-generated speech. This must be verified from the test fixture/artifacts before classification.


## FILE-IMPORT-AUTO-USE-01 MASTER acceptance — 2026-09-29

Final local commit:
`ac875a100b159781037746ea0b8bd2188457d13a`

Commit:
`fix: auto-use small imported learning materials`

Base:
`89c23a155ac7c32e6357b33144edf93bd9850309`

Exactly four files committed:
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/file-import-auto-use.test.mjs

Accepted evidence:
- focused import: 8/8 PASS;
- full Node/offline: 131/131 PASS;
- host browser outside Codex sandbox: 50/50 PASS;
- host wrapper exit 0;
- 52/52 host source hashes matched current files before staging, before commit and after commit;
- no post-host product/test edits;
- git diff checks PASS;
- tracked worktree CLEAN;
- production ledger SHA unchanged;
- live provider calls 0;
- physical microphone 0;
- incremental exposure 0.

Accepted behavior:
- extracted normalized full text length 1..5000 auto-populates the actual learning source after successful file extraction;
- filename title remains local;
- preview stays visible;
- manual subset override remains possible;
- extracted text >5000 is not silently truncated/chunked/auto-used and requires explicit subsection selection;
- direct paste and setupContext behavior remain unchanged;
- no provider call is added during extraction.

New accepted local product baseline:
`ac875a100b159781037746ea0b8bd2188457d13a`.

## Synthetic audible phrase classification

Owner reported occasionally hearing Chinese speech about moist soil / watering during host browser regression.

Astra traced this to the intentional synthetic browser replay fixture:
`study-teachback-app/runtime/synthetic-mandarin-v2.wav`

Fixture SHA256:
`7e291bc01d614dfb34068ab3d2d9f4d1217f329ba14b6e4fdb7cea919aba6206`

Fixture text generated by `synthetic-speech.ps1`:
`只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。`

The browser regression intentionally loads/replays this fixture in saved-ASR/replay tests.

Classification:
**expected test-fixture playback**, not product-generated TTS and not a new product defect.

Do not modify product audio behavior on this evidence.

## Phase 3B readiness after file-import fix

PHASE3B-LIVE-01 remains authorized and fully unused:
- max 3 provider calls total;
- zero retries;
- incremental local exposure <= US$0.03432;
- one real recording maximum.

The real owner flow may now resume from a fresh product session using accepted HEAD `ac875a100...`.

Because the local product baseline changed since the last manual session, owner should restart the local server and reload/reopen the isolated Edge session before live testing.


## PHASE3B real-speech observation — process evidence gap candidate

Owner reached the real replay/transcript checkpoint with one ~22 second Mandarin recording.

Visible ASR segments in the owner screenshot:
- 3.8–9.1s
- 9.4–15.0s
- 16.6–19.1s
- 19.1–21.3s

Owner reports that natural hesitation/filler speech such as “额……” and pauses were present in the actual recording but are not represented in the visible transcript text.

The UI currently shows:
`UNVALIDATED_ACTIVITY · 仅候选观测，非流利度评分`

This is a valuable Phase3B finding.

Interpretation:
- semantic ASR text must not be treated as a verbatim record of discourse fillers/process behavior;
- fillers/pauses should remain a separate process-evidence channel grounded in audio/timing, not manually reconstructed into content transcript;
- transcript correction should remain for meaning-affecting ASR errors, not for manually manufacturing process evidence.

Do not spend the remaining content-diagnosis call yet.

Before deciding whether this is an implementation gap, owner should:
1. expand the raw transcript and verify whether fillers are absent there too;
2. replay the full audio around the visible timing gaps, especially 0–3.8s and 15.0–16.6s;
3. confirm where hesitation/filler actually occurred;
4. do not edit “额/嗯” into the corrected transcript merely to make process evidence visible.

Current candidate finding:
`PROCESS-EVIDENCE-LIVE-GAP-01`.

No diagnosis call is authorized until MASTER classifies this live process-evidence behavior.


## PROCESS-EVIDENCE-LIVE-GAP-01 — code-grounded interpretation

MASTER checked the accepted architecture/data flow.

Content diagnosis cannot secretly use fillers/pauses that are absent from the transcript:
- content input is constructed from transcript spans/text;
- duration, pauses, energy and delivery labels are deliberately omitted from the content channel;
- CONTENT instructions explicitly forbid inferring knowledge from pauses/fillers/self-repair.

Speech-process evidence is separate and comes from audio-derived observations/events rather than hidden transcript text.

Current local detector architecture is conservative: it can produce near-silence candidates from decoded PCM and requires replay confirmation; the overall observation state can be PARTIAL / UNVALIDATED_ACTIVITY even when no candidate event is emitted.

Owner screenshot shows the overall UNVALIDATED_ACTIVITY status but no visible process-candidate replay rows. This strongly suggests the real recording did not produce a usable process event for the observed hesitation/pause in the current UI path.

Therefore:
- proceeding with the remaining content-diagnosis call would mainly test content/logic, not whether real hesitation was successfully localized;
- manually adding “额/嗯” to corrected transcript would contaminate the process-evidence validation;
- diagnosis remains paused.

Next evidence options:
1. owner reports approximate hesitation/pause timestamps from replay; and/or
2. export the current topic/attempt locally and provide the export to MASTER for zero-provider audio/process inspection.

No second recording or diagnosis call is authorized yet.


## PROCESS-EVIDENCE-LIVE-GAP-01 — owner timestamp confirmed

Owner confirms the actual hesitation/filler occurred approximately at **16–18 seconds**.

This is especially informative because the visible ASR segment spans 16.6–19.1 seconds and contains semantic text, while the hesitation/filler itself is omitted from the transcript.

Therefore the gap is not explained merely by an ASR segment boundary. It is a voiced/process event inside a recognized speech segment.

Implication:
- content transcript cannot represent this hesitation reliably;
- the current near-silence-only process detector may miss voiced fillers such as “额/嗯” even when they materially mark a reasoning transition;
- the final content-diagnosis call remains paused because it would not validate the missing process-evidence behavior.

Next smallest experiment: zero-provider local audit of the saved original audio around 16–18s, preferably using the product export so the audio, raw/corrected transcript and attempt identity remain bound together.


## PROCESS-EVIDENCE-LIVE-GAP-01 — exported real-audio audit

MASTER inspected the owner export `study-7ee62c5e-c106-46e4-b7a7-2f60e46b819d.json` locally with zero provider calls.

Export facts:
- attempt duration: 21.96s;
- status: REVIEW_REQUIRED;
- reports: none;
- raw ASR omits filler words such as 额/嗯;
- visible ASR span s2 is 16.56–19.14s with semantic text `以及访客证他只是当天有效`;
- saved process observation contains exactly one `near_silence_candidate`: 14.54–15.42s;
- detector config: 20ms frames, RMS threshold 0.008, minimum candidate duration 0.7s.

MASTER decoded the embedded original WebM audio locally and inspected the PCM around the owner-confirmed hesitation region with the same 20ms / RMS threshold basis.

Around 16–18s, low-energy runs were approximately:
- 16.08–16.22s: 0.14s;
- 16.74–16.94s: 0.20s;
- 16.96–17.28s: 0.32s.

None reaches the current 0.7s continuous near-silence rule. Much of 16–18s remains voiced/active.

This explains the live miss:
- the owner's hesitation/filler is not a long continuous silence;
- current detector is intentionally a conservative near-silence detector;
- it can detect the separate 14.54–15.42s silence, but not the voiced/fragmented hesitation the owner remembers at 16–18s.

Do not claim automatic lexical detection of “额”. The owner-confirmed filler is ground truth from replay, while the acoustic evidence shows why the existing near-silence rule does not surface it.

Additional source-flow finding:
- the main `确认已回听，开始诊断` action triggers the content channel;
- process/delivery analysis is a separate per-candidate action after replay confirmation;
- therefore the current main diagnosis flow does not automatically produce the intended two-channel combined diagnostic experience.

Conclusion:
PROCESS-EVIDENCE-LIVE-GAP-01 is VERIFIED as a real product-validation gap, not merely a display omission.

The remaining live content-diagnosis call stays paused.

## PROCESS-EVIDENCE-FEASIBILITY-01

Status: DISPATCHED THROUGH ACTIVE_EXCHANGE / ZERO PROVIDER / NO NEW RECORDING.

Goal:
use the real live evidence to improve process-evidence localization without conflating process with knowledge judgment or adding another paid ASR/semantic call.

Preferred architecture direction to evaluate:
- contentFindings: existing source-grounded semantic diagnosis;
- processEvidence: local audio/timing observations, no knowledge status;
- diagnosticTarget: deterministic combination only when content finding and process evidence converge on the same span/transition;
- processEvidence alone must never become “you do not understand this”.

Astra may investigate and implement the smallest evidence-backed improvement inside scope.

At minimum evaluate:
1. keep existing long near-silence candidate;
2. add a deterministic short-pause / micro-pause-cluster observation if supported by local PCM evidence;
3. do not classify a voiced sound as lexical “额/嗯” unless the system has reliable evidence;
4. do not insert fillers into transcript;
5. do not add a second ASR pass;
6. do not add a semantic delivery call merely to describe local process evidence;
7. consider rendering processEvidence locally and combining it with content findings after the one existing content diagnosis call.

No new dependency/model/provider. If voiced-filler detection itself cannot be made reliable with current deterministic local evidence, Astra must say so rather than invent a heuristic label.

The real owner export/audio is not authorized for upload to GitHub. Canonical state contains only derived non-sensitive timing/feature evidence.


## PROCESS-EVIDENCE-FEASIBILITY-01 result — NEEDS_HOST_VERIFY

Codex/Astra completed a bounded zero-provider implementation and returned NEEDS_HOST_VERIFY.

Base/final HEAD remains:
`ac875a100b159781037746ea0b8bd2188457d13a`

Changes are uncommitted.

Changed files:
- study-teachback-app/core.mjs
- study-teachback-app/diagnostic-localization.mjs
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- new study-teachback-app/process-evidence.test.mjs

Chosen evidence rule:
- preserve existing long near-silence: >=0.7s continuous internal near-silence;
- add `short_pause_cluster_candidate` using the same 20ms / RMS<0.008 frame evidence;
- cluster requires at least 3 substantial short gaps, each 0.12..0.50s;
- qualifying gaps contribute >=0.60s low-energy duration total;
- candidate span 0.8..2.0s;
- require >=0.30s above-threshold activity between gaps;
- >=0.7s long gap breaks a cluster;
- emitted cluster gaps are consumed to avoid repeated overlapping candidates;
- candidate count bounded.

Semantics:
- candidate is `UNVALIDATED_ACTIVITY`, not VAD/ASR/lexical filler detection;
- no automatic “额/嗯” label;
- replay confirmation remains mandatory;
- process evidence has no knowledge status;
- process-only evidence cannot create missing/incorrect content findings;
- final-correct/self-repaired content remains content-supported;
- content/process convergence is computed locally only when evidence overlaps the same bounded spoken span/transition.

Existing architecture remains:
- main replay-confirm action sends only content diagnosis;
- process confirmation remains local and provider-free;
- localizer may combine confirmed process context with an existing content target after content findings return;
- no extra delivery semantic call is required.

Derived timing fixture from MASTER's non-sensitive real-sample timing evidence:
- accepted baseline produced only e0 near-silence 14.54..15.42;
- current implementation produces same e0 plus e1 short-pause cluster 16.08..17.28;
- this overlaps the owner-confirmed 16..18s hesitation region without claiming the lexical filler itself.

Fresh evidence:
- focused process/localization: 28/28 PASS;
- full Node/offline: 145/145 PASS;
- git diff --check PASS;
- browser syntax PASS;
- live provider calls 0;
- additional ASR 0;
- microphone 0;
- incremental exposure 0.

Codex browser attempt failed before product cases due to the known Windows Codex sandbox Edge/GPU/CDP limitation. All receipt source hashes matched the final uncommitted worktree.

MASTER assessment:
- evidence model and separation are acceptable for host validation;
- lexical filler detection remains deliberately out of scope;
- natural-speech false-positive/false-negative rates remain unknown;
- existing owner attempt is not automatically recomputed/migrated by this implementation.

Next gate: host browser validation from normal Windows PowerShell.

The remaining live content diagnosis stays paused.


## PROCESS-EVIDENCE-FEASIBILITY-01 host browser PASS — 2026-09-29

Owner ran the host browser regression outside Codex sandbox:

`node .\study-teachback-app\run-offline-tests.mjs browser process-evidence-feasibility-01`

Observed:
- all displayed browser cases PASS;
- the new case `short-gap candidate replays and saves locally without a semantic call` PASS;
- isolation remained synthetic credential / loopback only / test ledgers only / blocked outbound attempts=0;
- wrapper receipt exit=0;
- production ledger SHA before/after unchanged.

This clears the browser-validation blocker for the current unchanged PROCESS-EVIDENCE-FEASIBILITY-01 worktree.

Before commit, Astra must inspect the host artifact/receipt directly and confirm:
- exact PASS count;
- exact sourceSHA256 set and no source/test drift after the host run.

If any source/test code changes after this host PASS, the browser evidence becomes stale and host re-verification is required.


## Codex/Astra project-awareness default

Owner wants Codex/Astra to operate with enough project context to reason independently rather than acting as a narrow command executor.

Default behavior for future authorized turns:

1. Read canonical authority first:
   - docs/master/CURRENT_STATE.md
   - docs/master/HANDOFF.md
   - docs/master/ACTIVE_EXCHANGE.md

2. Establish repository/project context before implementation:
   - verify repo / branch / HEAD / tracked status;
   - read root README and active product README/entry documentation as needed;
   - inspect recent relevant commits/history;
   - inspect the current task's implementation, tests and adjacent modules.

3. Astra may autonomously expand its **reading/analysis scope** anywhere in the repository when useful to:
   - test assumptions;
   - understand upstream/downstream coupling;
   - identify architecture risks;
   - find duplicated/conflicting behavior;
   - discover missing tests or simpler implementation paths;
   - compare current behavior against the owner's accepted product direction.

4. Reading/analysis scope may be broad; **implementation scope remains bounded by the current MASTER-approved task**.

5. Inside approved implementation scope Astra may:
   - choose the engineering approach;
   - refactor touched code when directly necessary;
   - add/adjust tests/helpers;
   - iterate through implementation/test/self-review until acceptance or a stop condition.

6. Findings outside approved implementation scope must be returned separately as:
   - Must Fix candidate
   - User Decision Needed
   - Future Optional
   They are not automatically implemented.

7. Astra should include a concise “Project observations” section when broader exploration discovers something materially relevant.

8. Do not reread every historical artifact mechanically on every turn. Prefer current canonical state + targeted repo exploration; expand only when it helps answer a real question.

MASTER/GPT-5.6 remains final scope, product decision and acceptance authority.


## PROCESS-EVIDENCE-FEASIBILITY-01 project-aware self-review — NEEDS_HOST_REVERIFY

Astra found an in-scope UI reachability defect after the prior host PASS.

Problem:
- long near-silence events are stored before short-pause-cluster events;
- renderAttempt used the first eight events;
- with 8+ long events, short-pause candidates could be detected but never shown;
- visible order could also be non-chronological.

Post-host correction:
- keep the eight-row cap;
- preserve representation of both detector types;
- fill spare capacity by time;
- show visible rows chronologically;
- preserve original event IDs/objects/stored order;
- show visible/total candidate count.

Post-host edited files:
- study-teachback-app/app.mjs
- study-teachback-app/process-evidence.test.mjs
- study-teachback-app/browser-tests-r4.mjs

Fresh zero-call evidence:
- focused 33/33 PASS
- full Node/offline 150/150 PASS
- git diff --check PASS
- live provider 0
- additional ASR 0
- production ledger unchanged

The previous host receipt was 51/51 PASS for the pre-correction bytes and is now stale. Fresh host verification is required.

Broader project observations retained:
- stale README/CURRENT_STATE historical status text can mislead future operators into repeating already-consumed live actions;
- existing owner audio is not automatically reanalysed by the new detector;
- legacy paid delivery route still exists, while current process confirmation is local/provider-free.


## PROCESS-EVIDENCE-FEASIBILITY-01 fresh host reverify PASS — 2026-09-29

Owner reran the host browser suite after the project-aware post-host UI correction.

Owner screenshot confirms:
- all visible browser cases PASS;
- short-gap candidate replay/local-save/no-semantic-call case PASS;
- isolation remains synthetic credential / loopback only / test ledgers only / blocked outbound attempts=0;
- wrapper receipt exit=0;
- error=null;
- production ledger SHA before/after identical;
- unchanged=true.

This revalidates the corrected bytes after the prior host evidence became stale.

Astra must now read the fresh host receipt directly, confirm the exact case count and sourceSHA256 binding, perform final self-review, and create one focused local commit only if no additional source/test changes are needed.


## PROCESS-EVIDENCE-FEASIBILITY-01 MASTER acceptance — 2026-09-29

Final local commit:
`bdd0635597006881d6f8f7213122ae53ccbc99a9`

Commit:
`feat: add bounded short-pause process evidence`

Base:
`ac875a100b159781037746ea0b8bd2188457d13a`

Exactly six files committed:
- study-teachback-app/core.mjs
- study-teachback-app/diagnostic-localization.mjs
- study-teachback-app/app.mjs
- study-teachback-app/browser-tests-r4.mjs
- study-teachback-app/run-offline-tests.mjs
- study-teachback-app/process-evidence.test.mjs

Accepted evidence:
- focused 33/33 PASS;
- full Node/offline 150/150 PASS;
- fresh host browser after project-aware UI correction 51/51 PASS;
- wrapper exit 0 / error null;
- browser console errors empty;
- 53/53 source hashes matched before staging, before commit and after commit;
- no source/test drift after fresh host reverify;
- git diff checks PASS;
- final tracked worktree CLEAN;
- production ledger unchanged;
- live provider calls 0;
- additional ASR 0;
- physical microphone 0;
- incremental exposure 0.

Accepted behavior:
- preserve existing >=0.7s long near-silence candidate;
- add bounded short-pause-cluster candidate;
- no lexical filler claim;
- replay and reviewed transcript required before process confirmation;
- process evidence is local/provider-free and cannot create content knowledge deficits by itself;
- UI preserves both detector types under the eight-row cap and displays visible candidates chronologically;
- local deterministic convergence may only mark a bounded target worth verifying.

Known limitation:
- natural-speech false-positive/false-negative rates remain unknown;
- the existing owner attempt was saved before this detector existed and is not automatically recomputed/migrated.

New accepted local baseline:
`bdd0635597006881d6f8f7213122ae53ccbc99a9`.

## Next smallest experiment — existing owner attempt zero-call reanalysis

Do not spend the remaining content-diagnosis call yet.

Before resuming live diagnosis, verify whether the preserved 21.96s owner recording, when processed by the newly accepted detector, actually yields the expected short-pause candidate around the owner-confirmed 16–18s hesitation.

Constraints:
- zero provider/API;
- zero new ASR;
- zero new recording;
- no modification of the stored owner attempt;
- do not upload owner raw audio/export to GitHub;
- return only derived timing/event evidence to canonical state.

If the new detector finds a bounded candidate overlapping the real hesitation, MASTER can decide whether to continue the existing live validation path.
If it does not, do not force a process finding; record the miss and reconsider the detector/validation plan.


## OWNER-AUDIO-LOCAL-REANALYSIS-01 — MASTER zero-call result

MASTER performed a rule-equivalent local reanalysis of the preserved 21.96s owner audio from the private export. The raw export/audio itself was not uploaded to GitHub.

Using the accepted detector parameters:
- 20ms frames;
- RMS threshold 0.008;
- existing long near-silence >=0.7s;
- short-pause cluster: >=3 qualifying gaps of 0.12..0.50s, >=0.60s qualifying quiet total, span 0.8..2.0s, >=0.30s active sound between gaps;

derived real-audio evidence includes:
- long near-silence: approximately 14.54–15.42s;
- short-pause cluster candidate: approximately 2.26–4.14s;
- short-pause cluster candidate: approximately 16.08–17.24s.

For the owner-confirmed 16–18s hesitation region, the qualifying short low-energy gaps were approximately:
- 16.08–16.22s;
- 16.74–16.92s;
- 16.96–17.24s.

Those three gaps total approximately 0.60s quiet within a 1.16s span with approximately 0.56s active sound between them, satisfying the accepted bounded short-pause-cluster rule.

This provides real-audio feasibility evidence that the accepted detector would surface a bounded process candidate overlapping the owner-confirmed hesitation without labeling the lexical filler itself.

Important limitation:
- the old stored attempt observation is not automatically recomputed/migrated in IndexedDB;
- therefore the existing UI may still show only its historical old observation unless process evidence is rederived;
- for this validation, MASTER can combine the independently derived real-audio process timing with the upcoming content finding without mutating the saved attempt.

## Phase 3B remaining content diagnosis — MASTER approval

The originally authorized maximum-three-call live experiment has used:
- Tutor semantic: 1;
- ASR: 1;
- remaining content diagnosis: 1.

MASTER now approves use of the **one remaining content-diagnosis semantic call** on the same existing owner attempt.

No retry is authorized.

Purpose:
- evaluate source-grounded content findings on the real explanation;
- then compare those findings against independently derived real-audio process evidence;
- verify that content and process evidence remain separate and only converge when supported.

Do not make a new recording.
Do not run ASR again.
Do not use Repair/Apply.

If content diagnosis fails, stop with no retry.

After diagnosis, owner returns the visible 内容理解 / 讲解过程证据 / target feedback to MASTER for final Phase3B assessment.

## Documentation cleanup queued

After the Phase3B diagnosis checkpoint, reconcile stale root/product README and historical CURRENT_STATE summary wording that still implies Phase 3 was never executed or live allowance was unused.


## REPLAY-GATE-UX-01 — owner live friction

Owner clicked `确认已回听，开始诊断` after reopening the preserved attempt and saw no apparent response.

Code-grounded cause:
- renderAttempt clears the in-memory `heard` set whenever the attempt is rerendered/reopened;
- the confirm handler checks every raw transcript span is present in `heard`;
- if any span is missing, it throws `NOT_HEARD` before calling `diagnose(..., 'content')`;
- therefore this blocked click consumed **0 content-diagnosis provider calls**.

Current UI requires each per-span replay button to finish once in the current rendered session. Listening to the full audio player does not satisfy this gate.

Owner-facing meaning of “ASR semantic error”:
- correct only transcription errors that change the meaning of what was actually spoken, e.g. 不→ omitted, 18:00→20:00, open→closed;
- do not insert omitted filler words such as 额/嗯 or pauses merely to represent delivery/process evidence.

UX finding / Must Fix candidate:
- full-player replay is not credited toward the per-span replay gate;
- reopening/rerendering resets the in-memory replay completion state;
- the NOT_HEARD notice is easy to miss, making the diagnosis button appear unresponsive.

Do not implement this UX fix during the remaining live diagnosis checkpoint. Record it for post-Phase3B triage.
