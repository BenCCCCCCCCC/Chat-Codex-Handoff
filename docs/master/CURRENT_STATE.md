# Current State

Updated: 2026-09-29 — Project-wide Codex review accepted / correctness Batch C dispatched
Role: 00 MASTER / authoritative dynamic state

## 1. Active product / version

Product: **知而能讲** — Study-first + in-app teach-back.

Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Accepted local feature baseline:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Batch A: MASTER-ACCEPTED.

Batch B / Phase 3A: MASTER-ACCEPTED and version-finalized locally.

Dynamic authority:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

Transport only:
- `meta/master-state/docs/master/ACTIVE_EXCHANGE.md`

## 2. Phase 3B state

PHASE3B-LIVE-01 remains owner-authorized under:
- maximum 3 provider calls;
- zero retries;
- incremental local exposure <= US$0.03432;
- one recording maximum.

No provider call or recording has occurred under that authorization.

Host browser smoke outside Codex sandbox = PASS:
- server starts;
- fresh isolated Edge opens;
- product root/UI displays;
- no unexpected Tutor/ASR/diagnosis provider activity.

The live experiment remains PAUSED while the newly found correctness boundaries are fixed and regression-tested. Existing live authorization remains intact and unspent.

## 3. GitHub exchange relay

EXCHANGE-RELAY-PROBE-01 = PASS.

Verified:
- Chat wrote one `CHAT_TO_CODEX` turn;
- Codex read it and wrote `CODEX_TO_CHAT` to the same file;
- MASTER read the receipt directly from GitHub;
- comparison showed only `docs/master/ACTIVE_EXCHANGE.md` changed;
- no product change/test/provider call/push/merge.

Accepted workflow:
1. MASTER writes the next turn to `ACTIVE_EXCHANGE.md`.
2. Owner sends only a minimal Codex nudge.
3. Codex executes and writes its reply back to the same exchange file.
4. Owner returns to Chat with only “Codex 已执行”.
5. MASTER reads the result directly, updates canonical state and writes the next turn.

The exchange file is transport, not product authority.

## 4. PROJECT-WIDE-REVIEW-01 — COMPLETE

Codex returned `REVIEW_COMPLETE_WITH_FINDINGS`.

MASTER verified the review commit after dispatch changed only:
`docs/master/ACTIVE_EXCHANGE.md`.

Coverage reported by Codex:
- Git tracked files: 338;
- active project body after excluding generated/historical evidence areas: 81 tracked files;
- all 81 active files fully read;
- recent 12 commits inspected;
- three selected historical evidence receipts sampled;
- 257 historical/generated files under `artifacts/**` and `study-teachback-app/evidence/**` intentionally not byte-read;
- owner profile/IndexedDB/credentials/live runtime ledger not inspected;
- no active tracked body files unread/blocked.

This coverage is sufficient for the requested architecture/project review while preserving the distinction between active source and historical evidence.

## 5. Project-wide review — MASTER assessment

The review confirms the accepted architecture:
- source/local ingestion;
- Tutor/learning dialogue;
- real owner recording;
- original audio + raw/corrected transcript;
- replay gate;
- content findings separated from local process evidence;
- diagnostic target based on content, optionally contextualized by process evidence;
- server/provider/ledger boundaries;
- IndexedDB local topic/history/export/delete;
- retained Handoff tooling separate from the learning product;
- GitHub meta branch as MASTER state plus ACTIVE_EXCHANGE as transport.

Codex also identified three distinct source-level correctness boundaries in the current accepted local baseline. MASTER accepts them as **Must Fix before resuming Phase3B live validation**.

### MF-01 — Tutor output/history length contract mismatch

Evidence reported:
- `study-teachback-app/core.mjs` accepts Tutor message output up to 4000 characters;
- `app.mjs` stores accepted assistant messages in history;
- `server.mjs /api/teach` later revalidates each recent history item with a 2500-character bound.

Consequence:
a Tutor output accepted by the product at 2501–4000 characters can later cause the next otherwise-normal learning request to fail locally before provider dispatch.

Required correction:
unify accepted Tutor output and re-input history contract with explicit handling; do not silently rewrite provenance/history.

### MF-02 — repeated content confirmation can advance transcript version during pending diagnosis

Evidence reported:
- content confirm mutates/saves a correction before the existing API in-flight guard rejects a second diagnosis request;
- a rapid/repeated confirm can therefore create a later transcript version while the first diagnosis is still in flight;
- the earlier report can then be filtered out as non-latest.

