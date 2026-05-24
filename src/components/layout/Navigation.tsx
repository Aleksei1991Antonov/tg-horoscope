import React from 'react';
import { Activity, Heart, Sparkles } from 'lucide-react';
import { triggerSelectionHaptic } from '../../utils/haptics';

const NAV_ITEMS = [
    { id: 'rhythm', label: 'Ритм', icon: Activity },
    { id: 'love', label: 'Любовь', icon: Heart },
    { id: 'karma', label: 'Карма', icon: Sparkles },
];

interface NavigationProps {
    activeTab: string;
    onTabChange: (id: string) => void;
    // Добавляем пропс для контроля размера
    fontScale: 'small' | 'medium' | 'large';
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, fontScale }) => {

    // Вычисляем высоту и размеры на основе масштаба
    const navHeight = fontScale === 'large' ? 'h-20' : 'h-16';
    const iconSize = fontScale === 'small' ? 20 : fontScale === 'medium' ? 22 : 24;
    const textSize = fontScale === 'small' ? 'text-[0.5rem]' : fontScale === 'medium' ? 'text-[0.5625rem]' : 'text-[0.6875rem]';

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-[calc(12px+env(safe-area-inset-bottom))] pt-2">
            {/* Стеклянная подложка */}
            <div className="absolute inset-0 bg-[#050510]/85 backdrop-blur-3xl border-t border-white/5" />

            <div className={`relative flex justify-around items-center max-w-md mx-auto transition-all duration-300 ${navHeight}`}>
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                void triggerSelectionHaptic();
                                onTabChange(item.id);
                            }}
                            className="relative flex flex-col items-center justify-center flex-1 transition-all duration-300 outline-none border-none bg-transparent cursor-pointer group"
                        >
                            {/* Эффект свечения */}
                            {isActive && (
                                <div className="absolute -top-2 w-12 h-12 bg-fuchsia-500/10 blur-xl rounded-full animate-pulse" />
                            )}

                            {/* Иконка - размер меняется плавно */}
                            <div className={`relative z-10 mb-1 transition-all duration-300 ${
                                isActive ? 'text-fuchsia-500 scale-110' : 'text-white/30 group-hover:text-white/50'
                            }`}>
                                <Icon
                                    size={iconSize}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={isActive ? 'drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]' : ''}
                                />
                            </div>

                            {/* Текст - увеличиваем для читаемости */}
                            <span className={`relative z-10 uppercase tracking-[0.15em] transition-all duration-300 ${textSize} ${
                                isActive ? 'text-white font-black opacity-100' : 'text-white/40 font-bold opacity-60'
                            }`}>
                                {item.label}
                            </span>

                            {/* Индикатор-полоска */}
                            <div className={`absolute -bottom-1 w-5 h-0.5 rounded-full transition-all duration-500 ${
                                isActive ? 'bg-fuchsia-500 shadow-[0_0_10px_#d946ef] opacity-100' : 'bg-transparent opacity-0'
                            }`} />
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};