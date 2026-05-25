import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Crown, Heart, Zap, Sparkles } from 'lucide-react';
import HeartFirework, { type HeartFireworkRef } from '../../components/effects/HeartFirework';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface PowerHourModalProps {
    isOpen: boolean;
    onClose: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

export const PowerHourModal: React.FC<PowerHourModalProps> = ({
                                                                  isOpen,
                                                                  onClose,
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
    const bodyTextSize = fontScale === 'large' ? 'text-[1.1875rem]' : 'text-[1rem]';
    const smallTextSize = fontScale === 'large' ? 'text-[1.0625rem]' : 'text-[0.875rem]';
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
                    <div className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-md" onClick={() => handleClose()} />
                    <div
                        ref={cardRef}
                        className="relative w-full max-w-sm bg-gradient-to-b from-white/[0.15] to-white/[0.05] backdrop-blur-2xl border border-[var(--c-border)] rounded-[40px] flex flex-col max-h-[90vh] shadow-2xl overflow-hidden"
                    >
                        <div className="flex-1 overflow-y-auto no-scrollbar p-8 pt-10">
                            <div className="flex mb-8">
                                {/* ИКОНКА: Янтарное стекло, корона БЕЛАЯ контурная */}
                                <div className={`shrink-0 ${iconPadding} bg-[var(--c-primary-20)] backdrop-blur-md rounded-2xl text-[var(--c-text)] shadow-inner border border-[var(--c-primary-30)]`}>
                                    <Crown size={iconSize} strokeWidth={2.2} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                                </div>
                            </div>

                            <div className="space-y-2 mb-6 text-left">
                                <div className="flex items-center gap-2 opacity-60">
                                    <Sparkles size={14} className="text-[var(--c-primary)]" />
                                    <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-[var(--c-text)]`}>Твой потенциал</span>
                                </div>
                                <h2 className={`${titleSize} font-black text-[var(--c-text)] tracking-tight leading-tight uppercase italic`}>
                                    Что такое <span className="text-[var(--c-primary)]">Час силы?</span>
                                </h2>
                            </div>

                            <div className="space-y-6 relative z-10 text-left">
                                <p className={`${bodyTextSize} text-[var(--c-text-95)] font-medium leading-relaxed`}>
                                    Это время твоей <span className="text-[var(--c-primary)] font-bold italic">максимальной проявленности</span>. Момент, когда твоя планета-управитель входит в резонанс с текущим часом.
                                </p>

                                <div className="space-y-5 pt-6 border-t border-[var(--c-border)]">
                                    <div className="flex items-center gap-2">
                                        <Zap size={14} className="text-[var(--c-primary)]" fill="currentColor" />
                                        <span className={`${labelSize} font-black uppercase tracking-widest text-[var(--c-text-40)]`}>Как мы считаем?</span>
                                    </div>

                                    <div className="space-y-5">
                                        {[
                                            {
                                                h: 'Планетарный цикл',
                                                t: 'Мы вычисляем часы по Халдейскому ряду, когда твоя главная планета доминирует в небе.',
                                                c: 'bg-[var(--c-primary)]'
                                            },
                                            {
                                                h: 'Лунный фильтр',
                                                t: 'Корректируем процент удачи в зависимости от фазы Луны и её положения в твоей стихии.',
                                                c: 'bg-[var(--c-secondary)]'
                                            }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className={`mt-2.5 w-1.5 h-1.5 rounded-full ${item.c} flex-shrink-0 shadow-[0_0_8px_currentColor]`} />
                                                <div className="flex flex-col gap-1">
                                                    <span className={`${fontScale === 'large' ? 'text-lg' : 'text-[1rem]'} font-black text-[var(--c-text)]`}>{item.h}</span>
                                                    <p className={`${smallTextSize} text-[var(--c-text-60)] leading-snug font-medium`}>{item.t}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className={`${smallTextSize} text-[var(--c-primary-60)] italic leading-relaxed pt-2`}>
                                    В Час Силы твои намерения получают мощную поддержку планет. Это лучшее время для важных решений.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 pt-2 flex-shrink-0 bg-gradient-to-t from-black/[0.03] to-transparent">
                            <button
                                onClick={(e) => handleClose(e)}
                                className={`w-full bg-[var(--c-primary)] text-[var(--c-bg)] rounded-[24px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg ${fontScale === 'large' ? 'py-6 text-[0.875rem]' : 'py-5 text-[0.6875rem]'}`}
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Принимаю силу <Heart size={16} fill="currentColor" className="animate-pulse" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};