const haptic = () => window.Telegram?.WebApp?.HapticFeedback;

export const triggerSuccessHaptic = async (): Promise<void> => {
    try {
        haptic()?.notificationOccurred('success');
    } catch {}
};

export const triggerWarningHaptic = async (): Promise<void> => {
    try {
        haptic()?.notificationOccurred('warning');
    } catch {}
};

export const triggerErrorHaptic = async (): Promise<void> => {
    try {
        haptic()?.notificationOccurred('error');
    } catch {}
};

export const triggerSelectionHaptic = async (): Promise<void> => {
    await triggerSuccessHaptic();
};

export const triggerImpactHaptic = async (): Promise<void> => {
    await triggerSuccessHaptic();
};