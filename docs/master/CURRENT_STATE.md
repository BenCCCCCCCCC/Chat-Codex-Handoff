# CURRENT_STATE — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Product/default branch: prototype/study-teachback-v0.1
Canonical state branch: meta/master-state

## 当前决定与授权

产品定位由用户再次确认为 **个人学习＋作品展示**。用户授权公开仓库（包括现有 Git 历史）、完善 README、调研同类产品与设计/技能、自主审核迭代，以及按有意义的批次在 GitHub 留痕。用户进一步要求减少防御性、冗余与不必要的测试。

此授权取代旧交接对本轮产品编辑、commit、push、merge、公开及每次字节变化必须全量复测的限制。常规可逆改进继续推进；原 Phase 3B 真实调用额度已耗尽，不沿用旧额度。

## 最新交付

- 仓库已设为 **public**，默认分支切换到学习产品分支。
- 已同步此前 8 个已验收的本地产品提交至 20be403。
- 本轮实现分支：codex/public-review-2026-10-20。
- PR：[完善诊断状态体验、公开产品文档与按影响验证流程](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/2)。
- 合并提交：0b0c9477023171da82440b0ebe13496906946efc。
- CI：https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39398844763（PASS — Node 154、Python 6、Edge 53）。
- 本轮问题记录：[Issue #1](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/1)。
- 下一批：[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3)。

DIAGNOSIS-STATE-UX-01 已完成宿主浏览器验证并提交：
- 诊断中同步禁用按钮、锁定文字至最终保存；
- 结果关联版本前缀和时间，完成后可通过键盘查看并聚焦；
- 编辑后立即标记旧结果过时，暂不提供当前补救操作；
- 还原为已有已诊断文字时复用结果，不新增修订或诊断请求；
- 请求失败保留已有结果，保存失败阻止重复诊断；
- 仍未实现跨标签页持久请求去重。

公开资料包括产品 README、样例截图、安装方式、6 类产品调研、设计／评测／技能资料、路线和按批次交接。将原 ignored runtime 的合成语音复制为可分发 fixture，修复 CDP 重复变量与 Enter 模拟问题。npm 提取命令已修正 Windows 路径。

## 验证与精简原则

本地最终 Edge **53/53**、Python 提取 **6/6**、历史 handoff 工具 **43/43** 通过。原有 Node 155/155 通过；删除 README 措辞断言后，PR CI 验证 154 条。

本轮没有真实 Tutor、ASR、诊断请求或物理麦克风录音；本地生产账本 hash 未变。CI 从干净检出安装提取环境并运行模拟凭据与合成媒体。

[测试约定](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/TESTING.md) 是后续默认：
- 文档／文案／低风险样式审查差异和必要页面，不为文字增加自动测试；
- 按变更影响运行现有回归，不因提交或写交接重复已通过的检查；
- 保留记录保存、版本关联、真实调用去重等关键行为；
- CI 仅相关代码 PR 触发，取消旧运行，按改动选择浏览器与提取器；
- 删除文档固定措辞测试，撤去新增的逐字段 WAV 检查；不一刀切删除旧边界测试。

详细失败原因与证据目录见 [本轮记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-10-20.md)。首次 CI 的 Node 通过，但 npm 提取命令正斜杠被 cmd 误解析，已修复；不把失败运行记为通过。

## 已有证据边界

Phase 3B 仅对有界可行性问题 **CLOSED / PASS**，不代表跨课程／用户学习效果。
历史记录有两份相同确认文字的诊断报告，结果不同；两笔 settled 语义请求与时间强关联，但缺直接 request-ID → report 绑定。不得声称已核实只有一次诊断，不把第二次称为重试，不挑选较有利报告。

语音过程与内容判断分开；停顿、犹豫等过程观察不能独立证明知识缺口。当前生产使用单份有限材料。无总体掌握度评分，不宣称已证明竞争优势。许可证尚未选择。

## 保留的产品研究方向

候选问题：多源材料在明确来源权威与冲突约束下，能否更可靠地判断错误、遗漏和优先补学项。

先做同输入通用基线比较，再决定是否投入多源产品化。已有泛化能力如语音教回、材料上传、引用、缺口与下一步建议不足以单独构成差异化。公开文档不足以证明竞品没有冲突处理。

保留用户既有决定：
- 多来源在概念上受支持；初期受控样本 2–4 份材料，不是产品文件数量上限；
- 每个检测到的冲突可见；影响当前诊断／优先级的冲突需用户裁决，其他冲突可见且不阻塞；
- 来源角色自动推断、用户可改，紧凑展示；不要求所有角色先确认，重要裁决时明确确认；
- 优先级按前置依赖、错误严重性、来源和学习目标支持的重要性排序；无材料依据不得猜考试重点；
- 默认结论优先，证据按需；诊断深度可随目标与材料变化；
- 讲话过程检测保持现状，暂不继续调参，不作为核心差异化；
- 控制样本覆盖一致／互补／冲突来源、目标变化、啰嗦但正确、流畅但错误、证据不足与来源裁决；
- 记录错误／遗漏精确率与召回率、无依据判断、静默裁决冲突、优先项、稳定性与可追溯性；阈值在基线校准后确定。

## 下一步

Issue #3：先冻结既有准确材料／确认文字／两份结果和比较协议，再准备受控多源样本。离线资料与协议可自主推进；实际模型比较需明确服务和新增预算。若无有意义优势，不为功能数量扩张多源 UI。

后续候选：明确标注且不污染个人数据的免费模拟演示、持久账本／恢复能力。暂不做图谱大屏、教师后台、云同步或总体掌握度分数。

旧状态及更细背景保留在 [2026-09-30 历史快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/cd696d76fcd1a3d8a04b60ee9631bc6e4f5c6628/docs/master/CURRENT_STATE.md)。旧限制不覆盖本页记录的后续用户授权。
