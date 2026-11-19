# Local installed TTS only. No microphone, network, downloaded voice or paid TTS.
param([Parameter(Mandatory=$true)][string]$OutputDirectory)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Speech
$spec=Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $PSScriptRoot 'cases.json') | ConvertFrom-Json
$null=New-Item -ItemType Directory -Force -Path $OutputDirectory
$synth=New-Object System.Speech.Synthesis.SpeechSynthesizer
try {
  $synth.Rate=$spec.rate
  $format=New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(16000,[System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen,[System.Speech.AudioFormat.AudioChannel]::Mono)
  foreach($sample in $spec.cases){
    for($i=0;$i -lt $sample.parts.Count;$i++){
      $part=$sample.parts[$i]
      if(-not $part.text){continue}
      $destination=Join-Path $OutputDirectory ($sample.id+'-'+$i+'.wav')
      if(Test-Path -LiteralPath $destination){throw 'SYNTHETIC_PART_EXISTS_REFUSE_OVERWRITE'}
      $voice=if($part.english){$spec.englishVoice}else{$spec.voice}
      $synth.SelectVoice($voice)
      $synth.SetOutputToWaveFile($destination,$format)
      $synth.Speak($part.text)
      $synth.SetOutputToNull()
    }
    Write-Output ('Synthesized '+$sample.id)
  }
} finally {$synth.Dispose()}
