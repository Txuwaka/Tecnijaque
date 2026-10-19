import {Vector3} from './vendor/three.module.js';

// Frame the playable board and the tallest pieces, rather than the decorative plinth.
export function boardFramePoints(){
  const points=[];
  for(const x of [-4.4,4.4])for(const z of [-4.4,4.4]){
    points.push(new Vector3(x,-.48,z),new Vector3(x,.08,z));
  }
  for(const x of [-3.85,3.85])for(const z of [-3.85,3.85]){
    points.push(new Vector3(x,1.8,z));
  }
  return points;
}

export function fitBoardCamera(camera,width,height,{flipped=false,overhead=false}={}){
  if(width<=0||height<=0)return;
  camera.aspect=width/height;
  const target=new Vector3(0,.4,0);
  const direction=new Vector3(0,overhead?15:10.7,(overhead?.1:10)*(flipped?-1:1)).normalize();
  camera.position.copy(target).addScaledVector(direction,15);
  camera.lookAt(target);
  const inverse=camera.quaternion.clone().invert();
  const tanY=Math.tan(camera.fov*Math.PI/360),tanX=tanY*camera.aspect;
  const margin=.94;
  let distance=0;
  for(const point of boardFramePoints()){
    const local=point.sub(target).applyQuaternion(inverse);
    distance=Math.max(distance,local.z+Math.abs(local.x)/(tanX*margin),local.z+Math.abs(local.y)/(tanY*margin));
  }
  camera.position.copy(target).addScaledVector(direction,distance);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
}
