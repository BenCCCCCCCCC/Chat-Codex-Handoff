"""Canonicalize local TTS parts and freeze inputs before any model response."""
import array, hashlib, json, math, sys, wave
from pathlib import Path

root = Path(__file__).resolve().parent
parts = Path(sys.argv[1]).resolve()
spec = json.loads((root / 'cases.json').read_text(encoding='utf-8'))
manifest = root / 'manifest.json'
if manifest.exists():
    raise SystemExit('FROZEN_BATCH_EXISTS_REFUSE_OVERWRITE')
output = root / 'audio'
output.mkdir(exist_ok=True)
samples = []
for case in spec['cases']:
    pcm = array.array('h', [0] * 3200)  # 200 ms initial quiet
    for index, part in enumerate(case['parts']):
        if 'pauseMs' in part:
            pcm.extend([0] * (part['pauseMs'] * 16))
            continue
        with wave.open(str(parts / f"{case['id']}-{index}.wav"), 'rb') as w:
            assert (w.getnchannels(), w.getsampwidth(), w.getframerate()) == (1, 2, 16000)
            values = array.array('h', w.readframes(w.getnframes()))
        if sys.byteorder != 'little':
            values.byteswap()
        gain = part.get('gain', 1)
        pcm.extend(round(v * gain) for v in values)
    pcm.extend([0] * 4800)  # 300 ms final quiet; no fabricated speech
    duration = len(pcm) / 16000
    assert 0 < duration <= 45
    audio = output / f"{case['id']}.wav"
    if audio.exists():
        raise SystemExit('AUDIO_EXISTS_REFUSE_OVERWRITE')
    data = pcm.tobytes()
    with wave.open(str(audio), 'wb') as w:
        w.setparams((1, 2, 16000, 0, 'NONE', 'not compressed'))
        w.writeframes(data)
    samples.append({**case, 'file':f"audio/{case['id']}.wav", 'sha256':hashlib.sha256(audio.read_bytes()).hexdigest(), 'duration':duration,
                    'peak':max(abs(v) for v in pcm)/32768, 'rms':math.sqrt(sum((v/32768)**2 for v in pcm)/len(pcm)),
                    'referenceType':'frozen_local_tts_script_not_independent_human_transcript'})
frozen = {'batch':'asr-comparison-2026-11-19','kind':spec['kind'],'voices':[spec['voice'],spec['englishVoice']], 'sampleRate':16000,
          'casesSHA256':hashlib.sha256((root/'cases.json').read_bytes()).hexdigest(), 'cases':samples,
          'humanAudioAudit':False,'liveCallsAtFreeze':0,'paidTTSCalls':0}
manifest.write_text(json.dumps(frozen,ensure_ascii=False,indent=2)+'\n',encoding='utf-8',newline='\n')
print(json.dumps({'samples':len(samples),'totalSeconds':sum(c['duration'] for c in samples),'manifestSHA256':hashlib.sha256(manifest.read_bytes()).hexdigest()}))
