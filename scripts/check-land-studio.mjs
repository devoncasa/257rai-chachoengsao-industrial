import assert from 'node:assert/strict';
import {buildSync} from 'esbuild';
const load=async path=>{const out=buildSync({entryPoints:[path],bundle:true,platform:'node',format:'esm',write:false}).outputFiles[0].text;return import('data:text/javascript;base64,'+Buffer.from(out).toString('base64'));};
const {scenarios,inside}=await load('land-studio/data.ts');
const {copy}=await load('land-studio/copy.ts');
assert.equal(scenarios.length,6);assert.equal(new Set(scenarios.map(s=>s.id)).size,6);
for(const s of scenarios){assert.equal(s.shares.reduce((a,b)=>a+b),100);for(const p of s.parts){assert.ok(p.h>0&&p.w>0&&p.d>0);for(const x of [p.x-p.w/2,p.x+p.w/2])for(const y of [p.y-p.d/2,p.y+p.d/2])assert.ok(inside(x,y),`${s.id}: footprint outside schematic boundary`);}}
for(const lang of ['th','en','zh','ja']){assert.equal(copy[lang].concepts.length,6);for(const c of copy[lang].concepts){assert.ok(c.title&&c.summary&&c.next);assert.equal(c.checks.length,3);}}
console.log('PASS: six concepts, all schematic footprints, 100% budgets and four-language technical content');
