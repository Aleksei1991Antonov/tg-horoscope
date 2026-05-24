import React, { useMemo, useState, useCallback } from 'react';
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
}

export const RhythmContainer: React.FC<RhythmContainerProps> = ({ zodiacName, fontScale }) => {
    // Используем WebApp из MAX Bridge для получения имени
    const [userName] = useState(() => {
        const name = window.WebApp?.initDataUnsafe?.user?.first_name;
        return name ? name.toUpperCase() : "ПОЛЬЗОВАТЕЛЬ";
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPowerModalOpen, setIsPowerModalOpen] = useState(false);
    const [isSynergyModalOpen, setIsSynergyModalOpen] = useState(false);

    // Мемоизируем расчеты, чтобы не пересчитывать при каждом рендере (например, при смене fontScale)
    const astroData = useMemo(() => {
        const power = PowerHourEngine.calculate(zodiacName);
        const synergy = SynergyEngine.calculateDailyMatch(zodiacName);
        const dailyPrediction = HoroscopeEngine.generateDailyForecast(zodiacName);

        return { power, synergy, dailyPrediction };
    }, [zodiacName]);

    // Оптимизированные обработчики с тактильным откликом
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