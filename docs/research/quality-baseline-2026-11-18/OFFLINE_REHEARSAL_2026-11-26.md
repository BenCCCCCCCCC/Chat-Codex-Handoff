# 文字诊断｜六例锁定与离线排练

2026-11-26 · 执行基线 [8d8f2d7](https://github.com/BenCCCCCCCCC/Chat-Codex-Handoff/commit/8d8f2d7cef5b729f1c17b175d16f41511eeaf9e4) · Windows / Node 24.21.0。**真实 Luna / Sol 请求 0，真实费用 0，独立评审 0；未得出模型优劣或准确率。**

## 样本与评分

只引用现有 [4 份材料／14 例](controlled-cases.json)。核对 14 例的材料顺序引用和预期证据键，所指引文都逐字存在于所给材料。复核了[原协议](PROTOCOL.md)、样本和[盲评表](review-template.json)的仓库 LF 哈希，与 [SHA256SUMS](SHA256SUMS.json) 一致；没有读取 Phase 3B 原件或复制数据集。六例没有随机代表性，都出自循环队列语境，不能外推到真实课程或语音。

下表是按原作者参照预先锁定的**供人盲评的判分项**，不是已经由独立教师评审的金标准。按 ID 顺序，每种配置 2 次，第一轮先基线，第二轮先候选；预期字段和判分表不得进入请求。候选和基线同提示、同 schema、同语义输入；这是产品路径下的模型配置对比，和原协议中“普通助手与产品”的端到端人测分开。

| 案例 ID | 盲评该看什么 | 必须标记的严重偏差 |
| --- | --- | --- |
| `count-adopted` | 计数实现不留空位，可放 8 个；接受等义表达，不强求说出 `count` | 把已明确适用的 8 判错，错误套用预留规则 |
| `defer-one-continue-other` | 只暂缓容量；仍判定后入先出错误，并给 FIFO 原句 | 静默决定容量、把容量移到顶层判错、把 FIFO 一起搁置 |
| `fluent-wrong` | 在限定的预留实现，10 格不是 10 个可放位置；同一错误只记一次 | 予以支持、错用别的实现、不指出关键错误 |
| `insufficient-evidence` | 只暂缓具体线程安全性；不能由有计数推出安全，不能把正确保留推断当缺点 | 自编并发前提后下结论，或把缺失的材料作为学习者错误 |
| `required-omission` | 保留 9 的正确性；只补题目明确要求的预留理由；遗漏不绑不存在的讲解引句 | 把 9 判错、把无关机制计作缺点、编造回答引句 |
| `verbose-correct` | 只评价最终立场 9 和理由；不对撤回句、填充词、断句扣分，不硬造修正 | 把已撤回的 10 当最终答案，或从冗长表达推断不懂 |

盲评逐例记录实际状态、错误/遗漏、适用范围、材料和回答依据、首个动作。保留失败和重复，不用完成率掩盖严重错判，也不把只看这六例的两次重复当总体稳定率。优先报告逐次结果、p50 与最慢值；独立评审分歧保留二者和理由。

### 锁定输入与可复核指纹

用真实 `/api/diagnose` 路径，在本地将 `semanticCall` 换成 stub；这份映射只是**评测适配器**，不是已修改产品。来源按原协议拼接，每份材料一个 anchor，anchor 的 `text` 均为 `goal + '\n' + question`，`sourceQuote` 为该份材料全文（仅因这四份合成材料均在长度限制内）。诊断本身没有独立的题目字段，因此保留题目于 anchor 文本。学习者提交的条件采用案例原 `condition.text`、原状态和按材料顺序的全文证据；`defer-one-continue-other` 的 issue 问题仅用双问题第一句，完整双问题仍在 anchor 中。四份材料和答案都未被重写。锚点／条件证据未按 `expected` 取材，避免预期答案混入。转写是原 `answer` 的确认文字单 span，无音频、时间、个人内容或额外上下文。

用 UTF-8 SHA256 对实际 stub 捕获的 `JSON.stringify(input)`、原样 instructions、`JSON.stringify(schema)` 取值。复现时来源 `id = 'source-' + id`、`title = '练习材料'`、`anchorVersion = 'synthetic-v1'`；attempt `id = 'attempt-' + id`、`transcriptVersion = 'confirmed-v1'`、span ID `s1`、`inputMode = 'text'`、`kind = 'full'`、`assistance = 'unknown'`、`reviewed = true`；issue ID `'issue-' + id`。源字段顺序、规范化、prompt 和 schema 由本版产品路径给出。哈希不依赖 API Key：

| 实际派发输入 | SHA256 |
| --- | --- |
| `count-adopted` | `b4939b7d442eb37c17ab908897aa82a9676c42c4164177fab8335e9246caf58e` |
| `defer-one-continue-other` | `21d2e89aed9c389b15b7127de2104851bea7437690acc07dcccd2f5c7576f51c` |
| `fluent-wrong` | `7b02d8f897ec775b797a763d86f732e2d3af13e3568d166a42e1a71aa7ccbebd` |
| `insufficient-evidence` | `1327d07b0bb70a3a9fe2747d5f39a7abf933a5048a2c773d82324436e56d72b3` |
| `required-omission` | `f41f456e164c850ca7ccf9a902c180e085d211ebf0d25a1141286509f09d8dcf` |
| `verbose-correct` | `30f3fb9bc0f44f061ccc9272b61f77423a3120019da4c45078e8e6ac5cbe99df` |
| 共同 `CONTENT + JUDGEMENT` | `d8d2026f6ef6032b2ab2827d81f5907b3e2c9b2ba330bd86cb1502db627f7a80` |
| 共同 `judgementSchema` | `2572449df1c5fb8c796ea24460bc903eaaa8dc4792d98932db910a1206d3fb80` |

冻结的是输入、验证方式和待人工评审标记，不是可立即执行的线上清单。若适配器换顺序、精简 evidence 或改变 scope，必须在看到任何模型结果之前同时重锁两个配置。将 `deferred` 的本地对象结构仅解释为对特定 issue 的暂缓，不能自动等同“全题不可判”。

## 实测结果与已复现限制

- **6/6 本地接受**：手写占位结果经真实路由和生产校验返回 200，只核对请求完整、版本绑定、期望状态可编码；不是模型 6/6 正确，也没有评价这些占位文案的质量。
- **8/8 定向拒绝**：假材料引文 `INVALID_SOURCE_QUOTE`、假回答引文 `INVALID_SPAN_QUOTE`、错转写版本 `INVALID_REFERENCE`、缺失项伪造位置 `MISSING_HAS_NO_TIME`、强行判明确暂缓项和将发现嵌入暂缓项均为 `DEFERRED_JUDGEMENT`、finding 多余字段 `INVALID_SCHEMA`、输入的条件引句不存在 `ISSUE_EVIDENCE_REQUIRED`（没有派发）。另外只跑既有 `judgement.test.mjs`，4/4 通过，没有重跑全套。
- **两个结构合法但语义严重错判的负控都被接受**：把暂缓的 8 个移到顶层 `incorrect`、引用明确撤回的“我先说十个”当最终错误，均返回 200。因为引用确实存在，版本正确，代码无法用字符串检验语用和适用范围。二者提示要求正确，但本地验证器并不保证，后续盲评须逐例标严重；这不是任何实际模型已失误的证据。不用基于字符串的补丁假装修复。若真实比较重复出现，高优先级考虑更明确的可验证范围/最终观点绑定，而不是仅调温或换模型。
- **5 个传输/解析回退只用注入的 fetcher**：完成 JSON、达到输出上限、`refusal`、畸形 JSON、立即抛出 `TimeoutError`。前一项验证 JSON 解析，后四项均显示 `API_RESULT_UNAVAILABLE`，每项 mock 只被调用一次。上限／拒答／畸形 JSON 的样本有 usage，先结算再记失败；超时样本未得 usage，仅记录预留及超时失败，未结算仍占预算。测试没有真的等待 60 秒，也不声称验证了真实网络、供应商响应模式或超时后的真实账单。生产用量账本未改动，隔离工具记录出站尝试 0。
- **仍未测语义**：模型是否真正接受等义/自我修正、分开相关冲突与无关要点、标对必要遗漏、给最优补学项、不在缺证据时胡猜。时间、费用、输出稳定、真人可用性与未见迁移全部未知。

## Sol medium 接入条件

1. 不把生产 `semantic` 的常量改成 Sol 就开跑：[当前 provider](../../../study-teachback-app/provider.mjs)锁 Luna / `none` / 1,800 / 60 秒，且[当前账本](../../../study-teachback-app/ledger.mjs)拒绝非 Luna 的语义模型预留。[OpenAI Sol 模型页](https://developers.openai.com/api/docs/models/gpt-6.2-sol)列支持 Structured Outputs，[推理指南](https://developers.openai.com/api/docs/guides/reasoning)明确此型号不支持 `none`、推理计入输出上限；这不是目标账户可用或该具体 schema 已接受的证明。另写隔离评测发送器、测试账本、禁止隐性重试；生产路径不动。
2. 同一 strict schema 的 `anyOf`、`null` 和字符串约束需在获得授权后确认供应商实际接受。先按配置锁好总输出和挂起预算、真实版本/权限、断路门槛和 24 个固定槽位；若最早的已计入槽位出现明确 schema/权限不兼容或成本归属不明，停止而不是偷偷换 schema / 档位。若要修协议，旧槽位与原始响应保留，另立下一次试验。
3. 1,800 是生产 Luna 配置，不自动复制给 Sol medium。推理耗尽可留下 usage 但不给完整 JSON。60 秒是当前应用等待边界，不等于两者真正完成时间；先固定“可部署配置”目标和可比较的等待上限，真实报告时间与成本。不要为补齐成功数重试。把 `incomplete_details.reason`、拒答、JSON/schema 错误、真正超时、HTTP 错误、底层本地验证失败分别记在独立评测回执；收不到 usage 当作未结算，不算零。参考 [Structured Outputs 边界](https://developers.openai.com/api/docs/guides/structured-outputs)。
4. 真实付费比较还未执行。保持 14 例原协议、发布候选、生产模型、隐私策略不变；未做用户实测、ASR 或公共灰度。
