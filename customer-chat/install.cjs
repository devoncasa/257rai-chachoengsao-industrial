/* Add the same-origin launcher after the site's existing build. Idempotent. */
const fs=require('node:fs'),path=require('node:path');
const output=path.resolve(process.argv[2]||'dist');
const source=__dirname;
const configPath=path.resolve(process.argv[3]||path.join(source,'site.json'));
if(!fs.existsSync(output)||!fs.statSync(output).isDirectory())throw new Error('Published output directory is missing: '+output);
const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
if(!config.siteId||!config.brand||!Array.isArray(config.locales)||!config.locales.length)throw new Error('Chat config needs siteId, brand and locales');
if(!config.whatsappUrl&&!config.phoneUrl&&!config.contactUrl&&!config.contactUrls&&!config.lineUrl&&!config.fastworkUrl)throw new Error('Chat config needs a verified customer contact destination');
for(const key of ['whatsappUrl','phoneUrl','contactUrl','lineUrl','fastworkUrl'])if(config[key]&&!/^(https?:\/\/|tel:|mailto:|\/|#)/.test(config[key]))throw new Error('Invalid contact URL: '+key);
const destination=path.join(output,'_customer-chat');fs.mkdirSync(destination,{recursive:true});
for(const [from,to]of [['launcher.js','launcher.20261118a.js'],['launcher.css','launcher.20261118a.css']])fs.copyFileSync(path.join(source,from),path.join(destination,to));
const attribute=JSON.stringify(config).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const tag='<script defer src="/_customer-chat/launcher.20261118a.js" data-customer-chat="20261118a" data-chat-config="'+attribute+'"></script>';
let count=0;
function visit(directory){for(const entry of fs.readdirSync(directory,{withFileTypes:true})){const filename=path.join(directory,entry.name);const relative=path.relative(output,filename).split(path.sep).join('/');if(entry.isDirectory()){if(!/^_customer-chat$|^\.git$|^node_modules$/.test(entry.name))visit(filename);continue;}if(!entry.isFile()||!entry.name.endsWith('.html')||/(^|\/)(?:admin|owner)(\/|$)/.test(relative)||/^__(?:forms|.*auth).*\.html$/.test(entry.name))continue;let html=fs.readFileSync(filename,'utf8');if(!/<\/body\s*>/i.test(html))continue;html=html.replace(/<script\b[^>]*\bdata-customer-chat="[^"]*"[^>]*>\s*<\/script>\s*/gi,'');html=html.replace(/<\/body\s*>/i,tag+'\n</body>');fs.writeFileSync(filename,html);count++;}}
visit(output);if(!count)throw new Error('No customer HTML pages were found for the chat launcher');
console.log('Customer chat launcher installed for '+config.siteId+': '+count+' HTML pages; contact mode; '+config.locales.length+' languages.');
