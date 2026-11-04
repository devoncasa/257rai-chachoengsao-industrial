import React,{useEffect,useState} from 'react';

// Decorative terrain-inspired curves. Randomness changes only the atmosphere,
// never the layout, parcel geometry, content, or customer controls.
export default function ContourAtmosphere(){
 const [variant,setVariant]=useState(0);
 useEffect(()=>{setVariant(1+Math.floor(Math.random()*9999));},[]);
 const angle=(variant%47)-23,x=20+(variant%61),y=15+(variant%67);
 return <div className="contour-atmosphere" aria-hidden="true" data-contour-variant={variant} style={{'--contour-angle':`${angle}deg`,'--contour-x':`${x}%`,'--contour-y':`${y}%`} as React.CSSProperties}>
  <svg viewBox="0 0 1200 900" fill="none" preserveAspectRatio="xMidYMid slice" focusable="false">
   <defs><radialGradient id="terrain-fade"><stop stopColor="#9bbca7" stopOpacity=".65"/><stop offset=".55" stopColor="#a8c9b5" stopOpacity=".32"/><stop offset="1" stopColor="#b6d2bf" stopOpacity="0"/></radialGradient><linearGradient id="terrain-line" x1="100" y1="0" x2="1000" y2="800" gradientUnits="userSpaceOnUse"><stop stopColor="#91b6a0" stopOpacity="0"/><stop offset=".4" stopColor="#91b6a0" stopOpacity=".55"/><stop offset=".75" stopColor="#a1c5af" stopOpacity=".3"/><stop offset="1" stopColor="#a1c5af" stopOpacity="0"/></linearGradient></defs>
   <ellipse cx="780" cy="360" rx="450" ry="320" fill="url(#terrain-fade)" opacity=".4"/>
   <g stroke="url(#terrain-line)" strokeWidth="1.1">{Array.from({length:12},(_,i)=><path key={i} d={`M ${-180+i*20} ${240+i*24} C ${180+i*18} ${-70+i*28}, ${430+i*7} ${590+i*14}, ${720+i*13} ${290+i*23} S ${1200+i*17} ${220+i*26}, ${1450+i*12} ${520+i*18}`}/>)}</g>
  </svg>
 </div>;
}
