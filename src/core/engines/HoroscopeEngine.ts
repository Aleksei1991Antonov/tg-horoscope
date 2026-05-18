import { LunarEngine } from './LunarEngine';
import { ELEMENT_ADVICE, PHASE_ADVICE } from '../constants/lunarInterpretations';

export type ZodiacSign = "Овен" | "Телец" | "Близнецы" | "Рак" | "Лев" | "Дева" | "Весы" | "Скорпион" | "Стрелец" | "Козерог" | "Водолей" | "Рыбы";

const ZODIAC_ORDER: ZodiacSign[] = [
    "Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева",
    "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"
];

export class HoroscopeEngine {

    private static getElement(sign: string): string {
        const fire = ["Овен", "Лев", "Стрелец"];
        const earth = ["Телец", "Дева", "Козерог"];
        const air = ["Близнецы", "Весы", "Водолей"];
        if (fire.includes(sign)) return "Fire";
        if (earth.includes(sign)) return "Earth";
        if (air.includes(sign)) return "Air";
        return "Water";
    }

    /**
     * Генерирует ежедневный персональный прогноз
     */
    static generateDailyForecast(userSign: string): string {
        const date = new Date();
        const lunar = LunarEngine.getLunarData(date);
        const moonZodiac = LunarEngine.getMoonZodiac(date).name as ZodiacSign;
        const userIdx = ZODIAC_ORDER.indexOf(userSign as ZodiacSign);
        const moonIdx = ZODIAC_ORDER.indexOf(moonZodiac);

        if (userIdx === -1) return "Знак не определён";

        // Seed для повторяемости в течение дня (уникальный для каждого знака)
        const seed = date.getDate() + userIdx + (date.getMonth() * 31);

        const diff = Math.abs(userIdx - moonIdx);
        const distance = diff > 6 ? 12 - diff : diff;

        // === Расчет энергии ===
        let personalBonus: number;
        switch (distance) {
            case 0: personalBonus = 28; break;  // Соединение
            case 4: personalBonus = 22; break;  // Трин
            case 2: personalBonus = 16; break;  // Секстиль
            case 6: personalBonus = -12; break; // Оппозиция
            case 3: personalBonus = -16; break; // Квадратура
            default: personalBonus = 5;
        }

        let intensity = Math.round((lunar.illumination * 0.5) + 42 + personalBonus);
        intensity = Math.max(15, Math.min(100, intensity));

        // === Определение статуса и иконки ===
        let status: string;
        let mainEmoji: string;

        if (intensity > 82) {
            mainEmoji = "✨";
            status = "Абсолютное сияние";
        } else if (intensity > 65) {
            mainEmoji = "💃";
            status = "Энергия расцвета";
        } else if (intensity > 45) {
            mainEmoji = "🌊";
            status = "Гармония потока";
        } else {
            mainEmoji = "☁️";
            status = "Время нежности"; // Вместо Режима накопления
        }


        // === Выбор контента ===

        // 1. Блок Стихии
        const element = this.getElement(userSign);
        const elementText = ELEMENT_ADVICE[element][seed % ELEMENT_ADVICE[element].length];

        // 2. Блок Фазы
        let phaseKey: string;
        if (lunar.phase < 0.03 || lunar.phase > 0.97) phaseKey = "Новолуние";
        else if (lunar.phase > 0.47 && lunar.phase < 0.53) phaseKey = "Полнолуние";
        else if (lunar.phase < 0.5) phaseKey = "Растущая";
        else phaseKey = "Убывающая";

        const phaseText = PHASE_ADVICE[phaseKey][seed % PHASE_ADVICE[phaseKey].length];

        // === СТРУКТУРА ВЫВОДА ===
        return `${mainEmoji} ${status}: ${intensity}%\n\n` +
            `🌙 ${phaseText}\n\n` +
            `💎 ${elementText}`;
    }
}