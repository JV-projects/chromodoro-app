import React from "react";

import { useState } from "react";

import { Text, View, StyleSheet, TextInput, Switch } from "react-native";

import TituloIcone from "@/components/TituloIcone";
import LabelInput from "@/components/LabelInput";
import SwitchLabel from "@/components/SwitchLabel";

interface Configs {
    pausa: boolean,
    pomodoro: boolean,
    timers: boolean
}

export default function Configuracoes() {

    const configuracoesInit: Configs = {
        pausa: false,
        pomodoro: false,
        timers: false
    }

    const [pomodoroMinutos, setPomodoroMinutos] = useState("")
    const [pausaMinutos, setPausaMinutos] = useState("")
    const [pausaLongaMinutos, setPausaLongaMinutos] = useState("")

    const [configuracoes, setConfiguracoes] = useState(configuracoesInit)


    const onChangeToggle = (valor: keyof Configs) => {

        setConfiguracoes((prevState) => ({ ...prevState, [valor]: !prevState[valor] }))

    }

    return (
        <View style={styles.containerConfig}>

            <Text style={styles.tituloTela}>Configurações</Text>

            <TituloIcone titulo="TIMER" icone="timer-outline" />

            <View style={styles.containerInputs}>

                <View>
                    <Text style={{fontWeight: '500'}}>Tempo (minutos)</Text>
                </View>
                <View style={styles.viewInputs}>
                    <LabelInput label="Pomodoro"
                        inputMode="numeric"
                        value={pomodoroMinutos}
                        onChange={(e) => setPomodoroMinutos((e.target.value))} 
                        placeholder="0"/>

                    <LabelInput label="Pausa curta"
                        inputMode="numeric"
                        value={pausaMinutos}
                        onChange={(e) => setPausaMinutos((e.target.value))} 
                        placeholder="0"/>

                    <LabelInput label="Pausa longa"
                        inputMode="numeric"
                        value={pausaLongaMinutos}
                        onChange={(e) => setPausaLongaMinutos((e.target.value))} 
                        placeholder="0"/>
                </View>

            </View>

            <View style={{gap: 10}}>
                <SwitchLabel label="Iniciar pausa automaticamente" onChangeToggle={() => onChangeToggle('pausa')} value={configuracoes.pausa} />
                <SwitchLabel label="Iniciar pomodoro automaticamente" onChangeToggle={() => onChangeToggle('pomodoro')} value={configuracoes.pomodoro} />
            </View>

            <TituloIcone titulo="NOTIFICAÇÕES" icone="bell-outline" />

            <View>
                <SwitchLabel label="Notificar a troca dos timers" onChangeToggle={() => onChangeToggle('timers')} value={configuracoes.timers} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerConfig:{
        flex: 1,
        padding: 18,
        gap: 30
    },
    tituloTela:{
        color:"#171717",
        fontSize: 22
    },
    containerInputs:{
        gap: 10
    },
    viewInputs:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }   
})