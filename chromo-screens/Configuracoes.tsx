import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import TituloIcone from "@/components/TituloIcone";
import LabelInput from "@/components/LabelInput";
import SwitchLabel from "@/components/SwitchLabel";
import { useConfig } from "@/contexts/ConfigContext";
import { guardarItem } from "@/service/localStorage";

export default function Configuracoes() {
    const { configuracoes, setConfiguracoes } = useConfig();

    const onChangeToggle = (valor: keyof typeof configuracoes) => {
        setConfiguracoes((prevState) => {
            const newConfig = { ...prevState, [valor]: !prevState[valor] };
            guardarItem(newConfig, 'configuracoes');
            return newConfig;
        });
    };

    const onChangeInputs = (campo: keyof typeof configuracoes, valor: string) => {
        setConfiguracoes((prevState) => {
            const newConfig = { ...prevState, [campo]: { minutos: valor } };
            guardarItem(newConfig, 'configuracoes');
            return newConfig;
        });
    };

    return (
        <View style={styles.containerConfig}>
            <Text style={styles.tituloTela}>Configurações</Text>
            <TituloIcone titulo="TIMER" icone="timer-outline" />
            <View style={styles.containerInputs}>
                <View>
                    <Text style={{ fontWeight: '500' }}>Tempo (minutos)</Text>
                </View>
                <View style={styles.viewInputs}>
                    <LabelInput
                        label="Pomodoro"
                        inputMode="numeric"
                        value={configuracoes.pomodoro.minutos}
                        onChange={(valor) => onChangeInputs('pomodoro', valor)}
                        placeholder="0"
                    />
                    <LabelInput
                        label="Pausa curta"
                        inputMode="numeric"
                        value={configuracoes.pausaCurta.minutos}
                        onChange={(valor) => onChangeInputs('pausaCurta', valor)}
                        placeholder="0"
                    />
                    <LabelInput
                        label="Pausa longa"
                        inputMode="numeric"
                        value={configuracoes.pausaLonga.minutos}
                        onChange={(valor) => onChangeInputs('pausaLonga', valor)}
                        placeholder="0"
                    />
                </View>
            </View>
            <View style={{ gap: 10 }}>
                <SwitchLabel
                    label="Iniciar pausa automaticamente"
                    onChangeToggle={() => onChangeToggle('pausaAutomatica')}
                    value={configuracoes.pausaAutomatica}
                />
                <SwitchLabel
                    label="Iniciar pomodoro automaticamente"
                    onChangeToggle={() => onChangeToggle('pomodoroAutomatico')}
                    value={configuracoes.pomodoroAutomatico}
                />
            </View>
            <TituloIcone titulo="NOTIFICAÇÕES" icone="bell-outline" />
            <View>
                <SwitchLabel
                    label="Notificar a troca dos timers"
                    onChangeToggle={() => onChangeToggle('notifica')}
                    value={configuracoes.notifica}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerConfig: {
        flex: 1,
        padding: 18,
        gap: 30
    },
    tituloTela: {
        color: "#171717",
        fontSize: 22
    },
    containerInputs: {
        gap: 10
    },
    viewInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})