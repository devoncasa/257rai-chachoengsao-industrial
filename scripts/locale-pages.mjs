import {readFile,writeFile,mkdir} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
for (const lang of ['en','zh','ja']) {await mkdir(`dist/${lang}`,{recursive:true});await writeFile(`dist/${lang}/index.html`,html.replace('lang="th"',`lang="${lang}"`));}
