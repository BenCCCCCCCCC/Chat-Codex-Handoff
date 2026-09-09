# DIRECTION-DEEPENING-01 — Chat替代性门槛、AI委派练习与真实软件教练

日期：2026-09-10
角色：00 MASTER
状态：RESEARCH / NO BUILD AUTHORIZATION

## 1. 最新用户要求

用户认可继续深化“操作型学习”和“共同任务沟通”，但要求把“为什么不能直接用Chat完成”作为核心产品门槛，也允许继续寻找更合适的新方向。

本轮结论：普通出题、苏格拉底追问、角色扮演、复盘、保存历史、图文卡片均不能支撑独立产品；Chat/Skill/Plugin本身已覆盖大量能力。独立软件的必要性必须来自**模型外部的状态、动作、验证、信息隔离或设备/网站交互**。并且“需要软件”不等于“必须独立安装App”：当前ChatGPT Plugins/Apps可承载交互UI、工具和外部动作，可能就是更合适的产品形态。

PRODUCT-CORE-01继续暂停；不恢复旧验收App、事项App或通用AI导师。没有Codex开发授权。

## 2. Chat替代性门槛

一个候选方向若同时满足以下条件中的0–1项，默认先做Skill/提示模板，不开发独立产品：

1. 只需要模型生成/解释/追问；
2. 所有必要信息都可以安全地放进同一个对话上下文；
3. 成功与否主要由同一个模型主观打分；
4. 用户没有需要实际操作的对象；
5. 不需要固定重置、回放、跨题迁移或可靠事件记录。

值得开发插件/交互应用的必要性信号：

- **Hidden state**：有目标、答案、角色信息或规则不能暴露给协作者模型；
- **Executable environment**：用户/AI必须实际改变一个外部对象，而非只声称“已完成”；
- **Deterministic/independent checks**：至少部分结果可由模型外引擎核对；
- **Replay/reset**：同一状态能重放、分支，或换等价任务检查迁移；
- **Attribution**：能区分用户遗漏、模型理解错误、工具执行失败、题目本身错误；
- **Live context/device access**：需要真实网站、应用、传感器或文件状态，而不是用户反复截图/描述。

即使满足，也先问：这些能力能否以ChatGPT Plugin/App UI或站点工具实现？只有需要独立分发、低延迟语音、离线/本地隐私、跨宿主连续使用、特殊设备能力或Chat平台覆盖不足时，才优先独立App。

## 3. 平台事实：Chat已经不是纯文本框

2026当前资料：ChatGPT Plugins可以包含Skills、Apps和App templates；Apps可连接外部数据/actions并提供交互UI。官方Apps/Plugins文档明确列出interactive cards/maps等体验，Developer/MCP Apps可有interactive UI和write/modify动作；具体可用性受plan/region/workspace限制。

ChatGPT Desktop的site tools使用WebMCP，可在提供工具的网站中读取/修改；built-in browser/Work还可以执行更广泛网页任务。不要靠“Chat看不到网页/不能操作”来造差异。

OpenAI Certified插件已经提供角色化AI能力课程、hands-on exercises、assessment和progress tracking；College Student plugin可围绕课程材料生成互动练习。Google Chrome Skills也能保存/复用提示词。因此“学习提示工程”“把prompt变成按钮”也不是新产品空白。

## 4. 方向A（优先）：AI Delegation Gym / Brief-to-Execution Lab

工作名，不是品牌。它是v5“共同任务沟通”的更具体、2026更相关版本：**训练普通用户从‘问AI问题’过渡到‘把一个多步骤任务可靠地委派给AI’。**

### 用户/场景

候选用户：已经会基础聊天，但开始希望AI执行多步骤任务的人；他们不一定是经理或程序员。场景是“我需要把目标、限制、先后、资料和停止条件说明给AI，然后判断结果是否真的满足任务”。

可用于学习/工作/生活的同一机制：安排一组任务、组织一个小流程、根据若干约束形成一个计划、把一套资料转换成规定结构。首版不执行真实邮箱/订单/支付/生产系统。

真正痛点假设不是“不会写高级prompt”，而是：
- 不知道哪些背景/约束必须交代；
- 看到流畅输出却不知道该验证什么；
- AI做错后只会整段重来；
- 不知道问题来自自己没说、模型理解错还是工具执行错。

发生频率、付费、迁移到真实任务的效果仍未知。

### 产品机制

