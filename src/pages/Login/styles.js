import styled from "styled-components/native"

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const Logo = styled.Image``

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  background-color: #ccc;
  border-radius: 20px;
  padding: 10px;
  margin-top: 20px;
`

export const BtnLogin = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  background-color: #306192;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 10px;
`

export const BtnLoginText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 15px;
  text-transform: uppercase;
`