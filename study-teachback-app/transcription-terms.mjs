// Short user-supplied names only; never derived from source answers.
export function transcriptionTerms(value=''){
  if(typeof value!=='string'||value.length>160)throw Error('TRANSCRIPTION_TERMS_LIMIT');
  const terms=[...new Set(value.split(/[,，、;\n；]+/).map(s=>s.trim()).filter(Boolean))];
  if(terms.length>8||terms.some(s=>s.length>24)||terms.join('').length>80||terms.some(s=>/[\r\u0000-\u001f]/.test(s)))
    throw Error('TRANSCRIPTION_TERMS_LIMIT');
  return terms;
}
export function termSnapshot(value=[]){
  if(!Array.isArray(value)||value.some(s=>typeof s!=='string'))throw Error('TRANSCRIPTION_TERMS_LIMIT');
  const terms=transcriptionTerms(value.join(','));
  if(terms.length!==value.length||terms.some((s,i)=>s!==value[i]))throw Error('TRANSCRIPTION_TERMS_LIMIT');
  return terms;
}
