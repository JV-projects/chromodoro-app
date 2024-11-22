import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Pressable, Text, TextInput} from "react-native";
import {Button} from "@rneui/themed";

import Ionicons from '@expo/vector-icons/Ionicons';


import {useEffect} from "react";
import {Icon} from "@rneui/base";

export interface Tarefa {
    titulo: string;
    estCiclos: number;
    descricao: string;
}

export interface TarefaProps extends Tarefa {
    totalCiclos: number;
    status: "Em andamento" | "Concluída"
}

interface TarefasArray {
    tarefas: TarefaProps[]
}


export default function Tarefa({ tarefas }: TarefasArray) {

    const [exibeForm, setExibeForm] = useState<boolean>(false);
    const [formTarefa, setFormTarefa] = useState<Tarefa>({ titulo: "", estCiclos: 0, descricao: "" })

    console.log(formTarefa)

    const getData = (texto: string, prop: keyof Tarefa) => {

        setFormTarefa((prevState) => ({...prevState, [prop]: texto}));
    }

    const salvarTarefa = async () => {
        
    }

    const statusColor = (status: string): string => {

        const colors: { [key: string]: string } = {
            "Concluída": "#A1FFB3",
            "Em andamento": "#FFDEA1"
        };
    
        return colors[status];
    };


    return (
        <View style={{gap: 20}}>

            <TouchableOpacity style={styles.pressNovaTarefa} onPress={() => setExibeForm(true)}>
                <Ionicons name="add-circle-outline" size={24} color="black"/>
                <Text style={styles.pressText}>Nova tarefa</Text>
            </TouchableOpacity>

            {exibeForm && (
                <View style={styles.novaTarefa}>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(texto) => getData(texto, "titulo")} style={[styles.input, { width: '70%'}]} inputMode={"text"} placeholder={"Título da Tarefa"}/>
                        <TextInput onChangeText={(texto) => getData(texto, "estCiclos")} style={[styles.input, { width: '20%'}]} keyboardType={"number-pad"} placeholder={"Est Ciclos"}/>
                    </View>
                    <TextInput onChangeText={(texto) => getData(texto, "descricao")} style={styles.input} inputMode={"text"} multiline={true} maxLength={500} placeholder={"Descrição"}/>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', gap: 5}}>
                        <Button onPress={() => setExibeForm(false)} title={"Cancelar"} color={"#D1717B"}/>
                        <Button title={"Salvar"} color={"#D1717B"}/>
                    </View>
                </View>
            )}

            {tarefas.map((tarefa, index) => (
                <Pressable key={index} style={styles.pressable}>
                    <View style={{gap: 5}}>
                        <View style={styles.spacing}>
                            <Text style={styles.tituloTexto}>{tarefa.titulo}</Text>
                            <Text>{`${tarefa.totalCiclos} / ${tarefa.estCiclos}`}</Text>
                        </View>
                        <Text style={[styles.status, {backgroundColor: statusColor(tarefa.status)}]}>{tarefa.status}</Text>
                        <View style={styles.corpo}>
                            <View style={styles.viewDesc}>
                                <Text style={{fontSize: 13, color: "#535353"}}>{tarefa.descricao}</Text>
                            </View>
                            <View style={styles.viewBotao}>
                                <Button
                                    color={"#D1717B"}
                                    icon={<Icon
                                        name="delete"
                                        size={24}
                                        color="white"
                                    />}/>
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
        padding: 15,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 150,
    },
    spacing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tituloTexto: {
        fontSize: 18,
        color: "#535353",
        fontWeight: 500
    },
    corpo: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewDesc: {
        marginVertical: 10,
        width: '85%'
    },
    viewBotao: {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    pressNovaTarefa: {
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
    pressText: {
        fontSize: 16
    },
    novaTarefa: {
        display: "flex",
        backgroundColor: "#FCF2F0",
        borderColor: "#D1717B",
        padding: 15,
        borderWidth: 1,
        borderRadius: 8,
        gap: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5
    },
    status:{
        color: "#171717", 
        padding: 5, 
        backgroundColor: "#E2E2E2", 
        maxWidth: 130, 
        borderRadius: 12, 
        textAlign: 'center'
    }
})