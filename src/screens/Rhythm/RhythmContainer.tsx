import React, { useMemo, useState, useCallback, useEffect } from 'react';
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
}

export const RhythmContainer: React.FC<RhythmContainerProps> = ({ zodiacName, fontScale, onSetBackHandler }) => {
    const [userName] = useState(() => {
        const name = window.WebApp?.initDataUnsafe?.user?.first_name;
        return name ? name.toUpperCase() : "ПОЛЬЗОВАТЕЛЬ";
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPowerModalOpen, setIsPowerModalOpen] = useState(false);
    const [isSynergyModalOpen, setIsSynergyModalOpen] = useState(false);

    const anyModalOpen = isModalOpen || isPowerModalOpen || isSynergyModalOpen;

    const astroData = useMemo(() => {
        const power = PowerHourEngine.calculate(zodiacName);
        const synergy = SynergyEngine.calculateDailyMatch(zodiacName);
        const dailyPrediction = HoroscopeEngine.generateDailyForecast(zodiacName);

        return { power, synergy, dailyPrediction };
    }, [zodiacName]);

    const handleOpenPrediction = useCallback(() => {
        void triggerSuccessHaptic();
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
                userName={userName}
                prediction={astroData.dailyPrediction}
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
            />

            <PredictionModal
                isOpen={isModalOpen}
                onClose={handleCloseAll}
                prediction={astroData.dailyPrediction}
                zodiacName={zodiacName}
                fontScale={fontScale}
            />

            <PowerHourModal
                isOpen={isPowerModalOpen}
                onClose={handleCloseAll}
                fontScale={fontScale}
            />

            <SynergyModal
                isOpen={isSynergyModalOpen}
                onClose={handleCloseAll}
                fontScale={fontScale}
            />
        </>
    );
};
