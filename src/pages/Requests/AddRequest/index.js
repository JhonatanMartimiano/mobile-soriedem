import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { View, TouchableOpacity, Text, Modal, TextInput, Dimensions, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { PickerView } from './styles'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import api from '../../../services/api'

export default function AddRequest({ navigation }) {
    const { seller } = useContext(AuthContext)
    const [client, setClient] = useState([])
    const [clientSelected, setClientSelected] = useState(0)
    const [hide, setHide] = useState()
    const [show, setShow] = useState('none')
    const [request, setRequest] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getClients()
    }, [client])

    async function getClients() {
        if (loading == false) {
            const response = await api.post('api/Clients/Clients.php', { id_seller: seller.id }).then((data) => {
                setClient(data.data)
            }).catch()
            setLoading(true)
        }
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
            <TouchableOpacity style={{ backgroundColor: '#039e26', padding: 10, borderRadius: 15, display: hide }} onPress={() => createRequest(seller, clientSelected)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CRIAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#306192', padding: 10, borderRadius: 15, display: show, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('AssociateProducts', {request: request, clientID: clientSelected})}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize:18 }}><FontAwesome name="cart-plus" size={30} color="white" />ADICIONAR ITENS DO PEDIDO</Text>
            </TouchableOpacity>
        </View>
    )

    async function createRequest(seller, client) {
        const response = await api.post('api/Requests/CreateRequest.php', { id_seller: seller.id, id_client: client }).then((data) => {
            if (data.data !== false) {
                setHide('none')
                setShow()
                setRequest(data.data)
            }
        })
    }
}