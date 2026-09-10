# BUILD-01R Delivery Packet

**BUILD-01R PARTIAL / USER DECISION NEEDED — Whisper endpoint authorization: HTTP 401 / missing_scope.**

Date: 2026-09-11 Australia/Sydney (diagnostic 2026-09-10T20:59:55.773Z UTC). Branch: `prototype/study-teachback-v0.1`. Before local and remote HEAD: `99228bed6aa17b05790083de5ecdd45c4a96c28f`. This packet belongs to the normal descendant recovery commit; its exact SHA is the GitHub commit containing this file (also supplied in final handback). No history rewrite. Existing unrelated untracked files were preserved.

Authority read on `meta/master-state`: CURRENT_STATE (`76e5052a0eb5af4708b09f4116ee50285c665787`), HANDOFF (`63f55edf36d8e1eca6a3d183ede21011d012b546`), BUILD_01R_WHISPER_AUTH_AND_LOGIC_RECOVERY (`9734481096beb2c8f9192a7c66a75082e761d0e8`), BUILD_01_STUDY_TEACHBACK_HANDOFF (`7917b4e4b8895ff859c750a2abef689bcdbac909`).

## Same-process auth evidence

One captured existing runtime value, same process and lexical credential, short SHA-256 fingerprint `21c4bf00e422` on both requests. See [AUTH_DIAGNOSTIC.json](AUTH_DIAGNOSTIC.json). No raw key, Authorization header, environment dump or raw provider error persisted.

| Request | Actual result | x-request-id | Usage |
| --- | --- | --- | --- |
| gpt-5.6-luna Responses, store=false | HTTP 200, completed, returned exact model | req_ba6d7dd137a2475bbead09f9a6cdd856 | 11 input / 5 output tokens |
| whisper-1, existing 7.31-second synthetic Mandarin WAV, requested word + segment timestamps | HTTP 401; invalid_request_error / missing_scope / param=null | req_d8ca678993a744ab8548fb313c43df9e | No successful transcript or timestamps |

Provider message says insufficient permissions and missing scopes, directing inspection of organization/project roles and restricted-key scopes. The exact scope token was removed by conservative long-token sanitization and cannot be reconstructed from saved evidence. This establishes an authorization failure, not the precise misconfigured UI control, billing trouble, or an invalid whole credential. No repeat request was made to recover the redacted token. Paid calls stopped immediately after Whisper 401.

## Feature / recovery matrix

| Scope | Result / evidence |
| --- | --- |
| R1 same-process auth + safe errors | Completed; Luna PASS, Whisper FAIL, preserved request IDs and error classification |
| Credential redaction | 3 offline tests PASS; safe field allowlist, full/masked/fragment/Bearer redaction; no secret/header export |
| R2 necessary vs sufficient | Shared Tutor/Content instruction now preserves B→A for “只有A才B”; Learn/Repair/Apply covered |
| Correct-with-pauses / fluent-wrong / omitted-condition / paraphrase / self-repair | Five corrected text fixtures prepared; no strengthening in correct expectations |
| Plant and exact ticket strengthening | Two explicit negative fixtures; supported or mixed supported/incorrect cannot pass the oracle |
| Schema versus semantics | Offline ticket regression demonstrates schema-valid unsupported verdict fails the semantic oracle; not a general semantic validator |
| New bounded Luna semantic challenge | NOT RUN: retained paid-call stop; seven fixtures ready. Prompt effectiveness and teaching quality UNKNOWN |
| Old Luna 5/5 | Historical schema/channel evidence only; MASTER rejected it as logic-fidelity proof |
| R3 successful Mandarin ASR/timestamps, live C–F | NOT DONE because R1 failed |
| Original product source | Preserved, with narrow shared prompt correction; Learn → Explain in-app recording → Diagnose → Repair → Re-explain → Apply remains partial |
| Physical owner microphone / real integrated validation | NOT DONE; no new recording, server session or browser walkthrough |
| Export completeness, quota, individual-attempt delete, pending-navigation | Remain NOT DONE; no new data behavior claim |

## Actual tests

`node --test study-teachback-app/tests.mjs study-teachback-app/safe-auth-evidence.test.mjs study-teachback-app/logic-fixtures.test.mjs`: **24/24 PASS**, full readable output [NODE_TESTS.txt](NODE_TESTS.txt). Eighteen existing engineering tests rerun plus three sanitizer and three fixture-oracle regressions. Provider calls in these tests are stubs; loopback HTTP test uses a transient local server with no model calls. No dependencies installed.

