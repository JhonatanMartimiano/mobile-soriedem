import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Client from '../pages/Clients/Client'

const Stack = createStackNavigator()

export default function StackRoutes ()
{
    return (
        <Stack.Navigator>
            <Stack.Screen name={'ClienteStack'} component={Client} options={{
                headerShown: false
            }}></Stack.Screen>
        </Stack.Navigator>
    )
}