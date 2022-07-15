import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, Pressable, RefreshControl, Image } from 'react-native'
import { Container, ProductDiv, ProductDivFlex, ProductTextKey, ProductDivInfo } from './styles'
import { useNavigation } from '@react-navigation/native'
import { urlImage } from '../../config'
import api from '../../services/api'

export default function Products() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAPI()
    }, [product])

    async function loadAPI() {
        const response = await api.get(`api/Products/Products.php`).then((data) => {
            setProduct(data.data)
            setLoading(false)
        })
    }

    if (loading == false) {
        return (
            <Container>
                <FlatList data={product} renderItem={({ item }) => <ListItem product={item} />} keyExtractor={item => item.id}></FlatList>
            </Container>
        )
    } else {
        return(
            <View>
                <Text>Carregando...</Text>
            </View>
        )
    }
}

function ListItem({ product }) {
    const navigation = useNavigation()

    function toLimit(string, limit){
        return string = string.substring(0,limit);
    }

    return (
        <Pressable onPress={() => navigation.navigate('ProductDetails', { productID: product.id })}>
            <ProductDiv>
                <ProductDivInfo>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image style={{ width: 90, height: 90, marginRight: '2%', borderWidth: 1, borderColor: 'white' }} source={{ uri: `${urlImage}${product.photo}` }}></Image>
                        <View style={{paddingRight: 80}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', textTransform: 'uppercase'}}>{product.title}</Text>
                            <Text style={{color: 'white'}}>{toLimit(product.description, 100)}...</Text>
                        </View>
                    </View>
                </ProductDivInfo>
            </ProductDiv>
        </Pressable>
    )
}