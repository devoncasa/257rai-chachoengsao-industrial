import React, { useState, useEffect } from 'react';
import { translations } from './constants';
import { Language, TranslationSet } from './types';
import { Lightbox } from './Lightbox';

interface HeaderProps {
  t: TranslationSet;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ t, currentLang, onLangChange }) => {
  const navItems = [
    { key: 'navOverview', href: '#overview' },
    { key: 'navAsset', href: '#asset' },
    { key: 'navLocation', href: '#location' },
    { key: 'navEcosystem', href: '#ecosystem' },
    { key: 'navInfrastructure', href: '#infrastructure' },
    { key: 'navInvestment', href: '#investment' },
    { key: 'navPrice', href: '#price' },
    { key: 'navContact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-amber-900">{t.logo}</div>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <a key={item.key} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-stone-600 hover:text-amber-700 transition-colors font-medium">
              {t[item.key]}
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          {(Object.keys(Language) as Array<keyof typeof Language>).map(key => {
            const lang = Language[key];
            const isActive = currentLang === lang;
            return (
              <button
                key={lang}
                onClick={() => onLangChange(lang)}
                className={`px-3 py-1 text-sm font-semibold rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {key}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

const Section: React.FC<{id: string, title: string, children: React.ReactNode}> = ({id, title, children}) => (
    <section id={id} className="mb-28 scroll-mt-24">
        <h2 className="text-3xl font-bold text-amber-900 mb-6">{title}</h2>
        {children}
    </section>
);

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const t = translations[lang];

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.lang = lang;
  }, [t, lang]);

  const images = [
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-001.jpeg", altKey: "imgPlaceholder1" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-002.jpeg", altKey: "imgPlaceholder2" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-003.jpeg", altKey: "imgPlaceholder3" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-004.jpeg", altKey: "imgPlaceholder4" },
  ];

  const lightboxImages = images.map(img => ({
    src: img.src,
    caption: t[img.altKey],
  }));

  return (
    <div className="bg-stone-50 text-stone-800">
      <Header t={t} currentLang={lang} onLangChange={setLang} />
      <main className="w-full lg:w-3/5 mx-auto px-6 py-12">
        <Section id="overview" title={t.titleOverview}>
            <div className="space-y-4">
              {t.textOverview.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-stone-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
        </Section>
        
        <section className="mb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {images.map((image, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-md cursor-pointer" onClick={() => setActiveImageIndex(index)}>
                    <img 
                        src={image.src} 
                        alt={t[image.altKey]} 
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <p className="text-center text-sm text-stone-600 mt-2 p-2 font-medium bg-white">{t[image.altKey]}</p>
                </div>
            ))}
        </section>

        {activeImageIndex !== null && (
          <Lightbox
            images={lightboxImages}
            startIndex={activeImageIndex}
            onClose={() => setActiveImageIndex(null)}
            t={t}
          />
        )}

        <div className="text-center mb-28">
            <a 
              href="https://maps.app.goo.gl/w3rbjKfWmFMmLvBc7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-semibold py-3 px-6 rounded-lg hover:bg-amber-200 transition-colors shadow-sm text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {t.viewOnMap}
            </a>
        </div>

        <Section id="asset" title={t.titleAsset}>
             <div className="space-y-8 text-stone-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleAsset1}</h3>
                    <p>{t.textAsset1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleAsset2}</h3>
                    <p>{t.textAsset2}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleAsset3}</h3>
                    <p>{t.textAsset3}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleAsset4}</h3>
                    <p>{t.textAsset4}</p>
                </div>
            </div>
        </Section>

        <Section id="location" title={t.titleLocation}>
            <div className="space-y-8 text-stone-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleLocation1}</h3>
                    <p>{t.textLocation1}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleLocation2}</h3>
                    <p>{t.textLocation2}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleLocation3}</h3>
                    <p>{t.textLocation3}</p>
                </div>
                <div className="overflow-x-auto mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-amber-800">{t.titleConnMatrix}</h3>
                    <table className="w-full border-collapse text-stone-800">
                        <thead>
                            <tr className="bg-stone-100">
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colDest}</th>
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colDist}</th>
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colTime}</th>
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colImp}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-amber-50 transition-colors duration-200">
                                <td className="border border-stone-200 p-3">{t.dest1}</td>
                                <td className="border border-stone-200 p-3">~140</td>
                                <td className="border border-stone-200 p-3">{t.time1}</td>
                                <td className="border border-stone-200 p-3">{t.imp1}</td>
                            </tr>
                            <tr className="bg-stone-50 hover:bg-amber-50 transition-colors duration-200">
                                <td className="border border-stone-200 p-3">{t.dest2}</td>
                                <td className="border border-stone-200 p-3">~150</td>
                                <td className="border border-stone-200 p-3">{t.time2}</td>
                                <td className="border border-stone-200 p-3">{t.imp2}</td>
                            </tr>
                            <tr className="hover:bg-amber-50 transition-colors duration-200">
                                <td className="border border-stone-200 p-3">{t.dest3}</td>
                                <td className="border border-stone-200 p-3">~160</td>
                                <td className="border border-stone-200 p-3">{t.time3}</td>
                                <td className="border border-stone-200 p-3">{t.imp3}</td>
                            </tr>
                             <tr className="bg-stone-50 hover:bg-amber-50 transition-colors duration-200">
                                <td className="border border-stone-200 p-3">{t.dest4}</td>
                                <td className="border border-stone-200 p-3">~139</td>
                                <td className="border border-stone-200 p-3">{t.time4}</td>
                                <td className="border border-stone-200 p-3">{t.imp4}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Section>
        
        <Section id="ecosystem" title={t.titleEcosystem}>
            <div className="space-y-8 text-stone-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleEcosystem1}</h3>
                    <p>{t.textEcosystem1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleEcosystem2}</h3>
                    <p>{t.textEcosystem2}</p>
                </div>
                <div className="overflow-x-auto mt-8 bg-white p-6 rounded-lg shadow-md">
                     <h3 className="text-xl font-semibold mb-4 text-amber-800">{t.titleMultiNat}</h3>
                    <table className="w-full border-collapse text-stone-800">
                        <thead>
                            <tr className="bg-stone-100">
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colComp}</th>
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colNat}</th>
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colInd}</th>
                                <th className="border border-stone-200 p-3 text-left text-stone-800 font-semibold">{t.colProd}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Toshiba Semiconductor</td><td className="border border-stone-200 p-3">{t.nat1}</td><td className="border border-stone-200 p-3">{t.ind1}</td><td className="border border-stone-200 p-3">{t.prod1}</td></tr>
                            <tr className="bg-stone-50 hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Canon Prachinburi</td><td className="border border-stone-200 p-3">{t.nat2}</td><td className="border border-stone-200 p-3">{t.ind2}</td><td className="border border-stone-200 p-3">{t.prod2}</td></tr>
                            <tr className="hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Toyotetsu (Thailand)</td><td className="border border-stone-200 p-3">{t.nat3}</td><td className="border border-stone-200 p-3">{t.ind3}</td><td className="border border-stone-200 p-3">{t.prod3}</td></tr>
                            <tr className="bg-stone-50 hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Siam Aisin Co., Ltd.</td><td className="border border-stone-200 p-3">{t.nat4}</td><td className="border border-stone-200 p-3">{t.ind4}</td><td className="border border-stone-200 p-3">{t.prod4}</td></tr>
                            <tr className="hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Hitachi Global Storage</td><td className="border border-stone-200 p-3">{t.nat5}</td><td className="border border-stone-200 p-3">{t.ind5}</td><td className="border border-stone-200 p-3">{t.prod5}</td></tr>
                            <tr className="bg-stone-50 hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Emerson Electric</td><td className="border border-stone-200 p-3">{t.nat6}</td><td className="border border-stone-200 p-3">{t.ind6}</td><td className="border border-stone-200 p-3">{t.prod6}</td></tr>
                            <tr className="hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Sumisho Global Logistics</td><td className="border border-stone-200 p-3">{t.nat7}</td><td className="border border-stone-200 p-3">{t.ind7}</td><td className="border border-stone-200 p-3">{t.prod7}</td></tr>
                            <tr className="bg-stone-50 hover:bg-amber-50 transition-colors duration-200"><td className="border border-stone-200 p-3">Sunshine Biotech Int'l</td><td className="border border-stone-200 p-3">{t.nat8}</td><td className="border border-stone-200 p-3">{t.ind8}</td><td className="border border-stone-200 p-3">{t.prod8}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Section>
        
        <Section id="infrastructure" title={t.titleInfrastructure}>
            <div className="space-y-8 text-stone-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleInfra1}</h3>
                    <p>{t.textInfra1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleInfra2}</h3>
                    <p>{t.textInfra2}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleInfra3}</h3>
                    <p>{t.textInfra3}</p>
                </div>
            </div>
        </Section>

        <Section id="investment" title={t.titleInvestment}>
             <div className="space-y-8 text-stone-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleInvest1}</h3>
                    <p>{t.textInvest1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleInvest2}</h3>
                    <p>{t.textInvest2}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-amber-800">{t.subtitleInvest3}</h3>
                    <p>{t.textInvest3}</p>
                </div>
            </div>
        </Section>

        <Section id="price" title={t.titlePrice}>
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-8 text-center max-w-3xl mx-auto shadow-lg backdrop-blur-sm">
                <p className="text-lg text-stone-700 mb-6">{t.textPrice}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left my-8">
                    <div className="bg-white/50 p-4 rounded-md border border-stone-200">
                        <label className="text-sm font-semibold text-stone-600 block">{t.pricePerRai}</label>
                        <p className="text-2xl font-bold text-amber-800">1,800,000 THB</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-md border border-stone-200">
                        <label className="text-sm font-semibold text-stone-600 block">{t.totalArea}</label>
                        <p className="text-2xl font-bold text-amber-800">257 Rai</p>
                    </div>
                </div>
                <div className="border-t border-amber-200/80 my-6"></div>
                <div className="bg-white p-6 rounded-lg border border-stone-200">
                    <label className="text-md font-bold text-stone-800 block text-center">{t.totalPrice}</label>
                    <p className="text-4xl font-extrabold text-amber-900 text-center mt-2">462,600,000 THB</p>
                </div>
                <p className="text-sm text-stone-600 mt-6 font-medium">{t.priceNote}</p>
            </div>
        </Section>


        <section id="contact" className="mb-12 scroll-mt-24">
             <div className="text-center pt-12 border-t border-stone-200">
                <h3 className="text-3xl font-bold text-stone-800 mb-6">{t.contactTitle}</h3>
                <div className="mt-6 flex flex-col items-center justify-center gap-y-4 md:flex-row md:gap-x-8 text-stone-700 font-medium">
                    <div className="flex items-center gap-4">
                        <a href="tel:+66818519922" aria-label="Call" className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-500 group-hover:text-amber-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.758a10.024 10.024 0 006.96 6.96l.758-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </a>
                        <a href="https://wa.me/66818519922" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-500 group-hover:text-amber-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.062l-1.011 3.697 3.803-1.002z"/>
                            </svg>
                        </a>
                        <span className="text-lg">+66(0)818519922 (WeChat available)</span>
                    </div>
                    <div className="hidden h-6 w-px bg-stone-300 md:block"></div>
                    <a href="mailto:k.laohasiri@gmail.com" className="flex items-center gap-2 hover:text-amber-700 transition-colors duration-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-500 group-hover:text-amber-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span>k.laohasiri@gmail.com</span>
                    </a>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default App;