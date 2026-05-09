import React, { useState, useMemo, useEffect } from 'react';
import { LoveView } from './LoveView';
import { LoveEngine } from '../../core/engines/LoveEngine';

interface LoveContainerProps {
    zodiacName: string;
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

export const LoveContainer: React.FC<LoveContainerProps> = ({ zodiacName }) => {
    // 1. Пытаемся достать сохраненного партнера при первой загрузке
    const [partnerName, setPartnerName] = useState<string | undefined>(() => {
        return localStorage.getItem('user_partner_choice') || undefined;
    });

    const [isSelecting, setIsSelecting] = useState(false);

    // 2. Сохраняем выбор в память, когда он меняется
    useEffect(() => {
        if (partnerName) {
            localStorage.setItem('user_partner_choice', partnerName);
        }
    }, [partnerName]);

    const data = useMemo(() => {
        const weeklyForecast = LoveEngine.getWeeklyForecast(zodiacName, partnerName);
        const synergyPercent = partnerName
            ? LoveEngine.getBaseSynergy(zodiacName, partnerName)
            : 0;

        return { weeklyForecast, synergyPercent };
    }, [zodiacName, partnerName]);

    const handleSelectPartner = (name: string) => {
        setPartnerName(name);
        setIsSelecting(false);
    };

    return (
        <div className="relative w-full h-full">
            <LoveView
                userZodiac={ZODIAC_EMOJI[zodiacName] || zodiacName}
                partnerZodiac={partnerName ? ZODIAC_EMOJI[partnerName] : undefined}
                synergyPercent={data.synergyPercent}
                weeklyForecast={data.weeklyForecast}
                onSelectPartner={() => setIsSelecting(true)}
            />

            {/* Модалка выбора партнера */}
            {isSelecting && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-[#050510]/90 backdrop-blur-md"
                        onClick={() => setIsSelecting(false)}
                    />
                    <div className="relative w-full max-w-md bg-white/[0.05] border border-white/10 rounded-[32px] p-6 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-bottom-10">
                        <h3 className="text-center text-xs font-black uppercase tracking-[0.3em] text-pink-400 mb-6">Выберите знак партнера</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {ALL_ZODIAC.map(name => (
                                <button
                                    key={name}
                                    onClick={() => handleSelectPartner(name)}
                                    className="flex flex-col items-center gap-1 p-2 rounded-2xl hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-2xl">{ZODIAC_EMOJI[name]}</span>
                                    <span className="text-[8px] font-bold opacity-40 uppercase">{name}</span>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsSelecting(false)}
                            className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/20"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};