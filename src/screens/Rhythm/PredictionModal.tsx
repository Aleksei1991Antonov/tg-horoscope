import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Sparkles, Quote, MoonStar, Heart } from 'lucide-react';
import HeartFirework, { type HeartFireworkRef } from '../../components/effects/HeartFirework';
import { triggerSuccessHaptic } from '../../utils/haptics';

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
    const [isEffectRunning, setIsEffectRunning] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const fireworkRef = useRef<HeartFireworkRef>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, []);

    const titleSize = fontScale === 'large' ? 'text-3xl' : 'text-2xl';
    const predictionTextSize = fontScale === 'large' ? 'text-[1.25rem]' : 'text-[1rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';

    const iconPadding = fontScale === 'large' ? 'p-4' : 'p-3';
    const iconSize = fontScale === 'large' ? 32 : 24;

    const handleClose = useCallback((e?: React.MouseEvent) => {
        if (isEffectRunning) return;

        void triggerSuccessHaptic();

        if (cardRef.current && fireworkRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            fireworkRef.current.dissolve(rect);
            if (e) fireworkRef.current.explode(e.clientX, e.clientY);
        }

        setIsEffectRunning(true);
        onClose();

        timeoutRef.current = window.setTimeout(() => {
            setIsEffectRunning(false);
        }, 800);
    }, [isEffectRunning, onClose]);

    if (!isOpen && !isEffectRunning) return null;

    return (
        <>
            <HeartFirework ref={fireworkRef} />

            {isOpen && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-md"
                        onClick={() => handleClose()}
                    />

                    <div
                        ref={cardRef}
                        className="relative w-full max-w-sm bg-gradient-to-b from-white/[0.18] to-white/[0.08]
                                   backdrop-blur-2xl border border-[var(--c-border)] rounded-[40px] shadow-2xl
                                   flex flex-col max-h-[85vh] overflow-hidden"
                    >
                        <div className="flex-1 overflow-y-auto no-scrollbar p-8 pb-6">
                            {/* ИКОНКА: Раскрашена под цвет кнопки (fuchsia) с эффектом стекла */}
                            <div className="flex mb-8">
                                <div className={`shrink-0 ${iconPadding} bg-[var(--c-primary-20)] backdrop-blur-md rounded-2xl text-[var(--c-text)] shadow-inner border border-[var(--c-primary-30)]`}>
                                    <MoonStar size={iconSize} fill="white" className="drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <div className="flex items-center gap-2 opacity-50">
                                    <Sparkles size={12} className="text-[var(--c-primary)]" />
                                    <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-[var(--c-text)]`}>Личное послание</span>
                                </div>
                                <h2 className={`${titleSize} font-black text-[var(--c-text)] tracking-tight leading-tight`}>
                                    Для знака <span className="text-[var(--c-primary)]">{zodiacName}</span>
                                </h2>
                            </div>

                            <div className="relative w-full">
                                <Quote className="absolute -top-3 -left-3 text-[var(--c-text-5)] w-12 h-12" />
                                <p className={`${predictionTextSize} text-[var(--c-text-95)] font-medium leading-relaxed whitespace-pre-line relative z-10`}>
                                    {prediction}
                                </p>
                            </div>
                        </div>

                        <div className="p-8 pt-2 flex-shrink-0 bg-gradient-to-t from-black/[0.03] to-transparent">
                            <button
                                onClick={(e) => handleClose(e)}
                                                           className={`group relative w-full bg-[var(--c-primary)] text-[var(--c-bg)] rounded-[24px] font-bold uppercase tracking-[0.2em]
                                           active:scale-95 transition-all hover:brightness-110 shadow-lg
                                           ${fontScale === 'large' ? 'py-6 text-[0.875rem]' : 'py-5 text-[0.6875rem]'}`}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Благодарю <Heart size={14} fill="currentColor" className="animate-pulse" />
                                </span>
                            </button>
                            <p className="mt-5 w-full text-center text-[0.5625rem] font-bold text-[var(--c-text-20)] uppercase tracking-[0.4em] pb-2">
                                Твой путь освещен звёздами
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};