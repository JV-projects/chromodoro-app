
import AuthMessage from "@/components/AuthMessage";
import TituloIcone from "@/components/TituloIcone";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";

import { Text, View, StyleSheet, } from "react-native";

interface Relatorio {
    pomodoroTempo: string,
    pausaCurta: string,
    pausaLonga: string,
    tarefas: number
}

export default function Relatório() {

    const { isAuthenticated } = useAuth()

    return (
        <View style={styles.containerRelatorio}>

            <Text style={styles.tituloTela}>Relatório</Text>

            <TituloIcone titulo="ACÚMULO DE TEMPO" icone="timer-outline" />

            <View style={styles.card}>
                <Text style={styles.texto}>Pomodoro</Text>
                <Text style={styles.horasTexto}>00:00:00</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.texto}>Pausa Curta</Text>
                <Text style={styles.horasTexto}>00:00:00</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.texto}>Pausa Longa</Text>
                <Text style={styles.horasTexto}>00:00:00</Text>
            </View>

            <TituloIcone titulo="TAREFAS" icone="pin-outline" />

            {isAuthenticated ? (
                <View style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={styles.texto}>Concluídas</Text>
                    <Text style={styles.horasTexto}>30</Text>
                </View>
            ) : (
                <AuthMessage item="o relatório de Tarefas concluídas" />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    containerRelatorio: {
        flex: 1,
        padding: 18,
        gap: 30,
    },
    tituloTela: {
        color: "#171717",
        fontSize: 22
    },
    card: {
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 1,
        borderColor: '#D1717B',
        borderRadius: 12,
        justifyContent: 'space-between',
        gap: 10
    },
    texto: {
        fontSize: 15,
        color: "#535353",
        fontWeight: '500'
    },
    horasTexto: {
        fontSize: 28,
        color: "#535353",
        fontWeight: '400'
    }
})