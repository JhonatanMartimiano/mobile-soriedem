import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { Text, FlatList, View, Pressable } from 'react-native'
import { Container, RequestDiv, RequestDivInfo, ButtonAdd, ButtonAddText } from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../../services/api'

export default function RequestsFilter(props) {
    const { seller } = useContext(AuthContext)
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getRequestsFilter()
    }, [requests])

    async function getRequestsFilter() {
        const response = await api.get(`api/Requests/RequestsFilter.php?id_seller=${seller.id}&status=${props.route.params.status}`).then((data) => {
            setRequests(data.data)
            setLoading(false)
        })
    }

    const navigation = useNavigation()

    if (loading == false) {
        return (
            <Container>
                <ButtonAdd onPress={() => navigation.push('AddRequest')}>
                    <ButtonAddText>ADICIONAR PEDIDO</ButtonAddText>
                </ButtonAdd>
                <FlatList data={requests} renderItem={({ item }) => <ListItem request={item}></ListItem>} keyExtractor={item => item.id}></FlatList>
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

function ListItem({ request }) {
    const navigation = useNavigation()
    let status = null

    if (request.status == 1) {
        status = 'Pendente'
    } else if (request.status == 2) {
        status = 'Aprovado'
    } else if (request.status == 3) {
        status = 'Cancelado'
    }

    let dateDB = new Date(request.created_at.split(' ')[0])
    let day = dateDB.getDate().toString().length > 1 ? dateDB.getDate() + 1 : `0${dateDB.getDate() + 1}`
    let month = dateDB.getMonth().toString().length > 1 ? dateDB.getMonth() + 1 : `0${dateDB.getMonth() + 1}`
    let year = dateDB.getFullYear()
    let date = `${day}/${month}/${year}`

    return (
        <Pressable onPress={() => navigation.navigate('RequestDetails', { requestID: request.id, request_number: request.request_number })}>
            <RequestDiv>
                <RequestDivInfo>
                    <View>
                        <View>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase' }}>{request.corporate_name}</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}>CNPJ: {request.cnpj}</Text>
                            <Text style={{ color: 'white', fontSize: 15 }}><Text style={{ color: 'yellow', fontWeight: 'bold' }}>PEDIDO: #{request.request_number}</Text> | {date} | {status}</Text>
                        </View>
                    </View>
                </RequestDivInfo>
            </RequestDiv>
        </Pressable>
    )
}