import React from "react";

import { useState } from "react";

import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";

type Login = {
    handleTrocaForm: () => void
}

export default function Login({ handleTrocaForm }: Login) {

    const [focus, setFocus] = useState(false)

    return (
        <View style={styles.viewLogin}>
            <View>
                <Text style={styles.titulo}>Faça seu login</Text>
            </View>

            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} />
            </View>

            <View>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input}/>
            </View>

            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewLink}>
                <Text>Não tem uma conta?</Text>
                <Pressable onPress={() => handleTrocaForm()}><Text style={{ color: 'blue' }}> Crie uma.</Text></Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20
    },
    label: {
        fontSize: 16
    },
    input: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: "#ececec",
        borderRadius: 4,
    },
    inputFocus: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: "#ececec",
        borderWidth: 1,
        borderColor: "#c0c0c0",
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
    }
})