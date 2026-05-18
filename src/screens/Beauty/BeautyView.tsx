import React from 'react';
import { Scissors, Sparkles, Waves, Zap, Moon, ChevronRight } from 'lucide-react';

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
}

const iconMap: Record<string, React.ReactElement> = {
    hair: <Scissors size={20} />,
    skin: <Sparkles size={20} />,
    detox: <Waves size={20} />,
    complex: <Zap size={20} />
};

export const BeautyView: React.FC<BeautyViewProps> = ({ zodiacName, recommendations, lunarInfo }) => {
    return (
        /* pb-32 для скролла над навигацией */
        <div className="w-full text-white pb-32 px-1">
            <header className="mb-5 px-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                            <Moon size={12} className="text-indigo-400" fill="currentColor" />
                        </div>
                        <span className="text-[9px] font-black tracking-widest text-white/30 uppercase">
                            {lunarInfo.phaseName} • {lunarInfo.illumination}%
                        </span>
                    </div>
                    <div className="text-[9px] font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20 uppercase whitespace-nowrap">
                        Луна в знаке {lunarInfo.moonZodiacName} {lunarInfo.moonZodiacIcon}
                    </div>
                </div>
                <h1 className="text-2xl font-black tracking-tighter mb-1 bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                    Красота и уход
                </h1>
                <p className="text-xs text-white/40 font-medium tracking-wide">Для знака {zodiacName}</p>
            </header>

            <div className="flex flex-col gap-2.5">
                {recommendations.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[24px] p-3.5 flex items-center gap-3 w-full"
                    >
                        {/* Иконка: чуть меньше размер для узких экранов */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-${item.color}-500/10 text-${item.color}-400 shadow-inner`}>
                            {iconMap[item.id]}
                        </div>

                        {/* Контент: предотвращаем распирание через min-w-0 */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm text-white tracking-tight truncate">
                                {item.title}
                            </h3>
                            <p className="text-[10px] text-white/40 leading-tight line-clamp-2">
                                {item.desc}
                            </p>
                        </div>

                        {/* Статус и стрелка */}
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <div className={`text-[8px] font-black tracking-tighter px-2 py-0.5 rounded-md border ${
                                item.status === 'благоприятно'
                                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                                    : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                            }`}>
                                {item.status.toUpperCase()}
                            </div>
                            <ChevronRight size={12} className="text-white/10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};