/* Customer contact launcher v1, 2026-11-18. Conditional cloud chat and direct contact. */
(function () {
  'use strict';
  var script = document.currentScript;
  if (!script || document.getElementById('kris-customer-chat')) return;
  var config;
  try { config = JSON.parse(script.getAttribute('data-chat-config') || '{}'); } catch (_) { return; }
  if (!config.siteId || !config.brand) return;
  var words = {
    th: ['เปิดช่องทางสนทนา', 'สอบถามเพิ่มเติม', 'คุณลูกค้าสอบถามผ่านช่องทางด้านล่างได้เลยครับ ผมจะช่วยดูรายละเอียดให้ครับ', 'คุยผ่าน WhatsApp', 'ช่องทางติดต่อ', 'โทรสอบถาม', 'ปิด', 'คุยผ่าน LINE', 'คุยผ่าน Fastwork'],
    en: ['Open contact options', 'How can we help?', 'Have a question? Choose a contact option below and our team will help.', 'Chat on WhatsApp', 'Contact us', 'Call us', 'Close', 'Chat on LINE', 'Chat on Fastwork'],
    ar: ['فتح خيارات التواصل', 'كيف يمكننا مساعدتك؟', 'هل لديك سؤال؟ اختر وسيلة التواصل المناسبة أدناه وسيساعدك فريقنا.', 'تواصل عبر WhatsApp', 'تواصل معنا', 'اتصل بنا', 'إغلاق', 'تواصل عبر LINE', 'تواصل عبر Fastwork'],
    zh: ['打开联系选项', '有什么可以帮您？', '如有疑问，请选择下方方便的联系方式，我们会为您提供帮助。', '通过 WhatsApp 咨询', '联系我们', '致电咨询', '关闭', '通过 LINE 咨询', '通过 Fastwork 咨询'],
    es: ['Abrir opciones de contacto', '¿En qué podemos ayudarte?', '¿Tienes alguna pregunta? Elige cómo contactarnos y nuestro equipo te ayudará.', 'Hablar por WhatsApp', 'Contactar', 'Llamar', 'Cerrar', 'Hablar por LINE', 'Hablar por Fastwork'],
    fr: ['Ouvrir les options de contact', 'Comment pouvons-nous vous aider ?', 'Une question ? Choisissez un moyen de nous contacter ci-dessous. Notre équipe vous répondra.', 'Échanger sur WhatsApp', 'Nous contacter', 'Nous appeler', 'Fermer', 'Échanger sur LINE', 'Échanger sur Fastwork'],
    it: ['Apri le opzioni di contatto', 'Come possiamo aiutarti?', 'Hai una domanda? Scegli come contattarci qui sotto: il nostro team ti aiuterà.', 'Scrivici su WhatsApp', 'Contattaci', 'Chiamaci', 'Chiudi', 'Scrivici su LINE', 'Scrivici su Fastwork'],
    ja: ['お問い合わせ方法を開く', 'ご質問はありますか？', 'ご不明な点は、下記のご都合のよい方法でお問い合わせください。スタッフがご案内します。', 'WhatsAppで相談する', 'お問い合わせ', '電話する', '閉じる', 'LINEで相談する', 'Fastworkで相談する'],
    de: ['Kontaktmöglichkeiten öffnen', 'Wie können wir helfen?', 'Haben Sie eine Frage? Wählen Sie unten Ihren bevorzugten Kontaktweg. Unser Team hilft Ihnen gerne.', 'Über WhatsApp schreiben', 'Kontakt aufnehmen', 'Anrufen', 'Schließen', 'Über LINE schreiben', 'Über Fastwork schreiben'],
    tr: ['İletişim seçeneklerini aç', 'Size nasıl yardımcı olabiliriz?', 'Bir sorunuz mu var? Aşağıdan size uygun iletişim yolunu seçin, ekibimiz yardımcı olsun.', 'WhatsApp’tan yazın', 'Bize ulaşın', 'Bizi arayın', 'Kapat', 'LINE’dan yazın', 'Fastwork’ten yazın'],
    sw: ['Fungua njia za mawasiliano', 'Tunaweza kukusaidiaje?', 'Una swali? Chagua njia ya kuwasiliana nasi hapa chini. Timu yetu itakusaidia.', 'Wasiliana kwa WhatsApp', 'Wasiliana nasi', 'Tupigie simu', 'Funga', 'Wasiliana kwa LINE', 'Wasiliana kwa Fastwork'],
    pt: ['Abrir opções de contacto', 'Como podemos ajudar?', 'Tem alguma pergunta? Escolha abaixo como entrar em contacto e a nossa equipa ajudará.', 'Conversar pelo WhatsApp', 'Contacte-nos', 'Ligar', 'Fechar', 'Conversar pelo LINE', 'Conversar pelo Fastwork'],
    bn: ['যোগাযোগের উপায় খুলুন', 'কীভাবে সাহায্য করতে পারি?', 'কোনো প্রশ্ন আছে? নিচের সুবিধাজনক উপায়ে যোগাযোগ করুন। আমাদের দল আপনাকে সাহায্য করবে।', 'WhatsApp-এ কথা বলুন', 'যোগাযোগ করুন', 'ফোন করুন', 'বন্ধ করুন', 'LINE-এ কথা বলুন', 'Fastwork-এ কথা বলুন'],
    ha: ['Buɗe hanyoyin tuntuɓa', 'Ta yaya za mu taimaka?', 'Kuna da tambaya? Ku zaɓi hanyar tuntuɓa a ƙasa, ƙungiyarmu za ta taimaka muku.', 'Tuntuɓe mu ta WhatsApp', 'Tuntuɓe mu', 'Kira mu', 'Rufe', 'Tuntuɓe mu ta LINE', 'Tuntuɓe mu ta Fastwork'],
    so: ['Fur hababka xiriirka', 'Sideen kuu caawin karnaa?', 'Su’aal ma qabtaa? Hoos ka dooro habka aad nagula xiriiri karto. Kooxdayada ayaa ku caawin doonta.', 'Nagula hadal WhatsApp', 'Nala soo xiriir', 'Na soo wac', 'Xir', 'Nagula hadal LINE', 'Nagula hadal Fastwork'],
    ur: ['رابطے کے طریقے کھولیں', 'ہم آپ کی کیا مدد کر سکتے ہیں؟', 'کوئی سوال ہے؟ نیچے اپنی سہولت کے مطابق رابطے کا طریقہ منتخب کریں۔ ہماری ٹیم آپ کی مدد کرے گی۔', 'WhatsApp پر بات کریں', 'ہم سے رابطہ کریں', 'فون کریں', 'بند کریں', 'LINE پر بات کریں', 'Fastwork پر بات کریں'],
    hi: ['संपर्क के विकल्प खोलें', 'हम आपकी कैसे मदद कर सकते हैं?', 'कोई सवाल है? नीचे अपनी सुविधा के अनुसार संपर्क का तरीका चुनें। हमारी टीम आपकी मदद करेगी।', 'WhatsApp पर बात करें', 'हमसे संपर्क करें', 'कॉल करें', 'बंद करें', 'LINE पर बात करें', 'Fastwork पर बात करें'],
    vi: ['Mở các cách liên hệ', 'Chúng tôi có thể giúp gì?', 'Bạn có câu hỏi? Hãy chọn cách liên hệ thuận tiện bên dưới, đội ngũ của chúng tôi sẽ hỗ trợ bạn.', 'Nhắn qua WhatsApp', 'Liên hệ', 'Gọi điện', 'Đóng', 'Nhắn qua LINE', 'Nhắn qua Fastwork'],
    nl: ['Contactopties openen', 'Hoe kunnen we u helpen?', 'Heeft u een vraag? Kies hieronder hoe u contact wilt opnemen. Ons team helpt u graag.', 'Chat via WhatsApp', 'Neem contact op', 'Bel ons', 'Sluiten', 'Chat via LINE', 'Chat via Fastwork'],
    ru: ['Открыть способы связи', 'Чем мы можем помочь?', 'Есть вопрос? Выберите удобный способ связи ниже, и наша команда поможет вам.', 'Написать в WhatsApp', 'Связаться с нами', 'Позвонить', 'Закрыть', 'Написать в LINE', 'Написать в Fastwork']
  };
  var allowed = config.locales || ['th', 'en'];
  function supported(tag) {
    if (!tag) return null;
    tag = tag.toLowerCase().replace(/_/g, '-');
    return allowed.find(function (l) { return l.toLowerCase() === tag; }) || allowed.find(function (l) { return l.split('-')[0] === tag.split('-')[0]; }) || null;
  }
  function currentLocale() {
    var query = new URLSearchParams(location.search);
    var path = location.pathname.split('/').filter(Boolean)[0];
    return supported(query.get('lang')) || supported(path) || supported(document.documentElement.lang) || config.defaultLocale || allowed[0] || 'en';
  }
  function safeUrl(value) {
    if (!value || typeof value !== 'string') return null;
    try { var url = new URL(value, location.href); return ['https:', 'http:', 'tel:', 'mailto:'].indexOf(url.protocol) >= 0 ? url.href : null; } catch (_) { return null; }
  }
  function el(tag, cls, text) {
    var item = document.createElement(tag);
    if (cls) item.className = cls;
    if (text) item.textContent = text;
    return item;
  }
  function mount() {
    if (document.getElementById('kris-customer-chat') || /\/(?:owner|admin)(?:\/|$)/.test(location.pathname)) return;
    var css = el('link'); css.rel = 'stylesheet'; css.href = new URL('launcher.20261118a.css', script.src).href; css.dataset.customerChat = 'styles'; document.head.appendChild(css);
    var root = el('aside'); root.id = 'kris-customer-chat'; root.dataset.siteId = config.siteId; root.dataset.mode = 'contact'; root.setAttribute('translate', 'no');
    var panel = el('section', 'kcc-panel'); panel.hidden = true; panel.id = 'kris-customer-chat-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-labelledby', 'kris-customer-chat-title');
    var top = el('div', 'kcc-top'), heading = el('div');
    heading.appendChild(el('span', 'kcc-brand', config.brand));
    var title = el('h2', 'kcc-title'); title.id = 'kris-customer-chat-title'; heading.appendChild(title); top.appendChild(heading);
    var close = el('button', 'kcc-close', '×'); close.type = 'button'; top.appendChild(close); panel.appendChild(top);
    var copy = el('p', 'kcc-copy'), links = el('div', 'kcc-links'); panel.appendChild(copy); panel.appendChild(links);
    var button = el('button', 'kcc-launcher'); button.type = 'button'; button.setAttribute('aria-controls', panel.id); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-haspopup', 'dialog');
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 64 64'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
    [['M35 24c13 0 24 7 24 17 0 5-3 10-8 13l2 8-11-5c-2 .3-4 .5-7 .5-12 0-22-7-22-16.5S23 24 35 24Z','.9'],['M27 5C13 5 3 13 3 23c0 6 3 11 9 14l-3 10 13-6c2 .3 3 .5 5 .5 14 0 25-8 25-18.5S41 5 27 5Z','.98']].forEach(function (data) { var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d',data[0]);p.setAttribute('fill','#fff');p.setAttribute('fill-opacity',data[1]);p.setAttribute('stroke','#a6a098');p.setAttribute('stroke-width','1.2');svg.appendChild(p); }); button.appendChild(svg);
    root.appendChild(panel); root.appendChild(button); document.body.appendChild(root);
    var locale = '', isOpen = false, hasInteracted = false;

    var aiReady = false, checkedAt = 0;
    var aiHub = 'https://kris-portfolio-chatbot.netlify.app/';
    var aiLabels = {"th": "คุยกับผู้ช่วย AI", "en": "Chat with the AI assistant", "ar": "تحدث مع مساعد الذكاء الاصطناعي", "zh": "与 AI 助手对话", "zh-tw": "與 AI 助手對話", "zh-hant": "與 AI 助手對話", "ja": "AIアシスタントに相談", "fr": "Discuter avec l’assistant IA", "de": "Mit dem KI-Assistenten chatten", "es": "Hablar con el asistente de IA", "hi": "AI सहायक से बात करें", "vi": "Trò chuyện với trợ lý AI", "tr": "Yapay zekâ asistanıyla sohbet edin", "it": "Parla con l’assistente IA", "nl": "Chat met de AI-assistent", "sw": "Zungumza na msaidizi wa AI", "pt": "Falar com o assistente de IA", "ur": "اے آئی معاون سے بات کریں", "bn": "এআই সহকারীর সঙ্গে কথা বলুন", "so": "La hadal kaaliyaha AI", "ha": "Yi hira da mataimakin AI", "tl": "Makipag-usap sa AI assistant", "ru": "Написать ИИ-помощнику", "my": "AI လက်ထောက်နှင့် စကားပြောရန်", "id": "Chat dengan asisten AI", "ko": "AI 도우미와 대화하기"};
    function checkAiAvailability() {
      if (Date.now() - checkedAt < 60000) return;
      checkedAt = Date.now();
      fetch(aiHub + 'api/chat', {credentials:'omit', referrerPolicy:'no-referrer'})
        .then(function(response) { return response.ok ? response.json() : null; })
        .then(function(health) {
          aiReady = !!(health && health.service === 'portfolio-chat' && health.model_configured === true);
          updateText();
        }).catch(function() { if (aiReady) { aiReady = false; updateText(); } });
    }
    function contactFor(code) {
      var value = config.contactUrls && (config.contactUrls[code] || config.contactUrls[code.split('-')[0]]) || config.contactUrl;
      if (value && config.contactLanguageQuery) { var url = new URL(value, location.href); url.searchParams.set(config.contactLanguageQuery,code); value = url.href; }
      return value;
    }
    function updateText() {
      locale = currentLocale(); var text = words[locale] || words[locale.split('-')[0]] || words.en;
      root.lang = locale; root.dir = /^(ar|ur)(-|$)/.test(locale) ? 'rtl' : 'ltr'; button.setAttribute('aria-label',text[0]); button.title=text[0];title.textContent=text[1];copy.textContent=text[2];close.setAttribute('aria-label',text[6]);
      links.replaceChildren();
      if (aiReady) {
        var key = locale.toLowerCase();
        var chat = el('a','kcc-link',aiLabels[key] || aiLabels[key.split('-')[0]] || aiLabels.en);
        var chatUrl = new URL(aiHub);
        chatUrl.searchParams.set('site',config.siteId);
        chatUrl.searchParams.set('lang',locale);
        chat.href = chatUrl.href;
        chat.target = '_blank'; chat.rel = 'noopener noreferrer'; links.appendChild(chat);
      }
      [[config.whatsappUrl,3],[config.lineUrl,7],[config.fastworkUrl,8],[contactFor(locale),4],[config.phoneUrl,5]].forEach(function (item) {
        var href=safeUrl(item[0]); if(!href)return; var a=el('a','kcc-link',text[item[1]]);a.href=href;
        if(/^https?:/.test(href)&&new URL(href).origin!==location.origin){a.target='_blank';a.rel='noopener noreferrer';}
        links.appendChild(a);
      });
      if (!links.childElementCount) { root.remove(); return; }
      schedulePosition();
    }
    function setOpen(next, returnFocus) {
      if(next===isOpen)return;
      isOpen=next;hasInteracted=true;panel.hidden=!next;button.setAttribute('aria-expanded',String(next));root.classList.remove('kcc-nudge');
      try{sessionStorage.setItem('customer-chat-nudge:'+config.siteId,'dismissed');}catch(_){}
      if(next){checkAiAvailability();close.focus({preventScroll:true});window.dispatchEvent(new CustomEvent('kris:customer-chat-open',{detail:{siteId:config.siteId,locale:locale,mode:'contact'}}));}
      else if(returnFocus)button.focus({preventScroll:true});
      schedulePosition();
    }
    button.addEventListener('click',function(){setOpen(!isOpen,false);});close.addEventListener('click',function(){setOpen(false,true);});
    document.addEventListener('pointerdown',function(event){if(isOpen&&!root.contains(event.target))setOpen(false,false);});
    document.addEventListener('keydown',function(event){if(event.key==='Escape'&&isOpen){event.preventDefault();setOpen(false,true);}});
    var avoid=(config.avoidSelectors||[]).concat(['.privacy-choice','.analytics-consent','.cookie-banner','.cookie-consent','.consent-banner','[data-cookie-banner]','[data-consent-panel]','.comparison-tray']).join(',');
    var frame=0;
    function position() {
      frame=0;if(!root.isConnected)return;
      var base=window.innerWidth>=1200?26:window.innerWidth>=768?22:18, bottom=base;
      var width=button.getBoundingClientRect().width, right=window.innerWidth-base, left=right-width;
      var blockers;try{blockers=document.querySelectorAll(avoid);}catch(_){blockers=[];}
      blockers.forEach(function(node){if(root.contains(node))return;var r=node.getBoundingClientRect();if(r.width&&r.height&&r.bottom>window.innerHeight/2&&r.left<right&&r.right>left&&r.top<window.innerHeight)bottom=Math.max(bottom,window.innerHeight-r.top+12);});
      root.style.bottom='max('+bottom+'px, env(safe-area-inset-bottom))';
      if(isOpen)panel.style.maxHeight=Math.max(120,window.innerHeight-bottom-width-30)+'px';
    }
    function schedulePosition(){if(!frame)frame=requestAnimationFrame(position);}
    updateText();
    window.addEventListener('resize',schedulePosition,{passive:true});window.addEventListener('popstate',updateText);
    document.addEventListener('click',schedulePosition,true);
    new MutationObserver(function(){if(currentLocale()!==locale)updateText();schedulePosition();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir','data-vlg-consent-known']});
    var observer=new MutationObserver(function(records){if(records.some(function(record){return !root.contains(record.target);}))schedulePosition();});observer.observe(document.body,{childList:true,subtree:true});
    var nudgeKey='customer-chat-nudge:'+config.siteId;
    function invite(){
      if(hasInteracted||isOpen||document.hidden||!root.isConnected)return;
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.vlgMotion==='calm')return;
      if(/(?:custom-|studio|builder|checkout|cart|owner|admin)/i.test(location.pathname))return;
      var active=document.activeElement;if(active&&(active.matches('input,textarea,select')||active.isContentEditable))return;
      var blocked=[].slice.call(document.querySelectorAll('dialog[open],[aria-modal="true"],'+avoid)).some(function(node){return node.getBoundingClientRect().height>0;});if(blocked)return;
      try{if(sessionStorage.getItem(nudgeKey))return;sessionStorage.setItem(nudgeKey,'1');}catch(_){}
      root.classList.add('kcc-nudge');
    }
    var remaining=45000,started=0,inviteTimer=0;
    function countVisibleTime(){
      if(inviteTimer){clearTimeout(inviteTimer);inviteTimer=0;remaining=Math.max(0,remaining-(performance.now()-started));started=0;}
      if(config.nudge===false||hasInteracted||document.hidden||remaining<=0)return;
      started=performance.now();inviteTimer=setTimeout(function(){inviteTimer=0;remaining=0;invite();},remaining);
    }
    document.addEventListener('visibilitychange',countVisibleTime);countVisibleTime();
    window.KrisCustomerChat={version:'20261119b',mode:'contact',open:function(){setOpen(true,false);},close:function(){setOpen(false,true);}};
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();

