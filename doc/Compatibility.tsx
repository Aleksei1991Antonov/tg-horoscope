import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, Flame, Calendar as CalendarIcon, ChevronDown, Sparkles } from 'lucide-react';
import { type ZodiacSign } from '../src/core/engine';

const ZODIAC_SIGNS: { sign: ZodiacSign; icon: string; label: string }[] = [
    { sign: 'Aries', icon: '♈', label: 'Овен' }, { sign: 'Taurus', icon: '♉', label: 'Телец' },
    { sign: 'Gemini', icon: '♊', label: 'Близнецы' }, { sign: 'Cancer', icon: '♋', label: 'Рак' },
    { sign: 'Leo', icon: '♌', label: 'Лев' }, { sign: 'Virgo', icon: '♍', label: 'Дева' },
    { sign: 'Libra', icon: '♎', label: 'Весы' }, { sign: 'Scorpio', icon: '♏', label: 'Скорпион' },
    { sign: 'Sagittarius', icon: '♐', label: 'Стрелец' }, { sign: 'Capricorn', icon: '♑', label: 'Козерог' },
    { sign: 'Aquarius', icon: '♒', label: 'Водолей' }, { sign: 'Pisces', icon: '♓', label: 'Рыбы' }
];

// Добавляем интерфейс для пропсов
interface CompatibilityProps {
    userSign: ZodiacSign;
}

export default function CompatibilityScreen({ userSign }: CompatibilityProps) {
    const [date, setDate] = useState(new Date());
    // Используем userSign из пропсов как начальное значение для первого знака
    const [sign1, setSign1] = useState<ZodiacSign>(userSign);
    const [sign2, setSign2] = useState<ZodiacSign>('Scorpio');
    const [activeSelector, setActiveSelector] = useState<1 | 2 | null>(null);

    const changeDate = (days: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        setDate(newDate);
    };

    const { scores, total } = useMemo(() => {
        const s1Idx = ZODIAC_SIGNS.findIndex(z => z.sign === sign1);
        const s2Idx = ZODIAC_SIGNS.findIndex(z => z.sign === sign2);
        const dayTimestamp = Math.floor(date.getTime() / (1000 * 60 * 60 * 24));

        const baseMatch = 100 - (Math.abs(s1Idx - s2Idx) % 6) * 12;

        const calculateMetric = (seed: number, weight: number) => {
            const dailyFlit = Math.sin(dayTimestamp * 0.2 + s1Idx * 0.5 + s2Idx * 0.3 + seed) * 15;
            return Math.floor(Math.min(98, Math.max(15, baseMatch * weight + dailyFlit)));
        };

        const love = calculateMetric(10, 0.8);
        const friends = calculateMetric(20, 0.7);
        const passion = calculateMetric(30, 0.9);

        return {
            scores: [
                { id: 'love', label: 'Любовь', value: love, icon: <Heart size={18} className="text-pink-500" />, color: '#EC4899' },
                { id: 'friends', label: 'Дружба', value: friends, icon: <Users size={18} className="text-blue-500" />, color: '#3B82F6' },
                { id: 'passion', label: 'Страсть', value: passion, icon: <Flame size={18} className="text-orange-500" />, color: '#F97316' },
            ],
            total: Math.floor((love + friends + passion) / 3)
        };
    }, [sign1, sign2, date]);

    const dateString = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="h-full flex flex-col bg-[#050505] text-white">
            <header className="p-6 pt-12 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
                <h1 className="text-2xl font-black italic uppercase tracking-tighter mb-6">Связь</h1>

                <div className="flex items-center justify-between bg-white/5 rounded-2xl p-1 border border-white/5">
                    <button onClick={() => changeDate(-1)} className="p-2 hover:bg-white/5 rounded-xl text-white/40 active:scale-95 transition-transform"><ChevronLeft size={20} /></button>
                    <div className="flex items-center gap-2">
                        <CalendarIcon size={14} className="text-cyan-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{dateString}</span>
                    </div>
                    <button onClick={() => changeDate(1)} className="p-2 hover:bg-white/5 rounded-xl text-white/40 active:scale-95 transition-transform"><ChevronRight size={20} /></button>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar space-y-8">
                <div className="flex justify-center py-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/5" />
                            <circle
                                cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="3" fill="transparent"
                                strokeDasharray={377} strokeDashoffset={377 - (377 * total) / 100}
                                className="text-cyan-500 transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-black italic leading-none">{total}%</span>
                            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 mt-1 text-cyan-400">Match</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4 relative">
                    {[1, 2].map((num) => {
                        const currentSign = ZODIAC_SIGNS.find(z => z.sign === (num === 1 ? sign1 : sign2));
                        return (
                            <div key={num} className="flex-1 relative">
                                <button
                                    onClick={() => setActiveSelector(activeSelector === num ? null : (num as 1 | 2))}
                                    className={`w-full aspect-square rounded-[32px] border transition-all flex flex-col items-center justify-center gap-2 ${activeSelector === num ? 'bg-white border-white' : 'bg-neutral-900 border-white/10'}`}
                                >
                                    <span className={`text-4xl ${activeSelector === num ? '' : 'grayscale opacity-50'}`}>{currentSign?.icon}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${activeSelector === num ? 'text-black' : 'text-white/40'}`}>{currentSign?.label}</span>
                                    <ChevronDown size={12} className={activeSelector === num ? 'text-black' : 'text-white/20'} />
                                </button>

                                {activeSelector === num && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-white/10 rounded-3xl p-2 shadow-2xl z-[60] max-h-[240px] overflow-y-auto no-scrollbar">
                                        {ZODIAC_SIGNS.map((z) => (
                                            <button
                                                key={z.sign}
                                                onClick={() => { if (num === 1) setSign1(z.sign); else setSign2(z.sign); setActiveSelector(null); }}
                                                className="w-full flex justify-between items-center px-4 py-3 rounded-2xl text-[10px] font-bold uppercase hover:bg-white/5"
                                            >
                                                {z.label} <span>{z.icon}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#050505] border border-white/10 flex items-center justify-center z-10">
                        <Sparkles size={16} className="text-cyan-500" />
                    </div>
                </div>

                <div className="bg-neutral-950 border border-white/10 rounded-[40px] p-8 space-y-8">
                    {scores.map((score) => (
                        <div key={score.id} className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">{score.icon}</div>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-white/60">{score.label}</span>
                                </div>
                                <div className="text-2xl font-black italic tracking-tighter">{score.value}%</div>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.1)]" style={{ width: `${score.value}%`, backgroundColor: score.color }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 rounded-[32px] bg-white/5 border border-white/5 text-center">
                    <p className="text-sm font-medium text-white/60 leading-relaxed italic">
                        {total > 80 ? '«Уникальный резонанс. Звезды обещают исключительную глубину понимания в этот период.»' :
                            total > 50 ? '«Стабильный фон. Хорошее время для укрепления доверия и совместных открытий.»' :
                                '«Период проверки на прочность. Космос советует избегать поспешных выводов.»'}
                    </p>
                </div>
                <div className="h-24" />
            </div>
        </div>
    );
}