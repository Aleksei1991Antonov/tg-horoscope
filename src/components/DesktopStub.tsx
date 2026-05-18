import React from 'react';
import { MonitorOff } from 'lucide-react';

export const DesktopStub: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#050510] flex flex-col items-center justify-center p-8 text-center">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-3xl rounded-full" />
                <div className="relative bg-white/5 border border-white/10 p-6 rounded-[32px] backdrop-blur-xl">
                    <MonitorOff size={48} className="text-fuchsia-500" />
                </div>
            </div>

            <h1 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">
                Доступно только в мобильном приложении
            </h1>

            <p className="text-white/40 text-sm leading-relaxed max-w-[280px] font-medium">
                Для корректной работы гороскопа и всех функций, пожалуйста, откройте приложение через смартфон.
            </p>

            <div className="mt-10 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse delay-150" />
            </div>
        </div>
    );
};