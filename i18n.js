import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from 'locales/en.json'; 
import fr from 'locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
   
    const language = Localization.locale;
    
    callback(language.split('-')[0] || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {}, 
};

i18n
  .use(languageDetector)
  .use(initReactI18next) 
  .init({
    resources,  
    fallbackLng: 'en', 
    compatibilityJSON: 'v3', 
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;
r