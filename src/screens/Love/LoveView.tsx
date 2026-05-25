import React, { useMemo, useCallback } from 'react';
import { Heart, Plus, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface LoveForecast {
    day: string;
    score: number;
}

interface LoveViewProps {
    partnerZodiac?: string;
    synergyPercent?: number;
    weeklyForecast?: LoveForecast[];
    monthlyForecast?: LoveForecast[];
    yearlyForecast?: LoveForecast[];
    currentYear?: number;
    onYearPrev?: () => void;
    onYearNext?: () => void;
    onSelectPartner: () => void;
    fontScale: 'small' | 'medium' | 'large';
}

export const LoveView: React.FC<LoveViewProps> = ({
                                                        partnerZodiac,
                                                       synergyPercent = 0,
                                                       weeklyForecast = [],
                                                       monthlyForecast = [],
                                                       yearlyForecast = [],
                                                       currentYear,
                                                       onYearPrev,
                                                       onYearNext,
                                                       onSelectPartner,
                                                       fontScale
                                                   }) => {

    const safeForecast = useMemo(() => {
        if (weeklyForecast && weeklyForecast.length > 0) return weeklyForecast;
        return ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(d => ({ day: d, score: 30 }));
    }, [weeklyForecast]);

    const todayIndex = useMemo(() => {
        const day = new Date().getDay();
        return day === 0 ? 6 : day - 1;
    }, []);

    const handlePartnerClick = useCallback(() => {
        void triggerSuccessHaptic();
        onSelectPartner();
    }, [onSelectPartner]);

    const bestWorst = useMemo(() => {
        if (!yearlyForecast || yearlyForecast.length < 2) return { bestIdx: -1, worstIdx: -1 };
        let bestIdx = 0, worstIdx = 0;
        yearlyForecast.forEach((d, i) => {
            if (d.score > yearlyForecast[bestIdx].score) bestIdx = i;
            if (d.score < yearlyForecast[worstIdx].score) worstIdx = i;
        });
        return { bestIdx, worstIdx };
    }, [yearlyForecast]);

    const headerSize = fontScale === 'large' ? 'text-[2.4rem]' : fontScale === 'small' ? 'text-[2rem]' : 'text-[2.2rem]';
    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const percentSize = fontScale === 'large' ? 'text-[1.8rem]' : fontScale === 'small' ? 'text-[1.4rem]' : 'text-[1.6rem]';
    const zodiacBoxSize = fontScale === 'large' ? 'w-16 h-16 text-[2rem]' : 'w-12 h-12 text-[1.5rem]';
    const widgetPadding = fontScale === 'large' ? 'p-8 min-h-[180px]' : 'p-6 min-h-[140px]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    return (
        <div className={`w-full text-[var(--c-text)] ${bottomPadding} px-1 animate-in fade-in duration-500`}>
            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <Heart size={fontScale === 'large' ? 14 : 12} className="text-[var(--c-primary)]" fill="currentColor" />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em]`}>Любовный радар</span>
                </div>
                <h1 className={`${headerSize} font-black tracking-normal text-[var(--c-text-90)] leading-tight break-words hyphens-auto`}>
                    Совместимость
                </h1>
            </header>

            <div className="flex flex-col gap-4">
                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center justify-around mb-6 gap-2">
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <div className={`${zodiacBoxSize} rounded-2xl bg-[var(--c-primary-10)] border border-[var(--c-primary-20)] flex items-center justify-center text-[var(--c-primary)]`}>
                                <Heart size={fontScale === 'large' ? 32 : 24} fill="currentColor" />
                            </div>
                            <span className={`${labelSize} font-black opacity-30 uppercase tracking-widest`}>Вы</span>
                        </div>

                        <div className="flex flex-col items-center flex-1 min-w-fit">
                            <div className={`${percentSize} font-black text-[var(--c-primary)] leading-none`}>
                                {synergyPercent}%
                            </div>
                            <div className={`${labelSize} font-bold uppercase tracking-[0.1em] text-[var(--c-primary-50)] mt-2 text-center`}>Химия</div>
                        </div>

                        <div className="flex flex-col items-center gap-2 flex-1">
                            <button
                                onClick={handlePartnerClick}
                                className={`${zodiacBoxSize} rounded-2xl transition-all active:scale-90 flex items-center justify-center ${
                                    partnerZodiac
                                        ? 'bg-[var(--c-primary-10)] text-[var(--c-primary)] border border-[var(--c-primary-20)]'
                                        : 'bg-[var(--c-surface)] text-[var(--c-text-20)] border border-[var(--c-border)] border-dashed'
                                }`}
                            >
                                {partnerZodiac
                                    ? <span className={fontScale === 'large' ? 'text-[2rem]' : 'text-[1.5rem]'}>{partnerZodiac}</span>
                                    : <Plus size={24} className="text-[var(--c-primary-40)]" />
                                }
                            </button>
                            <span className={`${labelSize} font-black opacity-30 uppercase tracking-widest`}>Партнер</span>
                        </div>
                    </div>

                    <div className="w-full h-2.5 bg-black/[0.05] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[var(--c-primary)] transition-all duration-1000"
                            style={{ width: `${synergyPercent}%` }}
                        />
                    </div>
                </div>

                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={fontScale === 'large' ? 14 : 12} className="text-[var(--c-secondary-60)]" />
                        <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-[var(--c-text-50)]`}>Прогноз на неделю</h3>
                    </div>

                    <div className="flex justify-between items-end h-28 w-full px-1">
                        {safeForecast.map((item, i) => {
                            const isToday = i === todayIndex;
                            return (
                                <div key={i} className="flex flex-col items-center justify-end h-full flex-1">
                                    <div className="w-full flex justify-center items-end h-full pb-2">
                                        <div
                                            className={`rounded-full bg-[var(--c-primary-60)] transition-all duration-1000 ease-out ${fontScale === 'large' ? 'w-3' : 'w-2'}`}
                                            style={{ height: `${item.score}%`, minHeight: '8px' }}
                                        />
                                    </div>
                                    <span className={`${labelSize} font-black uppercase mt-2 transition-colors ${
                                        isToday ? 'text-[var(--c-primary)]' : 'text-[var(--c-text)] opacity-20'}`
                                    }>{item.day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={fontScale === 'large' ? 14 : 12} className="text-[var(--c-secondary-60)]" />
                        <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-[var(--c-text-50)]`}>Прогноз на месяц</h3>
                    </div>
                    <LineChart data={monthlyForecast} fontScale={fontScale} gradientId="loveFill" />
                </div>

                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={fontScale === 'large' ? 14 : 12} className="text-[var(--c-secondary-60)]" />
                        <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-[var(--c-text-50)]`}>Прогноз на год</h3>
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-5">
                        <button
                            onClick={onYearPrev}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-40)] hover:text-[var(--c-text)] active:scale-90 transition-all disabled:opacity-20"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className={`${fontScale === 'large' ? 'text-[1.2rem]' : 'text-[1rem]'} font-black tracking-tight text-[var(--c-text)]`}>
                            {currentYear}
                        </span>
                        <button
                            onClick={onYearNext}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-text-40)] hover:text-[var(--c-text)] active:scale-90 transition-all disabled:opacity-20"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                    <LineChart data={yearlyForecast} fontScale={fontScale} gradientId="yearFill" labelSuffix="месяцев" showAllLabels bestIdx={bestWorst.bestIdx} worstIdx={bestWorst.worstIdx} />
                </div>
            </div>
        </div>
    );
};

