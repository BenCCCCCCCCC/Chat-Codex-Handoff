# Active Handoff

Updated: 2026-09-12
Role: 00 MASTER

## Immediate State

**SOURCE-INGESTION-01R PASS / OWNER-VALIDATION-01 RESUMED — RUN ONE REAL FILE + MICROPHONE WALKTHROUGH**

Active flow:

`MD/TXT/PDF/DOCX/PPTX -> local extraction -> preview/selection -> Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

MASTER-accepted private feature checkpoint:

`prototype/study-teachback-v0.1`

`a99d380473a1eac45ada67022c589d654db9c7cd`

Do not resume synthetic development first. OWNER-VALIDATION-01 was previously owner-approved and is now reopened after the portability fix passed MASTER review.

## Read order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md`
4. `docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md` — PASS / closed
5. earlier R4/R3/BUILD-01 only as evidence boundaries.

## Accepted portability result

MASTER reviewed only the SOURCE-INGESTION-01R delta.

Accepted:
- repo-owned `study-teachback-app/.venv`;
- Python 3.14.6 setup;
- `pypdf==6.18.0` pinned with SHA256 `05b762b77bcb9dcb4a7c91fcf5dded585b25bee7269ab3d3001d7c55fa1b324b`;
- `.venv` ignored/not committed;
- no runtime auto-install/download;
- repo-relative venv launcher plus optional absolute `STUDY_PYTHON` override;
- no active Codex/ChatGPT private-runtime path;
- isolated/restricted extractor process and prior size/time limits retained;
- missing interpreter/dependency fails closed with zero provider calls and unchanged ledger;
- extraction **6/6**, Node **42/42**, Edge **23/23**;
- **0 new paid calls** and unchanged live ledger;
- README updated to describe actual file-ingestion/setup behavior and limitations.

Windows/local-alpha scope is verified. Other machines/non-Windows packaging remains unverified and optional for later.

## OWNER-VALIDATION-01 execution

Codex prepares the local runtime only; owner performs file selection and microphone actions in Edge.

1. Verify `F:\Chat-Codex-Handoff\validation-repo`, branch `prototype/study-teachback-v0.1`, HEAD equals or normally descends from `a99d380...`, and preserve worktree/ledger.
2. Verify repo-owned extractor venv is present and the source import path is ready; do not reinstall if already valid.
3. Start only `node study-teachback-app/server.mjs`; keep `http://127.0.0.1:4317` available.
4. Owner chooses one low-risk non-sensitive supported file (prefer DOCX/PDF/PPTX so the file path is genuinely exercised), imports locally, reviews the extraction preview, and selects <=5000 characters.
5. Confirm import/preview alone creates no provider/model request. Then start Learn and ask at least one normal Tutor question.
6. Owner clicks `我来讲讲`, records about 20–45 seconds with at least one condition and one natural self-correction.
7. Verify original audio remains available; inspect raw transcript and word-timing notice; fully replay every validated segment and correct any critical ASR error before confirmation.
8. Inspect content/logic feedback and evidence links. Confirm necessary/sufficient direction, withdrawn-claim handling, missing-content timestamp behavior, and R4 remediation gating.
9. If a near-silence candidate appears, replay/confirm it before delivery interpretation. Empty/insufficient delivery findings are acceptable.
10. Use targeted reteaching only if a real actionable gap exists; at most one partial/full re-explanation is authorized if useful.
11. Use Apply and verify a related new situation without mastery claims.
12. Export locally and verify selected source, audio, raw/corrected transcript and reports. Avoid destroying evidence before assessment.
13. Stop server after the walkthrough; push only sanitized step-level owner-validation evidence to the same private feature branch.

## Boundaries

Authorized:
- owner's own low-risk file/source and voice only;
- local file extraction + preview/selection;
- normal live `whisper-1` + `gpt-5.6-luna` calls for one coherent journey and at most one targeted re-explanation;
- US$5 API exposure hard stop / US$10 BUILD-01 cash ceiling;
- private fast-forward checkpoint sync.

