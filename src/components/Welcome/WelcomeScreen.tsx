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
            case 'large': return 'text-[clamp(3.2rem,20vw,5.5rem)]';
            default: return 'text-[clamp(2.5rem,15vw,4.5rem)]';
        }
    }, [fontScale]);

    const scales = [
        { id: 'small', label: 'А' },
        { id: 'medium', label: 'А' },
        { id: 'large', label: 'А' }
    ] as const;

    return (
        <div className="relative min-h-screen w-full bg-[#050510] flex flex-col items-center p-[1.5rem] overflow-y-auto overflow-x-hidden font-manrope z-[3000]">

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-fuchsia-600/10 blur-[7.5rem] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-indigo-600/10 blur-[7.5rem] rounded-full" />

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

            {/* Center Content */}
            <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center py-[2rem]">
                <h1 className={`${titleSize} font-black text-white uppercase tracking-tighter mb-[0.75rem] leading-none px-2 transition-all duration-300`}>
                    Гороскоп
                </h1>

                <div className="flex flex-wrap justify-center gap-[0.5rem] mb-[1.5rem]">
                    {['Ритмы', 'Любовь', 'Красота'].map((tag, i) => (
                        <span key={i} className="text-[0.65rem] font-black uppercase tracking-widest text-fuchsia-400 bg-fuchsia-400/10 px-[0.75rem] py-[0.25rem] rounded-full border border-fuchsia-400/20">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className={`text-white/40 leading-relaxed max-w-[18rem] font-medium px-4 transition-all duration-300 ${
                    fontScale === 'large' ? 'text-[1.1rem]' : fontScale === 'small' ? 'text-[0.85rem]' : 'text-[0.95rem]'
                }`}>
                    Ваша персональная карта звездных ритмов для гармонии в жизни и чувствах.
                </p>
            </div>

            {/* Bottom Card */}
            <div className="relative z-10 w-full max-w-[24rem] mt-auto space-y-[1.5rem] pb-[1rem]">
                <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-[1.5rem] backdrop-blur-2xl">

                    {/* Scale Selector */}
                    <div className="space-y-3 mb-[1.5rem]">
                        <div className="flex justify-between items-center px-2">
                            <span className="text-[0.625rem] font-bold uppercase tracking-widest text-white/20">Текст</span>
                            <span className="text-[0.625rem] font-black text-fuchsia-500 uppercase">
                                {fontScale === 'small' ? 'Компакт' : fontScale === 'medium' ? 'Стандарт' : 'Крупный'}
                            </span>
                        </div>

                        <div className="bg-black/40 p-1 rounded-2xl flex items-center relative border border-white/5">
                            {scales.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => handleScaleChange(s.id)}
                                    className="relative z-10 flex-1 py-2.5 flex flex-col items-center justify-center"
                                >
                                    <span className={`
                                        font-black transition-none
                                        ${s.id === 'small' ? 'text-xs' : s.id === 'medium' ? 'text-base' : 'text-xl'}
                                        ${fontScale === s.id ? 'text-white' : 'text-white/20'}
                                    `}>
                                        {s.label}
                                    </span>
                                </button>
                            ))}

                            {/* Sliding Background Indicator */}
                            <div
                                className="absolute top-1 bottom-1 transition-all duration-300 ease-out bg-white/10 rounded-xl border border-white/10"
                                style={{
                                    width: 'calc(33.33% - 4px)',
                                    left: fontScale === 'small' ? '4px' : fontScale === 'medium' ? '33.33%' : 'calc(66.66% - 4px)'
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAccept}
                        className="w-full py-[1.25rem] rounded-[1.5rem] flex items-center justify-center gap-[0.75rem] font-black uppercase tracking-[0.2em] italic text-[0.875rem] bg-white text-black active:scale-95 mb-[1.25rem] shadow-xl"
                    >
                        <span>Начать путь</span>
                        <ChevronRight size="1.1rem" className="animate-bounce-x" />
                    </button>

                    <div className="text-[0.7rem] leading-[1.4] text-white/30 font-medium text-center px-[0.5rem]">
                        Нажимая кнопку, вы принимаете условия{' '}
                        <button onClick={onOpenTerms} className="text-white/60 font-bold underline decoration-fuchsia-500/30 active:text-fuchsia-400 transition-colors">
                            Пользовательского соглашения
                        </button>
                        {' '}и{' '}
                        <button onClick={onOpenPrivacy} className="text-white/60 font-bold underline decoration-fuchsia-500/30 active:text-fuchsia-400 transition-colors">
                            Политики конфиденциальности
                        </button>.
                    </div>
                </div>

                <div className="text-center flex flex-col items-center gap-[0.5rem]">
                    <div className="h-[1px] w-[3rem] bg-white/10" />
                    <span className="text-[0.55rem] font-black text-white/20 uppercase tracking-[0.5em]">
                        ИП Антонов Алексей Олегович
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