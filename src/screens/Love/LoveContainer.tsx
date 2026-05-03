import React from 'react';
import { LoveView } from './LoveView';

export const LoveContainer: React.FC = () => {
    // В будущем здесь будет логика выбора партнера и расчет процентов
    return <LoveView userZodiac={''} synergyPercent={0} onShowRecommendation={function(): void {
        throw new Error('Function not implemented.');
    } } onSelectPartner={function(): void {
        throw new Error('Function not implemented.');
    } } />;
};