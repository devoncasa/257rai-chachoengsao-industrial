import React,{useEffect,useState} from 'react';
const photographs=['overview','contact','details','ecosystem','infrastructure','location','potential','review'];
export default function AmbientBackground(){
 const [name,setName]=useState<string|null>(null),[loaded,setLoaded]=useState(false);
 useEffect(()=>{
  let idle:number|undefined,timer:number|undefined,cancelled=false;
  const choose=()=>{if(cancelled)return;let previous='';try{previous=sessionStorage.getItem('siamplot-background')||'';}catch{}const pool=photographs.filter(n=>n!==previous),chosen=pool[Math.floor(Math.random()*pool.length)];try{sessionStorage.setItem('siamplot-background',chosen);}catch{}setName(chosen);};
  const schedule=()=>{if(typeof window.requestIdleCallback==='function')idle=window.requestIdleCallback(choose,{timeout:1200});else timer=window.setTimeout(choose,150);};
  if(document.readyState==='complete')schedule();else window.addEventListener('load',schedule,{once:true});
  return()=>{cancelled=true;window.removeEventListener('load',schedule);if(idle!==undefined)window.cancelIdleCallback(idle);if(timer!==undefined)window.clearTimeout(timer);};
 },[]);
 return <div className={`ambient-background${loaded?' is-loaded':''}`} aria-hidden="true" data-background={name||'pending'}>{name&&<img src={`/media/${name}-1600.webp`} srcSet={`/media/${name}-640.webp 640w, /media/${name}-960.webp 960w, /media/${name}-1600.webp 1600w`} sizes="112vw" width="1672" height="940" alt="" loading="lazy" decoding="async" fetchPriority="low" onLoad={()=>setLoaded(true)}/>}</div>;
}
