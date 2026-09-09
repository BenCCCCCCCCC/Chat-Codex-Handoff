param([switch]$Historical)
$ErrorActionPreference='Stop'
Import-Module (Join-Path $PSScriptRoot 'AcceptanceEvidence.psm1') -Force
$repo=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$head=(& git -C $repo rev-parse HEAD | Out-String).Trim()
$prefix='test-'+[guid]::NewGuid().ToString('N')
$base=Join-Path $repo ('artifacts/acceptance-p0/'+$prefix)
[void][IO.Directory]::CreateDirectory($base)
$script:passed=0;$script:failed=0;$script:lines=@();$script:n=0
function Check($Ok,$Name){
    $line=if($Ok){$script:passed++;'PASS: '+$Name}else{$script:failed++;'FAIL: '+$Name}
    $script:lines+=$line;Write-Output $line
}
function Text($Path,$Value){[IO.File]::WriteAllText($Path,$Value,(New-Object Text.UTF8Encoding($false)))}
function Save($Value){
    $script:n++
    $rel='artifacts/acceptance-p0/'+$prefix+'/input-'+$script:n+'.json'
    Text (Join-Path $repo $rel) ($Value | ConvertTo-Json -Depth 25)
    return $rel
}
function Contract {
    return (@{
        schema_version=1
        task=@{task_id='fixture';requirement_revision='REQ-v3';target_code_revision=('a'*40);requirement_source=$null;requirement_sha256=$null;mode='SYNTHETIC_FIXTURE';criteria=@(@{criterion_id='C1';text='中文 <script>alert(1)</script> 条件';required_evidence_types=@('TEST_LOG')})}
        artifacts=@(@{artifact_id='E1';path=('artifacts/acceptance-p0/'+$prefix+'/中文 空格.txt');source_type='SYNTHETIC_FIXTURE';evidence_revision=('a'*40);evidence_type='TEST_LOG';criterion_ids=@('C1')})
        reviews=@()
    } | ConvertTo-Json -Depth 20 | ConvertFrom-Json)
}
function Review($Suggestion='SATISFIED'){
    return [pscustomobject]@{criterion_id='C1';reviewer='fixture reviewer';provenance='synthetic only';source_type='SYNTHETIC_FIXTURE';suggestion=$Suggestion;rationale='<img src=x onerror=alert(1)> fixture';evidence_refs=@('E1')}
}
function Snapshot($Config){
    $inputRel=Save $Config
    New-P0Snapshot $repo $inputRel ($prefix+'-'+$script:n)
}
function Reject($Action,$Name){try{& $Action | Out-Null;Check $false $Name}catch{Check $true $Name}}
Text (Join-Path $base '中文 空格.txt') ("中文 Ω"+[char]13+[char]10+"UTF-8"+[char]10)
Check ($PSVersionTable.PSVersion.Major -eq 5) 'Windows PowerShell 5.1'
foreach($f in @('AcceptanceEvidence.psm1','Invoke-AcceptanceReport.ps1','tests.ps1')){
    $errors=$null;$tokens=$null
    [void][Management.Automation.Language.Parser]::ParseFile((Join-Path $PSScriptRoot $f),[ref]$tokens,[ref]$errors)
    Check ($errors.Count -eq 0) ('Parse '+$f)
}
$c=Contract;$run=Snapshot $c;$r=Write-P0Report $run
Check ($r.criteria[0].criterion -eq 'NOT_REVIEWED' -and $r.owner_decision -eq 'PENDING') 'No reviewer never auto-accepts'
Check ($r.requirement_revision -eq 'REQ-v3' -and $r.target_code_revision -eq ('a'*40) -and $r.artifacts[0].evidence_revision -eq ('a'*40) -and $r.snapshot_checkout_head -eq $head) 'Four version fields remain separate'
Check ($null -eq $r.artifacts[0].generated_at -and $null -eq $r.artifacts[0].exit_code) 'No invented execution time/exit'
Check ($r.approval_status -eq 'SYNTHETIC_FIXTURE' -and $r.mode -eq 'SYNTHETIC_FIXTURE') 'Synthetic label retained'
Check ((Get-FileHash (Join-Path $base '中文 空格.txt')).Hash -eq (Get-FileHash (Join-Path $run 'snapshot/E1.txt')).Hash) 'Exact UTF-8/newline snapshot bytes'
$html=[IO.File]::ReadAllText((Join-Path $run 'report.html'))
Check ($html.Contains('&lt;script&gt;') -and -not $html.Contains('<script>') -and -not $html.Contains('<button')) 'HTML escaped, no approval controls'
$oldHash=(Get-FileHash (Join-Path $run 'report.json')).Hash
$inputRel=Save $c
Reject {New-P0Snapshot $repo $inputRel (Split-Path $run -Leaf)} 'Duplicate run rejected'
Check ((Get-FileHash (Join-Path $run 'report.json')).Hash -eq $oldHash) 'Collision preserves old report bytes'
Reject {Write-P0Report $run} 'Report overwrite refused'
Text (Join-Path $base '中文 空格.txt') 'changed source'
Check ((Test-P0Snapshot $run).artifacts[0].artifact_integrity -eq 'VALID') 'Existing snapshot does not follow mutable source'
$newRun=Snapshot $c
Check ((Get-FileHash (Join-Path $run 'report.json')).Hash -eq $oldHash -and (Get-FileHash (Join-Path $newRun 'snapshot/E1.txt')).Hash -ne (Get-FileHash (Join-Path $run 'snapshot/E1.txt')).Hash) 'Independent new run retains old snapshot'
Text (Join-Path $newRun 'snapshot/E1.txt') 'tamper'
Check ((Test-P0Snapshot $newRun).artifacts[0].artifact_integrity -eq 'INVALID') 'Tampered snapshot hash invalid'
$c=Contract;$c.reviews=@(Review);$okRun=Snapshot $c;$r=Write-P0Report $okRun
Check ($r.criteria[0].criterion -eq 'SATISFIED' -and $r.owner_decision -eq 'PENDING') 'Sourced synthetic suggestion not owner approval'
$reviewHtml=[IO.File]::ReadAllText((Join-Path $okRun 'report.html'))
Check (-not $reviewHtml.Contains('<img') -and ($reviewHtml.Contains('&lt;img') -or $reviewHtml.Contains('\u003cimg'))) 'Reviewer HTML escaped'
foreach($case in @('missing','hash','version','unknown-version','wrong-type','wrong-scope','unknown-ref','dirty','conflict','no-provenance','unknown-source','missing-requirement','synthetic-for-history')){
    $c=Contract;$c.reviews=@(Review)
    switch($case){
        missing {$c.artifacts[0].path='artifacts/acceptance-p0/'+$prefix+'/absent.txt'}
        hash {$c.artifacts[0] | Add-Member expected_sha256 ('0'*64)}
        version {$c.artifacts[0].evidence_revision=('b'*40)}
        'unknown-version' {$c.artifacts[0].evidence_revision=$null}
        'wrong-type' {$c.artifacts[0].evidence_type='SCREENSHOT'}
        'wrong-scope' {$c.artifacts[0].criterion_ids=@()}
        'unknown-ref' {$c.reviews[0].evidence_refs=@('absent')}
        dirty {$c.task | Add-Member target_worktree_dirty $true}
        conflict {$c.reviews+=Review 'NOT_SATISFIED'}
        'no-provenance' {$c.reviews[0].provenance=''}
        'unknown-source' {$c.artifacts[0].source_type='IMPORTED_UNKNOWN'}
        'missing-requirement' {$c.task.mode='HISTORICAL_REPLAY';$c.artifacts[0].source_type='REPORTED';$c.reviews[0].source_type='REPORTED'}
        'synthetic-for-history' {$c.task.mode='HISTORICAL_REPLAY'}
    }
    $r=Test-P0Snapshot (Snapshot $c)
    Check ($r.criteria[0].criterion -eq 'INSUFFICIENT_EVIDENCE' -and $r.owner_decision -eq 'PENDING') ('Honest insufficient: '+$case)
    if($case -eq 'unknown-version'){Check ($null -eq $r.artifacts[0].evidence_revision -and $r.artifacts[0].applicability -eq 'UNKNOWN') 'Unknown not filled by checkout'}
    if($case -eq 'dirty'){Check ($r.artifacts[0].applicability -eq 'UNKNOWN') 'Dirty target without diff identity unknown'}
}
$c=Contract;$c.task.mode='HISTORICAL_REPLAY'
$c.task | Add-Member approval_status 'OWNER_APPROVED'
$r=Test-P0Snapshot (Snapshot $c)
Check ($r.approval_status -eq 'UNKNOWN') 'Approval claim without source not upgraded'
$c=Contract;$c.reviews=@(Review);$c.task.requirement_source='E1';$c.task.requirement_sha256=('0'*64)
Check ((Test-P0Snapshot (Snapshot $c)).criteria[0].criterion -eq 'INSUFFICIENT_EVIDENCE') 'Requirement hash mismatch blocks positive'
foreach($case in @('duplicate-artifact','duplicate-criterion','missing-id','bad-criterion','bad-review-criterion','traversal','absolute','executable','unknown-extension','oversize')){
    $c=Contract
    switch($case){
        'duplicate-artifact' {$c.artifacts+= $c.artifacts[0]}
        'duplicate-criterion' {$c.task.criteria+= $c.task.criteria[0]}
        'missing-id' {$c.artifacts[0].artifact_id=''}
        'bad-criterion' {$c.artifacts[0].criterion_ids=@('C99')}
        'bad-review-criterion' {$c.reviews=@(Review);$c.reviews[0].criterion_id='C99'}
        traversal {$c.artifacts[0].path='../outside.txt'}
        absolute {$c.artifacts[0].path='C:/outside.txt'}
        executable {$c.artifacts[0].path='acceptance-p0/tests.ps1'}
        'unknown-extension' {$c.artifacts[0].path='payload.html'}
        oversize {Text (Join-Path $base 'large.txt') ('x'*(1MB+1));$c.artifacts[0].path='artifacts/acceptance-p0/'+$prefix+'/large.txt'}
    }
    Reject {Snapshot $c} ('Reject '+$case)
}
# Owned junction fixture only; no process enumeration/elevation. No deletion of linked trees.
$link=Join-Path $base 'junction'
$linkTarget=Join-Path $base 'owned-target';[void][IO.Directory]::CreateDirectory($linkTarget)
[void](New-Item -ItemType Junction -Path $link -Target $linkTarget)
$c=Contract;$c.artifacts[0].path='artifacts/acceptance-p0/'+$prefix+'/junction/中文 空格.txt'
Reject {Snapshot $c} 'Reject junction/reparse path'
[IO.Directory]::Delete($link) # Remove only the test-owned junction, not its target.
$c=Contract;$tamper=Snapshot $c
Text (Join-Path $tamper 'snapshot/task.json') '{}'
Reject {Test-P0Snapshot $tamper} 'Requirement snapshot tampering fails'
$c=Contract;$missing=Snapshot $c
# Only the exact test-owned copy is removed, never original material.
[IO.File]::Delete((Join-Path $missing 'snapshot/E1.txt'))
Check ((Test-P0Snapshot $missing).artifacts[0].artifact_integrity -eq 'INVALID') 'Missing snapshot file invalid'
$c=Contract;$c.reviews=@(Review);$c.reviews[0].reviewer=''
Check ((Test-P0Snapshot (Snapshot $c)).criteria[0].criterion -eq 'NOT_REVIEWED') 'Blank reviewer stays NOT_REVIEWED'
$c=Contract;$cliInput=Save $c
$cliOutput=& "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -File (Join-Path $PSScriptRoot 'Invoke-AcceptanceReport.ps1') -Repository $repo -InputPath $cliInput -RunId ($prefix+'-cli')
$cliExit=$LASTEXITCODE
$cliResult=($cliOutput | Out-String) | ConvertFrom-Json
Check ($cliExit -eq 0 -and $cliResult.owner_decision -eq 'PENDING') 'CLI snapshot validate render in PS5.1'
$c=Contract;$tamperedOutput=Snapshot $c;[void](Write-P0Report $tamperedOutput)
Text (Join-Path $tamperedOutput 'report.html') '<script>bad</script>'
Reject {New-P0Bundle $tamperedOutput $repo @{mode='SYNTHETIC_FIXTURE'}} 'Bundle rejects modified rendered HTML'
$c=Contract;$c.artifacts[0] | Add-Member transformation 'redacted'
Reject {Snapshot $c} 'Derived material without original hash rejected'
$historicalRun=$null
if($Historical){
    $r0=Get-Content (Join-Path $repo 'artifacts/strategy-reset-01/EVIDENCE_INDEX.json') -Raw | ConvertFrom-Json
    if(-not @($r0.cases | Where-Object {$_.id -eq 'R0-07'}).Count){throw 'Historical source unavailable: PARTIAL'}
    $historical=@{
        schema_version=1
        task=@{task_id='R0-07-replay';requirement_revision=$null;target_code_revision='0c2440b06ffe5657331d4395a4181929d28c5ebf';requirement_source=$null;requirement_sha256=$null;mode='HISTORICAL_REPLAY';approval_status='UNKNOWN';notes='R0-07 reconstructed inspection question, not original owner-approved criteria. Materials selected now; no claim they were original earlier inputs.';criteria=@(@{criterion_id='H1';text='这些历史日志与索引能否支持目标版本的验收？原批准要求未冻结。';required_evidence_types=@('TEST_LOG','INVENTORY')})}
        artifacts=@(
            @{artifact_id='old-log';path='artifacts/usability-spike-01/core-tests.txt';source_type='IMPORTED_UNKNOWN';evidence_revision=$null;evidence_type='TEST_LOG';criterion_ids=@('H1')},
            @{artifact_id='old-index';path='artifacts/usability-spike-01/screenshot-inventory.json';source_type='REPORTED';evidence_revision='3a925c13dae51e7d3f3a89977a993ebafb771f1d';evidence_type='INVENTORY';criterion_ids=@('H1')}
        )
        reviews=@()
    }
    $before=@{};foreach($a in $historical.artifacts){$before[$a.path]=(Get-FileHash (Join-Path $repo $a.path)).Hash}
    $historicalRun=Snapshot ($historical | ConvertTo-Json -Depth 20 | ConvertFrom-Json)
    $r=Write-P0Report $historicalRun
    Check ($r.criteria[0].criterion -eq 'NOT_REVIEWED' -and $r.approval_status -eq 'UNKNOWN' -and $r.artifacts[0].applicability -eq 'UNKNOWN' -and $r.artifacts[1].applicability -eq 'MISMATCH') 'Historical replay retains absent requirements, unknown and mixed revisions'
    $unchanged=$true;foreach($a in $historical.artifacts){if($before[$a.path] -ne (Get-FileHash (Join-Path $repo $a.path)).Hash){$unchanged=$false}}
    Check $unchanged 'Historical source bytes unchanged'
}
$receipt=[ordered]@{suite='acceptance-p0';mode='OFFLINE_SELF_TEST';before_head='0c2440b06ffe5657331d4395a4181929d28c5ebf';head=$head;scope=@(& git -C $repo diff --name-only 0c2440b06ffe5657331d4395a4181929d28c5ebf HEAD);command='powershell.exe -NoProfile -File acceptance-p0/tests.ps1 -Historical';passed=$script:passed;failed=$script:failed;exit_code=[int]($script:failed -gt 0);assertions=$script:lines;historical_replay=($null -ne $historicalRun);html_visual='NOT VERIFIED'}
if(-not $Historical){$receipt.command='powershell.exe -NoProfile -File acceptance-p0/tests.ps1'}
Text (Join-Path $base 'test-results.json') ($receipt | ConvertTo-Json -Depth 20)
if($Historical -and $script:failed -eq 0){
    $bundleHash=New-P0Bundle $historicalRun $repo $receipt
    Write-Output "REVIEW_RUN=$historicalRun"
    Write-Output "BUNDLE_SHA256=$bundleHash"
}
Write-Output "RESULT: passed=$script:passed failed=$script:failed"
if($script:failed -gt 0){exit 1}
