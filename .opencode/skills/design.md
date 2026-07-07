---
name: horoscope-design
description: Use when working on UI components, styling, layout, theming, or design system for Гороскоп Core
---

# Design — Гороскоп Core

## Философия: Apple Design + Quiet Luxury

Мы не копируем Apple — мы применяем Apple-мышление. Три закона из HIG (Human Interface Guidelines):

**Clarity (Ясность)**
- Иерархия: `font-black` заголовок → `font-bold` подпись → `font-medium` тело
- Каждый экран отвечает на 1 вопрос (Ритм: «Какая энергия?», Core: «Что я могу?», Love: «С кем совпадаю?»)
- Никакого текста-паразита. Если слово можно убрать — оно убрано.

**Deference (Уважение)**
- Фон не борется с контентом (кремовый `#FBF6F0`, а не белый)
- Границы `rgba(0,0,0,0.06)` — почти невидимы
- Акценты — только для данных (проценты, графики), не для украшения
- Иконки без контейнеров и фонов — стоят сами по себе

**Depth (Глубина)**
- `backdrop-blur` создаёт слои как в iOS/macOS
- `slide-in-from-bottom` для модалок — физично
- `active:scale-95` — тактильный отклик без haptics
- `shadow-2xl` — парящие модалки вместо приклеенных border

## Apple Decision Checklist

Когда сомневаешься — пройди 4 вопроса:

1. **Упрощает ли это жизнь пользователя?** Если нет — удаляй
2. **Будет ли дорого выглядеть через 5 лет?** Если нет — ищи другое
3. **Сможем поддерживать через год?** Если нет — не делай сейчас
4. **Три «Зачем?»** После трёх ответов функция всё ещё нужна? Делай.

## Style: Apple x Quiet Luxury

- Тёплый кремовый фон, мягкие акценты, тихая роскошь без лишних линий
- Ценность передаётся через качество, воздух и свет
- Минимум рамок, много воздуха
- Плавные анимации (fade-in, slide-in, 300–700ms)
- Девиз: «Как если бы Apple делали гороскоп»

## Design Tokens (CSS Custom Properties)

Все цвета через CSS-переменные — никаких хардкодов.

### Основная тема (Morning Magic)
| Token | Value | Description |
|-------|-------|-------------|
| `--c-bg` | `#FBF6F0` | Тёплый кремовый фон |
| `--c-primary` | `#C4756B` | Dusty Rose — главный акцент |
| `--c-secondary` | `#E8C4A0` | Warm Peach — второстепенный |
| `--c-text` | `#2C2824` | Тёплый тёмно-серый |
| `--c-surface` | `#FFFFFF` | Карточки |
| `--c-border` | `rgba(0,0,0,0.06)` | Почти невидимые границы |
| `--c-surface-elevated` | `#FFFFFF` | Поднятые поверхности |

### Semi-transparent layers
- `--c-bg-60/80/85/90` — полупрозрачные слои на фоне
- `--c-text-5/10/20/30/40/50/60/70/80/90/95` — градации текста

### Тёмные темы (опционально)
В приложении 9 тем: Morning Magic (по умолч.), Бирюза, Шалфей, Лаванда, Слива, Кашемир, Эспрессо, Жемчуг, Сумерки. Все через `data-theme` на `<html>`.

## Типографика
- Шрифт: Manrope (черное начертание, крупные кегли) — как San Francisco у Apple
- Все размеры в **rem** — ни одного `px` в коде (уважаем настройки зрения)
- Масштаб: Small (`14px`), Medium (`16px`), Large (`18px`)
- `fontScale` — проп через все компоненты (как Dynamic Type в iOS)
- Размеры иконок: от `fontScale` (`1.25rem` / `1.5rem`)
- `font-black` (ExtraBold 800) для заголовков — жирно и чисто
- `font-bold` (Bold 700) для подписей
- `font-medium` (Medium 500) для тела
- Никакого italic — не используем
- Tracking (letter-spacing): `[0.2em]` для label, `[0.15em]` для навигации

## Компонентные паттерны

