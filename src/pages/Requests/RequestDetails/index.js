import React, { useState, useEffect, useContext } from "react"
import { Text, View, FlatList, Image } from "react-native"
import { styles } from "./styles"
import { AuthContext } from "../../../contexts/auth"
import api from "../../../services/api"
import { urlImage } from "../../../config"

export default function RequestDetails(props) {
    const { seller } = useContext(AuthContext)
    const [request, setRequest] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getRequest()
    }, [request])

    async function getRequest() {
        const response = await api.get(`api/Requests/RequestID.php?id_request=${props.route.params.requestID}&request_number=${props.route.params.request_number}`).then((data) => {
            setRequest(data.data)
            setLoading(false)
        }).catch()
    }

    if (loading == false) {
        let status = null

        if (request.request.status == 1) {
            status = 'Pendente'
        } else if (request.request.status == 2) {
            status = 'Aprovado'
        } else if (request.request.status == 3) {
            status = 'Cancelado'
        }

        let dateDB = new Date(request.request.created_at.split(' ')[0])
        let day = dateDB.getDate().toString().length > 1 ? dateDB.getDate() + 1 : `0${dateDB.getDate() + 1}`
        let month = dateDB.getMonth().toString().length > 1 ? dateDB.getMonth() + 1 : `0${dateDB.getMonth() + 1}`
        let year = dateDB.getFullYear()
        let date = `${day}/${month}/${year}`
        return (
            <View style={{ padding: 20, flex: 1 }}>
                <View style={{ backgroundColor: '#306192', padding: 10, borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'yellow' }}><Text style={{ fontWeight: 'bold', color: 'yellow' }}>PEDIDO:</Text> #{request.request.request_number}</Text>
                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>{request.client.corporate_name}</Text>
                    <Text style={{ fontSize: 20, color: '#CCC' }}><Text style={{ color: '#CCC' }}>CNPJ:</Text> {request.client.cnpj}</Text>
                    <Text style={{ fontSize: 20, color: '#CCC' }}><Text style={{ color: '#CCC' }}>Data:</Text> {date}</Text>
                    <Text style={{ fontSize: 20, color: '#CCC' }}><Text style={{ color: '#CCC' }}>Vendedor:</Text> {seller.first_name} {seller.last_name}</Text>
                    <Text style={{ fontSize: 20, color: '#CCC' }}><Text style={{ color: '#CCC' }}>Valor Total:</Text> {parseFloat(request.request.total).toFixed(2).replace('.', ',')}</Text>
                    <Text style={{ fontSize: 20, color: '#26fefe' }}><Text style={{ color: '#26fefe' }}>Status:</Text> {status}</Text>
                </View>
                <View style={styles.products}>
                    <Text style={styles.productsTitle}>ITENS DO PEDIDO</Text>
                    <FlatList data={request.products} renderItem={({ item }) =>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                            <View>
                                <View style={{ marginRight: 10 }}>
                                    <Image style={{ width: 60, height: 60 }} source={{ uri: `${urlImage}${item.photo}` }} ></Image>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.product}>{item.title}</Text>
                                <Text style={{ fontSize: 13, color: 'white' }}>Qtde: {item.current_amount}</Text>
                            </View>
                        </View>
                    }></FlatList>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        )
    }
}