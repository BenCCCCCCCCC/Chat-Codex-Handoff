# 知而能讲 · 当前状态

2026-11-17 · 产品分支 `prototype/study-teachback-v0.1` · MASTER 分支 `meta/master-state`

**当前决定**　面向个人学习与作品展示，持续完善本地产品。Codex 按[工作交接](HANDOFF.md)自主推进功能、界面、易用性与底层设计，参考 A–F 方向，自行决定拆分、顺序与验证深度。上阶段的 ACTIVE_EXCHANGE、实验脚本和旧交接仅作历史参考。

| 状态 | 已知事实 |
|---|---|
| Completed | [PR #30](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/30)／[PR #31](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/31)：草稿与标题保护、导入撤销、免密钥本地学习、TXT/MD 独立导入，以及材料页码定位与来源版本保留。 |
| Completed | [PR #32](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/32)：练习绑定准确历史报告，刷新／备份后能往返原反馈，当前校对草稿不受影响；旧记录只在唯一匹配时定位，歧义与删除会说明原因。 |
| Completed | [PR #33](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/33)：文字讲解草稿、免密钥保存、明确确认后的内容诊断；重讲固定原文字版本与反馈来源，前后表达和对应反馈可并列查看。当前基线 `81e3125`。 |
| Verified | [PR #32 完整 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44081480039) 与 [PR #33 完整 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44083057747) 通过；后者 Node 185 项、Edge 69 条流程。本机还覆盖文字保存失败恢复、重复提交、原讲解后续改写、备份恢复及 390px 对照截图。本轮真实 API 0 次，生产费用账本 SHA256 未变。 |
| Likely | 材料定位、针对同一缺口重讲和就地对照能降低学习中断与重新找材料的成本；尚未验证真实学习效果。 |
| Not Done | 题目质疑后的修正与复核、完整材料集和媒体分离存储、转写服务迁移、多来源复习及发行完善。A–F 仍有后续工作。 |
| Unknown | 新转写服务在实际中文课程上的质量、真实学习者在未见情境中的表现、多来源相对通用助手的增益。 |

**下一起点**　完善题目被质疑后的核对、修正与再次作答，保留原回答和先前反馈，并区分题目问题与学生理解问题。随后结合使用路径选择材料集／多来源复习或本地发行改进。当前无需新的产品决策；无新增真实模型调用额度。

**记录边界**　新建草稿独立保存在本机，从创建起七天，尚未纳入主题备份；开始学习保存为主题后可备份。导入保留选段文本与位置元数据，不保存完整原文件；手动改写正文会清除不再可靠的页码关联。来源关联不延长七天保留期，也不恢复已删除记录。文字讲解草稿随原主题备份；新文字记录没有音频、时长或时间戳，新版仍可读旧音频备份。对照是版本绑定的并列证据，不是掌握结论。本轮未增加付费调用、修改保留政策或进行批量存储迁移。旧规则在八段实际教程上出题 0/8、已拒绝 AI 候选评分 6/8 的历史结论不变。

本轮实现与收据：[历史反馈返回](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-feedback-return.md) · [文字讲解与对照](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-text-teachback.md)。此前实现与收据：[草稿](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-setup-drafts.md) · [本地启动](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-local-start.md) · [材料位置](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-source-evidence.md)。生产费用账本 SHA256：`9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`。

[完整审查与路线依据](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md) · [历史授权、实验结果和产品边界](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/3410de4fc40e8504bfeb9046cacbedc23eff3b34/docs/master/CURRENT_STATE.md)
