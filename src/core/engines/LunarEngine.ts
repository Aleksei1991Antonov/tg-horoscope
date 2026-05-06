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
    static getLunarPhase(date: Date): number {
        const ref = new Date('2026-05-01T17:23:00Z').getTime();
        const cycle = 29.530588853 * MS_PER_DAY;
        let p = (((date.getTime() - ref) % cycle) / cycle) + 0.5;
        while (p < 0) p += 1;
        while (p >= 1) p -= 1;
        return p;
    }

    static getLunarData(date: Date): LunarData {
        const phase = this.getLunarPhase(date);
        return {
            phase,
            illumination: Math.floor((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100),
            age: Math.floor(phase * 29.53)
        };
    }

    static getMoonZodiac(date: Date): ZodiacData {
        const signs = [
            { name: "Овен", icon: "♈" }, { name: "Телец", icon: "♉" },
            { name: "Близнецы", icon: "♊" }, { name: "Рак", icon: "♋" },
            { name: "Лев", icon: "♌" }, { name: "Дева", icon: "♍" },
            { name: "Весы", icon: "♎" }, { name: "Скорпион", icon: "♏" },
            { name: "Стрелец", icon: "♐" }, { name: "Козерог", icon: "♑" },
            { name: "Водолей", icon: "♒" }, { name: "Рыбы", icon: "♓" }
        ];

        const jd = (date.getTime() / MS_PER_DAY) - (new Date('2000-01-01T12:00:00Z').getTime() / MS_PER_DAY) + 2451545.0;
        const t = (jd - 2451545.0) / 36525;

        let l_prime = 218.316 + 481267.881 * t;
        l_prime = l_prime % 360;
        if (l_prime < 0) l_prime += 360;

        const signIndex = Math.floor(l_prime / 30);
        return signs[signIndex];
    }

    // Вспомогательный метод для определения фазы текстом
    static getPhaseName(phase: number): string {
        if (phase < 0.03 || phase > 0.97) return "Новолуние";
        if (phase < 0.22) return "Растущий серп";
        if (phase < 0.28) return "Первая четверть";
        if (phase < 0.47) return "Растущая Луна";
        if (phase < 0.53) return "Полнолуние";
        if (phase < 0.72) return "Убывающая Луна";
        if (phase < 0.78) return "Последняя четверть";
        return "Старая Луна";
    }
}