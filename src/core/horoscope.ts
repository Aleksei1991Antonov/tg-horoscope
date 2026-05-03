import { findExactPhaseMoment } from './astro';

export interface AstroEvent {
    date: Date;
    title: string;
    desc: string;
    type: 'moon' | 'planet' | 'energy';
}

export function calculateUpcomingEvents(baseDate: Date): AstroEvent[] {
    const events: AstroEvent[] = [];

    // Создаем дату для поиска: если сегодня конец месяца, берем следующий
    // Это предотвращает "промах" мимо событий начала месяца
    const searchDate = new Date(baseDate);
    if (searchDate.getDate() > 20) {
        searchDate.setMonth(searchDate.getMonth() + 1);
        searchDate.setDate(1);
    }

    const fullMoon = findExactPhaseMoment(searchDate, 0.5);
    const newMoon = findExactPhaseMoment(searchDate, 0.0);

    events.push({
        date: fullMoon,
        title: getFullMoonName(fullMoon),
        desc: `Точная фаза в ${fullMoon.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        })} по вашему времени.`,
        type: 'moon'
    });

    events.push({
        date: newMoon,
        title: "Новолуние",
        desc: `Точная фаза в ${newMoon.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        })}. Начало нового цикла.`,
        type: 'moon'
    });

    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getFullMoonName(date: Date): string {
    const names = [
        "Волчья Луна", "Снежная Луна", "Червячная Луна", "Розовая Луна",
        "Цветочная Луна", "Клубничная Луна", "Оленья Луна", "Осетровая Луна",
        "Урожайная Луна", "Охотничья Луна", "Бобровая Луна", "Холодная Луна"
    ];
    return `Полнолуние (${names[date.getMonth()]})`;
}