import { ZODIAC_MASTERS, CHALDEAN_ORDER, DAY_MASTERS, ZODIAC_ELEMENTS } from '../constants/astro';
import { LunarEngine } from './LunarEngine';

export interface PowerHourMetrics {
    luckyHour: string;
    luckyPercent: number;
    masterPlanet: string;
    isLive: boolean;
    actionType: string;
    minutesToNext: number;
    lunarVibe: string;
    allPowerHours: string[];
}

const PLANET_ACTIONS: Record<string, string> = {
    "Солнце": "Время для проявления своего 'Я'. Твоя уверенность сейчас — твой главный союзник.",
    "Луна": "Час интуиции. Прислушайся к внутреннему голосу, он подскажет верное направление.",
    "Марс": "Энергия действия. Хороший момент для решительного шага или физической активности.",
    "Меркурий": "Сила слова. Идеально для важных звонков, писем или обучения.",
    "Юпитер": "Час расширения. Мир готов дать тебе чуть больше, чем обычно. Будь открыта.",
    "Венера": "Гармония и красота. Время для приятных встреч, заботы о себе и любви.",
    "Сатурн": "Мудрость структуры. Хорошо для планирования и завершения старых дел."
};

export const PowerHourEngine = {
    calculate(sign: string, inputDate?: Date): PowerHourMetrics {
        const now = inputDate || new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const dayOfWeek = now.getDay();

        const masterPlanet = ZODIAC_MASTERS[sign] || "Солнце";
        const firstPlanet = DAY_MASTERS[dayOfWeek];
        const startIndex = CHALDEAN_ORDER.indexOf(firstPlanet);

        // 1. Сетка планетарных часов
        const dayGrid = Array.from({ length: 24 }, (_, i) =>
            CHALDEAN_ORDER[(startIndex + i) % 7]
        );

        const powerHours = dayGrid
            .map((planet, hour) => planet === masterPlanet ? hour : -1)
            .filter(h => h !== -1);

        if (powerHours.length === 0) return this.getFallback(masterPlanet);

        // 2. Поиск целевого часа
        let targetHour = powerHours.find(h => h >= currentHour);
        let isLive = false;
        let isTomorrow = false;

        if (targetHour === undefined) {
            targetHour = powerHours[0];
            isTomorrow = true;
        } else if (targetHour === currentHour) {
            isLive = true;
        }

        // 3. Расчет процентов (УЛУЧШЕНО: высокие базовые значения)
        const lunarData = LunarEngine.getLunarData(now);
        const moonZodiac = LunarEngine.getMoonZodiac(now);

        // База: 88% если идет сейчас, 68% если ожидается
        let luckyPercent = isLive ? 88 : 68;

        // Небольшая динамика от минут (±2%), чтобы цифра была "живой"
        luckyPercent += Math.sin(currentMinutes / 10) * 2;

        // Поправка на Луну (±5%)
        luckyPercent += (lunarData.illumination - 0.5) * 10;

        // Бонусы за совпадение знака или стихии
        if (moonZodiac.name === sign) {
            luckyPercent += 8;
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            luckyPercent += 4;
        }

        // 4. Расчет времени до начала/конца
        let minutesToNext: number;
        if (isLive) {
            minutesToNext = 60 - currentMinutes;
        } else {
            let diff = targetHour - currentHour;
            if (isTomorrow) diff += 24;
            minutesToNext = (diff * 60) - currentMinutes;
        }

        // 5. Лунный вайб
        let lunarVibe = "Сегодня день без резких лунных акцентов — время для спокойного движения вперед.";
        if (moonZodiac.name === sign) {
            lunarVibe = "Луна в твоём знаке — твоя интуиция сейчас на максимуме, доверяй себе.";
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            lunarVibe = "Луна в твоей стихии — ты в резонансе с миром, дела обещают быть успешными.";
        } else if (lunarData.illumination > 0.85) {
            lunarVibe = "Полнолуние близко — энергия зашкаливает, старайся направлять её в созидание.";
        } else if (lunarData.illumination < 0.15) {
            lunarVibe = "Луна убывает — время завершать начатое и очищать пространство вокруг себя.";
        }

        return {
            luckyHour: `${targetHour.toString().padStart(2, '0')}:00`,
            // Гарантируем, что минимум будет 60%, а максимум 99%
            luckyPercent: Math.min(99, Math.max(60, Math.round(luckyPercent))),
            masterPlanet,
            isLive,
            actionType: PLANET_ACTIONS[masterPlanet] || "Гармонизация",
            minutesToNext: Math.max(0, minutesToNext),
            lunarVibe,
            allPowerHours: powerHours.map(h => `${h.toString().padStart(2, '0')}:00`)
        };
    },

    getDayPeakPercent(sign: string, inputDate: Date): number {
        const lunarData = LunarEngine.getLunarData(inputDate);
        const moonZodiac = LunarEngine.getMoonZodiac(inputDate);
        let pct = 80;
        pct += (lunarData.illumination - 0.5) * 10;
        if (moonZodiac.name === sign) {
            pct += 8;
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            pct += 4;
        }
        return Math.min(99, Math.max(60, Math.round(pct)));
    },

    getFallback(masterPlanet: string): PowerHourMetrics {
        return {
            luckyHour: "12:00",
            luckyPercent: 75,
            masterPlanet,
            isLive: false,
            actionType: "Настройка на планетарные ритмы",
            minutesToNext: 0,
            lunarVibe: "Синхронизация с небесными циклами...",
            allPowerHours: ["12:00"]
        };
    }
};