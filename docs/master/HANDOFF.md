# 知而能讲 · Codex 工作交接

继续完善面向个人学习与作品展示的 Windows 本地产品。学生带自己的材料，用语音或文字讲清概念、核对依据、改正一次理解，下次从同一问题继续。最新基线及收据见[当前状态](CURRENT_STATE.md)。

## 本轮交付（2026-11-18）

[PR #37](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/37) 已合并至产品分支，基线 `ce86094`。讲解页明确选择相关条件，反馈单列“按条件可判／暂缓本项”，原始材料、回答及旧报告均保留。更换条件使先前报告不再冒充当前结果；恢复同样文字和条件可查看旧结果，不自动重复分析。条件快照随刷新、历史、前后对照和备份恢复。暂缓组拒绝判答 findings，无关部分可继续；条件化反馈没有自动进入尚不携带这些前提的旧题目。

[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 的离线交付完成：[协议、4 份材料／14 个案例和评审模板](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/quality-baseline-2026-11-18/PROTOCOL.md)。完整历史结果已恢复，不再列为“尚待恢复”。确认 spans 相同但报告诊断粒度不同；保留两份，不称第二次为重试。原件在本机 ignored `artifacts/study-teachback/phase3b-recovery-20261118/private/`，GitHub 仅发布哈希和恢复结论。首次原件推送被自动审批拒绝，已从公开提交移除；不要自动重试上传原件。

## 当前优先级

| 方向 | 下一步能改善的真实学习动作 |
|---|---|
| 条件下再次作答与独立证据 | 当前可在原讲解编辑文字再分析；继续让新的题目明确携带已采用的前提，保持原题／原答／旧反馈历史，必要时先复核题面。记录实际参考情况与条件提示，不能从“无提示”标签推断已独立完成。 |
| 反馈质量 | 离线样本已齐，先审查条件分组、等义回答、目标内遗漏与合理质疑。选择者自查不是独立语义验证；模型还可能把相关内容误分到无关组。真实比较须先获得服务和预算，再冻结运行清单；失败和不同输出全部保留，不追加调用挑结果。 |
| 可用性与架构 | 沿实际录音／上传、Windows 启动、备份和到期日走查修复；长材料与媒体增长时按已测瓶颈调整读取／存储，不提前引入整库迁移或检索基础设施。 |

现有无密钥入口、已知未发送不占恢复位置、真正未知请求保留、材料组合各自草稿、历史精确反馈引用继续作为边界。题目质疑后的修订题、再次作答和原题历史已存在，不重做一套平行流程。

## 实施与验证

自主实现、自审、提交、推送及合并；使用按风险验证，遵循 docs/TESTING.md。本轮 CI 实现头 `d638f1f18c3aa95d65d0b5e20b3ac265e850e7c5`，完整 Node／Edge 结果见 CURRENT_STATE；随后仅修正文档文件字节哈希，不重复产品回归。没有真实 API 调用，生产账本未变。原数据库只读副本恢复不经过应用到期清理，不改变七天保留政策。

**User Decision Needed**　当前没有必需的产品决定。新增实际付费调用、个人录音研究、原始学习记录外传、更改七天保留、大规模迁移、公开部署或扩展定位时，集中提出具体方案和取舍。公开仓库授权不自动等同于公开私人浏览器学习原件。

**Future Optional**　独立模型复核、完整长材料拆分、整库媒体优化、转写迁移。按证据与可用预算决定，不因为工程测试通过就声称学习增益。

[本轮实现与真实验证](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-18-conditional-feedback.md) · [既有交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a8b886feb263a5d7dd014cd01640b8fe36781473/docs/master/HANDOFF.md) · [完整路线](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md)
