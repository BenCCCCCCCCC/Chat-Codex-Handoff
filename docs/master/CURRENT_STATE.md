# Current State

Updated: 2026-09-28 — Phase 3B preflight complete / owner live authorization decision pending
Role: 00 MASTER / authoritative dynamic state

## 1. Current status

**OWNER-VALIDATION-01:** clean Phase 2 historically PASS.

**Batch A — CORRECTNESS-HYGIENE-01:** MASTER-ACCEPTED.

**Batch B — DIAGNOSTIC-LOCALIZATION-01 / Phase 3A:** MASTER-ACCEPTED and version-finalized locally.

Accepted local feature baseline:
`dd8317b43100b8cbaad684cab7fc02957e32de62`.

**PHASE3B-PREFLIGHT-01:** PASS / zero-call / read-only.

**PHASE3B-LIVE-01:** READY AS A PROPOSAL / **NOT AUTHORIZED / NOT STARTED**.

No live provider/model call is authorized until the owner explicitly approves the bounded live experiment below.

## 2. Phase 3B preflight receipt

Codex reported canonical task commit:
`102d593d1015b14111f382ead981a67ab8a9cd62`.

Repo / local state:
- checkout `F:\Chat-Codex-Handoff\validation-repo`;
- branch `prototype/study-teachback-v0.1`;
- HEAD `dd8317b43100b8cbaad684cab7fc02957e32de62`;
- tracked worktree CLEAN before and after preflight;
- no app/server/browser launch;
- no IndexedDB/openStore access;
- no microphone;
- no provider/API request;
- no file or Git write.

Production provider configuration read from source:
- transcription: `whisper-1`, `/v1/audio/transcriptions`, `verbose_json`, word + segment timestamps, `zh`;
- semantic: `gpt-5.6-luna`, `/v1/responses`, strict JSON schema, max 1,800 output tokens;
- provider timeout 60 seconds;
- no provider-layer automatic retry;
- normal attempt permits at most two ASR submissions, but that allowance is not live authorization.

Safe ledger read:
- SHA256 `d17af9ec53787e484cd66b8928a80023d7a7a9570372f3fa64aa4c71f7e9c525`;
- no lock before/after read;
- version 1 / 83 events;
- 41 request reservations = 5 ASR + 36 semantic;
- one distinct historical attempt;
- 15 reserved minutes;
- 164,237 reserved input;
- 61,328 reserved output;
- known settled estimate US$0.01399455;
- current exposure US$0.07080205;
- four unsettled reservations = 3 ASR + 1 semantic.

Historical failures include several 2026-09-10 `whisper-1` ASR failures (three HTTP 401 and one network/validation failure with recorded HTTP 200). They do not prove current credential/model access state.

Application mechanical headroom remains large:
- exposure remaining US$4.92919795 of US$5;
- attempts remaining 59 of 60;
- requests remaining 259 of 300;
- reserved minutes remaining 345 of 360;
- reserved input remaining 835,763 of 1,000,000;
- reserved output remaining 188,672 of 250,000.

This is application hard-cap headroom only; it is not provider balance or spending permission.

Historical clean-topic survival remains UNKNOWN and was intentionally not inspected because opening browser storage can trigger expiry.

## 3. Current official public capability / pricing check — 2026-09-28

MASTER checked current OpenAI public API documentation without making a provider request.

### Transcription

OpenAI deprecated `whisper-1` on 2026-08-26 and schedules removal on **2027-02-26**. Recommended long-term replacements are `gpt-transcribe` or `gpt-live-transcribe`.

Current file-transcription guidance recommends `gpt-transcribe` for new general-purpose transcription, but explicitly says to use `whisper-1` when word or segment timestamps are required.

Current listed prices:
- `gpt-transcribe`: US$0.0045/minute.
- `whisper-1`: US$0.006/minute.

Decision for this one bounded Phase 3B experiment:
- do **not** migrate ASR before the experiment;
- retain `whisper-1` only because the existing validated replay/diagnostic path depends on word/segment timestamps and current official guidance still directs timestamp-dependent file transcription to it;
- treat this as a temporary validation dependency, not the long-term architecture;
- after Phase 3B, perform a separate timestamp/migration decision before long-term/public use.

### Semantic model

`gpt-5.6-luna` remains an available current API model.

Current standard price:
- input US$0.20 / 1M tokens;
- cached input US$0.02 / 1M tokens;
- output US$1.20 / 1M tokens;
- GPT-5.6 cache writes are 1.25x uncached input = US$0.25 / 1M tokens.

These match the local conservative pricing constants used by the current application ledger for semantic reservation.

No model switch is required for the single Phase 3B experiment.

## 4. Why a live experiment is now justified

Zero-call work has validated:
- provenance;
- attempt accounting;
- content/process evidence separation;
- localization invariants;
- replay safety;
- browser persistence;
- zero semantic dispatch for local process evidence.

It cannot answer:
1. whether a physical owner recording survives the actual capture -> original audio -> ASR -> replay path;
2. whether real Mandarin ASR preserves critical negation/numbers/conditions or creates important errors;
3. whether current local process observations occur at useful reasoning transitions in natural speech;
4. whether combined content + process localization identifies a point the owner personally finds useful rather than a fixture-oracle target;
5. whether replay/transcript review burden is acceptable in real use.

