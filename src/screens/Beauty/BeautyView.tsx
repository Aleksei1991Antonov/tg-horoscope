import React from 'react';
import { Scissors, Sparkles, Waves, Zap, Moon, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Recommendation {
    id: string;
    title: string;
    desc: string;
    status: string;
    color: string;
}

interface BeautyViewProps {
    zodiacName: string;
    recommendations: Recommendation[];
    lunarInfo: {
        phaseName: string;
        illumination: number;
        moonZodiacName: string;
        moonZodiacIcon: string;
    };
    fontScale: 'small' | 'medium' | 'large';
}

const iconMap: Record<string, LucideIcon> = {
    hair: Scissors,
    skin: Sparkles,
    detox: Waves,
    complex: Zap
};

const colorMap: Record<string, string> = {
    amber: 'bg-amber-500/10 text-amber-400',
    fuchsia: 'bg-fuchsia-500/10 text-fuchsia-400',
    sky: 'bg-sky-500/10 text-sky-400',
    rose: 'bg-rose-500/10 text-rose-400',
};

export const BeautyView: React.FC<BeautyViewProps> = ({ zodiacName, recommendations, lunarInfo, fontScale }) => {
    const headerTitleSize = fontScale === 'large' ? 'text-[2.4rem]' : 'text-[2rem]';
    const badgeTextSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const itemTitleSize = fontScale === 'large' ? 'text-[1.15rem]' : 'text-[0.9rem]';
    const itemDescSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.6875rem]';
    const statusTextSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';

    return (
        <div className="w-full text-white pb-32 px-1">
            <header className="mb-6 px-1">
                {/* Верхняя панель: Инфо о Луне */}
                <div className="flex flex-wrap items-center gap-2.5 mb-5">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Moon size={14} className="text-indigo-400" fill="currentColor" />
                        <span className={`${badgeTextSize} font-bold tracking-widest text-white/70 uppercase whitespace-nowrap`}>
                            {lunarInfo.phaseName} • {lunarInfo.illumination}%
                        </span>
                    </div>
                    <div className={`${badgeTextSize} font-bold text-indigo-300 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 uppercase whitespace-nowrap`}>
                        Луна в знаке {lunarInfo.moonZodiacName} {lunarInfo.moonZodiacIcon}
                    </div>
                </div>

                <h1 className={`${headerTitleSize} font-black tracking-tighter mb-1 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent leading-tight`}>
                    Красота и уход
                </h1>
                <p className={`${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} text-white/40 font-bold uppercase tracking-[0.2em]`}>
                    Для знака {zodiacName}
                </p>
            </header>

            <div className="flex flex-col gap-4">
                {recommendations.map((item) => {
                    const IconComponent = iconMap[item.id] || Sparkles;

                    return (
                        <div
                            key={item.id}
                            className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[28px] flex flex-col w-full transition-all ${
                                fontScale === 'large' ? 'p-6' : 'p-5'
                            }`}
                        >
                            {/* Верхняя строка: Статус и Иконка (только для малых шрифтов) */}
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${statusTextSize} font-black tracking-widest px-3 py-1 rounded-full border ${
                                    item.status === 'благоприятно'
                                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                                }`}>
                                    {item.status.toUpperCase()}
                                </div>

                                {/* По Джобсу: убираем иконку на Large, чтобы не мешать чтению */}
                                {fontScale !== 'large' && (
                                    <div className={`rounded-xl flex items-center justify-center ${colorMap[item.color] || 'bg-white/5 text-white'} w-10 h-10`}>
                                        <IconComponent size={20} />
                                    </div>
                                )}
                            </div>

                            {/* Основной контент */}
                            <div className="w-full">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <h3 className={`${itemTitleSize} font-black text-white tracking-tight leading-tight`}>
                                        {item.title}
                                    </h3>
                                    <ChevronRight size={fontScale === 'large' ? 20 : 16} className="text-white/20 flex-shrink-0" />
                                </div>
                                <p className={`${itemDescSize} text-white/60 font-medium leading-relaxed`}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};