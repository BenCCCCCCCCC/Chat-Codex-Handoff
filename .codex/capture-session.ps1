$invokePath  = Join-Path $env:TEMP "chat-codex-t06-hook-invoked.json"
$sessionPath = Join-Path $env:TEMP "chat-codex-t06-session.json"
$errorPath   = Join-Path $env:TEMP "chat-codex-t06-hook-error.txt"

# 必须在读取 stdin 之前写。
# 只要 PowerShell 进程真的被 Codex 启动，就应该留下这个文件。
[ordered]@{
    phase      = "PROCESS_STARTED"
    pid        = $PID
    ps_version = $PSVersionTable.PSVersion.ToString()
    started_at = (Get-Date).ToString("o")
} |
    ConvertTo-Json -Compress |
    Set-Content -Encoding utf8 $invokePath

try {
    $stdin = [Console]::OpenStandardInput()
    $stdinBytes = New-Object System.IO.MemoryStream
    $stdin.CopyTo($stdinBytes)

    $rawBytes = $stdinBytes.ToArray()
    $utf8Decoder = [System.Text.UTF8Encoding]::new($false, $true)
    $raw = $utf8Decoder.GetString($rawBytes)

    # stdin 已经成功读完，更新状态。
    [ordered]@{
        phase           = "STDIN_READ_COMPLETED"
        pid             = $PID
        ps_version      = $PSVersionTable.PSVersion.ToString()
        raw_byte_length = $rawBytes.Length
        raw_length      = $raw.Length
        updated_at      = (Get-Date).ToString("o")
    } |
        ConvertTo-Json -Compress |
        Set-Content -Encoding utf8 $invokePath

    $data = $raw | ConvertFrom-Json -ErrorAction Stop

    $deliveryPacketPath = Join-Path $env:TEMP ("chat-codex-t10-delivery-{0}.md" -f $data.session_id)
    $deliveryPacketStatus = "MISSING"

    if (($data.last_assistant_message -is [string]) -and ($data.last_assistant_message.Length -gt 0)) {
        $utf8WithoutBom = [System.Text.UTF8Encoding]::new($false)
        [System.IO.File]::WriteAllText(
            $deliveryPacketPath,
            $data.last_assistant_message,
            $utf8WithoutBom
        )
        $deliveryPacketStatus = "CAPTURED"
    }

    [ordered]@{
        session_id             = $data.session_id
        turn_id                = $data.turn_id
        cwd                    = $data.cwd
        hook_event_name        = $data.hook_event_name
        delivery_packet_path   = $deliveryPacketPath
        delivery_packet_status = $deliveryPacketStatus
        captured_at            = (Get-Date).ToString("o")
    } |
        ConvertTo-Json -Compress |
        Set-Content -Encoding utf8 $sessionPath

    Remove-Item $errorPath -Force -ErrorAction SilentlyContinue

    Write-Output "{}"
}
catch {
    @(
        "TYPE=$($_.Exception.GetType().FullName)"
        "MESSAGE=$($_.Exception.Message)"
    ) | Set-Content -Encoding utf8 $errorPath

    Write-Output "{}"
}
