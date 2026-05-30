import React, { memo, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface WelcomeScreenProps {
    onAccept: () => void;
    onOpenPrivacy: () => void;
    onOpenTerms: () => void;
    fontScale: 'small' | 'medium' | 'large';
    setFontScale: (scale: 'small' | 'medium' | 'large') => void;
}

const STATIC_STARS = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    top: `${(i * 7) % 100}%`,
    left: `${(i * 13) % 100}%`,
    size: `${(i % 3) + 1}px`,
    opacity: 0.3 + (i % 7) * 0.1,
    duration: `${2 + (i % 4)}s`
}));

export const WelcomeScreen: React.FC<WelcomeScreenProps> = memo(({
                                                                      onAccept,
                                                                      onOpenPrivacy,
                                                                      onOpenTerms,
                                                                      fontScale,
                                                                      setFontScale
                                                                  }) => {

    const handleScaleChange = (newScale: 'small' | 'medium' | 'large') => {
        if (newScale === fontScale) return;
        void triggerSuccessHaptic();
        setFontScale(newScale);
    };

    const handleAccept = () => {
        void triggerSuccessHaptic();
        onAccept();
    };

    // Динамический размер заголовка в зависимости от масштаба
    const titleSize = useMemo(() => {
        switch (fontScale) {
            case 'small': return 'text-[clamp(2.2rem,13vw,3.8rem)]';
            case 'large': return 'text-[clamp(2.5rem,14vw,4.5rem)]';
            default: return 'text-[clamp(2.5rem,15vw,4.5rem)]';
        }
    }, [fontScale]);

    const scales = [
        { id: 'small', label: 'А' },
        { id: 'medium', label: 'А' },
        { id: 'large', label: 'А' }
    ] as const;

    return (
        <div className="relative min-h-screen w-full bg-[var(--c-bg)] flex flex-col items-center p-[1.5rem] overflow-y-auto overflow-x-hidden font-manrope z-[3000]">

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-[var(--c-primary-10)] blur-[7.5rem] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-[var(--c-secondary-10)] blur-[7.5rem] rounded-full" />

                {STATIC_STARS.map((star) => (
                    <div
                        key={star.id}
                        className="absolute bg-[var(--c-text)] rounded-full animate-twinkle"
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

            {/* Center Content */}
            <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center py-[2rem]">
                <h1 className={`${titleSize} font-black text-[var(--c-text)] uppercase tracking-tighter mb-[0.75rem] leading-none px-2 transition-all duration-300`}>
                    Гороскоп
                </h1>

                <div className="flex flex-wrap justify-center gap-[0.5rem] mb-[1.5rem]">
                    {['Ритмы', 'Любовь', 'Красота'].map((tag, i) => (
                        <span key={i} className="text-[0.65rem] font-black uppercase tracking-widest text-[var(--c-primary)] bg-[var(--c-primary-10)] px-[0.75rem] py-[0.25rem] rounded-full border border-[var(--c-primary-20)]">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className={`text-[var(--c-text-40)] leading-relaxed max-w-[18rem] font-medium px-4 transition-all duration-300 ${
                    fontScale === 'large' ? 'text-[1.1rem]' : fontScale === 'small' ? 'text-[0.85rem]' : 'text-[0.95rem]'
                }`}>
                    Ваша персональная карта звёздных ритмов для гармонии в жизни и чувствах.
                </p>
            </div>

            {/* Bottom Card */}
            <div className="relative z-10 w-full max-w-[24rem] mt-auto space-y-[1.5rem] pb-[1rem]">
                <div className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-[2.5rem] p-[1.5rem] backdrop-blur-2xl card-shadow">

                    {/* Scale Selector */}
                    <div className="space-y-3 mb-[1.5rem]">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-[0.625rem] font-bold uppercase tracking-widest text-[var(--c-text-20)]">Текст</span>
                            <span className="text-[0.625rem] font-black text-[var(--c-primary)] uppercase">
                                {fontScale === 'small' ? 'Компакт' : fontScale === 'medium' ? 'Стандарт' : 'Крупный'}
                            </span>
                        </div>

                        <div className="bg-[var(--c-surface-raise)] p-1 rounded-2xl flex items-center relative border border-[var(--c-border)]">
                            {scales.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => handleScaleChange(s.id)}
                                    className="relative z-10 flex-1 py-2.5 flex flex-col items-center justify-center"
                                >
                                    <span className={`
                                        font-black transition-none
                                        ${s.id === 'small' ? 'text-xs' : s.id === 'medium' ? 'text-base' : 'text-xl'}
                                        ${fontScale === s.id ? 'text-[var(--c-text)]' : 'text-[var(--c-text-20)]'}
                                    `}>
                                        {s.label}
                                    </span>
                                </button>
                            ))}

                            {/* Sliding Background Indicator */}
                            <div
                                className="absolute top-1 bottom-1 transition-all duration-300 ease-out bg-[var(--c-surface-elevated)] rounded-xl border border-[var(--c-border)]"
                                style={{
                                    width: 'calc(33.33% - 4px)',
                                    left: fontScale === 'small' ? '4px' : fontScale === 'medium' ? '33.33%' : 'calc(66.66% - 4px)'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAccept}
                        className="w-full py-[1.25rem] rounded-[1.5rem] flex items-center justify-center gap-[0.75rem] font-black uppercase tracking-[0.2em] italic text-[0.875rem] text-white bg-accent-cta active:scale-95 mb-[1.25rem] shadow-blue-500/10"
                    >
                        <span>Начать путь</span>
                        <ChevronRight size="1.1rem" className="animate-bounce-x" />
                    </button>

                    <div className="text-[0.7rem] leading-[1.4] text-[var(--c-text-30)] font-medium text-center px-[0.5rem]">
                        Нажимая кнопку, вы принимаете условия{' '}
                        <button onClick={onOpenTerms} className="text-[var(--c-text-60)] font-bold underline decoration-[var(--c-primary-30)] active:text-[var(--c-primary)] transition-colors">
                            Пользовательского соглашения
                        </button>
                        {' '}и{' '}
                        <button onClick={onOpenPrivacy} className="text-[var(--c-text-60)] font-bold underline decoration-[var(--c-primary-30)] active:text-[var(--c-primary)] transition-colors">
                            Политики конфиденциальности
                        </button>.
                    </div>
                </div>

                <div className="text-center flex flex-col items-center gap-[0.5rem]">
                    <div className="h-[1px] w-[3rem] bg-[var(--c-surface-elevated)]" />
                    <span className="text-[0.55rem] font-black text-[var(--c-text-20)] uppercase tracking-[0.6em]">
                        © ANTONOVKA
                    </span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
                .animate-twinkle { animation: twinkle linear infinite; }
                @keyframes bounce-x { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(0.25rem); } }
                .animate-bounce-x { animation: bounce-x 1s infinite; }
            `}} />
        </div>
    );
});