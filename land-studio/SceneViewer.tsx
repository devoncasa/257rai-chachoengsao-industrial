import React,{forwardRef,useEffect,useImperativeHandle,useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {boundary,roads,inside,palette,type Scenario} from './data';
export type SceneHandle={turn:(direction:number)=>void;zoom:(direction:number)=>void;top:()=>void;reset:()=>void;rotate:(enabled:boolean)=>void};
type Props={scenario:Scenario;label:string;onReady:()=>void;onError:()=>void};
const world=(x:number,y:number,h=0)=>new THREE.Vector3((x-330)/5.2,h,(y-225)/5.2);
function dispose(group:THREE.Object3D){const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>();group.traverse(o=>{const m=o as THREE.Mesh;if(m.geometry)geometries.add(m.geometry);if(m.material)(Array.isArray(m.material)?m.material:[m.material]).forEach(x=>materials.add(x));});geometries.forEach(x=>x.dispose());materials.forEach(x=>x.dispose());}
const SceneViewer=forwardRef<SceneHandle,Props>(function SceneViewer({scenario,label,onReady,onError},ref){
 const mount=useRef<HTMLDivElement>(null),api=useRef<(SceneHandle&{setScenario:(s:Scenario)=>void})|null>(null),latest=useRef({scenario,onReady,onError});latest.current={scenario,onReady,onError};
 useImperativeHandle(ref,()=>({turn:n=>api.current?.turn(n),zoom:n=>api.current?.zoom(n),top:()=>api.current?.top(),reset:()=>api.current?.reset(),rotate:n=>api.current?.rotate(n)}),[]);
 useEffect(()=>{
  const host=mount.current;if(!host)return;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});}catch{latest.current.onError();return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor('#edf0e4');
  const canvas=renderer.domElement;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',label);canvas.tabIndex=0;canvas.dataset.scene='ready';host.appendChild(canvas);
  const scene=new THREE.Scene();scene.fog=new THREE.Fog('#edf0e4',200,360);
  const camera=new THREE.PerspectiveCamera(38,1,.1,600);camera.position.set(91,102,123);
  const controls=new OrbitControls(camera,canvas);controls.target.set(0,0,0);controls.enableDamping=true;controls.dampingFactor=.09;controls.minDistance=55;controls.maxDistance=240;controls.maxPolarAngle=Math.PI*.47;controls.autoRotateSpeed=.7;controls.enablePan=true;controls.update();
  scene.add(new THREE.HemisphereLight('#fffbed','#a7b591',2.5));const sun=new THREE.DirectionalLight('#fff2d6',3.1);sun.position.set(-45,100,65);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-100;sun.shadow.camera.right=100;sun.shadow.camera.top=90;sun.shadow.camera.bottom=-90;sun.shadow.bias=-.001;sun.shadow.normalBias=.3;scene.add(sun);
  const base=new THREE.Group();scene.add(base);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(700,700),new THREE.MeshStandardMaterial({color:'#edf0e4',roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-1.65;floor.receiveShadow=true;base.add(floor);
  const shape=new THREE.Shape();boundary.forEach((p,i)=>{const v=world(p[0],p[1]);if(i===0)shape.moveTo(v.x,-v.z);else shape.lineTo(v.x,-v.z);});shape.closePath();
  const slab=new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:1.4,bevelEnabled:false}),new THREE.MeshStandardMaterial({color:'#c4d0ad',roughness:.94}));slab.rotation.x=-Math.PI/2;slab.position.y=-1.4;slab.receiveShadow=true;base.add(slab);
  const outline=boundary.map(p=>world(p[0],p[1],.12));outline.push(outline[0].clone());const border=new THREE.Line(new THREE.BufferGeometry().setFromPoints(outline),new THREE.LineBasicMaterial({color:'#345a40'}));base.add(border);
  const uncertain=new THREE.Line(new THREE.BufferGeometry().setFromPoints([world(646,1,.2),world(646,85,.2)]),new THREE.LineDashedMaterial({color:'#a26623',dashSize:1.2,gapSize:.8}));uncertain.computeLineDistances();base.add(uncertain);
  const box=(group:THREE.Group,x:number,y:number,w:number,d:number,h:number,color:string,bottom=0,opacity=1)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w/5.2,h,d/5.2),new THREE.MeshStandardMaterial({color,roughness:.8,transparent:opacity<1,opacity}));m.position.copy(world(x,y,bottom+h/2));m.castShadow=h>1;m.receiveShadow=true;group.add(m);return m;};
  const road=(group:THREE.Group,points:number[][],width:number,color:string)=>{for(let i=1;i<points.length;i++){const a=world(points[i-1][0],points[i-1][1]),b=world(points[i][0],points[i][1]);const delta=b.clone().sub(a);const mesh=new THREE.Mesh(new THREE.BoxGeometry(width,.09,delta.length()+width*.3),new THREE.MeshStandardMaterial({color,roughness:1}));mesh.position.copy(a.clone().add(b).multiplyScalar(.5));mesh.position.y=.06;mesh.rotation.y=Math.atan2(delta.x,delta.z);mesh.receiveShadow=true;group.add(mesh);}};
  road(base,[[285,435],[665,302]],3,'#7d8b7b');
  const trees=new THREE.Group();base.add(trees);let treePoints:[number,number][]=[];for(let x=45;x<640;x+=21)for(let y=36;y<432;y+=21){if(!inside(x,y))continue;const nearEdge=boundary.some(p=>Math.hypot(p[0]-x,p[1]-y)<22);if(nearEdge)treePoints.push([x,y]);}
  const crownG=new THREE.IcosahedronGeometry(1.05,1),trunkG=new THREE.CylinderGeometry(.13,.19,1.4,5);const crowns=new THREE.InstancedMesh(crownG,new THREE.MeshStandardMaterial({color:'#6d8a56',roughness:1}),treePoints.length);const trunks=new THREE.InstancedMesh(trunkG,new THREE.MeshStandardMaterial({color:'#8c795d'}),treePoints.length);const matrix=new THREE.Matrix4();treePoints.forEach((p,i)=>{matrix.makeTranslation(...world(p[0],p[1],2.1).toArray() as [number,number,number]);crowns.setMatrixAt(i,matrix);matrix.makeTranslation(...world(p[0],p[1],.7).toArray() as [number,number,number]);trunks.setMatrixAt(i,matrix);});crowns.castShadow=true;trees.add(crowns,trunks);
  let layout=new THREE.Group();scene.add(layout);let dirty=true,visible=true;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const setScenario=(s:Scenario)=>{scene.remove(layout);dispose(layout);layout=new THREE.Group();layout.name=s.id;scene.add(layout);roads.forEach(r=>road(layout,r,1.8,'#b6b9aa'));s.parts.forEach(p=>{
   if(p.kind==='field'){box(layout,p.x,p.y,p.w,p.d,.09,palette.field);for(let row=0;row<6;row++)box(layout,p.x,p.y-p.d/2+3+row*(p.d-6)/5,p.w-4,1.4,.13,'#6c9153');return;}
   if(p.kind==='water'){box(layout,p.x,p.y,p.w+5,p.d+5,.12,'#b8c4a6');box(layout,p.x,p.y,p.w,p.d,.14,palette.water,.13);return;}
   const future=p.kind==='future';box(layout,p.x,p.y,p.w+4,p.d+4,.1,'#c5c7b9');const body=box(layout,p.x,p.y,p.w,p.d,p.h,future?'#e1cf9c':p.kind==='glass'?'#accbd0':'#d8d2bd',0,future?.48:1);
   if(future){const edges=new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry),new THREE.LineDashedMaterial({color:'#9c7c3e',dashSize:1,gapSize:.45}));edges.position.copy(body.position);edges.computeLineDistances();layout.add(edges);}
   const roofColor=future?'#dfcc9c':p.kind==='glass'?'#b8d7d6':'#eee7d6';box(layout,p.x,p.y,p.w+1.4,p.d+1.4,.28,roofColor,p.h,future?.5:1);
   const count=Math.max(2,Math.round(p.w/17));for(let j=1;j<count;j++)box(layout,p.x-p.w/2+p.w*j/count,p.y,.65,p.d,.04,p.kind==='glass'?'#f4f7e9':'#c9c2b0',p.h+.29,future?.5:1);
   if(!future&&p.kind!=='glass'){for(let j=0;j<3;j++)box(layout,p.x-p.w*.3+j*p.w*.3,p.y+p.d/2+.1,p.w*.16,.3,p.h*.28,'#778c8a',p.h*.45);}
  });canvas.dataset.scenario=s.id;dirty=true;};
  const reset=()=>{camera.position.set(91,102,123);controls.target.set(0,0,0);controls.update();dirty=true;};
  const turn=(n:number)=>{const v=camera.position.clone().sub(controls.target);v.applyAxisAngle(new THREE.Vector3(0,1,0),n*Math.PI/8);camera.position.copy(controls.target).add(v);controls.update();dirty=true;};
  api.current={setScenario,turn,zoom:n=>{const v=camera.position.clone().sub(controls.target);v.multiplyScalar(n>0?.84:1.19);camera.position.copy(controls.target).add(v);controls.update();dirty=true;},top:()=>{camera.position.set(0,155,.1);controls.target.set(0,0,0);controls.update();dirty=true;},reset,rotate:enabled=>{controls.autoRotate=enabled&&!reduced.matches;dirty=true;}};
  const key=(e:KeyboardEvent)=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();turn(e.key==='ArrowLeft'?-1:1);}else if(e.key==='+'||e.key==='='){e.preventDefault();api.current?.zoom(1);}else if(e.key==='-'){e.preventDefault();api.current?.zoom(-1);}else if(e.key==='Home'){e.preventDefault();reset();}};canvas.addEventListener('keydown',key);
  controls.addEventListener('change',()=>{dirty=true;});
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();dirty=true;};const observer=new ResizeObserver(resize);observer.observe(host);resize();
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;dirty=true;});intersection.observe(host);const motion=()=>{if(reduced.matches)controls.autoRotate=false;};reduced.addEventListener('change',motion);
  const contextLost=(e:Event)=>{e.preventDefault();latest.current.onError();};canvas.addEventListener('webglcontextlost',contextLost);
  setScenario(latest.current.scenario);const clock=new THREE.Clock();renderer.setAnimationLoop(()=>{const delta=Math.min(clock.getDelta(),.05);if(!visible||document.hidden)return;const changed=controls.update(delta);if(dirty||changed||controls.autoRotate){renderer.render(scene,camera);canvas.dataset.view=`${Math.round(camera.position.x)},${Math.round(camera.position.y)},${Math.round(camera.position.z)}`;dirty=false;}});latest.current.onReady();
  return()=>{api.current=null;renderer.setAnimationLoop(null);observer.disconnect();intersection.disconnect();reduced.removeEventListener('change',motion);canvas.removeEventListener('keydown',key);canvas.removeEventListener('webglcontextlost',contextLost);controls.dispose();dispose(scene);renderer.dispose();renderer.forceContextLoss();canvas.remove();};
 },[]);
 useEffect(()=>{api.current?.setScenario(scenario);},[scenario]);
 useEffect(()=>{mount.current?.querySelector('canvas')?.setAttribute('aria-label',label);},[label]);
 return <div className="ls-canvas" ref={mount}/>;
});export default SceneViewer;
