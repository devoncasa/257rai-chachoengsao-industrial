import React, { useState, useEffect } from 'react';
import { translations } from './constants';
import { Language, TranslationSet } from './types';

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
  const t = translations[lang];

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.lang = lang;
  }, [t, lang]);

  return (
    <div className="bg-stone-50 text-stone-800">
      <Header t={t} currentLang={lang} onLangChange={setLang} />
      <main className="container mx-auto px-6 py-12">
        <Section id="overview" title={t.titleOverview}>
            <p className="text-stone-700 leading-relaxed">{t.textOverview}</p>
        </Section>
        
        <section className="mb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="image-placeholder aspect-video rounded-lg shadow-sm bg-stone-200 border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-500 font-medium">{t.imgPlaceholder1}</div>
            <div className="image-placeholder aspect-video rounded-lg shadow-sm bg-stone-200 border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-500 font-medium">{t.imgPlaceholder2}</div>
            <div className="image-placeholder aspect-video rounded-lg shadow-sm bg-stone-200 border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-500 font-medium">{t.imgPlaceholder3}</div>
            <div className="image-placeholder aspect-video rounded-lg shadow-sm bg-stone-200 border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-500 font-medium">{t.imgPlaceholder4}</div>
        </section>

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
                    <div className="mt-4">
                      <a 
                        href="https://maps.app.goo.gl/w3rbjKfWmFMmLvBc7" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 font-semibold py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors shadow-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {t.viewOnMap}
                      </a>
                    </div>
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

        <Section id="contact" title={t.titleContact}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-stone-700 leading-relaxed mb-6">{t.textContact}</p>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-700">{t.formName}</label>
                            <input type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition"/>
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-stone-700">{t.formCompany}</label>
                            <input type="text" id="company" className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700">{t.formEmail}</label>
                            <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition"/>
                        </div>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-stone-700">{t.formPhone}</label>
                            <input type="tel" id="phone" className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition"/>
                        </div>
                    </div>
                    <div className="mt-6">
                        <label htmlFor="message" className="block text-sm font-medium text-stone-700">{t.formMessage}</label>
                        <textarea id="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 transition"></textarea>
                    </div>
                    <div className="mt-6 text-right">
                        <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-600 transition-all transform hover:scale-105">{t.formSubmit}</button>
                    </div>
                </form>
            </div>
        </Section>
      </main>
    </div>
  );
};

export default App;