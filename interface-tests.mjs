// Integration smoke tests with a minimal DOM and worker adapter, not a visual browser test.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {bestMove} from './ai.js';
class Element {
 constructor(tag='div'){this.tagName=tag;this.children=[];this.dataset={};this.value='';this.checked=false;this.hidden=false;this.disabled=false;this.style={setProperty(){}};this.classList={add(){},remove(){},toggle(){}};this.parentElement={classList:{toggle(){}}};this.clientWidth=600;this.clientHeight=590;this.options=[{disabled:false},{disabled:false}];this._text='';this.listeners={}}
 set textContent(value){this._text=String(value);this.children=[];this.firstChild={nodeType:3,textContent:this._text}}
 get textContent(){return this._text+this.children.map(c=>c.textContent).join('')}
 append(...children){this.children.push(...children)}
 replaceChildren(...children){this._text='';this.children=children}
 setAttribute(){}
 addEventListener(name,fn){this.listeners[name]=fn}
 showModal(){this.open=true}
 close(){this.open=false}
 querySelector(selector){const square=selector.match(/data-square="(.*?)"/)?.[1];return this.children.find(c=>c.dataset.square===square)}
}
const html=fs.readFileSync(new URL('./index.html',import.meta.url),'utf8'),elements=new Map([...html.matchAll(/id="([^"]+)"/g)].map(m=>[m[1],new Element()]));
const el=id=>{assert(elements.has(id),'DOM id exists: '+id);return elements.get(id)};
el('raven-chat').checked=true;el('mode').value='ai';el('level').value='0';el('coach').checked=true;el('guides').checked=true;
globalThis.document={getElementById:el,createElement:tag=>new Element(tag),body:new Element(),addEventListener(){}};
globalThis.localStorage={data:{},getItem(k){return this.data[k]||null},setItem(k,v){this.data[k]=v}};
globalThis.ResizeObserver=class{constructor(fn){this.fn=fn}observe(){this.fn()}};
globalThis.matchMedia=()=>({matches:true});
let workerBehavior='normal';
globalThis.Worker=class{constructor(){this.terminated=false}postMessage(data){if(workerBehavior==='stalled')return;setTimeout(()=>{if(!this.terminated)this.onmessage?.({data:{id:data.id,kind:data.kind,move:bestMove(data.fen,data.level)}})},5)}terminate(){this.terminated=true}};
await import('./app.js?interface-test');
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function until(fn,timeout=3000){const end=Date.now()+timeout;while(!fn()){if(Date.now()>end)throw new Error('UI timeout');await wait(20)}}
const square=s=>el('flat').querySelector(`[data-square="${s}"]`);
assert.equal(el('flat').children.length,64);
assert.equal(el('promotion-options').children.length,4);
assert.equal(el('flat').hidden,false);
assert.equal(el('world').hidden,true);
assert.equal(typeof el('undo').onclick,'function');
await square('e2').onclick();await square('e4').onclick();
await until(()=>el('count').textContent==='2 medias jugadas'&&!el('undo').disabled);
assert.equal(el('turn').textContent,'Turno de blancas');
assert.match(JSON.parse(localStorage.data['chess-master-v1']).pgn,/e4/);
el('undo').onclick();assert.equal(el('count').textContent,'0 medias jugadas');
el('hint').onclick();await until(()=>!el('hint').disabled);assert.match(el('advice').textContent,/Prueba/);
workerBehavior='stalled';await square('d2').onclick();await square('d4').onclick();await until(()=>el('count').textContent==='2 medias jugadas'&&!el('undo').disabled,6500);assert.equal(el('turn').textContent,'Turno de blancas');assert.match(el('advice').textContent,/modo básico/);
el('raven').onclick();assert.match(el('advice').textContent,/./);assert.match(el('raven-quip').textContent,/Graa/);el('raven-chat').checked=false;el('raven-chat').onchange();assert.match(el('raven-quip').textContent,/Silencio/);assert.equal(typeof el('music').onclick,'function');
console.log('OK interface: boot, 64 squares, 4 promotion buttons, move + AI reply, persistence, undo, hint, stalled-worker recovery. No browser rendering verified.');
process.exit(0);
