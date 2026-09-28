// Pre-labelled synthetic oracles. These are not model/detector outputs.
const source={id:'fixture-source',title:'合成材料：入场条件',text:'只有持票者才可以入场。'};
const focus='请只重新解释持票与可以入场之间的必要条件关系。';
function fixture(id,status,words,type=null,reviewed=true){
  const attempt={id,sourceId:source.id,transcriptVersion:`v-${id}`,duration:8,spans:[{id:'s0',start:0,end:7,text:words}],assistance:'none',kind:'full',focus:null,reviewed,interrupted:false};
  const finding={status,message:status==='supported'?'已表达必要条件，未把必要条件当作充分条件。':status==='missing'?'这次尚未表达必要条件关系；不代表永久不会。':'必要条件关系值得进一步核对。',sourceQuote:source.text,spanId:status==='missing'?null:'s0',quote:status==='missing'?null:words,eventId:null,repair:status==='supported'?'继续':focus};
  const evidence=type?[{id:`process:${id}:${attempt.transcriptVersion}:e0`,type,attemptId:id,transcriptVersion:attempt.transcriptVersion,start:1,end:2,spanId:'s0',quote:null,origin:'fixture',confirmation:'prelabelled',eventId:'e0'}]:[];
  return {id,label:'SYNTHETIC_PRELABELLED_NOT_DETECTOR_OR_MODEL_OUTPUT',source:{...source},attempt,report:{sourceId:source.id,attemptId:id,transcriptVersion:attempt.transcriptVersion,findings:[finding]},evidence};
}
export const diagnosticFixtures=[
  {...fixture('fluent-wrong','incorrect','只要持票就一定可以入场。'),expected:{blocked:null,content:['incorrect'],process:0,targets:1,related:0,location:'segment'}},
  {...fixture('hesitant-correct','supported','嗯，入场必须持票；持票不保证就能入场。','restart'),expected:{blocked:null,content:['supported'],process:1,targets:0,related:0,location:null}},
  {...fixture('uncertain-relation','unknown','持票是不是一定可以入场，我还没有讲清这个方向。','repetition'),expected:{blocked:null,content:['unknown'],process:1,targets:1,related:1,location:'segment'}},
  {...fixture('correct-self-repair','supported','持票就一定能入场，不对，我撤回这句。入场必须持票，但持票不保证入场。','self_repair'),expected:{blocked:null,content:['supported'],process:1,targets:0,related:0,location:null}},
  {...fixture('unreviewed-asr','incorrect','没有票也可以入场。',null,false),expected:{blocked:'ASR_REVIEW_REQUIRED'}},
  {...fixture('gap-without-process','missing','这里讨论的是入场规则。'),expected:{blocked:null,content:['missing'],process:0,targets:1,related:0,location:null}}
];

export function fixtureSummary(result){return {blocked:null,content:result.contentFindings.map(f=>f.status),process:result.processEvidence.length,targets:result.diagnosticTargets.length,related:result.diagnosticTargets.reduce((n,t)=>n+t.processEvidenceIds.length,0),location:result.diagnosticTargets[0]?.contentLocation?.precision??null};}
