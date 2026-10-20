// Coalesce typing, but always await an already-running write before navigation.
export function createDraftSaver({save, onStatus=()=>{}, onError=()=>{}, delay=350}) {
  let pending=null, running=null, timer=null, revision=0;
  async function flush() {
    clearTimeout(timer);timer=null;
    if(running) { await running; if(pending)await flush(); return; }
    if(!pending)return;
    const target=pending, version=revision;pending=null;
    running=Promise.resolve().then(()=>save(target)).then(()=>{
      if(version===revision)onStatus('saved');
    },error=>{
      pending??=target;onStatus('error');throw error;
    }).finally(()=>{running=null;});
    await running;
    if(pending)await flush();
  }
  return {
    mark(target) {
      pending=target;revision++;onStatus('saving');clearTimeout(timer);
      timer=setTimeout(()=>flush().catch(onError),delay);
    },
    flush,
    async discard(){
      clearTimeout(timer);timer=null;pending=null;
      if(running)await running.catch(()=>{});
      pending=null;onStatus('idle');
    },
    get pending(){return !!pending || !!running;}
  };
}
