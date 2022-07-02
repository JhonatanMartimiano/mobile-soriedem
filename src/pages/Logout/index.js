import React, { useContext, useEffect } from "react"
import { Text, View } from "react-native"
import { AuthContext } from "../../contexts/auth"

export default function Logout() {
    const {logout} = useContext(AuthContext)
    useEffect(() => {
        logout()
    }, [])

    return(true)
}