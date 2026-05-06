/**
 * CORE ENGINE: True Synergy
 * Рассчитывает реальную астрологическую совместимость.
 */

import { ZODIAC_ELEMENTS } from '../constants/astro.ts';

// Качества знаков (Кресты) для более точного расчета
const ZODIAC_QUALITIES: Record<string, string> = {
    "Овен": "cardinal", "Рак": "cardinal", "Весы": "cardinal", "Козерог": "cardinal",
    "Телец": "fixed", "Лев": "fixed", "Скорпион": "fixed", "Водолей": "fixed",
    "Близнецы": "mutable", "Дева": "mutable", "Стрелец": "mutable", "Рыбы": "mutable"
};

const ZODIAC_ICONS: Record<string, string> = {
    "Овен": "♈", "Телец": "♉", "Близнецы": "♊", "Рак": "♋",
    "Лев": "♌", "Дева": "♍", "Весы": "♎", "Скорпион": "♏",
    "Стрелец": "♐", "Козерог": "♑", "Водолей": "♒", "Рыбы": "♓"
};

export const SynergyEngine = {
    /**
     * Стабильный рандом для ежедневных колебаний (±5%)
     */
    getDaySeed(userSign: string): number {
        const dateStr = new Date().toISOString().slice(0, 10);
        let hash = 0;
        const str = dateStr + userSign;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return (Math.abs(hash) % 100) / 100;
    },

    calculateDailyMatch(userSign: string): { sign: string; icon: string; percent: number; description: string } {
        const allSigns = Object.keys(ZODIAC_ELEMENTS);
        const userElement = ZODIAC_ELEMENTS[userSign];
        const userQuality = ZODIAC_QUALITIES[userSign];

        const dailyBonus = this.getDaySeed(userSign) * 5; // Небольшое ежедневное колебание

        const results = allSigns.filter(s => s !== userSign).map(targetSign => {
            const targetElement = ZODIAC_ELEMENTS[targetSign];
            const targetQuality = ZODIAC_QUALITIES[targetSign];

            let baseScore = 50;

            // 1. Проверка по стихиям (Тригоны)
            if (userElement === targetElement) {
                baseScore = 90; // Родственные души
            }
            // 2. Дружественные стихии
            else if (
                (userElement === 'fire' && targetElement === 'air') ||
                (userElement === 'air' && targetElement === 'fire') ||
                (userElement === 'earth' && targetElement === 'water') ||
                (userElement === 'water' && targetElement === 'earth')
            ) {
                baseScore = 80;
            }
            // 3. Конфликтные аспекты (Квадратуры одного качества)
            if (userQuality === targetQuality && userElement !== targetElement) {
                baseScore -= 20; // Сложные отношения
            }

            return {
                sign: targetSign,
                percent: Math.min(99, Math.round(baseScore + dailyBonus))
            };
        });

        // Находим лучшего
        const bestMatch = results.sort((a, b) => b.percent - a.percent)[0];

        // Подбираем описание в зависимости от процента
        let description = "Средний резонанс";
        if (bestMatch.percent >= 90) description = "Идеальная гармония стихий";
        else if (bestMatch.percent >= 75) description = "Высокое притяжение";

        return {
            sign: bestMatch.sign,
            icon: ZODIAC_ICONS[bestMatch.sign] || "✨",
            percent: bestMatch.percent,
            description
        };
    }
};