const APILOCATION = "http://192.168.1.37:8080/"

const APIBASE = "chromodoro/api/"

const API = `${APILOCATION}${APIBASE}`

export const UsuarioController = {
    login: `${API}usuario/login`,
    registrar: `${API}usuario/registrar`
}

export const TarefaController = {
    consultarTarefas: (email: string) => {
        return `${API}tarefas?email=${email}`
    }
}

