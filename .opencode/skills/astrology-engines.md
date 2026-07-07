---
name: horoscope-astrology-engines
description: Use when working with astrology engines (SynergyEngine, PowerHourEngine, LunarEngine, LoveEngine, HoroscopeEngine, BeautyEngine), astro constants, or lunar interpretations
---

# Astrology Engines — Гороскоп Core

## Архитектура (dependency graph)

```
astro.ts (константы: стихии, планеты, халдейский ряд)
  ├── signProfile.ts (профили знаков: эссенция, стихия, модальность)
  │
  ├── LunarEngine (фаза, освещённость, знак Луны — алгоритм Миуса)
  │   ├── SynergyEngine — совместимость знаков на сегодня
  │   ├── PowerHourEngine — планетарные часы, Час Силы
  │   ├── HoroscopeEngine — текст прогноза
  │   ├── LoveEngine — любовная синергия + графики
  │   └── BeautyEngine — бьюти-рекомендации
  │
  └── lunarInterpretations.ts (тексты для фаз и стихий)
      └── HoroscopeEngine — выбирает текст по фазе Луны + стихии
```

## Константы (src/core/constants/astro.ts)

| Константа | Описание |
|-----------|----------|
| `ZODIAC_ELEMENTS` | Стихия каждого знака (`fire/earth/air/water`) |
| `ZODIAC_MASTERS` | Планета-управитель знака (Овен→Марс, Телец→Венера и т.д.) |
| `CHALDEAN_ORDER` | Порядок планет: Сатурн→Юпитер→Марс→Солнце→Венера→Меркурий→Луна |
| `DAY_MASTERS` | Планета дня недели (0=Солнце, 1=Луна, ...) |
| `ZODIAC_QUALITIES` | SynergyEngine: cardinal/fixed/mutable по знакам |

### SignProfile (src/core/constants/signProfile.ts)

```ts
SIGN_PROFILES["Овен"] = {
  essence: "Импульс и первопроходчество...",
  elementLabel: "Яркое Пламя",
  modality: "Кардинальная",
  rulings: "Марс"
};
```

## Движки

### LunarEngine (src/core/engines/LunarEngine.ts)

Начальная точка всей астрологии. Чистые вычисления, без случайности.

```ts
LunarEngine.getLunarPhase(date)       // → 0..1 (0 = новолуние)
LunarEngine.getLunarData(date)        // → { phase, illumination, age }
LunarEngine.getMoonZodiac(date)       // → { name: "Овен", icon: "♈" }
LunarEngine.getPhaseName(phase)       // → "Новолуние" | "Растущая Луна" | ...
```

**Алгоритмы:**
- **Фаза**: привязка к новолунию 17 апреля 2026, цикл 29.53 дня
- **Освещённость**: `(1 - cos(phase × 2π)) / 2`
- **Знак Луны**: алгоритм Миуса (J2000, 8 слагаемых коррекции), точность ~±1°
- **Возраст**: `floor(phase × 29.53)` = день лунного месяца

### PowerHourEngine (src/core/engines/PowerHourEngine.ts)

Час Силы — лучший час дня для активности.

```ts
PowerHourEngine.calculate(sign)
// → { luckyHour, luckyPercent, masterPlanet, isLive, actionType, minutesToNext, lunarVibe }
```

**Формула:**
1. Сетка планетарных часов: 24 часа × планета из `CHALDEAN_ORDER` начиная с `DAY_MASTERS[день]`
2. Ищем часы, где планета = `ZODIAC_MASTERS[sign]`
3. Следующий такой час = Час Силы
4. `luckyPercent` = база (82 если live, 48 если нет) + коррекция Луны ±9% + бонус если Луна в твоём знаке/стихии
5. Если планета-управитель Луна и illumination > 0.65 → +9%

### SynergyEngine (src/core/engines/SynergyEngine.ts)

Кто лучший компаньон сегодня.

```ts
SynergyEngine.calculateAllMatches(sign)  // → SynergyResult[] (сортировка по убыванию)
SynergyEngine.calculateDailyMatch(sign)  // → SynergyResult (топ-1)
```

