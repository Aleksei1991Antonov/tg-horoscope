import { useState, useMemo } from 'react';
import { Heart, Sparkles, Wallet, Zap, ChevronDown, Star, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateDailyHoroscope, getPowerHour, getDailyMatch, type ZodiacSign } from '../core/engine';

const ZODIAC_SIGNS: { sign: ZodiacSign; icon: string; label: string }[] = [
    { sign: 'Aries', icon: '♈', label: 'Овен' }, { sign: 'Taurus', icon: '♉', label: 'Телец' },
    { sign: 'Gemini', icon: '♊', label: 'Близнецы' }, { sign: 'Cancer', icon: '♋', label: 'Рак' },
    { sign: 'Leo', icon: '♌', label: 'Лев' }, { sign: 'Virgo', icon: '♍', label: 'Дева' },
    { sign: 'Libra', icon: '♎', label: 'Весы' }, { sign: 'Scorpio', icon: '♏', label: 'Скорпион' },
    { sign: 'Sagittarius', icon: '♐', label: 'Стрелец' }, { sign: 'Capricorn', icon: '♑', label: 'Козерог' },
    { sign: 'Aquarius', icon: '♒', label: 'Водолей' }, { sign: 'Pisces', icon: '♓', label: 'Рыбы' }
];

interface HoroscopeProps {
    selectedSign: ZodiacSign;
    onSignChange: (sign: ZodiacSign) => void;
}

export default function HoroscopeScreen({ selectedSign, onSignChange }: HoroscopeProps) {
    const [isSignSelectorOpen, setIsSignSelectorOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    // ПОЛУЧАЕМ ТОЧНЫЕ ДАННЫЕ ИЗ ЯДРА
    const data = useMemo(() => generateDailyHoroscope(selectedSign, currentDate), [selectedSign, currentDate]);
    const powerHour = useMemo(() => getPowerHour(currentDate), [currentDate]);
    const match = useMemo(() => getDailyMatch(selectedSign), [selectedSign]);

    const currentSign = ZODIAC_SIGNS.find(z => z.sign === selectedSign);
    const dateString = currentDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
    const isToday = new Date().toDateString() === currentDate.toDateString();

    const changeDate = (days: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        setCurrentDate(newDate);
    };

    const getIcon = (id: string, color: string) => {
        const props = { size: 18, style: { color }, strokeWidth: 2.5 };
        switch (id) {
            case 'love': return <Heart {...props} />;
            case 'luck': return <Sparkles {...props} />;
            case 'money': return <Wallet {...props} />;
            case 'energy': return <Zap {...props} />;
            default: return <Star {...props} />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#050505]">
            <header className="shrink-0 p-6 pt-12 z-[60] bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter italic leading-none text-white uppercase">Гороскоп</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-1 h-1 rounded-full ${isToday ? 'bg-cyan-500 animate-pulse' : 'bg-white/20'}`} />
                            <p className="text-[9px] opacity-40 uppercase tracking-[0.2em] text-white font-bold">
                                Лунный цикл: {isToday ? 'Сегодня' : dateString}
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setIsSignSelectorOpen(!isSignSelectorOpen)}
                            className="h-10 px-4 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[11px] font-bold uppercase active:scale-95 transition-all text-white"
                        >
                            {currentSign?.label} {currentSign?.icon}
                            <ChevronDown size={14} className={`transition-transform ${isSignSelectorOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSignSelectorOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-neutral-900 border border-white/10 rounded-3xl p-2 shadow-2xl z-[70] max-h-[300px] overflow-y-auto no-scrollbar">
                                {ZODIAC_SIGNS.map((z) => (
                                    <button
                                        key={z.sign}
                                        onClick={() => { onSignChange(z.sign); setIsSignSelectorOpen(false); }}
                                        className={`w-full flex justify-between items-center px-4 py-3 rounded-2xl text-[11px] font-bold uppercase ${selectedSign === z.sign ? 'bg-white text-black' : 'hover:bg-white/5 text-white'}`}
                                    >
                                        <span>{z.label}</span><span>{z.icon}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between bg-white/5 rounded-2xl p-1 border border-white/5">
                    <button onClick={() => changeDate(-1)} className="p-2 hover:bg-white/5 rounded-xl text-white/40 active:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                        {dateString}
                    </span>
                    <button onClick={() => changeDate(1)} className="p-2 hover:bg-white/5 rounded-xl text-white/40 active:text-white transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 pb-32 no-scrollbar space-y-6 pt-6">
                {data.map((item) => (
                    <div key={item.id} className="w-full rounded-[32px] p-6 relative overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl">
                        <div className="absolute -top-12 -right-12 w-32 h-32 blur-[60px] opacity-[0.08] rounded-full" style={{ backgroundColor: item.color }} />
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                                        {getIcon(item.id, item.color)}
                                    </div>
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em]" style={{ color: item.color }}>
                                        {item.label}
                                    </span>
                                </div>
                                <div className="text-3xl font-black tracking-tighter text-white">
                                    {item.value}<span className="text-[14px] opacity-20 ml-0.5">%</span>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full mb-6 overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                            </div>
                            <h3 className="text-lg font-bold text-white leading-tight mb-3 uppercase tracking-tight">{item.title}</h3>
                            <p className="text-sm opacity-40 leading-relaxed text-white mb-6 font-medium italic">
                                {item.desc}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {item.tips.map((tip, i) => (
                                    <div key={i} className="bg-white/[0.03] rounded-lg py-1.5 px-3 border border-white/5">
                                        <span className="text-[9px] uppercase font-black tracking-widest opacity-40 text-white italic">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-950 border border-white/10 rounded-[32px] p-5 flex flex-col gap-4 relative overflow-hidden">
                        <div className="flex items-center gap-2 opacity-40">
                            <Users size={14} className="text-white" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white">Пара дня</span>
                        </div>
                        <div className="text-2xl font-black text-white italic uppercase tracking-tighter">
                            {match.name} <span className="text-sm opacity-30 not-italic ml-1">{match.icon}</span>
                        </div>
                        <p className="text-[10px] opacity-40 text-white leading-tight font-bold">Наилучшая синергия по тригону стихий.</p>
                    </div>

                    <div className="bg-neutral-950 border border-white/10 rounded-[32px] p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2 opacity-40">
                            <Clock size={14} className="text-white" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-white">Час силы</span>
                        </div>
                        <div className="text-2xl font-black text-white italic tracking-tighter">{powerHour}</div>
                        <p className="text-[10px] opacity-40 text-white leading-tight font-bold">Пик планетарного влияния на ваш сектор.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}