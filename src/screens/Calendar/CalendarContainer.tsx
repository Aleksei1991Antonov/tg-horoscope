import React from 'react';
import { CalendarView } from './CalendarView';

// Добавляем интерфейс для пропсов
interface CalendarContainerProps {
    zodiacName: string;
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({ zodiacName }) => {
    // В реальном приложении здесь будет логика получения фаз луны и удачных дней
    // Сейчас передаем zodiacName и заглушки для остальных данных
    return (
        <CalendarView
            zodiacName={zodiacName}
            currentMonth={'Май'}
            moonPhase={'Растущая'}
            moonPhaseName={'Первая четверть'}
            luckyDays={[7, 12, 18, 25]}
        />
    );
};