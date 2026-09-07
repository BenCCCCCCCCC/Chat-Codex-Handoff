[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$RepoPath
)

$ErrorActionPreference = 'Stop'

try {
    if (-not (Test-Path -LiteralPath $RepoPath -PathType Container)) {
        throw "Repository path does not exist: $RepoPath"
    }

    $resolvedPath = (Resolve-Path -LiteralPath $RepoPath).ProviderPath
    $normalizedPath = [System.IO.Path]::GetFullPath($resolvedPath)

    $insideWorkTree = [string](& git --no-optional-locks -C $normalizedPath rev-parse --is-inside-work-tree 2>$null)
    if ($LASTEXITCODE -ne 0 -or $insideWorkTree.Trim() -cne 'true') {
        throw "Path is not a Git repository: $normalizedPath"
    }

    $branch = [string](& git --no-optional-locks -C $normalizedPath branch --show-current 2>$null)
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to determine Git branch: $normalizedPath"
    }

    $head = [string](& git --no-optional-locks -C $normalizedPath rev-parse --verify HEAD 2>$null)
    if ($LASTEXITCODE -ne 0 -or $head.Trim() -cnotmatch '^[0-9a-fA-F]{40}$') {
        throw "Unable to determine Git HEAD: $normalizedPath"
    }

    $statusLines = @(& git --no-optional-locks -C $normalizedPath status --porcelain=v1 --untracked-files=all 2>$null)
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to determine Git working tree status: $normalizedPath"
    }

    $untrackedCount = @($statusLines | Where-Object { $_.StartsWith('?? ') }).Count

    [ordered]@{
        repo_path          = $normalizedPath
        branch             = $branch.Trim()
        head               = $head.Trim().ToLowerInvariant()
        working_tree_clean = [bool]($statusLines.Count -eq 0)
        untracked_count    = [int]$untrackedCount
    } | ConvertTo-Json -Compress
}
catch {
    [Console]::Error.WriteLine($_.Exception.Message)
    exit 1
}
