import React, { useMemo } from 'react';
import { BeautyView } from './BeautyView';
import { LunarEngine } from '../../core/engines/LunarEngine';
import { BeautyEngine } from '../../core/engines/BeautyEngine';

interface BeautyContainerProps {
    zodiacName: string;
}

export const BeautyContainer: React.FC<BeautyContainerProps> = ({ zodiacName }) => {
    // 1. Берем текущую дату (сейчас 7 мая 2026 по системе)
    const now = new Date();

    const data = useMemo(() => {
        // 2. ИСПОЛЬЗУЕМ ТВОЙ ДВИЖОК НА ПОЛНУЮ
        // lunar содержит { phase, illumination, age }
        const lunar = LunarEngine.getLunarData(now);

        // moonZodiac содержит { name, icon } на основе твоих формул l_prime
        const moonZodiac = LunarEngine.getMoonZodiac(now);

        // Определяем тип фазы для логики красоты
        // В твоем движке 0.0 - новолуние, 0.5 - полнолуние.
        // Значит, всё что < 0.5 — это растущая Луна.
        const isWaxing = lunar.phase < 0.5;

        // 3. ПЕРЕДАЕМ ЭТИ ДАННЫЕ В ДВИЖОК КРАСОТЫ
        // Теперь BeautyEngine работает на реальном знаке и фазе из LunarEngine
        const recommendations = BeautyEngine.calculate(
            zodiacName,
            moonZodiac.name,
            isWaxing
        );

        return {
            recommendations,
            lunarInfo: {
                phaseName: LunarEngine.getPhaseName(lunar.phase),
                illumination: lunar.illumination,
                moonZodiacName: moonZodiac.name,
                moonZodiacIcon: moonZodiac.icon
            }
        };
    }, [zodiacName, now]);

    return (
        <BeautyView
            zodiacName={zodiacName}
            recommendations={data.recommendations}
            lunarInfo={data.lunarInfo}
        />
    );
};