import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Navigation } from './components/layout/Navigation';
import { PageLayout } from './components/layout/PageLayout';
import { HeaderContainer as Header } from './components/layout/Header/HeaderContainer';
import { RhythmContainer } from './screens/Rhythm/RhythmContainer';
import { LoveContainer } from './screens/Love/LoveContainer';
import { CoreContainer } from './screens/Core/CoreContainer';
import { WelcomeScreen } from './components/Welcome/WelcomeScreen';
import { PrivacyPolicy } from './components/layout/Header/Menu/Legal/PrivacyPolicy';
import { TermsOfService } from './components/layout/Header/Menu/Legal/TermsOfService';
import { ZodiacModal } from './components/layout/Header/ZodiacModal';
import { AppearanceSettingsView } from './components/layout/Header/Menu/AppearanceSettingsView';
import { NOVAPremiumView } from './components/layout/Header/Menu/NOVAPremiumView';
import LockScreen from './components/LockScreen';
import { RhythmKnowledgeView } from './screens/Knowledge/RhythmKnowledgeView';

import { triggerSuccessHaptic, triggerSelectionHaptic } from './utils/haptics';
import { storage } from './utils/storage';

const ZODIAC_NAMES = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];
type ScaleType = 'small' | 'medium' | 'large';

const tg = window.Telegram?.WebApp;

const LIGHT_TO_DARK: Record<string, string> = {
    'max-light': 'max-dark',
    'morning-magic': 'night-ether',
    'nova-day': 'nova-night',
};
const DARK_TO_LIGHT: Record<string, string> = {};
for (const [k, v] of Object.entries(LIGHT_TO_DARK)) DARK_TO_LIGHT[v] = k;
const ALL_DARK_KEYS = new Set(Object.values(LIGHT_TO_DARK));

const initMode = (localStorage.getItem('app-appearance-mode') as 'system' | 'light' | 'dark') || 'system';
const initTheme = localStorage.getItem('user_theme') || 'max-light';
const initSystemDark = tg?.colorScheme === 'dark';
const computeResolvedTheme = (theme: string, mode: 'system' | 'light' | 'dark', systemDark: boolean): string => {
    const wantsDark = mode === 'dark' || (mode === 'system' && systemDark);
    const isDarkTheme = ALL_DARK_KEYS.has(theme);
    if (wantsDark && !isDarkTheme) return LIGHT_TO_DARK[theme] || 'max-dark';
    if (!wantsDark && isDarkTheme) return DARK_TO_LIGHT[theme] || 'max-light';
    return theme;
};
const initResolved = computeResolvedTheme(initTheme, initMode, initSystemDark);
document.documentElement.dataset.theme = initResolved;
const metaCs = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
if (metaCs) metaCs.content = initSystemDark ? 'dark' : 'light';

