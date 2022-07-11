import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Dashboard from "../pages/Dashboard"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { View } from "react-native"
import Clients from "../pages/Clients"
import Products from "../pages/Products"
import ProductDetails from "../pages/Products/ProductDetails"
import Requests from "../pages/Requests"
import AddRequest from "../pages/Requests/AddRequest"
import Stock from "../pages/Requests/Stock"
import AssociateProducts from "../pages/Requests/AssociateProducts"
import FinalizeRequest from "../pages/Requests/FinalizeRequest"
import RequestDetails from "../pages/Requests/RequestDetails"
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
        <StackRouter.Navigator screenOptions={{headerShown: true}}>
            <StackRouter.Screen name="Products" component={Products} options={{title: 'Produtos', headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}} ></StackRouter.Screen>
            <StackRouter.Screen name="ProductDetails" component={ProductDetails} options={{title: 'Detalhes do Produto'}} ></StackRouter.Screen>
        </StackRouter.Navigator>
    )
}

export function RequestsNavigations({navigation}) {
    return(
        <StackRouter.Navigator screenOptions={{headerShown: true}}>
            <StackRouter.Screen name="Requests" component={Requests} options={{title: 'Pedidos', headerLeft: () => <View style={{margin: 10}}><FontAwesome name="bars" size={20} color={'black'} onPress={() => navigation.openDrawer()} /></View>}} ></StackRouter.Screen>
            <StackRouter.Screen name="AddRequest" component={AddRequest} options={{title: 'Criar Pedido'}} ></StackRouter.Screen>
            <StackRouter.Screen name="Stock" component={Stock} options={{title: 'Estoque Atual'}} ></StackRouter.Screen>
            <StackRouter.Screen name="AssociateProducts" component={AssociateProducts} options={{title: 'Adicionar Item'}} ></StackRouter.Screen>
            <StackRouter.Screen name="FinalizeRequest" component={FinalizeRequest} options={{title: 'Finalizar Pedido'}} ></StackRouter.Screen>
            <StackRouter.Screen name="RequestDetails" component={RequestDetails} options={{title: 'Detalhes do Pedido'}} ></StackRouter.Screen>
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


