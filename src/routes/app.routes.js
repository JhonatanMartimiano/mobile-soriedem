import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import Dashboard from "../pages/Dashboard"
import Clients from "../pages/Clients"
import Products from "../pages/Products"
import Request from "../pages/Requests"
import AddRequest from "../pages/Requests/AddRequest"
import Logout from "../pages/Logout"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const AppDrawer = createDrawerNavigator()

export default function AppRoutes() {
    return (
        <AppDrawer.Navigator>
            <AppDrawer.Screen name={'Dashboard'} component={Dashboard}></AppDrawer.Screen>
            <AppDrawer.Screen name={'Clientes'} component={Clients}></AppDrawer.Screen>
            <AppDrawer.Screen name={'Produtos'} component={Products}></AppDrawer.Screen>
            <AppDrawer.Screen name={'Pedidos'} component={Request}></AppDrawer.Screen>
            <AppDrawer.Screen name={'AddRequest'} component={AddRequest} options={{
                title: 'Adicionar Pedido'
            }}></AppDrawer.Screen>
            <AppDrawer.Screen name="Sair" component={Logout}></AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}