Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.SetOutputToWaveFile("$PSScriptRoot\speaker_sample.wav")
$synth.Speak("This is a sample of my voice. It is used to clone the voice for the presentation.")
$synth.Dispose()
Write-Host "Audio generated at $PSScriptRoot\speaker_sample.wav"
