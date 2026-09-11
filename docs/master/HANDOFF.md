# Active Handoff

Updated: 2026-09-11
Role: 00 MASTER

## Immediate State

**SOURCE-INGESTION-01 PARTIAL ACCEPTED / OWNER-VALIDATION-01 PAUSED / EXECUTE SOURCE-INGESTION-01R PORTABILITY RECOVERY**

Active product flow remains:

`Learn -> Explain -> Diagnose -> Repair -> Re-explain -> Apply`

with new source entry:

`MD/TXT/PDF/DOCX/PPTX -> local extraction -> preview/selection -> Learn`.

MASTER directly reviewed private `prototype/study-teachback-v0.1` at:

`dc4893c5ca146037c8a498755854b3ce5cb73c62`

SOURCE-INGESTION-01 works at the current-machine engineering scope, but owner validation remains paused because the extractor launcher depends on a hard-coded private Codex runtime path.

## Read order

Repo `BenCCCCCCCCC/Chat-Codex-Handoff`, ref `meta/master-state`:
1. `docs/master/CURRENT_STATE.md`
2. this `docs/master/HANDOFF.md`
3. `docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md`
4. `docs/research/strategy-reset-01/OWNER_VALIDATION_01.md` — approved but paused
5. R4/R3/BUILD-01 only as evidence boundaries.

## Accepted SOURCE-INGESTION-01 evidence

Do not reopen these unless the recovery changes them:
- supported formats `.md/.txt/.pdf/.docx/.pptx`;
- local extraction and explicit preview/selection before Learn;
- no model/provider call on import;
- no raw source file persistence in learning history;
- no OCR for scanned PDFs;
- DOCX/PPTX parser does not execute macros/external relationships/embedded objects;
- 10 MB input, 30 MB Office expansion, 100 page/slide, 200k text and 15-second timeout boundaries;
- extraction **6/6 PASS**;
- Node **40/40 PASS**;
- Edge **23/23 PASS** at stated browser scope;
- **0 new paid calls**, ledger unchanged.

## Active Must Fix

Current `study-teachback-app/ingestion.mjs` launches:

`%USERPROFILE%/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`

and relies on `pypdf` inside that private Codex runtime.

That implementation is not an acceptable product runtime boundary. The app must not depend on ChatGPT/Codex private cache/runtime files for a core input capability.

The feature README is also stale and still claims there is no normal file-upload workflow.

## SOURCE-INGESTION-01R execution

Codex should make only the narrow portability correction defined in:

`docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md`

Required:
1. remove hard-coded Codex/ChatGPT private runtime paths;
2. use an explicit product-usable local extractor runtime/discovery contract;
3. keep isolated subprocess execution and restricted environment;
4. no automatic dependency download/install at runtime;
5. no raw-file cloud/provider fallback;
6. safe fail-closed error if extractor/dependency is unavailable;
7. keep all existing size/archive/page/text limits and no-OCR boundary;
8. update README with actual source-ingestion feature, prerequisites, limitations and current test counts;
9. add regression proving no private Codex runtime dependency and safe missing-runtime/dependency behavior;
10. rerun extraction + Node + Edge with **0 new paid calls**.

First inspect ordinary product-usable Python (`py -3` / `python` / explicit non-secret configured path) and `pypdf` availability outside Codex cache. If that path is unavailable, return the precise dependency/packaging decision instead of silently installing, vendoring or changing architecture.

## Owner validation

`OWNER-VALIDATION-01` remains approved but **PAUSED**. Do not perform the microphone walkthrough yet.

After SOURCE-INGESTION-01R passes MASTER review, resume the existing owner protocol from the new HEAD. The walkthrough should now begin with one low-risk owner-selected file imported through preview/selection, then continue the already-approved Learn -> Explain -> Diagnose -> Repair/Re-explain -> Apply journey.

## Boundaries

Keep:
- branch `prototype/study-teachback-v0.1`;
- no Whisper/Luna calls for this recovery;
- existing US$5 exposure / US$10 BUILD-01 cash ceilings;
- no ledger reset/relabel;
- no provider/model change;
- no public hosting, merge/release, force push;
- no external users or sensitive/third-party source files.

## State Summary

Completed: SOURCE-INGESTION-01 feature behavior and engineering tests on current machine.

Verified: `dc4893c...`, extraction 6/6, Node 40/40, Edge 23/23, zero paid calls, local source import behavior, private Codex runtime coupling.

Not Done: extractor portability fix, truthful README/runtime prerequisites, owner real-file + microphone walkthrough.

Must Fix: remove private Codex runtime dependency.

User Decision Needed: none for this narrow recovery unless a materially larger packaging/dependency architecture is required.

Future Optional: OCR, richer page/slide labels/provenance, layout-aware parsing, broader compatibility.

## Minimal Codex trigger

```text
执行 SOURCE-INGESTION-01R portability recovery。

Repo: F:\Chat-Codex-Handoff\validation-repo
Expected branch: prototype/study-teachback-v0.1
Expected remote checkpoint: dc4893c5ca146037c8a498755854b3ce5cb73c62

先读取 meta/master-state：
- docs/master/CURRENT_STATE.md
- docs/master/HANDOFF.md
- docs/research/strategy-reset-01/SOURCE_INGESTION_01R_PORTABILITY.md

只修 source-ingestion runtime portability，不重新发散已接受的 Learn/Explain/Diagnose/R3/R4 范围。

必须：
1. 删除对 `.cache/codex-runtimes` / `codex-primary-runtime` / ChatGPT/Codex 私有 runtime 的硬编码依赖；
2. 先检查普通产品可用的本机 Python launcher（例如 `py -3` / `python` / 显式非 secret 配置）和 pypdf 可用性；
3. 保持隔离 subprocess、受限 env、15s timeout、10MB/30MB/100页或slide/200k字符限制；
4. 不自动下载/安装依赖，不把 raw 文件上传 OpenAI 作为 fallback；
5. extractor/dependency 不可用时 fail closed，给安全可理解错误；
6. 更新 README：文件入口、支持格式、runtime prerequisite、no OCR/复杂排版限制、最新测试状态；
7. 增加 regression：源码/launcher 无 Codex 私有路径；缺 runtime/dependency 不触发 provider；
8. rerun extraction tests + Node + Edge；本轮 paid calls 必须为 0；ledger 不变。

如果普通可用 runtime/pypdf 不存在，停止并返回 precise dependency/packaging decision，不要自动安装、vendor 或换架构。

完成后 normal fast-forward push sanitized checkpoint 到同一 private feature branch。

最终返回：status、remote branch、exact remote SHA、runtime strategy、extraction result、Node result、Edge result、new paid calls。
```
