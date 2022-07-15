import React, { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { FlatList, Image, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import NumericInput from "react-native-numeric-input"
import { urlImage } from "../../../config"
import api from "../../../services/api"

export default function Stock(props) {
    const navigation = useNavigation()
    const [client, setClient] = useState([])
    const [clientProducts, setClientProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClients()
    }, [client])

    async function getClients() {
        if (loading == true) {
            const response = await api.get(`api/Clients/ClientID.php?id=${props.route.params.id_client}`).then((data) => {
                setClient(data.data)
            }).catch(error => console.log(error))
            getClientsProducts()
            setLoading(false)
        }
    }

    async function getClientsProducts() {
        const response = await api.get(`api/ClientsProducts/ClientProducts.php?id_client=${client.id}`).then((data) => {
            setClientProducts(data.data)
        }).catch(error => console.log(error))
    }

    let stock = []

    if (clientProducts) {
        for (let i = 0; i < clientProducts.length; i++) {
            stock.push({ id: clientProducts[i].id, title: clientProducts[i].title, photo: clientProducts[i].photo, previous_amount: 0, current_amount: 0, price: clientProducts[i].price, totalItem: 0})
        }
    }

    function setStock(id, value) {
        stock.map((v, i) => {
            if (v.id == id) {
                v.previous_amount = value
            }
        })
    }

    let dateDefault = new Date(),
        day = dateDefault.getDate().toString().length > 1 ? dateDefault.getDate() : `0${dateDefault.getDate()}`,
        month = dateDefault.getMonth().toString().length > 1 ? dateDefault.getMonth() + 1 : `0${dateDefault.getMonth() + 1}`,
        year = dateDefault.getFullYear(),
        date = `${day}/${month}/${year}`

    if (loading == false) {
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <View style={{ backgroundColor: '#306192', padding: 10, borderRadius: 10 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Cliente: {client.corporate_name}</Text>
                    <Text style={{ fontSize: 20, color: 'white' }}>Data Atualização: {date}</Text>
                </View>
                <View style={{ marginBottom: 10, marginTop: 10, height: '75%' }}>
                    <FlatList data={clientProducts} renderItem={({ item }) => <View style={{ padding: 10, backgroundColor: 'white', marginTop: 20, borderRadius: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Image style={{ width: 80, height: 80 }} source={{ uri: `${urlImage}${item.photo}` }}></Image>
                            <Text>{item.title}</Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text>Quantidade Atual:</Text>
                            <NumericInput onChange={(value) => setStock(item.id, value)}></NumericInput>
                        </View>
                    </View>} showsVerticalScrollIndicator={false}></FlatList>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }} onPress={() => navigation.navigate('AssociateProducts', { clientID: client.id, dataStock: stock })}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ATUALIZAR INVENTÁRIO</Text>
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