const SUBSCRIPTION_CHANNEL_URL = 'https://t.me/horoscope_nova';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rhythm');
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);
    const [accessState, setAccessState] = useState<'granted' | 'denied'>('granted');
    const [isRetrying, setIsRetrying] = useState(false);

    const [selectedZodiac, setSelectedZodiac] = useState<string>(() => {
        const saved = localStorage.getItem('user_zodiac_index');
        return saved ? (ZODIAC_NAMES[parseInt(saved, 10)] || "Скорпион") : "Скорпион";
    });
    const [isSetupDone, setIsSetupDone] = useState<boolean>(false);
    const [hasAccepted, setHasAccepted] = useState<boolean>(false);
    const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | null>(null);
    const [isTextSettingsOpen, setIsTextSettingsOpen] = useState(false);
    const [isKnowledgeOpen, setIsKnowledgeOpen] = useState(false);
    const backHandlerRef = useRef<(() => void) | null>(null);
    const [backHandlerTick, setBackHandlerTick] = useState(0);
    const setBackHandler = useCallback((handler: (() => void) | null) => {
        backHandlerRef.current = handler;
        setBackHandlerTick(t => t + 1);
    }, []);
    const handleActivatePremium = useCallback(() => {
        setTheme('nova-day');
    }, []);

    const resetNovaTheme = useCallback(() => {
        const cur = storage.getItem('user_theme') || 'max-light';
        if ((cur === 'nova-day' || cur === 'nova-night') && !storage.getItem('nova_premium_until')) {
            storage.setItem('user_theme', 'max-light');
            setTheme('max-light');
        }
    }, []);

    useEffect(() => {
        const check = () => {
            const raw = storage.getItem('nova_premium_until');
            if (raw && parseInt(raw, 10) <= Date.now()) {
                storage.removeItem('nova_premium_until');
                storage.setItem('nova_love_horoscope', 'false');
                storage.setItem('nova_badge', 'false');
                window.dispatchEvent(new CustomEvent('nova-toggle'));
            }
            resetNovaTheme();
        };
        check();
        const interval = setInterval(check, 30000);
        const onToggle = () => resetNovaTheme();
        window.addEventListener('nova-toggle', onToggle);
        return () => { clearInterval(interval); window.removeEventListener('nova-toggle', onToggle); };
    }, [resetNovaTheme]);

    const [fontScale, setFontScale] = useState<ScaleType>(() => {
        const saved = localStorage.getItem('app-font-scale');
        return (saved as ScaleType) || 'small';
    });

    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem('user_theme') || 'max-light';
    });

    const [appearanceMode, setAppearanceMode] = useState<'system' | 'light' | 'dark'>(() => {
        return (localStorage.getItem('app-appearance-mode') as 'system' | 'light' | 'dark') || 'system';
    });

    const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
        return tg?.colorScheme === 'dark';
    });

    useEffect(() => {
        const handler = () => {
            setSystemPrefersDark(window.Telegram?.WebApp?.colorScheme === 'dark');
        };
        tg?.onEvent?.('themeChanged', handler);
        return () => tg?.offEvent?.('themeChanged', handler);
    }, []);

    const resolvedTheme = useMemo(() => {
        return computeResolvedTheme(theme, appearanceMode, systemPrefersDark);
    }, [theme, appearanceMode, systemPrefersDark]);

    const isDarkTheme = ALL_DARK_KEYS.has(resolvedTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = resolvedTheme;
        const metaCs = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
        if (metaCs) metaCs.content = isDarkTheme ? 'dark' : 'light';
        localStorage.setItem('user_theme', theme);
        localStorage.setItem('app-appearance-mode', appearanceMode);
    }, [resolvedTheme, theme, appearanceMode]);

    const backBtnRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const bb = tg?.BackButton;
        if (!bb) return;

        if (backBtnRef.current) {
            bb.offClick(backBtnRef.current);
            backBtnRef.current = null;
        }

        if (isTextSettingsOpen) {
            const cb = () => setIsTextSettingsOpen(false);
            backBtnRef.current = cb;
            bb.show();
            bb.onClick(cb);
        } else if (activeTab === 'premium') {
            const cb = () => handleTabChange('rhythm');
            backBtnRef.current = cb;
            bb.show();
            bb.onClick(cb);
        } else if (isKnowledgeOpen) {
            const cb = () => setIsKnowledgeOpen(false);
            backBtnRef.current = cb;
            bb.show();
            bb.onClick(cb);
        } else if (activeLegalDoc) {
            const cb = () => setActiveLegalDoc(null);
            backBtnRef.current = cb;
            bb.show();
            bb.onClick(cb);
        } else if (backHandlerRef.current) {
            const cb = backHandlerRef.current;
            backBtnRef.current = cb;
            bb.show();
            bb.onClick(cb);
        } else {
            bb.hide();
        }

        return () => {
            if (backBtnRef.current) {
                bb.offClick(backBtnRef.current);
                backBtnRef.current = null;
            }
            bb.hide();
        };
    }, [isTextSettingsOpen, activeTab, activeLegalDoc, isKnowledgeOpen, backHandlerTick]);

    useEffect(() => {
        const html = document.documentElement;
        const sizes = { small: '14px', medium: '16px', large: '18px' };
        html.style.fontSize = sizes[fontScale];
        localStorage.setItem('app-font-scale', fontScale);
    }, [fontScale]);

    const checkSubscriptionAccess = useCallback(async () => {
        if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('lock')) {
            setAccessState('denied');
            return;
        }

        if (storage.getItem('force_lock_screen') === 'true') {
            storage.removeItem('force_lock_screen');
            setAccessState('denied');
            return;
        }

        if (storage.getItem('has_astro_access') === 'true') {
            return;
        }

        const userId = tg?.initDataUnsafe?.user?.id;
        if (!userId) {
            return;
        }

        try {
            const res = await fetch(`https://functions.yandexcloud.net/d4enor9kt9ttaemtlj0p?user_id=${userId}`);
            const data = await res.json();
            if (data.subscribed) {
                storage.setItem('has_astro_access', 'true');
            } else {
                setAccessState('denied');
            }
        } catch {
        }
    }, []);

    const retryTimestampsRef = useRef<number[]>([]);

    const isRateLimited = (): boolean => {
        const now = Date.now();
        const recent = retryTimestampsRef.current.filter(t => now - t < 60000);
        retryTimestampsRef.current = recent;
        return recent.length >= 3;
    };

    const handleRetryAccess = useCallback(() => {
        if (isRetrying) return;
        if (isRateLimited()) return;

        retryTimestampsRef.current.push(Date.now());

        const doCheck = async () => {
            setIsRetrying(true);
            storage.removeItem('has_astro_access');
            try { sessionStorage.removeItem('has_astro_access'); } catch {}

            const userId = tg?.initDataUnsafe?.user?.id;
            if (!userId) {
                setAccessState('granted');
                setIsRetrying(false);
                return;
            }

            try {
                const res = await fetch(`https://functions.yandexcloud.net/d4enor9kt9ttaemtlj0p?user_id=${userId}`);
                const data = await res.json();
                if (data.subscribed) {
                    storage.setItem('has_astro_access', 'true');
                    setAccessState('granted');
                }
            } catch {
                setAccessState('granted');
            }

            setIsRetrying(false);
        };

        void doCheck();
    }, [isRetrying]);

    useEffect(() => {
        void checkSubscriptionAccess();
    }, [checkSubscriptionAccess]);

    const applyFallbackData = useCallback(() => {
        const localIdx = localStorage.getItem('user_zodiac_index');
        if (localIdx) {
            setSelectedZodiac(ZODIAC_NAMES[parseInt(localIdx, 10)] || "Скорпион");
            setIsSetupDone(true);
        }
        setHasAccepted(localStorage.getItem('love_rhythm_accepted_v1') === 'true');
        const localScale = localStorage.getItem('app-font-scale');
        setFontScale((localScale as ScaleType) || 'small');
    }, []);

    useEffect(() => {
        applyFallbackData();
        setIsStorageLoaded(true);
    }, [applyFallbackData]);

    const handleZodiacSelect = (index: number) => {
        void triggerSuccessHaptic();
        const name = ZODIAC_NAMES[index];
        localStorage.setItem('user_zodiac_index', index.toString());
        setSelectedZodiac(name);
        setIsSetupDone(true);
    };

    const handleAcceptConditions = () => {
        void triggerSuccessHaptic();
        localStorage.setItem('love_rhythm_accepted_v1', 'true');
        setHasAccepted(true);
    };

    const handleTabChange = useCallback((tab: string) => {
        if (activeTab !== tab) {
            void triggerSelectionHaptic();
            setActiveTab(tab);
        }
    }, [activeTab]);

    if (!isStorageLoaded) return <div className="h-screen bg-[var(--c-bg)]" />;

    if (accessState === 'denied') {
        return (
            <LockScreen
                channelUrl={SUBSCRIPTION_CHANNEL_URL}
                fontScale={fontScale}
                isRetrying={isRetrying}
                onRetry={handleRetryAccess}
            />
        );
    }

    if (isTextSettingsOpen) {
        return (
            <AppearanceSettingsView
                fontScale={fontScale}
                setFontScale={setFontScale}
                theme={theme}
                setTheme={setTheme}
                appearanceMode={appearanceMode}
                setAppearanceMode={setAppearanceMode}
                resolvedTheme={resolvedTheme}
            />
        );
    }

    if (isKnowledgeOpen) {
        return (
            <div className="absolute inset-0 z-[5000] bg-[var(--c-bg)] flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                    <RhythmKnowledgeView fontScale={fontScale} />
                </div>
            </div>
        );
    }

    if (activeLegalDoc === 'privacy') return <PrivacyPolicy onBack={() => setActiveLegalDoc(null)} fontScale={fontScale} />;
    if (activeLegalDoc === 'terms') return <TermsOfService onBack={() => setActiveLegalDoc(null)} fontScale={fontScale} />;

    if (!hasAccepted) {
        return (
            <WelcomeScreen
                onAccept={handleAcceptConditions}
                onOpenPrivacy={() => setActiveLegalDoc('privacy')}
                onOpenTerms={() => setActiveLegalDoc('terms')}
                fontScale={fontScale}
                setFontScale={setFontScale}
            />
        );
    }

    if (!isSetupDone) {
        return (
            <div className="fixed inset-0 z-[3000] bg-[var(--c-bg)]">
                <ZodiacModal
                    isOpen={true}
                    onClose={() => {}}
                    onSelect={handleZodiacSelect}
                    currentIndex={null}
                    isFirstLaunch={true}
                    fontScale={fontScale}
                />
            </div>
        );
    }

    return (
        <div className="h-screen bg-[var(--c-bg)] text-[var(--c-text)] font-manrope flex flex-col overflow-hidden relative">

            <Header
                onZodiacChange={(newName: string) => {
                    const index = ZODIAC_NAMES.indexOf(newName);
                    if (index !== -1) handleZodiacSelect(index);
                }}
                currentZodiacName={selectedZodiac}
                fontScale={fontScale}
                setFontScale={setFontScale}
                onOpenTextSettings={() => setIsTextSettingsOpen(true)}
                onOpenKnowledge={() => setIsKnowledgeOpen(true)}
                onOpenLegalDoc={setActiveLegalDoc}
                onSetBackHandler={setBackHandler}
            />

            <div className="flex-1 relative overflow-hidden">
                <PageLayout className="h-full">
                    <div className="pb-6 h-full">
                        {activeTab === 'rhythm' && <RhythmContainer zodiacName={selectedZodiac} fontScale={fontScale} onSetBackHandler={setBackHandler} resolvedTheme={resolvedTheme} />}
                        {activeTab === 'love' && <LoveContainer zodiacName={selectedZodiac} fontScale={fontScale} onSetBackHandler={setBackHandler} resolvedTheme={resolvedTheme} />}
                        {activeTab === 'core' && <CoreContainer zodiacName={selectedZodiac} fontScale={fontScale} onSetBackHandler={setBackHandler} />}
                        {activeTab === 'premium' && <NOVAPremiumView fontScale={fontScale} resolvedTheme={resolvedTheme} onActivatePremium={handleActivatePremium} />}
                    </div>
                </PageLayout>
            </div>

            <Navigation
                activeTab={activeTab}
                onTabChange={handleTabChange}
                fontScale={fontScale}
                theme={resolvedTheme}
                onOpenPremium={() => handleTabChange('premium')}
            />
        </div>
    );
};

export default App;
