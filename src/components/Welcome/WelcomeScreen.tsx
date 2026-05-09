import React, { useState } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
    onAccept: () => void;
    onOpenPrivacy: () => void;
    onOpenTerms: () => void;
}

// Константы конфигурации
const LOGO_PATH = "logo.webp?v=1";

// Статичные звезды для чистоты рендера
const STATIC_STARS = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${(i * 7) % 100}%`,
    left: `${(i * 13) % 100}%`,
    size: `${(i % 3) + 1}px`,
    opacity: 0.3 + (i % 7) * 0.1,
    duration: `${2 + (i % 4)}s`
}));

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAccept, onOpenPrivacy, onOpenTerms }) => {
    const [isAgreed, setIsAgreed] = useState(false);

    return (
        <div className="fixed inset-0 z-[3000] bg-[#050510] flex flex-col items-center justify-between p-8 overflow-hidden font-manrope">
            {/* Анимированный фон */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-fuchsia-600/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Декоративные звезды */}
                {STATIC_STARS.map((star) => (
                    <div
                        key={star.id}
                        className="absolute bg-white rounded-full animate-twinkle"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            opacity: star.opacity,
                            animationDuration: star.duration
                        }}
                    />
                ))}
            </div>

            {/* Контентная часть */}
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 w-full">
                <div className="mb-8 relative">
                    {/* Логотип увеличенного размера с фирменным скруглением */}
                    <div className="relative group">
                        <img
                            src={LOGO_PATH}
                            alt="Logo"
                            className="w-32 h-32 object-cover rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(192,38,211,0.2)] transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                                const target = e.currentTarget;
                                if (!target.src.includes('./' + LOGO_PATH)) {
                                    target.src = './' + LOGO_PATH;
                                }
                            }}
                        />
                        {/* Легкий блик поверх логотипа для премиальности */}
                        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </div>
                </div>

                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">
                    Гороскоп
                </h1>

                <div className="flex gap-2 mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-fuchsia-400 bg-fuchsia-400/10 px-3 py-1 rounded-full border border-fuchsia-400/20">Ритмы</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 bg-rose-400/10 px-3 py-1 rounded-full border border-rose-400/20">Любовь</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">Красота</span>
                </div>

                <p className="text-white/40 text-sm leading-relaxed max-w-[280px] font-medium">
                    Ваша персональная карта звездных ритмов, созданная для гармонии в жизни и чувствах.
                </p>
            </div>

            {/* Нижний блок */}
            <div className="w-full max-w-sm relative z-10 space-y-6">
                <div className="bg-white/[0.03] border border-white/10 rounded-[40px] p-7 backdrop-blur-2xl shadow-2xl">
                    <div className="flex items-start gap-4 mb-8 text-left group cursor-pointer" onClick={() => setIsAgreed(!isAgreed)}>
                        <div
                            className={`mt-1 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-300 shrink-0 ${
                                isAgreed
                                    ? 'bg-fuchsia-600 border-fuchsia-600 shadow-[0_0_20px_rgba(192,38,211,0.6)]'
                                    : 'border-white/20 bg-white/5 group-hover:border-white/40'
                            }`}
                        >
                            {isAgreed && <ShieldCheck size={14} className="text-white animate-in zoom-in duration-300" />}
                        </div>
                        <div className="text-[11px] leading-relaxed text-white/30 font-medium">
                            Я принимаю условия{' '}
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenTerms(); }}
                                className="text-white/60 font-bold hover:text-fuchsia-400 transition-colors underline decoration-fuchsia-500/30"
                            >
                                Пользовательского соглашения
                            </button>
                            {' '}и даю согласие на обработку данных согласно{' '}
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenPrivacy(); }}
                                className="text-white/60 font-bold hover:text-fuchsia-400 transition-colors underline decoration-fuchsia-500/30"
                            >
                                Политике конфиденциальности
                            </button>.
                        </div>
                    </div>

                    <button
                        disabled={!isAgreed}
                        onClick={onAccept}
                        className={`w-full py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all duration-500 font-black uppercase tracking-[0.2em] italic text-sm ${
                            isAgreed
                                ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 hover:bg-fuchsia-50'
                                : 'bg-white/5 text-white/10 cursor-not-allowed'
                        }`}
                    >
                        <span>Начать путь</span>
                        <ChevronRight size={18} className={isAgreed ? 'animate-bounce-x' : ''} />
                    </button>
                </div>

                <div className="text-center flex flex-col items-center gap-2">
                    <div className="h-[1px] w-12 bg-white/10" />
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
                        ИП Антонов Алексей Олегович
                    </span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.2); }
                }
                .animate-twinkle {
                    animation: twinkle linear infinite;
                }
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(4px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 1s infinite;
                }
            `}} />
        </div>
    );
};