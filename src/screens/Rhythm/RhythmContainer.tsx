import React, { useMemo } from 'react';
import { RhythmView } from './RhythmView';

export const RhythmContainer: React.FC = () => {
    const data = useMemo(() => {
        return {
            userName: "Алексей",
            prediction: "Сегодня Луна в тригоне с Марсом, что дает вам мощный приток физической энергии. Идеальное время для завершения старых дел.",
            // Добавляем недостающие поля, которые требует RhythmView
            luckyHour: "19:45",
            luckyPercent: 94,
            synergyZodiac: {
                sign: "♌",
                name: "Лев",
                percent: 88
            },
            rhythms: [
                { label: "Физический", value: 85, status: "Пик активности", color: "#ef4444" },
                { label: "Эмоциональный", value: 42, status: "Стабильно", color: "#ec4899" },
                { label: "Интеллектуальный", value: 91, status: "Высокая концентрация", color: "#3b82f6" }
            ]
        };
    }, []);

    return <RhythmView {...data} />;
};