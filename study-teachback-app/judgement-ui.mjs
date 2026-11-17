import {issueForAttempt,judgementIssues} from './judgement.mjs';

export function renderJudgementChoices({root,topic,attempt,disabled,change,create}){
  root.replaceChildren();
  const node=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
  root.append(node('summary','这次反馈的适用条件'),node('p','只选择影响这次讲解的疑点，最多 3 项。暂缓项不判对错；未选的笔记不影响本次分析。更换条件会保留旧反馈。'));
  const selected=judgementIssues(attempt.judgementIssues,attempt.source);
  const choices=(topic.studyIssues??[]).filter(i=>i.contextId===attempt.source.id).flatMap(i=>{
    try{return [issueForAttempt(i,topic)];}catch{return [];}
  });
  for(const item of selected)if(!choices.some(i=>i.id===item.id))choices.push(item);
  for(const issue of choices){
    const row=node('div',''),label=node('label',''),input=document.createElement('input');input.type='checkbox';input.checked=selected.some(i=>i.id===issue.id);input.disabled=disabled;input.dataset.judgementIssue=issue.id;
    input.onchange=()=>change(issue,input.checked);label.append(input,node('span',issue.question+' · '+(issue.status==='deferred'?'暂缓本项':'按所选条件核对')));row.append(label);
    if(issue.condition)row.append(node('p',issue.condition));
    const evidence=node('details','');evidence.append(node('summary','核对材料前提'));for(const e of issue.evidence)evidence.append(node('p',e.title),node('blockquote',e.quote));row.append(evidence);root.append(row);
  }
  if(!choices.length)root.append(node('p','还没有适用于本次材料组合的条件记录。'));
  const add=node('button','记录或修订适用条件');add.type='button';add.className='quiet';add.disabled=disabled;add.onclick=create;root.append(add);
}
export function appendJudgementSummary(root,report){
  const node=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
  for(const a of report.judgement?.assessments??[]){
    const issue=report.judgement.issues.find(i=>i.id===a.issueId),card=node('article','');card.className='finding judgement';card.dataset.judgement=a.decision;
    card.append(node('strong',a.decision==='deferred'?'暂缓本项 · 不计作答错':'按条件可判'),node('h4',issue.question),node('p',a.reason));
    const evidence=node('details','');evidence.append(node('summary','当时采用的条件与材料'));evidence.append(node('p',issue.status==='deferred'?'学习者选择暂缓':'学习者采用的条件：'+issue.condition));
    if(issue.status==='deferred'&&issue.condition)evidence.append(node('p',issue.condition));
    for(const e of issue.evidence)evidence.append(node('p',e.title),node('blockquote',e.quote));card.append(evidence);root.append(card);
  }
}
