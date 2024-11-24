
import AuthMessage from "@/components/AuthMessage";
import TituloIcone from "@/components/TituloIcone";
import { useAuth } from "@/contexts/AuthContext";
import React, { useState, useCallback } from "react";

import { useFocusEffect } from '@react-navigation/native'

import { Text, View, StyleSheet, } from "react-native";
import { lerItem } from "@/service/localStorage";
import { get } from "@/service/api";
import { LoginResponse, TarefaResponse } from "@/service/apiTypes";
import { TarefaController } from "@/assets/endpoints/Endpoints";

interface Relatorio {
    pomodoro: string,
    pausaCurta: string,
    pausaLonga: string,
}
export default function Relatório() {

    const { token, isAuthenticated } = useAuth()

    const [relatorio, setRelatorio] = useState<Relatorio>({ pomodoro: "0", pausaCurta: "0", pausaLonga: "0" })

    const [tarefasConcluidas, setTarefasConcluidas] = useState(0)


    const calcularTarefas = (tarefas: TarefaResponse[]) => {

        if (tarefas) {
            const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.status === "Concluída");
            setTarefasConcluidas(tarefasFiltradas.length);
        }
 
    }

    useFocusEffect(
        useCallback(() => {


            const carregarTarefas = async () => {

                if(isAuthenticated && token){

                    const usuario : LoginResponse = await lerItem('usuarioAutenticado')
    
                    console.log("usuario: " + usuario.username)

                    const resposta = await get<TarefaResponse[]>(TarefaController.consultarTarefas(usuario.username), token)
    
                   calcularTarefas(resposta.data)

                }

            }

            const carregarRelatorio = async () => {
                const relatorioStorage = await lerItem('relatorio');
                if (relatorioStorage) {
                    setRelatorio({
                        pomodoro: formatarTempo(relatorioStorage.pomodoro),
                        pausaCurta: formatarTempo(relatorioStorage.pausaCurta),
                        pausaLonga: formatarTempo(relatorioStorage.pausaLonga)
                    });
                }
            }

            carregarTarefas();
            carregarRelatorio();


        }, []))
    

    const formatarTempo = (tempo: number) : string => {

        const horas = Math.floor(tempo / (1000 * 60 * 60));
        const minutos = Math.floor((tempo % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tempo % (1000 * 60)) / 1000);

        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    }

    return (
        <View style={styles.containerRelatorio}>

            <Text style={styles.tituloTela}>Relatório</Text>

            <TituloIcone titulo="ACÚMULO DE TEMPO" icone="timer-outline" />

            <View style={styles.card}>
                <Text style={styles.texto}>Pomodoro</Text>
                <Text style={styles.horasTexto}>{relatorio.pomodoro}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.texto}>Pausa Curta</Text>
                <Text style={styles.horasTexto}>{relatorio.pausaCurta}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.texto}>Pausa Longa</Text>
                <Text style={styles.horasTexto}>{relatorio.pausaLonga}</Text>
            </View>

            <TituloIcone titulo="TAREFAS" icone="pin-outline" />

            {isAuthenticated ? (
                <View style={[styles.card, { flexDirection: 'row' , alignItems: 'center'}]}>
                    <Text style={styles.texto}>Concluídas</Text>
                    <Text style={[styles.horasTexto, {textAlign: 'right'}]}>{tarefasConcluidas}</Text>
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
        fontWeight: '400',
    }
})