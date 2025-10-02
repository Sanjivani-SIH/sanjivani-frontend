import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    // Header
    'ministry.tribal.affairs': 'Ministry of Tribal Affairs',
    'tribalrights360': 'Sanjivani',
    'language.toggle': 'हिं',
    'high.contrast': 'High Contrast',
    'skip.to.content': 'Skip to main content',
    
    // Navigation
    'nav.home': 'Home',
    'nav.fra.atlas': 'FRA Atlas',
    'nav.insights': 'Insights Dashboard',
    'nav.digitization': 'Digitization & AI',
    'nav.decision.support': 'Decision Support',
    'nav.schemes': 'Schemes & Benefits',
    'nav.resources': 'Resources',
    'nav.about': 'About & Governance',
    'nav.help': 'Help & Feedback',
    'nav.login': 'Secure Login',
    
    // Home Page
    'hero.title': 'Empowering Forest Rights through Data & Maps',
    'hero.subtitle': 'AI-powered FRA Atlas and Decision Support for transparent, inclusive governance.',
    'cta.explore.atlas': 'Explore FRA Atlas',
    'cta.view.insights': 'View Insights',
    'cta.learn.how': 'Learn How It Works',
    
  'section.what.is': 'What Is Sanjivani?',
    'section.key.capabilities': 'Key Capabilities',
    'section.states.focus': 'States in Focus',
    'section.impact.glance': 'Impact at a Glance',
    'section.latest.updates': 'Latest Updates',
    
    'capability.rightsview': 'RightsView WebGIS',
    'capability.rightsview.desc': 'Interactive IFR/CR/CFR layers & timelines',
    'capability.docflow': 'DocFlow OCR-NER',
    'capability.docflow.desc': 'From scanned records to structured data',
    'capability.assetsense': 'AssetSense Remote Sensing',
    'capability.assetsense.desc': 'Land use/cover & change detection',
    'capability.dss': 'DSS Prism',
    'capability.dss.desc': 'Scheme matching & intervention prioritization',
    
    // Footer
    'footer.accessibility': 'Accessibility',
    'footer.copyright': 'Copyright Policy',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.rti': 'RTI',
    'footer.help': 'Help',
    'footer.faq': 'FAQ',
    'footer.disclaimer': 'Maps and statistics on the public portal are indicative. Official records maintained by competent authorities shall prevail.',
    
    // Common
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    'download': 'Download',
    'search': 'Search',
    'filter': 'Filter',
    'export': 'Export',
    'view.more': 'View More',
  },
  hi: {
    // Header
    'ministry.tribal.affairs': 'जनजातीय कार्य मंत्रालय',
    'tribalrights360': 'संजीवनी',
    'language.toggle': 'EN',
    'high.contrast': 'उच्च कंट्रास्ट',
    'skip.to.content': 'मुख्य सामग्री पर जाएं',
    
    // Navigation
    'nav.home': 'होम',
    'nav.fra.atlas': 'एफआरए एटलस',
    'nav.insights': 'इनसाइट्स डैशबोर्ड',
    'nav.digitization': 'डिजिटाइजेशन और एआई',
    'nav.decision.support': 'निर्णय सहायता',
    'nav.schemes': 'योजनाएं और लाभ',
    'nav.resources': 'संसाधन',
    'nav.about': 'के बारे में और गवर्नेंस',
    'nav.help': 'सहायता और फीडबैक',
    'nav.login': 'सुरक्षित लॉगिन',
    
    // Home Page
    'hero.title': 'डेटा और मैप्स के माध्यम से वन अधिकारों को सशक्त बनाना',
    'hero.subtitle': 'पारदर्शी, समावेशी गवर्नेंस के लिए एआई-पावर्ड एफआरए एटलस और निर्णय सहायता।',
    'cta.explore.atlas': 'एफआरए एटलस एक्सप्लोर करें',
    'cta.view.insights': 'इनसाइट्स देखें',
    'cta.learn.how': 'यह कैसे काम करता है जानें',
    
  'section.what.is': 'संजीवनी क्या है?',
    'section.key.capabilities': 'मुख्य क्षमताएं',
    'section.states.focus': 'फोकस में राज्य',
    'section.impact.glance': 'एक नजर में प्रभाव',
    'section.latest.updates': 'नवीनतम अपडेट',
    
    'capability.rightsview': 'राइट्सव्यू वेबजीआईएस',
    'capability.rightsview.desc': 'इंटरैक्टिव आईएफआर/सीआर/सीएफआर लेयर्स और टाइमलाइन',
    'capability.docflow': 'डॉकफ्लो ओसीआर-एनईआर',
    'capability.docflow.desc': 'स्कैन किए गए रिकॉर्ड से संरचित डेटा तक',
    'capability.assetsense': 'एसेटसेंस रिमोट सेंसिंग',
    'capability.assetsense.desc': 'भूमि उपयोग/कवर और परिवर्तन का पता लगाना',
    'capability.dss': 'डीएसएस प्रिज्म',
    'capability.dss.desc': 'योजना मैचिंग और हस्तक्षेप प्राथमिकता',
    
    // Footer
    'footer.accessibility': 'पहुंच',
    'footer.copyright': 'कॉपीराइट नीति',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'नियम और शर्तें',
    'footer.rti': 'आरटीआई',
    'footer.help': 'सहायता',
    'footer.faq': 'एफएक्यू',
    'footer.disclaimer': 'सार्वजनिक पोर्टल पर मानचित्र और आंकड़े संकेतक हैं। सक्षम प्राधिकारियों द्वारा बनाए गए आधिकारिक रिकॉर्ड मान्य होंगे।',
    
    // Common
    'loading': 'लोड हो रहा है...',
    'error': 'त्रुटि',
    'success': 'सफलता',
    'download': 'डाउनलोड',
    'search': 'खोजें',
    'filter': 'फिल्टर',
    'export': 'निर्यात',
    'view.more': 'और देखें',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};