### Иконки (Apple-style)
- Никаких контейнеров вокруг иконок (w-10 h-10 rounded-2xl и т.д.)
- Иконки стоят сами по себе, без рамок и фонов
- Feature-иконки (RhythmView) масштабируются с `fontScale`
- Только Lucide, один набор — как SF Symbols
- Stroke width: 2 по умолчанию, 2.5 для active

### Карточки
```css
bg-[var(--c-surface)] backdrop-blur-3xl border border-[var(--c-border)] rounded-[32px]
```
- Никаких `grayscale` на невыбранных элементах
- Selected: `bg-[var(--c-primary-10)] shadow-inner`
- Active: `active:scale-[0.98]` — живой отклик
- `card-shadow` — микро-тень, без тяжести

### MAX BackButton
- `backHandlerRef` + `backHandlerTick` в App.tsx
- Приоритет: TextSettings → Knowledge → LegalDoc → ZodiacModal → Menu → hide
- Каждый контейнер сам регистрирует handler в useEffect

### Header
- Бесшовный матовый пилл: `bg-surface/80 backdrop-blur-3xl rounded-[2rem]`
- Кнопка меню: круг `w-9 h-9 rounded-full bg-surface-elevated`
- Никакого логотипа — только контент

### Modals (Apple-style sheets)
- X кнопки удалены — закрытие через MAX BackButton + backdrop tap (как iOS sheets)
- Карточки без бордеров: `shadow-2xl` вместо `border`
- Ячейки без фона/бордера; selected: `bg-primary-10 shadow-inner`
- Бэкдроп: `bg-black/20 backdrop-blur-sm` (как в iOS)
- Анимация: `slide-in-from-bottom` (выезжают снизу)
- `max-h-[85vh]` — не выше экрана, скролл внутри

### Навигация
- 3 таба фиксировано (как в iOS: 3–5 табов, не больше)
- Иконка + текст под ней
- Активный таб: `scale-110` + `text-[var(--c-primary)]` + индикатор-полоска
- Стекло: `bg-white/70 backdrop-blur-3xl border-t`

### Layout
- `overscroll-behavior: none` на `<html>` — блокировка pull-to-refresh (как остановка скролла в iOS)
- `disableVerticalSwipes()` в App.tsx init — блокировка жестов MAX
- `safe-area-inset-bottom` для отступов от края экрана (как safe area в iOS)
- `font-manrope` на корневом контейнере
- `h-screen flex flex-col overflow-hidden` — корневой контейнер
- `max-w-md mx-auto` — центрирование контента

### Анимация
- fade-in: 300–500ms (появление)
- slide-in-from-bottom: 300–500ms (модалки)
- scale: 200ms (кнопки)
- progress bar: 1000ms ease-out (заполнение)
- transition-all duration-300 — <300ms незаметно, >700ms утомляет

## Что НЕ используем (Apple-style restraint)

- `<a>` теги — только `<button>` + `WebApp.openLink()`
- Градиентные заливки, массивные тени, бейджи
- Золото и блёстки (это лакшери, не Quiet Luxury)
- Логотипы и брендинг на каждом углу
- `grayscale` на невыбранных элементах
- `as unknown as` — типы через `window.WebApp`
- Сторонние UI библиотеки (кроме Lucide)
- Кастомные иконки — только Lucide
- Второй шрифт — только Manrope
- `px` единицы — только `rem`

## Принимать решения как Apple

**1. Delete before you add** — сначала удали, потом добавляй
**2. If it needs a manual, it's broken** — интерфейс должен быть очевиден
**3. Design for the 80%** — 80% пользователей получат 100% пользы. 20% кастомных сценариев не стоят усложнения
**4. The best interface is invisible** — чем меньше UI борется за внимание, тем лучше
**5. Consistency is more important than being right** — если мы где-то используем `rounded-[32px]`, используем везде. Даже если в другом месте «правильнее» `rounded-3xl`

## Reference files
- doc/MANIFEST.md — полный манифест, Apple Design Principles, девиз
- AGENTS.md — сессионный контекст и принятые решения
- .opencode/skills/marketing.md — UI-тексты и in-app copy (синхронизация с дизайном)
