import { useContext, useEffect, useState } from "react";
import { Text, View,StyleSheet } from "react-native";
import Button from "../components/Button";
import {BarCodeScanner} from 'expo-barcode-scanner'
import GlobalContext from "../context/GlobalContext";

export default function GateGuard() {
    const {axiosInstance,accessToken,refreshToken,machineId} = useContext(GlobalContext);
    const [hasCameraPermission,setHasCameraPermission]=useState(null);
    const [scanned,setScanned]=useState(false);
    const [text,setText]=useState('not yet scanned');
    const askForCameraPermission = async () => {
        try {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasCameraPermission(status === 'granted'?true:false);
        } catch (error) {
            alert("error");
            console.log(error);
        }
        
    }
    const handleBarCodeScanned = ({type,data})=>{
       
        if(text!==data && data.length===24){
            console.log(data);
            console.log(data.length);
            setText(data);
        }
        
        
    }
    const handleScanRequest = async(data)=>{
        let gateNo =0;
        try {
            const res = await axiosInstance.post("/api/qr/student/scan",{qrCodeSessionId:data,gateNo:gateNo},{
                headers:{
                    "x-access-token":accessToken,
                    "x-refresh-token":refreshToken,
                    "machine-id":machineId
                }
            })
            alert(res.data.msg);
            console.log(res.data);
        } catch (error) {
            alert(error.response.data.msg);
            console.log(error);
        }
    }
    useEffect(()=>{
        askForCameraPermission();
    },[])
    useEffect(()=>{
       alert(text);
       handleScanRequest(text);
       
    },[text])
    if(hasCameraPermission===null){
        return (
            <View>
                <Text>
                    Requesting for camera permission
                </Text>
            </View>
        )
    }

    if(hasCameraPermission===false){
        return (
            <View>
                <Text>
                   No access
                </Text>
                <Button mode="contained" onPress={askForCameraPermission}>
                Allow Camera
            </Button>
            </View>

        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
            <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={{height:400,width:400}} />

            </View>
            {/* <Text style={styles.maintext}>
                {text}
            </Text> */}
            {scanned && <Button onPress={()=> setScanned(false)}>Scan Again</Button>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
      barcodebox:{
           
            alignItems:'center',
            justifyContent:'center',
            height:300,
            width:300,
            overflow:'hidden',
            borderRadius:30,
            backgroundColor:'tomato'
      },
      maintext:{
        fontSize:20,
        margin:20
      }
})