function LineChart({
    data,
    fontScale,
    gradientId,
    labelSuffix = 'дней',
    showAllLabels = false,
    bestIdx = -1,
    worstIdx = -1,
}: {
    data: LoveForecast[];
    fontScale: 'small' | 'medium' | 'large';
    gradientId: string;
    labelSuffix?: string;
    showAllLabels?: boolean;
    bestIdx?: number;
    worstIdx?: number;
}) {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];
        return data;
    }, [data]);

    if (chartData.length < 2) return null;

    const todayNum = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const todayIdx = showAllLabels
        ? (currentMonth < chartData.length ? currentMonth : 0)
        : chartData.findIndex(d => Number(d.day) === todayNum);

    const hasHighlights = showAllLabels && bestIdx >= 0 && worstIdx >= 0;

    const svgId = showAllLabels ? 'yearly-chart-svg' : undefined;

    const width = showAllLabels ? 700 : 1000;
    const height = 280;
    const pad = { top: 15, right: 10, bottom: 45, left: 48 };
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;
    const minVal = 20;
    const maxVal = 100;

    const toY = (val: number) =>
        pad.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

    const PCS = [100, 80, 60, 40, 20];

    const stepX = chartW / (chartData.length - 1);

    const points = chartData.map((d, i) => ({
        x: pad.left + i * stepX,
        y: toY(d.score),
        score: d.score,
    }));

    const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const fillD = `M${points[0].x.toFixed(1)},${height - pad.bottom} ${lineD.slice(1)} L${points[points.length - 1].x.toFixed(1)},${height - pad.bottom} Z`;

    return (
        <div className="w-full">
            <svg id={svgId} viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" style={{ stopColor: 'var(--c-primary)', stopOpacity: '0.35' }} />
                        <stop offset="100%" style={{ stopColor: 'var(--c-primary)', stopOpacity: '0' }} />
                    </linearGradient>
                </defs>

                {PCS.map(pct => {
                    const y = toY(pct);
                    return (
                        <g key={pct}>
                            <line
                                x1={pad.left} y1={y}
                                x2={width - pad.right} y2={y}
                                stroke="var(--c-text)" strokeOpacity="0.06" strokeDasharray="3,3"
                            />
                            <text
                                x={pad.left - 6} y={y}
                                textAnchor="end" dominantBaseline="middle"
                                fill="var(--c-text)" opacity="0.3"
                                fontSize={fontScale === 'large' ? 10 : 8}
                                fontFamily="inherit" fontWeight="800"
                            >
                                {pct}%
                            </text>
                        </g>
                    );
                })}

                <path d={fillD} fill={`url(#${gradientId})`} />
                <path d={lineD} fill="none" className="stroke-[var(--c-primary)]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {points.map((p, i) => {
                    const isBest = hasHighlights && i === bestIdx;
                    const isWorst = hasHighlights && i === worstIdx;
                    const isSpecial = isBest || isWorst;
                    return (
                        <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={isBest ? 7 : isWorst ? 6 : i === todayIdx ? 5 : 2.5}
                            fill={isBest ? 'var(--c-primary)' : isWorst ? 'var(--c-secondary)' : 'var(--c-text)'}
                            style={i === todayIdx ? { fill: 'var(--c-primary)' } : {}}
                            stroke={i === todayIdx || isSpecial ? 'var(--c-bg)' : 'none'}
                            strokeWidth={i === todayIdx || isSpecial ? 2.5 : 0}
                        />
                    );
                })}

                {hasHighlights && (
                    <>
                        <text
                            x={points[bestIdx].x}
                            y={points[bestIdx].y - 12}
                            textAnchor="middle"
                            fill="var(--c-primary)"
                            fontSize={fontScale === 'large' ? 9 : 7}
                            fontFamily="inherit" fontWeight="800"
                            opacity="0.9"
                        >
                            ПИК
                        </text>
                        <text
                            x={points[worstIdx].x}
                            y={points[worstIdx].y - 12}
                            textAnchor="middle"
                            fill="var(--c-secondary)"
                            fontSize={fontScale === 'large' ? 9 : 7}
                            fontFamily="inherit" fontWeight="800"
                            opacity="0.9"
                        >
                            СПАД
                        </text>
                    </>
                )}

                {chartData.map((d, i) => {
                    if (!showAllLabels && i !== 0 && i !== chartData.length - 1 && i % 5 !== 0) return null;
                    const isToday = i === todayIdx;
                    return (
                        <text
                            key={i}
                            x={points[i].x}
                            y={height - 10}
                            textAnchor="middle"
                            style={{ fill: isToday ? 'var(--c-primary)' : 'var(--c-text)' }}
                            opacity={isToday ? 1 : 0.3}
                            fontSize={fontScale === 'large' ? (showAllLabels ? 11 : 13) : (showAllLabels ? 8 : 10)}
                            fontFamily="inherit" fontWeight="800"
                        >
                            {d.day}
                        </text>
                    );
                })}

                {todayIdx >= 0 && (
                    <text
                        x={points[todayIdx].x}
                        y={height - 10}
                        textAnchor="middle"
                        style={{ fill: 'var(--c-primary)' }}
                        fontSize={fontScale === 'large' ? (showAllLabels ? 9 : 10) : (showAllLabels ? 7 : 8)}
                        fontFamily="inherit" fontWeight="700"
                        dy={showAllLabels ? '11' : '13'}
                        opacity="0.6"
                    >
                        {showAllLabels ? 'СЕЙЧАС' : 'СЕГОДНЯ'}
                    </text>
                )}
            </svg>
            {hasHighlights && (
                <div className="flex items-center justify-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--c-primary)]" />
                        <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-widest text-[var(--c-primary-60)]`}>
                            {chartData[bestIdx].day} — {chartData[bestIdx].score}%
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[var(--c-secondary)]" />
                        <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-widest text-[var(--c-secondary-60)]`}>
                            {chartData[worstIdx].day} — {chartData[worstIdx].score}%
                        </span>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center mt-3 px-2">
                <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-widest text-[var(--c-text-20)]`}>
                    {chartData[0].score}%
                </span>
                <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-[0.15em] text-[var(--c-text-30)]`}>
                    {chartData.length} {labelSuffix}
                </span>
                <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-widest text-[var(--c-text-20)]`}>
                    {chartData[chartData.length - 1].score}%
                </span>
            </div>
        </div>
    );
}
