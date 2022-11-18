import { Text, View, Image, StyleSheet, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Button from "../components/Button";
import { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import * as LocalAuthentication from 'expo-local-authentication';
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import { Skeleton } from '@rneui/themed';
import { LinearGradient } from "react-native-svg";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import TextInput from "../components/TextInput";
import { PaperSelect } from 'react-native-paper-select';
export default function StudentQr({ navigation }) {
    const { purpose } = useContext(GlobalContext);
    let [value, setValue] = useState(null);
    let [auth, setAuth] = useState(false);
    let [status,setStatus] = useState(null);
   
    const [item, setItem] = useState({
        value: '',
        list: [],
        selectedList: [],
        error: '',
    });
    const addItems = () => {
        let arr = [];
        purpose.map((item, index) => {
            arr = [...arr, { _id: (index + 1).toString(), value: item }]
        })
        setItem({ ...item, list: arr })
    }
    useEffect(() => {
        addItems();
        checkStatus();
    }, [])
    const [loading, setLoading] = useState(false);
    const { accessToken, refreshToken, machineId, axiosInstance } = useContext(GlobalContext);
   
    async function authenticate() {
        setAuth(()=>false);
        try {
            const result = await LocalAuthentication.authenticateAsync();
            
            if (result.success) {
                console.log(result);
                setAuth(()=> true);
                console.log(auth);
            } else {
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
        if (auth) {
            setLoading(true);
            try {
                
                const res = await axiosInstance.post("/api/qr/student/genrate", { purpose: item.value, type: 0 }, {
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
                setLoading(false);
            } catch (error) {
                
                console.log(error);
                setLoading(false);

            }
        }
        setLoading(false);

    }
    const checkStatus = async()=>{
        setLoading(true);
        try {
        const res = await axiosInstance.get("/api/qr/student/status", {
            headers: {
                "x-access-token": accessToken,
                "x-refresh-token": refreshToken,
                "machine-id": machineId
            }
            
        }) 
        setStatus(()=>res.data.out);
        setLoading(false);
        } catch (error) {
            console.log(error);
            alert("try again later");
            setLoading(false);  
        }
            
        }
    
    useEffect(() => {
        console.log(value);
    }, [value])
    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Entery for 
                    {status?" Incoming":" Outgoing"}
                </Text>
                <View style={styles.instructions}>
                    {
                        loading ?
                            <ActivityIndicator size={200} animating={true} color={MD2Colors.blue500} /> :
                            value !== null ? <QRCode
                                value={value}
                                logo={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..' }}
                                logoSize={30}
                                logoBackgroundColor='transparent'
                                size={200}
                            /> : <Skeleton animation="wave" LinearGradientComponent={LinearGradient} width={200} height={200} />
                    }

                </View>
                <View style={styles.select}>
                {
                    status===false && 
                    <PaperSelect
                        label="Select Purpose"
                        
                        value={item.value}
                        onSelection={(value) => {
                            setItem({
                                ...item,
                                value: value.text,
                                selectedList: value.selectedList,
                                error: '',
                            });
                        }}
                        arrayList={[...item.list]}
                        selectedArrayList={[...item.selectedList]}
                        errorText={item.error}
                        multiEnable={false}
                    />
                }
                    
                </View>
                <View style={styles.select}>

                    <Button disabled={status==true?false:item.value.length===0} mode="contained" onPress={genrateQr}>
                        Genrate Qr Code
                    </Button>
                </View>

            </View>
        </Background>
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
    },
    select:{
        width:200,
    }
});