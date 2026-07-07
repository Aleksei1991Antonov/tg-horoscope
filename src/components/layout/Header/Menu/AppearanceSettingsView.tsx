import React, { memo, useState } from 'react';
import { Trash2, MoonStar, Sparkles, Sun, Moon, Lock } from 'lucide-react';
import { triggerSuccessHaptic } from '../../../../utils/haptics';

const LIGHT_TO_DARK: Record<string, string> = {
    'max-light': 'max-dark',
    'morning-magic': 'night-ether',
    'nova-day': 'nova-night',
};

const DARK_TO_LIGHT: Record<string, string> = {};
for (const [k, v] of Object.entries(LIGHT_TO_DARK)) {
    DARK_TO_LIGHT[v] = k;
}

const ALL_DARK_KEYS = new Set(Object.values(LIGHT_TO_DARK));

interface AppearanceSettingsViewProps {
    fontScale: 'small' | 'medium' | 'large';
    setFontScale: (scale: 'small' | 'medium' | 'large') => void;
    theme: string;
    setTheme: (theme: string) => void;
    resolvedTheme: string;
}

export const AppearanceSettingsView: React.FC<AppearanceSettingsViewProps> = memo(({
    fontScale,
    setFontScale,
    theme,
    setTheme,
    resolvedTheme,
}) => {
    const isDark = ALL_DARK_KEYS.has(resolvedTheme);

    const isPremiumActive = (): boolean => {
        const until = localStorage.getItem('nova_premium_until');
        if (!until) return false;
        return parseInt(until, 10) > Date.now();
    };

    const premium = isPremiumActive();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteCode, setDeleteCode] = useState('');

    const handleScaleChange = (newScale: 'small' | 'medium' | 'large') => {
        if (newScale === fontScale) return;
        void triggerSuccessHaptic();
        setFontScale(newScale);
    };

    const handleFullReset = async () => {
        setShowDeleteConfirm(false);
        setDeleteCode('');
        void triggerSuccessHaptic();
        const keys = ['user_zodiac_index', 'user_zodiac', 'user_love_zodiac_name', 'user_partner_choice', 'love_rhythm_accepted_v1', 'love_privacy_accepted', 'app-font-scale', 'app-appearance-mode', 'user_theme', 'has_astro_access', 'force_lock_screen', 'astro_retry_count', 'astro_retry_time', 'nova_premium_until', 'nova_love_horoscope', 'nova_badge', 'nova_promo_used', 'nova_pending_payment', 'nova_receipt_contact'];
        for (const key of keys) localStorage.removeItem(key);
        window.location.reload();
    };

    const handleDeleteClick = () => {
        setDeleteCode('');
        setShowDeleteConfirm(true);
    };

    const scales = [
        { id: 'small', label: 'А', name: 'Компакт' },
        { id: 'medium', label: 'А', name: 'Стандарт' },
        { id: 'large', label: 'А', name: 'Крупный' }
    ] as const;

    const predictionTextSize = fontScale === 'large' ? 'text-[1.25rem]' : 'text-[1rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const iconSize = fontScale === 'large' ? 32 : 24;
    const iconPadding = fontScale === 'large' ? 'p-4' : 'p-3';

    const toggleDark = () => {
        const target = isDark ? DARK_TO_LIGHT[theme] || 'max-light' : LIGHT_TO_DARK[theme] || 'max-dark';
        setTheme(target);
    };

    return (
        <div className="absolute inset-0 z-[5000] bg-[var(--c-bg)] flex flex-col font-manrope overflow-hidden">
            {/* Header */}
            <div className="bg-[var(--c-bg)] border-b border-[var(--c-border)] px-4 h-14 flex items-center justify-between shrink-0">
                <div className="w-16" />
                <span className="text-[1.0625rem] font-bold text-[var(--c-text)] uppercase tracking-tight">Настройки</span>
                <div className="w-16" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-10 overflow-y-auto no-scrollbar">

                {/* Scale Selector */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[0.6875rem] font-bold text-[var(--c-text-30)] uppercase tracking-[0.2em]">Размер текста</span>
                        <span className="text-[0.6875rem] font-black text-[var(--c-primary)] uppercase tracking-wider">
                            {fontScale === 'small' ? 'Компакт' : fontScale === 'medium' ? 'Стандарт' : 'Крупный'}
                        </span>
                    </div>

                    <div className="bg-[var(--c-surface-raise)] p-1 rounded-2xl flex items-center relative border border-[var(--c-border)]">
                        {scales.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => handleScaleChange(s.id)}
                                className="relative z-10 flex-1 py-3 flex flex-col items-center justify-center"
                            >
                                <span className={`
                                    font-black transition-none
                                    ${s.id === 'small' ? 'text-sm' : s.id === 'medium' ? 'text-lg' : 'text-2xl'}
                                    ${fontScale === s.id ? 'text-[var(--c-text)]' : 'text-[var(--c-text-20)]'}
                                `}>
                                    {s.label}
                                </span>
                            </button>
                        ))}

                        <div
                            className="absolute top-1 bottom-1 transition-all duration-300 ease-out bg-[var(--c-surface-elevated)] rounded-xl border border-[var(--c-border)]"
                            style={{
                                width: 'calc(33.33% - 4px)',
                                left: fontScale === 'small' ? '4px' : fontScale === 'medium' ? '33.33%' : 'calc(66.66% - 4px)'
                            }}
                        />
                    </div>
                </div>

                {/* Preview Card */}
                <div className="space-y-3">
                    <div className="text-[0.6875rem] font-bold text-[var(--c-text-30)] uppercase tracking-[0.2em] px-1">Превью</div>
                    <div className="relative w-full bg-gradient-to-b from-white/[0.12] to-white/[0.05] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] p-6 overflow-hidden">
                        <div className="flex mb-6">
                            <div className={`shrink-0 ${iconPadding} bg-[var(--c-primary-10)] rounded-2xl text-[var(--c-primary)] border border-[var(--c-primary-20)]`}>
                                <MoonStar size={iconSize} fill="currentColor" />
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 opacity-50">
                                <Sparkles size={12} className="text-[var(--c-primary)]" />
                                <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-[var(--c-text)]`}>Пример текста</span>
                            </div>
                        </div>

                        <p className={`${predictionTextSize} text-[var(--c-text-90)] font-medium leading-relaxed transition-none`}>
                            Звёзды говорят, что выбранный масштаб идеально подходит для чтения ваших прогнозов.
                        </p>
                    </div>
                </div>

                {/* Dark/Light Toggle */}
                <div className="space-y-4">
                    <div className="text-[0.6875rem] font-bold text-[var(--c-text-30)] uppercase tracking-[0.2em] px-1">Оформление</div>
                    <button
                        onClick={() => { void triggerSuccessHaptic(); toggleDark(); }}
                        className="w-full p-4 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center justify-between active:scale-[0.98] transition-all"
                    >
                        <div className="flex items-center gap-3">
                            {isDark ? <Moon size={16} className="text-[var(--c-primary)]" /> : <Sun size={16} className="text-[var(--c-primary)]" />}
                            <span className="text-[0.625rem] font-black uppercase tracking-wider text-[var(--c-text)]">
                                {isDark ? 'Тёмная тема' : 'Светлая тема'}
                            </span>
                        </div>
                        <span className="text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider">Нажмите для смены</span>
                    </button>
                </div>

                {/* Theme Selector */}
                <div className="space-y-4">
                    <div className="text-[0.6875rem] font-bold text-[var(--c-text-30)] uppercase tracking-[0.2em] px-1">
                        Тема оформления
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { lightId: 'max-light', lightLabel: 'MAX Чистый', lightColor: '#471AFF', secondary: '#9500FF', darkId: 'max-dark', darkLabel: 'MAX Глубокий', darkColor: '#6E1AFF' },
                            { lightId: 'morning-magic', lightLabel: 'Тихая Роскошь', lightColor: '#C4756B', secondary: '#E8C4A0', darkId: 'night-ether', darkLabel: 'Ночной Эфир', darkColor: '#8E9AAF' },
                            { lightId: 'nova-day', lightLabel: 'NOVA День', lightColor: '#FF1CAA', secondary: '#FF8DCC', darkId: 'nova-night', darkLabel: 'NOVA Ночь', darkColor: '#FF4DB8' },
                        ].map(t => {
                            const isNova = t.lightId === 'nova-day';
                            const locked = isNova && !premium;
                            const item = isDark
                                ? { id: t.darkId, label: t.darkLabel, color: t.darkColor, secondary: t.secondary }
                                : { id: t.lightId, label: t.lightLabel, color: t.lightColor, secondary: t.secondary };
                            return (
                                <button
                                    key={item.id}
                                    disabled={locked}
                                    onClick={() => { if (!locked) { void triggerSuccessHaptic(); setTheme(item.id); } }}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${resolvedTheme === item.id ? 'bg-[var(--c-surface-elevated)] border border-[var(--c-border)]' : 'bg-[var(--c-surface)] border border-[var(--c-border)]'} ${locked ? 'opacity-40' : ''}`}
                                >
                                    <div className="flex -space-x-1.5">
                                        <div className="w-7 h-7 rounded-full border-2 border-[var(--c-border)]" style={{ backgroundColor: item.color }} />
                                        <div className="w-7 h-7 rounded-full border-2 border-[var(--c-border)]" style={{ backgroundColor: item.secondary }} />
                                    </div>
                                    <span className={`text-[0.5625rem] font-black uppercase tracking-wider ${resolvedTheme === item.id ? 'text-[var(--c-text)]' : 'text-[var(--c-text-30)]'}`}>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4 space-y-3">
                    <button
                        onClick={handleDeleteClick}
                        className="w-full p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-center gap-2 text-red-500 active:bg-red-500/20 transition-colors"
                    >
                        <Trash2 size={16} />
                        <span className="text-[0.75rem] font-black uppercase tracking-widest">Удалить аккаунт</span>
                    </button>
                    <button
                        onClick={() => { localStorage.setItem('force_lock_screen', 'true'); window.location.reload(); }}
                        className="w-full p-4 rounded-2xl bg-[var(--c-fill)] border border-[var(--c-border)] flex items-center justify-center gap-2 text-[var(--c-text-50)] active:opacity-60 transition-colors"
                    >
                        <Lock size={16} />
                        <span className="text-[0.75rem] font-black uppercase tracking-widest">Тест блокировки</span>
                    </button>
                </div>

                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-[10000] bg-black/40 backdrop-blur-sm flex items-center justify-center px-6 animate-in fade-in duration-200">
                        <div className="w-full max-w-sm bg-[var(--c-bg)] rounded-3xl p-6 shadow-2xl border border-[var(--c-border)] animate-in zoom-in-95 duration-200 space-y-4">
                            <div className="text-center space-y-2">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                                    <Trash2 size={20} className="text-red-500" />
                                </div>
                                <div className={`${labelSize} font-black text-[var(--c-text)] uppercase`}>Удалить аккаунт</div>
                                <p className={`text-[0.5rem] font-medium text-[var(--c-text-40)] leading-relaxed`}>
                                    Все ваши данные будут удалены: настройки, знак зодиака, любимые гороскопы и история.
                                    Если у вас есть активная подписка NOVA Premium, она будет потеряна без возможности восстановления.
                                    Это действие необратимо.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className={`text-[0.5rem] font-bold text-[var(--c-text-30)] uppercase tracking-wider px-1`}>
                                    Введите код <span className="text-[var(--c-text)]">0000</span> для подтверждения
                                </div>
                                <input
                                    value={deleteCode}
                                    onChange={e => setDeleteCode(e.target.value)}
                                    placeholder="0000"
                                    className="w-full px-4 py-3 rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text)] font-bold text-center text-lg tracking-[0.3em] outline-none focus:border-red-500/40 transition-colors"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { setShowDeleteConfirm(false); setDeleteCode(''); }}
                                    className="flex-1 py-3 rounded-2xl bg-[var(--c-fill)] border border-[var(--c-border)] text-[var(--c-text-50)] font-black text-[0.625rem] uppercase tracking-widest active:opacity-60 transition-all"
                                >
                                    Отмена
                                </button>
                                <button
                                    onClick={handleFullReset}
                                    disabled={deleteCode !== '0000'}
                                    className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-black text-[0.625rem] uppercase tracking-widest active:scale-95 transition-all disabled:opacity-40"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
