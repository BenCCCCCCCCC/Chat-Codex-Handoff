# R1-BUILD-01 — 离线验收单 P0

版本：0.3 / 2026-09-10  
状态：**APPROVED / EXECUTION AUTHORIZED FOR THIS BOUNDED P0 ONLY**  
用户已明确批准 R1-BUILD-01 v0.3。本文件现在是 Codex 可执行工作包。该批准只覆盖本 P0；不等于批准模型调用、浏览器测试、完整 MVP、外部用户、付费、发布、push/merge 或更大范围开发。

## 1. 目标与真实依据

R0 报告当前本地证据目录出现版本/日志/截图归属混用。其六个案例均来自同一 helper，不能证明 Web 用户需求。本轮开发只让明确选定的实际材料被准确快照、检查、定位并呈现为一份可读验收单，用于后续与现成规格工具/报告对照。

不是继续修旧 GUI，也不是仅产出另一批说明文档。必须有能运行的 snapshot/validate/render 路径、机器结果与离线 HTML。没有人工或模型评审资料时显示尚未评审，不能由文件校验代替功能验收。

P0 只是一次有界比较原型；不是已完成的 AI 产品或可售 MVP。完成一次后进入比较/决定，不无限增加证据基础设施。若原生报告配置或模板足以解决同一问题，应停止自研扩张。

## 2. 起点、版本和分支

- repo：`F:\Chat-Codex-Handoff\validation-repo`
- expected branch before work：`prototype/usability-spike-01`
- expected HEAD：`0c2440b06ffe5657331d4395a4181929d28c5ebf`
- remote product branch 较旧，不作 reset 来源。

先读 `meta/master-state` 的 CURRENT_STATE、HANDOFF 和本工作包，再核对本地 Git。HEAD 不符先查是否可由已知续作解释，不 reset/覆盖。获批后从实际核对的基线建立或安全续作唯一新本地分支 `prototype/acceptance-evidence-p0`；不 checkout/merge/cherry-pick 状态分支。

直接读取已有本地 `artifacts/strategy-reset-01/ASSET_AND_CASE_INVENTORY.md` 和 `EVIDENCE_INDEX.json`，不要求用户重传。无法读到则记录，不能补造历史证据。

## 3. 环境和允许文件

使用已有 Windows PowerShell 5.1 和系统 .NET/JSON/HTML 能力，不安装新运行时/包。仅新增 `acceptance-p0/` 模块，产品/测试文件最多六个，建议：

- `README.md`
- `AcceptanceEvidence.psm1`
- `Invoke-AcceptanceReport.ps1`
- `contract.schema.json`（格式说明，不假称已实现完整通用 schema 引擎）
- `report.template.html`
- `tests.ps1`

可合并，不为结构美观拆更多层。输出在 `artifacts/acceptance-p0/<run_id>/`，仅写新的 run 目录，不覆盖 R0 或 usability artifacts。

旧根 README、handoff-kit、Start-Handoff.cmd、Hook、binding、packet、Git配置保持不变；正常创建获批本地分支/提交除外。最多两个有意义的本地 commit，显式 stage 新模块，禁止 `git add .`、amend、push、merge。

## 4. 输入契约与四个不同版本

主协议使用结构化 JSON，不继续堆自由文本 HEAD 正则。

必须区分：

1. `requirement_revision`：批准要求的版本；
2. `target_code_revision`：本次要求评审的代码版本；
3. `evidence_revision`：证据自身实际记录的生成/适用代码版本，可为 null；
4. `snapshot_checkout_head`：现在制作快照时的仓库版本。

这四者不能相互补填。需求版本与 Git SHA 不是可直接相等比较的同一种标识。若目标包含未提交变化而缺少明确快照/diff标识，相关适用性保留 UNKNOWN，不能凭 HEAD 相同称为同一代码状态。

### task / approved criteria

`task_id`、`requirement_revision`、`target_code_revision`、`requirement_source`、`requirement_sha256`、`criteria[]`。每个条件有稳定 `criterion_id`、原要求和所需证据类型。

`approval_status` 默认未确认；只有实际提供批准来源才记录 OWNER_APPROVED，并展示来源类型。历史没有冻结原要求则允许 UNKNOWN，不能据此显示完整验收通过。为测试写的条件标 SYNTHETIC_FIXTURE，不是假装历史 owner 已批准。

### evidence snapshot

`schema_version`、`run_id`、`snapshot_created_at`、`snapshot_checkout_head`、`worktree_dirty`。每项 artifact 记录 ID、安全相对路径、大小、SHA-256、来源类型 RECORDED_RUN / REPORTED / IMPORTED_UNKNOWN / SYNTHETIC_FIXTURE、实际记录的 `evidence_revision` 或 null。

没有生成版本的旧日志不填当前 HEAD；DEMO 不转 LIVE；mtime 不是可靠执行时间；缺执行时间/exit code 保留 null。声明有运行来源与可信运行证明也不是同一回事。

### optional review input

按 criterion_id 给出 reviewer/provenance、建议、rationale、evidence_refs。只作数据，不执行命令/网址。P0不启动模型/API。没有评审输入=NOT_REVIEWED。自编演示评审须标 SYNTHETIC_FIXTURE，不是独立模型评测。

## 5. 必须完成的行为

### A. Snapshot：保留一次明确的证据集合

