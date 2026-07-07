import { LunarEngine } from './LunarEngine';
import { SIGN_HOROSCOPE } from '../constants/signHoroscope';
import { LOVE_HOROSCOPE } from '../constants/loveHoroscope';

export type ZodiacSign = "Овен" | "Телец" | "Близнецы" | "Рак" | "Лев" | "Дева" | "Весы" | "Скорпион" | "Стрелец" | "Козерог" | "Водолей" | "Рыбы";

const ZODIAC_ORDER: ZodiacSign[] = [
    "Овен", "Телец", "Близнецы", "Рак", "Лев", "Дева",
    "Весы", "Скорпион", "Стрелец", "Козерог", "Водолей", "Рыбы"
];

export interface DayBand {
    status: string;
    band: string;
    intensity: number;
    luckyNumber: number;
}

export class HoroscopeEngine {
    /**
     * Определяет энергетику дня на основе положения Луны относительно знака пользователя
     */
    static getDayBand(userSign: string, date: Date): DayBand {
        const moonZodiac = LunarEngine.getMoonZodiac(date).name as ZodiacSign;
        const userIdx = ZODIAC_ORDER.indexOf(userSign as ZodiacSign);
        const moonIdx = ZODIAC_ORDER.indexOf(moonZodiac);

        if (userIdx === -1) {
            return { status: "Хороший день", band: "mediumHigh", intensity: 50, luckyNumber: 7 };
        }

        // Вычисляем астрологическую дистанцию (0-6 знаков)
        const diff = Math.abs(userIdx - moonIdx);
        const distance = diff > 6 ? 12 - diff : diff;

        let isHighBand: boolean;
        let aspectBonus: number;

        // Астрологическая логика аспектов
        switch (distance) {
            case 0: // Соединение (Луна в вашем знаке) — Самый сильный день
                isHighBand = true;
                aspectBonus = 25;
                break;
            case 4: // Трин (Гармония стихий)
                isHighBand = true;
                aspectBonus = 20;
                break;
            case 2: // Секстиль (Дружественный аспект)
                isHighBand = true;
                aspectBonus = 15;
                break;
            case 1: // Полусекстиль (Нейтрально-позитивно)
                isHighBand = (date.getDate() % 2 === 0); // 50/50 шанс на "Чудесный"
                aspectBonus = 5;
                break;
            default: // Напряженные аспекты (Квадрат, Оппозиция)
                isHighBand = false;
                aspectBonus = -5;
        }

        const lunar = LunarEngine.getLunarData(date);
        const moonInfluence = Math.round(lunar.illumination * 10);

        // Рассчитываем итоговую интенсивность
        let intensity = isHighBand
            ? (75 + aspectBonus + moonInfluence)
            : (55 + aspectBonus + moonInfluence);

        intensity = Math.max(0, Math.min(100, intensity));

        return {
            status: isHighBand ? "Чудесный день" : "Хороший день",
            band: isHighBand ? "high" : "mediumHigh",
            intensity,
            luckyNumber: this.getLuckyNumber(userSign, date)
        };
    }

    /**
     * Генерирует текст прогноза
     */
    static generateDailyForecast(userSign: string, date?: Date): string {
        const targetDate = date || new Date();
        const stableDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

        const bandInfo = this.getDayBand(userSign, stableDate);
        const userIdx = ZODIAC_ORDER.indexOf(userSign as ZodiacSign);

        const startPoint = new Date(2024, 0, 1);
        const daysSinceStart = Math.floor((stableDate.getTime() - startPoint.getTime()) / (1000 * 60 * 60 * 24));

        const isLove = typeof window !== 'undefined' && localStorage.getItem('nova_love_horoscope') === 'true';
        const source = isLove ? LOVE_HOROSCOPE : SIGN_HOROSCOPE;

        const signData = source[userSign];
        if (!signData) return '...';

        const signTexts = signData[bandInfo.band];
        if (!signTexts || signTexts.length === 0) return '...';

        // Выбор текста на основе даты и знака
        const textIdx = (daysSinceStart + (userIdx * 7) + (isLove ? 13 : 0)) % signTexts.length;
        const signText = signTexts[textIdx];

        const status = isLove
            ? (bandInfo.band === 'high' ? 'Сияние чувств' : 'Тёплые моменты')
            : bandInfo.status;

        return `${status}\n\n${signText}`;
    }

    /**
     * Генерирует счастливое число в диапазоне 1-22
     */
    static getLuckyNumber(userSign: string, date?: Date): number {
        const targetDate = date || new Date();
        const stableDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
        const userIdx = ZODIAC_ORDER.indexOf(userSign as ZodiacSign);
        if (userIdx === -1) return 7;

        const startPoint = new Date(2024, 0, 1);
        const daysSinceStart = Math.floor((stableDate.getTime() - startPoint.getTime()) / (1000 * 60 * 60 * 24));

        // Формула для стабильного, но разнообразного числа
        // Используем множитель 13, чтобы у разных знаков в один день числа сильно отличались
        const seed = daysSinceStart + (userIdx * 13);

        // Диапазон 1-22 (Нумерологический цикл)
        return (seed % 22) + 1;
    }
}