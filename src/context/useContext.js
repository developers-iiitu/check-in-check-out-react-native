import axios from "axios"
import { useState } from "react"

export const useContextData = () => {

    const axiosInstance = axios.create({
        baseURL: 'https://check-in-check-out-backend.up.railway.app',
        headers: {
            "x-auth-token": 'token',
            "Content-Type": "application/json",
        },
    })

    let check = '12'

    const [count, setCount] = useState(1)

    return {
        axiosInstance,
        check,
        count, setCount
    }
}