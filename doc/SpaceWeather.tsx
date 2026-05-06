import { useState, useMemo, useRef } from 'react';
import { Moon, Calendar, ChevronRight, ChevronLeft, CalendarDays, Activity, Target } from 'lucide-react';
import { getLunarData, getMoonZodiac } from '../src/core/astro';
import { calculateUpcomingEvents } from '../src/core/horoscope';

export default function SpaceWeatherScreen() {
    const [viewDate, setViewDate] = useState(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    });

    const dateInputRef = useRef<HTMLInputElement>(null);

    const lunar = useMemo(() => getLunarData(viewDate), [viewDate]);
    const zodiac = useMemo(() => getMoonZodiac(viewDate), [viewDate]);

    const realEvents = useMemo(() => {
        const startOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
        return calculateUpcomingEvents(startOfMonth);
    }, [viewDate]);

    const changeMonth = (offset: number) => {
        const next = new Date(viewDate);
        next.setMonth(next.getMonth() + offset);
        const now = new Date();
        if (next.getMonth() === now.getMonth() && next.getFullYear() === now.getFullYear()) {
            setViewDate(new Date());
        } else {
            next.setDate(1);
            setViewDate(next);
        }
    };

    const getPhaseName = (p: number) => {
        if (p < 0.02 || p > 0.98) return "Новолуние";
        if (p < 0.23) return "Растущий серп";
        if (p < 0.27) return "Первая четверть";
        if (p < 0.45) return "Растущая Луна";
        if (p < 0.55) return "Полнолуние";
        if (p < 0.73) return "Убывающая Луна";
        if (p < 0.77) return "Последняя четверть";
        return "Стареющий серп";
    };

    return (
        <div className="h-full flex flex-col bg-[#050505] text-white font-sans overflow-hidden">
            <header className="shrink-0 p-6 pt-12 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-left">
                        <h1 className="text-2xl font-black tracking-tighter italic uppercase leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                            Астро
                        </h1>
                        <p className="text-[8px] opacity-30 uppercase tracking-[0.2em] font-bold italic mt-1 text-white/80">Имперское издание</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewDate(new Date())}
                            className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 rounded-xl active:scale-95 transition-all"
                        >
                            <Target size={16} className="text-cyan-400" />
                        </button>
                        <button
                            onClick={() => dateInputRef.current?.showPicker()}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl active:scale-95 transition-all"
                        >
                            <CalendarDays size={14} className="text-white/60" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Дата</span>
                            <input
                                ref={dateInputRef}
                                type="date"
                                className="absolute invisible w-0 h-0"
                                onChange={(e) => {
                                    if (!e.target.value) return;
                                    const [y, m, d] = e.target.value.split('-').map(Number);
                                    setViewDate(new Date(y, m - 1, d));
                                }}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={() => changeMonth(-1)} className="p-3 bg-white/5 rounded-xl active:opacity-50">
                        <ChevronLeft size={18} className="opacity-40" />
                    </button>
                    <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 text-center">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/90">
                            {viewDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <button onClick={() => changeMonth(1)} className="p-3 bg-white/5 rounded-xl active:opacity-50">
                        <ChevronRight size={18} className="opacity-40" />
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar">
                <div className="relative">
                    <div className="relative bg-neutral-950 border border-white/10 rounded-[40px] p-8 overflow-hidden shadow-2xl">
                        <div className="absolute -top-4 -right-4 opacity-[0.03] pointer-events-none">
                            <Moon size={180} strokeWidth={1} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2 opacity-40">
                                    <Activity size={14} className="text-cyan-400" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">День {viewDate.getDate()}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-2xl shrink-0">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">{zodiac.name}</span>
                                    <span className="text-xs">{zodiac.icon}</span>
                                </div>
                            </div>

                            <div className="min-h-[100px] flex items-center">
                                <h2 className="text-[42px] font-black italic uppercase leading-[0.85] tracking-[-0.05em] text-white break-keep whitespace-pre-line">
                                    {getPhaseName(lunar.phase).replace(' ', '\n')}
                                </h2>
                            </div>

                            <div className="mt-8 space-y-6">
                                <div className="flex items-center gap-10">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 mb-1 font-bold">Свет</p>
                                        <p className="text-3xl font-black text-cyan-400 tracking-tighter">{lunar.illumination}%</p>
                                    </div>
                                    <div className="w-px h-10 bg-white/10" />
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.2em] opacity-30 mb-1 font-bold">Возраст</p>
                                        <p className="text-3xl font-black tracking-tighter">{lunar.age}<span className="text-xs opacity-40 ml-1 font-bold">дн.</span></p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                                        <div
                                            className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-1000"
                                            style={{ width: `${lunar.phase * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.2em] opacity-30 italic">
                                        <span>Новый цикл</span>
                                        <span>Полнолуние</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2 opacity-40">
                            <Calendar size={14} />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em]">События</span>
                        </div>
                        <span className="text-[8px] font-bold text-cyan-500/50 uppercase tracking-widest italic">UTC+3</span>
                    </div>

                    <div className="space-y-3">
                        {realEvents.map((event) => {
                            const isPast = event.date < new Date() && event.date.toDateString() !== new Date().toDateString();
                            return (
                                <div key={`${event.date.getTime()}-${event.title}`}
                                     className={`bg-neutral-900/40 border rounded-[32px] p-5 transition-all ${isPast ? 'opacity-20 border-transparent' : 'border-white/5'}`}>
                                    <div className="flex gap-5 items-start">
                                        <div className={`flex flex-col items-center justify-center min-w-[52px] h-14 rounded-2xl border shrink-0 ${isPast ? 'border-white/5' : 'bg-white/5 border-white/10'}`}>
                                            <span className="text-[10px] font-black leading-none">{event.date.getDate()}</span>
                                            <span className="text-[7px] font-black opacity-30 uppercase mt-1">{event.date.toLocaleDateString('ru-RU', { month: 'short' }).replace('.', '')}</span>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            {/* УБРАН TRUNCATE У ЗАГОЛОВКА */}
                                            <div className="flex items-start justify-between mb-1.5 gap-3">
                                                <h4 className={`text-[11px] font-black uppercase tracking-wider leading-tight flex-1 ${isPast ? 'text-white/40' : 'text-cyan-500/90'}`}>
                                                    {event.title}
                                                </h4>
                                                <span className="text-[9px] font-mono opacity-30 shrink-0 mt-0.5">
                                                    {event.date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-white/40 leading-[1.4] italic break-words">
                                                {event.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="h-24" />
            </div>
        </div>
    );
}