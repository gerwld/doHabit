import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Navigation } from './screens/Navigation';


export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar backgroundColor='transparent'  translucent={true} />
    </>
  )
}



