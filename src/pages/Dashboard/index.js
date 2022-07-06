import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { styles } from "./styles"
import { TouchableOpacity, View, Text, ScrollView } from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { useNavigation } from "@react-navigation/native"
import api from "../../services/api"

export default function Dashboard({navigation}) {
    const [clients, setClients] = useState(0)
    const [requests, setRequests] = useState(0)

    const { seller } = useContext(AuthContext)
    useEffect(() => {
        getClientsCount(), getRequestsCount()
    }, [clients, requests])

    async function getClientsCount() {
        const response = await api.post(`api/Clients/Dashboard.php`, { id_seller: seller.id }).then((data) => {
            setClients(data.data)
        })
    }

    async function getRequestsCount() {
        const response = await api.post(`api/Requests/Dashboard.php`, { id_seller: seller.id }).then((data) => {
            setRequests(data.data)
        })
    }

    return (
        <View style={styles.containerBox}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
                    <View>
                        <View style={styles.box}>
                            <FontAwesome style={styles.iconRegistered} name="shopping-cart" size={70} color="#FFC107"></FontAwesome>
                            <View style={styles.textos}>
                                <Text style={styles.rText}>Pedidos Pendentes</Text>
                                <Text style={styles.lenghtText}>{requests.pending}</Text>
                            </View>
                        </View>
                        <Text style={styles.textFooter}>Pedidos Pendentes cadastrados</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
                    <View>
                        <View style={styles.box}>
                            <FontAwesome style={styles.iconRegistered} name="shopping-cart" size={70} color="#28A745"></FontAwesome>
                            <View style={styles.textos}>
                                <Text style={styles.rText}>Pedidos Aprovados</Text>
                                <Text style={styles.lenghtText}>{requests.finished}</Text>
                            </View>
                        </View>
                        <Text style={styles.textFooter}>Pedidos Aprovados cadastrados</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
                    <View>
                        <View style={styles.box}>
                            <FontAwesome style={styles.iconRegistered} name="shopping-cart" size={70} color="#DC3545"></FontAwesome>
                            <View style={styles.textos}>
                                <Text style={styles.rText}>Pedidos Cancelados</Text>
                                <Text style={styles.lenghtText}>{requests.canceled}</Text>
                            </View>
                        </View>
                        <Text style={styles.textFooter}>Pedidos Cancelados cadastrados</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Clientes')}>
                    <View>
                        <View style={styles.box}>
                            <FontAwesome style={styles.iconRegistered} name="users" size={70} color="#17a2b8"></FontAwesome>
                            <View style={styles.textos}>
                                <Text style={styles.rText}>Clientes</Text>
                                <Text style={styles.lenghtText}>{clients}</Text>
                            </View>
                        </View>
                        <Text style={styles.textFooter}>Clientes cadastrados</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}