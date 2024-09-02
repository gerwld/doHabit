import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform, I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    if (Platform.OS === 'web') {
      // For web, use the browser's language setting
      const language = navigator.language || navigator.userLanguage || 'en';
      callback(language.split('-')[0]);
    } else {
      // For React Native, use react-native-localize
      const bestLanguage = RNLocalize.findBestAvailableLanguage(Object.keys(resources));
      callback(bestLanguage?.languageTag || 'en');
    }
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
      escapeValue: false, // React already safe from XSS
    },
    react: {
      useSuspense: false, // For handling lazy-loaded translations
    },
  });

export default i18n;
