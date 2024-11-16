import Button from "@/components/Button";
import React, { useState, useRef, useEffect } from "react";

import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Tempo {
    minutos: number,
    segundos: number
}

export default function Inicio() {

    const [pomodoroAtivo, setPomodoroAtivo] = useState(false);
    const [pausaCurtaAtiva, setPausaCurtaAtiva] = useState(false);
    const [pausaLongaAtiva, setPausaLongaAtiva] = useState(false);

    const [play, setPlay] = useState(false)

    const [mensagem, setMensagem] = useState("");

    const [tempo, setTempo] = useState<Tempo>({ minutos: 0, segundos: 0 })

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleStateFalse = () => {
        setPomodoroAtivo(false)
        setPausaLongaAtiva(false)
        setPausaCurtaAtiva(false)

        setPlay(false)

        clearInterval(intervalRef.current as NodeJS.Timeout);
        setTempo({ minutos: 0, segundos: 0 });
    }

    const handleIniciarPomodoro = () => {
        handleStateFalse()
        setPomodoroAtivo(true)
        setMensagem("Hora do foco!")

        setTempo({ minutos: 0, segundos: 3 });
    }

    const handleIniciarPausaCurta = () => {
        handleStateFalse()
        setPausaCurtaAtiva(true)
        setMensagem("Hora da pausa...")

        setTempo({ minutos: 0, segundos: 5 });
    }

    const handleIniciarPausaLonga = () => {
        handleStateFalse()
        setPausaLongaAtiva(true)
        setMensagem("Hora de uma boa pausa...")
        setTempo({ minutos: 0, segundos: 1 });
    }

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
                    /* Se segundo forem === 0 reinicia a contagem de segundos*/
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

    }, [play]);

    const trocarPlay = () => {
        setPlay(!play);
      };

    return (
        <ScrollView>
            <View style={styles.viewInicio}>

                <View style={styles.viewButtons}>
                    <Button onPress={handleIniciarPomodoro} label="Pomodoro" isClicado={pomodoroAtivo} />
                    <Button onPress={handleIniciarPausaCurta} label="Pausa curta" isClicado={pausaCurtaAtiva} />
                    <Button onPress={handleIniciarPausaLonga} label="Pausa longa" isClicado={pausaLongaAtiva} />
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