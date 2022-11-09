import axios from "axios"
import { useState } from "react"
import { getData, storeData } from "../asyncStorage/storageFunctions"
import uuid from 'react-native-uuid';
import {DevSettings} from 'react-native';

export const useContextData = () => {

    const axiosInstance = axios.create({
        baseURL: 'http://192.168.137.1:4000',
        headers: {
            "x-auth-token": 'token',
            "Content-Type": "application/json",
        },
    })

   
    let [machineId, setMachineId] = useState("")
    let [geoLocation, setGeoLocation] = useState("")
    let [auth,setAuth]=useState(false);
    let [user,setUser]=useState(null);
    let [refreshToken,setRefreshToken]=useState(null);
    let [accessToken,setAccessToken]=useState(null);
    let setMachineConfigs = async () =>{
        let machineIdL = await getData("machineId");
        if(machineIdL===null){
            machineIdL=uuid.v4();
            storeData("machineId",machineIdL);
        }
       
        setMachineId(()=>
            machineIdL
        );
        let refreshTokenL = await getData("accessToken");
        if(refreshTokenL!==null){
            setRefreshToken(()=>refreshTokenL)
            // auto login
        }
        try {
            const res = await axios.get("http://ipwho.is/");
            
            setGeoLocation(()=>JSON.stringify(res.data))
           
        } catch (error) {
            console.log(error);
            DevSettings.reload("Geo Location Not found");
        }
       
    }

    return {
        axiosInstance,
        machineId, setMachineId,
        geoLocation, setGeoLocation,
        setMachineConfigs,
        auth,setAuth,
        user,setUser,
        accessToken,setAccessToken,
        refreshToken,setRefreshToken
    }
}