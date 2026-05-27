import { ZODIAC_MASTERS, ZODIAC_ELEMENTS } from '../constants/astro';
import { SIGN_PROFILES } from '../constants/signProfile';
import { LunarEngine } from './LunarEngine';

export interface CoreProfile {
    zodiacName: string;
    rulingPlanet: string;
    element: 'fire' | 'earth' | 'air' | 'water';
    elementLabel: string;
    elementDesc: string;
    rulingDesc: string;
    modality: string;
    essence: string;
    moonSign: string;
    moonPhase: string;
    moonPhaseCategory: string;
    dayEnergy: number;
    dna: {
        energy: number;
        focus: number;
        intuition: number;
    };
}

export const CoreEngine = {
    getProfile(zodiacName: string): CoreProfile {
        const now = new Date();
        const lunarData = LunarEngine.getLunarData(now);
        const moonZodiac = LunarEngine.getMoonZodiac(now);
        const phaseName = LunarEngine.getPhaseName(lunarData.phase);

        let phaseCategory: string;
        if (lunarData.phase < 0.03 || lunarData.phase > 0.97) phaseCategory = "Новолуние";
        else if (lunarData.phase > 0.47 && lunarData.phase < 0.53) phaseCategory = "Полнолуние";
        else if (lunarData.phase < 0.5) phaseCategory = "Растущая";
        else phaseCategory = "Убывающая";

        const profile = SIGN_PROFILES[zodiacName];
        const element = ZODIAC_ELEMENTS[zodiacName];
        const rulingPlanet = ZODIAC_MASTERS[zodiacName];
        const signElement = ZODIAC_ELEMENTS[moonZodiac.name];

        let dayEnergy = Math.round(lunarData.illumination * 100);

        if (moonZodiac.name === zodiacName) {
            dayEnergy += 28;
        } else if (element === signElement) {
            dayEnergy += 14;
        }

        if (rulingPlanet === "Луна" && lunarData.illumination > 0.6) {
            dayEnergy += 8;
        }

        dayEnergy = Math.max(15, Math.min(100, dayEnergy));

        const seed = now.getDate() + now.getMonth() * 31 + ZODIAC_ELEMENTS[zodiacName].length;
        const wave = Math.sin(seed * 0.7) * 12;
        const baseDna = dayEnergy * 0.6;

        return {
            zodiacName,
            rulingPlanet,
            element,
            elementLabel: profile?.elementLabel || '—',
            elementDesc: profile?.elementDesc || '—',
            rulingDesc: profile?.rulingDesc || '—',
            modality: profile?.modality || '—',
            essence: profile?.essence || '—',
            moonSign: moonZodiac.name,
            moonPhase: phaseName,
            moonPhaseCategory: phaseCategory,
            dayEnergy,
            dna: {
                energy: Math.min(98, Math.max(20, Math.round(baseDna + wave + 15))),
                focus: Math.min(98, Math.max(20, Math.round(baseDna - wave * 0.5 + 25))),
                intuition: Math.min(98, Math.max(20, Math.round(baseDna + lunarData.illumination * 30))),
            },
        };
    },
};
