import React, { createContext, useContext, useState, useEffect, ReactNode, Children } from "react";
import { lerItem } from "@/service/localStorage";

interface AuthContextData {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)

    const isAuthenticated = token !== null;

    const carregar = async () => {
        const ler = await lerItem("token")
        setToken(ler || null)
    }

    useEffect(() => {
        carregar()
    })

    return (
        <AuthContext.Provider value={{ token, setToken, isAuthenticated}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextData => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth deve estar dentro de um AuthProvider")
    }

    return context;
}