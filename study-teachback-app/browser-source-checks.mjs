import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

export async function sourceChecks({check,evaluate,until,reloadPage,shot,cdp,click,calls,setAIConfigured}){
  await check('imported slide evidence survives backup, locates the exact slide and keeps old sources when revising',async()=>{
    const build=spawnSync(fileURLToPath(new URL('./.venv/Scripts/python.exe',import.meta.url)),['-I','-c',
      "import io,zipfile,sys; b=io.BytesIO(); z=zipfile.ZipFile(b,'w'); [z.writestr('ppt/slides/slide%d.xml'%(i+1),'<root xmlns:a=\"http://schemas.openxmlformats.org/drawingml/2006/main\"><a:p><a:r><a:t>'+text+'</a:t></a:r></a:p></root>') for i,text in enumerate(['Rule A applies.','Rule B is the exception.'])]; z.close(); sys.stdout.buffer.write(b.getvalue())"],{windowsHide:true,env:{SystemRoot:process.env.SystemRoot}});
    assert.equal(build.status,0);const bytes=[...build.stdout],audio=[...readFileSync(new URL('./fixtures/synthetic-mandarin-v2.wav',import.meta.url))];
    const before=calls.length;setAIConfigured(false);await reloadPage();
    await evaluate(`{const f=document.getElementById('sourceFile'),d=new DataTransfer();d.items.add(new File([new Uint8Array(${JSON.stringify(bytes)})],'课程.pptx'));f.files=d.files;f.dispatchEvent(new Event('change'));}`);
    await until(`document.getElementById('source').value.includes('Rule B')`);await click('learn');await until(`!document.getElementById('workspace').hidden`);
    assert.match(await evaluate(`document.getElementById('sourceLocation').textContent`),/幻灯片 1.*幻灯片 2/);
    await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const t=(await db.all())[0];window.originalSource=structuredClone(t.source);
      const a={id:'slide-attempt',createdAt:Date.now(),source:structuredClone(t.source),kind:'full',assistance:'source',duration:7.31,
        audio:new Blob([new Uint8Array(${JSON.stringify(audio)})],{type:'audio/wav'}),raw:{id:'slide-raw',text:'Rule A applies.',reviewed:true,spans:[{id:'s0',start:0,end:1,text:'Rule A applies.'}]},corrections:[],reports:[],status:'DIAGNOSED'};
      a.reports.push({channel:'content',createdAt:Date.now(),sourceId:t.source.id,attemptId:a.id,transcriptVersion:a.raw.id,findings:[{status:'missing',message:'Explain the exception.',sourceQuote:'Rule B is the exception.',spanId:null,quote:null,eventId:null,repair:'Explain rule B.'}]});
      t.attempts.push(a);t.resume={view:'attempt',attemptId:a.id};await db.put(t);
      const backup=await import('/backup.mjs');const restored=backup.restoredCopy(backup.decodeBackup(await backup.encodeBackup(t)),{id:'restored-slides'});window.backupMatches=JSON.stringify(restored.source)===JSON.stringify(t.source);db.close();})()`);
    assert.equal(await evaluate('window.backupMatches'),true);await reloadPage();await until(`document.querySelector('#feedback .finding')`);
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await evaluate(`{const b=[...document.querySelectorAll('#feedback button')].find(b=>b.textContent==='查看材料位置');b.closest('details').open=true;b.focus();}`);
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
    await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await until(`document.getElementById('sourceDrawer').open`);
    assert.equal(await evaluate(`document.querySelector('#drawerText mark').textContent`),'Rule B is the exception.');
    assert.match(await evaluate(`document.getElementById('drawerLocation').textContent`),/幻灯片 2/);
    await shot('source-page-mobile','sourceDrawer');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    await click('sourceReturn');await until(`!document.getElementById('sourceDrawer').open && document.activeElement.classList.contains('finding')`);
    await click('revise');await until(`!document.getElementById('setup').hidden`);
    await evaluate(`{const e=document.getElementById('source');e.value+=' Edited.';e.dispatchEvent(new Event('input'));}`);await click('learn');await until(`!document.getElementById('workspace').hidden`);
    assert(await evaluate(`(async()=>{const db=await(await import('/storage.mjs')).openStore();const all=await db.all();db.close();const old=all.find(t=>t.attempts.length),newer=all.find(t=>!t.attempts.length);return newer.source.revisionOf===old.source.id&&!newer.source.provenance&&old.source.provenance.regions.length===2&&old.attempts[0].source.text===old.source.text;})()`));
    assert.equal(calls.length,before);await click('historyButton');await click('deleteAll');
    await until(`!document.getElementById('setup').hidden`);setAIConfigured(true);await reloadPage();
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
}
