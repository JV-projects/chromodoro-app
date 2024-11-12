import React from "react";

import { useState } from "react";

import { Text, View, StyleSheet } from "react-native";

import Login from "./Login";
import Cadastro from "./Cadastro";

import { StackNavigationProp } from '@react-navigation/stack';

type Conta = {
    navigation: StackNavigationProp<any>
}

export default function Conta() {

    const [isLogin, setIsLogin] = useState(true)
    const [isCadastro, setIsCadastro] = useState(false)

    function handleTrocaForm(){
        setIsCadastro(!isCadastro)
        setIsLogin(!isLogin)
    }

    if(isLogin){
        return(
            <Login handleTrocaForm={handleTrocaForm}/>
        )
    }

    if(isCadastro){
        return(
            <Cadastro handleTrocaForm={handleTrocaForm}/>
        )
    }


}

const styles = StyleSheet.create({
    viewConta: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})