import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../../contexts/auth"
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import api from "../../../services/api"
import { useNavigation } from "@react-navigation/native"

export default function FinalizeRequest(props) {
    const navigation = useNavigation()
    const { seller } = useContext(AuthContext)

    const [client, setClient] = useState()
    const [products, setProducts] = useState(props.route.params.product)
    const [lastRequest, setLastRequest] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClient()
    }, [client])

    async function getClient() {
        if (loading == true) {
            const response = await api.get(`api/Clients/ClientID.php?id=${props.route.params.clientID}`).then((data) => {
                setClient(data.data)
                getLastRequest()
            }).catch(error => console.log(error))
            setLoading(false)
        }
    }

    async function getLastRequest() {
        if (client) {
            const response = await api.get(`api/Requests/LastRequest.php?id_seller=${seller.id}}&id_client=${client.id}}`).then((data) => {
                setLastRequest(data.data)
            })
        }
    }

    let numberRequest = lastRequest ? parseInt(lastRequest.request_number) + 1 : 1

    async function createRequest() {
        let success = []
        for (let i = 0; i < products.length; i++) {
            const response = await api.post(`api/Requests/CreateRequest.php`, { request_number: numberRequest, id_seller: seller.id, id_client: client.id, id_product: products[i].id, previous_amount: products[i].previous_amount, current_amount: products[i].current_amount }).then((data) => {
                if (data.data != false) {
                    success.push(data.data)
                }
            })
        }

        if (success.length == products.length) {
            navigation.navigate('Requests')
        }
    }

    let dateDefault = new Date(),
        day = dateDefault.getDate().toString().length > 1 ? dateDefault.getDate() : `0${dateDefault.getDate()}`,
        month = dateDefault.getMonth().toString().length > 1 ? dateDefault.getMonth() + 1 : `0${dateDefault.getMonth() + 1}`,
        year = dateDefault.getFullYear(),
        date = `${day}/${month}/${year}`

    if (loading == false) {
        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: '#306192', padding: 10, borderRadius: 10 }}>
                    <Text style={styles.request}><Text style={styles.infoKey}>Número Pedido:</Text> {numberRequest}</Text>
                    <Text style={styles.info}><Text style={styles.infoKey}>Cliente:</Text> {client.corporate_name}</Text>
                    <Text style={styles.info}><Text style={styles.infoKey}>Data do Pedido:</Text> {date}</Text>
                </View>
                <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={styles.products}>
                        <FlatList data={products} renderItem={({ item }) => <Text style={styles.product}>{item.title} | Qtde: {item.current_amount}</Text>}></FlatList>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, styles.buttonFinalize]} onPress={() => createRequest()}>
                        <Text style={styles.buttonText}>FINALIZAR PEDIDO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={() => navigation.navigate('Requests')}>
                        <Text style={styles.buttonText}>CANCELAR PEDIDO</Text>
                    </TouchableOpacity>
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