These remaining questions require one real recording. More fixture work would not substitute for them.

## 5. Proposed PHASE3B-LIVE-01 — minimum experiment

Use a fresh clean topic with the same bounded synthetic laboratory-visitor-rules source rather than inspecting/reusing an old expirable topic.

Target owner recording:
- one natural Mandarin explanation;
- 20–45 seconds;
- no prompt assistance;
- explain why registration alone does not guarantee entry and mention the additional source conditions;
- genuine spontaneous self-correction is allowed;
- do not memorize a supplied answer.

Provider-request budget:

### Required
1. **one ASR request** using the current `whisper-1` timestamp path;
2. **one semantic content-diagnosis request** using `gpt-5.6-luna`, only after the owner has replayed the audio and confirmed/corrected critical ASR transcript errors.

### Optional only if the fresh-topic UI requires it
3. **at most one initial Tutor/Learn semantic request** to enter the normal recording flow.

Local process evidence confirmation itself must remain zero semantic/provider dispatch.

No Repair/Apply follow-up provider call in this experiment.

**No automatic retry.** If Tutor, ASR or diagnosis fails, stop and return to MASTER. The existing code may mechanically permit a second ASR submission, but PHASE3B-LIVE-01 does not authorize it.

Therefore authorized-call proposal if owner approves:
- minimum 2 provider calls;
- maximum 3 provider calls;
- exactly 1 ASR;
- 1 content diagnosis;
- optional 1 initial Tutor only if required by normal UI flow;
- 0 retries.

## 6. Conservative cost bound

Current official/provider rates and local reserve rules give:

### ASR
For 20–45 seconds at current `whisper-1` price:
- nominal provider cost roughly US$0.002–US$0.0045;
- using a full one-minute provider-price conservatism: <= US$0.006;
- the application ledger reserves a fixed 3-minute amount = **US$0.018 exposure** for one ASR submission.

### Semantic
The application's maximum per semantic request reservation:
- 24,000 input at cache-write rate US$0.25/M = US$0.006;
- 1,800 output at US$1.20/M = US$0.00216;
- total max reservation = **US$0.00816 per semantic request**.

### Whole experiment
If recording path needs only ASR + diagnosis:
- incremental local exposure <= **US$0.02616**.

If it also needs one Tutor call:
- incremental local exposure <= **US$0.03432**.

At current exposure US$0.07080205, the maximum proposed experiment would move local exposure to <= **US$0.10512205**, far below the US$5 application ceiling.

A conservative provider-billing estimate using one full ASR minute plus two semantic requests at their maximum reservation size is <= about **US$0.02232** before any account-specific taxes/credits. Actual semantic usage is likely below the reservation maximum, but this is not guaranteed.

These numbers are cost estimates, not invoices, provider balance or proof that the API key/model access currently works.

## 7. Exact live stop rules if owner authorizes

The live task must:
- use accepted HEAD `dd8317b...`;
- create/use a new clean synthetic topic; do not inspect the old topic for survival;
- preserve original audio and normalized replay derivative roles;
- allow exactly one physical recording;
- allow exactly one ASR submission;
- stop at replay/transcript before diagnosis;
- owner must replay and inspect critical negation, numbers, conditions and terms;
- correct only ASR mishearing, preserving raw transcript; do not rewrite a genuine spoken mistake into a correct answer;
- return the replay/transcript checkpoint to MASTER before content diagnosis if a critical transcript uncertainty remains;
- only after transcript is usable, permit one content-diagnosis semantic request;
- process evidence remains local and separate;
- no Repair/Apply provider call;
- no retry;
- stop immediately for API 401/403/404/model access error, ASR unusable output, missing/corrupt original audio, replay failure, lost source/attempt/version identity, ledger/budget error, unexpected provider call or old-data risk.

Success of one recording is not learning-efficacy validation. It is only owner workflow + evidence-quality validation.

## 8. Owner decision required

The owner must explicitly choose one of:
- **Authorize PHASE3B-LIVE-01 under the 2–3-call / zero-retry / <=US$0.03432 local-exposure plan**; or
- **Do not authorize live spend yet**.

No implicit authorization is inferred from historical US$5/US$10 caps.

## 9. Classification

Completed:
- Batch A.
- Batch B / Phase 3A.
- PHASE3B-PREFLIGHT-01.
- current official model/timestamp/rate check.

Verified:
- local mechanical headroom;
- current local provider configuration;
- ledger snapshot and clean tracked state from Codex receipt;
- current public OpenAI transcription/model pricing/contracts.

Likely:
- one bounded live recording is now the smallest experiment that can answer the remaining owner-workflow and real-evidence questions.

Unknown:
- current API-key validity/provider account balance/model access;
- historical topic survival;
- real ASR quality;
- physical microphone behavior;
- owner usefulness/replay burden.

Not Done:
- PHASE3B-LIVE-01;
- ASR migration away from deprecated Whisper;
- retention decisions;
- push/merge/final product acceptance.

## 10. Next smallest step

Wait for explicit owner authorization or decline of the bounded PHASE3B-LIVE-01 plan. Do not call provider or microphone before that decision.
