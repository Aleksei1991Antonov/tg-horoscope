import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Navigation } from './components/layout/Navigation';
import { PageLayout } from './components/layout/PageLayout';
import { HeaderContainer as Header } from './components/layout/Header/HeaderContainer';
import { WelcomeScreen } from './components/Welcome/WelcomeScreen';
import { PrivacyPolicy } from './components/layout/Header/Menu/Legal/PrivacyPolicy';
import { TermsOfService } from './components/layout/Header/Menu/Legal/TermsOfService';
import { ZodiacModal } from './components/layout/Header/ZodiacModal';
// import { DesktopStub } from './components/DesktopStub';
import { AppearanceSettingsView } from './components/layout/Header/Menu/AppearanceSettingsView';

import { RhythmContainer } from './screens/Rhythm/RhythmContainer';
import { LoveContainer } from './screens/Love/LoveContainer';
import { CoreContainer } from './screens/Core/CoreContainer';
import { RhythmKnowledgeView } from './screens/Knowledge/RhythmKnowledgeView';

// ИМПОРТИРУЕМ РАБОЧИЕ УТИЛИТЫ
import { triggerSuccessHaptic, triggerSelectionHaptic } from './utils/haptics';

const ZODIAC_NAMES = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];
type ScaleType = 'small' | 'medium' | 'large';

const LIGHT_TO_DARK: Record<string, string> = {
    'max-light': 'max-dark',
    'morning-magic': 'night-ether',
};
const DARK_TO_LIGHT: Record<string, string> = {};
for (const [k, v] of Object.entries(LIGHT_TO_DARK)) DARK_TO_LIGHT[v] = k;
const ALL_DARK_KEYS = new Set(Object.values(LIGHT_TO_DARK));

const computeResolvedTheme = (theme: string, mode: 'system' | 'light' | 'dark', systemDark: boolean): string => {
    const wantsDark = mode === 'dark' || (mode === 'system' && systemDark);
    const isDarkTheme = ALL_DARK_KEYS.has(theme);
    if (wantsDark && !isDarkTheme) return LIGHT_TO_DARK[theme] || 'max-dark';
    if (!wantsDark && isDarkTheme) return DARK_TO_LIGHT[theme] || 'max-light';
    return theme;
};

