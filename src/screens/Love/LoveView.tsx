import React from 'react';
import { Heart, Plus, Sparkles, ChevronRight } from 'lucide-react';

interface LoveViewProps {
    userZodiac: string;
    partnerZodiac?: string;
    synergyPercent: number;
    onShowRecommendation: () => void;
    onSelectPartner: () => void;
}

export const LoveView: React.FC<LoveViewProps> = ({
                                                      userZodiac = "♌️",
                                                      partnerZodiac,
                                                      synergyPercent = 89,
                                                      onShowRecommendation,
                                                      onSelectPartner
                                                  }) => {
    return (
        <div className="relative w-full bg-[#050510] text-white p-4 overflow-hidden flex flex-col min-h-screen">

            {/* Фоновое розовое свечение */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] right-[-10%] w-[80%] h-[40%] rounded-full bg-pink-900/10 blur-[120px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[80%] h-[40%] rounded-full bg-violet-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col max-w-md mx-auto w-full gap-3 pt-2">

                {/* Заголовок секции */}
                <header className="px-1">
                    <div className="flex items-center gap-2 opacity-30 mb-1">
                        <Heart size={10} className="text-pink-500" fill="currentColor" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Любовный радар</span>
                    </div>
                </header>

                {/* 1. Виджет: Совместимость (Интерактивный блок) */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10
                      rounded-[28px] p-5 flex flex-col justify-between min-h-[120px]
                      relative overflow-hidden active:scale-[0.98] transition-all shadow-xl">
                    <div className="flex items-center justify-between relative z-10">

                        {/* Ваш знак */}
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shadow-inner">
                            {userZodiac}
                        </div>

                        {/* Центральный блок с процентом */}
                        <div className="flex flex-col items-center">
                            <div className="text-2xl font-black text-pink-500 leading-none">{synergyPercent}%</div>
                            <div className="text-[8px] font-bold uppercase tracking-widest opacity-40 text-pink-200 mt-1">Синергия</div>
                        </div>

                        {/* Знак партнера / Кнопка выбора */}
                        <button
                            onClick={onSelectPartner}
                            className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/30 border-dashed flex items-center justify-center text-pink-500 active:scale-90 transition-all group"
                        >
                            {partnerZodiac ? (
                                <span className="text-2xl">{partnerZodiac}</span>
                            ) : (
                                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                            )}
                        </button>
                    </div>

                    {/* Прогресс-бар */}
                    <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between items-center px-1 text-[9px] font-bold uppercase tracking-[1px]">
                            <span className="opacity-40">совместимость на сегодня</span>
                            <span className="text-pink-500">высокая</span>
                        </div>
                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.4)]"
                                style={{ width: `${synergyPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Виджет-Кнопка: Получить рекомендацию */}
                <button
                    onClick={onShowRecommendation}
                    className="group relative w-full bg-gradient-to-br from-pink-600 to-violet-700
                         rounded-[28px] p-5 flex flex-col justify-between min-h-[120px]
                         overflow-hidden shadow-2xl active:scale-[0.98] transition-all text-left"
                >
                    {/* Декоративная иконка на фоне */}
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Sparkles size={60} fill="currentColor" />
                    </div>

                    <div className="flex items-start justify-between relative z-10">
                        <div className="p-2.5 bg-white/10 rounded-xl text-white">
                            <Sparkles size={22} />
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] font-bold uppercase tracking-[2px] text-white/50">Ваш прогноз</div>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-end justify-between mt-4">
                        <h2 className="text-xl font-black tracking-tight text-white leading-none">
                            Получить <br />
                            <span className="text-pink-200">совет звезд</span>
                        </h2>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <ChevronRight size={18} />
                        </div>
                    </div>

                    {/* Эффект блика */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <p className="text-center text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 mt-4">
                    Love Rhythm Engine • 2024
                </p>
            </div>
        </div>
    );
};