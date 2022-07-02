import React, { useState, useEffect } from 'react'
import { Text, FlatList, View, Pressable, RefreshControl } from 'react-native'
import { Container, ProductDiv, ProductDivFlex, ProductTextKey, ProductDivInfo } from './styles'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Products() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        loadAPI()
    }, [product])

    async function loadAPI() {
        const response = await api.get(`api/Products/Products.php`).then((data) => {
            setProduct(data.data)
        })
    }

    return (
        <Container>
            <FlatList data={product} renderItem={({ item }) => <ListItem product={item} />} keyExtractor={item => item.id.toString()}></FlatList>
        </Container>
    )
}

function ListItem({ product }) {
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('Cliente')}>
            <ProductDiv>
                <ProductDivInfo>
                    <View>
                        <ProductDivFlex>
                            <ProductTextKey>Nome</ProductTextKey>
                            <Text>{product.title}</Text>
                        </ProductDivFlex>
                        <ProductDivFlex>
                            <ProductTextKey>Descrição</ProductTextKey>
                            <Text>{product.description}</Text>
                        </ProductDivFlex>
                    </View>
                </ProductDivInfo>
            </ProductDiv>
        </Pressable>
    )
}