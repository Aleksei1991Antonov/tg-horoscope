import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderViewProps {
    userName: string;
    zodiacSign: string;
    zodiacName: string;
    formattedDate: string;
    onMenuClick: () => void;
    onZodiacClick: () => void;
}

export const HeaderView: React.FC<HeaderViewProps> = ({
                                                          userName,
                                                          zodiacSign,
                                                          zodiacName,
                                                          formattedDate,
                                                          onMenuClick,
                                                          onZodiacClick
                                                      }) => {

    // Функция умного подбора размера шрифта
    const getFontSize = (name: string) => {
        const len = name.length;
        if (len > 20) return 'text-[10px]';
        if (len > 15) return 'text-[11px]';
        if (len > 10) return 'text-[12px]';
        return 'text-[14px]'; // Чуть уменьшил базу для лучшего баланса
    };

    return (
        <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 bg-[#050510]/60 backdrop-blur-2xl">
            {/* Добавлен gap-2 и flex-1 для жесткого разделения левой части и кнопки меню */}
            <div className="max-w-md mx-auto flex justify-between items-center bg-white/[0.03] border border-white/10 p-2 pl-3 rounded-[24px] shadow-2xl gap-2">

                {/* Левая часть: Аватар + Весь текст. flex-1 и min-w-0 критичны здесь */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Кликабельный аватар */}
                    <button
                        onClick={onZodiacClick}
                        className="relative group outline-none flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-fuchsia-500/20 blur-lg rounded-full group-hover:bg-fuchsia-500/40 transition-all" />
                        <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-2xl shadow-inner overflow-hidden active:scale-90 transition-transform">
                            <span className="text-2xl drop-shadow-md">{zodiacSign}</span>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                        </div>
                    </button>

                    {/* Блок с именем и информацией — теперь занимает все доступное место, но не более */}
                    <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 w-full">
                            <span className={`
                                font-black tracking-tight text-white uppercase truncate transition-all duration-300
                                ${getFontSize(userName)}
                            `}>
                                {userName}
                            </span>

                            {/* Разделитель и Знак зодиака — flex-shrink-0 чтобы их не "сплющило" */}
                            <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                            <span className="text-[10px] font-bold text-fuchsia-400/90 uppercase tracking-tighter flex-shrink-0">
                                {zodiacName}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 opacity-40">
                            <span className="text-[9px] font-bold uppercase tracking-widest leading-none">
                                {formattedDate}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Кнопка меню — flex-shrink-0 гарантирует, что она не сдвинется */}
                <button
                    onClick={onMenuClick}
                    className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 active:scale-90 transition-all text-white/70 hover:text-white"
                >
                    <Menu size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Декоративная линия снизу */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </header>
    );
};
