import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { View, TouchableOpacity, Text, Modal, TextInput, Dimensions, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { PickerView } from './styles'
import api from '../../../services/api'

export default function AddRequest({ navigation }) {
    const { seller } = useContext(AuthContext)
    const [client, setClient] = useState([])
    const [clientSelected, setClientSelected] = useState(0)
    const [hide, setHide] = useState()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getClients()
    }, [client])

    async function getClients() {
        if (loading == false) {
            const response = await api.post('api/Clients/Clients.php', { id_seller: seller.id }).then((data) => {
                setClient(data.data)
            }).catch(error => console.log(error))
            setLoading(true)
        }
    }

    async function goToStock() {
        navigation.navigate('Stock', {id_client: clientSelected})
    }

    let listClients = null;

    if (client) {
        listClients = client.map((v, k) => {
            return <Picker.Item label={v.corporate_name} key={k} value={v.id}></Picker.Item>
        })
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ color: '#000', fontSize: 18, marginBottom: -15 }}>Selecionar cliente</Text>
            <PickerView>
                <Picker style={{ width: '100%' }} selectedValue={clientSelected} onValueChange={(itemValue, itemIndex) => setClientSelected(itemValue)}>
                    {listClients}
                </Picker>
            </PickerView>
            <TouchableOpacity style={{ backgroundColor: '#039e26', padding: 10, borderRadius: 15, display: hide }} onPress={() => goToStock()}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CRIAR PEDIDO</Text>
            </TouchableOpacity>
        </View>
    )
}