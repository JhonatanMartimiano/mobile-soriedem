import React, {useEffect, useState} from 'react'
import {Card} from 'react-native-shadow-cards'
import {CardDiv, CardSubTitle, CardTitle, Container} from './styles'
import axios from "axios";

export default function Dashboard ()
{
    const baseURL = 'http://192.168.100.41/'
    const [clients, setClients] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        loadAPI()
    }, [])

    async function loadAPI () {
        if (loading) return
        setLoading(true)
        const response = await axios.post(`${baseURL}api/Clients/Dashboard.php`)
        setClients(response.data.clients)
        setLoading(false)
    }

    return (
        <Container>
            <Card style={{marginBottom: 20}}>
                <CardDiv>
                    <CardTitle>Clientes</CardTitle>
                    <CardSubTitle>{clients}</CardSubTitle>
                </CardDiv>
            </Card>

            <Card>
                <CardDiv>
                    <CardTitle>Pedidos</CardTitle>
                    <CardSubTitle>5</CardSubTitle>
                </CardDiv>
            </Card>
        </Container>
    )
}