1. 用户看到完整Mission Card；协作者模型只收到明确允许的共享材料和用户brief，后台目标/答案不进入该模型上下文。
2. 协作者拥有有限工具，对一个可见的流程/安排/资源板进行真实结构化操作。
3. 引擎执行合法动作、记录事件，依据预先固定的检查条件验证结果；模型不能改成功条件。
4. 结果页面拆分：未传达的条件 / 已传达但模型忽略或误解 / 工具执行失败 / 未能确定归因。
5. 用户从一个具体遗漏处重写brief并重新运行；随后换一份结构相似、内容不同的held-out任务，看是否能减少相同遗漏。
6. 不给“沟通能力72分”或“prompt等级”；只对可观测的条件、提示依赖和行动结果报告事实。

### 为什么普通Chat不够

同一Chat能模拟角色并反问，但如果完整目标、参考答案和评分标准都在同一模型上下文中，无法可靠证明协作者没有‘偷看答案’。Chat也可以声称自己执行了安排，但没有外部状态引擎时，结果与评分可能由同一生成模型自洽地改写。

Skill若能调用独立工具/状态服务，则它已经变成该产品的一部分。因此正确对比不是“App vs Chat文本”，而是：
- Chat + 好prompt；
- Chat + 同等Skill/tools；
- 候选封装是否显著减少设置、泄露和判断成本。

### 产品形态

优先考虑**ChatGPT Plugin/App + 交互工作区**，而非先做独立原生App：Chat负责自然语言，插件后端保存private target/state，UI展示共享板，tools执行受限动作。这样既保留Chat熟悉入口，又增加Chat单靠语言做不到的环境能力。

独立Web/App只在插件能力/计划覆盖、分发、实时语音或本地隐私成为实证障碍时再选。

### MVP

- 一种流程/安排board；
- 8–12个原创任务，含训练集与未见变体；
- 文本输入、一个协作者；
- 5–8种合法动作；
- private mission checker、事件日志、一次局部重试；
- 不做真实第三方动作、语音、3D、多人、账号付费系统或无限AI生成任务。

### 可实现层

模型：理解brief、选择澄清问题和受限动作。
规则/engine：目标、可见性、动作合法性、状态变化、显式条件检查、reset/replay。
人：主观/现实迁移与任务定义校准。

重点测试leakage、action/result绑定、clear/underspecified/contradictory/system-error对照和模型错误归因。不能故意降低模型能力制造训练价值。

### 竞争/先例与创新边界

- CoDraw早已使用信息不对称+对话+动作重建；不是新机制。
- ROPE研究训练prompt novice通过requirement defect反馈与counterfactual输出改进要求表达；不是我们首次发现“需求表达可训练”。
- OpenAI Certified/Claude Academy已有AI fluency、delegation/discernment训练和hands-on exercises。
- PyCon 2026 AI Factory是通过真实LLM调用/预算/guardrails做游戏化AI学习的公开先例。
- PromptFluent已有prompt debugger/response ranker/real-world practice。

候选差异只能暂时表述为：**面向普通轻用户的、结果可执行且归因可检查的委派微型环境**；不是prompt课程、不是企业证书、不是纯模拟聊天。独特性/需求/效果尚未验证。

## 5. 方向B（降级但保留）：真实软件“Coach Mode”

将v5“操作型学习”从自建Excel沙盒改为：**在真实或高保真软件界面中，AI观察用户当前状态，分步提示但不替用户完成，完成后让用户在新任务独立做一次。**

### 用户/场景

学习一个近期真的要用的软件功能的人，例如设置筛选、构建某类页面、完成一个网页流程。目标是会自己做，而不是让Agent代办。

### 为什么Chat不够

没有页面/应用状态时，Chat只能给静态步骤；UI更新或用户走错后需要反复截图解释。若有site tools/browser integration，AI可读取上下文并检查进度。因此这也是工具型产品，而不是聊天提示。

### 但为什么不优先

这一类竞争极强：WalkMe、Whatfix、Pendo都已有实时/上下文in-app guidance、walkthrough、training和analytics；Whatfix Mirror明确做安全交互式软件模拟训练。ToughTongue也已把browser工具用于软件/CRM training和guided onboarding。当前ChatGPT site tools/Work、Gemini browser automation也快速逼近。

因此通用“AI软件教练”替代性依然高。只有找到一个大型DAP不适合的个人细分（低配置、跨个人工具、按个人任务临时生成且尊重‘不要代办’模式）并有真实痛点，才继续。否则应复用/集成现有平台。

### MVP若未来继续

