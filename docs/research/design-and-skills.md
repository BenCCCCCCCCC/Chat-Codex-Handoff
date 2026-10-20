# 设计、评测与技能资料

2026-10-20。按实际任务选择资料，不整包安装、执行或复制第三方技能。资料不会覆盖用户决定。

| 资料 | 重点 | 本项目用法 |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | 先明确场景、排版和颜色，再用截图审视；文案说明动作 | 内容优先、克制装饰，沿用 CSS token，无需引入 React |
| [Anthropic webapp-testing](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md) | 在真实渲染状态中识别控件，检查交互、截图和日志 | 沿用 Edge/CDP runner，借鉴方法，暂不新增 Playwright |
| [OpenAI Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | 任务相关评测、边界案例、人工校准指标 | 分开验证软件状态、模型输出、学习效果；本地数据集不依赖托管 Evals 产品 |
| [W3C 状态消息](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | 状态变化应能被辅助技术感知 | 验证状态文字、禁用态、结果焦点与 reduced-motion；不宣称完整 WCAG 认证 |
| [RemNote AI 卡片生成](https://help.remnote.com/en/articles/10102901-generating-flashcards-with-ai) | 选择材料后配置并审视生成内容 | 自动标题与小文件自动填入减少负担，转写仍由用户确认 |
| [Anki 学习说明](https://docs.ankiweb.net/manual/studying) | 回忆、答案、复习步骤明确 | 先保留无提示尝试，再展示反馈；暂不引入 SRS |

## 可按需使用的环境技能

- **OpenAI Docs**：本轮核对官方评测资料；模型、API、定价需查当前官方来源。
- **Computer Use／浏览器工具**：GitHub 设置与界面观察；回归优先用项目测试。
- **creative-production:produce**：后续系统性视觉探索时使用。
- **figma-use / figma-generate-design**：需要明确 Figma 交付时使用。
- **skill-creator**：审核流程经过几轮验证后，再考虑封装专用技能。

外部技能仅收集来源和用途，尚未安装；未复制第三方代码或素材。后续复用源码先检查许可证。

## 界面原则与审核流程

初始页面只要求材料；录音、核对、诊断、结果状态明确；结论先行，证据按需；内容理解与讲话过程分开；编辑立即标记旧结果；失败保留原声与已有结果；小屏、键盘、焦点、200% 文字缩放和减少动态效果纳入回归。

每轮：记录问题与复现 → 选择可验证改进 → 实现并自审 → 相关回归 → PR 记录结论和限制 → 更新批次交接及 canonical 状态。按批次留痕，不记录每条命令。
