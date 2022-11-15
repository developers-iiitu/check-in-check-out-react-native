import { Text, View, Image, StyleSheet, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import * as LocalAuthentication from 'expo-local-authentication';


export default function Student() {
    let [value, setValue] = useState(null);
    let [auth, setAuth] = useState(false);
    const { accessToken, refreshToken, machineId, axiosInstance } = useContext(GlobalContext);

        async function authenticate(){
            try {
                const result = await LocalAuthentication.authenticateAsync();
            if(result.success){
                setAuth(true);
            }else{
                Alert.alert("Authentication Failed");
            }
            } catch (error) {
                console.log(error);
                Alert.alert("Authentication Failed");
            }
            
        }
        
    const genrateQr = async () => {
        setValue(null);
        await authenticate();
        if(auth){
            try {
                const res = await axiosInstance.post("/api/qr/student/genrate", { purpose: "Una", type: 0 }, {
                    headers: {
                        "x-access-token": accessToken,
                        "x-refresh-token": refreshToken,
                        "machine-id": machineId
                    }
                })
                console.log(res.data);
                setValue(() => res.data.qrCode);
                console.log(auth);
                setAuth(false);
            } catch (error) {
                console.log(error);
    
            }
        }
        
    }

    useEffect(() => {
        console.log(value);
    }, [value])
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                Student
            </Text>
            <View style={styles.instructions}>
                {
                    value!==null && <QRCode
                    value={value}
                    logo={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..'}}
                    logoSize={30}
                    logoBackgroundColor='transparent'
                    size={200}
                  />
                }

            </View>
            <View>
                <Button mode="contained" onPress={genrateQr}>
                    Genrate Qr Code
                </Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    qrCode: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'green'
    }
});