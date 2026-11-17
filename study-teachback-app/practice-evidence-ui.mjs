import {activePractice} from './practice.mjs';
import {notePracticeReference,evidenceSummary} from './conditional-practice.mjs';
import {answerDisposition,practicePaused} from './question-review.mjs';

export function mountPracticeEvidence({getTopic,flow,drafts,canStart,act}){
  const $=id=>document.getElementById(id),node=(tag,value)=>{const e=document.createElement(tag);e.textContent=value;return e;};
  let renderedRound=null;
  function note(kind,id=''){
    const topic=getTopic(),round=activePractice(topic);
    if(topic?.resume?.view!=='practice'||!round?.conditionContext||flow.busy)return;
    if(notePracticeReference(round,kind,id)){drafts.mark(topic);if(round.work)$('answerEvidenceStatus').textContent=evidenceSummary(round.work);}
  }
  function render(){
    const round=activePractice(getTopic()),conditional=!!round?.conditionContext,work=round?.work;
    $('practiceConditions').hidden=!conditional;$('practiceEvidence').hidden=!conditional||!work;
    $('practiceAgain').hidden=!conditional||practicePaused(round)||!!work&&!work.answerId;
    $('practiceAgain').disabled=flow.busy;
    $('practiceAgain').textContent=work?.answerId?'另起一次作答，保留未完成记录':'再答一次（新增记录）';
    $('practiceConditionsText').textContent=round?.conditionContext?.issues.map(i=>i.condition).join('\n\n')??'';
    $('practiceConditionQuotes').replaceChildren(...(round?.conditionContext?.issues??[]).flatMap(i=>i.evidence.flatMap(e=>[node('p',e.title),node('blockquote',e.quote)])));
    if(renderedRound!==round?.id){$('practiceConditionEvidence').open=false;renderedRound=round?.id;}
    $('answerAssistance').value=work?.selfReport??'unknown';$('answerAssistance').disabled=flow.busy||!work||!!work.answerId||practicePaused(round);
    $('answerEvidenceStatus').textContent=work?evidenceSummary(work):conditional?'本次回答已保存。查看反馈后，可另起一次作答；不会覆盖已有回答。':'';
    if(conditional&&work&&!work.answerId)captureVisible();
  }
  function answerNode(round,answer,index){
    const item=node('article','');item.className='practice-answer';item.dataset.answerId=answer.id;
    const details=node('details',''),summary=node('summary',`第 ${index+1} 次回答${answer.conditionResult?.decision==='deferred'?' · 暂缓判断':answer.status==='complete'?' · 已保存反馈':' · 结果未完成或未知'}`);
    details.append(summary,node('p',answer.text));
    const disposition=answerDisposition(round,answer);
    if(answer.result){
      details.append(node('strong',answer.conditionResult?.decision==='deferred'?'题目或条件待核对 · 不计作答错':disposition==='excluded'?'此前反馈（已排除为答错依据）':disposition==='pending'?'此前反馈（未复核）':'这次回答的反馈'),node('p',answer.result));
      for(const quote of answer.conditionResult?.sourceQuotes??[])details.append(node('blockquote',quote));
    }else details.append(node('p','回答已保存；反馈未完成或结果未知。原样重试可能再次调用服务。'));
    const evidence=node('p',evidenceSummary(answer.evidence));evidence.className='muted prewrap';details.append(evidence);
    details.ontoggle=()=>{if(details.open)note('history',answer.id);};item.append(details);return item;
  }
  $('answerAssistance').onchange=()=>{
    const topic=getTopic(),round=activePractice(topic);if(!round?.work||round.work.answerId||flow.busy||practicePaused(round))return;
    round.work.selfReport=$('answerAssistance').value;drafts.mark(topic);$('answerEvidenceStatus').textContent=evidenceSummary(round.work);
  };
  $('practiceAgain').onclick=()=>act(async()=>{if(!canStart())return;await drafts.flush();await flow.again();$('practiceDraft').focus();});
  $('practiceConditionEvidence').ontoggle=()=>{if($('practiceConditionEvidence').open)note('material');};
  $('sourceDetails').addEventListener('toggle',()=>{if($('sourceDetails').open)note('material');});
  function captureVisible(){if($('sourceDetails').open||!$('materialPreview').hidden)note('material');if($('practiceConditionEvidence').open)note('material');}
  return {render,answerNode,note,captureVisible};
}
