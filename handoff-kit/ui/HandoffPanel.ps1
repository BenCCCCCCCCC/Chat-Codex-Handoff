function New-HandoffPanel {
    param([string] $Repository, [switch] $Demo)
    $state = @{ Busy=$false; Confirmed=$false; Snapshot=$null; Demo=[bool]$Demo }
    $form = New-Object Windows.Forms.Form
    $form.Text = '轻量交接 · 本地实验版'
    $form.ClientSize = New-Object Drawing.Size(960,640)
    $form.MinimumSize = New-Object Drawing.Size(740,560)
    $form.StartPosition = 'CenterScreen'
    $form.Font = New-Object Drawing.Font('Microsoft YaHei UI',10)
    $form.BackColor = [Drawing.Color]::FromArgb(247,249,252)
    $form.AutoScaleMode = 'Font'
    $layout = New-Object Windows.Forms.TableLayoutPanel
    $layout.Dock = 'Fill'; $layout.Padding = New-Object Windows.Forms.Padding(24)
    $layout.ColumnCount = 1; $layout.RowCount = 9
    foreach ($height in @(38,62,54,52,38,0,40,42,52)) {
        $style = New-Object Windows.Forms.RowStyle
        if ($height -eq 0) { $style.SizeType='Percent'; $style.Height=100 }
        else { $style.SizeType='Absolute'; $style.Height=$height }
        [void]$layout.RowStyles.Add($style)
    }
    $form.Controls.Add($layout)
    function Add-Label([string]$text,[int]$row) {
        $label=New-Object Windows.Forms.Label; $label.Text=$text; $label.Dock='Fill'; $label.AutoEllipsis=$true
        $label.TextAlign='MiddleLeft'; $layout.Controls.Add($label,0,$row); return $label
    }
    $title=Add-Label '把本地交付带回讨论' 0
    $title.Font=New-Object Drawing.Font('Microsoft YaHei UI',17,[Drawing.FontStyle]::Bold)
    $intro=Add-Label '适合已有 Chat 讨论 + 本地 Codex 项目的用户。偶尔一次小修改可直接使用原生流程。先在 Chat 定任务 → 官方 Existing Chat 交给 Codex → 回复完全结束 → 刷新 → 准备交付 → 手动粘贴发送。' 1
    $project=New-Object Windows.Forms.TableLayoutPanel; $project.Dock='Fill'; $project.ColumnCount=2
    [void]$project.ColumnStyles.Add((New-Object Windows.Forms.ColumnStyle('Percent',100)))
    [void]$project.ColumnStyles.Add((New-Object Windows.Forms.ColumnStyle('Absolute',110)))
    $projectText=New-Object Windows.Forms.Label; $projectText.Text="当前项目  $Repository"; $projectText.Dock='Fill'; $projectText.AutoEllipsis=$true
    $details=New-Object Windows.Forms.Button; $details.Text='项目详情'; $details.AutoSize=$true
    $project.Controls.Add($projectText,0,0); $project.Controls.Add($details,1,0); $layout.Controls.Add($project,0,2)
    $targetRow=New-Object Windows.Forms.TableLayoutPanel; $targetRow.Dock='Fill'; $targetRow.ColumnCount=2
    [void]$targetRow.ColumnStyles.Add((New-Object Windows.Forms.ColumnStyle('Percent',100)))
    [void]$targetRow.ColumnStyles.Add((New-Object Windows.Forms.ColumnStyle('Absolute',175)))
    $target=New-Object Windows.Forms.TextBox; $target.ReadOnly=$true; $target.Dock='Fill'; $target.AccessibleName='已保存的返回 Chat 完整 URL'
    $settings=New-Object Windows.Forms.Button; $settings.Text='设置 / 更换返回对话'; $settings.Dock='Fill'
    $targetRow.Controls.Add($target,0,0); $targetRow.Controls.Add($settings,1,0); $layout.Controls.Add($targetRow,0,3)
    $status=Add-Label '正在读取…' 4
    $preview=New-Object Windows.Forms.TextBox; $preview.Multiline=$true; $preview.ReadOnly=$true; $preview.ScrollBars='Both'; $preview.Dock='Fill'; $preview.WordWrap=$false; $preview.BackColor=[Drawing.Color]::White; $preview.AccessibleName='已捕获的交付预览'
    $layout.Controls.Add($preview,0,5)
    $confirm=New-Object Windows.Forms.CheckBox; $confirm.Text='我确认本轮 Codex 已结束，目标正确，准备返回上面这份交付'; $confirm.Dock='Fill'; $layout.Controls.Add($confirm,0,6)
    $buttons=New-Object Windows.Forms.FlowLayoutPanel; $buttons.Dock='Fill'
    $prepare=New-Object Windows.Forms.Button; $prepare.Text='准备交付并打开 Chat'; $prepare.Size=New-Object Drawing.Size(240,36); $prepare.BackColor=[Drawing.Color]::FromArgb(32,90,170); $prepare.ForeColor=[Drawing.Color]::White; $prepare.FlatStyle='Flat'
    $refresh=New-Object Windows.Forms.Button; $refresh.Text='刷新'; $refresh.Size=New-Object Drawing.Size(90,36)
    $help=New-Object Windows.Forms.Button; $help.Text='使用说明'; $help.Size=New-Object Drawing.Size(110,36)
    $buttons.Controls.AddRange(@($prepare,$refresh,$help)); $layout.Controls.Add($buttons,0,7)
    $footer=Add-Label '仅显示已保存目标，未自动确认当前 MASTER。捕获记录不代表任务已完成或验收。不会自动粘贴或发送。' 8
    if ($Demo) { $form.Text += ' · 演示数据，不连接真实交接'; $title.Text='演示数据，不连接真实交接' }
    $render = {
        $confirm.Checked=$false; $state.Confirmed=$false
        $snap=$state.Snapshot
        $target.Text=$snap.Target
        $preview.Text=$snap.Packet
        $confirm.Enabled=$snap.Valid; $prepare.Enabled=$false
        if ($snap.Valid) { $status.Text='发现已捕获交付 · ' + $snap.Stamp }
        elseif (-not $snap.Target) { $status.Text='未配置有效目标 · 请设置返回对话'; $preview.Text=$snap.Error }
        else { $status.Text='无有效交付 / 记录不完整或不匹配'; $preview.Text='请等 Codex 回复完全结束后刷新。配置存在不代表 Hook 已运行或已受信任。' + "`r`n" + $snap.Error }
    }.GetNewClosure()
    $reload = {
        if ($state.Busy) { return }
        if ($state.Demo) { $state.Snapshot=New-DemoSnapshot 'Captured' }
        else { $state.Snapshot=Get-PanelSnapshot $Repository }
        & $render
    }.GetNewClosure()
    $refresh.Add_Click($reload)
    $confirm.Add_CheckedChanged({ $state.Confirmed=$confirm.Checked; $prepare.Enabled=$confirm.Checked -and $state.Snapshot.Valid -and -not $state.Busy }.GetNewClosure())
    $details.Add_Click({ [void][Windows.Forms.MessageBox]::Show($form, "$Repository`r`nBranch: $($state.Snapshot.Branch)`r`nHEAD: $($state.Snapshot.Head)", '当前项目') }.GetNewClosure())
    $help.Add_Click({ [void][Windows.Forms.MessageBox]::Show($form, "使用说明：$Repository\handoff-kit\ui\README.md`r`nCLI 回退：在项目中运行 .\handoff-kit\handoff.ps1`r`n需要已配置并受信任的现有 Stop Hook；本窗口不安装 Hook。", '使用说明') }.GetNewClosure())
    $settings.Add_Click({
        if ($state.Busy) { return }
        $confirm.Checked=$false
        $dialog=New-Object Windows.Forms.Form; $dialog.Text='设置 / 更换返回对话'; $dialog.Size=New-Object Drawing.Size(700,340); $dialog.StartPosition='CenterParent'; $dialog.Font=$form.Font
        $stack=New-Object Windows.Forms.FlowLayoutPanel; $stack.Dock='Fill'; $stack.Padding=New-Object Windows.Forms.Padding(18); $stack.FlowDirection='TopDown'; $stack.WrapContents=$false; $dialog.Controls.Add($stack)
        $old=New-Object Windows.Forms.Label; $old.Size=New-Object Drawing.Size(635,80); $old.Text='已保存目标（不会自动发现新 MASTER）：' + "`r`n" + $state.Snapshot.Target
        $input=New-Object Windows.Forms.TextBox; $input.Width=630; $input.Text=$state.Snapshot.Target
        $note=New-Object Windows.Forms.Label; $note.Size=New-Object Drawing.Size(635,55); $note.Text='粘贴你明确选择的 ChatGPT 对话 URL。确认保存才改变绑定；取消不修改。'
        $save=New-Object Windows.Forms.Button; $save.Text='确认保存目标'; $save.AutoSize=$true
        $cancel=New-Object Windows.Forms.Button; $cancel.Text='取消'; $cancel.DialogResult='Cancel'
        $stack.Controls.AddRange(@($old,$input,$note,$save,$cancel)); $dialog.CancelButton=$cancel
        $save.Add_Click({
            try {
                . (Join-Path $Repository 'handoff-kit\HandoffKit.Common.ps1')
                [void](Assert-HandoffOriginChat $input.Text)
                $oldTarget=$state.Snapshot.Target
                $rebind= -not [string]::IsNullOrEmpty($oldTarget) -and $oldTarget -cne $input.Text
                if ($rebind -and -not (Confirm-PanelRebind $dialog $oldTarget $input.Text -Demo:$state.Demo)) { return }
                if ($state.Demo) { $state.Snapshot.Target=$input.Text }
                else {
                    $run=Invoke-PanelCore $Repository Configure -Origin $input.Text -Rebind:$rebind
                    if ($run.ExitCode -ne 0) { throw $run.Error }
                    $state.Snapshot=Get-PanelSnapshot $Repository
                }
                & $render; $dialog.Close()
            } catch { $note.Text='未保存：' + $_.Exception.Message }
        }.GetNewClosure())
        [void]$dialog.ShowDialog($form); $dialog.Dispose()
    }.GetNewClosure())
    $prepare.Add_Click({
        if ($state.Busy -or -not $state.Confirmed) { return }
        $prepare.Enabled=$false; $refresh.Enabled=$false; $settings.Enabled=$false
        $status.Text='正在准备…'; $status.Refresh()
        try {
            if ($state.Demo) { $state.Confirmed=$false }
            else { [void](Invoke-PanelReturn $state $Repository) }
            $status.Text='交付已准备；已请求打开目标 Chat，请手动粘贴并发送。'
            if ($state.Demo) { $status.Text='演示成功 · 未写剪贴板，未打开 Chat，未发送。' }
        } catch { $status.Text='准备失败 · 请阅读下方错误并刷新后重试'; $preview.Text=$_.Exception.Message }
        finally { $confirm.Checked=$false; $refresh.Enabled=$true; $settings.Enabled=$true }
    }.GetNewClosure())
    & $reload
    [pscustomobject]@{ Form=$form; State=$state; Render=$render; Reload=$reload; Status=$status; Preview=$preview; Confirm=$confirm; Prepare=$prepare; Settings=$settings }
}

