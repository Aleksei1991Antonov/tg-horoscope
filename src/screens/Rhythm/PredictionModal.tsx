import React, { useCallback, useMemo, useState } from 'react';
import { Crown, ChevronLeft, ChevronRight, Gem, X, Clover } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';
import { HoroscopeEngine } from '../../core/engines/HoroscopeEngine';
import { PowerHourEngine } from '../../core/engines/PowerHourEngine';
import { SynergyEngine } from '../../core/engines/SynergyEngine';

const ZODIAC_SIGNS: Record<string, string> = {
    'Овен': '♈', 'Телец': '♉', 'Близнецы': '♊', 'Рак': '♋',
    'Лев': '♌', 'Дева': '♍', 'Весы': '♎', 'Скорпион': '♏',
    'Стрелец': '♐', 'Козерог': '♑', 'Водолей': '♒', 'Рыбы': '♓'
};

const ZODIAC_NAMES = ['Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец', 'Козерог', 'Водолей', 'Рыбы'];

const DAY_NAMES: Record<number, string> = {
    0: 'Сегодня',
    1: 'Завтра'
};

const MONTHS = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

interface PredictionModalProps {
    isOpen: boolean;
    onClose: () => void;
    prediction: string;
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
    dayOffset: number;
    onDayChange: (offset: number) => void;
    luckyNumber: number;
    todayLuckyHour: string;
    todayLuckyPercent: number;
    todayAllPowerHours: string[];
    tomorrowStatus: string;
    tomorrowLuckyPercent: number;
    tomorrowAllPowerHours: string[];
    tomorrowSynergyIcon: string;
    tomorrowSynergyName: string;
    tomorrowSynergyPercent: number;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
    isOpen,
    onClose,
    prediction,
    zodiacName,
    fontScale,
    dayOffset,
    onDayChange,
    luckyNumber,
    todayLuckyHour,
    todayLuckyPercent,
    todayAllPowerHours,
    tomorrowStatus,
    tomorrowLuckyPercent,
    tomorrowAllPowerHours,
    tomorrowSynergyIcon,
    tomorrowSynergyName,
    tomorrowSynergyPercent
}) => {
    const predictionTextSize = fontScale === 'large' ? 'text-[1.25rem]' : 'text-[1rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const titleSize = fontScale === 'large' ? 'text-[2rem]' : 'text-[1.6rem]';
    const subtitleSize = fontScale === 'large' ? 'text-[1rem]' : 'text-[0.8125rem]';

    const [previewSign, setPreviewSign] = useState<string | null>(null);
    const [showSignPicker, setShowSignPicker] = useState(false);

    const effectiveSign = previewSign || zodiacName;

    const previewPrediction = useMemo(() => {
        if (!previewSign && previewSign !== null) return prediction;
        const d = new Date();
        d.setDate(d.getDate() + dayOffset);
        return HoroscopeEngine.generateDailyForecast(effectiveSign, d);
    }, [effectiveSign, dayOffset, previewSign, prediction]);

    const previewLuckyNumber = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + dayOffset);
        return HoroscopeEngine.getLuckyNumber(effectiveSign, d);
    }, [effectiveSign, dayOffset]);

    const previewTodayPower = useMemo(() => {
        if (!previewSign && previewSign !== null) return { luckyHour: todayLuckyHour, luckyPercent: todayLuckyPercent, allPowerHours: todayAllPowerHours };
        const d = new Date();
        d.setDate(d.getDate() + dayOffset);
        const p = PowerHourEngine.calculate(effectiveSign, d);
        return { luckyHour: p.luckyHour, luckyPercent: p.luckyPercent, allPowerHours: p.allPowerHours };
    }, [effectiveSign, dayOffset, previewSign, todayLuckyHour, todayLuckyPercent, todayAllPowerHours]);

    const previewTomorrowStatus = useMemo(() => {
        if (!previewSign && previewSign !== null) return tomorrowStatus;
        const d = new Date();
        d.setDate(d.getDate() + 1);
        const band = HoroscopeEngine.getDayBand(effectiveSign, d);
        const isLove = localStorage.getItem('nova_love_horoscope') === 'true';
        if (isLove) return band.band === 'high' ? 'Сияние чувств' : 'Тёплые моменты';
        return band.status;
    }, [effectiveSign, previewSign, tomorrowStatus]);

    const previewTomorrowPower = useMemo(() => {
        if (!previewSign && previewSign !== null) return { allPowerHours: tomorrowAllPowerHours, luckyPercent: tomorrowLuckyPercent };
        const d = new Date();
        d.setDate(d.getDate() + 1);
        const p = PowerHourEngine.calculate(effectiveSign, d);
        const peak = PowerHourEngine.getDayPeakPercent(effectiveSign, d);
        return { allPowerHours: p.allPowerHours, luckyPercent: peak };
    }, [effectiveSign, previewSign, tomorrowAllPowerHours, tomorrowLuckyPercent]);

    const previewTomorrowSynergy = useMemo(() => {
        if (!previewSign && previewSign !== null) return { icon: tomorrowSynergyIcon, name: tomorrowSynergyName, percent: tomorrowSynergyPercent };
        const d = new Date();
        d.setDate(d.getDate() + 1);
        const s = SynergyEngine.calculateDailyMatch(effectiveSign, d);
        return { icon: s.icon, name: s.sign, percent: s.percent };
    }, [effectiveSign, previewSign, tomorrowSynergyIcon, tomorrowSynergyName, tomorrowSynergyPercent]);

    const isTomorrow = dayOffset === 1;

    const displayPrediction = previewSign ? previewPrediction : prediction;
    const displayLuckyNumber = previewSign ? previewLuckyNumber : luckyNumber;
    const displayTodayPower = previewSign ? previewTodayPower : { luckyHour: todayLuckyHour, luckyPercent: todayLuckyPercent, allPowerHours: todayAllPowerHours };
    const displayStatus = (previewSign && isTomorrow) ? previewTomorrowStatus : tomorrowStatus;
    const displayTomorrowPower = previewSign ? previewTomorrowPower : { allPowerHours: tomorrowAllPowerHours, luckyPercent: tomorrowLuckyPercent };
    const displaySynergy = previewSign ? previewTomorrowSynergy : { icon: tomorrowSynergyIcon, name: tomorrowSynergyName, percent: tomorrowSynergyPercent };

    const handleClose = useCallback(() => {
        setPreviewSign(null);
        setShowSignPicker(false);
        void triggerSuccessHaptic();
        onClose();
    }, [onClose]);

    const handlePrev = useCallback(() => {
        void triggerSuccessHaptic();
        if (dayOffset > 0) onDayChange(dayOffset - 1);
    }, [dayOffset, onDayChange]);

    const handleNext = useCallback(() => {
        void triggerSuccessHaptic();
        if (dayOffset < 1) onDayChange(dayOffset + 1);
    }, [dayOffset, onDayChange]);

    const dateStr = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + dayOffset);
        return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
    }, [dayOffset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-md"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-sm bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[40px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
                <div className="flex-1 overflow-y-auto no-scrollbar p-8 pb-6">
                    <div className="flex items-start justify-between mb-6">
                        <button
                            onClick={() => { void triggerSuccessHaptic(); setShowSignPicker(!showSignPicker); }}
                            className="flex items-center gap-2 mt-2 active:scale-95 transition-all"
                        >
                            <span className="text-xl">{ZODIAC_SIGNS[effectiveSign]}</span>
                            <span className={`${labelSize} font-black uppercase tracking-tight ${previewSign ? 'text-[var(--c-primary)]' : 'text-[var(--c-text-50)]'}`}>{effectiveSign}</span>
                        </button>
                        <button
                            onClick={handleClose}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--c-bg-80)] active:scale-90 transition-all -mr-1"
                        >
                            <X size="1.25rem" className="text-[var(--c-text-50)]" />
                        </button>
                    </div>

                    {showSignPicker && (
                        <div className="mb-6 p-3 rounded-3xl bg-[var(--c-bg-80)]">
                            <div className="grid grid-cols-4 gap-2">
                                {ZODIAC_NAMES.map(name => (
                                    <button
                                        key={name}
                                        onClick={() => {
                                            void triggerSuccessHaptic();
                                            setPreviewSign(name === zodiacName ? null : name);
                                            setShowSignPicker(false);
                                        }}
                                        className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all active:scale-90 ${
                                            effectiveSign === name
                                                ? 'bg-[var(--c-primary)] text-white'
                                                : 'bg-[var(--c-surface)] text-[var(--c-text-50)]'
                                        }`}
                                    >
                                        <span className="text-lg">{ZODIAC_SIGNS[name]}</span>
                                        <span className={`${fontScale === 'large' ? 'text-[0.5rem]' : 'text-[0.4rem]'} font-bold uppercase tracking-tight`}>{name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <button
                            onClick={handlePrev}
                            disabled={dayOffset === 0}
                            className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90 disabled:opacity-20"
                        >
                            <ChevronLeft size="1.25rem" className="text-[var(--c-text-50)]" />
                        </button>

                        <div className="flex flex-col items-center min-w-[120px]">
                            <span className="text-[1.125rem] font-black tracking-tight text-[var(--c-text)]">
                                {DAY_NAMES[dayOffset]}
                            </span>
                            <span className={`${labelSize} font-bold opacity-30 text-[var(--c-text)]`}>
                                {dateStr}
                            </span>
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={dayOffset === 1}
                            className="w-8 h-8 flex items-center justify-center rounded-full transition-all active:scale-90 disabled:opacity-20"
                        >
                            <ChevronRight size="1.25rem" className="text-[var(--c-text-50)]" />
                        </button>
                    </div>

                    {isTomorrow ? (
                        <div className="flex flex-col gap-8">
                            <div>
                                <div className={titleSize + ' font-black tracking-tight text-[var(--c-text)]'}>
                                    {displayStatus}
                                </div>
                            </div>

                            <div className="bg-[var(--c-bg-80)] rounded-3xl p-6 space-y-5">
                                <div className="flex items-center gap-3">
                                    <Crown size="1.25rem" className="text-[var(--c-primary)]" />
                                    <span className={`${labelSize} font-bold uppercase tracking-[0.15em] text-[var(--c-text-40)]`}>
                                        Часы силы
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {displayTomorrowPower.allPowerHours.map((hour, i) => (
                                        <div
                                            key={i}
                                            className="px-4 py-2 rounded-full bg-[var(--c-surface)] text-[var(--c-text)] font-bold"
                                            style={{ fontSize: fontScale === 'large' ? '1rem' : '0.8125rem' }}
                                        >
                                            {hour}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[var(--c-bg-80)] rounded-3xl p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Gem size="1.25rem" className="text-[var(--c-primary)]" />
                                    <span className={`${labelSize} font-bold uppercase tracking-[0.15em] text-[var(--c-text-40)]`}>
                                        Лучший компаньон
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{displaySynergy.icon}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`${subtitleSize} font-black text-[var(--c-text)]`}>
                                            {displaySynergy.name}
                                        </span>
                                        <span className={`${labelSize} font-bold text-[var(--c-primary)]`}>
                                            {displaySynergy.percent}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className={`${labelSize} font-bold uppercase tracking-[0.15em] text-[var(--c-text-40)]`}>
                                        Интенсивность
                                    </span>
                                    <span className={`${subtitleSize} font-black text-[var(--c-text)] tabular-nums`}>
                                        {displayTomorrowPower.luckyPercent}%
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--c-bg-90)]">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${displayTomorrowPower.luckyPercent}%`,
                                            background: 'var(--c-gradient-progress, linear-gradient(90deg, var(--c-secondary) 0%, var(--c-accent, var(--c-primary)) 50%, var(--c-primary) 100%))',
                                            backgroundSize: 'cover',
                                            border: '1px solid var(--c-primary-20)'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--c-bg-80)]">
                                <Clover size="1.25rem" className="text-[var(--c-primary)] shrink-0" />
                                <span className={`${labelSize} font-bold uppercase tracking-[0.15em] text-[var(--c-text-40)]`}>ЧИСЛО УДАЧИ:</span>
                                <span className={`${subtitleSize} font-black text-[var(--c-text)] tabular-nums ml-auto`}>{displayLuckyNumber}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full space-y-6">
                            <p className={`${predictionTextSize} text-[var(--c-text-95)] font-medium leading-relaxed whitespace-pre-line relative z-10 text-left`}>
                                {displayPrediction}
                            </p>

                            <div className="bg-[var(--c-bg-80)] rounded-3xl p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Crown size="1.25rem" className="text-[var(--c-primary)]" />
                                    <span className={`${labelSize} font-bold uppercase tracking-[0.15em] text-[var(--c-text-40)]`}>
                                        Час силы
                                    </span>
                                    <span className={`${subtitleSize} font-black text-[var(--c-text)] tabular-nums ml-auto`}>
                                        {displayTodayPower.luckyPercent}%
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`${fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]'} font-black text-[var(--c-primary)]`}>
                                        {displayTodayPower.luckyHour}
                                    </span>
                                    <span className={`${labelSize} font-bold text-[var(--c-text-30)]`}>
                                        — пик энергии
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {displayTodayPower.allPowerHours.map((hour, i) => (
                                        <div
                                            key={i}
                                            className="px-3 py-1.5 rounded-full bg-[var(--c-surface)] text-[var(--c-text)] font-bold"
                                            style={{ fontSize: fontScale === 'large' ? '0.8125rem' : '0.6875rem' }}
                                        >
                                            {hour}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--c-bg-80)]">
                                <Clover size="1.25rem" className="text-[var(--c-primary)] shrink-0" />
                                <span className={`${labelSize} font-bold uppercase tracking-[0.15em] text-[var(--c-text-40)]`}>ЧИСЛО УДАЧИ:</span>
                                <span className={`${subtitleSize} font-black text-[var(--c-text)] tabular-nums ml-auto`}>{displayLuckyNumber}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
