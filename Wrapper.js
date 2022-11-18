import { theme } from './src/core/theme'
import {
    StartScreen,
    LoginScreen,
    RegisterScreen,
    ResetPasswordScreen,
} from './src/screens'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useContext, useEffect } from 'react'
import GlobalContext from './src/context/GlobalContext'
import StudentHome from './src/screens/StudentHome'
import Purpose from './src/screens/Purpose'
import StudentQr from './src/screens/StudentQr'
import ProfileStudent from './src/screens/ProfileStudent'
import GateGuard from './src/screens/GateGuard'

const Stack = createStackNavigator()


const Wrapper = () => {
    const { axiosInstance, setMachineId, setGeoLocation, machineId, geoLocation, setMachineConfigs } = useContext(GlobalContext)
    useEffect(() => {
        setMachineConfigs();
    },[])

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
                    <Stack.Screen name="StudentHome" component={StudentHome} />
                    <Stack.Screen name="Purpose" component={Purpose} />
                    <Stack.Screen name="ProfileStudent" component={ProfileStudent} />
                    <Stack.Screen name="StudentQr" component={StudentQr} />
                    <Stack.Screen name="GateGuardHome" component={GateGuard} />
                    <Stack.Screen
                        name="ResetPasswordScreen"
                        component={ResetPasswordScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default Wrapper;