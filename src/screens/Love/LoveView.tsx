import React, { useMemo, useCallback } from 'react';
import { Plus, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { triggerSuccessHaptic } from '../../utils/haptics';

interface LoveForecast {
    day: string;
    score: number;
}

interface LoveViewProps {
    zodiacName: string;
    zodiacEmoji: string;
    partnerZodiac?: string;
    partnerZodiacName?: string;
    synergyPercent?: number;
    weeklyForecast?: LoveForecast[];
    monthlyForecast?: LoveForecast[];
    yearlyForecast?: LoveForecast[];
    currentYear?: number;
    onYearPrev?: () => void;
    onYearNext?: () => void;
    onSelectPartner: () => void;
    onSelectUser?: () => void;
    fontScale: 'small' | 'medium' | 'large';
    resolvedTheme: string;
}

const LOVE = {
    primary: '#FF1CAA',
    primary40: 'rgba(255,28,170,0.4)',
    primary60: 'rgba(255,28,170,0.6)',
    primaryDark: '#FF4DB8',
    primaryDark40: 'rgba(255,77,184,0.4)',
    primaryDark60: 'rgba(255,77,184,0.6)',
    secondary: '#FF8DCC',
    secondary60: 'rgba(255,141,204,0.6)',
    bar: '#FF4DB8',
    glow: 'rgba(255,28,170,0.14)',
    glowDark: 'rgba(255,77,184,0.18)',
    bg: 'rgba(255,28,170,0.12)',
    bgDark: 'rgba(255,77,184,0.12)',
};

export const LoveView: React.FC<LoveViewProps> = ({
                                                        zodiacName,
                                                        zodiacEmoji,
                                                        partnerZodiac,
                                                        partnerZodiacName,
                                                        synergyPercent = 0,
                                                        weeklyForecast = [],
                                                        monthlyForecast = [],
                                                        yearlyForecast = [],
                                                        currentYear = new Date().getFullYear(),
                                                        onYearPrev,
                                                        onYearNext,
                                                        onSelectPartner,
                                                        onSelectUser,
                                                        fontScale,
                                                        resolvedTheme,
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

    const isMaxDark = resolvedTheme === 'max-dark';
    const isLight = resolvedTheme === 'max-light' || resolvedTheme === 'morning-magic';

    const loveAccent = isMaxDark ? LOVE.primaryDark : LOVE.primary;
    const loveGlow = isMaxDark ? LOVE.glowDark : LOVE.glow;

    const progressGradient = `linear-gradient(90deg, ${LOVE.secondary} 0%, ${LOVE.bar} 50%, ${loveAccent} 100%)`;
    const fillBorder = `1px solid ${loveAccent}33`;
    const fillShadow = '0 2px 4px rgba(0,0,0,0.1)';
    const boxGlow = `0 0 15px ${loveAccent}55`;
    const trackShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';

    const progressFill = {
        backgroundImage: progressGradient,
        backgroundSize: 'cover' as const,
        boxShadow: [fillShadow, isMaxDark ? boxGlow : ''].filter(Boolean).join(', '),
    };

    const labelSize = fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]';
    const headerLabelSize = fontScale === 'large' ? 'text-[0.75rem]' : 'text-[0.625rem]';
    const percentSize = fontScale === 'large' ? 'text-[1.8rem]' : fontScale === 'small' ? 'text-[1.4rem]' : 'text-[1.6rem]';
    const widgetPadding = fontScale === 'large' ? 'p-8 min-h-[180px]' : 'p-6 min-h-[140px]';
    const bottomPadding = fontScale === 'large' ? 'pb-40' : 'pb-32';

    return (
        <div className={`w-full text-[var(--c-text)] ${bottomPadding} px-1 animate-in fade-in duration-500 relative`}>
            {/* Радиальный glow — невидимый акцент любви */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full"
                 style={{ background: `radial-gradient(circle, ${loveGlow}, transparent 70%)` }} />

            <header className="mb-6 px-3">
                <div className="flex items-center gap-2 opacity-40 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: loveAccent }} />
                    <span className={`${headerLabelSize} font-black uppercase tracking-[0.2em]`} style={{ color: loveAccent }}>Совместимость</span>
                </div>
            </header>

            <div className="flex flex-col gap-4 relative z-10">
                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center justify-around mb-6 gap-2">
                        <button
                            onClick={() => {
                                void triggerSuccessHaptic();
                                onSelectUser?.();
                            }}
                            className="flex flex-col items-center gap-2 flex-1 active:scale-90 transition-all"
                        >
                            <span className={fontScale === 'large' ? 'text-[1.5rem]' : 'text-[1.25rem]'}>{zodiacEmoji}</span>
                            <span className={`${labelSize} font-black opacity-30 uppercase tracking-widest`}>{zodiacName}</span>
                        </button>

                        <div className="flex flex-col items-center flex-1 min-w-fit">
                            <div className={`${percentSize} font-black leading-none`} style={{ color: loveAccent }}>
                                {synergyPercent}%
                            </div>
                            <div className={`${labelSize} font-bold uppercase tracking-[0.1em] mt-2 text-center`} style={{ color: loveAccent }}>
                                Химия
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2 flex-1">
                            <button
                                onClick={handlePartnerClick}
                                className="transition-all active:scale-90"
                                style={{ color: loveAccent }}
                            >
                                {partnerZodiac
                                    ? <span className={fontScale === 'large' ? 'text-[1.5rem]' : 'text-[1.25rem]'}>{partnerZodiac}</span>
                                    : <Plus size="1.5rem" style={{ color: loveAccent }} />
                                }
                            </button>
                            <span className={`${labelSize} font-black opacity-30 uppercase tracking-widest`}>
                                {partnerZodiacName || 'Партнер'}
                            </span>
                        </div>
                    </div>

                    <div className={`w-full h-3 rounded-full overflow-hidden ${isLight ? 'bg-black/10' : 'bg-white/10'}`}
                         style={{ boxShadow: trackShadow }}>
                        <div
                            className="h-full rounded-full transition-all duration-1000 ease-out relative"
                            style={{
                                width: `${synergyPercent}%`,
                                border: fillBorder,
                                ...progressFill
                            }}
                        />
                    </div>
                </div>

                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={fontScale === 'large' ? 14 : 12} style={{ color: loveAccent }} />
                        <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-[var(--c-text-50)]`}>Прогноз на неделю</h3>
                    </div>

                    <WeeklyChart data={safeForecast} todayIndex={todayIndex} fontScale={fontScale} loveAccent={loveAccent} />
                </div>

                <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                    <div className="flex items-center gap-2 mb-6">
                        <BarChart3 size={fontScale === 'large' ? 14 : 12} style={{ color: loveAccent }} />
                        <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-[var(--c-text-50)]`}>Прогноз на месяц</h3>
                    </div>
                    <LineChart data={monthlyForecast} fontScale={fontScale} gradientId="loveFill" loveAccent={loveAccent} />
                </div>

                {(() => {
                    const premiumUntil = localStorage.getItem('nova_premium_until');
                    const hasPremium = !!premiumUntil && parseInt(premiumUntil, 10) > Date.now();
                    if (!hasPremium) {
                        return (
                            <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding} opacity-60`}>
                                <div className="flex items-center gap-2 mb-6">
                                    <BarChart3 size={fontScale === 'large' ? 14 : 12} style={{ color: loveAccent }} />
                                    <h3 className={`${headerLabelSize} font-black uppercase tracking-widest text-[var(--c-text-50)]`}>Прогноз на год</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className={`${fontScale === 'large' ? 'text-[0.8125rem]' : 'text-[0.625rem]'} font-bold text-[var(--c-text-30)] uppercase tracking-wider mb-2`}>
                                        Доступно с NOVA Premium
                                    </div>
                                    <div className="w-12 h-0.5 rounded-full bg-[var(--c-border)]" />
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div className={`bg-[var(--c-surface)] backdrop-blur-2xl border border-[var(--c-border)] rounded-[32px] mx-1 card-shadow ${widgetPadding}`}>
                            <div className="flex items-center gap-2 mb-6">
                                <BarChart3 size={fontScale === 'large' ? 14 : 12} style={{ color: loveAccent }} />
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
                            <LineChart data={yearlyForecast} fontScale={fontScale} gradientId="yearFill" labelSuffix="месяцев" showAllLabels bestIdx={bestWorst.bestIdx} worstIdx={bestWorst.worstIdx} loveAccent={loveAccent} />
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

function WeeklyChart({
    data,
    todayIndex,
    fontScale,
    loveAccent,
}: {
    data: LoveForecast[];
    todayIndex: number;
    fontScale: 'small' | 'medium' | 'large';
    loveAccent: string;
}) {
    const width = 600;
    const height = 240;
    const pad = { top: 30, right: 8, bottom: 60, left: 8 };
    const chartW = width - pad.left - pad.right;
    const chartH = height - pad.top - pad.bottom;
    const minVal = 0;
    const maxVal = 100;

    const toY = (val: number) =>
        pad.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;

    const slotW = chartW / data.length;
    const barWidth = slotW * 0.5;
    const baseY = height - pad.bottom;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
                {data.map((_, i) => (
                    <linearGradient key={i} id={`barGrad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={loveAccent} stopOpacity="0.85" />
                        <stop offset="100%" stopColor={loveAccent} stopOpacity="0.06" />
                    </linearGradient>
                ))}
            </defs>

            {data.map((d, i) => {
                const cx = pad.left + i * slotW + slotW / 2;
                const barH = toY(d.score);
                const y = barH;
                const h = Math.max(baseY - barH, 2);
                const isToday = i === todayIndex;
                return (
                    <g key={i}>
                        <rect
                            x={cx - barWidth / 2} y={y}
                            width={barWidth} height={h}
                            rx={barWidth / 2}
                            fill={`url(#barGrad-${i})`}
                            opacity={isToday ? 1 : 0.35}
                        />
                        <text
                            x={cx}
                            y={baseY + 20}
                            textAnchor="middle"
                            fill={isToday ? loveAccent : 'var(--c-text)'}
                            opacity={isToday ? 1 : 0.45}
                            fontSize={fontScale === 'large' ? 16 : 14}
                            fontFamily="inherit"
                            fontWeight="800"
                        >
                            {d.day}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

function LineChart({
    data,
    fontScale,
    gradientId,
    labelSuffix = 'дней',
    showAllLabels = false,
    bestIdx = -1,
    worstIdx = -1,
    loveAccent,
}: {
    data: LoveForecast[];
    fontScale: 'small' | 'medium' | 'large';
    gradientId: string;
    labelSuffix?: string;
    showAllLabels?: boolean;
    bestIdx?: number;
    worstIdx?: number;
    loveAccent: string;
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
                        <stop offset="0%" style={{ stopColor: loveAccent, stopOpacity: '0.18' }} />
                        <stop offset="100%" style={{ stopColor: loveAccent, stopOpacity: '0.02' }} />
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
                <path d={lineD} fill="none" stroke={loveAccent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

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
                            fill={isBest ? loveAccent : isWorst ? LOVE.secondary : 'var(--c-text)'}
                            style={i === todayIdx ? { fill: loveAccent } : {}}
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
                            fill={loveAccent}
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
                            fill={LOVE.secondary}
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
                                    style={{ fill: isToday ? loveAccent : 'var(--c-text)' }}
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
                        style={{ fill: loveAccent }}
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
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: loveAccent }} />
                        <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-widest`} style={{ color: loveAccent }}>
                            {chartData[bestIdx].day} — {chartData[bestIdx].score}%
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LOVE.secondary }} />
                        <span className={`${fontScale === 'large' ? 'text-[0.6875rem]' : 'text-[0.5625rem]'} font-black uppercase tracking-widest`} style={{ color: LOVE.secondary60 }}>
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
