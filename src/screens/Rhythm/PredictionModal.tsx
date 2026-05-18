import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Quote, MoonStar, Heart } from 'lucide-react';
import HeartFirework, { type HeartFireworkRef } from '../../components/effects/HeartFirework';

interface PredictionModalProps {
    isOpen: boolean;
    onClose: () => void;
    prediction: string;
    zodiacName: string;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({ isOpen, onClose, prediction, zodiacName }) => {
    const [isClosing, setIsClosing] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const fireworkRef = useRef<HeartFireworkRef>(null);

    useEffect(() => {
        if (isOpen) {
            const frame = requestAnimationFrame(() => {
                if (cardRef.current) {
                    cardRef.current.style.transform = 'translateY(0) scale(1)';
                    cardRef.current.style.opacity = '1';
                }
            });
            return () => cancelAnimationFrame(frame);
        }
    }, [isOpen]);

    const handleClose = (e?: React.MouseEvent) => {
        if (cardRef.current && fireworkRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            fireworkRef.current.dissolve(rect);

            if (e) {
                fireworkRef.current.explode(e.clientX, e.clientY);
            }
        }

        setIsClosing(true);

        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 1100);
    };

    if (!isOpen) return null;

    return (
        <>
            <HeartFirework ref={fireworkRef} />

            <div className="fixed inset-0 z-[5000] flex items-center justify-center px-4 py-10 overflow-hidden">
                {/* ФОН: Сделал мягче (40% вместо 80%) и добавил CSS анимацию для плавного блюра */}
                <div
                    className={`
                        fixed inset-0 bg-[#050510]/40
                        transition-all duration-700 ease-out
                        animate-in fade-in duration-700
                        ${isClosing ? 'opacity-0 backdrop-blur-none' : 'opacity-100 backdrop-blur-[4px]'}
                    `}
                    onClick={() => !isClosing && handleClose()}
                />

                <div
                    ref={cardRef}
                    style={{
                        transform: 'translateY(100vh) scale(0.9)',
                        opacity: 0,
                        willChange: 'transform, opacity'
                    }}
                    className={`
                        relative w-full max-w-sm bg-gradient-to-b from-white/[0.15] to-white/[0.05]
                        backdrop-blur-3xl
                        border border-white/20 rounded-[40px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                        transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${isClosing
                        ? 'translate-y-[-80px] scale(0.95) blur-2xl !opacity-0 duration-[1000ms]'
                        : ''
                    }
                    `}
                >
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-fuchsia-500/30 rounded-full blur-3xl" />

                    <div className="flex flex-col items-start text-left relative z-10">
                        {/* ИКОНКА: Убрал border чтобы не было полосок */}
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-indigo-600
                              flex items-center justify-center shadow-lg shadow-fuchsia-500/30 mb-6">
                            <MoonStar size={32} className="text-white" fill="white" />
                        </div>

                        <div className="space-y-1 mb-8">
                            <div className="flex items-center gap-2 opacity-50">
                                <Sparkles size={12} className="text-fuchsia-300" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Личное послание</span>
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight">
                                Для знака <span className="text-fuchsia-400">{zodiacName}</span>
                            </h2>
                        </div>

                        <div className="relative w-full mb-4">
                            <Quote className="absolute -top-4 -left-4 text-white/5 w-12 h-12" />
                            <p className="text-[16px] text-white/95 font-medium leading-relaxed whitespace-pre-line relative z-10">
                                {prediction}
                            </p>
                        </div>

                        {/* КНОПКА: Убрал border чтобы не было полосок */}
                        <button
                            onClick={(e) => handleClose(e)}
                            disabled={isClosing}
                            className="group relative mt-10 w-full py-5 bg-gradient-to-r from-fuchsia-500 to-indigo-600
                                       text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-[11px]
                                       shadow-[0_10px_40px_rgba(192,38,211,0.4)]
                                       active:scale-95 transition-all
                                       hover:brightness-110 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Благодарю <Heart size={14} fill="white" className="animate-pulse" />
                            </span>

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        </button>

                        <p className="mt-6 w-full text-center text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
                            Твой путь освещен звездами
                        </p>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}} />
        </>
    );
};