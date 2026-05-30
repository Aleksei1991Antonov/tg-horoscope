import React from 'react';
import { Wind, Droplets, Flame, Mountain, Orbit } from 'lucide-react';

interface CoreProfile {
    element: 'fire' | 'earth' | 'air' | 'water';
    elementLabel: string;
    elementDesc: string;
    zodiacName: string;
    rulingPlanet: string;
    rulingDesc: string;
    essence: string;
}

interface CoreViewProps {
    profile: CoreProfile;
    fontScale: 'small' | 'medium' | 'large';
}

export const CoreView: React.FC<CoreViewProps> = ({
                                                      profile,
                                                      fontScale,
                                                  }) => {
    const m = fontScale === 'large' ? 'text-[0.9375rem]' : 'text-[0.8125rem]';
    const s = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const h1 = fontScale === 'large' ? 'text-[2.75rem]' : fontScale === 'small' ? 'text-[3.25rem]' : 'text-[3.5rem]';

    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    const ElementIcon = {
        fire: Flame,
        earth: Mountain,
        air: Wind,
        water: Droplets
    }[profile.element];

    return (
        <div className={`w-full bg-[var(--c-bg)] text-[var(--c-text)] animate-in fade-in duration-700 ${bottomPadding}`}>
            <header className="pt-8 pb-12 px-6 text-center">
                <div className="inline-flex items-center justify-center gap-2 opacity-30 mb-4">
                    <div className="w-8 h-[1px] bg-[var(--c-text)]" />
                    <span className="text-[0.625rem] font-black uppercase tracking-[0.3em]">Energy Core</span>
                    <div className="w-8 h-[1px] bg-[var(--c-text)]" />
                </div>

                <h1 className={`${h1} font-black tracking-tighter leading-none mb-8`}>
                    {profile.zodiacName}
                </h1>

                <div className="flex justify-between items-start w-full max-w-xs mx-auto">
                    <div className="flex flex-col items-start">
                        <span className={`${s} font-black uppercase tracking-widest text-[var(--c-text-30)] mb-2`}>Стихия</span>
                        <div className="flex items-center gap-2">
                            <ElementIcon size={14} className="text-[var(--c-primary)]" strokeWidth={2.5} />
                            <span className={`${m} font-bold`}>{profile.elementLabel}</span>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-[var(--c-border)] self-center" />

                    <div className="flex flex-col items-end">
                        <span className={`${s} font-black uppercase tracking-widest text-[var(--c-text-30)] mb-2`}>Управитель</span>
                        <span className={`${m} font-bold`}>{profile.rulingPlanet}</span>
                    </div>
                </div>
            </header>

            <div className="px-4 space-y-4">
                <div className="bg-[var(--c-surface)] rounded-[32px] border border-[var(--c-border)] p-6">
                    <p className={`${m} text-[var(--c-text-70)] font-medium leading-[1.8] tracking-tight text-left`}>
                        {profile.essence}
                    </p>
                </div>

                <div className="bg-[var(--c-surface)] rounded-[32px] border border-[var(--c-border)] p-6">
                    <div className="flex items-start gap-4">
                        <ElementIcon size={24} className="text-[var(--c-primary)] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="space-y-1">
                            <div className="font-black text-[0.9375rem] tracking-tight">{profile.elementLabel}</div>
                            <p className={`${s} text-[var(--c-text-60)] font-medium leading-relaxed`}>
                                {profile.elementDesc}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--c-surface)] rounded-[32px] border border-[var(--c-border)] p-6">
                    <div className="flex items-start gap-4">
                        <Orbit size={24} className="text-[var(--c-primary)] shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div className="space-y-1">
                            <div className="font-black text-[0.9375rem] tracking-tight">{profile.rulingPlanet}</div>
                            <p className={`${s} text-[var(--c-text-60)] font-medium leading-relaxed`}>
                                {profile.rulingDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};