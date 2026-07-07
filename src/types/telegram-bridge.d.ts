export interface TelegramHapticFeedback {
    impactOccurred: (
        style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'
    ) => void;
    notificationOccurred: (
        type: 'error' | 'success' | 'warning'
    ) => void;
    selectionChanged: () => void;
}

export interface TelegramBackButton {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    isVisible: boolean;
}

declare global {
    interface Window {
        Telegram?: {
            WebApp?: {
                initData: string;
                initDataUnsafe: {
                    query_id?: string;
                    user?: {
                        id: number;
                        first_name: string;
                        last_name?: string;
                        username?: string;
                        language_code?: string;
                        is_premium?: boolean;
                        photo_url?: string;
                    };
                    start_param?: string;
                    auth_date?: number;
                    hash?: string;
                };
                platform: string;
                version: string;
                colorScheme: 'light' | 'dark';
                themeParams: Record<string, string>;
                isExpanded: boolean;
                viewportHeight: number;
                viewportStableHeight: number;
                HapticFeedback?: TelegramHapticFeedback;
                BackButton: TelegramBackButton;
                openLink: (url: string) => void;
                openTelegramLink: (url: string) => void;
                ready: () => void;
                expand: () => void;
                close: () => void;
                enableClosingConfirmation: () => void;
                disableClosingConfirmation: () => void;
                onEvent: (eventType: string, callback: () => void) => void;
                offEvent: (eventType: string, callback: () => void) => void;
            };
        };
    }
}

export {};
