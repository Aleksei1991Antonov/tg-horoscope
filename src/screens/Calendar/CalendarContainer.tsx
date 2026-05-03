import React from 'react';
import { CalendarView } from './CalendarView';

export const CalendarContainer: React.FC = () => {
    return <CalendarView zodiacName={''} currentMonth={''} moonPhase={''} moonPhaseName={''} luckyDays={[]} />;
};