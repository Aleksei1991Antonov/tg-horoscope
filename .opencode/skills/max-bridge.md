---
name: horoscope-max-bridge
description: Use when working with MAX Bridge API, WebApp object, BackButton, DeviceStorage, haptics, sharing, deep links, or any MAX platform integration
---

# MAX Bridge — Гороскоп Core

## Подключение

```html
<script src="https://st.max.ru/js/max-web-app.js"></script>
```

После подключения — `window.WebApp` (глобальный объект, без инициализации).

## Типы (src/types/max-bridge.d.ts)

```ts
declare global {
    interface Window {
        WebApp?: {
            initData: string;
            initDataUnsafe: {
                query_id: string;
                user?: {
                    id: number;
                    first_name: string;
                    last_name?: string;
                    username?: string;
                    language_code?: string;
                    photo_url?: string;
                };
                auth_date: number;
                hash: string;
            };
            platform: 'ios' | 'android' | 'desktop' | 'web';
            version: string;
            HapticFeedback: WebAppHapticFeedback;
            BackButton: WebAppBackButton;
            DeviceStorage?: WebAppDeviceStorage;
            openLink: (url: string) => void;
            shareContent: (params: { text?: string; link?: string }) => Promise<{ status: string }>;
        };
    }
}
```

## API Reference

### Данные инициализации

| Поле | Тип | Описание |
|------|-----|----------|
| `initData` | `string` | URL-encoded строка для валидации на сервере |
| `initDataUnsafe` | `object` | JSON с данными пользователя (НЕ для валидации) |
| `initDataUnsafe.user` | `object` | `id, first_name, last_name, username, language_code, photo_url` |
| `initDataUnsafe.chat` | `object` | `{ id, type: 'DIALOG'\|'CHAT'\|'CHANNEL' }` |
| `initDataUnsafe.start_param` | `string` | Payload из deep link `?startapp=` |
| `platform` | `string` | `'ios' \| 'android' \| 'desktop' \| 'web'` |
| `version` | `string` | Формат: `25.9.16` |

### Диплинки

Формат: `https://max.ru/<botName>?startapp=<payload>`

- `payload` — до 512 символов (латиница, цифры, `_`, `-`)
- Доступен через `initDataUnsafe.start_param`
- Диплинк для шеринга: `https://max.ru/:share?text=<URL-encoded>`

### BackButton

```ts
window.WebApp.BackButton.show()
window.WebApp.BackButton.hide()
window.WebApp.BackButton.isVisible  // boolean
window.WebApp.BackButton.onClick(callback)
window.WebApp.BackButton.offClick(callback)
```

### DeviceStorage (не поддерживается веб-клиентом)

```ts
window.WebApp.DeviceStorage.setItem(key, value)   // → { status: 'updated'|'removed' }
window.WebApp.DeviceStorage.getItem(key)           // → { key, value }
window.WebApp.DeviceStorage.removeItem(key)
window.WebApp.DeviceStorage.clear()
```

### SecureStorage (до 10 ключей на юзера, не веб)

```ts
window.WebApp.SecureStorage.setItem(key, value)
window.WebApp.SecureStorage.getItem(key)
window.WebApp.SecureStorage.removeItem(key)
window.WebApp.SecureStorage.clear()
```

### HapticFeedback (не десктоп/веб)

```ts
// Impact (кнопки, интерактив)
window.WebApp.HapticFeedback.impactOccurred(style, disableVibrationFallback?)
// style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'

// Notification (события)
window.WebApp.HapticFeedback.notificationOccurred(type, disableVibrationFallback?)
// type: 'error' | 'success' | 'warning'

// Selection (изменение выбора, не подтверждение!)
window.WebApp.HapticFeedback.selectionChanged(disableVibrationFallback?)
```

### Sharing

```ts
// Внешние приложения
window.WebApp.shareContent({ text, link })  // → { status: 'shared'|'cancelled' }
// Внутри MAX
window.WebApp.shareMaxContent({ text, link })
window.WebApp.shareMaxContent({ mid, chatType: 'DIALOG'|'CHAT' })  // репост медиа
```

### Открытие ссылок

```ts
window.WebApp.openLink(url)          // внешний браузер
window.WebApp.openMaxLink(url)       // диплинк внутри MAX (https://max.ru/<url>)
```

### Экран

```ts
window.WebApp.requestScreenMaxBrightness()  // макс яркость на 30 сек
window.WebApp.restoreScreenBrightness()
window.WebApp.ScreenCapture.enableScreenCapture()
window.WebApp.ScreenCapture.disableScreenCapture()
```

### Прочее

```ts
window.WebApp.requestContact()         // → { phone, authDate, hash }
window.WebApp.openCodeReader(fileSelect?)  // → { value }
window.WebApp.downloadFile(url, fileName)  // → { status: 'downloading'|'cancelled' }
window.WebApp.enableClosingConfirmation()
window.WebApp.disableClosingConfirmation()
```

### BiometricManager (не десктоп/веб)

```ts
window.WebApp.BiometricManager.init()
window.WebApp.BiometricManager.isInited
window.WebApp.BiometricManager.isBiometricAvailable
window.WebApp.BiometricManager.requestAccess(reason?)
window.WebApp.BiometricManager.authenticate(reason?)  // → { status: 'authorized', token }
window.WebApp.BiometricManager.updateBiometricToken(token?)
window.WebApp.BiometricManager.openSettings()
```

### NfcManager (только Android)

```ts
window.WebApp.NfcManager.init()
window.WebApp.NfcManager.isInited
window.WebApp.NfcManager.openSystemSettings()
window.WebApp.NfcManager.emulateNfcTag(nfctag?)  // → { status: 'scanned'|'stopped' }
```

## Проектные паттерны

### MAX BackButton — единый механизм

В `App.tsx`:
- `backHandlerRef` + `backHandlerTick` для реактивного обновления
- `backBtnRef` для подписки/отписки от нативного события
- useEffect на `[isTextSettingsOpen, activeLegalDoc, isKnowledgeOpen, backHandlerTick]`

Приоритет: TextSettings → Knowledge → LegalDoc → ZodiacModal → Menu → hide
Каждый контейнер сам регистрирует свой handler через `onSetBackHandler` проп.

### DeviceStorage + localStorage fallback

Всегда используем `localStorage` как fallback + `DeviceStorage` для MAX:

```ts
localStorage.setItem('key', value)
window.WebApp?.DeviceStorage?.setItem('key', value)

// Чтение: сначала DeviceStorage, потом localStorage
const saved = await storage.getItem('key');
if (saved?.value) { /* use it */ }
else { fallback to localStorage }
```

### HapticFeedback — утилиты

`src/utils/haptics.ts`:
- `triggerSuccessHaptic()` — `notificationOccurred('success')`
- `triggerSelectionHaptic()` — `selectionChanged()`

### Комментарий по платформам

- **HapticFeedback**: не работает на desktop/web — оборачиваем в проверку
- **DeviceStorage**: не работает на web — всегда есть fallback на localStorage
- **shareContent**: не работает на web — fallback на `navigator.share`
- **BackButton**: не работает на web — не вызывается

## Deployment

- Хостинг: GitHub Pages
- URL мини-приложения задаётся в платформе MAX для партнёров
- Deep link: `https://max.ru/<botName>?startapp`

## Reference files
- doc/MAXBridge.md — полная документация MAX Bridge
- src/types/max-bridge.d.ts — TypeScript типы
- src/App.tsx — BackButton implementation
- src/utils/haptics.ts — haptic wrappers
