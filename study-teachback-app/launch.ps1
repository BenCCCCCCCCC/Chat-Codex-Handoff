param([switch]$Stop, [switch]$NoBrowser, [switch]$LoadOnly)
Set-StrictMode -Version 2
$ErrorActionPreference = 'Stop'
$script:AppRoot = $PSScriptRoot
$script:Url = 'http://127.0.0.1:4317/'
$script:StatePath = Join-Path $script:AppRoot 'runtime\launcher.json'

function Read-ProductStatus {
    try {
        $r = Invoke-WebRequest -UseBasicParsing -Uri ($script:Url + 'api/status') -TimeoutSec 2 -MaximumRedirection 0
        $v = $r.Content | ConvertFrom-Json
        if ($r.StatusCode -ne 200 -or ($v.models -join ',') -ne 'whisper-1,gpt-5.6-luna' -or $v.keyConfigured -isnot [bool] -or $null -eq $v.ledger.exposureUSD -or $null -eq $v.ledger.requests) { return $null }
        $page = Invoke-WebRequest -UseBasicParsing -Uri $script:Url -TimeoutSec 2 -MaximumRedirection 0
        if (-not $page.Content.Contains('id="sourceFile"') -or -not $page.Content.Contains('id="explain"') -or -not $page.Content.Contains('src="/app.mjs"')) { return $null }
        return $v
    } catch { return $null }
}
function Get-PortOwners {
    @(Get-NetTCPConnection -LocalPort 4317 -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique)
}
function Test-ServerProcess($ProcessId, $ExpectedStart = $null) {
    try {
        $p = Get-Process -Id $ProcessId -ErrorAction Stop
        $info = Get-CimInstance Win32_Process -Filter "ProcessId = $ProcessId"
        $server = Join-Path $script:AppRoot 'server.mjs'
        if ($p.ProcessName -ne 'node' -or $info.CommandLine -notmatch ('(?:^|\s)"?' + [regex]::Escape($server) + '"?\s*$')) { return $false }
        if ($null -ne $ExpectedStart -and $p.StartTime.ToUniversalTime().Ticks.ToString() -ne $ExpectedStart) { return $false }
        return $true
    } catch { return $false }
}
function Assert-LaunchPrerequisites {
    $node = Get-Command node.exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $node) { throw 'NODE_REQUIRED: Configure existing Node separately; launcher installs nothing.' }
    $python = Join-Path $script:AppRoot '.venv\Scripts\python.exe'
    if ($env:STUDY_PYTHON) { $python = $env:STUDY_PYTHON }
    if (-not [IO.Path]::IsPathRooted($python) -or -not (Test-Path -LiteralPath $python -PathType Leaf)) { throw 'EXTRACTOR_SETUP_REQUIRED: See README for local venv setup.' }
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $python
    $psi.Arguments = '-I -c "import pypdf; assert pypdf.__version__ == ''6.18.0''"'
    $psi.UseShellExecute = $false; $psi.CreateNoWindow = $true
    $psi.RedirectStandardOutput = $true; $psi.RedirectStandardError = $true
    $psi.EnvironmentVariables.Clear(); $psi.EnvironmentVariables['SystemRoot'] = $env:SystemRoot
    $probe = New-Object System.Diagnostics.Process; $probe.StartInfo = $psi
    try {
        if (-not $probe.Start()) { throw 'EXTRACTOR_SETUP_REQUIRED' }
        if (-not $probe.WaitForExit(15000)) { $probe.Kill(); throw 'EXTRACTOR_CHECK_TIMEOUT' }
        if ($probe.ExitCode -ne 0) { throw 'EXTRACTOR_DEPENDENCY_REQUIRED: pypdf 6.18.0 must already be installed.' }
    } finally { $probe.Dispose() }
    if ([string]::IsNullOrWhiteSpace($env:OPENAI_API_KEY)) { throw 'CREDENTIAL_REQUIRED: Supply OPENAI_API_KEY through the existing launch environment; never save it here.' }
    return $node.Source
}
function Stop-OwnedServer {
    if (-not (Test-Path -LiteralPath $script:StatePath)) { return 'NO_OWNED_SERVER' }
    try { $state = Get-Content -LiteralPath $script:StatePath -Raw | ConvertFrom-Json } catch { throw 'OWNERSHIP_UNVERIFIED' }
    if ($state.app -ne $script:AppRoot -or -not (Test-ServerProcess $state.processId $state.started)) { throw 'OWNERSHIP_UNVERIFIED: Nothing stopped. Inspect stale state manually.' }
    $p = Get-Process -Id $state.processId
    if ($p.StartTime.ToUniversalTime().Ticks.ToString() -ne $state.started) { throw 'OWNERSHIP_UNVERIFIED' }
    $p.Kill(); $p.WaitForExit(5000) | Out-Null
    Remove-Item -LiteralPath $script:StatePath
    return 'OWNED_SERVER_STOPPED'
}
function Start-StudySession {
    param([switch]$SkipBrowser, [scriptblock]$OpenUrl = { param($url) Start-Process $url | Out-Null }, [scriptblock]$WaitForStop = { Read-Host 'Server running. Press Enter to STOP this launcher-owned server (or Ctrl+C)' | Out-Null }, [int]$TimeoutSeconds = 15)
    $owners = @(Get-PortOwners)
    if ($owners.Count -gt 0) {
        $status = Read-ProductStatus
        if ($owners.Count -ne 1 -or -not (Test-ServerProcess $owners[0]) -or $null -eq $status) { throw 'PORT_OCCUPIED_UNKNOWN: Nothing stopped.' }
        if (-not $status.keyConfigured) { throw 'SERVER_CREDENTIAL_REQUIRED: Existing server operator must restart it.' }
        Write-Host 'REUSED_EXISTING_SERVER: This launcher will NOT stop it.'
        if (-not $SkipBrowser) { & $OpenUrl $script:Url }
        return 'REUSED'
    }
    $node = Assert-LaunchPrerequisites
    if (Test-Path -LiteralPath $script:StatePath) { throw 'STALE_LAUNCH_STATE: Inspect runtime/launcher.json; nothing stopped.' }
    $psi = New-Object System.Diagnostics.ProcessStartInfo
    $psi.FileName = $node; $psi.Arguments = '"' + (Join-Path $script:AppRoot 'server.mjs') + '"'
    $psi.WorkingDirectory = $script:AppRoot; $psi.UseShellExecute = $false; $psi.CreateNoWindow = $true
    $psi.EnvironmentVariables.Clear(); $psi.EnvironmentVariables['SystemRoot'] = $env:SystemRoot
    $psi.EnvironmentVariables['OPENAI_API_KEY'] = $env:OPENAI_API_KEY
    if ($env:STUDY_PYTHON) { $psi.EnvironmentVariables['STUDY_PYTHON'] = $env:STUDY_PYTHON }
    $child = New-Object System.Diagnostics.Process; $child.StartInfo = $psi
    $started = $false; $stamp = ''
    try {
        $started = $child.Start()
        if (-not $started) { throw 'SERVER_START_FAILED' }
        $null = $child.Handle
        $stamp = $child.StartTime.ToUniversalTime().Ticks.ToString()
        New-Item -ItemType Directory -Force (Split-Path $script:StatePath) | Out-Null
        @{processId=$child.Id;started=$stamp;app=$script:AppRoot} | ConvertTo-Json | Set-Content -LiteralPath $script:StatePath -Encoding UTF8
        $deadline = [DateTime]::UtcNow.AddSeconds($TimeoutSeconds); $ready = $false
        while ([DateTime]::UtcNow -lt $deadline) {
            if ($child.HasExited) { throw 'SERVER_START_FAILED' }
            $owners = @(Get-PortOwners)
            if ($owners.Count -eq 1 -and $owners[0] -eq $child.Id -and $null -ne (Read-ProductStatus)) { $ready = $true; break }
            Start-Sleep -Milliseconds 150
        }
        if (-not $ready) { throw 'STARTUP_TIMEOUT: Browser not opened; owned child will stop.' }
        Write-Host ('READY ' + $script:Url + ' Keep this control window open. Stop-Study.cmd is recovery stop.')
        if (-not $SkipBrowser) { & $OpenUrl $script:Url }
        & $WaitForStop
        return 'STARTED_AND_STOPPED'
    } finally {
        if ($started) {
            if (-not $child.HasExited) { $child.Kill(); $child.WaitForExit(5000) | Out-Null }
            if (Test-Path -LiteralPath $script:StatePath) {
                $saved = Get-Content -LiteralPath $script:StatePath -Raw | ConvertFrom-Json
                if ($saved.processId -eq $child.Id -and $saved.started -eq $stamp) { Remove-Item -LiteralPath $script:StatePath }
            }
        }
        $child.Dispose()
    }
}
if (-not $LoadOnly) {
    try { if ($Stop) { Write-Host (Stop-OwnedServer) } else { Start-StudySession -SkipBrowser:$NoBrowser | Out-Null } }
    catch { Write-Host ('LAUNCH STOPPED: ' + $_.Exception.Message); exit 1 }
}
