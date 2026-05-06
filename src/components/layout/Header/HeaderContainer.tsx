import React, { useMemo, useState, useEffect } from 'react';
import { HeaderView } from './HeaderView';
import { MenuContainer } from './Menu/MenuContainer';
import { X } from 'lucide-react';

interface WebAppUser {
    id: number;
    first_name: string;
}

interface WebApp {
    initDataUnsafe: { user?: WebAppUser };
    DeviceStorage: {
        getItem: (key: string) => Promise<{ key: string; value: string }>;
        setItem: (key: string, value: string) => Promise<{ status: 'updated' | 'removed' }>;
    };
    HapticFeedback: {
        impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
        selectionChanged: () => void;
    };
}

// Расширяем глобальный объект Window без создания неиспользуемого интерфейса
declare global {
    interface Window {
        WebApp?: WebApp;
    }
}

const ZODIAC_LIST = [
    { sign: "♈", name: "Овен" }, { sign: "♉", name: "Телец" },
    { sign: "♊", name: "Близнецы" }, { sign: "♋", name: "Рак" },
    { sign: "♌", name: "Лев" }, { sign: "♍", name: "Дева" },
    { sign: "♎", name: "Весы" }, { sign: "♏", name: "Скорпион" },
    { sign: "♐", name: "Стрелец" }, { sign: "♑", name: "Козерог" },
    { sign: "♒", name: "Водолей" }, { sign: "♓", name: "Рыбы" },
];

interface HeaderContainerProps {
    onZodiacChange: (name: string) => void;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({ onZodiacChange }) => {
    const [userName, setUserName] = useState("ГОСТЬ");
    const [zodiacIndex, setZodiacIndex] = useState<number | null>(null);
    const [isZodiacModalOpen, setIsZodiacModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const app = window.WebApp;

        const initData = async () => {
            if (app?.initDataUnsafe?.user?.first_name) {
                setUserName(app.initDataUnsafe.user.first_name.toUpperCase());
            }

            let savedIndexRaw: string | null = null;

            try {
                const res = await app?.DeviceStorage.getItem('user_zodiac_index');
                if (res?.value) {
                    savedIndexRaw = res.value;
                }
            } catch {
                // Убрали неиспользуемую переменную 'e'
                console.warn("Cloud Storage unavailable");
            }

            if (!savedIndexRaw) {
                savedIndexRaw = localStorage.getItem('user_zodiac_index');
            }

            if (savedIndexRaw !== null) {
                const parsedIndex = parseInt(savedIndexRaw, 10);
                if (!isNaN(parsedIndex) && ZODIAC_LIST[parsedIndex]) {
                    setZodiacIndex(parsedIndex);
                    setTimeout(() => {
                        onZodiacChange(ZODIAC_LIST[parsedIndex].name);
                    }, 0);
                }
            }
        };

        void initData();
    }, [onZodiacChange]);

    const formattedDate = useMemo(() => {
        return new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }).toUpperCase();
    }, []);

    const selectZodiac = (index: number) => {
        const selected = ZODIAC_LIST[index];
        setZodiacIndex(index);
        setIsZodiacModalOpen(false);

        onZodiacChange(selected.name);

        window.WebApp?.HapticFeedback.impactOccurred('medium');

        const indexStr = index.toString();
        localStorage.setItem('user_zodiac_index', indexStr);
        void window.WebApp?.DeviceStorage.setItem('user_zodiac_index', indexStr);
    };

    const displayZodiac = zodiacIndex !== null
        ? ZODIAC_LIST[zodiacIndex]
        : { sign: "✧", name: "ВЫБРАТЬ" };

    return (
        <>
            <HeaderView
                userName={userName}
                zodiacSign={displayZodiac.sign}
                zodiacName={displayZodiac.name}
                formattedDate={formattedDate}
                onMenuClick={() => {
                    window.WebApp?.HapticFeedback.selectionChanged();
                    setIsMenuOpen(true);
                }}
                onZodiacClick={() => {
                    window.WebApp?.HapticFeedback.selectionChanged();
                    setIsZodiacModalOpen(true);
                }}
            />

            <MenuContainer
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
            />

            {isZodiacModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-10">
                    <div
                        className="absolute inset-0 bg-[#050510]/80 backdrop-blur-xl"
                        onClick={() => setIsZodiacModalOpen(false)}
                    />

                    <div className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-[32px] p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-fuchsia-500">Astro-Profile</span>
                                <h3 className="text-2xl font-black text-white tracking-tighter">ВЫБЕРИТЕ ЗНАК</h3>
                            </div>
                            <button
                                onClick={() => setIsZodiacModalOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 active:scale-90 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {ZODIAC_LIST.map((item, idx) => (
                                <button
                                    key={item.name}
                                    onClick={() => selectZodiac(idx)}
                                    className={`
                                        flex flex-col items-center p-5 rounded-[24px] border transition-all active:scale-95
                                        ${idx === zodiacIndex
                                        ? 'bg-fuchsia-600/20 border-fuchsia-500/50 shadow-[0_0_20px_rgba(236,72,153,0.1)]'
                                        : 'bg-white/[0.03] border-white/5 hover:border-white/10'}
                                    `}
                                >
                                    <span className={`text-3xl mb-2 drop-shadow-md ${idx === zodiacIndex ? 'scale-110' : 'grayscale-[0.5]'}`}>
                                        {item.sign}
                                    </span>
                                    <span className={`text-[9px] font-bold uppercase tracking-tight ${idx === zodiacIndex ? 'text-white' : 'text-white/40'}`}>
                                        {item.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};