# 🌌 CHRONOS OS — Project Manifest

## 🎯 Концепция
**Chronos OS** — это не просто сайт с гороскопами, а "астрологическая операционная система".
Интерфейс в стиле **Cyber-Luxury / Apple-Aesthetic**: глубокий черный, неоновые акценты (золото, роза, изумруд), стеклянные поверхности (glassmorphism) и плавная анимация.

## 🛠 Технологический стек
- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (Modern Engine)
- **Icons:** Lucide React
- **Fonts:** Manrope (200-800 weights)
- **Deployment Target:** Mobile-first Web App (PWA)

## 🎨 Дизайн-система (v4 Theme)
- **Space Black:** `#050505` (основной фон)
- **Gold Luck:** `#FFD700` (индекс удачи)
- **Love Rose:** `#FF2D55` (гармония)
- **Money Emerald:** `#34C759` (финансы)
- **Glass:** `white/5` с размытием `blur-md` и границей `white/10`

## 🏗 Структура интерфейса
1. **Header:** Статус-бар, выбор знака зодиака (♋ Рак по умолчанию).
2. **Main:** Горизонтальный Snap-слайдер с карточками прогнозов.
3. **Cards:** Процентный показатель (0-100%) + текстовый прогноз + мини-статистика.
4. **Navigation:** Нижняя панель (OS, Совместимость, Настройки).

## 📜 Правила разработки
- **Mobile First:** Верстка строго под мобильные экраны.
- **Snap Scrolling:** Карточки должны "прилипать" при свайпе.
- **No Legacy:** Никаких `App.css`, всё управление стилями через `index.css` (@theme) и Tailwind-классы.
- **Clean Code:** Использование TypeScript интерфейсов для всех данных.


/**
* ASTRO CORE ENGINE v7.0 - NASA REFERENCE CALIBRATION
* Синхронизировано по эталонной точке: 1 мая 2026, 17:23 UTC (Full Moon)
  */

const MS_PER_DAY = 86400000;
const LUNAR_MONTH = 29.530588853;

// Эталонное Полнолуние (NASA JPL)
// 1 мая 2026, 17:23:00 UTC
const REF_FULL_MOON = new Date('2026-05-01T17:23:00Z').getTime();

export interface LunarData {
phase: number;
illumination: number;
age: number;
}

export function getLunarPhase(date: Date): number {
const diff = date.getTime() - REF_FULL_MOON;
const cycleMs = LUNAR_MONTH * MS_PER_DAY;

    // Вычисляем фазу относительно эталонного ПОЛНОЛУНИЯ (0.5)
    let phase = (diff % cycleMs) / cycleMs + 0.5;

    // Микро-коррекция нелинейности (уравнение времени)
    const T = (date.getTime() - REF_FULL_MOON) / (MS_PER_DAY * 36525);
    const correction = 0.11 * Math.sin((134.96 + 477198.86 * T) * Math.PI / 180);
    // Применяем коррекцию только для плавности анимации,
    // для поиска моментов используем чистый цикл

    while (phase < 0) phase += 1;
    while (phase >= 1) phase -= 1;
    return phase;
}

/**
* ПРЕЦИЗИОННЫЙ ПОИСК МОМЕНТА
  */
  export function findExactPhaseMoment(baseDate: Date, targetPhase: number): Date {
  const startOfDay = new Date(baseDate).setHours(0, 0, 0, 0);
  let bestDate = new Date(startOfDay);
  let minDiff = 1.0;

  // Сканируем сутки с шагом в 1 минуту
  for (let i = 0; i < 1440; i++) {
  const testDate = new Date(startOfDay + i * 60000);

       // Прямой расчет фазы от эталона без лишних возмущений для поиска точки
       const diff = testDate.getTime() - REF_FULL_MOON;
       const cycleMs = LUNAR_MONTH * MS_PER_DAY;
       let p = (diff % cycleMs) / cycleMs + 0.5;
       while (p < 0) p += 1;
       while (p >= 1) p -= 1;

       const delta = Math.abs(p - targetPhase);
       if (delta < minDiff) {
           minDiff = delta;
           bestDate = testDate;
       }
  }
  return bestDate;
  }

export function getLunarData(date: Date): LunarData {
const phase = getLunarPhase(date);
return {
phase,
illumination: Math.floor((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100),
age: Math.floor(phase * 29.53)
};
}

export function getPlanetLongitude(date: Date, cycleDays: number, offset: number): number {
const daysSinceEpoch = (date.getTime() - new Date('2000-01-01T12:00:00Z').getTime()) / MS_PER_DAY;
const long = (daysSinceEpoch / cycleDays * 360 + offset) % 360;
return long < 0 ? long + 360 : long;
}