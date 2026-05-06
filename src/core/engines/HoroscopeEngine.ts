import { LunarEngine } from './LunarEngine';
import {
    LUNAR_DAY_ATMOSPHERE,
    MOON_ZODIAC_VECTOR,
    ELEMENT_ADVICE,
    PERSONAL_RESONANCE
} from '../constants/lunarInterpretations';

export type ZodiacSign = "Овен" | "Телец" | "Близнецы" | "Рак" | "Лев" | "Дева" | "Весы" | "Скорпион" | "Стрелец" | "Козерог" | "Водолей" | "Рыбы";

const ZODIAC_ORDER: ZodiacSign[] = [
    "Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева",
    "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"
];

const ELEMENTS_MAP: Record<string, string> = {
    "Овен": "Fire", "Лев": "Fire", "Стрелец": "Fire",
    "Телец": "Earth", "Дева": "Earth", "Козерог": "Earth",
    "Близнецы": "Air", "Весы": "Air", "Водолей": "Air",
    "Рак": "Water", "Скорпион": "Water", "Рыбы": "Water"
};

export class HoroscopeEngine {
    static generateDailyForecast(userSign: string): string {
        const date = new Date();
        const lunarData = LunarEngine.getLunarData(date);
        const moonZodiac = LunarEngine.getMoonZodiac(date);
        const dateKey = date.getDate() + date.getMonth() + date.getFullYear();

        // 1. Личный резонанс (Аспект)
        const userIdx = ZODIAC_ORDER.indexOf(userSign as ZodiacSign);
        const moonIdx = ZODIAC_ORDER.indexOf(moonZodiac.name as ZodiacSign);
        let aspectKey = "neutral";
        if (userIdx !== -1) {
            const diff = Math.abs(userIdx - moonIdx);
            const distance = diff > 6 ? 12 - diff : diff;
            if (distance === 0) aspectKey = "conjunction";
            else if (distance === 4) aspectKey = "trine";
            else if (distance === 3) aspectKey = "square";
            else if (distance === 6) aspectKey = "opposition";
        }
        const resonanceOptions = PERSONAL_RESONANCE[aspectKey];
        const personalResonance = resonanceOptions[dateKey % resonanceOptions.length];

        // 2. Атмосфера дня
        const atmosphere = LUNAR_DAY_ATMOSPHERE[lunarData.age] || LUNAR_DAY_ATMOSPHERE[0];

        // 3. Вектор
        const vector = MOON_ZODIAC_VECTOR[moonZodiac.name] || "";

        // 4. Стихийный совет
        const moonElement = ELEMENTS_MAP[moonZodiac.name] || "Fire";
        const elementAdvices = ELEMENT_ADVICE[moonElement];
        const elementAdvice = elementAdvices[dateKey % elementAdvices.length];

        // СБОРКА УЛЬТРА-ТЕКСТА
        // Используем перенос строки для красоты в модальном окне
        return `✨ ${personalResonance}\n\n` +
            `🌙 ${atmosphere}\n\n` +
            `🎯 ${vector}\n\n` +
            `💡 ${elementAdvice}`;
    }
}