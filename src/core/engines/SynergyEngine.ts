import { ZODIAC_ELEMENTS } from '../constants/astro.ts';
import { LunarEngine } from './LunarEngine.ts';

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

const ZODIAC_ORDER = ["Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева", "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"];

export interface SynergyResult {
    sign: string;
    icon: string;
    percent: number;
    description: string;
}

export const SynergyEngine = {
    /**
     * Генерирует стабильный seed для пары знаков на текущие сутки
     */
    getPairSeed(sign1: string, sign2: string): number {
        const date = new Date().toISOString().slice(0, 10);
        const pair = [sign1, sign2].sort().join("");
        const str = date + pair;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    },

    /**
     * Текстовое описание на основе итогового процента
     */
    getDescription(percent: number): string {
        if (percent >= 93) return "Абсолютный резонанс";
        if (percent >= 87) return "Взрывная химия";
        if (percent >= 80) return "Кармическая сцепка";
        if (percent >= 73) return "Высокое притяжение";
        if (percent >= 65) return "Сильный коннект";
        return "Хороший потенциал";
    },

    /**
     * Рассчитывает совместимость, объединяя натальную карту и транзит Луны
     */
    calculateAllMatches(userSign: string): SynergyResult[] {
        const userElement = ZODIAC_ELEMENTS[userSign];
        const userQuality = ZODIAC_QUALITIES[userSign];

        // Данные из LunarEngine
        const today = new Date();
        const moonData = LunarEngine.getMoonZodiac(today);
        const moonSign = moonData.name;
        const moonElement = ZODIAC_ELEMENTS[moonSign];

        return ZODIAC_ORDER
            .filter(s => s !== userSign)
            .map(targetSign => {
                const targetElement = ZODIAC_ELEMENTS[targetSign];
                const targetQuality = ZODIAC_QUALITIES[targetSign];
                const pairSeed = this.getPairSeed(userSign, targetSign);

                let score = 50;

                // 1. НАТАЛЬНАЯ БАЗА
                if (userElement === targetElement) {
                    score += 32; // Трин (одна стихия)
                } else if (
                    (userElement === 'fire' && targetElement === 'air') ||
                    (userElement === 'air' && targetElement === 'fire') ||
                    (userElement === 'earth' && targetElement === 'water') ||
                    (userElement === 'water' && targetElement === 'earth')
                ) {
                    score += 20; // Секстиль (дружественные)
                }

                // Оппозиция (притяжение противоположностей)
                const dist = Math.abs(ZODIAC_ORDER.indexOf(userSign) - ZODIAC_ORDER.indexOf(targetSign));
                if (dist === 6) score += 13;

                // Конфликт крестов (квадратуры)
                if (userQuality === targetQuality && dist !== 6) {
                    score -= 10;
                }

                // 2. ВЛИЯНИЕ ЛУНЫ (Транзит)
                if (targetElement === moonElement) score += 12; // Луна в стихии партнёра
                if (targetSign === moonSign) score += 8;       // Луна именно в знаке партнёра

                // Луна в дружественной стихии для пользователя (общий вайб дня)
                if (
                    (userElement === 'fire' && moonElement === 'air') ||
                    (userElement === 'air' && moonElement === 'fire') ||
                    (userElement === 'earth' && moonElement === 'water') ||
                    (userElement === 'water' && moonElement === 'earth')
                ) {
                    score += 5;
                }

                // 3. ХАОС ДНЯ (±13%)
                const chaos = (pairSeed % 27) - 13;
                score += chaos;

                const percent = Math.min(98, Math.max(40, Math.round(score)));

                return {
                    sign: targetSign,
                    icon: ZODIAC_ICONS[targetSign],
                    percent,
                    description: this.getDescription(percent)
                };
            })
            .sort((a, b) => b.percent - a.percent);
    },

    /**
     * Возвращает лучший мэтч дня
     */
    calculateDailyMatch(userSign: string): SynergyResult {
        return this.calculateAllMatches(userSign)[0];
    }
};