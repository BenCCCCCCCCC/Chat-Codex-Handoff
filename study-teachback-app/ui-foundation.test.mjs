import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('./style.css',import.meta.url),'utf8');
const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');
const color=name=>css.match(new RegExp('--'+name+':(#[a-f0-9]+)'))[1];
function luminance(hex){let h=hex.slice(1);if(h.length===3)h=h.split('').map(x=>x+x).join('');return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);}
test('A tokens: text contrast and control boundary pairs meet scoped targets',()=>{
  for(const [fg,bg,min] of [['ink','surface',4.5],['muted','surface',4.5],['accent','surface',4.5],['surface-raised','accent',4.5],['warning','warning-soft',4.5],['danger','danger-soft',4.5],['control-line','surface-raised',3],['focus','surface',3]]){
    const values=[luminance(color(fg)),luminance(color(bg))].sort((a,b)=>b-a);assert((values[0]+.05)/(values[1]+.05)>=min,fg+'/'+bg);
  }
});
test('UI retains native import, nonnavigable brand, modal semantics and reduced motion',()=>{
  assert(html.includes('type="file"'));assert(html.includes('aria-labelledby="deleteTitle"'));assert(html.includes('aria-describedby="deleteScope"'));
  assert(!/<a class="brand"/.test(html));assert(!/https?:\/\/[^<]*\.(?:css|js|woff)/.test(html));
  assert(css.includes('prefers-reduced-motion'));assert(css.includes('scroll-margin'));assert(css.includes('min-height:44px'));
});
