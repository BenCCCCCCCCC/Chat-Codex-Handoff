# CURRENT_STATE — 知而能讲

Updated: 2026-10-20 (Australia/Sydney)
Repository: BenCCCCCCCCC/Chat-Codex-Handoff
Product/default branch: prototype/study-teachback-v0.1
Canonical state branch: meta/master-state

## 当前决定与授权

产品定位为 **个人学习＋作品展示**。用户授权公开仓库（包括现有 Git 历史）、完善 README、调研同类产品与设计/技能、自主审核迭代，以及按有意义的批次在 GitHub 留痕。用户要求减少防御性、冗余与不必要的测试。

最新指示：“功能与界面都还很粗糙”，允许自主决定方向，先学习现有网页与功能设计。本批据此将学习工作台和免 API 示例前置；Issue #3 的基线比较研究保留。

授权覆盖本轮产品编辑、commit、push、PR/merge 与交接；取代旧交接对上述操作和每次字节变化必须全量复测的限制。原 Phase 3B 真实调用额度已耗尽，不沿用旧额度。

## 最新交付

- 仓库 public；默认分支 prototype/study-teachback-v0.1。
- 本轮实现分支：codex/learning-workspace-ux。
- 问题记录：[Issue #4](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/4)。
- PR：[重整学习工作台，加入免 API 的完整交互示例](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/5)。
- 实现头：fa3d5f02e3437ab20dd21ce323569bec02232462。
- 合并提交：355174b5dbeeaf3a51d22012e73fab50956616cc。
- [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39405480113)：PASS — Node 153、Python 6、Edge 55。

本轮先研究 RemNote、Readwise Reader、NN/g 渐进披露和公开 frontend-design skill；未安装或执行第三方代码。采用稳定导航、材料／对话分区、次要选项折叠和结论优先的反馈层次。

已实现：
- 新首页、桌面侧栏、小屏顶部导航、学习阶段提示与可选学习设置。
- 提问建议只填入空草稿，保留已有输入，不自动发请求。
- 转写核对与反馈分列，反馈按状态分组，证据按需展开；保留原始 finding 索引绑定。
- 独立 /demo：两组预编写材料、两种讲解对比、证据展开、情境练习；不调用 API、不读写个人记录、不录音。
- README 新截图、设计研究、路线和批次交接；CI 覆盖所有入口 HTML。

[设计依据](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/2026-10-20-workspace-design.md) · [批次记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-10-20-workspace-ux.md)

前一批 [PR #2](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/2) 已完成公开、README、竞品调研、合成音频、轻量 CI 与诊断状态 UX，合并 0b0c9477023171da82440b0ebe13496906946efc。诊断中锁定、结果版本关联、旧结果过时、相同文字复用等行为继续保留；仍未实现跨标签页持久请求去重。

## 验证与精简原则

本地一次 Edge **55/55** 通过，JS 语法／差异检查通过。新增两类用户行为检查；已有反馈检查验证证据展开。人工查看桌面、手机与反馈截图，浏览器回归包含 200% 文字放大。没有真实 Tutor、ASR、诊断请求或物理麦克风使用；生产账本 hash 未变。

首次 CI 的 Node 152/154；失败来自旧整段 HTML 断言与旧颜色变量。删除重复的静态 HTML／API 文本断言，相关行为由现有浏览器和 B3 保留；按实际颜色更新对比度检查，并加深输入框边界。局部 UI 3/3 通过。未重复本地 Node／Edge 全量，最终由 PR CI 验证。

沿用 [按影响验证](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/TESTING.md)：
- 文档／文案／低风险样式只审查差异和必要页面，不为文字增加测试；
- 按影响运行既有回归，不因提交或交接重复已通过检查；
- 保留记录保存、版本关联、真实调用去重等关键行为；
- CI 只触发相关代码 PR；按变更选择浏览器／提取器，修改工作流本身才全套；
- 不一刀切删除旧边界测试，修改对应模块时按收益精简。

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

Issue #3：离线冻结既有准确材料／确认文字／两份结果和比较协议，再准备受控多源样本。实际模型比较需明确服务和新增预算。若无有意义优势，不为功能数量扩张多源 UI。

可根据用户实际体验反馈调整下一批优先级；工作台和免费示例已完成，不要再次作为未实现功能。当前未部署公共网站，/demo 随本地服务运行。持久账本／恢复能力仍为候选；暂不做图谱大屏、教师后台、云同步或总体掌握度分数。

上一批状态保留在 [公开整理快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc6ee83b8b2548eeee2e27bfb2584a8f1679cada/docs/master/CURRENT_STATE.md)，更早背景见 [2026-09-30 快照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/cd696d76fcd1a3d8a04b60ee9631bc6e4f5c6628/docs/master/CURRENT_STATE.md)。旧限制不覆盖后续用户授权。
