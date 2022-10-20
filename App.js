import React, { useContext, useEffect } from 'react'
import onLoad from './onLoad'

import GlobalContext from './src/context/GlobalContext'
import { useContextData } from './src/context/useContext'
<<<<<<< HEAD
import Wrapper from './Wrapper'
=======

const Stack = createStackNavigator()

const Wrapper = () => {
  const { axiosInstance,check } = useContext(GlobalContext)
  return (

    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
>>>>>>> 51477567c2749991c0515868f8084ea7a1017a8f

export default function App() {
  const context = useContextData()
  return (
    <GlobalContext.Provider value={context}>
      <Wrapper />
    </GlobalContext.Provider>
  )
}