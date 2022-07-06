import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Text, Modal, TextInput, Dimensions, FlatList, StyleSheet, Pressable, Image, Alert } from 'react-native'
import { styles } from './styles'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import NumericInput from 'react-native-numeric-input';
import { urlImage } from '../../../config'
import api from '../../../services/api'

export default function AssociateProducts(props) {
    const [onEndReachedCalledDuringMomentum, setMT] = useState(true);
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("");
    const [client, setClient] = useState()
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [nameProduct, setNameProduct] = useState()

    const [amount, setAmount] = useState(0)

    useEffect(() => {
        getClient()
    }, [client])

    async function getClient() {
        if (loading == false) {
            const response = await api.get(`api/Clients/ClientID.php?id=${props.route.params.clientID}`).then((data) => {
                setClient(data.data)
            }).catch()
            setLoading(true)
        }
    }

    function defineAmount(number) {
        setAmount(number)
    }

    async function createAssociateProduct(request, product, amount, nameProduct) {
        if (amount < 1) {
            Alert.alert('Informe a quantidade.')
        } else {
            const response = await api.post('api/AssociateProducts/CreateAssociateProducts.php', { id_request: request, id_product: product, amount: amount }).then((data) => {
                setModalVisible(true)
            })
            setNameProduct(nameProduct)
        }
    }

    async function Search() {
        const response = await api.get(`api/Products/SearchProducts.php?search=${search}`);
        setProduct(response.data.products);
    }

    const navigation = useNavigation()

    if (loading == true) {
        return (
            <View style={{ padding: 20, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>Pedido: {props.route.params.request}</Text>
                <Text style={{ fontSize: 18 }}>Cliente: {client.corporate_name}</Text>
                <View style={styles.containerSearch}>
                    <TextInput
                        style={styles.search}
                        placeholder="Pesquise algum produto."
                        placeholderTextColor="gray"
                        keyboardType="default"
                        onChangeText={(search) => setSearch(search)}
                        returnKeyType="search"
                        onTextInput={() => Search()}
                    />

                    <TouchableOpacity
                        style={styles.iconSearch}
                        onPress={() => Search()}
                    >
                        <FontAwesome name="search" size={28} color="gray" />
                    </TouchableOpacity>
                </View>
                <View></View>
                <View style={{ height: '70%' }}>
                    <FlatList
                        data={product}
                        renderItem={({ item }) => <View>
                            <View style={styles.box}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 50, height: 50, marginRight: '5%' }} source={{ uri: `${urlImage}${item.photo}` }}></Image>
                                    <Text style={{ color: '#000', fontSize: 15 }}>{item.title}</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                    <NumericInput onChange={(number) => defineAmount(number)}></NumericInput>
                                    <View style={styles.containerFloat}>
                                        <TouchableOpacity
                                            style={styles.CartButton}
                                            onPress={() => createAssociateProduct(props.route.params.request, item.id, amount, item.title)}
                                        >
                                            <FontAwesome name="plus-circle" size={35} color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>}
                        keyExtractor={item => String(item.id)}
                        onEndReachedThreshold={0.1}
                        removeClippedSubviews
                        initialNumToRender={10}
                        onMomentumScrollBegin={() => setMT(false)}
                        windowSize={10}
                        getItemLayout={(data, index) => (
                            { length: 50, offset: 50 * index, index }
                        )}
                    />
                </View>
                <View style={stylesz.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={stylesz.centeredView}>
                            <View style={stylesz.modalView}>
                                <View>
                                    <Text style={{ fontSize: 20, textAlign: 'center' }}>FORAM ADICIONADO <Text style={{ color: 'black', fontWeight: 'bold' }}>{amount}</Text> UN. DE <Text style={{ color: 'black', fontWeight: 'bold' }}>{nameProduct}</Text></Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
                                    <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }} onPress={() => navigation.navigate('FinalizeRequest', { requestID: props.route.params.request })}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Finalizar Pedido</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }} onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Continuar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        )
    } else {
        return (
            <View>
                <Text>Carregando</Text>
            </View>
        )
    }
}


const stylesz = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '40%',
        width: '90%'
    }
});