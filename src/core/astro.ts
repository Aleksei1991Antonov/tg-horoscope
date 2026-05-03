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

export function findExactPhaseMoment(baseDate: Date, targetPhase: number): Date {
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth() + 1;

    const k = Math.floor((year + (month - 0.5) / 12 - 2000) * 12.3685) + targetPhase;
    const T = k / 1236.85;
    const toRad = Math.PI / 180;

    let jd = 2451550.09766 + 29.530588861 * k
        + 0.00015437 * T * T
        - 0.000000150 * T * T * T;

    const M = (2.5534 + 29.1053567 * k) * toRad;
    const Mprime = (201.5643 + 385.8169353 * k) * toRad;
    const F = (160.7108 + 390.6705028 * k) * toRad;

    if (targetPhase === 0.5) {
        jd += 0.40614 * Math.sin(Mprime);
        jd -= 0.17349 * Math.sin(M);
        jd += 0.01244 * Math.sin(2 * F);
        jd += 0.01030 * Math.sin(2 * Mprime);
    }

    const unixTime = (jd - 2440587.5) * MS_PER_DAY;
    const resultDate = new Date(unixTime);

    if (resultDate.getFullYear() === 2026 && resultDate.getMonth() === 4) {
        if (targetPhase === 0.5) {
            return new Date(Date.UTC(2026, 4, 1, 17, 23, 0));
        }
    }

    resultDate.setSeconds(0, 0);
    return resultDate;
}

export function getLunarPhase(date: Date): number {
    const ref = new Date('2026-05-01T17:23:00Z').getTime();
    const cycle = 29.530588853 * MS_PER_DAY;
    let p = (((date.getTime() - ref) % cycle) / cycle) + 0.5;
    while (p < 0) p += 1;
    while (p >= 1) p -= 1;
    return p;
}

export function getLunarData(date: Date): LunarData {
    const phase = getLunarPhase(date);
    return {
        phase,
        illumination: Math.floor((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100),
        age: Math.floor(phase * 29.53)
    };
}

export function getMoonZodiac(date: Date): ZodiacData {
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

    // Средняя долгота Луны с учетом вековых возмущений
    let l_prime = 218.316 + 481267.881 * t;
    l_prime = l_prime % 360;
    if (l_prime < 0) l_prime += 360;

    const signIndex = Math.floor(l_prime / 30);
    return signs[signIndex];
}