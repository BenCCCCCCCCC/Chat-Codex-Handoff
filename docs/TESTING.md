# 按改动影响验证

2026-10-20 用户要求减少防御性测试、冗余与不必要的测试次数。后续审核与交接采用以下约定。

- 文档、文案和低风险样式调整：审查差异与必要的页面查看，不为措辞增加自动测试，不跑全量套件。
- 单模块行为：运行受影响的现有测试。新增测试须覆盖真实用户结果、已发现的缺陷或重要数据边界，避免复制实现、锁死内部写法和枚举无实际收益的组合。
- 数据保存、版本关联、请求去重：保留回归；它们保护记录和实际调用费用。
- 浏览器流程：交互、录音或存储改动才运行；优先聚焦路径，完整流程留给跨模块改动与发布批次。
- 检查通过且代码未变，不因整理记录、提交或更新交接再次重跑。失败先定位，只复验修复影响的范围。
- CI 只对相关代码 PR 运行，同一 PR 新提交取消旧运行；纯文档跳过，浏览器与提取器按路径选择。手动 workflow_dispatch 可用于需要的完整回归。

本轮删除了锁定 README 具体措辞的测试，也撤回新增的逐字段 WAV 检查；合成音频由现有真实浏览器解码／回听路径验证，来源和 hash 保留在 fixture 文档。历史防御性用例不一刀切删除，后续修改对应模块时再按实际收益精简。

常用聚焦入口：

```powershell
node study-teachback-app/run-offline-tests.mjs boundaries diagnosis-state-ux-01
node study-teachback-app/run-offline-tests.mjs diagnostic diagnosis-state-ux-01
node study-teachback-app/run-offline-tests.mjs browser-replay diagnosis-state-ux-01
node study-teachback-app/run-offline-tests.mjs node diagnosis-state-ux-01 --recovery-only
node study-teachback-app/run-offline-tests.mjs browser diagnosis-state-ux-01 --recovery-only
node study-teachback-app/run-offline-tests.mjs node diagnosis-state-ux-01 --workspace-only
node study-teachback-app/run-offline-tests.mjs browser diagnosis-state-ux-01 --workspace-only
node study-teachback-app/run-offline-tests.mjs node diagnosis-state-ux-01 --context-only
node study-teachback-app/run-offline-tests.mjs browser diagnosis-state-ux-01 --context-only
node study-teachback-app/run-offline-tests.mjs node diagnosis-state-ux-01 --audio-only
node study-teachback-app/run-offline-tests.mjs browser diagnosis-state-ux-01 --audio-only
```
