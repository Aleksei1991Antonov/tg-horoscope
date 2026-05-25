import React, { useState, useMemo, useEffect } from 'react';
import { X } from 'lucide-react';
import { LoveView } from './LoveView';
import { LoveEngine } from '../../core/engines/LoveEngine';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface LoveContainerProps {
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
}

const ALL_ZODIAC = [
    'Овен', 'Телец', 'Близнецы', 'Рак',
    'Лев', 'Дева', 'Весы', 'Скорпион',
    'Стрелец', 'Козерог', 'Водолей', 'Рыбы'
];

const ZODIAC_EMOJI: Record<string, string> = {
    'Овен': '♈️', 'Телец': '♉️', 'Близнецы': '♊️', 'Рак': '♋️',
    'Лев': '♌️', 'Дева': '♍️', 'Весы': '♎️', 'Скорпион': '♏️',
    'Стрелец': '♐️', 'Козерог': '♑️', 'Водолей': '♒️', 'Рыбы': '♓️'
};

export const LoveContainer: React.FC<LoveContainerProps> = ({ zodiacName, fontScale }) => {
    const [partnerName, setPartnerName] = useState<string | undefined>(() => {
        return localStorage.getItem('user_partner_choice') || undefined;
    });

    const [isSelecting, setIsSelecting] = useState(false);

    const [yearOffset, setYearOffset] = useState(0);

    useEffect(() => {
        if (partnerName) {
            localStorage.setItem('user_partner_choice', partnerName);
            window.WebApp?.DeviceStorage?.setItem('user_partner_choice', partnerName);
        }
    }, [partnerName]);

    const currentYear = new Date().getFullYear() + yearOffset;

    const data = useMemo(() => {
        const weeklyForecast = LoveEngine.getWeeklyForecast(zodiacName, partnerName);
        const monthlyForecast = LoveEngine.getMonthlyForecast(zodiacName, partnerName);
        const yearlyForecast = LoveEngine.getYearlyForecast(zodiacName, partnerName, yearOffset);
        const synergyPercent = partnerName
            ? LoveEngine.getBaseSynergy(zodiacName, partnerName)
            : 0;

        return { weeklyForecast, monthlyForecast, yearlyForecast, synergyPercent };
    }, [zodiacName, partnerName, yearOffset]);

    const handleYearPrev = () => setYearOffset(o => o - 1);
    const handleYearNext = () => setYearOffset(o => o + 1);

    const handleSelectPartner = (name: string) => {
        void triggerSuccessHaptic();
        setPartnerName(name);
        setIsSelecting(false);
    };

    const modalTitleSize = fontScale === 'large' ? 'text-3xl' : 'text-2xl';
    const zodiacLabelSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]';
    const emojiSize = fontScale === 'large' ? 'text-4xl' : 'text-3xl';
    const gridGap = fontScale === 'large' ? 'gap-4' : 'gap-3';

    return (
        <div className="relative w-full h-full">
            <LoveView
                partnerZodiac={partnerName ? ZODIAC_EMOJI[partnerName] : undefined}
                synergyPercent={data.synergyPercent}
                weeklyForecast={data.weeklyForecast}
                monthlyForecast={data.monthlyForecast}
                yearlyForecast={data.yearlyForecast}
                currentYear={currentYear}
                onYearPrev={handleYearPrev}
                onYearNext={handleYearNext}
                onSelectPartner={() => {
                    void triggerSuccessHaptic();
                    setIsSelecting(true);
                }}
                fontScale={fontScale}
            />

            {isSelecting && (
                <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-10">
                    <div
                        className="absolute inset-0 bg-[var(--c-bg-80)] backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={() => {
                            void triggerSuccessHaptic();
                            setIsSelecting(false);
                        }}
                    />

                    <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] border border-[var(--c-border)] rounded-[32px] p-6 animate-in slide-in-from-bottom-10 duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex flex-col">
                                <span className={`${zodiacLabelSize} font-bold uppercase tracking-[0.4em] text-[var(--c-primary)]`}>ЛЮБОВНЫЙ РИТМ</span>
                                <h3 className={`${modalTitleSize} font-black text-[var(--c-text)] tracking-tighter uppercase`}>Выбор знака</h3>
                            </div>
                            <button
                                onClick={() => {
                                    void triggerSuccessHaptic();
                                    setIsSelecting(false);
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-50)] active:scale-90 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={`grid grid-cols-3 ${gridGap}`}>
                            {ALL_ZODIAC.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handleSelectPartner(name)}
                                    className={`
                                        flex flex-col items-center p-5 rounded-[24px] border transition-all active:scale-95
                                        ${name === partnerName
                                        ? 'bg-[var(--c-primary-20)] border-[var(--c-primary-50)] shadow-[0_0_20px_var(--c-primary-40)]'
                                        : 'bg-[var(--c-surface)] border-[var(--c-border)] hover:border-[var(--c-border)]'}
                                    `}
                                >
                                    <span className={`${emojiSize} mb-2 drop-shadow-md transition-transform ${name === partnerName ? 'scale-110' : 'grayscale-[0.5]'}`}>
                                        {ZODIAC_EMOJI[name]}
                                    </span>
                                    <span className={`${zodiacLabelSize} font-bold uppercase tracking-tight ${name === partnerName ? 'text-[var(--c-text)]' : 'text-[var(--c-text-40)]'}`}>
                                        {name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};