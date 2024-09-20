import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider,  useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hocs/withTranslation';
import { useInitializeApp } from 'hooks';
import { appSelectors, store } from '@redux';


function AppWithProvider({ children }) {

  const lang = useSelector(appSelectors.selectAppLang)
  useInitializeApp(lang);

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