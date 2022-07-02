import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import SwipeableRow from '../SwipeableRow';
import { styles } from './styles';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import api from '../../services/api';

const ProductsCard = ({ data, requestID }) => {
    const [display, setDisplay] = useState('none')
    const [amount, setAmount] = useState(0)

    const navigation = useNavigation();

    function productDiv() {
        setDisplay('flex')
    }

    function defineAmount(text) {
        setAmount(text)
    }

    async function associateProduct() {
        const response = await api.post('api/AssociateProducts/CreateAssociateProducts.php', {id_request: requestID, id_product: data.id, amount: amount}).then((data) => {
            console.log(data.data)
        })
    }

    return (
        <View>
            <SwipeableRow>
                <TouchableOpacity style={styles.box} onPress={() => productDiv()}>
                    <View>
                        <Text style={{ color: '#000' }}>Produto: {data.title}</Text>
                        <View style={{ display: display, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <TextInput keyboardType='number-pad' style={{ borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingLeft: 30, width: '20%' }} onChangeText={(text) => defineAmount(text)}></TextInput>
                            <View style={styles.containerFloat}>
                                <TouchableOpacity
                                    style={styles.CartButton}
                                    onPress={() => associateProduct()}
                                    >
                                    <FontAwesome name="plus-circle" size={35} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </SwipeableRow>
        </View>
    )
}

export default ProductsCard;