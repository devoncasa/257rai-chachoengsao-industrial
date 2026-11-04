import React,{useEffect,useRef,useState} from 'react';
const photographs=['overview','contact','details','ecosystem','infrastructure','location','potential','review'];
export default function AmbientBackground(){
 const [name,setName]=useState<string|null>(null),[loaded,setLoaded]=useState(false);
 const image=useRef<HTMLImageElement>(null);
 useEffect(()=>{
  let idle:number|undefined,timer:number|undefined,cancelled=false;
  const choose=()=>{if(cancelled)return;let previous='';try{previous=sessionStorage.getItem('siamplot-background')||'';}catch{}const pool=photographs.filter(n=>n!==previous),chosen=pool[Math.floor(Math.random()*pool.length)];try{sessionStorage.setItem('siamplot-background',chosen);}catch{}setName(chosen);};
  const schedule=()=>{if(typeof window.requestIdleCallback==='function')idle=window.requestIdleCallback(choose,{timeout:1200});else timer=window.setTimeout(choose,150);};
  if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule,{once:true});
  return()=>{cancelled=true;window.removeEventListener('load',schedule);if(idle!==undefined)window.cancelIdleCallback(idle);if(timer!==undefined)window.clearTimeout(timer);};
 },[]);
 useEffect(()=>{
  if(!name)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
  const paint=()=>{frame=0;const node=image.current;if(!node)return;if(reduced.matches){node.style.transform='none';return;}const distance=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),progress=Math.max(0,Math.min(1,window.scrollY/distance));node.style.transform=`translate3d(0,${(0.5-progress)*4}vh,0) scale(${1.14-progress*.1})`;};
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});reduced.addEventListener('change',schedule);paint();
  return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule);if(frame)cancelAnimationFrame(frame);};
 },[name]);
 return <div className={`ambient-background${loaded?' is-loaded':''}`} aria-hidden="true" data-background={name||'pending'}>{name&&<img ref={image} src={`/media/${name}-1600.webp`} srcSet={`/media/${name}-640.webp 640w, /media/${name}-960.webp 960w, /media/${name}-1600.webp 1600w`} sizes="112vw" width="1672" height="940" alt="" loading="lazy" decoding="async" fetchPriority="low" onLoad={()=>setLoaded(true)}/>}</div>;
}
