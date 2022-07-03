import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import { styles } from './styles';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import NumericInput from 'react-native-numeric-input';
import api from '../../services/api'

const ProductsCard = ({ data, requestID }) => {
    const [display, setDisplay] = useState('none')
    const [amount, setAmount] = useState(0)

    function productDiv() {
        setDisplay('flex')
    }

    function defineAmount(number) {
        setAmount(number)
    }

    async function createAssociateProduct(request, product, amount) {
        const response = await api.post('api/AssociateProducts/CreateAssociateProducts.php', { id_request: request, id_product: product, amount: amount }).then((data) => {
            console.log(data.data)
        })
    }

    return (
        <View>
            <TouchableOpacity style={styles.box} onPress={() => productDiv()}>
                <View>
                    <Text style={{ color: '#000' }}>Produto: {data.title}</Text>
                    <View style={{ display: display, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <NumericInput onChange={(number) => defineAmount(number)}></NumericInput>
                        <View style={styles.containerFloat}>
                            <TouchableOpacity
                                style={styles.CartButton}
                                onPress={() => createAssociateProduct(requestID, data.id, amount)}
                            >
                                <FontAwesome name="plus-circle" size={35} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductsCard;