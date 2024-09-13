import React from 'react';
import { Provider, useSelector } from 'react-redux';
import {StatusBar} from "react-native";

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hocs/withTranslation';
import store from '@redux/store';
import { useInitializeApp } from 'hooks';
import i18n from './i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { appSelectors } from '@redux';


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
        <StatusBar backgroundColor='transparent' translucent={true} />
      </AppWithProvider>
      </GestureHandlerRootView>
    </Provider>
  )
})