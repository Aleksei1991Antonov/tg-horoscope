import React from 'react';
import { Clock, MoonStar, Heart, Sparkles, ChevronRight } from 'lucide-react';

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
    onOpenPrediction: () => void; // Добавлено
}

export const RhythmView: React.FC<RhythmViewProps> = ({
                                                          luckyHour,
                                                          luckyPercent,
                                                          synergyZodiac,
                                                          onOpenPrediction // Добавлено
                                                      }) => {
    return (
        <div className="relative w-full text-white p-4 overflow-hidden flex flex-col">

            {/* Фоновые эффекты */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[40%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col max-w-md mx-auto w-full gap-3">

                {/* Заголовок */}
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

                {/* 3. Кнопка-Виджет: Прогноз */}
                <button
                    onClick={onOpenPrediction}
                    className="group relative w-full bg-gradient-to-br from-fuchsia-600 to-indigo-700
         rounded-[32px] p-6 flex flex-col justify-between min-h-[130px]
         overflow-hidden shadow-2xl active:scale-[0.97] transition-all text-left"
                >
                    {/* Декоративное свечение справа */}
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors duration-500" />

                    {/* Фоновая иконка Луны: большая и атмосферная */}
                    <div className="absolute -right-4 -top-2 p-2 opacity-[0.08] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 ease-out">
                        <MoonStar size={130} fill="currentColor" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between">
                        {/* Маленькая иконка в рамке */}
                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white shadow-inner border border-white/10">
                            <MoonStar size={20} fill="white" className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-[2px] text-white/40 group-hover:text-white/70 transition-colors">
                                Индивидуальный расчет
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto flex justify-between items-end">
                        <div className="space-y-1.5">
                            <h2 className="text-[26px] font-black tracking-tight text-white leading-none">
                                Твой <span className="text-fuchsia-200">гороскоп</span>
                            </h2>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {/* Зеленый индикатор "Live" */}
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                                </div>
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                    Актуально на сегодня
                </span>
                            </div>
                        </div>

                        {/* Изящная стрелка-указатель */}
                        <ChevronRight
                            size={24}
                            className="text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                            strokeWidth={3}
                        />
                    </div>

                    {/* Эффект стеклянного блеска (shimmer) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />
                </button>

                {/* Стили для анимации блеска */}
                <style dangerouslySetInnerHTML={{ __html: `
  @keyframes shimmer {
    100% { transform: translateX(100%); }
  }
`}} />

                <p className="text-center text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 mt-2">
                    Обновлено звездами • 2026
                </p>

            </div>
        </div>
    );
};