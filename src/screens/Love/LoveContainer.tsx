import React, { useState, useMemo, useEffect } from 'react';
import { LoveView } from './LoveView';
import { LoveEngine } from '../../core/engines/LoveEngine';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface LoveContainerProps {
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
    onSetBackHandler: (handler: (() => void) | null) => void;
    resolvedTheme: string;
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

export const LoveContainer: React.FC<LoveContainerProps> = ({ zodiacName, fontScale, onSetBackHandler, resolvedTheme }) => {
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

    useEffect(() => {
        onSetBackHandler(isSelecting ? () => setIsSelecting(false) : null);
    }, [isSelecting, onSetBackHandler]);

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

    const zodiacLabelSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]';
    const emojiSize = fontScale === 'large' ? 'text-4xl' : 'text-3xl';
    const gridGap = fontScale === 'large' ? 'gap-4' : 'gap-3';

    return (
        <div className="relative w-full h-full">
            <LoveView
                zodiacName={zodiacName}
                zodiacEmoji={ZODIAC_EMOJI[zodiacName] || '✦'}
                partnerZodiac={partnerName ? ZODIAC_EMOJI[partnerName] : undefined}
                partnerZodiacName={partnerName || undefined}
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
                resolvedTheme={resolvedTheme}
            />

            {isSelecting && (
                <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-10">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => {
                            void triggerSuccessHaptic();
                            setIsSelecting(false);
                        }}
                    />

                    <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] rounded-[36px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className={`grid grid-cols-3 ${gridGap} pt-2`}>
                            {ALL_ZODIAC.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handleSelectPartner(name)}
                                    className={`
                                        flex flex-col items-center py-5 rounded-[24px] transition-all active:scale-95
                                        ${name === partnerName
                                        ? 'bg-[var(--c-primary-10)] shadow-inner'
                                        : 'hover:bg-[var(--c-surface)]'}
                                    `}
                                >
                                    <span className={`${emojiSize} mb-2 transition-transform ${name === partnerName ? 'scale-110' : ''}`}>
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