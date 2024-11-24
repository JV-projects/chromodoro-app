import React, {useCallback, useEffect, useState} from "react";
import {Text, View, StyleSheet, ScrollView, Pressable} from "react-native";
import TarefaList, {TarefaForm} from "@/components/TarefaList";
import Projeto from "@/components/Projeto";
import AuthMessage from "@/components/AuthMessage";
import {useAuth} from "@/contexts/AuthContext";
import {lerItem} from "@/service/localStorage";
import {LoginResponse, TarefaResponse} from "@/service/apiTypes";
import {Tarefa} from "@/components/TarefaList"
import {TarefaController} from "@/assets/endpoints/Endpoints";
import {atualizar, deletar, get, post} from "@/service/api";
import Toast from "react-native-root-toast";
import Timer from "@/components/Timer"
import {useCiclo} from "@/contexts/CicloContext";


export default function Inicio() {

    const {ciclo} = useCiclo()

    const {token, isAuthenticated} = useAuth()

    const [tab, setTab] = useState(0)

    const [tarefaSelecionada, setTarefaSelecionada] = useState<Tarefa>({
        descricao: "",
        estCiclos: 0,
        id: "",
        status: "",
        titulo: "",
        totalCiclos: 0
    })

    const [formTarefa, setFormTarefa] = useState<TarefaForm>({
        titulo: "",
        estCiclos: 0,
        descricao: "",
        status: "ANDAMENTO"
    })

    const [listaTarefas, setListaTarefas] = useState<TarefaResponse[]>([])

    const [exibeForm, setExibeForm] = useState<boolean>(false);

    const carregarTarefas = async () => {

        const usuario: LoginResponse = await lerItem("usuarioAutenticado")

        try {
            const resposta =
                await get<TarefaResponse[]>(TarefaController.consultarTarefas(usuario.username), token)

            const data = resposta.data

            if (resposta.status == 200) {
                setListaTarefas(data)
            }
        } catch (erro) {
            let toast = Toast.show(`Erro ao carregar: ${erro}`, {
                duration: Toast.durations.LONG
            })
        }
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
            await carregarTarefas()
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
            await carregarTarefas()
        } catch (erro) {
            let toast = Toast.show(`Erro ao salvar: ${erro}`, {
                duration: Toast.durations.LONG
            })
        }
    }

    const atualizarTarefa = async () => {
        try {
            const resposta =
                await atualizar<Tarefa, TarefaResponse>(tarefaSelecionada,
                    TarefaController.atualizarTarefa,
                    token)

            await carregarTarefas()
        } catch (erro) {
            let toast = Toast.show(`Erro ao atualizar: ${erro}`, {
                duration: Toast.durations.LONG
            })
        }
    }

    useEffect(() => {
        carregarTarefas()
    }, [])


    useEffect(() => {
        if (tarefaSelecionada.id) {
            setTarefaSelecionada(prevTarefa => ({
                ...prevTarefa,
                totalCiclos: ciclo
            }));

            atualizarTarefa();
        }
    }, [ciclo])


    return (

        <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={styles.scrollView}>

                <Timer/>

                <View style={{padding: 15}}>

                    <View style={styles.tabs}>
                        <Pressable style={styles.pressable} onPress={() => setTab(0)}>
                            <Text style={{fontWeight: 700, color: "#535353"}}>Tarefas</Text>
                        </Pressable>
                        <Pressable style={styles.pressable} onPress={() => setTab(1)}>
                            <Text style={{fontWeight: 700, color: "#535353"}}>Projetos</Text>
                        </Pressable>
                    </View>

                    {token && isAuthenticated ? (
                        <View>
                            {tab === 0 && <TarefaList tarefaSelecionada={tarefaSelecionada}
                                                      setTarefaSelecionada={setTarefaSelecionada}
                                                      exibeForm={exibeForm} setExibeForm={setExibeForm}
                                                      setFormTarefa={setFormTarefa}
                                                      listaTarefas={listaTarefas} salvarTarefa={salvarTarefa}
                                                      deletarTarefa={deletarTarefa}/>}
                            {tab === 1 && <Projeto/>}
                        </View>
                    ) : (
                        <AuthMessage item="Tarefas e Projetos"/>
                    )}

                </View>
            </ScrollView>
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
        gap: 50,
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