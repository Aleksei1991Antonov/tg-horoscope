import React, { useMemo } from 'react';
import { Heart, Plus, BarChart3, User, Users } from 'lucide-react';

interface LoveForecast {
    day: string;
    score: number;
}

interface LoveViewProps {
    userZodiac: string;
    partnerZodiac?: string;
    synergyPercent?: number;
    weeklyForecast?: LoveForecast[];
    onSelectPartner: () => void;
}

export const LoveView: React.FC<LoveViewProps> = ({
                                                      userZodiac,
                                                      partnerZodiac,
                                                      synergyPercent = 0,
                                                      weeklyForecast = [],
                                                      onSelectPartner
                                                  }) => {
    // Определяем индекс текущего дня недели (Пн=0...Вс=6)
    const todayIndex = useMemo(() => {
        const day = new Date().getDay();
        return day === 0 ? 6 : day - 1;
    }, []);

    const safeForecast = weeklyForecast && weeklyForecast.length > 0
        ? weeklyForecast
        : ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => ({ day: d, score: 30 }));

    return (
        <div className="w-full text-white pb-32 px-2 animate-in fade-in duration-500">
            <header className="mb-6 px-2">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <Heart size={12} className="text-pink-500" fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Любовный радар</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white via-pink-100 to-pink-500 bg-clip-text text-transparent">
                    Совместимость
                </h1>
            </header>


            <div className="flex flex-col gap-4">
                {/* Виджет совместимости */}
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner relative">
                                {userZodiac}
                                <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-500 rounded-lg border-2 border-[#090915]">
                                    <User size={10} className="text-white" />
                                </div>
                            </div>
                            <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Вы</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="text-4xl font-black text-pink-500 leading-none drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                                {synergyPercent}%
                            </div>
                            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-pink-200/40 mt-3">Притяжение</div>
                        </div>

                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={onSelectPartner}
                                className={`w-16 h-16 rounded-[22px] border transition-all active:scale-90 flex items-center justify-center text-3xl relative ${
                                    partnerZodiac
                                        ? 'bg-gradient-to-br from-pink-500/20 to-pink-500/5 border-pink-500/30'
                                        : 'bg-white/5 border-white/10 border-dashed'
                                }`}
                            >
                                {partnerZodiac ? partnerZodiac : <Plus size={24} className="text-pink-500/50" />}
                                <div className="absolute -bottom-1 -left-1 p-1 bg-pink-500 rounded-lg border-2 border-[#090915]">
                                    <Users size={10} className="text-white" />
                                </div>
                            </button>
                            <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">Партнер</span>
                        </div>
                    </div>

                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-1000"
                            style={{ width: `${synergyPercent}%` }}
                        />
                    </div>
                </div>

                {/* График ритмов */}
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <BarChart3 size={16} className="text-pink-400" />
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Прогноз на неделю</h3>
                    </div>

                    <div className="flex justify-between items-end h-32 w-full px-1">
                        {safeForecast.map((item, i) => {
                            const isToday = i === todayIndex;
                            return (
                                <div key={i} className="flex flex-col items-center justify-end h-full flex-1">
                                    <div className="w-full flex justify-center items-end h-full pb-2">
                                        <div
                                            className={`w-2.5 rounded-full bg-gradient-to-t from-pink-600 to-pink-400 transition-all duration-1000 ease-out ${
                                                isToday
                                                    ? 'shadow-[0_0_15px_rgba(236,72,153,0.8)]'
                                                    : ''
                                            }`}
                                            style={{
                                                height: `${item.score}%`,
                                                minHeight: '12px'
                                            }}
                                        />
                                    </div>
                                    <span className={`text-[9px] font-bold uppercase mt-2 transition-all ${
                                        isToday ? 'text-pink-500 scale-110' : 'opacity-20'
                                    }`}>
                                        {item.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};