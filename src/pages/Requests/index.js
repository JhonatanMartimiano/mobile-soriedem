import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Text, FlatList, View, Pressable } from 'react-native'
import { Container, RequestDiv, RequestDivFlex, RequestTextKey, RequestDivInfo, ButtonAdd, ButtonAddText } from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Requests({ navigation }) {
    const [request, setRequest] = useState([])
    const { seller } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    async function loadAPI() {
        const response = await api.get(`api/Requests/Requests.php?id_seller=${seller.id}`).then((data) => {
            setRequest(data.data)
        })
        setLoading(false)
    }

    useEffect(() => {
        loadAPI()
    }, [request])

    useEffect(() => {
        const reload = navigation.addListener('focus', () => {
            loadAPI()
        })
        return reload
    }, [navigation])

    if (loading == false) {
        return (
            <Container>
                <ButtonAdd onPress={() => navigation.navigate('AddRequest')}>
                    <ButtonAddText>ADICIONAR PEDIDO</ButtonAddText>
                </ButtonAdd>
                <FlatList data={request} renderItem={({ item }) => <ListItem request={item}></ListItem>} keyExtractor={item => item.id}></FlatList>
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
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', textTransform: 'uppercase' }}>{request.corporate_name}</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}>CNPJ: {request.cnpj}</Text>
                            <Text style={{ color: 'white', fontSize: 20 }}><Text style={{color: 'yellow', fontWeight: 'bold'}}>PEDIDO: #{request.request_number}</Text> | {date} | {status}</Text>
                        </View>
                    </View>
                </RequestDivInfo>
            </RequestDiv>
        </Pressable>
    )
}