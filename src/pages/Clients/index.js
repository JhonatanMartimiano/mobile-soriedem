import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Text, FlatList, View, Image, Pressable } from 'react-native'
import { Container, ClientDiv, ClientDivFlex, ClientTextKey, ClientDivInfo } from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Clients() {
    const [client, setClient] = useState([])
    const {seller} = useContext(AuthContext)

    useEffect(() => {
        loadAPI()
    }, [client])

    async function loadAPI() {
        const response = await api.post(`api/Clients/Clients.php`, {id_seller: seller.id}).then((data) => {
            setClient(data.data)
        })
    }

    return (
        <Container>
            <FlatList data={client} renderItem={({ item }) => <ListItem client={item}></ListItem>} keyExtractor={item => item.id.toString()}></FlatList>
        </Container>
    )
}

function ListItem({ client }) {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('Cliente')}>
            <ClientDiv>
                <ClientDivInfo>
                    <View>
                        <ClientDivFlex>
                            <ClientTextKey>Razão Social</ClientTextKey>
                            <Text>{client.corporate_name}</Text>
                        </ClientDivFlex>
                        <ClientDivFlex>
                            <ClientTextKey>Nome Contato</ClientTextKey>
                            <Text>{client.contact_name}</Text>
                        </ClientDivFlex>
                    </View>
                </ClientDivInfo>
            </ClientDiv>
        </Pressable>
    )
}