# 知而能讲 · 当前状态

2026-11-18（悉尼） · 产品 `prototype/study-teachback-v0.1` · 基线 `1d0837d` · MASTER `meta/master-state`。

**当前决定**　已修复学习入口与恢复，并交付同主题材料组合的第一版。下一步沿真实复习路径提高反馈可信度：区分材料条件、学习者采用的条件与模型判断，保留原结果，不把自查记录或工程通过率称为学习效果。最新任务读[工作交接](HANDOFF.md)。

| 状态 | 证据与边界 |
|---|---|
| Completed | [#30](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/30)–[#34](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/34)：草稿与导入撤销、免密钥本机学习、来源定位、准确历史反馈往返、文字讲解与版本对照、题目质疑和修订历史。 |
| Completed | [#35](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/35)：无 AI 时新情境入口说明前提，已知未发送操作不覆盖恢复位置；旧空练习返回已有讲解／学习，真正未知请求保留并可查看。文字入口直接可用，纯文字移除回听提示，390px 首屏可粘贴材料。 |
| Completed | [#36](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/36)：同主题添加课件／笔记、选择本次组合；每个组合保留对话、讲解、练习和草稿。支持原文引句、条件／暂缓记录、具体学习位置续接、跨组合搜索和整主题备份。题目自查可直接采用原文选段。 |
| Verified | [#35 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44123552461) Node 193/193、Edge 70/70；[#36 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44126313057) Node 196/196、Edge 71/71。提取器专项按改动跳过，相关浏览器文件路径仍使用已配置提取器。 |
| Verified | 本机从正常无密钥入口验证保存文字→尝试新情境→离开再打开，以及旧空练习恢复。材料集走查覆盖 TXT 笔记导入、切换保存失败恢复、循环队列双前提引用、跨组合历史返回、归档音频备份兼容及 390px 截图。完整 Edge 复用 CI，未重复本机全套。真实 API 0 次，生产费用账本未变。 |
| Likely | 固定材料组合与具体历史位置可减少重新查找依据；条件卡有助于保留一次核对的来龙去脉，尚未验证真实学习收益。 |
| Not Done | 自动判断分歧是否影响本次反馈、条件裁决与诊断的明确衔接、独立作答证据的进一步呈现、完整长材料／媒体拆分、转写服务迁移、Windows 发行完善。Issue #3 的离线同输入协议及历史原始结果整理仍待完成。 |
| Unknown | 真实学生独立完成、未见情境迁移及回访保持；多来源相对通用助手的增益、新转写服务的真实中文课程质量。 |

**下一步最小实验**　围绕循环队列等受控案例，把“材料给出的不同前提”“学生明确采用的条件”“这次回答是否可判”分开，核对条件缺失、等义回答与合理质疑，避免无依据判错。沿 [Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 整理离线协议与样本，恢复两份完整历史结果时保留全部输出与归因未知，不根据摘要补写。产品交互可独立改善，不新增真实调用。当前无需产品负责人决策。

**数据和兼容**　主题整体七天到期，添加或切换材料不延长；恢复副本沿用既有起算方式。每主题最多 12 份材料，每份及本次组合最多 5,000 字；只存选段和定位，不保存完整原文件，不截断超限输入。材料／疑点草稿随主题备份；新建主题前的独立草稿仍不在主题备份中。多材料导出为 v2，旧应用会拒绝；新版继续读取 v1。没有批量迁移。条件卡目前是学习者自查记录，不自动裁决或重判旧反馈。旧规则真实教程 0/8、已拒绝候选判断与预期相符 6/8 的历史口径不变。

本轮记录：[学习入口与恢复](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-18-learning-entry.md) · [材料组合与疑点](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-18-material-contexts.md)。生产账本 SHA256：`9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`。

[本轮开始前的真实问题与规划](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/d7d7236/docs/master/CURRENT_STATE.md) · [既有交付与兼容](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a5af9a1037df3ceccfec58f0c8f9f354c1edfece/docs/master/CURRENT_STATE.md) · [完整路线与原始审查](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md)
