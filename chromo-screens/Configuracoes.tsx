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

    const configuracoesInit : Configs = {
        pausa: false, 
        pomodoro: false, 
        timers: false
    }

    const [configuracoes, setConfiguracoes] = useState(configuracoesInit)


    const onChangeToggle = (valor: keyof Configs) => {

        setConfiguracoes((prevState) => ({...prevState, valor: !prevState[valor]}))

    }

    return (
        <View>

            <Text>Configurações</Text>

            <TituloIcone titulo="TIMER" icone="timer-outline" />

            <View>

                <View>
                    <Text>Tempo (minutos)</Text>
                </View>
                <View>
                    <LabelInput label="Pomodoro"/>

                    <LabelInput label="Pausa curta"/>

                    <LabelInput label="Pausa longa"/>
                </View>

            </View>

            <View>
                <SwitchLabel label="Iniciar pausa automaticamente" onChangeToggle={() => onChangeToggle('pausa')} value={configuracoes.pausa} />
                <SwitchLabel label="Iniciar pomodoro automaticamente" onChangeToggle={() => onChangeToggle('pomodoro')} value={configuracoes.pomodoro}/>
            </View>

            <TituloIcone titulo="ALARME" icone="timer-outline" />

            <View>
                <SwitchLabel label="Tocar alarme na troca de timers" onChangeToggle={() => onChangeToggle('pomodoro')} value={configuracoes.timers}/>
            </View>
        </View>
    )
}