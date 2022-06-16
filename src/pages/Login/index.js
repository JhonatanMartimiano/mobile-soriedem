import React from "react"
import {Container, Logo, Input, BtnLogin, BtnLoginText} from './styles'

export default function Login()
{
    return (
        <Container>
            <Logo source={require('../../assets/img/logo.png')}></Logo>
            <Input placeholder={'Digite seu e-mail'}></Input>
            <Input secureTextEntry={true} placeholder={'Digite sua senha'}></Input>
            <BtnLogin>
                <BtnLoginText>Entrar</BtnLoginText>
            </BtnLogin>
        </Container>
    )
}