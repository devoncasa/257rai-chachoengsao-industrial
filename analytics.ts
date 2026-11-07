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
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_location: window.location.origin + window.location.pathname,
    page_language: pageLanguage(),
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
    window.gtag?.('event', 'contact_click', {
      contact_method: method,
      page_language: pageLanguage(),
      transport_type: 'beacon',
    });
  });
}
if (document.readyState === 'complete') initializeAnalytics();
else window.addEventListener('load', initializeAnalytics, { once: true });
