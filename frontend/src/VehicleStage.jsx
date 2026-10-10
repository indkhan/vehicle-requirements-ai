import React,{useEffect,useRef,useState} from 'react';
import {families} from './journeyData.js';
import {journeySample,angleFrames,fitImage,studioBox,dampProgress} from './journeyMotion.js';
import {loadFrames} from './vehicleFrames.js';
export default function VehicleStage({progress}){
 const canvas=useRef(null),cabinHost=useRef(null),[status,setStatus]=useState('Preparing the perspectives'),[attempt,setAttempt]=useState(0);
 useEffect(()=>{
  const el=canvas.current,host=cabinHost.current,ctx=el.getContext('2d');if(!ctx)return;
  const controller=new AbortController(),sequences=new Map(),posters=new Map();
  let disposed=false,raf=0,dirty=true,previous='',w=0,h=0,dpr=1,cabinEngine=null,cabinAlpha=0,lastTime=0,inView=true;
  const resize=()=>{const r=el.getBoundingClientRect();w=r.width;h=r.height;dpr=Math.min(devicePixelRatio||1,1.5);el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);dirty=true;};
  const observer=new ResizeObserver(resize);observer.observe(el);resize();
  const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;dirty=true;});visibility.observe(el);
  families.forEach((family,index)=>{const image=new Image();image.onload=()=>{if(!disposed){posters.set(index,image);dirty=true;}};image.src=`/images/bmw/${family.asset}.webp`;});
  (async()=>{try{for(let i=0;i<families.length;i++){
   const frames=await loadFrames(families[i].asset,{signal:controller.signal,onProgress:n=>{if(!disposed)setStatus(`Preparing ${families[i].id} · ${n}/36`);}});
   if(disposed){frames.forEach(f=>f.close());return;}sequences.set(i,frames);dirty=true;
  }setStatus('');}catch(e){if(e.name!=='AbortError'&&!disposed)setStatus('Some perspectives could not load');}})();
  (async()=>{try{
   const {createJourneyCabin}=await import('./journeyCabin.js');if(disposed)return;
   cabinEngine=createJourneyCabin(host);
   for(const family of families){if(disposed)return;try{await cabinEngine.load(family.asset,controller.signal);dirty=true;}catch(e){if(e.name!=='AbortError'&&!disposed)el.dataset.cabinError=family.id;}}
  }catch{if(!disposed)el.dataset.cabinError='unavailable';}})();
  function draw(index,angle,opacity,push){
   if(opacity<.001)return;
   const frames=sequences.get(index),poster=posters.get(index);if(!frames&&!poster)return;
   const f=angleFrames(angle-(index===2?40:0));
   const image=frames?frames[f.first]:poster;
   const box=fitImage(image.width,image.height,studioBox(w,h));
   const zoom=1+push*.06,iw=box.width*zoom,ih=box.height*zoom,x=box.x+(box.width-iw)/2,y=box.y+(box.height-ih)/2;
   // Blend adjacent original angles rather than jumping between 10-degree frames.
   ctx.globalAlpha=opacity*(frames?1-f.mix:1);ctx.drawImage(image,x,y,iw,ih);
   if(frames&&f.mix>0){ctx.globalAlpha=opacity*f.mix;ctx.drawImage(frames[f.second],x,y,iw,ih);}
  }
  function tick(time){
   const dt=Math.min((time-lastTime)/1000||1/60,.05);lastTime=time;
   const s=journeySample(progress.current),asset=families[s.from].asset;
   const target=cabinEngine?.ready(asset)?s.cabin:0;
   cabinAlpha=dampProgress(cabinAlpha,target,dt);if(Math.abs(cabinAlpha-target)<.0001)cabinAlpha=target;
   const key=`${progress.current.toFixed(5)}:${cabinAlpha.toFixed(4)}`;
   if(inView&&!document.hidden&&(dirty||key!==previous)){
    dirty=false;previous=key;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.globalCompositeOperation='lighter';
    draw(s.from,s.angle,(1-s.mix)*(1-cabinAlpha),s.cabin);
    if(s.from!==s.to)draw(s.to,s.angle,s.mix*(1-cabinAlpha),0);
    ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    host.style.opacity=String(cabinAlpha);host.style.visibility=cabinAlpha>.001?'visible':'hidden';
    host.style.transform=`scale(${.96+cabinAlpha*.04})`;
    if(cabinAlpha>.001)cabinEngine?.paint(asset,s.cabinPan);
    el.dataset.angle=s.angle.toFixed(2);el.dataset.family=families[s.chapter].id;el.dataset.loaded=String(sequences.size);el.dataset.view=cabinAlpha>.5?'interior':'exterior';
   }raf=requestAnimationFrame(tick);
  }
  raf=requestAnimationFrame(tick);
  return()=>{disposed=true;controller.abort();cancelAnimationFrame(raf);observer.disconnect();visibility.disconnect();cabinEngine?.dispose();sequences.forEach(frames=>frames.forEach(f=>f.close()));posters.clear();};
 },[progress,attempt]);
 return <div className="j-car-scene"><canvas ref={canvas} aria-label="BMW exterior rotation and interior panoramas controlled by scrolling" role="img"/><div ref={cabinHost} className="j-cabin-scene" aria-hidden="true"/>{status&&<div className="j-load-status" role="status">{status}{status.includes('could not')&&<button onClick={()=>setAttempt(a=>a+1)}>Retry</button>}</div>}</div>;
}
