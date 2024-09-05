import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import './i18n';

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hocs/withTranslation';
import store from 'reduxx/store';
import useInitializeHabits from 'hooks/useInitializeHabits';


function AppWithProvider({ children }) {
  useInitializeHabits();
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