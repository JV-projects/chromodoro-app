import React from "react";

import { useState } from "react";

import { Text, View, StyleSheet, TextInput, Switch } from "react-native";

import TituloIcone from "@/components/TituloIcone";
import LabelInput from "@/components/LabelInput";
import SwitchLabel from "@/components/SwitchLabel";

export default function Configuracoes() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
                <SwitchLabel label="Iniciar pausa automaticamente "/>
                <SwitchLabel label="Iniciar pomodoro automaticamente"/>
            </View>

            <TituloIcone titulo="ALARME" icone="timer-outline" />

            <View>
                <SwitchLabel label="Tocar alarme na troca de timers"/>
            </View>
        </View>
    )
}