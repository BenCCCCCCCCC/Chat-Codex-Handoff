Set-StrictMode -Version 2.0

function ConvertTo-HandoffCanonicalPath {
    param(
        [Parameter(Mandatory = $true)]
        [string] $Path
    )

    $fullPath = [System.IO.Path]::GetFullPath($Path)
    $rootPath = [System.IO.Path]::GetPathRoot($fullPath)
    if ($fullPath.Length -gt $rootPath.Length) {
        return $fullPath.TrimEnd([System.IO.Path]::DirectorySeparatorChar, [System.IO.Path]::AltDirectorySeparatorChar)
    }

    return $fullPath
}

function Get-HandoffRepositoryContext {
    $repoOutput = @(& git rev-parse --show-toplevel 2>$null)
    if (($LASTEXITCODE -ne 0) -or ($repoOutput.Count -ne 1) -or [string]::IsNullOrWhiteSpace($repoOutput[0])) {
        throw 'The current directory must belong to exactly one Git repository.'
    }

    $gitDirOutput = @(& git rev-parse --git-dir 2>$null)
    if (($LASTEXITCODE -ne 0) -or ($gitDirOutput.Count -ne 1) -or [string]::IsNullOrWhiteSpace($gitDirOutput[0])) {
        throw 'The current Git directory could not be determined unambiguously.'
    }

    $repositoryRoot = ConvertTo-HandoffCanonicalPath -Path $repoOutput[0].Trim()
    $gitDir = $gitDirOutput[0].Trim()
    if (-not [System.IO.Path]::IsPathRooted($gitDir)) {
        $gitDir = Join-Path (Get-Location).Path $gitDir
    }
    $gitDir = ConvertTo-HandoffCanonicalPath -Path $gitDir

    if (-not (Test-Path -LiteralPath $gitDir -PathType Container)) {
        throw 'The resolved Git directory does not exist.'
    }

    [pscustomobject]@{
        RepositoryRoot = $repositoryRoot
        GitDirectory   = $gitDir
        BindingPath    = Join-Path $gitDir 'handoff-kit\origin-chat.json'
    }
}

function Assert-HandoffOriginChat {
    param(
        [Parameter(Mandatory = $true)]
        [string] $OriginChat
    )

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
    if (-not [string]::IsNullOrEmpty($originUri.UserInfo)) {
        throw 'OriginChat must not contain user information.'
    }
    if (-not [regex]::IsMatch($originUri.AbsolutePath, '^/(?:g/[^/]+/)?c/[^/]+/?$', [System.Text.RegularExpressions.RegexOptions]::CultureInvariant)) {
        throw 'OriginChat path must identify one existing conversation.'
    }

    return $OriginChat
}

function Read-HandoffBinding {
    param(
        [Parameter(Mandatory = $true)]
        [psobject] $RepositoryContext
    )

    if (-not (Test-Path -LiteralPath $RepositoryContext.BindingPath -PathType Leaf)) {
        throw 'No origin Chat binding exists for this repository. Run configure.ps1 first.'
    }

    try {
        $binding = [System.IO.File]::ReadAllText($RepositoryContext.BindingPath) | ConvertFrom-Json -ErrorAction Stop
    }
    catch {
        throw 'The persisted origin Chat binding is malformed.'
    }

    $requiredBindingProperties = @('version', 'repository_root', 'origin_chat')
    foreach ($propertyName in $requiredBindingProperties) {
        if ($null -eq $binding.PSObject.Properties[$propertyName]) {
            throw 'The persisted origin Chat binding is incomplete.'
        }
    }

    if (($binding.version -ne 1) -or
        -not ($binding.repository_root -is [string]) -or [string]::IsNullOrWhiteSpace($binding.repository_root) -or
        -not ($binding.origin_chat -is [string]) -or [string]::IsNullOrWhiteSpace($binding.origin_chat)) {
        throw 'The persisted origin Chat binding is incomplete.'
    }

    $boundRoot = ConvertTo-HandoffCanonicalPath -Path $binding.repository_root
    if (-not [string]::Equals($boundRoot, $RepositoryContext.RepositoryRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw 'The persisted origin Chat binding belongs to a different repository.'
    }

    $originChat = Assert-HandoffOriginChat -OriginChat $binding.origin_chat
    [pscustomobject]@{
        OriginChat = $originChat
    }
}
