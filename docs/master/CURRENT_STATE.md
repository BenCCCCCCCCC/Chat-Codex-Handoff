# 知而能讲 · 当前状态

2026-11-17 · 产品分支 `prototype/study-teachback-v0.1` · MASTER 分支 `meta/master-state`

**当前决定**　面向个人学习与作品展示，持续完善本地产品。Codex 按[工作交接](HANDOFF.md)自主推进功能、界面、易用性与底层设计，参考 A–F 方向，自行决定拆分、顺序与验证深度。上阶段的 ACTIVE_EXCHANGE、实验脚本和旧交接仅作历史参考。

| 状态 | 已知事实 |
|---|---|
| Completed | [PR #30](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/30) 已合并：新建正文、自定标题及学习偏好自动保存，导航／刷新可恢复；导入保留原稿并可撤销；无 AI 密钥仍可保存材料和继续本地学习；TXT/MD 不依赖 Python。 |
| Completed | [PR #31](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/31) 已合并：导入选段保留原文件页／幻灯片标签，反馈可定位引文并返回同一反馈卡片；重复引文明确显示多处；修改材料另开一轮并保留旧来源；旧 v1 备份兼容。当前功能基线 `ce5566a`。 |
| Verified | [PR #30 完整 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44077042738) 通过；[PR #31 最终 CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44079235496) 的 Node 182 项、Edge 67 条流程通过。本机还通过 Python 提取 6 项及 Windows PowerShell 5.1 启动／停止／恢复检查，核对桌面与 390px 截图。本轮真实 API 0 次，生产费用账本 SHA256 未变。 |
| Likely | 材料定位、针对同一缺口重讲和就地对照能降低学习中断与重新找材料的成本；尚未验证真实学习效果。 |
| Not Done | 练习到准确历史反馈的持久返回定位、键入讲解、前后重讲对照、题目质疑与修正、完整材料集和媒体分离存储、转写服务迁移、多来源复习及发行完善。A–F 仍有后续工作。 |
| Unknown | 新转写服务在实际中文课程上的质量、真实学习者在未见情境中的表现、多来源相对通用助手的增益。 |

**下一起点**　继续完善材料—反馈—练习的返回关系，随后把键入讲解和同一缺口重讲对照接入现有记录。优先补全实际用户路径；无需重复已通过且未受影响的检查。付费模型产出质量与真人学习表现分别记录。

**记录边界**　新建草稿独立保存在本机，从创建起七天，尚未纳入主题备份；开始学习保存为主题后可备份。导入保留选段文本与位置元数据，不保存完整原文件；手动改写正文会清除不再可靠的页码关联。来源关联不延长七天保留期，也不恢复已删除记录。本轮未增加付费调用、修改保留政策或进行存储迁移。旧规则在八段实际教程上出题 0/8、已拒绝 AI 候选评分 6/8 的历史结论不变。

实现与本机收据索引：[草稿](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-setup-drafts.md) · [本地启动](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-local-start.md) · [材料位置](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-17-source-evidence.md)。生产费用账本 SHA256：`9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`。

[完整审查与路线依据](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md) · [历史授权、实验结果和产品边界](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/3410de4fc40e8504bfeb9046cacbedc23eff3b34/docs/master/CURRENT_STATE.md)
