import React, { createContext, useContext, useState, useEffect } from 'react';

interface AstroContextType {
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

        if (app.initDataUnsafe?.user?.first_name) {
            setUserName(app.initDataUnsafe.user.first_name.toUpperCase());
        }

        const loadStorage = async () => {
            try {
                const res = await app.DeviceStorage.getItem('user_zodiac_index');
                if (res.value) {
                    const idx = parseInt(res.value, 10);
                    if (!isNaN(idx)) setZodiacIndexState(idx);
                }
            } catch (e) { console.error(e); }
        };
        loadStorage();
    }, []);

    const setZodiacIndex = (index: number) => {
        setZodiacIndexState(index);
        window.WebApp?.DeviceStorage.setItem('user_zodiac_index', index.toString());
    };

    const currentZodiac = zodiacIndex !== null
        ? ZODIAC_LIST[zodiacIndex]
        : { sign: "✧", name: "ВЫБРАТЬ" };

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
    if (!context) throw new Error('useAstro must be used within AstroProvider');
    return context;
};