单一自有/允许测试站点、一个流程、Coach vs Show-me模式、事件/状态检查、一次无提示复练；不碰真实敏感账户。不做“支持所有网站”的浏览器扩展。

## 6. 新的合并视角：Hands-on Learning是机制，不一定是产品类别

v5的操作型学习可以成为A/B的共同学习机制：
- 在A中，用户通过让AI实际执行来学会委派与验证；
- 在B中，用户通过自己实际执行来学会软件操作。

两者真正的软件必要性都来自**环境状态+动作+结果**，不是AI讲解。因此不再单独立“万能学习App”。

## 7. 当前优先级与下一步

优先级：A AI Delegation Gym > B real-software Coach Mode > generic tutor/roleplay（停止独立立项）。

下一步仍是研究，不开发：为A写一个完整但synthetic的mission protocol和Chat+Skill强基线，明确private target、model payload、tools、engine conditions、error attribution与held-out variant；再判断是否值得一个极小runtime实验。

一个实验只有在以下问题都有可验证方案时才进入开发：
1. 可以证明协作者模型没有收到hidden target；
2. engine能独立记录/检查动作，而不是同模型自评；
3. 用户遗漏与模型错误不会被混淆；
4. 同等Chat+Skill baseline不能用更少设置达到相同体验；
5. 至少存在一个合理重复使用理由，而不仅是一次谜题。

若第4项失败，产品形态应退化成Skill/Plugin模板；若1–3失败，停止训练效果主张；若5失败，可视为互动游戏原型而非实用学习产品。

## 8. 来源与证据级别（2026-09-10）

Primary/current platform:
- https://help.openai.com/en/articles/20001256/ — Plugins: skills/apps/templates, plan/workspace限制。
- https://help.openai.com/en/articles/11487775-apps-in-chatgpt — apps可有interactive UI、search/actions。
- https://help.openai.com/en/articles/20001423-using-site-tools-in-the-chatgpt-desktop-app — WebMCP site tools。
- https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt — Work cloud browser。
- https://openai.com/business/plugins/openai-certified/ — applied AI fluency/hands-on assessment。
- https://academy.openai.com/public/clubs/higher-education-05x4z/blogs/college-student-plugin-interactive-study-materials — course-source interactive practice。
- https://blog.google/products-and-platforms/products/chrome/skills-in-chrome/ — 2026 Chrome saved/remixed AI skills。

Mechanism/competition:
- https://github.com/facebookresearch/CoDraw — archived mechanism precedent, CC BY-NC4.0; no dataset reuse.
- https://doi.org/10.1145/3731756 — ROPE requirement-driven LLM-use training study.
- https://pycon.de/archive/2026/talks/escape-the-hype-teaching-llm-concepts-through-an-interactive-ai-factory-game/ — AI Factory educational game description; not locally run.
- https://play.google.com/store/apps/details?id=com.blueinstinct.promptfluent — PromptFluent developer listing; not efficacy proof.
- https://academy.claude.com/courses/ai-fluency-for-small-businesses and https://academy.claude.com/tutorials/the-ai-fluency-index — delegation/discernment framework and exercises.
- https://support.walkme.com/knowledge-base/walkme-ai-guide/ and https://www.walkme.com/in-app-guidance/ — current contextual guidance.
- https://support.whatfix.com/docs/what-can-i-do-with-whatfix and https://support.whatfix.com/ — current DAP/Mirror claims.
- https://www.pendo.io/product/in-app-guides/ — contextual/branching in-app guides.

All capability statements are source-level; no competitor runtime benchmark, target user interview or new model execution happened this turn. Vendor efficacy/ROI claims are not adopted.

## State

Completed: Chat substitution gate, platform/form-factor analysis, A/B deepening, new delegation-gym synthesis, direct counterevidence.
Verified: current public capability claims and prior P0 evidence at their original level only.
Likely: A has a stronger reason for software beyond pure chat because private target/action state/independent checks are central; this is an engineering necessity, not demand proof.
Unknown: user need/frequency, real transfer, baseline advantage, model reliability, plugin coverage, cost/privacy and willingness to pay.
Not Done: mechanism runtime experiment, independent user observation, plugin/app implementation, competitive use test or commercialization.
Must Fix: never say Chat is text-only, roleplay=skill improvement, hidden prompt=secure isolation, or app form=innovation.
User Decision Needed: none for research; model/runtime/development/spending/publication/participant contact gates remain.
Future Optional: standalone native app, real voice, live websites, old acceptance/workspace products; inactive.
