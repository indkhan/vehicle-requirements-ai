export const clamp=(v,lo=0,hi=1)=>Math.min(hi,Math.max(lo,v));
export const storyProgress=(offset,distance,count)=>clamp(offset/Math.max(1,distance))*(count-1);
export const dampProgress=(current,target,dt)=>current+(target-current)*(1-Math.exp(-12*dt));
const smooth=v=>{const t=clamp(v);return t*t*(3-2*t);};
export const JOURNEY_END=4;
// All families use the same unwrapped camera angle. A handoff never resets it.
export function journeySample(progress) {
 const p=clamp(progress,0,JOURNEY_END),from=Math.min(3,Math.floor(p)),local=p-from;
 const mix=from===3?0:smooth((local-.9)/.1);
 const cabin=smooth((local-.38)/.22)*(1-smooth((local-.78)/.14));
 return {from,to:mix>0?from+1:from,mix,angle:40+p*210,cabin,
  cabinPan:clamp((local-.38)/.54),chapter:mix>.5?Math.min(3,from+1):from};
}
export function angleFrames(angle,count=36) {
 const frame=((angle%360+360)%360)/360*count, first=Math.floor(frame);
 return {first,second:(first+1)%count,mix:Math.round((frame-first)*1e8)/1e8};
}
// Contain source pixels in a destination rectangle without changing their proportions.
export function fitImage(width,height,box) {
 const scale=Math.min(box.width/width,box.height/height);
 const w=width*scale,h=height*scale;
 return {x:box.x+(box.width-w)/2,y:box.y+(box.height-h)/2,width:w,height:h};
}
export function studioBox(width,height) {
 return width<760
  ?{x:width*.025,y:height*.47,width:width*.95,height:height*.35}
  :{x:width*.34,y:height*.22,width:width*.63,height:height*.57};
}
