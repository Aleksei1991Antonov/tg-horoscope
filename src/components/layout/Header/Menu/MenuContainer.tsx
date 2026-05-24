import React, { useState, useCallback, useRef } from 'react';
import { MenuView } from './MenuView';

export type LegalDocType = 'privacy' | 'terms' | null;
type ScaleType = 'small' | 'medium' | 'large';

interface MenuContainerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    fontScale: ScaleType;
    setFontScale: (scale: ScaleType) => void;
    onOpenTextSettings: () => void; // Добавляем пропс здесь
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
                                                                isOpen,
                                                                setIsOpen,
                                                                fontScale,
                                                                onOpenTextSettings // Принимаем его
                                                            }) => {
    const [showKnowledge, setShowKnowledge] = useState(false);
    const [activeDoc, setActiveDoc] = useState<LegalDocType>(null);

    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        setTimeout(() => {
            setShowKnowledge(false);
            setActiveDoc(null);
        }, 300);
    }, [setIsOpen]);

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = () => {
        if (touchEndX.current - touchStartX.current > 70 && touchEndX.current !== 0) {
            handleClose();
        }
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    const toggleKnowledge = useCallback(() => {
        setShowKnowledge(prev => !prev);
    }, []);

    const handleDocSelect = useCallback((doc: LegalDocType) => {
        setActiveDoc(doc);
    }, []);

    return (
        <MenuView
            isOpen={isOpen}
            onClose={handleClose}
            showKnowledge={showKnowledge}
            onToggleKnowledge={toggleKnowledge}
            activeDoc={activeDoc}
            onDocSelect={handleDocSelect}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            fontScale={fontScale}
            onOpenTextSettings={onOpenTextSettings} // Пробрасываем в MenuView
        />
    );
};