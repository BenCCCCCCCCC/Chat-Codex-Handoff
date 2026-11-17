# 知而能讲 · Codex 工作交接

完善面向个人学习与作品展示的 Windows 本地产品。学生带自己的材料，能用语音或文字讲清概念、查到依据、纠正一次理解，下次从同一个问题继续。当前基线和收据见[当前状态](CURRENT_STATE.md)。此前的草稿保护、页码定位、反馈往返、文字重讲和题目修订均已交付。

## 本轮交付（2026-11-18）

[PR #35](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/35) 与 [PR #36](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/36) 已合并，产品基线 `1d0837d`。未发送操作占据恢复位置的问题已修复；旧空练习能返回实际可做的学习动作，未知请求不删除。文字与录音有明确选择，窄屏首先能看到粘贴材料。

同一主题支持添加与选择材料组合，各组合保留各自讲解／题目／草稿。条件卡可保留原句、采用条件或暂缓结论，返回具体讲解／题目；搜索与历史覆盖旧组合。原报告与题版不随切换改写。多材料 v2 备份包含归档音频，新版继续接受 v1；主题七天期限不变，无批量迁移。条件卡仍是学习者自查，不自动改变诊断或证明学习效果。验证与收据见[当前状态](CURRENT_STATE.md)。

## 当前优先级

| 交付方向 | 学生能看到的改变 |
|---|---|
| 已修复的入口继续保持 | 无 AI 时可保存文字和已有草稿；已知未发送操作不建立未知请求或覆盖恢复位置。历史真正未知的请求仍保留；以后新增入口也保持这一原则。 |
| 主线：材料条件怎样影响这次判断 | 材料集、组合切换、引句及疑点续接已有第一版。继续把学习者采用的条件与本次诊断明确衔接；仅处理会改变当前判断的分歧，支持暂缓受影响结论，其他部分继续学。返回时可追溯上次表达、提示条件和最近回答；独立作答要保留真实参考情况，不靠标签推断。 |
| 伴随主线：提高题目与反馈可信度 | 复用 [Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 整理同一输入、两份历史结果与受控材料；缺原件时注明。用条件缺失、答案等义和合理质疑校准“可判／暂缓”与优先补学项。把离线协议和样本留在该 Issue 范围，产品交互可独立推进。题目自查时尽量复用原文选段，减少学生复制作证；保存真实独立作答证据供以后评估学习效果。 |
| 后续：可靠语音与本地交付 | 录音切走后能试听、使用有效片段；按实际转写能力提供词、段或整段回听。改善 Windows 首次启动、备份和真实到期日呈现，免密钥示例展示材料分歧与纠错。材料或音频增长时优先优化实际拖慢列表／恢复的读写。真实模型切换及真实课堂效果单独验证。 |

比如同一门课讨论长度为 8 的循环队列：课件采用预留一个空位的实现，笔记采用另记元素个数的实现。学生答“能放 8 个”时，应能查到两份材料各自的前提；题面缺少实现约定时可暂缓判分。回访时用一个新容量独立作答，能找到上次为什么采用那个条件。这个例子供设计与离线走查使用，选材和实现由 Codex 决定。

## 实现与验证

复用既有来源快照、页码、报告和题版关联，按需要扩展到同一主题的多来源。定位可参考 [W3C 引句与上下文](https://www.w3.org/TR/annotation-model/#text-quote-selector) 和 [Hypothesis 开源实现](https://github.com/hypothesis/client)。Google 已支持选择资料和回到引文，10 月 23 日又[公布从对话管理资料来源](https://workspaceupdates.googleblog.com/2026/10/take-actions-on-your-notebooks-from-Gemini-Notebook-directly-in-the-Gemini-app.html)。进一步投入应体现“材料的不同条件怎样改变对这次讲解的判断”。[Google 官方说明](https://support.google.com/gemininotebook/answer/16179559)

Codex 自行决定技术、顺序和拆合，在已有授权内自审、修复、提交、PR、合并。验证深度随改动影响决定。已发现 [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/.github/workflows/offline-tests.yml) 对单独样式修改也默认准备 Python 并跑整套 Node 和 Edge；[#31 的一次失败](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/99d79d773059ba146e2f6ca33559fb313cef5e14/docs/iterations/2026-11-17-source-evidence.md)来自旧按钮白名单。可顺手按影响调整，保留真正依赖提取器的路径，复用同一版本适用的 CI 结果。常规进展合并汇报，阶段交付说明用户能做什么、依据及未验证项。

**Must Fix**　已复现的未发送操作占据恢复位置已修复，不再列为未开始。下一轮优先解决材料前提、学习者条件记录与可判／暂缓之间的真实交互缺口。**User Decision Needed**　当前没有待批决定；若需新增实际付费调用、个人录音研究、更改七天保留、大规模用户数据迁移、公开部署或扩展定位，再集中给出具体取舍，其余工作继续。**Future Optional**　整库媒体拆分、引入新的检索基础设施或独立模型复核，可根据实际规模、误判和收益选择；已有批准范围内的轻量优化可自主推进。

[完整 A–F 路线和技术调研](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md) · [既有交付的详细兼容边界](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a5af9a1037df3ceccfec58f0c8f9f354c1edfece/docs/master/HANDOFF.md)
