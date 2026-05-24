export interface LoveForecast {
    day: string;
    score: number;
}

const ZODIAC_ELEMENTS: Record<string, string> = {
    'Овен': 'fire', 'Лев': 'fire', 'Стрелец': 'fire',
    'Телец': 'earth', 'Дева': 'earth', 'Козерог': 'earth',
    'Близнецы': 'air', 'Весы': 'air', 'Водолей': 'air',
    'Рак': 'water', 'Скорпион': 'water', 'Рыбы': 'water'
};

const SPECIAL_PAIRS: Record<string, string[]> = {
    'Скорпион': ['Рыбы', 'Рак', 'Телец'],
    'Лев': ['Водолей', 'Овен', 'Стрелец'],
    'Близнецы': ['Весы', 'Водолей', 'Стрелец'],
    'Козерог': ['Телец', 'Дева', 'Рак']
};

export class LoveEngine {
    /**
     * Рассчитывает базовый процент совместимости между двумя знаками
     */
    static getBaseSynergy(z1: string, z2: string): number {
        if (!z1 || !z2) return 0;
        if (z1 === z2) return 88;

        const el1 = ZODIAC_ELEMENTS[z1];
        const el2 = ZODIAC_ELEMENTS[z2];

        let score: number;

        if (el1 === el2) {
            score = 92;
        } else if (
            (el1 === 'fire' && el2 === 'air') || (el1 === 'air' && el2 === 'fire') ||
            (el1 === 'earth' && el2 === 'water') || (el1 === 'water' && el2 === 'earth')
        ) {
            score = 82;
        } else {
            score = 65;
        }

        if (SPECIAL_PAIRS[z1]?.includes(z2) || SPECIAL_PAIRS[z2]?.includes(z1)) {
            score += 10;
        }

        return Math.min(99, score);
    }

    /**
     * Генерирует график на месяц (от 28 до 31 дня)
     */
    static getMonthlyForecast(userZodiac: string, partnerZodiac: string | undefined): LoveForecast[] {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const base = partnerZodiac
            ? this.getBaseSynergy(userZodiac, partnerZodiac)
            : 60;

        return Array.from({ length: daysInMonth }, (_, i) => {
            const seed = userZodiac.length + (partnerZodiac?.length || 0) + i * 7;
            const wave = Math.sin(seed * 0.8) * 12;
            const noise = Math.cos(seed * 2) * 5;

            let score = base + wave + noise;
            score = Math.min(98, Math.max(30, score));

            return { day: String(i + 1), score: Math.round(score) };
        });
    }

    /**
     * Генерирует график на 12 месяцев
     */
    static getYearlyForecast(userZodiac: string, partnerZodiac: string | undefined, yearOffset = 0): LoveForecast[] {
        const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

        const base = partnerZodiac
            ? this.getBaseSynergy(userZodiac, partnerZodiac)
            : 60;

        return months.map((month, i) => {
            const seed = userZodiac.length + (partnerZodiac?.length || 0) + i * 31 + (yearOffset + 2) * 1000;
            const wave = Math.sin(seed * 0.7) * 10;
            const noise = Math.cos(seed * 2.5) * 4;

            let score = base + wave + noise;
            score = Math.min(95, Math.max(35, score));

            return { day: month, score: Math.round(score) };
        });
    }

    /**
     * Генерирует график на 7 дней, который колеблется вокруг базового значения
     */
    static getWeeklyForecast(userZodiac: string, partnerZodiac: string | undefined): LoveForecast[] {
        const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

        const base = partnerZodiac
            ? this.getBaseSynergy(userZodiac, partnerZodiac)
            : 60;

        // Определяем текущий день недели (0-6, где 0 - Пн)
        const now = new Date();
        const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;

        return days.map((day, index) => {
            // Если это текущий день — возвращаем ровно базовый процент
            if (index === todayIndex) {
                return { day, score: base };
            }

            // Для остальных дней создаем мягкое колебание ±12%
            // Используем стабильный seed на основе знаков, чтобы график не прыгал при обновлении
            const seed = userZodiac.length + (partnerZodiac?.length || 0) + index;
            const wave = Math.sin(seed * 0.8) * 12;
            const noise = Math.cos(seed * 2) * 5;

            let dailyScore = base + wave + noise;

            // Ограничиваем диапазон 30-98%
            dailyScore = Math.min(98, Math.max(30, dailyScore));

            return {
                day,
                score: Math.round(dailyScore)
            };
        });
    }
}