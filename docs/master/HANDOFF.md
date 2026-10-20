# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支CURRENT_STATE、产品README、docs/TESTING.md、
docs/iterations/2026-10-21-task-split.md及对应research固定方案／完整JSON。
旧ACTIVE_EXCHANGE不恢复旧限制或预算。

## 本批交付

[PR #26](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/pull/26)已合并，
[Issue #25](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/issues/25)关闭。
实现头b9a0bcace1da82ae78639221c71b27142f6c8193，合并3ae43ef3023ecbed2e54138373c355f611cca427。
[CI39455216922](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/actions/runs/39455216922)完整Node／Edge PASS，job118740183143，提取器按范围跳过。
首轮CI39454682126：Node171/171、新检验浏览器流程通过；旧失败恢复断言仍查找“上次出题”，与精简文案不匹配，恢复该前缀后继续CI。没有跳过失败检查。

- app.mjs反馈页保留f.message，repair只在折叠证据内；不直接用repair当题。当前有效报告的“检验理解”传入绑定来源／确认文字／报告的target，历史报告无操作入口。补学／重讲仍折叠。
- understanding-task.mjs.taskContext创建绑定快照；bounded-understanding.mjs只对整段来源等于引文的有限规则生成一道选择题和参考判断：必要前提、两个不同原料正整数克数且明确按份数倍增、三个不同动作顺序。其他说明、不识别句式、unknown返回无题，不调用API兜底。它不是通用语义解析，也不验证上游诊断。
- practice.mjs.fromFeedback在本机计算，保存task／taskTarget／origin，不复用旧repair题；新选择在本机核对，同题同选择复用结果。旧轮次继续可读。practice-ui先显示假设／题目，答后才展开依据；无题时还能选择唯一旧题。搜索打开旧题解除taskUnavailable，索引选择文字而不是c0等ID。
- backup.mjs随v1导出，并重算规则核对task及assessment，旧练习备份仍可读。未增加数据库版本或独立持久化体系。
- 只对本题选择给判断，不推导掌握分或理解能力。开放情境练习仍使用原API，和本机规则分开。规则覆盖率尚未验证；实验顺序全文有第二句说明，不能误称本机支持全部四个实验案例。
- 没有新/api/understanding路由；server只新增两个本机模块静态路径。候选AI提示／schema仅研究保留，不得接回产品并声称已通过。CONTENT、TEACH、ASR、模型均未变。PR24零长度词邻近回听继续有效。

## 固定真实实验已完成，候选被拒绝

用户批准最高US$0.10：4条来源各生成一次＋4个人工固定题目各两答案评分，共12次。
第二阶段评分的是人工题目，不是第一阶段生成题。新增估算US$0.00410625，
累计预留US$0.042374，新增未结算0；历史4笔未结算保留。不是最终账单。
无ASR、个人录音、重试、充值、追加调参。额度及余量不延续。

生成：必要条件改变推理方向有效；配方换3份却扩成甲乙两个必答量；
步骤与原因题仍重复已解释的错误。所有结构／引文校验通过仍不能保证任务有效。
评分6/8；故意不成立的资金题两答案都应unanswerable，却判partial／incorrect。
正确指出材料不足的用户被减分，显示评分器服从错误任务标准；不能按其他分数抵消此问题。
按预先标准拒绝AI出题／评分投入产品；随后本机有限替代没有真实API或效果比较。

固定文件：task-split-fixtures.mjs、fixtures/task-split-config.json、
understanding-task-prompts.mjs。task-split-live.mjs --approved-budget-usd=0.10已执行，
不得重跑或更改目录／ID绕过。原收据ignored artifacts/study-teachback/task-split-01/live-quality.json，
SHA256 4dd6fa677c043b361635af451e0e4fb2f88939a94403dea0cc667d3d89d1ec16。
docs/research/task-split-live.json保留原全部输入／输出／配置／费用，并附编码代理逐例复核，
无独立人类盲评、额外裁判或总体学习收益结论。

## 验证与环境

本地相关Node39/39、原有Edge一条整合流程通过，手机／桌面截图已查看；
后续唯一旧题选择修复由CI覆盖。不为文档或提交再跑本机全套。
初次Node有沙箱回环限制及新fixture缺字段，浏览器旧断言误要求提交后空选择仍启用，均已修正。
本地收据artifacts/study-teachback/correctness-hygiene-01/
node-1792512106959-wC48bG、browser-1792512202597-AmejUG。
虚构凭据、loopback、独立账本；生产账本未变。
获批实验后SHA256 9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e。

本地F:\Chat-Codex-Handoff\validation-repo最终同步产品默认分支；canonical只看meta/master-state，
不要读旧本地meta工作树当权威。本批核对PID24324命令／监听后重启4321无provider预览，
现PID15608；模型和ASR禁用，用户刷新后载入新静态客户端。无公共部署。
下次停止／重启先核对完整命令和监听PID；常规npm start／4317。

## 下一轮建议与不变约束

先用未见的实际学习材料测覆盖率、模板是否仍照抄纠正解释和误解析。
可考虑可编辑人工题／标准，或将题目有效性先独立判定；不要直接恢复本轮AI评分，
不要继续只靠加长repair提示。新真实实验先提交方案预算，不能沿用本轮余量。
也可研究自愿自然讲解的人工文字／少量词边界、数字和领域术语；不调停顿阈值。

旧实验均已结束：PR24理解检验12次估算US$0.0062383、预留US$0.0495065，
来源外“其他升级要求”使CONTENT候选被拒绝，原收据SHA256
4f0ee76950be02ca554f93faf378a4838ec9def3f00d53b7dbd7ab4ecb4b59a7。
PR21/22术语12次估算US$0.0093652，原收据a1c0718fa6be2cc5486d468abae2c7d3cc4bac5ac99a4ac757ece97107d56292；
当时接受CONTENT仍在生产。PR19自然语音11次US$0.0080848，原收据
cb7aaf601c70b3ec2edf3f6387b192c01b78103c75c60cd19e1c8a63dbfd5876。
更早14次US$0.0066592、9次US$0.004224与所有失败证据保留，不重写或挑选报告。

用户授权自主实现／自审／push／PR／merge，按批次交接，减少冗余测试。
上传3分钟／25MiB，术语8项／24字每项／总80字；材料5000字；contextNote1000字，
最近六条整消息24k输入上界；原记录／恢复副本各七天，128MB v1备份。
强制关闭未落盘、跨标签页协调、服务端持久去重未解决，未知结果显式重试可能再计费。
语音仍Whisper→校对→Luna分析确认文字，过程独立。Phase3B仅有界可行性PASS；
两份同文字但不同结果的历史报告均保留，直接请求归因未知，不把第二份称重试。
Issue #3多源研究：2–4份为受控样本非产品上限；影响当前诊断的冲突需裁决，其余可见不阻塞；
角色可改，优先级须有来源／目标依据，完整约束见CURRENT_STATE。
无总体掌握分、不宣称课程收益。许可证未选；公开语音单独CC BY4.0。

历史快照：[本轮之前交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/a85897239c466fd446992211ef702c991a331b8e/docs/master/HANDOFF.md)。
