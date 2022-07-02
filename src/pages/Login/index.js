import React, { useState, useContext } from "react"
import { Container, Logo, Input, BtnLogin, BtnLoginText } from "./styles"
import { AuthContext } from "../../contexts/auth"


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useContext(AuthContext)

    function handleLogin() {
        login(email, password)
    }

    return (
        <Container>
            <Logo source={require('../../assets/img/logo.png')}></Logo>
            <Input placeholder={'Digite seu e-mail'} autoCorrect={false} autoCapitalize={'none'} value={email} onChangeText={(text) => setEmail(text)}></Input>
            <Input secureTextEntry={true} placeholder={'Digite sua senha'} autoCorrect={false} autoCapitalize={'none'} value={password} onChangeText={(text) => setPassword(text)}></Input>
            <BtnLogin>
                <BtnLoginText onPress={handleLogin}>Entrar</BtnLoginText>
            </BtnLogin>
        </Container>
    )
}