import React, { useContext, useEffect } from 'react'
import { usePreventScreenCapture } from 'expo-screen-capture';

import GlobalContext from './src/context/GlobalContext'
import { useContextData } from './src/context/useContext'
import Wrapper from './Wrapper'

export default function App() {
  usePreventScreenCapture();
  const context = useContextData()
  return (
    
    <GlobalContext.Provider value={context}>
      <Wrapper />
    </GlobalContext.Provider>
  
  )
}