import React, { useState, useEffect, useRef } from 'react';
import { Sparkles,Quote, MoonStar } from 'lucide-react';

interface PredictionModalProps {
    isOpen: boolean;
    onClose: () => void;
    prediction: string;
    zodiacName: string;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({ isOpen, onClose, prediction, zodiacName }) => {
    const [isDissolving, setIsDissolving] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && cardRef.current && backdropRef.current) {
            // Прямая манипуляция DOM для обхода ограничений ESLint на setState
            // Даем браузеру один кадр, чтобы он отрисовал начальное состояние
            const frame = requestAnimationFrame(() => {
                if (cardRef.current) {
                    cardRef.current.style.transform = 'translateY(0)';
                    cardRef.current.style.opacity = '1';
                }
                if (backdropRef.current) {
                    backdropRef.current.style.backdropFilter = 'blur(24px)';
                    backdropRef.current.style.opacity = '1';
                }
            });
            return () => cancelAnimationFrame(frame);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsDissolving(true);
        setTimeout(() => {
            onClose();
            setIsDissolving(false);
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10 overflow-y-auto">

            {/* Backdrop */}
            <div
                ref={backdropRef}
                className={`
                    fixed inset-0 bg-[#050510]/80 transition-all duration-700 ease-out
                    opacity-0 backdrop-blur-none
                    ${isDissolving ? '!opacity-0 !backdrop-blur-none' : ''}
                `}
                onClick={handleClose}
            />

            {/* Карточка прогноза */}
            <div
                ref={cardRef}
                style={{ transform: 'translateY(100vh)', opacity: 0 }}
                className={`
                    relative w-full max-w-sm bg-gradient-to-b from-white/[0.08] to-white/[0.02]
                    border border-white/20 rounded-[40px] p-8 shadow-2xl
                    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isDissolving
                    ? 'scale-150 blur-3xl !opacity-0 rotate-2'
                    : ''
                }
                `}
            >

                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-fuchsia-500/20 rounded-full blur-2xl" />

                <div className="flex flex-col items-start text-left">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-indigo-600
                          flex items-center justify-center shadow-lg shadow-fuchsia-500/20 mb-6">
                        <MoonStar size={32} className="text-white" fill="white" />
                    </div>

                    <div className="space-y-1 mb-8">
                        <div className="flex items-center gap-2 opacity-40">
                            <Sparkles size={12} className="text-fuchsia-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Личное послание</span>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">
                            Для знака <span className="text-fuchsia-400">{zodiacName}</span>
                        </h2>
                    </div>

                    <div className="relative w-full">
                        <Quote className="absolute -top-4 -left-4 text-white/5 w-12 h-12" />
                        <p className="text-[15px] text-white/90 font-medium leading-relaxed whitespace-pre-line relative z-10">
                            {prediction}
                        </p>
                    </div>

                    <button
                        onClick={handleClose}
                        className="mt-10 w-full py-5 bg-white text-black rounded-[24px] font-bold
                       active:scale-95 transition-all shadow-xl shadow-white/10 uppercase tracking-widest text-xs"
                    >
                        Благодарю
                    </button>

                    <p className="mt-6 w-full text-center text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Твой путь освещен звездами
                    </p>
                </div>
            </div>
        </div>
    );
};