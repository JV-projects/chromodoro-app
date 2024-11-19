import axios, {AxiosResponse} from 'axios'

export async function post<T, R>(body: T, url: string, token?: string, ): Promise<AxiosResponse<R>> {
    try {
        const headers =
            token ? {'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : {'Content-Type': 'application/json'};

        return await axios.post(url, body, {headers});
    } catch (erro: unknown) {
        if (axios.isAxiosError(erro)) {
            const mensagemErro = erro.response?.data || erro.message || "Erro desconhecido";

            throw new Error(mensagemErro)
        } else {
            throw new Error("Erro inesperado")
        }
    }
}

export async function get<R>(token: string, url: string): Promise<AxiosResponse<R>> {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        return await axios.get(url, {headers})
    } catch (erro: unknown) {
        if (axios.isAxiosError(erro)) {
            const mensagemErro = erro.response?.data || erro.message || "Erro desconhecido";

            throw new Error(mensagemErro)
        } else {
            throw new Error("Erro inesperado")
        }
    }
}