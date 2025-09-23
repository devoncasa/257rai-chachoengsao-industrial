import React, { useState, useEffect } from 'react';
import { translations } from './constants';
import { Language, TranslationSet } from './types';
import { Lightbox } from './Lightbox';
import { AnalysisRenderer } from './AnalysisRenderer';

interface NavItem {
  key: string;
  href: string;
}

interface HeaderProps {
  t: TranslationSet;
  currentLang: Language;
  onLangChange: (lang: Language) => void;
  navItems: NavItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Header: React.FC<HeaderProps> = ({ t, currentLang, onLangChange, navItems, activeSection, setActiveSection }) => {

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const sectionId = targetId.substring(1);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#root" onClick={handleLogoClick}>
          <img src="https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/304-land-logo-small.png" alt={t.logo} className="h-16 w-auto" />
        </a>
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map(item => {
            const sectionId = item.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a 
                key={item.key} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)} 
                className={`text-blue-900 hover:text-sky-600 transition-colors font-medium pb-1 border-b-2 ${
                  isActive ? 'border-sky-400' : 'border-transparent'
                }`}
              >
                {t[item.key]}
              </a>
            );
          })}
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
                    ? 'bg-blue-700 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
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
        <h2 className="text-3xl font-bold text-blue-900 mb-8">{title}</h2>
        {children}
    </section>
);

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick }) => (
  <div className="border-b border-slate-200">
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-sky-50 hover:bg-sky-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-t-md"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
        <svg
          className={`w-5 h-5 text-sky-700 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    <div
      className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
      <div className="overflow-hidden">
        <div className="p-6 bg-white space-y-4 text-slate-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const BusinessPotentialCard: React.FC<{title: string; concept: string; rationale: string; t: TranslationSet}> = ({title, concept, rationale, t}) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-500 flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
        <h4 className="text-xl font-bold text-slate-800 mb-4">{title}</h4>
        <div className="space-y-4 text-slate-700 text-sm">
            <div>
                <p className="font-semibold text-sky-700 mb-1">{t.conceptTitle}</p>
                <p>{concept}</p>
            </div>
            <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-sky-700 mb-1">{t.rationaleTitle}</p>
                <p>{rationale}</p>
            </div>
        </div>
    </div>
);

const navItems = [
  { key: 'navOverview', href: '#overview' },
  { key: 'navAsset', href: '#asset' },
  { key: 'navPotential', href: '#business-potential' },
  { key: 'navLocation', href: '#location' },
  { key: 'navEcosystem', href: '#ecosystem' },
  { key: 'navInfrastructure', href: '#infrastructure' },
  { key: 'navInvestment', href: '#investment' },
  { key: 'navAnalysis', href: '#analysis' },
  { key: 'navPrice', href: '#price' },
  { key: 'navContact', href: '#contact' },
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const t = translations[lang];

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.lang = lang;
    
    const descriptionTag = document.getElementById('meta-description');
    if (descriptionTag) {
        descriptionTag.setAttribute('content', t.metaDescription);
    }

    const keywordsTag = document.getElementById('meta-keywords');
    if (keywordsTag) {
        keywordsTag.setAttribute('content', t.metaKeywords);
    }
  }, [t, lang]);

  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.href.substring(1))).filter(Boolean) as HTMLElement[];

    let isThrottled = false;
    const handleScroll = () => {
        if (isThrottled) return;
        isThrottled = true;

        setTimeout(() => {
            const scrollY = window.scrollY;
            const headerHeight = 150;

            let currentSectionId = '';
            for (const section of sections) {
                if (section.offsetTop <= scrollY + headerHeight) {
                    currentSectionId = section.id;
                } else {
                    break;
                }
            }

            if (scrollY < (sections[0]?.offsetTop ?? 0) - headerHeight) {
                currentSectionId = 'overview';
            }

            if (currentSectionId) {
                setActiveSection(prev => {
                    if (prev === currentSectionId) return prev;
                    return currentSectionId;
                });
            }

            isThrottled = false;
        }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-001.jpeg", altKey: "imgPlaceholder1" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-002.jpeg", altKey: "imgPlaceholder2" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-003.jpeg", altKey: "imgPlaceholder3" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/257-004.jpeg", altKey: "imgPlaceholder4" },
      { src: "https://cdn.jsdelivr.net/gh/devoncasa/257rai-chachoengsao-industrial@main/2ndary-road.jpeg", altKey: "imgSecondaryRoad" },
  ];

  const lightboxImages = images.map(img => ({
    src: img.src,
    caption: t[img.altKey],
  }));

  const handleAccordionClick = (index: number) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const analysisSections = t.analysis ? [
    t.analysis.executiveSummary,
    t.analysis.section1,
    t.analysis.section2,
    t.analysis.section3,
    t.analysis.section4,
    t.analysis.section5,
  ] : [];

  return (
    <div className="bg-sky-50 text-slate-800">
      <Header 
        t={t} 
        currentLang={lang} 
        onLangChange={setLang} 
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="w-full lg:w-3/5 mx-auto px-6 py-12">
        <Section id="overview" title={t.titleOverview}>
            <div className="space-y-4">
              {t.textOverview.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
        </Section>
        
        <section className="mb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {images.slice(0, 4).map((image, index) => (
                <div key={index} className="group overflow-hidden rounded-lg shadow-md cursor-pointer" onClick={() => setActiveImageIndex(index)}>
                    <img 
                        src={image.src} 
                        alt={t[image.altKey]} 
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                    <p className="text-center text-sm text-slate-600 mt-2 p-2 font-medium bg-white">{t[image.altKey]}</p>
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
              className="inline-flex items-center gap-2 bg-sky-100 text-blue-800 font-semibold py-3 px-6 rounded-lg hover:bg-sky-200 transition-colors shadow-sm text-base"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {t.viewOnMap}
            </a>
        </div>

        <Section id="asset" title={t.titleAsset}>
             <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleAsset1}</h3>
                    <p>{t.textAsset1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleAsset2}</h3>
                    <p>{t.textAsset2}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleAsset3}</h3>
                    <p>{t.textAsset3}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleAsset4}</h3>
                    <p>{t.textAsset4}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-800 pt-4 border-t border-sky-200/80">{t.subtitleAsset5}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-4">
                      <div 
                        className="group overflow-hidden rounded-lg shadow-md cursor-pointer" 
                        onClick={() => setActiveImageIndex(4)}
                      >
                          <img 
                              src={images[4].src} 
                              alt={t[images[4].altKey]} 
                              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                           <p className="text-center text-sm text-slate-600 mt-2 p-2 font-medium bg-white">{t[images[4].altKey]}</p>
                      </div>
                      <div className="bg-sky-50/50 p-6 rounded-lg border border-sky-100 space-y-4">
                        <p>{t.textAsset5_p1}</p>
                        <h4 className="text-lg font-bold text-slate-800">{t.textAsset5_title}</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-sky-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <strong className="font-semibold text-slate-700">{t.textAsset5_li1_title}:</strong> {t.textAsset5_li1_text}
                                </div>
                            </li>
                            <li className="flex items-start">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-sky-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <strong className="font-semibold text-slate-700">{t.textAsset5_li2_title}:</strong> {t.textAsset5_li2_text}
                                </div>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-sky-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <strong className="font-semibold text-slate-700">{t.textAsset5_li3_title}:</strong> {t.textAsset5_li3_text}
                                </div>
                            </li>
                        </ul>
                        <p className="font-semibold italic pt-2">{t.textAsset5_p2}</p>
                      </div>
                  </div>
                </div>
            </div>
        </Section>
        
        <Section id="business-potential" title={t.titleBusinessPotential}>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-800/90 mb-6 pb-2 border-b-2 border-sky-200">{t.group1Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BusinessPotentialCard title={t.group1_item1_title} concept={t.group1_item1_concept} rationale={t.group1_item1_rationale} t={t} />
                <BusinessPotentialCard title={t.group1_item2_title} concept={t.group1_item2_concept} rationale={t.group1_item2_rationale} t={t} />
                <BusinessPotentialCard title={t.group1_item3_title} concept={t.group1_item3_concept} rationale={t.group1_item3_rationale} t={t} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-800/90 mb-6 pb-2 border-b-2 border-sky-200">{t.group2Title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <BusinessPotentialCard title={t.group2_item1_title} concept={t.group2_item1_concept} rationale={t.group2_item1_rationale} t={t} />
                 <BusinessPotentialCard title={t.group2_item2_title} concept={t.group2_item2_concept} rationale={t.group2_item2_rationale} t={t} />
                 <BusinessPotentialCard title={t.group2_item3_title} concept={t.group2_item3_concept} rationale={t.group2_item3_rationale} t={t} />
              </div>
            </div>
          </div>
        </Section>

        <Section id="location" title={t.titleLocation}>
            <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleLocation1}</h3>
                    <p>{t.textLocation1}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleLocation2}</h3>
                    <p>{t.textLocation2}</p>
                </div>
                 <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleLocation3}</h3>
                    <p>{t.textLocation3}</p>
                </div>
                <div className="overflow-x-auto mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 text-blue-800">{t.titleConnMatrix}</h3>
                    <table className="w-full border-collapse text-slate-800">
                        <thead>
                            <tr className="bg-sky-100">
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colDest}</th>
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colDist}</th>
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colTime}</th>
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colImp}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-sky-100 transition-colors duration-200">
                                <td className="border border-slate-200 p-3">{t.dest1}</td>
                                <td className="border border-slate-200 p-3">~140</td>
                                <td className="border border-slate-200 p-3">{t.time1}</td>
                                <td className="border border-slate-200 p-3">{t.imp1}</td>
                            </tr>
                            <tr className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200">
                                <td className="border border-slate-200 p-3">{t.dest2}</td>
                                <td className="border border-slate-200 p-3">~150</td>
                                <td className="border border-slate-200 p-3">{t.time2}</td>
                                <td className="border border-slate-200 p-3">{t.imp2}</td>
                            </tr>
                            <tr className="hover:bg-sky-100 transition-colors duration-200">
                                <td className="border border-slate-200 p-3">{t.dest3}</td>
                                <td className="border border-slate-200 p-3">~160</td>
                                <td className="border border-slate-200 p-3">{t.time3}</td>
                                <td className="border border-slate-200 p-3">{t.imp3}</td>
                            </tr>
                             <tr className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200">
                                <td className="border border-slate-200 p-3">{t.dest4}</td>
                                <td className="border border-slate-200 p-3">~139</td>
                                <td className="border border-slate-200 p-3">{t.time4}</td>
                                <td className="border border-slate-200 p-3">{t.imp4}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Section>
        
        <Section id="ecosystem" title={t.titleEcosystem}>
            <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleEcosystem1}</h3>
                    <p>{t.textEcosystem1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleEcosystem2}</h3>
                    <p>{t.textEcosystem2}</p>
                </div>
                <div className="overflow-x-auto mt-8 bg-white p-6 rounded-lg shadow-md">
                     <h3 className="text-xl font-semibold mb-4 text-blue-800">{t.titleMultiNat}</h3>
                    <table className="w-full border-collapse text-slate-800">
                        <thead>
                            <tr className="bg-sky-100">
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colComp}</th>
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colNat}</th>
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colInd}</th>
                                <th className="border border-slate-200 p-3 text-left text-slate-800 font-semibold">{t.colProd}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Toshiba Semiconductor</td><td className="border border-slate-200 p-3">{t.nat1}</td><td className="border border-slate-200 p-3">{t.ind1}</td><td className="border border-slate-200 p-3">{t.prod1}</td></tr>
                            <tr className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Canon Prachinburi</td><td className="border border-slate-200 p-3">{t.nat2}</td><td className="border border-slate-200 p-3">{t.ind2}</td><td className="border border-slate-200 p-3">{t.prod2}</td></tr>
                            <tr className="hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Toyotetsu (Thailand)</td><td className="border border-slate-200 p-3">{t.nat3}</td><td className="border border-slate-200 p-3">{t.ind3}</td><td className="border border-slate-200 p-3">{t.prod3}</td></tr>
                            <tr className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Siam Aisin Co., Ltd.</td><td className="border border-slate-200 p-3">{t.nat4}</td><td className="border border-slate-200 p-3">{t.ind4}</td><td className="border border-slate-200 p-3">{t.prod4}</td></tr>
                            <tr className="hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Hitachi Global Storage</td><td className="border border-slate-200 p-3">{t.nat5}</td><td className="border border-slate-200 p-3">{t.ind5}</td><td className="border border-slate-200 p-3">{t.prod5}</td></tr>
                            <tr className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Emerson Electric</td><td className="border border-slate-200 p-3">{t.nat6}</td><td className="border border-slate-200 p-3">{t.ind6}</td><td className="border border-slate-200 p-3">{t.prod6}</td></tr>
                            <tr className="hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Sumisho Global Logistics</td><td className="border border-slate-200 p-3">{t.nat7}</td><td className="border border-slate-200 p-3">{t.ind7}</td><td className="border border-slate-200 p-3">{t.prod7}</td></tr>
                            <tr className="bg-sky-50 hover:bg-sky-100 transition-colors duration-200"><td className="border border-slate-200 p-3">Sunshine Biotech Int'l</td><td className="border border-slate-200 p-3">{t.nat8}</td><td className="border border-slate-200 p-3">{t.ind8}</td><td className="border border-slate-200 p-3">{t.prod8}</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Section>
        
        <Section id="infrastructure" title={t.titleInfrastructure}>
            <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleInfra1}</h3>
                    <p>{t.textInfra1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleInfra2}</h3>
                    <p>{t.textInfra2}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleInfra3}</h3>
                    <p>{t.textInfra3}</p>
                </div>
            </div>
        </Section>

        <Section id="investment" title={t.titleInvestment}>
             <div className="space-y-8 text-slate-700 leading-relaxed">
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleInvest1}</h3>
                    <p>{t.textInvest1}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleInvest2}</h3>
                    <p>{t.textInvest2}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-800">{t.subtitleInvest3}</h3>
                    <p>{t.textInvest3}</p>
                </div>
            </div>
        </Section>

        <Section id="analysis" title={t.analysis.title}>
            <div className="rounded-lg shadow-md overflow-hidden border border-slate-200">
                {analysisSections.map((section, index) => (
                    <AccordionItem 
                        key={index}
                        title={section.title} 
                        isOpen={openAccordionIndex === index} 
                        onClick={() => handleAccordionClick(index)}
                    >
                        <AnalysisRenderer content={section.content} />
                    </AccordionItem>
                ))}
            </div>
        </Section>

        <section id="price" className="mb-28 scroll-mt-24">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">{t.titlePrice}</h2>
            <div className="bg-sky-100/60 border border-sky-200/80 rounded-lg p-8 text-center max-w-3xl mx-auto shadow-lg backdrop-blur-sm">
                <p className="text-lg text-slate-700 mb-6">{t.textPrice}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left my-8">
                    <div className="bg-white/50 p-4 rounded-md border border-slate-200">
                        <label className="text-sm font-semibold text-slate-600 block">{t.pricePerRai}</label>
                        <p className="text-2xl font-bold text-blue-800">1,800,000 THB</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-md border border-slate-200">
                        <label className="text-sm font-semibold text-slate-600 block">{t.totalArea}</label>
                        <p className="text-2xl font-bold text-blue-800">257 Rai</p>
                    </div>
                </div>
                <div className="border-t border-sky-200/80 my-6"></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <label className="text-md font-bold text-slate-800 block text-center">{t.totalPrice}</label>
                    <p className="text-4xl font-extrabold text-blue-900 text-center mt-2">462,600,000 THB</p>
                </div>
                <p className="text-sm text-slate-600 mt-6 font-medium">{t.priceNote}</p>
            </div>
        </section>


        <section id="contact" className="mb-12 scroll-mt-24">
             <div className="text-center pt-12 border-t border-slate-200">
                <h3 className="text-3xl font-bold text-slate-800 mb-6">{t.contactTitle}</h3>
                <div className="mt-6 flex flex-col items-center justify-center gap-y-4 md:flex-row md:gap-x-8 text-slate-700 font-medium">
                    <div className="flex items-center gap-4">
                        <a href="tel:+66818519922" aria-label="Call" className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 group-hover:text-sky-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.758a10.024 10.024 0 006.96 6.96l.758-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </a>
                        <a href="https://wa.me/66818519922" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 group-hover:text-sky-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.847 6.062l-1.011 3.697 3.803-1.002z"/>
                            </svg>
                        </a>
                        <span className="text-lg">+66(0)818519922 (WeChat available)</span>
                    </div>
                    <div className="hidden h-6 w-px bg-slate-300 md:block"></div>
                    <a href="mailto:k.laohasiri@gmail.com" className="flex items-center gap-2 hover:text-sky-700 transition-colors duration-200 group">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 group-hover:text-sky-600 transition-colors" viewBox="0 0 20 20" fill="currentColor">
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