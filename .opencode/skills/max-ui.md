---
name: horoscope-max-ui
description: Use when considering MAX UI library components, or when integrating with MAX design system for mini apps
---

# MAX UI — Гороскоп Core

## Статус: НЕ ИСПОЛЬЗУЕТСЯ

Проект использует собственную дизайн-систему **Apple x Quiet Luxury** (свои компоненты, Tailwind CSS, CSS-переменные). MAX UI не установлен и не применяется.

Этот скилл — справочный: чтобы знать что существует, и при необходимости интегрироваться.

## Установка

```bash
npm i @maxhub/max-ui
```

## Подключение

```tsx
import { MaxUI } from '@maxhub/max-ui';
import '@maxhub/max-ui/dist/styles.css';

const Root = () => (
    <MaxUI>
        <App />
    </MaxUI>
);
```

## Провайдер MaxUI

- Автоматически определяет `platform` (`ios` | `android`) и `colorScheme` (`light` | `dark`)
- Можно переопределить вручную:

```tsx
<MaxUI platform="ios" colorScheme="dark">
    <App />
</MaxUI>
```

## Компоненты

### Avatar
- `Avatar.Container` — обёртка (`size`, `form: 'squircle' | 'round'`)
- `Avatar.Image` — фото
- `Avatar.Text` — текстовая заглушка (инициалы)
- `Avatar.Icon` — иконка
- `Avatar.CloseButton` — кнопка закрытия
- `Avatar.OnlineDot` — индикатор онлайн
- `Avatar.Overlay` — оверлей

### Button
- modes: `'primary' | 'secondary' | 'tertiary' | 'link'`
- appearances: `'themed' | 'negative' | 'neutral' | 'neutral-themed' | 'contrast-static'`
- sizes: `'small' | 'medium' | 'large'`
- props: `stretched`, `loading`, `disabled`, `iconBefore`, `iconAfter`, `indicator`, `innerClassNames`
- полиморфный через `asChild` для `<a>`, `<Link>` и т.д.

### Panel
- modes: `'primary' | 'secondary'`
- `centeredX`, `centeredY`

### Typography
- `Typography.Display` — крупный заголовок
- `Typography.Title` — заголовок
- `Typography.Headline` — подзаголовок
- `Typography.Body` — основной текст
- `Typography.Label` — подпись
- `Typography.Action` — текст действия (кнопка)

### Layout
- `Container` — центрированный контейнер
- `Flex` — flexbox (`direction`, `align`, `justify`, `gap`)
- `Grid` — CSS grid (`cols`, `gap`)

### Forms
- `Input` — текстовое поле
- `Textarea` — многострочное
- `Switch` — переключатель

### Списки и ячейки
- `CellList`, `CellSimple`, `CellAction`, `CellHeader`, `CellInput`

### Прочее
- `IconButton`, `ToolButton`, `Counter`, `Dot`, `SearchInput`, `Spinner`
- `EllipsisText` — текст с многоточием
- `Ripple` — ripple-эффект
- `Profile` — композиция (аватар + текст)

## Кастомизация

### CSS-переменные
Можно переопределять глобально или на уровне компонента.

### innerClassNames
Для многосоставных компонентов (Button, CellAction и т.д.):
```tsx
<Button innerClassNames={{ iconBefore: 'my-icon-class' }}>
    Текст
</Button>
```

### Полиморфность (asChild)
Позволяет рендерить компонент как другой элемент:
```tsx
<Button asChild>
    <a href="https://...">Ссылка как кнопка</a>
</Button>
```

## Почему не используем

- Проект имеет свой дизайн-стиль (Apple Quiet Luxury), несовместимый с нативным MAX UI
- Все компоненты кастомные, через Tailwind CSS + CSS-переменные
- Никаких внешних UI библиотек
- Полный контроль над каждым пикселем

## Когда может пригодиться
- Если нужно быстро прототипировать что-то в стиле MAX
- Для совместимости с дизайн-системой MAX при необходимости
- Реference при реализации собственных аналогов (как сделаны Panel, Avatar, Button в MAX UI)

## Reference
- https://dev.max.ru/ui — полная документация
- https://github.com/max-messenger/max-ui — исходники
- https://max-messenger.github.io/max-ui/ — Storybook
- `doc/MANIFEST.md` — наша дизайн-система
- `.opencode/skills/design.md` — наш UI скилл