// Синхронная установка data-theme ДО первого рендера — иначе Telegram/браузер принудительно инвертируют цвета
const initTheme = localStorage.getItem('user_theme') || 'max-light';
const initMode = (localStorage.getItem('app-appearance-mode') as 'system' | 'light' | 'dark') || 'system';
const initSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.dataset.theme = computeResolvedTheme(initTheme, initMode, initSystemDark);

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rhythm');
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);
    const isInitialMount = useRef(true);

    const webApp = window.WebApp;

    // const [isDesktop] = useState<boolean>(() => {
    //     return webApp?.platform === 'desktop' || webApp?.platform === 'web';
    // });

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

    const [fontScale, setFontScale] = useState<ScaleType>(() => {
        const saved = localStorage.getItem('app-font-scale');
        return (saved as ScaleType) || 'small';
    });

    const [theme, setTheme] = useState<string>(() => {
        return localStorage.getItem('user_theme') || 'max-light';
    });

    const [appearanceMode, setAppearanceMode] = useState<'system' | 'light' | 'dark'>(() => {
        const saved = localStorage.getItem('app-appearance-mode');
        return (saved as 'system' | 'light' | 'dark') || 'system';
    });

    const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const resolvedTheme = useMemo(() => {
        return computeResolvedTheme(theme, appearanceMode, systemPrefersDark);
    }, [appearanceMode, theme, systemPrefersDark]);

    useEffect(() => {
        document.documentElement.dataset.theme = resolvedTheme;
        localStorage.setItem('user_theme', theme);
        if (webApp?.DeviceStorage) {
            void webApp.DeviceStorage.setItem('user_theme', theme);
        }
    }, [resolvedTheme, theme, webApp]);

    useEffect(() => {
        localStorage.setItem('app-appearance-mode', appearanceMode);
        if (webApp?.DeviceStorage) {
            void webApp.DeviceStorage.setItem('app-appearance-mode', appearanceMode);
        }
    }, [appearanceMode, webApp]);

    useEffect(() => {
        (window.WebApp as any)?.disableVerticalSwipes?.();
    }, []);

    const backBtnRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const bb = window.WebApp?.BackButton;
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
    }, [isTextSettingsOpen, activeLegalDoc, isKnowledgeOpen, backHandlerTick]);

    useEffect(() => {
        const html = document.documentElement;
        const sizes = { small: '14px', medium: '16px', large: '18px' };
        html.style.fontSize = sizes[fontScale];
        localStorage.setItem('app-font-scale', fontScale);

        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const saveTimeout = setTimeout(() => {
            if (webApp?.DeviceStorage) {
                void webApp.DeviceStorage.setItem('app-font-scale', fontScale);
            }
        }, 300);
        return () => clearTimeout(saveTimeout);
    }, [fontScale, webApp]);

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
        let isMounted = true;
        const finalizeLoading = () => {
            if (isMounted) {
                setIsStorageLoaded(true);
            }
        };

        const loadAppData = async () => {
            const storage = webApp?.DeviceStorage;
            const timeoutId = setTimeout(() => {
                if (!isStorageLoaded) {
                    applyFallbackData();
                    finalizeLoading();
                }
            }, 1200);

            if (storage && typeof storage.getItem === 'function') {
                try {
                    const [zodiacRes, acceptedRes, scaleRes, themeRes, modeRes] = await Promise.all([
                        storage.getItem('user_zodiac_index'),
                        storage.getItem('love_rhythm_accepted_v1'),
                        storage.getItem('app-font-scale'),
                        storage.getItem('user_theme'),
                        storage.getItem('app-appearance-mode')
                    ]);

                    if (isMounted) {
                        if (zodiacRes?.value) {
                            const idx = parseInt(zodiacRes.value, 10);
                            setSelectedZodiac(ZODIAC_NAMES[idx] || "Скорпион");
                            setIsSetupDone(true);
                        }
                        if (acceptedRes?.value === 'true' || localStorage.getItem('love_rhythm_accepted_v1') === 'true') {
                            setHasAccepted(true);
                        }
                        if (scaleRes?.value) {
                            setFontScale(scaleRes.value as ScaleType);
                        }
                        if (themeRes?.value) {
                            setTheme(themeRes.value);
                            localStorage.setItem('user_theme', themeRes.value);
                        }
                        if (modeRes?.value) {
                            const mode = modeRes.value as 'system' | 'light' | 'dark';
                            setAppearanceMode(mode);
                            localStorage.setItem('app-appearance-mode', mode);
                        }
                    }
                    clearTimeout(timeoutId);
                    finalizeLoading();
                } catch {
                    clearTimeout(timeoutId);
                    applyFallbackData();
                    finalizeLoading();
                }
            } else {
                clearTimeout(timeoutId);
                applyFallbackData();
                finalizeLoading();
            }
        };

        void loadAppData();
        return () => { isMounted = false; };
    }, [applyFallbackData, isStorageLoaded, webApp]);

    const handleZodiacSelect = (index: number) => {
        void triggerSuccessHaptic();
        const name = ZODIAC_NAMES[index];
        localStorage.setItem('user_zodiac_index', index.toString());
        if (webApp?.DeviceStorage) {
            void webApp.DeviceStorage.setItem('user_zodiac_index', index.toString());
        }
        setSelectedZodiac(name);
        setIsSetupDone(true);
    };

    const handleAcceptConditions = () => {
        void triggerSuccessHaptic();
        localStorage.setItem('love_rhythm_accepted_v1', 'true');
        if (webApp?.DeviceStorage) {
            void webApp.DeviceStorage.setItem('love_rhythm_accepted_v1', 'true');
        }
        setHasAccepted(true);
    };

    const handleTabChange = useCallback((tab: string) => {
        if (activeTab !== tab) {
            void triggerSelectionHaptic();
            setActiveTab(tab);
        }
    }, [activeTab]);

    // if (isDesktop && !window.location.search.includes('force=mobile')) return <DesktopStub />;
    if (!isStorageLoaded) return <div className="h-screen bg-[var(--c-bg)]" />;

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
                        {activeTab === 'core' && <CoreContainer zodiacName={selectedZodiac} fontScale={fontScale} />}
                    </div>
                </PageLayout>
            </div>

            <Navigation
                activeTab={activeTab}
                onTabChange={handleTabChange}
                fontScale={fontScale}
            />
        </div>
    );
};

export default App;