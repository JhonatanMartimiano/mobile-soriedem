import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import StackRoutes from "./stack.routes"
import { ClientsNavigations } from "./stack.routes"
import { ProductsNavigations } from "./stack.routes"
import { RequestsNavigations } from "./stack.routes"
import { LogoutNavigations } from "./stack.routes"

const AppDrawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <AppDrawer.Navigator screenOptions={{headerShown: false}}>
            <AppDrawer.Screen name="DashboardDrawer" component={StackRoutes} options={{title: 'Dashboard'}}></AppDrawer.Screen>
            <AppDrawer.Screen name="ClientsDrawer" component={ClientsNavigations} options={{title: 'Clientes'}}></AppDrawer.Screen>
            <AppDrawer.Screen name="ProductsDrawer" component={ProductsNavigations} options={{title: 'Produtos'}}></AppDrawer.Screen>
            <AppDrawer.Screen name="RequestsDrawer" component={RequestsNavigations} options={{title: 'Pedidos'}}></AppDrawer.Screen>
            <AppDrawer.Screen name="LogoutDrawer" component={LogoutNavigations} options={{title: 'Sair'}}></AppDrawer.Screen>
        </AppDrawer.Navigator>
    )
}