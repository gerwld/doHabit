// hocs/withTranslation.js
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { PLATFORM } from '@constants';


const LANGUAGE_KEY = 'user-language';

const withTranslation = (WrappedComponent) => {
  return function TranslatedComponent(props) {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
      const loadLanguage = async () => {
        let storedLanguage = null;

        if (PLATFORM === 'web') {
          storedLanguage = localStorage.getItem(LANGUAGE_KEY);
        } else {
          storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        }

        if (storedLanguage) {
          i18next.changeLanguage(storedLanguage);
          setLanguage(storedLanguage);
        } else {
          const defaultLanguage = i18next.language || 'en';
          setLanguage(defaultLanguage);
        }
      };

      loadLanguage();
    }, []);

    const changeLanguage = async (lng) => {
      i18next.changeLanguage(lng);
      setLanguage(lng);

      if (PLATFORM === 'web') {
        localStorage.setItem(LANGUAGE_KEY, lng);
      } else {
        await AsyncStorage.setItem(LANGUAGE_KEY, lng);
      }
    };

    return <WrappedComponent {...props} language={language} changeLanguage={changeLanguage} />;
  };
};

export default withTranslation;
