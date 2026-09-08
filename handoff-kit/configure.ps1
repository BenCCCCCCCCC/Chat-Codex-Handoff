[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string] $OriginChat,

    [switch] $Rebind
)

$ErrorActionPreference = 'Stop'

try {
    . (Join-Path $PSScriptRoot 'HandoffKit.Common.ps1')

    $repository = Get-HandoffRepositoryContext
    $validatedOrigin = Assert-HandoffOriginChat -OriginChat $OriginChat

    $replaceExisting = $false
    if (Test-Path -LiteralPath $repository.BindingPath) {
        $existing = Read-HandoffBinding -RepositoryContext $repository
        if ([string]::Equals($existing.OriginChat, $validatedOrigin, [System.StringComparison]::Ordinal)) {
            Write-Output 'origin chat binding = Already configured'
            Write-Output "binding path = $($repository.BindingPath)"
            exit 0
        }

        if (-not $Rebind) {
            throw 'A different origin Chat is already bound. Use -Rebind to replace it explicitly.'
        }

        $replaceExisting = $true
    }

    $bindingDirectory = Split-Path -Parent $repository.BindingPath
    [void] (New-Item -ItemType Directory -Path $bindingDirectory -Force)

    $binding = [ordered]@{
        version         = 1
        repository_root = $repository.RepositoryRoot
        origin_chat     = $validatedOrigin
    } | ConvertTo-Json

    $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
    $temporaryBindingPath = Join-Path $bindingDirectory ([System.IO.Path]::GetRandomFileName())
    $backupBindingPath = $null
    $replacementCompleted = $false
    try {
        [System.IO.File]::WriteAllText($temporaryBindingPath, $binding, $utf8WithoutBom)
        if ($replaceExisting) {
            $backupBindingPath = Join-Path $bindingDirectory ([System.IO.Path]::GetRandomFileName())
            [System.IO.File]::Replace($temporaryBindingPath, $repository.BindingPath, $backupBindingPath)
            $replacementCompleted = $true
        }
        else {
            [System.IO.File]::Move($temporaryBindingPath, $repository.BindingPath)
        }
    }
    finally {
        if (Test-Path -LiteralPath $temporaryBindingPath) {
            Remove-Item -LiteralPath $temporaryBindingPath -Force
        }
        if ($replacementCompleted -and (Test-Path -LiteralPath $backupBindingPath)) {
            Remove-Item -LiteralPath $backupBindingPath -Force
        }
    }

    if ($replaceExisting) {
        Write-Output 'origin chat binding = Rebound'
    }
    else {
        Write-Output 'origin chat binding = Configured'
    }
    Write-Output "binding path = $($repository.BindingPath)"
}
catch {
    Write-Error $_.Exception.Message -ErrorAction Continue
    exit 1
}
