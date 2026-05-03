import React from 'react';
import { Menu, Sparkles } from 'lucide-react';

interface HeaderViewProps {
    userName: string;
    zodiacSign: string;
    zodiacName: string;
    formattedDate: string;
    onMenuClick: () => void;
}

export const HeaderView: React.FC<HeaderViewProps> = ({
                                                          userName,
                                                          zodiacSign,
                                                          zodiacName,
                                                          formattedDate,
                                                          onMenuClick
                                                      }) => {
    return (
        <header className="sticky top-0 z-50 w-full px-4 pt-4 pb-2 bg-[#050510]/60 backdrop-blur-2xl">
            <div className="max-w-md mx-auto flex justify-between items-center bg-white/[0.03] border border-white/10 p-2 pl-3 rounded-[24px] shadow-2xl">

                {/* Левая часть: Аватар и Инфо */}
                <div className="flex items-center gap-3">
                    {/* Контейнер для знака зодиака с эффектом свечения */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-fuchsia-500/20 blur-lg rounded-full group-hover:bg-fuchsia-500/40 transition-all" />
                        <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-2xl shadow-inner overflow-hidden">
                            <span className="text-2xl drop-shadow-md">{zodiacSign}</span>
                            {/* Блик на аватаре */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
              <span className="font-black text-[15px] tracking-tight text-white">
                {userName}
              </span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[13px] font-bold text-fuchsia-400/90 uppercase tracking-tighter">
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

                {/* Правая часть: Кнопка меню */}
                <button
                    onClick={onMenuClick}
                    className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5
                   hover:bg-white/10 active:scale-90 transition-all text-white/70 hover:text-white"
                >
                    <Menu size={20} strokeWidth={2.5} />
                </button>
            </div>

            {/* Тонкая декоративная линия под шапкой */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </header>
    );
};