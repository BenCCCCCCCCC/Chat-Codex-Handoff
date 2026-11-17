# 知而能讲 · 当前状态

2026-11-18（悉尼） · 产品 `prototype/study-teachback-v0.1` · 基线 `ce86094` · MASTER `meta/master-state`。

**当前决定**　材料条件已接入讲解反馈；Issue #3 的离线协议、受控样本和历史原件恢复已完成。下一步完善条件下的再次作答与独立证据呈现，真实模型质量比较另需服务及预算授权。最新任务读[工作交接](HANDOFF.md)。

| 状态 | 证据与边界 |
|---|---|
| Completed | [#30](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/30)–[#36](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/36)：草稿与导入撤销、免密钥本机学习、来源定位、准确历史反馈往返、文字讲解与版本对照、题目质疑修订历史、学习入口与恢复、同主题材料组合及疑点续接。 |
| Completed | [#37](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/37)：每次讲解显式选择最多 3 项相关适用条件；反馈显示“按条件可判”或“暂缓本项 · 不计作答错”。新结果绑定来源、文字版本和条件快照，改条件保留旧结果，恢复相同条件可复用原结果。刷新、备份、跨组合历史与前后对照保留关联。 |
| Completed | [Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 离线范围：冻结同输入比较协议、4 份合成材料／14 个受控案例、评审模板；恢复 Phase 3B 完整来源、原始转写、两个确认版本与两份完整报告。原始学习者文本及报告留本机，公开包只含哈希、恢复结论和合成材料。 |
| Verified | [#37 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44137316815)：200/200 Node、71/71 Edge。本机聚焦 Edge 6/6；首次发现另存条件后控件未解锁，修复后通过。完整回归复用 CI，文档哈希按 Git 内实际 LF 字节单独核对。 |
| Verified | 原应用 IndexedDB 仅复制本应用来源到隔离环境，读取不加载七天清理代码，原数据库前后逐文件哈希相同。两确认版本 spans 相同，所有原报告保留；没有重新调用模型。生产账本哈希未变，真实 API 0 次。 |
| Likely | 明确条件及历史绑定有助于减少无依据判错和回访时的混淆；尚未测得真实学习收益。 |
| Not Done | 自动识别相关分歧、模型对范围与引文解释的准确性、将条件带入新的练习题并保持独立作答证据、完整长材料／媒体拆分、转写迁移、Windows 发行完善。 |
| Unknown | 相对通用助手的增益；真实学生独立完成、未见情境迁移与回访保持；新转写服务的真实中文课程质量。 |

**下一步**　沿“明确条件→再次作答→查到上次条件和回答”完善学习闭环。条件反馈当前可在原讲解中修改并再次分析；不会把新前提自动套用到旧练习。真实比较使用[冻结协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/quality-baseline-2026-11-18/PROTOCOL.md)，执行前明确服务、预算、固定模型和清单；数值阈值在基线校准后确定。当前无须产品负责人决策。

**数据和兼容**　主题整体七天到期，添加／切换材料不延长；恢复副本沿用既有起算方式。最多 12 份材料，每份及组合最多 5,000 字，只存选段和定位，不保存完整原文件。多材料 v2 备份，新版继续读 v1；本轮添加可选条件快照，不迁移数据库或改写旧报告。学习者选择不等于事实／独立复核；暂缓分组不得携带判答 findings，但模型仍可能误判相关范围，结构校验不能证明语义正确。工程通过率不称为学习效果。

**历史证据边界**　Phase 3B 两份报告都有两个支持方向，第一份在 repair 中提及 18:00，第二份另列 missing。原题允许举例，是否应列为必要遗漏仍须按明确目标评审，不选较有利报告。两笔 settled 请求仅与时间强关联，缺直接 request ID → report 绑定，不把第二次称为重试。本机原件：`artifacts/study-teachback/phase3b-recovery-20261118/private/`；[公开恢复清单](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/quality-baseline-2026-11-18/phase3b-manifest.json)。自动审批曾拒绝私有原件上传，安全替代方案已完成；以后上传完整学习者记录须有明确授权。

[本轮记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-18-conditional-feedback.md) · [前一轮状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a8b886feb263a5d7dd014cd01640b8fe36781473/docs/master/CURRENT_STATE.md) · [完整路线与原始审查](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md)。生产账本 SHA256：`9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`。
