/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

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
        const tg = window.Telegram?.WebApp;
        if (!tg) return;

        const firstName = tg.initDataUnsafe?.user?.first_name?.toUpperCase();
        if (firstName) {
            setTimeout(() => {
                setUserName(firstName);
            }, 0);
        }

        const localIdx = localStorage.getItem('user_zodiac_index');
        if (localIdx) {
            const idx = parseInt(localIdx, 10);
            if (!isNaN(idx)) {
                setTimeout(() => setZodiacIndexState(idx), 0);
            }
        }
    }, []);

    const setZodiacIndex = (index: number) => {
        setZodiacIndexState(index);
        localStorage.setItem('user_zodiac_index', index.toString());
    };

    const currentZodiac = useMemo(() => {
        return zodiacIndex !== null
            ? ZODIAC_LIST[zodiacIndex]
            : { sign: "✧", name: "ВЫБРАТЬ" };
    }, [zodiacIndex]);

    const value = useMemo(() => ({
        userName,
        zodiacIndex,
        setZodiacIndex,
        zodiacName: currentZodiac.name,
        zodiacSign: currentZodiac.sign,
    }), [userName, zodiacIndex, setZodiacIndex, currentZodiac]);

    return (
        <AstroContext.Provider value={value}>
            {children}
        </AstroContext.Provider>
    );
};

export const useAstro = (): AstroContextType => {
    const ctx = useContext(AstroContext);
    if (!ctx) throw new Error('useAstro must be used within AstroProvider');
    return ctx;
};
