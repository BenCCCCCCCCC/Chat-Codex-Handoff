param([switch] $Demo, [string] $TestLifecyclePath)
$ErrorActionPreference = 'Stop'
if ($TestLifecyclePath -and -not $Demo) { throw 'TestLifecyclePath requires Demo.' }
$lifecycleTimer = $null
try {
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    . (Join-Path $PSScriptRoot 'PanelAdapter.ps1')
    . (Join-Path $PSScriptRoot 'HandoffPanel.ps1')
    $repo = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
    $panel = New-HandoffPanel -Repository $repo -Demo:$Demo
    if ($TestLifecyclePath) {
        $lifecycleTimer = New-Object Windows.Forms.Timer
        $lifecycleTimer.Interval = 250
        $panel.Form.Add_Shown({
            [IO.File]::WriteAllText($TestLifecyclePath, "READY pid=$PID repo=$repo")
            $lifecycleTimer.Start()
        }.GetNewClosure())
        $lifecycleTimer.Add_Tick({ $lifecycleTimer.Stop(); $panel.Form.Close() }.GetNewClosure())
    }
    [void] $panel.Form.ShowDialog()
    $panel.Form.Dispose()
    if ($TestLifecyclePath) { [IO.File]::AppendAllText($TestLifecyclePath, "`r`nCLOSED disposed=$($panel.Form.IsDisposed)") }
}
catch {
    if ($TestLifecyclePath) { [Console]::Error.WriteLine($_.Exception.Message); exit 1 }
    [void] [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, 'Handoff startup error')
    exit 1
}
finally { if ($lifecycleTimer) { $lifecycleTimer.Dispose() } }
