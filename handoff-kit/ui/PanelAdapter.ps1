function Invoke-PanelCore {
    param([string] $Repository, [ValidateSet('Preview','Configure','Handoff')] [string] $Action,
        [string] $Origin = '', [switch] $Rebind, [string] $TempDirectory = $env:TEMP)
    # Only structured data crosses the process boundary; never interpolate user text into code.
    $data = @{ Repo=$Repository; Action=$Action; Origin=$Origin; Rebind=[bool]$Rebind } | ConvertTo-Json -Compress
    $payload = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($data))
    $worker = @'
$ErrorActionPreference = 'Stop'
$d = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('__PAYLOAD__')) | ConvertFrom-Json
try {
    Set-Location -LiteralPath $d.Repo
    . (Join-Path $d.Repo 'handoff-kit\HandoffKit.Common.ps1')
    $context = Get-HandoffRepositoryContext
    if ($context.RepositoryRoot -ine [IO.Path]::GetFullPath($d.Repo).TrimEnd('\')) { throw 'Checkout mismatch.' }
    if ($d.Action -eq 'Configure') {
        $argsMap = @{ OriginChat=[string]$d.Origin; Rebind=[bool]$d.Rebind }
        & (Join-Path $d.Repo 'handoff-kit\configure.ps1') @argsMap
        exit $LASTEXITCODE
    }
    if ($d.Action -eq 'Preview') {
        $global:panelCapture = @{ Packet=$null; Target=$null }
        function Set-Clipboard { param([string] $Value) $global:panelCapture.Packet = $Value }
        function Start-Process { param([string] $FilePath) $global:panelCapture.Target = $FilePath }
        & (Join-Path $d.Repo 'handoff-kit\handoff.ps1') | Out-Null
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
        $global:panelCapture | ConvertTo-Json -Compress
        exit 0
    }
    & (Join-Path $d.Repo 'handoff-kit\handoff.ps1')
    exit $LASTEXITCODE
}
catch { [Console]::Error.WriteLine($_.Exception.Message); exit 1 }
'@
    $worker = $worker.Replace('__PAYLOAD__', $payload)
    $start = New-Object Diagnostics.ProcessStartInfo
    $start.FileName = "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
    $start.Arguments = '-NoProfile -STA -EncodedCommand ' + [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($worker))
    $start.WorkingDirectory = $Repository
    $start.UseShellExecute = $false
    $start.CreateNoWindow = $true
    $start.RedirectStandardOutput = $true
    $start.RedirectStandardError = $true
    $start.StandardOutputEncoding = [Text.Encoding]::UTF8
    $start.EnvironmentVariables['TEMP'] = $TempDirectory
    $start.EnvironmentVariables['TMP'] = $TempDirectory
    # Explicit UTF-8 output avoids ANSI damage to Chinese preview text.
    $worker = '[Console]::OutputEncoding = New-Object Text.UTF8Encoding($false)' + "`n" + $worker
    $start.Arguments = '-NoProfile -STA -EncodedCommand ' + [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($worker))
    $process = New-Object Diagnostics.Process
    $process.StartInfo = $start
    try {
        [void] $process.Start()
        $outTask = $process.StandardOutput.ReadToEndAsync()
        $errTask = $process.StandardError.ReadToEndAsync()
        $process.WaitForExit()
        [pscustomobject]@{ ExitCode=$process.ExitCode; Output=$outTask.Result; Error=$errTask.Result }
    }
    finally { $process.Dispose() }
}

function Get-PanelSnapshot {
    param([string] $Repository, [string] $TempDirectory = $env:TEMP)
    $result = [ordered]@{ Repository=$Repository; Target=''; Packet=''; Stamp=''; Identity=''; Valid=$false; Error=''; Branch=''; Head='' }
    Push-Location -LiteralPath $Repository
    try {
        . (Join-Path $Repository 'handoff-kit\HandoffKit.Common.ps1')
        $context = Get-HandoffRepositoryContext
        $result.Branch = (& git branch --show-current | Out-String).Trim()
        $result.Head = (& git rev-parse HEAD | Out-String).Trim()
        $result.Target = (Read-HandoffBinding $context).OriginChat
        $metadataPath = Join-Path $TempDirectory 'chat-codex-t06-session.json'
        $beforeMetadata = [IO.File]::ReadAllText($metadataPath)
        $beforeBinding = [IO.File]::ReadAllText($context.BindingPath)
        $probe = Invoke-PanelCore $Repository Preview -TempDirectory $TempDirectory
        if ($probe.ExitCode -ne 0) { throw $probe.Error }
        $preview = $probe.Output | ConvertFrom-Json
        $meta = $beforeMetadata | ConvertFrom-Json
        $packetNow = [IO.File]::ReadAllText($meta.delivery_packet_path)
        if ($beforeMetadata -cne [IO.File]::ReadAllText($metadataPath) -or
            $beforeBinding -cne [IO.File]::ReadAllText($context.BindingPath) -or
            $preview.Packet -cne $packetNow -or $preview.Target -cne $result.Target) { throw 'Delivery changed during refresh. Refresh again.' }
        $result.Packet = $preview.Packet
        $result.Stamp = 'File time: ' + (Get-Item -LiteralPath $meta.delivery_packet_path).LastWriteTime.ToString('yyyy-MM-dd HH:mm:ss')
        if ($meta.PSObject.Properties['captured_at']) { $result.Stamp = 'captured_at: ' + $meta.captured_at }
        $hash = [Security.Cryptography.SHA256]::Create()
        try { $result.Identity = [Convert]::ToBase64String($hash.ComputeHash([Text.Encoding]::UTF8.GetBytes($beforeBinding + $beforeMetadata + $packetNow))) }
        finally { $hash.Dispose() }
        $result.Valid = $true
    }
    catch { $result.Error = $_.Exception.Message }
    finally { Pop-Location }
    [pscustomobject]$result
}

function Invoke-PanelReturn {
    param($State, [string] $Repository, [string] $TempDirectory = $env:TEMP)
    if ($State.Busy -or -not $State.Confirmed -or -not $State.Snapshot.Valid) { throw 'Explicit confirmation required; action already running or delivery unavailable.' }
    $State.Busy = $true
    $State.Confirmed = $false
    try {
        $fresh = Get-PanelSnapshot $Repository $TempDirectory
        if (-not $fresh.Valid -or $fresh.Identity -cne $State.Snapshot.Identity) { throw 'Target or delivery changed. Refresh and confirm again.' }
        $run = Invoke-PanelCore $Repository Handoff -TempDirectory $TempDirectory
        if ($run.ExitCode -ne 0) { throw $run.Error }
        $after = Get-PanelSnapshot $Repository $TempDirectory
        if (-not $after.Valid -or $after.Identity -cne $fresh.Identity) { throw 'Delivery changed during preparation. Side effects may have occurred; inspect before retrying.' }
        return $run
    }
    finally { $State.Busy = $false }
}
