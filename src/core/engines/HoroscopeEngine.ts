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

    static generateDailyForecast(userSign: string): string {
        const date = new Date();
        const lunar = LunarEngine.getLunarData(date);
        const moonZodiac = LunarEngine.getMoonZodiac(date).name as ZodiacSign;
        const userIdx = ZODIAC_ORDER.indexOf(userSign as ZodiacSign);
        const moonIdx = ZODIAC_ORDER.indexOf(moonZodiac);

        if (userIdx === -1) return "Знак не определён";

        const seed = date.getDate() + userIdx + (date.getMonth() * 31);
        const diff = Math.abs(userIdx - moonIdx);
        const distance = diff > 6 ? 12 - diff : diff;

        let personalBonus: number;
        switch (distance) {
            case 0: personalBonus = 28; break;
            case 4: personalBonus = 22; break;
            case 2: personalBonus = 16; break;
            case 6: personalBonus = -12; break;
            case 3: personalBonus = -16; break;
            default: personalBonus = 5;
        }

        let intensity = Math.round((lunar.illumination * 0.5) + 42 + personalBonus);
        intensity = Math.max(15, Math.min(100, intensity));

        let status: string;
        let mainEmoji: string;
        let band: string;

        if (intensity > 82) {
            mainEmoji = "✨";
            status = "Абсолютное сияние";
            band = "high";
        } else if (intensity > 65) {
            mainEmoji = "💃";
            status = "Энергия расцвета";
            band = "mediumHigh";
        } else if (intensity > 45) {
            mainEmoji = "🌊";
            status = "Гармония потока";
            band = "mediumLow";
        } else {
            mainEmoji = "☁️";
            status = "Время нежности";
            band = "low";
        }

        const element = this.getElement(userSign);
        const elementTexts = ELEMENT_ADVICE[element]?.[band];
        const elementText = elementTexts ? elementTexts[seed % elementTexts.length] : '';

        let phaseKey: string;
        if (lunar.phase < 0.03 || lunar.phase > 0.97) phaseKey = "Новолуние";
        else if (lunar.phase > 0.47 && lunar.phase < 0.53) phaseKey = "Полнолуние";
        else if (lunar.phase < 0.5) phaseKey = "Растущая";
        else phaseKey = "Убывающая";

        const phaseTexts = PHASE_ADVICE[phaseKey]?.[moonZodiac];
        const phaseText = phaseTexts ? phaseTexts[seed % phaseTexts.length] : '';

        // УБРАЛИ % ИЗ ВЫВОДА. Теперь это выглядит как чистое послание.
        return `${status} ${mainEmoji}\n\n` +
            `${phaseText}\n\n` +
            `${elementText}`;
    }
}