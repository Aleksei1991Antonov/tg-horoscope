import React, { useMemo } from 'react';
import { HeaderView } from './HeaderView';

interface HeaderContainerProps {
    userName: string;
    zodiacSign: string;
    zodiacName: string;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
    // Логика форматирования даты
    const formattedDate = useMemo(() => {
        return new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        });
    }, []);

    // Логика открытия меню
    const handleMenuClick = () => {
        console.log("Открыть экран меню/настроек");
        // В будущем здесь: setIsMenuOpen(true)
    };

    return (
        <HeaderView
            {...props}
            formattedDate={formattedDate}
            onMenuClick={handleMenuClick}
        />
    );
};