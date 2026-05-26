import React from 'react';
import type { CoreProfile } from '../../core/engines/CoreEngine';
import { Shield, Zap, Eye, Moon, Flame, Compass, Sparkles } from 'lucide-react';

const PLANET_ICONS: Record<string, string> = {
    "Марс": "♂",
    "Венера": "♀",
    "Меркурий": "☿",
    "Юпитер": "♃",
    "Сатурн": "♄",
    "Солнце": "☉",
    "Луна": "☽",
};

const ELEMENT_ICONS: Record<string, string> = {
    fire: "▲",
    earth: "■",
    air: "◆",
    water: "▼",
};

const RUNES = [
    { id: 'guard', label: 'Щит', icon: Shield },
    { id: 'energy', label: 'Импульс', icon: Zap },
    { id: 'insight', label: 'Ясность', icon: Eye },
    { id: 'intuition', label: 'Интуиция', icon: Moon },
    { id: 'passion', label: 'Страсть', icon: Flame },
    { id: 'direction', label: 'Направление', icon: Compass },
];

interface CoreViewProps {
    userName: string;
    userPhotoUrl?: string;
    profile: CoreProfile;
    fontScale: 'small' | 'medium' | 'large';
    isPremium: boolean;
    onTogglePremium: () => void;
}

export const CoreView: React.FC<CoreViewProps> = ({
    userName,
    userPhotoUrl,
    profile,
    fontScale,
    isPremium,
    onTogglePremium,
}) => {
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';
    const devBadgeSize = fontScale === 'large' ? 'text-[0.625rem]' : 'text-[0.5rem]';
    const runeSize = fontScale === 'large' ? 22 : 18;

    const initial = userName?.charAt(0)?.toUpperCase() || '?';

    return (
        <div className={`w-full text-[var(--c-text)] ${bottomPadding} px-1 animate-in fade-in duration-500`}>
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <Sparkles size={fontScale === 'large' ? 14 : 12} className="text-[var(--c-primary)]" />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em]`}>Core</span>
                </div>
                <h1 className={`${fontScale === 'large' ? 'text-[2.4rem]' : fontScale === 'small' ? 'text-[2rem]' : 'text-[2.2rem]'} font-black tracking-normal text-[var(--c-text)] leading-tight`}>
                    Твоя энергия
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

                <div className="w-full max-w-sm">
                    <div className="rounded-3xl bg-[var(--c-surface)] border border-[var(--c-border)] overflow-hidden">
                        <div className="p-5 flex items-center gap-4 border-b border-[var(--c-border)]">
                            <div className="w-14 h-14 rounded-full bg-[var(--c-primary-10)] flex items-center justify-center text-[1.75rem]">
                                {ELEMENT_ICONS[profile.element]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className={`${fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]'} font-black text-[var(--c-text)]`}>
                                    {profile.zodiacName}
                                </div>
                                <div className={`${devBadgeSize} text-[var(--c-text-30)] font-bold tracking-wider mt-0.5`}>
                                    {profile.elementLabel} · {profile.modality}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-[1.2rem]`}>{PLANET_ICONS[profile.rulingPlanet] || '✦'}</div>
                                <div className={`${devBadgeSize} text-[var(--c-text-30)] font-bold tracking-wider mt-0.5`}>
                                    {profile.rulingPlanet}
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <p className={`${devBadgeSize} text-[var(--c-text-50)] font-medium leading-relaxed`}>
                                {profile.essence}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm">
                    <div className={`${labelSize} font-black uppercase tracking-[0.15em] text-[var(--c-text-30)] mb-3 px-1`}>
                        Сегодня
                    </div>
                    <div className="rounded-3xl bg-[var(--c-surface)] border border-[var(--c-border)] p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className={`${labelSize} font-bold text-[var(--c-text-40)] uppercase tracking-wider`}>Общий заряд</span>
                            <span className={`${fontScale === 'large' ? 'text-[2rem]' : 'text-[1.6rem]'} font-black text-[var(--c-primary)]`}>
                                {profile.dayEnergy}%
                            </span>
                        </div>
                        <div className="w-full h-2 bg-black/[0.05] rounded-full overflow-hidden mb-5">
                            <div className="h-full bg-[var(--c-primary)] rounded-full transition-all duration-1000" style={{ width: `${profile.dayEnergy}%` }} />
                        </div>
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-center flex-1">
                                <div className={`${fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]'} font-black text-[var(--c-text)]`}>
                                    {profile.dna.energy}%
                                </div>
                                <div className={`${devBadgeSize} text-[var(--c-text-30)] font-bold uppercase tracking-wider mt-1`}>Энергия</div>
                            </div>
                            <div className="w-px h-8 bg-[var(--c-border)]" />
                            <div className="text-center flex-1">
                                <div className={`${fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]'} font-black text-[var(--c-text)]`}>
                                    {profile.dna.focus}%
                                </div>
                                <div className={`${devBadgeSize} text-[var(--c-text-30)] font-bold uppercase tracking-wider mt-1`}>Фокус</div>
                            </div>
                            <div className="w-px h-8 bg-[var(--c-border)]" />
                            <div className="text-center flex-1">
                                <div className={`${fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]'} font-black text-[var(--c-text)]`}>
                                    {profile.dna.intuition}%
                                </div>
                                <div className={`${devBadgeSize} text-[var(--c-text-30)] font-bold uppercase tracking-wider mt-1`}>Интуиция</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm">
                    <div className={`${labelSize} font-black uppercase tracking-[0.15em] text-[var(--c-text-30)] mb-3 px-1`}>
                        Луна сегодня
                    </div>
                    <div className="rounded-3xl bg-[var(--c-surface)] border border-[var(--c-border)] p-5">
                        <div className="flex items-center gap-4 mb-3">
                            <Moon size={fontScale === 'large' ? 22 : 18} className="text-[var(--c-primary)] shrink-0" />
                            <div>
                                <div className={`${fontScale === 'large' ? 'text-[1rem]' : 'text-[0.875rem]'} font-black text-[var(--c-text)]`}>
                                    {profile.moonPhase}
                                </div>
                                <div className={`${devBadgeSize} text-[var(--c-text-30)] font-bold tracking-wider mt-0.5`}>
                                    Луна в знаке {profile.moonSign} · {profile.moonPhaseCategory}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-sm">
                    <div className={`${labelSize} font-black uppercase tracking-[0.15em] text-[var(--c-text-30)] mb-4 px-1`}>
                        Твои руны
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {RUNES.map((rune) => {
                            const Icon = rune.icon;
                            return (
                                <div
                                    key={rune.id}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] active:scale-95 transition-all"
                                >
                                    <Icon size={runeSize} className="text-[var(--c-primary)]" />
                                    <span className={`${devBadgeSize} font-bold text-[var(--c-text-40)] uppercase tracking-wide`}>
                                        {rune.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="w-full max-w-sm mt-2 px-1">
                    <div className="flex items-center justify-between mb-4">
                        <span className={`${labelSize} font-black uppercase tracking-[0.15em] text-[var(--c-text-30)]`}>
                            Премиум
                        </span>
                        <button
                            onClick={onTogglePremium}
                            className={`relative w-12 h-7 rounded-full transition-all ${isPremium ? 'bg-[var(--c-primary)]' : 'bg-[var(--c-border)]'}`}
                        >
                            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-all ${isPremium ? 'left-[1.375rem]' : 'left-0.5'}`} />
                        </button>
                    </div>
                    <p className={`${devBadgeSize} text-[var(--c-text-20)] font-medium leading-relaxed`}>
                        Полный доступ ко всем ритмам, глубокие расшифровки DNA и приоритетная поддержка
                    </p>
                </div>

                <button className="mt-4 w-full max-w-xs flex items-center justify-center gap-3 py-4 px-8 rounded-[20px] bg-[var(--c-primary)] text-[var(--c-bg)] font-black uppercase tracking-[0.15em] active:scale-95 transition-all shadow-lg opacity-40">
                    <Zap size={fontScale === 'large' ? 20 : 16} />
                    <span className={`${fontScale === 'large' ? 'text-[0.875rem]' : 'text-[0.75rem]'}`}>Активировать Гнёзда</span>
                </button>
            </div>
        </div>
    );
};
