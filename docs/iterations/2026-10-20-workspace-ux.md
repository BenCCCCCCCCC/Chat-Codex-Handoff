# 2026-10-20 学习工作台与独立示例

本批由用户“功能与界面仍粗糙，先学习现有设计，再自主推进”的新指示驱动。起点为公开整理合并提交 `0b0c9477023171da82440b0ebe13496906946efc`。实现分支 `codex/learning-workspace-ux`；问题记录 [Issue #4](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/4)。最终 PR、CI 与合并提交见该 Issue 和 `meta/master-state`。

## 学习与取舍

阅读 RemNote、Readwise Reader 的产品与帮助资料、NN/g 渐进披露文章以及公开 frontend-design skill，观察 RemNote 公开首屏。来源、具体借鉴和局限见[设计记录](../research/2026-10-20-workspace-design.md)。没有登录竞品使用模型，没有安装第三方 skill 或复制其产品代码。

选定“材料 → 理解 → 讲解 → 回到证据”的工作台结构：冷白桌面、蓝色强调、明确阅读宽度与字号层级。主路径可见，次要设置和证据按需展开。采用现有原生 HTML/CSS/JS，不增加运行时依赖。

## 改动

- 首页：桌面侧栏、小屏顶部导航、阶段提示、材料入口与示例入口。学习重点和已有理解可选并默认折叠。
- 学习：材料与对话并列；提问建议只填入空草稿并聚焦，已有草稿保留，不自动发请求。
- 讲解反馈：核对文字与内容反馈分列；按状态组织结论，材料与原话在原生 details 中展开。排序仍使用原始 finding 索引关联定位与回听，不改变诊断结果。
- 导航：新建学习复用已有操作约束，清理旧录音／反馈视图；示例入口同样尊重进行中的录音、请求和保存失败。
- `/demo`：独立模块、两套预编写材料、两种讲解对比、可展开证据与情境练习。显著标注固定示例；不调用 API、访问个人数据库或使用麦克风。
- README 增加新界面截图、示例入口与设计依据。
- CI 的浏览器范围匹配覆盖所有入口 HTML，避免以后只修改 `demo.html` 时漏掉页面检查。

## 验证

本地一次 Edge 回归 **55/55 通过**。保留已有 53 个流程检查，仅增加两类有价值行为：草稿建议与阶段同步、完整双主题示例及数据／请求隔离；在已有反馈检查中验证证据可展开。没有为样式 token 或文案增加测试。

命令：`node study-teachback-app/run-offline-tests.mjs browser diagnosis-state-ux-01`。

本地证据位于 ignored 目录 `artifacts/study-teachback/diagnosis-state-ux-01/browser-1792490079309-MqyYvq/`：

- `browser-1792490079490.json`、`receipt.json`、`tests.log`；
- 首屏、学习区、反馈、390／320px 小屏、200% 文字放大与示例截图；
- 出站请求为 0，控制台错误为 0；合成媒体，没有物理麦克风或真实模型调用；
- 生产账本前后 hash 相同：`1d6a29631982daf6cd540622f2dabee3d2c48b24dbda8a8879dbb2ca7b215a21`。

已人工查看首页、学习区、真实反馈布局和示例桌面／移动截图。四个改动 JS 模块 `node --check` 与 `git diff --check` 通过。Node 全套交给 PR 的干净检出 CI；本地不重复全量运行，文件提取实现未改不单独重跑。由于调整了 CI 选择规则，本次云端按原有工作流约定跑全套，后续仅修改示例 HTML 能正确触发浏览器检查。CI 结果以 PR 检查为准，不把计划写成通过。

首次 [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39405066544) 的 Node 152/154 通过；两条失败分别绑定旧 HTML 整段结构、已移除的 `surface-raised` 颜色变量。删除重复的整段 HTML／静态 API 文本断言，相关名称和零请求行为仍由现有浏览器与 B3 行为用例覆盖。颜色检查改用当前实际 token；输入框边界加深，粘贴框统一使用控件边界，placeholder 使用正文辅助色。保留对比度阈值，局部 UI 检查 3/3 通过。后续 Node 计数为 153；未为此再次本地跑全量。

示例是设计演示，不是模型准确率或学习效果实测。原有单份 5,000 字材料、API 配置、数据保留与模型机制保持既有约定。

## 继续工作

本批优先处理可见体验，未取消 [Issue #3](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/3) 的基线比较研究。接手先读最新 canonical CURRENT_STATE／HANDOFF，再决定下个完整批次；不要因更新文档重复已通过的套件。

没有新增付费模型实验预算。下一步仍可离线整理同输入比较协议和受控案例，真实比较须明确服务与预算。当前未部署公共网站；`/demo` 是本地服务中的独立页面。
