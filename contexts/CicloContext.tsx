import React, {createContext, Dispatch, ReactNode, useContext, useState} from "react";


interface CicloContextData {
    ciclo: number;
    setCiclo: React.Dispatch<React.SetStateAction<number>>;
}

const CicloContext = createContext<CicloContextData | undefined>(undefined)

export const CicloProvider = ({ children }: { children: ReactNode}) => {
    const [ciclo, setCiclo] = useState<number>(1)

    return (
        <CicloContext.Provider value={{ ciclo, setCiclo }}>
            { children }
        </CicloContext.Provider>
    )
}

export const useCiclo = () : CicloContextData => {
    const context = useContext(CicloContext)

    if (!context) {
        throw new Error("useCiclo deve estar dentro de um AuthProvider")
    }

    return context;
}