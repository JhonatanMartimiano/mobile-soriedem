import React, { useState, useEffect } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import api from "../../../services/api"
import { useNavigation } from "@react-navigation/native"

export default function FinalizeRequest(props) {
    const navigation = useNavigation()
    const [request, setRequest] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getRequest()
    }, [request])

    async function getRequest() {
        if (loading == false) {
            const response = await api.get(`api/Requests/RequestID.php?id_request=${props.route.params.requestID}`).then((data) => {
                setRequest(data.data)
            }).catch()
        }
        setLoading(true)
    }

    if (loading == true) {
        return (
            <View style={styles.container}>
                <Text style={styles.request}><Text style={styles.infoKey}>Número Pedido:</Text> {props.route.params.requestID}</Text>
                <Text style={styles.info}><Text style={styles.infoKey}>Cliente:</Text> {request.client.corporate_name}</Text>
                <Text style={styles.info}><Text style={styles.infoKey}>Vendedor:</Text> {request.seller.first_name} {request.seller.last_name}</Text>
                <View style={styles.products}>
                    <Text style={styles.productsTitle}>Itens do Pedido</Text>
                    <FlatList data={request.products} renderItem={({ item }) => <Text style={styles.product}>{item.amount}x {item.title}</Text>}></FlatList>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, styles.buttonFinalize]} onPress={() => navigation.navigate('Requests')}>
                        <Text style={styles.buttonText}>Finalizar Pedido</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonCancel]}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        )
    }
}