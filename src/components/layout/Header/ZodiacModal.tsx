import React, { useCallback } from 'react';
import { X } from 'lucide-react';
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
    const buttonPadding = fontScale === 'large' ? 'p-6' : 'p-5';

    return (
        <div className="fixed inset-0 z-[5000] flex items-end justify-center px-4 pb-10">
            <div
                className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-xl animate-in fade-in duration-300"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] border border-[var(--c-border)] rounded-[32px] p-6 animate-in slide-in-from-bottom-10 duration-300 max-h-[90vh] overflow-y-auto custom-scrollbar">

                <div className="flex justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <span className={`${labelSize} font-bold uppercase tracking-[0.4em] text-[var(--c-primary)]`}>
                            {isFirstLaunch ? "ПЕРВЫЙ ШАГ" : "ВАШ ПРОФИЛЬ"}
                        </span>
                        <h3 className={`${titleSize} font-black text-[var(--c-text)] tracking-tighter uppercase leading-tight`}>ВЫБОР ЗНАКА</h3>
                    </div>
                    {!isFirstLaunch && (
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-50)] active:scale-90 transition-all"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className={`grid grid-cols-3 ${gridGap}`}>
                    {ZODIAC_LIST.map((item, idx) => (
                        <button
                            key={item.name}
                            onClick={() => handleSelect(idx)}
                            className={`
                                flex flex-col items-center ${buttonPadding} rounded-[24px] border transition-all active:scale-95
                                ${idx === currentIndex
                                ? 'bg-[var(--c-primary-20)] border-[var(--c-primary-50)]'
                                : 'bg-[var(--c-surface)] border-[var(--c-border)] hover:border-[var(--c-border)]'}
                            `}
                        >
                            <span className={`${emojiSize} mb-2 drop-shadow-md transition-transform ${idx === currentIndex ? 'scale-110' : 'grayscale-[0.5]'}`}>
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