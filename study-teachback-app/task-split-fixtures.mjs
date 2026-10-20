import {taskContext} from './understanding-task.mjs';
const entries=[
  {id:'necessary',source:'只有完成备份才能升级系统。',words:'只要完成备份就一定能升级系统。',status:'incorrect',
    explanation:'备份是升级的必要条件，完成备份不保证一定能升级。',
    exercise:{kind:'apply_rule',assumptions:['假设某次系统已经成功升级。'],question:'能否推出这次升级前已完成备份？请简述依据。',
      expectedAnswer:'能，因为升级必须以完成备份为前提。',criterion:'判断能推出，并依据必要条件的方向，而非假设其他升级要求。'},
    answers:[['能，升级成功意味着备份这个前提已经满足。','correct'],['不能，完成备份不保证升级，所以升级也不能说明备份。','incorrect']]},
  {id:'scale',source:'每份混合物由2克甲和3克乙组成。配制多份时，两种原料都按份数成倍增加。',words:'配两份要4克甲和3克乙。',status:'incorrect',
    explanation:'配两份时乙也应增加为6克，不能保持3克。',
    exercise:{kind:'apply_rule',assumptions:['假设配制3份混合物。'],question:'乙需要多少克？',
      expectedAnswer:'9克。',criterion:'依据每份3克乘以3份，等价数值表达均可，不要求额外步骤。'},
    answers:[['九克。','correct'],['仍然3克，只有甲翻倍。','incorrect']]},
  {id:'order',source:'封存样品时先称量，再密封，最后贴标签。称量的是样品本身的质量。',words:'先密封，接着贴标签，最后称量。',status:'incorrect',
    explanation:'称量应在密封之前，原话却把称量放在末尾；密封在贴标签之前的关系仍然正确。',
    exercise:{kind:'check_claim',assumptions:['假设已称量并贴好标签，但还没有密封。'],question:'这个操作顺序是否符合材料？请指出关键次序。',
      expectedAnswer:'不符合，应先密封再贴标签。',criterion:'指出贴标签早于密封这一冲突，不要求复述全部步骤。'},
    answers:[['不符合，密封应该在贴标签前。','correct'],['符合，只要称量在前，密封和标签顺序随便。','incorrect']]},
  {id:'unknown_cause',source:'项目于2011年8月完工，2017年3月通车。材料没有交代两者相隔多年的原因。',words:'因为材料费用上涨，所以2017年才通车。',status:'unknown',
    explanation:'材料未说明延后通车的原因，不能确定费用上涨是否为原因。',
    // Deliberately flawed scoring input: the grader must reject the task itself.
    exercise:{kind:'apply_rule',assumptions:['假设材料费用上涨导致项目延后通车。'],question:'需要追加多少资金才能按时通车？',
      expectedAnswer:'增加资金就能按时通车。',criterion:'说出追加资金可确保按时通车。'},
    answers:[['材料没说延后的原因，也没有资金数据。','unanswerable'],['追加100万元就一定能按时通车。','unanswerable']]}
];
export const taskSplitCases=entries.map(c=>{
  const source={id:`split-${c.id}`,title:`自编：${c.id}`,text:c.source};
  const attempt={id:`attempt-${c.id}`,sourceId:source.id,transcriptVersion:'split-v1',duration:20,spans:[{id:'s0',start:0,end:20,text:c.words}],reviewed:true,interrupted:false,assistance:'unknown',kind:'full',focus:null};
  const report={sourceId:source.id,attemptId:attempt.id,transcriptVersion:attempt.transcriptVersion,findings:[{status:c.status,message:c.explanation,sourceQuote:source.text,spanId:'s0',quote:c.words,eventId:null,repair:'核对材料中的关系。'}]};
  const context=taskContext(source,attempt,report,0);
  return {id:c.id,source,attempt,report,context,
    goldTask:{sourceId:source.id,targetId:context.target.id,exercise:{...c.exercise,basisQuotes:[source.text]},unavailableReason:null},
    answers:c.answers.map(([text,expectedVerdict])=>({text,expectedVerdict}))};
});
