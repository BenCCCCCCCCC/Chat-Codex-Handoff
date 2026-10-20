# HANDOFF — 知而能讲

Updated: 2026-10-21 (Australia/Sydney)
Canonical branch: meta/master-state

先读本分支CURRENT_STATE、产品README、docs/TESTING.md及docs/iterations/2026-10-21-real-material-review.md。对应固定材料、离线输出、许可位于docs/research。产品checkout的docs/master仅指针，不是动态任务；旧ACTIVE_EXCHANGE不恢复限制或预算。

## 本批完成

PR #28已合并（Issue #27关闭）；实现535b873c7fd31c5c6fb9848a2539cd3b55bea74f，合并8634919019c95eefd4ca4d3bfb4a9a06109e7922。
CI39458861900完整Node／Edge PASS，job118752743540；提取器按范围跳过。
本批真实API 0次、费用US$0，无新额度。过去额度全部结束。

1. docs/research/fixtures/real-material-corpus.json固定8段Python／MDN中文教程，未模板化改写。每例包含来源、许可、目标和作者编写的有效／无效题参照及局限；目标不是实际内容诊断，参照不是产品输出或独立评审。材料为编程自学便利样本，非盲测。
2. evaluate-real-material.mjs只导入本机规则，逐例保存完整输入／输出、材料及引擎hash，不导入provider；结果docs/research/real-material-offline.json：覆盖0/8，生成题有效性N/A，学习效果未知。不得把拒绝记作有效题或把参照题数算入覆盖。
3. practice.mjs保存round.review={status:'held',origin:'learner'|'local_check',createdAt}。flagQuestion先由UI flush草稿；answer在held时不创建答案或调用。withdrawFlag只允许用户标记；本机任务与来源／题面不匹配进入local_check，保留选择，不判错且不能撤回绕过。
4. practice-ui保持草稿可改，held时隐藏提交和旧评分／依据，历史结果放在“此前反馈（未复核）”；回顾不改原结果。主动换AI题时从模型历史排除held问题。没有后台复核、自动补题或自动重试；用户撤回标记不代表系统确认题目有效。
5. backup.mjs兼容v1并验证review，搜索标明待复核反馈且可展开定位。损坏本机任务仍不能导入，不因标记跳过原任务／assessment校验。无数据库迁移。
6. 无题页面不归咎用户，返回对话与旧题选择仍可用。普通AI练习仍可能出现语义错题／反馈，未标记时并无自动识别。这是恢复流程改善，不是语义审题准确率提升。
7. 本机source-rules-v1依旧三种窄句式、完整来源等于引文；没有改引擎、CONTENT、TEACH、ASR、模型或路由，未恢复上轮被拒绝的AI生成／评分候选。原词与零长度词回听保持。

## 证据与验证

本地相关Node41/41、既有Edge一条整合路径通过，截图已查看；自审发现held题仍会进入新题历史，修复后仅复验practice.test.mjs 8/8。最终完整回归见上述CI，不为文档或提交重跑本机全套。
收据artifacts/study-teachback/correctness-hygiene-01/node-1792513874677-CBofZw、browser-1792513882984-5z71e9。
材料读取字节SHA256 acbcd9074e06323229af4c144e4db7b88e428faa44b11ba622533b79b6b1c30d；
工程与研究均未写生产账本，SHA256 9f23a117f27c0d279872885bdf074d48cbf369e0beec44480d2644c2b148c67e。历史4笔未结算不变。
材料许可证：Python PSF2，MDN及作者参照CC BY-SA2.5，详见fixture README和PSF-LICENSE.txt；项目其他代码许可未选。

本地F:\Chat-Codex-Handoff\validation-repo同步产品默认分支；canonical仅meta/master-state。
4321现有无provider预览PID15608，本批核对命令和新页面，没有重启；刷新即可载入新客户端。
模型／ASR禁用、无公共部署；下次停止进程前核对完整命令与监听PID。

## 下一步

先做明确的题目／标准审阅或编辑路径，再考虑扩展生成；不要添加大量规则来迎合这8例。
如需模型比较，固定“题是否成立→答案判断”的顺序，包含正确指出缺少条件、猜测回答和错误标准，
另留未参与调试的材料，先提交调用数和预算并获批。当前没有真实API批准，不复用过去额度。
同一助手的参照题复核不是独立人类评价；需真实学习者数据才能评估区分理解、迁移或长期保持。

## 上一轮结果和不变约束

PR26合并3ae43ef3023ecbed2e54138373c355f611cca427，固定12次task-split实验已结束：
预留US$0.042374，估算US$0.00410625，新增未结算0。4次生成＋人工固定题8次评分，
不是对生成题评分。评分6/8，故意无效资金题被判partial／incorrect而非unanswerable；
另有复述和多要求，候选AI生成／评分被拒绝，无/api/understanding路由。
task-split-live.mjs入口不得重跑或改目录绕过。原收据
artifacts/study-teachback/task-split-01/live-quality.json SHA256
4dd6fa677c043b361635af451e0e4fb2f88939a94403dea0cc667d3d89d1ec16。
公开完整响应docs/research/task-split-live.json保持；不追加调用或挑选有利报告。

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


历史快照：[上一轮交接](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/blob/63107f3a69ee75666fe8a2e4590c65e330a2bfa5/docs/master/HANDOFF.md)。
