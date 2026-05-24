# MAX Bridge

Библиотека MAX Bridge позволяет мини-приложениям корректно взаимодействовать с API MAX и API операционной системы на устройстве пользователя.

## Подключение библиотеки

Через CDN добавьте библиотеку max-web-app.js:

```html
<script src="https://st.max.ru/js/max-web-app.js"></script>
```

После подключения приложение получит доступ к объекту `WebApp` через глобальный объект `window`:

```js
window.WebApp
```

`window.WebApp` — глобальный объект, который связывает мини-приложение с клиентом MAX. Создаётся с каждым запуском сервиса, предзагружает данные и не требует отдельной инициализации.

---

## Функциональность

### Работа с данными инициализации

#### `window.WebApp.initData`
Строка со стартовыми параметрами в URL-кодировке (данные о пользователе, инициализация).

- **Тип:** `string`

#### `window.WebApp.initDataUnsafe`
Объект с данными из `initData` в виде JSON.

```ts
interface InitData {
    query_id: string;
    ip?: string;
    auth_date: number;
    hash: string;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        language_code: string;
        photo_url: string;
    };
    chat: {
        id: number;
        type: 'DIALOG' | 'CHAT' | 'CHANNEL';
    };
    start_param: string;
}
```

| Поле | Тип | Описание |
|------|-----|----------|
| `query_id` | `string` | Уникальный ID текущей сессии |
| `ip?` | `string` | IP-адрес пользователя |
| `auth_date` | `number` | Время выдачи данных |
| `hash` | `string` | Хеш для проверки достоверности |
| `user` | `object` | Данные пользователя |
| `user.id` | `number` | ID пользователя |
| `user.first_name` | `string` | Имя |
| `user.last_name` | `string` | Фамилия |
| `user.username` | `string` | Никнейм |
| `user.language_code` | `string` | Язык клиента MAX |
| `user.photo_url` | `string` | Ссылка на фото профиля |
| `chat` | `object` | Данные чата |
| `chat.id` | `number` | ID чата |
| `chat.type` | `string` | `DIALOG` / `CHAT` / `CHANNEL` |
| `start_param` | `string` | Значение из query-параметра `startapp` |

#### `window.WebApp.platform`
Платформа запуска.

- **Тип:** `'ios' | 'android' | 'desktop' | 'web'`

#### `window.WebApp.version`
Версия приложения MAX. Формат: `<year>.<build_number>.<patch>`, например `25.9.16`.

- **Тип:** `string`

---

### Работа с экраном

#### `window.WebApp.requestScreenMaxBrightness()`
Устанавливает яркость на максимум (30 сек).

```ts
window.WebApp.requestScreenMaxBrightness().then(({maxBrightness}) => {})
```

#### `window.WebApp.restoreScreenBrightness()`
Восстанавливает яркость.

```ts
window.WebApp.restoreScreenBrightness().then(({maxBrightness}) => {})
```

#### `window.WebApp.ScreenCapture.enableScreenCapture()`
Разрешает скриншоты/запись экрана.

```ts
window.WebApp.ScreenCapture.enableScreenCapture().then(({isScreenCaptureEnabled}) => {})
```

#### `window.WebApp.ScreenCapture.disableScreenCapture()`
Запрещает скриншоты/запись экрана.

```ts
window.WebApp.ScreenCapture.disableScreenCapture().then(({isScreenCaptureEnabled}) => {})
```

---

### Запрос номера телефона

#### `window.WebApp.requestContact()`
Запрашивает номер телефона в нативном модальном окне.

```ts
window.WebApp.requestContact().then(({phone, authDate, hash}) => {})
```

Возвращает:
- `phone` — номер телефона
- `authDate` — timestamp создания hash
- `hash` — хеш для проверки

**Верификация:** `HMAC_SHA256(authDate + phone + userId, botToken)`. Номер без `+` (7**********).

**Ошибки:**
- `user_refused_provide_phone_number` — пользователь отказался
- `request_error` — ошибка сети/backend

---

### Подтверждение закрытия

#### `window.WebApp.enableClosingConfirmation()`
Включает предупреждение о потере данных при закрытии.

#### `window.WebApp.disableClosingConfirmation()`
Выключает предупреждение.

---

### Открытие ссылок

#### `window.WebApp.openLink(url)`
Открывает ссылку во внешнем браузере.

#### `window.WebApp.openMaxLink(url)`
Открывает диплинк `https://max.ru/<url>` внутри MAX.

---

### Скачивание файла

#### `window.WebApp.downloadFile(url, file_name)`
Скачивает файл по HTTPS-ссылке.

```ts
window.WebApp.downloadFile(fileUrl, fileName).then(({status}) => {})
// status: 'downloading' | 'cancelled'
```

---

### Шеринг контента

