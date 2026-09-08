[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$maximumPacketBytes = 64KB

try {
    . (Join-Path $PSScriptRoot 'HandoffKit.Common.ps1')

    $repository = Get-HandoffRepositoryContext
    $binding = Read-HandoffBinding -RepositoryContext $repository

    $metadataPath = Join-Path $env:TEMP 'chat-codex-t06-session.json'
    if (-not (Test-Path -LiteralPath $metadataPath -PathType Leaf)) {
        throw 'Authoritative Stop Hook metadata is missing.'
    }

    try {
        $metadata = [System.IO.File]::ReadAllText($metadataPath) | ConvertFrom-Json -ErrorAction Stop
    }
    catch {
        throw 'Authoritative Stop Hook metadata is malformed.'
    }

    $requiredMetadataProperties = @(
        'session_id',
        'turn_id',
        'cwd',
        'hook_event_name',
        'delivery_packet_path',
        'delivery_packet_status'
    )
    foreach ($propertyName in $requiredMetadataProperties) {
        if ($null -eq $metadata.PSObject.Properties[$propertyName]) {
            throw 'Authoritative Stop Hook metadata is incomplete or ambiguous.'
        }
    }

    if (-not ($metadata.session_id -is [string]) -or [string]::IsNullOrWhiteSpace($metadata.session_id) -or
        -not ($metadata.turn_id -is [string]) -or [string]::IsNullOrWhiteSpace($metadata.turn_id) -or
        -not ($metadata.cwd -is [string]) -or [string]::IsNullOrWhiteSpace($metadata.cwd) -or
        -not ($metadata.hook_event_name -is [string]) -or $metadata.hook_event_name -ne 'Stop' -or
        -not ($metadata.delivery_packet_path -is [string]) -or [string]::IsNullOrWhiteSpace($metadata.delivery_packet_path) -or
        -not ($metadata.delivery_packet_status -is [string]) -or $metadata.delivery_packet_status -ne 'CAPTURED') {
        throw 'Authoritative Stop Hook metadata is incomplete or ambiguous.'
    }

    $metadataRoot = ConvertTo-HandoffCanonicalPath -Path $metadata.cwd
    if (-not [string]::Equals($metadataRoot, $repository.RepositoryRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw 'Authoritative Stop Hook metadata belongs to a different repository.'
    }

    if (-not [System.IO.Path]::IsPathRooted($metadata.delivery_packet_path)) {
        throw 'The materialized Delivery Packet path must be absolute.'
    }

    $packetPath = ConvertTo-HandoffCanonicalPath -Path $metadata.delivery_packet_path
    $packetFile = Get-Item -LiteralPath $packetPath -ErrorAction Stop
    if (-not ($packetFile -is [System.IO.FileInfo])) {
        throw 'The materialized Delivery Packet path must refer to a file.'
    }
    if ($packetFile.Length -eq 0) {
        throw 'The materialized Delivery Packet must not be empty.'
    }
    if ($packetFile.Length -gt $maximumPacketBytes) {
        throw 'The materialized Delivery Packet must not exceed 64 KiB.'
    }

    $packet = [System.IO.File]::ReadAllText($packetFile.FullName)
    if ($packet.Length -eq 0) {
        throw 'The materialized Delivery Packet must contain text.'
    }

    $originChat = Assert-HandoffOriginChat -OriginChat $binding.OriginChat

    Set-Clipboard -Value $packet
    Start-Process -FilePath $originChat

    Write-Output 'clipboard prepared = Yes'
    Write-Output 'origin binding loaded automatically = Yes'
    Write-Output 'delivery packet resolved automatically = Yes'
    Write-Output 'origin chat opened = Yes'
    Write-Output 'auto paste = No'
    Write-Output 'auto send = No'
}
catch {
    Write-Error $_.Exception.Message -ErrorAction Continue
    exit 1
}
