import React from "react";

import { useState, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import Login from "./Login";
import Cadastro from "./Cadastro";

import { useAuth } from "@/contexts/AuthContext";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { lerItem, removerItem } from "@/service/localStorage";

export default function Conta() {

    const { token, isAuthenticated, logout } = useAuth()

    const [isLogin, setIsLogin] = useState(true)
    const [isCadastro, setIsCadastro] = useState(false)

    const [usuarioAutenticado, setUsuarioAutenticado] = useState({ nome: "", username: "" })

    function handleTrocaForm() {
        setIsCadastro(!isCadastro)
        setIsLogin(!isLogin)
    }

    useEffect(() => {

        const carregarUsuarioAutenticado = async () => {
            const data = await lerItem("usuarioAutenticado");
            if (data) {
                console.log("Pegou esse aqui " + data.nome);
                setUsuarioAutenticado({ nome: data.nome, username: data.username });
            }
        };

        carregarUsuarioAutenticado();

    }, [token, isAuthenticated])

    if (isLogin && isAuthenticated == false) {
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
    if (token && isAuthenticated) {
        return (
            <View style={{ padding: 20 }}>

                <View>
                    <Text style={{ fontSize: 30 }}>{usuarioAutenticado.nome}</Text>
                    <Text style={{ fontSize: 20 }}>{usuarioAutenticado.username}</Text>
                </View>

                <TouchableOpacity onPress={logout} style={styles.pressNovaTarefa}>
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