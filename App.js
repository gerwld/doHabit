import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import './i18n';

import { Navigation } from 'screens/Navigation';
import withTranslation from 'hoc/withTranslation';
import store from 'redux/store';


export default withTranslation(function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar backgroundColor='transparent'  translucent={true} />
    </Provider>
  )
})



