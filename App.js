import React from 'react';
import { Provider, useSelector } from 'react-redux';
import {StatusBar} from "react-native";

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hocs/withTranslation';
import store from '@redux/store';
import { useInitializeApp } from 'hooks';
import i18n from './i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


function AppWithProvider({ children }) {
  const { lang, theme } = useSelector(({ app }) => ({ lang: app.lang, theme: app.theme }));

  React.useEffect(() => {
    i18n.locale = lang;
    i18n.changeLanguage(lang);
  }, [lang])

  useInitializeApp();

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