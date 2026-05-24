/**
 * Утилиты для тактильного отклика (MAX Bridge API).
 *
 * ВНИМАНИЕ: Тестирование показало, что на текущем устройстве стабильно работают
 * ТОЛЬКО методы типа notificationOccurred ('success', 'warning', 'error').
 * Методы impactOccurred и selectionChanged НЕ дают отклика.
 *
 * Для обеспечения вибрации все интерфейсные действия перенаправлены на 'success'.
 */

/**
 * Сигнал успешного действия (единственный стабильный метод для подтверждения).
 */
export const triggerSuccessHaptic = async (): Promise<void> => {
    const haptic = window.WebApp?.HapticFeedback;
    if (haptic) {
        try {
            haptic.notificationOccurred('success');
        } catch {
            // Игнорируем ошибки Bridge
        }
    }
};

/**
 * Сигнал предупреждения / важности.
 */
export const triggerWarningHaptic = async (): Promise<void> => {
    const haptic = window.WebApp?.HapticFeedback;
    if (haptic) {
        try {
            haptic.notificationOccurred('warning');
        } catch {
            // Игнорируем ошибки Bridge
        }
    }
};

/**
 * Сигнал ошибки.
 */
export const triggerErrorHaptic = async (): Promise<void> => {
    const haptic = window.WebApp?.HapticFeedback;
    if (haptic) {
        try {
            haptic.notificationOccurred('error');
        } catch {
            // Игнорируем ошибки Bridge
        }
    }
};

/**
 * Легкий отклик (выбор).
 * Перенаправлен на triggerSuccessHaptic, так как оригинальный selectionChanged не работает.
 */
export const triggerSelectionHaptic = async (): Promise<void> => {
    await triggerSuccessHaptic();
};

/**
 * Физический удар (impact).
 * Аргументы удалены, чтобы избежать ошибок ESLint (no-unused-vars),
 * так как метод перенаправлен на triggerSuccessHaptic.
 */
export const triggerImpactHaptic = async (): Promise<void> => {
    await triggerSuccessHaptic();
};