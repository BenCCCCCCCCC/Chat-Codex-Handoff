export const plantSource={id:'engineering-source-1',title:'自编工程材料：植物浇水',text:'只有土壤干燥时才给这盆植物浇水。土壤湿润时不要浇水。'};
export const ticketSource={id:'engineering-source-ticket',title:'自编工程材料：入场条件',text:'只有持票者才可以入场。'};
export const cases=[
  {id:'correct_with_pauses',source:plantSource,words:'嗯，浇水的必要条件是土壤干燥。湿润时不要浇水。干燥是否一定要浇，材料没说。',expectation:'correct'},
  {id:'fluent_wrong',source:plantSource,words:'土壤越湿越要浇水，湿润时也要浇水。',expectation:'wrong'},
  {id:'omitted_condition',source:plantSource,words:'给这盆植物浇水。',expectation:'missing'},
  {id:'valid_paraphrase',source:plantSource,words:'还湿着就别加水。要浇水，至少得先满足土壤干燥；干燥本身不保证要浇。',expectation:'correct'},
  {id:'self_repair',source:plantSource,words:'干了就一定要浇，不对，我说过头了。浇水必须土壤干燥，但干燥不代表一定要浇；湿润时不要浇。',expectation:'correct'},
  {id:'plant_sufficient_strengthening',source:plantSource,words:'只要土壤干燥就一定要给这盆植物浇水。',expectation:'unsupported_strengthening'},
  {id:'ticket_sufficient_strengthening',source:ticketSource,words:'只要持票就一定可以入场。',expectation:'unsupported_strengthening'}
];
// This oracle checks fixture verdicts, not arbitrary Chinese entailment. Human review of
// rationale/teaching is still required; schema/reference validity is a separate check.
export function verdictPass(expectation, findings){
  const statuses=findings.map(f=>f.status);
  if(expectation==='correct')return statuses.includes('supported')&&!statuses.some(s=>['incorrect','missing','unknown'].includes(s));
  if(expectation==='wrong')return statuses.includes('incorrect')&&!statuses.includes('supported');
  if(expectation==='missing')return statuses.includes('missing')&&!statuses.includes('supported');
  if(expectation==='unsupported_strengthening')return !statuses.includes('supported')&&statuses.some(s=>['incorrect','unknown'].includes(s));
  return false;
}
