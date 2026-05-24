import React, { useMemo, useCallback } from 'react';
import { Heart, Plus, BarChart3, User, Users } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

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
    fontScale: 'small' | 'medium' | 'large';
}

export const LoveView: React.FC<LoveViewProps> = ({
                                                      userZodiac,
                                                      partnerZodiac,
                                                      synergyPercent = 0,
                                                      weeklyForecast = [],
                                                      onSelectPartner,
                                                      fontScale
                                                  }) => {

    const safeForecast = useMemo(() => {
        if (weeklyForecast && weeklyForecast.length > 0) return weeklyForecast;
        return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => ({ day: d, score: 30 }));
    }, [weeklyForecast]);

    const todayIndex = useMemo(() => {
        const day = new Date().getDay();
        return day === 0 ? 6 : day - 1;
    }, []);

    const handlePartnerClick = useCallback(() => {
        void triggerSuccessHaptic();
        onSelectPartner();
    }, [onSelectPartner]);

    const headerSize = fontScale === 'large' ? 'text-[2.4rem]' : fontScale === 'small' ? 'text-[2rem]' : 'text-[2.2rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const percentSize = fontScale === 'large' ? 'text-[1.8rem]' : fontScale === 'small' ? 'text-[1.4rem]' : 'text-[1.6rem]';
    const zodiacBoxSize = fontScale === 'large' ? 'w-16 h-16 text-[2rem]' : 'w-12 h-12 text-[1.5rem]';
    const widgetPadding = fontScale === 'large' ? 'p-8 min-h-[180px]' : 'p-6 min-h-[140px]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    return (
        <div className={`w-full text-white ${bottomPadding} px-1 animate-in fade-in duration-500`}>
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <Heart size={fontScale === 'large' ? 14 : 12} className="text-pink-500" fill="currentColor" />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em]`}>Любовный радар</span>
                </div>
                <h1 className={`${headerSize} font-black tracking-tighter bg-gradient-to-r from-white via-pink-100 to-pink-500 bg-clip-text text-transparent leading-tight`}>
                    Совместимость
                </h1>
            </header>

            <div className="flex flex-col gap-4">
                <div className={`bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] shadow-2xl mx-1 ${widgetPadding}`}>
                    <div className="flex items-center justify-around mb-6 gap-2">
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <div className={`${zodiacBoxSize} rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center relative`}>
                                {userZodiac}
                                <div className="absolute -bottom-1 -right-1 p-1 bg-indigo-500 rounded-lg border-2 border-[#050510]">
                                    <User size={10} className="text-white" />
                                </div>
                            </div>
                            <span className={`${labelSize} font-black opacity-30 uppercase tracking-widest`}>Вы</span>
                        </div>

                        <div className="flex flex-col items-center flex-1 min-w-fit">
                            <div className={`${percentSize} font-black text-pink-500 leading-none drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]`}>
                                {synergyPercent}%
                            </div>
                            <div className={`${labelSize} font-bold uppercase tracking-[0.1em] text-pink-200/40 mt-2 text-center`}>Химия</div>
                        </div>

                        <div className="flex flex-col items-center gap-2 flex-1">
                            <button
                                onClick={handlePartnerClick}
                                className={`${zodiacBoxSize} rounded-2xl transition-all active:scale-90 flex items-center justify-center relative ${
                                    partnerZodiac
                                        ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20'
                                        : 'bg-white/5 text-white/20 border border-white/10 border-dashed'
                                }`}
                            >
                                {partnerZodiac ? partnerZodiac : <Plus size={24} className="text-pink-500/50" />}
                                <div className="absolute -bottom-1 -left-1 p-1 bg-pink-500 rounded-lg border-2 border-[#050510]">
                                    <Users size={10} className="text-white" />
                                </div>
                            </button>
                            <span className={`${labelSize} font-black opacity-30 uppercase tracking-widest`}>Партнер</span>
                        </div>
                    </div>

                    <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-1000"
                            style={{ width: `${synergyPercent}%` }}
                        />
                    </div>
                </div>

                <div className={`bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] mx-1 ${widgetPadding}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={fontScale === 'large' ? 14 : 12} className="text-pink-400" />
                        <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-white/50`}>Прогноз на неделю</h3>
                    </div>

                    <div className="flex justify-between items-end h-28 w-full px-1">
                        {safeForecast.map((item, i) => {
                            const isToday = i === todayIndex;
                            return (
                                <div key={i} className="flex flex-col items-center justify-end h-full flex-1">
                                    <div className="w-full flex justify-center items-end h-full pb-2">
                                        <div
                                            className={`rounded-full bg-gradient-to-t from-pink-600 to-pink-400 transition-all duration-1000 ease-out ${
                                                isToday ? 'shadow-[0_0_15px_rgba(236,72,153,0.8)]' : ''
                                            } ${fontScale === 'large' ? 'w-3' : 'w-2'}`}
                                            style={{ height: `${item.score}%`, minHeight: '8px' }}
                                        />
                                    </div>
                                    <span className={`${labelSize} font-black uppercase mt-2 transition-colors ${
                                        isToday ? 'text-pink-500 opacity-100' : 'text-white opacity-20'}`
                                    }>{item.day}
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