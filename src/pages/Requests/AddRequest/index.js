import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/auth'
import { View, TouchableOpacity, Text, Modal, TextInput, Dimensions, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { PickerView } from './styles'
import { styles } from './style'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ProductsCard from '../../../components/ProductsCard'
import api from '../../../services/api'

export default function AddRequest() {
    const { seller } = useContext(AuthContext)
    const [client, setClient] = useState([])
    const [clientSelected, setClientSelected] = useState(0)
    const [hide, setHide] = useState()
    const [show, setShow] = useState('none')
    const [modalVisible, setModalVisible] = useState(false)
    const [onEndReachedCalledDuringMomentum, setMT] = useState(true);
    const [product, setProduct] = useState([])
    const [search, setSearch] = useState("");
    const [request, setRequest] = useState();
    const [associateProducts, setAssociateProducts] = useState([])

    useEffect(() => {
        getClients()
    }, [client])

    useEffect(() => {
        getAssociateProducts()
    }, [associateProducts])

    async function getClients() {
        try {
            const response = await api.post('api/Clients/Clients.php', { id_seller: seller.id }).then((data) => {
                setClient(data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function getProducts() {
        try {
            const response = await api.get('api/Products/Products.php').then((data) => {
                setProduct(product)
            })
        } catch (error) {
            console.log(error)
        }
    }

    let listClients = null;

    if (client) {
        listClients = client.map((v, k) => {
            return <Picker.Item label={v.contact_name} key={k} value={v.id}></Picker.Item>
        })
    }

    const renderItem = function ({ item }) {
        return (
            <ProductsCard
                data={item}
                requestID={request}
            />
        )
    }

    async function Search() {
        const response = await api.get(`api/Products/SearchProducts.php?search=${search}`);
        setProduct(response.data.products);
     }

     async function getAssociateProducts() {
        const response = await api.post(`api/AssociateProducts/getAssociateProducts.php`, {id_request: request}).then((data) => {
            setAssociateProducts(data.data)
        })
        
    }
     
    return (
        <View style={{ padding: 20 }}>
            <PickerView>
                <Picker style={{ width: '100%' }} selectedValue={clientSelected} onValueChange={(itemValue, itemIndex) => setClientSelected(itemValue)}>
                    {listClients}
                </Picker>
            </PickerView>
            <TouchableOpacity style={{ backgroundColor: '#039e26', padding: 10, borderRadius: 15, display: hide }} onPress={() => createRequest(seller, clientSelected)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>CRIAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#039e26', padding: 10, borderRadius: 15, display: show }} onPress={() => changeVisible(true)}>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ADICIONAR PRODUTO</Text>
            </TouchableOpacity>
            <View>
                <FlatList data={associateProducts} renderItem={({ item }) => <View><Text style={{marginTop: 10}}>Nome: {item.title} - Quantidade: {item.amount}</Text></View>} keyExtractor={item => item.id.toString()}></FlatList>
            </View>
            <Modal animationType={'slide'} visible={modalVisible}>
                <View style={{ paddingHorizontal: 15, flex: 1, }}>
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

                    <View style={{ flex: 1, height: Dimensions.get('window').height + 30, }}>
                        <FlatList
                            data={product}
                            renderItem={renderItem}
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
                    <TouchableOpacity style={{backgroundColor: 'red', width: '20%', padding: '2%', borderRadius: 5, marginBottom: 10}} onPress={() => changeVisible(false)}>
                        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )

    function changeVisible(enabled) {
        if (enabled === true) {
            setModalVisible(true)
        } else {
            setModalVisible(false)
        }
    }

    async function createRequest(seller, client) {
        const response = await api.post('api/Requests/CreateRequest.php', { id_seller: seller.id, id_client: client }).then((data) => {
            if (data.data !== false) {
                setHide('none')
                setShow()
                setRequest(data.data)
            }
        })
    }
}