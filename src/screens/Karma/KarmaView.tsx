import React from 'react';
import { Sparkles, UserPlus } from 'lucide-react';

interface KarmaViewProps {
    userName: string;
    userPhotoUrl?: string;
    inviteCount: number;
    onInvite: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

export const KarmaView: React.FC<KarmaViewProps> = ({
    userName,
    userPhotoUrl,
    inviteCount = 0,
    onInvite,
    fontScale,
}) => {
    const headerSize = fontScale === 'large' ? 'text-[2.4rem]' : fontScale === 'small' ? 'text-[2rem]' : 'text-[2.2rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';
    const btnTextSize = fontScale === 'large' ? 'text-[0.875rem]' : 'text-[0.75rem]';

    const initial = userName.charAt(0).toUpperCase();

    return (
        <div className={`w-full text-white ${bottomPadding} px-1 animate-in fade-in duration-500`}>
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <Sparkles size={fontScale === 'large' ? 14 : 12} className="text-purple-400" />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em]`}>Карма</span>
                </div>
                <h1 className={`${headerSize} font-black tracking-normal text-white leading-tight`}>
                    Энергия
                </h1>
            </header>

            <div className="flex flex-col items-center justify-center mt-10 gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 p-[3px] shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                        <div className="w-full h-full rounded-full bg-[#0a0a1a] overflow-hidden flex items-center justify-center">
                            {userPhotoUrl ? (
                                <img src={userPhotoUrl} alt={userName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-black text-white/60">{initial}</span>
                            )}
                        </div>
                    </div>
                </div>

                <span className={`${fontScale === 'large' ? 'text-[1.2rem]' : 'text-[1rem]'} font-black text-white/80 tracking-tight`}>
                    {userName}
                </span>

                <div className="text-center mt-4">
                    <div className="flex items-baseline justify-center gap-2">
                        <span className={`${fontScale === 'large' ? 'text-[3.5rem]' : 'text-[3rem]'} font-black italic text-white/20 tracking-tight`}>
                            n
                        </span>
                        <span className={`${fontScale === 'large' ? 'text-[3rem]' : 'text-[2.5rem]'} font-black text-white/10`}>+</span>
                        <span className={`${fontScale === 'large' ? 'text-[3.5rem]' : 'text-[3rem]'} font-black text-purple-400 tracking-tight drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]`}>
                            {inviteCount}
                        </span>
                    </div>
                    <div className={`${labelSize} font-black uppercase tracking-[0.2em] text-white/20 mt-2`}>
                        Вселенная + Приглашения
                    </div>
                </div>

                <button
                    onClick={onInvite}
                    className="mt-6 w-full max-w-xs flex items-center justify-center gap-3 py-4 px-8 rounded-[20px] bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black uppercase tracking-[0.15em] active:scale-95 transition-all shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                >
                    <UserPlus size={fontScale === 'large' ? 20 : 16} />
                    <span className={btnTextSize}>Пригласить друга</span>
                </button>

                <div className={`mt-8 text-center max-w-xs ${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} text-white/20 font-bold uppercase tracking-[0.1em] leading-relaxed`}>
                    Приглашай друзей — <br/>делиться энергией
                </div>
            </div>
        </div>
    );
};
