[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string] $OriginChat
)

$ErrorActionPreference = 'Stop'

try {
    . (Join-Path $PSScriptRoot 'HandoffKit.Common.ps1')

    $repository = Get-HandoffRepositoryContext
    $validatedOrigin = Assert-HandoffOriginChat -OriginChat $OriginChat

    if (Test-Path -LiteralPath $repository.BindingPath) {
        $existing = Read-HandoffBinding -RepositoryContext $repository
        if (-not [string]::Equals($existing.OriginChat, $validatedOrigin, [System.StringComparison]::Ordinal)) {
            throw 'A different origin Chat is already bound. This spike does not support implicit rebinding.'
        }

        Write-Output 'origin chat binding = Already configured'
        Write-Output "binding path = $($repository.BindingPath)"
        exit 0
    }

    $bindingDirectory = Split-Path -Parent $repository.BindingPath
    [void] (New-Item -ItemType Directory -Path $bindingDirectory -Force)

    $binding = [ordered]@{
        version         = 1
        repository_root = $repository.RepositoryRoot
        origin_chat     = $validatedOrigin
    } | ConvertTo-Json

    $utf8WithoutBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($repository.BindingPath, $binding, $utf8WithoutBom)

    Write-Output 'origin chat binding = Configured'
    Write-Output "binding path = $($repository.BindingPath)"
}
catch {
    Write-Error $_.Exception.Message -ErrorAction Continue
    exit 1
}
