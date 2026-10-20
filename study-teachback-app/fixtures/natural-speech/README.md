# Public Mandarin speech fixtures

These three clips were selected **before ASR requests**, for Mandarin numbers/dates,
mixed Latin terms, and elicited conversational speech. No user's recording is included.
All are licensed **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**.
Attribution and source references below apply to these audio fixtures and quoted dataset
references, not a new license for this repository.

| Local file | Creator / source | Reference provenance |
| --- | --- | --- |
| fleurs-32.wav | Google, [FLEURS](https://huggingface.co/datasets/google/fleurs), cmn_hans_cn/test, row 32, id 1725, `10558410879827163654.wav` | Written reading script; actual read deviations not manually verified |
| fleurs-276.wav | Google, FLEURS, cmn_hans_cn/test, row 276, id 1883, `10048525650290665384.wav` | Written reading script; no human word alignment |
| minds-28.wav | PolyAI, [MInDS-14](https://huggingface.co/datasets/PolyAI/minds14), zh-CN/train, row 28, `zh-CN~BALANCE/60351efd4c449c80694dc260.wav` | Google ASR text, **not human ground truth** |

FLEURS revision: `70bb2e84b976b7e960aa89f1c648e09c59f894dd`. Reading references
come from its `data/cmn_hans_cn/test.tsv`; originals from `audio/test.tar.gz`.
MInDS viewer asset revision: `40ce77cb32a384e4d50a568e1ec39ac804019d33`.
The [MInDS paper](https://arxiv.org/abs/2104.08524) describes intent-conditioned
crowd recordings, including Chinese collected online with Phonic. This is elicited
speech, not unrestricted everyday conversation. Its reference text is automatic.

Changes: original WAVs decoded and converted with the product's `prepareAudio`
(Edge / Web Audio, mono PCM16 at 16 kHz), without trimming, denoising or text
correction. The exact Edge version is not recorded; the frozen hashes below identify
the actual converted bytes. Original hashes:

- fleurs-32: `8dd8d4bc2caa032ce793c228a70d4b1333c41f293abe0c2b38b180ba47a11c31`
- fleurs-276: `aeb95366f4907daf8797d66797c87f6e002f10704e78e87a0c4b4521756a1616`
- minds-28: `aae9615be9dec1c982604cef6c19e1ba6d7429e2540f9dc06e4c9d862dabf625`

Converted hashes, references, durations and predeclared critical aliases are in
`../../natural-speech-fixtures.mjs`. Case/space differences and explicitly listed
number forms count as a lexical match; this does not verify their semantic role.
Strict character differences remain separately reported. No timing accuracy claim
is possible without independently annotated word boundaries.
