import React from "react";
import { View, StyleSheet, TouchableOpacity, Pressable, Text } from "react-native";
import { Button } from "@rneui/themed";

import Ionicons from '@expo/vector-icons/Ionicons';


import { useEffect } from "react";

export interface TarefaProps {
    titulo: string;
    totalCiclos: number;
    estCiclos: number;
    status: "Em andamento" | "Concluída"
    descricao: string;
}

interface TarefasArray {
    tarefas: TarefaProps[]
}


export default function Tarefa({ tarefas }: TarefasArray) {


    useEffect(() => {



    }, [])

    return (
        <View style={{gap: 20}}>

            <TouchableOpacity style={styles.pressNovaTarefa}>
                <Ionicons name="add-circle-outline" size={24} color="black" />
                <Text style={styles.pressText}>Nova tarefa</Text>
            </TouchableOpacity>

            {tarefas.map((tarefa, index) => (
                <Pressable key={index} style={styles.pressable}>
                    <View>
                        <View style={styles.spacing}>
                            <Text style={styles.tituloTexto}>{tarefa.titulo}</Text>
                            <Text>{`${tarefa.totalCiclos} / ${tarefa.estCiclos}`}</Text>
                        </View>
                        <Text>{tarefa.status}</Text>
                        <View style={styles.corpo}>
                            <View style={styles.viewDesc}>
                                <Text style={{ fontSize: 13 }}>{tarefa.descricao}</Text>
                            </View>
                            <View style={styles.viewBotao}>
                                <Button title="Excluir" />
                            </View>
                        </View>
                    </View>
                </Pressable>
            ))}
        </View>
    )

}

const styles = StyleSheet.create({
    pressable: {
        display: "flex",
        backgroundColor: "#FCF2F0",
        padding: 15,
        borderColor: "#D1717B",
        borderWidth: 1,
        borderRadius: 8,
        height: 200,
        
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
    },
    pressNovaTarefa:{
        width: '100%',
        marginTop: 10,
        height: 55,
        borderWidth: 1,
        borderColor: "#171717",
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        borderStyle: 'dashed'
    },
    pressText:{
        fontSize: 16
    }
})