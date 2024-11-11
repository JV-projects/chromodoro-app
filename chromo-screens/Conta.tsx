import React from "react";

import { Text, View, StyleSheet } from "react-native";

import Login from "./Login";
import Cadastro from "./Cadastro";

export default function Conta() {
    return (
        <View style={styles.viewConta}>
            <Cadastro />
        </View>
    )
}

const styles = StyleSheet.create({
    viewConta:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})