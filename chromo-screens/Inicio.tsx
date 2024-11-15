import Button from "@/components/Button";
import React, { useState } from "react";

import { Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Inicio() {

    const [pomodoroAtivo, setPomodoroAtivo] = useState(false);
    const [pausaCurtaAtiva, setPausaCurtaAtiva] = useState(false);
    const [pausaLongaAtiva, setPausaLongaAtiva] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const [tempo] = useState("00:00")

    const handleStateFalse = () => {

        setPomodoroAtivo(false)
        setPausaLongaAtiva(false)
        setPausaCurtaAtiva(false)

    }

    const handleIniciarPomodoro = () => {
        handleStateFalse()
        setPomodoroAtivo(true)
        setMensagem("Hora do foco!")
    }

    const handleIniciarPausaCurta = () => {
        handleStateFalse()
        setPausaCurtaAtiva(true)
        setMensagem("Hora da pausa...")
    }

    const handleIniciarPausaLonga = () => {
        handleStateFalse()
        setPausaLongaAtiva(true)
        setMensagem("Hora de uma boa pausa...")
    }

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
                    <Text style={styles.timerText}>{tempo}</Text>
                </View>

                <View>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="play-circle-outline" size={80} color="#535353" />
                        {/* <MaterialCommunityIcons name="pause-circle-outline" size={24} color="black" /> */}
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
    timerView:{
        borderWidth: 2,
        borderColor: "#D1717B",
        borderRadius: "100%",
        height: 250,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerText:{
        fontSize: 40,
        fontWeight: 500,
        color: "#D1717B",
    }
})