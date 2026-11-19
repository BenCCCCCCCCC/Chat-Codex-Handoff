# 知而能讲 · 当前状态

2026-11-19（悉尼）。产品分支 `prototype/study-teachback-v0.1`，已合并基线 `d1d662d2376b5618b03fadff214d4680ebf86e57`；唯一规划入口 `meta/master-state`。

**当前决定**：获批的合成音频真实转写比较已完成并封存：16/16 成功、0 重试，公开费率估算 US$0.015925（非发票），低于 US$0.30。两模型都出现关键数字误听；生产继续使用 Whisper，切换前另行集中确认。材料版本与历史学习证据保持不变，继续个人学习用 Windows 本地产品定位。接续读 [HANDOFF](HANDOFF.md)。

| 状态 | 当前事实 |
|---|---|
| Completed | [PR #42](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/42)：8 条本机免费合成 WAV × 两模型，各调用一次。音频、脚本、全部返回的允许字段、请求 ID、模型名隐藏时的助手文本审阅、本批费用事件及哈希已公开；无个人原件或付费 TTS。 |
| Verified | 16/16 HTTP 200；`gpt-transcribe` 真实接受语言／术语字段，8 次均返回 text/languages/usage，无词句时间，沿用整段回听。离线预算／禁止重跑控制 2/2，原响应哈希及 16 次预留／结算已核对。本批仅改研究资料和脚本，未重复产品回归。 |
| Observed | 助手文本评审中两模型均 6/8 条关键语义可接受、1 条术语需核对、1 条关键数字改变：“长度为八时”均成为“长度为80”。无独立人工逐字稿／听审，不能据此宣称中文准确率；候选中英拼接标点更碎。见[全部结果](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d1d662d2376b5618b03fadff214d4680ebf86e57/docs/research/asr-comparison-2026-11-19/README.md)。 |
| Completed | #30–38 的草稿、来源定位、文字讲解、练习反馈往返、题目复核修订、多材料、条件反馈和独立作答证据已合并。#39／#40 已完成补材料续学及日常恢复。 |
| Completed | [PR #41](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/41)：改名／修订追加来源版本，最新与历史版本可查看、引用、返回；可仅保存或承接表达接着学。旧条件不自动改绑，未沿用项提示重新核对。修订草稿可恢复，保存与采用一次写入。 |
| Completed | v5 备份保存材料谱系、修订草稿和无词句时间转写能力，兼容读取 v1–v4。取消选择可退出当前使用，不删除历史引用；12 份按逻辑材料计数。 |
| Completed | 转写请求、返回能力、回听和模型费率解耦；候选无时间时整段回听，不因全段重叠就关联句子错误与声学事件。旧账本不按新模型重新计价。生产常量仍锁定 Whisper，HTTP 无新模型开关。 |
| Completed | Issue #3 离线协议、4 份合成材料／14 个案例及历史 Phase 3B 原件恢复已完成；原件留本机，仓库只保存允许公开的结论与哈希。 |
| Verified | [PR #41 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44467429766) 在实现／测试提交 `20b40c46a6d02101656ed6adad92031e60d949a1` 通过 214/214 Node、76/76 Edge，job `135368472963`。之后 `bfacab8` 仅补报告，不重跑。 |
| Verified | PR #41 阶段本机定向 44 Node／3 Edge；查看 1280px、390px 材料版本及整段回听截图，手机无横向溢出。覆盖修订草稿、存储失败恢复、v5 还原、返回原反馈。初轮测试恢复步骤修正留在报告。该阶段真实产品 API 0 次，账本不变；本轮比较新增 16 次获批请求，见下方账本回执。 |
| Not Done | 独立人工听审、生产切换；长材料全文持久化与后续选段；物理麦克风和 Explorer 双击完整日常学习仍未验证。 |
| Unknown | 真实学习者语音／中文课程准确率、一般延迟、词时间精度与实际发票。此次只取得 8 条 TTS 的接口及输出证据；新条件反馈真实语义质量、真实学习收益及相对通用助手的增益仍未知。 |

## Decisions

- 继续按完整学习动作自主实施与风险验证；已有历史引用不可就地覆盖。修订只是新的学习依据，不自动表示旧反馈失效或学生掌握。
- 转写迁移须在官方 2027-02-26 关闭期限前完成。已重新核对官方依据，见[离线准备与比较设计](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/f63fbb370b99dd19c3215f738ee706faa1b02a7a/docs/research/asr-migration-2026-11-19.md)。用户本轮已批准仅合成音频、最多 16 次、US$0.30、不自动重试，且已完整执行；[回执与限制](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d1d662d2376b5618b03fadff214d4680ebf86e57/docs/iterations/2026-11-19-asr-comparison.md)。实际基准为冻结 TTS 脚本和助手文本评审，独立人工逐字稿／听审未完成。16 次额度已用完并封存，不默认使用剩余预算；批准比较不批准生产切换。
- 七天保留期、只存选段／定位、单份及组合 5,000 字不变。全文持久化扩大保存范围，先明确方案再决定；不以提高发送上限代替设计。
- GitHub 保存版本、实现报告与证据；文档／交接变更复用同一实现 CI，不重复回归。公开证据仅含合成材料／音频、获批比较返回的允许字段及必要费用记录，无个人原件或完整生产账本。

**下一步执行**：优先独立听审“否定条件”“停顿弱音”两条合成音频，不需新增付费请求；核对脚本与发音、关键数字及术语问题。随后按[具体切换范围](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d1d662d2376b5618b03fadff214d4680ebf86e57/docs/research/asr-comparison-2026-11-19/README.md#生产切换建议暂不自动切换)集中确认：新录音改候选模型并仅整段回听，保留文字确认、旧时间引用和历史反馈，无自动重试／旧记录重转写。听审未完成可作为明确限制，但不得宣称已通过质量门槛。独立可继续课程领域离线样本、长材料保存边界方案与日常走查。

**执行状态**：[PR #42](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/42) 已合并；[本轮报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d1d662d2376b5618b03fadff214d4680ebf86e57/docs/iterations/2026-11-19-asr-comparison.md)及[结果／音频／审计](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d1d662d2376b5618b03fadff214d4680ebf86e57/docs/research/asr-comparison-2026-11-19/README.md)包含版本、初轮离线断言误报、实际调用、未解决与未验证事项。产品代码相对 PR #41 完全未变，复用其 CI；#39–41 已交付，无需重新领取或重复历史回归。

## 保留的事实边界

主题按创建／恢复日起七天到期，增加材料、改名、修订和学习活动不续期。最多 12 份逻辑材料，历史版本保留各自选段与引用，不保存原文件／全文。新版读 v1–v5；有材料版本／修订草稿或整段回听能力的记录导出 v5，旧应用应拒绝忽略这些语义。用户选择前提和参考自报不等于事实正确或独立完成。

Phase 3B 原件已恢复，两个确认版本 spans 相同，两份报告诊断粒度不同；不挑选较有利结果，不将第二份称为重试。详见 [冻结协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/PROTOCOL.md) 与 [公开清单](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/phase3b-manifest.json)。原件在此前恢复它们的 Windows 工作环境 ignored `artifacts/study-teachback/phase3b-recovery-20261118/private/`，不假设其他 checkout 有副本；当前批次用合成 A/B 材料即可推进。本轮获批比较使账本 SHA256 从 `9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e` 更新为 `4759437a42e4cf0f5da0a3b4ee9ca857838ecbf0fcd0b1c6df3a4a603d9df942`，新增 16 次 reserve／settle。每模型 usage 共 91 秒，Whisper 估算 US$0.009100、候选 US$0.006825，合计 US$0.015925；本批全部结算，无未知暴露。未公开其他账本事件，未修改生产模型或数据政策。


[最近执行报告](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d1d662d2376b5618b03fadff214d4680ebf86e57/docs/iterations/2026-11-19-asr-comparison.md) · [上轮状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/ca0fcdaaeaa3d617cd94bfe3a490117e9a798a1c/docs/master/CURRENT_STATE.md)
