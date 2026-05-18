import React from 'react';
import { X } from 'lucide-react';

// Убираем export отсюда, чтобы не злить ESLint
const ZODIAC_LIST = [
    { sign: "♈", name: "Овен" }, { sign: "♉", name: "Телец" },
    { sign: "♊", name: "Близнецы" }, { sign: "♋", name: "Рак" },
    { sign: "♌", name: "Лев" }, { sign: "♍", name: "Дева" },
    { sign: "♎", name: "Весы" }, { sign: "♏", name: "Скорпион" },
    { sign: "♐", name: "Стрелец" }, { sign: "♑", name: "Козерог" },
    { sign: "♒", name: "Водолей" }, { sign: "♓", name: "Рыбы" },
];

interface ZodiacModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (index: number) => void;
    currentIndex: number | null;
    isFirstLaunch?: boolean;
}

export const ZodiacModal: React.FC<ZodiacModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            onSelect,
                                                            currentIndex,
                                                            isFirstLaunch = false
                                                        }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-end justify-center px-4 pb-10">
            <div
                className="absolute inset-0 bg-[#050510]/90 backdrop-blur-xl animate-in fade-in duration-300"
                onClick={() => !isFirstLaunch && onClose()}
            />

            <div className="relative w-full max-w-md bg-[#0a0a1a] border border-white/10 rounded-[32px] p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-300">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-fuchsia-500">
                            {isFirstLaunch ? "ПЕРВЫЙ ШАГ" : "ВАШ ПРОФИЛЬ"}
                        </span>
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase">ВЫБОР ЗНАКА</h3>
                    </div>
                    {!isFirstLaunch && (
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/50 active:scale-90 transition-all"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-3">
                    {ZODIAC_LIST.map((item, idx) => (
                        <button
                            key={item.name}
                            onClick={() => onSelect(idx)}
                            className={`
                                flex flex-col items-center p-5 rounded-[24px] border transition-all active:scale-95
                                ${idx === currentIndex
                                ? 'bg-fuchsia-600/20 border-fuchsia-500/50 shadow-[0_0_20_rgba(236,72,153,0.1)]'
                                : 'bg-white/[0.03] border-white/5 hover:border-white/10'}
                            `}
                        >
                            <span className={`text-3xl mb-2 drop-shadow-md ${idx === currentIndex ? 'scale-110' : 'grayscale-[0.5]'}`}>
                                {item.sign}
                            </span>
                            <span className={`text-[9px] font-bold uppercase tracking-tight ${idx === currentIndex ? 'text-white' : 'text-white/40'}`}>
                                {item.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};