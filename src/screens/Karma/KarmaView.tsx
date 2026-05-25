import React from 'react';
import { Sparkles, UserPlus, ExternalLink, Zap } from 'lucide-react';

interface KarmaViewProps {
    userName: string;
    userPhotoUrl?: string;
    inviteCount: number;
    onInvite: () => void;
    referralUrl: string;
    fontScale: 'small' | 'medium' | 'large';
}

export const KarmaView: React.FC<KarmaViewProps> = ({
    userName,
    userPhotoUrl,
    inviteCount = 0,
    onInvite,
    referralUrl,
    fontScale,
}) => {
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';
    const btnTextSize = fontScale === 'large' ? 'text-[0.875rem]' : 'text-[0.75rem]';
    const devBadgeSize = fontScale === 'large' ? 'text-[0.625rem]' : 'text-[0.5rem]';

    const initial = userName?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className={`w-full text-[var(--c-text)] ${bottomPadding} px-1 animate-in fade-in duration-500`}>
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <Sparkles size={fontScale === 'large' ? 14 : 12} className="text-[var(--c-primary)]" />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em]`}>Карма</span>
                </div>
                <h1 className={`${fontScale === 'large' ? 'text-[2.4rem]' : fontScale === 'small' ? 'text-[2rem]' : 'text-[2.2rem]'} font-black tracking-normal text-[var(--c-text)] leading-tight`}>
                    Энергия
                </h1>
            </header>

            <div className="flex items-center justify-center mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--c-surface)] border border-[var(--c-border)]">
                    <Zap size={fontScale === 'large' ? 12 : 10} className="text-[var(--c-primary-60)]" />
                    <span className={`${devBadgeSize} font-black uppercase tracking-[0.15em] text-[var(--c-primary-50)]`}>
                        Функция в разработке
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--c-primary)] to-[var(--c-secondary)] p-[3px]">
                        <div className="w-full h-full rounded-full bg-[var(--c-bg)] overflow-hidden flex items-center justify-center">
                            {userPhotoUrl ? (
                                <img src={userPhotoUrl} alt={userName} className="w-full h-full object-cover" />
                            ) : (
                                <span className={`${fontScale === 'large' ? 'text-4xl' : 'text-3xl'} font-black text-[var(--c-text-60)]`}>{initial}</span>
                            )}
                        </div>
                    </div>
                </div>

                {userName && (
                    <span className={`${fontScale === 'large' ? 'text-[1.2rem]' : 'text-[1rem]'} font-black text-[var(--c-text-80)] tracking-tight`}>
                        {userName}
                    </span>
                )}

                <div className="text-center mt-4">
                    <div className="flex items-baseline justify-center gap-2">
                        <span className={`${fontScale === 'large' ? 'text-[3.5rem]' : 'text-[3rem]'} font-black italic text-[var(--c-text-20)] tracking-tight`}>
                            n
                        </span>
                        <span className={`${fontScale === 'large' ? 'text-[3rem]' : 'text-[2.5rem]'} font-black text-[var(--c-text-10)]`}>+</span>
                        <span className={`${fontScale === 'large' ? 'text-[3.5rem]' : 'text-[3rem]'} font-black text-[var(--c-primary)] tracking-tight`}>
                            {inviteCount}
                        </span>
                    </div>
                    <div className={`${labelSize} font-black uppercase tracking-[0.2em] text-[var(--c-text-20)] mt-2`}>
                        Вселенная + Приглашения
                    </div>
                </div>

                <button
                    onClick={onInvite}
                    className="mt-4 w-full max-w-xs flex items-center justify-center gap-3 py-4 px-8 rounded-[20px] bg-[var(--c-primary)] text-[var(--c-bg)] font-black uppercase tracking-[0.15em] active:scale-95 transition-all shadow-lg"
                >
                    <UserPlus size={fontScale === 'large' ? 20 : 16} />
                    <span className={btnTextSize}>Пригласить друга</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 opacity-30">
                    <ExternalLink size={fontScale === 'large' ? 10 : 8} className="text-[var(--c-text-40)]" />
                    <span className={`${devBadgeSize} font-bold text-[var(--c-text-40)] tracking-wide`}>{referralUrl}</span>
                </div>

                <div className={`mt-6 text-center max-w-xs ${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} text-[var(--c-text-20)] font-bold uppercase tracking-[0.1em] leading-relaxed`}>
                    Приглашай друзей — <br/>делиться энергией
                </div>
            </div>
        </div>
    );
};
