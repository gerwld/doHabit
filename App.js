import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hocs/withTranslation';
import store from 'reduxx/store';
import useInitializeHabits from './src/hooks/useInitializeHabits';
import { useInitializeApp } from './src/hooks';
import i18n from './i18n';
import i18next from 'i18next';

// import { useInitializeHabits, useInitializeApp } from 'hooks';,


function AppWithProvider({ children }) {
  const { lang } = useSelector(({ app }) => ({ lang: app.lang }));

  useInitializeHabits();
  useInitializeApp();

  React.useEffect(() => {
    i18n.locale = lang;
    i18n.changeLanguage(lang);
    i18next.changeLanguage(lang);
    console.log('Language set to:', lang)
  }, [lang])

  return children;
}

export default withTranslation(function RootComponent() {
  return (
    <Provider store={store}>
      <AppWithProvider>
        <Navigation />
        <StatusBar backgroundColor='transparent' translucent={true} />
      </AppWithProvider>
    </Provider>
  )
})