import React from 'react';
import { Star, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface CalendarViewProps {
    zodiacName: string;
    currentMonth: string;
    moonPhase: string;
    moonPhaseName: string;
    luckyDays: number[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({

                                                              currentMonth = "Май 2024",
                                                              moonPhase = "🌖",
                                                              moonPhaseName = "Убывающая Луна",
                                                              luckyDays = [3, 7, 12, 15, 21, 22, 28]
                                                          }) => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return (
        <div className="relative w-full bg-[#050510] text-white p-4 overflow-hidden flex flex-col min-h-screen">

            {/* Фоновые эффекты */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[5%] right-[-10%] w-[70%] h-[30%] rounded-full bg-blue-900/10 blur-[120px]" />
                <div className="absolute bottom-[20%] left-[-10%] w-[70%] h-[30%] rounded-full bg-indigo-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col max-w-md mx-auto w-full gap-4 pt-2">

                {/* 1. Виджет: Фаза Луны */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] p-5 flex items-center justify-between relative overflow-hidden shadow-xl">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                            <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl shadow-inner">
                                {moonPhase}
                            </div>
                        </div>
                        <div>
                            <div className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 text-blue-200 mb-1">Текущая фаза</div>
                            <div className="text-lg font-black tracking-tight">{moonPhaseName}</div>
                        </div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-full text-white/20">
                        <Info size={18} />
                    </div>
                </div>

                {/* 2. Виджет: Календарь */}
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[28px] p-5 shadow-xl">
                    {/* Навигация по месяцу */}
                    <div className="flex items-center justify-between mb-6 px-1">
                        <button className="p-2 bg-white/5 rounded-xl text-white/40 active:scale-90 transition-all"><ChevronLeft size={18} /></button>
                        <span className="font-black text-[13px] uppercase tracking-[0.2em]">{currentMonth}</span>
                        <button className="p-2 bg-white/5 rounded-xl text-white/40 active:scale-90 transition-all"><ChevronRight size={18} /></button>
                    </div>

                    {/* Дни недели */}
                    <div className="grid grid-cols-7 mb-4">
                        {weekDays.map(day => (
                            <div key={day} className="text-center text-[9px] font-black opacity-20 uppercase">{day}</div>
                        ))}
                    </div>

                    {/* Сетка дней */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map(day => {
                            const isLucky = luckyDays.includes(day);
                            return (
                                <div key={day} className="relative aspect-square flex items-center justify-center">
                                    {isLucky && (
                                        <div className="absolute inset-1 bg-blue-500/20 rounded-xl border border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]" />
                                    )}
                                    <span className={`relative z-10 text-xs font-bold ${isLucky ? 'text-blue-300' : 'opacity-40'}`}>
                    {day}
                  </span>
                                    {isLucky && <Star size={4} className="absolute top-2 right-2 text-blue-400 fill-current" />}
                                </div>
                            );
                        })}
                    </div>

                    {/* Легенда */}
                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Благоприятные дни</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Обычные</span>
                        </div>
                    </div>
                </div>

                <p className="text-center text-[8px] font-bold uppercase tracking-[0.4em] opacity-20 mt-8">
                    Astro Calendar Engine • 2024
                </p>
            </div>
        </div>
    );
};