Required correction:
make confirm/save/dispatch one mutually exclusive operation before any version mutation; repeated confirm while busy must not create a new correction or second dispatch.

### MF-03 — GET /api/status ledger errors escape the request-level controlled boundary

Evidence reported:
- status summary is read outside the POST try/catch;
- ledger read/JSON errors can throw `LEDGER_UNREADABLE`;
- the async request callback lacks a controlled status-path error response.

Required correction:
fail closed with a controlled “budget/status unavailable” response; never reset ledger, release reservations or allow provider work as a recovery shortcut.

These findings do not revoke Batch A/B acceptance; they are newly discovered correctness boundaries in the accepted source.

## 6. CORRECTNESS-BOUNDARIES-01 / Batch C

MASTER authorizes one bounded zero-provider-call correction covering MF-01, MF-02 and MF-03 only.

Goals:
- reproduce each boundary in isolated regression first where practical;
- apply minimum behavior-preserving fixes;
- run focused + applicable existing offline/browser stub regression;
- preserve Batch A/B behavior;
- no live provider, microphone or Phase3B.

Exact task is in HANDOFF and dispatched through ACTIVE_EXCHANGE.

## 7. Project-wide suggestions retained but NOT automatically implemented

### User Decision Needed / retained backlog

**UD-02 — portable synthetic audio fixture**
Current browser suite reads an ignored synthetic WAV. Decide later whether to check in a fixed synthetic fixture with hash/provenance or document deterministic preparation. A clean clone must not silently substitute different audio and claim equivalent coverage.

**UD-03 — ledger atomic persistence**
Current ledger writes the whole JSON directly. A separate decision is needed for atomic replacement/recovery and fault injection. Locks solve concurrency, not interrupted-write atomicity. Do not auto-reset unresolved reservations.

**UD-04 — historical entrypoint lifecycle**
Legacy browser suites/live helpers/delivery semantic paths remain. Decide later whether to explicitly mark/segregate them or gradually remove after consumer checks.

**UD-05 — real owner validation**
Resume the already-authorized owner-led Phase3B only after Batch C is accepted. Existing spend authorization remains valid.

**UD-06 — retention/export/recovery**
Custom retention/default/reminders remain desired. Export currently does not imply one-click re-import/recovery. Exact policy remains owner decision.

### Future Optional

- Small-step extraction of pure state transitions/dependency seams from `app.mjs` when touching related behavior; no broad refactor.
- Mark one active browser suite and classify r3/legacy suites/helpers explicitly.
- Treat GitHub exchange as primary workflow and retained handoff-kit as fallback.
- Product UX: emphasize one most useful content relation + focused next action while preserving process evidence as non-diagnostic observation.
- Synthetic/fake-provider portfolio demo that clearly distinguishes engineering validity from learning efficacy.
- Measure replay burden before changing replay policy.
- ASR/Whisper migration remains a separate current-capability decision; external claims require MASTER freshness check.

## 8. Exchange workflow improvements retained

The current single-file relay is sufficient for the current single-owner serial workflow.

Future minimal conventions, if needed:
- fixed `state`, `turn_id`, `writer`, `in_reply_to` fields;
- duplicate Codex nudge should not repeat completed work;
- write-before check of exchange content plus canonical commit;
- write-after check that only ACTIVE_EXCHANGE changed and read-back succeeded;
- stronger branch-level CAS only if real concurrent writers appear.

Do not build a daemon/message broker while the one-file relay is sufficient.

## 9. Classification

Completed:
- Batch A/B engineering validation;
- host browser smoke;
- GitHub exchange relay validation;
- PROJECT-WIDE-REVIEW-01.

Must Fix / In Progress:
- CORRECTNESS-BOUNDARIES-01 (MF-01/02/03).

Paused but already authorized:
- PHASE3B-LIVE-01.

User Decision Needed later:
- portable fixture;
- atomic ledger persistence;
- legacy entrypoint cleanup;
- retention/recovery policy;
- exact timing of live owner experiment after Batch C.

Unknown:
- trigger frequency of MF-01 in natural Tutor output;
- real timing frequency of MF-02;
- actual damaged-ledger behavior until isolated regression;
- real owner ASR/usefulness/replay burden.

## 10. Next smallest step

Codex executes only CORRECTNESS-BOUNDARIES-01 through ACTIVE_EXCHANGE, writes the review/delivery result back to the exchange file, and stops for MASTER review. Owner need not copy the response.
