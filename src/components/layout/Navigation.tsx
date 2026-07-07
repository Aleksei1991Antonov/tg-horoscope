import React from 'react';
import { Activity, Heart, CircleDot, Star } from 'lucide-react';
import { triggerSelectionHaptic } from '../../utils/haptics';

const LOVE_TAB_ACCENT = '#FF1CAA';
const LOVE_TAB_OPACITY = 0.8;
const NAV_ITEMS = [
    { id: 'rhythm', label: 'Ритм', icon: Activity },
    { id: 'love', label: 'Любовь', icon: Heart },
    { id: 'premium', label: 'Premium', icon: Star },
    { id: 'core', label: 'Core', icon: CircleDot },
];

interface NavigationProps {
    activeTab: string;
    onTabChange: (id: string) => void;
    fontScale: 'small' | 'medium' | 'large';
    theme: string;
    onOpenPremium?: () => void;
}

const isNova = (t: string) => t === 'nova-day' || t === 'nova-night';

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, fontScale, theme, onOpenPremium }) => {

    // Вычисляем высоту и размеры на основе масштаба
    const navHeight = fontScale === 'large' ? 'h-20' : 'h-16';
    const iconSize = fontScale === 'small' ? 20 : fontScale === 'medium' ? 22 : 24;
    const textSize = fontScale === 'small' ? 'text-[0.5rem]' : fontScale === 'medium' ? 'text-[0.5625rem]' : 'text-[0.6875rem]';

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-[calc(12px+env(safe-area-inset-bottom))] pt-2">
            {/* Стеклянная подложка */}
            <div className="absolute inset-0 bg-[var(--c-bg)] border-t border-[var(--c-border)]" />

            <div className={`relative flex justify-around items-center max-w-md mx-auto transition-all duration-300 ${navHeight}`}>
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    const isPremium = item.id === 'premium';

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                void triggerSelectionHaptic();
                                if (isPremium) {
                                    onOpenPremium?.();
                                } else {
                                    onTabChange(item.id);
                                }
                            }}
                            className="relative flex flex-col items-center justify-center flex-1 transition-all duration-300 outline-none border-none bg-transparent cursor-pointer group"
                        >
                            {/* Эффект свечения */}
                            {isActive && (
                                <div className="absolute -top-2 w-12 h-12 blur-xl rounded-full"
                                     style={{ backgroundColor: isPremium ? 'rgba(255,28,170,0.08)' : (item.id === 'love' ? (isNova(theme) ? 'var(--c-primary-10)' : 'rgba(255,28,170,0.08)') : 'var(--c-primary-10)') }} />
                            )}

                            {/* Иконка */}
                            <div className="relative z-10 mb-1 transition-all duration-300"
                                 style={{
                                     color: isActive
                                          ? (isPremium || item.id === 'love' ? (isNova(theme) ? 'var(--c-primary)' : LOVE_TAB_ACCENT) : 'var(--c-primary)')
                                          : 'var(--c-text-30)',
                                     transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                     opacity: isActive && (isPremium || item.id === 'love') ? (isNova(theme) ? 1 : LOVE_TAB_OPACITY) : 1
                                 }}>
                                <Icon
                                    size={iconSize}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>

                            {/* Текст */}
                            <span className={`relative z-10 uppercase tracking-[0.15em] transition-all duration-300 ${textSize} ${
                                isActive ? 'font-semibold' : 'text-[var(--c-text-40)] font-bold opacity-60'
                            }`}
                                  style={isActive ? {
                                      color: isPremium || item.id === 'love' ? (isNova(theme) ? 'var(--c-primary)' : LOVE_TAB_ACCENT) : 'var(--c-primary)',
                                      opacity: isPremium || item.id === 'love' ? (isNova(theme) ? 1 : LOVE_TAB_OPACITY) : 1
                                  } : {}}>
                                {item.label}
                            </span>

                            {/* Индикатор-полоска */}
                            <div className="absolute -bottom-1 w-5 h-0.5 rounded-full transition-all duration-300"
                                 style={{
                                     backgroundColor: isActive
                                          ? (isPremium || item.id === 'love' ? (isNova(theme) ? 'var(--c-primary)' : LOVE_TAB_ACCENT) : 'var(--c-primary)')
                                         : 'transparent',
                                     opacity: isActive ? (isPremium || item.id === 'love' ? (isNova(theme) ? 1 : LOVE_TAB_OPACITY) : 1) : 0
                                 }} />
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};