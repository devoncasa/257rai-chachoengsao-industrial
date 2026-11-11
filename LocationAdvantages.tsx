import React from 'react';
type Lang = 'th' | 'en' | 'zh' | 'ja';

const copy = {
 th: {
  label:'ทำเลกับการตัดสินใจลงทุน', title:'จุดเด่นของทำเล ช่วยธุรกิจได้อย่างไร',
  intro:'เริ่มจากตำแหน่งที่ผู้ขายยืนยันในอำเภอราชสาส์น จังหวัดฉะเชิงเทรา แล้วพิจารณาความเชื่อมโยงกับเส้นทางขนส่ง ฐานลูกค้า และแผนใช้พื้นที่ของธุรกิจคุณ',
  pin:'ตำแหน่งอ้างอิงของแปลง', map:'เปิดแผนที่เพื่อสำรวจเส้นทาง', benefit:'ประโยชน์ที่ควรศึกษา', check:'ข้อมูลที่ใช้ตัดสินใจ', source:'ข้อมูลอ้างอิง', contact:'ขอข้อมูลแปลงและนัดสำรวจ',
  items:[
   ['01 / เส้นทางขนส่ง','ศึกษาการใช้งานร่วมกับถนนสาย 304','ผู้ประกอบการที่มีเส้นทางขนส่งในพื้นที่อยู่แล้ว สามารถนำตำแหน่งแปลงมาเปรียบเทียบต้นทุนและความสะดวกของการตั้งคลังหรือจุดรวบรวมสินค้าได้','ทดลองเส้นทางจากจุดเข้าออกจริงด้วยรถที่จะใช้ ตรวจจุดกลับรถ สิทธิทางเข้าออก และต้นทุนต่อเที่ยวก่อนสรุปว่าประหยัดกว่าเดิม'],
   ['02 / ฐานธุรกิจในจังหวัด','มีพื้นที่อุตสาหกรรมเป็นกลุ่มเป้าหมายในการสำรวจตลาด','สวนอุตสาหกรรม 304 ระบุที่ตั้งโครงการฉะเชิงเทราที่เขาหินซ้อน อำเภอพนมสารคาม จึงเป็นจุดเริ่มต้นในการศึกษาความต้องการคลังสินค้า การขนส่ง และบริการสนับสนุน','ตรวจเส้นทางถึงผู้ใช้บริการเป้าหมาย สัมภาษณ์ลูกค้า และเปรียบเทียบคู่แข่ง ข้อมูลนี้ยังไม่ยืนยันความใกล้แปลงหรือว่ามีลูกค้ารองรับแล้ว'],
   ['03 / บริบทเศรษฐกิจ','ฉะเชิงเทราเป็นหนึ่งในสามจังหวัดของ EEC','นักลงทุนสามารถศึกษาธุรกิจที่เชื่อมโยงกับกิจกรรมเศรษฐกิจของจังหวัดและภูมิภาค แล้วเลือกกลุ่มลูกค้าที่สอดคล้องกับความสามารถของตน','ตรวจข้อกำหนดการใช้ประโยชน์ที่ดินและคุณสมบัติของโครงการเป็นรายกรณี การอยู่ในจังหวัด EEC ไม่ได้ยืนยันว่าสิทธิส่งเสริมหรือใบอนุญาตครอบคลุมแปลงนี้'],
   ['04 / การวางผังระยะยาว','พื้นที่เสนอขายทั้งแปลง รองรับการศึกษาผังรวม','พื้นที่ตามประกาศ 257 ไร่ หรือ 411,200 ตารางเมตร เปิดโอกาสให้ศึกษาการแยกพื้นที่ปฏิบัติงาน ระบบระบายน้ำ ถนนภายใน และพื้นที่เผื่อขยายภายใต้แผนเดียว','ยืนยันพื้นที่และแนวเขตจากเอกสารสิทธิและผลรังวัด พร้อมประเมินดิน น้ำท่วม และกำลังสาธารณูปโภคก่อนกำหนดขนาดโครงการ การขายยังเป็นทั้งแปลง ไม่แบ่งขาย']
  ]
 },
 en:{label:'Location and investment decisions',title:'How this location could serve your business',intro:'Start with the seller-confirmed reference in Ratchasan, Chachoengsao, then assess transport routes, potential customers and your site plan.',pin:'Parcel location reference',map:'Open the map to investigate routes',benefit:'Potential business value',check:'Evidence for your decision',source:'Source',contact:'Request parcel details and a viewing',items:[
 ['01 / Transport routes','Evaluate an operating base using the 304 network','Operators already serving this region can compare the parcel with their current warehouse or collection points using actual delivery costs and schedules.','Test from the actual entrance with the intended vehicle. Check turning points, legal access and cost per trip before claiming savings.'],
 ['02 / Provincial business base','An industrial market to investigate','304 Industrial Park lists its Chachoengsao development at Khao Hin Son, Phanom Sarakham. It provides a starting point for researching storage, transport and support-service needs.','Check routes to prospective users, interview buyers and compare competitors. This does not establish proximity to the parcel or secured customers.'],
 ['03 / Regional economy','Chachoengsao is one of the three EEC provinces','Investors can investigate businesses linked to provincial and regional economic activity, then select customer segments suited to their capabilities.','Verify parcel land-use rules and project eligibility separately. An EEC provincial location does not establish incentives or permissions for this parcel.'],
 ['04 / Long-term planning','A whole parcel for integrated site planning','The listed 257 rai, equivalent to 411,200 m², allows study of operational zones, drainage, internal roads and expansion space within one masterplan.','Verify area and boundaries against titles and survey; assess soil, flood exposure and utility capacity before sizing a project. Sale remains whole parcel, without subdivision.']
 ]},
 zh:{label:'区位与投资决策',title:'这一位置如何支持您的业务',intro:'以卖方确认的北柳府Ratchasan县位置为起点，结合实际运输路线、潜在客户及用地规划进行评估。',pin:'地块位置参考',map:'打开地图研究路线',benefit:'可研究的业务价值',check:'决策所需依据',source:'资料来源',contact:'索取地块资料并预约看地',items:[
 ['01 / 运输路线','研究利用304公路网络设置运营基地','已在当地经营的企业，可按实际配送成本和时间，对比本地块与现有仓库或集货点。','从实际出入口使用拟投入车辆测试路线，核实掉头位置、合法通行权及单次运费，再判断能否节约成本。'],
 ['02 / 府内产业基础','可开展市场调研的工业客户群','304工业园官网列明其北柳府项目位于Khao Hin Son、Phanom Sarakham，可作为仓储、运输及配套服务需求调研的起点。','核查通往潜在客户的路线、访谈买方并比较竞争者；这不代表园区紧邻地块，也不代表已有客户。'],
 ['03 / 区域经济','北柳府是EEC三府之一','投资者可研究与府内及区域经济活动相关的业务，选择适合自身能力的客户群。','土地用途规定和项目资格须分别核实；位于EEC省域内不等于本地块自动获得优惠或许可。'],
 ['04 / 长期规划','整宗土地便于研究统一规划','挂牌面积257莱，折合411,200平方米，可在统一规划下研究作业分区、排水、内部道路和扩展空间。','依权属文件及测量结果核实面积与边界，评估地基、洪涝和水电容量后再确定项目规模；仍为整宗出售，不分割。']
 ]},
 ja:{label:'立地と投資判断',title:'この立地を事業にどう生かせるか',intro:'売主が確認したチャチューンサオ県ラーチャサーン郡の位置を起点に、実際の輸送経路、見込み顧客、敷地計画を検討します。',pin:'敷地の位置参考',map:'地図で経路を調べる',benefit:'検討できる事業上の利点',check:'判断に必要な情報',source:'出典',contact:'土地資料と見学を問い合わせる',items:[
 ['01 / 輸送経路','304号線網を利用する拠点を検討','地域ですでに営業する事業者は、実際の配送費と所要時間に基づき、既存の倉庫や集荷拠点と比較できます。','実際の出入口から使用予定車両で走行し、転回箇所、通行権、一運行の費用を確認してからコスト効果を判断します。'],
 ['02 / 県内の産業基盤','市場調査の対象となる工業地域','304工業団地は県内拠点をKhao Hin Son、Phanom Sarakhamに掲載しており、倉庫・輸送・支援サービスの需要調査の出発点になります。','見込み顧客への経路、買主への聞き取り、競合を確認します。敷地との近接性や顧客の確保を示すものではありません。'],
 ['03 / 地域経済','EECを構成する3県の一つ','県内や地域の経済活動に関連する事業を調べ、自社の能力に合った顧客層を検討できます。','土地利用規制と事業の適格性を個別に確認します。EECの県内にあるだけで、この土地の優遇措置や許認可が確定するわけではありません。'],
 ['04 / 長期計画','一括の敷地で全体計画を検討','掲載面積257ライ、換算411,200㎡について、作業区域、排水、構内道路、拡張用地を一つの計画として検討できます。','権利書と測量で面積・境界を確認し、地盤、浸水、供給容量を評価して規模を決めます。一括売却で、分割販売はしません。']
 ]}
} as const;
const sources=[null,{label:'304 Industrial Park',url:'https://304industrialpark.com/en/contact-us/'},{label:'EECO',url:'https://www.eeco.or.th/en/why-invest-in-eec/'},null];
export default function LocationAdvantages({lang}:{lang:Lang}) {
 const c=copy[lang];
 return <section id="location-advantages" className="location-advantages" aria-labelledby="location-advantages-title">
  <p className="eyebrow">{c.label}</p><h3 id="location-advantages-title">{c.title}</h3><p className="advantages-intro">{c.intro}</p>
  <div className="advantages-pin"><div><span>{c.pin}</span><strong>13.689956, 101.258538</strong></div><a className="text-link" href="https://maps.app.goo.gl/w3rbjKfWmFMmLvBc7" target="_blank" rel="noopener noreferrer">{c.map}</a></div>
  <div className="advantages-grid">{c.items.map(([label,title,benefit,check],i)=><article className="advantage-card" key={label}><p className="eyebrow">{label}</p><h4>{title}</h4><dl><dt>{c.benefit}</dt><dd>{benefit}</dd><dt>{c.check}</dt><dd>{check}</dd></dl>{sources[i]&&<a className="text-link" href={sources[i]!.url} target="_blank" rel="noopener noreferrer">{c.source}: {sources[i]!.label}</a>}</article>)}</div>
  <a className="button" href="#contact">{c.contact}</a>
 </section>;
}
