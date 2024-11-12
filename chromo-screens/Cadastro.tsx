import React from "react";

import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";


import { StackNavigationProp } from '@react-navigation/stack';

type Cadastro = {
    handleTrocaForm: () => void
}

export default function Cadastro({handleTrocaForm}: Cadastro){

    return(
        <View style={styles.viewLogin}>
            <View>
                <Text style={styles.titulo}>Crie sua conta</Text>
            </View>

            <View>
                <Text style={styles.label}>Nome</Text>
                <TextInput style={styles.input}/>
            </View>

            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input}/>
            </View>

            <View>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input}/>
            </View>

            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewLink}>
                <Text>Já tem conta?</Text>
                <Pressable onPress={() => handleTrocaForm()}><Text style={{color: 'blue'}}> Faça seu login.</Text></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titulo:{
        fontSize: 20
    },
    formGrupo: {

    },
    label: {
        fontSize: 16
    },
    input:{
        height: 50,
        backgroundColor: "#ECECEC",
        borderRadius: 4,
    },
    button:{
        backgroundColor: "#535353",
        padding: 20,
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText:{
        color: "#fff"
    },
    viewLogin:{
        width: "90%",
        margin: 'auto',
        padding: 20,
        gap: 40,
        borderWidth: 1,
        borderColor: '#D1717B',
        borderRadius: 12
    },
    viewLink:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

})