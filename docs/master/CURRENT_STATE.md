# Current State

Updated: 2026-09-11
Role: 00 MASTER / authoritative dynamic state

## Stage

**BUILD-01 REMOTE CHECKPOINT REVIEWED / PARTIAL ACCEPTED / BUILD-01R AUTHORIZED — WHISPER AUTH + LOGIC FIDELITY RECOVERY**

Active product remains **Study-first + in-product spoken teach-back** with `Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`. Formal attempts are recorded inside the product; manual pre-record/upload is not the normal consumer journey.

Owner-approved private feature-branch checkpoint sync is now working. Remote branch `prototype/study-teachback-v0.1` is directly visible to MASTER at HEAD `99228bed6aa17b05790083de5ecdd45c4a96c28f`; GitHub confirms its parent is product checkpoint `be5cef57564ed16bf2f25467ad0247bb9d7a717a`. The evidence commit only adds GitHub-readable review material. Owner no longer needs to manually upload Delivery Packet/review ZIP for ordinary bounded checkpoint review.

BUILD-01 is accepted as a **PARTIAL engineering checkpoint only**, not integrated product PASS. A narrow active recovery contract now exists at `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md`.

PRODUCT-CORE-01 remains PAUSED; INTERVIEW-DEMO-01 remains SUPERSEDED; Gate5 external-user execution remains ON HOLD.

## Authority

Repository `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY.md` — active narrow recovery
4. `docs/research/strategy-reset-01/BUILD_01_STUDY_TEACHBACK_HANDOFF.md` — original owner-approved bounded build
5. `docs/research/strategy-reset-01/DIRECTION_DEEPENING_01.md` v4 — product/UX baseline and prior research

## Remote BUILD-01 Review — Verified at Evidence Scope

MASTER directly read the remote source/evidence. Verified from the pushed branch:
- product checkpoint `be5cef57564ed16bf2f25467ad0247bb9d7a717a`, evidence HEAD `99228bed6aa17b05790083de5ecdd45c4a96c28f`;
- Delivery Packet and review index/manifest are GitHub-readable; manifest covers the 27 app/evidence files plus review docs and excludes secrets/raw private audio;
- Node engineering receipt reports 18/18; Edge receipt reports 14/14 using real Edge/MediaRecorder/IndexedDB but synthetic WebAudio and stub provider; these are accepted only at that stated scope;
- real `gpt-5.6-luna` API evidence exists, including 5 text challenge cases plus Learn/Repair/Apply schema outputs; known usage 3,999 input / 1,332 output tokens and conservative known-cost estimate US$0.00259815;
- exactly one real `whisper-1` `/v1/audio/transcriptions` attempt used a 7.31s synthetic Mandarin Windows-voice sample and returned HTTP 401; no transcript/timestamps were obtained;
- reported exposure including unsettled reservations is US$0.02340565 / US$5; no new cash purchase;
- no physical owner microphone, full live browser/API journey, live delivery interpretation or integrated owner walkthrough yet.

The remote sync itself does not increase implementation confidence beyond the evidence it makes inspectable.

## Must Fix A — Whisper 401 Is Not Yet Classified

Remote `provider.mjs` shows successful Responses and failed audio transcription both use the same `process.env.OPENAI_API_KEY`, same Bearer construction and same `https://api.openai.com` host. Therefore an obvious different in-code credential path/header/base URL is **not supported** by the source review.

However the failed audio path intentionally discarded the provider error body and the receipt records `responseBodyRead:false`. Luna and Whisper checks also ran as separate processes, so the evidence does not prove they saw the exact same runtime secret value/configuration.

HTTP 401 remains an authentication/authorization-boundary failure, not a Mandarin/timestamp-quality failure. Exact cause is Unknown until a same-process, safe diagnostic captures status/request ID and sanitized provider error type/code/message without revealing the credential.

Current OpenAI documentation confirms API keys can have endpoint-specific Restricted permissions and projects can also control model access. These are plausible owner-controlled causes only if the next safe error evidence points there; do not pre-assign blame or rotate credentials yet.

## Must Fix B — Current Logic 5/5 Is Not Accepted as Logic Fidelity

The synthetic source says `只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。` In formal logic, `只有 A 才 B` makes A necessary for B; it does not by itself mean A is sufficient for B.

Yet the live Learn output states `土壤干燥时要浇水`, asks whether dry soil means one should water, and the challenge set labels some strengthened `dry -> water` formulations as correct. That is exactly the type of necessary/sufficient-condition distortion this product must catch.

Therefore the 5/5 result remains accepted only as real-Luna/schema/channel-control evidence. It is **not** accepted as semantic logic-quality 5/5. BUILD-01R must correct the fixture/expectations and add a direct necessary-vs-sufficient challenge before semantic quality can be claimed.

