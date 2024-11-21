import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
    item: string;
}

export default function AuthMessage({ item }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>{`Faça login para visualizar ${item}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto: {
        fontSize: 18,
        fontWeight: 700,
        textAlign: 'center',
        color: 'gray'
    }
})