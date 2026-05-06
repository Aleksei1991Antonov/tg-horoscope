import React from 'react';
import { LoveView } from './LoveView';

// Добавляем интерфейс для пропсов
interface LoveContainerProps {
    zodiacName: string;
}

export const LoveContainer: React.FC<LoveContainerProps> = ({ zodiacName }) => {
    // Здесь будет логика расчета (пока передаем zodiacName как userZodiac)

    const handleShowRecommendation = () => {
        console.log("Show recommendation clicked");
    };

    const handleSelectPartner = () => {
        console.log("Select partner clicked");
    };

    return (
        <LoveView
            userZodiac={zodiacName}
            synergyPercent={0}
            onShowRecommendation={handleShowRecommendation}
            onSelectPartner={handleSelectPartner}
        />
    );
};