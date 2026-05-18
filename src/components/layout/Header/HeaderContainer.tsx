import React, { useMemo, useState } from 'react';
import { HeaderView } from './HeaderView';
import { MenuContainer } from './Menu/MenuContainer';
import { ZodiacModal } from './ZodiacModal';
import { ZODIAC_LIST } from './constants'; // Импортируем из нового файла

interface HeaderContainerProps {
    onZodiacChange: (name: string) => void;
    currentZodiacName: string;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({ onZodiacChange, currentZodiacName }) => {
    const [userName] = useState(() => {
        const user = window.WebApp?.initDataUnsafe?.user;
        if (user) {
            return (user.username || user.first_name || "ГОСТЬ").toUpperCase();
        }
        return "ГОСТЬ";
    });

    const [isZodiacModalOpen, setIsZodiacModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Добавили тип { name: string } для параметра z
    const zodiacIndex = useMemo(() => {
        const index = ZODIAC_LIST.findIndex((z: { name: string }) => z.name === currentZodiacName);
        return index !== -1 ? index : null;
    }, [currentZodiacName]);

    const formattedDate = useMemo(() => {
        return new Date().toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long'
        }).toUpperCase();
    }, []);

    const selectZodiac = (index: number) => {
        const selected = ZODIAC_LIST[index];
        setIsZodiacModalOpen(false);
        onZodiacChange(selected.name);

        if (window.WebApp?.HapticFeedback) {
            void window.WebApp.HapticFeedback.impactOccurred('medium');
        }
    };

    const displayZodiac = zodiacIndex !== null
        ? ZODIAC_LIST[zodiacIndex]
        : { sign: "✧", name: "ВЫБРАТЬ" };

    return (
        <>
            <HeaderView
                userName={userName}
                zodiacSign={displayZodiac.sign}
                zodiacName={displayZodiac.name}
                formattedDate={formattedDate}
                onMenuClick={() => {
                    void window.WebApp?.HapticFeedback?.selectionChanged();
                    setIsMenuOpen(true);
                }}
                onZodiacClick={() => {
                    void window.WebApp?.HapticFeedback?.selectionChanged();
                    setIsZodiacModalOpen(true);
                }}
            />

            <MenuContainer isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

            <ZodiacModal
                isOpen={isZodiacModalOpen}
                onClose={() => setIsZodiacModalOpen(false)}
                onSelect={selectZodiac}
                currentIndex={zodiacIndex}
                isFirstLaunch={false}
            />
        </>
    );
};
