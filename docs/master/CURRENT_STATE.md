# 知而能讲 · 当前状态

2026-11-19（悉尼）。产品分支 `prototype/study-teachback-v0.1`，已合并基线 `f63fbb370b99dd19c3215f738ee706faa1b02a7a`；唯一规划入口 `meta/master-state`。

**当前决定**：材料重命名、修订和来源版本阶段已交付；旧讲解、题目、回答、反馈与条件引文保留当时依据。转写迁移离线合同和回听／费用准备已完成，生产仍为 Whisper。继续个人学习用 Windows 本地产品定位，接续读 [HANDOFF](HANDOFF.md)。

| 状态 | 当前事实 |
|---|---|
| Completed | #30–38 的草稿、来源定位、文字讲解、练习反馈往返、题目复核修订、多材料、条件反馈和独立作答证据已合并。#39／#40 已完成补材料续学及日常恢复。 |
| Completed | [PR #41](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/41)：改名／修订追加来源版本，最新与历史版本可查看、引用、返回；可仅保存或承接表达接着学。旧条件不自动改绑，未沿用项提示重新核对。修订草稿可恢复，保存与采用一次写入。 |
| Completed | v5 备份保存材料谱系、修订草稿和无词句时间转写能力，兼容读取 v1–v4。取消选择可退出当前使用，不删除历史引用；12 份按逻辑材料计数。 |
| Completed | 转写请求、返回能力、回听和模型费率解耦；候选无时间时整段回听，不因全段重叠就关联句子错误与声学事件。旧账本不按新模型重新计价。生产常量仍锁定 Whisper，HTTP 无新模型开关。 |
| Completed | Issue #3 离线协议、4 份合成材料／14 个案例及历史 Phase 3B 原件恢复已完成；原件留本机，仓库只保存允许公开的结论与哈希。 |
| Verified | [PR #41 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44467429766) 在实现／测试提交 `20b40c46a6d02101656ed6adad92031e60d949a1` 通过 214/214 Node、76/76 Edge，job `135368472963`。之后 `bfacab8` 仅补报告，不重跑。 |
| Verified | 本机定向 44 Node／3 Edge；查看 1280px、390px 材料版本及整段回听截图，手机无横向溢出。覆盖修订草稿、存储失败恢复、v5 还原、返回原反馈。初轮测试恢复步骤修正留在报告。真实产品 API 0 次，生产账本不变。 |
| Not Done | 新模型真实比较／生产切换；长材料全文持久化与后续选段；物理麦克风和 Explorer 双击完整日常学习仍未验证。 |
| Unknown | 新转写模型实际服务合同、中文课程准确率、延迟和账单；新条件反馈真实语义质量、真实学习收益及相对通用助手的增益。工程通过率不等于这些结果。 |

## Decisions

- 继续按完整学习动作自主实施与风险验证；已有历史引用不可就地覆盖。修订只是新的学习依据，不自动表示旧反馈失效或学生掌握。
- 转写迁移须在官方 2027-02-26 关闭期限前完成。已重新核对官方依据，见[离线准备与比较设计](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/f63fbb370b99dd19c3215f738ee706faa1b02a7a/docs/research/asr-migration-2026-11-19.md)。8 条短音频脚本已设计，音频／人工逐字稿尚未制作冻结；真实比较拟最多 16 次、总预算上限 US$0.30，**未获本次付费执行许可**。批准比较不自动批准生产切换。
- 七天保留期、只存选段／定位、单份及组合 5,000 字不变。全文持久化扩大保存范围，先明确方案再决定；不以提高发送上限代替设计。
- GitHub 保存版本、实现报告与证据；文档／交接变更复用同一实现 CI，不重复回归。公开证据仅含本批合成队列／蒸发样本，无个人原件。

**下一步执行**：冻结获准的合成短音频与人工逐字稿；真实服务比较及切换按具体方案授权后推进。独立可继续课程领域离线质量样本、材料工作区的长材料保存边界方案与可用环境下的日常走查。

**执行状态**：[PR #41](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/41) 已合并；[本批报告与截图](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/f63fbb370b99dd19c3215f738ee706faa1b02a7a/docs/iterations/2026-11-19-material-versions.md) 包含准确版本、验证、初轮失败、未完成与未验证事项。旧 #39 已完成，无需重新领取或重做历史回归。

## 保留的事实边界

主题按创建／恢复日起七天到期，增加材料、改名、修订和学习活动不续期。最多 12 份逻辑材料，历史版本保留各自选段与引用，不保存原文件／全文。新版读 v1–v5；有材料版本／修订草稿或整段回听能力的记录导出 v5，旧应用应拒绝忽略这些语义。用户选择前提和参考自报不等于事实正确或独立完成。

Phase 3B 原件已恢复，两个确认版本 spans 相同，两份报告诊断粒度不同；不挑选较有利结果，不将第二份称为重试。详见 [冻结协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/PROTOCOL.md) 与 [公开清单](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/phase3b-manifest.json)。原件在此前恢复它们的 Windows 工作环境 ignored `artifacts/study-teachback/phase3b-recovery-20261118/private/`，不假设其他 checkout 有副本；当前批次用合成 A/B 材料即可推进。现有记录的生产账本 SHA256 为 `9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`，本批仅核对生产账本哈希，前后不变，真实产品 API 0 次。


[最近实现报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/f63fbb370b99dd19c3215f738ee706faa1b02a7a/docs/iterations/2026-11-19-material-versions.md) · [上轮状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d29caa2f20e1c62009472348a1080e634f9c08ca/docs/master/CURRENT_STATE.md)
