import React, { useMemo, useState } from 'react';
import { RhythmView } from './RhythmView';
import { PowerHourEngine } from '../../core/engines/PowerHourEngine';
import { SynergyEngine } from '../../core/engines/SynergyEngine';
import { HoroscopeEngine } from '../../core/engines/HoroscopeEngine';
import { PredictionModal } from './PredictionModal';

// Глобальная типизация Telegram WebApp
declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initDataUnsafe?: {
                    user?: {
                        first_name?: string;
                    };
                };
            };
        };
    }
}

interface RhythmContainerProps {
    zodiacName: string;
}

export const RhythmContainer: React.FC<RhythmContainerProps> = ({ zodiacName }) => {
    // Получаем имя сразу при инициализации, чтобы избежать useEffect и лишних рендеров
    const [userName] = useState(() => {
        const tgName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name;
        return tgName ? tgName.toUpperCase() : "ПОЛЬЗОВАТЕЛЬ";
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Все расчеты зависят только от знака зодиака
    const astroData = useMemo(() => {
        const power = PowerHourEngine.calculate(zodiacName);
        const synergy = SynergyEngine.calculateDailyMatch(zodiacName);
        const dailyPrediction = HoroscopeEngine.generateDailyForecast(zodiacName);

        return { power, synergy, dailyPrediction };
    }, [zodiacName]);

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
                onOpenPrediction={() => setIsModalOpen(true)}
            />

            <PredictionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                prediction={astroData.dailyPrediction}
                zodiacName={zodiacName}
            />
        </>
    );
};