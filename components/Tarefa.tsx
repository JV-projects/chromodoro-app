import React from "react";
import {View, StyleSheet, TouchableOpacity, Pressable, Text} from "react-native";
import {Button} from "@rneui/themed";

export interface TarefaProps {
    titulo: string;
    totalCiclos: number;
    estCiclos: number;
    status: "Em andamento" | "Concluída"
    descricao: string;
}


export default function Tarefa({ titulo, totalCiclos, estCiclos, status, descricao } : TarefaProps) {

    return (
        <Pressable style={styles.pressable}>
            <View>
                <View style={styles.spacing}>
                    <Text style={styles.tituloTexto}>{titulo}</Text>
                    <Text>{`${totalCiclos} / ${estCiclos}`}</Text>
                </View>
                <Text>{status}</Text>
                <View style={styles.corpo}>
                    <View style={styles.viewDesc}>
                        <Text style={{fontSize: 13}}>{descricao}</Text>
                    </View>
                    <View style={styles.viewBotao}>
                        <Button title={"Excluir"}/>
                        <Button title={"Salvar"}/>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        display: "flex",
        backgroundColor: "white",
        padding: 10,
        borderColor: "#35404a",
        borderWidth: 1,
        borderRadius: 8,
    },
    spacing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tituloTexto: {
        fontSize: 18,
        fontWeight: 700
    },
    corpo: {
        borderTopColor: '#35404a',
        borderTopWidth: 0.5,
    },
    viewDesc: {
        marginVertical: 10,
    },
    viewBotao: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    }
})