param(
    [Parameter(Mandatory=$true)][string]$Repository,
    [Parameter(Mandatory=$true)][string]$InputPath,
    [Parameter(Mandatory=$true)][string]$RunId
)
$ErrorActionPreference='Stop'
Import-Module (Join-Path $PSScriptRoot 'AcceptanceEvidence.psm1') -Force
try {
    $run=New-P0Snapshot $Repository $InputPath $RunId
    $report=Write-P0Report $run
    [pscustomobject]@{run_directory=$run;owner_decision=$report.owner_decision;criteria=$report.criteria} | ConvertTo-Json -Depth 20
} catch { Write-Error $_.Exception.Message; exit 1 }
