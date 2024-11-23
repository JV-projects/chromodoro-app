
import AsyncStorage from "@react-native-async-storage/async-storage"

export const guardarItem = async (data, key) => {

    try {

        const dataString = JSON.stringify(data)

        console.log("Guardou" + dataString)

        await AsyncStorage.removeItem(key)
        
        await AsyncStorage.setItem(key, dataString);

    } catch (e) {
        console.log("Erro ao guardar item")
    }

}

export const lerItem = async (key) => {

    try {

        const data = await AsyncStorage.getItem(key)

        console.log("Pegou" + data)

        return data != null ? JSON.parse(data) : null;

    } catch (e) {
        console.log("Erro ao pegar item")
    }

}

export const removerItem = async (key) => {

    try{
        AsyncStorage.removeItem(key)
    }catch(e){
        console.log("Erro ao remover item")
    }

}