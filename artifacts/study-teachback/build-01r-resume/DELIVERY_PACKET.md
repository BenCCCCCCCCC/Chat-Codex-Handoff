# BUILD-01R resume — blocked credential retry

**PARTIAL / USER DECISION NEEDED — Whisper HTTP 401 / invalid_api_key.**

Before local/remote HEAD: `97dddd8154b9a0ba340e8c11fc1b0f7db309e879`. Branch: `prototype/study-teachback-v0.1`. This normal descendant checkpoint preserves lineage. Latest meta/master-state CURRENT_STATE, HANDOFF, BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY, and BUILD_01_STUDY_TEACHBACK_HANDOFF were read before execution. No unrelated untracked files changed.

Current runtime credential fingerprint `66d86db3fb11` differs from old `21c4bf00e422`; this proves a changed runtime value only. No secret/header/environment dump was printed or saved. Owner's new dedicated project/key configuration itself was not inspected.

Exactly one extra `whisper-1` request was sent first, with the existing 7.31-second synthetic Mandarin fixture, same attempt ID `synthetic-mandarin-build01`, and same fixture SHA-256. Only this ID's submission allowance changed from two to three. No Luna request occurred.

Actual response: HTTP **401**, x-request-id `req_c05a58ff473d4b55bbdfa3abfe8eafe9`, error.type `invalid_request_error`, error.code `invalid_api_key`, error.param null. Sanitized provider message reports an incorrect API key. This is a different error from the previous missing_scope response. No successful Mandarin transcript, word timestamps or segment timestamps were returned. Paid calls stopped; no retry, alternate credential source, provider/model switch or dependency installation followed. See [WHISPER_RETRY.json](WHISPER_RETRY.json).

## Cost and history

- Current known conservative cost: **US$0.00260690**, unchanged; actual invoice unknown.
- Current exposure including unsettled reservations: **US$0.05941440 / US$5**.
- Requests 14 → 15; reserved audio minutes 6 → 9; unsettled reservations 3 → 4; attempt count remains 1.
- Extra request retains its US$0.018 reservation. No release/reset/relabel of prior events, attempts or minutes; original events verified as unchanged prefix.
- No new cash purchase/recharge. US$10 BUILD-01 new-cash ceiling unchanged.
- [USAGE_LEDGER.json](USAGE_LEDGER.json) is a read-only review snapshot, not a replacement runtime ledger.

## Verification and remaining work

Offline regression command: `node --test study-teachback-app/tests.mjs study-teachback-app/safe-auth-evidence.test.mjs study-teachback-app/logic-fixtures.test.mjs study-teachback-app/retry-allowance.test.mjs`. **26/26 PASS**. Readable output: [NODE_TESTS.txt](NODE_TESTS.txt). New tests verify the existing fixture alone gets a third reservation, a fourth fails, prior reservations remain charged, and ordinary/similar IDs remain capped at two. These tests use temporary isolated ledgers and stub provider calls, never the live ledger or API.

Completed / Verified: repo/remote lineage, changed runtime fingerprint, one authorized extra Whisper request, safe error receipt, unchanged historical ledger prefix, narrowly scoped allowance.

Not Done: corrected live Luna logic challenge (not run), successful ASR/timestamps, remaining BUILD-01 C–F, integrated owner walkthrough. Prior offline logic tests and historical Edge results do not establish live model quality. No new browser screenshot or owner recording generated; data storage/deletion implementation unchanged.

Unknown: why the current server-side runtime value is rejected (e.g. incorrect binding or revoked/invalid credential cannot be distinguished from this receipt). Do not infer a specific cause or ask for the secret.

Must Fix / User Decision Needed: Owner privately verify that the intended dedicated project key is valid and correctly bound as the full server-side OPENAI_API_KEY, then restart the launching runtime as needed. Do not send the key or its recoverable fragments. The approved third submission is consumed; any further same-fixture request needs a new explicit bounded authorization without resetting/relabeling history. No additional retry is implied by fixing the binding.

Future Optional: broader acoustic and learning-quality calibration after recovery.

## Private review

Normal private feature-branch fast-forward checkpoint only. No merge/release/public deploy/force push. [REVIEW_MANIFEST.json](REVIEW_MANIFEST.json) contains source and readable evidence whitelist hashes; previous manifests remain historical. No runtime files, audio, secrets, .env, browser profiles or unrelated artifacts included. No manual ZIP upload required.