function Confirm-PanelRebind {
    param($Owner,[string]$OldTarget,[string]$NewTarget,[switch]$Demo)
    $dialog=New-Object Windows.Forms.Form; $dialog.Text='确认更换返回对话'; $dialog.ClientSize=New-Object Drawing.Size(680,310); $dialog.Font=$Owner.Font; $dialog.StartPosition='CenterParent'
    $text=New-Object Windows.Forms.TextBox; $text.Multiline=$true; $text.ReadOnly=$true; $text.ScrollBars='Vertical'; $text.Dock='Fill'
    $text.Text="旧目标：`r`n$OldTarget`r`n`r`n新目标：`r`n$NewTarget`r`n`r`n只有确认才会通过 -Rebind 更换目标。取消保留原绑定。"
    if($Demo){$text.Text="演示数据，不连接真实交接。`r`n`r`n"+$text.Text}
    $row=New-Object Windows.Forms.FlowLayoutPanel; $row.Dock='Bottom'; $row.Height=50
    $yes=New-Object Windows.Forms.Button; $yes.Text='确认更换'; $yes.DialogResult='Yes'; $yes.AutoSize=$true
    $no=New-Object Windows.Forms.Button; $no.Text='取消'; $no.DialogResult='Cancel'; $no.AutoSize=$true
    $row.Controls.AddRange(@($yes,$no));$dialog.Controls.Add($text);$dialog.Controls.Add($row);$dialog.CancelButton=$no;$dialog.ActiveControl=$no
    try{return $dialog.ShowDialog($Owner) -eq 'Yes'}finally{$dialog.Dispose()}
}

function New-DemoSnapshot {
    param([string]$View='Captured')
    $snap=[pscustomobject]@{ Target='https://chatgpt.com/c/demo-current-master'; Packet="演示交付 · USABILITY-SPIKE-01`r`n`r`n已完成：中文窗口与现有脚本集成。`r`n自测：隔离数据，不连接真实交接。`r`n下一步：由用户确认目标并手动发送。`r`n`r`nUnicode: 中文 ✓ Ω →"; Stamp='演示捕获时间 2026-09-09 10:30'; Valid=$true; Error=''; Identity='demo'; Branch='prototype/usability-spike-01'; Head='demo — not a real commit' }
    if ($View -eq 'Unconfigured') { $snap.Target=''; $snap.Packet=''; $snap.Valid=$false; $snap.Error='请用“设置 / 更换返回对话”填写一次明确的 Chat URL。' }
    if ($View -eq 'Error') { $snap.Valid=$false; $snap.Error='演示错误：记录来自另一个项目，不能准备交付。' }
    return $snap
}
