import React, { useState, useCallback } from 'react';
import { MenuView } from './MenuView';

// Экспортируем тип для использования в View
export type LegalDocType = 'privacy' | 'terms' | null;

interface MenuContainerProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export const MenuContainer: React.FC<MenuContainerProps> = ({ isOpen, setIsOpen }) => {
    const [showKnowledge, setShowKnowledge] = useState(false);
    const [activeDoc, setActiveDoc] = useState<LegalDocType>(null);

    const handleClose = useCallback(() => {
        setIsOpen(false);
        // Сброс состояний после завершения анимации закрытия
        setTimeout(() => {
            setShowKnowledge(false);
            setActiveDoc(null);
        }, 500);
    }, [setIsOpen]);

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
        />
    );
};