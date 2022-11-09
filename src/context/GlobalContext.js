import { createContext } from "react";

const GlobalContext = createContext({
    axiosInstance: undefined,
    machineId: "",
    setMachineId: () => { },
    geoLocation: "",
    setGeoLocation: () => { },
    setMachineConfigs: () => { },
    user:null,
    setUser:()=>{},
    auth:false,
    setAuth:()=>{},
    refreshToken:null,
    setRefreshToken:()=>{},
    accessToken:null,
    setAccessToken:()=>{}
})

export default GlobalContext