The existing tests cover source/attempt/span/time/schema rejection, missing content without fabricated timestamp, acoustic/content channel isolation, ASR negation/number/condition/term replay gates, interrupted capture, silence/noise/clipping/decode, raw/corrected identity, expiry and reservation/timeout/budget handling. These are engineering guard tests, not successful live ASR accuracy or semantic-quality measurements.

[STOP_GUARDS.json](STOP_GUARDS.json): duplicate auth diagnostic and live semantic runner refuse before paid requests; runtime ledger hash unchanged. New diagnostic retains its original receipt and cannot be rerun automatically.

Historical Edge **14/14** remains in [browser receipt](../../../study-teachback-app/evidence/browser-1789071825159.json), synthetic media + stub provider, not rerun here. Historical [Luna receipt](../../../study-teachback-app/evidence/live-challenges-1789071668390.json) retains original output for review but is not logic PASS. No new screenshot generated; existing screenshot is a stub-provider engineering session only.

## Ledger / data

[USAGE_LEDGER.json](USAGE_LEDGER.json) is a sanitized exact snapshot of the existing runtime ledger after R1, not a replacement ledger. All previous events are an unchanged prefix, verified in the auth receipt. No prior reservation was released/reset.

| Metric | Before | After |
| --- | ---: | ---: |
| Requests | 12 | 14 |
| Known conservative cost USD | 0.00259815 | 0.00260690 |
| Exposure USD (including unsettled) | 0.02340565 | 0.04141440 |
| Unsettled reservations | 2 | 3 |
| Reserved audio minutes | 3 | 6 |

New Luna known cost estimate: **US$0.00000875**; new failed Whisper **US$0.018 reservation retained**, not claimed actual spend. Overall settled Luna input/output totals: 4,010 / 1,337 tokens. Rate assumptions remain existing conservative ledger rates, including input charged at cache-write upper rate $0.25/M and output $1.20/M; Whisper $0.006/min. References: [Luna](https://developers.openai.com/api/docs/models/gpt-5.6-luna), [Whisper](https://developers.openai.com/api/docs/models/whisper-1). Invoice/balance unknown; no purchase or recharge. Exposure under US$5; new cash ceiling US$10 unchanged.

Only the existing synthetic Mandarin fixture was sent to Whisper. No owner/private voice, sensitive material or client files read or submitted. Original local synthetic audio and runtime ledger remain local; no audio/profile/.env in review whitelist. Existing learning storage/deletion implementation unchanged. Seven-day cleanup/history/delete-all evidence is historical Edge evidence; full data lifecycle still incomplete. Ledger is intentionally independent of learning-data deletion.

## State and one combined owner decision

- **Completed / Verified:** R1 same-process request pair, safe 401 classification, preserved reservations, narrow logic instruction/fixture correction, 24 offline tests, retained-stop checks.
- **Not Done:** new live Luna semantic challenge; successful Whisper transcript/timestamps; remaining C–F and integrated owner validation.
- **Likely:** an owner-controlled key permission or organization/project role is blocking audio; exact control is not determined by this generic missing_scope message.
- **Unknown:** exact missing scope (redacted), current UI configuration, invoice, actual model logic fidelity after correction, live Mandarin ASR quality.
- **Must Fix:** legitimate Whisper endpoint authorization, then actual semantic rerun and remaining integrated checks before any readiness claim.
- **User Decision Needed (single combined item):** Owner inspect OpenAI Platform → intended project → API keys → existing user-owned key → Edit permissions. If Restricted, inspect the permission for POST `/v1/audio/transcriptions` and grant its appropriate write/request scope while preserving existing Responses permission; exact labels vary by resource. Also inspect that key principal's project membership and organization role if the endpoint is already allowed or the key is service-account managed. Confirm the permission correction without sending any key value. This existing synthetic attempt has now exhausted the two-ASR-submission cap: any further request for the same fixture requires an explicit bounded retry exception (one additional request, charged against the unchanged $5 ledger), not resetting/relabeling the attempt. Keep paid calls paused until that combined resume decision. No automatic change to key/provider/model or broad All-permissions recommendation.
- **Future Optional:** calibrated acoustic analysis and broader learning-quality evaluation after the retained recovery scope.

Official permission controls: [Assign API Key Permissions](https://help.openai.com/en/articles/8867743-assign-api-key-permissions). The provider evidence justifies permission inspection but does not establish which particular owner setting is wrong. No private account/admin API was queried.

## Review and remote scope

The [REVIEW_MANIFEST.json](REVIEW_MANIFEST.json) lists the source and readable evidence whitelist with SHA-256 and Git blob hashes. The earlier BUILD-01 manifest is historical to its original commit, not a hash claim for these changed sources. This packet/manifest are review evidence, not product readiness. Normal private same-branch checkpoint push only; no merge/release/public deploy/force push. No ZIP is required to review this recovery.
