[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string] $OriginChat,

    [Parameter(Mandatory = $true)]
    [string] $PacketPath
)

$ErrorActionPreference = 'Stop'
$maximumPacketBytes = 64KB

try {
    $packetFile = Get-Item -LiteralPath $PacketPath -ErrorAction Stop
    if (-not ($packetFile -is [System.IO.FileInfo])) {
        throw 'PacketPath must refer to a regular file.'
    }

    if ($packetFile.Length -eq 0) {
        throw 'Packet must not be empty.'
    }

    if ($packetFile.Length -gt $maximumPacketBytes) {
        throw 'Packet must not exceed 64 KiB.'
    }

    $packet = [System.IO.File]::ReadAllText($packetFile.FullName)
    if ($packet.Length -eq 0) {
        throw 'Packet must contain text.'
    }

    $originUri = $null
    if (-not [System.Uri]::TryCreate($OriginChat, [System.UriKind]::Absolute, [ref] $originUri)) {
        throw 'OriginChat must be an absolute HTTPS URL.'
    }

    if (-not [string]::Equals($originUri.Scheme, 'https', [System.StringComparison]::OrdinalIgnoreCase)) {
        throw 'OriginChat must use HTTPS.'
    }

    if (-not [string]::Equals($originUri.Host, 'chatgpt.com', [System.StringComparison]::OrdinalIgnoreCase)) {
        throw 'OriginChat host must be exactly chatgpt.com.'
    }

    if ($originUri.AbsolutePath.IndexOf('/c/', [System.StringComparison]::Ordinal) -lt 0) {
        throw 'OriginChat path must identify an existing conversation with /c/.'
    }

    Set-Clipboard -Value $packet
    Start-Process -FilePath $OriginChat

    Write-Output 'clipboard prepared = Yes'
    Write-Output 'origin chat opened = Yes'
    Write-Output 'auto paste = No'
    Write-Output 'auto send = No'
}
catch {
    Write-Error $_.Exception.Message -ErrorAction Continue
    exit 1
}
