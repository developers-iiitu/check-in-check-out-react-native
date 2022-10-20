import axios from "axios"
import { useState } from "react"
import { getData, storeData } from "../asyncStorage/storageFunctions"
import uuid from 'react-native-uuid';

export const useContextData = () => {

    const axiosInstance = axios.create({
        baseURL: 'https://check-in-check-out-backend.up.railway.app',
        headers: {
            "x-auth-token": 'token',
            "Content-Type": "application/json",
        },
    })

    let check = '12'
    let [machineId, setMachineId] = useState("")
    const [count, setCount] = useState(1)
    let [geoLocation, setGeoLocation] = useState("")
    let [auth,setAuth]=useState(false);
    let [user,setUser]=useState(null);

    const setMachineConfigs = async () => {
        let machineId = await getData("machineId");
        if (machineId === null) {
            machineId = uuid.v4();
            storeData("machineId", machineId);
        }
        console.log(machineId);
        setMachineId(() => machineId);

        try {
            let res = await axios.get("http://ipwho.is/");
            console.log(res.data)
            setGeoLocation(() => JSON.stringify(res.data))
        } catch (error) {
            console.log(error.response.data);
        }

    }

    return {
        axiosInstance,
        check,
        count, setCount,
        machineId, setMachineId,
        geoLocation, setGeoLocation,
        setMachineConfigs,
        auth,setAuth,
        user,setUser
    }
}