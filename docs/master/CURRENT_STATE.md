# 知而能讲 · 当前状态

2026-11-18（悉尼） · 产品 `prototype/study-teachback-v0.1` · 基线 `7fddda1` · MASTER `meta/master-state`。

**当前决定**　已采用的条件可进入新练习，再次作答、实际参考入口记录、题面复核与历史恢复已连通。Issue #3 离线交付已完成；真实模型语义质量和学习收益仍待另行授权验证。最新任务读[工作交接](HANDOFF.md)。

| 状态 | 证据与边界 |
|---|---|
| Completed | [#30](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/30)–[#36](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/36)：草稿与导入撤销、免密钥本机学习、来源定位、准确历史反馈往返、文字讲解与版本对照、题目质疑修订历史、学习入口与恢复、同主题材料组合及疑点续接。 |
| Completed | [#37](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/37)：每次讲解显式选择最多 3 项相关适用条件；反馈显示“按条件可判”或“暂缓本项 · 不计作答错”。新结果绑定来源、文字版本和条件快照，改条件保留旧结果，恢复相同条件可复用原结果。刷新、备份、跨组合历史与前后对照保留关联。 |
| Completed | [#38](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/38)：新题固定保存可判条件和精确来源反馈，同文再次作答新增记录；未知结果明确原样重试。每次回答保存本应用参考入口与额外参考自报，不推断独立完成。题面／前提问题暂缓并接入既有核对修订，原题／原答／历史反馈均保留；刷新、搜索、组合归档与 v3 备份保持关联。 |
| Completed | [Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 离线范围：冻结同输入比较协议、4 份合成材料／14 个受控案例、评审模板；恢复 Phase 3B 完整来源、原始转写、两个确认版本与两份完整报告。原始学习者文本及报告留本机，公开包只含哈希、恢复结论和合成材料。 |
| Verified | [#38 Windows CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44142007284)：205/205 Node、72/72 Edge，实现头 `5207ee1`。本机定向 Node 24/24、Edge 1/1；390px 无横向溢出。最终版本完整回归复用 CI，覆盖未知重试、同文重答、修订历史、准确原反馈及备份恢复。 |
| Verified | 原应用 IndexedDB 仅复制本应用来源到隔离环境，读取不加载七天清理代码，原数据库前后逐文件哈希相同。两确认版本 spans 相同，所有原报告保留；没有重新调用模型。生产账本哈希未变，真实 API 0 次。 |
| Likely | 明确条件及历史绑定有助于减少无依据判错和回访时的混淆；尚未测得真实学习收益。 |
| Not Done | 自动识别相关分歧、模型对范围与引文解释的准确性、完整长材料／媒体拆分、转写迁移、Windows 发行完善。 |
| Unknown | 相对通用助手的增益；真实学生独立完成、未见情境迁移与回访保持；新转写服务的真实中文课程质量。 |

**下一步**　基于已打通的“明确条件→新练习→再次作答→历史证据”走查反馈可理解性与材料组合使用体验；发现实际缺口再调整。参考入口展开及学习者自报仅是可观察证据，不能当作独立完成证明。真实语义质量比较使用[冻结协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/quality-baseline-2026-11-18/PROTOCOL.md)，执行前明确服务、预算、固定模型和清单；当前无须产品负责人决策。

**数据和兼容**　主题整体七天到期，添加／切换材料不延长；恢复副本沿用既有起算方式。最多 12 份材料，每份及组合最多 5,000 字，只存选段和定位，不保存完整原文件。含条件练习／待出题请求的导出使用 v3，旧应用拒绝未知格式以免忽略条件判答；其余多材料 v2、单来源 v1，新版均可读。不迁移数据库或改写旧报告。学习者选择不等于事实／独立复核；暂缓分组不得携带判答 findings，但模型仍可能误判相关范围，结构校验不能证明语义正确。工程通过率不称为学习效果。

**历史证据边界**　Phase 3B 两份报告都有两个支持方向，第一份在 repair 中提及 18:00，第二份另列 missing。原题允许举例，是否应列为必要遗漏仍须按明确目标评审，不选较有利报告。两笔 settled 请求仅与时间强关联，缺直接 request ID → report 绑定，不把第二次称为重试。本机原件：`artifacts/study-teachback/phase3b-recovery-20261118/private/`；[公开恢复清单](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/quality-baseline-2026-11-18/phase3b-manifest.json)。自动审批曾拒绝私有原件上传，安全替代方案已完成；以后上传完整学习者记录须有明确授权。

[本轮记录](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-18-conditional-practice.md) · [前一轮状态](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/e9bf19a53e7058c79eaaca6a19993bb056a942a4/docs/master/CURRENT_STATE.md) · [完整路线与原始审查](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md)。生产账本 SHA256：`9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e`。
