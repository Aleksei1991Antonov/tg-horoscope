import React, { useState, useCallback } from 'react';
import { MenuView } from './MenuView';

interface MenuContainerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const MenuContainer: React.FC<MenuContainerProps> = ({ isOpen, setIsOpen }) => {
    const [currentLang, setCurrentLang] = useState('RU');
    const languages = ['EN', 'RU'];

    const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

    const handleLanguageSelect = useCallback((lang: string) => {
        setCurrentLang(lang);
        // Здесь будет логика i18next или другого плагина
    }, []);

    return (
        <MenuView
            isOpen={isOpen}
            onClose={handleClose}
            currentLang={currentLang}
            languages={languages}
            onLanguageSelect={handleLanguageSelect}
        />
    );
};