# 知而能讲 — Study-first + in-app teach-back

先理解有限材料，再在应用内讲解、回听并核对转写，查看反馈后补学、重讲或换情境应用。

## Canonical state

仓库 `BenCCCCCCCCC/Chat-Codex-Handoff`，产品分支 `prototype/study-teachback-v0.1`。唯一动态状态位于 **`meta/master-state` 分支**：

- [CURRENT_STATE.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/CURRENT_STATE.md)
- [HANDOFF.md](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/meta/master-state/docs/master/HANDOFF.md)

当前 checkout 的 `docs/master/` 仅指向上述权威文档。读取任务时记录文档 commit，不把分支名当目录，不执行旧副本中的历史 next steps。

历史 Phase 1 材料导入和 clean Phase 2 学习对话已接受；物理麦克风 Phase 3 尚未执行。真实录音、完整 owner journey、重复学习收益仍未验证。历史 Node/Edge 计数不代表当前版本 fresh results；各次交付包保存各自命令、版本和结果。

## Windows 启动与停止

从仓库根目录运行 [Start-Study.cmd](../Start-Study.cmd)，或通过完整路径调用。启动器使用 Windows PowerShell 5.1，按脚本位置解析路径，只在就绪后打开 `http://127.0.0.1:4317/`。已有且身份可验证的服务会被复用；该次调用不会停止被复用的服务。

新服务要求启动进程 PATH 中已有 `node.exe`，产品 `.venv`/pypdf 6.18.0（或绝对路径 `STUDY_PYTHON`）有效，且已继承服务端 `OPENAI_API_KEY`。Explorer 与已配置终端可能有不同环境。不会自动安装或持久化 key、.env、PATH、注册表或执行策略。真实产品调用仍需当前授权，预算上限不是花费许可。

保持控制窗口打开；正常停止设计为 Enter。Explorer 鼠标双击、可见控制台 Enter/Ctrl+C 的实际体验仍未验证。突然关窗后用 [Stop-Study.cmd](../Stop-Study.cmd) 做身份校验恢复。先完成学习请求再停止；停止不能撤回已发送的请求。

服务身份由安全状态/UI 检查、Node 和精确绝对 `server.mjs` 命令行路径共同确认。未知端口占用者不会被终止；相对路径或不可验证进程会被拒绝。恢复校验 ignored `runtime/launcher.json` 中的 PID、启动时间和应用身份；陈旧状态需要人工检查。没有 service/daemon/autostart。

## 已有显式安装前提（Windows，仓库根目录）

需要普通 Python 3.14.6（`py -3`）、Node 和 Edge。已有环境可直接使用；以下是新机器的显式安装说明，不是本次任务的安装操作：

```powershell
py -3 -m venv study-teachback-app/.venv
study-teachback-app/.venv/Scripts/python.exe -I -m pip --isolated install --index-url https://pypi.org/simple --only-binary=:all: --no-deps --require-hashes --disable-pip-version-check -r study-teachback-app/requirements-extractor.txt
node study-teachback-app/server.mjs
```

`.venv` 被忽略，不随仓库分发。pypdf 6.18.0 与 wheel SHA256 固定在 `requirements-extractor.txt`。运行中的应用不会下载安装依赖，不需要全局安装。

默认解释器为 `.venv/Scripts/python.exe`；非 Windows 的 `.venv/bin/python` 路径未在这里验证。可选 `STUDY_PYTHON` 必须是已有 Python/pypdf 的绝对路径。提取子进程只收到 SystemRoot，使用 `-I`，超时 15 秒；缺少环境或版本不符就返回错误，不回退至 provider。API key 不传给提取器。

## 材料、录音与保留边界

初始页面“选择学习文件”支持 MD/TXT/PDF/DOCX/PPTX。本机提取、预览后选取最多 5,000 字；点击“开始学习”才把所选文字发送给 Tutor。原文件不上传 provider、不持久化。录音在应用内进行。

输入上限 10 MB；Office ZIP 总展开 30 MB；100 个 PDF 页面/幻灯片；提取 200,000 字符；单轮学习 5,000 字。TXT/MD 支持 UTF-8 或带 BOM 的 UTF-16。加密、非法、超限文件会被拒绝。不做 OCR；复杂版式需在预览中核对。DOCX 主体/表格段落与 PPTX 幻灯片文字受支持；页眉、备注、批注、图表和图片文字不在范围内。

原声、raw/corrected 转写版本、来源和历史保持关联。词时间不可用时保留 PARTIAL 状态；诊断仍要求回听并确认。更正转写不是一次新口头表现。有效录音先保存并检查，再注册 attempt，注册与限额检查通过后才转写；重复注册同一 ID 不增加次数或重置提交额度。注册失败时保留已保存原声。

现有七天过期、导出/删除行为不变。打开旧 profile 可能触发过期清理，不能把启动/重载当作只读检查。自定义 retention 仍需独立决策。US$5 exposure / US$10 cash 上限保持不变；不自动充值、不切换模型/provider。

## 隔离工程验证

Phase 3A 将内容判断 `contentFindings` 与讲解过程 `processEvidence` 分开呈现。`diagnosticTargets` 仅从已核对内容中的可处理关系生成；同段过程观察只是独立上下文，不证明“不理解”。缺失内容没有音频时间点。过程证据不要求教材引用，也不包含知识状态、修复建议或人格评分。

当前真实过程入口只保存回听确认的本地近静音候选，不调用语义模型；重启、自我修正、重复等类型仅由预标注 fixture 验证，不声称已有检测器。新证据复用现有 reports 集合，按 attempt／转写版本关联，无数据库版本升级。历史 delivery 报告只读呈现，不转成新定位证据。

Batch B 使用同一隔离包装器：`node study-teachback-app/run-offline-tests.mjs node diagnostic-localization-01`、`node study-teachback-app/run-offline-tests.mjs diagnostic diagnostic-localization-01`、`node study-teachback-app/run-offline-tests.mjs browser diagnostic-localization-01`。证据写入对应的 `artifacts/study-teachback/diagnostic-localization-01/<run-id>/`；六个 fixture 的 expected／actual 保存在 `fixture-results.json`。

从仓库根目录执行：

```powershell
node study-teachback-app/run-offline-tests.mjs node
node study-teachback-app/run-offline-tests.mjs browser
```

包装器调用已有 Node suite / `browser-tests-r4.mjs`，只给测试进程 synthetic credential，拦截非 loopback 网络，限制 ledger 到测试目录，使用独立 Edge profile 与 synthetic media/fake provider。新日志写入 `artifacts/study-teachback/correctness-hygiene-01/<run-id>/`，不覆盖历史证据。浏览器测试不是物理麦克风测试。测试不证明 ASR/模型准确性或学习收益。

其他独立检查（本次未默认授权执行）：`study-teachback-app/.venv/Scripts/python.exe -B study-teachback-app/extract_source_test.py`；启动器测试 `powershell.exe -NoProfile -File study-teachback-app/launch-tests.ps1` 要求 4317 空闲并使用其专门隔离环境。不要通过真实 Start-Study 流程代替 Batch A 测试。

开发交接工具见 [handoff-kit](../handoff-kit/README.md)；[Start-Handoff.cmd](../Start-Handoff.cmd) 与 Study 启动入口用途不同。完成一个批次后交回 MASTER，后续批次、真实调用及发布需要相应授权。
