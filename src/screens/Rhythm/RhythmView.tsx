import React from 'react';
import { Crown, Gem, Sparkles, ChevronRight } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface RhythmViewProps {
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

    const widgetPadding = fontScale === 'large' ? 'p-8 min-h-[180px]' : 'p-6 min-h-[140px]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    const handleAction = (callback: () => void) => {
        void triggerSuccessHaptic();
        callback();
    };

    return (
        <div className={`relative w-full text-[var(--c-text)] ${bottomPadding} font-sans antialiased px-1`}>
                <header className="mb-6 px-3">
                    <div className="flex items-center gap-2 opacity-40 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-primary)] shrink-0" />
                        <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em] text-[var(--c-primary)]`}>Личный ритм</span>
                    </div>
                </header>

            <div className="relative z-10 flex flex-col w-full gap-4">

                {/* Виджет: Час Силы — ТЕПЕРЬ СИММЕТРИЧЕН СИНЕРГИИ */}
                <button
                    onClick={() => handleAction(onOpenPowerInfo)}
                    className={`w-full text-left bg-[var(--c-surface)] backdrop-blur-3xl border border-[var(--c-border)]
                               rounded-[32px] flex flex-col justify-between relative overflow-hidden 
                               active:scale-[0.98] transition-all card-shadow ${widgetPadding}`}
                >
                    <div className="flex items-start justify-between relative z-10 w-full mb-6">
                        <Crown size={fontScale === 'large' ? "2rem" : "1.5rem"} className="text-[var(--c-primary)]" />
                        <div className="text-right">
                            <div className={`${percentSize} font-black tracking-tighter text-[var(--c-primary)] leading-[0.9] tabular-nums`}>{luckyPercent}%</div>
                            <div className={`${labelSize} font-bold uppercase tracking-[1px] text-[var(--c-text-30)] mt-2`}>Интенсивность</div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-3 w-full relative z-10">
                        <div className="flex flex-col gap-1.5 px-1">
                            <span className={`${labelSize} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Час силы</span>
                            <span className={`${subTitleSize} font-black text-[var(--c-text)] leading-tight tabular-nums`}>{luckyHour}</span>
                        </div>
                        <div className="w-full h-2.5 bg-black/[0.05] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--c-primary)] rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${luckyPercent}%` }}
                            />
                        </div>
                    </div>
                </button>

                {/* Виджет: Синергия */}
                <button
                    onClick={() => handleAction(onOpenSynergyInfo)}
                    className={`w-full text-left bg-[var(--c-surface)] backdrop-blur-3xl border border-[var(--c-border)]
                      rounded-[32px] flex flex-col justify-between relative overflow-hidden 
                      active:scale-[0.98] transition-all card-shadow ${widgetPadding}`}
                >
                    <div className="flex items-start justify-between relative z-10 w-full mb-6">
                        <Gem size={fontScale === 'large' ? "2rem" : "1.5rem"} className="text-[var(--c-secondary)]" />
                        <div className="text-right">
                            <div className={`${percentSize} font-black tracking-tighter text-[var(--c-secondary)] leading-[0.9] tabular-nums`}>{synergyZodiac.percent}%</div>
                            <div className={`${labelSize} font-bold uppercase tracking-[1px] text-[var(--c-text-30)] mt-2`}>Синергия</div>
                        </div>
                    </div>

                    <div className="mt-auto space-y-3 w-full relative z-10">
                        <div className="flex flex-col gap-1.5 px-1">
                            <span className={`${labelSize} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Лучший компаньон</span>
                            <span className={`${subTitleSize} font-black text-[var(--c-text)] leading-tight`}>{synergyZodiac.sign} {synergyZodiac.name}</span>
                        </div>
                        <div className="w-full h-2.5 bg-black/[0.05] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--c-secondary)] rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${synergyZodiac.percent}%` }}
                            />
                        </div>
                    </div>
                </button>

                {/* Кнопка: Прогноз */}
                <button
                    onClick={() => handleAction(onOpenPrediction)}
                    className={`group relative w-full bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-primary-60)] backdrop-blur-3xl border border-[var(--c-border)]
                             rounded-[36px] flex flex-col justify-between overflow-hidden
                             hover:brightness-110 active:scale-[0.97] transition-all text-left ${fontScale === 'large' ? 'p-9 min-h-[190px]' : 'p-7 min-h-[150px]'}`}
                >
                    <div className="relative z-10 flex items-start justify-between gap-4">
                        <Sparkles size={fontScale === 'large' ? "2rem" : "1.5rem"} className="text-white group-hover:rotate-12 transition-transform shrink-0" />
                        <div className={`${labelSize} font-black uppercase tracking-[2px] text-white/50 text-right mt-1 max-w-[65%] leading-tight`}>
                            Индивидуальный расчет
                        </div>
                    </div>

                    <div className="relative z-10 mt-auto flex justify-between items-end gap-2">
                        <div className="space-y-3">
                            <h2 className={`${titleSize} font-black tracking-tight text-white leading-[0.9]`}>
                                Твой <span className="text-white/80">гороскоп</span>
                            </h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[var(--c-primary-60)]" />
                                <span className={`${labelSize} font-bold text-white/60 uppercase tracking-widest`}>Актуально на сегодня</span>
                            </div>
                        </div>
                        <div className="shrink-0 mb-1">
                            <ChevronRight size={fontScale === 'large' ? 24 : 18} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" strokeWidth={2} />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
};