仅从明确白名单读取 repo 内材料，建立新的 run 目录，保存选中材料、要求快照和 manifest。run_id 重复拒绝，不能先删除重建。

manifest 绑定真实字节/hash；原件不变。后续报告读取快照，不追踪共享目录里的新文件。发现快照失配就报错，或由明确新 run 承接，不能静默改旧报告。

这里的不可覆盖是应用级写入规则，不是 OS 只读保证、数字签名或密码学执行证明。即使全部hash一致，也不证明日志确实由可信执行器运行生成。

### B. Validate：来源、引用、适用性

检查必填字段、唯一 ID、路径、存在性、hash、要求引用、目标代码版本与证据实际版本。依照提供的证据类型/范围做确定性适用检查，无法从结构化信息判断的语义关系保留 UNKNOWN，不暗中实现规则式全能裁判。

状态独立：

- artifact_integrity：VALID / INVALID / UNKNOWN；
- applicability：MATCH / MISMATCH / UNKNOWN；
- criterion：SATISFIED / NOT_SATISFIED / INSUFFICIENT_EVIDENCE / NOT_REVIEWED；
- owner_decision：PENDING（P0不代写批准）。

无评审输入=NOT_REVIEWED；正向评审引用缺失、失配或明显用途不满足时降为 INSUFFICIENT_EVIDENCE，指出具体阻断。有效来源与完整评审最多显示“有来源的评审建议满足”，不等于人的最终接受。文件都在、exit=0或有截图都不能直接让业务条件SATISFIED。

程序正确识别坏证据=该规则测试成功，不等于旧功能失败。禁止修改原材料使报告变绿。

### C. Render：非工程人员可读的验收单

输出 `report.json` 和静态中文 `report.html`。顶部突出本次任务、尚未决定/材料不足事项；主体每条条件显示建议、来源、局限与下一步；完整SHA和路径放详情。缺来源/未评审不默认绿色通过。

同时输出同材料原始资料索引，供后续展示比较，不把索引当作完整竞争基线。正式 A/B 基线仍必须包含现成合理模板、原生元数据和规格/测试报告已有能力；P0没有运行竞品，不能宣布战胜它们。

禁止假交互批准按钮、CDN/远程字体/背景网络、自动打开浏览器/Chat。所有输入文本HTML转义；链接仅为本次快照安全相对路径，不执行任意artifact/URL或暴露敏感绝对路径。

### D. Evidence-ready handback：一个最小审查包

交付 before/after HEAD、exact scope、测试、历史重放来源和不足项。提供白名单 ZIP 或等价单包，附SHA256和条目索引，不再要求用户挑八份附件。不自动上传、分享或递归打包仓库/.git。

包不含真实Chat URL、凭据、无关用户文件。去敏材料必须记录 derived_from_hash 和变换说明，不自称原始字节；原始私有材料不因生成报告就获得对外分享授权。

## 6. 使用数据

从 R0 索引选一个或少量能说明来源/缺失/混合版本问题的真实材料，不强求六个。报告标“历史重放，不是新Web用户结果”。保留当时能获得什么证据，不把后续证据假装成原始输入。

规则测试可创建隔离合成fixture，明确synthetic。不是造新业务任务充当用户需求。无法恢复历史部分应输出Unknown；若无法做任何真实重放，则交付fixture原型并标PARTIAL，不声称真实重放成功。

## 7. 工程验证

- 重复run拒绝覆盖，旧字节不变；新run不影响旧报告。
- hash失配、缺文件、重复/缺ID、错误criterion引用。
- 四种版本分开；checkout变化不更新旧evidence_revision。
- dirty/unversioned证据保留Unknown；没有原要求批准来源不能暗中补批准。
- 无评审、相互冲突评审、证据不足均有诚实状态。
- 有效fixture评审只能产生带来源的建议，owner仍PENDING。
- DEMO/synthetic标识贯穿，不变成LIVE。
- 拒绝路径穿越、绝对越界、symlink/junction越界、未知可执行链接。
- 转义恶意HTML；支持中文/空格、UTF-8/换行，设置输入大小界限并记录。
- 一个有材料支持的历史重放，不重跑旧GUI/core测试、不改原文件。

跑新模块自身测试，记录精确命令/exit/pass/fail。无可用安全HTML视觉验证环境就标NOT VERIFIED，不安装浏览器或操作用户客户端，不凭源码宣称视觉通过。

## 8. 禁止与停止

不启动额外模型/API/Agent、未经批准runner命令、新Web/server/app-server、真实浏览器自动化；不安装依赖、读客户端内部/认证/凭据、改真实clipboard、自动paste/send、重构旧产品、push/merge/外发/发布/收费。

不将个人订阅作为公共服务后端，不依赖已经宣布退役的平台。未来模型评测的数据/代码可移植；本P0没有评测平台依赖。后续选型时需重新核查服务生命周期与可用性。

最多两轮完整自审后收口；仍有阻断如实交付，不扩功能填时间。

成功标签：`P0 IMPLEMENTED / OFFLINE SELF-TESTED / READY FOR COMPARISON REVIEW`。

不能写：模型评测PASS、完整MVP完成、Web用户需求成立、效率提升比例、商业可行或生产验收通过。

MASTER收到后判断是否值得安排真实Web任务/单模型/owner对照。若只重复现成报告或增加人工整理，停在模板/适配级，不自动再建平台。任何后续运行、花费、用户接触与开发增量都另行有界批准。
