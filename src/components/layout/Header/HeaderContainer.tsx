import React, { useMemo, useState, useEffect } from 'react';
import { HeaderView } from './HeaderView';
import { MenuContainer } from './Menu/MenuContainer';
import { ZodiacModal } from './ZodiacModal';
import { ZODIAC_LIST } from './constants';
import { triggerSuccessHaptic } from '../../../utils/haptics';

interface HeaderContainerProps {
    onZodiacChange: (name: string) => void;
    currentZodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
    setFontScale: (scale: 'small' | 'medium' | 'large') => void;
    onOpenTextSettings: () => void;
    onOpenKnowledge: () => void;
    onOpenLegalDoc: (doc: 'privacy' | 'terms') => void;
    onSetBackHandler: (handler: (() => void) | null) => void;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
                                                                    onZodiacChange,
                                                                    currentZodiacName,
                                                                    fontScale,
                                                                    setFontScale,
                                                                    onOpenTextSettings,
                                                                    onOpenKnowledge,
                                                                    onOpenLegalDoc,
                                                                    onSetBackHandler
                                                                }) => {
    const [userName] = useState(() => {
        const user = window.WebApp?.initDataUnsafe?.user;
        if (user) {
            return (user.username || user.first_name || "ГОСТЬ").toUpperCase();
        }
        return "ГОСТЬ";
    });

    const [isZodiacModalOpen, setIsZodiacModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    };

    useEffect(() => {
        if (isZodiacModalOpen) {
            onSetBackHandler(() => setIsZodiacModalOpen(false));
        } else if (isMenuOpen) {
            onSetBackHandler(() => setIsMenuOpen(false));
        } else {
            onSetBackHandler(null);
        }
    }, [isMenuOpen, isZodiacModalOpen, onSetBackHandler]);

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
                    void triggerSuccessHaptic();
                    setIsMenuOpen(true);
                }}
                onZodiacClick={() => {
                    void triggerSuccessHaptic();
                    setIsZodiacModalOpen(true);
                }}
                fontScale={fontScale}
            />

            <MenuContainer
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                fontScale={fontScale}
                setFontScale={setFontScale}
                onOpenTextSettings={onOpenTextSettings}
                onOpenKnowledge={onOpenKnowledge}
                onOpenLegalDoc={onOpenLegalDoc}
                onSetBackHandler={onSetBackHandler}
            />

            <ZodiacModal
                isOpen={isZodiacModalOpen}
                onClose={() => setIsZodiacModalOpen(false)}
                onSelect={selectZodiac}
                currentIndex={zodiacIndex}
                isFirstLaunch={false}
                fontScale={fontScale}
            />
        </>
    );
};