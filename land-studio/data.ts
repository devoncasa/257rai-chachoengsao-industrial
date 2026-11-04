export type Lang='th'|'en'|'zh'|'ja';
export type Part={x:number;y:number;w:number;d:number;h:number;kind:'building'|'glass'|'water'|'field'|'future'};
export const boundary:[number,number][]=[[50,159],[280,152],[325,154],[370,166],[390,178],[370,147],[367,123],[373,106],[402,100],[426,90],[452,77],[447,27],[646,1],[646,85],[479,116],[477,181],[440,190],[409,190],[421,298],[430,375],[361,400],[346,355],[219,362],[179,353],[156,415],[141,448],[120,448],[104,410],[22,423]];
export const uncertainEdge=12;
export const roads:[number,number][][]=[[[392,380],[390,340],[235,340],[235,185],[395,185],[398,130],[500,80],[625,60]],[[70,255],[390,255]],[[70,180],[235,180]],[[70,335],[235,335]]];
export const palette={building:'#d8c5a2',glass:'#aacbd1',water:'#76b5c0',field:'#91ae75',future:'#e9d6a1'};
const part=(x:number,y:number,w:number,d:number,h:number,kind:Part['kind']='building'):Part=>({x,y,w,d,h,kind});
export const scenarios=[
 {id:'agri',shares:[20,14,44,14,8],parts:[part(130,211,100,42,3,'glass'),part(130,291,100,42,3,'glass'),part(310,210,117,46,5),part(310,296,100,46,4),part(82,374,55,45,.2,'field'),part(160,337,58,18,.2,'water'),part(550,64,110,40,.2,'field')]},
 {id:'logistics',shares:[32,30,18,12,8],parts:[part(140,211,112,54,6),part(140,299,112,54,6),part(314,211,118,54,6),part(314,299,118,54,6),part(80,374,50,45,.2,'water'),part(550,64,110,40,.2,'field')]},
 {id:'food',shares:[28,22,22,18,10],parts:[part(135,210,100,52,5),part(135,295,100,50,5),part(314,205,112,43,5),part(314,293,112,46,4),part(80,370,55,47,.2,'water'),part(167,337,52,17,.2,'water'),part(550,64,110,40,.2,'field')]},
 {id:'services',shares:[18,24,32,14,12],parts:[part(367,311,58,40,4),part(294,316,63,35,3),part(304,209,104,40,3),part(138,209,105,42,.2,'field'),part(125,295,67,48,3),part(188,296,26,45,2),part(80,373,54,48,.2,'water'),part(550,64,110,40,.2,'field')]},
 {id:'learning',shares:[14,14,44,18,10],parts:[part(135,212,96,44,2,'glass'),part(315,211,100,42,3),part(300,299,80,40,3),part(130,298,100,43,.2,'field'),part(80,373,54,48,.2,'water'),part(182,338,55,18,.2,'field'),part(550,64,110,40,.2,'field')]},
 {id:'phased',shares:[18,18,24,14,26],parts:[part(314,300,113,48,5),part(138,211,110,52,5,'future'),part(138,298,110,52,5,'future'),part(314,211,113,52,5,'future'),part(80,373,54,48,.2,'water'),part(550,64,110,40,.5,'future')]}
] as const;
export type Scenario=typeof scenarios[number];
export function inside(x:number,y:number){let yes=false;for(let i=0,j=boundary.length-1;i<boundary.length;j=i++){const a=boundary[i],b=boundary[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
export const references=[{label:'DPT · Land-use verification',url:'https://townsquare.dpt.go.th/lup'},{label:'DOH · Highway access permit',url:'https://doh.go.th/content/download/85009'},{label:'PEA · Electricity services',url:'https://www.pea.co.th/our-services/download'}];
