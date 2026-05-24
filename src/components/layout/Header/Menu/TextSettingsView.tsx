import React, { memo } from 'react';
import { ChevronLeft, Trash2, MoonStar, Sparkles } from 'lucide-react';
import { triggerSuccessHaptic } from '../../../../utils/haptics';

interface TextSettingsViewProps {
    onBack: () => void;
    fontScale: 'small' | 'medium' | 'large';
    setFontScale: (scale: 'small' | 'medium' | 'large') => void;
}

export const TextSettingsView: React.FC<TextSettingsViewProps> = memo(({
                                                                            onBack,
                                                                            fontScale,
                                                                            setFontScale
                                                                        }) => {

    const handleScaleChange = (newScale: 'small' | 'medium' | 'large') => {
        if (newScale === fontScale) return;
        void triggerSuccessHaptic();
        setFontScale(newScale);
    };

    const handleFullReset = async () => {
        if (!window.confirm("Сбросить все данные?")) return;
        void triggerSuccessHaptic();
        const keys = ['user_zodiac_index', 'love_rhythm_accepted_v1', 'app-font-scale'];
        keys.forEach(key => localStorage.removeItem(key));
        window.location.reload();
    };

    const scales = [
        { id: 'small', label: 'А', name: 'Компакт' },
        { id: 'medium', label: 'А', name: 'Стандарт' },
        { id: 'large', label: 'А', name: 'Крупный' }
    ] as const;

    // Размеры из PredictionModal
    const predictionTextSize = fontScale === 'large' ? 'text-[1.25rem]' : 'text-[1rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const iconSize = fontScale === 'large' ? 32 : 24;
    const iconPadding = fontScale === 'large' ? 'p-4' : 'p-3';

    return (
        <div className="absolute inset-0 z-[5000] bg-[#050510] flex flex-col font-manrope overflow-hidden">
            {/* Header */}
            <div className="bg-[#050510] border-b border-white/5 px-4 h-14 flex items-center justify-between shrink-0">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-fuchsia-500 active:opacity-50 transition-opacity"
                >
                    <ChevronLeft size={24} />
                    <span className="text-[1.0625rem]">Назад</span>
                </button>
                <span className="text-[1.0625rem] font-bold text-white uppercase tracking-tight">Настройки</span>
                <div className="w-16" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 space-y-10 overflow-y-auto no-scrollbar">

                {/* Scale Selector (как в WelcomeScreen) */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-[0.6875rem] font-bold text-white/30 uppercase tracking-[0.2em]">Размер текста</span>
                        <span className="text-[0.6875rem] font-black text-fuchsia-500 uppercase tracking-wider">
                            {fontScale === 'small' ? 'Компакт' : fontScale === 'medium' ? 'Стандарт' : 'Крупный'}
                        </span>
                    </div>

                    <div className="bg-white/5 p-1 rounded-2xl flex items-center relative border border-white/5">
                        {scales.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => handleScaleChange(s.id)}
                                className="relative z-10 flex-1 py-3 flex flex-col items-center justify-center"
                            >
                                <span className={`
                                    font-black transition-none
                                    ${s.id === 'small' ? 'text-sm' : s.id === 'medium' ? 'text-lg' : 'text-2xl'}
                                    ${fontScale === s.id ? 'text-white' : 'text-white/20'}
                                `}>
                                    {s.label}
                                </span>
                            </button>
                        ))}

                        {/* Sliding Background Indicator */}
                        <div
                            className="absolute top-1 bottom-1 transition-all duration-300 ease-out bg-white/10 rounded-xl border border-white/10"
                            style={{
                                width: 'calc(33.33% - 4px)',
                                left: fontScale === 'small' ? '4px' : fontScale === 'medium' ? '33.33%' : 'calc(66.66% - 4px)'
                            }}
                        />
                    </div>
                </div>

                {/* Preview Card (Стилизация под PredictionModal) */}
                <div className="space-y-3">
                    <div className="text-[0.6875rem] font-bold text-white/30 uppercase tracking-[0.2em] px-1">Превью</div>
                    <div className="relative w-full bg-gradient-to-b from-white/[0.12] to-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 shadow-2xl overflow-hidden">
                        <div className="flex mb-6">
                            <div className={`shrink-0 ${iconPadding} bg-fuchsia-500/20 backdrop-blur-md rounded-2xl text-white border border-fuchsia-400/30`}>
                                <MoonStar size={iconSize} fill="white" className="drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
                            </div>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 opacity-50">
                                <Sparkles size={12} className="text-fuchsia-300" />
                                <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-white`}>Пример текста</span>
                            </div>
                        </div>

                        <p className={`${predictionTextSize} text-white/90 font-medium leading-relaxed transition-none`}>
                            Звезды говорят, что выбранный масштаб идеально подходит для чтения ваших прогнозов.
                        </p>
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