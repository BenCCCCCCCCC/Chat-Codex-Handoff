param()
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
. (Join-Path $PSScriptRoot 'PanelAdapter.ps1')
. (Join-Path $PSScriptRoot 'HandoffPanel.ps1')
$repo=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$evidence=Join-Path $repo 'artifacts\usability-spike-01'
[void][IO.Directory]::CreateDirectory($evidence)
$fixture=Join-Path ([IO.Path]::GetTempPath()) ('handoff ui 中文 space ' + [guid]::NewGuid().ToString('N'))
[void][IO.Directory]::CreateDirectory($fixture)
& git init --quiet $fixture
& git -C $fixture -c user.name=Fixture -c user.email=fixture@example.invalid commit --allow-empty --quiet -m fixture
Copy-Item (Join-Path $repo 'handoff-kit') $fixture -Recurse
$isolated=Join-Path $fixture 'isolated'; [void][IO.Directory]::CreateDirectory($isolated)
$script:passed=0; $script:failed=0
$script:log=New-Object Collections.Generic.List[string]
function Check($ok,[string]$name) {
    if($ok){$script:passed++; $line='PASS: '+$name}else{$script:failed++; $line='FAIL: '+$name}
    $script:log.Add($line); Write-Output $line
}
function Write-Text($path,$value){[IO.File]::WriteAllText($path,$value,(New-Object Text.UTF8Encoding($false)))}
$bindingPath=Join-Path $fixture '.git\handoff-kit\origin-chat.json'
$metaPath=Join-Path $isolated 'chat-codex-t06-session.json'
$packetPath=Join-Path $isolated 'packet.md'
$url='https://chatgpt.com/c/demo-one'
$other='https://chatgpt.com/c/demo-two'
$packet="中文交付`r`nUnicode Ω ✓ →`n多行"
$metadata=@{session_id='fixture-session';turn_id='fixture-turn';cwd=$fixture;hook_event_name='Stop';delivery_packet_path=$packetPath;delivery_packet_status='CAPTURED'}
function Restore-Packet {Write-Text $packetPath $packet; Write-Text $metaPath ($metadata | ConvertTo-Json)}
# Hash live files without recording their contents. No clipboard API is called by this test.
$livePaths=@((Join-Path $repo '.git\handoff-kit\origin-chat.json'),(Join-Path $env:TEMP 'chat-codex-t06-session.json'),(Join-Path $repo '.codex\hooks.json'))
if(Test-Path -LiteralPath $livePaths[1]){
    $liveMeta=Get-Content -LiteralPath $livePaths[1] -Raw | ConvertFrom-Json
    if($liveMeta.delivery_packet_path){$livePaths+= $liveMeta.delivery_packet_path}
}
$liveBefore=@{}; foreach($p in $livePaths){if(Test-Path -LiteralPath $p){$liveBefore[$p]=(Get-FileHash -LiteralPath $p).Hash}}
foreach($file in Get-ChildItem $PSScriptRoot -Filter '*.ps1'){
    $tokens=$null; $errors=$null; [void][Management.Automation.Language.Parser]::ParseFile($file.FullName,[ref]$tokens,[ref]$errors)
    Check ($errors.Count -eq 0) ('PS5 parse '+$file.Name)
}
Check ($PSVersionTable.PSVersion.Major -eq 5 -and [Threading.Thread]::CurrentThread.ApartmentState -eq 'STA') 'Windows PowerShell 5.1 STA'
Push-Location $isolated
try {
    Check (-not (Get-PanelSnapshot $fixture $isolated).Valid) 'Missing binding blocks preview from non-repo cwd'
    $r=Invoke-PanelCore $fixture Configure -Origin 'https://evil.example/c/a' -TempDirectory $isolated
    Check ($r.ExitCode -ne 0 -and -not(Test-Path $bindingPath)) 'Invalid URL does not save'
    $r=Invoke-PanelCore $fixture Configure -Origin $url -TempDirectory $isolated
    Check ($r.ExitCode -eq 0) 'Existing configure called in checkout with spaces and Chinese path'
    $binding=[IO.File]::ReadAllText($bindingPath)
    $r=Invoke-PanelCore $fixture Configure -Origin $other -TempDirectory $isolated
    Check ($r.ExitCode -ne 0 -and [IO.File]::ReadAllText($bindingPath) -ceq $binding) 'No silent rebind'
    $r=Invoke-PanelCore $fixture Configure -Origin $other -Rebind -TempDirectory $isolated
    Check ($r.ExitCode -eq 0 -and ((Get-Content $bindingPath -Raw|ConvertFrom-Json).origin_chat -ceq $other)) 'Explicit rebind calls existing script'
    Check (-not(Get-PanelSnapshot $fixture $isolated).Valid) 'Missing metadata blocks preview'
    Restore-Packet
    $snap=Get-PanelSnapshot $fixture $isolated
    Check ($snap.Valid -and $snap.Packet -ceq $packet) 'Core validated Unicode exact preview without clipboard/browser'
    $sha='1234567890abcdef1234567890abcdef12345678'
    $declared="# 中文交付 ✓`r`n- Before HEAD: aaaaaaa`r`n- **Final HEAD**: ``$sha```r`nAfter HEAD: $sha"
    $bytes=[Text.Encoding]::UTF8.GetBytes($declared)
    $s=Get-DeliverySummary $declared $bytes $sha
    Check ($s.Title -ceq '中文交付 ✓' -and $s.Version -ceq $sha -and $s.Relation -eq '与当前项目一致') 'Summary uses actual heading and final only, not Before'
    $none=Get-DeliverySummary 'prose aaaaaaa' ([byte[]]@(1,2)) $sha
    Check ($none.Title -eq '未提供' -and $none.Version -eq '未提供' -and $none.Relation -eq '无法判断') 'Missing declarations never inferred from checkout'
    $conflict=Get-DeliverySummary ($declared+"`nCurrent HEAD: bbbbbbb") $bytes $sha
    Check ($conflict.Version -like '不明确*') 'Conflicting declared versions stay ambiguous'
    $different=Get-DeliverySummary $declared $bytes ('b'*40)
    Check ($different.CheckoutHead -ceq ('b'*40) -and $different.Version -ceq $sha -and $different.Relation -eq '与当前项目不同') 'Checkout version remains separate; mismatch informational'
    Check ($s.Fingerprint -ceq (Get-DeliverySummary $declared $bytes $sha).Fingerprint -and $s.Fingerprint -cne (Get-DeliverySummary $declared ($bytes+[byte]0) $sha).Fingerprint) 'Fingerprint hashes exact bytes, stable and changes including invisible byte'
    $state=@{Snapshot=$snap;Confirmed=$false;Busy=$false}
    try{Invoke-PanelReturn $state $fixture $isolated;Check $false 'Confirmation required'}catch{Check $true 'Confirmation required'}
    $state.Confirmed=$true;Write-Text $packetPath 'changed'
    try{Invoke-PanelReturn $state $fixture $isolated;Check $false 'Changed packet blocks action'}catch{Check (-not $state.Confirmed -and -not $state.Busy) 'Changed packet blocks action and clears confirmation'}
    Restore-Packet
    foreach($case in @('CorruptMetadata','WrongRepo','MissingPacket','EmptyPacket','OversizePacket','InvalidBinding')){
        Restore-Packet; $saved=[IO.File]::ReadAllText($bindingPath)
        switch($case){
            CorruptMetadata {Write-Text $metaPath '{'}
            WrongRepo {$wrong=$metadata.Clone();$wrong.cwd=$isolated;Write-Text $metaPath ($wrong|ConvertTo-Json)}
            MissingPacket {$wrong=$metadata.Clone();$wrong.delivery_packet_path=Join-Path $isolated 'absent';Write-Text $metaPath ($wrong|ConvertTo-Json)}
            EmptyPacket {Write-Text $packetPath ''}
            OversizePacket {Write-Text $packetPath ('x'*65537)}
            InvalidBinding {Write-Text $bindingPath '{}'}
        }
        Check (-not(Get-PanelSnapshot $fixture $isolated).Valid) ($case+' fails closed via existing core')
        Write-Text $bindingPath $saved
    }
    Restore-Packet
    $longUrl='https://chatgpt.com/c/' + ('long-target-'*30)
    $r=Invoke-PanelCore $fixture Configure -Origin $longUrl -Rebind -TempDirectory $isolated
    Check ($r.ExitCode -eq 0 -and (Get-PanelSnapshot $fixture $isolated).Target -ceq $longUrl) 'Long URL survives structured parameter transport'
    $state.Snapshot=Get-PanelSnapshot $fixture $isolated;$state.Confirmed=$true
    [void](Invoke-PanelCore $fixture Configure -Origin $other -Rebind -TempDirectory $isolated)
    try{Invoke-PanelReturn $state $fixture $isolated;Check $false 'Changed target blocks action'}catch{Check (-not $state.Confirmed) 'Changed target blocks action'}
    # In-process seam intercepts real Handoff only; Preview/Configure still run real core in fixture.
    $script:originalCore=${function:Invoke-PanelCore};$script:calls=0;$script:failAction=$false;$script:changeDuring=$false
    function Invoke-PanelCore {
        param($Repository,$Action,$Origin='', [switch]$Rebind,$TempDirectory=$env:TEMP,[switch]$CopyOnly)
        if($Action -eq 'Handoff'){
            $script:calls++
            if($script:changeDuring){Write-Text $packetPath 'changed during action'}
            return [pscustomobject]@{ExitCode=[int]$script:failAction;Error='fixture failure';Output='mock handoff'}
        }
        & $script:originalCore $Repository $Action -Origin $Origin -Rebind:$Rebind -TempDirectory $TempDirectory -CopyOnly:$CopyOnly
    }
    $state.Snapshot=Get-PanelSnapshot $fixture $isolated;$state.Confirmed=$true
    $r=Invoke-PanelReturn $state $fixture $isolated
    Check ($r.ExitCode -eq 0 -and $script:calls -eq 1) 'Confirmed stable action invokes handoff seam once'
    $state.Confirmed=$true;$state.Busy=$true
    try{Invoke-PanelReturn $state $fixture $isolated}catch{}
    Check ($script:calls -eq 1) 'Busy guard rejects concurrent invocation'
    $state.Busy=$false;$state.Confirmed=$true;$script:failAction=$true
    try{Invoke-PanelReturn $state $fixture $isolated;Check $false 'Failed action not success'}catch{Check (-not $state.Busy -and -not $state.Confirmed) 'Failed action not success and clears confirmation'}
    $script:failAction=$false;$script:changeDuring=$true;$state.Confirmed=$true
    try{Invoke-PanelReturn $state $fixture $isolated;Check $false 'Mid-action change not success'}catch{Check ($_.Exception.Message -like '*during preparation*') 'Mid-action change not reported as complete success'}
    Restore-Packet
    ${function:Invoke-PanelCore}=$script:originalCore
    # Fixture-only OS-effect spies. The adapter still forwards to the actual core -CopyOnly.
    $fixtureCore=Join-Path $fixture 'handoff-kit\handoff.ps1'
    $coreText=[IO.File]::ReadAllText($fixtureCore)
    $spies=@'
if ($d.Action -eq 'Handoff') {
    function Set-Clipboard { param([string]$Value) [IO.File]::WriteAllText((Join-Path $env:TEMP 'copied.txt'),$Value) }
    function Start-Process { param([string]$FilePath) [IO.File]::WriteAllText((Join-Path $env:TEMP 'opened.txt'),$FilePath) }
}
'@
    Write-Text $fixtureCore ($coreText.Replace('$ErrorActionPreference = ''Stop''', $spies+"`r`n"+'$ErrorActionPreference = ''Stop'''))
    foreach($copyOnly in @($true,$false)){
        $state.Snapshot=Get-PanelSnapshot $fixture $isolated;$state.Confirmed=$false
        try{Invoke-PanelReturn $state $fixture $isolated -CopyOnly:$copyOnly;Check $false 'Route needs confirmation'}catch{Check $true "Confirmation gated CopyOnly=$copyOnly"}
        $state.Confirmed=$true;Write-Text $packetPath 'changed'
        try{Invoke-PanelReturn $state $fixture $isolated -CopyOnly:$copyOnly;Check $false 'Changed route packet'}catch{Check (-not $state.Confirmed) "Packet change rejects CopyOnly=$copyOnly"}
        Restore-Packet;$state.Snapshot=Get-PanelSnapshot $fixture $isolated;$state.Confirmed=$true
        $savedBinding=[IO.File]::ReadAllText($bindingPath)
        Write-Text $bindingPath ($savedBinding.Replace($other,$url))
        try{Invoke-PanelReturn $state $fixture $isolated -CopyOnly:$copyOnly;Check $false 'Changed route target'}catch{Check (-not $state.Confirmed) "Target change rejects CopyOnly=$copyOnly"}
        Write-Text $bindingPath $savedBinding
        $state.Snapshot=Get-PanelSnapshot $fixture $isolated;$state.Confirmed=$true;$state.Busy=$true
        try{Invoke-PanelReturn $state $fixture $isolated -CopyOnly:$copyOnly;Check $false 'Busy route'}catch{Check $true "Busy guard rejects CopyOnly=$copyOnly"}
        $state.Busy=$false
        $result=Invoke-PanelReturn $state $fixture $isolated -CopyOnly:$copyOnly
        Check ($result.ExitCode -eq 0 -and [IO.File]::ReadAllText((Join-Path $isolated 'copied.txt')) -ceq $packet) "Actual adapter/core exact payload CopyOnly=$copyOnly"
        if($copyOnly){Check (-not(Test-Path (Join-Path $isolated 'opened.txt'))) 'CopyOnly actual adapter/core has zero browser requests'}
        else{Check ([IO.File]::ReadAllText((Join-Path $isolated 'opened.txt')) -ceq $other) 'Web action requests exact bound URL'}
    }
    Write-Text $fixtureCore $coreText
    $panel=New-HandoffPanel -Repository $fixture -Demo
    $panel.Form.Show()
    [Windows.Forms.Application]::DoEvents()
    $graphics=$panel.Form.CreateGraphics();$script:log.Add("Rendered DPI: $($graphics.DpiX) x $($graphics.DpiY)");$graphics.Dispose()
    Check ($panel.Form.SelectNextControl($null,$true,$true,$true,$true)) 'Native tab traversal finds focusable control'
    $panel.Confirm.Checked=$true; & $panel.Reload
    Check (-not $panel.Confirm.Checked -and -not $panel.Prepare.Enabled) 'Refresh invalidates confirmation'
    function Save-Panel($name){
        $panel.Form.PerformLayout();$panel.Form.CreateControl()
        [Windows.Forms.Application]::DoEvents()
        $bitmap=New-Object Drawing.Bitmap($panel.Form.Width,$panel.Form.Height)
        try{$panel.Form.DrawToBitmap($bitmap,(New-Object Drawing.Rectangle(0,0,$bitmap.Width,$bitmap.Height)));$bitmap.Save((Join-Path $evidence ($name+'.png')))}finally{$bitmap.Dispose()}
    }
    foreach($view in @('Unconfigured','Captured','Error')){$panel.State.Snapshot=New-DemoSnapshot $view;& $panel.Render;Save-Panel $view}
    $panel.State.Snapshot=New-DemoSnapshot;& $panel.Render
    $panel.Confirm.Checked=$true
    # PerformClick requires a visible selectable control; use its actual registered event via OnClick.
    $click=[Windows.Forms.Control].GetMethod('OnClick',[Reflection.BindingFlags]'Instance,NonPublic')
    $click.Invoke($panel.Prepare,@([EventArgs]::Empty))
    Check ($panel.Status.Text -like '演示成功*') 'Demo prepare uses actual event with zero OS effects'
    Save-Panel 'Success'
    Check ($panel.Status.Text -like '*仅复制路线*') 'Copy-only distinct demo success'
    $panel.Confirm.Checked=$true;$click.Invoke($panel.OpenWeb,@([EventArgs]::Empty))
    Check ($panel.Status.Text -like '*复制并打开网页路线*') 'Web distinct demo success'
    Save-Panel 'Success-open-web'
    $panel.Form.ClientSize=New-Object Drawing.Size(740,640);Save-Panel 'Small-window'
    $panel.Form.ClientSize=New-Object Drawing.Size(960,740)
    # Capture only our own settings dialog using a UI timer, then cancel without saving.
    $timer=New-Object Windows.Forms.Timer;$timer.Interval=250
    $timer.Add_Tick({
        foreach($window in @([Windows.Forms.Application]::OpenForms)){
            if($window.Text -eq '设置 / 更换返回对话'){
                $bitmap=New-Object Drawing.Bitmap($window.Width,$window.Height)
                $window.DrawToBitmap($bitmap,(New-Object Drawing.Rectangle(0,0,$bitmap.Width,$bitmap.Height)))
                $bitmap.Save((Join-Path $evidence 'Rebind-dialog.png'));$bitmap.Dispose();$window.Close();$timer.Stop()
            }
        }
    }.GetNewClosure())
    $beforeCancel=[IO.File]::ReadAllText($bindingPath)
    $timer.Start();$click.Invoke($panel.Settings,@([EventArgs]::Empty));$timer.Dispose()
    Check ([IO.File]::ReadAllText($bindingPath) -ceq $beforeCancel) 'Cancel target dialog preserves fixture binding'
    $timer=New-Object Windows.Forms.Timer;$timer.Interval=250
    $timer.Add_Tick({
        foreach($window in @([Windows.Forms.Application]::OpenForms)){
            if($window.Text -eq '确认更换返回对话'){
                $bitmap=New-Object Drawing.Bitmap($window.Width,$window.Height)
                $window.DrawToBitmap($bitmap,(New-Object Drawing.Rectangle(0,0,$bitmap.Width,$bitmap.Height)))
                $bitmap.Save((Join-Path $evidence 'Rebind-confirmation.png'));$bitmap.Dispose();$window.Close();$timer.Stop()
            }
        }
    }.GetNewClosure())
    $timer.Start();$accepted=Confirm-PanelRebind $panel.Form $url $other -Demo;$timer.Dispose()
    Check (-not $accepted -and [IO.File]::ReadAllText($bindingPath) -ceq $beforeCancel) 'Explicit old/new confirmation cancelled without writes'
    $panel.Form.Dispose();Check $panel.Form.IsDisposed 'Window disposed; no background worker'
    $launch=New-Object Diagnostics.ProcessStartInfo
    $launch.FileName="$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe"
    $lifecyclePath=Join-Path $isolated 'lifecycle.txt'
    $launch.Arguments='-NoProfile -STA -File "' + (Join-Path $fixture 'handoff-kit\ui\Start-Handoff.ps1') + '" -Demo -TestLifecyclePath "' + $lifecyclePath + '"'
    $launch.WorkingDirectory=$isolated;$launch.UseShellExecute=$false;$launch.CreateNoWindow=$true
    $launch.EnvironmentVariables['TEMP']=$isolated;$launch.EnvironmentVariables['TMP']=$isolated
    $child=[Diagnostics.Process]::Start($launch)
    try{
        $exited=$child.WaitForExit(15000)
        $receipt=if(Test-Path -LiteralPath $lifecyclePath){[IO.File]::ReadAllText($lifecyclePath)}else{''}
        Check ($receipt.Contains("READY pid=$($child.Id) repo=$fixture")) 'Owned demo emitted readiness for exact PID and checkout'
        Check ($exited -and $child.ExitCode -eq 0 -and $receipt.Contains('CLOSED disposed=True')) 'Owned demo self-closed, disposed and exited with code zero'
        $script:log.Add("OWNED_CHILD_PID=$($child.Id) EXITED=$exited")
        $script:log.Add($receipt)
    }finally{
        if(-not $child.HasExited){$child.Kill();$child.WaitForExit();$script:log.Add('Owned child timeout cleanup; test failed.')}
        $child.Dispose()
    }
    foreach($p in $liveBefore.Keys){Check ((Get-FileHash -LiteralPath $p).Hash -ceq $liveBefore[$p]) ('Live file unchanged: '+[IO.Path]::GetFileName($p))}
}
finally{Pop-Location}
$summary="RESULT: passed=$script:passed failed=$script:failed"
$script:log.Add($summary);Write-Output $summary
$script:log.Add('Fixture retained in OS TEMP; no live clipboard/browser actions. Screenshots use demo only.')
Write-Text (Join-Path $evidence 'ui-tests.txt') ($script:log -join "`r`n")
if($script:failed -gt 0){exit 1}
