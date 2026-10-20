# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支CURRENT_STATE、产品README、docs/TESTING.md、
docs/iterations/2026-10-21-terminology-feedback.md和docs/research/2026-10-21-terminology-plan.md。
旧ACTIVE_EXCHANGE不恢复限制或额度。

## 本批离线功能已交付

[PR #21](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/21) 已合并，Issue #20关闭。
实现头 28f5f8cfe19ce44acd74110766af42d7418d2e58，合并 0e01420c161d89bbba5b7e8c4f9407fcc66ca736。
[CI](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39442372344) 完整Node／Edge PASS，提取器按范围跳过，job118695278615。

- transcription-terms.mjs：用户短名称按分隔符去重，最多8项／每项24字／总80字；超限明确提示，不截断。录音准备中的输入默认折叠，按主题通过已有draft saver保存。
- app.mjs：开始录音或选择上传前快照词表到attempt.transcriptionTerms。旧录音显式重试仍使用原快照，新主题词表不改它。录音信息详情展示使用的词表。开始录音前flushDrafts；输入在捕获中禁用。v1备份保留草稿和快照，旧缺省数据兼容。
- server/provider：X-Transcription-Terms百分号编码短字符串，服务端解码校验后交给ASR；provider再次验证规范化数组，空列表沿用原简体提示，原始响应带termHints。没有把教材答案自动塞进提示；contentInput仍仅来源与确认文字，词表不充当内容事实。
- transcript-playback.mjs：含零长度词引文可复用wordPlayback的同段邻近有效边界（邻近跨距≤3秒），组合≤6秒，再加≤0.3秒两端上下文。明确label为quote-context／“原话邻近范围，非精确词时间”。确认文字或边界改动、重复引文、缺映射、无邻近边界仍回退整段，不改原始时间、不编造定位。
- CONTENT：合并同一缺口及相关正确表达；一条建议只安排一个动作，避免复述已给解释；不同领域例子不是评估文本答案。候选当前作为提示更新发布，真实效果尚待比较。schema／模型不变，原报告不截断／改写。
- 页面：词表默认折叠，录音准备时隐藏重复底部下一步栏，删除重复时长文案。

此前功能无需重复实现：上传3分钟／25MiB，选文件先本地保存，显式开始转写；原始字节保留，临时16kHz单声道。contextNote1000字、六条最近完整历史按24k上界裁剪；七天原记录／恢复副本、128MB v1备份。内容与声音过程分开。

## 本轮真实比较尚待批准

用户要求“需要真实API测试时先告诉我方案和预算”。本轮已发异步确认问题，
**没有收到本轮明确批准，没有执行任何真实请求**，费用新增0。
不得沿用过去US$0.15授权，也不能因可用凭据而自行执行。

固定方案：复用CC BY4.0 FLEURS-32和276各两次ASR，总51.96秒；
简体提示 vs 简体＋华硕／Eee PC／IT。第二条故意不含这些名称，检查插词和数字／日期损坏。
四条固定文本各原提示／单动作候选一次。最多12请求，保守预留US$0.13728，硬限US$0.15。
无自动重试、无充值，不按结果增补样本。

配置冻结fixtures/terminology-baseline.json、terminology-candidate.json；输入复用natural-speech-fixtures.mjs前两条音频和四文本。
获明确批准后唯一入口：
node study-teachback-app/terminology-live.mjs --approved-budget-usd=0.15
输出ignored artifacts/study-teachback/terminology-01/live-quality.json，已有输出拒绝覆盖，失败即停；不要换目录或ID绕过。
与生产全局账本同限，逐次保留请求ID、预留、原响应、配置与输入hash。根据结果补公开报告与本批说明，决定内容提示保留或回退，再按批次提交和更新canonical。
如果用户选择离线，仅保留待验证标记；当前报告不能声称识别率／重复建议率已提高。

转写与内容判断分开评价；未人工核实朗读偏差，未独立标注词时间。零长度的邻近回听是体验改进，不是对齐准确率。
4条已知文本不是盲测，保留候选退化，不挑有利输出。

## 已完成的历史实验不重跑

PR19固定11次已全部执行，预留US$0.084016，账本估算US$0.0080848，新增未结算0，不是最终账单。无个人麦克风、充值或重试。docs/research/natural-speech-live.json保留所有输入、输出和复核。
FLEURS严格字符差异3/52、0/37；Eee PC→ePC，及→其。MInDS参考本身为ASR，不报准确率。45/30/44词零长度0/1/4；无人工时间标注。四文本两臂各4/4预期及有效引用，但仍有双追问、复述建议和碎片正确项。
收据ignored artifacts/study-teachback/natural-speech-01/live-quality.json，
SHA256 cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。
更早14次、9次及自我修正误判等全部保留，不重写旧结论。

## 验证和本地环境

本地定向Node28/28、Edge3/3；复用已有案例，新增一个历史真人零长度词引用行为。
首轮CI39442041152 Node159/166，7项因旧录音VM harness缺新依赖提前退出；补齐transcriptionTerms和flushDrafts，原有效录音案例增加快照断言，本地针对性22/22通过；最终完整CI已通过。本机未另跑全套，不因文档／提交变化重复检查。
浏览器测试初次未展开第二个引用详情，修正操作后仅复验回听。桌面术语入口截图已查看；390px由原有流程覆盖。

ignored artifacts/study-teachback/diagnosis-state-ux-01/：
node-1792507226183-v1h8aH、
browser-1792507225270-m6LsXx、
browser-1792507305517-uzKivV、
focused-1792507586060-IA2QH3。
合成凭据／loopback／独立账本；生产账本前后相同，
SHA256 b1c8d360f7849ef165239ae9faa975f1ad1514daeef5f2f3501404aa4a6983a7。

本地F:\Chat-Codex-Handoff\validation-repo在结束时同步产品合并分支。canonical只读最新meta/master-state，旧本地meta worktree不作权威。
4321本聊天无provider预览已重启以加载新模块，PID24324（启动时核对），IAB空白设置页刷新并保留。下次重启先核对完整命令和监听PID。正常npm start／4317，无公共部署。

## 后续约束

用户授权自主实现／自审／push／PR／merge，按批次交接，减少冗余测试。
本轮先等预算答复；更广质量研究需自愿自然语音的人工文本和少量时间标注、数字角色和领域术语。每一新真实实验另报预算；暂不调停顿检测。

强制关闭未落盘、跨标签页协调、服务端持久请求去重未解决。
Phase3B仅有界可行性PASS，两份相同文字但不同结果历史报告都保留，直接请求归因未知；不得把第二份叫重试或挑较好结果。
Issue #3同输入多源研究保留；影响当前诊断的冲突需裁决，其余可见不阻塞；2–4份为受控样本非产品上限；来源角色可改，优先级有来源／目标依据。完整研究约束见CURRENT_STATE。
不加总体掌握分，不宣称课程收益。仓库许可证未选，公开语音仅有单独CC BY4.0许可。

历史链：[PR #19 后交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/711bf614296d34f4afbe502587ca16f086d08ccf/docs/master/HANDOFF.md)。
