import React, { useState } from 'react';
import { Sparkles, Share2 } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface CoreProfile {
    element: 'fire' | 'earth' | 'air' | 'water';
    elementLabel: string;
    zodiacName: string;
    rulingPlanet: string;
    essence: string;
}

interface CoreViewProps {
    profile: CoreProfile;
    fontScale: 'small' | 'medium' | 'large';
    isPremium: boolean;
    onTogglePremium: () => void;
    userPhoto?: string;
    userName?: string;
}

export const CoreView: React.FC<CoreViewProps> = ({
    profile,
    fontScale,
    isPremium,
    onTogglePremium,
    userPhoto,
    userName,
}) => {
    const [shareDone, setShareDone] = useState(false);

    const handleShare = async () => {
        void triggerSuccessHaptic();
        const text = `${profile.zodiacName} — «${profile.essence}»`;
        try {
            await window.WebApp?.shareContent({ text, link: 'https://aleksei1991antonov.github.io/horoscope/' });
        } catch {
            try {
                await navigator.clipboard.writeText(text);
            } catch { /* ignore */ }
        }
        setShareDone(true);
        setTimeout(() => setShareDone(false), 2000);
    };

    const m = fontScale === 'large' ? 'text-[0.875rem]' : 'text-[0.75rem]';
    const s = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';

    return (
        <div className="w-full bg-[var(--c-bg)] text-[var(--c-text)] animate-in fade-in duration-1000 pb-16 px-1">
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-primary)] shrink-0" />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em] text-[var(--c-primary)]`}>Твоя энергия</span>
                </div>
            </header>

            <div className="flex flex-col gap-8">

                <div className="space-y-6 px-3 pt-4">
                    <div>
                        <div className="text-[var(--c-text)] text-[2rem] font-black tracking-tight leading-none">{profile.zodiacName}</div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div>
                            <div className={`${m} font-bold text-[var(--c-text)]`}>{profile.elementLabel}</div>
                            <div className={`${s} font-bold text-[var(--c-text-30)] uppercase tracking-wider mt-0.5`}>Стихия</div>
                        </div>
                        <div className="w-px h-8 bg-[var(--c-border)]" />
                        <div>
                            <div className={`${m} font-bold text-[var(--c-text)]`}>{profile.rulingPlanet}</div>
                            <div className={`${s} font-bold text-[var(--c-text-30)] uppercase tracking-wider mt-0.5`}>Управитель</div>
                        </div>
                        {userPhoto && (
                            <>
                                <div className="w-px h-8 bg-[var(--c-border)]" />
                                <div className="flex items-center gap-2">
                                    <img
                                        src={userPhoto}
                                        alt={userName || ''}
                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[var(--c-border)]"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="rounded-[32px] bg-[var(--c-surface)] backdrop-blur-3xl border border-[var(--c-border)] p-7 mx-1">
                    <p className={`${m} text-[var(--c-text-60)] font-medium leading-[1.7] tracking-tight`}>
                        {profile.essence}
                    </p>
                </div>

                <div className="mx-1">
                    <div className="bg-[var(--c-surface)] backdrop-blur-3xl rounded-[32px] border border-[var(--c-border)] p-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Sparkles size={16} className="text-[var(--c-primary)]" />
                                <div>
                                    <div className="font-bold text-sm">Премиум</div>
                                    <div className={`${s} text-[var(--c-text-30)] font-bold uppercase tracking-widest`}>Конфигурация</div>
                                </div>
                            </div>
                            <button
                                onClick={onTogglePremium}
                                className={`relative w-12 h-7 rounded-full transition-all p-0.5 ${
                                    isPremium ? 'bg-[var(--c-primary)]' : 'bg-[var(--c-border)]'
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                                    isPremium ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                            </button>
                        </div>
                        <p className={`${s} text-[var(--c-text-30)] font-medium leading-relaxed mt-4 px-1`}>
                            Полный доступ ко всем ритмам и глубокие расшифровки DNA
                        </p>
                    </div>
                </div>

                <div className="mx-1">
                    <button
                        onClick={handleShare}
                        className="w-full bg-[var(--c-surface)] backdrop-blur-3xl rounded-[32px] border border-[var(--c-border)] p-5 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                    >
                        <Share2 size={16} className="text-[var(--c-text-40)]" />
                        <span className={`${s} font-bold uppercase tracking-widest text-[var(--c-text-40)]`}>
                            {shareDone ? 'Скопировано' : 'Поделиться'}
                        </span>
                    </button>
                </div>

            </div>
        </div>
    );
};
