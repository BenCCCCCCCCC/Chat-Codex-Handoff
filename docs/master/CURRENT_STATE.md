# Current State

Updated: 2026-09-12
Role: 00 MASTER / authoritative dynamic state

## Stage

**SOURCE-INGESTION-01R BLOCKER CLASSIFIED / MASTER DEPENDENCY DECISION MADE — PRODUCT-LOCAL VENV + PINNED PYPDF AUTHORIZED / OWNER-VALIDATION-01 PAUSED**

Active product remains **Study-first + in-product spoken teach-back**:

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

with source entry:

`MD/TXT/PDF/DOCX/PPTX -> local extraction -> preview/selection -> Learn`.

Latest feature checkpoint remains:

`prototype/study-teachback-v0.1`

`dc4893c5ca146037c8a498755854b3ce5cb73c62`

No feature-branch change occurred during the portability probe because Codex correctly stopped before installing a dependency.

## Authority

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md` — active recovery with dependency decision
4. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — approved but paused
5. R4/R3/BUILD-01 only as evidence boundaries.

## SOURCE-INGESTION-01 accepted state

Accepted at current-machine engineering scope:
- `.md/.txt/.pdf/.docx/.pptx` local extraction;
- preview + explicit selection before Learn;
- no automatic provider call on import;
- no raw document persistence;
- no OCR;
- extraction **6/6 PASS**;
- Node **40/40 PASS**;
- Edge **23/23 PASS**;
- **0 new paid calls** and unchanged ledger.

## Portability probe result

Codex removed nothing and made no paid call during the probe. It verified:
- ordinary `py -3` / `python` resolve to normal Python **3.14.6**;
- ordinary Python does **not** have `pypdf` installed;
- therefore the current hard-coded Codex-private runtime cannot simply be replaced with global Python without an explicit dependency decision.

This is a packaging/setup blocker, not a failure of the ingestion UX or extraction algorithms already tested.

## MASTER dependency decision

The dependency decision stays within the already-approved SOURCE-INGESTION feature scope and is local/free/auditable. MASTER therefore resolves it without sending another ordinary implementation decision to the owner.

Approved recovery:
- create a product-owned repo-local venv, normally `study-teachback-app/.venv`;
- bootstrap it from ordinary Python 3.14.6;
- install **`pypdf==6.18.0`** explicitly as a one-time setup step;
- pin/document the dependency and preferably verify the published wheel hash;
- do not commit the venv;
- normal runtime must never silently install/download packages;
- runtime uses the product-local venv (or an explicit non-secret configured Python path) and fails closed if unavailable;
- no references to `.cache/codex-runtimes`, `codex-primary-runtime`, ChatGPT/Codex internals or private app files;
- no raw-file provider fallback, no OCR, no provider/model change.

Official package check on 2026-09-12: pypdf 6.18.0 is current, BSD-3-Clause, requires Python >=3.9 and lists Python 3.14 support.

## Recovery acceptance

SOURCE-INGESTION-01R passes when:
- product-local venv/setup metadata is explicit and repo-owned;
- hard-coded private runtime dependency is gone;
- missing venv/dependency fails closed without provider or ledger activity;
- README accurately documents file ingestion, setup, formats, limits and no-OCR/complex-layout constraints;
- extraction + Node + Edge regressions pass;
- zero Whisper/Luna calls and ledger unchanged;
- sanitized checkpoint fast-forward pushed to the same private feature branch.

## Owner validation

OWNER-VALIDATION-01 remains **PAUSED**, not cancelled. After SOURCE-INGESTION-01R passes MASTER review, resume the already-approved walkthrough from the new HEAD and begin with one low-risk imported file -> preview/selection -> Learn before the microphone portion.

## State Summary

Completed: BUILD-01 through R4; SOURCE-INGESTION-01 feature implementation/current-machine tests; portability probe; dependency decision.

Verified: `dc4893c...`; extraction 6/6; Node 40/40; Edge 23/23; zero paid calls; normal Python 3.14.6 available; `pypdf` absent from normal Python.

Likely: a repo-owned venv with one pinned pure-Python PDF dependency is sufficient to remove the current portability blocker without changing product architecture.

Unknown: final venv setup/regression result; owner real-file extraction; owner microphone journey.

Not Done: venv implementation/setup, README correction, rerun regressions, resumed OWNER-VALIDATION-01.

Must Fix: remove private Codex runtime dependency using the authorized product-local venv contract.

User Decision Needed: **none** for this bounded dependency/setup recovery. New owner decision only if a materially larger packaging architecture, new provider/model, paid expansion, release/public action or other retained boundary becomes necessary.

Future Optional: installer UX, OCR, richer page/slide provenance, layout-aware parsing, broader device/document support.

## Next Smallest Step

**Codex resumes SOURCE-INGESTION-01R from `dc4893c...`, creates the repo-owned venv, installs pinned pypdf once, migrates the launcher, reruns extraction/Node/Edge with zero paid calls, and pushes a sanitized checkpoint for MASTER review.**