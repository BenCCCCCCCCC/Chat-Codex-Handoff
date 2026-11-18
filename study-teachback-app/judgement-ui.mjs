import {issueForAttempt,judgementIssues,missingIssueMaterials} from './judgement.mjs';

export function renderJudgementChoices({root,topic,attempt,disabled,change,create,continueIssue}){
  root.replaceChildren();
  const node=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
  root.append(node('summary','这次反馈的适用条件'),node('p','只选择影响这次讲解的疑点，最多 3 项。暂缓项不判对错；未选的笔记不影响本次分析。更换条件会保留旧反馈。'));
  const selected=judgementIssues(attempt.judgementIssues,attempt.source);
  const choices=[],unavailable=[];
  for(const issue of topic.studyIssues??[]){try{choices.push(issueForAttempt(issue,topic));}catch{unavailable.push(issue);}}
  for(const item of selected)if(!choices.some(i=>i.id===item.id))choices.push(item);
  for(const issue of choices){
    const row=node('div',''),label=node('label',''),input=document.createElement('input');input.type='checkbox';input.checked=selected.some(i=>i.id===issue.id);input.disabled=disabled;input.dataset.judgementIssue=issue.id;
    input.onchange=()=>change(issue,input.checked);label.append(input,node('span',issue.question+' · '+(issue.status==='deferred'?'暂缓本项':'按所选条件核对')));row.append(label);
    if(issue.condition)row.append(node('p',issue.condition));
    const evidence=node('details','');evidence.append(node('summary','核对材料前提'));for(const e of issue.evidence)evidence.append(node('p',e.title),node('blockquote',e.quote));row.append(evidence);root.append(row);
  }
  for(const issue of unavailable){
    if(selected.some(i=>i.id===issue.id))continue;
    const missing=missingIssueMaterials(issue,topic),row=node('div','');row.className='condition-unavailable';row.append(node('strong',issue.question));
    row.append(node('p',missing.length?'需要补入：'+missing.map(id=>topic.materials?.find(m=>m.id===id)?.title??'历史材料').join('、'):'引用依据需要重新核对。'));
    if(missing.length&&continueIssue){const b=node('button','补入依据并继续讲解');b.className='quiet';b.disabled=disabled;b.dataset.continueIssue=issue.id;b.onclick=()=>continueIssue(issue.id);row.append(b);}root.append(row);
  }
  if(!choices.length&&!unavailable.length)root.append(node('p','还没有条件记录。需要澄清材料前提时，可在这里记录。'));
  const add=node('button','记录或修订适用条件');add.type='button';add.className='quiet';add.disabled=disabled;add.onclick=create;root.append(add);
}
export function appendJudgementSummary(root,report,{onPractice,canPractice=true}={}){
  const node=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
  for(const a of report.judgement?.assessments??[]){
    const issue=report.judgement.issues.find(i=>i.id===a.issueId),card=node('article','');card.className='finding judgement';card.dataset.judgement=a.decision;
    card.append(node('strong',a.decision==='deferred'?'暂缓本项 · 不计作答错':'按条件可判'),node('h4',issue.question),node('p',a.reason));
    const evidence=node('details','');evidence.append(node('summary','当时采用的条件与材料'));evidence.append(node('p',issue.status==='deferred'?'学习者选择暂缓':'学习者采用的条件：'+issue.condition));
    if(issue.status==='deferred'&&issue.condition)evidence.append(node('p',issue.condition));
    for(const e of issue.evidence)evidence.append(node('p',e.title),node('blockquote',e.quote));card.append(evidence);
    if(onPractice&&a.decision==='judgeable'&&issue.status==='condition'){
      const practice=node('button',canPractice?'按此条件练一题 · AI':'配置 AI 后按此条件练习');practice.className='quiet';practice.dataset.conditionPractice=issue.id;practice.disabled=!canPractice;practice.onclick=()=>onPractice(issue.id);card.append(practice);
    }
    root.append(card);
  }
}
