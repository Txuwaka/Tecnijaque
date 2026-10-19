import assert from 'node:assert/strict';
import {PerspectiveCamera,Vector3} from './vendor/three.module.js';
import {boardFramePoints,fitBoardCamera} from './camera-fit.js';

// Test actual projected geometry in both orientations; no WebGL or mocked sizing.
const sizes=[[304,300],[344,360],[374,410],[414,490],[640,170],[720,270],[990,640]];
for(const [width,height] of sizes)for(const flipped of [false,true])for(const overhead of [false,true]){
  const camera=new PerspectiveCamera(39,1,.1,100);
  fitBoardCamera(camera,width,height,{flipped,overhead});
  const projected=boardFramePoints().map(p=>p.project(camera));
  for(const p of projected){
    assert(Math.abs(p.x)<=.941&&Math.abs(p.y)<=.941,`Clipped board at ${width}x${height}`);
    assert(p.z>-1&&p.z<1,'Geometry remains between clipping planes');
  }
  assert(Math.max(...projected.flatMap(p=>[Math.abs(p.x),Math.abs(p.y)]))>.939,'Use available width or height');
  const target=new Vector3(0,.4,0).project(camera);
  assert(Math.abs(target.x)<1e-6&&Math.abs(target.y)<1e-6,'Board is centered');
}
console.log('OK camera: full board and tall pieces fit 7 sizes, both orientations and both views; framing uses 94% of the limiting dimension.');
