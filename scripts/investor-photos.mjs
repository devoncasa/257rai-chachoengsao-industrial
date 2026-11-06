const captions = {
  "hub": [
    "ทีมสำรวจตรวจสอบผังเบื้องต้นก่อนลงพื้นที่",
    "สภาพพื้นที่เกษตรในภาคตะวันออก",
    "การตรวจรับสินค้าภายในคลัง",
    "การหารือแบบโครงการเบื้องต้น"
  ],
  "eec": [
    "เส้นทางขนส่งในพื้นที่อุตสาหกรรมภาคตะวันออก",
    "พื้นที่เกษตรและแหล่งประกอบธุรกิจในภูมิภาค",
    "การตรวจสอบภาชนะสำหรับขนส่งสินค้า",
    "การวางแผนเส้นทางกระจายสินค้า"
  ],
  "logistics": [
    "การประเมินทางเข้าออกและรัศมีวงเลี้ยวรถบรรทุก",
    "ช่องขนถ่ายสินค้าและลานรอรถ",
    "พื้นที่พักสินค้าก่อนนำเข้าคลังควบคุมอุณหภูมิ",
    "การวางแผนรับสินค้าขากลับจากข้อมูลการขนส่ง"
  ],
  "development": [
    "การพิจารณาผังอาคารร่วมกับสภาพพื้นที่",
    "ตัวอย่างอาคารระยะแรกและพื้นที่สำรองสำหรับขยาย",
    "พื้นที่ภายในอาคารที่ปรับเปลี่ยนการใช้งานได้",
    "ผู้พัฒนาและผู้ใช้พื้นที่ร่วมตรวจสอบอาคาร"
  ],
  "agri-food": [
    "การขนผลผลิตจากสวนไปยังจุดรวบรวม",
    "การคัดคุณภาพผลผลิตตามความต้องการของผู้ซื้อ",
    "การบรรจุสินค้าเพื่อเตรียมจัดส่งเป็นชุด",
    "การตรวจสอบระบบให้น้ำภายในสวน"
  ],
  "industrial-services": [
    "การตรวจรับชิ้นส่วนก่อนจัดเก็บในพื้นที่พักสินค้า",
    "การเตรียมภาชนะหมุนเวียนเพื่อนำกลับมาใช้",
    "การรวบรวมสินค้าจากผู้ส่งมอบก่อนจัดส่ง",
    "การเตรียมอุปกรณ์สำหรับงานบริการสนับสนุน"
  ],
  "site-review": [
    "การสำรวจระดับพื้นที่และแนวเขต",
    "การตรวจสอบพื้นที่เลี้ยวรถบริเวณถนน",
    "การประเมินแนวระบายน้ำหลังฝนตก",
    "การบันทึกข้อมูลจากการสำรวจพื้นที่"
  ]
};

const localizedCaptions={"en": [["Survey team reviewing a preliminary plan", "Eastern Thailand agricultural landscape", "Warehouse receiving inspection", "Discussion of a preliminary building plan"], ["Industrial-area freight route", "Regional farmland and business landscape", "Inspection of reusable shipping containers", "Distribution-route planning"], ["Truck access and turning assessment", "Loading bays and truck waiting area", "Staging goods before cold storage", "Preparing return loads using transport records"], ["Comparing the building plan with site conditions", "First-phase building and expansion space", "Adaptable commercial building interior", "Developer and occupier inspecting a building"], ["Moving produce from orchard to collection", "Grading produce for buyers", "Packing produce in dispatch batches", "Inspecting orchard irrigation"], ["Receiving components for temporary storage", "Preparing reusable containers", "Consolidating suppliers’ shipments", "Preparing support equipment for delivery"], ["Surveying levels and boundaries", "Inspecting a road turning point", "Assessing drainage after rain", "Recording site inspection findings"]], "zh": [["测量团队核对初步图纸", "泰国东部农业景观", "仓库收货检查", "讨论初步建筑方案"], ["工业区货运道路", "区域农田与经营环境", "检查周转运输容器", "规划配送线路"], ["评估货车进出与转弯", "装卸月台及候车区", "冷库入库前暂存作业", "根据运输记录安排回程货物"], ["结合现场情况查看建筑图", "一期建筑与扩建预留空间", "可调整用途的建筑内部", "开发商与使用方检查建筑"], ["果园产品运往集货点", "面向买家的农产品分级", "分批包装待发产品", "检查果园灌溉系统"], ["零部件验收后暂存", "准备循环使用的容器", "集拼供应商货物", "准备交付配套设备"], ["测量标高及边界", "检查道路转弯位置", "雨后评估排水", "记录实地考察发现"]], "ja": [["概略図を確認する測量チーム", "タイ東部の農地景観", "倉庫の入荷検査", "建物の基本計画を検討"], ["工業地域の貨物輸送路", "地域の農地と事業環境", "通い容器の点検", "配送経路の計画"], ["車両の進入と転回を確認", "荷役バースと車両待機場", "低温庫への入庫前準備", "輸送記録から復路貨物を計画"], ["配置図と現地を照合", "第1期施設と拡張余地", "用途変更しやすい建物内部", "開発者と利用者による建物確認"], ["果樹園から集荷へ", "買い手向けの品質選別", "出荷ロットごとの包装", "果樹園の灌漑設備点検"], ["部品の受入れと一時保管", "再利用容器の準備", "サプライヤー貨物の集約", "納品用の支援設備を準備"], ["地盤高と境界の測量", "道路の転回箇所を確認", "雨後の排水を調査", "現地調査結果の記録"]]};
export function investorPhotos(topic, start = 0, end = 4, lang = "th") {
  const photos = (lang==='th'?captions[topic]:localizedCaptions[lang][Object.keys(captions).indexOf(topic)]).slice(start, end).map((caption, i) => {
    const number = start + i + 1;
    return `<figure><img src="/media/investors/${topic}-${number}.webp" width="768" height="512" loading="lazy" decoding="async" alt="${caption}"><figcaption><span aria-hidden="true">0${number}</span> ${caption}</figcaption></figure>`;
  });
  return `<div class="investor-photos investor-photos--${topic} investor-photos--pair-${start}" aria-label="${{th:'ภาพจำลองประกอบ',en:'Concept illustrations',zh:'概念示意图',ja:'事業イメージ図'}[lang]}">${photos.join('')}<p class="photo-credit">${{th:'ภาพจำลองประกอบแนวทางลงทุน ไม่ใช่ภาพถ่ายที่ดินแปลงที่เสนอขาย',en:'Investment concept illustrations, not photographs of the listed parcel.',zh:'投资概念示意图，并非待售地块的实景照片。',ja:'投資検討用のイメージ図です。売却対象地の現地写真ではありません。'}[lang]}</p></div>`;
}
