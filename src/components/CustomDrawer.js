import React from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'

export default function CustomDrawer(props)
{
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Image source={require('../assets/img/logo.png')} style={styles.logo}></Image>
            </View>

            <DrawerItemList {...props}></DrawerItemList>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 85,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        resizeMode: 'contain',
        width: '90%'
    }
})