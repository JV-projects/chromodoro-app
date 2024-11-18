import React, {useEffect, useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet} from "react-native";
import { post } from '../service/api'
import { UsuarioController } from "@/assets/endpoints/Endpoints";
import axios from "axios";

type Cadastro = {
    handleTrocaForm: () => void
}

interface Data {
    nome: string,
    email: string,
    senha: string,
}

export default function Cadastro({handleTrocaForm}: Cadastro) {

    const [formData, setFormData] = useState<Data>({nome: "", email: "", senha: ""})

    console.log(formData)

    const getData = (texto: string, prop: keyof Data) => {

        setFormData((prevState) => ({...prevState, [prop]: texto}));
    }

    const onSubmit = async () => {
        console.log("onsubmit")

        try {
            const resposta = await post<Data, String>(formData, UsuarioController.registrar)

            console.log(resposta);
        } catch (erro) {
            console.log(erro)
        }
    }

    return (
        <View style={styles.viewLogin}>
            <View>
                <Text style={styles.titulo}>Crie sua conta</Text>
            </View>

            <View>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input} inputMode={"text"}
                           onChangeText={(texto) => getData(texto, "nome")}/>
            </View>

            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} keyboardType={"email-address"} inputMode={"email"}
                           autoCapitalize={"none"} onChangeText={(texto) => getData(texto, "email")}/>
            </View>

            <View>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} inputMode={"text"} secureTextEntry={true} autoCapitalize={"none"}
                           onChangeText={(texto) => getData(texto, "senha")}/>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText} >Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewLink}>
                <Text>Já tem conta?</Text>
                <Pressable onPress={() => handleTrocaForm()}><Text style={{color: 'blue'}}> Faça seu
                    login.</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20
    },
    formGrupo: {},
    label: {
        fontSize: 16
    },
    input: {
        height: 50,
        backgroundColor: "#ECECEC",
        borderRadius: 4,
    },
    button: {
        backgroundColor: "#535353",
        padding: 20,
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        color: "#fff"
    },
    viewLogin: {
        width: "90%",
        margin: 'auto',
        padding: 20,
        gap: 40,
        borderWidth: 1,
        borderColor: '#D1717B',
        borderRadius: 12
    },
    viewLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

})