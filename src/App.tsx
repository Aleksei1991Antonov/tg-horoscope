import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { PageLayout } from './components/layout/PageLayout';
import { HeaderContainer as Header } from './components/layout/Header/HeaderContainer';

// Импортируем контейнеры экранов
import { RhythmContainer } from './screens/Rhythm/RhythmContainer';
import { LoveContainer } from './screens/Love/LoveContainer';
import { BeautyContainer } from './screens/Beauty/BeautyContainer';
import { CalendarContainer } from './screens/Calendar/CalendarContainer';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rhythm');

    // Глобальное состояние знака зодиака (по умолчанию Скорпион или берем из памяти позже)
    const [selectedZodiac, setSelectedZodiac] = useState<string>("Скорпион");

    const renderScreen = () => {
        switch (activeTab) {
            // Передаем выбранный знак в каждый контейнер
            case 'rhythm': return <RhythmContainer zodiacName={selectedZodiac} />;
            case 'love': return <LoveContainer zodiacName={selectedZodiac} />;
            case 'beauty': return <BeautyContainer zodiacName={selectedZodiac} />;
            case 'calendar': return <CalendarContainer zodiacName={selectedZodiac} />;
            default: return <RhythmContainer zodiacName={selectedZodiac} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#050510] text-white font-manrope selection:bg-fuchsia-500/30">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-fuchsia-600/15 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[60%] h-[40%] bg-indigo-600/15 blur-[120px] rounded-full" />
            </div>

            {/* Передаем функцию обратного вызова в Хедер */}
            <Header onZodiacChange={setSelectedZodiac} />

            <PageLayout>
                <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {renderScreen()}
                </div>
            </PageLayout>

            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default App;