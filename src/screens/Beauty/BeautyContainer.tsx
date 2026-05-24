import React, {useMemo, useEffect, useState} from 'react';
import {BeautyView} from './BeautyView';
import {LunarEngine} from '../../core/engines/LunarEngine';
import {BeautyEngine} from '../../core/engines/BeautyEngine';

interface BeautyContainerProps {
    zodiacName: string;
    // Добавляем проп масштаба, который приходит из App.tsx
    fontScale: 'small' | 'medium' | 'large';
}

export const BeautyContainer: React.FC<BeautyContainerProps> = ({zodiacName, fontScale}) => {
    // Состояние времени для точности расчетов
    const [currentTime, setCurrentTime] = useState(() => new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Обновляем раз в минуту
        return () => clearInterval(timer);
    }, []);

    const data = useMemo(() => {
        const lunar = LunarEngine.getLunarData(currentTime);
        const moonZodiac = LunarEngine.getMoonZodiac(currentTime);

        // Фаза: < 0.5 — растущая Луна
        const isWaxing = lunar.phase < 0.5;

        // Расчет рекомендаций на основе знака пользователя и положения Луны
        const recommendations = BeautyEngine.calculate(
            zodiacName,
            moonZodiac.name,
            isWaxing
        );

        return {
            recommendations,
            lunarInfo: {
                phaseName: LunarEngine.getPhaseName(lunar.phase),
                // Приводим 0...1 к процентам 0...100
                illumination: Math.round(lunar.illumination * 100),
                moonZodiacName: moonZodiac.name,
                moonZodiacIcon: moonZodiac.icon
            }
        };
    }, [zodiacName, currentTime]);

    return (
        <BeautyView
            zodiacName={zodiacName}
            recommendations={data.recommendations}
            lunarInfo={data.lunarInfo}
            fontScale={fontScale} // Прокидываем масштаб в View
        />
    );
};