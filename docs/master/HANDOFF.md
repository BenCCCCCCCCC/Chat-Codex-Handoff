# Active Handoff — EXCHANGE-RELAY-PROBE-01

Updated: 2026-09-29
Role: 00 MASTER
Status: **READY / NO PRODUCT CHANGES / META EXCHANGE FILE ONLY**

## 1. Purpose

Validate the owner's proposed one-file GitHub relay:

Chat -> `ACTIVE_EXCHANGE.md` -> Codex -> same file -> Chat.

This probe must not modify product code, tests, runtime state, canonical state files, budgets or provider state.

## 2. Transport file

Path:
`meta/master-state:docs/master/ACTIVE_EXCHANGE.md`

The file is transport only.

Git history is the permanent exchange log; the current file holds only the active turn.

## 3. Codex write permission for this probe

The owner has requested this GitHub one-file relay workflow.

For **this probe only**, Codex is authorized to write/update exactly:
`docs/master/ACTIVE_EXCHANGE.md`
on branch:
`meta/master-state`.

This does **not** authorize:
- product-branch push;
- merge;
- changes to `CURRENT_STATE.md` or `HANDOFF.md`;
- any other GitHub file;
- code/test/runtime changes.

Use the safest already-authenticated GitHub write path available.

Do not copy credentials or read ChatGPT internal auth.

If no safe authenticated write path is available, do not improvise credentials; return BLOCKED in the Codex UI.

## 4. Optimistic concurrency

Codex must:
1. read latest meta branch and exchange file;
2. record the meta commit/file version it read;
3. immediately before write, verify the exchange/meta state has not changed incompatibly;
4. if it changed, STOP with conflict rather than overwriting a newer Chat instruction.

Do not force-push.

## 5. Required relay receipt

Replace the current exchange file with a structured `CODEX_TO_CHAT` receipt containing:
- same `turn_id`;
- state = `CODEX_TO_CHAT`;
- task = `EXCHANGE-RELAY-PROBE-01`;
- meta commit/file version read;
- actual repo root;
- product branch;
- product HEAD;
- statement: no product files changed;
- statement: no tests run;
- statement: no provider/API call;
- statement: no product push/merge;
- GitHub write method used, without secrets;
- result = `RELAY_WRITE_OK`;
- Blocking / Unknown if any.

Do not perform any other work.

## 6. Acceptance

PASS only if:
- Codex reads the Chat instruction from GitHub;
- Codex writes the receipt to the same exchange file;
- no owner copy/paste of the Codex response is needed;
- Chat can then read the receipt directly from GitHub;
- no other repo/GitHub path changes.

After PASS, MASTER will use the same relay for a read-only PROJECT-WIDE-REVIEW-01.

## 7. User interaction

For this first probe, owner only sends a tiny Codex message:

`继续，读取 meta/master-state 的 docs/master/ACTIVE_EXCHANGE.md，并严格执行其中当前 turn。`

After that, do not paste the task contents manually.
