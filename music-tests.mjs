import assert from 'node:assert/strict';
import {GardenMusic,MELODY} from './music.js';
import {Fountain} from './ambience.js';
const param=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(){},cancelScheduledValues(){}});
class AudioNode{constructor(){this.gain=param();this.pan=param();this.frequency=param();this.threshold=param();this.ratio=param()}connect(){}disconnect(){}}
let starts=0;
class Context{constructor(){this.currentTime=0;this.sampleRate=8000;this.destination={};this.state='suspended'}async resume(){this.state='running'}async suspend(){this.state='suspended'}createGain(){return new AudioNode()}createDynamicsCompressor(){return new AudioNode()}createConvolver(){return new AudioNode()}createStereoPanner(){return new AudioNode()}createBiquadFilter(){return new AudioNode()}createBuffer(ch,length){const data=Array.from({length:ch},()=>new Float32Array(length));return {getChannelData:i=>data[i]}}createOscillator(){const n=new AudioNode();n.start=()=>starts++;n.stop=()=>{};return n}createBufferSource(){const n=new AudioNode();n.start=()=>{};return n}}
globalThis.AudioContext=Context;globalThis.window=globalThis;
assert.equal(MELODY.length,32);assert(MELODY.every(bar=>bar.length===8&&bar.every(n=>n===null||Number.isInteger(n))));
const m=new GardenMusic();assert.equal(m.context,null);await m.start();assert(m.enabled);assert(starts>0);assert(m.timer);m.setVolume(.15);assert.equal(m.volume,.15);const step=m.step;await m.setHidden(true);assert.equal(m.context.state,'suspended');assert.equal(m.timer,null);await m.setHidden(false);assert.equal(m.context.state,'running');assert(m.step>step);m.stop();assert.equal(m.timer,null);assert(!m.enabled);const old=m.context;await m.start();assert.equal(m.context,old);m.stop();await m.setHidden(false);assert.equal(m.timer,null);
const fountain=new Fountain();await fountain.start();await fountain.setHidden(true);assert.equal(fountain.timer,null);await fountain.setHidden(false);assert(fountain.timer);fountain.stop();assert.equal(fountain.timer,null);
console.log('OK audio controls: lazy initialization, scheduling, volume, pause/resume, hidden tab, stop and context reuse. Sound quality not assessed.');
