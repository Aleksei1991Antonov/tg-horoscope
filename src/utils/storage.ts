export const storage = {
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    },
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    },
    removeItem(key: string): void {
        localStorage.removeItem(key);
    },
};

export const secureStorage = {
    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    },
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    },
    removeItem(key: string): void {
        localStorage.removeItem(key);
    },
};

export const PREMIUM_KEYS = ['nova_premium_until', 'nova_love_horoscope', 'nova_badge', 'nova_promo_used'] as const;
