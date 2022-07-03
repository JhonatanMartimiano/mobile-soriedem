import React, {useContext} from "react"
import { AuthContext } from "../contexts/auth"
import AuthRoutes from "./auth.routes"
import DrawerRoutes from "./drawer.routes"

export default function Routes()
{
    const {signed} = useContext(AuthContext)

    return (
        signed ? <DrawerRoutes></DrawerRoutes> : <AuthRoutes></AuthRoutes>
    )
}