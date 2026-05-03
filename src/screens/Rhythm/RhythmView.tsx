import React from 'react';
import { Clock, Zap, Heart, Sparkles, ChevronRight } from 'lucide-react';

interface RhythmViewProps {
    userName: string;
    prediction: string;
    luckyHour: string;
    luckyPercent: number;
    synergyZodiac: {
        sign: string;
        name: string;
        percent: number;
    };
}

export const RhythmView: React.FC<RhythmViewProps> = ({
                                                          luckyHour,
                                                          luckyPercent,
                                                          synergyZodiac
                                                      }) => {
    return (
        /* Убрали pt-12, оставили минимальный p-4 для плотности */
        <div className="relative w-full bg-[#050510] text-white p-4 overflow-hidden flex flex-col">

            {/* Фоновые эффекты */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[40%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col max-w-md mx-auto w-full gap-3">

                {/* Заголовок - максимально компактный */}
                <header className="px-1 mt-2">
                    <div className="flex items-center gap-2 opacity-30">
                        <Sparkles size={10} />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Личный ритм</span>
                    </div>
                </header>

                {/* 1. Виджет: Час Силы */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10
                      rounded-[28px] p-5 flex flex-col justify-between min-h-[120px]
                      relative overflow-hidden active:scale-[0.98] transition-all shadow-xl">
                    <div className="flex items-start justify-between relative z-10">
                        <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
                            <Clock size={22} />
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black tracking-tighter leading-none">{luckyHour}</div>
                            <div className="text-[9px] font-bold uppercase tracking-[1px] opacity-40 text-amber-200 mt-1">Час силы</div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between items-center px-1 text-[9px] font-bold uppercase tracking-[1px]">
                            <span className="opacity-40">интенсивность</span>
                            <span className="text-amber-500">{luckyPercent}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]" style={{ width: `${luckyPercent}%` }} />
                        </div>
                    </div>
                </div>

                {/* 2. Виджет: Синергия */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10
                      rounded-[28px] p-5 flex flex-col justify-between min-h-[120px]
                      relative overflow-hidden active:scale-[0.98] transition-all shadow-xl">
                    <div className="flex items-start justify-between relative z-10">
                        <div className="p-2.5 bg-pink-500/10 rounded-xl text-pink-500">
                            <Heart size={22} />
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-black tracking-tighter text-pink-500 leading-none">{synergyZodiac.percent}%</div>
                            <div className="text-[9px] font-bold uppercase tracking-[1px] opacity-40 text-pink-200 mt-1">Синергия</div>
                        </div>
                    </div>

                    <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[9px] font-bold text-pink-200/40 uppercase tracking-wider">Лучший компаньон</span>
                            <span className="text-xs font-black text-pink-200">{synergyZodiac.sign} {synergyZodiac.name}</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-pink-500 rounded-full shadow-[0_0_10px_#ec4899]" style={{ width: `${synergyZodiac.percent}%` }} />
                        </div>
                    </div>
                </div>

                {/* 3. Кнопка-Виджет: Прогноз (Теперь такого же размера) */}
                <button className="group relative w-full bg-gradient-to-br from-fuchsia-600 to-indigo-700
                         rounded-[28px] p-5 flex flex-col justify-between min-h-[120px]
                         overflow-hidden shadow-2xl active:scale-[0.96] transition-all text-left">

                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Zap size={60} fill="currentColor" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between">
                        <div className="p-2.5 bg-white/10 rounded-xl text-white">
                            <Zap size={22} fill="white" />
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] font-bold uppercase tracking-[2px] text-white/50">Дневной прогноз</div>
                        </div>
                    </div>

                    <div className="relative z-10 flex items-end justify-between mt-4">
                        <h2 className="text-xl font-black tracking-tight text-white leading-none">
                            Прогноз для <span className="text-fuchsia-200">{synergyZodiac.name}</span>
                        </h2>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                            <ChevronRight size={18} />
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                <p className="text-center text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 mt-2">
                    Обновлено звездами • 2024
                </p>

            </div>
        </div>
    );
};