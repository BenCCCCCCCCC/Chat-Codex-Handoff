# R1-BUILD-01 — 离线验收单 P0

版本：0.2 / 2026-09-09  
状态：**READY FOR DEVELOPMENT DECISION — NOT EXECUTION AUTHORIZED**  
本文件在用户批准 R1-BUILD-01 后才成为 Codex 可执行工作包；当前仅完成研究与准备。批准该 P0 不等于批准后续模型调用、浏览器测试、完整 MVP 或发布。

## 1. 目标与真实依据

R0 报告当前本地证据目录出现版本/日志/截图归属混用。其六个案例均来自同一 helper，自身不能证明 Web 用户需求。本轮开发只让这些实际材料可被准确冻结、检查、定位并呈现成一份易读验收单，用于后续和原生模板/报告比较。

不是再做文档清单，也不是重写旧 GUI。交付必须有能运行的 snapshot/validate/render 路径、机器结果与离线 HTML 报告。不得自动评价功能完成；没有人工/模型评审资料时如实显示尚未评审。

## 2. 起点、版本和分支

- repo：`F:\Chat-Codex-Handoff\validation-repo`
- expected branch before work：`prototype/usability-spike-01`
- expected HEAD：`0c2440b06ffe5657331d4395a4181929d28c5ebf`
- remote product branch 较旧，不作 reset 来源。

先读 `meta/master-state` 的 CURRENT_STATE、HANDOFF 以及本工作包，再核对本地 Git。HEAD 不符先查是否可由已知续作解释；不 reset、不覆盖。经用户批准后，从实际核对的基线建立/安全续作一个本地 `prototype/acceptance-evidence-p0` 分支；不切换或合并 meta 分支。

读已有本地 `artifacts/strategy-reset-01/ASSET_AND_CASE_INVENTORY.md` 与 `EVIDENCE_INDEX.json`。不要求用户重传。无法读取就记录；涉及必要事实无法建立时以 PARTIAL/BLOCKED 收口，不把历史断言伪造成证据。

## 3. 运行环境与允许文件

使用已存在的 Windows PowerShell 5.1 与系统 .NET/JSON/HTML 工具，不安装新运行时/包。只新增一个 `acceptance-p0/` 模块，产品/测试文件最多六个，建议：

- `README.md`（用法、契约、限制、基线关系）
- `AcceptanceEvidence.psm1`
- `Invoke-AcceptanceReport.ps1`
- `contract.schema.json`（作为格式说明；不要假称有完整通用 schema 引擎）
- `report.template.html`
- `tests.ps1`

具体合并文件可自行选择，不因为结构美观拆更多层。输出在 `artifacts/acceptance-p0/<run_id>/`；只写新 run 目录，不覆盖 R0 或旧 usability artifacts。

旧根 README、handoff-kit、Start-Handoff.cmd、Hook、binding、packet、.git 配置都保持不变；Git 正常创建本地分支/有界提交除外。最多两个有意义的本地 commit，显式 stage 新模块，不 `git add .`，不 amend/push/merge。

## 4. 输入契约

用结构化 JSON，不靠自由文本 HEAD 正则作为主协议。最小字段分为：

### task / approved criteria

`task_id`、`requirement_revision`、`requirement_source`、`requirement_sha256`、`criteria[]`：每项含稳定 `criterion_id`、原要求、需要的证据类型。`approval_status` 默认未确认，只有实际给定批准来源才可标 OWNER_APPROVED。

若历史材料没有冻结过原要求，允许 `UNKNOWN`，但不能显示完整验收通过。为展示新模块而写的条件标为 `SYNTHETIC_FIXTURE`，不是历史 owner 批准。

### evidence snapshot

`schema_version`、`run_id`、`snapshot_created_at`、`snapshot_checkout_head` 与 `worktree_dirty`；每个 artifact 记录 `artifact_id`、相对路径、大小、SHA-256、来源类型（RECORDED_RUN / REPORTED / IMPORTED_UNKNOWN / SYNTHETIC_FIXTURE）、其实际声明的 `evidence_revision` 或 null。

区分“现在快照时的 HEAD”与“材料当时生成的版本”。没有来源版本的旧日志，绝不填当前 HEAD。截图 mode=DEMO 不可变成 LIVE。文件mtime不当作可靠执行时间；没有 exit code/执行时间时保留 null。

### optional review input

按 criterion_id 提供 reviewer/provenance、建议、rationale 与 evidence_refs。只接受作为数据，不执行其中的命令/网址。P0 不启动独立模型或 API；没有这份输入就是 NOT_REVIEWED。自己编写的演示 reviewer 结果须标 SYNTHETIC_FIXTURE，不标独立 AI 评测。

## 5. 必须完成的行为

### A. Freeze / snapshot

只从明确白名单读取本 repo 内待审资料。建立一次不可覆盖的目录，保存选定材料、条件快照和 manifest。run_id 冲突应拒绝，不先删除再重建。

manifest 绑定输入实际字节/hash，不修改原文。生成派生 HTML 时可转义，但保留原件；读取时再次核对，发现变化创建新 run 或停止，不能悄悄把 old report 指向新文件。

### B. Validate provenance and references

