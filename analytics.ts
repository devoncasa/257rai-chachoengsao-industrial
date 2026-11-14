export function campaignPage(origin: string, pathname: string, search: string) {
  const page = new URL(pathname, origin);
  const query = new URLSearchParams(search);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_id']) {
    const value = query.get(key);
    if (value && /^[a-z0-9][a-z0-9_-]{0,79}$/i.test(value) && !/\d{7}/.test(value)) page.searchParams.set(key, value.toLowerCase());
  }
  return page.href;
}
// Reuse the owner's verified GA4 stream. Review hosts never load the Google tag.
const measurementId = 'G-YTH1CE6XB4';
const productionHosts = new Set(['siamplot.com', 'www.siamplot.com']);
const pageLanguages = new Set(['th', 'en', 'zh', 'ja']);
type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window { dataLayer?: unknown[]; gtag?: Gtag }
}
function analyticsBlocked() {
  const browser = window.navigator as Navigator & { globalPrivacyControl?: boolean };
  return browser.globalPrivacyControl === true || browser.doNotTrack === '1' ||
    Reflect.get(window, `ga-disable-${measurementId}`) === true;
}

function pageLanguage() {
  const language = document.documentElement.lang.toLowerCase().split('-')[0];
  return pageLanguages.has(language) ? language : 'und';
}

export function initializeAnalytics() {
  if (!productionHosts.has(window.location.hostname) || analyticsBlocked() ||
      document.getElementById('siamplot-ga4')) return;
  const qaFlag = new URL(window.location.href).searchParams.get('ga_debug');
  let developerQA = qaFlag === '1';
  try {
    if (qaFlag === '1') window.sessionStorage.setItem('siamplot-ga-debug', '1');
    else if (qaFlag === '0') window.sessionStorage.removeItem('siamplot-ga-debug');
    else developerQA = window.sessionStorage.getItem('siamplot-ga-debug') === '1';
  } catch { /* Current-page QA works even without storage. */ }
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: campaignPage(window.location.origin, window.location.pathname, window.location.search),
    page_language: pageLanguage(), content_language: pageLanguage(),
    ...(developerQA ? { debug_mode: true } : {}),
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement('script');
  script.id = 'siamplot-ga4';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
  document.addEventListener('click', (event) => {
    if (analyticsBlocked()) return;
    const target = event.target instanceof Element ? event.target.closest('a') : null;
    if (!target) return;
    const href = target.getAttribute('href') || '';
    const method = href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : /^https:\/\/wa\.me\//.test(href) ? 'whatsapp' : null;
    if (!method) return;
    try { window.gtag?.('event', 'contact_click', {
      send_to: measurementId,
      content_language: pageLanguage(),
      ...(developerQA ? { debug_mode: true } : {}),
      contact_method: method,
      page_language: pageLanguage(),
      transport_type: 'beacon',
    }); } catch { /* Analytics must not interrupt contact navigation. */ }
  });
}
if (document.readyState === 'complete') initializeAnalytics();
else window.addEventListener('load', initializeAnalytics, { once: true });

