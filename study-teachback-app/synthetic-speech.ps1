# Engineering fixture only. Uses an already-installed Windows voice, not a person or a downloaded recording.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $synth.SelectVoice('Microsoft Huihui Desktop')
  $format = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
  $outputPath = Join-Path $PSScriptRoot 'runtime/synthetic-mandarin-v2.wav'
  if (Test-Path -LiteralPath $outputPath) { throw 'Fixture exists; refuse overwrite' }
  $synth.SetOutputToWaveFile($outputPath, $format)
  $synth.Speak('只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。')
  $synth.SetOutputToNull()
  [pscustomobject]@{ Kind='SYNTHETIC_ENGINEERING_AUDIO'; Voice='Microsoft Huihui Desktop'; Culture='zh-CN'; PersonRecorded=$false; Downloaded=$false } | ConvertTo-Json
} finally { $synth.Dispose() }
