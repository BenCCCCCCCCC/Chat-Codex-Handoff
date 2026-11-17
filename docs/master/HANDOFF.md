# 知而能讲 · Codex 工作交接

继续完善面向个人学习与作品展示的 Windows 本地产品。学生带自己的材料，用语音或文字讲清概念、核对依据、改正一次理解，下次从同一问题继续。最新基线及收据见[当前状态](CURRENT_STATE.md)。

## 本轮交付（2026-11-18）

[PR #38](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/38) 已合并至产品分支，基线 `7fddda1`。可判条件可进入新练习，题目保存当时条件与精确报告引用。再次作答明确新增记录，同样文字也重新判断；发送内容不含旧回答或旧判语。未知请求保留原快照，仅明确重试才请求。首次条件出题暂缓可恢复到该状态。

每次作答记录已提供条件、此前答案／可用反馈、本次及此前应用参考入口与额外参考自报（默认未知）。打开旧反馈不会回写先前作答证据；修订题继承已记录参考入口。条件／题面问题暂停判断，学习者填写自己的核对说明后保留原题或建立修订题；原题、原答、先前反馈只读保留并排除为答错依据。返回原反馈、搜索、材料组合归档及备份保持关联。含条件练习的备份用 v3 防止旧应用忽略前提，本版兼容 v1/v2；未改保留政策。

[Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 的离线交付完成：[协议、4 份材料／14 个案例和评审模板](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/research/quality-baseline-2026-11-18/PROTOCOL.md)。完整历史结果已恢复，不再列为“尚待恢复”。确认 spans 相同但报告诊断粒度不同；保留两份，不称第二次为重试。原件在本机 ignored `artifacts/study-teachback/phase3b-recovery-20261118/private/`，GitHub 仅发布哈希和恢复结论。首次原件推送被自动审批拒绝，已从公开提交移除；不要自动重试上传原件。

## 当前优先级

| 方向 | 下一步能改善的真实学习动作 |
|---|---|
| 学习闭环体验 | 条件新题、再次作答与参考证据已交付。继续沿真实使用走查条件说明、材料组合与历史比较的可理解性；旧记录不补造参考证据，应用入口展开和自报均不能推断独立完成。 |
| 反馈质量 | 离线样本已齐，先审查条件分组、等义回答、目标内遗漏与合理质疑。选择者自查不是独立语义验证；模型还可能把相关内容误分到无关组。真实比较须先获得服务和预算，再冻结运行清单；失败和不同输出全部保留，不追加调用挑结果。 |
| 可用性与架构 | 沿实际录音／上传、Windows 启动、备份和到期日走查修复；长材料与媒体增长时按已测瓶颈调整读取／存储，不提前引入整库迁移或检索基础设施。 |

现有无密钥入口、已知未发送不占恢复位置、真正未知请求保留、材料组合各自草稿、历史精确反馈引用继续作为边界。题目质疑后的修订题、再次作答和原题历史已存在，不重做一套平行流程。

## 实施与验证

自主实现、自审、提交、推送及合并；使用按风险验证，遵循 docs/TESTING.md。本轮 CI 实现头 `5207ee1133c05e44b56f31b8d308d8e43924b71e`，完整 205/205 Node、72/72 Edge，见 CURRENT_STATE；本机定向 24 项逻辑测试与 1 条 Edge 集成路径通过，完整回归由最终 CI 一次承担。没有真实 API 调用，生产账本未变。原数据库只读副本恢复不经过应用到期清理，不改变七天保留政策。

**User Decision Needed**　当前没有必需的产品决定。新增实际付费调用、个人录音研究、原始学习记录外传、更改七天保留、大规模迁移、公开部署或扩展定位时，集中提出具体方案和取舍。公开仓库授权不自动等同于公开私人浏览器学习原件。

**Future Optional**　独立模型复核、完整长材料拆分、整库媒体优化、转写迁移。按证据与可用预算决定，不因为工程测试通过就声称学习增益。

[本轮实现与真实验证](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/prototype/study-teachback-v0.1/docs/iterations/2026-11-18-conditional-practice.md) · [既有交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/e9bf19a53e7058c79eaaca6a19993bb056a942a4/docs/master/HANDOFF.md) · [完整路线](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/bc2dffe4da05ecc1bb23499f452a0bd51b580768/docs/master/HANDOFF.md)
