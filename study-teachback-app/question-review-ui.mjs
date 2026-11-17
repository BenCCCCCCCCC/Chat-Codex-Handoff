import {activePractice} from './practice.mjs';
import {reviewBasis,revisedQuestion} from './question-review.mjs';

export function mountQuestionReview({getTopic,flow,drafts,canStart,act}){
  const $=id=>document.getElementById(id),dialog=$('reviewConfirmDialog');let preview=null,confirming=false;
  const node=(tag,text)=>{const e=document.createElement(tag);e.textContent=text;return e;};
  const select=id=>act(async()=>{if(!canStart())return;await drafts.flush();await flow.select(id);$('practiceHeading').focus();});
  function render(){
    const topic=getTopic(),round=activePractice(topic),review=round?.review,held=review?.status==='held';
    $('questionReview').hidden=!held;
    $('reviewSource').textContent=held?topic.source.text:'';
    for(const [id,key] of [['reviewNote','note'],['reviewBasis','basisQuote'],['reviewQuestion','proposedQuestion']]){
      $(id).value=held?review[key]??'':'';$(id).disabled=flow.busy;
    }
    for(const id of ['reviewKeep','reviewRetain','reviewRevise'])$(id).disabled=flow.busy;
    $('reviewRetain').hidden=review?.origin==='local_check';
    $('questionVersions').replaceChildren();
    for(const [id,label] of [[round?.revision?.parentRoundId,'查看原题与原回答'],[review?.replacementId,'继续修订后的题目']]){
      if(!id)continue;const button=node('button',label);button.className='quiet';button.disabled=flow.busy||!topic.practiceRounds.some(r=>r.id===id);button.onclick=()=>select(id);$('questionVersions').append(button);
    }
    $('revisionBasis').hidden=!round?.revision;
    $('revisionBasisText').textContent=round?.revision?`你的修正说明：${round.revision.note}\n材料依据：${round.revision.basisQuote}\n这是按材料自查的修订，尚非独立复核。`:'';
    const history=round?.reviewHistory??[];
    $('questionReviewHistory').hidden=!history.length;$('questionReviewEvents').replaceChildren();
    const labels={withdrawn:'已撤回质疑',retained:'按材料自查后保留原题，重新作答',replaced:'已创建修订题，原题只读'};
    for(const entry of history){
      const item=node('article','');item.dataset.reviewId=entry.id;item.append(node('h4',labels[entry.resolution]),node('p',new Date(entry.resolvedAt).toLocaleString()),node('p',entry.note||'未填写说明'));
      if(entry.basisQuote)item.append(node('blockquote',entry.basisQuote));
      item.append(node('p',entry.resolution==='withdrawn'?'已撤回这次质疑；此前已排除的判断不会恢复。撤回不等于独立复核。':`${entry.answerIds.length} 次原回答保留，旧判断不作为答错记录，也不带入后续 AI 判断。`));
      $('questionReviewEvents').append(item);
    }
  }
  for(const [id,key] of [['reviewNote','note'],['reviewBasis','basisQuote'],['reviewQuestion','proposedQuestion']]){
    $(id).oninput=()=>{const topic=getTopic(),round=activePractice(topic);if(flow.busy||round?.review?.status!=='held')return;round.review[key]=$(id).value;drafts.mark(topic);};
    $(id).onblur=()=>act(()=>drafts.flush());
  }
  $('reviewKeep').onclick=()=>act(async()=>{if(!canStart())return;await drafts.flush();$('reviewSaveStatus').textContent='疑问已保存，仍暂停判断。';});
  async function showPreview(kind){
    if(!canStart())return;await drafts.flush();const topic=getTopic(),round=activePractice(topic);
    if(round?.review?.status!=='held')return;
    const value=kind==='revise'?revisedQuestion(round,topic.source):{question:round.question,...reviewBasis(round.review,topic.source)};
    preview={kind,topicId:topic.id,roundId:round.id,review:JSON.stringify(round.review)};
    $('reviewPreviewTitle').textContent=kind==='revise'?'确认修订题目':'确认保留原题并重新作答';
    $('reviewPreviewOriginal').textContent=[round.introduction,...(round.task?.exercise.assumptions??[]),round.question].filter(Boolean).join('\n');
    $('reviewPreviewQuestion').textContent=value.question;$('reviewPreviewBasis').textContent=value.basisQuote;$('reviewPreviewNote').textContent=value.note;
    $('reviewConfirm').textContent=kind==='revise'?'保存修订题，重新作答':'保留原题，重新作答';
    dialog.showModal();$('reviewCancel').focus();
  }
  $('reviewRetain').onclick=()=>act(()=>showPreview('retain'));
  $('reviewRevise').onclick=()=>act(()=>showPreview('revise'));
  $('reviewCancel').onclick=()=>{if(!confirming)dialog.close();};
  dialog.oncancel=event=>{if(confirming)event.preventDefault();};
  dialog.onclose=()=>{preview=null;$('practiceHeading').focus();};
  $('reviewConfirm').onclick=()=>act(async()=>{
    if(confirming||!preview||!canStart())return;
    const topic=getTopic(),round=activePractice(topic);
    if(topic?.id!==preview.topicId||round?.id!==preview.roundId||JSON.stringify(round.review)!==preview.review)throw Error('REVIEW_CHANGED');
    confirming=true;$('reviewConfirm').disabled=$('reviewCancel').disabled=true;
    try{await (preview.kind==='revise'?flow.reviseQuestion():flow.retainQuestion());}
    finally{confirming=false;$('reviewConfirm').disabled=$('reviewCancel').disabled=false;dialog.close();}
  });
  return {render};
}
