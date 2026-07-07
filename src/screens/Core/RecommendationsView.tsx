import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { SIGN_RECOMMENDATIONS } from '../../core/constants/signRecommendations';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface RecommendationsViewProps {
    zodiacName: string;
    fontScale: 'small' | 'medium' | 'large';
}

type TabKey = 'hobby' | 'contribution' | 'powerPlaces';

const TABS: { key: TabKey; label: string; emoji: string }[] = [
    { key: 'hobby', label: 'Хобби', emoji: '🎨' },
    { key: 'contribution', label: 'Вклад в мир', emoji: '✨' },
    { key: 'powerPlaces', label: 'Места силы', emoji: '🗺️' },
];

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

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({ zodiacName, fontScale }) => {
    const [viewingZodiac, setViewingZodiac] = useState(zodiacName);
    const [activeTab, setActiveTab] = useState<TabKey>('hobby');
    const [isSelectingZodiac, setIsSelectingZodiac] = useState(false);

    const data = SIGN_RECOMMENDATIONS[viewingZodiac];
    if (!data) return null;

    const s = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const m = fontScale === 'large' ? 'text-[0.9375rem]' : 'text-[0.8125rem]';
    const zodiacLabelSize = fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]';
    const emojiSize = fontScale === 'large' ? 'text-4xl' : 'text-3xl';
    const gridGap = fontScale === 'large' ? 'gap-4' : 'gap-3';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    const currentItems = data[activeTab];

    return (
        <div className={`w-full min-h-full bg-[var(--c-bg)] text-[var(--c-text)] animate-in fade-in duration-500 ${bottomPadding}`}>
            <div className="px-4 pt-4 pb-3">
                <div className="flex items-center gap-2">
                    <Compass size={fontScale === 'large' ? 14 : 11} className="text-[var(--c-primary)] shrink-0" />
                    <span className={`${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} font-black uppercase tracking-[0.2em] text-[var(--c-primary)]`}>Рекомендации</span>
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

            <div className="px-4 mb-6">
                <div className="flex bg-[var(--c-surface)] rounded-[20px] border border-[var(--c-border)] p-1 gap-1">
                    {TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => {
                                void triggerSuccessHaptic();
                                setActiveTab(tab.key);
                            }}
                            className={`
                                flex-1 flex items-center justify-center gap-2 py-2.5 rounded-[16px] transition-all active:scale-95
                                ${activeTab === tab.key
                                ? 'bg-[var(--c-primary-10)] shadow-sm'
                                : 'opacity-50 hover:opacity-80'}
                            `}
                        >
                            <span className="text-[1rem]">{tab.emoji}</span>
                            <span className={`${fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]'} font-black uppercase tracking-[0.05em] ${activeTab === tab.key ? 'text-[var(--c-text)]' : 'text-[var(--c-text-60)]'}`}>
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 space-y-4">
                {currentItems.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-[var(--c-surface)] rounded-[32px] border border-[var(--c-border)] p-6 card-shadow"
                    >
                        <div className="flex items-start gap-4">
                            <span className="text-[2rem] leading-none shrink-0 mt-0.5">{item.emoji}</span>
                            <div className="flex-1 min-w-0">
                                <span className={`${m} font-black tracking-tight block mb-1`}>{item.title}</span>
                                <p className={`${s} text-[var(--c-text-50)] font-medium leading-relaxed`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
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
