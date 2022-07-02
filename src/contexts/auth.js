import React, { useState, useEffect, createContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"

export const AuthContext = createContext({})

export default function AuthProvider({ children }) {
    const [seller, setSeller] = useState(null)

    useEffect(() => {
        async function loadStorage() {
            const storageSeller = await AsyncStorage.getItem('Auth_Seller')

            if (storageSeller) {
                setSeller(JSON.parse(storageSeller))
            }
        }

        loadStorage()

    }, [])

    async function login(email, password) {
        const response = await api.post(`api/Auth/Login.php`, {email: email, password: password}).then((data) => {
            if (data.data.seller && data.data.password_verify) {
                setSeller(data.data.seller)
                storageSeller(data.data.seller)
            }
        })
        
    }

    async function storageSeller(data) {
        await AsyncStorage.setItem('Auth_Seller', JSON.stringify(data))
    }

    async function logout() {
        await AsyncStorage.clear().then(() => {
            setSeller(null)
        })
    }

    return (
        <AuthContext.Provider value={{ signed: !!seller, seller, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}