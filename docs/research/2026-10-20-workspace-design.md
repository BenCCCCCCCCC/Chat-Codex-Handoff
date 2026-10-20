# 学习工作台：设计研究与实施选择

用户最新指示：功能与界面都还粗糙，允许自主决定方向，先学习现有网页、功能设计与技能。本轮优先改善可见、可体验的学习闭环；Issue #3 基线研究保留并暂后移，不扩展多源诊断能力。

| 一手资料 | 学到什么 | 本轮采用 |
| --- | --- | --- |
| [RemNote AI Tutor](https://help.remnote.com/en/articles/10103884-ai-tutor-chat)、[公开页面](https://www.remnote.com/feature/ai-flashcards) | 辅导依附当前材料；具体界面说明用途 | 材料与对话并列，示例直接呈现流程。观察了公开首屏，未登录验证模型 |
| [Readwise Reader](https://readwise.io/read)、[阅读与笔记](https://docs.readwise.io/reader/docs/faqs/highlights-tags-notes) | 阅读主体与辅助区有主次，重视键盘操作 | 稳定工作区、有限阅读宽度、可折叠材料；不引入完整知识库 |
| [NN/g 渐进披露](https://www.nngroup.com/articles/progressive-disclosure/) | 常用动作可见，次要选项有清楚入口 | 材料优先；学习目标／已有理解折叠；反馈先结论、证据按需展开 |
| [frontend-design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | 明确产品特征、字体层级和 token，再用截图审视实现 | 从“读材料 → 讲出来 → 回到证据”形成结构 |

技能仅作公开设计参考，未安装或执行第三方代码。复用现有 Edge 回归，不引入新框架。Creative Production 素材生成工作流本轮不适用，不生成装饰图片。

## 设计计划

选择冷白学习桌面、蓝色墨水和轻量目录导航。原来的整页米色、绿色大框和同等卡片弱化主次；以导航／内容／辅助三个层次组织。

色彩：纸面 `#ffffff`、桌面 `#f4f6fb`、正文 `#202b45`、次要文字 `#63708a`、墨蓝 `#315bc8`、边界 `#dfe5f0`。状态色只用于反馈与录音。

字体：中文微软雅黑、苹方，英文 Segoe UI。正文 16–17px，主标题 30–42px，辅助 13–14px；字号使用 rem，限制阅读行宽。

```text
导航        当前页面／阶段
新建学习    简短介绍 + 示例入口
学习记录    材料输入 → 可选设置 → 开始学习
示例体验
学习时      原材料 | 对话与问题
讲解后      原声与文字 | 结论、证据、下一步
```

移动端导航收为顶栏，内容单列；原生文件选择器首屏可达。阶段提示描述状态，不伪装成导航。示例独立，不调用 API、不写个人记录；固定反馈明确标注，不评价任意用户输入。

不做图谱、总掌握分数或付费模型实验。验证集中在新入口、示例和受影响的浏览器交互；文档更新不触发重复全量验证。
