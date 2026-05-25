# AGENTS.md — Session Context

## Дизайн-стиль: Apple x Quiet Luxury x Morning Light
Тёплый кремовый фон, мягкие акценты (Dusty Rose, Warm Peach), тихая роскошь без лишних линий.

## Ключевые решения в коде

### Иконки — Apple-style
- Все контейнеры для иконок удалены (`w-10 h-10 rounded-2xl` и т.д.)
- Иконки стоят сами по себе, без рамок и фонов
- Размеры: `rem` для accessibility, `1.25rem` / `1.5rem`
- Feature-иконки (RhythmView) масштабируются с `fontScale`

### MAX BackButton — единый механизм
- `backHandlerRef` + `backHandlerTick` в App.tsx
- Приоритет: TextSettings → Knowledge → LegalDoc → ZodiacModal → Menu → hide
- Каждый контейнер сам регистрирует свой handler в useEffect
- HeaderContainer: menu + zodiac modal (прямое управление, без передачи через MenuView)
- LoveContainer: partner zodiac modal (через проп `onSetBackHandler`)

### Header
- Бесшовный матовый пилл (`bg-surface/80 backdrop-blur-3xl`, `rounded-[2rem]`)
- Кнопка меню — круг `w-9 h-9 rounded-full bg-surface-elevated`
- Убран «Гороскоп v1.0.0» из меню

### Zodiac Modal / Partner Modal
- X кнопки удалены, закрытие через MAX BackButton + backdrop tap
- Карточки без бордеров (`shadow-2xl` вместо `border`)
- Ячейки без фона/бордера (selected: `bg-primary-10 shadow-inner`)
- Нет `grayscale` на невыбранных
- Бэкдроп: `bg-black/20 backdrop-blur-sm`

### `overscroll-behavior: none` на html
- Блокировка pull-to-refresh на уровне CSS

### `disableVerticalSwipes()` в App.tsx init
- Блокировка жестов MAX на уровне API
