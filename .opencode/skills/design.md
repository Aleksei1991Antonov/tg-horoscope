---
name: horoscope-design
description: Use when working on UI components, styling, layout, theming, or design system for Гороскоп Core
---

# Design — Гороскоп Core

## Style: Apple x Quiet Luxury
- Тёплый кремовый фон, мягкие акценты, тихая роскошь без лишних линий
- Ценность передаётся через качество, воздух и свет
- Минимум рамок, много воздуха
- Плавные анимации (fade-in, slide-in, 300–700ms)

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
- Шрифт: Manrope (черное начертание, крупные кегли)
- Все размеры в **rem** — ни одного `px` в коде
- Масштаб: Small (`14px`), Medium (`16px`), Large (`18px`)
- Font scale передаётся пропом `fontScale` через компоненты
- Размеры иконок: от `fontScale` через константы (`1.25rem` / `1.5rem`)

## Компонентные паттерны

### Иконки (Apple-style)
- Никаких контейнеров вокруг иконок (w-10 h-10 rounded-2xl и т.д.)
- Иконки стоят сами по себе, без рамок и фонов
- Feature-иконки (RhythmView) масштабируются с `fontScale`

### Карточки
- `bg-[var(--c-surface)] backdrop-blur-3xl border border-[var(--c-border)] rounded-[32px]`
- Никаких `grayscale` на невыбранных элементах
- Selected: `bg-[var(--c-primary-10)] shadow-inner`

### MAX BackButton
- `backHandlerRef` + `backHandlerTick` в App.tsx
- Приоритет: TextSettings → Knowledge → LegalDoc → ZodiacModal → Menu → hide
- Каждый контейнер сам регистрирует handler в useEffect

### Header
- Бесшовный матовый пилл: `bg-surface/80 backdrop-blur-3xl rounded-[2rem]`
- Кнопка меню: круг `w-9 h-9 rounded-full bg-surface-elevated`

### Modals
- X кнопки удалены, закрытие через MAX BackButton + backdrop tap
- Карточки без бордеров: `shadow-2xl` вместо `border`
- Ячейки без фона/бордера; selected: `bg-primary-10 shadow-inner`
- Бэкдроп: `bg-black/20 backdrop-blur-sm`

### Навигация
- 3 таба: Ритм, Любовь, Core
- Нижняя навигация: стеклянная подложка (`bg-white/70 backdrop-blur-3xl border-t`)
- Иконка + текст (спейсинг 0.15em)

## Layout
- `overscroll-behavior: none` на `<html>` — блокировка pull-to-refresh
- `disableVerticalSwipes()` в App.tsx init — блокировка жестов MAX
- `safe-area-inset-bottom` для отступов от края экрана
- `font-manrope` на корневом контейнере

## Что НЕ используем
- `<a>` теги — только `<button>` + `WebApp.openLink()`
- Градиентные заливки, массивные тени, бейджи
- Золото и блёстки
- Логотипы и брендинг на каждом углу

## Reference files
- doc/MANIFEST.md — полный манифест и дизайн-система
- AGENTS.md — сессионный контекст и принятые решения
