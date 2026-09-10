Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
try { $synth.GetInstalledVoices() | ForEach-Object { [pscustomobject]@{ Name = $_.VoiceInfo.Name; Culture = $_.VoiceInfo.Culture.Name; Enabled = $_.Enabled } } | ConvertTo-Json } finally { $synth.Dispose() }
