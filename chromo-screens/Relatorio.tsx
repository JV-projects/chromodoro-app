
import TituloIcone from "@/components/TituloIcone";
import React from "react";

import { Text, View, StyleSheet, } from "react-native";

interface Relatorio {
    pomodoroTempo: string,
    pausaCurta: string,
    pausaLonga: string,
    tarefas: number
}

export default function Relatório() {
    return (
        <View style={styles.containerRelatorio}>

            <Text style={styles.tituloTela}>Relatório</Text>

            <TituloIcone titulo="ACÚMULO DE TEMPO" icone="timer-outline" />

            <View style={styles.card}>
                <Text style={{fontSize: 15, color: "#535353", fontWeight: '500'}}>Pomodoro</Text>
                <Text  style={{fontSize: 28, color: "#535353", fontWeight: '400'}}>00:00:00</Text>
            </View>

            <View style={styles.card}>
                <Text style={{fontSize: 15, color: "#535353", fontWeight: '500'}}>Pausa Curta</Text>
                <Text  style={{fontSize: 28, color: "#535353", fontWeight: '400'}}>00:00:00</Text>
            </View>

            <View style={styles.card}>
                <Text style={{fontSize: 15, color: "#535353", fontWeight: '500'}}>Pausa Longa</Text>
                <Text style={{fontSize: 28, color: "#535353", fontWeight: '400'}}>00:00:00</Text>
            </View>

            <TituloIcone titulo="TAREFAS" icone="pin-outline" />

            <View style={[styles.card, {flexDirection: 'row', alignItems: 'center'}]}>
                <Text style={{fontSize: 15, color: "#535353", fontWeight: '500'}}>Concluídas</Text>
                <Text style={{fontSize: 28, color: "#535353", fontWeight: '400'}}>30</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerRelatorio:{
        flex: 1,
        padding: 18,
        gap: 30
    },
    tituloTela:{
        color:"#171717",
        fontSize: 22
    },
    card:{
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth: 1,
        borderColor: '#D1717B',
        borderRadius: 12,
        justifyContent: 'space-between',
        gap: 10
    },
})