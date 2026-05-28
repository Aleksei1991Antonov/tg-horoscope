import React, { useCallback } from 'react';
import { Sparkles, Quote } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

const ZODIAC_SIGNS: Record<string, string> = {
    'Овен': '♈', 'Телец': '♉', 'Близнецы': '♊', 'Рак': '♋',
    'Лев': '♌', 'Дева': '♍', 'Весы': '♎', 'Скорпион': '♏',
    'Стрелец': '♐', 'Козерог': '♑', 'Водолей': '♒', 'Рыбы': '♓'
};

interface PredictionModalProps {
    isOpen: boolean;
    onClose: () => void;
    prediction: string;
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
}

export const PredictionModal: React.FC<PredictionModalProps> = ({
    isOpen,
    onClose,
    prediction,
    zodiacName,
    fontScale
}) => {
    const predictionTextSize = fontScale === 'large' ? 'text-[1.25rem]' : 'text-[1rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';

    const emojiSize = fontScale === 'large' ? 'text-5xl' : 'text-4xl';

    const handleClose = useCallback(() => {
        void triggerSuccessHaptic();
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-md"
                onClick={handleClose}
            />

            <div className="relative w-full max-w-sm bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[40px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
                <div className="flex-1 overflow-y-auto no-scrollbar p-8 pb-6">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-2 opacity-50 mt-2">
                            <Sparkles size={12} className="text-[var(--c-primary)]" />
                            <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-[var(--c-text)]`}>Личное послание</span>
                        </div>
                        <span className={emojiSize}>{ZODIAC_SIGNS[zodiacName] || '✦'}</span>
                    </div>

                    <div className="relative w-full">
                        <Quote className="absolute -top-3 -left-3 text-[var(--c-text-5)] w-12 h-12" />
                        <p className={`${predictionTextSize} text-[var(--c-text-95)] font-medium leading-relaxed whitespace-pre-line relative z-10`}>
                            {prediction}
                        </p>
                    </div>
                </div>

                <div className="p-8 pt-2 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        className={`w-full bg-accent-cta text-white rounded-[24px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg ${
                            fontScale === 'large' ? 'py-6 text-[0.875rem]' : 'py-5 text-[0.6875rem]'
                        }`}
                    >
                        Готово
                    </button>
                </div>
            </div>
        </div>
    );
};
