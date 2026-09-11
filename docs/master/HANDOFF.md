# Active Handoff

Updated: 2026-09-12
Role: 00 MASTER

## Immediate State

**SOURCE-INGESTION-01R BLOCKER RESOLVED AT DECISION LEVEL / EXECUTE PRODUCT-LOCAL VENV RECOVERY / OWNER-VALIDATION-01 PAUSED**

Active source flow:

`MD/TXT/PDF/DOCX/PPTX -> local extraction -> preview/selection -> Learn`

Current feature checkpoint:

`prototype/study-teachback-v0.1`

`dc4893c5ca146037c8a498755854b3ce5cb73c62`

The portability probe correctly stopped after proving ordinary Python 3.14.6 exists but lacks `pypdf`. No feature-branch change or paid call occurred.

## Read order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md`
4. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — approved but paused.

## MASTER decision

No additional owner product decision is required for this dependency choice.

Use a repo-owned product-local Python venv and pin `pypdf==6.18.0`.

Preferred runtime contract:
- venv path: `study-teachback-app/.venv` or an equivalently documented repo-relative path;
- create from ordinary `py -3` / Python 3.14.6;
- one-time explicit setup install now is authorized;
- commit dependency/setup metadata, not the venv;
- add venv path to `.gitignore`;
- normal runtime performs no auto-install/download;
- extractor uses product-local venv Python; optional explicit non-secret configured path may be supported if useful;
- fail closed if Python/pypdf unavailable;
- no `.cache/codex-runtimes`, `codex-primary-runtime`, ChatGPT/Codex private app paths;
- no raw-file cloud fallback, OCR, provider/model change.

Pin exactly `pypdf==6.18.0`. Prefer hash verification for the PyPI wheel SHA256:
`05b762b77bcb9dcb4a7c91fcf5dded585b25bee7269ab3d3001d7c55fa1b324b`.

Keep the existing extraction safety boundaries: isolated subprocess/restricted env, 15s timeout, 10 MB input, 30 MB Office expansion, 100 pages/slides, 200k extracted characters.

## Validation

After migration:
- extraction tests must pass, including PDF;
- Node full suite must pass;
- Edge full suite must pass;
- missing venv/dependency must fail closed and invoke no provider;
- grep/regression must prove no private Codex runtime path remains in active product source/setup;
- README must describe file import, setup prerequisite, supported formats/limits and no-OCR/complex-layout limitations;
- new paid calls must remain 0;
- ledger unchanged;
- normal fast-forward sanitized checkpoint to same private feature branch.

OWNER-VALIDATION-01 remains paused until MASTER reviews that checkpoint.

## Minimal Codex trigger

```text
恢复 SOURCE-INGESTION-01R portability recovery。

MASTER 已作出 dependency decision；不需要 Owner 再批准普通实现细节。

Repo:
F:\Chat-Codex-Handoff\validation-repo

Expected branch:
prototype/study-teachback-v0.1

Expected remote checkpoint:
dc4893c5ca146037c8a498755854b3ce5cb73c62

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md

执行 product-owned extractor runtime recovery：

1. 使用普通 `py -3` / Python 3.14.6 创建 repo-owned local venv，优先：
   study-teachback-app/.venv

2. 明确安装且只安装当前 PDF extraction 所需依赖：
   pypdf==6.18.0

   优先使用 pinned requirements + hash verification。
   PyPI wheel SHA256：
   05b762b77bcb9dcb4a7c91fcf5dded585b25bee7269ab3d3001d7c55fa1b324b

3. 这是一次显式 setup install；normal app runtime 不得自动 pip install / download。

4. 不提交 .venv；加入 .gitignore。

5. ingestion launcher 改为 repo-owned venv Python（可选支持显式非 secret STUDY_PYTHON override）。
   删除所有 `.cache/codex-runtimes` / `codex-primary-runtime` / ChatGPT/Codex private runtime 依赖。

6. runtime 缺 venv / Python / pypdf 时 fail closed，返回安全 setup/dependency error；不得触发 provider/ledger，不得上传 raw file fallback。

7. 保持现有：
   - MD/TXT/PDF/DOCX/PPTX
   - local extraction -> preview/selection -> Learn
   - python isolation/restricted env
   - 15s timeout
   - 10MB input
   - 30MB Office expansion
   - 100 pages/slides
   - 200000 extracted chars
   - no OCR

8. 更新 README：
   - 当前文件入口
   - setup/venv prerequisite
   - pinned pypdf
   - 支持格式/limits
   - no OCR / complex-layout limitation
   - 最新 test counts

9. 增加 regression：
   - active product source/setup 不含 Codex private runtime path
   - missing venv/dependency fail closed
   - provider invocation count 0 on import/failure
   - ledger unchanged

10. rerun extraction tests + Node + Edge。
    本轮 Whisper/Luna/new paid calls 必须为 0。

不要 vendor Python runtime，不加 OCR，不换 provider/model，不扩到 installer framework。
如必须扩大到 materially larger packaging architecture，再停止回 MASTER。

完成后 normal fast-forward push sanitized checkpoint 到同一 private feature branch。

最终返回：
status
remote branch
exact remote SHA
runtime strategy
pypdf version/hash setup
extraction result
Node result
Edge result
new paid calls
```

## State Summary

Completed: source-ingestion implementation/current-machine tests; ordinary Python discovery; MASTER dependency decision.

Not Done: repo-owned venv migration/regression and resumed owner validation.

Must Fix: remove Codex-private runtime coupling.

User Decision Needed: none for this bounded recovery.

Future Optional: installer UX, OCR, layout/provenance enhancements.