**Формула:**
1. База 50%
2. Одна стихия (+32%), дружественные (огонь+воздух, земля+вода) (+20%)
3. Оппозиция (6 знаков разницы) (+13%)
4. Конфликт крестов (одинаковое качество, не оппозиция) (−10%)
5. Луна в стихии партнёра (+12%), Луна в знаке партнёра (+8%)
6. Луна в дружественной стихии пользователя (+5%)
7. Хаос дня: `(pairSeed % 27) - 13` (±13%)
8. Clamp: 40–98%

**Seed:** `hash(date + sortedPair)` — стабильный на день для каждой пары.

### LoveEngine (src/core/engines/LoveEngine.ts)

Любовная синергия + прогнозы.

```ts
LoveEngine.getBaseSynergy(z1, z2)          // → 0..99 (базовая совместимость)
LoveEngine.getWeeklyForecast(z1, z2?)      // → LoveForecast[7]
LoveEngine.getMonthlyForecast(z1, z2?)     // → LoveForecast[28..31]
LoveEngine.getYearlyForecast(z1, z2?)      // → LoveForecast[12]
```

**Формула базовой синергии:**
- Одна стихия → 92
- Дружественные → 82
- Остальные → 65
- Совпадение знаков → 88
- Special pairs (+10): Скорпион→Рыбы/Рак/Телец, Лев→Водолей/Овен/Стрелец и т.д.
- Clamp: 99 макс

**Формула графиков (weekly/monthly/yearly):**
- `score = base + sin(seed × 0.8) × 12 + cos(seed × 2) × 5`
- Где seed = длина_имён + индекс + yearOffset
- clamp: 30–98

### HoroscopeEngine (src/core/engines/HoroscopeEngine.ts)

Генератор текста ежедневного прогноза.

```ts
HoroscopeEngine.generateDailyForecast(sign)  // → string
```

**Формула:**
1. Определяет интенсивность: `illumination × 0.5 + 42 + personalBonus`
   - `personalBonus` зависит от расстояния между знаком пользователя и знаком Луны (0→+28, 6→−12, 3→−16)
2. Выбирает статус (Абсолютное сияние / Энергия расцвета / ...)
3. Выбирает текст фазы из `PHASE_ADVICE[phaseKey][seed % length]`
4. Выбирает текст стихии из `ELEMENT_ADVICE[element][seed % length]`

### BeautyEngine (src/core/engines/BeautyEngine.ts)

Бьюти-рекомендации по знаку и Луне.

```ts
BeautyEngine.calculate(userZodiac, moonSign, isWaxing)  // → BeautyRecommendation[]
```

**Логика:**
- `MOON_IMPACT[moonSign]` — коэффициенты hair/skin/detox для каждого знака (1.5 max, 0.5 min)
- Резонанс стихий: если стихия Луны = стихия пользователя → +0.3
- Растущая Луна → лучше стрижка, убывающая → лучше детокс
- Водные знаки на убывающей → +0.2 к детоксу

## Текстовые данные (src/core/constants/lunarInterpretations.ts)

### PHASE_ADVICE
20 текстов на фазу (Новолуние, Растущая, Полнолуние, Убывающая).
Без эзотерики — про энергию, состояние, действия.

### ELEMENT_ADVICE
20 текстов на стихию (Fire, Earth, Air, Water).
Персонализированы под тип энергии знака.

## Паттерны и принципы

- **Стабильность**: все seed зависят от даты + знаков — результат не прыгает при обновлении страницы
- **Детерминизм**: без `Math.random()`, всё через хеши и синусы
- **Clamp**: проценты всегда 15–100 (чаще 30–98)
- **Волны**: `Math.sin` + `Math.cos` с разными множителями для естественных колебаний
- **Луна — центр**: LunarEngine используется всеми движками
- **Тексты отдельно**: lunarInterpretations.ts можно менять без трогания логики

## Reference files
- `src/core/engines/LunarEngine.ts` — база (фаза, знак Луны, освещённость)
- `src/core/engines/PowerHourEngine.ts` — Час Силы
- `src/core/engines/SynergyEngine.ts` — синергия/совместимость
- `src/core/engines/LoveEngine.ts` — любовные графики
- `src/core/engines/HoroscopeEngine.ts` — текст прогноза
- `src/core/engines/BeautyEngine.ts` — бьюти-рекомендации
- `src/core/constants/astro.ts` — константы
- `src/core/constants/signProfile.ts` — профили знаков
- `src/core/constants/lunarInterpretations.ts` — тексты
