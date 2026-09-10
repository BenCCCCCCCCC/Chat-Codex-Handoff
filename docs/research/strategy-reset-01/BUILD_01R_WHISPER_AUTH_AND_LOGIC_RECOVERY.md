# BUILD-01R — Whisper auth + logic-fidelity recovery

Date: 2026-09-11
Role: 00 MASTER
Status: AUTHORIZED WITHIN EXISTING BUILD-01 BOUNDARY / NARROW RECOVERY ONLY

## 1. Trigger and MASTER remote review

Owner/Codex pushed private feature branch `prototype/study-teachback-v0.1` to remote HEAD `99228bed6aa17b05790083de5ecdd45c4a96c28f`. MASTER directly reviewed the remote checkpoint, source and readable evidence. The remote branch HEAD is verified and its parent is product checkpoint `be5cef57564ed16bf2f25467ad0247bb9d7a717a`; the later commit only adds GitHub-readable review evidence.

BUILD-01 is accepted only as a **PARTIAL engineering checkpoint**, not as integrated product PASS.

Remote evidence supports:
- real Luna access and the recorded text-only challenge runs;
- native Edge/MediaRecorder/IndexedDB engineering flow using synthetic media and stub provider;
- Node engineering test receipts;
- actual `whisper-1` `/v1/audio/transcriptions` request ending HTTP 401;
- cost/exposure ledger and local-data behavior at the reported scope.

No owner physical-microphone attempt or successful Whisper timestamp response exists yet.

## 2. MASTER findings

### Must Fix A — exact Whisper 401 cause is still unknown

`provider.mjs` uses the same process environment variable `OPENAI_API_KEY`, the same Bearer-header construction pattern and the same `https://api.openai.com` host for both successful Responses calls and the failed audio-transcription call. Therefore the earlier hypothesis of an obvious different in-code credential path/header/base URL is **not supported by the remote source**.

However the failing path deliberately discarded the provider error body and did not preserve a safe provider error code/type/message or request ID. The evidence explicitly records `responseBodyRead:false`. Also Luna and Whisper checks were separate processes, so current evidence does not prove that both executions saw the exact same secret value/configuration at runtime.

Do not infer invalid key, insufficient endpoint permission, project-model restriction, billing failure, region issue or transient provider failure until a bounded diagnostic captures safe evidence.

### Must Fix B — logic challenge currently overstates necessary/sufficient conditions

The synthetic source is:
`只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。`

`只有 A 才 B` establishes A as a necessary condition for B; it does not by itself establish that whenever A holds, B must occur. Yet the live Learn output says `土壤干燥时要浇水`, the Learn question asks whether dry soil means one should water, and some challenge expectations/feedback treat `干燥 -> 浇水` as established. A product intended to diagnose knowledge/logic cannot accept this strengthening as a 5/5 semantic-quality proof.

The current 5/5 result therefore remains useful only as schema/channel-control evidence. It is **not accepted as logic-fidelity 5/5**.

## 3. BUILD-01R allowed work

This recovery remains inside the already owner-approved BUILD-01 models, provider, local-development, microphone/data and budget scope. No new owner approval is required for the steps below.

### R1 — safe auth diagnostic instrumentation

Add a minimal diagnostic path that never prints, stores or commits the API secret or Authorization header.

For one diagnostic process only:
1. read the already-approved server-side `OPENAI_API_KEY` from the existing process environment;
2. compute only a non-reversible review fingerprint suitable for comparing the two requests in that same process (for example SHA-256 of the secret, truncated to a small review identifier); never log the raw key, prefix+suffix combination, environment dump or other recoverable secret material;
3. issue one very small `gpt-5.6-luna` Responses access check;
4. using the same process and same environment value, issue exactly one `whisper-1` transcription of the existing short synthetic Mandarin engineering WAV;
5. for each response record HTTP status and `x-request-id` when present;
6. on non-2xx, parse only safe provider error fields such as `error.type`, `error.code`, `error.param`, and a redacted/sanitized message. Do not commit response headers that may contain sensitive values; never record Authorization/cookies;
7. update the cost/exposure ledger without resetting prior reservations.

