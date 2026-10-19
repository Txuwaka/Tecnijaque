// A quiet, slow river: low, rounded stereo flow without isolated tap-like drops.
// Keep the public class name for compatibility with the saved game.
export class Fountain {
  constructor(){this.context=null;this.enabled=false;this.volume=.3;this.sources=[]}
  async start(){
    if(!this.context){
      const C=window.AudioContext||window.webkitAudioContext;
      if(!C)throw new Error('Audio no disponible');
      const c=this.context=new C();
      this.master=c.createGain();this.master.gain.value=0;this.master.connect(c.destination);
      const buffer=c.createBuffer(2,c.sampleRate*20,c.sampleRate);
      for(let channel=0;channel<2;channel++){
        const data=buffer.getChannelData(channel);let slow=0,soft=0;
        for(let i=0;i<data.length;i++){
          slow=.993*slow+.007*(Math.random()*2-1);
          soft=.94*soft+.06*(Math.random()*2-1);
          const t=i/c.sampleRate;
          data[i]=(slow*3+soft*.32)*(.78+.12*Math.sin(2*Math.PI*t/10+channel)+.07*Math.sin(2*Math.PI*t/4+channel));
        }
        // A short crossfade makes the repeating current seamless.
        const n=Math.floor(c.sampleRate*.6);
        for(let i=0;i<n;i++){const mix=i/n;data[data.length-n+i]=data[data.length-n+i]*(1-mix)+data[i]*mix}
      }
      const noise=c.createBufferSource();noise.buffer=buffer;noise.loop=true;noise.loopStart=.6;
      const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=85;hp.Q.value=.5;
      const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=850;lp.Q.value=.4;
      const swell=c.createGain();swell.gain.value=.8;
      const lfo=c.createOscillator(),depth=c.createGain();lfo.frequency.value=.065;depth.gain.value=.12;
      lfo.connect(depth);depth.connect(swell.gain);lfo.start();
      noise.connect(hp);hp.connect(lp);lp.connect(swell);swell.connect(this.master);noise.start();
      this.sources.push(noise,lfo);
    }
    await this.context.resume();this.enabled=true;this.applyVolume();
  }
  applyVolume(){if(this.context){const now=this.context.currentTime;this.master.gain.cancelScheduledValues(now);this.master.gain.setTargetAtTime(this.enabled?this.volume*.48:0,now,.7)}}
  stop(){this.enabled=false;this.applyVolume()}
  async setHidden(hidden){if(!this.context)return;if(hidden)await this.context.suspend();else if(this.enabled)await this.context.resume()}
  setVolume(v){this.volume=Math.max(0,Math.min(1,v));this.applyVolume()}
}
