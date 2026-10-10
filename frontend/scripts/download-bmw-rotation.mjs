import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const directory=path.resolve(process.argv[2]||'frontend/public/images/bmw/rotation/i20');
const source=JSON.parse(await fs.readFile(path.join(directory,'source.json'),'utf8'));
const collection=source.manifest['walkaround-360'];
const jobs=[];
for(const [size,folder] of [['desktop_xl','original'],['mobile','preview']]){
 await fs.mkdir(path.join(directory,folder),{recursive:true});
 collection[size].images.forEach((frame,index)=>jobs.push({size,angle:frame.angle,url:frame.viewImage,file:`${folder}/${String(index).padStart(2,'0')}.webp`}));
}
let next=0;const results=[];
await Promise.all(Array.from({length:4},async()=>{while(next<jobs.length){const job=jobs[next++];const url=new URL(job.url);if(url.hostname!=='prod.cosy.bmw.cloud')throw Error('Unexpected source host');const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok||!response.headers.get('content-type')?.includes('image/webp'))throw Error(`${job.file}: ${response.status}`);const data=Buffer.from(await response.arrayBuffer());if(data.toString('ascii',0,4)!=='RIFF'||data.toString('ascii',8,12)!=='WEBP')throw Error(`Invalid WebP: ${job.file}`);await fs.writeFile(path.join(directory,job.file),data);results.push({...job,width:collection[job.size].metaData.width,height:collection[job.size].metaData.height,bytes:data.length,sha256:createHash('sha256').update(data).digest('hex')});}}));
results.sort((a,b)=>a.file.localeCompare(b.file));
await fs.writeFile(path.join(directory,'manifest.json'),JSON.stringify({model:source.model,body:source.body,retrieved:source.retrieved,sourcePage:source.sourcePage,originalAngleCount:36,angleStep:10,interpolated:false,files:results},null,2));
console.log(`Saved ${results.length} verified WebP files (${(results.reduce((sum,f)=>sum+f.bytes,0)/1048576).toFixed(2)} MiB).`);
