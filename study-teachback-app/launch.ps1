param([switch]$Stop, [switch]$NoBrowser, [switch]$LoadOnly)
Set-StrictMode -Version 2
$ErrorActionPreference = 'Stop'
$script:AppRoot = $PSScriptRoot
$script:Url = 'http://127.0.0.1:4317/'
$script:StatePath = Join-Path $script:AppRoot 'runtime\launcher.json'

function Read-ProductStatus {
    try {
        $r = Invoke-WebRequest -UseBasicParsing -Uri ($script:Url + 'api/health') -TimeoutSec 2 -MaximumRedirection 0
        $v = $r.Content | ConvertFrom-Json
        if ($r.StatusCode -ne 200 -or $v.app -ne 'zhi-er-neng-jiang' -or $v.apiVersion -ne 1) { return $null }
        $page = Invoke-WebRequest -UseBasicParsing -Uri $script:Url -TimeoutSec 2 -MaximumRedirection 0
        if (-not $page.Content.Contains('id="sourceFile"') -or -not $page.Content.Contains('id="explain"') -or -not $page.Content.Contains('src="/app.mjs"')) { return $null }
        return $v
    } catch { return $null }
}
function Get-PortOwners {
    # MSFT_NetTCPConnection state 2 is Listen. An empty successful query is not an error.
    @(Get-CimInstance -Namespace 'root/StandardCimv2' -ClassName MSFT_NetTCPConnection -Filter 'LocalPort = 4317 AND State = 2' -ErrorAction Stop |
        Select-Object -ExpandProperty OwningProcess -Unique)
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
    return $node.Source
}
function Enter-LaunchStateLock {
    # Serialize our launchers for this root, but never hold the lock while waiting for the user.
    $sha = [Security.Cryptography.SHA256]::Create()
    try {
        $bytes = [Text.Encoding]::UTF8.GetBytes($script:AppRoot.ToUpperInvariant())
        $key = [BitConverter]::ToString($sha.ComputeHash($bytes)).Replace('-','')
    } finally { $sha.Dispose() }
    $lock = New-Object System.Threading.Mutex($false, ('Local\ZhiErNengJiang-' + $key))
    try {
        try { $entered = $lock.WaitOne(20000) } catch [System.Threading.AbandonedMutexException] { $entered = $true }
        if (-not $entered) { throw 'LAUNCH_STATE_BUSY: Another launcher is checking this copy. Retry shortly.' }
        return $lock
    } catch { $lock.Dispose(); throw }
}
function Exit-LaunchStateLock($Lock) {
    if ($null -ne $Lock) { try { $Lock.ReleaseMutex() } finally { $Lock.Dispose() } }
}
function Archive-AbandonedLaunchState {
    $errorText = 'STALE_LAUNCH_STATE: Could not verify a dead process and free port. Nothing stopped. See Windows startup recovery in the README.'
    try {
        $item = Get-Item -LiteralPath $script:StatePath -Force
        if ($item.PSIsContainer -or ($item.Attributes -band [IO.FileAttributes]::ReparsePoint) -or ($item.Directory.Attributes -band [IO.FileAttributes]::ReparsePoint)) { throw $errorText }
        $state = Get-Content -LiteralPath $script:StatePath -Raw | ConvertFrom-Json
        $processId = $state.processId; $started = $state.started; $stampValue = [long]0
        if ($state -is [array] -or $state.app -cne $script:AppRoot -or
            ($processId -isnot [int] -and $processId -isnot [long]) -or $processId -le 0 -or $processId -gt [int]::MaxValue -or
            $started -isnot [string] -or $started -notmatch '^[0-9]{1,19}$' -or
            -not [long]::TryParse($started,[ref]$stampValue) -or $stampValue -le 0 -or $stampValue -gt [DateTime]::MaxValue.Ticks) { throw $errorText }
        if (@(Get-PortOwners).Count -ne 0) { throw $errorText }
        $matchingProcesses = @(Get-CimInstance Win32_Process -Filter ('ProcessId = ' + $processId) -ErrorAction Stop)
        if ($matchingProcesses.Count -ne 0 -or @(Get-PortOwners).Count -ne 0) { throw $errorText }
        # Same-directory rename preserves the evidence and does not overwrite another archive.
        $archive = Join-Path $item.DirectoryName ('launcher.abandoned-' + [Guid]::NewGuid().ToString('N') + '.json')
        [IO.File]::Move($script:StatePath,$archive)
        Write-Host ('ABANDONED_STATE_ARCHIVED: ' + (Split-Path -Leaf $archive))
    } catch { throw $errorText }
}
function Stop-OwnedServer {
    $lock = Enter-LaunchStateLock
    try { Stop-OwnedServerLocked } finally { Exit-LaunchStateLock $lock }
}
function Stop-OwnedServerLocked {
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
    $lock = Enter-LaunchStateLock
    $child = $null; $started = $false; $stamp = ''
    try {
        $owners = @(Get-PortOwners)
        if ($owners.Count -gt 0) {
            $status = Read-ProductStatus
            if ($owners.Count -ne 1 -or -not (Test-ServerProcess $owners[0]) -or $null -eq $status) { throw 'PORT_OCCUPIED_UNKNOWN: Nothing stopped.' }
            Write-Host 'REUSED_EXISTING_SERVER: This launcher will NOT stop it.'
            if (-not $SkipBrowser) { & $OpenUrl $script:Url }
            return 'REUSED'
        }
        $node = Assert-LaunchPrerequisites
        if (Test-Path -LiteralPath $script:StatePath) { Archive-AbandonedLaunchState }
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = $node; $psi.Arguments = '"' + (Join-Path $script:AppRoot 'server.mjs') + '"'
        $psi.WorkingDirectory = $script:AppRoot; $psi.UseShellExecute = $false; $psi.CreateNoWindow = $true
        $psi.EnvironmentVariables.Clear(); $psi.EnvironmentVariables['SystemRoot'] = $env:SystemRoot
        if ($env:OPENAI_API_KEY) { $psi.EnvironmentVariables['OPENAI_API_KEY'] = $env:OPENAI_API_KEY }
        if ($env:STUDY_PYTHON) { $psi.EnvironmentVariables['STUDY_PYTHON'] = $env:STUDY_PYTHON }
        $child = New-Object System.Diagnostics.Process; $child.StartInfo = $psi
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
        Exit-LaunchStateLock $lock
        $lock = $null
        Write-Host ('READY ' + $script:Url + ' Keep this control window open. Stop-Study.cmd is recovery stop.')
        if (-not $SkipBrowser) { & $OpenUrl $script:Url }
        & $WaitForStop
        return 'STARTED_AND_STOPPED'
    } finally {
        try {
            if ($started) {
                if (-not $child.HasExited) { $child.Kill(); $child.WaitForExit(5000) | Out-Null }
                if ($null -eq $lock) { $lock = Enter-LaunchStateLock }
                if (Test-Path -LiteralPath $script:StatePath) {
                    $saved = Get-Content -LiteralPath $script:StatePath -Raw | ConvertFrom-Json
                    if ($saved.processId -eq $child.Id -and $saved.started -eq $stamp) { Remove-Item -LiteralPath $script:StatePath }
                }
            }
        } finally {
            Exit-LaunchStateLock $lock
            if ($null -ne $child) { $child.Dispose() }
        }
    }
}
if (-not $LoadOnly) {
    try { if ($Stop) { Write-Host (Stop-OwnedServer) } else { Start-StudySession -SkipBrowser:$NoBrowser | Out-Null } }
    catch { Write-Host ('LAUNCH STOPPED: ' + $_.Exception.Message); exit 1 }
}
