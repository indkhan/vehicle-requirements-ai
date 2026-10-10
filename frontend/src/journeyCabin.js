import {Scene,PerspectiveCamera,WebGLRenderer,CubeTexture,Texture,EquirectangularReflectionMapping,SRGBColorSpace} from 'three';

// One WebGL context for the whole scroll journey; no pointer or scroll interception.
export function createJourneyCabin(host) {
 const renderer=new WebGLRenderer({antialias:false,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));
 host.appendChild(renderer.domElement);
 const scene=new Scene(),camera=new PerspectiveCamera(58,1,.1,10),maps=new Map();
 let disposed=false,width=1,height=1,lastWidth=0,lastHeight=0;
 const observer=new ResizeObserver(([entry])=>{width=entry.contentRect.width;height=entry.contentRect.height;});
 observer.observe(host);
 async function load(asset,signal){
  const urls=asset==='g68'?['/images/bmw/interior/g68-panorama.webp']:[4,5,3,0,2,1].map(i=>`/images/bmw/interior/${asset}/${i}.webp`);
  const results=await Promise.allSettled(urls.map(async url=>{
   const response=await fetch(url,{signal});if(!response.ok)throw new Error(`Cabin unavailable: ${asset}`);
   return createImageBitmap(await response.blob(),{resizeWidth:asset==='g68'?2048:1024,resizeQuality:'high',imageOrientation:asset==='g68'?'flipY':'none'});
  }));
  const images=results.filter(r=>r.status==='fulfilled').map(r=>r.value);
  if(disposed||signal.aborted||images.length!==urls.length){images.forEach(i=>i.close());if(!signal.aborted&&!disposed)throw new Error(`Cabin unavailable: ${asset}`);return;}
  const map=asset==='g68'?new Texture(images[0]):new CubeTexture(images);
  map.colorSpace=SRGBColorSpace;map.needsUpdate=true;
  if(asset==='g68'){map.mapping=EquirectangularReflectionMapping;map.flipY=false;}
  maps.set(asset,{map,images});
  // Upload before the cabin appears so the transition does not wait for the GPU.
  renderer.initTexture(map);
  // Compile the background shader (and convert the China panorama) offscreen.
  // The first scroll into the cabin then only updates the camera.
  if(host.style.visibility!=='visible'){
   scene.background=map;renderer.render(scene,camera);
  }
 }
 return {
  load,
  ready:asset=>maps.has(asset),
  paint(asset,pan){
   const record=maps.get(asset);if(!record||disposed)return;
   if(!width||!height)return;
   if(width!==lastWidth||height!==lastHeight){renderer.setSize(width,height,false);lastWidth=width;lastHeight=height;}
   scene.background=record.map;
   camera.aspect=width/height;camera.fov=58-pan*6;camera.updateProjectionMatrix();
   camera.rotation.order='YXZ';camera.rotation.set(-.12,(asset==='g68'?-Math.PI/2:0)-.28+pan*.56,0);
   renderer.render(scene,camera);
  },
  dispose(){
   disposed=true;observer.disconnect();maps.forEach(({map,images})=>{map.dispose();images.forEach(i=>i.close());});maps.clear();
   renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
  },
 };
}
