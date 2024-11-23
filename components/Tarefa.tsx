import React, {useState} from "react";
import {View, StyleSheet, TouchableOpacity, Pressable, Text, TextInput} from "react-native";
import {Button} from "@rneui/themed";

import Ionicons from '@expo/vector-icons/Ionicons';


import {useEffect} from "react";
import {Icon} from "@rneui/base";
import {lerItem} from "@/service/localStorage";
import {deletar, get, post} from "@/service/api";
import {LoginResponse, TarefaResponse} from "@/service/apiTypes";
import {TarefaController} from "@/assets/endpoints/Endpoints";
import Toast from "react-native-root-toast";
import {useAuth} from "@/contexts/AuthContext";

export interface TarefaForm {
    titulo: string;
    estCiclos: number;
    descricao: string;
    status: string;
}

interface Tarefa extends TarefaForm {
    id: string;
    totalCiclos: number;
    status: "Em andamento | Concluída"
}

export default function Tarefa() {

    const {token} = useAuth()

    const [exibeForm, setExibeForm] = useState<boolean>(false);
    const [formTarefa, setFormTarefa] = useState<TarefaForm>({
        titulo: "",
        estCiclos: 0,
        descricao: "",
        status: "ANDAMENTO"
    })
    const [listaTarefas, setListaTarefas] = useState<TarefaResponse[]>([])

    // tem que passar a lógica da tarefa selecionada pra o Inicio, para poder saber qual tarefa irá ser atualizada
    // na questão de ciclos concluidos/status
    const [tarefaSelecionada, setTarefaSelecionada] = useState<TarefaResponse>()

    console.log(tarefaSelecionada)

    const carregarTarefas = async () => {

        const usuario: LoginResponse = await lerItem("usuarioAutenticado")

        try {
            const resposta =
                await get<TarefaResponse[]>(TarefaController.consultarTarefas(usuario.username), token)

            const data = resposta.data

            if (resposta.status == 200) {
                if (data.length != listaTarefas.length) {
                    setListaTarefas(data)
                }
            }
        } catch (erro) {
            let toast = Toast.show(`Erro ao carregar: ${erro}`, {
                duration: Toast.durations.LONG
            })
        }
    }


    useEffect(() => {

        carregarTarefas()

    }, [listaTarefas])

    const getData = (texto: string, prop: keyof TarefaForm) => {

        setFormTarefa((prevState) => ({...prevState, [prop]: texto}));
    }

    const salvarTarefa = async () => {
        const usuario: LoginResponse = await lerItem("usuarioAutenticado")

        try {
            const resposta =
                await post<TarefaForm, TarefaResponse>(formTarefa,
                    TarefaController.salvarTarefa(usuario.username),
                    token)
            let toast = Toast.show(`Tarefa ${resposta.data.titulo} salva com sucesso!`, {
                duration: Toast.durations.LONG
            })

            setExibeForm(!exibeForm)
            setListaTarefas([])
        } catch (erro) {
            let toast = Toast.show(`Erro ao salvar: ${erro}`, {
                duration: Toast.durations.LONG
            })
        }
    }

    const deletarTarefa = async (id: string) => {
        try {
            const resposta =
                await deletar<string>(TarefaController.deletarTarefa, id, token)

            let toast = Toast.show(resposta.data, {
                duration: Toast.durations.LONG
            })
            setListaTarefas([])
        } catch (erro) {
            let toast = Toast.show(`Erro ao salvar: ${erro}`, {
                duration: Toast.durations.LONG
            })
        }
    }

    const statusColor = (status: string): string => {

        const colors: { [key: string]: string } = {
            "Concluída": "#A1FFB3",
            "Em andamento": "#FFDEA1"
        };

        return colors[status];
    };

    const estiloSelecionada = (id: string) => {

        let estilo = {}

        if (id == tarefaSelecionada?.id) {
            estilo = {
                borderLeftWidth: 4,
                borderColor: "#35404a"
            }
        }

        return estilo
    }


    return (
        <View style={{gap: 20}}>

            <TouchableOpacity style={styles.pressNovaTarefa} onPress={() => setExibeForm(true)}>
                <Ionicons name="add-circle-outline" size={24} color="black"/>
                <Text style={styles.pressText}>Nova tarefa</Text>
            </TouchableOpacity>

            {exibeForm && (
                <View style={styles.novaTarefa}>
                    <View style={styles.inputContainer}>
                        <TextInput onChangeText={(texto) => getData(texto, "titulo")}
                                   style={[styles.input, {width: '70%'}]} inputMode={"text"}
                                   placeholder={"Título da Tarefa"}/>
                        <TextInput onChangeText={(texto) => getData(texto, "estCiclos")}
                                   style={[styles.input, {width: '20%'}]} keyboardType={"number-pad"}
                                   placeholder={"Est Ciclos"}/>
                    </View>
                    <TextInput onChangeText={(texto) => getData(texto, "descricao")} style={styles.input}
                               inputMode={"text"} multiline={true} maxLength={500} placeholder={"Descrição"}/>
                    <View style={{flexDirection: 'row', alignSelf: 'flex-end', gap: 5}}>
                        <Button onPress={() => setExibeForm(false)} title={"Cancelar"} color={"#D1717B"}/>
                        <Button onPress={salvarTarefa} title={"Salvar"} color={"#D1717B"}/>
                    </View>
                </View>
            )}

            {listaTarefas.map((tarefa) => (
                <Pressable key={tarefa.id} style={[styles.pressable, estiloSelecionada(tarefa.id)]} onPress={() => setTarefaSelecionada(tarefa)}>
                    <View style={{gap: 5}}>
                        <View style={styles.spacing}>
                            <Text style={styles.tituloTexto}>{tarefa.titulo}</Text>
                            <Text>{`${tarefa.estCiclos} / ${tarefa.totalCiclos}`}</Text>
                        </View>
                        <Text
                            style={[styles.status, {backgroundColor: statusColor(tarefa.status)}]}>{tarefa.status}</Text>
                        <View style={styles.corpo}>
                            <View style={styles.viewDesc}>
                                <Text style={{fontSize: 13, color: "#535353"}}>{tarefa.descricao}</Text>
                            </View>
                            <View style={styles.viewBotao}>
                                <Button
                                    onPress={() => deletarTarefa(tarefa.id)}
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
        borderStyle: 'dashed'
    },
    pressText: {
        fontSize: 16
    },
    novaTarefa: {
        display: "flex",
        padding: 15,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 150,
        gap: 10
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        width: '100%',
        height: 50,
        padding: 10,
        backgroundColor: "#ececec",
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1
    },
    status: {
        color: "#171717",
        padding: 5,
        backgroundColor: "#E2E2E2",
        maxWidth: 130,
        borderRadius: 12,
        textAlign: 'center'
    }
})