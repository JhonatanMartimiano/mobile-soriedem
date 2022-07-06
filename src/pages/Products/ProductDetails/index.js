import React, { useState, useEffect } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import { urlImage } from "../../../config"
import api from "../../../services/api"

export default function ProductDetails(props) {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getProduct()
    }, [product])

    async function getProduct() {
        const response = await api.get(`api/Products/ProductID.php?id=${props.route.params.productID}`).then((data) => {
            setProduct(data.data)
            setLoading(false)
        })
    }

    if (loading == false) {
        return (
            <ScrollView>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'black' }}>{product.title}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 20, marginTop: 20 }}>
                        <Image style={{ width: 300, height: 300 }} source={{ uri: `${urlImage}${product.photo}` }}></Image>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: 'black', marginBottom: 10 }}>Descrição</Text>
                        <Text>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <View>
                <Text>Carregando...</Text>
            </View>
        )
    }
}