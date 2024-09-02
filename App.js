import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './screens/Navigation';
import './i18n';
import withTranslation from './hoc/withTranslation';
import { Provider } from 'react-redux';
import store from './redux/store';


export default withTranslation(function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar backgroundColor='transparent'  translucent={true} />
    </Provider>
  )
})



