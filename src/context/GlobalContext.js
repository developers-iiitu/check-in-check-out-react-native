import { createContext } from "react";

const GlobalContext = createContext({
    axiosInstance: undefined,
    machineId: "",
    setMachineId: () => { },
    count: 1,
    setCount: () => { },
    geoLocation: "",
    setGeoLocation: () => { },
    setMachineConfigs: () => { },
    user:null,
    setUser:()=>{},
    auth:false,
    setAuth:()=>{}
})

export default GlobalContext