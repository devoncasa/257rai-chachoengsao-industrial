import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import ts from 'typescript';
import {readFileSync} from 'node:fs';
const path=process.env.ANALYTICS_SOURCE||'analytics.ts';
const source=readFileSync(path,'utf8');
const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const host=source.match(/productionHosts = new Set\(\['([^']+)'/)[1];
const id=source.match(/measurementId = '([^']+)'/)[1];
const languages=source.match(/pageLanguages = new Set\(\[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(x=>x.slice(1,-1));
function boot({lang='en',qa='',blocked=false,preview=false,storage=new Map(),failStorage=false}={}){
 const listeners={},elements=new Map();class Element{constructor(href){this.href=href}closest(){return this}getAttribute(){return this.href}}
 const location={hostname:preview?'preview.netlify.app':host,origin:'https://'+host,pathname:'/'+lang+'/',href:'https://'+host+'/'+lang+'/?email=secret'+qa};
 const window={location,navigator:{doNotTrack:blocked?'1':'0'},sessionStorage:{getItem:k=>{if(failStorage)throw Error();return storage.get(k)},setItem:(k,v)=>{if(failStorage)throw Error();storage.set(k,v)},removeItem:k=>storage.delete(k)}};
 const document={readyState:'loading',documentElement:{lang},getElementById:k=>elements.get(k),createElement:()=>({}),head:{appendChild:s=>elements.set(s.id,s)},addEventListener:(k,f)=>listeners[k]=f};
 window.addEventListener=()=>{};const exports={};vm.runInNewContext(js,{window,document,exports,Element,URL,Reflect,Date,Set});exports.initializeAnalytics();
 return{window,document,exports,listeners,Element,data:()=>Array.from(window.dataLayer||[],x=>Array.from(x))};
}
test('every published language, exact property routing, and sanitized page URL',()=>{
 for(const lang of languages){const q=boot({lang});const c=q.data().find(x=>x[0]==='config');assert.equal(c[1],id);assert.equal(c[2].content_language,lang);assert(!JSON.stringify(c).includes('secret'));q.listeners.click({target:new q.Element('tel:+123')});assert.equal(q.data().at(-1)[2].content_language,lang);assert.equal(q.data().at(-1)[2].send_to,id);}
});
test('QA persists, clears, works without storage, and is absent ordinarily',()=>{
 const storage=new Map();assert.equal(boot({qa:'&ga_debug=1',storage}).data()[1][2].debug_mode,true);
 assert.equal(boot({storage}).data()[1][2].debug_mode,true);
 assert(!('debug_mode' in boot({qa:'&ga_debug=0',storage}).data()[1][2]));
 assert.equal(boot({qa:'&ga_debug=1',failStorage:true}).data()[1][2].debug_mode,true);
});
test('privacy and preview guards apply before loading and during interactions',()=>{
 assert.equal(boot({blocked:true}).data().length,0);assert.equal(boot({preview:true}).data().length,0);
 const q=boot();q.window.navigator.globalPrivacyControl=true;q.listeners.click({target:new q.Element('mailto:secret@example.com')});assert.equal(q.data().length,2);
});
test('one initialization and contact errors never prevent navigation',()=>{
 const q=boot();q.exports.initializeAnalytics();assert.equal(q.data().length,2);
 q.document.documentElement.lang=languages.at(-1);q.listeners.click({target:new q.Element('https://wa.me/123')});assert.equal(q.data().at(-1)[2].content_language,languages.at(-1));
 q.window.gtag=()=>{throw Error()};assert.doesNotThrow(()=>q.listeners.click({target:new q.Element('tel:+123')}));
});