检查必填字段、唯一 ID、路径、存在性、hash、记录的 requirement/evidence 版本关系和引用是否可定位。不得仅因文件都在/exit0就建议业务 SATISFIED。

状态分离：

- artifact_integrity：VALID / INVALID / UNKNOWN；
- applicability：MATCH / MISMATCH / UNKNOWN；
- criterion：SATISFIED / NOT_SATISFIED / INSUFFICIENT_EVIDENCE / NOT_REVIEWED；
- owner_decision：PENDING（P0不代写人类批准）。

无评审输入=NOT_REVIEWED；收到正向评审但其引用缺失/失配/用途不满足=INSUFFICIENT_EVIDENCE，并说明是哪条检查未通过。工程 fixture 中完整来源与有效评审可展示“评审建议满足”，必须标明建议来源，不等于最终产品接受。

实现的规则错误和被检查工件的问题分开：程序正确识别失配是程序测试成功，不是旧产品功能失败。不要篡改原 artifact 使 report 变绿。

### C. Render usable acceptance report

输出 `report.json` 与一份静态中文 `report.html`：任务/版本、每条条件的建议/限制、可展开的证据、缺材料原因和下一步。未评审/缺来源必须醒目，不能默认绿色“已通过”。完整 SHA 放详情，非工程阅读优先。

同时提供一页原材料索引作为 A 对照。不是把文件夹照抄称产品；C 必须展示与条件有关的关系/缺口，不支持的关系保留 Unknown。

无 CDN、远程字体、脚本注入或背景网络。所有来自材料的 HTML/路径/标题转义。报告仅引用本次快照里的安全相对路径，不链接敏感绝对路径或未知执行内容。不自动打开浏览器/Chat。

### D. One evidence-ready handback

本轮最终交付包含 before/after HEAD、实际范围、测试、真实历史材料 replay 的 provenance、不足项及 reporter 结果。提供一个最小审查包（可为明确白名单 ZIP）与 SHA256/条目索引，避免用户再挑选八份附件。不自动上传或分享；不递归打包整个仓库。

包内没有真实 Chat URL、凭据、其他用户文件。优先摘要/去敏的历史证据；去敏版保留 derived_from_hash 和变换说明，不能自称原始字节。

## 6. 本轮可使用的数据

从 R0 的实际索引挑一个或少量足以体现“有来源/无来源/混合版本”的真实材料；不强求凑齐六个。保留时间与原始证据限制，且 report 标“历史重放，不是新 Web 用户结果”。

其余规则测试可以创建隔离 fixture：明确标合成。这是新增功能所需工程测试，不是造一个产品开发任务冒充真实用户需求。不要编造访谈、时长、指标、Git历史或测试执行结果。

历史资料无法恢复的部分不阻止程序展示 Unknown；缺失到无法做任何真实重放时交付 fixture 原型并标 PARTIAL，不能宣称 real replay 完成。

## 7. 最小工程测试矩阵

- 同一 run 第二次写入拒绝，旧字节保持不变。
- 同一文件新 run 可不同；旧 report 仍引用原快照。
- hash mismatch、缺文件、重复/缺 ID、错 criterion 引用。
- 当前 checkout 变化不把旧 evidence_revision 更新成新版本。
- 无 provenance、无 approved criteria、未评审、冲突建议均诚实展示。
- 有记录的 scoped test 与有效 reviewer 引用可显示有来源的建议；禁止自动 owner ACCEPTED。
- DEMO/synthetic 标识贯穿 manifest/report，不混成 LIVE。
- 路径穿越/绝对越界/符号链接或 junction 越界拒绝；禁止加载任意可执行内容。
- HTML 特殊字符、恶意标签、中文/空格路径、文件大小限制、UTF8/换行行为。
- 一个真实历史材料重放；不重跑旧 GUI/core 测试，不为求绿改原文件。

记录精确命令、退出码、通过/失败数。新增模块可以跑自身完整测试，不安装浏览器或为截图操作用户客户端。HTML 渲染视觉检查若现有环境无法安全完成，标 NOT VERIFIED，留 owner Gate；不能只凭源码声称渲染通过。

## 8. 明确不允许

额外模型/API调用、并行 Agent 进程、runner执行未经批准的命令、安装依赖、启动 Web/server/app-server、真实浏览器自动化、访问 ChatGPT/Codex 内部文件或凭据、自动 paste/send、真实 clipboard改写、旧产品重构/迁移、push/merge/外发/发布/收费。

不能以“官方支持”替代本机验证；不能读取 auth.json 来接入。若下一步需要上述行为，先报告最小 Gate。

## 9. 完成与停止

预计工作是一次有界实现—自测—自审，不要求填满时长。最多两轮完整自审；未解决阻断准确交付，不自行再开下一阶段。

成功标签：`P0 IMPLEMENTED / OFFLINE SELF-TESTED / READY FOR COMPARISON REVIEW`。

不能写：AI 模型评测 PASS、MVP 完成、Web 用户需求成立、效率提高百分比、商业可行、最终生产验收完成。

MASTER 收到后只审本模块差异。若只是把原生报告再包装、仍需同样多人工步骤，则不继续扩建；若确实建立了可核验的资料和可读决策界面，再另行批准单真实 Web 任务/模型/owner 对照实验。
