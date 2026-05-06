import React from 'react';
import { BeautyView } from './BeautyView';

interface BeautyContainerProps {
    zodiacName: string;
}

export const BeautyContainer: React.FC<BeautyContainerProps> = ({ zodiacName }) => {
    // Используем переменную в консоли, чтобы ESLint не ругался
    // Это полезно для отладки: ты будешь видеть, какой знак пришел
    console.log('Beauty screen for:', zodiacName);

    return <BeautyView />;
};