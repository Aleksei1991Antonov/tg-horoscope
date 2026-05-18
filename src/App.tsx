import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from './components/layout/Navigation';
import { PageLayout } from './components/layout/PageLayout';
import { HeaderContainer as Header } from './components/layout/Header/HeaderContainer';
import { WelcomeScreen } from './components/Welcome/WelcomeScreen';
import { PrivacyPolicy } from './components/layout/Header/Menu/Legal/PrivacyPolicy';
import { TermsOfService } from './components/layout/Header/Menu/Legal/TermsOfService';
import { ZodiacModal } from './components/layout/Header/ZodiacModal';
import { DesktopStub } from './components/DesktopStub';

import { RhythmContainer } from './screens/Rhythm/RhythmContainer';
import { LoveContainer } from './screens/Love/LoveContainer';
import { BeautyContainer } from './screens/Beauty/BeautyContainer';

const ZODIAC_NAMES = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rhythm');
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [isStorageLoaded, setIsStorageLoaded] = useState(false);

    const [isDesktop] = useState<boolean>(() => {
        return window.WebApp?.platform === 'desktop';
    });

    const [selectedZodiac, setSelectedZodiac] = useState<string>("Скорпион");
    const [isSetupDone, setIsSetupDone] = useState<boolean>(false);
    const [hasAccepted, setHasAccepted] = useState<boolean>(false);
    const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | null>(null);

    // Переименовали, чтобы ESLint не думал, что это хук
    const applyFallbackData = useCallback(() => {
        const localIdx = localStorage.getItem('user_zodiac_index');
        if (localIdx) {
            setSelectedZodiac(ZODIAC_NAMES[parseInt(localIdx, 10)] || "Скорпион");
            setIsSetupDone(true);
        }
        setHasAccepted(localStorage.getItem('love_rhythm_accepted_v1') === 'true');
    }, []);

    useEffect(() => {
        let isMounted = true;

        const finalizeLoading = () => {
            if (isMounted) {
                setIsStorageLoaded(true);
                setTimeout(() => setIsOverlayVisible(false), 350);
            }
        };

        const loadAppData = async () => {
            const storage = window.WebApp?.DeviceStorage;

            const timeoutId = setTimeout(() => {
                if (!isStorageLoaded) {
                    applyFallbackData();
                    finalizeLoading();
                }
            }, 500);

            if (storage) {
                storage.getItem('user_zodiac_index', (err: Error | null, zodiacIdx: string | null) => {
                    if (!err && zodiacIdx !== null) {
                        const idx = parseInt(zodiacIdx, 10);
                        setSelectedZodiac(ZODIAC_NAMES[idx] || "Скорпион");
                        setIsSetupDone(true);
                    } else {
                        const localIdx = localStorage.getItem('user_zodiac_index');
                        if (localIdx) {
                            setSelectedZodiac(ZODIAC_NAMES[parseInt(localIdx, 10)] || "Скорпион");
                            setIsSetupDone(true);
                        }
                    }

                    storage.getItem('love_rhythm_accepted_v1', (err2: Error | null, accepted: string | null) => {
                        clearTimeout(timeoutId);
                        if (!err2 && accepted === 'true') {
                            setHasAccepted(true);
                        } else {
                            setHasAccepted(localStorage.getItem('love_rhythm_accepted_v1') === 'true');
                        }
                        finalizeLoading();
                    });
                });
            } else {
                clearTimeout(timeoutId);
                applyFallbackData();
                finalizeLoading();
            }
        };

        void loadAppData();
        return () => { isMounted = false; };
    }, [isStorageLoaded, applyFallbackData]);

    const handleZodiacSelect = (index: number) => {
        const name = ZODIAC_NAMES[index];
        const indexStr = index.toString();

        localStorage.setItem('user_zodiac_index', indexStr);
        if (window.WebApp?.DeviceStorage) {
            window.WebApp.DeviceStorage.setItem('user_zodiac_index', indexStr);
        }
        if (window.WebApp?.HapticFeedback) {
            void window.WebApp.HapticFeedback.impactOccurred('medium');
        }

        setSelectedZodiac(name);
        setIsSetupDone(true);
    };

    const handleAcceptConditions = () => {
        localStorage.setItem('love_rhythm_accepted_v1', 'true');
        if (window.WebApp?.DeviceStorage) {
            window.WebApp.DeviceStorage.setItem('love_rhythm_accepted_v1', 'true');
        }
        setHasAccepted(true);
    };

    if (isDesktop) return <DesktopStub />;

    if (!isStorageLoaded) {
        return <div className="h-screen bg-[#050510]" />;
    }

    return (
        <div className="h-screen bg-[#050510] text-white font-manrope flex flex-col overflow-hidden relative">
            <div
                className={`fixed inset-0 z-[9999] bg-[#050510] transition-opacity duration-1000 pointer-events-none ${
                    isOverlayVisible ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {!hasAccepted && (
                <WelcomeScreen
                    onAccept={handleAcceptConditions}
                    onOpenPrivacy={() => setActiveLegalDoc('privacy')}
                    onOpenTerms={() => setActiveLegalDoc('terms')}
                />
            )}

            {hasAccepted && !isSetupDone && (
                <div className="fixed inset-0 z-[3000] bg-[#050510]">
                    <ZodiacModal
                        isOpen={true}
                        onClose={() => {}}
                        onSelect={handleZodiacSelect}
                        currentIndex={null}
                        isFirstLaunch={true}
                    />
                </div>
            )}

            {activeLegalDoc === 'privacy' && <PrivacyPolicy onBack={() => setActiveLegalDoc(null)} />}
            {activeLegalDoc === 'terms' && <TermsOfService onBack={() => setActiveLegalDoc(null)} />}

            <div className={`flex flex-col h-full transition-opacity duration-700 ${(!hasAccepted || !isSetupDone) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <Header
                    onZodiacChange={(newName) => {
                        const index = ZODIAC_NAMES.indexOf(newName);
                        if (index !== -1) {
                            handleZodiacSelect(index);
                        }
                    }}
                    currentZodiacName={selectedZodiac}
                />

                <div className="flex-1 relative overflow-hidden">
                    <PageLayout className="h-full">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-6 h-full">
                            {activeTab === 'rhythm' && <RhythmContainer zodiacName={selectedZodiac} />}
                            {activeTab === 'love' && <LoveContainer zodiacName={selectedZodiac} />}
                            {activeTab === 'beauty' && <BeautyContainer zodiacName={selectedZodiac} />}
                        </div>
                    </PageLayout>
                </div>

                <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
        </div>
    );
};

export default App;