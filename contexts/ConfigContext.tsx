import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { guardarConfigs, lerConfigs } from "@/service/localStorage";

// Defina a interface para as configurações
interface Configs {
    pomodoro: { minutos: string };
    pausaCurta: { minutos: string };
    pausaLonga: { minutos: string };
    pausaAutomatica: boolean;
    pomodoroAutomatico: boolean;
    notifica: boolean;
}

// Interface do contexto para expor o estado e a função de atualização
interface ConfigContextData {
    configuracoes: Configs;
    setConfiguracoes: React.Dispatch<React.SetStateAction<Configs>>;
}

// Inicialize o contexto
const ConfigContext = createContext<ConfigContextData | undefined>(undefined);

// Provider do contexto
export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const configuracoesInit: Configs = {
        pomodoro: { minutos: '' },
        pausaCurta: { minutos: '' },
        pausaLonga: { minutos: '' },
        pausaAutomatica: false,
        pomodoroAutomatico: false,
        notifica: false,
    };

    const [configuracoes, setConfiguracoes] = useState<Configs>(configuracoesInit);

    // Carregar as configurações da localStorage assim que o contexto for carregado
    useEffect(() => {
        async function carregar() {
            const c = await lerConfigs();
            setConfiguracoes(c || configuracoesInit);
        }
        carregar();
    }, []);

    return (
        <ConfigContext.Provider value={{ configuracoes, setConfiguracoes }}>
            {children}
        </ConfigContext.Provider>
    );
};

// Custom hook para usar o contexto
export const useConfig = (): ConfigContextData => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error("useConfig deve ser usado dentro de um ConfigProvider");
    }
    return context;
};
