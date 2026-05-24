import React from 'react';
import { Crown, MoonStar, Gem, Sparkles, ChevronRight } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

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
    onOpenPrediction: () => void;
    onOpenPowerInfo: () => void;
    onOpenSynergyInfo: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

export const RhythmView: React.FC<RhythmViewProps> = ({
                                                          luckyHour,
                                                          luckyPercent,
                                                          onOpenPowerInfo,
                                                          synergyZodiac,
                                                          onOpenPrediction,
                                                          onOpenSynergyInfo,
                                                          fontScale
                                                      }) => {
    const titleSize = fontScale === 'large' ? 'text-[2.4rem]' : 'text-[2rem]';
    const percentSize = fontScale === 'large' ? 'text-[1.8rem]' : 'text-[1.4rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const subTitleSize = fontScale === 'large' ? 'text-[1.15rem]' : 'text-[0.9rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';

    // Фикс: иконки теперь всегда центрированы
    const iconBoxSize = fontScale === 'large' ? 'w-16 h-16' : 'w-12 h-12';
    const widgetPadding = fontScale === 'large' ? 'p-8 min-h-[180px]' : 'p-6 min-h-[140px]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    const handleAction = (callback: () => void) => {
        void triggerSuccessHaptic();
        callback();
    };

    return (
        <div className={`relative w-full text-white ${bottomPadding} font-sans antialiased`}>
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[40%] rounded-full bg-fuchsia-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col max-w-md mx-auto w-full gap-4 px-3">
                <header className="px-1 mt-2">
                    <div className="flex items-center gap-2 opacity-30">
                        <Sparkles size={fontScale === 'large' ? 14 : 12} />
                        <span className={`${headerLabelSize} font-black uppercase tracking-[0.3em]`}>Личный ритм</span>
                    </div>
                </header>

                {/* Виджет: Час Силы — ТЕПЕРЬ СИММЕТРИЧЕН СИНЕРГИИ */}
                <button
                    onClick={() => handleAction(onOpenPowerInfo)}
                    className={`w-full text-left bg-white/[0.03] backdrop-blur-3xl border border-white/10
                               rounded-[32px] flex flex-col justify-between relative overflow-hidden 
                               active:scale-[0.98] transition-all shadow-xl ${widgetPadding}`}
                >
                    <div className="flex items-start justify-between relative z-10 w-full mb-6">
                        <div className={`${iconBoxSize} bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-500/20 flex items-center justify-center`}>
                            <Crown size={fontScale === 'large' ? 32 : 24} />
                        </div>
                        <div className="text-right">
                            {/* Процент теперь сверху, как в синергии */}
                            <div className={`${percentSize} font-black tracking-tighter text-amber-500 leading-[0.9] tabular-nums`}>{luckyPercent}%</div>
                            <div className={`${labelSize} font-bold uppercase tracking-[1px] opacity-40 text-amber-200 mt-2`}>Интенсивность</div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-3 w-full relative z-10">
                        <div className="flex flex-col gap-1.5 px-1">
                            <span className={`${labelSize} font-bold text-amber-200/40 uppercase tracking-wider`}>Час силы</span>
                            <span className={`${subTitleSize} font-black text-white leading-tight tabular-nums`}>{luckyHour}</span>
                        </div>
                        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                                style={{ width: `${luckyPercent}%` }}
                            />
                        </div>
                    </div>
                </button>

                {/* Виджет: Синергия */}
                <button
                    onClick={() => handleAction(onOpenSynergyInfo)}
                    className={`w-full text-left bg-white/[0.03] backdrop-blur-3xl border border-white/10
                      rounded-[32px] flex flex-col justify-between relative overflow-hidden 
                      active:scale-[0.98] transition-all shadow-xl ${widgetPadding}`}
                >
                    <div className="flex items-start justify-between relative z-10 w-full mb-6">
                        <div className={`${iconBoxSize} bg-pink-500/10 rounded-2xl text-pink-500 border border-pink-500/20 flex items-center justify-center`}>
                            <Gem size={fontScale === 'large' ? 32 : 24} />
                        </div>
                        <div className="text-right">
                            <div className={`${percentSize} font-black tracking-tighter text-pink-500 leading-[0.9] tabular-nums`}>{synergyZodiac.percent}%</div>
                            <div className={`${labelSize} font-bold uppercase tracking-[1px] opacity-40 text-pink-200 mt-2`}>Синергия</div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-3 w-full relative z-10">
                        <div className="flex flex-col gap-1.5 px-1">
                            <span className={`${labelSize} font-bold text-pink-200/40 uppercase tracking-wider`}>Лучший компаньон</span>
                            <span className={`${subTitleSize} font-black text-pink-200 leading-tight`}>{synergyZodiac.sign} {synergyZodiac.name}</span>
                        </div>
                        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(236,72,153,0.4)]"
                                style={{ width: `${synergyZodiac.percent}%` }}
                            />
                        </div>
                    </div>
                </button>

                {/* Кнопка: Прогноз */}
                <button
                    onClick={() => handleAction(onOpenPrediction)}
                    className={`group relative w-full bg-gradient-to-br from-fuchsia-600 to-indigo-700
                             rounded-[36px] flex flex-col justify-between overflow-hidden shadow-2xl 
                             active:scale-[0.97] transition-all text-left ${fontScale === 'large' ? 'p-9 min-h-[190px]' : 'p-7 min-h-[150px]'}`}
                >
                    <div className="absolute -right-6 -top-4 p-2 opacity-[0.1] group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 ease-out">
                        <MoonStar size={160} fill="currentColor" />
                    </div>

                    <div className="relative z-10 flex items-start justify-between gap-4">
                        <div className="shrink-0 p-3 bg-white/15 backdrop-blur-md rounded-2xl text-white shadow-inner border border-white/10">
                            <MoonStar size={fontScale === 'large' ? 32 : 24} fill="white" className="group-hover:rotate-12 transition-transform" />
                        </div>
                        <div className={`${labelSize} font-black uppercase tracking-[2px] text-white/50 text-right mt-1 max-w-[65%] leading-tight`}>
                            Индивидуальный расчет
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto flex justify-between items-end gap-2">
                        <div className="space-y-3">
                            <h2 className={`${titleSize} font-black tracking-tight text-white leading-[0.9] italic`}>
                                Твой <span className="text-fuchsia-200">гороскоп</span>
                            </h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className={`${labelSize} font-bold text-white/60 uppercase tracking-widest`}>Актуально на сегодня</span>
                            </div>
                        </div>
                        <div className="shrink-0 mb-1">
                            <ChevronRight size={fontScale === 'large' ? 42 : 32} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" strokeWidth={3} />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};