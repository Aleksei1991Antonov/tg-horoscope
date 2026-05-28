import React, { useCallback } from 'react';
import { Crown, Sparkles } from 'lucide-react';
import type { PowerHourMetrics } from '../../core/engines/PowerHourEngine';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface PowerHourModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: PowerHourMetrics;
    fontScale: 'small' | 'medium' | 'large';
}

export const PowerHourModal: React.FC<PowerHourModalProps> = ({
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
                        <Crown size={iconSize} className="text-[var(--c-primary)]" />
                    </div>

                    <div className="space-y-2 mb-6">
                        <div className="flex items-center gap-2 opacity-50 mb-3">
                            <Sparkles size={12} className="text-[var(--c-primary)]" />
                            <span className={`${labelSize} font-black uppercase tracking-[0.3em] text-[var(--c-text)]`}>Твой потенциал</span>
                        </div>
                        <h2 className={`${titleSize} font-black text-[var(--c-text)] tracking-tight leading-tight`}>
                            Час силы
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <p className={`${bodyTextSize} text-[var(--c-text-60)] font-medium leading-relaxed`}>
                            Это время твоей <span className="text-[var(--c-primary)] font-bold">максимальной проявленности</span>. Момент, когда твоя планета-управитель входит в резонанс с текущим часом.
                        </p>

                        <div className="flex items-center justify-between">
                            <span className={`${labelSize} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Час силы</span>
                            <span className={`${percentSize} font-black text-[var(--c-primary)]`}>{data.luckyHour}</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className={`${labelSize} font-bold text-[var(--c-text-30)] uppercase tracking-wider`}>Интенсивность</span>
                                <span className={`${bodyTextSize} font-black text-[var(--c-primary)]`}>{data.luckyPercent}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/[0.05] rounded-full overflow-hidden">
                                <div className="h-full bg-[var(--c-primary)] rounded-full" style={{ width: `${data.luckyPercent}%` }} />
                            </div>
                        </div>

                        {data.isLive && (
                            <div className="flex items-center gap-2 bg-[var(--c-primary-10)] rounded-2xl px-4 py-3">
                                <div className="w-2 h-2 rounded-full bg-[var(--c-primary)] animate-pulse" />
                                <span className={`${labelSize} font-bold text-[var(--c-primary)] uppercase tracking-wider`}>Идёт сейчас</span>
                            </div>
                        )}

                        <div className="space-y-4 pt-4 border-t border-[var(--c-border)]">
                            <span className={`${labelSize} font-black uppercase tracking-widest text-[var(--c-text-40)]`}>Как мы считаем</span>
                            <p className={`${bodyTextSize} text-[var(--c-text-30)] font-medium leading-relaxed`}>
                                Мы берём твою планету-управителя и находим час, когда её энергия максимальна — по Халдейскому ряду планет. Затем корректируем процент с учётом фазы Луны и её положения в твоей стихии.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-8 pt-2 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        className={`w-full bg-accent-cta text-white rounded-[24px] font-bold uppercase tracking-[0.2em] active:scale-95 transition-all shadow-lg ${
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
