import { getLunarData, getMoonZodiac, type LunarData, type ZodiacData } from './astro';

export type ZodiacSign =
    | 'Aries' | 'Taurus' | 'Gemini' | 'Cancer'
    | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio'
    | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface HoroscopeItem {
    id: 'love' | 'luck' | 'money' | 'energy';
    label: string;
    value: number;
    color: string;
    title: string;
    desc: string;
    tips: string[];
}

const ZODIAC_ORDER: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const SIGN_RU_MAP: Record<string, ZodiacSign> = {
    "Овен": "Aries", "Телец": "Taurus", "Близнецы": "Gemini", "Рак": "Cancer",
    "Лев": "Leo", "Дева": "Virgo", "Весы": "Libra", "Скорпион": "Scorpio",
    "Стрелец": "Sagittarius", "Козерог": "Capricorn", "Водолей": "Aquarius", "Рыбы": "Pisces"
};

export function generateDailyHoroscope(userSign: ZodiacSign, date: Date): HoroscopeItem[] {
    const lunar: LunarData = getLunarData(date);
    const moonZodiacData: ZodiacData = getMoonZodiac(date);
    const moonSign = SIGN_RU_MAP[moonZodiacData.name];

    const userIdx = ZODIAC_ORDER.indexOf(userSign);
    const moonIdx = ZODIAC_ORDER.indexOf(moonSign);
    const distance = Math.min(
        Math.abs(userIdx - moonIdx),
        12 - Math.abs(userIdx - moonIdx)
    );

    const isGrowing = lunar.phase < 0.5;
    const illumination = lunar.illumination;

    // --- 1. ЛЮБОВЬ ---
    const getLove = () => {
        const resonance = (distance === 0 || distance === 4) ? 30 : (distance === 6 ? -15 : 0);
        const value = Math.min(98, Math.max(20, 60 + resonance + (isGrowing ? 10 : -5)));

        const desc = resonance > 0
            ? `Луна в знаке ${moonZodiacData.name} гармонирует с вашим сектором. Время открытости.`
            : `Луна в знаке ${moonZodiacData.name} создает нейтральный фон для ваших чувств.`;

        return { value, title: "Резонанс", desc, tips: value > 70 ? ["Сближение", "Инициатива"] : ["Наблюдение", "Уют"] };
    };

    // --- 2. УДАЧА ---
    const getLuck = () => {
        const luckBoost = (6 - distance) * 5;
        const value = Math.min(99, Math.floor(illumination * 0.4 + 30 + luckBoost));

        const desc = distance === 0
            ? "Луна проходит через ваш знак. Это ваш персональный пик удачи и возможностей."
            : "Общий лунный фон диктует темп событий. Сосредоточьтесь на текущих задачах.";

        return { value, title: "Вектор", desc, tips: distance < 2 ? ["Действие", "Шанс"] : ["Выжидание", "План"] };
    };

    // --- 3. ФИНАНСЫ ---
    const getMoney = () => {
        const isEarthMoon = ["Телец", "Дева", "Козерог"].includes(moonZodiacData.name);
        const value = Math.min(95, (isEarthMoon ? 75 : 50) + (isGrowing ? 15 : 0));

        const desc = isEarthMoon
            ? "Луна в земной стихии стабилизирует материальные потоки. Время для сделок."
            : "Лунный цикл советует соблюдать баланс и избегать импульсивных трат.";

        return { value, title: "Ресурс", desc, tips: isEarthMoon ? ["Сделка", "Доход"] : ["Экономия", "Анализ"] };
    };

    // --- 4. ТОНУС ---
    const getEnergy = () => {
        const tension = distance === 6 ? -20 : 0;
        const value = Math.min(100, Math.max(15, Math.floor(illumination * 0.7 + 20 + tension)));

        const getDesc = () => {
            if (distance === 6) return "Луна в оппозиции к вашему знаку. Возможен временный упадок сил.";
            if (distance === 0) return "Луна в вашем знаке. Ощутимый эмоциональный и физический подъем.";
            return isGrowing ? "Энергия прибывает вместе с лунным светом. Хороший темп." : "Время для планового восстановления ресурсов и отдыха.";
        };

        return { value, title: "Тонус", desc: getDesc(), tips: value > 75 ? ["Активность", "Спорт"] : ["Отдых", "Медитация"] };
    };

    const love = getLove();
    const luck = getLuck();
    const money = getMoney();
    const energy = getEnergy();

    return [
        { id: 'love', label: 'Любовь', value: love.value, color: '#FF2D55', title: love.title, desc: love.desc, tips: love.tips },
        { id: 'luck', label: 'Удача', value: luck.value, color: '#FFCC00', title: luck.title, desc: luck.desc, tips: luck.tips },
        { id: 'money', label: 'Финансы', value: money.value, color: '#34C759', title: money.title, desc: money.desc, tips: money.tips },
        { id: 'energy', label: 'Тонус', value: energy.value, color: '#5856D6', title: energy.title, desc: energy.desc, tips: energy.tips }
    ];
}

export function getPowerHour(date: Date): string {
    const lunar = getLunarData(date);
    const peakHour = (Math.floor(lunar.age * 0.8) + 12) % 24;
    return `${peakHour.toString().padStart(2, '0')}:20`;
}

export function getDailyMatch(userSign: ZodiacSign): { name: string, icon: string } {
    const signs: Record<ZodiacSign, { name: string, icon: string }> = {
        Aries: { name: 'ЛЕВ', icon: '♌' }, Taurus: { name: 'ДЕВА', icon: '♍' },
        Gemini: { name: 'ВЕСЫ', icon: '♎' }, Cancer: { name: 'СКОРПИОН', icon: '♏' },
        Leo: { name: 'ОВЕН', icon: '♈' }, Virgo: { name: 'КОЗЕРОГ', icon: '♑' },
        Libra: { name: 'ВОДОЛЕЙ', icon: '♒' }, Scorpio: { name: 'РЫБЫ', icon: '♓' },
        Sagittarius: { name: 'ЛЕВ', icon: '♌' }, Capricorn: { name: 'ТЕЛЕЦ', icon: '♉' },
        Aquarius: { name: 'БЛИЗНЕЦЫ', icon: '♊' }, Pisces: { name: 'РАК', icon: '♋' }
    };
    return signs[userSign];
}