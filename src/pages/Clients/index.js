import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Text, FlatList, View, Image, Pressable } from 'react-native'
import { Container, ClientDiv, ClientDivFlex, ClientTextKey, ClientDivInfo } from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Clients() {
    const [client, setClient] = useState([])
    const { seller } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAPI()
    }, [client])

    async function loadAPI() {
        const response = await api.post(`api/Clients/ClientsRequest.php`, { id_seller: seller.id }).then((data) => {
            setClient(data.data)
            setLoading(false)
        })
    }

    if (loading == false) {
        function ListItem({ client }) {
            const navigation = useNavigation()

            let status = null

            if (client.status == 1) {
                status = 'Pendente'
            } else if (client.status == 2) {
                status = 'Aprovado'
            } else if (client.status == 3) {
                status = 'Cancelado'
            }

            let created_at = client.created_at
            let dateDB = new Date(created_at.split(' ')[0])
            let day = dateDB.getDate().toString().length > 1 ? dateDB.getDate() + 1 : `0${dateDB.getDate() + 1}`
            let month = dateDB.getMonth().toString().length > 1 ? dateDB.getMonth() + 1 : `0${dateDB.getMonth() + 1}`
            let year = dateDB.getFullYear()
            let date = `${day}/${month}/${year}`

            return (
                <Pressable onPress={() => navigation.navigate('Cliente')}>
                    <ClientDiv>
                        <ClientDivInfo>
                            <View>
                                <View>
                                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textTransform: 'uppercase' }}>{client.corporate_name}</Text>
                                    <Text style={{ color: 'white', fontSize: 20 }}>CNPJ: {client.cnpj}</Text>
                                    <Text style={{ color: 'white', fontSize: 20 }}>ÚLT PED: {client.request_number} | {date} | {status}</Text>
                                </View>
                            </View>
                        </ClientDivInfo>
                    </ClientDiv>
                </Pressable>
            )
        }

        return (
            <Container>
                <FlatList data={client} renderItem={({ item }) => <ListItem client={item}></ListItem>} keyExtractor={item => item.id}></FlatList>
            </Container>
        )
    } else {
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        )
    }
}