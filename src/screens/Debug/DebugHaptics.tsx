import React, { useState } from 'react';
import { ArrowLeft, Zap, Bell, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface DebugHapticsProps {
    onBack: () => void;
}

export const DebugHaptics: React.FC<DebugHapticsProps> = ({ onBack }) => {
    const [lastStatus, setLastStatus] = useState<string>('Нажмите кнопку для теста');

    const triggerImpact = async (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => {
        try {
            setLastStatus(`Вызов impact: ${style}...`);
            if (window.Telegram?.WebApp?.HapticFeedback) {
                const res = await window.Telegram.WebApp.HapticFeedback.impactOccurred(style);
                setLastStatus(`Impact ${style}: ${JSON.stringify(res)}`);
            } else {
                setLastStatus('Ошибка: WebApp.HapticFeedback не найден');
            }
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            setLastStatus(`Ошибка: ${errorMessage}`);
        }
    };

    const triggerNotification = async (type: 'success' | 'warning' | 'error') => {
        try {
            setLastStatus(`Вызов notification: ${type}...`);
            if (window.Telegram?.WebApp?.HapticFeedback) {
                const res = await window.Telegram.WebApp.HapticFeedback.notificationOccurred(type);
                setLastStatus(`Notification ${type}: ${JSON.stringify(res)}`);
            } else {
                setLastStatus('Ошибка: WebApp.HapticFeedback не найден');
            }
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            setLastStatus(`Ошибка: ${errorMessage}`);
        }
    };

    const triggerSelection = async () => {
        try {
            setLastStatus('Вызов selectionChanged...');
            if (window.Telegram?.WebApp?.HapticFeedback) {
                const res = await window.Telegram.WebApp.HapticFeedback.selectionChanged();
                setLastStatus(`Selection: ${JSON.stringify(res)}`);
            }
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            setLastStatus(`Ошибка: ${errorMessage}`);
        }
    };

    return (
        <div className="fixed inset-0 z-[5000] bg-[var(--c-bg)] flex flex-col p-6 overflow-y-auto text-[var(--c-text)]">
            <button onClick={onBack} className="flex items-center text-gray-400 mb-8 active:scale-95 transition-transform">
                <ArrowLeft className="mr-2" /> Назад
            </button>

            <h1 className="text-2xl font-bold mb-2">Haptic Debug</h1>
            <div className="bg-[var(--c-surface)] p-4 rounded-xl mb-6 border border-[var(--c-border)]">
                <p className="text-xs text-gray-400 uppercase mb-1">Статус API:</p>
                <p className="font-mono text-sm text-[var(--c-primary)] break-all">{lastStatus}</p>
            </div>

            <section className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Impact Styles</h2>
                <div className="grid grid-cols-1 gap-3">
                    {(['light', 'medium', 'heavy', 'rigid', 'soft'] as const).map(style => (
                        <button
                            key={style}
                            onClick={() => void triggerImpact(style)}
                            className="flex items-center justify-between bg-[var(--c-surface-elevated)] hover:bg-[var(--c-surface-elevated)] active:bg-[var(--c-surface-elevated)] p-4 rounded-xl transition-all"
                        >
                            <span className="capitalize">{style}</span>
                            <Zap size={18} className="text-yellow-400" />
                        </button>
                    ))}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Notifications</h2>
                <div className="grid grid-cols-1 gap-3">
                    <button onClick={() => void triggerNotification('success')} className="flex items-center justify-between bg-green-500/20 p-4 rounded-xl border border-green-500/30 active:scale-[0.98] transition-transform">
                        <span>Success</span>
                        <CheckCircle2 size={18} className="text-green-500" />
                    </button>
                    <button onClick={() => void triggerNotification('warning')} className="flex items-center justify-between bg-yellow-500/20 p-4 rounded-xl border border-yellow-500/30 active:scale-[0.98] transition-transform">
                        <span>Warning</span>
                        <AlertTriangle size={18} className="text-yellow-500" />
                    </button>
                    <button onClick={() => void triggerNotification('error')} className="flex items-center justify-between bg-red-500/20 p-4 rounded-xl border border-red-500/30 active:scale-[0.98] transition-transform">
                        <span>Error</span>
                        <XCircle size={18} className="text-red-500" />
                    </button>
                </div>
            </section>

            <section className="mb-20">
                <h2 className="text-sm font-semibold text-gray-500 mb-4 uppercase">Selection</h2>
                <button onClick={() => void triggerSelection()} className="w-full flex items-center justify-between bg-blue-500/20 p-4 rounded-xl border border-blue-500/30 active:scale-[0.98] transition-transform">
                    <span>Selection Changed</span>
                    <Bell size={18} className="text-blue-500" />
                </button>
            </section>
        </div>
    );
};