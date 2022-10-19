import { createContext } from "react";

const GlobalContext = createContext({
    axiosInstance: undefined,
    check: "",
    count: 1,
    setCount: () => { }
})

export default GlobalContext