#### `window.WebApp.shareContent(params)`
Нативный шеринг во внешние приложения.

```ts
window.WebApp.shareContent({text, link}).then(({status}) => {})
// status: 'shared' | 'cancelled'
```

#### `window.WebApp.shareMaxContent(params)`
Шеринг внутри MAX.

```ts
// Текст/ссылка
window.WebApp.shareMaxContent({text, link})

// Медиа/файл (через mid сообщения от бота)
window.WebApp.shareMaxContent({mid, chatType: 'DIALOG' | 'CHAT'})
```

---

### QR-коды

#### `window.WebApp.openCodeReader(fileSelect = true)`
Сканирование QR-кода. `fileSelect: true` — камера + галерея, `false` — только камера.

```ts
window.WebApp.openCodeReader().then(({value}) => {})
```

---

### Кнопка «Назад»

#### `window.WebApp.BackButton.show()` / `.hide()`
Показать/скрыть кнопку «Назад».

#### `window.WebApp.BackButton.isVisible`
- **Тип:** `boolean`

#### `window.WebApp.BackButton.onClick(callback)` / `.offClick(callback)`
Подписка/отписка от нажатия кнопки «Назад».

---

### Хранилище устройства (`DeviceStorage`)

Не поддерживается веб-клиентом.

#### `window.WebApp.DeviceStorage.setItem(key, value)`
```ts
window.WebApp.DeviceStorage.setItem(key, value).then(({status}) => {})
// status: 'updated' | 'removed'
```

#### `window.WebApp.DeviceStorage.getItem(key)`
```ts
window.WebApp.DeviceStorage.getItem(key).then(({key, value}) => {})
```

#### `window.WebApp.DeviceStorage.removeItem(key)`
```ts
window.WebApp.DeviceStorage.removeItem(key).then(({status}) => {})
```

#### `window.WebApp.DeviceStorage.clear()`
Очищает все ключи бота.

---

### Защищённое хранилище (`SecureStorage`)

Для токенов, секретов, аутентификации. До 10 ключей на пользователя. Не поддерживается веб-клиентом.

#### `window.WebApp.SecureStorage.setItem(key, value)`
#### `window.WebApp.SecureStorage.getItem(key)`
#### `window.WebApp.SecureStorage.removeItem(key)`
#### `window.WebApp.SecureStorage.clear()`

---

### Биометрия (`BiometricManager`)

Не поддерживается десктоп и веб-клиентом.

#### `window.WebApp.BiometricManager.init()`
Инициализация. Возвращает:

```ts
interface BiometryInfo {
    available: boolean;
    type: Array<'finger' | 'face' | 'unknown'>;
    accessRequested: boolean;
    accessGranted: boolean;
    tokenSaved: boolean;
    deviceId: string | null;
}
```

#### Свойства
- `isInited` — была ли инициализация
- `isBiometricAvailable` — доступна ли биометрия
- `isAccessRequested` — был ли запрос доступа
- `isAccessGranted` — предоставлен ли доступ
- `isBiometricTokenSaved` — сохранён ли токен
- `biometricType` — типы биометрии
- `deviceId` — ID устройства

#### Методы

```ts
window.WebApp.BiometricManager.requestAccess(reason?)
window.WebApp.BiometricManager.authenticate(reason?)
// → { status: 'authorized', token: string }

window.WebApp.BiometricManager.updateBiometricToken(token?, reason?)
// → { status: 'updated' | 'removed' }

window.WebApp.BiometricManager.openSettings()
```

---

### Тактильные отклики (`HapticFeedback`)

Не поддерживается десктоп и веб-клиентом.

#### `window.WebApp.HapticFeedback.impactOccurred(style, disableVibrationFallback?)`
Стили: `'light' | 'medium' | 'heavy' | 'rigid' | 'soft'`

#### `window.WebApp.HapticFeedback.notificationOccurred(type, disableVibrationFallback?)`
Типы: `'error' | 'success' | 'warning'`

#### `window.WebApp.HapticFeedback.selectionChanged(disableVibrationFallback?)`
При изменении выбора (не при подтверждении!).

---

### NFC-модуль (`NfcManager`)

Только Android.

#### `window.WebApp.NfcManager.init()`
Возвращает `{ available, enabled, accessRevoked? }`.

#### `window.WebApp.NfcManager.isInited`
#### `window.WebApp.NfcManager.openSystemSettings()`
#### `window.WebApp.NfcManager.emulateNfcTag(nfctag?)`
```ts
// → { status: 'scanned' | 'stopped' }
```

---

### Ошибки

```ts
{
    error: {
        code: string
    }
}
```

```ts
window.WebApp.SecureStorage.setItem('key', 'value')
    .then((result) => console.log('OK'))
    .catch(({error}) => console.error('Ошибка:', error.code))
```
