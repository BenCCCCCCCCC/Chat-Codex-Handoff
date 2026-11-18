# 产品审查与下一阶段依据 · 2026-11-19

MASTER 审查。产品基线 `7fddda1ae2472bafec6c7845fbf7c65a0f896266`，上轮 MASTER `05dcd0b71c17496ec3d5688802e2e383bbac6726`。本文件保存证据与判断；当前执行入口是 [HANDOFF](../HANDOFF.md)。

## 结论

核心功能推进明显：材料组合、条件反馈、条件练习和历史版本已经接通。当前最有价值的工作是让学生在补充材料、提出疑问、修正表达时自然接着学。现有实现对记录保存和引用关系考虑充分，使用流程仍要求学生理解材料组合、主动整理条件并多次切换上下文。

成熟方向是“围绕一个学习问题持续工作，依据和版本在需要时可追溯”。当前无需用更多新面板证明产品完整性；应把已经具备的能力组织成稳定、容易理解的学习过程。模型语义质量和实际学习收益仍缺证据。

## 本轮检查了什么

- 核对远端产品／MASTER、#35–38 合并变化、实现记录和最新 CI；审查材料、条件、录音、持久化及模型适配代码。
- 在隔离 profile 运行最新产品，无 AI 配置；实际走完粘贴、文字讲解、增补材料、保存条件、切换组合、刷新及历史查看。审阅 1440×1000 桌面与 390×844 窄屏截图。
- 本轮路径没有 POST 请求或页面 JavaScript 异常，未新增真实模型调用。没有重新跑全量套件，复用已有版本适用的 CI。
- Windows 实机麦克风、Explorer 鼠标启动、真实模型新输出未在本轮验证；代码推导与真实界面复现以下分开标明。

## 最近交付

