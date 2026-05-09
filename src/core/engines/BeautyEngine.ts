export type BeautyStatus = 'благоприятно' | 'нейтрально';

export interface BeautyRecommendation {
    id: string;
    title: string;
    desc: string;
    status: BeautyStatus;
    color: string;
}

const ZODIAC_ELEMENTS: Record<string, string> = {
    'Овен': 'fire', 'Лев': 'fire', 'Стрелец': 'fire',
    'Телец': 'earth', 'Дева': 'earth', 'Козерог': 'earth',
    'Близнецы': 'air', 'Весы': 'air', 'Водолей': 'air',
    'Рак': 'water', 'Скорпион': 'water', 'Рыбы': 'water'
};

const MOON_IMPACT: Record<string, { hair: number; skin: number; detox: number }> = {
    'Лев': { hair: 1.5, skin: 1.1, detox: 0.9 },
    'Дева': { hair: 1.4, skin: 1.5, detox: 1.1 },
    'Весы': { hair: 1.3, skin: 1.3, detox: 1.0 },
    'Козерог': { hair: 1.2, skin: 1.1, detox: 1.2 },
    'Телец': { hair: 1.3, skin: 1.4, detox: 0.9 },
    'Рак': { hair: 0.6, skin: 1.2, detox: 1.4 },
    'Рыбы': { hair: 0.5, skin: 1.1, detox: 1.5 },
    'Скорпион': { hair: 1.0, skin: 1.1, detox: 1.5 },
    'Овен': { hair: 0.8, skin: 0.9, detox: 1.1 },
    'Близнецы': { hair: 0.9, skin: 1.0, detox: 1.0 },
    'Стрелец': { hair: 1.1, skin: 1.0, detox: 1.1 },
    'Водолей': { hair: 1.0, skin: 1.0, detox: 1.2 }
};

export class BeautyEngine {
    static calculate(userZodiac: string, moonSign: string, isWaxing: boolean): BeautyRecommendation[] {
        const impact = MOON_IMPACT[moonSign] || { hair: 1.0, skin: 1.0, detox: 1.0 };
        const userElement = ZODIAC_ELEMENTS[userZodiac];
        const moonElement = ZODIAC_ELEMENTS[moonSign];

        // РЕЗОНАНС СТИХИЙ (Персонализация)
        const isHarmonious = userElement === moonElement;
        const resonanceBonus = isHarmonious ? 0.3 : 0;

        // 1. СТРИЖКА (Используем let, так как есть модификация через if)
        let hairScore = isWaxing ? impact.hair : impact.hair - 0.1;
        hairScore += resonanceBonus;

        // 2. КОЖА (Используем const, так как значение не переназначается)
        const skinScore = impact.skin + resonanceBonus;

        // 3. ДЕТОКС (Используем let, так как есть модификация через if)
        let detoxScore = !isWaxing ? impact.detox + 0.2 : impact.detox;
        if (userElement === 'water' && !isWaxing) {
            detoxScore += 0.2;
        }

        return [
            {
                id: 'hair',
                title: 'Стрижка и объем',
                desc: hairScore > 1.4
                    ? `Идеальный резонанс ${userZodiac} и Луны в ${moonSign}`
                    : hairScore > 1.1 ? 'Благоприятное время для роста' : 'Подходит для поддержания формы',
                status: hairScore > 1.2 ? 'благоприятно' : 'нейтрально',
                color: 'amber'
            },
            {
                id: 'skin',
                title: isWaxing ? 'Питание и маски' : 'Глубокое очищение',
                desc: skinScore > 1.4
                    ? 'Ваша кожа максимально обновляется сегодня'
                    : 'Стандартный ежедневный уход',
                status: skinScore > 1.2 ? 'благоприятно' : 'нейтрально',
                color: 'fuchsia'
            },
            {
                id: 'detox',
                title: 'Детокс и лимфодренаж',
                desc: detoxScore > 1.4
                    ? 'Организм на пике очищения'
                    : 'Время для поддержания баланса',
                status: detoxScore > 1.2 ? 'благоприятно' : 'нейтрально',
                color: 'sky'
            },
            {
                id: 'complex',
                title: 'Сложные процедуры',
                desc: moonSign === userZodiac
                    ? 'Ваш персональный день силы'
                    : isHarmonious ? 'Гармония стихий оберегает вас' : 'Рекомендуется щадящий режим',
                status: (moonSign === userZodiac || isHarmonious) ? 'благоприятно' : 'нейтрально',
                color: 'rose'
            }
        ];
    }
}