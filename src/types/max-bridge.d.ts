// src/types/max-bridge.d.ts

export interface WebAppHapticFeedback {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => Promise<{ status: string }>;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => Promise<{ status: string }>;
    selectionChanged: () => Promise<{ status: string }>;
}

export interface WebAppBackButton {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    isVisible: boolean;
}

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

export {};
