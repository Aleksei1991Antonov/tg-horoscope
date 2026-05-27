import React, { useCallback } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import type { SynergyResult } from '../../core/engines/SynergyEngine';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface SynergyModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: SynergyResult;
    fontScale: 'small' | 'medium' | 'large';
}

export const SynergyModal: React.FC<SynergyModalProps> = ({
    isOpen,
    onClose,
    data,
    fontScale
}) => {
    const titleSize = fontScale === 'large' ? 'text-2xl' : 'text-xl';
    const bodyTextSize = fontScale === 'large' ? 'text-[1.0625rem]' : 'text-[0.875rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const percentSize = fontScale === 'large' ? 'text-[2.4rem]' : 'text-[2rem]';

    const iconSize = fontScale === 'large' ? 28 : 22;

    const handleClose = useCallback(() => {
        void triggerSuccessHaptic();
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[var(--c-bg-90)] backdrop-blur-md" onClick={handleClose} />

            <div className="relative w-full max-w-sm bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
                <div className="flex-1 overflow-y-auto no-scrollbar p-8 pt-10">
                    <div className="flex mb-8">
                        <Gem size={iconSize} className="text-[var(--c-secondary)]" />
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 opacity-50 mb-3">
                            <Sparkles size={12} className="text-[var(--c-secondary)]" />
                            <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-[var(--c-text)]`}>Гармония знаков</span>
                        </div>
                        <h2 className={`${titleSize} font-black text-[var(--c-text)] tracking-tight leading-tight`}>
                            Синергия
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <p className={`${bodyTextSize} text-[var(--c-text-60)] font-medium leading-relaxed`}>
                            Синергия показывает, с кем из знаков у тебя сегодня <span className="text-[var(--c-secondary)] font-bold">максимальный резонанс</span>. Это не просто совместимость — мы учитываем положение Луны прямо сейчас, чтобы найти того, с кем ты на одной волне.
                        </p>

                        <div className="flex items-center justify-between">
                            <span className={`${labelSize} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Лучший компаньон</span>
                            <span className={`${bodyTextSize} font-black text-[var(--c-secondary)]`}>{data.icon} {data.sign}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className={`${labelSize} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Совместимость</span>
                                <span className={`${percentSize} font-black text-[var(--c-secondary)]`}>{data.percent}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/[0.05] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--c-secondary)] rounded-full" style={{ width: `${data.percent}%` }} />
                            </div>
                        </div>

                        <p className={`${bodyTextSize} text-[var(--c-text-60)] font-medium leading-relaxed`}>
                            {data.description}
                        </p>

                        <div className="space-y-4 pt-4 border-t border-[var(--c-border)]">
                            <span className={`${labelSize} font-black uppercase tracking-widest text-[var(--c-text-40)]`}>Как мы считаем</span>
                            <p className={`${labelSize} text-[var(--c-text-30)] font-medium leading-relaxed`}>
                                Мы смотрим на твою стихию и стихию партнёра, на то, как вы расположены в зодиакальном круге, и добавляем влияние Луны — её знак и фазу. Всё это даёт честный процент вашей совместимости сегодня.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8 pt-2 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        className={`w-full bg-[var(--c-secondary)] text-[var(--c-bg)] rounded-[24px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg ${
                            fontScale === 'large' ? 'py-6 text-[0.875rem]' : 'py-5 text-[0.6875rem]'
                        }`}
                    >
                        Готово
                    </button>
                </div>
            </div>
        </div>
    );
};
