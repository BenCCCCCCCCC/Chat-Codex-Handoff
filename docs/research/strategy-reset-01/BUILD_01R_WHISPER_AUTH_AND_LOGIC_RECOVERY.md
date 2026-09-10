# BUILD-01R — Whisper auth + logic-fidelity recovery

Date: 2026-09-11
Role: 00 MASTER
Status: **PARTIAL / USER DECISION NEEDED — Whisper HTTP 401 / missing_scope**

## 1. Remote checkpoint reviewed

Remote private feature branch: `prototype/study-teachback-v0.1`

- Before: `99228bed6aa17b05790083de5ecdd45c4a96c28f`
- After: `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`
- Commit: `fix: preserve condition logic and record bounded Whisper auth recovery`

MASTER directly reviewed the pushed commit, BUILD-01R Delivery Packet, `AUTH_DIAGNOSTIC.json`, source changes and test evidence. No owner manual artifact upload is needed.

## 2. R1 auth diagnosis — verified result

The same-process diagnostic used one captured existing `OPENAI_API_KEY` runtime value and the same irreversible short fingerprint for both requests.

- `gpt-5.6-luna` `/v1/responses`: HTTP 200, model access confirmed.
- `whisper-1` `/v1/audio/transcriptions`: HTTP 401.
- provider error: `invalid_request_error` / `missing_scope` / `param=null`.
- provider message explicitly says the operation has insufficient permissions and points to organization/project role and restricted API-key scopes.
- exact missing-scope token was deliberately redacted in review evidence and cannot be reconstructed from the committed artifact.

This verifies an **authorization/scope failure at the audio-transcription endpoint**, not a general invalid key, not a model-quality failure, and not a Mandarin/timestamp result. Do not switch provider/model or install local ASR to bypass it.

## 3. R2 logic fidelity — implemented, live rerun still pending

The shared Tutor/content instruction now preserves necessary-vs-sufficient direction:

- `只有 A 才 B` => `B -> A` only.
- It must not be strengthened into `A -> B`.
- Explicit example added: `只有持票者才可以入场` does not support `只要持票就一定可以入场`.

Offline logic/safety suite now reports **24/24 PASS**, including:
- schema-valid but semantically unsupported strengthening must fail the semantic fixture oracle;
- unsupported necessary/sufficient strengthening cannot be accepted as supported;
- valid paraphrase and final self-repair cannot pass with conflicting verdicts;
- credential/error sanitization and same-runtime fingerprint checks.

The previous live Luna 5/5 remains historical API/schema/channel evidence only and is **not** logic-fidelity proof. The corrected seven-case live semantic rerun was not performed because paid calls stopped after the Whisper 401.

## 4. Cost / ledger — preserved

No ledger reset/relabeling occurred.

Current BUILD-01R evidence records:
- known conservative cost estimate: `US$0.00260690`;
- exposure including unsettled reservations: `US$0.04141440 / US$5`;
- existing overall BUILD-01 cash ceiling remains `US$10`;
- no recharge, provider/model switch or new package/model installation.

The existing synthetic ASR attempt has consumed its two-ASR-submission limit. A further request for that same fixture requires one explicit bounded retry exception; do **not** reset the attempt or ledger to obtain another try.

## 5. User Decision Needed — one combined recovery action

Before any paid resume, owner must inspect the intended OpenAI API project and the existing key/principal without sharing the secret value.

### Platform permission check

Use the OpenAI Platform UI for the project whose key is loaded as `OPENAI_API_KEY`:

1. Select the intended organization/project.
2. Open Project settings -> API Keys.
3. Locate the existing user-owned key used by this local build and choose Edit permissions.
4. If the key is `Restricted`, inspect the permission for the Audio transcription endpoint (`POST /v1/audio/transcriptions`) and grant the minimum request/write permission required, while preserving the existing Responses permission.
5. If the endpoint is already permitted, inspect the principal's project membership and organization role. The provider error specifically points to organization roles such as Reader/Writer/Owner and project roles Member/Owner.
6. Do not paste, reveal, upload or commit the key.
7. Do not broadly change to All permissions merely to bypass diagnosis unless a later explicit decision chooses that tradeoff.

If the current key cannot be edited because it is service-account managed or the UI does not expose the needed control, stop and report that exact condition before creating/replacing credentials.

### Retry exception

After the owner confirms the permission/role correction, BUILD-01R may perform **exactly one additional Whisper request** using the same existing 7.31-second synthetic Mandarin fixture, under the unchanged US$5 exposure and US$10 cash ceilings. This exception raises only the per-attempt ASR submission allowance for that fixture from 2 to 3; it does not reset prior events, reservations, minutes or budget.

## 6. Resume behavior after owner confirmation

If the one retry returns 2xx:
- verify actual transcript plus word/segment timestamps;
- run the corrected bounded Luna semantic challenge;
- continue the already-approved remaining BUILD-01 C-F checks;
- push the sanitized checkpoint to the same private branch;
- highest allowed final status remains `STUDY-TEACHBACK v0.1 IMPLEMENTED / ENGINEERING-TESTED / READY FOR INTEGRATED OWNER VALIDATION`.

If the retry still returns 401/missing_scope:
- stop paid calls immediately;
- preserve the new request ID/error classification;
- do not widen permissions/provider/model/dependencies automatically;
- return one precise blocker.

## 7. State classification

Completed: same-process auth diagnostic; safe error capture; private remote evidence; necessary/sufficient prompt/fixture correction; 24/24 offline tests.

Verified: Luna 200 and Whisper 401 used the same runtime credential fingerprint; provider classification is `missing_scope`; logic regression suite passes at offline fixture level; remote lineage and evidence are inspectable.

Likely: one owner-controlled API-key endpoint permission or organization/project role blocks audio transcription. Exact UI control remains unverified because the missing-scope token was redacted.

Unknown: exact current key permission configuration, principal role, successful Whisper transcript/timestamps, corrected live Luna semantic fidelity, full C-F behavior.

Not Done: permission correction, one bounded Whisper retry, live semantic rerun, successful ASR/timestamps, remaining integrated build checks and owner walkthrough.

Must Fix: legitimate audio-transcription permission; no bypass by provider/model/dependency; no claim that offline 24/24 establishes live semantic or ASR quality.

User Decision Needed: inspect/correct the existing key/project/organization permission as above and explicitly approve one additional same-fixture Whisper retry under the unchanged budget.

Future Optional: broader acoustic calibration, local VAD/ASR, gpt-transcribe comparison, realtime Tutor, English/PTE and external learner study remain outside this recovery.