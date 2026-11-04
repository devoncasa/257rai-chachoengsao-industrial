import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {buildSync} from 'esbuild';
const origin='https://www.siamplot.com';
const locales={
 th:{path:'/',title:'SiamPlot · ที่ดิน 257 ไร่ ศรีมหาโพธิ ปราจีนบุรี',description:'ที่ดินขายทั้งแปลง 257 ไร่ ในศรีมหาโพธิ ปราจีนบุรี พร้อมแนวคิดพัฒนา 3D ข้อมูลประกอบการพิจารณา และช่องทางติดต่อผู้เสนอขาย'},
 en:{path:'/en/',title:'SiamPlot · 257-Rai Land in Si Maha Phot, Prachinburi',description:'Explore a 257-rai parcel offered as a whole in Si Maha Phot, Prachinburi. Compare six 3D development concepts, review due-diligence questions and contact the seller.'},
 zh:{path:'/zh/',title:'SiamPlot · 巴真府是玛哈坡257莱土地',description:'了解泰国巴真府是玛哈坡整块出售的257莱土地，比较六种可旋转3D开发构想，查看尽职调查要点并联系卖方。面积、用途及交易条件须进一步核实。'},
 ja:{path:'/ja/',title:'SiamPlot · プラチンブリ県シーマハーポートの257ライ土地',description:'タイ・プラチンブリ県の面積257ライの土地を一括売却。回転できる6つの3D開発構想と調査項目を比較し、売主に詳細をお問い合わせいただけます。'}
};
const bundled=buildSync({stdin:{contents:"import React from 'react';import {renderToString} from 'react-dom/server';import App from './App';export const render=(lang)=>renderToString(React.createElement(App,{initialLang:lang}));",resolveDir:process.cwd(),loader:'tsx'},bundle:true,platform:'node',format:'cjs',packages:'external',loader:{'.css':'empty'},write:false}).outputFiles[0].text;
const mod={exports:{}};new Function('require','module','exports',bundled)(createRequire(import.meta.url),mod,mod.exports);
const template=await readFile('dist/index.html','utf8');
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const preview=process.env.CONTEXT&&process.env.CONTEXT!=='production';
const alternates=Object.entries(locales).map(([l,p])=>`<link rel="alternate" hreflang="${l}" href="${origin+p.path}"/>`).join('')+`<link rel="alternate" hreflang="x-default" href="${origin}/"/>`;
for(const [lang,page] of Object.entries(locales)){
 const canonical=origin+page.path;
 const schema={'@context':'https://schema.org','@graph':[{'@type':'WebSite','@id':origin+'/#website',url:origin+'/',name:'SiamPlot',inLanguage:Object.keys(locales)},{'@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:page.title,description:page.description,inLanguage:lang,isPartOf:{'@id':origin+'/#website'}}]};
 const head=`<link rel="canonical" href="${canonical}"/>${alternates}<meta property="og:type" content="website"/><meta property="og:site_name" content="SiamPlot"/><meta property="og:title" content="${escape(page.title)}"/><meta property="og:description" content="${escape(page.description)}"/><meta property="og:url" content="${canonical}"/><meta property="og:image" content="${origin}/media/overview-1600.webp"/><meta property="og:image:alt" content="${lang==='th'?'ภาพแนวคิดประกอบ ไม่ใช่ภาพสถานที่จริง':'Concept illustration, not a photograph of the property'}"/><meta name="twitter:card" content="summary_large_image"/><script type="application/ld+json">${JSON.stringify(schema).replaceAll('<','\\u003c')}</script>`;
 const html=template.replace('lang="th"',`lang="${lang}"`).replace(/<title>.*?<\/title>/,`<title>${escape(page.title)}</title>`).replace(/<meta name="description" content="[^"]*"\/>/,`<meta name="description" content="${escape(page.description)}"/>`).replace(/<meta name="robots" content="[^"]*"\/>/,`<meta name="robots" content="${preview?'noindex,nofollow':'index,follow'}"/>`).replace('<!--release-head-->',head).replace('<div id="root"></div>',`<div id="root">${mod.exports.render(lang)}</div>`);
 const directory=lang==='th'?'dist':`dist/${lang}`;await mkdir(directory,{recursive:true});await writeFile(`${directory}/index.html`,html);
}
await writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(locales).map(p=>`<url><loc>${origin+p.path}</loc></url>`).join('')}</urlset>`);
console.log('Rendered four localized HTML pages, canonical/hreflang metadata, robots and sitemap.');
