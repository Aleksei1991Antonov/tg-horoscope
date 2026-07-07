import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { RhythmView } from './RhythmView';
import { PowerHourEngine } from '../../core/engines/PowerHourEngine';
import { SynergyEngine } from '../../core/engines/SynergyEngine';
import { HoroscopeEngine } from '../../core/engines/HoroscopeEngine';
import { PredictionModal } from './PredictionModal';
import { PowerHourModal } from './PowerHourModal';
import { SynergyModal } from './SynergyModal';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface RhythmContainerProps {
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
    onSetBackHandler: (handler: (() => void) | null) => void;
    resolvedTheme: string;
}

export const RhythmContainer: React.FC<RhythmContainerProps> = ({ zodiacName, fontScale, onSetBackHandler, resolvedTheme }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPowerModalOpen, setIsPowerModalOpen] = useState(false);
    const [isSynergyModalOpen, setIsSynergyModalOpen] = useState(false);
    const [dayOffset, setDayOffset] = useState(0);
    const [loveTick, setLoveTick] = useState(0);

    useEffect(() => {
        const handler = () => setLoveTick(t => t + 1);
        window.addEventListener('nova-toggle', handler);
        return () => window.removeEventListener('nova-toggle', handler);
    }, []);

    const anyModalOpen = isModalOpen || isPowerModalOpen || isSynergyModalOpen;

    const astroData = useMemo(() => {
        const power = PowerHourEngine.calculate(zodiacName);
        const synergy = SynergyEngine.calculateDailyMatch(zodiacName);
        return { power, synergy };
    }, [zodiacName]);

    const prediction = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        return HoroscopeEngine.generateDailyForecast(zodiacName, date);
    }, [zodiacName, dayOffset, loveTick]);

    const luckyNumber = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        return HoroscopeEngine.getLuckyNumber(zodiacName, date);
    }, [zodiacName, dayOffset]);

    const tomorrowBand = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return HoroscopeEngine.getDayBand(zodiacName, date);
    }, [zodiacName]);

    const tomorrowStatus = useMemo(() => {
        const isLove = localStorage.getItem('nova_love_horoscope') === 'true';
        if (isLove) return tomorrowBand.band === 'high' ? 'Сияние чувств' : 'Тёплые моменты';
        return tomorrowBand.status;
    }, [tomorrowBand, loveTick]);

    const tomorrowPower = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return PowerHourEngine.calculate(zodiacName, date);
    }, [zodiacName]);

    const tomorrowPeakIntensity = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return PowerHourEngine.getDayPeakPercent(zodiacName, date);
    }, [zodiacName]);

    const tomorrowSynergy = useMemo(() => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return SynergyEngine.calculateDailyMatch(zodiacName, date);
    }, [zodiacName]);

    const handleOpenPrediction = useCallback(() => {
        void triggerSuccessHaptic();
        setDayOffset(0);
        setIsModalOpen(true);
    }, []);

    const handleOpenPower = useCallback(() => {
        void triggerSuccessHaptic();
        setIsPowerModalOpen(true);
    }, []);

    const handleOpenSynergy = useCallback(() => {
        void triggerSuccessHaptic();
        setIsSynergyModalOpen(true);
    }, []);

    const handleCloseAll = useCallback(() => {
        setIsModalOpen(false);
        setIsPowerModalOpen(false);
        setIsSynergyModalOpen(false);
    }, []);

    useEffect(() => {
        if (anyModalOpen) {
            onSetBackHandler(handleCloseAll);
        } else {
            onSetBackHandler(null);
        }
    }, [anyModalOpen, onSetBackHandler, handleCloseAll]);

    return (
        <>
            <RhythmView
                prediction={prediction}
                luckyHour={astroData.power.luckyHour}
                luckyPercent={astroData.power.luckyPercent}
                synergyZodiac={{
                    sign: astroData.synergy.icon,
                    name: astroData.synergy.sign,
                    percent: astroData.synergy.percent
                }}
                onOpenPrediction={handleOpenPrediction}
                onOpenPowerInfo={handleOpenPower}
                onOpenSynergyInfo={handleOpenSynergy}
                fontScale={fontScale}
                resolvedTheme={resolvedTheme}
            />

            <PredictionModal
                isOpen={isModalOpen}
                onClose={handleCloseAll}
                prediction={prediction}
                zodiacName={zodiacName}
                fontScale={fontScale}
                dayOffset={dayOffset}
                onDayChange={setDayOffset}
                luckyNumber={luckyNumber}
                todayLuckyHour={astroData.power.luckyHour}
                todayLuckyPercent={astroData.power.luckyPercent}
                todayAllPowerHours={astroData.power.allPowerHours}
                tomorrowStatus={tomorrowStatus}
                tomorrowLuckyPercent={tomorrowPeakIntensity}
                tomorrowAllPowerHours={tomorrowPower.allPowerHours}
                tomorrowSynergyIcon={tomorrowSynergy.icon}
                tomorrowSynergyName={tomorrowSynergy.sign}
                tomorrowSynergyPercent={tomorrowSynergy.percent}
            />

            <PowerHourModal
                isOpen={isPowerModalOpen}
                onClose={handleCloseAll}
                data={astroData.power}
                fontScale={fontScale}
            />

            <SynergyModal
                isOpen={isSynergyModalOpen}
                onClose={handleCloseAll}
                data={astroData.synergy}
                fontScale={fontScale}
            />
        </>
    );
};
