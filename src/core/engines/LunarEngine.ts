const MS_PER_DAY = 86400000;

export interface LunarData {
    phase: number;
    illumination: number;
    age: number;
}

export interface ZodiacData {
    name: string;
    icon: string;
}

export class LunarEngine {
    /**
     * Точная фаза Луны (от 0 до 1)
     */
    static getLunarPhase(date: Date): number {
        // Новолуние 17 апреля 2026, 11:52 UTC
        const ref = new Date('2026-04-17T11:52:00Z').getTime();
        const cycle = 29.530588853 * MS_PER_DAY;

        let p = ((date.getTime() - ref) % cycle) / cycle;
        if (p < 0) p += 1;
        return Math.min(0.9999, Math.max(0, p));
    }

    /**
     * Данные по Луне (фаза, освещенность, возраст)
     */
    static getLunarData(date: Date): LunarData {
        const phase = this.getLunarPhase(date);
        const illumination = (1 - Math.cos(phase * 2 * Math.PI)) / 2;

        return {
            phase,
            illumination: Number(illumination.toFixed(4)),
            age: Math.floor(phase * 29.530588853)
        };
    }

    /**
     * Улучшенный расчёт знака Зодиака (алгоритм Миуса, точность ~±1°)
     */
    static getMoonZodiac(date: Date): ZodiacData {
        const signs = [
            { name: "Овен", icon: "♈" }, { name: "Телец", icon: "♉" },
            { name: "Близнецы", icon: "♊" }, { name: "Рак", icon: "♋" },
            { name: "Лев", icon: "♌" }, { name: "Дева", icon: "♍" },
            { name: "Весы", icon: "♎" }, { name: "Скорпион", icon: "♏" },
            { name: "Стрелец", icon: "♐" }, { name: "Козерог", icon: "♑" },
            { name: "Водолей", icon: "♒" }, { name: "Рыбы", icon: "♓" }
        ];

        const j2000 = new Date('2000-01-01T12:00:00Z').getTime();
        const jd = 2451545.0 + (date.getTime() - j2000) / MS_PER_DAY;
        const d = jd - 2451545.0;

        // Средние элементы (в градусах) - заменено let на const по требованию ESLint
        const L = (218.316 + 13.176396 * d) % 360;     // Средняя долгота
        const M = (134.963 + 13.064993 * d) % 360;     // Средняя аномалия Луны
        const F = (93.272 + 13.229350 * d) % 360;      // Аргумент широты
        const D = (297.850 + 12.190749 * d) % 360;   // Средняя элонгация

        // Расширенная коррекция (8 слагаемых для высокой точности)
        let lambda = L +
            6.289 * Math.sin(M * Math.PI / 180) +           // Уравнение центра
            1.274 * Math.sin((2 * D - M) * Math.PI / 180) + // Эвекция
            0.658 * Math.sin(2 * D * Math.PI / 180) +       // Вариация
            0.214 * Math.sin(2 * M * Math.PI / 180) -
            0.186 * Math.sin(F * Math.PI / 180) -
            0.114 * Math.sin((2 * D - 2 * M) * Math.PI / 180) +
            0.059 * Math.sin((2 * D - 2 * F) * Math.PI / 180) +
            0.051 * Math.sin((2 * M - 2 * F) * Math.PI / 180);

        lambda = ((lambda % 360) + 360) % 360;

        const signIndex = Math.floor(lambda / 30);
        return signs[signIndex];
    }

    /**
     * Текстовое название фазы
     */
    static getPhaseName(phase: number): string {
        if (phase < 0.02 || phase > 0.98) return "Новолуние";

        if (phase < 0.23) return "Молодая Луна";
        if (phase < 0.27) return "Первая четверть";

        if (phase < 0.48) return "Растущая Луна";

        if (phase < 0.52) return "Полнолуние";

        if (phase < 0.73) return "Убывающая Луна";
        if (phase < 0.77) return "Последняя четверть";

        return "Старая Луна";
    }
}
