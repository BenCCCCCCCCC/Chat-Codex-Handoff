import { RETENTION_MS } from './core.mjs';
export async function openStore(name='study-teachback-v1') {
  const db=await new Promise((resolve,reject)=>{const r=indexedDB.open(name,1);r.onupgradeneeded=()=>r.result.createObjectStore('topics',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
  const operation=(mode,fn)=>new Promise((resolve,reject)=>{const tx=db.transaction('topics',mode),store=tx.objectStore('topics');let value;const r=fn(store);r.onsuccess=()=>{value=r.result;};tx.oncomplete=()=>resolve(value);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error??new Error('STORAGE_ABORTED'));});
  const api={put:v=>operation('readwrite',s=>s.put(v)),add:v=>operation('readwrite',s=>s.add(v)),get:id=>operation('readonly',s=>s.get(id)),all:()=>operation('readonly',s=>s.getAll()),delete:id=>operation('readwrite',s=>s.delete(id)),clear:()=>operation('readwrite',s=>s.clear()),close:()=>db.close()};
  api.expire=async(now=Date.now())=>{let removed=0;for(const t of await api.all()){const retainedAt=t.restoredAt??t.createdAt;if(!Number.isFinite(retainedAt)||retainedAt+RETENTION_MS<=now){await api.delete(t.id);removed++;}}return removed;};
  await api.expire();return api;
}
