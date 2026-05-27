import React from 'react';
import { Zap, Users, ShieldCheck, Info, Sparkles, Heart, type LucideIcon } from 'lucide-react';

interface Section {
    Icon: LucideIcon;
    title: string;
    description: string;
    fact: string;
    color: string;
}

interface Props {
    fontScale?: 'small' | 'medium' | 'large';
}

export const RhythmKnowledgeView: React.FC<Props> = ({ fontScale = 'medium' }) => {
    const sections: Section[] = [
        {
            Icon: Zap,
            title: "Час Силы",
            color: "text-[var(--c-primary)]",
            description: "Халдейский ряд планетарных часов определяет планету-управителя каждого часа суток. Когда ваш управитель совпадает с активным планетарным часом, а фаза Луны благоприятна — система фиксирует час силы. Это окно максимальной энергии для действий.",
            fact: "Используется классический халдейский порядок: Сатурн → Юпитер → Марс → Солнце → Венера → Меркурий → Луна."
        },
        {
            Icon: Heart,
            title: "Любовный радар",
            color: "text-[var(--c-primary)]",
            description: "Анализ совместимости стихий (огонь/земля/воздух/вода) дополняется лунным ритмом и дневной энергией. На каждый день строится вектор притяжения: от полного резонанса до требующего чуткости. Прогноз раскладывается на неделю, месяц и год.",
            fact: "Дневная энергия вычисляется из фазы Луны и дня недели — это задаёт базовый тон отношениям."
        },
        {
            Icon: Users,
            title: "Синергия дня",
            color: "text-[var(--c-primary)]",
            description: "Положение Луны в знаке зодиака определяет её влияние на ваш знак: гармоничные аспекты (трин, секстиль — совпадение по стихиям) дают лёгкость, напряжённые (квадрат — знаки одной модальности) требуют осторожности. Добавлен фактор случайности для реалистичности живого общения.",
            fact: "Стихии: Огня (♈♌♐), Земли (♉♍♑), Воздуха (♊♎♒), Воды (♋♏♓). Одноимённые стихии — гармония, квадрат — напряжение."
        },
        {
            Icon: Sparkles,
            title: "Личный прогноз",
            color: "text-[var(--c-secondary)]",
            description: "Транзит Луны и Солнца накладывается на астрологическую ДНК знака: стихия задаёт темперамент, управитель — сферу удачи, модальность — ритм действий. Из этого складывается ежедневный прогноз: от спокойного накопления до максимального драйва.",
            fact: "DNA = { element, ruler, modality } × lunarPhase × dayEnergy. Все данные детерминированы от даты."
        },
        {
            Icon: ShieldCheck,
            title: "Безопасность",
            color: "text-[var(--c-secondary)]",
            description: "Все расчеты происходят только на вашем устройстве. Ваши личные данные, даты и выбранные знаки не передаются в интернет и не хранятся на серверах. Ваша астрологическая карта остается полностью анонимной и доступной только вам.",
            fact: "Ваша приватность защищена технологиями MAX и локальной обработкой данных."
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
                        Узнайте, как ваш персональный ритм синхронизируется с движением планет.
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