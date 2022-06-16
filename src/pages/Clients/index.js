import React, {useEffect, useState} from 'react'
import {Text, FlatList, View, Image, Pressable} from 'react-native'
import {Container, ClientDiv, ClientDivFlex, ClientTextKey, ClientDivInfo} from './styles'
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'

export default function Clients ()
{
    const baseURL = 'http://192.168.100.41/'
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        loadAPI()
    }, [])

    async function loadAPI () {
        if (loading) return
        setLoading(true)
        const response = await axios.post(`${baseURL}api/Clients/Clients.php`)
        console.log(response.data.clients)
        setData([...data, ...response.data.clients])
        setLoading(false)
    }

    return (
        <Container>
            <FlatList data={data} renderItem={({item}) => <ListItem data={item}></ListItem>} keyExtractor={item => item.id}></FlatList>
        </Container>
    )
}

function ListItem ({data})
{
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('Cliente')}>
            <ClientDiv>
                <ClientDivInfo>
                    <View>
                        <ClientDivFlex>
                            <ClientTextKey>Razão Social</ClientTextKey>
                            <Text>{data.corporate_name}</Text>
                        </ClientDivFlex>
                        <ClientDivFlex>
                            <ClientTextKey>Nome Contato</ClientTextKey>
                            <Text>{data.contact_name}</Text>
                        </ClientDivFlex>
                    </View>
                </ClientDivInfo>
            </ClientDiv>
        </Pressable>
    )
}