/**
 * CORE ENGINE: PowerHour
 * VERSION: 1.1
 * DESCRIPTION: Расширенный расчет Часа Силы с таймингом и типами активностей.
 */

import { ZODIAC_MASTERS, CHALDEAN_ORDER, DAY_MASTERS } from '../constants/astro';

export interface PowerHourMetrics {
    luckyHour: string;       // ЧЧ:ММ начала
    luckyPercent: number;    // 0-100%
    masterPlanet: string;    // Планета-управитель
    isLive: boolean;         // Идет ли час сейчас
    actionType: string;      // Рекомендация (Власть, Любовь, Интеллект...)
    minutesToNext: number;   // Сколько минут до начала/конца
}

// Справочник энергий планет
const PLANET_ACTIONS: Record<string, string> = {
    "Солнце": "Проявление воли и лидерство",
    "Луна": "Интуиция и внутренний покой",
    "Марс": "Активное действие и спорт",
    "Меркурий": "Переговоры и обучение",
    "Юпитер": "Масштабирование и удача",
    "Венера": "Творчество и созидание",
    "Сатурн": "Дисциплина и планирование"
};

export const PowerHourEngine = {
    calculate(sign: string): PowerHourMetrics {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const dayOfWeek = now.getDay();

        const masterPlanet = ZODIAC_MASTERS[sign] || "Солнце";

        // Сетка планет на сегодня
        const firstPlanet = DAY_MASTERS[dayOfWeek];
        const startIndex = CHALDEAN_ORDER.indexOf(firstPlanet);
        const dayGrid = Array.from({ length: 24 }, (_, i) => CHALDEAN_ORDER[(startIndex + i) % 7]);

        // Поиск всех часов силы
        const powerHours = dayGrid
            .map((p, h) => (p === masterPlanet ? h : -1))
            .filter(h => h !== -1);

        // Находим текущий или следующий час
        let targetHour = powerHours.find(h => h >= currentHour);
        let isLive = targetHour === currentHour;

        // Если на сегодня часы закончились, берем первый час завтрашнего дня (упрощенно)
        if (targetHour === undefined) {
            targetHour = powerHours[0];
            isLive = false;
        }

        // Расчет минут до события
        let minutesToNext = 0;
        if (isLive) {
            minutesToNext = 60 - currentMinutes; // До конца часа
        } else {
            const diffHours = targetHour > currentHour
                ? targetHour - currentHour
                : (24 - currentHour) + targetHour;
            minutesToNext = (diffHours * 60) - currentMinutes;
        }

        // Расчет интенсивности (плавное нарастание)
        const diff = Math.abs(currentHour - targetHour);
        const luckyPercent = isLive ? 100 : Math.max(10, 100 - (diff * 10));

        return {
            luckyHour: `${targetHour.toString().padStart(2, '0')}:00`,
            luckyPercent,
            masterPlanet,
            isLive,
            actionType: PLANET_ACTIONS[masterPlanet] || "Гармонизация",
            minutesToNext
        };
    }
};