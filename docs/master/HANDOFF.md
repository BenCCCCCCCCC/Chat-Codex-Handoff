# Active Handoff — BATCH-C-HOST-BROWSER-VERIFY-01

Updated: 2026-09-29
Role: 00 MASTER
Status: WAITING_OWNER / OUTSIDE CODEX SANDBOX / ZERO LIVE API

## 1. Why this step is manual

Batch C focused tests and the complete isolated Node/offline suite passed.

The only missing evidence is browser execution of the MF-02 repeated-confirm case.

Codex cannot provide trustworthy Edge browser evidence in its current Windows sandbox; the owner has already demonstrated that normal Edge works outside that sandbox.

## 2. Binding

Repo:
F:\Chat-Codex-Handoff\validation-repo

Branch:
prototype/study-teachback-v0.1

Base HEAD remains:
dd8317b43100b8cbaad684cab7fc02957e32de62

Batch C changes are currently uncommitted. Do not reset/clean/checkout.

## 3. Owner command

Run from a normal Windows PowerShell, not a Codex terminal:

Set-Location F:\Chat-Codex-Handoff\validation-repo
node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01

## 4. Report to MASTER

Return only:
- PASS or FAIL;
- final pass/fail count;
- exact error if it fails.

Long logs are not needed unless MASTER asks.

## 5. After PASS

MASTER will send a new CHAT_TO_CODEX turn authorizing Codex to:
- inspect the host browser result/artifact;
- self-review the Batch C diff;
- run only any final deterministic zero-call sanity check it deems necessary;
- create one focused local Batch C commit if evidence is complete;
- return via ACTIVE_EXCHANGE.

## 6. After FAIL

MASTER will classify the failure.

If it is an in-scope Batch C product/test defect, Codex may receive a correction turn and use the bounded self-review/self-correction loop.

If it is host/environment-only, do not edit product code speculatively.

## 7. Proactive Codex rule

For future authorized tasks Codex/Astra may analyze, recommend, self-review, test and perform up to two in-scope correction passes without returning for every small defect.

It must stop for scope expansion, product tradeoffs, unapproved spend/live actions, new dependency/model/schema/retention changes, push/merge/public release/high-risk actions, or repeated unresolved blockers.

MASTER/GPT-5.6 remains the independent scope and acceptance gate.


## Command correction

The earlier suffix `correctness-boundaries-01-host` was invalid and caused `INVALID_TEST_BATCH` before any test ran.

Use exactly:
`node .\study-teachback-app\run-offline-tests.mjs browser correctness-boundaries-01`
