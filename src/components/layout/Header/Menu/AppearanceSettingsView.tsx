import React, { memo } from 'react';
import { Trash2, MoonStar, Sparkles, Sun, Moon } from 'lucide-react';
import { triggerSuccessHaptic } from '../../../../utils/haptics';

const LIGHT_TO_DARK: Record<string, string> = {
    'max-light': 'max-dark',
    'morning-magic': 'night-ether',
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
}

export const AppearanceSettingsView: React.FC<AppearanceSettingsViewProps> = memo(({
    fontScale,
    setFontScale,
    theme,
    setTheme,
}) => {
    const isDark = ALL_DARK_KEYS.has(theme);

    const handleToggleDark = (dark: boolean) => {
        void triggerSuccessHaptic();
        if (dark && !isDark) {
            setTheme(LIGHT_TO_DARK[theme] || 'max-dark');
        } else if (!dark && isDark) {
            setTheme(DARK_TO_LIGHT[theme] || 'max-light');
        }
    };

    const handleScaleChange = (newScale: 'small' | 'medium' | 'large') => {
        if (newScale === fontScale) return;
        void triggerSuccessHaptic();
        setFontScale(newScale);
    };

    const handleFullReset = async () => {
        if (!window.confirm("Сбросить все данные?")) return;
        void triggerSuccessHaptic();
        const keys = ['user_zodiac_index', 'love_rhythm_accepted_v1', 'app-font-scale'];
        keys.forEach(key => {
            localStorage.removeItem(key);
            try { window.WebApp?.DeviceStorage?.setItem(key, ''); } catch {}
        });
        window.location.reload();
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

                    <div className="bg-[var(--c-surface)] p-1 rounded-2xl flex items-center relative border border-[var(--c-border)]">
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
                            Звезды говорят, что выбранный масштаб идеально подходит для чтения ваших прогнозов.
                        </p>
                    </div>
                </div>

                {/* Dark Mode Toggle */}
                <div className="space-y-4">
                    <div className="text-[0.6875rem] font-bold text-[var(--c-text-30)] uppercase tracking-[0.2em] px-1">Режим</div>
                    <div className="bg-[var(--c-surface)] p-1 rounded-2xl flex items-center relative border border-[var(--c-border)]">
                        {[
                            { id: false, label: 'Светлая', Icon: Sun },
                            { id: true, label: 'Тёмная', Icon: Moon },
                        ].map(mode => {
                            const Icon = mode.Icon;
                            const active = isDark === mode.id;
                            return (
                                <button
                                    key={String(mode.id)}
                                    onClick={() => handleToggleDark(mode.id)}
                                    className="relative z-10 flex-1 py-3 flex items-center justify-center gap-2"
                                >
                                    <Icon
                                        size={16}
                                        className={active ? 'text-[var(--c-text)]' : 'text-[var(--c-text-20)]'}
                                    />
                                    <span className={`text-[0.625rem] font-black uppercase tracking-wider ${active ? 'text-[var(--c-text)]' : 'text-[var(--c-text-20)]'}`}>
                                        {mode.label}
                                    </span>
                                </button>
                            );
                        })}
                        <div
                            className="absolute top-1 bottom-1 transition-all duration-300 ease-out bg-[var(--c-surface-elevated)] rounded-xl border border-[var(--c-border)]"
                            style={{
                                width: 'calc(50% - 4px)',
                                left: isDark ? 'calc(50% + 2px)' : '4px'
                            }}
                        />
                    </div>
                </div>

                {/* Theme Selector */}
                <div className="space-y-4">
                    <div className="text-[0.6875rem] font-bold text-[var(--c-text-30)] uppercase tracking-[0.2em] px-1">
                        {isDark ? 'Тёмная тема' : 'Светлая тема'}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { lightId: 'morning-magic', lightLabel: 'Тихая Роскошь', lightColor: '#C4756B', secondary: '#E8C4A0', darkId: 'night-ether', darkLabel: 'Ночной Эфир', darkColor: '#8E9AAF' },
                            { lightId: 'max-light', lightLabel: 'MAX Чистый', lightColor: '#471AFF', secondary: '#9500FF', darkId: 'max-dark', darkLabel: 'MAX Глубокий', darkColor: '#6E1AFF' },
                        ].map(t => {
                            const item = isDark
                                ? { id: t.darkId, label: t.darkLabel, color: t.darkColor, secondary: t.secondary }
                                : { id: t.lightId, label: t.lightLabel, color: t.lightColor, secondary: t.secondary };
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => { void triggerSuccessHaptic(); setTheme(item.id); }}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl ${theme === item.id ? 'bg-[var(--c-surface-elevated)] border border-[var(--c-border)]' : 'bg-[var(--c-surface)] border border-[var(--c-border)]'}`}
                                >
                                    <div className="flex -space-x-1.5">
                                        <div className="w-7 h-7 rounded-full border-2 border-[var(--c-border)]" style={{ backgroundColor: item.color }} />
                                        <div className="w-7 h-7 rounded-full border-2 border-[var(--c-border)]" style={{ backgroundColor: item.secondary }} />
                                    </div>
                                    <span className={`text-[0.5625rem] font-black uppercase tracking-wider ${theme === item.id ? 'text-[var(--c-text)]' : 'text-[var(--c-text-30)]'}`}>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4">
                    <button
                        onClick={handleFullReset}
                        className="w-full p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-center gap-2 text-red-500 active:bg-red-500/20 transition-colors"
                    >
                        <Trash2 size={16} />
                        <span className="text-[0.75rem] font-black uppercase tracking-widest">Сбросить данные</span>
                    </button>
                </div>
            </div>
        </div>
    );
});
