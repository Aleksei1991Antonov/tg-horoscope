import React from 'react';
import { Scissors, Sparkles, Droplets, Moon, ChevronRight } from 'lucide-react';

interface BeautyItemProps {
    icon: React.ReactNode;
    title: string;
    status: 'благоприятно' | 'нейтрально' | 'нежелательно';
    colorClass: string;
}

const BeautyCard: React.FC<BeautyItemProps> = ({ icon, title, status, colorClass }) => {
    const statusColors = {
        'благоприятно': 'text-emerald-400 bg-emerald-500/10',
        'нейтрально': 'text-amber-400 bg-amber-500/10',
        'нежелательно': 'text-rose-400 bg-rose-500/10'
    };

    return (
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] p-5 flex items-center justify-between active:scale-[0.98] transition-all shadow-lg">
            <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClass} bg-opacity-10 shadow-inner`}>
                    {icon}
                </div>
                <div>
                    <div className="font-bold text-[16px] text-white/90 tracking-tight">{title}</div>
                    <div className={`text-[9px] font-black uppercase tracking-widest mt-1.5 px-2.5 py-1 rounded-full w-fit ${statusColors[status]}`}>
                        {status}
                    </div>
                </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <ChevronRight size={16} className="text-white/20" />
            </div>
        </div>
    );
};

export const BeautyView: React.FC = () => {
    return (
        <div className="relative w-full bg-[#050510] text-white p-4 overflow-hidden flex flex-col min-h-screen">

            {/* Фоновые эффекты */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[100%] h-[30%] rounded-full bg-indigo-900/10 blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-10%] w-[80%] h-[40%] rounded-full bg-fuchsia-900/5 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col max-w-md mx-auto w-full gap-4 pt-2">

                {/* Заголовок */}
                <header className="px-1">
                    <div className="flex items-center gap-2 opacity-30 mb-1">
                        <Moon size={10} className="text-indigo-400" fill="currentColor" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em]">Лунный календарь</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight">Красота и уход</h1>
                </header>

                {/* Сетка процедур - Bento Style */}
                <div className="flex flex-col gap-3.5">
                    <BeautyCard
                        icon={<Scissors size={24} className="text-amber-400" />}
                        title="Стрижка и окрашивание"
                        status="благоприятно"
                        colorClass="bg-amber-400"
                    />
                    <BeautyCard
                        icon={<Sparkles size={24} className="text-fuchsia-400" />}
                        title="Уход за кожей лица"
                        status="нейтрально"
                        colorClass="bg-fuchsia-400"
                    />
                    <BeautyCard
                        icon={<Droplets size={24} className="text-sky-400" />}
                        title="Тело и детокс"
                        status="благоприятно"
                        colorClass="bg-sky-400"
                    />
                </div>

                <p className="text-center text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 mt-8">
                    Beauty Rhythm Engine • 2024
                </p>
            </div>
        </div>
    );
};