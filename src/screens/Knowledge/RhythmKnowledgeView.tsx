import React, { useState } from 'react';
import { Zap, Users, ShieldCheck, Info, Sparkles, Heart, Code2, Copy, Check, type LucideIcon } from 'lucide-react';

interface Section {
    Icon: LucideIcon;
    title: string;
    description: string;
    fact: string | React.ReactNode;
    color: string;
}

interface Props {
    fontScale?: 'small' | 'medium' | 'large';
}

const GITHUB_URL = 'https://github.com/Aleksei1991Antonov/horoscope';

export const RhythmKnowledgeView: React.FC<Props> = ({ fontScale = 'medium' }) => {
    const [copied, setCopied] = useState(false);

    const sections: Section[] = [
        {
            Icon: Zap,
            title: "Час Силы",
            color: "text-[var(--c-primary)]",
            description: "Планетарные часы рассчитываются по Халдейскому ряду — древней системе, определяющей планету-управителя каждого часа. Когда ваш управитель совпадает с активным часом, а фаза Луны благоприятна, алгоритм фиксирует окно максимальной энергии. Час Силы обновляется ежедневно и доступен на странице «Ритм».",
            fact: "Порядок планет: Сатурн → Юпитер → Марс → Солнце → Венера → Меркурий → Луна. Каждый день ряд стартует с планеты-управителя первого часа после восхода Солнца."
        },
        {
            Icon: Heart,
            title: "Любовный радар",
            color: "text-[var(--c-primary)]",
            description: "Совместимость строится на трёх уровнях: стихии (огонь/земля/воздух/вода) задают темперамент, модальность (кардинальная/фиксированная/мутабельная) определяет ритм, положение Луны добавляет эмоциональный фон. Всё это собирается в единый вектор притяжения на день, неделю, месяц и год.",
            fact: "Каждый знак имеет свою ДНК: стихию, управителя и модальность. Совпадение по стихиям даёт резонанс, квадрат модальностей — напряжение."
        },
        {
            Icon: Users,
            title: "Синергия дня",
            color: "text-[var(--c-primary)]",
            description: "Ежедневная синергия между двумя знаками рассчитывается через комбинацию стихий, взаимное расположение в зодиакальном круге и фазу Луны. Алгоритм учитывает не только базовую совместимость, но и дневные колебания — отсюда разница между вчера и сегодня.",
            fact: "Добавлен фактор случайности для реалистичности живого общения: даже идеальная совместимость может давать сбои в конкретный день."
        },
        {
            Icon: Sparkles,
            title: "Личный прогноз",
            color: "text-[var(--c-secondary)]",
            description: "Прогноз строится на четырёх энергетических уровнях: от пика фокуса до стратегической паузы. Каждый день алгоритм выбирает полосу (high, mediumHigh, mediumLow, low) на основе фазы Луны и дня недели, а внутри неё — один из шести вариантов текста. Все тексты написаны для женщин-карьеристок: уверенный тон, без магии и астрологической воды.",
            fact: "Каждый вариант текста — это чёткий императив или совет, а не описание состояния. 288 уникальных текстов на 12 знаков × 4 уровня × 6 вариантов."
        },
        {
            Icon: ShieldCheck,
            title: "Безопасность",
            color: "text-[var(--c-secondary)]",
            description: "Все расчёты происходят локально на вашем устройстве. Дата рождения, выбранный знак, настройки интерфейса — всё хранится только в вашем браузере. Приложение не отправляет данные на серверы и не требует регистрации.",
            fact: "Полная анонимность: никаких аккаунтов, никакой телеметрии, никаких кук. Только вы и ваш ритм."
        },
        {
            Icon: Code2,
            title: "Открытый код",
            color: "text-[var(--c-secondary)]",
            description: "Исходный код приложения полностью открыт и доступен на GitHub. Вы можете изучить алгоритмы, предложить улучшения или использовать проект в своих целях. Любой желающий может форкнуть репозиторий и запустить свою версию.",
            fact: <span>Репозиторий: <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted underline-offset-2 hover:text-[var(--c-primary)] transition-colors">github.com/Aleksei1991Antonov/horoscope</a> <button onClick={() => { navigator.clipboard.writeText(GITHUB_URL); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[var(--c-primary)]/10 hover:bg-[var(--c-primary)]/20 transition-colors text-[var(--c-primary)] align-middle">{copied ? <Check size={12} /> : <Copy size={12} />}</button>. Стек: React, TypeScript, Vite, Tailwind CSS, MAX Mini Apps.</span>
        }
    ];

    const titleSize = fontScale === 'large' ? 'text-3xl' : 'text-2xl';
    const bodySize = fontScale === 'large' ? 'text-base' : 'text-sm';

    return (
        <div className="flex flex-col bg-transparent">
            <div className="max-w-2xl mx-auto w-full">
                {/* Заголовок контента */}
                <div className="px-6 pt-8 mb-8">
                        <h1 className={`${titleSize} font-black text-[var(--c-text)] tracking-tighter uppercase leading-none mb-3`}>
                        База знаний
                    </h1>
                    <p className="text-[var(--c-text-40)] text-sm leading-relaxed max-w-[300px]">
                        Как работает приложение: алгоритмы, архитектура и принципы расчёта ежедневных прогнозов.
                    </p>
                </div>

                {/* Секции */}
                <div className="px-4 space-y-4 pb-32">
                    {sections.map((section, idx) => {
                        const Icon = section.Icon;
                        return (
                            <div
                                key={idx}
                                className="bg-[var(--c-surface)] border border-[var(--c-border)] rounded-[32px] p-6 overflow-hidden relative card-shadow"
                            >
                                {/* Декор */}
                                <div className={`absolute -right-4 -top-4 p-4 opacity-[0.02] rotate-12 ${section.color}`}>
                                    <Icon size={140} />
                                </div>

                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <Icon className={section.color} size="1.25rem" />
                                    <h2 className="text-lg font-bold text-[var(--c-text)] uppercase tracking-wider">{section.title}</h2>
                                </div>

                                <p className={`${bodySize} text-[var(--c-text-60)] leading-relaxed mb-5 relative z-10 font-medium`}>
                                    {section.description}
                                </p>

                                <div className="flex items-start gap-3 p-4 bg-[var(--c-surface)] rounded-2xl border border-[var(--c-border)] relative z-10 card-shadow">
                                    <Info size={16} className={`${section.color} mt-0.5 shrink-0 opacity-80`} />
                                    <span className="text-[0.6875rem] font-medium text-[var(--c-text-40)] leading-snug">
                                        {section.fact}
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                    {/* Футер */}
                    <div className="px-8 mt-12 text-center opacity-30">
                        <p className="text-[0.5625rem] text-[var(--c-text)] uppercase tracking-[0.2em] leading-relaxed">
                            Алгоритмы приложения основаны на математических моделях <br />
                            и носят рекомендательный характер.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};