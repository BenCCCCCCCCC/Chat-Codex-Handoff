import {requireValue} from './core.mjs';

// Deliberately narrow grammar. Never infer an unstated rule to fill a template.
export function boundedTask({source,target}){
  requireValue(source?.id&&typeof source.text==='string'&&target?.id,'INVALID_TASK_TARGET');
  const none=reason=>({sourceId:source.id,targetId:target.id,engine:'source-rules-v1',exercise:null,unavailableReason:reason});
  if(!target||target.status==='unknown')return none('当前材料不足以支持一个新的检验，先保留纠正解释。');
  if(!['incorrect','missing'].includes(target.status)||!target.sourceQuote||!source.text.includes(target.sourceQuote))
    return none('这条反馈没有可用于出题的明确材料规则。');
  const quote=target.sourceQuote;
  if(source.text.trim()!==quote.trim())
    return none('材料还包含其他说明，暂不单独抽取这条规则出题。');
  const exercise=(kind,question,assumptions,expectedAnswer,criterion,options,answer)=>({
    sourceId:source.id,targetId:target.id,engine:'source-rules-v1',unavailableReason:null,
    exercise:{kind,question,assumptions,expectedAnswer,criterion,basisQuotes:[quote],
      choices:options.map((label,i)=>({id:`c${i}`,label})),correctChoice:`c${answer}`}
  });
  // The whole evidence quote must express exactly this relation. A trailing
  // exception or a second rule is intentionally not accepted.
  const condition=quote.match(/^只有([^，,。；;.\n]{1,60})才([^，,。；;.\n]{1,60})[。.]?$/u);
  if(condition&&/^(完成|满足|达到|持有|获得|取得|通过|具备|拥有)/u.test(condition[1])){
    const a=condition[1],b=condition[2];
    return exercise('apply_rule',`此时，“${b}”能成立吗？`,
      [`假设不满足“${a}”这一前提。`],`不能。缺少“${a}”这个必要前提。`,
      '只核对必要条件的逆否方向，不增加其他要求。',
      ['材料不足以判断','不能','能'],1);
  }
  const scale=quote.match(/^每份([^。；;\n]{1,30})由(\d{1,3})克([^和。；;\n]{1,20})和(\d{1,3})克([^。；;\n]{1,20})组成。配制多份时，两种原料都按份数成倍增加。[。]?$/u);
  if(scale&&Number(scale[2])>0&&Number(scale[4])>0&&scale[3]!==scale[5]){
    const unit=Number(scale[4]),name=scale[5],seen=`${target.explanation??''} ${target.quote??''}`;
    const count=[3,4,5,6,7].find(n=>!seen.includes(`${n}份`)&&!seen.includes(`${unit*n}克`));
    if(count){
      const amount=unit*count,values=[unit,amount+unit,amount];
      return exercise('apply_rule',`${name}需要多少克？`,[`假设配制${count}份${scale[1]}。`],
        `${amount}克。`,`${name}每份${unit}克，${count}份为${unit}×${count}=${amount}克。`,
        values.map(v=>`${v}克`),2);
    }
  }
  const sequence=quote.match(/^(?:[^。；;\n]{0,30}时)?先([^，,。；;\n]{1,25})[，,]再([^，,。；;\n]{1,25})[，,]最后([^。；;\n]{1,25})。?$/u);
  if(sequence&&new Set(sequence.slice(1)).size===3){
    const [a,b,c]=sequence.slice(1);
    const scenario=`先${a}，接着${c}，还未${b}`;
    if(target.quote?.includes(scenario))return none('这条操作关系已经被解释，暂不重复出题。');
    return exercise('check_claim','这个过程符合材料规定的顺序吗？',[`假设已经${a}和${c}，但还没有${b}。`],
      `不符合。应先${b}，再${c}。`,`核对“${b}”与“${c}”的相对次序。`,
      ['符合','不符合','材料没有规定'],1);
  }
  return none('这段材料暂不支持本机检验。可继续补学或重新讲解。');
}
export function validateBoundedTask(task,source,target){
  requireValue(task?.engine==='source-rules-v1'&&JSON.stringify(task)===JSON.stringify(boundedTask({source,target})),'INVALID_TASK');
  return task;
}
export function assessBoundedTask(task,source,target,choiceId){
  validateBoundedTask(task,source,target);
  const e=task.exercise,choice=e?.choices.find(c=>c.id===choiceId);
  requireValue(choice,'ANSWER_REQUIRED');
  return {sourceId:source.id,targetId:task.targetId,verdict:choiceId===e.correctChoice?'correct':'incorrect',
    message:e.expectedAnswer,basisQuotes:e.basisQuotes,method:'local_rule_check'};
}
