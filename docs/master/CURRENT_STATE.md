# 知而能讲 · 当前状态

2026-11-19（悉尼）。产品分支 `prototype/study-teachback-v0.1`，已合并基线 `7fddda1ae2472bafec6c7845fbf7c65a0f896266`；唯一规划入口 `meta/master-state`。

**当前决定**：继续完善个人学习用的 Windows 本地产品。本轮优先打通“补充材料 → 继续当前问题／讲解 → 采用相关条件 → 获得新反馈”。已交付能力和新发现的使用障碍分开记录；接续执行读 [HANDOFF](HANDOFF.md)，审查依据见 [2026-11-19 产品审查](reviews/2026-11-19-product-review.md)。

| 状态 | 当前事实 |
|---|---|
| Completed | #30–34 的草稿、来源定位、文字讲解、历史反馈往返和题目修订已合并。#35 修复无 AI 入口与恢复；#36 增加同主题材料组合和学习疑点；#37 接入每次讲解的条件反馈；#38 接入条件练习、同文再次作答、参考入口记录与修订历史。 |
| Completed | Issue #3 的离线协议、4 份合成材料／14 个案例及历史 Phase 3B 原件恢复已完成。原件留本机，公开仓库只保存哈希和结论。 |
| Verified | #38 的 [Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44142007284) 在实现头 `5207ee1` 完成 205 Node／72 Edge；本机定向 24 Node／1 Edge。此证据覆盖工程行为，使用合成 provider／媒体。 |
| Verified | MASTER 本轮在最新代码、隔离 Chromium profile、无 AI 环境实际完成粘贴材料、保存文字讲解、加入材料、记录条件、切换组合、刷新和历史恢复。390px 无横向溢出；本次路径未发 POST、无页面异常。复现了“引用本次未选材料保存的条件在原组合和新组合均不可选”。 |
| Not Done | 条件跨来源可用性修复、补材料后自然续学、材料编辑／版本管理与长材料体验、日常语音／Windows 启动闭环、转写迁移。具体次序见 HANDOFF。 |
| Likely | 当前材料组合隔离和多层条件编辑增加了学习中断与手工整理成本。这是实走和代码所支持的产品判断，尚无用户研究量化。 |
| Unknown | 新条件反馈的真实语义准确性、相对通用助手的增益、真实学习收益、真实 Windows 麦克风及 Explorer 启动体验、新转写服务的中文课程质量。 |

## Decisions

- 以完整学习过程推进产品；Codex 自主决定实现、布局、批次和必要重构。优先修已复现的条件问题，并把材料续学与相关界面一起做完整。
- **转写迁移属于有截止日期的维护任务**。官方列出 `whisper-1` 于 2027-02-26 关闭，准备适配可以立即离线进行；新服务实际调用和生产切换需具体预算／方案。详见审查报告的官方来源。
- GitHub 是 Chat ↔ Codex 的持久交接位置。沿用产品分支 `docs/iterations/` 保存有意义批次的实现／运行报告；MASTER 只保留当前结论、版本与报告链接、待执行工作。用户不承担重复转述和搬运报告。
- 验证遵循 `docs/TESTING.md`：使用受影响路径和已有适用证据，完整回归按实际影响集中执行；更新文档或交接不触发重跑。

**下一步实验／执行**：用本轮已复现的 A 材料讲解 + B 补充笔记路径完成一次修复后的自然续学，检查保存条件可以实际采用、新分析依据清楚、旧反馈快照仍可追溯。完成后继续 HANDOFF 的下一项，不逐项等待用户确认。

**执行状态**：[Issue #39](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/39) 已建立，Ready，等待可用 Codex 执行端领取。Chat 尝试官方 CLI 委派，本地 app-server 初始化因只读文件系统失败（含 ephemeral 模式）；云端任务列表返回 401 认证失效。未产生执行任务 ID、实现改动或模型运行回执。完整任务已在 GitHub，无须再次整理需求；接续者记录领取状态后推进。

## 保留的事实边界

主题按创建／恢复日起七天到期，增补材料和学习活动不续期；修改政策须用户决定。当前最多 12 份材料，每份及选定组合最多 5,000 字，只存选段和定位。新版读 v1/v2/v3 备份；条件练习使用 v3。原始报告与音频／文字／条件关联保留，用户选择前提及参考自报不等于事实正确或独立完成。

Phase 3B 原件已恢复，两个确认版本 spans 相同，两份报告诊断粒度不同；不挑选较有利结果，不将第二份称为重试。详见 [冻结协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/PROTOCOL.md) 与 [公开清单](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/phase3b-manifest.json)。原件在此前恢复它们的 Windows 工作环境 ignored `artifacts/study-teachback/phase3b-recovery-20261118/private/`，不假设其他 checkout 有副本；当前批次用合成 A/B 材料即可推进。现有记录的生产账本 SHA256 为 `9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`，本轮未访问生产账本或调用模型。

[最近实现报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/iterations/2026-11-18-conditional-practice.md) · [上轮状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/05dcd0b71c17496ec3d5688802e2e383bbac6726/docs/master/CURRENT_STATE.md)
