[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$script:Passed = 0
$script:Failed = 0
$validOrigin = 'https://chatgpt.com/g/g-p-6a9c78ab008481918661d71361ce5592/c/6a9f3c98-93cc-83ec-8e80-23e4de9e8839'
$alternateOrigin = 'https://chatgpt.com/c/11111111-2222-3333-4444-555555555555'
$powerShell51 = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
$sourceDirectory = $PSScriptRoot
$testRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("handoff-kit-tests-{0}" -f [guid]::NewGuid().ToString('N'))

function Assert-That {
    param([bool] $Condition, [string] $Name, [string] $Detail = '')
    if ($Condition) {
        $script:Passed++
        Write-Output "PASS: $Name"
    }
    else {
        $script:Failed++
        Write-Output "FAIL: $Name $Detail"
    }
}

function Quote-Argument {
    param([string] $Value)
    return '"' + $Value.Replace('"', '\"') + '"'
}

function Invoke-PS51 {
    param(
        [string] $FilePath,
        [string[]] $Arguments,
        [string] $WorkingDirectory,
        [string] $TempDirectory
    )

    $argumentText = '-NoProfile -ExecutionPolicy Bypass -File ' + (Quote-Argument $FilePath)
    foreach ($argument in $Arguments) {
        $argumentText += ' ' + (Quote-Argument $argument)
    }

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $powerShell51
    $startInfo.Arguments = $argumentText
    $startInfo.WorkingDirectory = $WorkingDirectory
    $startInfo.UseShellExecute = $false
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true
    $startInfo.EnvironmentVariables['TEMP'] = $TempDirectory
    $startInfo.EnvironmentVariables['TMP'] = $TempDirectory

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    [void] $process.Start()
    $stdout = $process.StandardOutput.ReadToEnd()
    $stderr = $process.StandardError.ReadToEnd()
    $process.WaitForExit()

    [pscustomobject]@{
        ExitCode = $process.ExitCode
        Stdout   = $stdout
        Stderr   = $stderr
    }
}

function New-TestRepository {
    $path = Join-Path $testRoot ([guid]::NewGuid().ToString('N'))
    [void] (New-Item -ItemType Directory -Path $path)
    & git init --quiet $path
    if ($LASTEXITCODE -ne 0) { throw 'Unable to create test Git repository.' }
    Copy-Item -LiteralPath $sourceDirectory -Destination (Join-Path $path 'handoff-kit') -Recurse
    [void] (New-Item -ItemType Directory -Path (Join-Path $path 'temp'))
    return $path
}

function Invoke-Configure {
    param([string] $Repository, [string] $Origin, [switch] $Rebind)
    $configureArguments = @('-OriginChat', $Origin)
    if ($Rebind) {
        $configureArguments += '-Rebind'
    }
    Invoke-PS51 -FilePath (Join-Path $Repository 'handoff-kit\configure.ps1') `
        -Arguments $configureArguments -WorkingDirectory $Repository -TempDirectory (Join-Path $Repository 'temp')
}

function Write-Utf8Text {
    param([string] $Path, [string] $Text)
    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($Path, $Text, $encoding)
}

function Write-ValidMetadata {
    param([string] $Repository, [object] $PacketPath, [string] $MetadataRepository = $Repository)
    $metadata = [ordered]@{
        session_id             = 'test-session'
        turn_id                = 'test-turn'
        cwd                    = $MetadataRepository
        hook_event_name        = 'Stop'
        delivery_packet_path   = $PacketPath
        delivery_packet_status = 'CAPTURED'
    } | ConvertTo-Json
    Write-Utf8Text -Path (Join-Path $Repository 'temp\chat-codex-t06-session.json') -Text $metadata
}

function Invoke-Handoff {
    param([string] $Repository, [switch] $CopyOnly)
    $clipboardPath = Join-Path $Repository 'temp\clipboard.txt'
    $browserPath = Join-Path $Repository 'temp\browser.txt'
    Remove-Item -LiteralPath $clipboardPath, $browserPath -Force -ErrorAction SilentlyContinue
    $result = Invoke-PS51 -FilePath (Join-Path $Repository 'handoff-kit\test-wrapper.ps1') `
        -Arguments @((Join-Path $Repository 'handoff-kit\handoff.ps1'), $clipboardPath, $browserPath, [string][bool]$CopyOnly) `
        -WorkingDirectory $Repository -TempDirectory (Join-Path $Repository 'temp')
    $result | Add-Member -NotePropertyName ClipboardPath -NotePropertyValue $clipboardPath
    $result | Add-Member -NotePropertyName BrowserPath -NotePropertyValue $browserPath
    return $result
}

function Assert-FailedWithoutSideEffects {
    param([psobject] $Result, [string] $Name)
    $safe = ($Result.ExitCode -ne 0) -and
        -not (Test-Path -LiteralPath $Result.ClipboardPath) -and
        -not (Test-Path -LiteralPath $Result.BrowserPath)
    Assert-That $safe $Name ("exit={0}; stderr={1}" -f $Result.ExitCode, $Result.Stderr.Trim())
}

[void] (New-Item -ItemType Directory -Path $testRoot)
try {
    $wrapper = @'
param($HandoffPath, $ClipboardCapture, $BrowserCapture, $CopyOnly)
function Set-Clipboard {
    param([Parameter(Mandatory = $true)][string] $Value)
    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($ClipboardCapture, $Value, $encoding)
}
function Start-Process {
    param([Parameter(Mandatory = $true)][string] $FilePath)
    $encoding = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($BrowserCapture, $FilePath, $encoding)
}
if ($CopyOnly -eq 'True') { & $HandoffPath -CopyOnly }
else { & $HandoffPath }
$handoffExitCode = $LASTEXITCODE
if ($null -eq $handoffExitCode) { $handoffExitCode = 0 }
exit $handoffExitCode
'@

    foreach ($scriptFile in Get-ChildItem -LiteralPath $sourceDirectory -Filter '*.ps1') {
        $tokens = $null
        $errors = $null
        [void] [System.Management.Automation.Language.Parser]::ParseFile($scriptFile.FullName, [ref] $tokens, [ref] $errors)
        Assert-That ($errors.Count -eq 0) "PowerShell 5.1 parse: $($scriptFile.Name)" ($errors | Out-String)
    }
    Assert-That ($PSVersionTable.PSVersion.Major -eq 5 -and $PSVersionTable.PSVersion.Minor -eq 1) 'Suite runs under Windows PowerShell 5.1' $PSVersionTable.PSVersion.ToString()

    $repo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $repo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    $configured = Invoke-Configure -Repository $repo -Origin $validOrigin
    Assert-That ($configured.ExitCode -eq 0) 'Configure accepts valid HTTPS chatgpt.com conversation URL' $configured.Stderr
    $bindingPath = Join-Path $repo '.git\handoff-kit\origin-chat.json'
    Assert-That (Test-Path -LiteralPath $bindingPath -PathType Leaf) 'Binding persists under the repository Git directory'

    $packetText = "Line one`r`nLine two with Unicode: Ω`n"
    $packetPath = Join-Path $repo 'temp\packet.md'
    Write-Utf8Text -Path $packetPath -Text $packetText
    Write-ValidMetadata -Repository $repo -PacketPath $packetPath
    $handoff = Invoke-Handoff -Repository $repo
    Assert-That ($handoff.ExitCode -eq 0) 'Handoff succeeds in a brand-new PowerShell 5.1 process' $handoff.Stderr
    Assert-That ([System.IO.File]::ReadAllText($handoff.ClipboardPath) -ceq $packetText) 'Clipboard content exactly matches packet text'
    Assert-That ([System.IO.File]::ReadAllText($handoff.BrowserPath) -ceq $validOrigin) 'Correct persisted origin Chat target is opened'

    $handoffAst = [scriptblock]::Create([System.IO.File]::ReadAllText((Join-Path $sourceDirectory 'handoff.ps1'))).Ast
    Assert-That ($handoffAst.ParamBlock.Parameters.Count -eq 1 -and $handoffAst.ParamBlock.Parameters[0].Name.VariablePath.UserPath -eq 'CopyOnly') 'Only optional CopyOnly parameter; no required target/packet parameters'
    $copy = Invoke-Handoff $repo -CopyOnly
    Assert-That ($copy.ExitCode -eq 0 -and [IO.File]::ReadAllText($copy.ClipboardPath) -ceq $packetText) 'CopyOnly preserves exact packet'
    Assert-That (-not(Test-Path $copy.BrowserPath)) 'CopyOnly makes zero open requests'
    Assert-That ($copy.Stdout -like '*No (explicit CopyOnly)*') 'CopyOnly output identifies skipped navigation'
    $handoffSource = [System.IO.File]::ReadAllText((Join-Path $sourceDirectory 'handoff.ps1'))
    Assert-That (-not [regex]::IsMatch($handoffSource, 'SendKeys|UIAutomation|keybd_event|SendWait', 'IgnoreCase')) 'Product contains no automatic paste or send mechanism'

    foreach ($invalid in @(
        @{ Name = 'Configure rejects HTTP URL'; Value = 'http://chatgpt.com/c/abc' },
        @{ Name = 'Configure rejects wrong host'; Value = 'https://example.com/c/abc' },
        @{ Name = 'Configure rejects non-conversation path'; Value = 'https://chatgpt.com/' },
        @{ Name = 'Configure rejects malformed URL'; Value = 'not a URL' }
    )) {
        $invalidRepo = New-TestRepository
        $invalidResult = Invoke-Configure -Repository $invalidRepo -Origin $invalid.Value
        Assert-That ($invalidResult.ExitCode -ne 0) $invalid.Name $invalidResult.Stderr
    }

    $conflictRepo = New-TestRepository
    $firstBinding = Invoke-Configure -Repository $conflictRepo -Origin $validOrigin
    $beforeConflict = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json'))
    $conflict = Invoke-Configure -Repository $conflictRepo -Origin $alternateOrigin
    $afterConflict = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json'))
    Assert-That (($firstBinding.ExitCode -eq 0) -and ($conflict.ExitCode -ne 0) -and ($beforeConflict -ceq $afterConflict)) 'Different existing binding is not silently overwritten' $conflict.Stderr

    $validRebind = Invoke-Configure -Repository $conflictRepo -Origin $alternateOrigin -Rebind
    $reboundBinding = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json')) | ConvertFrom-Json
    Assert-That (($validRebind.ExitCode -eq 0) -and ($reboundBinding.origin_chat -ceq $alternateOrigin)) 'Valid explicit rebind replaces the old target' $validRebind.Stderr

    $beforeInvalidRebind = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json'))
    $invalidRebind = Invoke-Configure -Repository $conflictRepo -Origin 'https://evil.example/c/abc' -Rebind
    $afterInvalidRebind = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json'))
    Assert-That (($invalidRebind.ExitCode -ne 0) -and ($beforeInvalidRebind -ceq $afterInvalidRebind)) 'Invalid explicit rebind preserves the old binding' $invalidRebind.Stderr

    $beforeIdempotentConfigure = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json'))
    $idempotentConfigure = Invoke-Configure -Repository $conflictRepo -Origin $alternateOrigin
    $afterIdempotentConfigure = [System.IO.File]::ReadAllText((Join-Path $conflictRepo '.git\handoff-kit\origin-chat.json'))
    Assert-That (($idempotentConfigure.ExitCode -eq 0) -and ($beforeIdempotentConfigure -ceq $afterIdempotentConfigure)) 'Same-target configure remains safe and idempotent' $idempotentConfigure.Stderr

    $missingBindingRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $missingBindingRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    $missingBinding = Invoke-Handoff -Repository $missingBindingRepo
    Assert-FailedWithoutSideEffects $missingBinding 'Handoff fails closed: missing binding'

    $invalidBindingRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $invalidBindingRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (New-Item -ItemType Directory -Path (Join-Path $invalidBindingRepo '.git\handoff-kit'))
    $badBinding = [ordered]@{ version = 1; repository_root = $invalidBindingRepo; origin_chat = 'https://evil.example/c/abc' } | ConvertTo-Json
    Write-Utf8Text -Path (Join-Path $invalidBindingRepo '.git\handoff-kit\origin-chat.json') -Text $badBinding
    Assert-FailedWithoutSideEffects (Invoke-Handoff $invalidBindingRepo) 'Handoff fails closed: invalid persisted URL'

    $missingMetadataRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $missingMetadataRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $missingMetadataRepo $validOrigin)
    Assert-FailedWithoutSideEffects (Invoke-Handoff $missingMetadataRepo) 'Handoff fails closed: missing metadata'

    $malformedMetadataRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $malformedMetadataRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $malformedMetadataRepo $validOrigin)
    Write-Utf8Text -Path (Join-Path $malformedMetadataRepo 'temp\chat-codex-t06-session.json') -Text '{"cwd":'
    Assert-FailedWithoutSideEffects (Invoke-Handoff $malformedMetadataRepo) 'Handoff fails closed: malformed metadata'

    $insufficientRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $insufficientRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $insufficientRepo $validOrigin)
    Write-Utf8Text -Path (Join-Path $insufficientRepo 'temp\chat-codex-t06-session.json') -Text '{}'
    Assert-FailedWithoutSideEffects (Invoke-Handoff $insufficientRepo) 'Handoff fails closed: insufficient metadata'

    $wrongRepo = New-TestRepository
    $otherRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $wrongRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $wrongRepo $validOrigin)
    $wrongPacket = Join-Path $wrongRepo 'temp\packet.md'
    Write-Utf8Text $wrongPacket 'wrong repository packet'
    Write-ValidMetadata -Repository $wrongRepo -PacketPath $wrongPacket -MetadataRepository $otherRepo
    Assert-FailedWithoutSideEffects (Invoke-Handoff $wrongRepo) 'Handoff fails closed: metadata repo mismatch / wrong repo'

    $missingPacketRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $missingPacketRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $missingPacketRepo $validOrigin)
    Write-ValidMetadata -Repository $missingPacketRepo -PacketPath (Join-Path $missingPacketRepo 'temp\missing.md')
    Assert-FailedWithoutSideEffects (Invoke-Handoff $missingPacketRepo) 'Handoff fails closed: missing packet'

    $emptyPacketRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $emptyPacketRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $emptyPacketRepo $validOrigin)
    $emptyPacket = Join-Path $emptyPacketRepo 'temp\empty.md'
    Write-Utf8Text $emptyPacket ''
    Write-ValidMetadata $emptyPacketRepo $emptyPacket
    Assert-FailedWithoutSideEffects (Invoke-Handoff $emptyPacketRepo) 'Handoff fails closed: empty packet'

    $largePacketRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $largePacketRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $largePacketRepo $validOrigin)
    $largePacket = Join-Path $largePacketRepo 'temp\large.md'
    Write-Utf8Text $largePacket ('x' * 65537)
    Write-ValidMetadata $largePacketRepo $largePacket
    Assert-FailedWithoutSideEffects (Invoke-Handoff $largePacketRepo) 'Handoff fails closed: packet exceeds 64 KiB'

    $ambiguousRepo = New-TestRepository
    Write-Utf8Text -Path (Join-Path $ambiguousRepo 'handoff-kit\test-wrapper.ps1') -Text $wrapper
    [void] (Invoke-Configure $ambiguousRepo $validOrigin)
    $candidateOne = Join-Path $ambiguousRepo 'temp\candidate-one.md'
    $candidateTwo = Join-Path $ambiguousRepo 'temp\candidate-two.md'
    Write-Utf8Text $candidateOne 'one'
    Write-Utf8Text $candidateTwo 'two'
    Write-ValidMetadata -Repository $ambiguousRepo -PacketPath @($candidateOne, $candidateTwo)
    Assert-FailedWithoutSideEffects (Invoke-Handoff $ambiguousRepo) 'Handoff fails closed: ambiguous packet metadata; no latest-looking fallback'
    foreach ($failedRepo in @($missingBindingRepo,$invalidBindingRepo,$missingMetadataRepo,$malformedMetadataRepo,$insufficientRepo,$wrongRepo,$missingPacketRepo,$emptyPacketRepo,$largePacketRepo,$ambiguousRepo)) {
        Assert-FailedWithoutSideEffects (Invoke-Handoff $failedRepo -CopyOnly) ('CopyOnly fail-closed: ' + (Split-Path $failedRepo -Leaf))
    }
}
finally {
    if (Test-Path -LiteralPath $testRoot) {
        Remove-Item -LiteralPath $testRoot -Recurse -Force
    }
}

Write-Output "RESULT: passed=$script:Passed failed=$script:Failed"
if ($script:Failed -ne 0) { exit 1 }
