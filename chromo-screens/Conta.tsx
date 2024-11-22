import React from "react";

import { useState } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Login from "./Login";
import Cadastro from "./Cadastro";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Conta() {

    const [isLogin, setIsLogin] = useState(true)
    const [isCadastro, setIsCadastro] = useState(false)

    function handleTrocaForm() {
        setIsCadastro(!isCadastro)
        setIsLogin(!isLogin)
    }

    if (isLogin) {
        return (
            <Login handleTrocaForm={handleTrocaForm} />
        )
    }

    if (isCadastro) {
        return (
            <Cadastro handleTrocaForm={handleTrocaForm} />
        )
    }

    // Trocar para isAutenticado
    if (isLogin) {
        return (
            <View style={{padding: 20}}>

                <View>
                    <Text style={{fontSize: 30}}>Maria</Text>
                    <Text style={{fontSize: 20}}>maria@gmail.com</Text>
                </View>

                <TouchableOpacity style={styles.pressNovaTarefa}>
                <MaterialIcons name="logout" size={24} color="black" />
                <Text style={styles.pressText}>Logout</Text>
            </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    viewConta: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pressNovaTarefa: {
        width: '100%',
        marginTop: 30,
        height: 55,
        borderWidth: 1,
        borderColor: "#171717",
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        borderStyle: 'dashed'
    },
    pressText: {
        fontSize: 16
    },
})