Not authorized:
- open-ended retries/stress testing;
- raw file cloud fallback;
- provider/model/dependency/OCR expansion;
- public hosting, merge/release, force push;
- external users, third-party/sensitive material;
- committing raw owner audio/files, secrets, `.env`, browser profiles or local `.venv`.

## Stop conditions

Stop and return to MASTER if:
- raw imported file is unexpectedly sent to provider or persisted contrary to contract;
- extraction silently corrupts critical meaning without an understandable preview;
- critical ASR meaning error cannot be safely corrected;
- diagnosis materially contradicts confirmed source/transcript;
- evidence is fabricated/misattached;
- remediation gating regresses;
- repeated API retry becomes necessary;
- credential/budget/storage/extractor guard fails;
- original audio or source/attempt identity is lost/corrupted.

Minor layout/copy friction is recorded but not automatically a stop.

## After walkthrough

Owner only reports completion and visible friction/failures. No manual review ZIP/audio upload.

Codex stops server, collects only sanitized evidence permitted by the protocol, normal fast-forward pushes to `prototype/study-teachback-v0.1`, and returns exact remote SHA/status. MASTER then reviews only new owner-validation evidence.

Possible gate outcomes:
- `OWNER VALIDATION PASS — READY FOR NEXT PRODUCT DECISION`;
- `OWNER VALIDATION PASS WITH MUST FIX`;
- `OWNER VALIDATION BLOCKED`.

No merge/release/external-user step follows automatically.

## Minimal Codex trigger

```text
恢复并执行 OWNER-VALIDATION-01。

SOURCE-INGESTION-01R 已通过 MASTER review。
Owner 之前对 bounded OWNER-VALIDATION-01 的批准继续有效，无需再次批准。

Repo:
F:\Chat-Codex-Handoff\validation-repo

Expected branch:
prototype/study-teachback-v0.1

Accepted feature checkpoint:
a99d380473a1eac45ada67022c589d654db9c7cd

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/OWNER_VALIDATION_01.md

只准备真实 Owner walkthrough，不做新的 synthetic 开发。

1. 核对 branch/HEAD/worktree/ledger；保留 lineage。
2. 核对 repo-owned `study-teachback-app/.venv` 与 pypdf 6.18.0 可用；若已有效不要重装。
3. 启动：node study-teachback-app/server.mjs
4. 保持 http://127.0.0.1:4317 可用。
5. 等待 Owner 先导入一个低风险 DOCX/PDF/PPTX/MD/TXT 文件，预览并选段，再完成 Learn -> Explain -> Diagnose -> Repair/Re-explain -> Apply。
6. 本轮 live API 仍只限 whisper-1 + gpt-5.6-luna，一个 coherent journey + 最多一次自然触发的 targeted re-explanation。
7. 保持 US$5 exposure / US$10 cash ceiling；不自动充值/切模。
8. 不提交 raw owner file/audio、.venv、key/.env/profile；不 merge/release/public deploy/force push。

准备完成只返回：
OWNER_VALIDATION_READY
URL: http://127.0.0.1:4317
Branch: <branch>
HEAD: <sha>
Extractor: <safe local readiness summary>
Known cost/exposure: <safe summary>

然后等待 Owner 操作，不代替 Owner 执行文件/麦克风 walkthrough。
```

## State Summary

Completed: SOURCE-INGESTION-01R portability recovery and MASTER review.

Verified: `a99d380...`, extraction 6/6, Node 42/42, Edge 23/23, zero new paid calls, portable repo-owned local extractor contract at Windows-alpha scope.

Not Done: real owner file + microphone walkthrough and post-run acceptance.

Must Fix: none known before owner validation.

User Decision Needed: none to resume the already-approved walkthrough.

Future Optional: installer UX, OCR, richer provenance/layout, broader OS/device/document compatibility.