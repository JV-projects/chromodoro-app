import React, {useCallback, useEffect, useRef, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View, Alert} from "react-native";
import Button from "@/components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {useConfig} from "@/contexts/ConfigContext";
import {guardarItem, lerItem} from "@/service/localStorage";
import {useCiclo} from "@/contexts/CicloContext";
import { useFocusEffect } from 'expo-router';

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

export default function Timer(){

    const { ciclo, setCiclo } = useCiclo()

    const { configuracoes } = useConfig();

    //Estados do timer
    const [pomodoroAtivo, setPomodoroAtivo] = useState(true);
    const [pausaCurtaAtiva, setPausaCurtaAtiva] = useState(false);
    const [pausaLongaAtiva, setPausaLongaAtiva] = useState(false);

    const [play, setPlay] = useState(false)

    const [mensagem, setMensagem] = useState("");

    const [tempo, setTempo] = useState<Tempo>({minutos: 0, segundos: 0})
    const [tempoRestante, setTempoRestante] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const timers = useRef<Timer>({
        pomodoro: {minutos: Number(configuracoes.pomodoro.minutos), segundos: 0},
        pausaCurta: {minutos: Number(configuracoes.pausaCurta.minutos), segundos: 0},
        pausaLonga: {minutos: Number(configuracoes.pausaLonga.minutos), segundos: 0},
    })

    const iniciarModo = (modo: "pomodoro" | "pausaCurta" | "pausaLonga", iniciarAutomaticamente = false) => {

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
        const {setAtivo, mensagem, tempo} = modos[modo];
        setAtivo(true);
        setMensagem(mensagem);

        //0.1 gambiarra porque o timer iniciava a contagem de 58s
        const msRestantes = (tempo.minutos * 60 + tempo.segundos + 0.1) * 1000;
        setTempoRestante(msRestantes);
        setTempo({minutos: tempo.minutos, segundos: 0});

        if (iniciarAutomaticamente) {
            setPlay(true);
        }
    };

    const calcTimer = (distancia: number) => {

        let minutes = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distancia % (1000 * 60)) / 1000);

        return {minutos: minutes, segundos: seconds};
    }

    const alternarCiclo = () => {

        if (pomodoroAtivo) {
            setCiclo(ciclo + 1)

            if (ciclo % 4 === 0) {
                iniciarModo("pausaLonga", configuracoes.pausaAutomatica)

            } else {
                iniciarModo("pausaCurta", configuracoes.pausaAutomatica)
            }

        } else {
            iniciarModo('pomodoro', configuracoes.pomodoroAutomatico)

        }

    }

    const contagemTimer = () => {
        const tempoFinal = new Date().getTime() + tempoRestante;

        setTempo(calcTimer(tempoRestante));

        intervalRef.current = setInterval(() => {
            const agora = new Date().getTime();
            const distancia = tempoFinal - agora;

            if (distancia <= 0) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                setMensagem("Tempo acabou!");
                alternarCiclo();
            } else {
                setTempo(calcTimer(distancia));
                setTempoRestante(distancia);
            }
        }, 1000);
    };

    const salvarHoras = async () => {

        let relatorio = {
            pomodoro: 0,
            pausaCurta: 0,
            pausaLonga: 0
        }

        // Pegando o relatório da local storage
        const relatorioStorage = await lerItem('relatorio')
        if (relatorioStorage) {
            relatorio = relatorioStorage
        }

        //Pegando o current do timers
        const {pomodoro, pausaCurta, pausaLonga} = timers.current

        // Verificando e atualizando valores
        const tempoEmMs = (tempo.minutos * 60 + tempo.segundos) * 1000;

        if (pomodoroAtivo) {

            const timerEmMs = (pomodoro.minutos * 60 + pomodoro.segundos) * 1000;
            relatorio.pomodoro += (timerEmMs - tempoEmMs);

        } else if (pausaCurtaAtiva) {

            const timerEmMs = (pausaCurta.minutos * 60 + pausaCurta.segundos) * 1000;
            relatorio.pausaCurta += (timerEmMs - tempoEmMs);

        } else if (pausaLongaAtiva) {

            const timerEmMs = (pausaLonga.minutos * 60 + pausaLonga.segundos) * 1000;
            relatorio.pausaLonga += (timerEmMs - tempoEmMs);
        }

        // Salvando de novo
        await guardarItem(relatorio, 'relatorio');
    }

    useEffect(() => {

        if (play) {
            contagemTimer();

        } else if (intervalRef.current) {
            salvarHoras()
            clearInterval(intervalRef.current)
        }

    }, [play, mensagem]);

    // Atualiza o timer sempre que as configurações mudarem
    useEffect(() => {
        timers.current = {
            pomodoro: calcTimer(Number(configuracoes.pomodoro.minutos) * 60 * 1000),
            pausaCurta: calcTimer(Number(configuracoes.pausaCurta.minutos) * 60 * 1000),
            pausaLonga: calcTimer(Number(configuracoes.pausaLonga.minutos) * 60 * 1000),
        };

        iniciarModo('pomodoro')

    }, [configuracoes]);



    const trocarPlay = () => {
        setPlay(!play);
    };

    const resetarTimer = () => {

        Alert.alert("Resetar",
            `Deseja resetar ciclo de pomodoro?`, [
                {
                    text: "Cancelar",
                },
                {
                    text: "Resetar",
                    onPress: () => setCiclo(1),
                }
            ])

    }

    return(
        <View style={styles.viewInicio}>

            <View style={styles.viewButtons}>
                <Button onPress={() => iniciarModo('pomodoro')} label="Pomodoro" isClicado={pomodoroAtivo}/>
                <Button onPress={() => iniciarModo('pausaCurta')} label="Pausa curta"
                        isClicado={pausaCurtaAtiva}/>
                <Button onPress={() => iniciarModo('pausaLonga')} label="Pausa longa"
                        isClicado={pausaLongaAtiva}/>
            </View>

            <View>
                <Text style={styles.mensagem}>{mensagem}</Text>
            </View>

            <View style={styles.timerView}>
                <Text
                    style={styles.timerText}>{String(tempo.minutos).padStart(2, '0')}:{String(tempo.segundos).padStart(2, '0')}</Text>
            </View>

            <View style={{alignItems: 'center', gap: 10}}>

            <View>
                <TouchableOpacity onPress={resetarTimer}>
                <Text style={{fontSize: 22}}>#{ciclo}</Text>
                </TouchableOpacity>
                
            </View>
                <TouchableOpacity onPress={trocarPlay}>
                    {play ?
                        (<MaterialCommunityIcons name="pause-circle-outline" size={80} color="#535353"/>) :
                        (<MaterialCommunityIcons name="play-circle-outline" size={80} color="#535353"/>)}
                </TouchableOpacity>
            </View>
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
        gap: 42,
    },
    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    mensagem: {
        color: "#D1717B",
        fontSize: 28,
        fontWeight: 700,
    },
    timerView: {
        borderWidth: 2,
        borderColor: "#D1717B",
        borderRadius: "100%",
        height: 280,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerText: {
        fontSize: 50,
        fontWeight: 600,
        color: "#D1717B",
    },
    tabs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
        borderBottomWidth: 2,
        borderColor: '#D1717B'
    },
    pressable: {
        width: '50%',
        padding: 10,
        alignItems: 'center',

    }
})