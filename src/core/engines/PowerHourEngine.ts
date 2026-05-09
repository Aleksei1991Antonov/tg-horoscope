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
    "Солнце": "Проявление воли и лидерство",
    "Луна": "Интуиция и внутренний покой",
    "Марс": "Активное действие и спорт",
    "Меркурий": "Переговоры, коммуникация и обучение",
    "Юпитер": "Масштабирование и удача",
    "Венера": "Творчество, отношения и удовольствие",
    "Сатурн": "Дисциплина и планирование"
};

export const PowerHourEngine = {
    /**
     * Основной расчет Часа Силы
     */
    calculate(sign: string): PowerHourMetrics {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        const dayOfWeek = now.getDay();

        const masterPlanet = ZODIAC_MASTERS[sign] || "Солнце";
        const firstPlanet = DAY_MASTERS[dayOfWeek];
        const startIndex = CHALDEAN_ORDER.indexOf(firstPlanet);

        // 1. Строим сетку планетарных часов (24 часа)
        const dayGrid = Array.from({ length: 24 }, (_, i) =>
            CHALDEAN_ORDER[(startIndex + i) % 7]
        );

        // 2. Находим все часы, управляемые планетой знака
        const powerHours = dayGrid
            .map((planet, hour) => planet === masterPlanet ? hour : -1)
            .filter(h => h !== -1);

        if (powerHours.length === 0) return this.getFallback(masterPlanet);

        // 3. Определяем целевой час (текущий или следующий)
        let targetHour = powerHours.find(h => h >= currentHour);
        let isLive = false;

        if (targetHour === undefined) {
            targetHour = powerHours[0]; // Если сегодня прошли, берем первый завтрашний
        } else if (targetHour === currentHour) {
            isLive = true;
        }

        // 4. ИНТЕГРАЦИЯ С LUNAR ENGINE
        const lunarData = LunarEngine.getLunarData(now);
        const moonZodiac = LunarEngine.getMoonZodiac(now);

        let luckyPercent = isLive ? 82 : 48;

        // Влияние фазы (амплитуда ±9%)
        luckyPercent += (lunarData.illumination - 50) * 0.18;

        // Бонусы резонанса
        if (moonZodiac.name === sign) {
            luckyPercent += 14; // Луна в знаке пользователя
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            luckyPercent += 7; // Луна в той же стихии
        }

        // Специальный бонус для "лунных" знаков (Рак)
        if (masterPlanet === "Луна" && lunarData.illumination > 65) {
            luckyPercent += 9;
        }

        // 5. Расчет минут до события (Исправлено для ESLint)
        let minutesToNext: number;
        if (isLive) {
            minutesToNext = 60 - currentMinutes;
        } else {
            let diff = targetHour - currentHour;
            if (diff < 0) diff += 24;
            minutesToNext = (diff * 60) - currentMinutes;
        }

        // 6. Формируем Лунное описание (Vibe)
        let lunarVibe = "Нейтральный фон";
        if (moonZodiac.name === sign) {
            lunarVibe = "Луна в твоём знаке — максимальная сила";
        } else if (ZODIAC_ELEMENTS[moonZodiac.name] === ZODIAC_ELEMENTS[sign]) {
            lunarVibe = "Луна в твоей стихии — хороший резонанс";
        } else if (lunarData.illumination > 85) {
            lunarVibe = "Пик лунной энергии";
        } else if (lunarData.illumination < 20) {
            lunarVibe = "Луна на спаде";
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

    /**
     * Запасной вариант на случай ошибок данных
     */
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