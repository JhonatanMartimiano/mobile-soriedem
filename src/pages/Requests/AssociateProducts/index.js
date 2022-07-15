import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet, Pressable, Image, Alert } from 'react-native'
import { styles } from './styles'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import NumericInput from 'react-native-numeric-input';
import { urlImage } from '../../../config'
import api from '../../../services/api'

export default function AssociateProducts(props) {
    const [product, setProduct] = useState([])
    const [client, setClient] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClient()
    }, [client])

    async function getClient() {
        if (loading == true) {
            const response = await api.get(`api/Clients/ClientID.php?id=${props.route.params.clientID}`).then((data) => {
                setClient(data.data)
            }).catch(error => console.log(error))
            setLoading(false)
        }
    }

    let stock = props.route.params.dataStock

    function setStock(id, value) {
        stock.map((v, i) => {
            if (v.id == id) {
                v.current_amount = value
                v.totalItem = v.current_amount * v.price
            }
        })
    }
    
    function checkDataStock() {
        let modalArr = []
        for (let i = 0; i < stock.length; i++) {
            if (stock[i].previous_amount <= 0 && stock[i].current_amount <= 0) {
                modalArr.push(stock[i])
            }
        }

        if (modalArr.length == 0) {
            navigation.navigate('FinalizeRequest', { clientID: props.route.params.clientID, product: stock })
        } else {
            setModalVisible(!modalVisible)
        }

        setProduct(modalArr)
    }

    const navigation = useNavigation()

    let dateDefault = new Date(),
        day = dateDefault.getDate().toString().length > 1 ? dateDefault.getDate() : `0${dateDefault.getDate()}`,
        month = dateDefault.getMonth().toString().length > 1 ? dateDefault.getMonth() + 1 : `0${dateDefault.getMonth() + 1}`,
        year = dateDefault.getFullYear(),
        date = `${day}/${month}/${year}`

    if (loading == false) {
        return (
            <View style={{ padding: 20, flex: 1 }}>
                <Text style={{ fontSize: 18 }}>Cliente: {client.corporate_name}</Text>
                <Text style={{ fontSize: 18 }}>Data da Reposição: {date}</Text>
                <View style={{ height: '70%', marginTop: 10 }}>
                    <FlatList
                        data={props.route.params.dataStock}
                        renderItem={({ item }) => {
                            return <View>
                                <View style={styles.box}>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ width: 70, height: 70, marginRight: '5%' }} source={{ uri: `${urlImage}${item.photo}` }}></Image>
                                        <Text style={{ color: '#000', fontSize: 15 }}>{item.title}</Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 15 }}>Quantidade Necessária:</Text>
                                        <NumericInput onChange={(value) => setStock(item.id, value)}></NumericInput>
                                    </View>
                                </View>
                            </View>
                        }}
                        keyExtractor={item => String(item.id)}
                    />
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 10, marginTop: 20 }} onPress={() => checkDataStock()}>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <FontAwesome name="plus-circle" size={35} color="#fff" />
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>GRAVAR PEDIDO</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={stylesz.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={stylesz.centeredView}>
                            <View style={stylesz.modalView}>
                                <View style={{ display: 'flex', alignItems: 'center' }}>
                                    <FontAwesome name={'warning'} size={35} color={'#FFC107'}></FontAwesome>
                                    <Text style={{ fontSize: 18, color: '#FFC107' }}>Os itens abaixo estão zerados no estoque, é preciso fazer pedido para eles.</Text>
                                </View>

                                <View style={{ marginBottom: 20, marginTop: 20, backgroundColor: '#306192', padding: 10, borderRadius: 10 }}>
                                    <FlatList data={product} renderItem={({ item }) => <Text style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>{item.title}</Text>}></FlatList>
                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 10, width: '50%' }} onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Fechar</Text>
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
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 'auto',
        width: '80%'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});