import React, { useState } from 'react';
import { Navigation } from './components/layout/Navigation';
import { PageLayout } from './components/layout/PageLayout';
import { HeaderContainer as Header } from './components/layout/Header/HeaderContainer';
// Импортируем все контейнеры
import { RhythmContainer } from './screens/Rhythm/RhythmContainer';
import { LoveContainer } from './screens/Love/LoveContainer';
import { BeautyContainer } from './screens/Beauty/BeautyContainer';
import { CalendarContainer } from './screens/Calendar/CalendarContainer';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('rhythm');

    // Ключ 'name' заменен на 'userName', чтобы соответствовать HeaderProps
    const user = {
        userName: "Алексей",
        zodiacSign: "♋",
        zodiacName: "Рак"
    };

    const renderScreen = () => {
        switch (activeTab) {
            case 'rhythm': return <RhythmContainer />;
            case 'love': return <LoveContainer />;
            case 'beauty': return <BeautyContainer />;
            case 'calendar': return <CalendarContainer />;
            default: return <RhythmContainer />;
        }
    };

    return (
        <div className="min-h-screen bg-[var(--max-ui-bg-primary)] text-[var(--max-ui-text-primary)]">
            {/* Теперь {...user} передаст userName корректно */}
            <Header {...user} />

            <PageLayout>
                {renderScreen()}
            </PageLayout>

            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default App;