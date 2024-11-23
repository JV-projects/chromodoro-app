export interface RegistrarResponse {
    "accountNonExpired": boolean,
    "accountNonLocked": boolean,
    "authorities": [
        {
            "authority": string
        }
    ],
    "credentialsNonExpired": boolean,
    "email": string,
    "enabled": boolean,
    "id": string,
    "nome": string,
    "password": string,
    "username": string
}

export interface LoginResponse {
    nome: string;
    username: string;
    token: string;
}

export interface TarefaResponse {
            "id": string,
            "idUsuario": {
                "id": string,
                "nome": string,
                "email": string,
                "authorities": [
                    {
                        "authority": string
                    }
                ],
                "username": string,
                "password": string,
                "enabled": boolean,
                "accountNonExpired": boolean,
                "accountNonLocked": boolean,
                "credentialsNonExpired": boolean
            },
            "titulo": string,
            "descricao": string,
            "status": "Em andamento" | "Concluída",
            "idProjeto": string | null,
            "estCiclos": number,
            "totalCiclos": number,
            "totalTempo": null,
            "totalPausa": null
}