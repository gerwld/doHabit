// hocs/withTranslation.js
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGE_KEY = 'user-language';

const withTranslation = (WrappedComponent) => {
  return function TranslatedComponent(props) {
    const [language, setLanguage] = useState('en');

    useEffect(() => {
      const loadLanguage = async () => {
        let storedLanguage = null;

        if (Platform.OS === 'web') {
          storedLanguage = localStorage.getItem(LANGUAGE_KEY);
        } else {
          storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        }

        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
          setLanguage(storedLanguage);
        } else {
          const defaultLanguage = i18n.language || 'en';
          setLanguage(defaultLanguage);
        }
      };

      loadLanguage();
    }, []);

    const changeLanguage = async (lng) => {
      i18n.changeLanguage(lng);
      setLanguage(lng);

      if (Platform.OS === 'web') {
        localStorage.setItem(LANGUAGE_KEY, lng);
      } else {
        await AsyncStorage.setItem(LANGUAGE_KEY, lng);
      }
    };

    return <WrappedComponent {...props} language={language} changeLanguage={changeLanguage} />;
  };
};

export default withTranslation;
