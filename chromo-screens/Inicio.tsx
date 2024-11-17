import Button from "@/components/Button";
import React, { useState, useRef, useEffect } from "react";
import { useConfig } from "@/contexts/ConfigContext";

import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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

    return (
        <ScrollView>
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
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    viewInicio: {
        padding: 18,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    mensagem: {
        color: "#D1717B",
        fontSize: 24,
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
        fontSize: 40,
        fontWeight: 500,
        color: "#D1717B",
    }
})