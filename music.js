// «El jardín de Nox»: original 32-bar fantasy miniature, composed for this game.
// MIDI pitches, harp-like arpeggios, soft bell melody and sustained chords.
export const MELODY = [
 [74,null,77,76,74,null,69,null],[72,null,74,null,77,76,72,null],
 [70,null,74,77,76,null,74,null],[69,null,72,null,76,74,72,null],
 [74,77,81,null,79,77,76,null],[77,null,79,76,74,null,72,null],
 [70,74,77,null,79,null,77,74],[73,null,76,null,81,null,null,null],
 [81,null,79,77,76,null,74,null],[79,77,76,null,72,null,74,null],
 [77,null,74,70,74,null,76,77],[76,null,72,null,69,null,null,null],
 [74,null,69,72,74,76,77,null],[79,null,77,76,74,null,72,null],
 [70,null,74,null,77,76,74,null],[73,null,69,null,74,null,null,null],
 [77,null,81,null,84,81,79,null],[79,null,76,72,76,null,79,null],
 [82,null,81,77,74,null,77,null],[81,79,76,null,72,null,76,null],
 [79,null,77,74,72,null,74,77],[76,null,79,null,84,null,81,79],
 [77,74,70,null,74,null,77,79],[81,null,80,76,73,null,null,null],
 [77,null,76,74,69,null,72,null],[76,null,74,72,67,null,72,null],
 [74,null,70,null,65,70,74,null],[72,null,69,null,64,null,null,null],
 [74,null,77,76,74,null,69,null],[72,null,76,79,77,null,76,null],
 [70,null,74,null,73,null,69,null],[74,null,null,null,null,null,null,null]
];
const CHORDS=[[50,57,65],[48,55,64],[46,53,62],[45,52,60],[43,50,58],[48,55,64],[46,53,62],[45,52,61]];
const hz=n=>440*2**((n-69)/12);
export class GardenMusic {
 constructor(){this.context=null;this.enabled=false;this.volume=.35;this.timer=null;this.step=0;this.voices=new Set();this.paused=false}
 init(){const C=globalThis.AudioContext||globalThis.webkitAudioContext;if(!C)throw new Error('Audio unavailable');const c=this.context=new C();this.master=c.createGain();this.master.gain.value=0;const compressor=c.createDynamicsCompressor();compressor.threshold.value=-18;compressor.ratio.value=3;this.master.connect(compressor);compressor.connect(c.destination);this.dry=c.createGain();this.dry.gain.value=.8;this.dry.connect(this.master);this.reverb=c.createConvolver();const impulse=c.createBuffer(2,Math.floor(c.sampleRate*1.8),c.sampleRate);for(let channel=0;channel<2;channel++){const data=impulse.getChannelData(channel);for(let i=0;i<data.length;i++)data[i]=(Math.random()*2-1)*Math.pow(1-i/data.length,3)*.35}this.reverb.buffer=impulse;const wet=c.createGain();wet.gain.value=.22;this.reverb.connect(wet);wet.connect(this.master)}
 async start(){if(!this.context)this.init();await this.context.resume();this.enabled=true;this.paused=false;this.next=this.context.currentTime+.08;this.applyVolume();this.schedule()}
 note(midi,time,duration,kind='harp',pan=0){const c=this.context,gain=c.createGain(),panner=c.createStereoPanner();panner.pan.value=pan;gain.connect(panner);panner.connect(this.dry);panner.connect(this.reverb);const soft=kind==='pad',peak=soft?.018:kind==='melody'?.09:.048;gain.gain.setValueAtTime(.0001,time);gain.gain.exponentialRampToValueAtTime(peak,time+(soft?.6:.014));gain.gain.exponentialRampToValueAtTime(.0001,time+duration);let remaining=soft?1:2;for(let partial=0;partial<(soft?1:2);partial++){const osc=c.createOscillator(),level=c.createGain();osc.type=soft?'triangle':'sine';osc.frequency.value=hz(midi)*(partial?2:1);level.gain.value=partial?.16:1;osc.connect(level);level.connect(gain);this.voices.add(osc);osc.onended=()=>{this.voices.delete(osc);osc.disconnect();level.disconnect();if(--remaining===0){gain.disconnect();panner.disconnect()}};osc.start(time);osc.stop(time+duration+.05)}}
 schedule(){clearTimeout(this.timer);this.timer=null;if(!this.enabled||this.paused)return;const c=this.context,eighth=60/72/2;if(this.next<c.currentTime-.5)this.next=c.currentTime+.05;while(this.next<c.currentTime+.18){const bar=Math.floor(this.step/8)%32,beat=this.step%8,chord=CHORDS[bar%8];if(beat===0)for(const pitch of chord)this.note(pitch,this.next,eighth*8+.6,'pad');const arp=[0,1,2,1,0,2,1,2][beat];this.note(chord[arp]+12,this.next,1.4,'harp',beat%2?.3:-.3);const pitch=MELODY[bar][beat];if(pitch!==null)this.note(pitch,this.next,1.9,'melody',-.08);this.step=(this.step+1)%256;this.next+=eighth}this.timer=setTimeout(()=>this.schedule(),70)}
 applyVolume(){if(this.context){const now=this.context.currentTime;this.master.gain.cancelScheduledValues(now);this.master.gain.setTargetAtTime(this.enabled?this.volume:0,now,.18)}}
 setVolume(value){this.volume=Math.max(0,Math.min(1,value));this.applyVolume()}
 stop(){this.enabled=false;clearTimeout(this.timer);this.timer=null;this.applyVolume();for(const osc of this.voices)try{osc.stop(this.context.currentTime+.25)}catch{}}
 async setHidden(hidden){if(!this.context)return;this.paused=hidden;if(hidden){clearTimeout(this.timer);this.timer=null;await this.context.suspend()}else if(this.enabled){await this.context.resume();this.next=this.context.currentTime+.08;this.schedule()}}
}
