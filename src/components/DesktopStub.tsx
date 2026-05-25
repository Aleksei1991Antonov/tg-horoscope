import React from 'react';
import { MonitorOff } from 'lucide-react';

export const DesktopStub: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[var(--c-bg)] flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-[var(--c-primary-20)] blur-3xl rounded-full" />
                    <div className="relative bg-[var(--c-surface)] border border-[var(--c-border)] p-6 rounded-[32px] backdrop-blur-xl card-shadow">
                    <MonitorOff size={48} className="text-[var(--c-primary)]" />
                </div>
            </div>

            <h1 className="text-2xl font-black text-[var(--c-text)] mb-4 tracking-tighter uppercase">
                Доступно только в мобильном приложении
            </h1>

            <p className="text-[var(--c-text-40)] text-sm leading-relaxed max-w-[280px] font-medium">
                Для корректной работы гороскопа и всех функций, пожалуйста, откройте приложение через смартфон.
            </p>

            <div className="mt-10 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--c-primary)] animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-[var(--c-primary)] animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-[var(--c-primary)] animate-pulse delay-150" />
            </div>
        </div>
    );
};