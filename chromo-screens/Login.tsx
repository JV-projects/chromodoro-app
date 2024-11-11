import React from "react";

import { View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet } from "react-native";

export default function Login(){

    return(
        <View style={styles.viewLogin}>
            <View>
                <Text style={styles.titulo}>Faça seu login</Text>
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
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewLink}>
                <Text>Não tem uma conta?<Pressable><Text style={{color: 'blue'}}>Crie uma.</Text></Pressable></Text>
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
        alignItems: 'center',
        justifyContent: 'center'
    }
})