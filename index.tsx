// HTML is rendered at build time. Enhance native controls without hydrating
// the entire multilingual content tree in each visitor's browser.
import './analytics';
import './fonts.css';
import './styles.css';
import './readability.css';
import './atlas.css';
import './location-advantages.css';
import './land-studio/studio.css';

const toggle=document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation=document.getElementById('mobile-navigation');
const setMenu=(open:boolean)=>{
 if(!toggle||!navigation)return;
 navigation.hidden=!open;
 toggle.setAttribute('aria-expanded',String(open));
 toggle.textContent=(open?toggle.dataset.close:toggle.dataset.open)||'';
};
toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
navigation?.addEventListener('click',event=>{if((event.target as Element).closest('a'))setMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus();}});
const header=document.querySelector('header');
if(header){const update=()=>document.documentElement.style.setProperty('--site-header-height',`${header.getBoundingClientRect().height}px`);new ResizeObserver(update).observe(header);update();}
document.querySelectorAll<HTMLAnchorElement>('.atlas-language a').forEach(a=>a.addEventListener('click',()=>{a.hash=location.hash;}));
const contour=document.querySelector<HTMLElement>('.contour-atmosphere');
if(contour){const v=1+Math.floor(Math.random()*9999);contour.dataset.contourVariant=String(v);contour.style.setProperty('--contour-angle',`${v%47-23}deg`);contour.style.setProperty('--contour-x',`${20+v%61}%`);contour.style.setProperty('--contour-y',`${15+v%67}%`);}
const background=()=>{
 const element=document.querySelector<HTMLElement>('.ambient-background');if(!element)return;
 const photographs=['overview','contact','details','ecosystem','infrastructure','location','potential','review'];
 let previous='';try{previous=sessionStorage.getItem('siamplot-background')||'';}catch{}
 const pool=photographs.filter(n=>n!==previous),name=pool[Math.floor(Math.random()*pool.length)];
 try{sessionStorage.setItem('siamplot-background',name);}catch{}
 const img=new Image();img.width=1672;img.height=940;img.alt='';img.decoding='async';img.fetchPriority='low';
 img.sizes='112vw';img.srcset=[640,960,1600].map(w=>`/media/${name}-${w}.webp ${w}w`).join(', ');img.src=`/media/${name}-960.webp`;
 img.onload=()=>element.classList.add('is-loaded');element.dataset.background=name;element.append(img);
};
const schedule=()=>{if('requestIdleCallback' in window)window.requestIdleCallback(background,{timeout:1200});else setTimeout(background,150);};
if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule,{once:true});
