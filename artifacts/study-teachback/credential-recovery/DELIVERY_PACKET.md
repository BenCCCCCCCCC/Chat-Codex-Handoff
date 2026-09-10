# BUILD-01R credential recovery

**AUTH RECOVERED / BUILD-01 PARTIAL — ASR validation failed and successful-response fields were not preserved.**

Branch `prototype/study-teachback-v0.1`; before local/remote HEAD `79988de15ca72a6e2339cb1a4437448008a02153`. Normal descendant checkpoint; unrelated untracked files untouched. Read current meta/master-state CURRENT_STATE, HANDOFF, BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY, and BUILD_01_STUDY_TEACHBACK_HANDOFF before execution. The latest owner trigger overrides older retry limits.

## Actual requests, in order

| Request | HTTP | Request ID | Result |
| --- | --- | --- | --- |
| One tiny gpt-5.6-luna Responses smoke, store=false | 200 | req_ec736ad1f65e4abba48718fc2a16de92 | Exact model, completed, 11 input / 5 output tokens |
| One whisper-1 transcription of existing 7.31-second synthetic Mandarin fixture | 200 | req_d2c2110b763045d698f304691e2c38f4 | JSON parsed and request settled; local normalizeASR threw before transcript fields were saved |

Both used runtime fingerprint `deecd15c4b0b`; second runner checked it against the successful smoke. No raw key, Authorization header, .env, environment dump or client files exposed. The fixture hash matched its original; attempt ID stayed `synthetic-mandarin-build01`. Only its allowance changed 3 → 4; no fifth submission. No further API calls after validation failure.

See immutable [LUNA_SMOKE.json](LUNA_SMOKE.json) and [WHISPER_RETRY.json](WHISPER_RETRY.json). The latter's coarse `NETWORK_OR_VALIDATION_FAILURE` outcome is not an auth error: HTTP 200 and completed settlement show response JSON was read. The executed script called normalization before copying fields into the receipt. Its catch discarded the precise validation reason and the process exited. Therefore actual Mandarin text, word timestamps, segment timestamps and exact validation failure are **UNKNOWN / NOT RECOVERABLE FROM SAVED EVIDENCE**. Do not invent an ASR result or attribute the failure to network/provider without evidence.

This is an agent-authored diagnostic evidence-capture defect. It is fixed locally by `asr-evidence.mjs`: persist sanitized allowlisted synthetic text/time fields before normalization; preserve a safe validation category and require nonempty word timestamps. That fix was not used in the already-completed live request and cannot recover its response. No `SYNTHETIC_ASR_FIELDS.json` was actually generated this run.

## Tests and product state

**28/28 offline tests PASS**: existing 26 tests with fourth-submission limit updated, plus invalid-timestamp evidence preservation and missing-word/valid-shape tests. [NODE_TESTS.txt](NODE_TESTS.txt) contains readable output. All test provider calls are stubs and test ledgers are isolated. No new installation.

Corrected bounded Luna logic challenge: **NOT RUN**, because required ASR validation could not be established. Old 5/5 remains historical schema/channel evidence, not logic fidelity. Remaining active BUILD-01 C–F and integrated owner validation remain incomplete. No new browser screenshot or physical owner microphone session. Product learning storage/deletion behavior unchanged; no new lifecycle verification claim.

## Ledger and costs

All prior events are an unchanged prefix, independently recorded by both request receipts. No reservation release/reset/relabel, no attempt replacement and no minute reset. Read-only review snapshot: [USAGE_LEDGER.json](USAGE_LEDGER.json).

- Known conservative cost: **US$0.00341565** (prior US$0.00260690).
- Exposure: **US$0.06022315 / US$5** (prior US$0.05941440).
- New known estimate: Luna US$0.00000875 + Whisper US$0.00080000, using existing ledger rates and ceil-to-second duration estimate; not a provider invoice.
- Requests 15 → 17; reserved minutes 9 → 12; attempt count 1; four old unsettled reservations remain.
- No new cash purchase or recharge; US$10 BUILD-01 cash ceiling unchanged.

## Classification / next decision

- Completed / Verified: valid runtime authentication for both approved endpoints, one smoke then one fourth ASR request, exact fixture identity, preserved ledger prefix, offline capture fix and tests.
- Not Done: actual transcript/time validation, live Luna logic rerun, remaining C–F, integrated owner validation.
- Unknown: precise timestamp/shape validation error, actual returned Mandarin words/times, corrected live semantic fidelity and invoice.
- Must Fix: capture a successful ASR response before validation, then review exact timestamp/shape failure without weakening guards blindly. Do not ask owner to replace a key that now authenticates.
- User Decision Needed: this fixture has consumed all four allowed submissions. A fresh response requires a new explicit bounded same-fixture retry authorization; no automatic retry or relabeling. That request is caused by the diagnostic evidence-loss defect, not another credential failure.
- Future Optional: broader ASR/acoustic and pedagogy calibration after the bounded pipeline is validated.

Normal private feature-branch fast-forward push only; no merge/release/public deploy/force push. [REVIEW_MANIFEST.json](REVIEW_MANIFEST.json) lists canonical Git blob hashes of the source/evidence whitelist. Historical manifests remain historical. No audio/runtime/secret/profile/ZIP/private-client files included.
