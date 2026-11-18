# 知而能讲 · 当前状态

2026-11-19（悉尼）。产品分支 `prototype/study-teachback-v0.1`，已合并基线 `3ca10f012dd9ea1ec1e64a372ecabadea8071342`；唯一规划入口 `meta/master-state`。

**当前决定**：Issue #39 的材料续学阶段已交付，补充依据、采用条件、承接表达、新反馈／练习与旧证据回访已接通；相邻录音恢复和到期提示也已完成。继续个人学习用 Windows 本地产品定位，下一批聚焦材料管理／来源版本及尚未验证的日常流程。接续执行读 [HANDOFF](HANDOFF.md)，原审查见 [2026-11-19 产品审查](reviews/2026-11-19-product-review.md)。

| 状态 | 当前事实 |
|---|---|
| Completed | #30–34 的草稿、来源定位、文字讲解、历史反馈往返和题目修订已合并。#35 修复无 AI 入口与恢复；#36 增加同主题材料组合和学习疑点；#37 接入每次讲解的条件反馈；#38 接入条件练习、同文再次作答、参考入口记录与修订历史。 |
| Completed | [PR #40](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/40)：跨来源条件显示缺少的依据并可直接补入；补材料承接当前文字／问题，旧反馈绑定不变，新旧依据与表达可对照。已有目标草稿和未知请求不覆盖；v4 备份保留续学与片段范围。 |
| Completed | 日常恢复：无 AI 录音保持本机已保存；中断后可用文字继续或明确转写保留片段，不把未录内容判遗漏。学习页与历史显示实际到期日和备份入口。 |
| Completed | Issue #3 的离线协议、4 份合成材料／14 个案例及历史 Phase 3B 原件恢复已完成。原件留本机，公开仓库只保存哈希和结论。 |
| Verified | [PR #40 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44385555794) 在 `3102d9e` 完成 209/209 Node、74/74 Edge。本机定向 38 Node／3 Edge；修正旧 VM 测试依赖后另有 30 项相关检查通过。首次 CI 204/209 的失败及修复留在实现报告，不重复历史无关回归。 |
| Verified | 隔离 Edge 实走审查的 A→B 条件补入、续写分析、条件练习、旧反馈返回与备份；查看桌面／390px 截图，无横向溢出。Windows PowerShell 5.1 两次实际启动／健康检查／关闭通过；浏览器学习与服务生命周期分别验证，未声称物理麦克风端到端通过。 |
| Not Done | 材料重命名／修订／移除当前使用、长材料后续选段、转写迁移；物理麦克风和 Explorer 双击完整日常流程仍未验证。具体次序见 HANDOFF。 |
| Likely | 补材料时承接当前表达、显示缺少依据及就近动作可以减少手工整理；尚无用户研究量化。 |
| Unknown | 新条件反馈的真实语义准确性、相对通用助手的增益、真实学习收益、真实 Windows 麦克风及 Explorer 启动体验、新转写服务的中文课程质量。 |

## Decisions

- 以完整学习过程推进产品；Codex 自主决定实现、布局、批次和必要重构。当前条件问题及相邻界面已修复；继续围绕完整用户动作推进材料工作区。
- **转写迁移属于有截止日期的维护任务**。官方列出 `whisper-1` 于 2027-02-26 关闭，准备适配可以立即离线进行；新服务实际调用和生产切换需具体预算／方案。详见审查报告的官方来源。
- GitHub 是 Chat ↔ Codex 的持久交接位置。沿用产品分支 `docs/iterations/` 保存有意义批次的实现／运行报告；MASTER 只保留当前结论、版本与报告链接、待执行工作。用户不承担重复转述和搬运报告。
- 验证遵循 `docs/TESTING.md`：使用受影响路径和已有适用证据，完整回归按实际影响集中执行；更新文档或交接不触发重跑。

**下一步执行**：沿完整材料工作区完善重命名、修订和退出当前使用，保证历史引用不被覆盖；长材料全文持久化先明确保存范围与容量，不以提高发送上限代替设计。转写维护按既有期限推进离线准备，真实服务调用和生产切换需具体方案／预算。

**执行状态**：[Issue #39](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/39) 已由 Windows Codex 执行并完成，[PR #40](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/40) 已合并。此前 Chat CLI／云端启动受阻属于历史回执，不再代表本任务未开工。实现、失败记录、未解决／未验证及接续任务见[本批报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/3ca10f012dd9ea1ec1e64a372ecabadea8071342/docs/iterations/2026-11-19-material-continuity.md)。

## 保留的事实边界

主题按创建／恢复日起七天到期，增补材料和学习活动不续期；修改政策须用户决定。当前最多 12 份材料，每份及选定组合最多 5,000 字，只存选段和定位。新版读 v1/v2/v3/v4；含续学／保留片段范围的记录导出 v4，旧应用拒绝忽略这些范围。原始报告与音频／文字／条件关联保留，用户选择前提及参考自报不等于事实正确或独立完成。

Phase 3B 原件已恢复，两个确认版本 spans 相同，两份报告诊断粒度不同；不挑选较有利结果，不将第二份称为重试。详见 [冻结协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/PROTOCOL.md) 与 [公开清单](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/phase3b-manifest.json)。原件在此前恢复它们的 Windows 工作环境 ignored `artifacts/study-teachback/phase3b-recovery-20261118/private/`，不假设其他 checkout 有副本；当前批次用合成 A/B 材料即可推进。现有记录的生产账本 SHA256 为 `9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`，本批仅核对生产账本哈希，前后不变，真实产品 API 0 次。

[最近实现报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/3ca10f012dd9ea1ec1e64a372ecabadea8071342/docs/iterations/2026-11-19-material-continuity.md) · [上轮状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/190f83e5ef1dec96ea69c1fa8a10f281bedd5fdf/docs/master/CURRENT_STATE.md)
