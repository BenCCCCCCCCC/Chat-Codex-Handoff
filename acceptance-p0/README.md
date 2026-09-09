# 离线验收单 P0

仅 snapshot → validate → render；使用 Windows PowerShell 5.1 / 系统 .NET，不启动模型、浏览器或旧 handoff。最多显示“有来源的评审建议满足”，owner_decision 永远 PENDING。不是完整 MVP、AI 效果评测或需求验证。

## 执行

在已有 repo 中准备 UTF-8 JSON（路径必须是 repo 内白名单相对路径），为每次运行选新 ID：

~~~powershell
powershell.exe -NoProfile -File acceptance-p0/Invoke-AcceptanceReport.ps1 -Repository "F:\your repo" -InputPath "artifacts/input.json" -RunId "review-001"
powershell.exe -NoProfile -File acceptance-p0/tests.ps1
powershell.exe -NoProfile -File acceptance-p0/tests.ps1 -Historical
~~~

最后一个命令仅新模块自测 + R0-07 历史材料重放 + 一个本地 review ZIP，不运行旧测试。输入/输出均在 artifacts/acceptance-p0/ 的独立 run 目录。无自动上传或浏览器打开。tests 的 fixture 保留，测试自有 junction 在验证后仅删除链接本身。

模块函数：New-P0Snapshot、Test-P0Snapshot、Write-P0Report、New-P0Bundle。已有 run 或报告拒绝覆盖；失配后可重新检查但不重写旧报告，使用新 run。失败 run 保留供诊断。

## 结构化输入（有限手写校验，不是通用 JSON Schema 引擎）

顶层 schema_version=1、task、artifacts[]、可选 reviews[]。IDs 为 1..64 ASCII 字母数字/下划线/连字符，第一字符字母或数字。ID 不重复。

task：
- task_id；mode：HISTORICAL_REPLAY / SYNTHETIC_FIXTURE / IMPORTED_UNKNOWN。
- requirement_revision：要求版本字符串或 null，不与 Git SHA 比较。
- target_code_revision：完整 40 位 Git SHA 或 null。
- requirement_source：artifact_id 或 null；requirement_sha256：原要求 SHA256 或 null。
- criteria[]：criterion_id、text、required_evidence_types[]。
- 可选 approval_status=OWNER_APPROVED、approval_source_type；没有可用原要求来源/hash时 UNKNOWN。这只是归因明确的批准资料，不认证签名或批准者身份。
- 可选 target_worktree_dirty=true、target_state_id：未提交目标必须有明确 diff/snapshot identity。仅同 HEAD 不足。

artifact：
- artifact_id、path（明确 repo 内相对路径）、source_type、evidence_revision、evidence_type、criterion_ids[]。
- source_type：RECORDED_RUN / REPORTED / IMPORTED_UNKNOWN / SYNTHETIC_FIXTURE；声明 RECORDED_RUN 不等于可信执行证明。
- evidence_revision：实际记录的生成/适用代码 SHA 或 null；不从当前 HEAD、文件 mtime、其它日志猜测。
- 可选 expected_sha256、generated_at、exit_code、evidence_state_id、derived_from_hash、transformation；缺失保留 null。
- 派生/去敏材料应填写原始 hash 与变换说明，不自称原始字节。P0 不自动编辑原件。

review：
- criterion_id、reviewer、provenance、source_type、suggestion、rationale、evidence_refs[]。
- suggestion：SATISFIED / NOT_SATISFIED / INSUFFICIENT_EVIDENCE。
- source_type：REPORTED / SYNTHETIC_FIXTURE / IMPORTED_UNKNOWN。
- 全部是 inert data；无 reviewer => NOT_REVIEWED。冲突或正向支持存在阻断 => INSUFFICIENT_EVIDENCE。不执行输入命令或链接。

snapshot_checkout_head / worktree_dirty 由本次 Git 只读查询获得，和前三种版本分开。当前 worktree_dirty 可能来自已有 untracked artifacts，不能倒推旧证据的状态。目标 dirty 标记是输入声明，不是对历史工作树的认证。

## 安全、界限、语义

最多 100 criteria / 50 artifacts，每个输入文件 1 MiB。仅 .txt/.log/.md/.json/.csv 被选为原材料；快照链接全部转为 .txt，内容字节不变。不接收可执行/HTML/SVG 类型，拒绝绝对路径、穿越、ADS、保留设备名、symlink/junction/reparse 路径。链接只指向本次安全快照。所有展示文本 HTML encode，无脚本/按钮/CDN/外部资源，CSP 禁网络。

artifact_integrity VALID 仅指快照与声明 hash/size；applicability MATCH 仅指明确版本/范围/type 条件相容。无法证明语义或执行可信性。未知生成版本保持 UNKNOWN，失配保持 MISMATCH。文件存在、hash、exit=0 均不会自行 SATISFIED。

白名单由调用者明确选择；不是私密数据发现器。bundle 拒绝明显真实 Chat URL/token 模式，但不能保证识别全部敏感内容；调用者必须只选择获准材料。禁止将认证/私有客户端数据或真实 packet 当输入。无对外分享授权。

报告：report.html / report.json / raw-index.json；原件副本在 snapshot/，manifest.json 记录来源/字节/四版本及局限。run.claim 是应用内竞争写入锁。无覆盖不是 OS 不可变性、数字签名或不可抵赖执行证明；外部同时恶意修改目录不在信任模型内。

review-bundle.zip 仅显式报告/快照/manifest/test receipt 和四个模块源码文件，不递归 repo/.git。bundle-index.json 列出内容 hash，review-bundle.sha256 为包 hash。index 本身作为包内条目，外部包 hash绑定它；没有自身递归 hash。

## 已知边界

历史 replay 从 R0-07 取旧 core log（版本 null）及 screenshot inventory（声明 3a925c1），目标 0c2440b。重构检查问题不是冻结的原 owner criteria；批准 UNKNOWN、无 reviewer、owner PENDING。源材料只读，没把后续资料伪装成原始输入。不是新 Web 用户结果。

原材料索引只是同材料入口，不是完整竞争基线；后续须与原生元数据 + 合理模板 + spec/report 能力比较。未运行竞品。HTML 视觉 NOT VERIFIED，只有文本/转义/链接规则检查。下一模型/Web/用户阶段另行授权。
