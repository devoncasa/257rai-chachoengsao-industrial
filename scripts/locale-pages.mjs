import {buyerAnswers} from './buyer-answers.mjs';
import {writeInvestorGuides} from './investor-guides.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {buildSync} from 'esbuild';
const origin='https://www.siamplot.com';
const locales={"th": {"path": "/", "title": "ขายที่ดิน 257 ไร่ ราชสาส์น ฉะเชิงเทรา | SiamPlot", "description": "เสนอขายที่ดินทั้งแปลง 257 ไร่ ราชสาส์น ฉะเชิงเทรา พร้อมข้อมูลทำเล ผังแปลง และแนวทางลงทุนใน EEC สอบถามราคารวมและนัดชมพื้นที่ได้"}, "en": {"path": "/en/", "title": "257 Rai Land for Sale in Chachoengsao | SiamPlot", "description": "Explore a 257-rai land listing in Ratchasan, Chachoengsao. View the original plan and site references, ask for the whole-parcel price and arrange a visit."}, "zh": {"path": "/zh/", "title": "泰国北柳府257莱土地整宗出售 | SiamPlot", "description": "了解泰国北柳府Ratchasan县257莱土地，查看原始示意图及地块参考图片，咨询整宗价格和交易条件，并预约实地看地。不分割出售。"}, "ja": {"path": "/ja/", "title": "タイ・チャチューンサオの土地257ライ一括売却 | SiamPlot", "description": "タイ・チャチューンサオ県ラーチャサーン郡の土地257ライ。元の概略図と現地参考画像を確認し、一括価格・取引条件のお問い合わせや現地見学の相談ができます。"}};
const bundled=buildSync({stdin:{contents:"import React from 'react';import {renderToString} from 'react-dom/server';import App from './App';export const render=(lang)=>renderToString(React.createElement(App,{initialLang:lang}));",resolveDir:process.cwd(),loader:'tsx'},bundle:true,platform:'node',format:'cjs',packages:'external',loader:{'.css':'empty'},write:false}).outputFiles[0].text;
const mod={exports:{}};new Function('require','module','exports',bundled)(createRequire(import.meta.url),mod,mod.exports);
let template=await readFile('dist/index.html','utf8');
// One small stylesheet (~12 KB gzip) inlined to remove the measured render-blocking request.
for(const match of [...template.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)]){
 const css=await readFile('dist'+match[1],'utf8');
 template=template.replace(match[0],`<style>${css}</style>`);
}
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const preview=process.env.CONTEXT&&process.env.CONTEXT!=='production';
const alternates=Object.entries(locales).map(([l,p])=>`<link rel="alternate" hreflang="${l}" href="${origin+p.path}"/>`).join('')+`<link rel="alternate" hreflang="x-default" href="${origin}/"/>`;
for(const [lang,page] of Object.entries(locales)){
 const canonical=origin+page.path;
 const schema={'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'SiamPlot',inLanguage:Object.keys(locales)},{'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:page.title,description:page.description,inLanguage:lang,isPartOf:{'@id':origin+'/#website'}}]};
 const head=`<link rel="canonical" href="${canonical}"/>${alternates}<meta property="og:locale" content="${({th:'th_TH',en:'en_US',zh:'zh_CN',ja:'ja_JP'})[lang]}"/><meta property="og:type" content="website"/><meta property="og:site_name" content="SiamPlot"/><meta property="og:title" content="${escape(page.title)}"/><meta property="og:description" content="${escape(page.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${origin}/media/land-source-646.webp"/><meta property="og:image:alt" content="${({th:'ผังแปลงเดิมสำหรับอ้างอิงเบื้องต้น ยังไม่ได้รับการยืนยันด้วยการสำรวจ',en:'Original land sketch for reference; not a certified survey',zh:'原始地块示意图，仅供参考，并非经认证的测量图',ja:'参考用の原図です。認証された測量図ではありません。'})[lang]}"/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${escape(page.title)}"/><meta name="twitter:description" content="${escape(page.description)}"/><meta name="twitter:image" content="${origin}/media/land-source-646.webp"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
 const answers=buyerAnswers[lang];
 const faq=`<section class="section buyer-answers" aria-labelledby="buyer-answers-title"><h2 id="buyer-answers-title">${answers.title}</h2>${answers.items.map(([q,a])=>`<details class="content-block"><summary><h3>${q}</h3><span aria-hidden="true">＋</span></summary><div class="content-block-body"><p>${a}</p></div></details>`).join('')}</section>`;
 const rendered=mod.exports.render(lang).replace('</main>',faq+'</main>');
 const html=template.replace('lang="th"',`lang="${lang}"`).replace(/<title>.*?<\/title>/,`<title>${escape(page.title)}</title>`).replace(/<meta name="description" content="[^"]*"\/>/,`<meta name="description" content="${escape(page.description)}"/>`).replace(/<meta name="robots" content="[^"]*"\/>/,`<meta name="robots" content="${preview?'noindex,follow':'index,follow,max-image-preview:large'}"/>`).replace('<!--release-head-->',head).replace('<div id="root"></div>',`<div id="root">${rendered}</div>`);
 const directory=lang==='th'?'dist':`dist/${lang}`;await mkdir(directory,{recursive:true});await writeFile(`${directory}/index.html`,html);
}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
const investorPaths=await writeInvestorGuides({origin,preview,mkdir,writeFile});
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...Object.values(locales).map(p=>p.path),...investorPaths].map(path=>`<url><loc>${origin+path}</loc></url>`).join('')}</urlset>`);
console.log('Rendered four localized HTML pages, canonical/hreflang metadata, robots and sitemap.');
