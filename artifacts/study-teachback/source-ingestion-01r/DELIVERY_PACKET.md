# SOURCE-INGESTION-01R Delivery Packet

Status: IMPLEMENTED / ENGINEERING-TESTED / READY FOR MASTER REVIEW.
Before: dc4893c5ca146037c8a498755854b3ce5cb73c62
Branch: prototype/study-teachback-v0.1
Owner validation remains paused.

Ordinary Python 3.14.6 created the repo-owned .venv. One explicit setup installed pypdf 6.18.0 with the approved wheel hash and pip --require-hashes, --only-binary and --no-deps. No global installation; no runtime downloads/install; .venv ignored. See SETUP.json and requirements-extractor.txt.

Launcher now uses repo-relative .venv; optional STUDY_PYTHON must be absolute. Child uses -I and only SystemRoot environment. Timeout and all input/archive/page/text bounds retained. Missing interpreter returns EXTRACTOR_SETUP_REQUIRED; missing/wrong pypdf returns EXTRACTOR_DEPENDENCY_REQUIRED for all imports. Safe Chinese setup messages added. No provider fallback. No architecture, OCR, model or learning-flow expansion.

Extraction 6/6; Node 42/42; Edge 23/23. Edge is actual isolated browser with synthetic media and stub providers, not owner validation. Node exercises genuinely absent executable and separate empty venv over HTTP: safe errors, zero provider calls and unchanged ledger. Initial static regression accidentally matched the word pipe as pip; narrowed to the pip word boundary and reran the full suite. Initial failure evidence retained.

Real runtime ledger remains exactly equal to retained R3 snapshot: 37 requests, four unsettled reservations, known cost US$0.01179245, exposure US$0.06859995. New paid calls 0. No secrets/raw files/audio/runtime profiles/venv included in review.

Verified: local runtime setup, all stated tests, ignored venv, source/setup portability regression and ledger equality.
Unknown: other machines/non-Windows operation and owner real-document/microphone journey.
Must Fix: none observed in tested recovery scope.
User Decision Needed: none for this recovery; MASTER review precedes owner validation resumption.
Future Optional: installer UX, broader platform/layout compatibility.