| 交付 | 已实现与证据 | 本轮评估 |
|---|---|---|
| [#35](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/35) | 无 AI 学习入口、恢复、文字入口与窄屏顺序改进。 | 本轮实际看到文字输入直接可用，保存文字有明确状态，新情境显示需配置 AI。旧入口问题已改善。 |
| [#36](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/36) | 同主题多材料，各组合保存对话、讲解、练习和草稿；疑点记录及来源引用。 | 材料能添加，两个组合的讲解经刷新和历史均可恢复；续学连续性仍不足。 |
| [#37](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/37) | 本次最多三项条件，按条件反馈与局部暂缓，原条件和报告快照保留。 | 已有结构化约束；跨组合使用条件存在实际缺陷。模型正确划分相关范围仍未验证。 |
| [#38](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/38) | 条件练习、同文重答、未知请求显式重试、参考入口记录、题面修订、v3 备份。 | [CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/44142007284) 在 `5207ee1` 通过 205 Node／72 Edge。本机采用 24 Node／1 Edge 定向检查，最终 CI 集中完整回归，比例已改善。 |

## Must Fix 1：保存成功的条件没有可采用入口

**真实 UI 复现**：

1. 保存 A“循环队列课件”：数组长度 8，预留一个空位时最多保存 7 个元素；写一次文字讲解。
2. 添加 B“补充笔记”：另记 count、不预留空位时最多保存 8 个元素，仍只选 A。
3. 查看 B 并引用原句，保存疑问“这个题采用预留空位还是另记 count？”及条件“本次采用另记 count 的实现，容量是 8。”。
4. 条件记录成功显示，但 A 讲解的适用条件选择器没有任何选项。
5. 改用 A+B，重新保存一次文字讲解；条件选择器仍没有选项。刷新后记录仍在，现象仍在。

**代码原因**：[material-set.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/material-set.mjs) 接受主题中任一材料引句，却把疑点绑定到当前组合 ID；[judgement-ui.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/judgement-ui.mjs) 先按组合 ID 过滤，再静默丢弃不能通过引句检查的项。A 缺 B 引句，A+B 的 ID 又不同。

**完成应看到**：用户能知道该条件适用的来源，并能直接继续到有效任务；已保存的受影响记录有接续办法。仅要求重新填写或隐藏入口不能解决现有工作中断。具体采用来源版本、任务关联还是局部调整由 Codex 决定。

## Must Fix 2：补充材料使学习过程断开

**真实 UI 观察**：切到 A+B 后原讲解面板消失，新组合要求重新开始；原 A 讲解保留在其他组合中。历史显示两次讲解，刷新正常，未观察到数据丢失。

**代码依据**：`selectMaterials` 归档整个学习上下文，新组合初始化空目标、空消息和空讲解。材料组合目前同时承担依据版本与学习工作区职责。

**产品结果**：补一段笔记时，可承接正在解决的问题、当前表达和目标；随后新分析使用更新依据。原讲解、旧反馈及其当时来源保持可追溯。不能为继续学习直接改写旧报告的材料快照。

这是本轮最值得做的底层迭代：逐步区分主题的学习意图、材料版本、本次任务上下文与报告证据。没有必要预设全量重构或数据库迁移。

## UI、可用性与日常使用

**已看到的改善**：桌面有一致的导航、主色、表单和操作样式；配置提示折叠后不再占据主要流程。窄屏粘贴区顶端约 y=462，文字讲解可直接输入；本次 390px 页面无横向溢出。保存、刷新、历史返回均可用。

**当前摩擦**：

- 条件工作分散于材料集、原文、疑点编辑、条件选取和反馈。学生需要先认识问题，再整理引文和假设，再找到采用入口。应把相关依据和当前可做动作放在任务附近，高级历史在需要时展开。
- 窄屏初始提交按钮约 y=1095，位于文件入口及其他内容后；这是主动作距离的观察，不是单凭首屏外就判为功能缺陷。调整时应同时看输入效率、键盘和持续操作，而非机械压缩所有区域。
- 历史卡片有活动时间和计数，但缺清楚的实际到期日。当前是创建／恢复日起七天，到期会删除，继续学习并不延期。宜直接呈现剩余时间和备份入口；保留政策本身不在本轮擅改范围。

**代码审查发现、待目标环境验证**：录音遇页面隐藏或麦克风中断会标记 interrupted；`processAudio` 将所有中断归为声音证据不足，保留原声但要求重录。正常录音停止自动进入处理，上传音频则等显式转写；无 AI 已知未发送在录音路径仍可能归为 PARTIAL。见 [app.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/app.mjs)。下一批应让可用片段、文字续接和服务状态有合理恢复路径；实际麦克风行为留给 Windows 目标机器走查。

启动器已有身份检查和环境说明；[产品 README](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/README.md) 仍明确 Explorer 双击和可见控制台操作未验证。优先完成一次真实日常启动—学习—关闭—再开流程，按发现处理，避免扩成无边界平台测试。

## 完整材料与架构方向

当前可添加、选择材料，每份和组合均受 5,000 字限制，总量最多 12 份；没有对已保存材料重命名、修订和移除的完整入口。长文件虽可提取预览，持久化仍只保留选段，后续学习另一段需要重新导入。相关实现见 [material-set.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/material-set.mjs) 和 [material-set-ui.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/material-set-ui.mjs)。

完善方向是材料管理、提取正文与来源定位、当前发送范围各自清楚：用户能修正文档、换章节继续，并知道本次依据。优先复用已有提取和定位模块，合理保留成本边界；不靠一味放大文本上限解决。媒体读取或存储拆分依据实际数据量和测得成本安排。

## 官方能力更新与转写维护

2026-11-19 重查官方 [Deprecations](https://developers.openai.com/api/docs/deprecations) 与 [File transcription](https://developers.openai.com/api/docs/guides/speech-to-text)：`whisper-1` 关闭日期为 **2027-02-26**，完成文件转写推荐 `gpt-transcribe`；官方文档将 `timestamp_granularities[]` 限于 `whisper-1`，新接口支持 `keywords`／`languages` 等上下文提示。

当前 [provider.mjs](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/study-teachback-app/provider.mjs) 固定使用 whisper、verbose_json 和词／段时间；`core.normalizeASR` 要求 segments，账本也固定模型及费率。因此迁移包含结果能力、回听定位、模型和计费适配，不能只改模型名。

离线适配现在可以准备；真实中文课程质量、时延和费用需要经授权的比较。存在新接口是官方支持，产品接入是否可用及质量是否更好仍待实测。将此任务从 Future Optional 调整为有日期的维护工作。

## AI 价值和验证方向

Issue #3 的 4 份材料／14 个受控案例均围绕循环队列，适合验证条件逻辑，不能代表课程覆盖。明确条件、引文存在、结构化暂缓能约束输出形式，但用户自查与格式检查不能证明语义准确。

复用 [既有协议](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/7fddda1ae2472bafec6c7845fbf7c65a0f896266/docs/research/quality-baseline-2026-11-18/PROTOCOL.md) 和完整历史原件，加入能区分产品能力的其他课程场景；先关注无依据判错、等义回答、前提错误、合理质疑和优先补学项。协议允许调用前缩小样本与重复次数；84 个输出不是进入下一批开发的固定门槛。新实际调用需给出服务、样本、成本与预算，离线开发继续推进。

产品进度用用户能完成的学习动作和可核对的改进描述：能否自然续学、能否知道下一步、反馈是否有用、再次作答能否展示具体变化。回访和练习有证据时再谈学习收益；不直接生成缺乏依据的“掌握度”。

## 后续交接

本轮三项优先决定：先修条件可用性与材料续学；同步改善相邻界面；将后续日常可用性、完整材料和有日期的转写维护纳入既有产品路线。详细实现留给 Codex 判断。

GitHub 沿用 `docs/iterations/` 保存实施及运行结论，MASTER 链接准确版本、已解决／未解决／未验证和下一步。无需每个小提交独立报告，不为报告再次运行测试。用户以产品决策为主，Chat 和 Codex 负责具体交接及持续推进。

### 本轮执行入口回执

规划已发布于 MASTER `21c8f104aa0de7a7669df016fde704c1de9ff15d`。当前任务另记 [Issue #39](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/39)，状态 Ready，供可用 Codex 领取。

Chat 在隔离工作副本尝试官方 `codex exec --sandbox workspace-write`，初始化返回 `Read-only file system (os error 30)`；采用官方 ephemeral 模式也未初始化成功。官方 `codex cloud list` 返回 401 认证失效。没有执行任务 ID、实现改动或模型运行回执；未修改凭据或全局环境规避限制。此限制不代表用户原有 Windows Codex 不可用。现有 Codex 可直接读最新 MASTER 与 Issue 接续，本批实现不以修复 Chat 的 CLI 为前提。
