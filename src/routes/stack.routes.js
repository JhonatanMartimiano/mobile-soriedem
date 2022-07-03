import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Dashboard from "../pages/Dashboard"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { View } from "react-native"
import Clients from "../pages/Clients"
import Products from "../pages/Products"
import Requests from "../pages/Requests"
import AddRequest from "../pages/Requests/AddRequest"
import AssociateProducts from "../pages/Requests/AssociateProducts"
import Logout from "../pages/Logout"

const StackRouter = createStackNavigator()

export default function StackRoutes({navigation}) {
    return (
        <StackRouter.Navigator screenOptions={{headerShown: true, headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}}>
            <StackRouter.Screen name="Dashboard" component={Dashboard}></StackRouter.Screen>
        </StackRouter.Navigator>
    )
}

export function ClientsNavigations({navigation}) {
    return(
        <StackRouter.Navigator screenOptions={{title: 'Clientes', headerShown: true, headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}}>
            <StackRouter.Screen name="Clients" component={Clients} ></StackRouter.Screen>
        </StackRouter.Navigator>
    )
}

export function ProductsNavigations({navigation}) {
    return(
        <StackRouter.Navigator screenOptions={{title: 'Produtos', headerShown: true, headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}}>
            <StackRouter.Screen name="Products" component={Products} ></StackRouter.Screen>
        </StackRouter.Navigator>
    )
}

export function RequestsNavigations({navigation}) {
    return(
        <StackRouter.Navigator screenOptions={{headerShown: true}}>
            <StackRouter.Screen name="Requests" component={Requests} options={{title: 'Pedidos', headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}} ></StackRouter.Screen>
            <StackRouter.Screen name="AddRequest" component={AddRequest} options={{title: 'Criar Pedido'}} ></StackRouter.Screen>
            <StackRouter.Screen name="AssociateProducts" component={AssociateProducts} options={{title: 'Adicionar Item'}} ></StackRouter.Screen>
        </StackRouter.Navigator>
    )
}

export function LogoutNavigations({navigation}) {
    return(
        <StackRouter.Navigator screenOptions={{title: 'Sair', headerShown: true, headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}}>
            <StackRouter.Screen name="Logout" component={Logout} ></StackRouter.Screen>
        </StackRouter.Navigator>
    )
}


