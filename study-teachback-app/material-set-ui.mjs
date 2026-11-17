import {autoTitle} from './core.mjs';
import {materialList,initializeMaterials,addMaterial,selectMaterials,selectContext,saveStudyIssue} from './material-set.mjs';
import {importedDocument,selectedProvenance,renderMaterial} from './source-provenance.mjs';
import {createDraftSaver} from './draft-save.mjs';

export function mountMaterialSet({getTopic,save,request,canStart,setBusy,beforeChange,onSwitch,act}){
  const $=id=>document.getElementById(id),node=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
  let busy=false,previewId=null,documentPreview=null;
  const drafts=createDraftSaver({save,onStatus:s=>{$('materialDraftStatus').textContent=s==='saved'?'草稿已保存在本机':s==='saving'?'正在保存…':s==='error'?'草稿保存失败，请重试保存。':'';},onError:e=>act(()=>Promise.reject(e))});
  const lock=value=>{for(const root of ['materialSet','studyIssues','materialPreview'])for(const input of $(root).querySelectorAll('input,textarea,select,button'))input.disabled=value;};
  async function change(work){
    if(busy||!canStart())return;busy=true;setBusy(true);lock(true);
    try{await beforeChange();await work(getTopic());}
    finally{busy=false;setBusy(false);render();lock(false);}
  }
  function showMaterial(id){
    const material=materialList(getTopic()).find(m=>m.id===id);if(!material)return;
    previewId=id;$('materialPreview').hidden=false;$('materialPreviewTitle').textContent=material.title;
    renderMaterial({textNode:$('materialPreviewText'),locationNode:$('materialPreviewLocation'),source:material});
  }
  function render(){
    const topic=getTopic();if(!topic)return;
    const materials=materialList(topic),selected=topic.activeMaterialIds??[topic.source.id];
    $('materialSetSummary').textContent=`材料集 · ${materials.length} 份`;
    $('activeMaterials').textContent='本次采用：'+materials.filter(m=>selected.includes(m.id)).map(m=>m.title).join('、');
    $('materialChoices').replaceChildren(...materials.map(m=>{
      const row=node('div',''),label=node('label',''),input=document.createElement('input'),read=node('button','查看原文');
      input.type='checkbox';input.value=m.id;input.checked=selected.includes(m.id);input.disabled=busy;
      label.append(input,node('span',m.title));read.className='quiet';read.type='button';read.onclick=()=>showMaterial(m.id);row.append(label,read);return row;
    }));
    $('materialTitle').value=topic.materialDraft?.title??'';$('materialText').value=topic.materialDraft?.text??'';
    for(const id of ['materialTitle','materialText','materialFile','addMaterial','useMaterials','saveStudyIssue'])$(id).disabled=busy;
    if(previewId&&materials.some(m=>m.id===previewId))showMaterial(previewId);else{$('materialPreview').hidden=true;previewId=null;}
    const issue=topic.issueDraft??{};$('issueQuestion').value=issue.question??'';$('issueCondition').value=issue.condition??'';$('issueStatus').value=issue.status??'deferred';
    $('issueEvidence').replaceChildren(...materials.map(m=>{
      const label=node('label',m.title+' · 采用的原句'),input=document.createElement('textarea');input.rows=2;input.maxLength=1500;input.dataset.materialId=m.id;
      input.value=issue.evidence?.find(e=>e.materialId===m.id)?.quote??'';input.placeholder='在“查看原文”中选中并引用，也可粘贴原句。';input.oninput=captureIssue;input.onblur=()=>act(()=>drafts.flush());label.append(input);return label;
    }));
    $('studyIssueList').replaceChildren(...(topic.studyIssues??[]).slice().reverse().map(item=>{
      const card=node('article',''),open=node('button','继续这个疑点');card.dataset.issueId=item.id;card.append(node('h4',item.question),node('p',item.status==='deferred'?'结论暂缓，继续查证':'本次采用的条件（自查）：'+item.condition));
      if(item.status==='deferred'&&item.condition)card.append(node('p',item.condition));
      for(const e of item.evidence){const m=materials.find(m=>m.id===e.materialId);card.append(node('p',m?.title??'历史材料'),node('blockquote',e.quote));}
      card.append(node('p',new Date(item.createdAt).toLocaleString()));open.className='quiet';open.onclick=()=>act(()=>change(async t=>{
        selectContext(t,item.contextId);const point=structuredClone(item.resume);
        const missing=point.view==='attempt'&&!t.attempts.some(a=>a.id===point.attemptId)||point.view==='practice'&&point.roundId&&!t.practiceRounds?.some(r=>r.id===point.roundId);
        t.resume=missing?{view:'learn'}:point;if(point.roundId&&!missing){t.activePracticeId=point.roundId;t.taskUnavailable=null;}
        try{await save(t);}finally{onSwitch();}if(missing)throw Error('STUDY_WORK_MISSING');
      }));card.append(open);return card;
    }));
    $('contextHistory').replaceChildren(...(topic.studyContexts??[]).map(c=>{
      const button=node('button',`${c.materialIds.map(id=>materials.find(m=>m.id===id)?.title).join(' + ')} · ${c.attempts.length} 次讲解 · ${c.practiceRounds?.length??0} 道题`);
      button.className='quiet';button.onclick=()=>act(()=>change(async t=>{selectContext(t,c.id);try{await save(t);}finally{onSwitch();}}));return button;
    }));
  }
  function captureMaterial(){
    if(busy)return;const topic=getTopic();initializeMaterials(topic);
    const old=topic.materialDraft;topic.materialDraft={title:$('materialTitle').value,text:$('materialText').value};
    if(old?.provenance?.text===topic.materialDraft.text)topic.materialDraft.provenance=old.provenance;
    drafts.mark(topic);
  }
  function captureIssue(){
    if(busy)return;const topic=getTopic();initializeMaterials(topic);
    topic.issueDraft={question:$('issueQuestion').value,condition:$('issueCondition').value,status:$('issueStatus').value,evidence:[...$('issueEvidence').querySelectorAll('textarea')].map(e=>({materialId:e.dataset.materialId,quote:e.value}))};drafts.mark(topic);
  }
  for(const id of ['materialTitle','materialText']){$(id).oninput=captureMaterial;$(id).onblur=()=>act(()=>drafts.flush());}
  for(const id of ['issueQuestion','issueCondition','issueStatus']){$(id).oninput=captureIssue;$(id).onblur=()=>act(()=>drafts.flush());}
  $('addMaterial').onclick=()=>act(()=>change(async t=>{addMaterial(t,t.materialDraft??{title:'',text:''});await save(t);$('addMaterialDetails').open=false;}));
  $('useMaterials').onclick=()=>{const ids=[...$('materialChoices').querySelectorAll('input:checked')].map(e=>e.value);act(()=>change(async t=>{selectMaterials(t,ids);try{await save(t);}finally{onSwitch();}}));};
  $('saveStudyIssue').onclick=()=>act(()=>change(async t=>{const d=t.issueDraft??{};saveStudyIssue(t,{...d,evidence:(d.evidence??[]).filter(e=>e.quote.trim())});await save(t);$('issueEditor').open=false;}));
  $('quoteMaterial').onclick=()=>act(()=>{
    if(busy||!canStart())return;
    const selection=getSelection(),p=$('materialPreviewText');let quote='';
    if(selection&&!selection.isCollapsed&&p.contains(selection.anchorNode)&&p.contains(selection.focusNode))quote=selection.toString().trim();
    else if(p.textContent.length<=1500)quote=p.textContent;
    if(!quote||quote.length>1500)throw Error('SELECT_MATERIAL_QUOTE');
    const input=[...$('issueEvidence').querySelectorAll('textarea')].find(e=>e.dataset.materialId===previewId);input.value=quote;$('studyIssues').open=$('issueEditor').open=true;captureIssue();input.focus();
  });
  $('materialFile').onchange=()=>act(async()=>{
    const file=$('materialFile').files[0];if(!file)return;
    await change(async()=>{
      if(file.size>10*1024*1024)throw Error('FILE_TOO_LARGE');
      const result=await request('/api/extract',await file.arrayBuffer(),{'X-Source-Format':file.name.split('.').pop().toLowerCase()});
      documentPreview=importedDocument(result.blocks,file.name);$('materialExtracted').value=documentPreview.text;$('materialImportPreview').hidden=false;
      $('materialImportStatus').textContent='核对后选择本次保留的片段；每份最多 5,000 字，原文件不保存。';
    });
    $('materialFile').value='';
  });
  for(const all of [false,true])$(all?'materialUseAll':'materialUseSelection').onclick=()=>act(()=>change(async t=>{
    const p=$('materialExtracted'),start=all?0:p.selectionStart,end=all?p.value.length:p.selectionEnd;
    const provenance=selectedProvenance(documentPreview,start,end);if(!provenance)throw Error('SELECT_MATERIAL_QUOTE');if(provenance.text.length>5000)throw Error('MATERIAL_SELECTION_TOO_LARGE');
    initializeMaterials(t);t.materialDraft={title:t.materialDraft?.title||autoTitle(provenance.text,documentPreview.fileName),text:provenance.text,provenance};await save(t);$('materialImportPreview').hidden=true;
  }));
  return {render,showMaterial,flushDraft:()=>drafts.flush(),discardDraft:()=>drafts.discard(),get hasPendingDraft(){return drafts.pending;}};
}
