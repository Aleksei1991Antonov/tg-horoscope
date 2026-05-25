import React, { useCallback } from 'react';
import { triggerSuccessHaptic } from '../../../utils/haptics';

const ZODIAC_LIST = [
    { sign: "♈", name: "Овен" }, { sign: "♉", name: "Телец" },
    { sign: "♊", name: "Близнецы" }, { sign: "♋", name: "Рак" },
    { sign: "♌", name: "Лев" }, { sign: "♍", name: "Дева" },
    { sign: "♎", name: "Весы" }, { sign: "♏", name: "Скорпион" },
    { sign: "♐", name: "Стрелец" }, { sign: "♑", name: "Козерог" },
    { sign: "♒", name: "Водолей" }, { sign: "♓", name: "Рыбы" },
];

interface ZodiacModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (index: number) => void;
    currentIndex: number | null;
    isFirstLaunch?: boolean;
    fontScale: 'small' | 'medium' | 'large';
}

export const ZodiacModal: React.FC<ZodiacModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            onSelect,
                                                            currentIndex,
                                                            isFirstLaunch = false,
                                                            fontScale
                                                        }) => {

    // Используем triggerSuccessHaptic, так как это единственный рабочий метод вибрации
    const handleSelect = useCallback((idx: number) => {
        void triggerSuccessHaptic();
        onSelect(idx);
    }, [onSelect]);

    // Вибрация при закрытии (если это не первый запуск)
    const handleClose = useCallback(() => {
        if (!isFirstLaunch) {
            void triggerSuccessHaptic();
            onClose();
        }
    }, [isFirstLaunch, onClose]);

    if (!isOpen) return null;

    const titleSize = fontScale === 'large' ? 'text-3xl' : 'text-2xl';
    const labelSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]';
    const emojiSize = fontScale === 'large' ? 'text-4xl' : 'text-3xl';
    const gridGap = fontScale === 'large' ? 'gap-4' : 'gap-3';

    return (
        <div className="fixed inset-0 z-[5000] flex items-end justify-center px-4 pb-10">
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] rounded-[36px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">

                <div className="mb-8">
                    <div className="flex flex-col">
                        <span className={`${labelSize} font-bold uppercase tracking-[0.4em] text-[var(--c-primary)]`}>
                            {isFirstLaunch ? "ПЕРВЫЙ ШАГ" : "ВАШ ПРОФИЛЬ"}
                        </span>
                        <h3 className={`${titleSize} font-black text-[var(--c-text)] tracking-tighter uppercase leading-tight`}>ВЫБОР ЗНАКА</h3>
                    </div>
                </div>

                <div className={`grid grid-cols-3 ${gridGap}`}>
                    {ZODIAC_LIST.map((item, idx) => (
                        <button
                            key={item.name}
                            onClick={() => handleSelect(idx)}
                            className={`
                                flex flex-col items-center py-5 rounded-[24px] transition-all active:scale-95
                                ${idx === currentIndex
                                ? 'bg-[var(--c-primary-10)] shadow-inner'
                                : 'hover:bg-[var(--c-surface)]'}
                            `}
                        >
                            <span className={`${emojiSize} mb-2 transition-transform ${idx === currentIndex ? 'scale-110' : ''}`}>
                                {item.sign}
                            </span>
                            <span className={`${labelSize} font-bold uppercase tracking-tight text-center ${idx === currentIndex ? 'text-[var(--c-text)]' : 'text-[var(--c-text-40)]'}`}>
                                {item.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};