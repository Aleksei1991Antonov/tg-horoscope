# Plan: signHoroscope.ts — Update texts

## Scope
- File: `src/core/constants/signHoroscope.ts` (2042 lines)
- 12 zodiac signs × 4 intensity levels (high, mediumHigh, mediumLow, low) × ~40 texts
- Total: ~1920 texts to review and update

## What changes

### 1. Remove imperative/coaching tone (AGENTS.md запрет)
- **Before**: "Не откладывай важное на потом", "Используй эту энергию", "Доверься ей", "Не бойся", "Выбирай осознанно"
- **After**: Reword as warm observations. "В такой день стоит...", "Можно...", "Лучше не..."
- Imperative mood replaced with suggestive/observational

### 2. Break template patterns
- **Before**: "Есть вероятность/шанс/повод" — ~80% of texts start this way
- **After**: Varied openings — "В такой день...", "Ощущение, что...", "Способность...", direct observation
- More natural, less "neural network" feel

### 3. Letter "ё"
- Added where needed (all occurrences throughout)

### 4. AGENTS.md checklist applied to every text
- ❌ No тревожность
- ❌ No инструкция/отчёт
- ❌ No коучинговый стиль
- ❌ No эзотерический жаргон
- ✅ Ощущение тепла, поддержки, спокойствия

### 5. Structure preserved
- Same TypeScript object structure
- Same `Record<string, Record<string, string[]>>` type
- Same keys (high, mediumHigh, mediumLow, low)
- Same array lengths (~40 per level)

## Signs already rewritten in plan
1. Овен ✅ (все 4 уровня)
2. Телец ✅ (все 4 уровня)
3. Близнецы ✅ (все 4 уровня)
4. Рак ✅ (все 4 уровня)
Remaining: Лев, Дева, Весы, Скорпион, Стрелец, Козерог, Водолей, Рыбы

## Verification
- TypeScript should compile cleanly (structure unchanged)
- HoroscopeEngine.ts continues to work (imports `SIGN_HOROSCOPE`, selects by `signTexts[seed % signTexts.length]`)
