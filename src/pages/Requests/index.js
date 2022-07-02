import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Text, FlatList, View, Pressable } from 'react-native'
import { Container, RequestDiv, RequestDivFlex, RequestTextKey, RequestDivInfo, ButtonAdd, ButtonAddText } from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Requests({navigation}) {
    const [request, setRequest] = useState([])
    const {seller} = useContext(AuthContext)

    useEffect(() => {
        loadAPI()
    }, [request])

    async function loadAPI() {
        const response = await api.post(`api/Requests/Requests.php`, {id_seller: seller.id}).then((data) => {
            setRequest(data.data)
        })
    }

    return (
        <Container>
            <ButtonAdd onPress={() => navigation.navigate('AddRequest')}>
                <ButtonAddText>ADICIONAR PEDIDO</ButtonAddText>
            </ButtonAdd>
            <FlatList data={request} renderItem={({ item }) => <ListItem request={item}></ListItem>} keyExtractor={item => item.id.toString()}></FlatList>
        </Container>
    )
}

function ListItem({ request }) {
    const navigation = useNavigation()
    return (
        <Pressable onPress={() => navigation.navigate('Cliente')}>
            <RequestDiv>
                <RequestDivInfo>
                    <View>
                        <RequestDivFlex>
                            <RequestTextKey>N° Pedido</RequestTextKey>
                            <Text>{request.request_number}</Text>
                        </RequestDivFlex>
                        <RequestDivFlex>
                            <RequestTextKey>Nome Cliente</RequestTextKey>
                            <Text>{request.contact_name}</Text>
                        </RequestDivFlex>
                    </View>
                </RequestDivInfo>
            </RequestDiv>
        </Pressable>
    )
}