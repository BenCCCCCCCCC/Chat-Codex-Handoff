param([switch] $Demo)
$ErrorActionPreference = 'Stop'
try {
    Add-Type -AssemblyName System.Windows.Forms
    Add-Type -AssemblyName System.Drawing
    . (Join-Path $PSScriptRoot 'PanelAdapter.ps1')
    . (Join-Path $PSScriptRoot 'HandoffPanel.ps1')
    $repo = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
    $panel = New-HandoffPanel -Repository $repo -Demo:$Demo
    [void] $panel.Form.ShowDialog()
    $panel.Form.Dispose()
}
catch {
    [void] [System.Windows.Forms.MessageBox]::Show($_.Exception.Message, 'Handoff startup error')
    exit 1
}
