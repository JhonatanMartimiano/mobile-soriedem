import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Dashboard from '../pages/Dashboard'
import Clients from '../pages/Clients'
import Requests from '../pages/Requests'
import CustomDrawer from '../components/CustomDrawer'
import Feather from 'react-native-vector-icons/Feather'
import StackRoutes from './stackRoutes'

const Drawer = createDrawerNavigator()

export default function Routes ()
{
    return (
        <Drawer.Navigator drawerContent={CustomDrawer}>
            <Drawer.Screen name={'Dashboard'} component={Dashboard} options={{
                drawerIcon: ({color, size}) => {
                    return <Feather name={'home'} color={color} size={size}></Feather>
                }
            }}></Drawer.Screen>
            <Drawer.Screen name={'Clientes'} component={Clients} options={{
                drawerIcon: ({color, size}) => {
                    return <Feather name={'users'} color={color} size={size}></Feather>
                }
            }}></Drawer.Screen>
            <Drawer.Screen name={'Cliente'} component={StackRoutes}></Drawer.Screen>
            <Drawer.Screen name={'Pedidos'} component={Requests} options={{
                drawerIcon: ({color, size}) => {
                    return <Feather name={'tablet'} color={color} size={size}></Feather>
                }
            }}></Drawer.Screen>
        </Drawer.Navigator>
    )
}