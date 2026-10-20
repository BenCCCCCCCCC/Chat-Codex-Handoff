import {BACKUP_LIMIT, decodeBackup, restoredCopy} from './backup.mjs';

export function mountBackup({getStore, canStart, setBusy, beforeRestore, onRestore}) {
  const $=id=>document.getElementById(id), dialog=$('backupDialog');
  let candidate=null, busy=false;
  const errorText=error=>({
    BACKUP_FORMAT:'请选择“导出备份”生成的 JSON 文件。',
    BACKUP_TOO_LARGE:'备份超过 128 MB，请保留文件，暂无法在这里恢复。',
    BACKUP_INVALID:'备份不完整或已损坏，未写入任何记录。'
  }[error.message]??'本机保存失败，已有记录未改变。可以重试恢复。');
  function reset() {
    candidate=null; $('backupFile').value=''; $('backupSummary').textContent='';
    $('backupStatus').textContent=''; $('backupConfirm').disabled=true;
  }
  $('backupOpen').onclick=()=>{
    if(!canStart())return;
    reset();dialog.showModal();$('backupFile').focus();
  };
  $('backupCancel').onclick=()=>{if(!busy)dialog.close();};
  dialog.oncancel=event=>{if(busy)event.preventDefault();};
  dialog.onclose=()=>{reset();$('backupOpen').focus();};
  $('backupFile').onchange=async()=>{
    const file=$('backupFile').files[0];candidate=null;$('backupConfirm').disabled=true;
    $('backupSummary').textContent='';$('backupStatus').textContent='';
    if(!file)return;
    busy=true;setBusy(true);$('backupFile').disabled=true;$('backupCancel').disabled=true;
    try {
      if(file.size>BACKUP_LIMIT)throw Error('BACKUP_TOO_LARGE');
      candidate=decodeBackup(await file.text());
      $('backupSummary').textContent=`${candidate.source.title}\n${candidate.messages.length} 条消息 · ${candidate.attempts.length} 次讲解 · ${candidate.practiceRounds?.length??(candidate.apply?1:0)} 道练习\n学习于 ${new Date(candidate.createdAt).toLocaleDateString()}`;
      $('backupConfirm').disabled=false;
    } catch(error) { $('backupStatus').textContent=errorText(error); }
    finally {busy=false;setBusy(false);$('backupFile').disabled=false;$('backupCancel').disabled=false;}
  };
  $('backupConfirm').onclick=async()=>{
    if(!candidate||busy||!canStart())return;
    busy=true;setBusy(true);$('backupConfirm').disabled=true;$('backupCancel').disabled=true;$('backupFile').disabled=true;
    try {
      await beforeRestore();
      const copy=restoredCopy(candidate);
      await getStore().add(copy);
      dialog.close();onRestore(copy);
    } catch(error) { $('backupStatus').textContent=errorText(error); }
    finally {busy=false;setBusy(false);$('backupConfirm').disabled=!candidate;$('backupCancel').disabled=false;$('backupFile').disabled=false;}
  };
}
