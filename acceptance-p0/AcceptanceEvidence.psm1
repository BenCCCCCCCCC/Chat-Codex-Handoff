Set-StrictMode -Version 2.0
$ErrorActionPreference='Stop'
$script:Limit=1MB
function Get-Field($Object,[string]$Name,$Default=$null) {
    if($null -ne $Object -and $null -ne $Object.PSObject.Properties[$Name]) { return $Object.$Name }
    return $Default
}
function Write-NewText([string]$Path,[string]$Text) {
    $bytes=(New-Object Text.UTF8Encoding($false)).GetBytes($Text)
    $stream=[IO.File]::Open($Path,[IO.FileMode]::CreateNew,[IO.FileAccess]::Write,[IO.FileShare]::None)
    try{$stream.Write($bytes,0,$bytes.Length)}finally{$stream.Dispose()}
}
function Write-NewJson($Path,$Value) { Write-NewText $Path (ConvertTo-Json -InputObject $Value -Depth 30) }
function Get-BytesHash([byte[]]$Bytes) {
    $hash=[Security.Cryptography.SHA256]::Create()
    try{return ([BitConverter]::ToString($hash.ComputeHash($Bytes))).Replace('-','')}finally{$hash.Dispose()}
}
function Resolve-SafePath([string]$Root,[string]$Relative) {
    if([string]::IsNullOrWhiteSpace($Relative) -or $Relative -match '[:\\]' -or $Relative.StartsWith('/') -or $Relative -match '[<>|?*]' -or $Relative -match '[\x00-\x1f]'){throw 'Unsafe relative path'}
    $parts=$Relative.Split('/')
    foreach($part in $parts){
        if($part -in @('','.','..','.git','.codex') -or $part -match '[. ]$' -or $part -match '^(?i:con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)'){throw 'Unsafe path component'}
    }
    $base=[IO.Path]::GetFullPath($Root).TrimEnd('\','/')
    if((Get-Item -LiteralPath $base -Force).Attributes -band [IO.FileAttributes]::ReparsePoint){throw 'Reparse root rejected'}
    $current=$base
    foreach($part in $parts){
        $current=Join-Path $current $part
        if(Test-Path -LiteralPath $current){
            if((Get-Item -LiteralPath $current -Force).Attributes -band [IO.FileAttributes]::ReparsePoint){throw 'Reparse path rejected'}
        }
    }
    if(-not ([IO.Path]::GetFullPath($current)).StartsWith($base+[IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)){throw 'Path outside root'}
    return $current
}
function Read-LimitedBytes($Path) {
    $item=Get-Item -LiteralPath $Path
    if($item.PSIsContainer -or $item.Length -gt $script:Limit){throw 'Input must be a file of at most 1 MiB'}
    $bytes=[IO.File]::ReadAllBytes($Path)
    if($bytes.Length -gt $script:Limit){throw 'Input size changed beyond limit'}
    return ,$bytes
}
function Read-P0Json($Path) {
    $bytes=Read-LimitedBytes $Path
    $text=(New-Object Text.UTF8Encoding($false,$true)).GetString($bytes).TrimStart([char]0xFEFF)
    return ($text | ConvertFrom-Json)
}
function Assert-ID($Id) {
    if($Id -isnot [string] -or $Id -cnotmatch '^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$'){throw 'Missing/invalid ID'}
}
function Assert-Fields($Value,$Names) {
    foreach($name in $Names){if($null -eq $Value -or $null -eq $Value.PSObject.Properties[$name]){throw "Missing field: $name"}}
}
function Assert-ShaOrNull($Value) { if($null -ne $Value -and ($Value -isnot [string] -or $Value -notmatch '^[a-fA-F0-9]{40}$')){throw 'Revision must be a full Git SHA or null'} }
function Assert-Contract($InputData) {
    Assert-Fields $InputData @('schema_version','task','artifacts')
    if($InputData.schema_version -ne 1){throw 'Unsupported schema version'}
    $task=$InputData.task
    Assert-Fields $task @('task_id','requirement_revision','target_code_revision','requirement_source','requirement_sha256','criteria','mode')
    Assert-ID $task.task_id
    if($task.mode -notin @('HISTORICAL_REPLAY','SYNTHETIC_FIXTURE','IMPORTED_UNKNOWN')){throw 'Explicit mode required'}
    Assert-ShaOrNull $task.target_code_revision
    if($null -ne $task.requirement_revision -and $task.requirement_revision -isnot [string]){throw 'Requirement revision must be string or null'}
    $ids=@{}
    if($task.criteria -isnot [array] -or $task.criteria.Count -lt 1 -or $task.criteria.Count -gt 100){throw 'Criteria count must be 1..100'}
    foreach($c in $task.criteria){
        Assert-Fields $c @('criterion_id','text','required_evidence_types')
        Assert-ID $c.criterion_id
        if($ids.ContainsKey($c.criterion_id)){throw 'Duplicate criterion ID'}
        $ids[$c.criterion_id]=$true
        if([string]::IsNullOrWhiteSpace($c.text) -or $c.text -isnot [string]){throw 'Criterion text required'}
        if($c.required_evidence_types -isnot [array] -or $c.required_evidence_types.Count -eq 0){throw 'Evidence types required'}
        foreach($type in $c.required_evidence_types){Assert-ID $type}
    }
    if($InputData.artifacts -isnot [array] -or $InputData.artifacts.Count -gt 50){throw 'Artifacts must be an array, maximum 50'}
    $aids=@{}
    foreach($a in $InputData.artifacts){
        Assert-Fields $a @('artifact_id','path','source_type','evidence_revision','evidence_type','criterion_ids')
        Assert-ID $a.artifact_id
        if($aids.ContainsKey($a.artifact_id)){throw 'Duplicate artifact ID'}
        $aids[$a.artifact_id]=$true
        if($a.source_type -notin @('RECORDED_RUN','REPORTED','IMPORTED_UNKNOWN','SYNTHETIC_FIXTURE')){throw 'Unknown source type'}
        Assert-ShaOrNull $a.evidence_revision
        Assert-ID $a.evidence_type
        if($a.criterion_ids -isnot [array]){throw 'Criterion references must be an array'}
        foreach($id in $a.criterion_ids){if(-not $ids.ContainsKey($id)){throw 'Unknown criterion reference'}}
        if([IO.Path]::GetExtension($a.path) -notin @('.txt','.log','.md','.json','.csv')){throw 'Only passive text materials are supported'}
        $expected=Get-Field $a 'expected_sha256'
        if($null -ne $expected -and $expected -notmatch '^[a-fA-F0-9]{64}$'){throw 'Invalid declared SHA256'}
        $derived=Get-Field $a 'derived_from_hash';$transform=Get-Field $a 'transformation'
        if(($null -ne $derived -or $null -ne $transform) -and ($derived -notmatch '^[a-fA-F0-9]{64}$' -or [string]::IsNullOrWhiteSpace($transform))){throw 'Derived material requires original hash and transformation'}
    }
    if($null -ne $task.requirement_source){
        if(-not $aids.ContainsKey($task.requirement_source) -or $task.requirement_sha256 -notmatch '^[a-fA-F0-9]{64}$'){throw 'Invalid requirement reference/hash'}
    }elseif($null -ne $task.requirement_sha256){throw 'Requirement hash without source'}
    foreach($review in @(Get-Field $InputData 'reviews' @())){
        Assert-Fields $review @('criterion_id','reviewer','provenance','suggestion','rationale','evidence_refs','source_type')
        if(-not $ids.ContainsKey($review.criterion_id)){throw 'Unknown review criterion'}
        if($review.suggestion -notin @('SATISFIED','NOT_SATISFIED','INSUFFICIENT_EVIDENCE')){throw 'Invalid review suggestion'}
        if($review.source_type -notin @('REPORTED','SYNTHETIC_FIXTURE','IMPORTED_UNKNOWN')){throw 'Invalid reviewer source type'}
        if($review.evidence_refs -isnot [array]){throw 'Review references must be an array'}
        foreach($textField in @('reviewer','provenance','rationale')){if($null -ne $review.$textField -and $review.$textField -isnot [string]){throw 'Review text must be string or null'}}
    }
}
function New-P0Snapshot([string]$Repository,[string]$InputPath,[string]$RunId) {
    Assert-ID $RunId
    $repo=[IO.Path]::GetFullPath($Repository)
    $head=(& git -C $repo rev-parse HEAD | Out-String).Trim()
    if($LASTEXITCODE -ne 0){throw 'Repository HEAD unavailable'}
    $root=(& git -C $repo rev-parse --show-toplevel | Out-String).Trim()
    if([IO.Path]::GetFullPath($root).TrimEnd('\','/') -ine $repo.TrimEnd('\','/')){throw 'Repository must be checkout root'}
    $dirty=(@(& git -C $repo status --porcelain).Count -gt 0)
    $inputFile=Resolve-SafePath $repo $InputPath
    $inputData=Read-P0Json $inputFile
    Assert-Contract $inputData
    # Preflight all paths before creating anything. Missing declared files are represented honestly.
    foreach($a in $inputData.artifacts){[void](Resolve-SafePath $repo $a.path)}
    $run=Resolve-SafePath $repo ("artifacts/acceptance-p0/"+$RunId)
    if(Test-Path -LiteralPath $run){throw 'Run already exists; no overwrite'}
    $parent=Split-Path $run -Parent
    [void][IO.Directory]::CreateDirectory($parent)
    # Directory claim via CreateNew is race-safe among module invocations; failed runs are retained.
    [void][IO.Directory]::CreateDirectory($run)
    Write-NewText (Join-Path $run 'run.claim') $RunId
    [void][IO.Directory]::CreateDirectory((Join-Path $run 'snapshot'))
    Write-NewJson (Join-Path $run 'snapshot/task.json') $inputData.task
    Write-NewJson (Join-Path $run 'snapshot/reviews.json') @(Get-Field $inputData 'reviews' @())
    $entries=@()
    foreach($a in $inputData.artifacts){
        $source=Resolve-SafePath $repo $a.path
        $dest='snapshot/'+$a.artifact_id+'.txt'
        $hash=$null;$size=$null;$state='MISSING'
        if(Test-Path -LiteralPath $source -PathType Leaf){
            $bytes=Read-LimitedBytes $source
            # Snapshot text is inert data. It is never evaluated or injected as HTML.
            $hash=Get-BytesHash $bytes;$size=$bytes.Length
            $stream=[IO.File]::Open((Join-Path $run $dest),[IO.FileMode]::CreateNew)
            try{$stream.Write($bytes,0,$bytes.Length)}finally{$stream.Dispose()}
            $state='COPIED'
        }
        $entries+= [ordered]@{artifact_id=$a.artifact_id;path=$dest;source_path=$a.path;size=$size;sha256=$hash;snapshot_state=$state;source_type=$a.source_type;evidence_revision=$a.evidence_revision;evidence_type=$a.evidence_type;criterion_ids=@($a.criterion_ids);expected_sha256=(Get-Field $a 'expected_sha256');generated_at=(Get-Field $a 'generated_at');exit_code=(Get-Field $a 'exit_code');evidence_state_id=(Get-Field $a 'evidence_state_id');derived_from_hash=(Get-Field $a 'derived_from_hash');transformation=(Get-Field $a 'transformation')}
    }
    $manifest=[ordered]@{schema_version=1;run_id=$RunId;snapshot_created_at=[DateTime]::UtcNow.ToString('o');snapshot_checkout_head=$head;worktree_dirty=$dirty;task_sha256=(Get-FileHash (Join-Path $run 'snapshot/task.json')).Hash;reviews_sha256=(Get-FileHash (Join-Path $run 'snapshot/reviews.json')).Hash;artifacts=$entries;limitations='Application-level no-overwrite; not signed execution provenance. No inference from mtime or current HEAD.'}
    Write-NewJson (Join-Path $run 'manifest.json') $manifest
    return $run
}
function Test-P0Snapshot([string]$RunDirectory) {
    $m=Read-P0Json (Resolve-SafePath $RunDirectory 'manifest.json')
    Assert-Fields $m @('schema_version','run_id','snapshot_created_at','snapshot_checkout_head','worktree_dirty','artifacts','task_sha256','reviews_sha256')
    Assert-ID $m.run_id
    Assert-ShaOrNull $m.snapshot_checkout_head
    foreach($kind in @('task','reviews')){
        $path=Resolve-SafePath $RunDirectory ("snapshot/"+$kind+'.json')
        if((Get-FileHash $path).Hash -cne $m.($kind+'_sha256')){throw 'Task/review snapshot hash mismatch'}
    }
    $task=Read-P0Json (Join-Path $RunDirectory 'snapshot/task.json')
    $reviews=@(Read-P0Json (Join-Path $RunDirectory 'snapshot/reviews.json'))
    $contract=[pscustomobject]@{schema_version=$m.schema_version;task=$task;artifacts=@($m.artifacts);reviews=$reviews}
    Assert-Contract $contract
    $results=@();$byId=@{}
    foreach($a in $m.artifacts){
        if($a.path -cne ('snapshot/'+$a.artifact_id+'.txt')){throw 'Snapshot path does not match artifact ID'}
        [void](Resolve-SafePath $RunDirectory $a.source_path)
        $path=Resolve-SafePath $RunDirectory $a.path
        $integrity='INVALID';$why=@()
        if(-not(Test-Path -LiteralPath $path -PathType Leaf)){$why+='文件缺失'}
        else{
            $bytes=Read-LimitedBytes $path
            if((Get-BytesHash $bytes) -cne $a.sha256 -or $bytes.Length -ne $a.size){$why+='快照字节/hash失配'}
            elseif($null -ne $a.expected_sha256 -and $a.sha256 -ine $a.expected_sha256){$why+='原声明hash失配'}
            else{$integrity='VALID'}
        }
        $app='UNKNOWN'
        $targetDirty=Get-Field $task 'target_worktree_dirty' $false
        $targetState=Get-Field $task 'target_state_id'
        if($null -ne $task.target_code_revision -and $null -ne $a.evidence_revision){
            if($task.target_code_revision -ine $a.evidence_revision){$app='MISMATCH';$why+='目标/证据生成版本不同'}
            elseif($targetDirty -and ([string]::IsNullOrWhiteSpace($targetState) -or [string]::IsNullOrWhiteSpace($a.evidence_state_id))){$why+='未提交目标缺明确状态标识'}
            elseif($targetDirty -and $targetState -cne $a.evidence_state_id){$app='MISMATCH';$why+='目标diff状态不同'}
            else{$app='MATCH'}
        }else{$why+='生成或目标版本未知'}
        if($a.source_type -eq 'SYNTHETIC_FIXTURE' -and $task.mode -ne 'SYNTHETIC_FIXTURE'){$app='MISMATCH';$why+='合成材料不能支持历史/真实标准'}
        $row=[pscustomobject]@{artifact_id=$a.artifact_id;path=$a.path;source_path=$a.source_path;sha256=$a.sha256;source_type=$a.source_type;evidence_revision=$a.evidence_revision;generated_at=$a.generated_at;exit_code=$a.exit_code;evidence_type=$a.evidence_type;criterion_ids=@($a.criterion_ids);artifact_integrity=$integrity;applicability=$app;limitations=$why}
        $results+=$row;$byId[$a.artifact_id]=$row
    }
    $approval='UNKNOWN'
    if($task.mode -eq 'SYNTHETIC_FIXTURE'){$approval='SYNTHETIC_FIXTURE'}
    elseif((Get-Field $task 'approval_status') -eq 'OWNER_APPROVED' -and $null -ne $task.requirement_source -and -not [string]::IsNullOrWhiteSpace((Get-Field $task 'approval_source_type'))){
        $req=$byId[$task.requirement_source]
        if($req.artifact_integrity -eq 'VALID' -and $req.sha256 -ieq $task.requirement_sha256 -and $req.source_type -ne 'SYNTHETIC_FIXTURE'){$approval='OWNER_APPROVED'}
    }
    $criteria=@()
    foreach($c in $task.criteria){
        $provided=@($reviews | Where-Object {$_.criterion_id -ceq $c.criterion_id -and -not [string]::IsNullOrWhiteSpace($_.reviewer)})
        $status='NOT_REVIEWED';$blocks=@()
        if($provided.Count -gt 0){
            $status='INSUFFICIENT_EVIDENCE'
            if($null -ne $task.requirement_source){
                $requirement=$byId[$task.requirement_source]
                if($requirement.artifact_integrity -ne 'VALID' -or $requirement.sha256 -ine $task.requirement_sha256){$blocks+='要求快照/hash失配'}
            }
            if(@($provided.suggestion | Select-Object -Unique).Count -gt 1){$blocks+='评审建议冲突'}
            foreach($r in $provided){
                if([string]::IsNullOrWhiteSpace($r.provenance) -or [string]::IsNullOrWhiteSpace($r.rationale)){$blocks+='评审来源或理由缺失'}
                if($r.source_type -eq 'IMPORTED_UNKNOWN'){$blocks+='评审来源未知'}
                if($r.source_type -eq 'SYNTHETIC_FIXTURE' -and $task.mode -ne 'SYNTHETIC_FIXTURE'){$blocks+='合成评审不能支持历史/真实结论'}
                if($r.evidence_refs.Count -eq 0){$blocks+='评审无证据引用'}
                $types=@()
                foreach($ref in $r.evidence_refs){
                    if(-not $byId.ContainsKey($ref)){$blocks+='引用不存在';continue}
                    $e=$byId[$ref]
                    if($e.artifact_integrity -ne 'VALID'){$blocks+='引用完整性不足'}
                    if($e.applicability -ne 'MATCH'){$blocks+='引用适用性不足'}
                    if($e.criterion_ids -cnotcontains $c.criterion_id){$blocks+='证据范围不支持此条件'}
                    if($e.source_type -eq 'IMPORTED_UNKNOWN'){$blocks+='证据来源未知'}
                    $types+=$e.evidence_type
                }
                foreach($type in $c.required_evidence_types){if($types -cnotcontains $type){$blocks+='缺所需证据类型：'+$type}}
            }
            if($approval -eq 'UNKNOWN' -or $null -eq $task.requirement_revision){$blocks+='原要求版本/批准来源不足'}
            if($blocks.Count -eq 0){$status=$provided[0].suggestion}
        }else{$blocks+='尚无评审人；材料校验不等于业务验收'}
        $criteria+=[ordered]@{criterion_id=$c.criterion_id;text=$c.text;criterion=$status;review_suggestions=$provided;blockers=@($blocks | Select-Object -Unique);next_step='由有来源的评审补齐适用证据，再由 owner 决定；P0 不自动接受'}
    }
    return [pscustomobject]@{schema_version=1;task_id=$task.task_id;mode=$task.mode;requirement_revision=$task.requirement_revision;target_code_revision=$task.target_code_revision;snapshot_checkout_head=$m.snapshot_checkout_head;snapshot_created_at=$m.snapshot_created_at;worktree_dirty=$m.worktree_dirty;approval_status=$approval;approval_source_type=(Get-Field $task 'approval_source_type');requirement_source=$task.requirement_source;owner_decision='PENDING';artifacts=$results;criteria=$criteria;limitations=@('历史重放不是新 Web 用户结果；合成材料不是实际执行','规则只检查有限结构事实；MATCH 不证明语义关联或可信执行','SATISFIED 仅为有来源的评审建议，owner 尚未决定','HTML 视觉渲染 NOT VERIFIED；未运行模型或竞品')}
}
function Write-P0Report([string]$RunDirectory) {
    foreach($name in @('report.json','report.html','raw-index.json','report-hashes.json')){if(Test-Path (Join-Path $RunDirectory $name)){throw 'Report already exists; no overwrite'}}
    $report=Test-P0Snapshot $RunDirectory
    function ConvertTo-P0Html($value){[Net.WebUtility]::HtmlEncode([string]$value)}
    $html='<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src ''none''; style-src ''unsafe-inline''"><title>离线验收单 P0</title><style>body{font:16px sans-serif;max-width:1000px;margin:32px auto;padding:16px;line-height:1.6}article{border:1px solid #aaa;padding:16px;margin:16px 0}pre{white-space:pre-wrap;overflow-wrap:anywhere}.notice{background:#fff3ce;padding:16px}</style></head><body><h1>离线验收单 P0</h1><div class="notice">Owner 尚未决定：PENDING。未评审或材料不足不代表通过。仅供比较审查。</div>'
    $html+='<h2>'+ (ConvertTo-P0Html $report.task_id) +'</h2><p>模式：'+(ConvertTo-P0Html $report.mode)+'；要求批准：'+(ConvertTo-P0Html $report.approval_status)+'</p>'
    $html+='<details><summary>四种版本与来源</summary><pre>'+ (ConvertTo-P0Html (($report | Select-Object requirement_revision,target_code_revision,snapshot_checkout_head,worktree_dirty,approval_source_type,requirement_source | ConvertTo-Json)))+'</pre><p>证据自身版本见下方材料；不以当前 checkout 回填。</p></details>'
    foreach($c in $report.criteria){
        $html+='<article><h2>'+(ConvertTo-P0Html $c.text)+'</h2><p>建议状态：'+(ConvertTo-P0Html $c.criterion)+'</p><p>局限：'+(ConvertTo-P0Html ($c.blockers -join '；'))+'</p><p>下一步：'+(ConvertTo-P0Html $c.next_step)+'</p><details><summary>评审来源、理由、引用</summary><pre>'+(ConvertTo-P0Html ($c.review_suggestions | ConvertTo-Json -Depth 15))+'</pre></details></article>'
    }
    $index=@()
    foreach($a in $report.artifacts){
        $href=$null
        if($a.artifact_integrity -eq 'VALID'){$href=$a.path}
        $index+=[ordered]@{artifact_id=$a.artifact_id;snapshot_path=$a.path;sha256=$a.sha256;source_type=$a.source_type;evidence_revision=$a.evidence_revision;artifact_integrity=$a.artifact_integrity;applicability=$a.applicability}
        $html+='<details><summary>材料 '+(ConvertTo-P0Html $a.artifact_id)+'：'+(ConvertTo-P0Html $a.artifact_integrity)+' / '+(ConvertTo-P0Html $a.applicability)+'</summary><pre>'+(ConvertTo-P0Html ($a | ConvertTo-Json -Depth 10))+'</pre>'
        if($href){$html+='<a href="'+(ConvertTo-P0Html $href)+'">快照原材料（只读文本）</a>'}
        $html+='</details>'
    }
    $html+='<p>'+(ConvertTo-P0Html ($report.limitations -join '；'))+'</p></body></html>'
    Write-NewJson (Join-Path $RunDirectory 'report.json') $report
    Write-NewJson (Join-Path $RunDirectory 'raw-index.json') $index
    Write-NewText (Join-Path $RunDirectory 'report.html') $html
    $hashes=@();foreach($name in @('report.json','report.html','raw-index.json')){$hashes+=@{path=$name;sha256=(Get-FileHash (Join-Path $RunDirectory $name)).Hash}}
    Write-NewJson (Join-Path $RunDirectory 'report-hashes.json') $hashes
    return $report
}
function New-P0Bundle([string]$RunDirectory,[string]$Repository,$TestReceipt) {
    # Explicit allowlist; never recursive. Bundle is a local handback, not sharing authorization.
    if(Test-Path (Join-Path $RunDirectory 'review-bundle.zip')){throw 'Bundle already exists'}
    $fresh=Test-P0Snapshot $RunDirectory
    $stored=Read-P0Json (Join-Path $RunDirectory 'report.json')
    if(($fresh | ConvertTo-Json -Depth 30 -Compress) -cne ($stored | ConvertTo-Json -Depth 30 -Compress)){throw 'Report no longer matches snapshot'}
    $hashes=@(Read-P0Json (Resolve-SafePath $RunDirectory 'report-hashes.json'))
    foreach($name in @('report.json','report.html','raw-index.json')){
        $expected=@($hashes | Where-Object {$_.path -ceq $name})
        if($expected.Count -ne 1 -or (Get-FileHash (Resolve-SafePath $RunDirectory $name)).Hash -cne $expected[0].sha256){throw 'Rendered output hash mismatch'}
    }
    Write-NewJson (Join-Path $RunDirectory 'test-results.json') $TestReceipt
    $manifest=Read-P0Json (Join-Path $RunDirectory 'manifest.json')
    $files=@('manifest.json','report.json','report.html','raw-index.json','report-hashes.json','snapshot/task.json','snapshot/reviews.json','test-results.json')
    $files+=@($manifest.artifacts | Where-Object {$_.snapshot_state -eq 'COPIED'} | ForEach-Object {$_.path})
    $items=@()
    foreach($file in $files){$items+= [pscustomobject]@{entry=$file;path=(Resolve-SafePath $RunDirectory $file)}}
    foreach($file in @('README.md','AcceptanceEvidence.psm1','Invoke-AcceptanceReport.ps1','tests.ps1')){
        $items+=[pscustomobject]@{entry=('source/'+$file);path=(Resolve-SafePath $Repository ('acceptance-p0/'+$file))}
    }
    $index=@()
    foreach($item in $items){
        $bytes=Read-LimitedBytes $item.path
        $text=[Text.Encoding]::UTF8.GetString($bytes)
        if($text -match 'https?://(?:chatgpt\.com|chat\.openai\.com)/[^\s"]+' -or $text -match '(?i)(?:Bearer\s+[A-Za-z0-9._-]{16,}|sk-[A-Za-z0-9_-]{20,})'){throw 'Potential private URL/credential: bundle refused'}
        $index+=[ordered]@{entry=$item.entry;size=$bytes.Length;sha256=(Get-BytesHash $bytes)}
    }
    Write-NewJson (Join-Path $RunDirectory 'bundle-index.json') $index
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zipPath=Join-Path $RunDirectory 'review-bundle.zip'
    $stream=[IO.File]::Open($zipPath,[IO.FileMode]::CreateNew)
    $zip=New-Object IO.Compression.ZipArchive($stream,[IO.Compression.ZipArchiveMode]::Create)
    try{
        foreach($item in $items){[void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,$item.path,$item.entry)}
        [void][IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,(Join-Path $RunDirectory 'bundle-index.json'),'bundle-index.json')
    }finally{$zip.Dispose();$stream.Dispose()}
    $hash=(Get-FileHash $zipPath).Hash
    Write-NewText (Join-Path $RunDirectory 'review-bundle.sha256') ($hash+'  review-bundle.zip')
    return $hash
}
Export-ModuleMember -Function New-P0Snapshot,Test-P0Snapshot,Write-P0Report,New-P0Bundle
