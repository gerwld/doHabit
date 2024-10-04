import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider,  useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hocs/withTranslation';
import { useInitializeApp, useInitializeAppDemo, useOrientationLock } from 'hooks';
import { appSelectors, store } from '@redux';
import i18n from './i18n';

import * as SplashScreen from 'expo-splash-screen';

// keeps the splash screen visible while app fetch resources
SplashScreen.preventAutoHideAsync();


function AppWithProvider({ children }) {
  useOrientationLock();
  
  const lang = useSelector(appSelectors.selectAppLang)
  // useInitializeApp(lang);
  useInitializeAppDemo(lang);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang])

  return children;
}

export default withTranslation(function RootComponent() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <AppWithProvider>
        <Navigation />
        <StatusBar translucent style="light" />
      </AppWithProvider>
      </GestureHandlerRootView>
    </Provider>
  )
})