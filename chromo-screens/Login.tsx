import React from "react";
import {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Pressable, StyleSheet, Alert} from "react-native";
import {post} from "@/service/api";
import {UsuarioController} from "@/assets/endpoints/Endpoints";
import {useNavigation} from "@react-navigation/native";
import {guardarItem} from "@/service/localStorage";
import Toast from 'react-native-root-toast';
import { useAuth } from "@/contexts/AuthContext";

type Login = {
    handleTrocaForm: () => void
}

interface FormLogin {
    username: string,
    senha: string
}

export default function Login({handleTrocaForm}: Login) {

    const navigation = useNavigation()

    const { token, setToken } = useAuth()

    const [focus, setFocus] = useState(false)
    const [formLogin, setFormLogin] = useState<FormLogin>({username: "", senha: ""})

    const getData = (texto: string, prop: keyof FormLogin) => {

        setFormLogin((prevState) => ({...prevState, [prop]: texto}));
    }

    const onSubmit = async () => {
        console.log("onsubmit")
        try {
            const resposta = await post<FormLogin, string>(formLogin, UsuarioController.login)

            const data = resposta.data;

            console.log(data);

            if (resposta.status == 200) {

                await guardarItem(data.token, "token")
                await guardarItem(data, "usuarioAutenticado")

                setToken(data.token)
                let toast = Toast.show(`Autenticado com sucesso!`, {
                    duration: Toast.durations.LONG,
                });
                
            }
        } catch (erro) {
            Alert.alert("Erro", `Ocorreu um erro :(\n${erro}`)
        }
    }

    return (
        <View style={styles.viewLogin}>
            <View>
                <Text style={styles.titulo}>Faça seu login</Text>
            </View>

            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} keyboardType={"email-address"} inputMode={"email"}
                           autoCapitalize={'none'}
                           onChangeText={(texto) => getData(texto, "username")}/>
            </View>

            <View>
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} secureTextEntry={true} inputMode={"text"} autoCapitalize={'none'}
                           onChangeText={(texto) => getData(texto, "senha")}/>
            </View>

            <View>
                <TouchableOpacity style={styles.button} onPress={onSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.viewLink}>
                <Text>Não tem uma conta?</Text>
                <Pressable onPress={() => handleTrocaForm()}><Text style={{color: 'blue'}}> Crie uma.</Text></Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20
    },
    label: {
        fontSize: 16
    },
    input: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: "#ececec",
        borderRadius: 4,
    },
    inputFocus: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: "#ececec",
        borderWidth: 1,
        borderColor: "#c0c0c0",
        borderRadius: 4,
    },
    button: {
        backgroundColor: "#535353",
        padding: 20,
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        color: "#fff"
    },
    viewLogin: {
        width: "90%",
        margin: 'auto',
        padding: 20,
        gap: 40,
        borderWidth: 1,
        borderColor: '#D1717B',
        borderRadius: 12
    },
    viewLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})