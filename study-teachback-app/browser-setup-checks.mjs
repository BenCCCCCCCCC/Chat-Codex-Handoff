import assert from 'node:assert/strict';
export async function setupChecks({check,evaluate,until,reloadPage,shot,cdp,click,calls}){
  const input=(id,value)=>evaluate(`{const e=document.getElementById(${JSON.stringify(id)});e.value=${JSON.stringify(value)};e.dispatchEvent(new Event('input',{bubbles:true}));}`);
  const source=()=>evaluate(`document.getElementById('source').value`);
  await check('setup draft survives same navigation, example round trip, reload, import replacement and undo',async()=>{
    const before=calls.length;
    await input('source','原来的课程材料。');await input('title','我自己的标题');await input('setupFocus','理解条件');
    await click('newStudy');await until(`!document.getElementById('setup').hidden`);assert.equal(await source(),'原来的课程材料。');
    await evaluate(`document.querySelector('a[href="/demo"]').click()`);await until(`document.getElementById('demoNext')`);
    await cdp('Page.navigate',{url:await evaluate('location.origin')+'/'});await until(`document.getElementById('source')?.value==='原来的课程材料。'`);
    await reloadPage();assert.equal(await source(),'原来的课程材料。');
    await evaluate(`{const f=document.getElementById('sourceFile'),dt=new DataTransfer();dt.items.add(new File(['新导入的材料。'],'new.txt',{type:'text/plain'}));f.files=dt.files;f.dispatchEvent(new Event('change'));}`);
    await until(`document.getElementById('extractionState').textContent==='解析完成'`);
    assert.equal(await source(),'原来的课程材料。');await click('useAll');assert.equal(await source(),'新导入的材料。');
    assert.equal(await evaluate(`document.getElementById('title').value`),'我自己的标题');
    await reloadPage();await click('undoImport');assert.equal(await source(),'原来的课程材料。');
    assert.equal(await evaluate(`document.getElementById('setupFocus').value`),'理解条件');
    await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
    await shot('setup-draft-mobile','setup');assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`));
    // A write failure blocks leaving but preserves the actual input for retry.
    await evaluate(`window.originalSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw Error('synthetic full');}`);
    await input('source','存储失败仍要保留的材料。');await click('newStudy');assert.equal(await source(),'存储失败仍要保留的材料。');
    assert.equal(await evaluate(`document.getElementById('setupDraftRetry').hidden`),false);
    await evaluate(`Storage.prototype.setItem=window.originalSetItem`);await click('setupDraftRetry');await reloadPage();
    assert.equal(await source(),'存储失败仍要保留的材料。');assert.equal(calls.length,before);
    await click('clearSetupDraft');await until(`document.getElementById('deleteDialog').open`);await click('deleteConfirm');
    await until(`document.getElementById('source').value===''`);
    await cdp('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false});
  });
}
