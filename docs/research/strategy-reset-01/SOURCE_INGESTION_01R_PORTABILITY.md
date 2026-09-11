# SOURCE-INGESTION-01R — extractor runtime portability recovery

Date: 2026-09-12
Role: 00 MASTER
Status: MASTER DECISION RECORDED / RESUME AUTHORIZED — PRODUCT-LOCAL VENV + PINNED PYPDF

## Trigger

MASTER reviewed private `prototype/study-teachback-v0.1` at `dc4893c5ca146037c8a498755854b3ce5cb73c62`.

SOURCE-INGESTION-01 is accepted at current-machine engineering scope:
- `.md/.txt/.pdf/.docx/.pptx` local extraction;
- preview/explicit selection before existing Learn;
- no automatic provider call on import;
- no raw document persistence in learning history;
- no OCR;
- extraction 6/6, Node 40/40, Edge 23/23;
- zero new paid calls and unchanged ledger.

The current launcher hard-codes a Codex-private Python runtime. Portability recovery correctly stopped after proving ordinary `py -3` / `python` point to Python 3.14.6 but do not contain `pypdf`.

## MASTER dependency decision

This dependency choice is within the already-approved SOURCE-INGESTION scope and is local, free, auditable, reversible, and not a provider/model/data-scope expansion. It does not require a new owner product decision.

Use a **product-local virtual environment** owned by this repo/app, not Codex/ChatGPT internals and not the global Python site-packages.

Approved setup:
- bootstrap interpreter: normal `py -3` / Python 3.14.6;
- local venv: `study-teachback-app/.venv` (or an equivalently repo-relative product-local path, documented exactly);
- dependency: `pypdf==6.18.0` only for PDF text extraction;
- pin the dependency in a committed requirements/setup file;
- prefer hash-verified installation for reproducibility; current PyPI wheel SHA256: `05b762b77bcb9dcb4a7c91fcf5dded585b25bee7269ab3d3001d7c55fa1b324b`;
- do not commit the venv itself; add it to `.gitignore`;
- no optional pypdf extras unless separately justified.

Official PyPI was checked on 2026-09-12: pypdf 6.18.0 is the current release, BSD-3-Clause, requires Python >=3.9, and explicitly lists Python 3.14 support.

## Runtime contract

At runtime:
1. use the documented product-local venv Python, or an explicit non-secret `STUDY_PYTHON`-style override if Codex chooses to support one;
2. never inspect or invoke `.cache/codex-runtimes`, `codex-primary-runtime`, ChatGPT/Codex app internals, credentials, or private application files;
3. never auto-download or silently install packages during normal app runtime;
4. if the product-local extractor runtime or `pypdf` is absent, fail closed with a safe user-facing setup/dependency error and do not call a provider;
5. keep `python -I` or equivalent isolation, restricted subprocess environment, 15s timeout, 10 MB input, 30 MB Office expansion, 100 pages/slides, 200k extracted chars;
6. never upload the raw file to OpenAI as a fallback.

A **one-time explicit setup/install step** executed now by Codex is authorized. This is installation/setup, not runtime auto-install behavior.

## Required implementation and verification

Codex may now:
- create the product-local venv using ordinary Python 3.14.6;
- explicitly install the pinned `pypdf==6.18.0` into that venv;
- replace the hard-coded private-runtime launcher with the repo-owned venv contract;
- add committed dependency/setup metadata and `.gitignore` coverage;
- update README with file ingestion, setup prerequisite, supported formats/limits, no OCR/complex-layout limitation and current tests;
- add regressions proving no Codex-private path remains and missing venv/dependency fails closed with zero provider/ledger effects;
- rerun extraction + Node + Edge suites;
- make zero Whisper/Luna calls;
- normal fast-forward push sanitized evidence to the same private feature branch.

Do not vendor the whole Python runtime, add a package manager framework, add OCR, or change provider/model architecture in this recovery.

## Owner-validation consequence

OWNER-VALIDATION-01 remains approved but PAUSED until this recovery passes MASTER review. After PASS, resume from the new HEAD and include one low-risk file import -> preview/selection before the existing Learn + microphone walkthrough.

## State classification

Completed: SOURCE-INGESTION feature behavior and current-machine tests; ordinary Python discovery.

Verified: ordinary Python 3.14.6 exists; `pypdf` is absent there; current feature still depends on Codex-private runtime at `dc4893c...`.

Must Fix: migrate PDF extraction to the repo-owned local venv contract and rerun regressions.

User Decision Needed: none for this bounded dependency/setup decision.

Future Optional: installer/packaging UX, OCR, richer provenance/layout-aware extraction, wider document/device compatibility.