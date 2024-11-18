import axios, {AxiosResponse} from 'axios'

export async function post<T, R>(body: T, url: string, token?: string, ): Promise<R> {
    try {
        const headers =
            token ? {'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : {'Content-Type': 'application/json'};

        const resposta: AxiosResponse<R> = await axios.post(url, body, { headers });

        return resposta.data;
    } catch (erro: unknown) {
        if (axios.isAxiosError(erro)) {
            const mensagemErro = erro.response?.data || erro.message || "Erro desconhecido";

            throw new Error(mensagemErro)
        } else {
            throw new Error("Erro inesperado")
        }
    }
}

export async function get<R>(token: string, url: string): Promise<R> {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const resposta: AxiosResponse<R> = await axios.get(url, { headers })

        return resposta.data;
    } catch (erro: unknown) {
        if (axios.isAxiosError(erro)) {
            const mensagemErro = erro.response?.data || erro.message || "Erro desconhecido";

            throw new Error(mensagemErro)
        } else {
            throw new Error("Erro inesperado")
        }
    }
}