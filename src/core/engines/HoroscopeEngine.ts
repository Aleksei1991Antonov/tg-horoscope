import { LunarEngine } from './LunarEngine';
import { SIGN_HOROSCOPE } from '../constants/signHoroscope';

export type ZodiacSign = "Овен" | "Телец" | "Близнецы" | "Рак" | "Лев" | "Дева" | "Весы" | "Скорпион" | "Стрелец" | "Козерог" | "Водолей" | "Рыбы";

const ZODIAC_ORDER: ZodiacSign[] = [
    "Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева",
    "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"
];

export class HoroscopeEngine {
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
            mainEmoji = "💎";
            status = "Максимальный КПД";
            band = "high";
        } else if (intensity > 65) {
            mainEmoji = "🚀";
            status = "Вектор экспансии";
            band = "mediumHigh";
        } else if (intensity > 45) {
            mainEmoji = "🧠";
            status = "Интеграция опыта";
            band = "mediumLow";
        } else {
            mainEmoji = "🔋";
            status = "Накопление ресурса";
            band = "low";
        }

        const signTexts = SIGN_HOROSCOPE[userSign]?.[band];
        const signText = signTexts ? signTexts[seed % signTexts.length] : '';

        return `${status} ${mainEmoji}\n\n${signText}`;
    }
}