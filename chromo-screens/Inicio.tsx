import Button from "@/components/Button";
import React, { useState, useRef, useEffect } from "react";
import { useConfig } from "@/contexts/ConfigContext";

import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Pressable } from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Tarefa from "@/components/Tarefa";
import { TarefaProps } from "@/components/Tarefa";
import Projeto from "@/components/Projeto";
import AuthMessage from "@/components/AuthMessage";
import { useAuth } from "@/contexts/AuthContext";


interface Tempo {
    minutos: number,
    segundos: number
}

interface Timer {
    pomodoro: {
        minutos: number,
        segundos: number,
    },
    pausaCurta: {
        minutos: number,
        segundos: number,
    },
    pausaLonga: {
        minutos: number,
        segundos: number,
    }
}

export default function Inicio() {

    const { token, isAuthenticated } = useAuth()

    const [tab, setTab] = useState(0)

    const { configuracoes } = useConfig();

    //Estados do timer
    const [pomodoroAtivo, setPomodoroAtivo] = useState(true);
    const [pausaCurtaAtiva, setPausaCurtaAtiva] = useState(false);
    const [pausaLongaAtiva, setPausaLongaAtiva] = useState(false);

    const [play, setPlay] = useState(false)

    const [mensagem, setMensagem] = useState("");

    const [tempo, setTempo] = useState<Tempo>({ minutos: 0, segundos: 0 })
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const timers = useRef<Timer>({
        pomodoro: { minutos: Number(configuracoes.pomodoro.minutos), segundos: 0 },
        pausaCurta: { minutos: Number(configuracoes.pausaCurta.minutos), segundos: 0 },
        pausaLonga: { minutos: Number(configuracoes.pausaLonga.minutos), segundos: 0 },
    })

    const iniciarModo = (modo: "pomodoro" | "pausaCurta" | "pausaLonga") => {

        // Reseta e pausa o timer
        setPomodoroAtivo(false);
        setPausaCurtaAtiva(false);
        setPausaLongaAtiva(false);
        setPlay(false);
        clearInterval(intervalRef.current as NodeJS.Timeout);

        // Mapeando cada estado
        const modos = {
            pomodoro: {
                setAtivo: setPomodoroAtivo,
                mensagem: "Hora do foco!",
                tempo: timers.current.pomodoro,
            },
            pausaCurta: {
                setAtivo: setPausaCurtaAtiva,
                mensagem: "Hora da pausa...",
                tempo: timers.current.pausaCurta,
            },
            pausaLonga: {
                setAtivo: setPausaLongaAtiva,
                mensagem: "Hora de uma boa pausa...",
                tempo: timers.current.pausaLonga,
            },
        };

        // Define o modo com base no parâmetro
        const { setAtivo, mensagem, tempo } = modos[modo];
        setAtivo(true);
        setMensagem(mensagem);
        setTempo({ minutos: tempo.minutos, segundos: 0 });
    };

    const iniciarTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setTempo(prevTempo => {

                /* Se minutos e segundo forem === 0 */

                if (prevTempo.minutos === 0 && prevTempo.segundos === 0) {
                    clearInterval(intervalRef.current as NodeJS.Timeout);
                    setMensagem("Tempo acabou!");
                    return { minutos: 0, segundos: 0 };

                    /* Se segundo forem === 0 reinicia a contagem de segundos*/
                } else if (prevTempo.segundos === 0) {
                    return { minutos: prevTempo.minutos - 1, segundos: 59 };

                } else {

                    return { minutos: prevTempo.minutos, segundos: prevTempo.segundos - 1 };
                }
            });
        }, 1000);
    };

    useEffect(() => {
        if (play) {
            iniciarTimer();

        } else if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        return () => clearInterval(intervalRef.current as NodeJS.Timeout);

    }, [play, timers]);

    // Atualiza o timer sempre que as configurações mudarem
    useEffect(() => {
        timers.current = {
            pomodoro: { minutos: Number(configuracoes.pomodoro.minutos), segundos: 0 },
            pausaCurta: { minutos: Number(configuracoes.pausaCurta.minutos), segundos: 0 },
            pausaLonga: { minutos: Number(configuracoes.pausaLonga.minutos), segundos: 0 },
        };

        iniciarModo('pomodoro')

    }, [configuracoes]);

    const trocarPlay = () => {
        setPlay(!play);
    };

    const tarefas: TarefaProps[] = [
        {
            titulo: "Estudar TypeScript",
            totalCiclos: 5,
            estCiclos: 3,
            status: "Em andamento",
            descricao: "Revisar conceitos de tipos, interfaces, generics e módulos no TypeScript."
        },
        {
            titulo: "Implementar API",
            totalCiclos: 8,
            estCiclos: 8,
            status: "Concluída",
            descricao: "Criar uma API RESTful com Node.js e Express, utilizando MongoDB para persistência."
        },
        {
            titulo: "Reunião de equipe",
            totalCiclos: 1,
            estCiclos: 0,
            status: "Em andamento",
            descricao: "Reunião para discutir o progresso do projeto e as próximas etapas."
        },
        {
            titulo: "Testar funcionalidades",
            totalCiclos: 3,
            estCiclos: 1,
            status: "Em andamento",
            descricao: "Testar todas as funcionalidades implementadas para garantir o funcionamento correto."
        }
    ];

    return (

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.viewInicio}>

                    <View style={styles.viewButtons}>
                        <Button onPress={() => iniciarModo('pomodoro')} label="Pomodoro" isClicado={pomodoroAtivo} />
                        <Button onPress={() => iniciarModo('pausaCurta')} label="Pausa curta" isClicado={pausaCurtaAtiva} />
                        <Button onPress={() => iniciarModo('pausaLonga')} label="Pausa longa" isClicado={pausaLongaAtiva} />
                    </View>

                    <View>
                        <Text style={styles.mensagem}>{mensagem}</Text>
                    </View>

                    <View style={styles.timerView}>
                        <Text style={styles.timerText}>{String(tempo.minutos).padStart(2, '0')}:{String(tempo.segundos).padStart(2, '0')}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={trocarPlay}>
                            {play ?
                                (<MaterialCommunityIcons name="pause-circle-outline" size={80} color="#535353" />) :
                                (<MaterialCommunityIcons name="play-circle-outline" size={80} color="#535353" />)}
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ padding: 15 }}>

                    <View style={styles.tabs}>
                        <Pressable style={styles.pressable} onPress={() => setTab(0)}>
                            <Text>Tarefas</Text>
                        </Pressable>
                        <Pressable style={styles.pressable} onPress={() => setTab(1)}>
                            <Text>Projetos</Text>
                        </Pressable>
                    </View>

                    {token && isAuthenticated ? (
                        <View>
                            {tab === 0 && <Tarefa tarefas={tarefas} />}
                            {tab === 1 && <Projeto />}
                        </View>
                    ) : (
                        <AuthMessage item="Tarefas e Projetos" />
                    )}

                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    viewInicio: {
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    mensagem: {
        color: "#D1717B",
        fontSize: 28,
        fontWeight: 600,
    },
    timerView: {
        borderWidth: 2,
        borderColor: "#D1717B",
        borderRadius: "100%",
        height: 250,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerText: {
        fontSize: 45,
        fontWeight: 600,
        color: "#D1717B",
    },
    tabs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        marginTop: 20
    },
    pressable: {
        width: '50%',
        alignItems: 'center'
    }
})