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