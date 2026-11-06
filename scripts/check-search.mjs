import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='dist',origin='https://www.siamplot.com';
const htmlPaths=[];
async function walk(dir){for(const f of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+f.name;if(f.isDirectory())await walk(p);else if(f.name==='index.html')htmlPaths.push(p);}}
await walk(root);
const titles=new Set(),descriptions=new Set();
const locales=['th','en','zh','ja'];
const rows=[];
for(const file of htmlPaths){
 const html=await readFile(file,'utf8'),path=file.slice(4).replace(/index.html$/,'');
 const lang=html.match(/<html lang="([^"]+)"/)[1];
 const title=html.match(/<title>(.*?)<\/title>/s)[1],description=html.match(/<meta name="description" content="([^"]+)"/)[1];
 assert(!titles.has(title),'duplicate title '+path);titles.add(title);
 assert(!descriptions.has(description),'duplicate description '+path);descriptions.add(description);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path+' H1');
 assert(html.includes(`rel="canonical" href="${origin+path}"`),path+' canonical');
 for(const l of locales){
 const alternate=html.match(new RegExp(`hreflang="${l}" href="([^"]+)"`));assert(alternate,path+' alternate '+l);
 const target=await readFile(root+alternate[1].replace(origin,'')+'index.html','utf8');
 assert(target.includes(`hreflang="${lang}" href="${origin+path}"`),path+' reciprocal '+l);
}
 const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,path+' duplicate IDs');
 for(const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(m[1]);
 for(const m of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)){
  const target=root+m[1]+(m[1].endsWith('/')?'index.html':'');await readFile(target).catch(()=>assert.fail(path+' broken '+m[1]));
 }
 for(const m of html.matchAll(/<img\b[^>]*>/g))assert(/width=/.test(m[0])&&/height=/.test(m[0])&&/alt=/.test(m[0]),path+' image attributes');
 if(lang!=='th'&&path.includes('/investors/'))assert(!/[ก-๙]/.test(html.replace(/<a lang="th"[^>]*>.*?<\/a>/g,'')),path+' Thai leakage');
 rows.push({path,lang,title,description});
}
assert.equal(rows.length,32);
const sitemap=await readFile(root+'/sitemap.xml','utf8');for(const row of rows)assert(sitemap.includes(origin+row.path));
console.log(JSON.stringify({pages:rows.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,rows},null,2));
