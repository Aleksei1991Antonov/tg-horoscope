import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SIGN_TALENTS } from '../../core/constants/signTalents';
import type { TalentBranch, Talent } from '../../core/constants/signTalents';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface TalentTreeViewProps {
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
}

const ALL_ZODIAC = [
    'Овен', 'Телец', 'Близнецы', 'Рак',
    'Лев', 'Дева', 'Весы', 'Скорпион',
    'Стрелец', 'Козерог', 'Водолей', 'Рыбы'
];

const ZODIAC_EMOJI: Record<string, string> = {
    'Овен': '♈️', 'Телец': '♉️', 'Близнецы': '♊️', 'Рак': '♋️',
    'Лев': '♌️', 'Дева': '♍️', 'Весы': '♎️', 'Скорпион': '♏️',
    'Стрелец': '♐️', 'Козерог': '♑️', 'Водолей': '♒️', 'Рыбы': '♓️'
};

export const TalentTreeView: React.FC<TalentTreeViewProps> = ({ zodiacName, fontScale }) => {
    const [viewingZodiac, setViewingZodiac] = useState(zodiacName);
    const [isSelectingZodiac, setIsSelectingZodiac] = useState(false);

    const data = SIGN_TALENTS[viewingZodiac];
    if (!data) return null;

    const s = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const m = fontScale === 'large' ? 'text-[0.9375rem]' : 'text-[0.8125rem]';
    const h2 = fontScale === 'large' ? 'text-[1.1rem]' : 'text-[0.9375rem]';
    const zodiacLabelSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]';
    const emojiSize = fontScale === 'large' ? 'text-4xl' : 'text-3xl';
    const gridGap = fontScale === 'large' ? 'gap-4' : 'gap-3';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    return (
        <div className={`w-full min-h-full bg-[var(--c-bg)] text-[var(--c-text)] animate-in fade-in duration-500 ${bottomPadding}`}>
            <div className="px-4 pt-4 pb-3">
                <div className="flex items-center gap-2">
                    <Sparkles size={fontScale === 'large' ? 14 : 11} className="text-[var(--c-primary)] shrink-0" />
                    <span className={`${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} font-black uppercase tracking-[0.2em] text-[var(--c-primary)]`}>Древо талантов</span>
                </div>
                <button
                    onClick={() => {
                        void triggerSuccessHaptic();
                        setIsSelectingZodiac(true);
                    }}
                    className="flex items-center gap-2 mt-1 active:scale-95 transition-all"
                >
                    <span className="text-[1.25rem]">{ZODIAC_EMOJI[viewingZodiac] || '✦'}</span>
                    <span className={`${fontScale === 'large' ? 'text-[1.2rem]' : 'text-[1rem]'} font-black tracking-tight`}>{viewingZodiac}</span>
                </button>
            </div>

            <div className="px-4 pt-4 space-y-8">
                {data.branches.map((branch, branchIdx) => (
                    <TalentBranchCard
                        key={branchIdx}
                        branch={branch}
                        s={s}
                        m={m}
                        h2={h2}
                    />
                ))}
            </div>

            {isSelectingZodiac && (
                <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-10">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => {
                            void triggerSuccessHaptic();
                            setIsSelectingZodiac(false);
                        }}
                    />
                    <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] rounded-[36px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar">
                        <div className={`grid grid-cols-3 ${gridGap} pt-2`}>
                            {ALL_ZODIAC.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => {
                                        void triggerSuccessHaptic();
                                        setViewingZodiac(name);
                                        setIsSelectingZodiac(false);
                                    }}
                                    className={`
                                        flex flex-col items-center py-5 rounded-[24px] transition-all active:scale-95
                                        ${name === viewingZodiac
                                        ? 'bg-[var(--c-primary-10)] shadow-inner'
                                        : 'hover:bg-[var(--c-surface)]'}
                                    `}
                                >
                                    <span className={`${emojiSize} mb-2 transition-transform ${name === viewingZodiac ? 'scale-110' : ''}`}>
                                        {ZODIAC_EMOJI[name]}
                                    </span>
                                    <span className={`${zodiacLabelSize} font-bold uppercase tracking-tight ${name === viewingZodiac ? 'text-[var(--c-text)]' : 'text-[var(--c-text-40)]'}`}>
                                        {name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TalentBranchCard: React.FC<{
    branch: TalentBranch;
    s: string;
    m: string;
    h2: string;
}> = ({ branch, s, m, h2 }) => {
    return (
        <div>
            <div className="flex items-center gap-3 mb-4 px-1">
                <span className={`${h2} font-black tracking-tight text-[var(--c-text)]`}>{branch.name}</span>
                <div className="flex-1 h-px bg-[var(--c-border)]" />
            </div>

            <div className="space-y-3">
                {branch.talents.map((talent) => (
                    <TalentCard
                        key={talent.id}
                        talent={talent}
                        s={s}
                        m={m}
                    />
                ))}
            </div>
        </div>
    );
};

const TalentCard: React.FC<{
    talent: Talent;
    s: string;
    m: string;
}> = ({ talent, s, m }) => {
    return (
        <div className="bg-[var(--c-surface)] rounded-[24px] border border-[var(--c-border)] p-5">
            <div className="flex items-start gap-4">
                <span className="text-[1.75rem] leading-none shrink-0 mt-0.5">{talent.emoji}</span>
                <div className="flex-1 min-w-0">
                    <span className={`${m} font-black tracking-tight block mb-1`}>{talent.name}</span>
                    <p className={`${s} text-[var(--c-text-50)] font-medium leading-relaxed`}>
                        {talent.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
