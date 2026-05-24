/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Интерфейс вынесен вверх
export interface AstroContextType {
    userName: string;
    zodiacIndex: number | null;
    setZodiacIndex: (index: number) => void;
    zodiacName: string;
    zodiacSign: string;
}

const ZODIAC_LIST = [
    { sign: "♈", name: "Овен" }, { sign: "♉", name: "Телец" },
    { sign: "♊", name: "Близнецы" }, { sign: "♋", name: "Рак" },
    { sign: "♌", name: "Лев" }, { sign: "♍", name: "Дева" },
    { sign: "♎", name: "Весы" }, { sign: "♏", name: "Скорпион" },
    { sign: "♐", name: "Стрелец" }, { sign: "♑", name: "Козерог" },
    { sign: "♒", name: "Водолей" }, { sign: "♓", name: "Рыбы" },
];

const AstroContext = createContext<AstroContextType | undefined>(undefined);

export const AstroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userName, setUserName] = useState("ГОСТЬ");
    const [zodiacIndex, setZodiacIndexState] = useState<number | null>(null);

    useEffect(() => {
        const app = window.WebApp;
        if (!app) return;

        // Исправляем каскадный рендер через setTimeout(0)
        // Это выносит обновление стейта из синхронного цикла эффекта
        const firstName = app.initDataUnsafe?.user?.first_name?.toUpperCase();
        if (firstName) {
            setTimeout(() => {
                setUserName(firstName);
            }, 0);
        }

        const loadStorage = async () => {
            if (app.DeviceStorage) {
                try {
                    const res = await app.DeviceStorage.getItem('user_zodiac_index');
                    if (res && res.value) {
                        const idx = parseInt(res.value, 10);
                        if (!isNaN(idx)) {
                            setTimeout(() => setZodiacIndexState(idx), 0);
                        }
                    }
                } catch (e) {
                    console.error('MAX Storage error:', e);
                }
            }
        };
        void loadStorage();
    }, []);

    const setZodiacIndex = (index: number) => {
        setZodiacIndexState(index);
        if (window.WebApp?.DeviceStorage) {
            void window.WebApp.DeviceStorage.setItem('user_zodiac_index', index.toString());
        }
    };

    const currentZodiac = useMemo(() => {
        return zodiacIndex !== null
            ? ZODIAC_LIST[zodiacIndex]
            : { sign: "✧", name: "ВЫБРАТЬ" };
    }, [zodiacIndex]);

    return (
        <AstroContext.Provider value={{
            userName,
            zodiacIndex,
            setZodiacIndex,
            zodiacName: currentZodiac.name,
            zodiacSign: currentZodiac.sign
        }}>
            {children}
        </AstroContext.Provider>
    );
};

export const useAstro = () => {
    const context = useContext(AstroContext);
    if (!context) {
        throw new Error('useAstro must be used within AstroProvider');
    }
    return context;
};