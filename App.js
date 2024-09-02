import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './screens/Navigation';
import './i18n';
import withTranslation from './hoc/withTranslation';


export default withTranslation(function App() {
  return (
    <>
      <Navigation />
      <StatusBar backgroundColor='transparent'  translucent={true} />
    </>
  )
})



