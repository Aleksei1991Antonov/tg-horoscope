import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { PageLayout } from './components/layout/PageLayout';
import { HeaderContainer as Header } from './components/layout/Header/HeaderContainer';
import { WelcomeScreen } from './components/Welcome/WelcomeScreen';
import { PrivacyPolicy } from './components/layout/Header/Menu/Legal/PrivacyPolicy';
import { TermsOfService } from './components/layout/Header/Menu/Legal/TermsOfService';

// Импортируем контейнеры экранов
import { RhythmContainer } from './screens/Rhythm/RhythmContainer';
import { LoveContainer } from './screens/Love/LoveContainer';
import { BeautyContainer } from './screens/Beauty/BeautyContainer';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rhythm');
    const [selectedZodiac, setSelectedZodiac] = useState<string>("Скорпион");

    // Инициализируем состояние сразу из localStorage, чтобы избежать useEffect
    const [hasAccepted, setHasAccepted] = useState<boolean>(() => {
        const savedStatus = localStorage.getItem('love_rhythm_accepted_v1');
        return savedStatus === 'true';
    });

    // Состояние для открытия документов поверх приветствия
    const [activeLegalDoc, setActiveLegalDoc] = useState<'privacy' | 'terms' | null>(null);

    const handleAccept = () => {
        localStorage.setItem('love_rhythm_accepted_v1', 'true');
        setHasAccepted(true);
    };

    const renderScreen = () => {
        switch (activeTab) {
            case 'rhythm':
                return <RhythmContainer zodiacName={selectedZodiac} />;
            case 'love':
                return <LoveContainer zodiacName={selectedZodiac} />;
            case 'beauty':
                return <BeautyContainer zodiacName={selectedZodiac} />;
            default:
                return <RhythmContainer zodiacName={selectedZodiac} />;
        }
    };

    return (
        <div className="h-screen bg-[#050510] text-white font-manrope selection:bg-fuchsia-500/30 flex flex-col overflow-hidden">

            {/* Экраны приветствия и документов */}
            {!hasAccepted && (
                <WelcomeScreen
                    onAccept={handleAccept}
                    onOpenPrivacy={() => setActiveLegalDoc('privacy')}
                    onOpenTerms={() => setActiveLegalDoc('terms')}
                />
            )}

            {/* Модальные окна документов */}
            {activeLegalDoc === 'privacy' && (
                <div className="z-[4000] fixed inset-0">
                    <PrivacyPolicy onBack={() => setActiveLegalDoc(null)} />
                </div>
            )}
            {activeLegalDoc === 'terms' && (
                <div className="z-[4000] fixed inset-0">
                    <TermsOfService onBack={() => setActiveLegalDoc(null)} />
                </div>
            )}

            {/* Основной контент приложения */}
            <div className={`flex flex-col h-full transition-opacity duration-700 ${!hasAccepted ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {/* Фоновые свечения */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-fuchsia-600/15 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[10%] right-[-5%] w-[60%] h-[40%] bg-indigo-600/15 blur-[120px] rounded-full" />
                </div>

                {/* 1. Шапка */}
                <Header onZodiacChange={setSelectedZodiac} />

                {/* 2. Контентная область */}
                <div className="flex-1 relative overflow-hidden">
                    <PageLayout className="h-full">
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-6">
                            {renderScreen()}
                        </div>
                    </PageLayout>
                </div>

                {/* 3. Навигация */}
                <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
        </div>
    );
};

export default App;