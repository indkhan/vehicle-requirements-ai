import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root=new URL('../public/images/bmw/interior/',import.meta.url);
for(const family of process.argv.slice(2)) {
 const source=JSON.parse(await readFile(new URL(`${family}-source.json`,root),'utf8'));
 const images=source['interior-mixed'].res_2000x2000.images;
 if(images.length!==6)throw new Error(`Expected six cube faces: ${family}`);
 await mkdir(new URL(`${family}/`,root),{recursive:true});
 for(let i=0;i<6;i++) {
  const url=images[i].viewImage;
  if(!['prod.cosy.bmw.cloud','prod.cosy.aws.bmwchina.cloud'].includes(new URL(url).hostname))throw new Error('Unexpected asset host');
  const response=await fetch(url);if(!response.ok)throw new Error(`${family}: ${response.status}`);
  const bytes=Buffer.from(await response.arrayBuffer());
  if(bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw new Error('Invalid WebP');
  await writeFile(new URL(`${family}/${i}.webp`,root),bytes);
 }
 console.log(`${family}: six cabin faces saved`);
}
