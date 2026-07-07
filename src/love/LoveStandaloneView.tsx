import React, { useState, useMemo } from 'react';
import { LoveView } from '../screens/Love/LoveView';
import { LoveEngine } from '../core/engines/LoveEngine';
import { triggerSuccessHaptic } from '../utils/haptics';
import { ArrowRight, X } from 'lucide-react';
import { storage } from '../utils/storage';

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

const FONT_SCALE = 'medium';
const RESOLVED_THEME = 'max-light';

const PRIVACY_KEY = 'love_privacy_accepted';
const MAX_DEEPLINK = 'https://max.ru/id760407796785_biz';

export const LoveStandaloneView: React.FC = () => {
    const [privacyAccepted, setPrivacyAccepted] = useState(() => {
        return storage.getItem(PRIVACY_KEY) === 'true';
    });

    const [userZodiac, setUserZodiac] = useState<string>(() => {
        return storage.getItem('user_zodiac') || '';
    });

    const [partnerName, setPartnerName] = useState<string | undefined>(() => {
        return storage.getItem('user_partner_choice') || undefined;
    });

    const [isPickingUser, setIsPickingUser] = useState(!userZodiac);
    const [isPickingPartner, setIsPickingPartner] = useState(false);
    const [yearOffset, setYearOffset] = useState(0);
    const [isBannerOpen, setIsBannerOpen] = useState(false);

    const acceptPrivacy = () => {
        storage.setItem(PRIVACY_KEY, 'true');
        setPrivacyAccepted(true);
    };

    const handlePickUser = (name: string) => {
        void triggerSuccessHaptic();
        setUserZodiac(name);
        storage.setItem('user_zodiac', name);
        setIsPickingUser(false);
    };

    const handlePickPartner = (name: string) => {
        void triggerSuccessHaptic();
        setPartnerName(name);
        storage.setItem('user_partner_choice', name);
        setIsPickingPartner(false);
    };

    const openMax = () => {
        void triggerSuccessHaptic();
        window.location.href = MAX_DEEPLINK;
    };

    const openBanner = () => {
        void triggerSuccessHaptic();
        setIsBannerOpen(true);
    };

    const currentYear = new Date().getFullYear() + yearOffset;

    const data = useMemo(() => {
        if (!userZodiac) return null;
        const weeklyForecast = LoveEngine.getWeeklyForecast(userZodiac, partnerName);
        const monthlyForecast = LoveEngine.getMonthlyForecast(userZodiac, partnerName);
        const yearlyForecast = LoveEngine.getYearlyForecast(userZodiac, partnerName, yearOffset);
        const synergyPercent = partnerName
            ? LoveEngine.getBaseSynergy(userZodiac, partnerName)
            : 0;
        return { weeklyForecast, monthlyForecast, yearlyForecast, synergyPercent };
    }, [userZodiac, partnerName, yearOffset]);

    if (!privacyAccepted) {
        return (
            <div className="min-h-screen bg-[var(--c-bg)] flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-sm text-center">
                    <div className="text-8xl mb-6">🔮</div>
                    <h1 className="text-xl font-black text-[var(--c-text)] uppercase tracking-tight mb-3">
                        Совместимость
                    </h1>
                    <p className="text-sm text-[var(--c-text-40)] font-medium leading-relaxed mb-8">
                        Приложение не собирает и не передаёт ваши данные. Вся информация хранится локально на устройстве.
                    </p>
                    <button
                        onClick={acceptPrivacy}
                        className="w-full py-4 rounded-[28px] text-white font-black text-sm uppercase tracking-wider active:scale-[0.98] transition-transform shadow-2xl mb-4"
                        style={{ background: 'linear-gradient(180deg, #C4756B 0%, #B96A61 100%)' }}
                    >
                        Продолжить
                    </button>
                    <a
                        href="./privacy.html"
                        className="inline-block text-[0.65rem] text-[var(--c-text-30)] font-medium uppercase tracking-wider underline active:opacity-60"
                    >
                        Политика конфиденциальности
                    </a>
                </div>
            </div>
        );
    }

    if (!userZodiac) {
        return (
            <div className="min-h-screen bg-[var(--c-bg)] flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-[var(--c-text)] uppercase tracking-tight mb-2">
                            Совместимость
                        </h1>
                        <p className="text-sm text-[var(--c-text-40)] font-medium">
                            Выберите свой знак зодиака
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {ALL_ZODIAC.map((name) => (
                            <button
                                key={name}
                                onClick={() => handlePickUser(name)}
                                className="flex flex-col items-center py-5 rounded-[24px] bg-[var(--c-surface)] border border-[var(--c-border)] active:scale-95 transition-all hover:bg-[var(--c-surface-elevated)]"
                            >
                                <span className="text-3xl mb-2">{ZODIAC_EMOJI[name]}</span>
                                <span className="text-[0.5625rem] font-bold uppercase text-[var(--c-text-40)] tracking-tight">
                                    {name}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <a
                            href="./privacy.html"
                            className="text-[0.55rem] text-[var(--c-text-30)] font-medium uppercase tracking-wider underline"
                        >
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--c-bg)]">
            <div className="max-w-2xl mx-auto px-4 pt-12 pb-40">
                <header className="mb-6">
                    <h1 className="text-2xl font-black text-[var(--c-text)] uppercase tracking-tight mb-1">
                        Совместимость
                    </h1>
                    <p className="text-sm text-[var(--c-text-40)] font-medium">
                        Проверьте совместимость с партнёром
                    </p>
                </header>

                <LoveView
                    zodiacName={userZodiac}
                    zodiacEmoji={ZODIAC_EMOJI[userZodiac]}
                    partnerZodiac={partnerName ? ZODIAC_EMOJI[partnerName] : undefined}
                    partnerZodiacName={partnerName || undefined}
                    synergyPercent={data?.synergyPercent}
                    weeklyForecast={data?.weeklyForecast}
                    monthlyForecast={data?.monthlyForecast}
                    yearlyForecast={data?.yearlyForecast}
                    currentYear={currentYear}
                    onYearPrev={() => setYearOffset(o => o - 1)}
                    onYearNext={() => setYearOffset(o => o + 1)}
                    onSelectPartner={() => {
                        void triggerSuccessHaptic();
                        setIsPickingPartner(true);
                    }}
                    onSelectUser={() => {
                        void triggerSuccessHaptic();
                        setIsPickingUser(true);
                    }}
                    fontScale={FONT_SCALE}
                    resolvedTheme={RESOLVED_THEME}
                />

                <div className="mt-8 px-4">
                    <button
                        onClick={openBanner}
                        className="w-full py-4 rounded-[28px] text-white font-black text-sm uppercase tracking-wider active:scale-[0.98] transition-transform shadow-2xl flex items-center justify-center gap-2 relative overflow-hidden"
                        style={{ background: 'linear-gradient(180deg, #C4756B 0%, #B96A61 100%)' }}
                    >
                        Полный гороскоп
                        <ArrowRight size={16} />
                    </button>
                        <p className="text-[0.55rem] text-[var(--c-text-30)] font-medium text-center mt-3">
                            Личный прогноз, Час Силы, База знаний и всё остальное — только в MAX
                        </p>
                    </div>
                    <div className="text-center mt-6">
                        <a
                            href="./privacy.html"
                            className="text-[0.5rem] text-[var(--c-text-30)] font-medium uppercase tracking-wider underline"
                        >
                            Политика конфиденциальности
                        </a>
                </div>
            </div>

            {isPickingPartner && (
                <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-10">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => {
                            void triggerSuccessHaptic();
                            setIsPickingPartner(false);
                        }}
                    />
                    <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] rounded-[36px] p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            {ALL_ZODIAC.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handlePickPartner(name)}
                                    className={`
                                        flex flex-col items-center py-5 rounded-[24px] transition-all active:scale-95
                                        ${name === partnerName
                                        ? 'shadow-inner'
                                        : 'hover:bg-[var(--c-surface)]'}
                                    `}
                                    style={name === partnerName ? { backgroundColor: 'rgba(196,117,107,0.12)' } : {}}
                                >
                                    <span className={`text-3xl mb-2 transition-transform ${name === partnerName ? 'scale-110' : ''}`}>
                                        {ZODIAC_EMOJI[name]}
                                    </span>
                                    <span className={`text-[0.5625rem] font-bold uppercase tracking-tight ${name === partnerName ? 'text-[var(--c-text)]' : 'text-[var(--c-text-40)]'}`}>
                                        {name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isPickingUser && (
                <div className="fixed inset-0 z-[1000] flex items-end justify-center px-4 pb-10">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => {
                            void triggerSuccessHaptic();
                            setIsPickingUser(false);
                        }}
                    />
                    <div className="relative w-full max-w-md bg-[var(--c-surface-elevated)] rounded-[36px] p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            {ALL_ZODIAC.map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handlePickUser(name)}
                                    className={`
                                        flex flex-col items-center py-5 rounded-[24px] transition-all active:scale-95
                                        ${name === userZodiac
                                        ? 'shadow-inner'
                                        : 'hover:bg-[var(--c-surface)]'}
                                    `}
                                    style={name === userZodiac ? { backgroundColor: 'rgba(196,117,107,0.12)' } : {}}
                                >
                                    <span className={`text-3xl mb-2 transition-transform ${name === userZodiac ? 'scale-110' : ''}`}>
                                        {ZODIAC_EMOJI[name]}
                                    </span>
                                    <span className={`text-[0.5625rem] font-bold uppercase tracking-tight ${name === userZodiac ? 'text-[var(--c-text)]' : 'text-[var(--c-text-40)]'}`}>
                                        {name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {isBannerOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => {
                            void triggerSuccessHaptic();
                            setIsBannerOpen(false);
                        }}
                    />
                    <div className="relative w-full max-w-sm bg-[var(--c-surface-elevated)] rounded-[36px] overflow-hidden shadow-2xl">
                        <button
                            onClick={() => {
                                void triggerSuccessHaptic();
                                setIsBannerOpen(false);
                            }}
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white"
                        >
                            <X size={16} />
                        </button>
                        <div className="flex flex-col items-center">
                            <div className="w-full">
                                <img
                                    src="./banner_horoscope.webp"
                                    alt="Гороскоп"
                                    className="w-full object-cover"
                                />
                            </div>
                            <div className="p-6 w-full flex flex-col items-center gap-4">
                                <button
                                    onClick={openMax}
                                    className="w-full py-4 rounded-[28px] text-white font-black text-sm uppercase tracking-wider active:scale-[0.98] transition-transform shadow-2xl flex items-center justify-center gap-2"
                                    style={{ background: 'linear-gradient(180deg, #C4756B 0%, #B96A61 100%)' }}
                                >
                                    Открыть в MAX
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
