import type {Lang} from './data';
type Concept={title:string;tag:string;summary:string;movement:string;checks:string[];next:string};
type Copy={nav:string;eyebrow:string;title:string;intro:string;open:string;loading:string;rotate:string;pause:string;left:string;right:string;zoomIn:string;zoomOut:string;top:string;reset:string;expand:string;exit:string;fallback:string;retry:string;model:string;hint:string;concept:string;technical:string;budget:string;next:string;budgetNote:string;categories:string[];legend:string[];source:string;assumption:string;facts:string[];factsTitle:string;baseline:string;documents:string;documentList:string[];sources:string;date:string;contact:string;boundary:string;road:string;tail:string;active:string;fullscreenError:string;concepts:Concept[]};
export const copy:Record<Lang,Copy>={
th:{
  "nav": "6 แนวทางพัฒนาที่ดิน",
  "eyebrow": "SIAMPLOT · แนวทางการใช้ประโยชน์ที่ดิน",
  "title": "เปรียบเทียบ 6 แนวทาง\nพัฒนาที่ดินแปลงเดียวกัน",
  "intro": "ภาพจำลองสามมิติทั้งหกแบบจัดทำจากผังแปลงเดิม เพื่อช่วยเปรียบเทียบการจัดพื้นที่และเส้นทางสัญจร พร้อมสรุปประเด็นที่ควรศึกษาเพิ่มเติมก่อนพัฒนาโครงการ",
  "open": "เปิดโมเดล 3D แบบหมุนได้",
  "loading": "กำลังเปิดโมเดล 3D…",
  "rotate": "หมุนรอบ 360°",
  "pause": "หยุดหมุน",
  "left": "หมุนซ้าย",
  "right": "หมุนขวา",
  "zoomIn": "ซูมเข้า",
  "zoomOut": "ซูมออก",
  "top": "มุมมองจากด้านบน",
  "reset": "กลับมุมเริ่มต้น",
  "expand": "ขยายมุมมอง",
  "exit": "ออกจากเต็มหน้าจอ",
  "fallback": "อุปกรณ์นี้ไม่สามารถแสดงโมเดลสามมิติได้ ท่านยังสามารถดูผังทั้งหกแบบและอ่านรายละเอียดด้านล่างได้ตามปกติ",
  "retry": "ลองเปิด 3D อีกครั้ง",
  "model": "ภาพจำลองการจัดวางอาคารและพื้นที่ใช้งาน",
  "hint": "ลากเพื่อหมุน • ใช้ปุ่ม +/− เพื่อซูม • ใช้ปุ่มลูกศรบนโมเดลได้",
  "concept": "แนวคิดการจัดพื้นที่และเส้นทางสัญจร",
  "technical": "รายละเอียดที่ควรศึกษาก่อนออกแบบ",
  "budget": "ตัวอย่างสัดส่วนการจัดสรรพื้นที่",
  "next": "ข้อมูลที่ควรเตรียมสำหรับขั้นตอนต่อไป",
  "budgetNote": "สัดส่วนรวม 100% นี้เป็นตัวอย่างสำหรับหารือการจัดพื้นที่เบื้องต้น ยังไม่ได้คำนวณจากแบบสำรวจ และไม่ใช่สัดส่วนพื้นที่ก่อสร้างที่ได้รับอนุญาต",
  "categories": [
    "พื้นที่อาคาร",
    "ลานใช้งานและถนนภายใน",
    "พื้นที่เปิดโล่งและพื้นที่เกษตร",
    "พื้นที่สำหรับระบบจัดการน้ำ",
    "พื้นที่สำรองเพื่อขยายโครงการ"
  ],
  "legend": [
    "อาคารตามแนวคิดเบื้องต้น",
    "โรงเรือนและพื้นที่เพาะปลูก",
    "พื้นที่เสนอสำหรับระบบจัดการน้ำ",
    "พื้นที่สำหรับพัฒนาในระยะถัดไป"
  ],
  "source": "ผังแปลงเดิมและขอบเขตการใช้ภาพจำลอง",
  "assumption": "ภาพผังเดิมแสดงส่วนปลายแปลงไม่ครบถ้วน จึงใช้เส้นประต่อแนวเขตในส่วนนั้นเพื่อให้เปรียบเทียบแนวคิดได้ ภาพจำลองยังไม่ได้รับการยืนยันด้วยการสำรวจ ทั้งสัดส่วนแปลง ระดับดิน ความสูงอาคาร แนวถนน และตำแหน่งทางเข้าออก จึงใช้ประกอบการหารือเบื้องต้นเท่านั้น โดยยังต้องจัดทำแบบรังวัด แบบขออนุญาต และศึกษาความเป็นไปได้เพิ่มเติม",
  "factsTitle": "ข้อมูลเบื้องต้นจากประกาศขาย",
  "facts": [
    "พื้นที่ตามประกาศ 257 ไร่ หรือ 411,200 ตร.ม. โดยยังต้องตรวจสอบกับเอกสารสิทธิ",
    "ด้านติดทางหลวงหมายเลข 304 ยาวประมาณ 120 ม. และด้านติดถนนรองประมาณ 495 ม. เป็นข้อมูลจากผู้เสนอขาย ยังไม่ได้ยืนยันด้วยการสำรวจ",
    "ประกาศเดิมระบุผังเมืองสีเขียว ซึ่งต้องตรวจสอบข้อกำหนดปัจจุบันให้ตรงกับตำแหน่งแปลงและกิจการที่ต้องการดำเนินการ"
  ],
  "baseline": "ภาพทั้งหกแบบใช้โครงร่างแปลงเดียวกันเพื่อให้เปรียบเทียบได้ โดยยังไม่ระบุทิศเหนือหรือมาตราส่วนจนกว่าจะมีข้อมูลยืนยัน",
  "documents": "เอกสารสำหรับพัฒนาแบบให้มีรายละเอียดแม่นยำขึ้น",
  "documentList": [
    "เอกสารสิทธิครบทุกหน้า พร้อมพิกัดแนวเขต ไฟล์ KML / DWG หรือข้อมูลรังวัด",
    "แผนที่ระดับพื้นที่ จุดระบายน้ำ ประวัติน้ำท่วม และผลสำรวจชั้นดิน",
    "หนังสือตรวจสอบการใช้ประโยชน์ที่ดิน เงื่อนไขทางเข้าออก และข้อมูลไฟฟ้ากับน้ำจากผู้ให้บริการ"
  ],
  "sources": "ช่องทางตรวจสอบกับหน่วยงานที่เกี่ยวข้อง",
  "date": "ตรวจช่องทางอ้างอิง 4 พฤศจิกายน 2569",
  "contact": "สอบถามแนวทางนี้กับผู้เสนอขาย",
  "boundary": "แนวเขตอ้างอิงจากผังเดิม",
  "road": "แนวทางหลวงหมายเลข 304 ตามผังเดิม",
  "tail": "แนวเขตส่วนที่ต่อเติมเพื่อแสดงภาพจำลอง",
  "active": "แนวทางที่กำลังแสดง",
  "fullscreenError": "เบราว์เซอร์นี้ไม่รองรับการแสดงเต็มหน้าจอ ท่านสามารถดูข้อมูลในมุมมองปัจจุบันได้ตามปกติ",
  "concepts": [
    {
      "title": "เกษตรสมัยใหม่และศูนย์คัดบรรจุ",
      "tag": "เชื่อมโยงการเพาะปลูกกับการเตรียมสินค้าจำหน่าย",
      "summary": "แนวคิดนี้จัดโรงเรือนและแปลงสาธิตไว้ร่วมกับอาคารคัดแยกและบรรจุ เพื่อศึกษาการดำเนินธุรกิจตั้งแต่การผลิตจนถึงการเตรียมส่งจำหน่าย ทั้งนี้ ต้องตรวจสอบข้อกำหนดและการอนุญาตของกิจการก่อนนำไปพัฒนา",
      "movement": "พื้นที่ลานกลางควรแยกเส้นทางรับผลผลิต เส้นทางส่งสินค้าที่บรรจุแล้ว และทางเข้าใช้พื้นที่ของผู้เยี่ยมชม เพื่อลดการตัดกันของกิจกรรม",
      "checks": [
        "ตรวจสอบประเภทกิจการและข้อกำหนดผังเมืองของอาคารแต่ละส่วน",
        "สำรวจแหล่งน้ำ คุณภาพน้ำ และระบบบำบัดที่เหมาะกับกระบวนการทำงาน",
        "ออกแบบจุดรับผลผลิตและห้องเย็นให้สอดคล้องกับปริมาณใช้งานจริง"
      ],
      "next": "ควรเตรียมข้อมูลชนิดผลผลิต ฤดูกาลรับซื้อ และปริมาณต่อวัน เพื่อให้ทีมออกแบบกำหนดความต้องการพื้นที่และตรวจสอบเงื่อนไขกับหน่วยงานที่เกี่ยวข้อง"
    },
    {
      "title": "คลังสินค้าและคลังควบคุมอุณหภูมิ",
      "tag": "วางแผนจากรูปแบบการขนส่งและการจัดเก็บ",
      "summary": "แนวคิดนี้จัดกลุ่มอาคารคลังร่วมกับถนนภายใน เพื่อเปรียบเทียบพื้นที่จัดเก็บกับพื้นที่ที่รถต้องใช้ในการเข้าออกและขนถ่ายสินค้า ก่อนพัฒนาต้องตรวจสอบว่าแปลงรองรับคลังสินค้าหรือห้องเย็นตามข้อกำหนดที่เกี่ยวข้องได้หรือไม่",
      "movement": "เบื้องต้นเสนอให้แยกทางเข้ารถบรรทุกออกจากรถยนต์ของพนักงานและผู้มาติดต่อ โดยตำแหน่งและสิทธิในการเชื่อมทางต้องได้รับการตรวจสอบก่อน",
      "checks": [
        "ทดสอบรัศมีวงเลี้ยวและพื้นที่เข้าจอดขนถ่ายด้วยขนาดรถที่จะใช้งานจริง",
        "สำรวจความสามารถรับน้ำหนักของดินและประเมินการทรุดตัวของพื้นคลัง",
        "ประเมินกำลังไฟฟ้า ระบบดับเพลิง และขนาดระบบทำความเย็นที่ต้องใช้"
      ],
      "next": "ควรเตรียมข้อมูลจำนวนเที่ยวรถต่อวัน ประเภทสินค้า และจำนวนช่องขนถ่ายที่ต้องการ เพื่อใช้กำหนดผังเบื้องต้น"
    },
    {
      "title": "แปรรูปอาหารและกิจการที่เกี่ยวข้อง",
      "tag": "จัดลำดับกระบวนการทำงานก่อนกำหนดอาคาร",
      "summary": "แนวคิดนี้ใช้กลุ่มอาคารขนาดกลางรองรับการแปรรูปผลผลิตเกษตรและงานสนับสนุน โดยพิจารณาพื้นที่ระบบน้ำและระยะห่างระหว่างกิจกรรมร่วมกับการวางผังอาคาร",
      "movement": "ควรแยกเส้นทางวัตถุดิบ สินค้าสำเร็จรูป ของเสีย และบุคลากร เพื่อลดการตัดกันระหว่างขั้นตอนการทำงาน",
      "checks": [
        "ระบุขั้นตอนผลิต เครื่องจักร และประเภทใบอนุญาตที่เกี่ยวข้อง",
        "ประเมินปริมาณน้ำเสีย กลิ่น เสียง และวิธีขนย้ายของเสีย",
        "ตรวจสอบความต้องการไฟฟ้า น้ำใช้ และเส้นทางเข้าถึงของรถฉุกเฉิน"
      ],
      "next": "ควรจัดทำผังกระบวนการผลิตและรายการเครื่องจักรก่อนกำหนดขนาดอาคาร โดยภาพจำลองนี้ยังไม่ได้กำหนดกำลังการผลิต"
    },
    {
      "title": "ศูนย์บริการริมทางและพื้นที่ธุรกิจ",
      "tag": "ให้ความสำคัญกับทางเข้าออกที่ปลอดภัย",
      "summary": "แนวคิดนี้ศึกษาการใช้พื้นที่ใกล้แนวทางหลวงหมายเลข 304 เป็นจุดบริการ ร้านค้า หรือสำนักงาน ร่วมกับพื้นที่ดำเนินงานด้านใน โดยยังต้องศึกษาจำนวนหน่วยให้บริการและสิทธิทางเข้าออกเพิ่มเติม",
      "movement": "ควรแยกเส้นทางรถที่แวะใช้บริการออกจากรถที่ปฏิบัติงานภายใน และจัดทางเดินของผู้ใช้บริการให้พ้นจากลานรถบรรทุก",
      "checks": [
        "หารือกรมทางหลวงเรื่องตำแหน่งทางเชื่อมและผลกระทบต่อการจราจร",
        "ประเมินกำลังไฟฟ้าและจุดเชื่อมต่อ หากมีแผนติดตั้งสถานีชาร์จรถยนต์ไฟฟ้า",
        "ตรวจสอบที่จอดรถ การเข้าถึงของผู้ใช้บริการทุกกลุ่ม และระบบน้ำเสีย"
      ],
      "next": "ควรสำรวจปริมาณจราจร ความต้องการใช้บริการ และเงื่อนไขของกรมทางหลวงก่อนออกแบบพื้นที่ด้านหน้าแปลง"
    },
    {
      "title": "แปลงสาธิตและศูนย์เรียนรู้",
      "tag": "จัดพื้นที่เปิดโล่งให้สอดคล้องกับกิจกรรม",
      "summary": "แนวคิดนี้จัดพื้นที่ทดลองเกษตร โรงเรือน อาคารเรียนรู้ และพื้นที่จัดการน้ำร่วมกัน โดยคงพื้นที่เปิดโล่งไว้เป็นส่วนสำคัญของโครงการ",
      "movement": "ควรแยกทางเดินของผู้เข้าชมออกจากทางรถบริการ พร้อมกำหนดจุดรวมพลให้ทีมออกแบบตรวจสอบความเหมาะสมเพิ่มเติม",
      "checks": [
        "ตรวจสอบประเภทการใช้อาคาร จำนวนผู้เข้าใช้ และการเข้าถึงของผู้ใช้บริการทุกกลุ่ม",
        "ประเมินปริมาณน้ำที่ต้องใช้เทียบกับน้ำที่มีในแต่ละฤดูกาล",
        "สำรวจความต้องการของผู้ใช้ก่อนกำหนดขนาดห้องและอาคาร"
      ],
      "next": "ควรเริ่มจากประเภทกิจกรรม กลุ่มผู้ใช้ และรูปแบบการดำเนินงาน เพื่อกำหนดขนาดอาคารให้เหมาะสมกับความจำเป็น"
    },
    {
      "title": "การพัฒนาโครงการเป็นระยะ",
      "tag": "วางผังให้พร้อมขยายตามการเติบโตของธุรกิจ",
      "summary": "แนวคิดนี้เริ่มจากพื้นที่ดำเนินงานระยะแรก แล้วสำรองพื้นที่ส่วนที่เหลือสำหรับการขยายในอนาคต ส่วนสีอ่อนในภาพแสดงพื้นที่ที่ยังไม่ได้ตัดสินใจพัฒนา",
      "movement": "ควรวางถนนและแนวสาธารณูปโภคหลักให้ต่อขยายได้ พร้อมรักษาทางเข้าถึงพื้นที่สำรองด้านในและส่วนปลายแปลง",
      "checks": [
        "วางแผนระดับพื้นที่และการระบายน้ำทั้งแปลงก่อนเริ่มงานระยะแรก",
        "กำหนดแนวสาธารณูปโภคและทางเข้าถึงของแต่ละระยะให้ชัดเจน",
        "ทบทวนข้อกำหนดและความต้องการใช้งานก่อนลงทุนในแต่ละระยะ"
      ],
      "next": "ควรกำหนดเงื่อนไขการลงทุนแต่ละระยะจากความต้องการใช้งานและผลตรวจสอบพื้นที่ โดยภาพจำลองนี้ยังไม่มีประมาณการผลตอบแทน"
    }
  ]
},
en:{nav:'Six land-use concepts',eyebrow:'SIAMPLOT · LAND POSSIBILITIES',title:'One parcel.\nSix possibilities.',intro:'Compare six static isometric land-use concepts based on the original sketch, with circulation ideas and checks needed before development.',open:'Open the interactive 3D model',loading:'Opening 3D model…',rotate:'Rotate 360°',pause:'Pause rotation',left:'Rotate left',right:'Rotate right',zoomIn:'Zoom in',zoomOut:'Zoom out',top:'Top view',reset:'Reset view',expand:'Expand view',exit:'Exit fullscreen',fallback:'WebGL 2 could not start on this device. All six schematic plans and technical notes remain available below.',retry:'Retry 3D',model:'Conceptual building-massing model',hint:'Drag to rotate · use +/− to zoom · arrow keys also work',concept:'Concept & circulation',technical:'Technical checks',budget:'Illustrative land budget',next:'Next study',budgetNote:'A discussion-stage allocation totaling 100%. These shares are not measured from the model and are not permitted building coverage.',categories:['Buildings','Yards & circulation','Open land / agriculture','Water-management allowance','Reserve'],legend:['Concept buildings','Greenhouses / cultivation','Proposed water-management space','Possible later phase'],source:'Original sketch & model limitations',assumption:'The sketch crops the parcel’s tail. A dashed edge closes that part for concept comparison only. Proportions, ground levels, heights, roads and gates are not survey-verified. This is not a cadastral survey, permit design or feasibility study.',factsTitle:'Starting information from the original listing',facts:['Listed area 257 rai / 411,200 m²; title documents have not been verified','Approx. 120 m on Highway 304 and 495 m on a secondary road are seller claims, not measurements from the image','The listing describes rural/agricultural zoning; verify current rules for the exact site and activity'],baseline:'Every option uses the same schematic outline. No unverified north arrow or metric scale is shown.',documents:'Evidence needed for a precise plan',documentList:['Complete title documents and a surveyed boundary in KML / DWG or coordinates','Topographic levels, drainage outlets, flood history and ground investigation','Written land-use verification, access conditions and utility capacity information'],sources:'Check with the responsible agencies',date:'Reference channels checked 4 November 2026',contact:'Discuss this concept with the seller',boundary:'Sketch-derived outline',road:'304 alignment in sketch',tail:'Conceptual closing edge',active:'Currently displayed concept',fullscreenError:'Fullscreen is unavailable in this browser. You can continue in the current view.',concepts:[
{title:'Modern agriculture & packhouse',tag:'Start with agricultural activity',summary:'Greenhouses and demonstration plots alongside sorting and packing spaces. This does not assume any proposed activity is already permitted.',movement:'Separate inbound produce, outbound packed goods and visitor routes around a shared working yard.',checks:['Verify activity classification and land-use rules for each building','Investigate water supply, water quality and process-water treatment','Size receiving areas and any cold rooms against real operations'],next:'Define produce types, buying seasons and daily throughput, then verify the space brief with designers and authorities.'},
{title:'Warehousing & cold chain',tag:'Study vehicle movement first',summary:'Warehouse groups arranged around circulation corridors to compare building layouts and truck movement. Legal suitability is not confirmed.',movement:'Separate freight and passenger gates are proposed; their positions and access rights require verification.',checks:['Test swept paths and loading aprons with the actual design vehicles','Investigate soil bearing conditions and slab settlement','Check electrical supply, fire strategy and refrigeration load'],next:'Start with daily truck movements, goods types and loading-bay demand.'},
{title:'Food processing & supporting uses',tag:'Systems before building size',summary:'Medium-scale building groups for exploring agricultural processing, with water-management space and separation of activities included in the brief.',movement:'Separate raw materials, finished goods, waste and staff routes to reduce conflicting flows.',checks:['Identify processes, equipment and applicable permissions','Assess wastewater, odour, noise and waste handling','Verify power, water and emergency-vehicle access'],next:'Prepare a process diagram and equipment schedule before sizing buildings. No production capacity is assumed.'},
{title:'Roadside services & business space',tag:'Safe access is the first question',summary:'Explore services, shops or workspace near the indicated 304 frontage alongside uses farther inside. Unit counts and access rights are not assumed.',movement:'Separate short-stay customer traffic from service vehicles and provide protected pedestrian routes.',checks:['Consult DOH on highway access positions and traffic effects','Study electrical connection and load if EV charging is proposed','Verify parking, inclusive access and wastewater arrangements'],next:'Investigate traffic, actual service demand and highway conditions before fixing the frontage layout.'},
{title:'Demonstration farm & learning campus',tag:'Open space leads the plan',summary:'Trial plots, greenhouses, learning pavilions and water-management spaces with a larger share of open land.',movement:'Separate visitors and pedestrians from servicing routes; designers must assess assembly and escape arrangements.',checks:['Verify building use, assembly conditions and inclusive access','Assess seasonal water availability and demand','Understand users before sizing teaching spaces'],next:'Define activities, audiences and the operating model before committing to building size.'},
{title:'Phased, adaptable development',tag:'Keep future choices open',summary:'Study a first operating cluster while reserving other areas for possible later phases. Pale massing indicates undecided future development.',movement:'Plan expandable access and utility corridors without isolating the inner parcel or tail.',checks:['Plan sitewide levels and drainage before phase-one earthworks','Reserve utility routes and access for every phase','Review permissions and demand at each decision point'],next:'Set phase gates from verified site conditions and actual demand. No financial return is projected.'}]},
zh:{nav:'六种用地构想',eyebrow:'SIAMPLOT · LAND POSSIBILITIES',title:'一块土地\n六种构想',intro:'依据原始草图比较六种静态立体构想，了解交通组织和开发前的核查事项。',open:'打开可旋转的3D模型',loading:'正在加载3D模型…',rotate:'360°旋转',pause:'暂停旋转',left:'向左旋转',right:'向右旋转',zoomIn:'放大',zoomOut:'缩小',top:'俯视',reset:'重置视角',expand:'扩大视图',exit:'退出全屏',fallback:'此设备未能启动WebGL 2。您仍可比较六种示意方案并阅读技术说明。',retry:'重试3D',model:'概念建筑体量模型',hint:'拖动旋转 · 使用 +/− 缩放 · 支持方向键',concept:'构想与交通',technical:'技术核查',budget:'示例用地分配',next:'下一步研究',budgetNote:'合计100%的讨论用分配方案，未从模型测量，也不代表获准的建筑覆盖率。',categories:['建筑','场地及交通','开放空间/农业','水管理预留','储备用地'],legend:['概念建筑','温室/种植','拟研究的水管理空间','可能的后续阶段'],source:'原始草图及模型局限',assumption:'原图裁掉了地块尾部。模型用虚线闭合该部分，仅用于概念比较。比例、地面标高、建筑高度、道路和入口均未经测量核实。这不是地籍测量、报批设计或可行性研究。',factsTitle:'原挂牌信息的起点',facts:['挂牌面积257莱/411,200平方米；产权文件尚未核实','304公路临街约120米、次级道路约495米均为卖方描述，并非图上测量值','挂牌称为农村/农业用地，须按实际位置与活动核实当前规定'],baseline:'各方案使用同一示意边界，不标注未经核实的北向或比例尺。',documents:'精确规划所需资料',documentList:['完整产权文件及KML/DWG或坐标形式的测量边界','地形标高、排水口、洪水记录及地质勘察','书面土地用途核查、道路接入条件及公用设施容量'],sources:'向主管机构核查',date:'参考渠道核查于2026年11月4日',contact:'与卖方讨论此方案',boundary:'源于草图的边界',road:'草图中的304道路走向',tail:'概念闭合边',active:'当前显示方案',fullscreenError:'此浏览器不支持全屏，可继续使用当前视图。',concepts:[
{title:'现代农业与分拣包装',tag:'从农业活动出发',summary:'温室、示范田与分拣包装空间相结合，不假定所提活动已获许可。',movement:'区分农产品进场、包装产品出场及访客路线。',checks:['逐栋核实活动类别及土地用途规定','调查水源、水质和生产用水处理','按真实运营需求确定接收区及冷库空间'],next:'明确农产品种类、收购季节及日处理需求，再与设计者和主管部门核实。'},
{title:'仓储与冷链',tag:'先研究车辆运行',summary:'围绕交通走廊布置仓库组团，比较建筑与货车运行；合法适用性尚未确认。',movement:'建议区分货车与客车入口，但位置及通行权需核实。',checks:['以实际设计车辆校核转弯轨迹和装卸场','调查地基承载及地坪沉降','核实电力、消防策略及制冷负荷'],next:'先确定每日车次、货物类型及装卸口需求。'},
{title:'食品加工及配套业务',tag:'先确定系统需求',summary:'以中型建筑组团研究农产品加工，并预留水管理和活动间隔空间。',movement:'区分原料、成品、废弃物及员工路线。',checks:['明确工艺、设备及相关许可','评估废水、气味、噪声及废物处理','核实供电、用水及应急车辆通道'],next:'先编制工艺流程和设备表，再确定建筑规模；模型不假定产能。'},
{title:'沿路服务与商务空间',tag:'安全出入口优先',summary:'探索临304道路位置的服务、商铺或办公空间，不假定单元数量和接入权。',movement:'区分短停顾客车辆与内部服务车辆，保护行人路线。',checks:['向公路部门咨询接入位置及交通影响','如设EV充电，研究电力连接与负荷','核实停车、无障碍及污水安排'],next:'调查交通、真实服务需求和公路条件后再确定前场布局。'},
{title:'示范农场与学习园区',tag:'以开放空间为主',summary:'结合试验田、温室、教学建筑及水管理空间，保留较多开放用地。',movement:'访客与行人路线应与服务车辆分开，集散和疏散需由设计者评估。',checks:['核实建筑用途、人员集散及无障碍条件','评估季节性水源和需水量','先了解使用者再确定教学空间'],next:'先明确活动、目标群体和运营方式。'},
{title:'分期弹性开发',tag:'保留后续选择',summary:'研究首期运营组团，其余区域作为可能的后续阶段。浅色体量表示尚未决定的开发。',movement:'预留可延伸的道路和公用设施走廊，避免内侧与尾部被隔断。',checks:['首期土方前统筹全场标高和排水','为各期预留设施走廊与通道','各决策阶段重新核实许可和需求'],next:'以已核实场地条件和真实需求设置分期条件，不预测投资回报。'}]},
ja:{nav:'六つの土地構想',eyebrow:'SIAMPLOT · LAND POSSIBILITIES',title:'ひとつの土地に\n六つの構想',intro:'元の略図をもとに六つの静止立体構想を比較し、動線と開発前の確認事項をご覧いただけます。',open:'回転できる3Dモデルを開く',loading:'3Dモデルを読み込み中…',rotate:'360°回転',pause:'回転を停止',left:'左へ回転',right:'右へ回転',zoomIn:'拡大',zoomOut:'縮小',top:'上から見る',reset:'視点をリセット',expand:'表示を拡大',exit:'全画面を終了',fallback:'この端末ではWebGL 2を開始できませんでした。六つの概略図と技術メモは引き続きご覧いただけます。',retry:'3Dを再試行',model:'建物配置の概念モデル',hint:'ドラッグで回転 · +/−で拡大縮小 · 矢印キーにも対応',concept:'構想と動線',technical:'技術的な確認事項',budget:'仮の土地配分',next:'次の検討',budgetNote:'合計100%の協議用配分です。モデルからの実測値でも、許可された建築面積比率でもありません。',categories:['建物','ヤード・動線','空地・農業','水管理の想定余地','予備用地'],legend:['概念建物','温室・栽培','検討する水管理空間','将来段階の可能性'],source:'元の略図とモデルの限界',assumption:'元画像では敷地の尾部が切れています。破線で仮に閉じて構想を比較しています。比率、地盤高、建物高さ、道路、入口は測量確認されていません。地籍測量図、申請図、事業可能性調査ではありません。',factsTitle:'元の掲載情報に基づく前提',facts:['掲載面積257ライ/411,200㎡。権利書は未確認','国道304号側約120m、副道側約495mは売主の記載で、画像からの測定値ではありません','掲載では農村・農業系用途と説明されています。正確な位置と事業内容で現行規定を確認してください'],baseline:'すべて同じ概略輪郭を使用。未確認の北向きや縮尺は表示しません。',documents:'精度を上げるために必要な資料',documentList:['権利書全頁とKML/DWGまたは座標による測量境界','地形標高、排水先、浸水履歴、地盤調査','土地用途の書面確認、接道条件、電力・水の供給能力'],sources:'担当機関への確認',date:'参考窓口の確認日 2026年11月4日',contact:'この構想を売主に相談',boundary:'略図由来の輪郭',road:'略図の304号線方向',tail:'仮の閉鎖辺',active:'表示中の構想',fullscreenError:'このブラウザでは全画面を利用できません。通常表示でご覧ください。',concepts:[
{title:'近代農業と選別・梱包',tag:'農業活動から検討',summary:'温室、実証区画、選別・梱包スペースを組み合わせます。提案用途の許可は前提としていません。',movement:'農産物の搬入、梱包品の搬出、来訪者の動線を分けます。',checks:['建物ごとの事業区分と土地利用規定を確認','水源・水質・工程排水処理を調査','実際の運用量から受入場所や冷蔵室を検討'],next:'品目、仕入れ季節、日々の取扱量を定義し、設計者と行政に確認します。'},
{title:'倉庫とコールドチェーン',tag:'車両動線を先に検討',summary:'動線を中心に倉庫群を配置し、建物とトラックの動きを比較。法的適合性は未確認です。',movement:'貨物車と乗用車の入口を分ける案ですが、位置と通行権の確認が必要です。',checks:['実際の設計車両で旋回軌跡と荷捌きを検証','支持地盤と床の沈下を調査','電力供給、消防計画、冷却負荷を確認'],next:'一日当たりの車両数、貨物種類、荷捌き口数を整理します。'},
{title:'食品加工と関連事業',tag:'設備計画から始める',summary:'農産加工の中規模建物群を想定し、水管理空間と活動間の分離を検討します。',movement:'原料、製品、廃棄物、従業員の動線を分けます。',checks:['工程・設備・必要な許可を整理','排水・臭気・騒音・廃棄物取扱いを評価','電力、水、緊急車両通路を確認'],next:'建物規模より先に工程図と設備表を作成。生産能力は仮定していません。'},
{title:'沿道サービスと事業空間',tag:'安全な出入口を優先',summary:'304号線側のサービス、店舗、仕事場を検討。区画数や接続権は仮定しません。',movement:'短時間利用客と内部業務車両を分け、歩行者動線を保護します。',checks:['道路管理者と接続位置・交通影響を協議','EV充電を設ける場合は接続と電力負荷を調査','駐車、バリアフリー、排水を確認'],next:'交通量、実際の需要、道路条件を調べてから前面配置を決めます。'},
{title:'実証農場と学習キャンパス',tag:'空地を計画の中心に',summary:'試験区、温室、学習棟、水管理空間を組み合わせ、空地を多く残す構想です。',movement:'来訪者・歩行者とサービス車両を分離。集合・避難は設計者が検討します。',checks:['建物用途、集合利用、バリアフリーを確認','季節ごとの水源と需要を評価','利用者を把握してから学習空間を設定'],next:'活動、対象者、運営方法を先に整理します。'},
{title:'段階的で柔軟な開発',tag:'将来の選択肢を残す',summary:'初期の稼働区画を検討し、その他は将来段階に留保。薄い色は未決定の建物です。',movement:'内側や尾部を孤立させず、延長できる道路・設備ルートを計画します。',checks:['一期の土工前に全体の標高と排水を検討','各段階の設備ルートとアクセスを確保','節目ごとに許可と需要を再確認'],next:'確認済みの敷地条件と実需で段階条件を設定。収益予測は行いません。'}]}
};
