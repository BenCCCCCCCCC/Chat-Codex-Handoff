# Current State

Updated: 2026-09-29 — Host browser PASS / GitHub exchange relay validation next
Role: 00 MASTER / authoritative dynamic state

## 1. Product / version state

Active product: **知而能讲** — Study-first + in-app teach-back.

Repository: `BenCCCCCCCCC/Chat-Codex-Handoff`

Local checkout:
`F:\Chat-Codex-Handoff\validation-repo`

Product branch:
`prototype/study-teachback-v0.1`

Accepted local feature baseline:
`dd8317b43100b8cbaad684cab7fc02957e32de62`

Batch A: MASTER-ACCEPTED.

Batch B / Phase 3A: MASTER-ACCEPTED and version-finalized locally.

Dynamic authority remains:
- `meta/master-state/docs/master/CURRENT_STATE.md`
- `meta/master-state/docs/master/HANDOFF.md`

New transport surface:
- `meta/master-state/docs/master/ACTIVE_EXCHANGE.md`

`ACTIVE_EXCHANGE.md` is a message transport, **not** canonical product authority. Its Git commit history is the exchange audit log.

## 2. Phase 3B state

PHASE3B-LIVE-01 remains owner-authorized under:
- maximum 3 provider calls;
- zero retries;
- incremental local exposure ceiling US$0.03432;
- one recording maximum.

No provider call or recording has yet occurred under this authorization.

Previous Codex-launched Edge failures are now treated as validation-environment/sandbox limitations rather than current evidence of a product-root defect.

### PHASE3B-HOST-BROWSER-SMOKE-01 — PASS

Owner manually ran the smoke outside Codex sandbox in a normal Windows session and reports all required checks PASS:

1. local server started successfully;
2. fresh isolated Edge opened normally;
3. `http://127.0.0.1:4317` displayed the product root/basic UI;
4. no unexpected Tutor / ASR / diagnosis API activity appeared.

This clears the browser-start blocker for manual host execution.

Phase 3B may later resume manually in the owner-launched fresh isolated Edge profile under the existing authorization. Do not require Codex to launch/control that real browser session.

## 3. New owner workflow decision — GitHub exchange relay

Owner proposes eliminating repeated copy/paste between Chat and Codex by using one GitHub document as the active message bus.

MASTER accepts this direction for a **minimal validation first**, not a full bridge implementation.

Design:
- file: `docs/master/ACTIVE_EXCHANGE.md` on `meta/master-state`;
- current file contains only the active turn;
- every overwrite is a Git commit, so Git history retains all prior Chat instructions and Codex replies;
- Chat writes `CHAT_TO_CODEX`;
- Codex reads it and, after completing/being blocked, replaces only that file with `CODEX_TO_CHAT`;
- Chat reads the reply directly from GitHub, reviews it, updates canonical state if needed, then replaces the exchange file with the next instruction;
- user only needs a minimal Codex nudge such as: `继续，读取 ACTIVE_EXCHANGE.md`.

This is intentionally not auto-send or an autonomous loop. The user remains the turn boundary.

## 4. Exchange safety rules

`ACTIVE_EXCHANGE.md` is transport only.

Neither side may use it to silently override:
- product scope;
- spending authorization;
- push/merge permissions;
- canonical acceptance state.

Writer ownership alternates:
- `CHAT_TO_CODEX` -> Codex may write only the exchange file;
- `CODEX_TO_CHAT` -> Chat reviews and writes next turn.

Codex must:
- read latest `meta/master-state` state before work;
- record the exchange file commit/blob it read;
- update only `docs/master/ACTIVE_EXCHANGE.md` on the meta branch for the relay;
- not push/merge the product branch;
- not modify `CURRENT_STATE.md` or `HANDOFF.md`;
- fail closed if the exchange/meta branch changed after its read and would cause a conflicting overwrite.

Chat remains the only MASTER writer for canonical state/decisions.

## 5. First validation — EXCHANGE-RELAY-PROBE-01

Before using the relay for real work, validate one GitHub round trip with no product changes.

Chat creates the exchange instruction.

Codex must:
- read it from the latest meta branch;
- make no product/code/test/runtime changes;
- write a fixed structured relay receipt back to the same exchange file;
- change no other GitHub path;
- push/write no product branch;
- stop.

PASS means Chat can read Codex's receipt directly from GitHub without owner copy/paste.

If Codex cannot safely/authenticated-write that one meta file, return BLOCKED; do not build a helper yet.

## 6. Next use after relay PASS — PROJECT-WIDE-REVIEW-01

Owner also wants Codex to fully read the active project and contribute suggestions.

After the exchange relay passes, the next task will be a **read-only project-wide review**.

Codex may inspect the tracked project broadly and return:
- active architecture map;
- current product flow;
- state/authority map;
- stale/historical vs active files;
- confirmed risks/defects;
- opportunities to simplify or strengthen the product;
- suggestions based on the actual repository.

Suggestions must be classified:
- Must Fix;
- User Decision Needed;
- Future Optional.

Rules:
- suggestions do not automatically become implementation scope;
- no code changes in the review;
- distinguish Verified / Likely / Unknown;
- cite concrete file paths/symbols/evidence;
- do not repeat settled decisions merely to generate more work.

This review is intended to give Codex more agency in analysis, **not** autonomous scope control.

## 7. Why this workflow is preferred

It directly targets the project's core friction:
- less owner copy/paste;
- less prompt rewriting;
- fewer missing materials/version mismatches;
- Chat can review the exact Codex reply from GitHub;
- Codex can read the exact next instruction from GitHub;
- Git commit history provides an audit trail;
- no new daemon/GUI/message broker is required.

Do not build a larger transport until this one-file relay is proven useful.

## 8. Classification

Completed:
- Batch A/B engineering validation;
- outside-sandbox host browser smoke PASS.

Ready:
- EXCHANGE-RELAY-PROBE-01.

Planned after relay PASS:
- PROJECT-WIDE-REVIEW-01;
- resume manual Phase 3B live validation when owner chooses.

Unknown:
- whether Codex has a safe authenticated path to update exactly one meta-branch exchange file;
- whether the one-file relay materially removes copy/paste in real use;
- project-wide review findings.

Not Done:
- exchange write probe;
- project-wide review;
- actual Phase 3B recording/provider calls;
- push/merge/final product acceptance.

## 9. Next smallest step

Run EXCHANGE-RELAY-PROBE-01 only. If PASS, Chat should read the Codex reply directly from GitHub and issue PROJECT-WIDE-REVIEW-01 through the same exchange file, with no owner copy/paste of the Delivery Packet.
