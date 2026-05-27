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
}

const PLANET_ACTIONS: Record<string, string> = {
    "Солнце": "Время брать инициативу — твоя уверенность заразительна",
    "Луна": "Прислушайся к себе: медитация, дневник, тишина дадут ответы",
    "Марс": "Действуй смело — спорт, резкие шаги, прорыв в делах",
    "Меркурий": "Говори, пиши, договаривайся — слова сейчас твой инструмент",
    "Юпитер": "Смотри шире — новые возможности приходят через масштаб",
    "Венера": "Красота, тепло, близкие — наполни день тем, что согревает",
    "Сатурн": "Структура и терпение — соберись и сделай шаг к цели"
};

export const PowerHourEngine = {
    calculate(sign: string): PowerHourMetrics {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const dayOfWeek = now.getDay();

        const masterPlanet = ZODIAC_MASTERS[sign] || "Солнце";
        const firstPlanet = DAY_MASTERS[dayOfWeek];
        const startIndex = CHALDEAN_ORDER.indexOf(firstPlanet);

        // 1. Сетка планетарных часов (упрощенная 60-минутная модель)
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

        if (targetHour === undefined) {
            targetHour = powerHours[0]; // Завтра
        } else if (targetHour === currentHour) {
            isLive = true;
        }

        // 3. Интеграция с новым LunarEngine
        const lunarData = LunarEngine.getLunarData(now);
        const moonZodiac = LunarEngine.getMoonZodiac(now);

        let luckyPercent = isLive ? 82 : 48;

        // ИСПРАВЛЕНО: illumination теперь 0...1 (например 0.41)
        // (0.41 - 0.5) * 18 даст корректную поправку ±9%
        luckyPercent += (lunarData.illumination - 0.5) * 18;

        if (moonZodiac.name === sign) {
            luckyPercent += 14;
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            luckyPercent += 7;
        }

        // ИСПРАВЛЕНО: сравнение с 0.65 вместо 65
        if (masterPlanet === "Луна" && lunarData.illumination > 0.65) {
            luckyPercent += 9;
        }

        // 4. Расчет времени до начала
        let minutesToNext: number;
        if (isLive) {
            minutesToNext = 60 - currentMinutes;
        } else {
            let diff = targetHour - currentHour;
            if (diff < 0) diff += 24;
            minutesToNext = (diff * 60) - currentMinutes;
        }

        // 5. Лунный вайб (ИСПРАВЛЕНО сравнение с 0.85 и 0.20)
        let lunarVibe = "Сегодня без ярких астровлияний — ровный, спокойный фон";
        if (moonZodiac.name === sign) {
            lunarVibe = "Луна в твоём знаке — интуиция и эмоции на максимуме";
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            lunarVibe = "Луна в твоей стихии — хороший внутренний резонанс и чуткость";
        } else if (lunarData.illumination > 0.85) {
            lunarVibe = "Луна почти полная — энергия на подъёме, эмоции ярче";
        } else if (lunarData.illumination < 0.20) {
            lunarVibe = "Луна на спаде — время тишины и восстановления";
        }

        return {
            luckyHour: `${targetHour.toString().padStart(2, '0')}:00`,
            luckyPercent: Math.min(98, Math.max(15, Math.round(luckyPercent))),
            masterPlanet,
            isLive,
            actionType: PLANET_ACTIONS[masterPlanet] || "Гармонизация",
            minutesToNext: Math.max(0, minutesToNext),
            lunarVibe
        };
    },

    getFallback(masterPlanet: string): PowerHourMetrics {
        return {
            luckyHour: "12:00",
            luckyPercent: 50,
            masterPlanet,
            isLive: false,
            actionType: PLANET_ACTIONS[masterPlanet] || "Гармонизация",
            minutesToNext: 0,
            lunarVibe: "Ожидание планетарного цикла"
        };
    }
};
