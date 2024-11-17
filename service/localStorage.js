
import AsyncStorage from "@react-native-async-storage/async-storage"

export const guardarConfigs = async (configs) => {

    try {

        const configString = JSON.stringify(configs)

        console.log("Guardou" + configString)

        await AsyncStorage.removeItem('configuracoes')
        
        await AsyncStorage.setItem('configuracoes', configString);

    } catch (e) {
        console.log("Erro ao guardar configurações")
    }

}

export const lerConfigs = async () => {

    try {

        const configs = await AsyncStorage.getItem("configuracoes")

        console.log("Pegou" + configs)

        return configs != null ? JSON.parse(configs) : null;

    } catch (e) {
        console.log("Erro ao pegar configurações")
    }

}