## BUILD-01R — Authorized Within Existing Owner Approval

No new owner decision is required for the narrow recovery because it stays inside the already-approved provider/models/data/budget/local-development scope.

R1 safe auth diagnostic:
- one process, existing server-side `OPENAI_API_KEY` only;
- never print/store/commit the raw secret or Authorization header;
- optional non-reversible short fingerprint only to prove the two calls use the same runtime value;
- make one tiny Luna access request and one existing short synthetic Whisper request from that same process;
- record status, `x-request-id` if present, and sanitized provider `error.type/code/param/message` only;
- preserve existing ledger/reservations.

Outcomes:
- Luna PASS + Whisper PASS: blocker not reproduced; continue R2/R3 and remaining BUILD-01 C-F.
- Luna PASS + Whisper 401: stop paid calls; if safe provider evidence points to key endpoint permissions/project-model/account membership, return one precise User Decision Needed with UI setting to inspect/change, never ask for secret value.
- Luna also fails: stop and report current credential/runtime access changed/invalid; no automatic rotation/replacement.

R2 logic fidelity:
- fix `只有…才…` necessary-condition interpretation;
- add an explicit challenge where a source says `只有持票者才可以入场` and a learner wrongly strengthens it to `只要持票就一定可以入场`;
- revise Tutor/content behavior or challenge expectations so source conditions are not strengthened silently;
- rerun bounded Luna semantic checks. Schema-valid is not logic-valid.

R3 if Whisper auth succeeds:
- verify actual Mandarin transcript and word/segment timestamp shape;
- test negation/number/condition/term fail-closed behavior;
- finish live delivery and remaining export/quota/per-attempt-delete/pending-navigation checks;
- then integrated owner walkthrough through the product's own microphone flow.

## Standing Private Feature-Branch Sync Policy

For MASTER-approved bounded builds, Codex may normal fast-forward push the explicitly named private feature branch and sanitized human-readable review evidence to the existing private repo without repeated owner approval. No merge/default-branch integration, release/public deployment, force push, remote deletion, secrets, `.env`, raw owner/private audio or sensitive data.

After each meaningful checkpoint Codex reports exact remote branch and SHA; MASTER reviews directly from GitHub.

## Active Boundaries

Still approved:
- local code/commits and private checkpoint pushes on `prototype/study-teachback-v0.1`;
- loopback Node + Edge + explicit in-product microphone;
- owner-selected low-risk single-speaker audio/source via OpenAI default/global endpoints;
- models only `whisper-1` and `gpt-5.6-luna`;
- BUILD-01 total new cash <= US$10; API exposure/reservation hard stop <= US$5; no auto recharge/escalation.

Not authorized: new provider/model/endpoint family for workaround, `gpt-transcribe`, npm/Python/ffmpeg/WhisperX/Silero/local model install, admin/account APIs, external users, third-party/sensitive audio, public hosting, merge/release or destructive Git.

## State Summary

Completed: private feature-branch sync works; MASTER directly reviewed remote code/evidence; BUILD-01 partial checkpoint accepted at its stated scope; two concrete Must Fix items identified; BUILD-01R written and authorized within existing scope.

Verified: exact remote branch/head/parent; readable source/evidence; 18/18 and 14/14 at their reported engineering scopes; real Luna evidence/usage; one real Whisper HTTP 401; current source shows same coded environment key/header/base host pattern for Luna and Whisper.

Likely: substantial product shell/state/guard work is usable enough to continue once auth and logic fidelity are fixed. The 401 may be runtime/key permission/account configuration rather than request-shape code, but not yet proven.

Unknown: exact 401 provider code/message and runtime key equality across prior processes; successful Mandarin ASR/timestamps; live delivery; physical microphone full journey; true semantic reliability/user learning value.

Not Done: BUILD-01R diagnostic/fixes, successful end-to-end speech chain, remaining browser/live challenges, integrated owner walkthrough, external learner validation/release.

Must Fix: classify/resolve Whisper auth without unauthorized workaround; correct necessary-vs-sufficient logic test/behavior; do not call current Luna 5/5 a logic-quality pass.

User Decision Needed: none now. Only if safe diagnostic points to an owner-controlled credential/project/account permission change or another retained boundary.

Future Optional: dedicated local VAD/ASR, `gpt-transcribe` comparison, realtime Tutor, English/PTE, native/plugin distribution, external learner study.

## Next Smallest Step

**Codex executes BUILD-01R from remote HEAD `99228bed6aa17b05790083de5ecdd45c4a96c28f`, pushes the sanitized recovery checkpoint to the same private feature branch, and either resumes remaining BUILD-01 if Whisper succeeds or returns one precise User Decision Needed if an owner-controlled API permission is identified.**