Do not add a new OpenAI endpoint, provider, model, package or credential source. Do not query private account/admin APIs.

Decision after this same-process diagnostic:
- **Luna PASS + Whisper PASS**: previous blocker was not reproduced. Proceed to R3 and then resume remaining BUILD-01 C-F.
- **Luna PASS + Whisper 401**: preserve exact safe error evidence and stop paid calls. If the error points to API-key endpoint permissions, project/model restrictions, account/project membership or another owner-controlled platform setting, return one `User Decision Needed` with exact UI setting to inspect/change; do not ask for the key value.
- **Luna fails too**: stop and report current credential/runtime access as changed/invalid; do not rotate or replace credentials automatically.
- any other Whisper HTTP error: classify from safe error fields; do not change provider/model automatically.

### R2 — logic-fidelity correction

Before treating semantic challenge results as quality evidence:
1. correct the plant-rule expectations so they do not strengthen `只有 A 才 B` into `A -> B`;
2. add at least one explicit necessary-vs-sufficient challenge. Example: source says `只有持票者才可以入场`; a learner says `只要持票就一定可以入场`; expected result must not mark that stronger conclusion as source-supported;
3. revise Tutor/content instructions or validation fixtures as needed so Learn/Repair/Apply do not silently turn necessary conditions into sufficient ones;
4. rerun the bounded Luna semantic challenge set within the existing ledger/budget and report semantic disagreements honestly. Schema-valid is not logic-valid.

This is a core product correctness fix, not a new feature.

### R3 — if Whisper auth succeeds

Use the successful response only to establish real transcription/timestamp transport first. Then continue the already-approved BUILD-01 work:
- validate Mandarin transcript and word/segment timestamp shape on the synthetic sample;
- test critical negation/number/condition/term handling with fail-closed replay/correction behavior;
- run live delivery interpretation only where audio evidence is actually supported;
- finish remaining export/quota/per-attempt-delete/pending-navigation checks;
- then perform the integrated owner walkthrough with explicit in-product microphone action.

No learning-effect/market/PTE claim follows from engineering success.

## 4. Remote checkpoint workflow

Private feature-branch checkpoint push is now standing-approved for this bounded work. After R1/R2 (and after resumed C-F if R1 passes), normal fast-forward push `prototype/study-teachback-v0.1` to the existing private origin is allowed without another owner upload step.

Commit human-readable sanitized evidence. Do not commit raw owner/private audio, `.env`, credentials, runtime secret files or browser profiles. No merge/default-branch integration, release, public deployment, force push or remote branch deletion.

## 5. Budget / retained boundaries

Existing BUILD-01 limits remain unchanged:
- models only `whisper-1` and `gpt-5.6-luna`;
- OpenAI default/global endpoints only;
- no automatic recharge/model/provider escalation;
- BUILD-01 total new cash ceiling US$10;
- internal API exposure/reservation hard stop US$5;
- preserve existing ledger and unsettled reservations rather than deleting/resetting them.

No new package/model install, WhisperX/Silero/local ASR, `gpt-transcribe`, admin API, external users, third-party voices, sensitive material, public hosting or release.

## 6. Handback

If R1 still blocks on an owner-controlled API credential/project permission, stop with:
`BUILD-01R PARTIAL / USER DECISION NEEDED — <precise safe category>`
and push the sanitized evidence checkpoint first.

If R1 passes and remaining BUILD-01 completes, highest allowed status remains:
`STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION`.

Handback must include exact remote branch/SHA, actual tests, semantic logic challenge outcome, safe auth evidence, timestamp result if obtained, usage/cost/exposure, Completed / Not Done / Verified / Likely / Unknown, and Must Fix / User Decision Needed / Future Optional.
