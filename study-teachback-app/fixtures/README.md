# 可分发的工程音频

`synthetic-mandarin-v2.wav` 是已有 Windows `Microsoft Huihui Desktop` 语音合成的测试材料，没有录制真人。生成入口为 `../synthetic-speech.ps1`；正文为“只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。”

- PCM，16 kHz，16 bit，单声道，7.31 秒，233,966 字节。
- SHA-256：`7e291bc01d614dfb34068ab3d2d9f4d1217f329ba14b6e4fdb7cea919aba6206`。
- 本次从原 ignored runtime 按字节复制，不重新合成、不重跑 ASR。
- 配套历史转写：`artifacts/study-teachback/build-01r2/SYNTHETIC_ASR_FIELDS.json`。
- 用于媒体解码、真实播放器进度、回听范围与持久化回归；不证明自然语音识别准确率或学习效果。

浏览器回归现在从此处读取，新的克隆不再依赖开发者未提交的 runtime 音频。不要把个人录音加入此目录。
