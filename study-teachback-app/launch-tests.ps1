Set-StrictMode -Version 2
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'launch.ps1') -LoadOnly
$evidence = Join-Path (Split-Path $PSScriptRoot) 'artifacts\study-teachback\local-launch-01'
New-Item -ItemType Directory -Force $evidence | Out-Null
$results = New-Object System.Collections.Generic.List[object]
function Check($Name, [scriptblock]$Body) {
    try { & $Body; $results.Add(@{name=$Name;status='PASS'}); Write-Host ('PASS ' + $Name) }
    catch { $results.Add(@{name=$Name;status='FAIL';error=$_.Exception.Message}); throw }
}
function Assert($Value, $Message) { if (-not $Value) { throw $Message } }
function Reject([scriptblock]$Body, $Code) { $caught = $false; try { & $Body | Out-Null } catch { $caught = $_.Exception.Message.Contains($Code) }; Assert $caught ('Expected ' + $Code) }
$originalKey = $env:OPENAI_API_KEY; $originalPath = $env:PATH; $originalOverride = $env:STUDY_PYTHON
$originalCwd = Get-Location
$app = $script:AppRoot
$ledgerPath = Join-Path $app 'runtime\usage.json'
$before = (Get-FileHash -LiteralPath $ledgerPath -Algorithm SHA256).Hash
$opened = New-Object System.Collections.Generic.List[string]
$open = { param($target) $opened.Add($target) }
$node = (Get-Command node.exe).Source
$external = $null; $listener = $null
try {
    Assert (@(Get-PortOwners).Count -eq 0) 'TEST_PORT_OCCUPIED: Existing process left untouched; no tests started.'
    Assert (-not (Test-Path $script:StatePath)) 'TEST_OWNERSHIP_STATE_EXISTS'
    $env:OPENAI_API_KEY = [Guid]::NewGuid().ToString(); $env:STUDY_PYTHON = $null
    Check 'Windows PowerShell 5.1 execution' { Assert ($PSVersionTable.PSVersion.Major -eq 5 -and $PSVersionTable.PSVersion.Minor -eq 1) 'NOT_PS51' }
    Check 'actual source bytes and PS51 syntax have no Markdown or escaping pollution' {
        $tokens = $null; $parseErrors = $null
        [System.Management.Automation.Language.Parser]::ParseFile((Join-Path $app 'launch.ps1'), [ref]$tokens, [ref]$parseErrors) | Out-Null
        Assert ($parseErrors.Count -eq 0) 'PS51_PARSE_FAILED'
        $source = Get-Content (Join-Path $app 'launch.ps1') -Raw
        foreach ($literal in @("'http://127.0.0.1:4317/'",'pypdf.__version__','$_.Exception','Win32_Process','OPENAI_API_KEY')) { Assert ($source.Contains($literal)) ('SOURCE_LITERAL_MISSING: ' + $literal) }
        foreach ($file in @((Join-Path $app 'launch.ps1'),(Join-Path (Split-Path $app) 'Start-Study.cmd'),(Join-Path (Split-Path $app) 'Stop-Study.cmd'))) {
            $text = Get-Content -LiteralPath $file -Raw
            Assert ($text -notmatch '\[[^\]]+\]\(https?://|\*\*|\\_|%\\~dp0|\\#|(?m)^#{2,}') 'MARKDOWN_POLLUTION'
            if ($file.EndsWith('.cmd')) { Assert ($text.Contains('%~dp0')) 'CMD_PATH_LITERAL_INVALID' }
        }
    }
    Check 'missing Node fails closed' { try { $env:PATH = $env:SystemRoot; Reject { Assert-LaunchPrerequisites } 'NODE_REQUIRED' } finally { $env:PATH = $originalPath } }
    Check 'missing extractor fails closed' { try { $env:STUDY_PYTHON = Join-Path $app 'runtime\does-not-exist.exe'; Reject { Assert-LaunchPrerequisites } 'EXTRACTOR_SETUP_REQUIRED' } finally { $env:STUDY_PYTHON = $null } }
    Check 'invalid extractor dependency fails closed' {
        $basePython = & (Join-Path $app '.venv\Scripts\python.exe') -I -c 'import sys; print(sys._base_executable)'
        try { $env:STUDY_PYTHON = $basePython; Reject { Assert-LaunchPrerequisites } 'EXTRACTOR_DEPENDENCY_REQUIRED' } finally { $env:STUDY_PYTHON = $null }
    }
    Check 'missing runtime key fails closed without outputting it' { $temporary = $env:OPENAI_API_KEY; try { $env:OPENAI_API_KEY = $null; Reject { Assert-LaunchPrerequisites } 'CREDENTIAL_REQUIRED' } finally { $env:OPENAI_API_KEY = $temporary } }
    Check 'repo-root start readiness exact URL and owned shutdown' {
        Set-Location (Split-Path $app)
        $r = Start-StudySession -OpenUrl $open -WaitForStop { Assert ($null -ne (Read-ProductStatus)) 'NOT_READY' }
        Assert ($r -eq 'STARTED_AND_STOPPED') 'START_RESULT'; Assert ($opened[0] -eq $script:Url) 'OPEN_TARGET'
        Assert (@(Get-PortOwners).Count -eq 0) 'OWNED_CHILD_LEFT'; Assert (-not (Test-Path $script:StatePath)) 'STATE_LEFT'
    }
    Check 'fresh unrelated CWD plus recovery Stop entry' {
        Set-Location (Join-Path $env:SystemRoot 'System32')
        Start-StudySession -SkipBrowser -WaitForStop { Assert ((Stop-OwnedServer) -eq 'OWNED_SERVER_STOPPED') 'RECOVERY_STOP_FAILED' } | Out-Null
        Assert (@(Get-PortOwners).Count -eq 0) 'RECOVERY_CHILD_LEFT'
    }
    Check 'startup timeout does not open browser and cleans owned process' {
        $count = $opened.Count; Reject { Start-StudySession -TimeoutSeconds 0 -OpenUrl $open } 'STARTUP_TIMEOUT'
        Assert ($opened.Count -eq $count) 'OPENED_ON_TIMEOUT'; Assert (@(Get-PortOwners).Count -eq 0) 'TIMEOUT_CHILD_LEFT'
    }
    Check 'unknown occupied port is not killed' {
        $listener = New-Object System.Net.Sockets.TcpListener([Net.IPAddress]::Parse('127.0.0.1'),4317)
        try { $listener.Start(); Reject { Start-StudySession -OpenUrl $open } 'PORT_OCCUPIED_UNKNOWN'; Assert $listener.Server.IsBound 'UNKNOWN_KILLED' } finally { $listener.Stop(); $listener = $null }
    }
    Check 'pre-existing correct server reused without acquiring stop ownership' {
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = $node; $psi.Arguments = '"' + (Join-Path $app 'server.mjs') + '"'; $psi.UseShellExecute = $false; $psi.CreateNoWindow = $true
        $external = New-Object System.Diagnostics.Process; $external.StartInfo = $psi; $external.Start() | Out-Null
        $deadline = [DateTime]::UtcNow.AddSeconds(15)
        while ($null -eq (Read-ProductStatus) -and [DateTime]::UtcNow -lt $deadline) { Start-Sleep -Milliseconds 100 }
        Assert ((Start-StudySession -OpenUrl $open) -eq 'REUSED') 'NOT_REUSED'
        Check 'verified existing server reused with missing caller Node extractor and key' {
            $temporary = $env:OPENAI_API_KEY
            try {
                $env:PATH = $env:SystemRoot; $env:STUDY_PYTHON = Join-Path $app 'runtime\absent.exe'; $env:OPENAI_API_KEY = $null
                Assert ((Start-StudySession -SkipBrowser) -eq 'REUSED') 'REUSE_WRONGLY_REQUIRES_PREREQUISITES'
                Assert (-not $external.HasExited) 'EXTERNAL_STOPPED'
            } finally { $env:PATH = $originalPath; $env:STUDY_PYTHON = $null; $env:OPENAI_API_KEY = $temporary }
        }
        Assert ((Stop-OwnedServer) -eq 'NO_OWNED_SERVER') 'CLAIMED_EXTERNAL'; Assert (-not $external.HasExited) 'STOPPED_EXTERNAL'
        $external.Kill(); $external.WaitForExit(); $external.Dispose(); $external = $null
    }
    Check 'stale PID record never stops unknown process' {
        @{processId=$PID;started='0';app=$app} | ConvertTo-Json | Set-Content $script:StatePath
        try { Reject { Stop-OwnedServer } 'OWNERSHIP_UNVERIFIED' } finally { Remove-Item -LiteralPath $script:StatePath }
    }
    Check 'ledger identical and launcher provider endpoints absent' {
        Assert ((Get-FileHash -LiteralPath $ledgerPath -Algorithm SHA256).Hash -eq $before) 'LEDGER_CHANGED'
        $source = Get-Content (Join-Path $app 'launch.ps1') -Raw
        Assert ($source -notmatch '/api/(teach|asr|diagnose|register)|api.openai.com|\.env\b|ExecutionPolicy') 'FORBIDDEN_LAUNCH_OPERATION'
        Assert ($opened.Count -eq 2) 'UNEXPECTED_OPEN_COUNT'
    }
} finally {
    if ($null -ne $external -and -not $external.HasExited) { $external.Kill(); $external.WaitForExit(); $external.Dispose() }
    if ($null -ne $listener) { $listener.Stop() }
    $env:OPENAI_API_KEY = $originalKey; $env:PATH = $originalPath; $env:STUDY_PYTHON = $originalOverride; Set-Location $originalCwd
    @{powershell=$PSVersionTable.PSVersion.ToString();cases=@($results.ToArray());ledgerBefore=$before;ledgerAfter=(Get-FileHash $ledgerPath -Algorithm SHA256).Hash;providerCalls=0;browserOpen='Intercepted exact URL; no actual browser interaction';key='Temporary in-memory non-secret test value; not persisted or sent'} | ConvertTo-Json -Depth 6 | Set-Content (Join-Path $evidence 'LAUNCH_TESTS.json') -Encoding UTF8
}
