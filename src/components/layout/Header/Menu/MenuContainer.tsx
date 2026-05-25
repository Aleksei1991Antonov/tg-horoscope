import React, { useCallback, useRef } from 'react';
import { MenuView } from './MenuView';

type ScaleType = 'small' | 'medium' | 'large';

interface MenuContainerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    fontScale: ScaleType;
    setFontScale: (scale: ScaleType) => void;
    onOpenTextSettings: () => void;
    onOpenKnowledge: () => void;
    onOpenLegalDoc: (doc: 'privacy' | 'terms') => void;
}

export const MenuContainer: React.FC<MenuContainerProps> = ({
                                                                isOpen,
                                                                setIsOpen,
                                                                fontScale,
                                                                onOpenTextSettings,
                                                                onOpenKnowledge,
                                                                onOpenLegalDoc
                                                            }) => {
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const handleClose = useCallback(() => {
        setIsOpen(false);
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

    return (
        <MenuView
            isOpen={isOpen}
            onClose={handleClose}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            fontScale={fontScale}
            onOpenTextSettings={onOpenTextSettings}
            onOpenKnowledge={onOpenKnowledge}
            onOpenLegalDoc={onOpenLegalDoc}
        />
    );
};
